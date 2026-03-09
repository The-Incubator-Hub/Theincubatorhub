import { redirect, notFound } from "next/navigation";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getAuthSession } from "@/lib/auth.mjs";
import ApplicationForm from "./ApplicationForm";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const raw = readFileSync(join(process.cwd(), "content", "program-pages", `${slug}.json`), "utf-8");
    const data = JSON.parse(raw);
    return { title: `Apply for ${data.title} — The Incubator Hub` };
  } catch {
    return { title: "Apply — The Incubator Hub" };
  }
}

export default async function ApplyPage({ params }) {
  const session = await getAuthSession();
  const { slug } = await params;

  // Read program content
  let programData = null;
  try {
    const raw = readFileSync(join(process.cwd(), "content", "program-pages", `${slug}.json`), "utf-8");
    programData = JSON.parse(raw);
  } catch {
    notFound();
  }

  if (!session) {
    redirect(`/login?redirect=/programs/${slug}/apply`);
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <a href={`/programs/${slug}`} className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to {programData.title}
          </a>
          <h1 className="mt-3 text-2xl font-bold text-gray-900 font-montserrat">
            Apply for {programData.title}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Fill in the form below to submit your application.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <ApplicationForm programSlug={slug} programTitle={programData.title} />
        </div>
      </div>
    </div>
  );
}
