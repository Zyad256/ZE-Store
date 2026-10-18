import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { AppScreenshot } from '../types/app';

interface ScreenshotLightboxProps {
  appName: string;
  screenshots: AppScreenshot[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const ScreenshotLightbox: React.FC<ScreenshotLightboxProps> = ({
  appName,
  screenshots,
  currentIndex,
  isOpen,
  onClose,
  onSelectIndex,
}) => {
  const current = screenshots[currentIndex] || screenshots[0];

  const handlePrev = useCallback(() => {
    onSelectIndex((currentIndex - 1 + screenshots.length) % screenshots.length);
  }, [currentIndex, screenshots.length, onSelectIndex]);

  const handleNext = useCallback(() => {
    onSelectIndex((currentIndex + 1) % screenshots.length);
  }, [currentIndex, screenshots.length, onSelectIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${appName} screenshot gallery`}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/90 backdrop-blur-xl p-4 sm:p-6 transition-all duration-300 animate-fadeIn"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div
        className="w-full max-w-5xl flex items-center justify-between text-slate-200 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {currentIndex + 1} / {screenshots.length}
          </span>
          <h3 className="font-semibold text-sm sm:text-base text-white truncate max-w-xs sm:max-w-md">
            {appName} • {current.title}
          </h3>
        </div>
        <button
          onClick={onClose}
          aria-label="Close screenshot preview"
          className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        className="relative flex-1 flex items-center justify-center w-full max-w-5xl my-3 sm:my-5 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev Button */}
        {screenshots.length > 1 && (
          <button
            onClick={handlePrev}
            aria-label="Previous screenshot"
            className="absolute left-2 sm:left-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white transition-all backdrop-blur-sm border border-white/10 hover:scale-105 cursor-pointer shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* The Phone / Screenshot Container */}
        <div className="relative max-h-[68vh] sm:max-h-[72vh] flex flex-col items-center justify-center">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black ring-1 ring-white/15 bg-slate-900 border border-slate-800">
            <img
              src={current.url}
              alt={`${appName} - ${current.title}`}
              className="max-h-[64vh] sm:max-h-[68vh] w-auto object-contain select-none"
              loading="eager"
            />
            {/* Subtle camera punch hole at top */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black/80 ring-1 ring-white/10 pointer-events-none" />
          </div>
        </div>

        {/* Next Button */}
        {screenshots.length > 1 && (
          <button
            onClick={handleNext}
            aria-label="Next screenshot"
            className="absolute right-2 sm:right-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white transition-all backdrop-blur-sm border border-white/10 hover:scale-105 cursor-pointer shadow-lg"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {/* Caption & Thumbnail bar */}
      <div
        className="w-full max-w-4xl flex flex-col items-center gap-3 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-center text-xs sm:text-sm text-slate-300 max-w-2xl px-4">
          <span className="font-semibold text-white">{current.title}: </span>
          {current.caption}
        </p>

        {/* Thumbnails strip */}
        {screenshots.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto p-1 max-w-full">
            {screenshots.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => onSelectIndex(idx)}
                aria-label={`View screenshot ${idx + 1}: ${s.title}`}
                className={`relative w-12 h-18 sm:w-14 sm:h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                  idx === currentIndex
                    ? 'border-emerald-400 ring-2 ring-emerald-500/50 scale-105'
                    : 'border-slate-700 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={s.url}
                  alt={s.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
