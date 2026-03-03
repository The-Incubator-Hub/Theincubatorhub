import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma.mjs"
import { consumeRateLimit } from "@/lib/rate-limit.mjs"
import { getRequestId, logError, logInfo } from "@/lib/logger.mjs"
import {
  isPayloadTooLarge,
  validateLoginPayload,
} from "@/lib/validation.mjs"
import { setSessionCookie } from "@/lib/auth.mjs"

export async function POST(request) {
  const requestId = getRequestId(request)
  const rl = consumeRateLimit(request, { limit: 12, windowMs: 60_000 })
  const headers = {
    "x-request-id": requestId,
    "x-ratelimit-remaining": String(rl.remaining),
    "x-ratelimit-reset": String(Math.ceil(rl.resetAt / 1000)),
  }

  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many login attempts. Please retry in a minute." },
      { status: 429, headers: { ...headers, "retry-after": "60" } },
    )
  }

  if (isPayloadTooLarge(request, 10_000)) {
    return NextResponse.json(
      { error: "Payload too large." },
      { status: 413, headers },
    )
  }

  try {
    const body = await request.json()
    const validation = validateLoginPayload(body)
    if (!validation.ok) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400, headers },
      )
    }

    const { email, password } = validation.data

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        passwordHash: true,
        isActive: true,
      },
    })

    if (!user || !user.passwordHash || !user.isActive) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401, headers },
      )
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash)
    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401, headers },
      )
    }

    await setSessionCookie(user)

    logInfo("auth_login_success", {
      requestId,
      userId: user.id,
      email: user.email,
      role: user.role,
      loginAt: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        ok: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { headers },
    )
  } catch (error) {
    logError("auth_login_failed", error, {
      requestId,
      path: request.nextUrl.pathname,
    })

    if (error instanceof Error && /AUTH_SECRET/i.test(error.message)) {
      return NextResponse.json(
        { error: "Server auth configuration is incomplete." },
        { status: 500, headers },
      )
    }

    return NextResponse.json(
      { error: "Unable to login right now. Please try again." },
      { status: 500, headers },
    )
  }
}
