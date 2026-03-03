const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;
const VALID_CURRENCIES = new Set(["NGN", "USD", "EUR"]);
const VALID_FREQUENCIES = new Set(["one-time", "monthly"]);

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
