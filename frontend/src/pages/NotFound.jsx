import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div data-testid="page-404" className="pt-32 pb-24 min-h-[60vh] flex items-center">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <div className="font-mono text-[11px] uppercase tracking-widest text-emerald-400">Error 404</div>
        <h1 className="font-display mt-4 text-5xl lg:text-7xl font-bold leading-[1.05]">
          Off the map.
          <br />
          <span className="text-emerald-400">Let's get back on plan.</span>
        </h1>
        <Link
          to="/"
          data-testid="notfound-home-cta"
          className="mt-10 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#0A0F17] font-semibold text-sm px-5 py-3"
        >
          Back to Homepage →
        </Link>
      </div>
    </div>
  );
}
