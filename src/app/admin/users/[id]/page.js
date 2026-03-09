import { redirect, notFound } from "next/navigation";
import { getAuthSession } from "@/lib/auth.mjs";
import prisma from "@/lib/prisma.mjs";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminUserDetailClient from "./AdminUserDetailClient";

export const metadata = {
  title: "User Detail — Admin — The Incubator Hub",
};

export default async function AdminUserDetailPage({ params }) {
  const session = await getAuthSession();
  if (!session) redirect("/login?redirect=/admin/users");
  if (session.user.role !== "ADMIN") redirect("/portal/dashboard");

  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      applications: {
        include: { program: true },
        orderBy: { submittedAt: "desc" },
      },
      enrollments: {
        include: { program: true, cohort: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) notFound();

  const { passwordHash, ...safeUser } = user;

  const STATUS_STYLES = {
    PENDING: "bg-yellow-100 text-yellow-800",
    UNDER_REVIEW: "bg-blue-100 text-blue-800",
    ACCEPTED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
    WITHDRAWN: "bg-gray-100 text-gray-600",
  };

  const ENROLLMENT_STATUS_STYLES = {
    ACTIVE: "bg-green-100 text-green-700",
    COMPLETED: "bg-blue-100 text-blue-700",
    WITHDRAWN: "bg-gray-100 text-gray-600",
    SUSPENDED: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <AdminSidebar user={session.user} />
          <main className="flex-1 min-w-0 space-y-6">
            <div className="flex items-center gap-4">
              <a href="/admin/users" className="text-sm text-gray-500 hover:text-gray-700">
                ← Back to Users
              </a>
            </div>

            {/* User profile card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center text-white text-xl font-semibold">
                    {safeUser.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 font-montserrat">{safeUser.name}</h1>
                    <p className="text-sm text-gray-500">{safeUser.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${safeUser.role === "ADMIN" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"}`}>
                        {safeUser.role}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${safeUser.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {safeUser.isActive ? "Active" : "Inactive"}
                      </span>
                      {!safeUser.emailVerified && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                          Email unverified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <AdminUserDetailClient userId={safeUser.id} currentRole={safeUser.role} currentIsActive={safeUser.isActive} />
              </div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-4">
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm text-gray-900">{safeUser.phone || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Joined</p>
                  <p className="text-sm text-gray-900">
                    {new Date(safeUser.createdAt).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">LinkedIn</p>
                  {safeUser.linkedinUrl ? (
                    <a href={safeUser.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                      View profile
                    </a>
                  ) : (
                    <p className="text-sm text-gray-900">—</p>
                  )}
                </div>
              </div>
            </div>

            {/* Applications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 font-montserrat">Applications ({safeUser.applications?.length || 0})</h2>
              </div>
              {safeUser.applications?.length === 0 ? (
                <p className="px-6 py-4 text-sm text-gray-500">No applications.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {safeUser.applications?.map((app) => (
                        <tr key={app.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{app.program?.title}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[app.status] || "bg-gray-100 text-gray-600"}`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(app.submittedAt).toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" })}
                          </td>
                          <td className="px-6 py-4">
                            <a href={`/admin/applications?id=${app.id}`} className="text-sm font-medium text-purple-600 hover:text-purple-500">
                              Review
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Enrollments */}
            {safeUser.enrollments?.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 font-montserrat">Enrollments ({safeUser.enrollments?.length || 0})</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {safeUser.enrollments?.map((e) => (
                    <div key={e.id} className="px-6 py-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{e.program?.title}</p>
                        {e.cohort && <p className="text-xs text-gray-500">Cohort: {e.cohort.name}</p>}
                        <p className="text-xs text-gray-500 mt-0.5">Progress: {e.progress}%</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ENROLLMENT_STATUS_STYLES[e.status] || "bg-gray-100 text-gray-600"}`}>
                        {e.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
