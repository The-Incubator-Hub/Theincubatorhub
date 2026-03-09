# VPS Setup README (Step by Step)

This guide shows how to deploy this app on a VPS and keep it easy to update from GitHub.

Use this when you want:

- `app.learnlive.site` to serve this Next.js app
- Moodle hosted alongside it (for example on `portal.learnlive.site`)
- a safe update process using `git pull`

## 1) What you need first

- A Linux VPS (Ubuntu recommended)
- A domain/subdomain already pointing to the VPS IP
- SSH access as root or a sudo user
- GitHub repo access

## 2) Install system packages

```bash
apt update
apt install -y git curl nginx postgresql postgresql-contrib
```

Install Node.js 20 if it is not already installed:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node -v
npm -v
```

Install PM2 globally:

```bash
npm install -g pm2
pm2 -v
```

## 3) Clone the app branch

Create the app folder and clone your deploy branch:

```bash
mkdir -p /var/www/incubator
cd /var/www/incubator
git clone -b app-deploy https://github.com/The-Incubator-Hub/Theincubatorhub.git .
```

For later updates:

```bash
cd /var/www/incubator
git fetch origin
git checkout app-deploy
git pull --ff-only origin app-deploy
```

## 4) Create the environment file (`.env`)

Create `.env` in `/var/www/incubator/.env`:

```env
DATABASE_URL="postgresql://incubator:MyPassword2026@127.0.0.1:5432/incubator?schema=public"
AUTH_SECRET="GENERATE_A_LONG_RANDOM_SECRET"
AUTH_URL="https://app.learnlive.site"
NEXT_PUBLIC_SITE_URL="https://app.learnlive.site"
MOODLE_BASE_URL="https://portal.learnlive.site"
MOODLE_LAUNCH_PATH="/local/incubator/sso.php"
MOODLE_SYNC_ENDPOINT="https://portal.learnlive.site/local/incubator/sync.php"
MOODLE_SHARED_SECRET="SAME_SECRET_CONFIGURED_IN_MOODLE_PLUGIN"
```

Generate a strong secret:

```bash
openssl rand -base64 48
```

Important:

- `AUTH_URL` and `NEXT_PUBLIC_SITE_URL` must match your real app domain.
- `MOODLE_SHARED_SECRET` must match the Moodle plugin value exactly.

## 5) Create database + DB user

Start PostgreSQL:

```bash
systemctl enable --now postgresql
```

Open PostgreSQL shell:

```bash
sudo -u postgres psql
```

Run:

```sql
CREATE USER incubator WITH PASSWORD 'MyPassword2026';
CREATE DATABASE incubator OWNER incubator;
\q
```

## 6) Install dependencies and Prisma

```bash
cd /var/www/incubator
rm -rf node_modules .next
npm ci --ignore-scripts
npx prisma generate
npx prisma db push
npm run db:sync-programs
```

Expected result:

- Prisma client is generated
- DB schema is in sync
- Programs are seeded/synced

## 7) Build the app

```bash
cd /var/www/incubator
npm run build
test -f .next/BUILD_ID && echo "Build OK" || echo "Build missing"
```

Do not start PM2 before this passes.

## 8) Run with PM2

```bash
cd /var/www/incubator
pm2 start npm --name incubator --cwd /var/www/incubator -- start
pm2 save
pm2 startup
```

Check status and logs:

```bash
pm2 status incubator
pm2 logs incubator --lines 80 --nostream
```

## 9) Verify locally on the VPS

```bash
curl -I http://127.0.0.1:3000
curl -s http://127.0.0.1:3000/api/health
```

`/api/health` should return JSON.

## 10) Configure Nginx reverse proxy

Create `/etc/nginx/sites-available/incubator`:

```nginx
server {
    listen 80;
    server_name app.learnlive.site;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable and reload:

```bash
ln -sf /etc/nginx/sites-available/incubator /etc/nginx/sites-enabled/incubator
nginx -t
systemctl reload nginx
```

## 11) Add SSL (HTTPS)

Install Certbot:

```bash
apt install -y certbot python3-certbot-nginx
```

Issue certificate:

```bash
certbot --nginx -d app.learnlive.site
```

Test auto-renew:

```bash
certbot renew --dry-run
```

## 12) Final checks

```bash
curl -I https://app.learnlive.site
curl -s https://app.learnlive.site/api/health
pm2 status
```

Open in browser:

- `https://app.learnlive.site`
- `https://app.learnlive.site/login`
- `https://app.learnlive.site/signup`

## 13) Safe update process (every new deploy)

```bash
cd /var/www/incubator
git fetch origin
git checkout app-deploy
git pull --ff-only origin app-deploy
npm ci --ignore-scripts
npx prisma generate
npx prisma db push
npm run db:sync-programs
npm run build
pm2 restart incubator --update-env
pm2 save
```

## 14) Common errors and fixes

`Unit postgresql.service could not be found`

- PostgreSQL is not installed. Install it with `apt install -y postgresql postgresql-contrib`.

`P1000: Authentication failed`

- `DATABASE_URL` credentials do not match DB user/password.
- Fix password or reset user password in Postgres.

`P1001: Can't reach database server`

- PostgreSQL is not running, or wrong host/port in `DATABASE_URL`.
- Use `systemctl status postgresql`.

`Could not find a production build in the '.next' directory`

- You started PM2 before successful build.
- Run `npm run build` first, then `pm2 restart incubator`.

`pm2 logs` appears to hang

- This is normal. `pm2 logs` is a live stream.
- Press `Ctrl + C` to exit.

## 15) Security notes

- Rotate `AUTH_SECRET` if it was ever exposed.
- Never commit `.env` to Git.
- Restrict firewall to only required ports (`22`, `80`, `443`).

