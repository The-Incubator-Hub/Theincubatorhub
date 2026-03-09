import { NextResponse } from "next/server";
import prisma from "@/lib/prisma.mjs";
import { getAuthSession } from "@/lib/auth.mjs";
import { logInfo, logError, getRequestId, createAuditLog } from "@/lib/logger.mjs";
import { sendCohortAssignmentEmail } from "@/lib/email.mjs";

export async function POST(request, { params }) {
  const requestId = getRequestId();

  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden." }, { status: 403 });

    const { id: cohortId } = await params;
    const body = await request.json();
    const { applicationId } = body;

    if (!applicationId) {
      return NextResponse.json({ error: "applicationId is required." }, { status: 400 });
    }

    // Load cohort
    const cohort = await prisma.cohort.findUnique({
      where: { id: cohortId },
      include: {
        program: true,
        _count: { select: { enrollments: true } },
      },
    });

    if (!cohort) return NextResponse.json({ error: "Cohort not found." }, { status: 404 });

    if (cohort._count.enrollments >= cohort.maxStudents) {
      return NextResponse.json({ error: "This cohort has reached its maximum student capacity." }, { status: 409 });
    }

    // Load application
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { user: true, program: true },
    });

    if (!application) return NextResponse.json({ error: "Application not found." }, { status: 404 });
    if (application.programId !== cohort.programId) {
      return NextResponse.json({ error: "Application program does not match cohort program." }, { status: 400 });
    }
    if (application.status !== "ACCEPTED") {
      return NextResponse.json({ error: "Application must be ACCEPTED before enrolling in a cohort." }, { status: 400 });
    }

    // Check for existing enrollment
    const existingEnrollment = await prisma.enrollment.findUnique({ where: { applicationId } });
    if (existingEnrollment) {
      // Update cohort assignment if already enrolled
      const updated = await prisma.enrollment.update({
        where: { id: existingEnrollment.id },
        data: { cohortId },
      });
      return NextResponse.json({ ok: true, data: updated });
    }

    // Create new enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        applicationId,
        userId: application.userId,
        programId: application.programId,
        cohortId,
        startDate: cohort.startDate,
      },
      include: { user: true, program: true, cohort: true },
    });

    // Send email notification
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    sendCohortAssignmentEmail({
      to: enrollment.user.email,
      name: enrollment.user.name,
      programTitle: enrollment.program?.title || "the program",
      cohortName: cohort.name,
      startDate: cohort.startDate,
      moodleUrl: process.env.MOODLE_BASE_URL || null,
    }).catch((e) => logError("[enroll] Failed to send email", { requestId, error: e.message }));

    await createAuditLog({
      userId: session.user.id,
      action: "STUDENT_ENROLLED",
      resource: "Enrollment",
      resourceId: enrollment.id,
      details: { cohortId, applicationId, studentId: application.userId },
      ipAddress: request.headers.get("x-forwarded-for") || undefined,
    });

    logInfo("[admin/cohorts/enroll] Student enrolled", { requestId, enrollmentId: enrollment.id, adminId: session.user.id });

    return NextResponse.json({ ok: true, data: enrollment }, { status: 201 });
  } catch (error) {
    logError("[admin/cohorts/enroll] Error", { requestId, error: error.message });
    return NextResponse.json({ error: "Failed to enroll student." }, { status: 500 });
  }
}
