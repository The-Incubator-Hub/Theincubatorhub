import { NextResponse } from "next/server";
import prisma from "@/lib/prisma.mjs";
import { getAuthSession } from "@/lib/auth.mjs";
import { logInfo, logError, getRequestId } from "@/lib/logger.mjs";

export async function PATCH(request, { params }) {
  const requestId = getRequestId();

  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden." }, { status: 403 });

    const { id } = await params;
    const body = await request.json();
    const updates = {};

    if (body.title !== undefined) updates.title = body.title.trim();
    if (body.body !== undefined) updates.body = body.body.trim();
    if (body.programId !== undefined) updates.programId = body.programId || null;
    if (body.cohortId !== undefined) updates.cohortId = body.cohortId || null;
    if (body.isPinned !== undefined) updates.isPinned = Boolean(body.isPinned);
    if (body.expiresAt !== undefined) updates.expiresAt = body.expiresAt ? new Date(body.expiresAt) : null;

    const announcement = await prisma.announcement.update({
      where: { id },
      data: updates,
    });

    logInfo("[admin/announcements PATCH]", { requestId, id, adminId: session.user.id });

    return NextResponse.json({ ok: true, data: announcement });
  } catch (error) {
    logError("[admin/announcements/:id PATCH] Error", { requestId, error: error.message });
    return NextResponse.json({ error: "Failed to update announcement." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const requestId = getRequestId();

  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden." }, { status: 403 });

    const { id } = await params;

    await prisma.announcement.delete({ where: { id } });

    logInfo("[admin/announcements DELETE]", { requestId, id, adminId: session.user.id });

    return NextResponse.json({ ok: true });
  } catch (error) {
    logError("[admin/announcements/:id DELETE] Error", { requestId, error: error.message });
    return NextResponse.json({ error: "Failed to delete announcement." }, { status: 500 });
  }
}
