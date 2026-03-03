import { NextResponse } from "next/server";
import { consumeRateLimit } from "@/lib/rate-limit.mjs";
import { getRequestId, logError, logInfo } from "@/lib/logger.mjs";
import { isPayloadTooLarge, validateContactPayload } from "@/lib/validation.mjs";

export async function POST(request) {
  const requestId = getRequestId(request);
  const rl = consumeRateLimit(request, { limit: 12, windowMs: 60_000 });
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

  if (isPayloadTooLarge(request)) {
    return NextResponse.json(
      { error: "Payload too large." },
      { status: 413, headers }
    );
  }

  try {
    const body = await request.json();
    const validation = validateContactPayload(body);
    if (!validation.ok) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400, headers }
      );
    }

    const payload = validation.data;
    logInfo("contact_submission_received", {
      requestId,
      name: payload.name,
      email: payload.email,
      subject: payload.subject || "n/a",
      hasPhone: Boolean(payload.phone),
      messageLength: payload.message.length,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Message received. Our team will get back to you shortly.",
      },
      { headers }
    );
  } catch (error) {
    logError("contact_submission_invalid_payload", error, {
      requestId,
      path: request.nextUrl.pathname,
    });
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400, headers }
    );
  }
}
