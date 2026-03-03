import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma.mjs"
import { getAuthSession } from "@/lib/auth.mjs"
import { ensureProgramRecord } from "@/lib/programs.mjs"
import { consumeRateLimit } from "@/lib/rate-limit.mjs"
import { getRequestId, logError, logInfo } from "@/lib/logger.mjs"
import {
  isPayloadTooLarge,
  validateApplicationPayload,
} from "@/lib/validation.mjs"

const BLOCKING_STATUSES = new Set([
  "SUBMITTED",
  "UNDER_REVIEW",
  "ACCEPTED",
  "ENROLLED",
])

export async function GET(request) {
  const requestId = getRequestId(request)
  const session = await getAuthSession()
  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401, headers: { "x-request-id": requestId } },
    )
  }

  try {
    const applications = await prisma.application.findMany({
      where: { applicantId: session.user.id },
      include: {
        program: {
          select: {
            slug: true,
            title: true,
          },
        },
        reviews: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: {
            decision: true,
            score: true,
            notes: true,
            createdAt: true,
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    })

    return NextResponse.json(
      { ok: true, applications },
      { headers: { "x-request-id": requestId } },
    )
  } catch (error) {
    logError("applications_list_failed", error, {
      requestId,
      userId: session.user.id,
    })
    return NextResponse.json(
      { error: "Unable to load applications right now." },
      { status: 500, headers: { "x-request-id": requestId } },
    )
  }
}

export async function POST(request) {
  const requestId = getRequestId(request)
  const session = await getAuthSession()
  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401, headers: { "x-request-id": requestId } },
    )
  }

  const rl = consumeRateLimit(request, { limit: 6, windowMs: 5 * 60_000 })
  const headers = {
    "x-request-id": requestId,
    "x-ratelimit-remaining": String(rl.remaining),
    "x-ratelimit-reset": String(Math.ceil(rl.resetAt / 1000)),
  }

  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many application attempts. Please retry in a few minutes." },
      { status: 429, headers: { ...headers, "retry-after": "300" } },
    )
  }

  if (isPayloadTooLarge(request, 30_000)) {
    return NextResponse.json(
      { error: "Payload too large." },
      { status: 413, headers },
    )
  }

  try {
    const body = await request.json()
    const validation = validateApplicationPayload(body)
    if (!validation.ok) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400, headers },
      )
    }

    const applicant = session.user
    const payload = validation.data

    const program = await ensureProgramRecord(payload.programSlug)
    if (!program) {
      return NextResponse.json(
        { error: "Selected program is not available." },
        { status: 404, headers },
      )
    }

    if (program.isOpen === false) {
      return NextResponse.json(
        { error: "This program is currently not accepting applications." },
        { status: 400, headers },
      )
    }

    const existing = await prisma.application.findFirst({
      where: {
        applicantId: applicant.id,
        programId: program.id,
      },
      select: {
        id: true,
        status: true,
      },
    })

    if (existing && BLOCKING_STATUSES.has(existing.status)) {
      return NextResponse.json(
        {
          error:
            "You already have an active application for this program. Track updates in your portal.",
        },
        { status: 409, headers },
      )
    }

    const data = {
      status: "SUBMITTED",
      fullName: payload.fullName,
      email: applicant.email || payload.email,
      phone: payload.phone || null,
      country: payload.country || null,
      currentRole: payload.currentRole || null,
      experienceLevel: payload.experienceLevel,
      motivation: payload.motivation,
      goals: payload.goals || null,
      availability: payload.availability || null,
      linkedinUrl: payload.linkedinUrl || null,
      portfolioUrl: payload.portfolioUrl || null,
      answers: {
        submittedVia: "program-application-form",
      },
      submittedAt: new Date(),
      decisionAt: null,
    }

    const application = existing
      ? await prisma.application.update({
          where: { id: existing.id },
          data,
          select: { id: true, status: true, programId: true },
        })
      : await prisma.application.create({
          data: {
            applicantId: applicant.id,
            programId: program.id,
            ...data,
          },
          select: { id: true, status: true, programId: true },
        })

    logInfo("application_submit_success", {
      requestId,
      userId: applicant.id,
      applicationId: application.id,
      programSlug: program.slug,
      createdNew: !existing,
    })

    return NextResponse.json(
      {
        ok: true,
        application: {
          id: application.id,
          status: application.status,
          program: {
            slug: program.slug,
            title: program.title,
          },
        },
      },
      { status: existing ? 200 : 201, headers },
    )
  } catch (error) {
    logError("application_submit_failed", error, {
      requestId,
      userId: session.user.id,
    })
    return NextResponse.json(
      { error: "Unable to submit application right now. Please try again." },
      { status: 500, headers },
    )
  }
}

