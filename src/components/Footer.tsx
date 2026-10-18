import React from 'react';
import { Github, Smartphone, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenConfig: () => void;
  onOpenGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConfig, onOpenGuide }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-10 px-4 sm:px-6 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Smartphone size={16} className="text-emerald-400" />
            <span className="font-bold text-white text-sm">APK Hub</span>
            <span className="text-slate-600">•</span>
            <span>Static GitHub Pages Distribution</span>
          </div>
          <p className="text-[11px] text-slate-500 max-w-md">
            All application packages (.apk) are hosted and transferred directly from official GitHub Release assets.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
          <button
            onClick={onOpenConfig}
            className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            Manage Apps & Links
          </button>
          <button
            onClick={onOpenGuide}
            className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            Installation Guide
          </button>
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
          >
            <ArrowUp size={12} />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
