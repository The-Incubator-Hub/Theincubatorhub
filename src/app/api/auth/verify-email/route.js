import { NextResponse } from "next/server";
import prisma from "@/lib/prisma.mjs";
import { logInfo, logError, getRequestId } from "@/lib/logger.mjs";

export async function GET(request) {
  const requestId = getRequestId();

  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(new URL("/login?verified=error&reason=missing_token", request.url));
    }

    const verifyToken = await prisma.emailVerificationToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!verifyToken) {
      return NextResponse.redirect(new URL("/login?verified=error&reason=invalid_token", request.url));
    }

    if (verifyToken.expiresAt < new Date()) {
      // Delete expired token
      await prisma.emailVerificationToken.delete({ where: { id: verifyToken.id } });
      return NextResponse.redirect(new URL("/login?verified=error&reason=expired", request.url));
    }

    // Mark email as verified and delete token
    await prisma.$transaction([
      prisma.user.update({
        where: { id: verifyToken.userId },
        data: { emailVerified: new Date() },
      }),
      prisma.emailVerificationToken.delete({ where: { id: verifyToken.id } }),
    ]);

    logInfo("[verify-email] Email verified", { requestId, userId: verifyToken.userId });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    return NextResponse.redirect(`${baseUrl}/login?verified=1`);
  } catch (error) {
    logError("[verify-email] Unexpected error", { requestId, error: error.message });
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    return NextResponse.redirect(`${baseUrl}/login?verified=error`);
  }
}
