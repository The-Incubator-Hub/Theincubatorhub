import Link from "next/link"
import { getAuthSession } from "@/lib/auth.mjs"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma.mjs"
import { listOpenPrograms } from "@/lib/programs.mjs"
import { getApplicationStatusLabel, getStatusTone } from "@/lib/application-status.mjs"
import { logError } from "@/lib/logger.mjs"
import { buildMetadata } from "@/lib/seo"
import SignOutButton from "@/components/auth/SignOutButton"

export const metadata = buildMetadata({
  title: "Applicant Dashboard",
  description: "Your Incubator portal dashboard.",
  path: "/portal/dashboard",
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

function getLmsMessage(code) {
  if (code === "not-ready") {
    return "LMS access is enabled after your application is accepted."
  }
  if (code === "not-configured") {
    return "LMS is not configured yet. Please contact support."
  }
  if (code === "failed") {
    return "Unable to open LMS right now. Please try again."
  }
  if (code === "invalid") {
    return "Invalid LMS launch request."
  }
  return ""
}

function getNotificationStateMessage(code) {
  if (code === "read") return "All notifications marked as read."
  if (code === "failed") return "Unable to update notifications right now."
  return ""
}

function getAuditActionLabel(action) {
  if (action === "LMS_SYNC_SUCCESS") return "LMS sync successful"
  if (action === "LMS_SYNC_SKIPPED") return "LMS sync skipped"
  if (action === "LMS_SYNC_FAILED") return "LMS sync failed"
  return action || "Update"
}

export default async function PortalDashboardPage({ searchParams }) {
  const qs = await searchParams
  const session = await getAuthSession()
  const user = session?.user
  if (!user) {
    redirect("/login?callbackUrl=/portal/dashboard")
  }

  let applications = []
  let notifications = []
  let unreadNotificationCount = 0
  const latestLmsAuditByApplicationId = new Map()
  try {
    const [apps, notifs, unreadCount] = await Promise.all([
      prisma.application.findMany({
        where: { applicantId: user.id },
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
      }),
      prisma.notification.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        take: 8,
      }),
      prisma.notification.count({
        where: { userId: user.id, readAt: null },
      }),
    ])

    applications = apps
    notifications = notifs
    unreadNotificationCount = unreadCount

    if (applications.length > 0) {
      const appIds = applications.map((app) => app.id)
      const auditRows = await prisma.auditLog.findMany({
        where: {
          entity: "Application",
          entityId: { in: appIds },
          action: {
            in: ["LMS_SYNC_SUCCESS", "LMS_SYNC_SKIPPED", "LMS_SYNC_FAILED"],
          },
        },
        orderBy: { createdAt: "desc" },
        take: appIds.length * 3,
      })

      for (const row of auditRows) {
        if (!latestLmsAuditByApplicationId.has(row.entityId)) {
          latestLmsAuditByApplicationId.set(row.entityId, row)
        }
      }
    }
  } catch (error) {
    logError("portal_dashboard_load_failed", error, { userId: user.id })
  }

  const openPrograms = await listOpenPrograms()
  const appliedProgramSlugs = new Set(
    applications
      .map((application) => application?.program?.slug)
      .filter(Boolean),
  )
  const programsToApply = openPrograms.filter(
    (program) => !appliedProgramSlugs.has(program.slug),
  )
  const showSuccessBanner = qs?.submitted === "1"
  const lmsMessage = getLmsMessage(String(qs?.lms || "").trim().toLowerCase())
  const notifMessage = getNotificationStateMessage(
    String(qs?.notif || "").trim().toLowerCase(),
  )

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-24">
      <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Applicant Portal
            </h1>
            <p className="mt-2 text-gray-600">
              Welcome, {user?.name || user?.email || "Applicant"}.
            </p>
          </div>
          <SignOutButton />
        </div>

        {showSuccessBanner ? (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            Application submitted successfully. We will update you as your review progresses.
          </div>
        ) : null}
        {lmsMessage ? (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {lmsMessage}
          </div>
        ) : null}
        {notifMessage ? (
          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
            {notifMessage}
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-3">
          <section className="rounded-xl border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900">Account</h2>
            <p className="mt-2 text-sm text-gray-600">Role: {user?.role}</p>
            <p className="mt-1 text-sm text-gray-600">Email: {user?.email}</p>
          </section>
          <section className="rounded-xl border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900">Applications</h2>
            <p className="mt-2 text-sm text-gray-600">
              Total submitted: {applications.length}
            </p>
          </section>
          <section className="rounded-xl border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900">Available Programs</h2>
            <p className="mt-2 text-sm text-gray-600">
              Open programs not yet applied to: {programsToApply.length}
            </p>
          </section>
        </div>

        <section className="mt-8 rounded-xl border border-gray-200 p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-gray-900">
              Notifications ({unreadNotificationCount} unread)
            </h2>
            <form method="post" action="/api/notifications/read-all">
              <input type="hidden" name="redirectTo" value="/portal/dashboard" />
              <button
                type="submit"
                className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Mark all as read
              </button>
            </form>
          </div>
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-600">No notifications yet.</p>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <article
                  key={notification.id}
                  className={`rounded-lg border p-3 ${
                    notification.readAt
                      ? "border-gray-200 bg-white"
                      : "border-blue-200 bg-blue-50"
                  }`}
                >
                  <p className="text-sm font-semibold text-gray-900">{notification.title}</p>
                  <p className="mt-1 text-sm text-gray-700">{notification.message}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {formatDate(notification.createdAt)}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mt-8 rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900">My Applications</h2>
          {applications.length === 0 ? (
            <p className="mt-3 text-sm text-gray-600">
              You have not submitted any application yet.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {applications.map((application) => {
                const lastReview = application.reviews?.[0] || null
                const lastLmsAudit = latestLmsAuditByApplicationId.get(application.id) || null
                return (
                  <article
                    key={application.id}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">
                          {application.program?.title || "Program"}
                        </h3>
                        <p className="text-xs text-gray-500">
                          Submitted: {formatDate(application.submittedAt || application.createdAt)}
                        </p>
                      </div>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getBadgeClass(application.status)}`}
                      >
                        {getApplicationStatusLabel(application.status)}
                      </span>
                    </div>

                    {lastReview ? (
                      <div className="mt-3 rounded-md bg-gray-50 p-3 text-sm text-gray-700">
                        <p>
                          Latest review: {getApplicationStatusLabel(lastReview.decision || application.status)}
                          {typeof lastReview.score === "number"
                            ? ` (Score: ${lastReview.score}/100)`
                            : ""}
                        </p>
                        {lastReview.notes ? <p className="mt-1">{lastReview.notes}</p> : null}
                      </div>
                    ) : null}
                    {lastLmsAudit ? (
                      <div className="mt-2 rounded-md bg-gray-50 p-3 text-sm text-gray-700">
                        <p>
                          {getAuditActionLabel(lastLmsAudit.action)} on{" "}
                          {formatDate(lastLmsAudit.createdAt)}.
                        </p>
                      </div>
                    ) : null}

                    {application.status === "ACCEPTED" || application.status === "ENROLLED" ? (
                      <div className="mt-3">
                        <Link
                          href={`/portal/lms/${application.id}/launch`}
                          className="inline-flex items-center rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-black"
                        >
                          Open In Moodle LMS
                        </Link>
                      </div>
                    ) : null}
                  </article>
                )
              })}
            </div>
          )}
        </section>

        <section className="mt-8 rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900">Apply to Programs</h2>
          {programsToApply.length === 0 ? (
            <p className="mt-3 text-sm text-gray-600">
              You have applications for all currently open programs.
            </p>
          ) : (
            <div className="mt-4 flex flex-wrap gap-2">
              {programsToApply.map((program) => (
                <Link
                  key={program.slug}
                  href={`/programs/${program.slug}/apply`}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-100"
                >
                  Apply: {program.title}
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
