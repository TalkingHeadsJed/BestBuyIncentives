const fs = require("fs");
const path = require("path");
const DATA = path.join(__dirname, "..", "frontend", "src", "data", "articles.json");
const SENT = {
  "how-discounted-travel-vouchers-work":
    '<p>For a printable version reps can hand a customer, download <a href="/discounted-travel-voucher-guide">the one-page voucher guide</a>.</p>',
  "improve-sales-velocity":
    '<p>To model the revenue impact before you launch, use <a href="/incentive-revenue-dashboard">the incentive revenue dashboard</a>.</p>',
  "train-sales-team-to-present-travel-vouchers":
    '<p>Give every rep the same words with <a href="/sales-team-training-script">the sales-team training script</a>.</p>',
};
const data = JSON.parse(fs.readFileSync(DATA, "utf-8"));
let changed = 0;
for (const a of data) {
  const s = SENT[a.slug];
  if (!s) continue;
  const target = /href="(\/[a-z-]+)"/.exec(s)[1];
  if (a.bodyHtml.includes(target)) continue;
  const i = a.bodyHtml.indexOf("</p>");
  if (i === -1) continue;
  a.bodyHtml = a.bodyHtml.slice(0, i + 4) + s + a.bodyHtml.slice(i + 4);
  changed++;
  console.log("linked", a.slug, "->", target);
}
fs.writeFileSync(DATA, JSON.stringify(data, null, 0) + "\n", "utf-8");
console.log("changed:", changed);
