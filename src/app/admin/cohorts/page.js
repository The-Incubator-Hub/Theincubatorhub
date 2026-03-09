import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth.mjs";
import prisma from "@/lib/prisma.mjs";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminCohortsClient from "./AdminCohortsClient";

export const metadata = {
  title: "Cohort Management — Admin — The Incubator Hub",
};

export default async function AdminCohortsPage() {
  const session = await getAuthSession();
  if (!session) redirect("/login?redirect=/admin/cohorts");
  if (session.user.role !== "ADMIN") redirect("/portal/dashboard");

  const programs = await prisma.program.findMany({
    where: { isActive: true },
    select: { id: true, title: true },
    orderBy: { title: "asc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <AdminSidebar user={session.user} />
          <main className="flex-1 min-w-0">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 font-montserrat">Cohort Management</h1>
              <p className="mt-1 text-sm text-gray-600">Create and manage student cohorts.</p>
            </div>
            <AdminCohortsClient programs={programs} />
          </main>
        </div>
      </div>
    </div>
  );
}
