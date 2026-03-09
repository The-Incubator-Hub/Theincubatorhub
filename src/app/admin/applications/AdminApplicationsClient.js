"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUS_STYLES = {
  PENDING: "bg-yellow-100 text-yellow-800",
  UNDER_REVIEW: "bg-blue-100 text-blue-800",
  ACCEPTED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  WITHDRAWN: "bg-gray-100 text-gray-600",
};

const STATUSES = ["PENDING", "UNDER_REVIEW", "ACCEPTED", "REJECTED", "WITHDRAWN"];

export default function AdminApplicationsClient({ applications: initialApplications }) {
  const router = useRouter();
  const [applications, setApplications] = useState(initialApplications);
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");
  const [reviewingId, setReviewingId] = useState(null);
  const [reviewForm, setReviewForm] = useState({ status: "", reviewNotes: "" });
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState("");

  const filtered = applications.filter((app) => {
    const matchStatus = !filterStatus || app.status === filterStatus;
    const matchSearch = !search || app.user?.name?.toLowerCase().includes(search.toLowerCase()) || app.user?.email?.toLowerCase().includes(search.toLowerCase()) || app.program?.title?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  function openReview(app) {
    setReviewingId(app.id);
    setReviewForm({ status: app.status, reviewNotes: app.reviewNotes || "" });
    setReviewError("");
  }

  async function handleReview(e) {
    e.preventDefault();
    setReviewLoading(true);
    setReviewError("");

    try {
      const res = await fetch(`/api/admin/applications/${reviewingId}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewForm),
      });

      const data = await res.json();

      if (!res.ok) {
        setReviewError(data.error || "Review failed.");
        return;
      }

      setApplications((prev) =>
        prev.map((app) =>
          app.id === reviewingId
            ? { ...app, status: reviewForm.status, reviewNotes: reviewForm.reviewNotes }
            : app
        )
      );
      setReviewingId(null);
    } catch {
      setReviewError("Network error.");
    } finally {
      setReviewLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search applicant or program..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Review modal */}
      {reviewingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Application</h3>
            {reviewError && (
              <div className="mb-3 rounded-md bg-red-50 border border-red-200 p-3">
                <p className="text-sm text-red-700">{reviewError}</p>
              </div>
            )}
            <form onSubmit={handleReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={reviewForm.status}
                  onChange={(e) => setReviewForm((prev) => ({ ...prev, status: e.target.value }))}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Review Notes</label>
                <textarea
                  rows={3}
                  value={reviewForm.reviewNotes}
                  onChange={(e) => setReviewForm((prev) => ({ ...prev, reviewNotes: e.target.value }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Internal notes (optional)..."
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={reviewLoading}
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 disabled:opacity-50 transition-colors"
                >
                  {reviewLoading ? "Saving..." : "Save Decision"}
                </button>
                <button
                  type="button"
                  onClick={() => setReviewingId(null)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-3 border-b border-gray-100">
          <p className="text-sm text-gray-500">{filtered.length} application{filtered.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{app.user?.name}</p>
                    <p className="text-xs text-gray-500">{app.user?.email}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{app.program?.title}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[app.status] || "bg-gray-100 text-gray-600"}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(app.submittedAt).toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" })}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openReview(app)}
                      className="text-sm font-medium text-purple-600 hover:text-purple-500"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
