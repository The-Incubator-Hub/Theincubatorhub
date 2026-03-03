# Incubator Moodle Bridge (`local_incubator`)

This plugin provides the Moodle-side endpoints expected by the Incubator Next.js app:

- Launch endpoint: `/local/incubator/sso.php`
- Sync endpoint: `/local/incubator/sync.php`

The implementation matches the Phase 3 contracts already implemented in the web app.

## 1. Install

1. Copy this folder to your Moodle server as:
   - `YOUR_MOODLE_DIR/local/incubator`
2. Run Moodle upgrade:
   - Site administration -> Notifications
3. Open plugin settings:
   - Site administration -> Plugins -> Local plugins -> Incubator LMS Bridge

## 2. Required configuration

Set at minimum:

- `Shared secret`
  - Must exactly match `MOODLE_SHARED_SECRET` in the Next.js app.
- `Program-to-course map (JSON)`
  - Example:
    ```json
    {
      "skill-up": 12,
      "future-now": 34,
      "ai-now": 56
    }
    ```
- Optional fallback:
  - `Default Moodle course ID`

If you prefer environment variables, `INCUBATOR_SHARED_SECRET` is also supported as a fallback secret source.

## 3. SSO launch contract (`sso.php`)

The Next.js app sends:

- Method: `GET`
- Query:
  - `token`: HS256 JWT (5-minute TTL)
  - `source=incubator`

JWT claims currently emitted by Next.js:

- `sub` (string): Incubator user ID
- `email` (string): Applicant email
- `name` (string): Applicant name
- `role` (string): `student`
- `applicationId` (string)
- `programSlug` (string)
- `programTitle` (string)
- `returnUrl` (string)
- standard `iat`, `exp`

Validation behavior:

- Requires HS256 header.
- Signature verification with shared secret.
- `exp/nbf` validated with configurable `JWT leeway`.
- Requires `sub` and `email`.

Post-validation behavior:

1. Finds or creates Moodle user by email.
2. Resolves course from `programSlug` mapping.
3. Enrolls via manual enrollment instance.
4. Redirects to course page (`/course/view.php?id=<id>`), otherwise `/my/`.

## 4. Enrollment sync contract (`sync.php`)

The Next.js admin endpoint `POST /api/admin/lms/sync` sends:

- Method: `POST`
- Headers:
  - `content-type: application/json`
  - `x-incubator-timestamp: <unix-seconds>`
  - `x-incubator-signature: <hex-hmac-sha256>`
- Signature algorithm:
  - `HMAC_SHA256(secret, "<timestamp>.<raw_json_body>")`

Body schema:

```json
{
  "event": "applicant.enrollment.sync",
  "timestamp": "2026-03-03T18:20:00.000Z",
  "applicant": {
    "id": "clx...",
    "name": "Jane Doe",
    "email": "jane@example.com"
  },
  "program": {
    "id": "clp...",
    "slug": "skill-up",
    "title": "Skill Up"
  },
  "application": {
    "id": "cla...",
    "status": "ACCEPTED",
    "submittedAt": "2026-03-02T14:10:00.000Z",
    "decisionAt": "2026-03-03T10:00:00.000Z"
  }
}
```

Validation behavior:

- Timestamp must be numeric and within configurable `Webhook max skew`.
- HMAC signature must match exactly (`hash_equals`).
- Payload must include event/applicant/program/application fields.
- Event must be `applicant.enrollment.sync`.

Processing behavior:

1. Find/create Moodle user by applicant email.
2. Resolve course by `program.slug`.
3. Enroll user via manual enrollment instance.
4. Return JSON result.

## 5. Response contract (`sync.php`)

Success (`200`):

```json
{
  "ok": true,
  "message": "Enrollment sync completed.",
  "result": {
    "userid": 123,
    "courseid": 34,
    "programslug": "future-now",
    "applicationid": "cla...",
    "enrolled": true
  }
}
```

Client/auth errors:

- `401`: invalid timestamp/signature
- `422`: no course mapping, invalid course, missing manual enrollment instance
- `400`: malformed payload
- `500`: missing shared secret or server/plugin issues

## 6. Production notes

- Keep plugin settings and Next.js `.env` in sync for secret values.
- Ensure mapped courses have an enabled **manual enrollment** instance.
- Keep Moodle server time accurate (NTP) to avoid signature/timestamp rejection.

