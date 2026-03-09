import { NextResponse } from "next/server";
import prisma from "@/lib/prisma.mjs";
import { getAuthSession } from "@/lib/auth.mjs";
import { logInfo, logError, getRequestId } from "@/lib/logger.mjs";

export async function GET(request) {
  const requestId = getRequestId();

  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden." }, { status: 403 });

    const { searchParams } = new URL(request.url);
    const programId = searchParams.get("programId");

    const where = programId ? { programId } : {};

    const cohorts = await prisma.cohort.findMany({
      where,
      include: {
        program: { select: { title: true, slug: true } },
        _count: { select: { enrollments: true } },
      },
      orderBy: [{ isActive: "desc" }, { startDate: "desc" }],
    });

    return NextResponse.json({ ok: true, data: cohorts });
  } catch (error) {
    logError("[admin/cohorts GET] Error", { requestId, error: error.message });
    return NextResponse.json({ error: "Failed to load cohorts." }, { status: 500 });
  }
}

export async function POST(request) {
  const requestId = getRequestId();

  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden." }, { status: 403 });

    const body = await request.json();
    const { programId, name, description, startDate, endDate, maxStudents, isActive } = body;

    if (!programId || !name || !startDate) {
      return NextResponse.json({ error: "programId, name, and startDate are required." }, { status: 400 });
    }

    // Verify program exists
    const program = await prisma.program.findUnique({ where: { id: programId } });
    if (!program) {
      return NextResponse.json({ error: "Program not found." }, { status: 404 });
    }

    const cohort = await prisma.cohort.create({
      data: {
        programId,
        name: name.trim(),
        description: description?.trim() || null,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        maxStudents: maxStudents ? parseInt(maxStudents) : 50,
        isActive: isActive !== false,
      },
      include: {
        program: { select: { title: true } },
        _count: { select: { enrollments: true } },
      },
    });

    logInfo("[admin/cohorts POST] Cohort created", { requestId, cohortId: cohort.id, adminId: session.user.id });

    return NextResponse.json({ ok: true, data: cohort }, { status: 201 });
  } catch (error) {
    logError("[admin/cohorts POST] Error", { requestId, error: error.message });
    return NextResponse.json({ error: "Failed to create cohort." }, { status: 500 });
  }
}
