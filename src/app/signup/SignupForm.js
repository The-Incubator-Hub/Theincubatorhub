"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function resolveSafeCallbackUrl(rawValue) {
  if (!rawValue) return "/portal/dashboard"
  return rawValue.startsWith("/") ? rawValue : "/portal/dashboard"
}

export default function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = resolveSafeCallbackUrl(searchParams.get("callbackUrl"))

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const onSubmit = async (event) => {
    event.preventDefault()
    setError("")
    setSuccess("")

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setSubmitting(true)

    try {
      const registerResponse = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const registerPayload = await registerResponse.json().catch(() => ({}))

      if (!registerResponse.ok) {
        setError(registerPayload.error || "Unable to create account.")
        return
      }

      setSuccess("Account created. Signing you in...")

      const loginResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })

      const loginPayload = await loginResponse.json().catch(() => ({}))

      if (!loginResponse.ok) {
        setError(
          loginPayload.error ||
            "Account created, but automatic login failed. Please login manually.",
        )
        router.push("/login")
        return
      }

      router.push(callbackUrl)
      router.refresh()
    } catch {
      setError("Unable to create account right now. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-800">
          Full name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-gray-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-800">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-gray-500"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-800">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-gray-500"
        />
        <p className="mt-1 text-xs text-gray-500">
          Use 8+ chars with uppercase, lowercase, number, and symbol.
        </p>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-1 block text-sm font-medium text-gray-800"
        >
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-gray-500"
        />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {success ? <p className="text-sm text-green-700">{success}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Creating account..." : "Create Account"}
      </button>
    </form>
  )
}
