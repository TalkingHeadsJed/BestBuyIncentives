import { sanitizeAttributionValue } from "./consultationClient";

// Consumer/free mailbox providers rejected so the gate captures real business leads.
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "ymail.com", "rocketmail.com",
  "hotmail.com", "hotmail.co.uk", "outlook.com", "live.com", "msn.com",
  "aol.com", "icloud.com", "me.com", "mac.com", "protonmail.com", "proton.me",
  "pm.me", "gmx.com", "gmx.net", "mail.com", "yandex.com", "zoho.com",
  "hey.com", "fastmail.com", "tutanota.com", "hushmail.com",
]);

export function isBusinessEmail(email) {
  const value = String(email ?? "").trim().toLowerCase();
  const match = /^[^\s@]+@([^\s@]+\.[^\s@]+)$/.exec(value);
  if (!match) return false;
  const domain = match[1];
  if (FREE_EMAIL_DOMAINS.has(domain)) return false;
  // reject obvious disposable subdomains of free providers
  for (const free of FREE_EMAIL_DOMAINS) if (domain.endsWith("." + free)) return false;
  return true;
}

// Flatten the captured attribution + form into the exact JSON the endpoint expects.
export function buildPlaybookPayload(form, attribution, context = {}) {
  return {
    first_name: sanitizeAttributionValue(form.first_name),
    last_name: sanitizeAttributionValue(form.last_name),
    work_email: String(form.work_email ?? "").trim().slice(0, 254),
    company: sanitizeAttributionValue(form.company),
    role: sanitizeAttributionValue(form.role),
    phone: sanitizeAttributionValue(form.phone),
    sales_team_size: sanitizeAttributionValue(form.sales_team_size),
    sales_use_case: sanitizeAttributionValue(form.sales_use_case),
    website_honeypot: sanitizeAttributionValue(form.website_honeypot),
    playbook_asset_id: sanitizeAttributionValue(context.asset_id),
    submission_id: context.submission_id,
    original_landing_page: attribution.original.landing_page,
    original_referrer: attribution.original.referrer,
    original_source: attribution.original.source,
    original_medium: attribution.original.medium,
    original_campaign: attribution.original.campaign,
    original_content: attribution.original.content,
    original_term: attribution.original.term,
    first_seen_at: attribution.original.seen_at,
    converting_page: attribution.current.landing_page,
    converting_referrer: attribution.current.referrer,
    latest_source: attribution.current.source,
    latest_medium: attribution.current.medium,
    latest_campaign: attribution.current.campaign,
    latest_content: attribution.current.content,
    latest_term: attribution.current.term,
    page_type: "playbook",
    conversion_method: "playbook_gated_download",
  };
}
