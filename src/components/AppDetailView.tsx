import React from 'react';
import { ArrowLeft, Download, ExternalLink, CheckCircle2, Sparkles } from 'lucide-react';
import { AppItem } from '../types/app';
import { AppIcon } from './AppIcon';
import { ScreenshotGallery } from './ScreenshotGallery';
import { getAppDownloadUrl } from '../data/apps';
import { buildGitHubReleaseWebUrl } from '../utils/github';

interface AppDetailViewProps {
  app: AppItem;
  onBack: () => void;
  onOpenLightbox: (app: AppItem, index: number) => void;
  onTriggerDownload: (app: AppItem) => void;
}

export const AppDetailView: React.FC<AppDetailViewProps> = ({
  app,
  onBack,
  onOpenLightbox,
  onTriggerDownload,
}) => {
  const downloadUrl = getAppDownloadUrl(app);
  const releaseUrl = buildGitHubReleaseWebUrl(app.githubOwner, app.githubRepo, app.githubTag);

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
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
    <div className="animate-fadeIn space-y-6 pb-12">
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          aria-label="Back to apps list"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-xs font-semibold text-xs sm:text-sm transition-all cursor-pointer group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Play Store Style App Header Card */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          <AppIcon
            symbol={app.iconSymbol}
            bgGradient={app.iconBg}
            size="xl"
            className="shadow-xl shadow-emerald-500/15"
          />

          <div className="space-y-2 text-left flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {app.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              {app.tagline}
            </p>

            {/* Version and file size */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-600 font-medium">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-bold border border-slate-200">
                {app.version}
              </span>
              <span>•</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-semibold border border-slate-200">
                {app.size}
              </span>
              <span>•</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                {app.minAndroid}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
          <button
            onClick={handleDownloadClick}
            aria-label={`Download ${app.name} version ${app.version} APK (${app.size})`}
            className="flex-1 sm:flex-initial px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-600 hover:via-teal-700 hover:to-cyan-700 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Download size={20} className="stroke-[2.5]" />
            <span>Download APK</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white">
              {app.size}
            </span>
          </button>

          <a
            href={releaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink size={15} />
            <span>GitHub Release</span>
          </a>
        </div>
      </section>

      {/* Screenshot Gallery Section */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm">
        <ScreenshotGallery
          appName={app.name}
          screenshots={app.screenshots}
          onOpenLightbox={(idx) => onOpenLightbox(app, idx)}
        />
      </section>

      {/* About this app */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4 text-left">
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          About this app
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          {app.shortDescription}
        </p>
        <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
          {app.fullDescription}
        </p>

        {/* Key Features */}
        <div className="space-y-2 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Key Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {app.features.map((feat, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70"
              >
                <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's New */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-3 text-left">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-emerald-600" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            What's New in {app.version}
          </h2>
        </div>
        <ul className="space-y-2 pl-1">
          {app.changelog.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* App Info */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4 text-left">
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          App Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-500 block mb-0.5">Package</span>
            <span className="font-mono text-slate-900 font-semibold">{app.packageName}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-500 block mb-0.5">File</span>
            <span className="font-mono text-slate-900 font-semibold">{app.apkFilename}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-500 block mb-0.5">Requires</span>
            <span className="text-slate-900 font-semibold">{app.minAndroid}</span>
          </div>
        </div>
      </section>
    </div>
  );
};
