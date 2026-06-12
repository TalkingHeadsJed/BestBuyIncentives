export default function SectionLabel({ children, className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="inline-block h-px w-8 bg-emerald-500" />
      <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-400">
        {children}
      </span>
    </div>
  );
}
