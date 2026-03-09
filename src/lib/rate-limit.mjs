/**
 * Simple in-memory rate limiter.
 * For production use a Redis-backed implementation.
 *
 * key: string identifier (e.g. IP + route)
 * limit: max requests allowed
 * windowMs: time window in milliseconds
 */

const store = new Map();

export function consumeRateLimit(key, limit = 10, windowMs = 60_000) {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count++;
  return { allowed: true, remaining: limit - entry.count };
}

// Cleanup old entries periodically to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetAt) {
      store.delete(key);
    }
  }
}, 5 * 60_000);
