import React, { useState } from 'react';
import { X, Check, Copy, Shield, Terminal } from 'lucide-react';
import { AppItem } from '../types/app';

interface ChecksumModalProps {
  app: AppItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ChecksumModal: React.FC<ChecksumModalProps> = ({ app, isOpen, onClose }) => {
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);

  if (!isOpen || !app) return null;

  const copyHash = () => {
    navigator.clipboard.writeText(app.sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const copyCommand = () => {
    navigator.clipboard.writeText(`sha256sum ${app.apkFilename}`);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checksum-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close checksum modal"
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-100 border border-cyan-200 flex items-center justify-center text-cyan-700">
            <Shield size={20} />
          </div>
          <div>
            <h3 id="checksum-title" className="text-base sm:text-lg font-bold text-slate-900">
              Package Verification (SHA-256)
            </h3>
            <p className="text-xs text-slate-500">
              {app.name} • {app.apkFilename}
            </p>
          </div>
        </div>

        {/* SHA256 string */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span className="font-bold">Expected SHA-256 Hash</span>
            <button
              onClick={copyHash}
              className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 cursor-pointer"
            >
              {copiedHash ? <Check size={12} /> : <Copy size={12} />}
              <span>{copiedHash ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 font-mono text-xs text-slate-800 break-all select-all">
            {app.sha256}
          </div>
        </div>

        {/* Terminal verification command */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span className="font-bold flex items-center gap-1.5">
              <Terminal size={13} />
              Linux / Mac / Termux command:
            </span>
            <button
              onClick={copyCommand}
              className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 cursor-pointer"
            >
              {copiedCommand ? <Check size={12} /> : <Copy size={12} />}
              <span>{copiedCommand ? 'Copied' : 'Copy Command'}</span>
            </button>
          </div>
          <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 font-mono text-xs text-emerald-400 break-all select-all">
            sha256sum {app.apkFilename}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
