/**
 * Email abstraction layer.
 *
 * To enable real email delivery:
 *   1. Install a transactional email SDK, e.g. `npm install resend`
 *      (Resend, SendGrid, and Postmark are all good choices)
 *   2. Set the relevant env variable:
 *        RESEND_API_KEY=re_xxxx          # for Resend
 *        SENDGRID_API_KEY=SG.xxxx        # for SendGrid
 *   3. Replace the stub implementation below with your provider's SDK call.
 *   4. Set EMAIL_FROM in your environment (e.g. "noreply@theincubatorhub.org").
 *
 * All application code should call sendEmail() — never call a provider SDK
 * directly, so swapping providers only requires changing this file.
 */

const FROM_ADDRESS =
  process.env.EMAIL_FROM || "The Incubator Hub <noreply@theincubatorhub.org>"

/**
 * Send a single email.
 *
 * @param {{ to: string, subject: string, html: string, text?: string }} options
 * @returns {Promise<{ ok: boolean, messageId?: string, error?: string }>}
 */
export async function sendEmail({ to, subject, html, text }) {
  if (!process.env.RESEND_API_KEY) {
    // No provider configured — log in development, skip silently in production.
    if (process.env.NODE_ENV !== "production") {
      console.log("[email] (stub) Would send email:", { to, subject })
    }
    return { ok: true, messageId: "stub" }
  }

  // --- Resend implementation (uncomment when RESEND_API_KEY is set) ---
  // const { Resend } = await import("resend")
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // const { data, error } = await resend.emails.send({
  //   from: FROM_ADDRESS,
  //   to,
  //   subject,
  //   html,
  //   text,
  // })
  // if (error) return { ok: false, error: error.message }
  // return { ok: true, messageId: data.id }

  if (process.env.NODE_ENV !== "production") {
    console.warn("[email] RESEND_API_KEY is set but provider code is commented out.")
  }
  return { ok: false, error: "Email provider not configured." }
}

// ---------------------------------------------------------------------------
// Convenience helpers — add more as needed for each notification type.
// ---------------------------------------------------------------------------

export async function sendApplicationStatusEmail({ to, name, programTitle, status }) {
  const statusLabel = {
    SUBMITTED: "received",
    UNDER_REVIEW: "under review",
    ACCEPTED: "accepted",
    REJECTED: "unsuccessful",
    ENROLLED: "enrolled",
  }[status] ?? status.toLowerCase()

  const subject = `Your application to ${programTitle} is ${statusLabel}`
  const html = `
    <p>Hi ${name},</p>
    <p>Your application for <strong>${programTitle}</strong> has been updated.</p>
    <p><strong>Status:</strong> ${statusLabel}</p>
    <p>Log in to your portal to view the full details.</p>
    <p>— The Incubator Hub Team</p>
  `
  return sendEmail({ to, subject, html })
}
