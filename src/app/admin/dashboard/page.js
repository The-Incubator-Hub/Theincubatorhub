import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth.mjs";
import prisma from "@/lib/prisma.mjs";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AnalyticsCharts from "@/components/admin/AnalyticsCharts";
import AdminAnnouncementForm from "@/components/admin/AdminAnnouncementForm";

export const metadata = {
  title: "Admin Dashboard — The Incubator Hub",
};

export default async function AdminDashboardPage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login?redirect=/admin/dashboard");
  }
  if (session.user.role !== "ADMIN") {
    redirect("/portal/dashboard");
  }

  // Recent applications
  const recentApplications = await prisma.application.findMany({
    include: { user: { select: { name: true, email: true } }, program: { select: { title: true } } },
    orderBy: { submittedAt: "desc" },
    take: 10,
  });

  // Programs for announcement form
  const programs = await prisma.program.findMany({
    where: { isActive: true },
    select: { id: true, title: true },
    orderBy: { title: "asc" },
  });

  const cohorts = await prisma.cohort.findMany({
    where: { isActive: true },
    select: { id: true, name: true, program: { select: { title: true } } },
    orderBy: { startDate: "desc" },
  });

  const STATUS_STYLES = {
    PENDING: "bg-yellow-100 text-yellow-800",
    UNDER_REVIEW: "bg-blue-100 text-blue-800",
    ACCEPTED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
    WITHDRAWN: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <AdminSidebar user={session.user} />

          <main className="flex-1 min-w-0 space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-montserrat">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">Overview of The Incubator Hub platform.</p>
            </div>

            {/* Analytics Charts */}
            <AnalyticsCharts />

            {/* Post Announcement */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 font-montserrat mb-4">Post Announcement</h2>
              <AdminAnnouncementForm programs={programs} cohorts={cohorts} />
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 font-montserrat">Recent Applications</h2>
                <a href="/admin/applications" className="text-sm font-medium text-purple-600 hover:text-purple-500">
                  View all →
                </a>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-900">{app.user?.name}</p>
                          <p className="text-xs text-gray-500">{app.user?.email}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{app.program?.title}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[app.status] || "bg-gray-100 text-gray-600"}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(app.submittedAt).toLocaleDateString("en-NG", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={`/admin/applications?id=${app.id}`}
                            className="text-sm font-medium text-purple-600 hover:text-purple-500"
                          >
                            Review
                          </a>
                        </td>
                      </tr>
                    ))}
                    {recentApplications.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                          No applications yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
