import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import prisma from "@/lib/prisma.mjs";
import { getAuthSession, createSession } from "@/lib/auth.mjs";
import { consumeRateLimit } from "@/lib/rate-limit.mjs";
import { validateEmail, validatePassword, validateName, getPasswordStrengthMessage, sanitizeString } from "@/lib/validation.mjs";
import { logInfo, logError, getRequestId } from "@/lib/logger.mjs";
import { sendWelcomeEmail, sendVerificationEmail } from "@/lib/email.mjs";

export async function POST(request) {
  const requestId = getRequestId();

  try {
    // Check if already logged in
    const existing = await getAuthSession();
    if (existing) {
      return NextResponse.json({ error: "Already authenticated" }, { status: 400 });
    }

    // Rate limiting: 5 registrations per IP per minute
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const rl = consumeRateLimit(`register:${ip}`, 5, 60_000);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    const body = await request.json();
    const { name, email, password } = body;

    // Validation
    if (!validateName(name)) {
      return NextResponse.json({ error: "Please enter a valid full name (2-100 characters)." }, { status: 400 });
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!validatePassword(password)) {
      const msg = getPasswordStrengthMessage(password);
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const cleanEmail = sanitizeString(email).toLowerCase();
    const cleanName = sanitizeString(name);

    // Check for existing user
    const existingUser = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (existingUser) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        passwordHash,
      },
    });

    // Generate email verification token
    const verifyToken = randomBytes(32).toString("hex");
    const verifyExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.emailVerificationToken.create({
      data: {
        userId: user.id,
        token: verifyToken,
        expiresAt: verifyExpiresAt,
      },
    });

    // Send emails (non-blocking — don't fail registration if email fails)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const verifyUrl = `${baseUrl}/api/auth/verify-email?token=${verifyToken}`;

    Promise.all([
      sendWelcomeEmail({ to: cleanEmail, name: cleanName }).catch((e) =>
        logError("[register] Failed to send welcome email", { requestId, error: e.message })
      ),
      sendVerificationEmail({ to: cleanEmail, name: cleanName, verifyUrl }).catch((e) =>
        logError("[register] Failed to send verification email", { requestId, error: e.message })
      ),
    ]);

    // Create session
    const sessionToken = await createSession(user.id);

    logInfo("[register] User registered", { requestId, userId: user.id, email: cleanEmail });

    const response = NextResponse.json(
      { ok: true, data: { id: user.id, name: user.name, email: user.email, role: user.role } },
      { status: 201 }
    );

    response.cookies.set("session_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    logError("[register] Unexpected error", { requestId, error: error.message });
    return NextResponse.json({ error: "An unexpected error occurred. Please try again." }, { status: 500 });
  }
}
