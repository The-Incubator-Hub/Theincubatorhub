import { createHmac } from "node:crypto";

const MOODLE_BASE_URL = process.env.MOODLE_BASE_URL || "";
const MOODLE_TOKEN = process.env.MOODLE_TOKEN || "";
const MOODLE_WEBHOOK_SECRET = process.env.MOODLE_WEBHOOK_SECRET || "change-me-in-production";
const SSO_SECRET = process.env.MOODLE_SSO_SECRET || "change-me-in-production";

/**
 * Creates a HMAC-SHA256 signature for a Moodle webhook payload.
 * Used to verify webhook authenticity.
 */
export function createMoodleSignature(body) {
  return createHmac("sha256", MOODLE_WEBHOOK_SECRET)
    .update(typeof body === "string" ? body : JSON.stringify(body))
    .digest("hex");
}

/**
 * Verifies a Moodle webhook request signature.
 */
export function verifyMoodleSignature(body, signature) {
  if (!signature) return false;
  const expected = createMoodleSignature(body);
  // Constant-time comparison to prevent timing attacks
  if (expected.length !== signature.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return mismatch === 0;
}

/**
 * Generates an SSO launch URL for a Moodle course.
 * Uses a time-limited token approach.
 */
export function generateMoodleSsoUrl(userId, courseId) {
  if (!MOODLE_BASE_URL) return null;
  const timestamp = Date.now();
  const token = createHmac("sha256", SSO_SECRET)
    .update(`${userId}:${courseId}:${timestamp}`)
    .digest("hex");
  return `${MOODLE_BASE_URL}/auth/token/launch.php?userid=${userId}&courseid=${courseId}&ts=${timestamp}&sig=${token}`;
}

/**
 * Calls the Moodle REST API.
 */
export async function moodleApi(wsfunction, params = {}) {
  if (!MOODLE_BASE_URL || !MOODLE_TOKEN) {
    throw new Error("Moodle not configured");
  }

  const url = new URL(`${MOODLE_BASE_URL}/webservice/rest/server.php`);
  url.searchParams.set("wstoken", MOODLE_TOKEN);
  url.searchParams.set("wsfunction", wsfunction);
  url.searchParams.set("moodlewsrestformat", "json");

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Moodle API error: ${response.status}`);
  }

  const data = await response.json();
  if (data.exception) {
    throw new Error(data.message || "Moodle API error");
  }

  return data;
}
