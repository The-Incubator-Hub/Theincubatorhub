import { NextResponse } from "next/server"
import { getAuthSession } from "@/lib/auth.mjs"
import { prisma } from "@/lib/prisma.mjs"
import { createMoodleLaunchUrl, isMoodleLaunchConfigured } from "@/lib/moodle.mjs"
import { getRequestId, logError, logInfo } from "@/lib/logger.mjs"
import { toAbsoluteUrl } from "@/lib/seo"

const LMS_LAUNCH_ALLOWED_STATUSES = new Set(["ACCEPTED", "ENROLLED"])

function portalPathWithState(state) {
  return `/portal/dashboard?lms=${encodeURIComponent(state)}`
}

export async function GET(request, { params }) {
  const requestId = getRequestId(request)
  const { applicationId } = await params
  const normalizedApplicationId = String(applicationId || "").trim()

  if (!normalizedApplicationId) {
    return NextResponse.redirect(
      new URL(portalPathWithState("invalid"), request.url),
      303,
    )
  }

  const session = await getAuthSession()
  if (!session?.user) {
    const callbackUrl = request.nextUrl.pathname
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, request.url),
      303,
    )
  }

  try {
    const application = await prisma.application.findUnique({
      where: { id: normalizedApplicationId },
      include: {
        program: {
          select: {
            slug: true,
            title: true,
          },
        },
      },
    })

    if (!application || application.applicantId !== session.user.id) {
      return NextResponse.redirect(
        new URL(portalPathWithState("invalid"), request.url),
        303,
      )
    }

    if (!LMS_LAUNCH_ALLOWED_STATUSES.has(application.status)) {
      return NextResponse.redirect(
        new URL(portalPathWithState("not-ready"), request.url),
        303,
      )
    }

    if (!isMoodleLaunchConfigured()) {
      return NextResponse.redirect(
        new URL(portalPathWithState("not-configured"), request.url),
        303,
      )
    }

    const launchUrl = await createMoodleLaunchUrl({
      sub: session.user.id,
      email: session.user.email || application.email,
      name: session.user.name || application.fullName,
      role: "student",
      applicationId: application.id,
      programSlug: application.program?.slug || "",
      programTitle: application.program?.title || "",
      returnUrl: toAbsoluteUrl("/portal/dashboard"),
    })

    if (!launchUrl) {
      return NextResponse.redirect(
        new URL(portalPathWithState("not-configured"), request.url),
        303,
      )
    }

    logInfo("moodle_launch_redirect", {
      requestId,
      userId: session.user.id,
      applicationId: application.id,
      programSlug: application.program?.slug || "",
    })

    return NextResponse.redirect(new URL(launchUrl), 302)
  } catch (error) {
    logError("moodle_launch_failed", error, {
      requestId,
      userId: session.user.id,
      applicationId: normalizedApplicationId,
    })
    return NextResponse.redirect(
      new URL(portalPathWithState("failed"), request.url),
      303,
    )
  }
}

