# The Incubator Hub Web App

Next.js + TinaCMS website for The Incubator Hub.

## Run Locally

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

The build script skips Tina codegen when Tina Cloud env vars are missing:

- `NEXT_PUBLIC_TINA_CLIENT_ID`
- `TINA_TOKEN`

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
