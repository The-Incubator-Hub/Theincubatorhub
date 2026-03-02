import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_CURRENCIES = new Set(["NGN", "USD", "EUR"]);

function normalizeAmount(value) {
  return Number(String(value || "").replace(/,/g, ""));
}

export async function POST(request) {
  try {
    const body = await request.json();
    const fullName = String(body?.fullName || "").trim();
    const email = String(body?.email || "").trim();
    const phone = String(body?.phone || "").trim();
    const country = String(body?.country || "").trim();
    const message = String(body?.message || "").trim();
    const frequency = String(body?.frequency || "one-time").trim();
    const currency = String(body?.currency || "NGN").trim();
    const anonymous = Boolean(body?.anonymous);
    const amount = normalizeAmount(body?.selectedAmount);

    if (!fullName || !email || !amount) {
      return NextResponse.json(
        { error: "Amount, full name, and email are required." },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!VALID_CURRENCIES.has(currency)) {
      return NextResponse.json(
        { error: "Unsupported currency selected." },
        { status: 400 }
      );
    }

    // TODO: Replace with payment provider integration.
    console.info("Donation request submission", {
      fullName,
      email,
      phone,
      country,
      message,
      frequency,
      currency,
      amount,
      anonymous,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      ok: true,
      message: "Donation request received. We'll contact you with next steps.",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
