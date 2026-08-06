const baseUrl = process.env.BBI_STAGING_ORIGIN;
if (!baseUrl || !/^https:\/\//.test(baseUrl)) throw new Error("Set BBI_STAGING_ORIGIN to the HTTPS staging origin.");
if (process.env.BBI_ALLOW_CONTROLLED_SUBMISSION !== "YES") throw new Error("Set BBI_ALLOW_CONTROLLED_SUBMISSION=YES to authorize synthetic staging submissions.");
const endpoint = new URL("/api/consultation", baseUrl).href;
const now = new Date().toISOString();
const id = crypto.randomUUID();
const payload = {
  full_name: "BBI Controlled QA",
  work_email: "bbi-controlled-qa@example.com",
  company: "Best Buy Incentives QA",
  role: "QA",
  phone: "",
  sales_team_size: "6–20",
  industry: "B2B services",
  typical_sale_value: "$25,000–$99,999",
  sales_use_case: "Close qualified deals faster",
  estimated_eligible_transactions: "16–50",
  timeline: "Immediately",
  message: "Synthetic staging acceptance record. Delete after verification.",
  website_honeypot: "",
  submission_id: id,
  original_landing_page: `${baseUrl}/sales-closing-incentives/?utm_source=controlled_qa&utm_medium=test&utm_campaign=api_acceptance`,
  original_referrer: "",
  original_source: "controlled_qa",
  original_medium: "test",
  original_campaign: "api_acceptance",
  original_content: "runtime_harness",
  original_term: "",
  first_seen_at: now,
  converting_page: `${baseUrl}/contact/?utm_source=controlled_qa&utm_medium=test&utm_campaign=api_acceptance`,
  converting_referrer: `${baseUrl}/sales-closing-incentives/`,
  latest_source: "controlled_qa",
  latest_medium: "test",
  latest_campaign: "api_acceptance",
  latest_content: "runtime_harness",
  latest_term: "",
  content_id: "controlled-api-acceptance",
  page_type: "contact",
  industry_source: "",
  conversion_method: "consultation_form"
};

async function post(body, key = body.submission_id) {
  const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json", Origin: baseUrl, "Idempotency-Key": key }, body: JSON.stringify(body) });
  return { status: response.status, headers: Object.fromEntries(response.headers), body: await response.json().catch(() => ({})) };
}
const results = [];
const valid = await post(payload);
results.push({ test: "valid durable acceptance", expected: 202, actual: valid.status, pass: valid.status === 202 && valid.body.accepted === true && valid.body.submission_id === id && ["crm_created", "retry_queue_created"].includes(valid.body.durable_state) });
const duplicate = await post(payload);
results.push({ test: "idempotent duplicate", expected: 202, actual: duplicate.status, pass: duplicate.status === 202 && duplicate.body.submission_id === id && duplicate.body.durable_state === valid.body.durable_state });
const mismatch = await post({ ...payload, submission_id: crypto.randomUUID() }, "mismatched-idempotency-key");
results.push({ test: "idempotency mismatch rejected", expected: 400, actual: mismatch.status, pass: mismatch.status === 400 && mismatch.body.accepted === false });
const invalid = await post({ ...payload, submission_id: crypto.randomUUID(), work_email: "not-an-email" });
results.push({ test: "invalid email rejected", expected: 422, actual: invalid.status, pass: invalid.status === 422 && invalid.body.error_code === "validation_failed" });
const spam = await post({ ...payload, submission_id: crypto.randomUUID(), website_honeypot: "bot-filled" });
results.push({ test: "honeypot rejected", expected: 422, actual: spam.status, pass: spam.status === 422 && spam.body.error_code === "spam_rejected" });
const summary = { checked_at: new Date().toISOString(), endpoint, synthetic_submission_id: id, tests: results.length, passed: results.filter(result => result.pass).length, failed: results.filter(result => !result.pass).length, results, follow_up_required: ["Confirm exactly one durable queue/CRM record exists for synthetic_submission_id.", "Confirm the priority sales task is due within one hour.", "Confirm original and converting attribution are preserved.", "Confirm contact PII does not appear in analytics or operational logs.", "Delete or mark the synthetic QA record after evidence is captured."] };
console.log(JSON.stringify(summary, null, 2));
process.exitCode = summary.failed === 0 ? 0 : 1;
