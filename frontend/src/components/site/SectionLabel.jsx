export default function SectionLabel({ children, dark = false, className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className={`inline-block h-px w-10 ${dark ? "bg-[#FFD300]" : "bg-black"}`} />
      <span className={`text-[11px] font-mono uppercase tracking-[0.28em] font-bold ${dark ? "text-[#FFD300]" : "text-black"}`}>
        {children}
      </span>
    </div>
  );
}
