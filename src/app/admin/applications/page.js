import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth.mjs";
import prisma from "@/lib/prisma.mjs";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminApplicationsClient from "./AdminApplicationsClient";

export const metadata = {
  title: "Applications — Admin — The Incubator Hub",
};

export default async function AdminApplicationsPage() {
  const session = await getAuthSession();
  if (!session) redirect("/login?redirect=/admin/applications");
  if (session.user.role !== "ADMIN") redirect("/portal/dashboard");

  const applications = await prisma.application.findMany({
    include: {
      user: { select: { name: true, email: true } },
      program: { select: { title: true } },
    },
    orderBy: { submittedAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <AdminSidebar user={session.user} />
          <main className="flex-1 min-w-0">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 font-montserrat">Applications</h1>
              <p className="mt-1 text-sm text-gray-600">Review and manage all program applications.</p>
            </div>
            <AdminApplicationsClient applications={applications} />
          </main>
        </div>
      </div>
    </div>
  );
}
