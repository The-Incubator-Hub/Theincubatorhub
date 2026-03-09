import { NextResponse } from "next/server"
import { clearSessionCookie, getAuthSession } from "@/lib/auth.mjs"
import { prisma } from "@/lib/prisma.mjs"

export async function POST() {
  const session = await getAuthSession()

  // Increment tokenVersion to invalidate all active tokens for this user
  // (including sessions open on other devices/browsers).
  if (session?.user?.id) {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { tokenVersion: { increment: 1 } },
    })
  }

  await clearSessionCookie()
  return NextResponse.json({ ok: true })
}

