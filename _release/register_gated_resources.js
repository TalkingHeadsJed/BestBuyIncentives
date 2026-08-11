// Registers 3 new gated resource pages + inbound links (idempotent).
const fs = require("fs");
const path = require("path");
const P = path.join(__dirname, "..", "frontend", "src", "data", "seoPages.json");
const s = JSON.parse(fs.readFileSync(P, "utf-8"));

const L = (to, label) => ({ to, label });

const PAGES = [
  {
    path: "/discounted-travel-voucher-guide",
    title: "Discounted Travel Voucher: One-Page Guide",
    description: "A one-page guide your team can hand a customer — what a discounted travel voucher is, how it works, and how to present it accurately without overpromising.",
    h1: "The discounted travel voucher one-page guide",
    lead: "When a rep needs to explain the added value in plain language, this one-pager keeps the message accurate. Download it, print it, and keep it on the sales floor.",
    sections: [
      { h: "What's inside", p: "A plain-language explainer of what a discounted travel voucher is and is not, how a recipient redeems it, the costs a recipient still covers, and the exact language reps can use so the offer is presented accurately." },
      { h: "Who it's for", p: "Owners, sales managers, and front-line reps who want a consistent, compliant way to present added value instead of cutting price." },
      { h: "How to use it", p: "Hand it to a customer during the close, use it in onboarding, or attach it to a proposal. It pairs with the training script and the closing playbook." },
    ],
    proof: [L("/high-ticket-closing-playbook", "the high-ticket closing playbook"), L("/incentive-revenue-dashboard", "the incentive revenue dashboard"), L("/sales-team-training-script", "the sales-team training script"), L("/how-discounted-travel-vouchers-work", "how discounted travel vouchers work"), L("/explain-discounted-travel-voucher-to-customer", "explain the voucher to a customer")],
    about: ["Sales incentive", "Customer incentive program"],
    gate: {
      assetId: "discounted-travel-voucher-one-page-guide",
      downloadUrl: "/downloads/BestBuyIncentives_Discounted-Travel-Voucher_One-Page-Guide.pdf",
      eyebrow: "Free guide",
      copy: { heading: "Get the one-page voucher guide", intro: "Enter your details and we'll unlock the PDF instantly. We use this only to send the guide and follow up about your sales floor.", submitLabel: "Get the guide", acceptedHeading: "Your guide is ready", acceptedIntro: "Thanks. Your access is confirmed. Download the one-page guide below, then book a working session to put it to work.", downloadLabel: "Download the one-page guide (PDF)" },
    },
  },
  {
    path: "/incentive-revenue-dashboard",
    title: "Incentive Revenue Dashboard (Spreadsheet)",
    description: "A spreadsheet to model close rate, margin, discounting, and attributable revenue from an incentive campaign — so you can see whether it creates profitable sales before you run it.",
    h1: "The incentive revenue dashboard",
    lead: "Before you run a campaign, model it. This spreadsheet turns close rate, average order value, discounting, and gross profit into an attributable-revenue picture leadership can approve.",
    sections: [
      { h: "What's inside", p: "Input cells for qualified close rate, cycle time, average order value, discount depth, gross profit, cancellations, and voucher cost — with an attributable-revenue and commission view." },
      { h: "Who it's for", p: "Owners, sales leaders, and finance partners who want to size the upside and protect margin before committing to a program." },
      { h: "How to use it", p: "Model a controlled campaign test, compare it against reflexive discounting, and use the output to build the business case for leadership." },
    ],
    proof: [L("/high-ticket-closing-playbook", "the high-ticket closing playbook"), L("/discounted-travel-voucher-guide", "the one-page voucher guide"), L("/sales-team-training-script", "the sales-team training script"), L("/how-to-measure-incentive-roi", "how to measure incentive ROI"), L("/build-incentive-business-case-for-leadership", "build the business case")],
    about: ["Sales incentive", "Customer incentive program"],
    gate: {
      assetId: "revenue-dashboard",
      downloadUrl: "/downloads/BestBuyIncentives_Revenue_Dashboard.xlsx",
      eyebrow: "Free spreadsheet",
      copy: { heading: "Get the revenue dashboard", intro: "Enter your details and we'll unlock the spreadsheet instantly. We use this only to send the dashboard and follow up about your program.", submitLabel: "Get the dashboard", acceptedHeading: "Your dashboard is ready", acceptedIntro: "Thanks. Your access is confirmed. Download the spreadsheet below, then book a working session to model your campaign.", downloadLabel: "Download the dashboard (XLSX)" },
    },
  },
  {
    path: "/sales-team-training-script",
    title: "Sales-Team Training Script",
    description: "A word-for-word script to train reps to present a discounted travel voucher and hold price — diagnosing the deal first, then introducing added value accurately.",
    h1: "The sales-team training script",
    lead: "Give every rep the same words. This training script walks a team through diagnosing a stalled deal and presenting a discounted travel voucher without discounting.",
    sections: [
      { h: "What's inside", p: "A word-for-word flow for qualifying the deal, handling the price conversation, and introducing a discounted travel voucher as added value — with the language to keep it accurate." },
      { h: "Who it's for", p: "Sales managers running onboarding or weekly role-plays who want a repeatable, compliant way for reps to hold price." },
      { h: "How to use it", p: "Run it in a team role-play, use it to onboard new reps, or pair it with the closing playbook for a full manager toolkit." },
    ],
    proof: [L("/high-ticket-closing-playbook", "the high-ticket closing playbook"), L("/discounted-travel-voucher-guide", "the one-page voucher guide"), L("/incentive-revenue-dashboard", "the incentive revenue dashboard"), L("/train-sales-team-to-present-travel-vouchers", "train your team to present vouchers"), L("/explain-discounted-travel-voucher-to-customer", "explain the voucher to a customer")],
    about: ["Sales closing", "Sales incentive"],
    gate: {
      assetId: "sales-team-training-script",
      downloadUrl: "/downloads/BestBuyIncentives_Sales-Team_Training-Script.txt",
      eyebrow: "Free script",
      copy: { heading: "Get the sales-team training script", intro: "Enter your details and we'll unlock the script instantly. We use this only to send the script and follow up about your team.", submitLabel: "Get the script", acceptedHeading: "Your script is ready", acceptedIntro: "Thanks. Your access is confirmed. Download the training script below, then book a working session to run it with your team.", downloadLabel: "Download the training script (TXT)" },
    },
  },
];

const existing = new Set(s.commercial.map((c) => c.path));
for (const p of PAGES) if (!existing.has(p.path)) s.commercial.push(p);

// Playbook proof -> the 3 new resources (idempotent)
const playbook = s.commercial.find((c) => c.path === "/high-ticket-closing-playbook");
const addProof = (page, to, label) => { if (page && !page.proof.some((x) => x.to === to)) page.proof.push(L(to, label)); };
addProof(playbook, "/discounted-travel-voucher-guide", "the one-page voucher guide");
addProof(playbook, "/incentive-revenue-dashboard", "the incentive revenue dashboard");
addProof(playbook, "/sales-team-training-script", "the sales-team training script");

// Hub resource links (idempotent)
const setHubResource = (hub, to, label) => { const h = s.hubs.find((x) => x.hub === hub); if (h && !h.resource) h.resource = L(to, label); };
setHubResource("travel-voucher-deployment", "/discounted-travel-voucher-guide", "the one-page voucher guide");
setHubResource("measurement-roi", "/incentive-revenue-dashboard", "the incentive revenue dashboard");
setHubResource("customer-incentive-strategy", "/sales-team-training-script", "the sales-team training script");

fs.writeFileSync(P, JSON.stringify(s, null, 2) + "\n", "utf-8");
console.log("commercial pages:", s.commercial.length, "| gated:", s.commercial.filter((c) => c.gate).length);
console.log("playbook proof count:", playbook.proof.length);
console.log("hubs with resource:", s.hubs.filter((h) => h.resource).map((h) => h.hub).join(", "));
