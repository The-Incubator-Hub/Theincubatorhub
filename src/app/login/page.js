import Link from "next/link"
import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/auth.mjs"
import { buildMetadata } from "@/lib/seo"
import LoginForm from "./LoginForm"

export const metadata = buildMetadata({
  title: "Login",
  description: "Log in to your Incubator applicant account.",
  path: "/login",
  noIndex: true,
})

export const dynamic = "force-dynamic"

export default async function LoginPage() {
  const session = await getAuthSession()
  if (session?.user) {
    redirect("/portal/dashboard")
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-24">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome Back</h1>
        <p className="mt-2 text-sm text-gray-600">
          Log in to access your applicant portal.
        </p>
        <div className="mt-6">
          <LoginForm />
        </div>
        <p className="mt-6 text-sm text-gray-600">
          New here?{" "}
          <Link href="/signup" className="font-medium text-gray-900 underline">
            Create account
          </Link>
        </p>
      </div>
    </main>
  )
}
