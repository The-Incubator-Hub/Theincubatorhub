import { NextResponse } from "next/server";
import prisma from "@/lib/prisma.mjs";
import { logError, getRequestId } from "@/lib/logger.mjs";

export async function GET(request) {
  const requestId = getRequestId();

  try {
    const { searchParams } = new URL(request.url);
    const programId = searchParams.get("programId");
    const cohortId = searchParams.get("cohortId");
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);

    const where = {
      AND: [
        {
          OR: [
            { expiresAt: null },
            { expiresAt: { gt: new Date() } },
          ],
        },
      ],
    };

    if (programId || cohortId) {
      where.AND.push({
        OR: [
          { programId: null, cohortId: null },
          ...(programId ? [{ programId }] : []),
          ...(cohortId ? [{ cohortId }] : []),
        ],
      });
    }

    const announcements = await prisma.announcement.findMany({
      where,
      include: {
        author: { select: { name: true } },
        program: { select: { title: true, slug: true } },
        cohort: { select: { name: true } },
      },
      orderBy: [{ isPinned: "desc" }, { publishedAt: "desc" }],
      take: limit,
    });

    return NextResponse.json({ ok: true, data: announcements });
  } catch (error) {
    logError("[announcements GET] Error", { requestId, error: error.message });
    return NextResponse.json({ error: "Failed to load announcements." }, { status: 500 });
  }
}
