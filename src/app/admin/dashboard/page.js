import { getAuthSession } from "@/lib/auth.mjs"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma.mjs"
import { listOpenPrograms } from "@/lib/programs.mjs"
import {
  APPLICATION_STATUSES,
  REVIEW_DECISION_STATUSES,
  getApplicationStatusLabel,
  getStatusTone,
} from "@/lib/application-status.mjs"
import { logError } from "@/lib/logger.mjs"
import { buildMetadata } from "@/lib/seo"
import SignOutButton from "@/components/auth/SignOutButton"

export const metadata = buildMetadata({
  title: "Admin Dashboard",
  description: "Incubator admissions administration dashboard.",
  path: "/admin/dashboard",
  noIndex: true,
})

export const dynamic = "force-dynamic"

function formatDate(value) {
  if (!value) return "N/A"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "N/A"
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

function getBadgeClass(status) {
  const tone = getStatusTone(status)
  if (tone === "green") return "bg-green-100 text-green-800"
  if (tone === "red") return "bg-red-100 text-red-800"
  if (tone === "amber") return "bg-amber-100 text-amber-800"
  if (tone === "blue") return "bg-blue-100 text-blue-800"
  return "bg-gray-100 text-gray-700"
}

function getLmsSyncBannerMessage(code) {
  if (code === "success") return "LMS sync completed successfully."
  if (code === "skipped") {
    return "LMS sync was skipped because no sync endpoint is configured."
  }
  if (code === "not-ready") {
    return "Only accepted or enrolled applications can be synced to LMS."
  }
  if (code === "missing") return "Selected application was not found."
  if (code === "invalid") return "Invalid LMS sync request."
  if (code === "failed") return "LMS sync failed. Check logs and configuration."
  return ""
}

function getNotificationBannerMessage(code) {
  if (code === "sent") return "Notification broadcast sent successfully."
  if (code === "empty") return "No matching recipients were found for this broadcast."
  if (code === "invalid") return "Invalid notification payload."
  if (code === "failed") return "Notification broadcast failed. Check logs and retry."
  return ""
}

function getLmsActionLabel(action) {
  if (action === "LMS_SYNC_SUCCESS") return "Successful"
  if (action === "LMS_SYNC_SKIPPED") return "Skipped"
  if (action === "LMS_SYNC_FAILED") return "Failed"
  return "Unknown"
}

function toPercent(numerator, denominator) {
  if (!denominator || denominator <= 0) return 0
  return Math.round((numerator / denominator) * 10000) / 100
}

export default async function AdminDashboardPage({ searchParams }) {
  const qs = await searchParams
  const session = await getAuthSession()
  const user = session?.user
  if (!user) {
    redirect("/login?callbackUrl=/admin/dashboard")
  }
  if (user.role !== "ADMIN") {
    redirect("/portal/dashboard")
  }

  const selectedStatusRaw = String(qs?.status || "").trim().toUpperCase()
  const selectedProgram = String(qs?.program || "").trim().toLowerCase()
  const lmsSyncCode = String(qs?.lmsSync || "").trim().toLowerCase()
  const notifCode = String(qs?.notif || "").trim().toLowerCase()
  const selectedStatus = APPLICATION_STATUSES.includes(selectedStatusRaw)
    ? selectedStatusRaw
    : ""

  const where = {}
  if (selectedStatus) {
    where.status = selectedStatus
  }
  if (selectedProgram) {
    where.program = { slug: selectedProgram }
  }

  let applications = []
  const latestLmsSyncByApplicationId = new Map()
  let recentAuditEntries = []
  let analyticsSummary = {
    total: 0,
    submitted: 0,
    underReview: 0,
    accepted: 0,
    rejected: 0,
    enrolled: 0,
    acceptanceRate: 0,
  }
  let programAnalytics = []

  try {
    const [filteredApplications, statusRows, programRows, positiveRows, auditRows] =
      await Promise.all([
        prisma.application.findMany({
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
          take: 200,
        }),
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
        prisma.auditLog.findMany({
          where: {
            action: {
              in: [
                "NOTIFICATION_BROADCAST",
                "LMS_SYNC_SUCCESS",
                "LMS_SYNC_SKIPPED",
                "LMS_SYNC_FAILED",
              ],
            },
          },
          include: {
            actor: {
              select: {
                email: true,
                name: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 15,
        }),
      ])

    applications = filteredApplications
    recentAuditEntries = auditRows

    const countsByStatus = statusRows.reduce((acc, row) => {
      acc[row.status] = row._count._all
      return acc
    }, {})

    const total = Object.values(countsByStatus).reduce((sum, count) => sum + count, 0)
    const acceptedPlusEnrolled =
      (countsByStatus.ACCEPTED || 0) + (countsByStatus.ENROLLED || 0)
    analyticsSummary = {
      total,
      submitted: countsByStatus.SUBMITTED || 0,
      underReview: countsByStatus.UNDER_REVIEW || 0,
      accepted: countsByStatus.ACCEPTED || 0,
      rejected: countsByStatus.REJECTED || 0,
      enrolled: countsByStatus.ENROLLED || 0,
      acceptanceRate: toPercent(acceptedPlusEnrolled, total),
    }

    const positiveByProgramId = positiveRows.reduce((acc, row) => {
      acc[row.programId] = row._count._all
      return acc
    }, {})

    const programIds = [...new Set(programRows.map((row) => row.programId))]
    const programRecords = programIds.length
      ? await prisma.program.findMany({
          where: { id: { in: programIds } },
          select: {
            id: true,
            slug: true,
            title: true,
          },
        })
      : []
    const programById = programRecords.reduce((acc, item) => {
      acc[item.id] = item
      return acc
    }, {})

    programAnalytics = programRows
      .map((row) => {
        const positive = positiveByProgramId[row.programId] || 0
        return {
          id: row.programId,
          title: programById[row.programId]?.title || "Unknown Program",
          slug: programById[row.programId]?.slug || "unknown",
          applications: row._count._all,
          acceptedOrEnrolled: positive,
          acceptanceRate: toPercent(positive, row._count._all),
        }
      })
      .sort((a, b) => b.applications - a.applications)

    const applicationIds = applications.map((application) => application.id)
    if (applicationIds.length > 0) {
      const lmsAuditRows = await prisma.auditLog.findMany({
        where: {
          entity: "Application",
          entityId: { in: applicationIds },
          action: {
            in: ["LMS_SYNC_SUCCESS", "LMS_SYNC_SKIPPED", "LMS_SYNC_FAILED"],
          },
        },
        orderBy: { createdAt: "desc" },
        take: applicationIds.length * 3,
      })

      for (const entry of lmsAuditRows) {
        if (!latestLmsSyncByApplicationId.has(entry.entityId)) {
          latestLmsSyncByApplicationId.set(entry.entityId, entry)
        }
      }
    }
  } catch (error) {
    logError("admin_dashboard_applications_load_failed", error, { adminId: user.id })
  }

  const openPrograms = await listOpenPrograms()
  const counters = applications.reduce((acc, application) => {
    const key = application.status || "DRAFT"
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})

  const redirectParams = new URLSearchParams()
  if (selectedStatus) redirectParams.set("status", selectedStatus)
  if (selectedProgram) redirectParams.set("program", selectedProgram)
  const redirectTo = redirectParams.size
    ? `/admin/dashboard?${redirectParams.toString()}`
    : "/admin/dashboard"
  const lmsSyncBannerMessage = getLmsSyncBannerMessage(lmsSyncCode)
  const notificationBannerMessage = getNotificationBannerMessage(notifCode)
  const exportHref = `/api/admin/applications/export${
    redirectParams.size ? `?${redirectParams.toString()}` : ""
  }`

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-24">
      <div className="mx-auto max-w-6xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Signed in as {user?.email} ({user?.role})
            </p>
          </div>
          <SignOutButton />
        </div>
        {lmsSyncBannerMessage ? (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {lmsSyncBannerMessage}
          </div>
        ) : null}
        {notificationBannerMessage ? (
          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
            {notificationBannerMessage}
          </div>
        ) : null}

        <section className="rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900">Admissions Analytics</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-lg border border-gray-200 p-3">
              <p className="text-xs text-gray-500">Total Applications</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {analyticsSummary.total}
              </p>
            </article>
            <article className="rounded-lg border border-gray-200 p-3">
              <p className="text-xs text-gray-500">Under Review</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {analyticsSummary.underReview}
              </p>
            </article>
            <article className="rounded-lg border border-gray-200 p-3">
              <p className="text-xs text-gray-500">Accepted + Enrolled</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {analyticsSummary.accepted + analyticsSummary.enrolled}
              </p>
            </article>
            <article className="rounded-lg border border-gray-200 p-3">
              <p className="text-xs text-gray-500">Acceptance Rate</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {analyticsSummary.acceptanceRate}%
              </p>
            </article>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {APPLICATION_STATUSES.map((status) => (
              <span
                key={status}
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getBadgeClass(status)}`}
              >
                {getApplicationStatusLabel(status)}: {counters[status] || 0}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900">Broadcast Notification</h2>
          <form
            method="post"
            action="/api/admin/notifications/broadcast"
            className="mt-4 grid gap-3 md:grid-cols-2"
          >
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Title</label>
              <input
                name="title"
                required
                maxLength={160}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="Important admissions update"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Link (optional)
              </label>
              <input
                name="link"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="/portal/dashboard"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-medium text-gray-600">Message</label>
              <textarea
                name="message"
                required
                rows={3}
                maxLength={2500}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Target Role</label>
              <select
                name="role"
                defaultValue=""
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="">All roles</option>
                <option value="APPLICANT">Applicants</option>
                <option value="STUDENT">Students</option>
                <option value="ADMIN">Admins</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Application Status Filter
              </label>
              <select
                name="applicationStatus"
                defaultValue=""
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="">No status filter</option>
                {APPLICATION_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {getApplicationStatusLabel(status)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Max Recipients
              </label>
              <input
                name="maxRecipients"
                defaultValue="1000"
                type="number"
                min={1}
                max={10000}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
              >
                Send Broadcast
              </button>
            </div>
          </form>
        </section>

        <section className="mt-6 rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900">Filter Queue</h2>
          <form method="get" className="mt-3 grid gap-3 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Status</label>
              <select
                name="status"
                defaultValue={selectedStatus}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="">All statuses</option>
                {APPLICATION_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {getApplicationStatusLabel(status)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Program</label>
              <select
                name="program"
                defaultValue={selectedProgram}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="">All programs</option>
                {openPrograms.map((program) => (
                  <option key={program.slug} value={program.slug}>
                    {program.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
              >
                Apply Filters
              </button>
              <a
                href="/admin/dashboard"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
              >
                Reset
              </a>
              <a
                href={exportHref}
                className="rounded-lg border border-blue-300 px-4 py-2 text-sm font-medium text-blue-700"
              >
                Export CSV
              </a>
            </div>
          </form>
        </section>

        <section className="mt-6 rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900">Program Performance</h2>
          {programAnalytics.length === 0 ? (
            <p className="mt-3 text-sm text-gray-600">No program analytics available yet.</p>
          ) : (
            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-xs uppercase text-gray-500">
                    <th className="px-2 py-2">Program</th>
                    <th className="px-2 py-2">Applications</th>
                    <th className="px-2 py-2">Accepted + Enrolled</th>
                    <th className="px-2 py-2">Acceptance Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {programAnalytics.slice(0, 10).map((row) => (
                    <tr key={row.id} className="border-b border-gray-100">
                      <td className="px-2 py-2 font-medium text-gray-900">{row.title}</td>
                      <td className="px-2 py-2 text-gray-700">{row.applications}</td>
                      <td className="px-2 py-2 text-gray-700">{row.acceptedOrEnrolled}</td>
                      <td className="px-2 py-2 text-gray-700">{row.acceptanceRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mt-6 rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900">Application Review Queue</h2>

          {applications.length === 0 ? (
            <p className="mt-3 text-sm text-gray-600">No applications found for this filter.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {applications.map((application) => {
                const latestReview = application.reviews?.[0] || null
                const latestLmsSync = latestLmsSyncByApplicationId.get(application.id) || null
                return (
                  <article
                    key={application.id}
                    className="rounded-xl border border-gray-200 p-4"
                  >
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-1">
                        <h3 className="text-base font-semibold text-gray-900">
                          {application.program?.title || "Program"}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Applicant: {application.fullName} ({application.email})
                        </p>
                        <p className="text-xs text-gray-500">
                          Submitted: {formatDate(application.submittedAt || application.createdAt)}
                        </p>
                        <p className="text-xs text-gray-500">
                          Experience: {application.experienceLevel || "N/A"}
                          {application.currentRole ? ` | Role: ${application.currentRole}` : ""}
                          {application.country ? ` | Country: ${application.country}` : ""}
                        </p>
                        {application.motivation ? (
                          <p className="mt-2 text-sm text-gray-700">
                            <span className="font-medium">Motivation:</span>{" "}
                            {application.motivation}
                          </p>
                        ) : null}
                      </div>
                      <span
                        className={`inline-flex h-fit rounded-full px-2.5 py-1 text-xs font-medium ${getBadgeClass(application.status)}`}
                      >
                        {getApplicationStatusLabel(application.status)}
                      </span>
                    </div>

                    {latestReview ? (
                      <div className="mt-3 rounded-md bg-gray-50 p-3 text-sm text-gray-700">
                        <p>
                          Latest review on {formatDate(latestReview.createdAt)}:
                          {" "}
                          {getApplicationStatusLabel(latestReview.decision || application.status)}
                          {typeof latestReview.score === "number"
                            ? ` (Score: ${latestReview.score}/100)`
                            : ""}
                        </p>
                        {latestReview.notes ? <p className="mt-1">{latestReview.notes}</p> : null}
                      </div>
                    ) : null}

                    <form
                      action={`/api/admin/applications/${application.id}/review`}
                      method="post"
                      className="mt-4 grid gap-3 rounded-lg border border-gray-200 p-3 md:grid-cols-4"
                    >
                      <input type="hidden" name="redirectTo" value={redirectTo} />
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                          Decision
                        </label>
                        <select
                          name="decision"
                          defaultValue={application.status}
                          className="w-full rounded-lg border border-gray-300 px-2 py-2 text-sm"
                        >
                          {REVIEW_DECISION_STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {getApplicationStatusLabel(status)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                          Score (0-100)
                        </label>
                        <input
                          type="number"
                          name="score"
                          min={0}
                          max={100}
                          defaultValue={
                            typeof latestReview?.score === "number"
                              ? latestReview.score
                              : ""
                          }
                          className="w-full rounded-lg border border-gray-300 px-2 py-2 text-sm"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                          Notes
                        </label>
                        <textarea
                          name="notes"
                          rows={2}
                          defaultValue={latestReview?.notes || ""}
                          className="w-full rounded-lg border border-gray-300 px-2 py-2 text-sm"
                        />
                      </div>
                      <div className="md:col-span-4">
                        <button
                          type="submit"
                          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
                        >
                          Save Review
                        </button>
                      </div>
                    </form>

                    {application.status === "ACCEPTED" || application.status === "ENROLLED" ? (
                      <form
                        action="/api/admin/lms/sync"
                        method="post"
                        className="mt-3 flex flex-wrap items-center gap-3 rounded-lg border border-gray-200 p-3"
                      >
                        <input type="hidden" name="applicationId" value={application.id} />
                        <input type="hidden" name="redirectTo" value={redirectTo} />
                        <input
                          type="hidden"
                          name="autoEnroll"
                          value={application.status === "ACCEPTED" ? "1" : "0"}
                        />
                        <button
                          type="submit"
                          className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
                        >
                          {application.status === "ACCEPTED"
                            ? "Sync To LMS + Mark Enrolled"
                            : "Sync To LMS"}
                        </button>
                        {latestLmsSync ? (
                          <span className="text-xs text-gray-600">
                            Last LMS sync: {getLmsActionLabel(latestLmsSync.action)} on{" "}
                            {formatDate(latestLmsSync.createdAt)}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-500">
                            No LMS sync has been recorded for this application.
                          </span>
                        )}
                      </form>
                    ) : null}
                  </article>
                )
              })}
            </div>
          )}
        </section>

        <section className="mt-6 rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900">Recent Operations Audit</h2>
          {recentAuditEntries.length === 0 ? (
            <p className="mt-3 text-sm text-gray-600">No audit events yet.</p>
          ) : (
            <div className="mt-3 space-y-2">
              {recentAuditEntries.map((entry) => (
                <article
                  key={entry.id}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-3"
                >
                  <p className="text-sm font-medium text-gray-900">{entry.action}</p>
                  <p className="mt-1 text-xs text-gray-600">
                    Entity: {entry.entity} ({entry.entityId}) | Actor:{" "}
                    {entry.actor?.email || entry.actor?.name || "system"} | Date:{" "}
                    {formatDate(entry.createdAt)}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

