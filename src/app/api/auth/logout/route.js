import { NextResponse } from "next/server"
import { clearSessionCookie } from "@/lib/auth.mjs"

export async function POST() {
  await clearSessionCookie()
  return NextResponse.json({ ok: true })
}

