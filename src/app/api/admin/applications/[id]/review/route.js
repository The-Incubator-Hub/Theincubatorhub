import { NextResponse } from "next/server";
import prisma from "@/lib/prisma.mjs";
import { getAuthSession } from "@/lib/auth.mjs";
import { logInfo, logError, getRequestId, createAuditLog } from "@/lib/logger.mjs";
import { sendApplicationStatusEmail } from "@/lib/email.mjs";

const VALID_STATUSES = ["PENDING", "UNDER_REVIEW", "ACCEPTED", "REJECTED", "WITHDRAWN"];

export async function POST(request, { params }) {
  const requestId = getRequestId();

  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden." }, { status: 403 });

    const { id } = await params;
    const body = await request.json();
    const { status, reviewNotes } = body;

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status value." }, { status: 400 });
    }

    const application = await prisma.application.findUnique({
      where: { id },
      include: { user: true, program: true },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found." }, { status: 404 });
    }

    const previousStatus = application.status;

    const updated = await prisma.application.update({
      where: { id },
      data: {
        status,
        reviewNotes: reviewNotes || null,
        reviewedBy: session.user.id,
        reviewedAt: new Date(),
      },
      include: { user: true, program: true },
    });

    // Send email notification on status changes that matter
    if (status !== previousStatus && ["ACCEPTED", "REJECTED", "UNDER_REVIEW"].includes(status)) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      sendApplicationStatusEmail({
        to: updated.user.email,
        name: updated.user.name,
        programTitle: updated.program?.title || "the program",
        status,
        portalUrl: `${baseUrl}/portal/dashboard`,
      }).catch((e) =>
        logError("[review] Failed to send status email", { requestId, error: e.message })
      );
    }

    await createAuditLog({
      userId: session.user.id,
      action: "APPLICATION_REVIEWED",
      resource: "Application",
      resourceId: id,
      details: { previousStatus, newStatus: status, reviewNotes },
      ipAddress: request.headers.get("x-forwarded-for") || undefined,
    });

    logInfo("[admin/review] Application reviewed", { requestId, applicationId: id, status, adminId: session.user.id });

    return NextResponse.json({ ok: true, data: updated });
  } catch (error) {
    logError("[admin/review] Error", { requestId, error: error.message });
    return NextResponse.json({ error: "Failed to review application." }, { status: 500 });
  }
}
