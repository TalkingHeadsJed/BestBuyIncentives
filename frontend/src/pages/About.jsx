import SectionLabel from "@/components/site/SectionLabel";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Award, Users } from "lucide-react";
import { IMG } from "@/data/images";

export default function About() {
  return (
    <div data-testid="page-about">
      {/* Hero */}
      <section className="relative bg-[#0A0A0A] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img src={IMG.heroSpeaker} alt="" className="w-full h-full object-cover kenburn" />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/60 to-black/90" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-40 pb-24 lg:pb-32">
          <SectionLabel dark>About BestBuyIncentives</SectionLabel>
          <h1 className="font-display mt-6 text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.92]">
            Not a travel company.<br />
            <span className="hl-yellow-full text-black">A sales-growth company.</span>
          </h1>
          <p className="mt-8 text-lg lg:text-2xl max-w-3xl leading-[1.4] text-white/85">
            We engineer closing tools for high-ticket sales teams. The mechanism happens to look like a vacation. The product is increased sales.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl lg:text-6xl font-bold leading-[0.95] text-black">
              We started with <span className="under-yellow">one question.</span>
            </h2>
            <div className="mt-7 space-y-5 text-lg text-[#404040] leading-relaxed">
              <p>"What if a sales team had a closing tool every other team in their zip code didn't?"</p>
              <p>
                We've spent over two decades building vacation incentives that aren't designed for travelers. They're designed for the moment a rep needs to break a stall, neutralize a price objection, or kill buyer's remorse before it kills a referral.
              </p>
              <p>
                We work with auto dealers, jewelers, furniture chains, home improvement firms, and B2B sales orgs nationwide. Programs deploy in days. ROI shows up inside the first quarter.
              </p>
              <p className="font-bold text-black">
                We're not for everyone. We're for the leader who refuses to compete on discount.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 gap-4">
              <Stat icon={Target} value="20+" label="Years building incentive programs" />
              <Stat icon={Users} value="1,200+" label="Sales teams deployed" />
              <Stat icon={Award} value="$184M" label="Added pipeline closed" />
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-[#F5F2EA] py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionLabel>Operating Principles</SectionLabel>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            <Principle n="01" title="Sales growth, not vacations" body="Every recommendation we make is in service of your close rate, your traffic, your margin. The vacation is the mechanism." />
            <Principle n="02" title="We handle redemption" body="Your team never touches travel logistics. We answer every redemption call. You stay focused on selling." />
            <Principle n="03" title="Measured lift or it didn't happen" body="We design every program with measurable lift baked in. If we can't define the lift, we don't ship the program." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <h2 className="font-display text-4xl lg:text-6xl font-bold leading-[0.95] text-black">
            See if a program <span className="under-yellow">fits your team.</span>
          </h2>
          <Link
            to="/contact"
            data-testid="about-cta"
            className="mt-10 inline-flex items-center gap-3 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-lg px-8 py-5 uppercase tracking-wide"
          >
            Book Strategy Call <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="bg-[#F5F2EA] p-7 flex items-center gap-6">
      <div className="h-14 w-14 bg-[#FFD300] flex items-center justify-center">
        <Icon className="h-6 w-6 text-black" />
      </div>
      <div>
        <div className="font-display font-bold text-5xl text-black tabular-num leading-none">{value}</div>
        <div className="mt-2 text-[11px] font-mono uppercase tracking-widest text-black/60 font-bold">{label}</div>
      </div>
    </div>
  );
}

function Principle({ n, title, body }) {
  return (
    <div className="bg-white p-8 border border-[#E5E2D9]">
      <div className="font-mono text-xs uppercase tracking-widest text-black/50 font-bold">{n}</div>
      <h3 className="mt-4 font-display font-bold text-2xl lg:text-3xl leading-[1.05] text-black">{title}</h3>
      <p className="mt-3 text-base text-[#595959] leading-relaxed">{body}</p>
    </div>
  );
}
