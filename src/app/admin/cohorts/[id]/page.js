import { redirect, notFound } from "next/navigation";
import { getAuthSession } from "@/lib/auth.mjs";
import prisma from "@/lib/prisma.mjs";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminCohortEnrollForm from "./AdminCohortEnrollForm";

export const metadata = {
  title: "Cohort Detail — Admin — The Incubator Hub",
};

export default async function AdminCohortDetailPage({ params }) {
  const session = await getAuthSession();
  if (!session) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/portal/dashboard");

  const { id } = await params;

  const cohort = await prisma.cohort.findUnique({
    where: { id },
    include: {
      program: { select: { id: true, title: true } },
      enrollments: {
        include: {
          user: { select: { name: true, email: true } },
          application: { select: { id: true, status: true } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!cohort) notFound();

  // Get accepted applications for this program that aren't yet enrolled
  const acceptedApplications = await prisma.application.findMany({
    where: {
      programId: cohort.programId,
      status: "ACCEPTED",
      enrollment: null,
    },
    include: { user: { select: { name: true, email: true } } },
    orderBy: { submittedAt: "desc" },
  });

  const ENROLLMENT_STATUS_STYLES = {
    ACTIVE: "bg-green-100 text-green-700",
    COMPLETED: "bg-blue-100 text-blue-700",
    WITHDRAWN: "bg-gray-100 text-gray-600",
    SUSPENDED: "bg-red-100 text-red-700",
  };

  const avgProgress = cohort.enrollments.length > 0
    ? Math.round(cohort.enrollments.reduce((sum, e) => sum + e.progress, 0) / cohort.enrollments.length)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <AdminSidebar user={session.user} />
          <main className="flex-1 min-w-0 space-y-6">
            <div className="flex items-center gap-4">
              <a href="/admin/cohorts" className="text-sm text-gray-500 hover:text-gray-700">
                ← Back to Cohorts
              </a>
            </div>

            {/* Cohort header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-gray-900 font-montserrat">{cohort.name}</h1>
                  <p className="text-sm text-gray-500 mt-0.5">{cohort.program?.title}</p>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cohort.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {cohort.isActive ? "Active" : "Inactive"}
                    </span>
                    <span className="text-xs text-gray-500">
                      Starts: {new Date(cohort.startDate).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                    {cohort.endDate && (
                      <span className="text-xs text-gray-500">
                        Ends: {new Date(cohort.endDate).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{cohort.enrollments.length} / {cohort.maxStudents}</p>
                  <p className="text-xs text-gray-500">Students enrolled</p>
                  <p className="text-sm text-gray-700 mt-1">Avg. progress: <strong>{avgProgress}%</strong></p>
                </div>
              </div>
            </div>

            {/* Enroll student form */}
            {acceptedApplications.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 font-montserrat mb-4">Enroll Student</h2>
                <AdminCohortEnrollForm cohortId={id} applications={acceptedApplications} />
              </div>
            )}

            {/* Enrolled students */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 font-montserrat">Enrolled Students ({cohort.enrollments.length})</h2>
              </div>
              {cohort.enrollments.length === 0 ? (
                <p className="px-6 py-8 text-center text-sm text-gray-500">No students enrolled yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {cohort.enrollments.map((e) => (
                        <tr key={e.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <p className="text-sm font-medium text-gray-900">{e.user?.name}</p>
                            <p className="text-xs text-gray-500">{e.user?.email}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden" style={{ width: "80px" }}>
                                <div className="h-full bg-green-500 rounded-full" style={{ width: `${e.progress}%` }} />
                              </div>
                              <span className="text-xs text-gray-600">{e.progress}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{e.grade || "—"}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ENROLLMENT_STATUS_STYLES[e.status] || "bg-gray-100 text-gray-600"}`}>
                              {e.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
