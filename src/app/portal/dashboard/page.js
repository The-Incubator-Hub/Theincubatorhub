import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth.mjs";
import prisma from "@/lib/prisma.mjs";
import PortalSidebar from "@/components/portal/PortalSidebar";
import EmailVerificationBanner from "@/components/portal/EmailVerificationBanner";
import AnnouncementsCard from "@/components/portal/AnnouncementsCard";
import CoursesSection from "@/components/portal/CoursesSection";
import ApplicationsSection from "@/components/portal/ApplicationsSection";
import CertificatesSection from "@/components/portal/CertificatesSection";

export const metadata = {
  title: "My Dashboard — The Incubator Hub",
};

export default async function DashboardPage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login?redirect=/portal/dashboard");
  }

  const { user } = session;

  // Load applications
  const applications = await prisma.application.findMany({
    where: { userId: user.id },
    include: { program: true },
    orderBy: { submittedAt: "desc" },
  });

  // Load enrollments
  const enrollments = await prisma.enrollment.findMany({
    where: { userId: user.id },
    include: { program: true, cohort: true },
    orderBy: { createdAt: "desc" },
  });

  // Load announcements relevant to user's enrolled programs/cohorts
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
            { programId: null, cohortId: null }, // global
            { programId: { in: enrolledProgramIds } },
            { cohortId: { in: enrolledCohortIds } },
          ],
        },
      ],
    },
    include: { author: { select: { name: true } } },
    orderBy: [{ isPinned: "desc" }, { publishedAt: "desc" }],
    take: 5,
  });

  // Completed enrollments (certificates)
  const completedEnrollments = enrollments.filter((e) => e.status === "COMPLETED");

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <PortalSidebar user={user} />

          <main className="flex-1 min-w-0 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-montserrat">
                Welcome back, {user.name.split(" ")[0]}!
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Here&apos;s an overview of your learning journey.
              </p>
            </div>

            {/* Email verification banner */}
            {!user.emailVerified && <EmailVerificationBanner />}

            {/* Announcements */}
            {announcements.length > 0 && (
              <AnnouncementsCard announcements={announcements} />
            )}

            {/* My Courses */}
            <CoursesSection enrollments={enrollments} />

            {/* Applications */}
            <ApplicationsSection applications={applications} />

            {/* Certificates */}
            {completedEnrollments.length > 0 && (
              <CertificatesSection enrollments={completedEnrollments} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
