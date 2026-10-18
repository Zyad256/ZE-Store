import React from 'react';
import { Download, ExternalLink, ShieldCheck, X } from 'lucide-react';
import { AppItem } from '../types/app';
import { getAppDownloadUrl } from '../data/apps';
import { buildGitHubReleaseWebUrl } from '../utils/github';

interface DownloadStateModalProps {
  app: AppItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadStateModal: React.FC<DownloadStateModalProps> = ({
  app,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !app) return null;

  const downloadUrl = getAppDownloadUrl(app);
  const releaseUrl = buildGitHubReleaseWebUrl(app.githubOwner, app.githubRepo, app.githubTag);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-7 text-left space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close download dialog"
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
            <Download size={24} className="animate-bounce" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Transfer Initiated
            </span>
            <h2 id="download-modal-title" className="text-xl font-bold text-slate-900">
              Downloading {app.name}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Version {app.version} • {app.size} • GitHub Releases
            </p>
          </div>
        </div>

        {/* File & Target Box */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">File package:</span>
            <span className="font-mono text-emerald-700 font-semibold truncate max-w-[220px]">
              {app.apkFilename}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Source:</span>
            <a
              href={releaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1 font-mono text-[11px]"
            >
              github.com/{app.githubOwner}/{app.githubRepo}
              <ExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* Direct Link fallback */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-xs text-emerald-900 flex items-center justify-between gap-3">
          <span>If download didn't start automatically:</span>
          <a
            href={downloadUrl}
            download={app.apkFilename}
            className="flex-shrink-0 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs inline-flex items-center gap-1.5"
          >
            <Download size={13} />
            Retry
          </a>
        </div>

        {/* Quick Android Install Helper */}
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-600" />
            Quick Android Install Steps:
          </h4>
          <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside pl-1">
            <li>
              Once downloaded, tap the notification or open <span className="text-slate-900 font-semibold">Downloads</span>.
            </li>
            <li>
              If prompted with <span className="text-amber-800 font-semibold">"Install unknown apps"</span>, toggle Allow for this browser.
            </li>
            <li>
              Tap <span className="text-emerald-700 font-semibold">Install</span> to finish.
            </li>
          </ol>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
