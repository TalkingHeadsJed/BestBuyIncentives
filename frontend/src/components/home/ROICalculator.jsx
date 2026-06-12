import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import SectionLabel from "@/components/site/SectionLabel";
import { calculateROI } from "@/lib/api";

function fmtMoney(n) {
  if (n == null || isNaN(n)) return "$0";
  return "$" + Math.round(n).toLocaleString("en-US");
}

export default function ROICalculator() {
  const [reps, setReps] = useState(12);
  const [avgDeal, setAvgDeal] = useState(8500);
  const [dealsPerRep, setDealsPerRep] = useState(8);
  const [closeRate, setCloseRate] = useState(28);
  const [uplift] = useState(22);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        setLoading(true);
        const r = await calculateROI({
          reps,
          avg_deal_size: avgDeal,
          monthly_deals_per_rep: dealsPerRep,
          current_close_rate: closeRate,
          uplift_pct: uplift,
        });
        if (!cancelled) setResult(r);
      } catch {
        if (!cancelled) setResult(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    const t = setTimeout(run, 200);
    return () => { cancelled = true; clearTimeout(t); };
  }, [reps, avgDeal, dealsPerRep, closeRate, uplift]);

  return (
    <section data-testid="roi-calculator" className="py-24 lg:py-32 border-b border-white/10 relative">
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="max-w-3xl">
          <SectionLabel>ROI Calculator · Live</SectionLabel>
          <h2 className="font-display mt-6 text-4xl lg:text-5xl font-bold leading-[1.05]">
            What a <span className="text-emerald-400">22% close-rate lift</span> does to your top line.
          </h2>
          <p className="mt-6 text-zinc-400 text-lg">
            Drag the sliders. We'll run the math against your sales floor.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/10 border border-white/10">
          {/* Inputs */}
          <div className="lg:col-span-7 bg-[#0A0F17] p-8 lg:p-12 space-y-8">
            <SliderRow
              label="Sales reps on the floor"
              value={reps}
              min={1}
              max={200}
              onChange={(v) => setReps(v)}
              displayValue={`${reps}`}
              testId="roi-reps"
            />
            <SliderRow
              label="Average deal size (USD)"
              value={avgDeal}
              min={500}
              max={150000}
              step={500}
              onChange={(v) => setAvgDeal(v)}
              displayValue={fmtMoney(avgDeal)}
              testId="roi-avg-deal"
            />
            <SliderRow
              label="Deals per rep per month"
              value={dealsPerRep}
              min={1}
              max={50}
              onChange={(v) => setDealsPerRep(v)}
              displayValue={`${dealsPerRep}`}
              testId="roi-deals-per-rep"
            />
            <SliderRow
              label="Current close rate"
              value={closeRate}
              min={5}
              max={80}
              onChange={(v) => setCloseRate(v)}
              displayValue={`${closeRate}%`}
              testId="roi-close-rate"
            />
          </div>

          {/* Output */}
          <div className="lg:col-span-5 bg-[#111827] p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                  Projected annual revenue lift
                </div>
                {loading && <Loader2 className="h-3.5 w-3.5 text-zinc-500 animate-spin" />}
              </div>
              <div data-testid="roi-annual" className="mt-3 font-display font-bold text-emerald-400 text-5xl lg:text-6xl tabular-num leading-none">
                {fmtMoney(result?.annual_added_revenue)}
              </div>
              <div className="mt-2 text-sm text-zinc-400">
                Assumes a 22% close-rate lift, conservative against typical field results.
              </div>

              <div className="mt-10 grid grid-cols-2 gap-px bg-white/10">
                <Tile label="Added deals / month" value={result?.added_deals_per_month?.toFixed(1) ?? "0"} />
                <Tile label="New close rate" value={`${result?.new_close_rate ?? closeRate}%`} />
                <Tile label="Added revenue / month" value={fmtMoney(result?.monthly_added_revenue)} />
                <Tile label="Reps deployed" value={`${reps}`} />
              </div>
            </div>

            <Link
              to="/contact"
              data-testid="roi-cta"
              className="mt-10 inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-[#0A0F17] font-semibold text-base px-6 py-4"
            >
              See My Custom Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SliderRow({ label, value, min, max, step = 1, onChange, displayValue, testId }) {
  return (
    <div data-testid={`${testId}-row`}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">{label}</span>
        <span className="font-display font-bold text-2xl text-white tabular-num">{displayValue}</span>
      </div>
      <Slider
        data-testid={testId}
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
        className="mt-3"
      />
    </div>
  );
}

function Tile({ label, value }) {
  return (
    <div className="bg-[#111827] p-5">
      <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">{label}</div>
      <div className="mt-1 font-display font-bold text-xl text-white tabular-num">{value}</div>
    </div>
  );
}
