import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth.mjs";
import prisma from "@/lib/prisma.mjs";
import PortalSidebar from "@/components/portal/PortalSidebar";
import CoursesSection from "@/components/portal/CoursesSection";

export const metadata = {
  title: "My Courses — The Incubator Hub",
};

export default async function CoursesPage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login?redirect=/portal/courses");
  }

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: session.user.id },
    include: { program: true, cohort: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <PortalSidebar user={session.user} />
          <main className="flex-1 min-w-0">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 font-montserrat">My Courses</h1>
              <p className="mt-1 text-sm text-gray-600">Track your learning progress.</p>
            </div>
            <CoursesSection enrollments={enrollments} />
          </main>
        </div>
      </div>
    </div>
  );
}
