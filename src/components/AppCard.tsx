import React, { useState } from 'react';
import { Download, ExternalLink, ShieldCheck, ChevronDown, ChevronUp, Sparkles, Layers, CheckCircle2, Terminal } from 'lucide-react';
import { AppItem } from '../types/app';
import { AppIcon } from './AppIcon';
import { ScreenshotGallery } from './ScreenshotGallery';
import { getAppDownloadUrl } from '../data/apps';
import { buildGitHubReleaseWebUrl } from '../utils/github';

interface AppCardProps {
  app: AppItem;
  onOpenLightbox: (app: AppItem, index: number) => void;
  onTriggerDownload: (app: AppItem) => void;
  onOpenChecksum: (app: AppItem) => void;
  onOpenGuide: () => void;
}

export const AppCard: React.FC<AppCardProps> = ({
  app,
  onOpenLightbox,
  onTriggerDownload,
  onOpenChecksum,
  onOpenGuide,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const downloadUrl = getAppDownloadUrl(app);
  const releaseUrl = buildGitHubReleaseWebUrl(app.githubOwner, app.githubRepo, app.githubTag);

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Programmatically trigger direct browser download from GitHub Releases
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = app.apkFilename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Call parent handler to show download modal feedback
    onTriggerDownload(app);
  };

  return (
    <article
      id={app.id}
      aria-label={`${app.name} version ${app.version}`}
      className="relative rounded-2xl sm:rounded-3xl bg-slate-900/95 border border-slate-800 shadow-xl shadow-black/30 overflow-hidden transition-all duration-300 hover:border-slate-700 p-5 sm:p-7 space-y-5"
    >
      {/* Top Banner highlight if badge exists */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* App Icon + Title Meta */}
        <div className="flex items-start gap-4">
          <AppIcon symbol={app.iconSymbol} bgGradient={app.iconBg} size="lg" />

          <div className="space-y-1 text-left min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {app.name}
              </h2>
              {app.badge && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {app.badge}
                </span>
              )}
              <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                {app.category}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 font-medium line-clamp-2">
              {app.tagline}
            </p>

            {/* Badges row: Version, Size, Android API */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-950 text-emerald-400 font-semibold border border-slate-800">
                {app.version}
              </span>
              <span>•</span>
              <span className="text-slate-300">{app.size}</span>
              <span>•</span>
              <span className="text-slate-400">{app.minAndroid}</span>
              <span>•</span>
              <span className="text-slate-500">{app.releaseDate}</span>
            </div>
          </div>
        </div>

        {/* Primary Download Button (Desktop top-right or Mobile full width) */}
        <div className="flex sm:flex-col items-stretch gap-2 flex-shrink-0">
          <button
            onClick={handleDownloadClick}
            aria-label={`Direct Download ${app.name} version ${app.version} APK (${app.size})`}
            className="w-full sm:w-auto px-5 py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Download size={18} className="stroke-[2.5]" />
            <span>Download APK</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950/20 text-slate-950">
              {app.size}
            </span>
          </button>
        </div>
      </div>

      {/* Brief Description */}
      <div className="text-left">
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {app.shortDescription}
        </p>
      </div>

      {/* Screenshot Gallery Section */}
      <div className="text-left pt-1">
        <ScreenshotGallery
          appName={app.name}
          screenshots={app.screenshots}
          onOpenLightbox={(idx) => onOpenLightbox(app, idx)}
        />
      </div>

      {/* Expandable Details Accordion */}
      <div className="border-t border-slate-800/80 pt-3 text-left">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          className="w-full flex items-center justify-between py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer group"
        >
          <span className="flex items-center gap-2">
            <Sparkles size={14} className="text-emerald-400" />
            <span>
              {isExpanded ? 'Hide' : 'Show'} What's New & Full Specifications
            </span>
          </span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {isExpanded && (
          <div className="pt-3 pb-2 space-y-4 animate-fadeIn text-xs text-slate-300">
            {/* Full description */}
            <p className="leading-relaxed text-slate-300 bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/80">
              {app.fullDescription}
            </p>

            {/* What's new in this version */}
            <div className="space-y-1.5">
              <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
                What's New in {app.version}
              </h4>
              <ul className="space-y-1 pl-1">
                {app.changelog.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Features */}
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                Key Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {app.features.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800/60"
                  >
                    <CheckCircle2 size={13} className="text-teal-400 flex-shrink-0" />
                    <span className="text-slate-300 text-xs">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Package Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800/60 font-mono text-[11px]">
              <div className="p-2 rounded bg-slate-950 border border-slate-800/80 text-slate-400 truncate">
                <span className="text-slate-500">Package: </span>
                <span className="text-slate-300">{app.packageName}</span>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800/80 text-slate-400 truncate">
                <span className="text-slate-500">File: </span>
                <span className="text-slate-300">{app.apkFilename}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Action Bar Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
        {/* Left tags / permissions */}
        <div className="flex flex-wrap items-center gap-1.5">
          {app.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800/70 text-slate-400"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Right utility links */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenChecksum(app)}
            className="text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors cursor-pointer"
            aria-label={`Verify SHA256 checksum for ${app.name}`}
          >
            <ShieldCheck size={14} />
            <span>Checksum</span>
          </button>

          <a
            href={releaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            aria-label={`View ${app.name} release on GitHub`}
          >
            <ExternalLink size={14} />
            <span>GitHub Release</span>
          </a>
        </div>
      </div>
    </article>
  );
};
