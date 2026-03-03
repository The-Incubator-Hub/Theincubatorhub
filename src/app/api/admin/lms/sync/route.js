import { NextResponse } from "next/server"
import { getAuthSession } from "@/lib/auth.mjs"
import { prisma } from "@/lib/prisma.mjs"
import { consumeRateLimit } from "@/lib/rate-limit.mjs"
import { getRequestId, logError, logInfo } from "@/lib/logger.mjs"
import { sendMoodleEnrollmentSync } from "@/lib/moodle.mjs"

const LMS_SYNC_ALLOWED_STATUSES = new Set(["ACCEPTED", "ENROLLED"])
const LMS_SYNC_ACTIONS = {
  success: "LMS_SYNC_SUCCESS",
  skipped: "LMS_SYNC_SKIPPED",
  failed: "LMS_SYNC_FAILED",
}

function sanitizeRedirectPath(value) {
  const redirectPath = String(value || "").trim()
  if (!redirectPath.startsWith("/")) return "/admin/dashboard"
  if (!redirectPath.startsWith("/admin")) return "/admin/dashboard"
  return redirectPath
}

function withQuery(pathname, key, value) {
  const url = new URL(pathname, "https://local.incubator.internal")
  url.searchParams.set(key, value)
  return `${url.pathname}${url.search}`
}

function parseBoolean(value, fallback = false) {
  if (value == null || value === "") return fallback
  const raw = String(value).trim().toLowerCase()
  if (["1", "true", "yes", "on"].includes(raw)) return true
  if (["0", "false", "no", "off"].includes(raw)) return false
  return fallback
}

async function parseRequestBody(request) {
  const contentType = request.headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    const json = await request.json()
    return { body: json, expectsJson: true }
  }

  const formData = await request.formData()
  return {
    body: Object.fromEntries(formData.entries()),
    expectsJson: false,
  }
}

function toSyncPayload(application) {
  return {
    event: "applicant.enrollment.sync",
    timestamp: new Date().toISOString(),
    applicant: {
      id: application.applicant.id,
      name: application.applicant.name || application.fullName,
      email: application.applicant.email || application.email,
    },
    program: {
      id: application.program.id,
      slug: application.program.slug,
      title: application.program.title,
    },
    application: {
      id: application.id,
      status: application.status,
      submittedAt: application.submittedAt?.toISOString() || null,
      decisionAt: application.decisionAt?.toISOString() || null,
    },
  }
}

export async function POST(request) {
  const requestId = getRequestId(request)
  const session = await getAuthSession()
  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401, headers: { "x-request-id": requestId } },
    )
  }
  if (session.user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Forbidden." },
      { status: 403, headers: { "x-request-id": requestId } },
    )
  }

  const rl = consumeRateLimit(request, { limit: 20, windowMs: 60_000 })
  const headers = {
    "x-request-id": requestId,
    "x-ratelimit-remaining": String(rl.remaining),
    "x-ratelimit-reset": String(Math.ceil(rl.resetAt / 1000)),
  }

  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many LMS sync attempts. Please retry in a minute." },
      { status: 429, headers: { ...headers, "retry-after": "60" } },
    )
  }

  let expectsJson = true
  let redirectPath = "/admin/dashboard"

  try {
    const { body, expectsJson: isJson } = await parseRequestBody(request)
    expectsJson = isJson

    const applicationId = String(body?.applicationId || "").trim()
    redirectPath = sanitizeRedirectPath(body?.redirectTo)
    const autoEnroll = parseBoolean(body?.autoEnroll, true)

    if (!applicationId) {
      const nextPath = withQuery(redirectPath, "lmsSync", "invalid")
      if (!expectsJson) {
        return NextResponse.redirect(new URL(nextPath, request.url), 303)
      }
      return NextResponse.json(
        { error: "Application id is required." },
        { status: 400, headers },
      )
    }

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        applicant: {
          select: { id: true, name: true, email: true },
        },
        program: {
          select: { id: true, slug: true, title: true },
        },
      },
    })

    if (!application) {
      const nextPath = withQuery(redirectPath, "lmsSync", "missing")
      if (!expectsJson) {
        return NextResponse.redirect(new URL(nextPath, request.url), 303)
      }
      return NextResponse.json(
        { error: "Application not found." },
        { status: 404, headers },
      )
    }

    if (!LMS_SYNC_ALLOWED_STATUSES.has(application.status)) {
      const nextPath = withQuery(redirectPath, "lmsSync", "not-ready")
      if (!expectsJson) {
        return NextResponse.redirect(new URL(nextPath, request.url), 303)
      }
      return NextResponse.json(
        { error: "Only accepted or enrolled applications can be synced to LMS." },
        { status: 400, headers },
      )
    }

    let syncResult
    try {
      syncResult = await sendMoodleEnrollmentSync(toSyncPayload(application))
    } catch (error) {
      syncResult = {
        ok: false,
        skipped: false,
        status: 0,
        message: error instanceof Error ? error.message : "Sync request failed.",
      }
    }

    let finalStatus = application.status
    if (syncResult.ok && autoEnroll && application.status !== "ENROLLED") {
      await prisma.application.update({
        where: { id: application.id },
        data: {
          status: "ENROLLED",
          decisionAt: new Date(),
        },
      })
      finalStatus = "ENROLLED"
    }

    const outcomeKey = syncResult.ok
      ? "success"
      : syncResult.skipped
        ? "skipped"
        : "failed"

    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        action: LMS_SYNC_ACTIONS[outcomeKey],
        entity: "Application",
        entityId: application.id,
        payload: {
          requestId,
          statusBefore: application.status,
          statusAfter: finalStatus,
          syncResult,
          autoEnroll,
          programSlug: application.program.slug,
        },
      },
    })

    logInfo("moodle_sync_result", {
      requestId,
      adminId: session.user.id,
      applicationId: application.id,
      outcome: outcomeKey,
      statusBefore: application.status,
      statusAfter: finalStatus,
      httpStatus: syncResult.status,
    })

    if (!expectsJson) {
      const nextPath = withQuery(redirectPath, "lmsSync", outcomeKey)
      return NextResponse.redirect(new URL(nextPath, request.url), 303)
    }

    return NextResponse.json(
      {
        ok: syncResult.ok,
        skipped: syncResult.skipped,
        applicationId: application.id,
        status: finalStatus,
        syncResult,
      },
      { status: syncResult.ok ? 200 : syncResult.skipped ? 202 : 502, headers },
    )
  } catch (error) {
    logError("moodle_sync_failed", error, {
      requestId,
      adminId: session.user.id,
    })
    if (!expectsJson) {
      const nextPath = withQuery(redirectPath, "lmsSync", "failed")
      return NextResponse.redirect(new URL(nextPath, request.url), 303)
    }
    return NextResponse.json(
      { error: "Unable to run LMS sync right now." },
      { status: 500, headers },
    )
  }
}

