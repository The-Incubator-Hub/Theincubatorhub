import { NextResponse } from "next/server";
import prisma from "@/lib/prisma.mjs";
import { getAuthSession } from "@/lib/auth.mjs";
import { logInfo, logError, getRequestId } from "@/lib/logger.mjs";

export async function GET(request, { params }) {
  const requestId = getRequestId();

  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden." }, { status: 403 });

    const { id } = await params;

    const cohort = await prisma.cohort.findUnique({
      where: { id },
      include: {
        program: { select: { title: true, slug: true } },
        enrollments: {
          include: {
            user: { select: { id: true, name: true, email: true } },
          },
          orderBy: { createdAt: "desc" },
        },
        _count: { select: { enrollments: true } },
      },
    });

    if (!cohort) return NextResponse.json({ error: "Cohort not found." }, { status: 404 });

    return NextResponse.json({ ok: true, data: cohort });
  } catch (error) {
    logError("[admin/cohorts/:id GET] Error", { requestId, error: error.message });
    return NextResponse.json({ error: "Failed to load cohort." }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const requestId = getRequestId();

  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden." }, { status: 403 });

    const { id } = await params;
    const body = await request.json();
    const updates = {};

    if (body.name !== undefined) updates.name = body.name.trim();
    if (body.description !== undefined) updates.description = body.description?.trim() || null;
    if (body.startDate !== undefined) updates.startDate = new Date(body.startDate);
    if (body.endDate !== undefined) updates.endDate = body.endDate ? new Date(body.endDate) : null;
    if (body.maxStudents !== undefined) updates.maxStudents = parseInt(body.maxStudents);
    if (body.isActive !== undefined) updates.isActive = Boolean(body.isActive);

    const cohort = await prisma.cohort.update({
      where: { id },
      data: updates,
    });

    logInfo("[admin/cohorts/:id PATCH]", { requestId, id, adminId: session.user.id });

    return NextResponse.json({ ok: true, data: cohort });
  } catch (error) {
    logError("[admin/cohorts/:id PATCH] Error", { requestId, error: error.message });
    return NextResponse.json({ error: "Failed to update cohort." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const requestId = getRequestId();

  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden." }, { status: 403 });

    const { id } = await params;

    // Check for enrollments
    const enrollmentCount = await prisma.enrollment.count({ where: { cohortId: id } });
    if (enrollmentCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete cohort with ${enrollmentCount} enrolled student(s). Remove students first.` },
        { status: 409 }
      );
    }

    await prisma.cohort.delete({ where: { id } });

    logInfo("[admin/cohorts/:id DELETE]", { requestId, id, adminId: session.user.id });

    return NextResponse.json({ ok: true });
  } catch (error) {
    logError("[admin/cohorts/:id DELETE] Error", { requestId, error: error.message });
    return NextResponse.json({ error: "Failed to delete cohort." }, { status: 500 });
  }
}
