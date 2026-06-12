import SectionLabel from "@/components/site/SectionLabel";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Award, Users } from "lucide-react";

export default function About() {
  return (
    <div data-testid="page-about" className="pt-28">
      <section className="py-16 lg:py-24 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel>About BestBuyIncentives</SectionLabel>
          <h1 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.95]">
            Not a travel company.
            <br />
            <span className="text-emerald-400">A sales-growth company.</span>
          </h1>
          <p className="mt-8 text-zinc-300 text-lg lg:text-xl max-w-3xl leading-relaxed">
            We build closing tools for high-ticket sales teams. The product happens to look like a vacation. The product is increased sales.
          </p>
        </div>
      </section>

      <section className="py-24 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl lg:text-4xl font-bold leading-tight">
              We started with one question.
            </h2>
            <div className="mt-6 space-y-5 text-zinc-300 text-base lg:text-lg leading-relaxed">
              <p>
                "What if a sales team had a closing tool every other team in their zip code didn't?"
              </p>
              <p>
                We've spent over two decades engineering vacation incentives that aren't designed for travelers — they're designed for the moment a rep needs to break a stall, neutralize a price objection, or kill buyer's remorse before it kills a referral.
              </p>
              <p>
                We work with auto dealers, jewelers, furniture chains, home improvement firms, and B2B sales orgs nationwide. Programs deploy in days. ROI shows up inside the first quarter.
              </p>
              <p>
                We're not for everyone. We're for the leader who refuses to compete on discount.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 gap-px bg-white/10 border border-white/10">
              <Stat icon={Target} value="20+" label="Years building incentive programs" />
              <Stat icon={Users} value="1,200+" label="Sales teams deployed" />
              <Stat icon={Award} value="$184M" label="Added pipeline closed" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel>Operating Principles</SectionLabel>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            <Principle
              n="01"
              title="Sales growth, not vacations"
              body="Every recommendation we make is in service of your close rate, your traffic, your margin. The vacation is the mechanism."
            />
            <Principle
              n="02"
              title="We handle redemption"
              body="Your team never touches travel logistics. We answer every redemption call. You stay focused on selling."
            />
            <Principle
              n="03"
              title="Measured lift or it didn't happen"
              body="We design every program with measurable lift baked in. If we can't define the lift, we don't ship the program."
            />
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl lg:text-5xl font-bold leading-[1.05]">
            See if a program <span className="text-emerald-400">fits your team.</span>
          </h2>
          <Link
            to="/contact"
            data-testid="about-cta"
            className="mt-10 inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-[#0A0F17] font-semibold text-base px-7 py-4"
          >
            Book Strategy Call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="bg-[#0A0F17] p-8 flex items-center gap-6">
      <div className="h-12 w-12 bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
        <Icon className="h-5 w-5 text-emerald-400" />
      </div>
      <div>
        <div className="font-display font-bold text-4xl text-emerald-400 tabular-num leading-none">{value}</div>
        <div className="mt-2 text-[11px] font-mono uppercase tracking-widest text-zinc-400">{label}</div>
      </div>
    </div>
  );
}

function Principle({ n, title, body }) {
  return (
    <div className="bg-[#0A0F17] p-8">
      <div className="font-mono text-xs tracking-widest text-emerald-400">{n}</div>
      <h3 className="mt-4 font-display font-semibold text-2xl leading-tight">{title}</h3>
      <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{body}</p>
    </div>
  );
}
