import { Play } from "lucide-react";
import { VIDEO_PLACEHOLDERS } from "@/data/content";
import SectionLabel from "@/components/site/SectionLabel";

export default function VideoSeries() {
  return (
    <section data-testid="video-series" className="py-24 lg:py-32 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionLabel>The Closer's Playbook · Video Series</SectionLabel>
          <h2 className="font-display mt-6 text-4xl lg:text-5xl font-bold leading-[1.05]">
            How to use vacation incentives in your <span className="text-emerald-400">actual close.</span>
          </h2>
          <p className="mt-6 text-zinc-400 text-lg leading-relaxed">
            Tactical training drops for sales managers and individual reps. Word-for-word scripts, real field deployments, and the exact moments to introduce the incentive.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {VIDEO_PLACEHOLDERS.map((v, i) => (
            <div key={i} data-testid={`video-placeholder-${i}`} className="bg-[#0A0F17] p-8 group">
              <div className="relative aspect-video bg-[#111827] border border-white/10 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
                <div className="absolute inset-0 bg-grid opacity-30" />
                <button className="relative h-14 w-14 bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-[#0A0F17] transition-all">
                  <Play className="h-5 w-5 fill-current text-emerald-400 group-hover:text-[#0A0F17]" />
                </button>
                <div className="absolute bottom-3 right-3 bg-[#0A0F17]/85 border border-white/15 text-[10px] font-mono tracking-widest text-zinc-300 px-2 py-0.5">
                  {v.duration}
                </div>
              </div>
              <div className="mt-5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">{v.label}</div>
                <h3 className="mt-2 font-display font-semibold text-lg leading-tight">{v.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
