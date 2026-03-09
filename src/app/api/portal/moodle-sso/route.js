import { NextResponse } from "next/server";
import prisma from "@/lib/prisma.mjs";
import { getAuthSession } from "@/lib/auth.mjs";
import { generateMoodleSsoUrl } from "@/lib/moodle.mjs";
import { logInfo, logError, getRequestId } from "@/lib/logger.mjs";

export async function GET(request) {
  const requestId = getRequestId();

  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const { searchParams } = new URL(request.url);
    const enrollmentId = searchParams.get("enrollmentId");

    if (!enrollmentId) {
      return NextResponse.redirect(new URL("/portal/courses", request.url));
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
    });

    if (!enrollment || enrollment.userId !== session.user.id) {
      return NextResponse.redirect(new URL("/portal/courses", request.url));
    }

    if (!enrollment.moodleCourseId || !enrollment.moodleUserId) {
      // Moodle not configured for this enrollment, redirect to portal
      return NextResponse.redirect(new URL("/portal/courses", request.url));
    }

    const ssoUrl = generateMoodleSsoUrl(enrollment.moodleUserId, enrollment.moodleCourseId);

    if (!ssoUrl) {
      return NextResponse.redirect(new URL("/portal/courses", request.url));
    }

    logInfo("[moodle-sso] SSO launch", { requestId, enrollmentId, userId: session.user.id });

    return NextResponse.redirect(ssoUrl);
  } catch (error) {
    logError("[moodle-sso] Error", { requestId, error: error.message });
    return NextResponse.redirect(new URL("/portal/courses", request.url));
  }
}
