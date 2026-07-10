import Seo from "@/components/site/Seo";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, Calendar, Check, Loader2 } from "lucide-react";
import SectionLabel from "@/components/site/SectionLabel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IMG } from "@/data/images";
import { submitLead } from "@/lib/api";

const TEAM_SIZES = ["1-5 reps", "6-15 reps", "16-50 reps", "51-150 reps", "150+ reps"];
const INDUSTRIES_OPTS = [
  "Auto Dealership",
  "Jewelry",
  "Furniture",
  "Home Improvement",
  "Flooring",
  "Mattress",
  "Luxury Retail",
  "B2B Sales Org",
  "Other",
];
const DEAL_SIZES = ["Under $2K", "$2K – $10K", "$10K – $25K", "$25K – $75K", "$75K+"];

export default function Contact() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    company: "",
    role: "",
    phone: "",
    team_size: "",
    industry: "",
    avg_deal_size: "",
    message: "",
  });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
    return () => { try { document.body.removeChild(s); } catch (_) { /* noop */ } };
  }, []);

  const update = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));
  const onInput = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.company) {
      toast.error("Name, email, and company are required.");
      return;
    }
    try {
      setBusy(true);
      await submitLead({ ...form, source: "contact-page" });
      toast.success("Request received. We'll reach out within 1 business day.");
      setDone(true);
    } catch {
      toast.error("Could not submit. Please try again or email sales@bestbuyincentives.com.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div data-testid="page-contact">
      <Seo
        title="Book a Strategy Call — Contact BestBuyIncentives"
        description="Book a 30-minute strategy call. We'll map your sales floor, model your projected close-rate lift, and share program pricing. No pitch, no pressure."
        path="/contact"
      />
      <section className="relative bg-[#0A0A0A] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img src={IMG.heroPanel} alt="" className="w-full h-full object-cover kenburn" />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/70 to-black/95" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-40 pb-20">
          <SectionLabel dark>Strategy Call · 30 minutes</SectionLabel>
          <h1 className="font-display mt-6 text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.92]">
            Map your floor.<br />
            <span className="hl-yellow-full text-black">Model the lift.</span>
          </h1>
          <p className="mt-8 text-lg lg:text-2xl max-w-3xl leading-[1.4] text-white/85">
            Tell us about your team. A senior consultant will reach out with custom pricing, sample certificates, and a projected lift for your floor.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#E5E2D9]">
          <div className="lg:col-span-7 bg-white p-8 lg:p-12 border-r border-[#E5E2D9]">
            <div className="text-[11px] font-mono uppercase tracking-widest text-black/50 font-bold">
              01 · Request Information
            </div>
            <h2 className="font-display mt-2 text-3xl lg:text-5xl font-bold text-black leading-[0.95]">Tell us about your team</h2>

            {done ? (
              <div data-testid="contact-success" className="mt-10 p-8 border-2 border-[#FFD300] bg-[#FFF9D6]">
                <div className="h-12 w-12 bg-[#FFD300] flex items-center justify-center">
                  <Check className="h-6 w-6 text-black" strokeWidth={3} />
                </div>
                <h3 className="mt-5 font-display font-bold text-3xl text-black">Got it. We're on the way.</h3>
                <p className="mt-3 text-[#404040] text-base">
                  A senior consultant will reach out within 1 business day. While you wait, book a 30-minute strategy call below to skip the queue.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-10 space-y-5" data-testid="contact-form">
                <Row>
                  <Field label="Full Name" required>
                    <Input data-testid="contact-name" value={form.full_name} onChange={onInput("full_name")} placeholder="Alex Morgan" className="bg-white border-black/15 text-black h-12" />
                  </Field>
                  <Field label="Work Email" required>
                    <Input data-testid="contact-email" value={form.email} onChange={onInput("email")} type="email" placeholder="alex@company.com" className="bg-white border-black/15 text-black h-12" />
                  </Field>
                </Row>
                <Row>
                  <Field label="Company" required>
                    <Input data-testid="contact-company" value={form.company} onChange={onInput("company")} placeholder="Your company" className="bg-white border-black/15 text-black h-12" />
                  </Field>
                  <Field label="Role">
                    <Input data-testid="contact-role" value={form.role} onChange={onInput("role")} placeholder="VP Sales / Owner / Sales Manager" className="bg-white border-black/15 text-black h-12" />
                  </Field>
                </Row>
                <Row>
                  <Field label="Phone">
                    <Input data-testid="contact-phone" value={form.phone} onChange={onInput("phone")} placeholder="(555) 555-0102" className="bg-white border-black/15 text-black h-12" />
                  </Field>
                  <Field label="Team Size">
                    <SelectField testId="contact-team-size" value={form.team_size} onChange={update("team_size")} options={TEAM_SIZES} placeholder="Reps on the floor" />
                  </Field>
                </Row>
                <Row>
                  <Field label="Industry">
                    <SelectField testId="contact-industry" value={form.industry} onChange={update("industry")} options={INDUSTRIES_OPTS} placeholder="Pick your vertical" />
                  </Field>
                  <Field label="Average Deal Size">
                    <SelectField testId="contact-deal-size" value={form.avg_deal_size} onChange={update("avg_deal_size")} options={DEAL_SIZES} placeholder="Average ticket" />
                  </Field>
                </Row>
                <Field label="What are you trying to solve?">
                  <Textarea data-testid="contact-message" value={form.message} onChange={onInput("message")} rows={4} placeholder="Margin pressure? Stalled close rate? Showroom traffic? Tell us in your own words." className="bg-white border-black/15 text-black" />
                </Field>

                <button type="submit" disabled={busy} data-testid="contact-submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#FFD300] hover:bg-[#FFEA66] disabled:opacity-60 text-black font-bold text-base px-7 py-5 uppercase tracking-wide">
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {busy ? "Sending..." : "Request Information →"}
                </button>
                <p className="text-[11px] font-mono uppercase tracking-widest text-black/50 font-bold">
                  Replies within 1 business day. We never share your information.
                </p>
              </form>
            )}
          </div>

          <div className="lg:col-span-5 bg-[#F5F2EA] p-8 lg:p-12">
            <div className="text-[11px] font-mono uppercase tracking-widest text-black/50 font-bold">
              02 · Skip the Queue
            </div>
            <h2 className="font-display mt-2 text-3xl lg:text-5xl font-bold text-black leading-[0.95] flex items-center gap-3">
              <Calendar className="h-8 w-8 text-black" /> Book a 30-min call
            </h2>
            <p className="mt-3 text-[#595959] text-base">
              Pick a time. No pitch, no pressure — walk away with a deployable playbook.
            </p>

            <div className="mt-6 border border-[#E5E2D9] bg-white">
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/bestbuyincentives5/30min?primary_color=000000&background_color=ffffff&text_color=0A0A0A"
                style={{ minWidth: "320px", height: "700px" }}
                data-testid="calendly-embed"
              />
            </div>

            <div className="mt-10 pt-10 border-t border-[#E5E2D9] space-y-4">
              <Contact2 icon={Mail} label="Email" value="sales@bestbuyincentives.com" />
              <Contact2 icon={Phone} label="Phone" value="866-843-8003" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Row({ children }) { return <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{children}</div>; }
function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="text-[11px] font-mono uppercase tracking-widest text-black/60 font-bold">
        {label} {required && <span className="text-black">*</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
function SelectField({ value, onChange, options, placeholder, testId }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger data-testid={testId} className="bg-white border-black/15 text-black h-12">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-white border-black/15 text-black">
        {options.map((opt) => (
          <SelectItem key={opt} value={opt} className="focus:bg-[#FFD300] focus:text-black">
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
function Contact2({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-10 w-10 bg-[#FFD300] flex items-center justify-center">
        <Icon className="h-4 w-4 text-black" />
      </span>
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-black/50 font-bold">{label}</div>
        <div className="text-sm text-black font-semibold">{value}</div>
      </div>
    </div>
  );
}
