import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import { RESOURCES } from "@/data/content";

export default function ResourceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const r = RESOURCES.find((x) => x.slug === slug);

  if (!r) {
    return (
      <div data-testid="page-resource-not-found" className="pt-32 pb-24 bg-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl font-bold text-black">Article not found.</h1>
          <button
            onClick={() => navigate("/resources")}
            data-testid="resource-back"
            className="mt-8 inline-flex items-center gap-2 text-black font-bold"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Library
          </button>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="page-resource-detail" className="bg-white">
      <section className="bg-[#0A0A0A] text-white pt-32 pb-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Link to="/resources" data-testid="resource-back-link" className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#FFD300] font-bold hover:text-white">
            <ArrowLeft className="h-3 w-3" /> Library
          </Link>
          <div className="mt-6 inline-block stamp text-[10px]">{r.category}</div>
          <h1 className="font-display mt-6 text-4xl lg:text-7xl font-bold leading-[0.95]">{r.title}</h1>
          <div className="mt-6 text-[11px] font-mono uppercase tracking-widest text-white/60 flex items-center gap-2 font-bold">
            <Clock className="h-3 w-3" /> {r.minutes} min read
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="aspect-[16/9] overflow-hidden bg-[#F5F2EA] border border-[#E5E2D9] mb-10">
            <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6">
            {r.body.map((p, i) => (
              <p key={i} className="text-[#404040] text-lg leading-relaxed">{p}</p>
            ))}
          </div>

          <div className="mt-16 bg-[#0A0A0A] text-white p-10 lg:p-12">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#FFD300] font-bold">Apply this on your sales floor</div>
            <h3 className="mt-3 font-display font-bold text-3xl lg:text-4xl leading-tight">Want a custom program built around your team?</h3>
            <Link
              to="/contact"
              data-testid="resource-cta"
              className="mt-6 inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-6 py-3 uppercase tracking-wide"
            >
              Book Strategy Call <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
