import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma.mjs"
import { getAuthSession } from "@/lib/auth.mjs"
import { consumeRateLimit } from "@/lib/rate-limit.mjs"
import { getRequestId, logError, logInfo } from "@/lib/logger.mjs"
import { validateApplicationReviewPayload } from "@/lib/validation.mjs"

const FINAL_DECISION_STATUSES = new Set(["ACCEPTED", "REJECTED", "ENROLLED"])

function sanitizeRedirectPath(value) {
  const redirectPath = String(value || "").trim()
  if (!redirectPath.startsWith("/")) return "/admin/dashboard"
  if (!redirectPath.startsWith("/admin")) return "/admin/dashboard"
  return redirectPath
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

export async function POST(request, { params }) {
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

  const rl = consumeRateLimit(request, { limit: 30, windowMs: 60_000 })
  const headers = {
    "x-request-id": requestId,
    "x-ratelimit-remaining": String(rl.remaining),
    "x-ratelimit-reset": String(Math.ceil(rl.resetAt / 1000)),
  }

  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many review actions. Please retry in a minute." },
      { status: 429, headers: { ...headers, "retry-after": "60" } },
    )
  }

  try {
    const { id } = await params
    const applicationId = String(id || "").trim()
    if (!applicationId) {
      return NextResponse.json(
        { error: "Invalid application id." },
        { status: 400, headers },
      )
    }

    const { body, expectsJson } = await parseRequestBody(request)
    const redirectPath = sanitizeRedirectPath(body?.redirectTo)
    const validation = validateApplicationReviewPayload(body)

    if (!validation.ok) {
      if (!expectsJson) {
        return NextResponse.redirect(new URL(redirectPath, request.url), 303)
      }
      return NextResponse.json(
        { error: validation.error },
        { status: 400, headers },
      )
    }

    const existing = await prisma.application.findUnique({
      where: { id: applicationId },
      select: { id: true, status: true },
    })

    if (!existing) {
      if (!expectsJson) {
        return NextResponse.redirect(new URL(redirectPath, request.url), 303)
      }
      return NextResponse.json(
        { error: "Application not found." },
        { status: 404, headers },
      )
    }

    const { decision, notes, score } = validation.data
    const decisionAt = FINAL_DECISION_STATUSES.has(decision) ? new Date() : null

    await prisma.$transaction([
      prisma.applicationReview.create({
        data: {
          applicationId,
          reviewerId: session.user.id,
          decision,
          notes,
          score,
        },
      }),
      prisma.application.update({
        where: { id: applicationId },
        data: {
          status: decision,
          decisionAt,
        },
      }),
    ])

    logInfo("application_review_success", {
      requestId,
      reviewerId: session.user.id,
      applicationId,
      previousStatus: existing.status,
      decision,
      score,
    })

    if (!expectsJson) {
      return NextResponse.redirect(new URL(redirectPath, request.url), 303)
    }

    return NextResponse.json(
      { ok: true, applicationId, status: decision },
      { headers },
    )
  } catch (error) {
    logError("application_review_failed", error, {
      requestId,
      reviewerId: session.user.id,
    })
    return NextResponse.json(
      { error: "Unable to update application right now." },
      { status: 500, headers },
    )
  }
}

