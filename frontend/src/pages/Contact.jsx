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

  // Load Calendly embed script
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
    return () => {
      try { document.body.removeChild(s); } catch (_) { /* ignore */ }
    };
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
    } catch (err) {
      toast.error("Could not submit. Please try again or email sales@bestbuyincentives.com.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div data-testid="page-contact" className="pt-28">
      <section className="py-16 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel>Strategy Call · 30 minutes</SectionLabel>
          <h1 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.95]">
            Map your floor.
            <br />
            <span className="text-emerald-400">Model the lift.</span>
          </h1>
          <p className="mt-8 text-zinc-300 text-lg lg:text-xl max-w-3xl leading-relaxed">
            Tell us about your sales team. A senior consultant will reach out with custom pricing, sample certificates, and a projected lift for your floor.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/10 border border-white/10">
          {/* Form */}
          <div className="lg:col-span-7 bg-[#0A0F17] p-8 lg:p-12">
            <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">
              01 · Request Information
            </div>
            <h2 className="font-display mt-2 text-3xl font-bold">Tell us about your team</h2>

            {done ? (
              <div data-testid="contact-success" className="mt-10 p-8 border border-emerald-500/40 bg-emerald-500/5">
                <div className="h-12 w-12 bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                  <Check className="h-6 w-6 text-emerald-400" strokeWidth={2.5} />
                </div>
                <h3 className="mt-5 font-display font-bold text-2xl">Got it. We're on the way.</h3>
                <p className="mt-3 text-zinc-300">
                  A senior consultant will reach out within 1 business day. While you wait, book a 30-minute strategy call below to skip the queue.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-10 space-y-5" data-testid="contact-form">
                <Row>
                  <Field label="Full Name" required>
                    <Input
                      data-testid="contact-name"
                      value={form.full_name}
                      onChange={onInput("full_name")}
                      placeholder="Alex Morgan"
                      className="bg-[#111827] border-white/10 text-white"
                    />
                  </Field>
                  <Field label="Work Email" required>
                    <Input
                      data-testid="contact-email"
                      value={form.email}
                      onChange={onInput("email")}
                      type="email"
                      placeholder="alex@company.com"
                      className="bg-[#111827] border-white/10 text-white"
                    />
                  </Field>
                </Row>
                <Row>
                  <Field label="Company" required>
                    <Input
                      data-testid="contact-company"
                      value={form.company}
                      onChange={onInput("company")}
                      placeholder="Your company"
                      className="bg-[#111827] border-white/10 text-white"
                    />
                  </Field>
                  <Field label="Role">
                    <Input
                      data-testid="contact-role"
                      value={form.role}
                      onChange={onInput("role")}
                      placeholder="VP Sales / Owner / Sales Manager"
                      className="bg-[#111827] border-white/10 text-white"
                    />
                  </Field>
                </Row>
                <Row>
                  <Field label="Phone">
                    <Input
                      data-testid="contact-phone"
                      value={form.phone}
                      onChange={onInput("phone")}
                      placeholder="(555) 555-0102"
                      className="bg-[#111827] border-white/10 text-white"
                    />
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
                  <Textarea
                    data-testid="contact-message"
                    value={form.message}
                    onChange={onInput("message")}
                    rows={4}
                    placeholder="Margin pressure? Stalled close rate? Showroom traffic? Tell us in your own words."
                    className="bg-[#111827] border-white/10 text-white"
                  />
                </Field>

                <button
                  type="submit"
                  disabled={busy}
                  data-testid="contact-submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-[#0A0F17] font-semibold text-base px-6 py-4"
                >
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {busy ? "Sending..." : "Request Information →"}
                </button>
                <p className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                  Replies within 1 business day. We never share your information.
                </p>
              </form>
            )}
          </div>

          {/* Calendly + contact */}
          <div className="lg:col-span-5 bg-[#111827] p-8 lg:p-12">
            <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">
              02 · Skip the Queue
            </div>
            <h2 className="font-display mt-2 text-3xl font-bold flex items-center gap-3">
              <Calendar className="h-7 w-7 text-emerald-400" /> Book a 30-min call
            </h2>
            <p className="mt-3 text-zinc-400 text-sm">
              Pick a time. No pitch, no pressure — walk away with a deployable playbook.
            </p>

            <div className="mt-6 border border-white/10 bg-[#0A0F17]">
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/bestbuyincentives5/30min?primary_color=10b981&background_color=0A0F17&text_color=F9FAFB"
                style={{ minWidth: "320px", height: "700px" }}
                data-testid="calendly-embed"
              />
            </div>

            <div className="mt-10 pt-10 border-t border-white/10 space-y-4">
              <Contact2 icon={Mail} label="Email" value="sales@bestbuyincentives.com" />
              <Contact2 icon={Phone} label="Phone" value="1-800-555-0102" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Row({ children }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{children}</div>;
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
        {label} {required && <span className="text-emerald-400">*</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function SelectField({ value, onChange, options, placeholder, testId }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger data-testid={testId} className="bg-[#111827] border-white/10 text-white">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-[#111827] border-white/10 text-white">
        {options.map((opt) => (
          <SelectItem key={opt} value={opt} className="focus:bg-emerald-500/20 focus:text-emerald-400">
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
      <span className="h-9 w-9 bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center">
        <Icon className="h-4 w-4 text-emerald-400" />
      </span>
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">{label}</div>
        <div className="text-sm text-white">{value}</div>
      </div>
    </div>
  );
}
