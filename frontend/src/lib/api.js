// Static form handling via Web3Forms — no backend server required.
// Get a FREE access key in ~30s at https://web3forms.com (just enter the inbox
// email that should receive submissions). Paste it below, then rebuild.
export const WEB3FORMS_ACCESS_KEY = "43646412-eb6a-4348-bc8d-6c587d26701d";

async function sendWeb3Form(payload) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, ...payload }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Submission failed");
  return data;
}

export async function submitLead(data) {
  return sendWeb3Form({
    subject: `New Lead: ${data.full_name} - ${data.company}`,
    from_name: "BestBuyIncentives Website",
    ...data,
  });
}

export async function subscribeNewsletter(email) {
  return sendWeb3Form({
    subject: "New Newsletter Signup - BestBuyIncentives",
    from_name: "BestBuyIncentives Website",
    email,
    signup_type: "newsletter",
  });
}
