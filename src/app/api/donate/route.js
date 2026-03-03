import { NextResponse } from "next/server";
import { consumeRateLimit } from "@/lib/rate-limit.mjs";
import { getRequestId, logError, logInfo } from "@/lib/logger.mjs";
import { isPayloadTooLarge, validateDonationPayload } from "@/lib/validation.mjs";

export async function POST(request) {
  const requestId = getRequestId(request);
  const rl = consumeRateLimit(request, { limit: 20, windowMs: 60_000 });
  const headers = {
    "x-request-id": requestId,
    "x-ratelimit-remaining": String(rl.remaining),
    "x-ratelimit-reset": String(Math.ceil(rl.resetAt / 1000)),
  };

  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please retry in a minute." },
      { status: 429, headers: { ...headers, "retry-after": "60" } }
    );
  }

  if (isPayloadTooLarge(request, 25_000)) {
    return NextResponse.json(
      { error: "Payload too large." },
      { status: 413, headers }
    );
  }

  try {
    const body = await request.json();
    const validation = validateDonationPayload(body);
    if (!validation.ok) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400, headers }
      );
    }

    const payload = validation.data;
    logInfo("donation_submission_received", {
      requestId,
      fullName: payload.fullName,
      email: payload.email,
      hasPhone: Boolean(payload.phone),
      country: payload.country || "n/a",
      frequency: payload.frequency,
      currency: payload.currency,
      amount: payload.amount,
      anonymous: payload.anonymous,
      messageLength: payload.message.length,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Donation request received. We'll contact you with next steps.",
      },
      { headers }
    );
  } catch (error) {
    logError("donation_submission_invalid_payload", error, {
      requestId,
      path: request.nextUrl.pathname,
    });
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400, headers }
    );
  }
}
