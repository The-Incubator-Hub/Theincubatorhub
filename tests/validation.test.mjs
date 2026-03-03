import test from "node:test";
import assert from "node:assert/strict";
import { validateContactPayload, validateDonationPayload } from "../src/lib/validation.mjs";

test("validateContactPayload accepts valid payload", () => {
  const result = validateContactPayload({
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+2348012345678",
    subject: "Need details",
    message: "Please share more information.",
  });

  assert.equal(result.ok, true);
  assert.equal(result.data.email, "jane@example.com");
});

test("validateContactPayload rejects invalid email", () => {
  const result = validateContactPayload({
    name: "Jane",
    email: "invalid-email",
    message: "Hello",
  });

  assert.equal(result.ok, false);
  assert.match(result.error, /valid email/i);
});

test("validateDonationPayload accepts valid payload", () => {
  const result = validateDonationPayload({
    fullName: "Jane Doe",
    email: "jane@example.com",
    selectedAmount: "25,000",
    currency: "NGN",
    frequency: "monthly",
    anonymous: false,
  });

  assert.equal(result.ok, true);
  assert.equal(result.data.amount, 25000);
  assert.equal(result.data.currency, "NGN");
});

test("validateDonationPayload rejects unsupported currency", () => {
  const result = validateDonationPayload({
    fullName: "Jane Doe",
    email: "jane@example.com",
    selectedAmount: "500",
    currency: "GBP",
  });

  assert.equal(result.ok, false);
  assert.match(result.error, /currency/i);
});
