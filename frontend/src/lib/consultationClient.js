const ORIGINAL_KEY = "bbi_original_touch_v1";

export const sanitizeAttributionValue = (value) => String(value ?? "")
  .replace(/[<>\u0000-\u001F\u007F]/g, "").trim().slice(0, 300);

export function captureAttribution() {
  const params = new URLSearchParams(window.location.search || "");
  const current = {
    source: sanitizeAttributionValue(params.get("utm_source")),
    medium: sanitizeAttributionValue(params.get("utm_medium")),
    campaign: sanitizeAttributionValue(params.get("utm_campaign")),
    content: sanitizeAttributionValue(params.get("utm_content")),
    term: sanitizeAttributionValue(params.get("utm_term")),
    landing_page: sanitizeAttributionValue(window.location.href),
    referrer: sanitizeAttributionValue(document.referrer),
    seen_at: new Date().toISOString(),
  };
  if (!current.source) {
    try {
      const host = current.referrer ? new URL(current.referrer).hostname : "";
      current.source = host || "direct";
      current.medium = host ? "referral" : "none";
    } catch {
      current.source = "direct";
      current.medium = "none";
    }
  }
  let original;
  try { original = JSON.parse(localStorage.getItem(ORIGINAL_KEY) || "null"); } catch { original = null; }
  if (!original) {
    original = current;
    try { localStorage.setItem(ORIGINAL_KEY, JSON.stringify(original)); } catch { /* storage unavailable */ }
  }
  return { original, current };
}

export function createSubmissionId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}-${Math.random().toString(16).slice(2)}`;
}

export function buildPayload(form, attribution, context = {}) {
  return {
    ...form,
    submission_id: context.submission_id || createSubmissionId(),
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
    content_id: sanitizeAttributionValue(context.content_id),
    page_type: "contact",
    industry_source: sanitizeAttributionValue(context.industry_source),
    conversion_method: "consultation_form",
  };
}

export function pushAnalytics(event, parameters = {}) {
  const pii = new Set(["full_name", "work_email", "email", "company", "phone", "message"]);
  const safe = Object.fromEntries(Object.entries(parameters).filter(([key]) => !pii.has(key)));
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...safe });
}

export function installCalendlyTracking(getContext) {
  const listener = (event) => {
    if (event.origin !== "https://calendly.com" || event.data?.event !== "calendly.event_scheduled") return;
    const context = getContext();
    pushAnalytics("calendar_booking_complete", {
      page_path: window.location.pathname,
      calendar_provider: "calendly",
      booking_id: sanitizeAttributionValue(event.data?.payload?.event?.uri || event.data?.payload?.invitee?.uri || "unknown"),
      conversion_method: "calendar",
      submission_id: context.submission_id || "",
    });
  };
  window.addEventListener("message", listener);
  return () => window.removeEventListener("message", listener);
}
