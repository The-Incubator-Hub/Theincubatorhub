import { NextResponse } from "next/server"
import { getAuthSession } from "@/lib/auth.mjs"
import { prisma } from "@/lib/prisma.mjs"
import { getRequestId, logError, logInfo } from "@/lib/logger.mjs"

function toCsvCell(value) {
  const text = String(value ?? "")
  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`
  }
  return text
}

function toCsvRow(values) {
  return values.map((value) => toCsvCell(value)).join(",")
}

function formatDate(value) {
  if (!value) return ""
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  return date.toISOString()
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
    const { searchParams } = request.nextUrl
    const status = String(searchParams.get("status") || "").trim().toUpperCase()
    const program = String(searchParams.get("program") || "").trim().toLowerCase()

    const where = {}
    if (status) {
      where.status = status
    }
    if (program) {
      where.program = { slug: program }
    }

    const applications = await prisma.application.findMany({
      where,
      include: {
        applicant: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
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
      orderBy: [{ submittedAt: "desc" }, { createdAt: "desc" }],
      take: 5000,
    })

    const header = [
      "application_id",
      "status",
      "program_slug",
      "program_title",
      "applicant_id",
      "full_name",
      "email",
      "phone",
      "country",
      "current_role",
      "experience_level",
      "submitted_at",
      "decision_at",
      "latest_review_decision",
      "latest_review_score",
      "latest_review_date",
      "motivation",
      "goals",
      "availability",
      "linkedin_url",
      "portfolio_url",
      "created_at",
      "updated_at",
    ]

    const lines = [toCsvRow(header)]
    for (const application of applications) {
      const latestReview = application.reviews?.[0] || null
      lines.push(
        toCsvRow([
          application.id,
          application.status,
          application.program?.slug || "",
          application.program?.title || "",
          application.applicant?.id || "",
          application.fullName,
          application.email,
          application.phone || "",
          application.country || "",
          application.currentRole || "",
          application.experienceLevel || "",
          formatDate(application.submittedAt),
          formatDate(application.decisionAt),
          latestReview?.decision || "",
          typeof latestReview?.score === "number" ? latestReview.score : "",
          formatDate(latestReview?.createdAt),
          application.motivation || "",
          application.goals || "",
          application.availability || "",
          application.linkedinUrl || "",
          application.portfolioUrl || "",
          formatDate(application.createdAt),
          formatDate(application.updatedAt),
        ]),
      )
    }

    const csv = `${lines.join("\n")}\n`
    const dateStamp = new Date().toISOString().slice(0, 10)
    const fileName = `applications-${dateStamp}.csv`

    logInfo("admin_applications_export_success", {
      requestId,
      actorId: session.user.id,
      count: applications.length,
      statusFilter: status || "ALL",
      programFilter: program || "ALL",
    })

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "x-request-id": requestId,
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": `attachment; filename="${fileName}"`,
      },
    })
  } catch (error) {
    logError("admin_applications_export_failed", error, { requestId })
    return NextResponse.json(
      { error: "Unable to export applications right now." },
      { status: 500, headers: { "x-request-id": requestId } },
    )
  }
}

