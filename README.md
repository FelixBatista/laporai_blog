# Laporai Blog

React + Vite frontend with Cloudflare Pages Functions for newsletter and persistent blog comments APIs.

## Local app run

1. Install dependencies:
   - `npm install`
2. Run frontend locally:
   - `npm run dev`
3. Build check:
   - `npm run build`

## Newsletter System (Cloudflare Pages + D1 + Resend)

This project includes a production-ready newsletter flow:

- `POST /api/newsletter/subscribe`
- `GET /api/newsletter/confirm?token=...`
- `GET /api/newsletter/unsubscribe?token=...`
- `POST /api/webhooks/resend`
- `GET/POST /api/newsletter/admin` (secret-protected internal sender)

## Persistent Comments System (Cloudflare Pages + D1 + Turnstile)

This project now includes a first-party persistent comments system under `/api/comments/*`, fully stored in D1 (no markdown/static JSON persistence).

### Routes

- Public:
  - `GET /api/comments/list?slug=...&cursor=...&limit=...`
  - `POST /api/comments/submit`
- Admin (secret protected):
  - `GET /api/comments/admin/list?status=pending`
  - `POST /api/comments/admin/moderate`
- Internal moderation UI:
  - `GET /comments-admin`

### Data ownership

Comments and moderation metadata are stored in D1:

- `blog_comments`
- `blog_comment_events`
- `blog_comment_reports`
- `blog_comment_rate_limits`

### Data ownership

Subscribers and lifecycle events are stored in D1 as source of truth:

- `newsletter_subscribers`
- `newsletter_tokens`
- `newsletter_events`
- `newsletter_campaigns`
- `newsletter_rate_limits` (abuse throttling)

## Cloudflare setup

### 1) Bind existing D1 in Cloudflare Pages

If you already use D1, reuse the same DB and add newsletter tables via migration.

In Pages project settings:

- Go to **Settings -> Functions -> D1 bindings**
- Add or verify binding:
  - Binding name: `DB`
  - Database: your existing D1 database

For local Wrangler config, copy `wrangler.toml.example` to `wrangler.toml` and fill your D1 `database_id`.

### 2) Apply D1 migrations

This repo includes:

- `migrations/0001_newsletter.sql`
- `migrations/0002_blog_comments.sql`

Apply migration:

- `wrangler d1 execute <YOUR_DB_NAME> --file=./migrations/0001_newsletter.sql --remote`
- `wrangler d1 execute <YOUR_DB_NAME> --file=./migrations/0002_blog_comments.sql --remote`

For local:

- `wrangler d1 execute <YOUR_DB_NAME> --file=./migrations/0001_newsletter.sql --local`
- `wrangler d1 execute <YOUR_DB_NAME> --file=./migrations/0002_blog_comments.sql --local`

### 3) Configure Pages environment variables

Set these in **Cloudflare Pages -> Settings -> Environment variables**:

- `RESEND_API_KEY`
- `RESEND_WEBHOOK_SECRET`
- `NEWSLETTER_FROM_EMAIL`
- `NEWSLETTER_REPLY_TO`
- `NEWSLETTER_BASE_URL`
- `NEWSLETTER_SEGMENT_ID` (recommended)
- `NEWSLETTER_ADMIN_SECRET`
- `TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `COMMENTS_ADMIN_SECRET`
- `COMMENTS_BASE_URL`
- `COMMENTS_AUTO_APPROVE` (`false` by default)

Recommended values:

- `NEWSLETTER_FROM_EMAIL`: `Laporai Newsletter <hello@newsletter.laporai.com>`
- `NEWSLETTER_REPLY_TO`: `hello@newsletter.laporai.com`
- `NEWSLETTER_BASE_URL`: production site URL (for links in emails)

## Resend setup

### 1) Create Resend account and API key

- Create account at [https://resend.com](https://resend.com)
- Generate an API key (use in `RESEND_API_KEY`)

### 2) Verify sending domain/subdomain

Recommended: use a dedicated sending subdomain such as:

- `newsletter.laporai.com` (or `updates.laporai.com`)

In Resend, add the domain and copy required DNS records to Cloudflare DNS.
Typical required records:

- SPF TXT (for Resend sending authorization)
- DKIM CNAME records (one or more)
- Return-path / tracking CNAME (if shown by Resend)

Use exactly the host/value records shown inside Resend for your account.

### 3) Create segment

- In Resend dashboard, create a Segment for newsletter recipients
- Save the segment ID into `NEWSLETTER_SEGMENT_ID`

### 4) Register webhook endpoint

Create webhook in Resend pointing to:

- `https://<your-domain>/api/webhooks/resend`

Enable at least these events:

- `email.sent`
- `email.delivered`
- `email.bounced`
- `email.complained`
- `email.opened` (optional analytics)
- `email.clicked` (optional analytics)

Copy webhook secret into:

- `RESEND_WEBHOOK_SECRET`

> Note: webhook verification is enforced in code when this secret is set.

## Admin sending flow

Internal admin sender endpoint:

- `GET /api/newsletter/admin?secret=<NEWSLETTER_ADMIN_SECRET>`

Use the form to send:

- Subject
- HTML body
- Optional plain text body

Behavior:

- Sends only to `confirmed` subscribers
- Skips unsubscribed/bounced/complained users (by status)
- Uses Resend Broadcasts when `NEWSLETTER_SEGMENT_ID` is configured
- Falls back to safe individual sends if no segment ID is set
- Logs campaign + send outcome in D1

## Local testing (Pages Functions + D1)

1. Ensure `wrangler.toml` exists and has `DB` binding.
2. Set local secrets in `.dev.vars` (not committed).
3. Build frontend:
   - `npm run build`
4. Run Pages locally:
   - `wrangler pages dev dist`
5. Test endpoints:
   - Subscribe from homepage form
   - Confirm link from received email
   - Unsubscribe via unsubscribe link
   - Trigger webhook test from Resend dashboard
   - Open a post page (`/post/:slug`) and submit a comment
   - Confirm comment is saved in D1 and starts as `pending` (default)
   - Approve via `/comments-admin` and confirm it appears publicly

## Turnstile setup (comments anti-spam)

1. Create a Turnstile widget in Cloudflare dashboard.
2. Add your site domain to the widget.
3. Copy keys:
   - Site key -> `TURNSTILE_SITE_KEY`
   - Secret key -> `TURNSTILE_SECRET_KEY`
4. Deploy with these vars set in Pages project env.

Both frontend widget rendering and backend verification are required for comment submission.

## Comment moderation flow

1. Open `/comments-admin` in your site.
2. Fill `COMMENTS_ADMIN_SECRET`.
3. Filter `pending` comments and apply moderation actions:
   - approve
   - reject
   - spam
   - delete (soft delete)
4. Optional: edit comment text before approving/rejecting/spam/deleting.
5. Each moderation action is logged in `blog_comment_events`.

## Privacy and security notes (comments)

- Emails are never exposed in public comment APIs.
- Public list endpoint returns only approved comments and safe fields.
- Comment content is sanitized server-side before public rendering.
- Honeypot + server-side Turnstile + D1-backed throttling are active.
- IP and user-agent are stored as hashes only.
- Duplicate body heuristics can auto-mark rapid repeated submissions as spam.

## D1 inspection and recovery

Useful commands:

- `wrangler d1 execute <YOUR_DB_NAME> --remote --command "SELECT id, post_slug, status, created_at FROM blog_comments ORDER BY id DESC LIMIT 50"`
- `wrangler d1 execute <YOUR_DB_NAME> --remote --command "SELECT * FROM blog_comment_events ORDER BY id DESC LIMIT 50"`
- `wrangler d1 export <YOUR_DB_NAME> --remote --output comments-backup.sql`

## Production verification checklist

- Subscribe in live site form
- Receive confirmation email from your own domain
- Click confirm and verify DB status becomes `confirmed`
- Send campaign from admin endpoint
- Click unsubscribe and verify status becomes `unsubscribed`
- Confirm webhook events are logged in `newsletter_events`

## Security notes

- Tokens are random cryptographic values; only token hashes are stored in D1
- Confirmation/unsubscribe tokens have expiry
- Honeypot spam field is enabled
- Basic per-IP throttling is enabled via D1
- Admin sender is protected by `NEWSLETTER_ADMIN_SECRET`
- Do not hardcode secrets in source files
