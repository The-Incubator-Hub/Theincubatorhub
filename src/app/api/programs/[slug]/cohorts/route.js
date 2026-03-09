import { NextResponse } from "next/server";
import prisma from "@/lib/prisma.mjs";
import { logError, getRequestId } from "@/lib/logger.mjs";

export async function GET(request, { params }) {
  const requestId = getRequestId();

  try {
    const { slug } = await params;

    const program = await prisma.program.findUnique({
      where: { slug },
    });

    if (!program) {
      return NextResponse.json({ error: "Program not found." }, { status: 404 });
    }

    const cohorts = await prisma.cohort.findMany({
      where: {
        programId: program.id,
        isActive: true,
      },
      include: {
        _count: { select: { enrollments: true } },
      },
      orderBy: { startDate: "asc" },
    });

    const cohortsWithSeats = cohorts.map((c) => ({
      id: c.id,
      name: c.name,
      startDate: c.startDate,
      endDate: c.endDate,
      maxStudents: c.maxStudents,
      enrolledCount: c._count.enrollments,
      seatsRemaining: Math.max(0, c.maxStudents - c._count.enrollments),
    }));

    return NextResponse.json({ ok: true, data: cohortsWithSeats });
  } catch (error) {
    logError("[programs/cohorts GET] Error", { requestId, error: error.message });
    return NextResponse.json({ error: "Failed to load cohorts." }, { status: 500 });
  }
}
