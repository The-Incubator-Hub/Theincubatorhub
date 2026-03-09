import { cookies } from "next/headers";
import prisma from "@/lib/prisma.mjs";

/**
 * Gets the authenticated session from the request cookie.
 * Returns { user } or null if not authenticated.
 */
export async function getAuthSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    if (!token) return null;

    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            emailVerified: true,
            phone: true,
            linkedinUrl: true,
            tokenVersion: true,
            createdAt: true,
          },
        },
      },
    });

    if (!session) return null;
    if (session.expiresAt < new Date()) {
      await prisma.session.delete({ where: { token } });
      return null;
    }
    if (!session.user.isActive) return null;

    return { user: session.user };
  } catch (error) {
    console.error("[auth] getAuthSession error:", error);
    return null;
  }
}

/**
 * Creates a session for a user. Returns the session token.
 */
export async function createSession(userId) {
  const { randomBytes } = await import("node:crypto");
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await prisma.session.create({
    data: { userId, token, expiresAt },
  });

  return token;
}

/**
 * Deletes all sessions for a user (logout all).
 */
export async function invalidateAllSessions(userId) {
  await prisma.session.deleteMany({ where: { userId } });
}
