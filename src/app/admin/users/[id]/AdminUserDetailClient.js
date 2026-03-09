"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminUserDetailClient({ userId, currentRole, currentIsActive }) {
  const router = useRouter();
  const [role, setRole] = useState(currentRole);
  const [isActive, setIsActive] = useState(currentIsActive);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSave() {
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, isActive }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Update failed.");
        return;
      }

      setSuccess("User updated.");
      router.refresh();
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 min-w-[200px]">
      <p className="text-sm font-semibold text-gray-700 mb-3">Edit User</p>
      {success && <p className="text-xs text-green-600 mb-2">{success}</p>}
      {error && <p className="text-xs text-red-600 mb-2">{error}</p>}

      <div className="space-y-3">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="STUDENT">Student</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            id={`active-${userId}`}
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4 text-purple-600 border-gray-300 rounded"
          />
          <label htmlFor={`active-${userId}`} className="text-xs text-gray-600">Active account</label>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-1.5 px-3 border border-transparent rounded text-xs font-medium text-white bg-purple-700 hover:bg-purple-800 disabled:opacity-50 transition-colors"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
