"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminCohortEnrollForm({ cohortId, applications = [] }) {
  const router = useRouter();
  const [applicationId, setApplicationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!applicationId) return;
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/admin/cohorts/${cohortId}/enroll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to enroll student.");
        return;
      }

      setSuccess("Student enrolled successfully!");
      setApplicationId("");
      router.refresh();
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
      {error && <p className="text-sm text-red-600 sm:col-span-2">{error}</p>}
      {success && <p className="text-sm text-green-600 sm:col-span-2">{success}</p>}

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Accepted Applicant
        </label>
        <select
          value={applicationId}
          onChange={(e) => setApplicationId(e.target.value)}
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        >
          <option value="">Choose a student to enroll...</option>
          {applications.map((app) => (
            <option key={app.id} value={app.id}>
              {app.user?.name} ({app.user?.email})
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading || !applicationId}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 disabled:opacity-50 transition-colors"
      >
        {loading ? "Enrolling..." : "Enroll Student"}
      </button>
    </form>
  );
}
