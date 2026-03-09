"use client";

export default function CertificatePrintPage({ studentName, programTitle, cohortName, completedAt, enrollmentId }) {
  const formattedDate = completedAt
    ? new Date(completedAt).toLocaleDateString("en-NG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  const certificateNumber = `IH-${enrollmentId.slice(-8).toUpperCase()}`;

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          .certificate-container, .certificate-container * { visibility: visible !important; }
          .certificate-container { position: fixed; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
        @page { size: A4 landscape; margin: 0; }
      `}</style>

      {/* Screen nav bar */}
      <div className="no-print mt-16 bg-gray-100 border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="/portal/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to Dashboard
          </a>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Download / Print
          </button>
        </div>
      </div>

      {/* Certificate */}
      <div className="certificate-container min-h-screen bg-gray-100 flex items-center justify-center p-8 no-print-padding">
        <div
          className="bg-white w-full max-w-4xl"
          style={{
            border: "2px solid #1a1a2e",
            padding: "48px 64px",
            position: "relative",
            minHeight: "520px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {/* Corner decorations */}
          <div style={{ position: "absolute", top: 12, left: 12, width: 32, height: 32, borderTop: "3px solid #4ade80", borderLeft: "3px solid #4ade80" }} />
          <div style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, borderTop: "3px solid #4ade80", borderRight: "3px solid #4ade80" }} />
          <div style={{ position: "absolute", bottom: 12, left: 12, width: 32, height: 32, borderBottom: "3px solid #4ade80", borderLeft: "3px solid #4ade80" }} />
          <div style={{ position: "absolute", bottom: 12, right: 12, width: 32, height: 32, borderBottom: "3px solid #4ade80", borderRight: "3px solid #4ade80" }} />

          {/* Header */}
          <div className="mb-2">
            <img src="/images/Iogo_incubator.png" alt="The Incubator Hub" style={{ height: "36px", objectFit: "contain", margin: "0 auto" }} />
          </div>

          <p
            style={{
              fontSize: "12px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#6b7280",
              marginBottom: "24px",
              marginTop: "8px",
            }}
          >
            The Incubator Hub
          </p>

          <h1
            style={{
              fontSize: "36px",
              fontWeight: "700",
              color: "#1a1a2e",
              marginBottom: "4px",
              fontFamily: "Georgia, serif",
            }}
          >
            Certificate of Completion
          </h1>

          <div
            style={{ width: "80px", height: "3px", background: "#4ade80", margin: "16px auto 24px" }}
          />

          <p style={{ fontSize: "15px", color: "#6b7280", marginBottom: "8px" }}>
            This is to certify that
          </p>

          <h2
            style={{
              fontSize: "30px",
              fontWeight: "700",
              color: "#1a1a2e",
              fontFamily: "Georgia, serif",
              marginBottom: "16px",
              padding: "8px 24px",
              borderBottom: "2px solid #e5e7eb",
              display: "inline-block",
            }}
          >
            {studentName}
          </h2>

          <p style={{ fontSize: "15px", color: "#6b7280", marginBottom: "8px" }}>
            has successfully completed the program
          </p>

          <h3
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#1a1a2e",
              marginBottom: "6px",
            }}
          >
            {programTitle}
          </h3>

          {cohortName && (
            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px" }}>
              {cohortName}
            </p>
          )}

          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "8px" }}>
            Completed on <strong style={{ color: "#1a1a2e" }}>{formattedDate}</strong>
          </p>

          {/* Footer */}
          <div
            style={{
              position: "absolute",
              bottom: "32px",
              left: "64px",
              right: "64px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <div style={{ borderTop: "1px solid #d1d5db", paddingTop: "8px", minWidth: "160px" }}>
                <p style={{ fontSize: "11px", color: "#9ca3af" }}>Director, The Incubator Hub</p>
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "10px", color: "#d1d5db" }}>
                Certificate No: {certificateNumber}
              </p>
              <p style={{ fontSize: "10px", color: "#d1d5db" }}>
                theincubatorhub.org
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ borderTop: "1px solid #d1d5db", paddingTop: "8px", minWidth: "160px" }}>
                <p style={{ fontSize: "11px", color: "#9ca3af" }}>Program Coordinator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
