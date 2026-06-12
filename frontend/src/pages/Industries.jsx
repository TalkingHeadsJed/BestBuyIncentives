import SectionLabel from "@/components/site/SectionLabel";
import { INDUSTRIES } from "@/data/content";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Industries() {
  return (
    <div data-testid="page-industries" className="pt-28">
      <section className="py-16 lg:py-24 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel>Built for high-ticket teams</SectionLabel>
          <h1 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.95]">
            Verticals we move.
            <br />
            <span className="text-emerald-400">Numbers we move them by.</span>
          </h1>
          <p className="mt-8 text-zinc-300 text-lg lg:text-xl max-w-3xl leading-relaxed">
            If your team sells anything north of $2,000 a ticket, vacation incentives belong in your playbook. Here's how each vertical typically uses the program.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-px">
          {INDUSTRIES.map((ind, i) => (
            <article
              key={ind.name}
              data-testid={`industry-${ind.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10 bg-[#0A0F17] hover:bg-[#111827] transition-colors"
            >
              <div className="lg:col-span-1 p-6 lg:p-8 flex items-center border-r border-white/10">
                <div className="font-mono text-xs tracking-widest text-emerald-400">{String(i + 1).padStart(2, "0")}</div>
              </div>
              <div className="lg:col-span-5 p-6 lg:p-8 border-r border-white/10">
                <h3 className="font-display font-bold text-2xl lg:text-3xl">{ind.name}</h3>
              </div>
              <div className="lg:col-span-4 p-6 lg:p-8 border-r border-white/10">
                <p className="text-sm text-zinc-400 leading-relaxed">{ind.desc}</p>
              </div>
              <div className="lg:col-span-2 p-6 lg:p-8 flex flex-col justify-center">
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Typical lift</div>
                <div className="mt-1 font-display font-bold text-emerald-400 text-xl lg:text-2xl tabular-num">{ind.metric}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-24 border-t border-white/10">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl lg:text-5xl font-bold leading-[1.05]">
            Don't see your vertical? <span className="text-emerald-400">Talk to us.</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-lg">If you sell high-ticket, we have a play for you.</p>
          <Link
            to="/contact"
            data-testid="industries-cta"
            className="mt-10 inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-[#0A0F17] font-semibold text-base px-7 py-4"
          >
            Map My Sales Floor <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
