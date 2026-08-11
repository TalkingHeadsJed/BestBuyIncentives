// Attach the authoritative YouTube video mapping (from
// YOUTUBE_FIRST_39_ARTICLE_EMBED_CONTROL.csv) to each corresponding article.
// Video 25 (customer-incentive-ideas-to-close-sales) is NOT FOUND in the sheet
// (blank URL) and is intentionally omitted. Idempotent. No invented data:
// id/duration are verbatim from the sheet; uploadDate is the sheet's verified date.
const fs = require("fs");
const path = require("path");
const DATA = path.join(__dirname, "..", "frontend", "src", "data", "articles.json");
const UPLOAD_DATE = "2026-08-11";

// slug -> [youtube_video_id, duration_iso8601]
const MAP = {
  "sales-closing-techniques-high-ticket-purchases": ["JexdP61oiuk", "PT1M54S"],
  "sales-closing-questions-examples": ["6wfp89YCuMA", "PT2M3S"],
  "close-more-sales-without-lowering-price": ["_IHtxdvIDoU", "PT2M8S"],
  "how-to-ask-for-the-sale-without-being-pushy": ["ENQX0ziL0rg", "PT1M40S"],
  "trial-close-questions-examples": ["xrRQvUPDOFw", "PT1M41S"],
  "why-qualified-prospects-stall": ["M9sM0Fg6YT0", "PT1M27S"],
  "sales-manager-stalled-deals-playbook": ["-fzFYGWeM4M", "PT1M38S"],
  "high-ticket-closing-process": ["iDGfASLQz8M", "PT1M40S"],
  "create-urgency-in-sales-without-being-pushy": ["pQ_SSI0-Ol0", "PT1M39S"],
  "authentic-urgency-vs-false-scarcity": ["Abif4LJDdXU", "PT1M26S"],
  "shorten-high-ticket-sales-cycle": ["D94RNE94ATs", "PT1M35S"],
  "revive-a-deal-that-lost-momentum": ["JLU7lOOhC54", "PT1M26S"],
  "establish-a-reason-to-buy-now": ["LSwkeQhNDMU", "PT1M29S"],
  "cost-of-delay-in-sales": ["7fJl66mjZos", "PT1M25S"],
  "limited-time-sales-offers-without-manipulation": ["3BNlLoVuQQQ", "PT1M13S"],
  "improve-sales-velocity": ["4dGYjqFZgSQ", "PT1M32S"],
  "handle-price-objections-without-discounting": ["DDX_lh-XZZI", "PT1M25S"],
  "price-objection-scripts-high-ticket-sales": ["CNqH_6R1rRk", "PT1M25S"],
  "i-need-to-think-about-it-sales-objection": ["Rf_aZIC9OOI", "PT1M11S"],
  "your-price-is-too-high-response": ["0POglk_cZeI", "PT1M22S"],
  "handle-i-want-to-shop-around": ["FTdI0kbyLT0", "PT1M16S"],
  "respond-when-a-prospect-asks-for-a-discount": ["4fz6VNEYrxA", "PT1M7S"],
  "objection-handling-frameworks-for-sales-managers": ["KEbkmhQiyG0", "PT1M10S"],
  "when-a-purchase-incentive-can-resolve-an-objection": ["fCmOvRRESK0", "PT1M7S"],
  "what-is-a-customer-purchase-incentive": ["8rWvs-LKyyE", "PT1M20S"],
  "customer-closing-incentives-vs-sales-spiffs": ["ri1LctqAwIc", "PT1M14S"],
  "discounted-travel-vouchers-vs-gift-cards": ["Q2OFWkugJhk", "PT1M34S"],
  "discounted-travel-vouchers-vs-cash-discounts": ["QQwlyLsx0gI", "PT1M14S"],
  "purchase-incentives-vs-loyalty-programs": ["y1-vRsSA-Mk", "PT1M"],
  "customer-incentives-vs-rebates": ["-9h6J6CswGI", "PT1M18S"],
  "choose-incentive-for-high-ticket-purchase": ["h8gVkMRBjxc", "PT1M8S"],
  "how-discounted-travel-vouchers-work": ["DpBKtVlGhvY", "PT1M6S"],
  "evaluate-discounted-travel-voucher": ["1zMND_fa8uw", "PT1M15S"],
  "travel-voucher-recipient-costs": ["yywjxvTTcJE", "PT56S"],
  "travel-voucher-terms-businesses-should-review": ["5iYb--d66AU", "PT1M15S"],
  "explain-discounted-travel-voucher-to-customer": ["9iUTeA3uUf4", "PT1M3S"],
  "train-sales-team-to-present-travel-vouchers": ["dD6KFkhATV4", "PT1M5S"],
  "launch-customer-travel-voucher-promotion": ["05ynZaKhNAo", "PT1M6S"],
};

const data = JSON.parse(fs.readFileSync(DATA, "utf-8"));
const bySlug = new Map(data.map((a) => [a.slug, a]));
let changed = 0;
const missing = [];
for (const [slug, [id, duration]] of Object.entries(MAP)) {
  const a = bySlug.get(slug);
  if (!a) { missing.push(slug); continue; }
  a.video = {
    id,
    duration,
    uploadDate: UPLOAD_DATE,
    watchUrl: `https://www.youtube.com/watch?v=${id}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
    thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  };
  changed++;
}
fs.writeFileSync(DATA, JSON.stringify(data, null, 0) + "\n", "utf-8");
console.log("videos attached:", changed, "of", Object.keys(MAP).length);
console.log("with video field total:", data.filter((a) => a.video).length);
console.log("missing slugs:", missing.length ? missing : "none");
