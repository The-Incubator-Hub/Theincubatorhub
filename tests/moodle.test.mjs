import test from "node:test"
import assert from "node:assert/strict"
import {
  createMoodleLaunchUrl,
  createMoodleSignature,
} from "../src/lib/moodle.mjs"

test("createMoodleSignature returns deterministic HMAC for same inputs", () => {
  const previousSecret = process.env.MOODLE_SHARED_SECRET
  try {
    process.env.MOODLE_SHARED_SECRET = "test-shared-secret"

    const body = JSON.stringify({ hello: "world" })
    const timestamp = "1700000000"
    const first = createMoodleSignature(body, timestamp)
    const second = createMoodleSignature(body, timestamp)

    assert.equal(first, second)
    assert.equal(typeof first, "string")
    assert.ok(first.length > 10)
  } finally {
    process.env.MOODLE_SHARED_SECRET = previousSecret
  }
})

test("createMoodleLaunchUrl returns null when base url is not configured", async () => {
  const prevBase = process.env.MOODLE_BASE_URL
  const prevSecret = process.env.MOODLE_SHARED_SECRET
  try {
    process.env.MOODLE_BASE_URL = ""
    process.env.MOODLE_SHARED_SECRET = "test-shared-secret"

    const url = await createMoodleLaunchUrl({ sub: "user_1" })
    assert.equal(url, null)
  } finally {
    process.env.MOODLE_BASE_URL = prevBase
    process.env.MOODLE_SHARED_SECRET = prevSecret
  }
})

test("createMoodleLaunchUrl returns signed launch URL when configured", async () => {
  const prevBase = process.env.MOODLE_BASE_URL
  const prevPath = process.env.MOODLE_LAUNCH_PATH
  const prevSecret = process.env.MOODLE_SHARED_SECRET

  try {
    process.env.MOODLE_BASE_URL = "https://lms.example.com"
    process.env.MOODLE_LAUNCH_PATH = "/local/incubator/sso.php"
    process.env.MOODLE_SHARED_SECRET = "test-shared-secret"

    const url = await createMoodleLaunchUrl({
      sub: "user_1",
      email: "user@example.com",
    })

    assert.ok(url.startsWith("https://lms.example.com/local/incubator/sso.php?"))
    assert.ok(url.includes("token="))
    assert.ok(url.includes("source=incubator"))
  } finally {
    process.env.MOODLE_BASE_URL = prevBase
    process.env.MOODLE_LAUNCH_PATH = prevPath
    process.env.MOODLE_SHARED_SECRET = prevSecret
  }
})
