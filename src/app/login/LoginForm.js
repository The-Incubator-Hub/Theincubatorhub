"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function resolveSafeCallbackUrl(rawValue) {
  if (!rawValue) return "/portal/dashboard"
  return rawValue.startsWith("/") ? rawValue : "/portal/dashboard"
}

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = resolveSafeCallbackUrl(searchParams.get("callbackUrl"))

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const onSubmit = async (event) => {
    event.preventDefault()
    setError("")
    setSubmitting(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })

      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        setError(payload.error || "Invalid email or password.")
        return
      }

      router.push(callbackUrl)
      router.refresh()
    } catch {
      setError("Unable to login right now. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
          autoComplete="current-password"
          required
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-gray-500"
        />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Signing in..." : "Sign In"}
      </button>
    </form>
  )
}
