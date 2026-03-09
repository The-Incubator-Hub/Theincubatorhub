import { NextResponse } from "next/server";
import prisma from "@/lib/prisma.mjs";
import { getAuthSession } from "@/lib/auth.mjs";
import { logError, getRequestId } from "@/lib/logger.mjs";

export async function GET(request) {
  const requestId = getRequestId();

  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden." }, { status: 403 });

    const now = new Date();
    const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);

    // Monthly application counts for last 12 months
    const applications = await prisma.application.findMany({
      where: { submittedAt: { gte: twelveMonthsAgo } },
      select: { submittedAt: true, status: true, programId: true },
    });

    // Build monthly data
    const monthlyMap = {};
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      monthlyMap[key] = {
        month: d.toLocaleString("en-NG", { month: "short", year: "2-digit" }),
        count: 0,
      };
    }

    for (const app of applications) {
      const d = new Date(app.submittedAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (monthlyMap[key]) monthlyMap[key].count++;
    }

    const monthlyApplications = Object.values(monthlyMap);

    // Status distribution
    const statusCounts = await prisma.application.groupBy({
      by: ["status"],
      _count: { status: true },
    });

    const statusDistribution = statusCounts.map((s) => ({
      name: s.status,
      value: s._count.status,
    }));

    // Program performance (enrollment counts per program)
    const programData = await prisma.program.findMany({
      where: { isActive: true },
      include: {
        _count: { select: { applications: true, enrollments: true } },
      },
    });

    const programPerformance = programData.map((p) => ({
      name: p.title.length > 20 ? p.title.substring(0, 20) + "…" : p.title,
      applications: p._count.applications,
      enrollments: p._count.enrollments,
    }));

    // Summary stats
    const [totalUsers, totalApplications, totalEnrollments, activeEnrollments] = await Promise.all([
      prisma.user.count(),
      prisma.application.count(),
      prisma.enrollment.count(),
      prisma.enrollment.count({ where: { status: "ACTIVE" } }),
    ]);

    return NextResponse.json({
      ok: true,
      data: {
        monthlyApplications,
        statusDistribution,
        programPerformance,
        summary: { totalUsers, totalApplications, totalEnrollments, activeEnrollments },
      },
    });
  } catch (error) {
    logError("[admin/analytics/charts] Error", { requestId, error: error.message });
    return NextResponse.json({ error: "Failed to load analytics." }, { status: 500 });
  }
}
