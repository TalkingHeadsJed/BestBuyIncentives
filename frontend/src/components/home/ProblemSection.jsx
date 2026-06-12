import { AlertTriangle, TrendingDown, Repeat, Hourglass } from "lucide-react";
import { PROBLEM_POINTS } from "@/data/content";
import SectionLabel from "@/components/site/SectionLabel";

const ICONS = [TrendingDown, Repeat, AlertTriangle, Hourglass];

export default function ProblemSection() {
  return (
    <section data-testid="problem-section" className="py-24 lg:py-32 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="font-display mt-6 text-4xl lg:text-5xl font-bold leading-[1.05]">
              Your team is trapped in the <span className="text-emerald-400">discount cycle.</span>
            </h2>
            <p className="mt-6 text-zinc-300 text-lg leading-relaxed">
              Discounting is the lazy lever. Every 1% you slice off price costs roughly 3% of your gross profit. Your team knows it. Your competitors know it. Your customers expect it.
            </p>
            <p className="mt-4 text-zinc-400 text-base leading-relaxed">
              There is a more sophisticated weapon — one that excites buyers, defends margin, and gives your reps a reason to push for the close today.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
              {PROBLEM_POINTS.map((p, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                  <div key={p.title} className="bg-[#0A0F17] p-8 hover:bg-[#111827] transition-colors">
                    <Icon className="h-6 w-6 text-emerald-400" />
                    <h3 className="mt-5 font-display font-semibold text-xl">{p.title}</h3>
                    <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{p.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
