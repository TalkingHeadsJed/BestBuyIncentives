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
    <section data-testid="roi-calculator" className="bg-[#F5F2EA] py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-3xl">
          <SectionLabel>The Math</SectionLabel>
          <h2 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.95] text-black">
            What a <span className="under-yellow">22% lift</span> does to your top line.
          </h2>
          <p className="mt-6 text-lg text-[#595959] leading-relaxed">
            Drag the sliders. We'll run the math against your sales floor in real time.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#E5E2D9] bg-white">
          <div className="lg:col-span-7 p-8 lg:p-12 space-y-8 border-r border-[#E5E2D9]">
            <SliderRow label="Sales reps on the floor" value={reps} min={1} max={200} onChange={setReps} displayValue={`${reps}`} testId="roi-reps" />
            <SliderRow label="Average deal size (USD)" value={avgDeal} min={500} max={150000} step={500} onChange={setAvgDeal} displayValue={fmtMoney(avgDeal)} testId="roi-avg-deal" />
            <SliderRow label="Deals per rep / month" value={dealsPerRep} min={1} max={50} onChange={setDealsPerRep} displayValue={`${dealsPerRep}`} testId="roi-deals-per-rep" />
            <SliderRow label="Current close rate" value={closeRate} min={5} max={80} onChange={setCloseRate} displayValue={`${closeRate}%`} testId="roi-close-rate" />
          </div>

          <div className="lg:col-span-5 bg-[#0A0A0A] text-white p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#FFD300] font-bold">
                  Projected annual lift
                </div>
                {loading && <Loader2 className="h-3.5 w-3.5 text-white/40 animate-spin" />}
              </div>
              <div data-testid="roi-annual" className="mt-4 font-display font-bold text-[#FFD300] text-5xl lg:text-7xl tabular-num leading-[0.95]">
                {fmtMoney(result?.annual_added_revenue)}
              </div>
              <div className="mt-3 text-sm text-white/70">
                Conservative against typical field results (22% close-rate lift).
              </div>

              <div className="mt-10 grid grid-cols-2 gap-px bg-white/10">
                <Tile label="Added deals / mo" value={result?.added_deals_per_month?.toFixed(1) ?? "0"} />
                <Tile label="New close rate" value={`${result?.new_close_rate ?? closeRate}%`} />
                <Tile label="Added rev / mo" value={fmtMoney(result?.monthly_added_revenue)} />
                <Tile label="Reps deployed" value={`${reps}`} />
              </div>
            </div>

            <Link
              to="/contact"
              data-testid="roi-cta"
              className="mt-10 inline-flex items-center justify-center gap-3 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-base px-7 py-5 uppercase tracking-wide"
            >
              See My Custom Quote <ArrowRight className="h-4 w-4" />
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
        <span className="text-[11px] font-mono uppercase tracking-widest text-black/60 font-bold">{label}</span>
        <span className="font-display font-bold text-2xl lg:text-3xl text-black tabular-num">{displayValue}</span>
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
    <div className="bg-[#0A0A0A] p-5">
      <div className="text-[10px] font-mono uppercase tracking-widest text-white/50 font-bold">{label}</div>
      <div className="mt-1 font-display font-bold text-2xl text-white tabular-num">{value}</div>
    </div>
  );
}
