import { NextResponse } from "next/server";
import prisma from "@/lib/prisma.mjs";
import { getAuthSession } from "@/lib/auth.mjs";
import { consumeRateLimit } from "@/lib/rate-limit.mjs";
import { validateName, validateUrl, validatePhone, sanitizeString } from "@/lib/validation.mjs";
import { logInfo, logError, getRequestId } from "@/lib/logger.mjs";

export async function GET(request) {
  const requestId = getRequestId();

  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        linkedinUrl: true,
        emailVerified: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data: user });
  } catch (error) {
    logError("[profile GET] Error", { requestId, error: error.message });
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}

export async function PATCH(request) {
  const requestId = getRequestId();

  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const rl = consumeRateLimit(`profile-update:${session.user.id}`, 10, 60_000);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait before updating again." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    const body = await request.json();
    const updates = {};

    if (body.name !== undefined) {
      if (!validateName(body.name)) {
        return NextResponse.json({ error: "Please enter a valid name (2-100 characters)." }, { status: 400 });
      }
      updates.name = sanitizeString(body.name);
    }

    if (body.phone !== undefined) {
      if (body.phone && !validatePhone(body.phone)) {
        return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
      }
      updates.phone = body.phone ? sanitizeString(body.phone) : null;
    }

    if (body.linkedinUrl !== undefined) {
      if (body.linkedinUrl && !validateUrl(body.linkedinUrl)) {
        return NextResponse.json({ error: "Please enter a valid LinkedIn URL starting with https://." }, { status: 400 });
      }
      updates.linkedinUrl = body.linkedinUrl ? sanitizeString(body.linkedinUrl) : null;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update." }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: updates,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        linkedinUrl: true,
        emailVerified: true,
      },
    });

    logInfo("[profile PATCH] Profile updated", { requestId, userId: session.user.id });

    return NextResponse.json({ ok: true, data: user });
  } catch (error) {
    logError("[profile PATCH] Error", { requestId, error: error.message });
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
