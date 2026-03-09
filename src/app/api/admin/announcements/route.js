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

    const announcements = await prisma.announcement.findMany({
      include: {
        author: { select: { name: true } },
        program: { select: { title: true, slug: true } },
        cohort: { select: { name: true } },
      },
      orderBy: [{ isPinned: "desc" }, { publishedAt: "desc" }],
    });

    return NextResponse.json({ ok: true, data: announcements });
  } catch (error) {
    logError("[admin/announcements GET] Error", { requestId, error: error.message });
    return NextResponse.json({ error: "Failed to load announcements." }, { status: 500 });
  }
}

export async function POST(request) {
  const requestId = getRequestId();

  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden." }, { status: 403 });

    const body = await request.json();
    const { title, body: announcementBody, programId, cohortId, isPinned, expiresAt } = body;

    if (!title || typeof title !== "string" || title.trim().length < 3) {
      return NextResponse.json({ error: "Title must be at least 3 characters." }, { status: 400 });
    }

    if (!announcementBody || typeof announcementBody !== "string" || announcementBody.trim().length < 10) {
      return NextResponse.json({ error: "Body must be at least 10 characters." }, { status: 400 });
    }

    const announcement = await prisma.announcement.create({
      data: {
        authorId: session.user.id,
        title: title.trim(),
        body: announcementBody.trim(),
        programId: programId || null,
        cohortId: cohortId || null,
        isPinned: Boolean(isPinned),
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
      include: {
        author: { select: { name: true } },
        program: { select: { title: true } },
        cohort: { select: { name: true } },
      },
    });

    logInfo("[admin/announcements POST] Announcement created", { requestId, id: announcement.id, adminId: session.user.id });

    return NextResponse.json({ ok: true, data: announcement }, { status: 201 });
  } catch (error) {
    logError("[admin/announcements POST] Error", { requestId, error: error.message });
    return NextResponse.json({ error: "Failed to create announcement." }, { status: 500 });
  }
}
