import React from 'react';
import { X, ShieldCheck, Smartphone, Settings, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallGuideModal: React.FC<InstallGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 text-left space-y-6 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close installation guide"
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Smartphone size={13} />
            Android Sideloading Guide
          </div>
          <h2 id="guide-modal-title" className="text-xl sm:text-2xl font-bold text-white">
            How to Install an APK on Android
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Installing apps directly from GitHub Releases is safe, fast, and does not require Google Play Store.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {/* Step 1 */}
          <div className="flex gap-4 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-sm flex-shrink-0">
              1
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-white">Download the APK</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Click <span className="text-emerald-400 font-medium">Download APK</span> on any app. Your browser will transfer the file directly from GitHub CDN.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold text-sm flex-shrink-0">
              2
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-white">Allow "Install Unknown Apps"</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                When opening the file for the first time, Android may ask:
                <em className="block text-slate-400 mt-1 not-italic font-mono bg-slate-900 p-1.5 rounded border border-slate-800 text-[11px]">
                  "For your security, your phone is not allowed to install unknown apps from this source."
                </em>
                Tap <span className="text-cyan-400 font-medium">Settings</span> and toggle <span className="text-white font-medium">"Allow from this source"</span> for your browser (Chrome, Samsung Internet, Firefox, etc.).
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-bold text-sm flex-shrink-0">
              3
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-white">Confirm Installation</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tap the back arrow and tap <span className="text-emerald-400 font-medium">Install</span>. The system package manager will install the application to your home screen and app drawer.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-4 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-sm flex-shrink-0">
              4
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-white">Google Play Protect (Informational)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Since newly released open-source APKs are not published on the Play Store, Google Play Protect may show "Unrecognized app". Tap <span className="text-amber-400 font-medium">"Install anyway"</span> or <span className="text-amber-400 font-medium">"More details"</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
