import test from "node:test";
import assert from "node:assert/strict";
import { consumeRateLimit } from "../src/lib/rate-limit.mjs";

function mockRequest(path = "/api/contact", ip = "127.0.0.1") {
  return {
    nextUrl: { pathname: path },
    headers: {
      get(name) {
        if (name.toLowerCase() === "x-forwarded-for") return ip;
        return null;
      },
    },
  };
}

test("consumeRateLimit blocks when limit exceeded", () => {
  const request = mockRequest("/api/contact", "10.10.10.10");
  const opts = { limit: 2, windowMs: 60_000 };

  const first = consumeRateLimit(request, opts);
  const second = consumeRateLimit(request, opts);
  const third = consumeRateLimit(request, opts);

  assert.equal(first.allowed, true);
  assert.equal(second.allowed, true);
  assert.equal(third.allowed, false);
});
