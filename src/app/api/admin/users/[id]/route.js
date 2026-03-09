import { NextResponse } from "next/server";
import prisma from "@/lib/prisma.mjs";
import { getAuthSession } from "@/lib/auth.mjs";
import { logInfo, logError, getRequestId } from "@/lib/logger.mjs";

export async function GET(request, { params }) {
  const requestId = getRequestId();

  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden." }, { status: 403 });

    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        applications: {
          include: { program: true },
          orderBy: { submittedAt: "desc" },
        },
        enrollments: {
          include: { program: true, cohort: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });

    const { passwordHash, ...safeUser } = user;
    return NextResponse.json({ ok: true, data: safeUser });
  } catch (error) {
    logError("[admin/users/:id GET] Error", { requestId, error: error.message });
    return NextResponse.json({ error: "Failed to load user." }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const requestId = getRequestId();

  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden." }, { status: 403 });

    const { id } = await params;
    const body = await request.json();
    const updates = {};

    if (body.role !== undefined && ["STUDENT", "ADMIN"].includes(body.role)) {
      updates.role = body.role;
    }

    if (body.isActive !== undefined && typeof body.isActive === "boolean") {
      updates.isActive = body.isActive;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update." }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id },
      data: updates,
      select: { id: true, name: true, email: true, role: true, isActive: true },
    });

    logInfo("[admin/users/:id PATCH] User updated", { requestId, targetUserId: id, updates, adminId: session.user.id });

    return NextResponse.json({ ok: true, data: user });
  } catch (error) {
    logError("[admin/users/:id PATCH] Error", { requestId, error: error.message });
    return NextResponse.json({ error: "Failed to update user." }, { status: 500 });
  }
}
