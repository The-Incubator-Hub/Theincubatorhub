import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma.mjs";
import { consumeRateLimit } from "@/lib/rate-limit.mjs";
import { validatePassword, getPasswordStrengthMessage } from "@/lib/validation.mjs";
import { logInfo, logError, getRequestId } from "@/lib/logger.mjs";
import { invalidateAllSessions } from "@/lib/auth.mjs";

export async function POST(request) {
  const requestId = getRequestId();

  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const rl = consumeRateLimit(`reset-password:${ip}`, 10, 60_000);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    const body = await request.json();
    const { token, password } = body;

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Invalid or missing reset token." }, { status: 400 });
    }

    if (!validatePassword(password)) {
      const msg = getPasswordStrengthMessage(password);
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    // Find the token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetToken) {
      return NextResponse.json({ error: "Invalid or expired reset token." }, { status: 400 });
    }

    if (resetToken.usedAt) {
      return NextResponse.json({ error: "This reset link has already been used." }, { status: 400 });
    }

    if (resetToken.expiresAt < new Date()) {
      return NextResponse.json({ error: "This reset link has expired. Please request a new one." }, { status: 400 });
    }

    // Hash the new password
    const passwordHash = await bcrypt.hash(password, 12);

    // Update user password and mark token as used
    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.userId },
        data: { passwordHash, tokenVersion: { increment: 1 } },
      }),
      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { usedAt: new Date() },
      }),
    ]);

    // Invalidate all existing sessions for security
    await invalidateAllSessions(resetToken.userId);

    logInfo("[reset-password] Password reset successful", { requestId, userId: resetToken.userId });

    return NextResponse.json({ ok: true, message: "Password reset successfully. You can now log in with your new password." });
  } catch (error) {
    logError("[reset-password] Unexpected error", { requestId, error: error.message });
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
