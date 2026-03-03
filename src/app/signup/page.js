import Link from "next/link"
import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/auth.mjs"
import { buildMetadata } from "@/lib/seo"
import SignupForm from "./SignupForm"

export const metadata = buildMetadata({
  title: "Create Account",
  description: "Create your Incubator applicant account.",
  path: "/signup",
  noIndex: true,
})

export const dynamic = "force-dynamic"

export default async function SignupPage() {
  const session = await getAuthSession()
  if (session?.user) {
    redirect("/portal/dashboard")
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-24">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Create Account</h1>
        <p className="mt-2 text-sm text-gray-600">
          Set up your account to apply for programs.
        </p>
        <div className="mt-6">
          <SignupForm />
        </div>
        <p className="mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-gray-900 underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  )
}
