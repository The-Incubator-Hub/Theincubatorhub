"use client"

import { useRouter } from "next/navigation"

export default function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
    } finally {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
    >
      Sign out
    </button>
  )
}
