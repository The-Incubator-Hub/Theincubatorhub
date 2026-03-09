# The Incubator Hub — Hostinger VPS Deployment Guide

A complete, step-by-step guide to deploying this Next.js application alongside your existing Moodle LMS on a Hostinger VPS.

**Assumed setup:**
- Moodle LMS is already running at `portal.theincubatorhub.org` (or your domain)
- You want this Next.js portal at `app.theincubatorhub.org` (or a subdomain of your choice)
- Ubuntu 22.04 / 24.04 LTS on Hostinger VPS
- SSH access as root or a sudo user

---

## Architecture Overview

```
Internet
   │
   ▼
Nginx (port 80/443)
   ├── app.theincubatorhub.org  → Next.js app (port 3000)
   └── portal.theincubatorhub.site → Moodle (Apache/Nginx, existing)

PostgreSQL (port 5432, localhost only)
   ├── moodle_db        ← existing Moodle database
   └── incubator_db     ← new database for this app

PM2 Process Manager
   └── incubator        ← Next.js app process
```

---

## Before You Start — Checklist

- [ ] SSH into your VPS and confirm Moodle is running
- [ ] Your app subdomain DNS A record points to the VPS IP (e.g. `app.theincubatorhub.org → 185.x.x.x`)
- [ ] You have a GitHub Personal Access Token (or SSH key) to clone the repo
- [ ] You have a Resend account (free) for transactional emails: https://resend.com
- [ ] You know your Moodle DB password (you will NOT touch it — just confirming PostgreSQL is accessible)

---

## Step 1 — SSH Into Your VPS

From your local machine:

```bash
ssh root@YOUR_VPS_IP
```

Or if using a non-root sudo user:

```bash
ssh youruser@YOUR_VPS_IP
```

Confirm the OS version:

```bash
lsb_release -a
```

---

## Step 2 — Install Required System Packages

> Skip any package already installed. If Moodle is running, you likely already have Nginx/Apache, PostgreSQL, and possibly Node.js.

Update package lists:

```bash
apt update && apt upgrade -y
```

Install required tools (skip what you already have):

```bash
apt install -y git curl wget unzip nginx postgresql postgresql-contrib certbot python3-certbot-nginx
```

### Install Node.js 20

Check if Node is already installed:

```bash
node -v
```

If not installed or version is below 18, install Node.js 20:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node -v    # should show v20.x.x
npm -v     # should show 10.x.x
```

### Install PM2

```bash
npm install -g pm2
pm2 -v
```

---

## Step 3 — Check PostgreSQL Is Running

Your Moodle is already using PostgreSQL. Verify it is running:

```bash
systemctl status postgresql
```

If it shows `active (running)` — you are good. Do NOT restart or reinstall it.

If it is stopped for some reason:

```bash
systemctl start postgresql
systemctl enable postgresql
```

---

## Step 4 — Create a Separate Database for This App

> IMPORTANT: Do NOT touch your Moodle database. You are creating a brand new database.

Open the PostgreSQL shell:

```bash
sudo -u postgres psql
```

Inside the shell, run these commands one at a time:

```sql
-- Create a dedicated user for this app
CREATE USER incubator WITH PASSWORD 'ChooseAStrongPassword123!';

-- Create a dedicated database owned by that user
CREATE DATABASE incubator_db OWNER incubator;

-- Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE incubator_db TO incubator;

-- Exit
\q
```

Test the connection (replace password with what you chose):

```bash
psql -U incubator -d incubator_db -h 127.0.0.1 -c "SELECT version();"
```

You should see the PostgreSQL version. If it fails, check the password and try again.

---

## Step 5 — Clone the Repository

Create the app directory:

```bash
mkdir -p /var/www/incubator
cd /var/www/incubator
```

Clone the `feature/portal-upgrade` branch (or `main` once merged):

```bash
git clone -b feature/portal-upgrade https://github.com/The-Incubator-Hub/Theincubatorhub.git .
```

If the repository is private, use a Personal Access Token:

```bash
git clone -b feature/portal-upgrade https://YOUR_GITHUB_TOKEN@github.com/The-Incubator-Hub/Theincubatorhub.git .
```

Verify the clone:

```bash
ls -la
# You should see: package.json, src/, prisma/, content/, etc.
```

---

## Step 6 — Create the Environment File

Create the `.env` file:

```bash
nano /var/www/incubator/.env
```

Paste and fill in the following (replace ALL placeholder values):

```env
# ─── Database ─────────────────────────────────────────────────────────────────
DATABASE_URL="postgresql://incubator:ChooseAStrongPassword123!@127.0.0.1:5432/incubator_db?schema=public"

# ─── Authentication ───────────────────────────────────────────────────────────
# Generate with: openssl rand -base64 48
AUTH_SECRET="PASTE_YOUR_GENERATED_SECRET_HERE"
AUTH_URL="https://app.theincubatorhub.org"
NEXT_PUBLIC_SITE_URL="https://app.theincubatorhub.org"

# ─── Email (Resend) ───────────────────────────────────────────────────────────
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
EMAIL_FROM="The Incubator Hub <noreply@theincubatorhub.org>"

# ─── Moodle LMS Integration ───────────────────────────────────────────────────
MOODLE_BASE_URL="https://portal.theincubatorhub.org"
MOODLE_LAUNCH_PATH="/local/incubator/sso.php"
MOODLE_SYNC_ENDPOINT="https://portal.theincubatorhub.org/local/incubator/sync.php"
# Must match exactly what is configured in the Moodle plugin settings
MOODLE_SHARED_SECRET="YOUR_MOODLE_SHARED_SECRET"

# ─── App Environment ──────────────────────────────────────────────────────────
NODE_ENV="production"
PORT=3000
```

Save and exit: `Ctrl+X` → `Y` → `Enter`

**Generate the AUTH_SECRET** (run this and paste the output into the file):

```bash
openssl rand -base64 48
```

**Protect the .env file** so only root can read it:

```bash
chmod 600 /var/www/incubator/.env
```

Verify it is not readable by others:

```bash
ls -la /var/www/incubator/.env
# Should show: -rw------- (600)
```

---

## Step 7 — Install Dependencies

```bash
cd /var/www/incubator
npm ci --ignore-scripts
```

> `--ignore-scripts` prevents any postinstall scripts from running prematurely. We will generate Prisma manually.

---

## Step 8 — Set Up the Database Schema

Generate the Prisma client:

```bash
npx prisma generate
```

Apply the database schema (creates all tables):

```bash
npx prisma migrate deploy
```

> If you get an error about no migrations found, the schema needs an initial migration. Run:
> ```bash
> npx prisma migrate dev --name init
> ```
> Then re-run `npx prisma migrate deploy`.

Seed the programs into the database:

```bash
npm run db:sync-programs
```

Verify the tables were created:

```bash
sudo -u postgres psql -d incubator_db -c "\dt"
```

You should see tables like: `User`, `Application`, `Program`, `Notification`, `AuditLog`, etc.

---

## Step 9 — Build the Application

```bash
cd /var/www/incubator
npm run build
```

This will take 1–3 minutes. A successful build ends with something like:

```
✓ Compiled successfully
Route (app)                               Size     First Load JS
...
○  (Static)   prerendered as static content
```

Verify the build output exists:

```bash
test -f /var/www/incubator/.next/BUILD_ID && echo "✅ Build OK" || echo "❌ Build missing"
```

**Do not continue if the build fails.** Fix any errors before moving on.

---

## Step 10 — Create Your First Admin Account

Start the app temporarily to register:

```bash
npm start &
sleep 3
```

Go to `http://YOUR_VPS_IP:3000/signup` in your browser (or curl), create your account, then promote it to admin:

```bash
npm run user:promote-admin -- youremail@example.com
```

Stop the temporary server:

```bash
kill %1
```

---

## Step 11 — Run the App with PM2

Start the app as a managed process:

```bash
cd /var/www/incubator
pm2 start npm --name incubator --cwd /var/www/incubator -- start
```

Save the process list (so it survives reboots):

```bash
pm2 save
```

Configure PM2 to start on system boot:

```bash
pm2 startup
```

Copy and run the command it outputs (it will look like `sudo env PATH=... pm2 startup ...`).

Check that the app is running:

```bash
pm2 status
```

You should see `incubator` with status `online`.

Check the logs for any startup errors:

```bash
pm2 logs incubator --lines 50 --nostream
```

Test the app is responding locally:

```bash
curl -s http://127.0.0.1:3000/api/health
```

Should return JSON. If it returns nothing or an error, check `pm2 logs incubator` for the problem.

---

## Step 12 — Configure Nginx

> Your Moodle already has an Nginx (or Apache) config. You are adding a NEW server block for this app. Do NOT edit the Moodle config.

Create a new Nginx config for this app:

```bash
nano /etc/nginx/sites-available/incubator
```

Paste the following (replace `app.theincubatorhub.org` with your actual subdomain):

```nginx
server {
    listen 80;
    server_name app.theincubatorhub.org;

    # Security: hide Nginx version
    server_tokens off;

    # Max upload size (for CV/file uploads)
    client_max_body_size 10M;

    # Proxy to Next.js
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout    60s;
        proxy_read_timeout    60s;
    }

    # Cache static Next.js assets
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_bypass $http_upgrade;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Cache public images/media
    location /incubator-media/ {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, max-age=604800";
    }
}
```

Save and exit: `Ctrl+X` → `Y` → `Enter`

Enable the site:

```bash
ln -sf /etc/nginx/sites-available/incubator /etc/nginx/sites-enabled/incubator
```

Test the Nginx config:

```bash
nginx -t
```

Must show: `syntax is ok` and `test is successful`. If there are errors, fix them before reloading.

Reload Nginx:

```bash
systemctl reload nginx
```

---

## Step 13 — Add SSL/HTTPS with Let's Encrypt

> Make sure your DNS A record for `app.theincubatorhub.org` is already pointing to this VPS IP before running this. DNS changes can take up to 24 hours to propagate but are usually instant on Hostinger.

Issue the SSL certificate:

```bash
certbot --nginx -d app.theincubatorhub.org
```

Follow the prompts:
- Enter your email address
- Agree to the Terms of Service
- Choose whether to share your email with EFF (optional)
- Select option **2** to redirect HTTP to HTTPS (recommended)

Certbot will automatically update your Nginx config to add the SSL block.

Verify HTTPS is working:

```bash
curl -I https://app.theincubatorhub.org
```

Should return `HTTP/2 200`.

Test that auto-renewal works:

```bash
certbot renew --dry-run
```

Should complete without errors. Certificates auto-renew every 90 days via a cron job that Certbot installs automatically.

---

## Step 14 — Final End-to-End Verification

Run all these checks and confirm each passes:

```bash
# 1. App process is running
pm2 status

# 2. Health check API responds
curl -s https://app.theincubatorhub.org/api/health

# 3. HTTPS headers are correct
curl -I https://app.theincubatorhub.org

# 4. Database has data
sudo -u postgres psql -d incubator_db -c "SELECT COUNT(*) FROM \"Program\";"
```

Open in your browser:

| URL | Expected |
|-----|----------|
| `https://app.theincubatorhub.org` | Home page loads |
| `https://app.theincubatorhub.org/signup` | Signup form |
| `https://app.theincubatorhub.org/login` | Login form |
| `https://app.theincubatorhub.org/portal/dashboard` | Redirects to login |
| `https://app.theincubatorhub.org/admin/dashboard` | Redirects to login |

---

## Step 15 — Wire Up Email (Resend)

1. Sign up at https://resend.com (free — 3,000 emails/month)
2. Go to **API Keys** → Create a new key
3. Go to **Domains** → Add and verify your domain (`theincubatorhub.org`)
4. Add the DKIM and SPF DNS records that Resend shows you (in Hostinger DNS panel)
5. Paste your API key into `.env`:

```bash
nano /var/www/incubator/.env
# Update: RESEND_API_KEY="re_your_actual_key"
```

6. Enable the Resend code in [src/lib/email.mjs](src/lib/email.mjs) — uncomment the Resend block:

```bash
nano /var/www/incubator/src/lib/email.mjs
```

Uncomment these lines (remove the `//` prefixes):

```js
const { Resend } = await import("resend")
const resend = new Resend(process.env.RESEND_API_KEY)
const { data, error } = await resend.emails.send({ ... })
```

Install Resend:

```bash
cd /var/www/incubator
npm install resend
npm run build
pm2 restart incubator --update-env
```

Test by registering a new account — you should receive a verification email.

---

## Step 16 — Connect to Moodle LMS

Confirm your Moodle plugin values match your `.env`:

```bash
# Check what's in your .env
grep MOODLE /var/www/incubator/.env
```

In your Moodle admin panel:
1. Go to **Site Administration → Plugins → Local plugins → Incubator Hub**
2. Set **Shared Secret** to match `MOODLE_SHARED_SECRET` in your `.env` exactly
3. Set **Next.js Portal URL** to `https://app.theincubatorhub.org`

Test the SSO connection from the portal by logging in as an accepted applicant and clicking "Open in Moodle LMS".

---

## Step 17 — Set Up Firewall

Restrict access to only necessary ports:

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
ufw status
```

You should see:

```
22/tcp    ALLOW IN
80/tcp    ALLOW IN
443/tcp   ALLOW IN
```

PostgreSQL (port 5432) is only accessible from `localhost` — this is correct and secure. Do NOT open it to the internet.

---

## Step 18 — Deploy Updates (Every Future Release)

Every time you merge changes to your deploy branch on GitHub, run this on the VPS:

```bash
cd /var/www/incubator

# Pull latest code
git fetch origin
git checkout feature/portal-upgrade   # or 'main' after merging
git pull --ff-only origin feature/portal-upgrade

# Install any new dependencies
npm ci --ignore-scripts

# Apply any new database migrations
npx prisma generate
npx prisma migrate deploy

# Sync program content if changed
npm run db:sync-programs

# Rebuild the app
npm run build

# Reload the process (zero-downtime)
pm2 reload incubator --update-env

# Save updated process list
pm2 save
```

> `pm2 reload` (not `restart`) does a graceful reload — the old process keeps serving requests until the new one is ready. Zero downtime.

---

## Step 19 — Set Up Automated GitHub Actions Deployment (Optional)

Your repo already has `.github/workflows/deploy-vps.yml`. To activate it:

1. Go to your GitHub repo → **Settings → Secrets and variables → Actions**
2. Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `VPS_HOST` | Your VPS IP address |
| `VPS_PORT` | `22` (default SSH port) |
| `VPS_USER` | `root` (or your sudo user) |
| `VPS_SSH_KEY` | Contents of your VPS private SSH key (`cat ~/.ssh/id_rsa`) |
| `VPS_APP_DIR` | `/var/www/incubator` |
| `VPS_PM2_APP` | `incubator` |

3. Push to `main` → GitHub Actions will automatically SSH into your VPS and deploy.

To generate an SSH key pair for GitHub (if you don't have one):

```bash
# On your LOCAL machine
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/incubator_deploy
cat ~/.ssh/incubator_deploy.pub  # Add this to VPS: echo "..." >> ~/.ssh/authorized_keys
cat ~/.ssh/incubator_deploy      # Paste this into GitHub secret VPS_SSH_KEY
```

---

## Monitoring & Maintenance

### View live logs

```bash
pm2 logs incubator
```

### View error logs only

```bash
pm2 logs incubator --err --lines 100
```

### Check memory and CPU usage

```bash
pm2 monit
```

### Check Nginx access/error logs

```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Check disk space (images can add up)

```bash
df -h /var/www/incubator
du -sh /var/www/incubator/public/incubator-media/
```

### Backup the database

```bash
sudo -u postgres pg_dump incubator_db > /root/incubator_db_backup_$(date +%Y%m%d).sql
```

Restore from backup:

```bash
sudo -u postgres psql incubator_db < /root/incubator_db_backup_20260101.sql
```

---

## Troubleshooting

### App won't start — `AUTH_SECRET is not configured`

```bash
cat /var/www/incubator/.env | grep AUTH_SECRET
# If empty, add it:
echo 'AUTH_SECRET="'$(openssl rand -base64 48)'"' >> /var/www/incubator/.env
pm2 restart incubator --update-env
```

### Database connection error — `P1001: Can't reach database`

```bash
systemctl status postgresql
# If stopped:
systemctl start postgresql
# Check DATABASE_URL in .env
grep DATABASE_URL /var/www/incubator/.env
```

### Build fails — `Module not found`

```bash
cd /var/www/incubator
rm -rf node_modules .next
npm ci --ignore-scripts
npm run build
```

### Nginx shows 502 Bad Gateway

The Next.js app is not running. Check:

```bash
pm2 status
pm2 logs incubator --lines 30 --nostream
```

If the app crashed, restart it:

```bash
pm2 start incubator
```

### SSL certificate expired or not renewing

```bash
certbot certificates           # check expiry dates
certbot renew                  # force renewal
systemctl reload nginx         # apply new cert
```

### Port 3000 already in use

```bash
lsof -i :3000                  # find what's using it
pm2 delete all                 # clear all PM2 processes
pm2 start npm --name incubator --cwd /var/www/incubator -- start
```

### Moodle SSO not working — redirect errors

1. Confirm `MOODLE_BASE_URL` has no trailing slash
2. Confirm `MOODLE_SHARED_SECRET` matches exactly in both `.env` and Moodle plugin settings
3. Check the Moodle plugin SSO endpoint exists: `curl -I https://portal.theincubatorhub.org/local/incubator/sso.php`

### Uploads not working — file permission error

```bash
mkdir -p /var/www/incubator/public/incubator-media/uploads
chown -R www-data:www-data /var/www/incubator/public/incubator-media/uploads
chmod -R 755 /var/www/incubator/public/incubator-media/uploads
```

---

## Security Checklist

- [ ] `.env` file has `chmod 600` permissions
- [ ] `AUTH_SECRET` is at least 48 random characters
- [ ] PostgreSQL port 5432 is NOT open to the internet (`ufw status`)
- [ ] Nginx is serving HTTPS with a valid certificate
- [ ] `pm2 save` has been run so the app survives reboots
- [ ] Moodle `SHARED_SECRET` is a long random string, not a simple word
- [ ] SSH uses key-based auth (not just password)
- [ ] Auto SSL renewal is working (`certbot renew --dry-run`)

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `AUTH_SECRET` | Yes | JWT signing secret (min 32 chars) |
| `AUTH_URL` | Yes | Full URL of this app (with https) |
| `NEXT_PUBLIC_SITE_URL` | Yes | Same as AUTH_URL |
| `RESEND_API_KEY` | Recommended | Email delivery API key |
| `EMAIL_FROM` | Recommended | Sender name and email |
| `MOODLE_BASE_URL` | If using LMS | Moodle site URL (no trailing slash) |
| `MOODLE_LAUNCH_PATH` | If using LMS | SSO endpoint path on Moodle |
| `MOODLE_SYNC_ENDPOINT` | If using LMS | Webhook sync URL on Moodle |
| `MOODLE_SHARED_SECRET` | If using LMS | HMAC signing secret shared with Moodle |
| `NODE_ENV` | Yes | Set to `production` |
| `PORT` | No | Default is `3000` |
