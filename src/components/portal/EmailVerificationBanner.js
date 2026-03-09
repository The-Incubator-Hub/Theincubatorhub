"use client";

import { useState } from "react";

export default function EmailVerificationBanner() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleResend() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/resend-verification", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to send verification email.");
        return;
      }
      setSent(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
      <div className="flex items-start gap-3">
        <svg className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-amber-800">
            Please verify your email address
          </p>
          <p className="mt-1 text-sm text-amber-700">
            Check your inbox for a verification link. Some features may be limited until you verify.
          </p>
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
          {sent ? (
            <p className="mt-2 text-sm font-medium text-green-700">Verification email sent! Please check your inbox.</p>
          ) : (
            <button
              onClick={handleResend}
              disabled={loading}
              className="mt-2 text-sm font-medium text-amber-800 underline hover:text-amber-900 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Resend verification email"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
