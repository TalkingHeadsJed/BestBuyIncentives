// Inserts one natural, contextual inbound link to /high-ticket-closing-playbook
// into the bodyHtml of the most relevant articles (so the new commercial page is
// not an orphan). Idempotent: skips an article that already links to the page.
const fs = require("fs");
const path = require("path");
const DATA = path.join(__dirname, "..", "frontend", "src", "data", "articles.json");

const SENTENCES = {
  "high-ticket-closing-process":
    '<p>For a manager-ready version your team can run end to end, work from <a href="/high-ticket-closing-playbook">the high-ticket closing playbook</a>.</p>',
  "sales-closing-techniques-high-ticket-purchases":
    '<p>Managers can roll these techniques into a repeatable routine with <a href="/high-ticket-closing-playbook">the high-ticket closing playbook</a>.</p>',
  "objection-handling-frameworks-for-sales-managers":
    '<p>The same framework is built into <a href="/high-ticket-closing-playbook">the high-ticket closing playbook</a> for weekly stalled-deal reviews.</p>',
  "price-objection-scripts-high-ticket-sales":
    '<p>These scripts sit alongside the diagnostic questions in <a href="/high-ticket-closing-playbook">the high-ticket closing playbook</a>.</p>',
  "close-more-sales-without-lowering-price":
    '<p>For a step-by-step system your team can put on the floor, see <a href="/high-ticket-closing-playbook">the high-ticket closing playbook</a>.</p>',
  "sales-manager-stalled-deals-playbook":
    '<p>The six diagnostic questions here are expanded, with a launch and measurement plan, in <a href="/high-ticket-closing-playbook">the high-ticket closing playbook</a>.</p>',
};

const data = JSON.parse(fs.readFileSync(DATA, "utf-8"));
let changed = 0;
for (const a of data) {
  const sent = SENTENCES[a.slug];
  if (!sent) continue;
  if (a.bodyHtml.includes("/high-ticket-closing-playbook")) continue;
  const idx = a.bodyHtml.indexOf("</p>");
  if (idx === -1) { console.log("no </p> in", a.slug); continue; }
  const at = idx + 4;
  a.bodyHtml = a.bodyHtml.slice(0, at) + sent + a.bodyHtml.slice(at);
  changed++;
  console.log("linked", a.slug);
}
fs.writeFileSync(DATA, JSON.stringify(data, null, 0) + "\n", "utf-8");
console.log("done. changed:", changed);
