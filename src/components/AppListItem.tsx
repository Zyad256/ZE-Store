import React from 'react';
import { Download, ChevronRight } from 'lucide-react';
import { AppItem } from '../types/app';
import { AppIcon } from './AppIcon';
import { getAppDownloadUrl } from '../data/apps';

interface AppListItemProps {
  app: AppItem;
  onSelectApp: (app: AppItem) => void;
  onTriggerDownload: (app: AppItem) => void;
}

export const AppListItem: React.FC<AppListItemProps> = ({
  app,
  onSelectApp,
  onTriggerDownload,
}) => {
  const downloadUrl = getAppDownloadUrl(app);

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Don't trigger card click
    // Programmatically trigger direct browser download from GitHub Releases
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = app.apkFilename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onTriggerDownload(app);
  };

  return (
    <article
      onClick={() => onSelectApp(app)}
      aria-label={`Open ${app.name} details`}
      className="group relative bg-white hover:bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      {/* Left: Icon + Title + Meta */}
      <div className="flex items-center gap-4 min-w-0">
        <AppIcon
          symbol={app.iconSymbol}
          bgGradient={app.iconBg}
          size="md"
          className="shadow-md shadow-emerald-500/10 group-hover:scale-105 transition-transform"
        />

        <div className="min-w-0 text-left space-y-1">
          <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-emerald-600 transition-colors truncate">
            {app.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-1">
            {app.tagline}
          </p>

          <div className="flex items-center gap-2 pt-0.5 text-[11px] text-slate-600 font-medium">
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100">
              {app.version}
            </span>
            <span>•</span>
            <span>{app.size}</span>
          </div>
        </div>
      </div>

      {/* Right: Direct Download button + Arrow indicator */}
      <div className="flex items-center gap-2 justify-end sm:flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        <button
          onClick={handleDownloadClick}
          aria-label={`Download ${app.name} APK (${app.size})`}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md shadow-emerald-500/20 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
        >
          <Download size={16} className="stroke-[2.5]" />
          <span>Download</span>
          <span className="opacity-90 text-[11px] font-medium hidden xs:inline">
            ({app.size})
          </span>
        </button>

        <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all">
          <ChevronRight size={18} />
        </div>
      </div>
    </article>
  );
};
