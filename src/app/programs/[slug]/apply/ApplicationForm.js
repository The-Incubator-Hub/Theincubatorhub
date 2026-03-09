"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ApplicationForm({ programSlug, programTitle }) {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    linkedin: "",
    education: "",
    experience: "",
    motivation: "",
    referral: "",
  });
  const [cvFile, setCvFile] = useState(null);
  const [cvUrl, setCvUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleCvUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("CV file must be under 5MB.");
      return;
    }

    setUploadProgress("Uploading CV...");
    setCvFile(file);

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/portal/upload", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "CV upload failed.");
        setUploadProgress("");
        return;
      }

      setCvUrl(data.data.url);
      setUploadProgress("CV uploaded successfully.");
    } catch {
      setError("CV upload failed. Please try again.");
      setUploadProgress("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.motivation.trim()) {
      setError("Please tell us why you want to join this program.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/portal/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programSlug,
          formData: form,
          cvUrl: cvUrl || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Application failed. Please try again.");
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/portal/dashboard"), 2500);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
        <p className="text-sm text-gray-600">
          Your application for <strong>{programTitle}</strong> has been received.
          We&apos;ll review it and get back to you soon.
        </p>
        <p className="mt-3 text-xs text-gray-400">Redirecting to your dashboard...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 p-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={form.firstName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            value={form.lastName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="+234 800 000 0000"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
            LinkedIn Profile
          </label>
          <input
            id="linkedin"
            name="linkedin"
            type="url"
            value={form.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/..."
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="education" className="block text-sm font-medium text-gray-700">
          Educational Background <span className="text-red-500">*</span>
        </label>
        <input
          id="education"
          name="education"
          type="text"
          required
          value={form.education}
          onChange={handleChange}
          placeholder="e.g. BSc Computer Science, University of Lagos"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
          Relevant Experience
        </label>
        <textarea
          id="experience"
          name="experience"
          rows={3}
          value={form.experience}
          onChange={handleChange}
          placeholder="Describe any relevant work, projects, or experience..."
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="motivation" className="block text-sm font-medium text-gray-700">
          Why do you want to join {programTitle}? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="motivation"
          name="motivation"
          rows={4}
          required
          value={form.motivation}
          onChange={handleChange}
          placeholder="Tell us your goals and why this program is right for you..."
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="referral" className="block text-sm font-medium text-gray-700">
          How did you hear about us?
        </label>
        <select
          id="referral"
          name="referral"
          value={form.referral}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
        >
          <option value="">Select an option</option>
          <option value="social_media">Social Media</option>
          <option value="friend">Friend / Colleague</option>
          <option value="search">Search Engine</option>
          <option value="event">Event / Conference</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* CV Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          CV / Resume (optional)
        </label>
        <div className="mt-1">
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleCvUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-900 file:text-white hover:file:bg-gray-800 cursor-pointer"
          />
          {uploadProgress && (
            <p className={`mt-1 text-xs ${uploadProgress.includes("success") ? "text-green-600" : "text-gray-500"}`}>
              {uploadProgress}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-400">PDF or image, max 5MB</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting application...
          </span>
        ) : (
          "Submit Application"
        )}
      </button>
    </form>
  );
}
