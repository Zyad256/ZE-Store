import React from 'react';
import { Smartphone } from 'lucide-react';

interface NavbarProps {
  onTitleClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onTitleClick }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 border-b border-slate-200/80 shadow-xs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center">
        <button
          onClick={onTitleClick}
          aria-label="Go to ZE Store Home"
          className="flex items-center gap-3 cursor-pointer group text-left focus:outline-none"
        >
          {/* Colorful Play-Store style vibrant icon */}
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-2 flex items-center justify-center text-white shadow-md shadow-emerald-500/25 transition-transform group-hover:scale-105">
            <Smartphone size={22} className="stroke-[2.5]" />
          </div>
          <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
            ZE Store
          </span>
        </button>
      </div>
    </header>
  );
};
