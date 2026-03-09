import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import { prisma } from "@/lib/prisma.mjs"

const SESSION_COOKIE_NAME = "incubator_session"
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 14
// Refresh the cookie when less than 3 days remain on the session.
const SESSION_REFRESH_THRESHOLD_SECONDS = 60 * 60 * 24 * 3

function getSessionSecret() {
  const secret = process.env.AUTH_SECRET
  if (!secret) {
    throw new Error("AUTH_SECRET is not configured.")
  }
  return new TextEncoder().encode(secret)
}

export async function createSessionToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSessionSecret())
}

export async function verifySessionToken(token) {
  try {
    const { payload } = await jwtVerify(token, getSessionSecret())
    return payload
  } catch {
    return null
  }
}

export async function setSessionCookie(user) {
  const token = await createSessionToken({
    sub: user.id,
    email: user.email,
    role: user.role,
    name: user.name || "",
    tv: user.tokenVersion ?? 0,
  })

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  })
}

export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  })
}

export async function getAuthSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  if (!token) return null

  const payload = await verifySessionToken(token)
  if (!payload?.sub) return null

  const user = await prisma.user.findUnique({
    where: { id: String(payload.sub) },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      tokenVersion: true,
    },
  })

  if (!user || !user.isActive) return null

  // Revocation check: if the token version doesn't match the DB, the session
  // was invalidated (e.g. logout on another device, or admin deactivation).
  if ((payload.tv ?? 0) !== user.tokenVersion) return null

  // Sliding window refresh: re-issue the cookie when < 3 days remain.
  const expiresAt = payload.exp ?? 0
  const secondsRemaining = expiresAt - Math.floor(Date.now() / 1000)
  if (secondsRemaining < SESSION_REFRESH_THRESHOLD_SECONDS) {
    await setSessionCookie(user)
  }

  return { user }
}

