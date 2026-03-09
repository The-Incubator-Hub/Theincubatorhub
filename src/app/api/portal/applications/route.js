import { NextResponse } from "next/server";
import prisma from "@/lib/prisma.mjs";
import { getAuthSession } from "@/lib/auth.mjs";
import { consumeRateLimit } from "@/lib/rate-limit.mjs";
import { logInfo, logError, getRequestId } from "@/lib/logger.mjs";

export async function GET(request) {
  const requestId = getRequestId();
  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

    const applications = await prisma.application.findMany({
      where: { userId: session.user.id },
      include: { program: { select: { title: true, slug: true } } },
      orderBy: { submittedAt: "desc" },
    });

    return NextResponse.json({ ok: true, data: applications });
  } catch (error) {
    logError("[portal/applications GET] Error", { requestId, error: error.message });
    return NextResponse.json({ error: "Failed to load applications." }, { status: 500 });
  }
}

export async function POST(request) {
  const requestId = getRequestId();

  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

    const rl = consumeRateLimit(`apply:${session.user.id}`, 5, 60_000);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait before submitting another application." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    const body = await request.json();
    const { programSlug, formData, cvUrl } = body;

    if (!programSlug) {
      return NextResponse.json({ error: "Program is required." }, { status: 400 });
    }

    // Find program in DB, create if not exists (sync from content)
    let program = await prisma.program.findUnique({ where: { slug: programSlug } });

    if (!program) {
      // Try to sync from content JSON
      try {
        const { readFileSync } = await import("node:fs");
        const { join } = await import("node:path");
        const contentPath = join(process.cwd(), "content", "program-pages", `${programSlug}.json`);
        const content = JSON.parse(readFileSync(contentPath, "utf-8"));
        program = await prisma.program.create({
          data: {
            slug: programSlug,
            title: content.title || programSlug,
            description: content.programHeader?.description || null,
          },
        });
      } catch {
        return NextResponse.json({ error: "Program not found." }, { status: 404 });
      }
    }

    // Check for existing application to same program
    const existing = await prisma.application.findFirst({
      where: {
        userId: session.user.id,
        programId: program.id,
        status: { notIn: ["WITHDRAWN", "REJECTED"] },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You already have an active application for this program." },
        { status: 409 }
      );
    }

    const application = await prisma.application.create({
      data: {
        userId: session.user.id,
        programId: program.id,
        formData: formData || {},
        cvUrl: cvUrl || null,
      },
      include: { program: { select: { title: true } } },
    });

    logInfo("[portal/applications POST] Application submitted", { requestId, applicationId: application.id, userId: session.user.id });

    return NextResponse.json({ ok: true, data: application }, { status: 201 });
  } catch (error) {
    logError("[portal/applications POST] Error", { requestId, error: error.message });
    return NextResponse.json({ error: "Failed to submit application." }, { status: 500 });
  }
}
