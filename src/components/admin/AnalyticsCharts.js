"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const PIE_COLORS = {
  PENDING: "#f59e0b",
  UNDER_REVIEW: "#3b82f6",
  ACCEPTED: "#10b981",
  REJECTED: "#ef4444",
  WITHDRAWN: "#6b7280",
};

const DEFAULT_PIE_COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f97316"];

function StatCard({ label, value, subtext }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-gray-900">{value?.toLocaleString()}</p>
      {subtext && <p className="mt-1 text-xs text-gray-400">{subtext}</p>}
    </div>
  );
}

export default function AnalyticsCharts() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/analytics/charts")
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) setData(d.data);
        else setError(d.error || "Failed to load analytics.");
      })
      .catch(() => setError("Network error loading analytics."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
            <div className="h-8 bg-gray-200 rounded w-16" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-4">
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  const { summary, monthlyApplications, statusDistribution, programPerformance } = data;

  return (
    <div className="space-y-8">
      {/* Summary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={summary.totalUsers} subtext="Registered accounts" />
        <StatCard label="Total Applications" value={summary.totalApplications} subtext="All time" />
        <StatCard label="Total Enrollments" value={summary.totalEnrollments} subtext="All time" />
        <StatCard label="Active Enrollments" value={summary.activeEnrollments} subtext="Currently enrolled" />
      </div>

      {/* Monthly applications bar chart */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Applications (Last 12 Months)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={monthlyApplications} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" name="Applications" fill="#1a1a2e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status distribution pie chart */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Application Status Distribution</h3>
          {statusDistribution.length === 0 ? (
            <p className="text-sm text-gray-500">No data available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[entry.name] || DEFAULT_PIE_COLORS[index % DEFAULT_PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Program performance */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Program Performance</h3>
          {programPerformance.length === 0 ? (
            <p className="text-sm text-gray-500">No data available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={programPerformance} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" name="Applications" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="enrollments" name="Enrollments" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
