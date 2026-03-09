import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma.mjs";
import { logInfo, getRequestId } from "@/lib/logger.mjs";

export async function POST(request) {
  const requestId = getRequestId();

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    if (token) {
      await prisma.session.deleteMany({ where: { token } });
      logInfo("[logout] Session deleted", { requestId });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set("session_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    // Always clear the cookie even on error
    const response = NextResponse.json({ ok: true });
    response.cookies.set("session_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });
    return response;
  }
}
