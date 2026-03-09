import { NextResponse } from "next/server";
import prisma from "@/lib/prisma.mjs";
import { getAuthSession } from "@/lib/auth.mjs";
import { logError, getRequestId } from "@/lib/logger.mjs";

export async function GET(request, { params }) {
  const requestId = getRequestId();

  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const { enrollmentId } = await params;

    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        user: { select: { name: true, email: true } },
        program: { select: { title: true, description: true } },
        cohort: { select: { name: true } },
      },
    });

    if (!enrollment) {
      return NextResponse.json({ error: "Enrollment not found." }, { status: 404 });
    }

    // Check ownership (admin can view any, student only their own)
    if (session.user.role !== "ADMIN" && enrollment.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    if (enrollment.status !== "COMPLETED") {
      return NextResponse.json({ error: "Certificate is only available for completed enrollments." }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      data: {
        id: enrollment.id,
        studentName: enrollment.user.name,
        programTitle: enrollment.program.title,
        cohortName: enrollment.cohort?.name,
        completedAt: enrollment.completedAt,
        certificateUrl: enrollment.certificateUrl,
      },
    });
  } catch (error) {
    logError("[certificates GET] Error", { requestId, error: error.message });
    return NextResponse.json({ error: "Failed to load certificate." }, { status: 500 });
  }
}
