import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import { RESOURCES } from "@/data/content";

export default function ResourceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const r = RESOURCES.find((x) => x.slug === slug);

  if (!r) {
    return (
      <div data-testid="page-resource-not-found" className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl font-bold">Article not found.</h1>
          <button
            onClick={() => navigate("/resources")}
            data-testid="resource-back"
            className="mt-8 inline-flex items-center gap-2 text-emerald-400"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Library
          </button>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="page-resource-detail" className="pt-28">
      <section className="py-12 border-b border-white/10">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Link to="/resources" data-testid="resource-back-link" className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-emerald-400 hover:text-emerald-300">
            <ArrowLeft className="h-3 w-3" /> Library
          </Link>
          <div className="mt-6 inline-block bg-emerald-500/10 border border-emerald-500/40 text-[10px] font-mono uppercase tracking-widest text-emerald-400 px-2 py-1">
            {r.category}
          </div>
          <h1 className="font-display mt-6 text-4xl lg:text-6xl font-bold leading-[1.05]">{r.title}</h1>
          <div className="mt-6 text-[11px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-2">
            <Clock className="h-3 w-3" /> {r.minutes} min read
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="aspect-[16/9] overflow-hidden bg-[#1F2937] border border-white/10 mb-10">
            <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6">
            {r.body.map((p, i) => (
              <p key={i} className="text-zinc-300 text-base lg:text-lg leading-relaxed">{p}</p>
            ))}
          </div>

          <div className="mt-16 p-8 bg-[#111827] border border-emerald-500/30">
            <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Apply this on your sales floor</div>
            <h3 className="mt-2 font-display font-bold text-2xl">Want a custom program built around your team?</h3>
            <Link
              to="/contact"
              data-testid="resource-cta"
              className="mt-5 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#0A0F17] font-semibold text-sm px-5 py-3"
            >
              Book Strategy Call <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
