import { NextResponse } from "next/server"
import { getAuthSession } from "@/lib/auth.mjs"
import { prisma } from "@/lib/prisma.mjs"
import { getRequestId, logError } from "@/lib/logger.mjs"

function toCountMap(rows) {
  return rows.reduce((acc, row) => {
    acc[row.status] = row._count._all
    return acc
  }, {})
}

export async function GET(request) {
  const requestId = getRequestId(request)
  const session = await getAuthSession()
  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401, headers: { "x-request-id": requestId } },
    )
  }
  if (session.user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Forbidden." },
      { status: 403, headers: { "x-request-id": requestId } },
    )
  }

  try {
    const [statusRows, programRows, positiveRows] = await Promise.all([
      prisma.application.groupBy({
        by: ["status"],
        _count: { _all: true },
      }),
      prisma.application.groupBy({
        by: ["programId"],
        _count: { _all: true },
      }),
      prisma.application.groupBy({
        by: ["programId"],
        where: { status: { in: ["ACCEPTED", "ENROLLED"] } },
        _count: { _all: true },
      }),
    ])

    const countsByStatus = toCountMap(statusRows)
    const total = Object.values(countsByStatus).reduce((sum, count) => sum + count, 0)
    const accepted = (countsByStatus.ACCEPTED || 0) + (countsByStatus.ENROLLED || 0)
    const acceptanceRate = total > 0 ? Math.round((accepted / total) * 10000) / 100 : 0

    const positiveMap = positiveRows.reduce((acc, row) => {
      acc[row.programId] = row._count._all
      return acc
    }, {})

    const programIds = [...new Set(programRows.map((row) => row.programId))]
    const programs = programIds.length
      ? await prisma.program.findMany({
          where: { id: { in: programIds } },
          select: { id: true, slug: true, title: true },
        })
      : []
    const programMap = programs.reduce((acc, program) => {
      acc[program.id] = program
      return acc
    }, {})

    const programsSummary = programRows
      .map((row) => {
        const positives = positiveMap[row.programId] || 0
        const rate =
          row._count._all > 0
            ? Math.round((positives / row._count._all) * 10000) / 100
            : 0
        return {
          id: row.programId,
          slug: programMap[row.programId]?.slug || "unknown",
          title: programMap[row.programId]?.title || "Unknown Program",
          applications: row._count._all,
          acceptedOrEnrolled: positives,
          acceptanceRate: rate,
        }
      })
      .sort((a, b) => b.applications - a.applications)

    return NextResponse.json(
      {
        ok: true,
        summary: {
          total,
          submitted: countsByStatus.SUBMITTED || 0,
          underReview: countsByStatus.UNDER_REVIEW || 0,
          accepted: countsByStatus.ACCEPTED || 0,
          rejected: countsByStatus.REJECTED || 0,
          enrolled: countsByStatus.ENROLLED || 0,
          acceptanceRate,
        },
        programs: programsSummary,
      },
      { headers: { "x-request-id": requestId } },
    )
  } catch (error) {
    logError("admin_analytics_summary_failed", error, { requestId })
    return NextResponse.json(
      { error: "Unable to load analytics summary right now." },
      { status: 500, headers: { "x-request-id": requestId } },
    )
  }
}

