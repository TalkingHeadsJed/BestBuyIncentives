import Seo from "@/components/site/Seo";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div data-testid="page-404" className="bg-white pt-40 pb-24 min-h-[70vh] flex items-center">
      <Seo title="Page not found" path="/404" noIndex />
      <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
        <div className="font-mono text-[11px] uppercase tracking-widest text-black/50 font-bold">Error 404</div>
        <h1 className="font-display mt-4 text-5xl lg:text-7xl font-bold leading-[0.95] text-black">
          Off the map.<br />
          <span className="under-yellow">Let's get back on plan.</span>
        </h1>
        <Link
          to="/"
          data-testid="notfound-home-cta"
          className="mt-10 inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-base px-6 py-4 uppercase tracking-wide"
        >
          Back to Homepage →
        </Link>
      </div>
    </div>
  );
}
