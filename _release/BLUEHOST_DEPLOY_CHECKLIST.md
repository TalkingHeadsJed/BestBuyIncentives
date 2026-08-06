# Bluehost Staging → Production Deployment Checklist (BestBuyIncentives Priority-13 / All-91)

> Run these on the SERVER. Do NOT publish outreach until each page + its attribution path passes.
> Order matters. Steps 1–4 stage the API privately BEFORE the site content goes live.

## 0. Prerequisites
- Bluehost supports PHP 8.1+ and `curl`.
- You have the finished `static-site/` (from `/app/static-site`, or the deliverable tarball
  `BestBuyIncentives-static-site-DELIVERABLE.tgz`, sha256 `5af742bc36f979393d905edf908ad83ffcfd62cef4e045a082273dc58d368f98`).
- You have `deploy-private/` (cron + env template), sha256
  `c46f944c78afc162df4df8a2ceb89000befcbc5f0445d67692ab7fbf9d781521`.

## 1. Back up current production (REQUIRED before touching anything)
```
cd ~
tar czf backup-public_html-$(date +%F).tgz public_html
cp public_html/.htaccess  backup-htaccess-$(date +%F)
cp public_html/sitemap.xml backup-sitemap-$(date +%F).xml   2>/dev/null || true
cp public_html/robots.txt  backup-robots-$(date +%F).txt    2>/dev/null || true
```
Also note current env/cron config. Keep these backups until production tests pass.

## 2. Create the private storage dir + configure secrets (OUTSIDE public_html)
```
mkdir -p ~/bbi-private/consultations && chmod 700 ~/bbi-private ~/bbi-private/consultations
```
Set these via the hosting panel / private server config (NEVER commit real values, NEVER put in public_html):
- `BBI_PRIVATE_STORAGE_DIR` = `/home/<acct>/bbi-private/consultations`
- `BBI_RATE_LIMIT_SECRET`   = 32+ random chars
- `BBI_SALES_NOTIFICATION_EMAIL` = sales@bestbuyincentives.com
- `BBI_CRM_WEBHOOK_URL`     = approved CRM intake workflow URL
- `BBI_CRM_WEBHOOK_TOKEN`   = CRM token (stays server-side)
(Template: `deploy-private/PRIVATE_ENVIRONMENT.example`.)

## 3. Stage the API privately
- Upload `static-site/api/` → `public_html/api/` (includes hidden `api/.htaccess`).
- Upload `deploy-private/cron/process-consultation-queue.php` to `~/bbi-private/cron/` (OUTSIDE public_html).
- Confirm PHP can write `~/bbi-private/consultations` and can send mail.

## 4. Run the guarded synthetic harness on STAGING ONLY
From `deploy-private/tests/` (Node 18+ on a machine that can reach staging):
```
BBI_STAGING_ORIGIN=https://staging.bestbuyincentives.com \
BBI_ALLOW_CONTROLLED_SUBMISSION=YES \
node runtime-acceptance.mjs
```
It exercises: durable acceptance (202 after queue file), idempotent replay (same `submission_id`+`Idempotency-Key` → no duplicate), mismatched-key rejection, email validation, honeypot/spam rejection. It then prints the manual CRM/log evidence still required. **Confirm all of these before continuing:**
- [ ] exactly ONE durable queue/CRM record per controlled submission
- [ ] replay does NOT create a second record
- [ ] invalid option / bad email / honeypot are rejected (422)
- [ ] CRM delivery succeeds OR record stays `retry_queue_created` and the cron later delivers
- [ ] priority inquiry (immediate/30-day, 51+ monthly ops, or $25k+ sale) → sales task due within 1 business hour; other legit inquiry → 1 business day
- [ ] operational logs + analytics contain NO name/email/company/phone/message (PII-free)

## 5. Configure the retry cron (every 5 minutes)
Bluehost cron, same private env as the endpoint:
```
*/5 * * * * /usr/local/bin/php /home/<acct>/bbi-private/cron/process-consultation-queue.php >> /home/<acct>/bbi-private/cron.log 2>&1
```

## 6. Stage + gate the first-13 content, then the rest
- Extract the site as an OVERLAY over `public_html` — **do not delete** `/contact/`, existing images, or shared assets.
- Upload the new `.htaccess`, `sitemap.xml`, `robots.txt`, `404.html`, `assets/`, `downloads/`, `static/`, `images/`, and route directories.
- Gate the first 13 priority routes (page/contact/handler/unknown-route). If they pass, deploy the remaining 78 in verified batches. (All 95 are already assembled locally; you control publish order.)

## 7. Production verification (repeat after cache purge)
```
# every canonical route returns its OWN 200 HTML
for u in / /how-it-works/ /sales-closing-incentives/ /discounted-travel-vouchers-vs-gift-cards/ \
         /industries/jewelry-stores/ /case-studies/automotive-closing-incentives/ \
         /high-ticket-closing-playbook/ /contact/ /privacy/ /terms/ /compliance/; do
  echo "$(curl -s -o /dev/null -w '%{http_code}' https://bestbuyincentives.com$u)  $u"; done

# genuine 404 (must be 404 AND must NOT be homepage HTML)
curl -s -o /tmp/nf.html -w '%{http_code}\n' https://bestbuyincentives.com/definitely-not-a-real-page-xyz/
grep -c "noindex" /tmp/nf.html        # expect >=1 (branded 404)

# legacy 301 lands on the new destination
curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}\n' https://bestbuyincentives.com/travel-incentives-vs-gift-cards

# PDF downloads
curl -s -o /dev/null -w '%{http_code}\n' https://bestbuyincentives.com/downloads/BestBuyIncentives_High-Ticket_Closing_Playbook.pdf
```
- [ ] Confirm the Audience Lab pixel loads (200) and fires a collector beacon (204) on a live page.
- [ ] Run one controlled tagged form submission on production → exactly one durable CRM/queue record + one success event sharing `submission_id`; original vs converting attribution stay distinct.

## Rollback (immediately if contact submit, CRM delivery, canonical behavior, retained routes, or 404 behavior fails)
```
cd ~
rm -rf public_html && tar xzf backup-public_html-<DATE>.tgz     # restore full prior site
# or targeted:
cp backup-htaccess-<DATE> public_html/.htaccess
cp backup-sitemap-<DATE>.xml public_html/sitemap.xml
# disable the API + cron:
mv public_html/api public_html/_api_disabled
# remove the */5 cron line
```
Local Emergent rollback refs: git tag `pre-p13-local-HEAD`, branch `backup/pre-p13-local`, tarballs in `/app/_release/backup/`.
