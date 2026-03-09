"use client";

import { useState } from "react";

export default function AdminAnnouncementForm({ programs = [], cohorts = [] }) {
  const [form, setForm] = useState({
    title: "",
    body: "",
    programId: "",
    cohortId: "",
    isPinned: false,
    expiresAt: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [e.target.name]: value }));
    setError("");
    setSuccess("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          body: form.body,
          programId: form.programId || null,
          cohortId: form.cohortId || null,
          isPinned: form.isPinned,
          expiresAt: form.expiresAt || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to post announcement.");
        return;
      }

      setSuccess("Announcement posted successfully.");
      setForm({ title: "", body: "", programId: "", cohortId: "", isPinned: false, expiresAt: "" });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 p-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      {success && (
        <div className="rounded-md bg-green-50 border border-green-200 p-3">
          <p className="text-sm text-green-700">{success}</p>
        </div>
      )}

      <div>
        <label htmlFor="ann-title" className="block text-sm font-medium text-gray-700">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="ann-title"
          name="title"
          type="text"
          required
          value={form.title}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          placeholder="Announcement title"
        />
      </div>

      <div>
        <label htmlFor="ann-body" className="block text-sm font-medium text-gray-700">
          Body <span className="text-red-500">*</span>
        </label>
        <textarea
          id="ann-body"
          name="body"
          rows={4}
          required
          value={form.body}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          placeholder="Announcement content..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ann-program" className="block text-sm font-medium text-gray-700">
            Program (optional)
          </label>
          <select
            id="ann-program"
            name="programId"
            value={form.programId}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          >
            <option value="">All programs</option>
            {programs.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ann-cohort" className="block text-sm font-medium text-gray-700">
            Cohort (optional)
          </label>
          <select
            id="ann-cohort"
            name="cohortId"
            value={form.cohortId}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          >
            <option value="">All cohorts</option>
            {cohorts.map((c) => (
              <option key={c.id} value={c.id}>{c.program?.title} — {c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ann-expires" className="block text-sm font-medium text-gray-700">
            Expiry Date (optional)
          </label>
          <input
            id="ann-expires"
            name="expiresAt"
            type="date"
            value={form.expiresAt}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          />
        </div>

        <div className="flex items-center pt-6">
          <input
            id="ann-pinned"
            name="isPinned"
            type="checkbox"
            checked={form.isPinned}
            onChange={handleChange}
            className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label htmlFor="ann-pinned" className="ml-2 block text-sm text-gray-700">
            Pin this announcement
          </label>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Posting..." : "Post Announcement"}
        </button>
      </div>
    </form>
  );
}
