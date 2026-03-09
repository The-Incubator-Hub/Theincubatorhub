import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import prisma from "@/lib/prisma.mjs";
import { consumeRateLimit } from "@/lib/rate-limit.mjs";
import { validateEmail, sanitizeString } from "@/lib/validation.mjs";
import { logInfo, logError, getRequestId } from "@/lib/logger.mjs";
import { sendPasswordResetEmail } from "@/lib/email.mjs";

export async function POST(request) {
  const requestId = getRequestId();

  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const rl = consumeRateLimit(`forgot-password:${ip}`, 5, 60_000);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    const body = await request.json();
    const { email } = body;

    if (!validateEmail(email)) {
      // Return generic success to not reveal if email exists
      return NextResponse.json({ ok: true, message: "If an account exists with that email, you will receive a reset link shortly." });
    }

    const cleanEmail = sanitizeString(email).toLowerCase();

    // Always return the same generic message regardless of whether email exists
    const user = await prisma.user.findUnique({ where: { email: cleanEmail } });

    if (user && user.isActive) {
      // Invalidate existing tokens for this user
      await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

      // Generate token
      const rawToken = randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          token: rawToken,
          expiresAt,
        },
      });

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const resetUrl = `${baseUrl}/reset-password?token=${rawToken}`;

      sendPasswordResetEmail({ to: cleanEmail, name: user.name, resetUrl }).catch((e) =>
        logError("[forgot-password] Failed to send email", { requestId, error: e.message })
      );

      logInfo("[forgot-password] Reset email queued", { requestId, userId: user.id });
    }

    // Always return the same response
    return NextResponse.json({
      ok: true,
      message: "If an account exists with that email, you will receive a reset link shortly.",
    });
  } catch (error) {
    logError("[forgot-password] Unexpected error", { requestId, error: error.message });
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
