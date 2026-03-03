import { createHmac } from "node:crypto"
import { SignJWT } from "jose"

const LAUNCH_TOKEN_TTL_SECONDS = 60 * 5

function normalizeUrl(value) {
  const raw = String(value || "").trim()
  if (!raw) return ""
  const withProtocol = raw.startsWith("http") ? raw : `https://${raw}`
  return withProtocol.replace(/\/+$/, "")
}

function normalizePath(value) {
  const raw = String(value || "").trim()
  if (!raw) return "/local/incubator/sso.php"
  return raw.startsWith("/") ? raw : `/${raw}`
}

function getSigningSecret() {
  const secret = process.env.MOODLE_SHARED_SECRET || process.env.AUTH_SECRET
  if (!secret) {
    throw new Error("MOODLE_SHARED_SECRET or AUTH_SECRET is not configured.")
  }
  return secret
}

function getSigningSecretBytes() {
  return new TextEncoder().encode(getSigningSecret())
}

export function getMoodleBaseUrl() {
  return normalizeUrl(process.env.MOODLE_BASE_URL)
}

export function getMoodleLaunchPath() {
  return normalizePath(process.env.MOODLE_LAUNCH_PATH)
}

export function getMoodleSyncEndpoint() {
  return normalizeUrl(process.env.MOODLE_SYNC_ENDPOINT)
}

export function isMoodleLaunchConfigured() {
  return Boolean(getMoodleBaseUrl())
}

export async function createMoodleLaunchToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${LAUNCH_TOKEN_TTL_SECONDS}s`)
    .sign(getSigningSecretBytes())
}

export async function createMoodleLaunchUrl(payload) {
  const baseUrl = getMoodleBaseUrl()
  if (!baseUrl) return null

  const token = await createMoodleLaunchToken(payload)
  const url = new URL(getMoodleLaunchPath(), `${baseUrl}/`)
  url.searchParams.set("token", token)
  url.searchParams.set("source", "incubator")
  return url.toString()
}

export function createMoodleSignature(rawBody, timestamp) {
  return createHmac("sha256", getSigningSecret())
    .update(`${timestamp}.${rawBody}`)
    .digest("hex")
}

export async function sendMoodleEnrollmentSync(payload) {
  const endpoint = getMoodleSyncEndpoint()
  if (!endpoint) {
    return {
      ok: false,
      skipped: true,
      status: 0,
      message: "MOODLE_SYNC_ENDPOINT is not configured.",
    }
  }

  const body = JSON.stringify(payload)
  const timestamp = String(Math.floor(Date.now() / 1000))
  const signature = createMoodleSignature(body, timestamp)

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-incubator-signature": signature,
      "x-incubator-timestamp": timestamp,
    },
    body,
    cache: "no-store",
  })

  const text = await response.text().catch(() => "")
  if (!response.ok) {
    return {
      ok: false,
      skipped: false,
      status: response.status,
      message: text.slice(0, 500) || "Moodle sync endpoint returned an error.",
    }
  }

  return {
    ok: true,
    skipped: false,
    status: response.status,
    message: text.slice(0, 500) || "Sync successful.",
  }
}

