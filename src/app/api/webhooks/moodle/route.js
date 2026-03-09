import { NextResponse } from "next/server";
import prisma from "@/lib/prisma.mjs";
import { verifyMoodleSignature } from "@/lib/moodle.mjs";
import { logInfo, logError, getRequestId, createAuditLog } from "@/lib/logger.mjs";

export async function POST(request) {
  const requestId = getRequestId();

  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-incubator-signature");

    // Verify webhook signature
    if (!verifyMoodleSignature(rawBody, signature)) {
      logError("[moodle-webhook] Invalid signature", { requestId });
      return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
    }

    let payload;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    const { event, data } = payload;

    if (!event || !data) {
      return NextResponse.json({ error: "Missing event or data." }, { status: 400 });
    }

    const validEvents = ["enrollment.progress", "enrollment.completed", "enrollment.grade"];
    if (!validEvents.includes(event)) {
      return NextResponse.json({ ok: true, message: "Event ignored." });
    }

    // Find the enrollment
    let enrollment = null;

    if (data.applicationId) {
      enrollment = await prisma.enrollment.findUnique({
        where: { applicationId: data.applicationId },
      });
    } else if (data.moodleUserId && data.moodleCourseId) {
      enrollment = await prisma.enrollment.findFirst({
        where: {
          moodleUserId: String(data.moodleUserId),
          moodleCourseId: String(data.moodleCourseId),
        },
      });
    }

    if (!enrollment) {
      logError("[moodle-webhook] Enrollment not found", { requestId, event, data });
      return NextResponse.json({ error: "Enrollment not found." }, { status: 404 });
    }

    const updateData = { lastSyncedAt: new Date() };

    switch (event) {
      case "enrollment.progress":
        if (typeof data.progress === "number") {
          updateData.progress = Math.min(100, Math.max(0, Math.round(data.progress)));
        }
        if (data.moodleUserId) updateData.moodleUserId = String(data.moodleUserId);
        if (data.moodleCourseId) updateData.moodleCourseId = String(data.moodleCourseId);
        break;

      case "enrollment.completed":
        updateData.status = "COMPLETED";
        updateData.progress = 100;
        updateData.completedAt = data.completedAt ? new Date(data.completedAt) : new Date();
        if (data.certificateUrl) updateData.certificateUrl = data.certificateUrl;
        break;

      case "enrollment.grade":
        if (data.grade) updateData.grade = String(data.grade);
        break;
    }

    await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: updateData,
    });

    await createAuditLog({
      action: `MOODLE_WEBHOOK_${event.toUpperCase().replace(".", "_")}`,
      resource: "Enrollment",
      resourceId: enrollment.id,
      details: { event, data },
    });

    logInfo("[moodle-webhook] Event processed", { requestId, event, enrollmentId: enrollment.id });

    return NextResponse.json({ ok: true });
  } catch (error) {
    logError("[moodle-webhook] Error", { requestId, error: error.message });
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
