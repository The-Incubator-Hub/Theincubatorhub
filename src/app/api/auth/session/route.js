import { NextResponse } from "next/server"
import { getAuthSession } from "@/lib/auth.mjs"

export async function GET() {
  const session = await getAuthSession()
  return NextResponse.json({
    authenticated: Boolean(session?.user),
    user: session?.user || null,
  })
}

