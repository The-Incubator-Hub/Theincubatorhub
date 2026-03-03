# The Incubator Hub Web App

Next.js website for The Incubator Hub.

## Run Locally

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Auth + Database Setup (Phase 1)

1. Copy environment variables:

```bash
cp .env.example .env
```

2. Set a real `DATABASE_URL` and `AUTH_SECRET` in `.env`.

3. Generate schema and client:

```bash
npm run db:push
npm run prisma:generate
```

4. Seed program records for the new admissions backend:

```bash
npm run db:sync-programs
```

5. Create an account on `/signup`, then promote it to admin:

```bash
npm run user:promote-admin -- you@example.com
```

## Phase 2 (Applications + Review Queue)

After pulling the latest code, apply the updated Prisma schema:

```bash
npm run db:push
npm run prisma:generate
```

Admissions flow added:

- Applicants submit form at `/programs/[slug]/apply`
- Applicants track status at `/portal/dashboard`
- Admins review and update decisions at `/admin/dashboard`

## Phase 3 (Moodle Transition + Sync Hooks)

Configure Moodle integration values in your environment:

- `MOODLE_BASE_URL` (example: `https://lms.yourdomain.com`)
- `MOODLE_LAUNCH_PATH` (default: `/local/incubator/sso.php`)
- `MOODLE_SYNC_ENDPOINT` (optional webhook target for enrollment sync)
- `MOODLE_SHARED_SECRET` (shared HMAC/JWT secret with your Moodle integration plugin)

Flow added:

- Applicants with `ACCEPTED` or `ENROLLED` status can launch Moodle from `/portal/dashboard`
- Admins can trigger LMS sync from `/admin/dashboard`
- Successful sync can auto-transition `ACCEPTED -> ENROLLED`

Moodle receiver/plugin files are included in this repo at:

- `moodle/local/incubator/`

## Phase 4 (In-App Communications)

Added features:

- Admin broadcast notifications (role/status filtered)
- Applicant notification center on `/portal/dashboard`
- Mark-all-read workflow for applicants

Endpoints:

- `POST /api/admin/notifications/broadcast`
- `GET /api/notifications`
- `POST /api/notifications/read-all`

## Phase 5 (Admissions Analytics + Export)

Added features:

- Admin admissions analytics cards and program performance table
- CSV export for filtered application queues

Endpoints:

- `GET /api/admin/analytics/summary`
- `GET /api/admin/applications/export`

## Phase 6 (Operational Audit Visibility)

Added features:

- Recent operational audit stream on admin dashboard
- LMS sync state visibility on both applicant/admin dashboards

## DB Update for Phases 4-6

`Notification` model was added. Run:

```bash
npm run db:push
npm run prisma:generate
```

## Build

```bash
npm run build
```

## SEO Configuration

Set the production site URL so canonical links, Open Graph URLs, `robots.txt`, and `sitemap.xml` are generated correctly:

- `NEXT_PUBLIC_SITE_URL` (example: `https://yourdomain.com`)

## Tests

```bash
npm test
```

Smoke checks (requires app already running):

```bash
SMOKE_BASE_URL=http://127.0.0.1:3000 npm run test:smoke
```

## Health Check

Use this endpoint for uptime monitoring:

- `GET /api/health`

Example:

```bash
curl -s http://127.0.0.1:3000/api/health
```

## CI and VPS Deploy

Two workflows are included:

- `.github/workflows/ci.yml`
- `.github/workflows/deploy-vps.yml`

Set these GitHub repository secrets for VPS deployment:

- `VPS_HOST`
- `VPS_PORT` (optional, defaults to `22`)
- `VPS_USER`
- `VPS_SSH_KEY`
- `VPS_APP_DIR`
- `VPS_PM2_APP` (optional; if set, workflow runs `pm2 reload`)

Deploy flow on `main`:

1. SSH to VPS
2. `git fetch` + `git pull --ff-only`
3. `npm ci`
4. `npm run build`
5. optional PM2 reload

## Security Hardening Included

- Security headers via `next.config.mjs` (CSP, frame, MIME sniff, referrer, permissions policy)
- API rate limiting on form endpoints
- Request-size guards for form endpoints
- Strict payload validation for contact/donation APIs
- Request ID headers for easier tracing
