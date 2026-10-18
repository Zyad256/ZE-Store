import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { AppScreenshot } from '../types/app';

interface ScreenshotGalleryProps {
  appName: string;
  screenshots: AppScreenshot[];
  onOpenLightbox: (index: number) => void;
}

export const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({
  appName,
  screenshots,
  onOpenLightbox,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <div className="relative group/gallery my-2">
      {/* Scroll controls */}
      {screenshots.length > 2 && (
        <>
          <button
            onClick={() => scroll('left')}
            aria-label={`Scroll ${appName} screenshots left`}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-slate-700 border border-slate-200 shadow-md flex items-center justify-center opacity-0 group-hover/gallery:opacity-100 transition-opacity cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label={`Scroll ${appName} screenshots right`}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-slate-700 border border-slate-200 shadow-md flex items-center justify-center opacity-0 group-hover/gallery:opacity-100 transition-opacity cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Gallery row */}
      <div
        ref={scrollRef}
        className="gallery-scroll flex gap-4 overflow-x-auto pb-3 pt-1 px-1 scroll-smooth snap-x snap-mandatory"
      >
        {screenshots.map((item, index) => (
          <div
            key={item.id}
            className="snap-start flex-shrink-0 flex flex-col group/item cursor-pointer"
            onClick={() => onOpenLightbox(index)}
          >
            {/* Phone mockup frame in light store styling */}
            <div className="relative w-44 sm:w-48 h-80 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group-hover/item:border-emerald-500 group-hover/item:shadow-md transition-all duration-300">
              <img
                src={item.url}
                alt={`${appName} preview: ${item.title}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105"
                loading="lazy"
              />

              {/* Phone notch dot */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-slate-900/80 ring-1 ring-white/50 pointer-events-none" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-3 text-center">
                <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center mb-1.5 shadow-lg transform -translate-y-1 group-hover/item:translate-y-0 transition-transform">
                  <ZoomIn size={18} className="stroke-[2.5]" />
                </div>
                <span className="text-xs font-semibold text-white drop-shadow-md">
                  Preview High-Res
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
