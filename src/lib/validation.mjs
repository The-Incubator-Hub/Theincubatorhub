const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;
const PASSWORD_RE =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[\S]{8,128}$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VALID_CURRENCIES = new Set(["NGN", "USD", "EUR"]);
const VALID_FREQUENCIES = new Set(["one-time", "monthly"]);
const VALID_EXPERIENCE_LEVELS = new Set([
  "beginner",
  "intermediate",
  "advanced",
]);
const VALID_REVIEW_DECISIONS = new Set([
  "UNDER_REVIEW",
  "ACCEPTED",
  "REJECTED",
  "ENROLLED",
]);
const VALID_USER_ROLES = new Set(["APPLICANT", "STUDENT", "ADMIN"]);
const VALID_APPLICATION_STATUSES = new Set([
  "DRAFT",
  "SUBMITTED",
  "UNDER_REVIEW",
  "ACCEPTED",
  "REJECTED",
  "ENROLLED",
]);

function cleanText(value, max = 3000) {
  const normalized = String(value ?? "")
    .replace(/\r\n/g, "\n")
    .trim();
  return normalized.slice(0, max);
}

function cleanOptional(value, max = 300) {
  const out = cleanText(value, max);
  return out.length > 0 ? out : "";
}

function normalizeAmount(value) {
  const numeric = Number(String(value ?? "").replace(/,/g, "").trim());
  return Number.isFinite(numeric) ? numeric : 0;
}

function normalizeOptionalUrl(value, max = 320) {
  const raw = cleanOptional(value, max);
  if (!raw) return { ok: true, value: "" };

  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return { ok: false, error: "Only http/https links are allowed." };
    }
    return { ok: true, value: parsed.toString() };
  } catch {
    return { ok: false, error: "Please provide a valid URL." };
  }
}

export function validateContactPayload(body) {
  const name = cleanText(body?.name, 120);
  const email = cleanText(body?.email, 160).toLowerCase();
  const phone = cleanOptional(body?.phone, 40);
  const subject = cleanOptional(body?.subject, 180);
  const message = cleanText(body?.message, 4000);

  if (!name || !email || !message) {
    return { ok: false, error: "Name, email, and message are required." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please provide a valid email address." };
  }
  if (phone && !PHONE_RE.test(phone)) {
    return { ok: false, error: "Please provide a valid phone number." };
  }

  return {
    ok: true,
    data: { name, email, phone, subject, message },
  };
}

export function validateDonationPayload(body) {
  const fullName = cleanText(body?.fullName, 120);
  const email = cleanText(body?.email, 160).toLowerCase();
  const phone = cleanOptional(body?.phone, 40);
  const country = cleanOptional(body?.country, 80);
  const message = cleanOptional(body?.message, 2000);
  const frequency = cleanText(body?.frequency || "one-time", 20).toLowerCase();
  const currency = cleanText(body?.currency || "NGN", 8).toUpperCase();
  const anonymous = Boolean(body?.anonymous);
  const amount = normalizeAmount(body?.selectedAmount);

  if (!fullName || !email || !amount) {
    return { ok: false, error: "Amount, full name, and email are required." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please provide a valid email address." };
  }
  if (phone && !PHONE_RE.test(phone)) {
    return { ok: false, error: "Please provide a valid phone number." };
  }
  if (!VALID_CURRENCIES.has(currency)) {
    return { ok: false, error: "Unsupported currency selected." };
  }
  if (!VALID_FREQUENCIES.has(frequency)) {
    return { ok: false, error: "Unsupported donation frequency selected." };
  }
  if (amount <= 0 || amount > 1000000000) {
    return { ok: false, error: "Donation amount is out of accepted range." };
  }

  return {
    ok: true,
    data: {
      fullName,
      email,
      phone,
      country,
      message,
      frequency,
      currency,
      amount,
      anonymous,
    },
  };
}

export function isPayloadTooLarge(request, maxBytes = 20_000) {
  const header = request.headers.get("content-length");
  if (!header) return false;
  const size = Number(header);
  return Number.isFinite(size) && size > maxBytes;
}

export function validateRegistrationPayload(body) {
  const name = cleanText(body?.name, 120);
  const email = cleanText(body?.email, 160).toLowerCase();
  const password = String(body?.password ?? "").trim();

  if (!name || !email || !password) {
    return { ok: false, error: "Name, email, and password are required." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please provide a valid email address." };
  }
  if (!PASSWORD_RE.test(password)) {
    return {
      ok: false,
      error:
        "Password must be 8+ chars and include uppercase, lowercase, number, and symbol.",
    };
  }

  return {
    ok: true,
    data: { name, email, password },
  };
}

export function validateLoginPayload(body) {
  const email = cleanText(body?.email, 160).toLowerCase();
  const password = String(body?.password ?? "").trim();

  if (!email || !password) {
    return { ok: false, error: "Email and password are required." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please provide a valid email address." };
  }
  if (password.length < 8 || password.length > 128) {
    return { ok: false, error: "Invalid credentials." };
  }

  return {
    ok: true,
    data: { email, password },
  };
}

export function validateApplicationPayload(body) {
  const programSlug = cleanText(body?.programSlug, 100).toLowerCase();
  const fullName = cleanText(body?.fullName, 120);
  const email = cleanText(body?.email, 160).toLowerCase();
  const phone = cleanOptional(body?.phone, 40);
  const country = cleanOptional(body?.country, 80);
  const currentRole = cleanOptional(body?.currentRole, 120);
  const experienceLevel = cleanText(body?.experienceLevel, 20).toLowerCase();
  const motivation = cleanText(body?.motivation, 2500);
  const goals = cleanOptional(body?.goals, 2000);
  const availability = cleanOptional(body?.availability, 200);

  const linkedin = normalizeOptionalUrl(body?.linkedinUrl);
  if (!linkedin.ok) {
    return {
      ok: false,
      error: `LinkedIn URL: ${linkedin.error}`,
    };
  }

  const portfolio = normalizeOptionalUrl(body?.portfolioUrl);
  if (!portfolio.ok) {
    return {
      ok: false,
      error: `Portfolio URL: ${portfolio.error}`,
    };
  }

  if (
    !programSlug ||
    !SLUG_RE.test(programSlug) ||
    programSlug.length < 2 ||
    programSlug.length > 90
  ) {
    return { ok: false, error: "Invalid program selected." };
  }
  if (!fullName || !email || !motivation || !experienceLevel) {
    return {
      ok: false,
      error:
        "Full name, email, experience level, and motivation are required.",
    };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please provide a valid email address." };
  }
  if (phone && !PHONE_RE.test(phone)) {
    return { ok: false, error: "Please provide a valid phone number." };
  }
  if (!VALID_EXPERIENCE_LEVELS.has(experienceLevel)) {
    return { ok: false, error: "Invalid experience level selected." };
  }
  if (motivation.length < 20) {
    return {
      ok: false,
      error: "Motivation should be at least 20 characters long.",
    };
  }

  return {
    ok: true,
    data: {
      programSlug,
      fullName,
      email,
      phone,
      country,
      currentRole,
      experienceLevel,
      motivation,
      goals,
      availability,
      linkedinUrl: linkedin.value,
      portfolioUrl: portfolio.value,
    },
  };
}

export function validateApplicationReviewPayload(body) {
  const decision = cleanText(body?.decision, 32).toUpperCase();
  const notes = cleanOptional(body?.notes, 2000);
  const scoreRaw = cleanOptional(body?.score, 10);

  if (!decision || !VALID_REVIEW_DECISIONS.has(decision)) {
    return { ok: false, error: "Invalid review decision." };
  }

  let score = null;
  if (scoreRaw) {
    const parsedScore = Number(scoreRaw);
    if (!Number.isInteger(parsedScore) || parsedScore < 0 || parsedScore > 100) {
      return { ok: false, error: "Score must be an integer between 0 and 100." };
    }
    score = parsedScore;
  }

  return {
    ok: true,
    data: {
      decision,
      notes: notes || null,
      score,
    },
  };
}

export function validateNotificationBroadcastPayload(body) {
  const title = cleanText(body?.title, 160);
  const message = cleanText(body?.message, 2500);
  const role = cleanText(body?.role, 20).toUpperCase();
  const applicationStatus = cleanText(body?.applicationStatus, 32).toUpperCase();
  const link = cleanOptional(body?.link, 320);
  const maxRecipientsRaw = cleanOptional(body?.maxRecipients, 12);

  if (!title || !message) {
    return { ok: false, error: "Title and message are required." };
  }
  if (role && !VALID_USER_ROLES.has(role)) {
    return { ok: false, error: "Invalid target role." };
  }
  if (applicationStatus && !VALID_APPLICATION_STATUSES.has(applicationStatus)) {
    return { ok: false, error: "Invalid application status filter." };
  }

  if (link) {
    const isRelative = link.startsWith("/");
    let isValidAbsolute = false;
    if (!isRelative) {
      try {
        const parsed = new URL(link);
        isValidAbsolute = parsed.protocol === "http:" || parsed.protocol === "https:";
      } catch {
        isValidAbsolute = false;
      }
    }
    if (!isRelative && !isValidAbsolute) {
      return { ok: false, error: "Notification link must be relative or a valid URL." };
    }
  }

  let maxRecipients = 1000;
  if (maxRecipientsRaw) {
    const parsed = Number(maxRecipientsRaw);
    if (!Number.isInteger(parsed) || parsed < 1 || parsed > 10000) {
      return { ok: false, error: "maxRecipients must be an integer between 1 and 10000." };
    }
    maxRecipients = parsed;
  }

  return {
    ok: true,
    data: {
      title,
      message,
      role: role || null,
      applicationStatus: applicationStatus || null,
      link: link || null,
      maxRecipients,
    },
  };
}
