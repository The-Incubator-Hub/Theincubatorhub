import { NextResponse } from "next/server"
import { getAuthSession } from "@/lib/auth.mjs"
import { prisma } from "@/lib/prisma.mjs"
import { consumeRateLimit } from "@/lib/rate-limit.mjs"
import { getRequestId, logError, logInfo } from "@/lib/logger.mjs"
import { validateNotificationBroadcastPayload } from "@/lib/validation.mjs"

function sanitizeRedirectPath(value) {
  const path = String(value || "").trim()
  if (!path.startsWith("/")) return "/admin/dashboard"
  if (!path.startsWith("/admin")) return "/admin/dashboard"
  return path
}

function withQuery(pathname, key, value) {
  const url = new URL(pathname, "https://local.incubator.internal")
  url.searchParams.set(key, value)
  return `${url.pathname}${url.search}`
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

  const rl = consumeRateLimit(request, { limit: 15, windowMs: 60_000 })
  const headers = {
    "x-request-id": requestId,
    "x-ratelimit-remaining": String(rl.remaining),
    "x-ratelimit-reset": String(Math.ceil(rl.resetAt / 1000)),
  }

  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many broadcast attempts. Please retry in a minute." },
      { status: 429, headers: { ...headers, "retry-after": "60" } },
    )
  }

  let expectsJson = true
  let redirectPath = "/admin/dashboard"

  try {
    const { body, expectsJson: isJson } = await parseRequestBody(request)
    expectsJson = isJson
    redirectPath = sanitizeRedirectPath(body?.redirectTo)

    const validation = validateNotificationBroadcastPayload(body)
    if (!validation.ok) {
      if (!expectsJson) {
        return NextResponse.redirect(
          new URL(withQuery(redirectPath, "notif", "invalid"), request.url),
          303,
        )
      }
      return NextResponse.json(
        { error: validation.error },
        { status: 400, headers },
      )
    }

    const payload = validation.data
    const userWhere = {
      isActive: true,
    }

    if (payload.role) {
      userWhere.role = payload.role
    }

    if (payload.applicationStatus) {
      const applicants = await prisma.application.findMany({
        where: { status: payload.applicationStatus },
        select: { applicantId: true },
        distinct: ["applicantId"],
        take: Math.max(payload.maxRecipients * 3, payload.maxRecipients),
      })
      const applicantIds = applicants
        .map((entry) => entry.applicantId)
        .filter(Boolean)

      if (applicantIds.length === 0) {
        if (!expectsJson) {
          return NextResponse.redirect(
            new URL(withQuery(redirectPath, "notif", "empty"), request.url),
            303,
          )
        }
        return NextResponse.json(
          { ok: true, count: 0, message: "No matching recipients found." },
          { headers },
        )
      }

      userWhere.id = { in: applicantIds }
    }

    const recipients = await prisma.user.findMany({
      where: userWhere,
      select: { id: true },
      take: payload.maxRecipients,
    })

    if (recipients.length === 0) {
      if (!expectsJson) {
        return NextResponse.redirect(
          new URL(withQuery(redirectPath, "notif", "empty"), request.url),
          303,
        )
      }
      return NextResponse.json(
        { ok: true, count: 0, message: "No matching recipients found." },
        { headers },
      )
    }

    const created = await prisma.notification.createMany({
      data: recipients.map((recipient) => ({
        userId: recipient.id,
        type: "ANNOUNCEMENT",
        title: payload.title,
        message: payload.message,
        link: payload.link,
        payload: {
          source: "admin-broadcast",
          actorId: session.user.id,
          roleFilter: payload.role,
          applicationStatusFilter: payload.applicationStatus,
        },
      })),
    })

    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        action: "NOTIFICATION_BROADCAST",
        entity: "Notification",
        entityId: "bulk",
        payload: {
          requestId,
          createdCount: created.count,
          roleFilter: payload.role,
          applicationStatusFilter: payload.applicationStatus,
          maxRecipients: payload.maxRecipients,
          title: payload.title,
        },
      },
    })

    logInfo("notification_broadcast_success", {
      requestId,
      actorId: session.user.id,
      createdCount: created.count,
      roleFilter: payload.role || "ALL",
      statusFilter: payload.applicationStatus || "ALL",
    })

    if (!expectsJson) {
      return NextResponse.redirect(
        new URL(withQuery(redirectPath, "notif", "sent"), request.url),
        303,
      )
    }

    return NextResponse.json(
      { ok: true, count: created.count },
      { status: 201, headers },
    )
  } catch (error) {
    logError("notification_broadcast_failed", error, {
      requestId,
      actorId: session.user.id,
    })

    if (!expectsJson) {
      return NextResponse.redirect(
        new URL(withQuery(redirectPath, "notif", "failed"), request.url),
        303,
      )
    }

    return NextResponse.json(
      { error: "Unable to send notifications right now." },
      { status: 500, headers },
    )
  }
}

