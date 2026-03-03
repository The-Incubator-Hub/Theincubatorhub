"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const EXPERIENCE_OPTIONS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
]

export default function ApplicationForm({ program, user }) {
  const router = useRouter()
  const [form, setForm] = useState({
    programSlug: program.slug,
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    country: "",
    currentRole: "",
    experienceLevel: "beginner",
    motivation: "",
    goals: "",
    availability: "",
    linkedinUrl: "",
    portfolioUrl: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setError("")
    setSuccess("")
    setSubmitting(true)

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        setError(payload.error || "Unable to submit application.")
        return
      }

      setSuccess("Application submitted successfully. Redirecting to your portal...")
      setTimeout(() => {
        router.push("/portal/dashboard?submitted=1")
        router.refresh()
      }, 700)
    } catch {
      setError("Unable to submit application right now. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <input type="hidden" name="programSlug" value={form.programSlug} />

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-gray-800">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            required
            value={form.fullName}
            onChange={onChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-800">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={onChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500"
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-800">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={onChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500"
          />
        </div>

        <div>
          <label htmlFor="country" className="mb-1 block text-sm font-medium text-gray-800">
            Country
          </label>
          <input
            id="country"
            name="country"
            value={form.country}
            onChange={onChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="currentRole"
            className="mb-1 block text-sm font-medium text-gray-800"
          >
            Current Role
          </label>
          <input
            id="currentRole"
            name="currentRole"
            value={form.currentRole}
            onChange={onChange}
            placeholder="Student, Graduate, Designer, Developer..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="experienceLevel"
            className="mb-1 block text-sm font-medium text-gray-800"
          >
            Experience Level
          </label>
          <select
            id="experienceLevel"
            name="experienceLevel"
            value={form.experienceLevel}
            onChange={onChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500"
          >
            {EXPERIENCE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="linkedinUrl"
            className="mb-1 block text-sm font-medium text-gray-800"
          >
            LinkedIn URL
          </label>
          <input
            id="linkedinUrl"
            name="linkedinUrl"
            value={form.linkedinUrl}
            onChange={onChange}
            placeholder="https://linkedin.com/in/..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="portfolioUrl"
            className="mb-1 block text-sm font-medium text-gray-800"
          >
            Portfolio URL
          </label>
          <input
            id="portfolioUrl"
            name="portfolioUrl"
            value={form.portfolioUrl}
            onChange={onChange}
            placeholder="https://your-portfolio.com"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="motivation" className="mb-1 block text-sm font-medium text-gray-800">
          Why do you want to join this program?
        </label>
        <textarea
          id="motivation"
          name="motivation"
          required
          minLength={20}
          rows={5}
          value={form.motivation}
          onChange={onChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500"
        />
      </div>

      <div>
        <label htmlFor="goals" className="mb-1 block text-sm font-medium text-gray-800">
          Career Goals (Optional)
        </label>
        <textarea
          id="goals"
          name="goals"
          rows={4}
          value={form.goals}
          onChange={onChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500"
        />
      </div>

      <div>
        <label htmlFor="availability" className="mb-1 block text-sm font-medium text-gray-800">
          Weekly Availability (Optional)
        </label>
        <input
          id="availability"
          name="availability"
          value={form.availability}
          onChange={onChange}
          placeholder="Example: Weekdays 6pm-9pm, Saturdays"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500"
        />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {success ? <p className="text-sm text-green-700">{success}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  )
}

