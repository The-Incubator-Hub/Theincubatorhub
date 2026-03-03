import test from "node:test";
import assert from "node:assert/strict";
import {
  validateApplicationPayload,
  validateApplicationReviewPayload,
  validateContactPayload,
  validateDonationPayload,
  validateLoginPayload,
  validateNotificationBroadcastPayload,
  validateRegistrationPayload,
} from "../src/lib/validation.mjs";

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

test("validateRegistrationPayload accepts strong password", () => {
  const result = validateRegistrationPayload({
    name: "John Doe",
    email: "john@example.com",
    password: "Strong@123",
  });

  assert.equal(result.ok, true);
  assert.equal(result.data.email, "john@example.com");
});

test("validateRegistrationPayload rejects weak password", () => {
  const result = validateRegistrationPayload({
    name: "John Doe",
    email: "john@example.com",
    password: "password",
  });

  assert.equal(result.ok, false);
  assert.match(result.error, /password/i);
});

test("validateLoginPayload accepts valid credentials shape", () => {
  const result = validateLoginPayload({
    email: "john@example.com",
    password: "Strong@123",
  });

  assert.equal(result.ok, true);
  assert.equal(result.data.email, "john@example.com");
});

test("validateLoginPayload rejects malformed email", () => {
  const result = validateLoginPayload({
    email: "not-an-email",
    password: "Strong@123",
  });

  assert.equal(result.ok, false);
  assert.match(result.error, /valid email/i);
});

test("validateApplicationPayload accepts valid submission", () => {
  const result = validateApplicationPayload({
    programSlug: "skill-up",
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+2348012345678",
    country: "Nigeria",
    currentRole: "Student",
    experienceLevel: "beginner",
    motivation: "I want to build practical skills and start a tech career.",
    goals: "Become job-ready and build a portfolio.",
    availability: "Evenings and weekends",
    linkedinUrl: "https://linkedin.com/in/johndoe",
    portfolioUrl: "https://example.com/portfolio",
  });

  assert.equal(result.ok, true);
  assert.equal(result.data.programSlug, "skill-up");
  assert.equal(result.data.experienceLevel, "beginner");
});

test("validateApplicationPayload rejects invalid program slug", () => {
  const result = validateApplicationPayload({
    programSlug: "bad slug !!",
    fullName: "John Doe",
    email: "john@example.com",
    experienceLevel: "beginner",
    motivation: "I want to build practical skills and start a tech career.",
  });

  assert.equal(result.ok, false);
  assert.match(result.error, /program/i);
});

test("validateApplicationReviewPayload accepts valid review data", () => {
  const result = validateApplicationReviewPayload({
    decision: "accepted",
    score: "92",
    notes: "Strong profile and clear goals.",
  });

  assert.equal(result.ok, true);
  assert.equal(result.data.decision, "ACCEPTED");
  assert.equal(result.data.score, 92);
});

test("validateApplicationReviewPayload rejects invalid score", () => {
  const result = validateApplicationReviewPayload({
    decision: "rejected",
    score: "101",
  });

  assert.equal(result.ok, false);
  assert.match(result.error, /score/i);
});

test("validateNotificationBroadcastPayload accepts valid payload", () => {
  const result = validateNotificationBroadcastPayload({
    title: "Admissions update",
    message: "Admissions decisions have started rolling out.",
    role: "applicant",
    applicationStatus: "submitted",
    link: "/portal/dashboard",
    maxRecipients: "500",
  });

  assert.equal(result.ok, true);
  assert.equal(result.data.role, "APPLICANT");
  assert.equal(result.data.applicationStatus, "SUBMITTED");
  assert.equal(result.data.maxRecipients, 500);
});

test("validateNotificationBroadcastPayload rejects invalid role", () => {
  const result = validateNotificationBroadcastPayload({
    title: "Notice",
    message: "Hello there",
    role: "reviewer",
  });

  assert.equal(result.ok, false);
  assert.match(result.error, /role/i);
});
