import { NextResponse } from "next/server"
import { getAuthSession } from "@/lib/auth.mjs"
import { prisma } from "@/lib/prisma.mjs"
import { getRequestId, logError } from "@/lib/logger.mjs"

export async function GET(request) {
  const requestId = getRequestId(request)
  const session = await getAuthSession()
  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401, headers: { "x-request-id": requestId } },
    )
  }

  try {
    const [notifications, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 30,
      }),
      prisma.notification.count({
        where: { userId: session.user.id, readAt: null },
      }),
    ])

    return NextResponse.json(
      {
        ok: true,
        unreadCount,
        notifications,
      },
      { headers: { "x-request-id": requestId } },
    )
  } catch (error) {
    logError("notifications_list_failed", error, {
      requestId,
      userId: session.user.id,
    })
    return NextResponse.json(
      { error: "Unable to load notifications right now." },
      { status: 500, headers: { "x-request-id": requestId } },
    )
  }
}

