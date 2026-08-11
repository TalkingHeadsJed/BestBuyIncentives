import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Lock, CheckCircle2 } from "lucide-react";
import { submitPlaybookLead } from "@/lib/api";
import { captureAttribution, createSubmissionId, pushAnalytics } from "@/lib/consultationClient";
import { isBusinessEmail, buildPlaybookPayload } from "@/lib/playbookClient";

const TEAM_SIZES = ["", "1", "2–5", "6–20", "21–50", "51+"];
const USE_CASES = [
  "",
  "Close qualified deals faster",
  "Increase close rate",
  "Create urgency without deeper discounting",
  "Re-engage stalled opportunities",
  "Equip a sales team with a closing tool",
  "Other",
];

const inputCls =
  "w-full bg-white border border-[#C9C5B8] px-4 py-3 text-[15px] text-[#0A0A0A] placeholder:text-[#9A968A] focus:outline-none focus:border-[#0A0A0A]";
const labelCls = "block text-[11px] font-mono uppercase tracking-widest text-[#595959] font-bold mb-2";

const EMPTY = {
  first_name: "", last_name: "", work_email: "", company: "",
  role: "", phone: "", sales_team_size: "", sales_use_case: "", website_honeypot: "",
};

const DEFAULT_COPY = {
  badge: "Free download — business email required",
  heading: "Get the High-Ticket Closing Playbook",
  intro: "Enter your details and we'll unlock the PDF instantly. We use this only to send the playbook and follow up about your sales floor.",
  submitLabel: "Get the playbook",
  acceptedHeading: "Your playbook is ready",
  acceptedIntro: "Thanks. Your access is confirmed. Download the manager playbook below, then book a working session to map it to your sales floor.",
  downloadLabel: "Download the playbook (PDF)",
};

export default function PlaybookGate({ assetId, downloadUrl, copy = {} }) {
  const c = { ...DEFAULT_COPY, ...copy };
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [accepted, setAccepted] = useState(null); // { submission_id, download_url }
  const [started, setStarted] = useState(false);

  const pagePath = typeof window !== "undefined" ? window.location.pathname : "/high-ticket-closing-playbook";

  const onStart = useCallback(() => {
    if (started) return;
    setStarted(true);
    pushAnalytics("playbook_form_start", { page_path: pagePath, playbook_asset_id: assetId });
  }, [started, pagePath, assetId]);

  const setField = (name) => (e) => {
    onStart();
    setForm((f) => ({ ...f, [name]: e.target.value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const validate = () => {
    const next = {};
    if (!form.first_name.trim()) next.first_name = "Required.";
    if (!form.last_name.trim()) next.last_name = "Required.";
    if (!form.company.trim()) next.company = "Required.";
    if (!form.work_email.trim()) next.work_email = "Required.";
    else if (!isBusinessEmail(form.work_email)) next.work_email = "Enter a valid business email (no personal inboxes).";
    if (form.sales_team_size && !TEAM_SIZES.includes(form.sales_team_size)) next.sales_team_size = "Select a valid option.";
    if (form.sales_use_case && !USE_CASES.includes(form.sales_use_case)) next.sales_use_case = "Select a valid option.";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onStart();
    setFormError(null);
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      pushAnalytics("playbook_form_error", { page_path: pagePath, playbook_asset_id: assetId, error_code: "validation_failed", error_type: "validation" });
      return;
    }
    setSubmitting(true);
    const attribution = captureAttribution();
    const submissionId = createSubmissionId();
    const payload = buildPlaybookPayload(form, attribution, { asset_id: assetId, submission_id: submissionId });
    try {
      const body = await submitPlaybookLead(payload);
      // Durable success ONLY: now fire accepted + reveal the download.
      pushAnalytics("playbook_lead_accepted", { page_path: pagePath, playbook_asset_id: assetId, durable_state: body.durable_state, submission_id: submissionId });
      setAccepted({ submission_id: submissionId, download_url: body.download_url || downloadUrl });
    } catch (err) {
      if (err.fieldErrors && typeof err.fieldErrors === "object") setErrors(err.fieldErrors);
      const errorType = err.status && err.status < 500 && err.status !== 429 ? "validation" : "server";
      setFormError(
        err.retryable
          ? "We couldn't complete that just now. Please try again in a moment."
          : "Please review the highlighted fields and try again."
      );
      pushAnalytics("playbook_form_error", { page_path: pagePath, playbook_asset_id: assetId, error_code: err.errorCode || "delivery_unavailable", error_type: errorType });
    } finally {
      setSubmitting(false);
    }
  };

  const onDownloadClick = () => {
    pushAnalytics("playbook_download_click", { page_path: pagePath, playbook_asset_id: assetId, submission_id: accepted?.submission_id });
  };

  if (accepted) {
    return (
      <div data-testid="playbook-accepted" className="border border-[#E5E2D9] bg-[#FAF9F5] p-8">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-[#0A0A0A]" />
          <h2 className="font-display text-2xl font-bold text-[#0A0A0A]">{c.acceptedHeading}</h2>
        </div>
        <p className="mt-3 text-[#404040] leading-relaxed">
          {c.acceptedIntro}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a href={accepted.download_url} download data-testid="playbook-download-link" onClick={onDownloadClick}
            className="inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-6 py-3 uppercase tracking-wide">
            <Download className="h-4 w-4" /><span>{c.downloadLabel}</span>
          </a>
          <Link to="/contact" data-testid="playbook-consultation-cta"
            className="inline-flex items-center gap-2 border-2 border-black text-black hover:bg-black hover:text-white font-bold text-sm px-6 py-3 uppercase tracking-wide transition-colors">
            <span>Schedule a campaign consultation</span> <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-[#E5E2D9] bg-[#FAF9F5] p-6 lg:p-8">
      <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#595959] font-bold">
        <Lock className="h-3.5 w-3.5 text-[#FFD300]" /><span>{c.badge}</span>
      </div>
      <h2 className="mt-3 font-display text-2xl font-bold text-[#0A0A0A]">{c.heading}</h2>
      <p className="mt-2 text-[#404040] leading-relaxed">
        {c.intro}
      </p>

      <form data-testid="playbook-form" onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls} htmlFor="pb-first">First name</label>
            <input id="pb-first" data-testid="playbook-first-name" className={inputCls} value={form.first_name} onChange={setField("first_name")} autoComplete="given-name" />
            {errors.first_name && <p data-testid="playbook-error-first_name" className="mt-1 text-xs text-[#B00020] font-bold">{errors.first_name}</p>}
          </div>
          <div>
            <label className={labelCls} htmlFor="pb-last">Last name</label>
            <input id="pb-last" data-testid="playbook-last-name" className={inputCls} value={form.last_name} onChange={setField("last_name")} autoComplete="family-name" />
            {errors.last_name && <p data-testid="playbook-error-last_name" className="mt-1 text-xs text-[#B00020] font-bold">{errors.last_name}</p>}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls} htmlFor="pb-email">Business email</label>
            <input id="pb-email" type="email" data-testid="playbook-work-email" className={inputCls} value={form.work_email} onChange={setField("work_email")} autoComplete="email" placeholder="you@company.com" />
            {errors.work_email && <p data-testid="playbook-error-work_email" className="mt-1 text-xs text-[#B00020] font-bold">{errors.work_email}</p>}
          </div>
          <div>
            <label className={labelCls} htmlFor="pb-company">Company</label>
            <input id="pb-company" data-testid="playbook-company" className={inputCls} value={form.company} onChange={setField("company")} autoComplete="organization" />
            {errors.company && <p data-testid="playbook-error-company" className="mt-1 text-xs text-[#B00020] font-bold">{errors.company}</p>}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls} htmlFor="pb-role">Role / title <span className="normal-case text-[#9A968A]">(optional)</span></label>
            <input id="pb-role" data-testid="playbook-role" className={inputCls} value={form.role} onChange={setField("role")} autoComplete="organization-title" />
          </div>
          <div>
            <label className={labelCls} htmlFor="pb-phone">Phone <span className="normal-case text-[#9A968A]">(optional)</span></label>
            <input id="pb-phone" data-testid="playbook-phone" className={inputCls} value={form.phone} onChange={setField("phone")} autoComplete="tel" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls} htmlFor="pb-team">Sales team size <span className="normal-case text-[#9A968A]">(optional)</span></label>
            <select id="pb-team" data-testid="playbook-team-size" className={inputCls} value={form.sales_team_size} onChange={setField("sales_team_size")}>
              {TEAM_SIZES.map((v) => (<option key={v || "any"} value={v}>{v || "Select one"}</option>))}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="pb-use">Primary use-case <span className="normal-case text-[#9A968A]">(optional)</span></label>
            <select id="pb-use" data-testid="playbook-use-case" className={inputCls} value={form.sales_use_case} onChange={setField("sales_use_case")}>
              {USE_CASES.map((v) => (<option key={v || "any"} value={v}>{v || "Select one"}</option>))}
            </select>
          </div>
        </div>

        <div aria-hidden="true" className="hidden">
          <label htmlFor="pb-hp">Do not fill this field</label>
          <input id="pb-hp" data-testid="playbook-honeypot" tabIndex={-1} autoComplete="off" value={form.website_honeypot} onChange={setField("website_honeypot")} />
        </div>

        {formError && <p data-testid="playbook-error" className="text-sm text-[#B00020] font-bold">{formError}</p>}

        <button type="submit" data-testid="playbook-submit-button" disabled={submitting}
          className="inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] disabled:opacity-60 text-black font-bold text-sm px-6 py-3 uppercase tracking-wide">
          <span>{submitting ? "Unlocking…" : c.submitLabel}</span> <ArrowRight className="h-3.5 w-3.5" />
        </button>

        <p data-testid="playbook-consent" className="text-xs text-[#595959] leading-relaxed">
          By requesting the playbook you agree that Best Buy Incentives may contact you about its programs. Read our <Link to="/privacy" className="text-black font-bold underline hover:text-[#595959]">Privacy Policy</Link>
        </p>
      </form>
    </div>
  );
}
