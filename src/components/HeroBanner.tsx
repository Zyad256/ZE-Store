import React from 'react';
import { Download, ShieldCheck, Zap, Github, ArrowDown } from 'lucide-react';

interface HeroBannerProps {
  appCount: number;
  onScrollToApps: () => void;
  onOpenGuide: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  appCount,
  onScrollToApps,
  onOpenGuide,
}) => {
  return (
    <section className="relative overflow-hidden py-10 sm:py-14 border-b border-slate-800/60 bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-950">
      {/* Subtle radial glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-64 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-semibold shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Direct GitHub Releases Hosting • No Middlemen</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Download Android Apps <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            Directly from GitHub Releases
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Clean, verified APK downloads for open-source and independent Android applications.
          Tap download on any app to fetch the verified package directly from release assets.
        </p>

        {/* Highlight features */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-300 font-medium">
          <div className="flex items-center gap-1.5">
            <Zap size={14} className="text-emerald-400" />
            <span>High-Speed GitHub CDN</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-teal-400" />
            <span>SHA-256 Checksums</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Download size={14} className="text-cyan-400" />
            <span>1-Tap Direct APK Transfer</span>
          </div>
        </div>

        {/* Action quick jump */}
        <div className="pt-3 flex items-center justify-center gap-3">
          <button
            onClick={onScrollToApps}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Browse {appCount} Apps</span>
            <ArrowDown size={13} />
          </button>
          <button
            onClick={onOpenGuide}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium border border-slate-800 transition-colors cursor-pointer"
          >
            Sideloading Instructions
          </button>
        </div>
      </div>
    </section>
  );
};
