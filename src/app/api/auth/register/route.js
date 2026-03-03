import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma.mjs"
import { consumeRateLimit } from "@/lib/rate-limit.mjs"
import { getRequestId, logError, logInfo } from "@/lib/logger.mjs"
import {
  isPayloadTooLarge,
  validateRegistrationPayload,
} from "@/lib/validation.mjs"

export async function POST(request) {
  const requestId = getRequestId(request)
  const rl = consumeRateLimit(request, { limit: 8, windowMs: 60_000 })
  const headers = {
    "x-request-id": requestId,
    "x-ratelimit-remaining": String(rl.remaining),
    "x-ratelimit-reset": String(Math.ceil(rl.resetAt / 1000)),
  }

  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many signup attempts. Please retry in a minute." },
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
    const validation = validateRegistrationPayload(body)
    if (!validation.ok) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400, headers },
      )
    }

    const { name, email, password } = validation.data
    const existing = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    })

    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409, headers },
      )
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "APPLICANT",
      },
      select: { id: true, email: true },
    })

    logInfo("auth_register_success", {
      requestId,
      userId: user.id,
      email: user.email,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        ok: true,
        message: "Account created successfully.",
      },
      { status: 201, headers },
    )
  } catch (error) {
    logError("auth_register_failed", error, {
      requestId,
      path: request.nextUrl.pathname,
    })
    return NextResponse.json(
      { error: "Unable to create account right now. Please try again." },
      { status: 500, headers },
    )
  }
}

