"use client";

import { useEffect, useState } from "react";

export default function AdminCohortsClient({ programs = [] }) {
  const [cohorts, setCohorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterProgram, setFilterProgram] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    programId: "",
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    maxStudents: "50",
    isActive: true,
  });
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  async function fetchCohorts() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterProgram) params.set("programId", filterProgram);
      const res = await fetch(`/api/admin/cohorts?${params}`);
      const data = await res.json();
      if (data.ok) setCohorts(data.data);
      else setError(data.error || "Failed to load cohorts.");
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCohorts();
  }, [filterProgram]);

  function handleFormChange(e) {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [e.target.name]: value }));
    setFormError("");
  }

  async function handleCreateCohort(e) {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");

    try {
      const res = await fetch("/api/admin/cohorts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Failed to create cohort.");
        return;
      }

      setShowForm(false);
      setForm({ programId: "", name: "", description: "", startDate: "", endDate: "", maxStudents: "50", isActive: true });
      fetchCohorts();
    } catch {
      setFormError("Network error.");
    } finally {
      setFormLoading(false);
    }
  }

  async function handleDelete(cohortId) {
    if (!confirm("Delete this cohort? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/cohorts/${cohortId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Cannot delete cohort.");
        return;
      }
      fetchCohorts();
    } catch {
      alert("Network error.");
    }
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <select
          value={filterProgram}
          onChange={(e) => setFilterProgram(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        >
          <option value="">All programs</option>
          {programs.map((p) => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 transition-colors"
        >
          {showForm ? "Cancel" : "+ New Cohort"}
        </button>
      </div>

      {/* Create Cohort Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Create New Cohort</h3>
          {formError && (
            <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3">
              <p className="text-sm text-red-700">{formError}</p>
            </div>
          )}
          <form onSubmit={handleCreateCohort} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Program *</label>
              <select
                name="programId"
                required
                value={form.programId}
                onChange={handleFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              >
                <option value="">Select program</option>
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cohort Name *</label>
              <input
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleFormChange}
                placeholder="e.g. Cohort 2025 Q1"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date *</label>
              <input
                name="startDate"
                type="date"
                required
                value={form.startDate}
                onChange={handleFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={handleFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Max Students</label>
              <input
                name="maxStudents"
                type="number"
                min="1"
                max="1000"
                value={form.maxStudents}
                onChange={handleFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
            <div className="flex items-center pt-6">
              <input
                id="cohort-active"
                name="isActive"
                type="checkbox"
                checked={form.isActive}
                onChange={handleFormChange}
                className="h-4 w-4 text-purple-600 border-gray-300 rounded"
              />
              <label htmlFor="cohort-active" className="ml-2 text-sm text-gray-700">Active cohort</label>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                rows={2}
                value={form.description}
                onChange={handleFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Optional description..."
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={formLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 disabled:opacity-50 transition-colors"
              >
                {formLoading ? "Creating..." : "Create Cohort"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Cohorts list */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {error && <div className="p-4"><p className="text-sm text-red-600">{error}</p></div>}
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-purple-600" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cohort</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrolled</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cohorts.map((cohort) => (
                  <tr key={cohort.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{cohort.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{cohort.program?.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(cohort.startDate).toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {cohort._count?.enrollments || 0} / {cohort.maxStudents}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cohort.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                        {cohort.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <a href={`/admin/cohorts/${cohort.id}`} className="text-sm font-medium text-purple-600 hover:text-purple-500">
                          Manage
                        </a>
                        <button
                          onClick={() => handleDelete(cohort.id)}
                          className="text-sm font-medium text-red-600 hover:text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {cohorts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">
                      No cohorts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
