async function postJson(url, payload, headers = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", ...headers },
    body: JSON.stringify(payload),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(body.message || "Request could not be accepted.");
    error.errorCode = body.error_code || "delivery_unavailable";
    error.retryable = body.retryable ?? response.status >= 500;
    error.status = response.status;
    error.fieldErrors = body.field_errors || null;
    throw error;
  }
  return { response, body };
}

export async function submitLead(payload) {
  const { response, body } = await postJson("/api/consultation", payload, {
    "Idempotency-Key": payload.submission_id,
  });
  if (response.status !== 202 || body.accepted !== true || body.submission_id !== payload.submission_id) {
    throw new Error("Request was not durably accepted.");
  }
  return body;
}

export async function submitPlaybookLead(payload) {
  const { response, body } = await postJson("/api/playbook-lead", payload, {
    "Idempotency-Key": payload.submission_id,
  });
  if (response.status !== 202 || body.accepted !== true || body.submission_id !== payload.submission_id) {
    const error = new Error("Request was not durably accepted.");
    error.errorCode = "delivery_unavailable";
    error.retryable = true;
    throw error;
  }
  return body;
}

export async function subscribeNewsletter(email, attribution = {}) {
  const submissionId = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const { body } = await postJson("/api/newsletter", {
    submission_id: submissionId,
    email,
    ...attribution,
  }, { "Idempotency-Key": submissionId });
  if (body.accepted !== true) throw new Error("Newsletter request was not accepted.");
  return body;
}
