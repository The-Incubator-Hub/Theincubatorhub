const buckets = new Map();

// Prune expired buckets every 5 minutes to prevent unbounded memory growth.
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
setInterval(() => {
  const ts = Date.now();
  for (const [key, bucket] of buckets) {
    if (ts > bucket.resetAt) buckets.delete(key);
  }
}, CLEANUP_INTERVAL_MS).unref();

function now() {
  return Date.now();
}

function keyFromRequest(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  return `${request.nextUrl.pathname}:${ip}`;
}

export function consumeRateLimit(request, { limit = 20, windowMs = 60_000 } = {}) {
  const key = keyFromRequest(request);
  const ts = now();
  const existing = buckets.get(key);

  if (!existing || ts > existing.resetAt) {
    const fresh = { count: 1, resetAt: ts + windowMs };
    buckets.set(key, fresh);
    return { allowed: true, remaining: limit - 1, resetAt: fresh.resetAt };
  }

  existing.count += 1;
  buckets.set(key, existing);
  const remaining = Math.max(0, limit - existing.count);
  return {
    allowed: existing.count <= limit,
    remaining,
    resetAt: existing.resetAt,
  };
}
