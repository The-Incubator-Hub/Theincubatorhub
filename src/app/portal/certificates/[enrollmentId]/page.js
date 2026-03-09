import { redirect, notFound } from "next/navigation";
import { getAuthSession } from "@/lib/auth.mjs";
import prisma from "@/lib/prisma.mjs";
import CertificatePrintPage from "./CertificatePrintPage";

export const metadata = {
  title: "Certificate — The Incubator Hub",
};

export default async function CertificatePage({ params }) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login?redirect=/portal/dashboard");
  }

  const { enrollmentId } = await params;

  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
    include: {
      user: { select: { name: true } },
      program: { select: { title: true, description: true } },
      cohort: { select: { name: true } },
    },
  });

  if (!enrollment) notFound();

  if (session.user.role !== "ADMIN" && enrollment.userId !== session.user.id) {
    redirect("/portal/dashboard");
  }

  if (enrollment.status !== "COMPLETED") {
    redirect("/portal/dashboard");
  }

  return (
    <CertificatePrintPage
      studentName={enrollment.user.name}
      programTitle={enrollment.program.title}
      cohortName={enrollment.cohort?.name}
      completedAt={enrollment.completedAt}
      enrollmentId={enrollmentId}
    />
  );
}
