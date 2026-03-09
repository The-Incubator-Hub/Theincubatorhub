import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import prisma from "@/lib/prisma.mjs";
import { getAuthSession } from "@/lib/auth.mjs";
import { consumeRateLimit } from "@/lib/rate-limit.mjs";
import { logInfo, logError, getRequestId } from "@/lib/logger.mjs";
import { sendVerificationEmail } from "@/lib/email.mjs";

export async function POST(request) {
  const requestId = getRequestId();

  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const { user } = session;

    if (user.emailVerified) {
      return NextResponse.json({ error: "Your email is already verified." }, { status: 400 });
    }

    // Rate limit: 3 per minute per user
    const rl = consumeRateLimit(`resend-verification:${user.id}`, 3, 60_000);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait before requesting another verification email." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    // Delete any existing tokens
    await prisma.emailVerificationToken.deleteMany({ where: { userId: user.id } });

    // Create new token
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.emailVerificationToken.create({
      data: { userId: user.id, token, expiresAt },
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const verifyUrl = `${baseUrl}/api/auth/verify-email?token=${token}`;

    sendVerificationEmail({ to: user.email, name: user.name, verifyUrl }).catch((e) =>
      logError("[resend-verification] Failed to send email", { requestId, error: e.message })
    );

    logInfo("[resend-verification] Verification email resent", { requestId, userId: user.id });

    return NextResponse.json({ ok: true, message: "Verification email sent. Please check your inbox." });
  } catch (error) {
    logError("[resend-verification] Unexpected error", { requestId, error: error.message });
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
