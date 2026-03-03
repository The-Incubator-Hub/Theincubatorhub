import { randomUUID } from "node:crypto";

function scrub(value) {
  if (value == null) return value;
  if (typeof value === "string" && value.length > 400) {
    return `${value.slice(0, 400)}...`;
  }
  return value;
}

export function getRequestId(request) {
  return request.headers.get("x-request-id") || randomUUID();
}

export function logInfo(event, payload = {}) {
  const data = Object.fromEntries(
    Object.entries(payload).map(([k, v]) => [k, scrub(v)])
  );
  console.info(JSON.stringify({ level: "info", event, ...data }));
}

export function logError(event, error, payload = {}) {
  const base = {
    level: "error",
    event,
    message: error instanceof Error ? error.message : String(error),
  };
  const data = Object.fromEntries(
    Object.entries(payload).map(([k, v]) => [k, scrub(v)])
  );
  console.error(JSON.stringify({ ...base, ...data }));
}
