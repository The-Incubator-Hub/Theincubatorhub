import nodemailer from "nodemailer";

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const FROM_NAME = "The Incubator Hub";
const FROM_EMAIL = process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@theincubatorhub.org";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://theincubatorhub.org";

function baseTemplate(content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The Incubator Hub</title>
  <style>
    body { margin: 0; padding: 0; background: #f4f4f5; font-family: 'Segoe UI', Arial, sans-serif; }
    .wrapper { max-width: 600px; margin: 32px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .header { background: #1a1a2e; padding: 28px 40px; text-align: center; }
    .header h1 { color: #ffffff; font-size: 22px; margin: 0; letter-spacing: 0.5px; }
    .header span { color: #4ade80; }
    .body { padding: 36px 40px; }
    .body h2 { color: #1a1a2e; font-size: 20px; margin-top: 0; }
    .body p { color: #374151; line-height: 1.7; font-size: 15px; }
    .btn { display: inline-block; margin: 20px 0; padding: 14px 32px; background: #1a1a2e; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; }
    .btn:hover { background: #16213e; }
    .divider { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
    .footer { background: #f9fafb; padding: 20px 40px; text-align: center; }
    .footer p { color: #6b7280; font-size: 13px; margin: 4px 0; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; }
    .badge-accepted { background: #dcfce7; color: #166534; }
    .badge-rejected { background: #fee2e2; color: #991b1b; }
    .badge-pending { background: #fef9c3; color: #854d0e; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>The <span>Incubator</span> Hub</h1>
    </div>
    <div class="body">
      ${content}
    </div>
    <div class="footer">
      <p>The Incubator Hub &bull; Empowering Africa's Tech Future</p>
      <p>This email was sent to you because you have an account with The Incubator Hub.</p>
      <p>If you didn't request this, please ignore this email.</p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Sends a welcome email after successful registration.
 */
export async function sendWelcomeEmail({ to, name }) {
  const transporter = createTransporter();
  const html = baseTemplate(`
    <h2>Welcome to The Incubator Hub, ${name}!</h2>
    <p>We're thrilled to have you join our community of tech innovators and learners across Africa.</p>
    <p>Your account has been created successfully. You can now:</p>
    <ul style="color:#374151;line-height:1.8;font-size:15px;">
      <li>Browse and apply to our programs</li>
      <li>Track your application status</li>
      <li>Access learning resources</li>
    </ul>
    <a href="${BASE_URL}/portal/dashboard" class="btn">Go to My Dashboard</a>
    <hr class="divider" />
    <p>If you have any questions, feel free to reach out to our support team.</p>
  `);

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to,
    subject: "Welcome to The Incubator Hub!",
    html,
  });
}

/**
 * Sends an email verification link.
 */
export async function sendVerificationEmail({ to, name, verifyUrl }) {
  const transporter = createTransporter();
  const html = baseTemplate(`
    <h2>Verify Your Email Address</h2>
    <p>Hi ${name},</p>
    <p>Thank you for registering. Please verify your email address to complete your account setup.</p>
    <p>Click the button below to verify your email. This link expires in <strong>24 hours</strong>.</p>
    <a href="${verifyUrl}" class="btn">Verify My Email</a>
    <hr class="divider" />
    <p>Or copy and paste this URL into your browser:</p>
    <p style="word-break:break-all;color:#6b7280;font-size:13px;">${verifyUrl}</p>
  `);

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to,
    subject: "Please verify your email address",
    html,
  });
}

/**
 * Sends a password reset link.
 */
export async function sendPasswordResetEmail({ to, name, resetUrl }) {
  const transporter = createTransporter();
  const html = baseTemplate(`
    <h2>Reset Your Password</h2>
    <p>Hi ${name},</p>
    <p>We received a request to reset the password for your Incubator Hub account.</p>
    <p>Click the button below to reset your password. This link expires in <strong>1 hour</strong>.</p>
    <a href="${resetUrl}" class="btn">Reset My Password</a>
    <hr class="divider" />
    <p>Or copy and paste this URL into your browser:</p>
    <p style="word-break:break-all;color:#6b7280;font-size:13px;">${resetUrl}</p>
    <hr class="divider" />
    <p><strong>Didn't request this?</strong> You can safely ignore this email. Your password will not be changed.</p>
  `);

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to,
    subject: "Reset your Incubator Hub password",
    html,
  });
}

/**
 * Sends a notification about application status change.
 */
export async function sendApplicationStatusEmail({ to, name, programTitle, status, portalUrl }) {
  const transporter = createTransporter();

  const statusMessages = {
    ACCEPTED: {
      subject: `Congratulations! Your application to ${programTitle} has been accepted`,
      headline: "Application Accepted!",
      message: `We are delighted to inform you that your application to <strong>${programTitle}</strong> has been <strong>accepted</strong>. Welcome to The Incubator Hub family!`,
      badgeClass: "badge-accepted",
      badgeText: "ACCEPTED",
      cta: "Log in to your portal to view next steps and begin your learning journey.",
    },
    REJECTED: {
      subject: `Update on your application to ${programTitle}`,
      headline: "Application Update",
      message: `Thank you for your interest in <strong>${programTitle}</strong>. After careful review, we are unable to offer you a place at this time.`,
      badgeClass: "badge-rejected",
      badgeText: "NOT ACCEPTED",
      cta: "We encourage you to apply again in future cohorts. Visit your portal to explore other opportunities.",
    },
    UNDER_REVIEW: {
      subject: `Your application to ${programTitle} is under review`,
      headline: "Application Under Review",
      message: `Your application to <strong>${programTitle}</strong> is currently being reviewed by our team. We will notify you once a decision has been made.`,
      badgeClass: "badge-pending",
      badgeText: "UNDER REVIEW",
      cta: "You can check your application status anytime in your portal.",
    },
    PENDING: {
      subject: `Application received for ${programTitle}`,
      headline: "Application Received",
      message: `We have received your application for <strong>${programTitle}</strong>. Our team will review it shortly.`,
      badgeClass: "badge-pending",
      badgeText: "PENDING",
      cta: "You can check your application status anytime in your portal.",
    },
  };

  const info = statusMessages[status] || statusMessages.PENDING;

  const html = baseTemplate(`
    <h2>${info.headline}</h2>
    <p>Hi ${name},</p>
    <p>${info.message}</p>
    <p>Status: <span class="badge ${info.badgeClass}">${info.badgeText}</span></p>
    <hr class="divider" />
    <p>${info.cta}</p>
    <a href="${portalUrl}" class="btn">View My Application</a>
  `);

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to,
    subject: info.subject,
    html,
  });
}

/**
 * Sends a cohort assignment notification to a student.
 */
export async function sendCohortAssignmentEmail({ to, name, programTitle, cohortName, startDate, moodleUrl }) {
  const transporter = createTransporter();
  const formattedDate = startDate
    ? new Date(startDate).toLocaleDateString("en-NG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    : "TBD";

  const html = baseTemplate(`
    <h2>You've Been Enrolled in a Cohort!</h2>
    <p>Hi ${name},</p>
    <p>Great news! You have been assigned to a cohort for <strong>${programTitle}</strong>.</p>
    <table style="width:100%;border-collapse:collapse;margin:16px 0;">
      <tr>
        <td style="padding:8px 0;color:#6b7280;font-size:14px;">Program:</td>
        <td style="padding:8px 0;color:#1a1a2e;font-weight:600;font-size:14px;">${programTitle}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#6b7280;font-size:14px;">Cohort:</td>
        <td style="padding:8px 0;color:#1a1a2e;font-weight:600;font-size:14px;">${cohortName}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#6b7280;font-size:14px;">Start Date:</td>
        <td style="padding:8px 0;color:#1a1a2e;font-weight:600;font-size:14px;">${formattedDate}</td>
      </tr>
    </table>
    <hr class="divider" />
    <p>Your learning journey is about to begin! Click the button below to access your course materials.</p>
    ${moodleUrl ? `<a href="${moodleUrl}" class="btn">Access My Course</a>` : `<a href="${BASE_URL}/portal/dashboard" class="btn">Go to My Portal</a>`}
  `);

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to,
    subject: `You're enrolled! ${programTitle} — ${cohortName} starts ${formattedDate}`,
    html,
  });
}
