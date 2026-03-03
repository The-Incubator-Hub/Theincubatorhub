import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { buildMetadata, titleFromSlug } from "@/lib/seo"
import { getAuthSession } from "@/lib/auth.mjs"
import { getProgramBySlug } from "@/lib/programs.mjs"
import ApplicationForm from "./ApplicationForm"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }) {
  const { slug } = await params
  const program = await getProgramBySlug(slug)

  const programTitle = program?.title || titleFromSlug(slug)
  return buildMetadata({
    title: `Apply - ${programTitle}`,
    description: `Submit your application for ${programTitle} at The Incubator Hub.`,
    path: `/programs/${slug}/apply`,
    noIndex: true,
  })
}

export default async function ProgramApplyPage({ params }) {
  const { slug } = await params
  const callbackUrl = `/programs/${slug}/apply`
  const session = await getAuthSession()
  if (!session?.user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`)
  }

  const program = await getProgramBySlug(slug)
  if (!program) {
    notFound()
  }

  const isProgramOpen = program.isOpen !== false

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-24">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6">
          <Link href={`/programs/${program.slug}`} className="text-sm text-gray-600 underline">
            Back to program
          </Link>
          <h1 className="mt-3 text-3xl font-semibold text-gray-900">
            Apply to {program.title}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Complete this application once. You can track status updates in your portal.
          </p>
        </div>

        {!isProgramOpen ? (
          <section className="rounded-2xl border border-amber-300 bg-amber-50 p-6">
            <h2 className="text-lg font-semibold text-amber-900">
              Applications are currently closed
            </h2>
            <p className="mt-2 text-sm text-amber-800">
              This program is not accepting new submissions right now. Check back later.
            </p>
          </section>
        ) : (
          <ApplicationForm program={program} user={session.user} />
        )}
      </div>
    </main>
  )
}

