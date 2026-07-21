import { Play } from "lucide-react";
import { VIDEO_PLACEHOLDERS } from "@/data/content";
import { IMG } from "@/data/images";
import SectionLabel from "@/components/site/SectionLabel";

const POSTERS = [IMG.manSpeaking, IMG.whiteboard, IMG.closing];

export default function VideoSeries() {
  return (
    <section data-testid="video-series" className="bg-[#0A0A0A] text-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-3xl">
          <SectionLabel dark>The Closer's Playbook · Video Series</SectionLabel>
          <h2 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.95]">
            How to use this <span className="hl-yellow-full text-black">in your actual close.</span>
          </h2>
          <p className="mt-6 text-lg text-white/70 leading-relaxed">
            Tactical training drops for sales managers and reps. Word-for-word scripts, real field deployments, the exact moment to introduce the incentive.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {VIDEO_PLACEHOLDERS.map((v, i) => (
            <div key={i} data-testid={`video-placeholder-${i}`} className="bg-black border border-white/15 group">
              <div className="relative aspect-video overflow-hidden">
                <img src={POSTERS[i % POSTERS.length]} alt={v.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="h-16 w-16 rounded-full bg-[#FFD300] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="h-6 w-6 fill-black text-black ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/80 border border-white/20 text-[10px] font-mono tracking-widest text-white px-2 py-0.5">
                  {v.duration}
                </div>
                <span className="absolute top-3 left-3 stamp text-[10px]">Member access</span>
              </div>
              <div className="p-6">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#FFD300] font-bold">{v.label}</div>
                <h3 className="mt-2 font-display font-bold text-xl leading-tight">{v.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
