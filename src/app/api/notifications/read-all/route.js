import { NextResponse } from "next/server"
import { getAuthSession } from "@/lib/auth.mjs"
import { prisma } from "@/lib/prisma.mjs"
import { getRequestId, logError, logInfo } from "@/lib/logger.mjs"

function sanitizeRedirectPath(value) {
  const path = String(value || "").trim()
  if (!path.startsWith("/")) return "/portal/dashboard"
  return path
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

  let expectsJson = true
  let redirectPath = "/portal/dashboard"

  try {
    const { body, expectsJson: isJson } = await parseRequestBody(request)
    expectsJson = isJson
    redirectPath = sanitizeRedirectPath(body?.redirectTo)

    const result = await prisma.notification.updateMany({
      where: {
        userId: session.user.id,
        readAt: null,
      },
      data: {
        readAt: new Date(),
      },
    })

    logInfo("notifications_mark_all_read", {
      requestId,
      userId: session.user.id,
      count: result.count,
    })

    if (!expectsJson) {
      const url = new URL(redirectPath, request.url)
      url.searchParams.set("notif", "read")
      return NextResponse.redirect(url, 303)
    }

    return NextResponse.json(
      { ok: true, updated: result.count },
      { headers: { "x-request-id": requestId } },
    )
  } catch (error) {
    logError("notifications_mark_all_read_failed", error, {
      requestId,
      userId: session.user.id,
    })

    if (!expectsJson) {
      const url = new URL(redirectPath, request.url)
      url.searchParams.set("notif", "failed")
      return NextResponse.redirect(url, 303)
    }

    return NextResponse.json(
      { error: "Unable to mark notifications as read right now." },
      { status: 500, headers: { "x-request-id": requestId } },
    )
  }
}

