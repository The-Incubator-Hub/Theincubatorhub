import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth.mjs";
import prisma from "@/lib/prisma.mjs";
import PortalSidebar from "@/components/portal/PortalSidebar";

export const metadata = {
  title: "Announcements — The Incubator Hub",
};

export default async function AnnouncementsPage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login?redirect=/portal/announcements");
  }

  const { user } = session;

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: user.id },
    select: { programId: true, cohortId: true },
  });

  const enrolledProgramIds = enrollments.map((e) => e.programId);
  const enrolledCohortIds = enrollments.map((e) => e.cohortId).filter(Boolean);

  const announcements = await prisma.announcement.findMany({
    where: {
      AND: [
        {
          OR: [
            { expiresAt: null },
            { expiresAt: { gt: new Date() } },
          ],
        },
        {
          OR: [
            { programId: null, cohortId: null },
            { programId: { in: enrolledProgramIds } },
            { cohortId: { in: enrolledCohortIds } },
          ],
        },
      ],
    },
    include: {
      author: { select: { name: true } },
      program: { select: { title: true } },
      cohort: { select: { name: true } },
    },
    orderBy: [{ isPinned: "desc" }, { publishedAt: "desc" }],
  });

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <PortalSidebar user={user} />
          <main className="flex-1 min-w-0">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 font-montserrat">Announcements</h1>
              <p className="mt-1 text-sm text-gray-600">
                Updates from your programs and The Incubator Hub team.
              </p>
            </div>

            {announcements.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
                <p className="mt-3 text-sm text-gray-500">No announcements yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {announcements.map((a) => (
                  <article key={a.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h2 className="text-base font-semibold text-gray-900">{a.title}</h2>
                          {a.isPinned && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
                              Pinned
                            </span>
                          )}
                          {a.program && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                              {a.program.title}
                            </span>
                          )}
                          {a.cohort && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700">
                              {a.cohort.name}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{a.body}</p>
                        <p className="mt-3 text-xs text-gray-400">
                          Posted by {a.author?.name} &bull;{" "}
                          {new Date(a.publishedAt).toLocaleDateString("en-NG", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
