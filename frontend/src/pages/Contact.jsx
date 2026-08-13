import Seo from "@/components/site/Seo";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, Calendar, Check, Loader2, ChevronDown } from "lucide-react";
import SectionLabel from "@/components/site/SectionLabel";
import useHydrated from "@/hooks/useHydrated";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IMG } from "@/data/images";
import { submitLead } from "@/lib/api";
import { buildPayload, captureAttribution, createSubmissionId, installCalendlyTracking, pushAnalytics } from "@/lib/consultationClient";

const TEAM_SIZES = ["1", "2–5", "6–20", "21–50", "51+"];
const INDUSTRIES = ["Automotive", "Home improvement", "Real estate", "Financial services", "B2B services", "Other high-ticket sales"];
const DEAL_VALUES = ["Under $2,500", "$2,500–$9,999", "$10,000–$24,999", "$25,000–$99,999", "$100,000+"];
const USE_CASES = ["Close qualified deals faster", "Increase close rate", "Create urgency without deeper discounting", "Re-engage stalled opportunities", "Equip a sales team with a closing tool", "Other"];
const TRANSACTIONS = ["1–5", "6–15", "16–50", "51–100", "101+"];
const TIMELINES = ["Immediately", "Within 30 days", "Within 60 days", "Within 90 days", "Researching"];

const EMPTY_TOUCH = { source: "direct", medium: "none", campaign: "", content: "", term: "", landing_page: "https://bestbuyincentives.com/contact/", referrer: "", seen_at: "" };
const INITIAL_FORM = { full_name: "", work_email: "", company: "", role: "", phone: "", sales_team_size: "", industry: "", typical_sale_value: "", sales_use_case: "", estimated_eligible_transactions: "", timeline: "", message: "", website_honeypot: "" };

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [attribution, setAttribution] = useState({ original: EMPTY_TOUCH, current: EMPTY_TOUCH });
  const [submissionId, setSubmissionId] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const formStarted = useRef(false);
  const calendarOpened = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || window.__PRERENDER__) return undefined;
    setAttribution(captureAttribution());
    const params = new URLSearchParams(window.location.search);
    const suppliedIndustry = params.get("industry");
    if (suppliedIndustry) setForm((current) => ({ ...current, industry: suppliedIndustry }));
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { try { document.body.removeChild(script); } catch { /* already removed */ } };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || window.__PRERENDER__) return undefined;
    return installCalendlyTracking(() => ({ submission_id: submissionId }));
  }, [submissionId]);

  const update = (name) => (value) => setForm((current) => ({ ...current, [name]: value }));
  const onInput = (name) => (event) => setForm((current) => ({ ...current, [name]: event.target.value }));
  const ensureFormStarted = () => {
    if (formStarted.current) return;
    formStarted.current = true;
    const id = submissionId || createSubmissionId();
    setSubmissionId(id);
    pushAnalytics("consultation_form_start", { page_path: window.location.pathname, form_id: "bbi_consultation_form" });
  };
  const openCalendar = () => {
    if (calendarOpened.current) return;
    calendarOpened.current = true;
    pushAnalytics("calendar_open", { page_path: window.location.pathname, calendar_provider: "calendly", cta_label: "Book a 30-minute strategy call" });
  };

  const submit = async (event) => {
    event.preventDefault();
    ensureFormStarted();
    setErrorMessage("");
    if (!form.full_name || !form.work_email || !form.company || !form.industry || !form.sales_use_case) {
      setErrorMessage("Complete your name, work email, company, industry, and sales objective.");
      toast.error("Please complete the required fields.");
      return;
    }
    const id = submissionId || createSubmissionId();
    if (!submissionId) setSubmissionId(id);
    const params = new URLSearchParams(window.location.search);
    const payload = buildPayload(form, attribution, { submission_id: id, content_id: params.get("content") || "contact", industry_source: params.get("industry") || "" });
    pushAnalytics("consultation_form_submit", { page_path: window.location.pathname, form_id: "bbi_consultation_form", submission_id: id, industry: form.industry, use_case: form.sales_use_case });
    try {
      setBusy(true);
      await submitLead(payload);
      pushAnalytics("consultation_form_success", { page_path: window.location.pathname, form_id: "bbi_consultation_form", submission_id: id, conversion_method: "consultation_form" });
      toast.success("Your consultation request is in.");
      setDone(true);
    } catch (error) {
      const message = "We couldn’t send your request. Please try again, call 866-843-8003, or email karl@bestbuyincentives.com.";
      setErrorMessage(message);
      pushAnalytics("consultation_form_error", { page_path: window.location.pathname, form_id: "bbi_consultation_form", error_type: error.errorCode || "network_or_server_error", error_stage: "server_or_transport" });
      toast.error(message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div data-testid="page-contact">
      <Seo title="Plan a High-Ticket Sales Incentive Campaign | Best Buy Incentives" description="Talk with Best Buy Incentives about using discounted travel vouchers to help your high-ticket sales team create urgency and close qualified opportunities." path="/contact" />
      <section className="relative bg-[#0A0A0A] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30"><img src={IMG.heroPanel} alt="" className="w-full h-full object-cover kenburn" /><div className="absolute inset-0 bg-gradient-to-br from-black via-black/70 to-black/95" /></div>
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-40 pb-20">
          <SectionLabel dark>Sales strategy consultation · 30 minutes</SectionLabel>
          <h1 className="font-display mt-6 text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.92]">Plan a <span className="hl-yellow-full text-black">closing-incentive campaign.</span></h1>
          <p className="mt-8 text-lg lg:text-2xl max-w-3xl leading-[1.4] text-white/85">Tell us how your sales team sells, where qualified deals tend to stall, and what you want to improve. We’ll help you evaluate whether discounted travel vouchers fit your offer and sales process.</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#E5E2D9]">
          <div className="lg:col-span-7 bg-white p-8 lg:p-12 border-r border-[#E5E2D9]">
            <div className="text-[11px] font-mono uppercase tracking-widest text-black/50 font-bold">01 · Request a consultation</div>
            <h2 className="font-display mt-2 text-3xl lg:text-5xl font-bold text-black leading-[0.95]">Tell us about your sales team</h2>
            {done ? (
              <div data-testid="contact-success" className="mt-10 p-8 border-2 border-[#FFD300] bg-[#FFF9D6]">
                <div className="h-12 w-12 bg-[#FFD300] flex items-center justify-center"><Check className="h-6 w-6 text-black" strokeWidth={3} /></div>
                <h3 className="mt-5 font-display font-bold text-3xl text-black">Your consultation request is in.</h3>
                <p className="mt-3 text-[#404040] text-base">A Best Buy Incentives specialist will review your sales process and contact you. If you want to choose a time now, use the calendar.</p>
              </div>
            ) : (
              <form id="bbi_consultation_form" onSubmit={submit} onFocusCapture={ensureFormStarted} className="mt-10 space-y-5" data-testid="contact-form" noValidate>
                <input className="absolute -left-[9999px]" tabIndex="-1" autoComplete="off" aria-hidden="true" name="website_honeypot" value={form.website_honeypot} onChange={onInput("website_honeypot")} />
                <AttributionFields payload={buildPayload(form, attribution, { submission_id: submissionId, content_id: "contact" })} />
                <Row>
                  <Field label="Full name" required><Input id="full_name" name="full_name" required maxLength={160} autoComplete="name" data-testid="contact-name" value={form.full_name} onChange={onInput("full_name")} placeholder="Alex Morgan" className="bg-white border-black/15 text-black h-12" /></Field>
                  <Field label="Work email" required><Input id="work_email" name="work_email" required maxLength={254} autoComplete="email" data-testid="contact-email" value={form.work_email} onChange={onInput("work_email")} type="email" placeholder="alex@company.com" className="bg-white border-black/15 text-black h-12" /></Field>
                </Row>
                <Row>
                  <Field label="Company" required><Input id="company" name="company" required maxLength={160} autoComplete="organization" data-testid="contact-company" value={form.company} onChange={onInput("company")} placeholder="Your company" className="bg-white border-black/15 text-black h-12" /></Field>
                  <Field label="Role"><Input id="role" name="role" maxLength={120} autoComplete="organization-title" data-testid="contact-role" value={form.role} onChange={onInput("role")} placeholder="VP Sales / Owner / Sales Manager" className="bg-white border-black/15 text-black h-12" /></Field>
                </Row>
                <Row>
                  <Field label="Phone"><Input id="phone" name="phone" maxLength={40} autoComplete="tel" data-testid="contact-phone" value={form.phone} onChange={onInput("phone")} type="tel" placeholder="(555) 555-0102" className="bg-white border-black/15 text-black h-12" /></Field>
                  <Field label="Sales team size"><SelectField name="sales_team_size" testId="contact-team-size" value={form.sales_team_size} onChange={update("sales_team_size")} options={TEAM_SIZES} placeholder="Select team size" /></Field>
                </Row>
                <Row>
                  <Field label="Industry" required><SelectField name="industry" required testId="contact-industry" value={form.industry} onChange={update("industry")} options={INDUSTRIES} placeholder="Select industry" /></Field>
                  <Field label="Typical sale value"><SelectField name="typical_sale_value" testId="contact-deal-size" value={form.typical_sale_value} onChange={update("typical_sale_value")} options={DEAL_VALUES} placeholder="Select typical sale" /></Field>
                </Row>
                <Field label="What do you want to improve?" required><SelectField name="sales_use_case" required testId="contact-use-case" value={form.sales_use_case} onChange={update("sales_use_case")} options={USE_CASES} placeholder="Select the primary sales objective" /></Field>
                <Row>
                  <Field label="Qualified opportunities per month"><SelectField name="estimated_eligible_transactions" testId="contact-transactions" value={form.estimated_eligible_transactions} onChange={update("estimated_eligible_transactions")} options={TRANSACTIONS} placeholder="Select a range" /></Field>
                  <Field label="When do you want to launch?"><SelectField name="timeline" testId="contact-timeline" value={form.timeline} onChange={update("timeline")} options={TIMELINES} placeholder="Select timing" /></Field>
                </Row>
                <Field label="Where are deals getting stuck?"><Textarea id="message" name="message" maxLength={1500} data-testid="contact-message" value={form.message} onChange={onInput("message")} rows={4} placeholder="Price pressure? Delayed decisions? Competitive shopping?" className="bg-white border-black/15 text-black" /></Field>
                {errorMessage && <div role="alert" data-testid="contact-error" className="p-4 border-2 border-red-600 bg-red-50 text-red-900">{errorMessage}</div>}
                <button type="submit" disabled={busy} data-testid="contact-submit" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#FFD300] hover:bg-[#FFEA66] disabled:opacity-60 text-black font-bold text-base px-7 py-5 uppercase tracking-wide">{busy && <Loader2 className="h-4 w-4 animate-spin" />}{busy ? "Sending..." : "Request a Sales Strategy Consultation →"}</button>
                <p className="text-[11px] font-mono uppercase tracking-widest text-black/50 font-bold">Replies within one business day. We never share your information.</p>
              </form>
            )}
          </div>

          <div className="lg:col-span-5 bg-[#F5F2EA] p-8 lg:p-12">
            <div className="text-[11px] font-mono uppercase tracking-widest text-black/50 font-bold">02 · Choose a time</div>
            <h2 className="font-display mt-2 text-3xl lg:text-5xl font-bold text-black leading-[0.95] flex items-center gap-3"><Calendar className="h-8 w-8 text-black" /> Book a 30-minute call</h2>
            <p className="mt-3 text-[#595959] text-base">Choose a time to discuss your sales process, offer economics, and campaign fit.</p>
            <div className="mt-6 border border-[#E5E2D9] bg-white" onClickCapture={openCalendar} onFocusCapture={openCalendar}><div className="calendly-inline-widget" data-url="https://calendly.com/bestbuyincentives5/30min?primary_color=000000&background_color=ffffff&text_color=0A0A0A" style={{ minWidth: "320px", height: "700px" }} data-testid="calendly-embed" /></div>
            <div className="mt-10 pt-10 border-t border-[#E5E2D9] space-y-4">
              <Contact2 icon={Mail} label="Email" value="karl@bestbuyincentives.com" href="mailto:karl@bestbuyincentives.com" event="email_click" />
              <Contact2 icon={Phone} label="Phone" value="866-843-8003" href="tel:+18668438003" event="phone_click" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AttributionFields({ payload }) {
  const names = ["submission_id", "original_landing_page", "original_referrer", "original_source", "original_medium", "original_campaign", "original_content", "original_term", "first_seen_at", "converting_page", "converting_referrer", "latest_source", "latest_medium", "latest_campaign", "latest_content", "latest_term", "content_id", "page_type", "industry_source", "conversion_method"];
  return names.map((name) => <input key={name} type="hidden" id={name} name={name} value={payload[name] || ""} readOnly />);
}
function Row({ children }) { return <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{children}</div>; }
function Field({ label, required, children }) { return <label className="block"><span className="text-[11px] font-mono uppercase tracking-widest text-black/60 font-bold">{label}{required && <span className="text-black"> *</span>}</span><div className="mt-2">{children}</div></label>; }
function SelectField({ name, required, value, onChange, options, placeholder, testId }) {
  const hydrated = useHydrated();
  if (!hydrated) return <><input type="hidden" id={name} name={name} required={required} value={value} readOnly /><div data-testid={testId} className="bg-white border border-black/15 text-black/50 h-12 px-3 rounded-md flex items-center justify-between text-sm"><span>{value || placeholder}</span><ChevronDown className="h-4 w-4 opacity-50" /></div></>;
  return <><input type="hidden" id={name} name={name} required={required} value={value} readOnly /><Select value={value} onValueChange={onChange}><SelectTrigger data-testid={testId} className="bg-white border-black/15 text-black h-12"><SelectValue placeholder={placeholder} /></SelectTrigger><SelectContent className="bg-white border-black/15 text-black">{options.map((option) => <SelectItem key={option} value={option} className="focus:bg-[#FFD300] focus:text-black">{option}</SelectItem>)}</SelectContent></Select></>;
}
function Contact2({ icon: Icon, label, value, href, event }) {
  return <a href={href} onClick={() => pushAnalytics(event, { page_path: window.location.pathname, link_position: "contact_sidebar", conversion_method: event === "phone_click" ? "phone" : "email" })} className="flex items-center gap-4 hover:bg-[#FFD300]/20"><span className="h-10 w-10 bg-[#FFD300] flex items-center justify-center"><Icon className="h-4 w-4 text-black" /></span><span><span className="block text-[10px] font-mono uppercase tracking-widest text-black/50 font-bold">{label}</span><span className="block text-sm text-black font-semibold">{value}</span></span></a>;
}
