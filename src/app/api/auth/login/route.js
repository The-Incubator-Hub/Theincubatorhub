import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma.mjs";
import { getAuthSession, createSession } from "@/lib/auth.mjs";
import { consumeRateLimit } from "@/lib/rate-limit.mjs";
import { validateEmail, sanitizeString } from "@/lib/validation.mjs";
import { logInfo, logError, getRequestId } from "@/lib/logger.mjs";

export async function POST(request) {
  const requestId = getRequestId();

  try {
    // Check if already logged in
    const existing = await getAuthSession();
    if (existing) {
      return NextResponse.json({ ok: true, data: { alreadyLoggedIn: true } });
    }

    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const rl = consumeRateLimit(`login:${ip}`, 10, 60_000);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!validateEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!password) {
      return NextResponse.json({ error: "Password is required." }, { status: 400 });
    }

    const cleanEmail = sanitizeString(email).toLowerCase();

    // Find user
    const user = await prisma.user.findUnique({ where: { email: cleanEmail } });

    // Constant-time comparison even if user not found
    const dummyHash = "$2a$12$invalidhashforlengthpadding00000000000000000000000000000";
    const hashToCompare = user ? user.passwordHash : dummyHash;
    const passwordMatch = await bcrypt.compare(password, hashToCompare);

    if (!user || !passwordMatch) {
      logInfo("[login] Failed login attempt", { requestId, email: cleanEmail });
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    if (!user.isActive) {
      return NextResponse.json({ error: "Your account has been deactivated. Please contact support." }, { status: 403 });
    }

    // Create session
    const sessionToken = await createSession(user.id);

    logInfo("[login] User logged in", { requestId, userId: user.id });

    const response = NextResponse.json({
      ok: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set("session_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    logError("[login] Unexpected error", { requestId, error: error.message });
    return NextResponse.json({ error: "An unexpected error occurred. Please try again." }, { status: 500 });
  }
}
