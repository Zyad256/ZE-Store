import React, { useState } from 'react';
import { X, Plus, Trash2, Edit3, Check, Copy, Download, Github, Code, RefreshCw, Sparkles, ExternalLink } from 'lucide-react';
import { AppItem } from '../types/app';
import { buildGitHubReleaseDownloadUrl, isValidApkFilename } from '../utils/github';

interface AppConfigModalProps {
  apps: AppItem[];
  isOpen: boolean;
  onClose: () => void;
  onSaveApps: (updated: AppItem[]) => void;
  onResetDefaults: () => void;
}

export const AppConfigModal: React.FC<AppConfigModalProps> = ({
  apps,
  isOpen,
  onClose,
  onSaveApps,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'export' | 'ghguide'>('edit');
  const [editingApps, setEditingApps] = useState<AppItem[]>(apps);
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState<string>(apps[0]?.id || '');

  if (!isOpen) return null;

  const currentApp = editingApps.find((a) => a.id === selectedAppId) || editingApps[0];

  const handleUpdateCurrentField = (field: keyof AppItem, val: any) => {
    if (!currentApp) return;
    const updated = editingApps.map((a) => {
      if (a.id === currentApp.id) {
        return { ...a, [field]: val };
      }
      return a;
    });
    setEditingApps(updated);
  };

  const handleAddNewApp = () => {
    const newId = `app-${Date.now().toString().slice(-4)}`;
    const newApp: AppItem = {
      id: newId,
      name: 'New Android App',
      tagline: 'Your custom app description',
      category: 'Utilities',
      version: 'v1.0.0',
      versionCode: 1,
      releaseDate: 'October 2026',
      size: '15.0 MB',
      minAndroid: 'Android 8.0+',
      packageName: 'com.example.myapp',
      githubOwner: 'ziadghost550',
      githubRepo: 'my-android-repo',
      githubTag: 'v1.0.0',
      apkFilename: 'app-release.apk',
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      shortDescription: 'Brief description of what your app does.',
      fullDescription: 'Full description of features and capabilities.',
      features: ['Core feature one', 'Core feature two'],
      changelog: ['Initial public release'],
      permissions: ['INTERNET (optional)'],
      tags: ['Open Source', 'Utility'],
      badge: 'New',
      iconBg: 'from-blue-600 to-indigo-800',
      iconSymbol: 'terminal',
      screenshots: [
        {
          id: `${newId}-1`,
          title: 'Main Dashboard',
          caption: 'Clean, intuitive user interface.',
          url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        },
      ],
    };

    const next = [...editingApps, newApp];
    setEditingApps(next);
    setSelectedAppId(newId);
  };

  const handleDeleteApp = (id: string) => {
    if (editingApps.length <= 1) return;
    const next = editingApps.filter((a) => a.id !== id);
    setEditingApps(next);
    setSelectedAppId(next[0]?.id || '');
  };

  const handleSaveAndApply = () => {
    onSaveApps(editingApps);
    onClose();
  };

  const generatedExportTs = `// In src/data/apps.ts
import { AppItem } from '../types/app';

export const INITIAL_APPS: AppItem[] = ${JSON.stringify(editingApps, null, 2)};
`;

  const copyExportCode = () => {
    navigator.clipboard.writeText(generatedExportTs);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const downloadJsonConfig = () => {
    const blob = new Blob([JSON.stringify(editingApps, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'apps.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="config-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-5 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Github size={18} />
            </div>
            <div>
              <h2 id="config-modal-title" className="text-base sm:text-lg font-bold text-white">
                App & GitHub Releases Configurator
              </h2>
              <p className="text-xs text-slate-400">
                Configure APK direct links for your GitHub Pages deployment
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close configuration modal"
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-800 px-6 gap-2 bg-slate-950/40">
          <button
            onClick={() => setActiveTab('edit')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'edit'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Edit Apps ({editingApps.length})
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'export'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Export Code (src/data/apps.ts)
          </button>
          <button
            onClick={() => setActiveTab('ghguide')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'ghguide'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            GitHub Pages Deploy Guide
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeTab === 'edit' && currentApp && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* App selector sidebar */}
              <div className="md:col-span-4 space-y-2 border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0 md:pr-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Your Apps
                  </span>
                  <button
                    onClick={handleAddNewApp}
                    className="px-2 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 text-xs font-semibold flex items-center gap-1 border border-emerald-500/30 cursor-pointer"
                  >
                    <Plus size={12} /> Add App
                  </button>
                </div>

                <div className="space-y-1.5">
                  {editingApps.map((a) => (
                    <div
                      key={a.id}
                      onClick={() => setSelectedAppId(a.id)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        a.id === currentApp.id
                          ? 'bg-slate-800 border-emerald-500/50 text-white font-medium'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="truncate mr-2">
                        <p className="font-semibold truncate">{a.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{a.version} • {a.apkFilename}</p>
                      </div>
                      {editingApps.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteApp(a.id);
                          }}
                          aria-label={`Remove ${a.name}`}
                          className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form details for currentApp */}
              <div className="md:col-span-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      App Name
                    </label>
                    <input
                      type="text"
                      value={currentApp.name}
                      onChange={(e) => handleUpdateCurrentField('name', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={currentApp.category}
                      onChange={(e) => handleUpdateCurrentField('category', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* GitHub Releases Coordinates */}
                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Github size={14} />
                    GitHub Release Coordinates
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        GitHub Username / Org
                      </label>
                      <input
                        type="text"
                        value={currentApp.githubOwner}
                        onChange={(e) => handleUpdateCurrentField('githubOwner', e.target.value)}
                        placeholder="e.g. ziadghost550"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Repository Name
                      </label>
                      <input
                        type="text"
                        value={currentApp.githubRepo}
                        onChange={(e) => handleUpdateCurrentField('githubRepo', e.target.value)}
                        placeholder="e.g. my-app-repo"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Release Tag
                      </label>
                      <input
                        type="text"
                        value={currentApp.githubTag}
                        onChange={(e) => handleUpdateCurrentField('githubTag', e.target.value)}
                        placeholder="e.g. v1.0.0"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        APK Asset Filename
                      </label>
                      <input
                        type="text"
                        value={currentApp.apkFilename}
                        onChange={(e) => handleUpdateCurrentField('apkFilename', e.target.value)}
                        placeholder="e.g. app-release.apk"
                        className={`w-full bg-slate-900 border rounded-lg px-2.5 py-1.5 text-xs text-white font-mono ${
                          isValidApkFilename(currentApp.apkFilename)
                            ? 'border-slate-700'
                            : 'border-amber-500'
                        }`}
                      />
                      {!isValidApkFilename(currentApp.apkFilename) && (
                        <p className="text-[10px] text-amber-400 mt-1">Must end in .apk</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Display Size (e.g. 18.2 MB)
                      </label>
                      <input
                        type="text"
                        value={currentApp.size}
                        onChange={(e) => handleUpdateCurrentField('size', e.target.value)}
                        placeholder="18.2 MB"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Calculated download URL */}
                  <div className="pt-2">
                    <span className="text-[11px] text-slate-400">Generated Direct Download URL:</span>
                    <p className="mt-1 font-mono text-[11px] text-emerald-300 bg-slate-900 p-2 rounded-lg border border-slate-800 break-all select-all">
                      {buildGitHubReleaseDownloadUrl(
                        currentApp.githubOwner,
                        currentApp.githubRepo,
                        currentApp.githubTag,
                        currentApp.apkFilename
                      )}
                    </p>
                  </div>
                </div>

                {/* Brief description & version */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Version Number (e.g. v2.4.1)
                    </label>
                    <input
                      type="text"
                      value={currentApp.version}
                      onChange={(e) => handleUpdateCurrentField('version', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Android Version Required
                    </label>
                    <input
                      type="text"
                      value={currentApp.minAndroid}
                      onChange={(e) => handleUpdateCurrentField('minAndroid', e.target.value)}
                      placeholder="Android 8.0+"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={currentApp.shortDescription}
                    onChange={(e) => handleUpdateCurrentField('shortDescription', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Export to src/data/apps.ts</h3>
                  <p className="text-xs text-slate-400">
                    Replace your local <code className="text-emerald-400">src/data/apps.ts</code> file with this content before committing to GitHub.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyExportCode}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                    {copiedCode ? 'Copied!' : 'Copy Code'}
                  </button>
                  <button
                    onClick={downloadJsonConfig}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download size={14} /> Download JSON
                  </button>
                </div>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto max-h-96 selection:bg-emerald-500/30">
                {generatedExportTs}
              </pre>
            </div>
          )}

          {activeTab === 'ghguide' && (
            <div className="space-y-5 text-left text-xs sm:text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Github size={18} className="text-emerald-400" />
                  Deploying on GitHub Pages (Step-by-Step)
                </h3>
                <p className="text-xs text-slate-400">
                  This static site is pre-configured with <code className="text-slate-200">base: './'</code> so it works cleanly on any GitHub Pages URL (<code className="text-slate-200">username.github.io/repo-name/</code>).
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="font-bold text-emerald-400">Step 1: Upload your APK to GitHub Releases</span>
                  <p className="text-xs text-slate-400 mt-1">
                    In your Android app repository, click <strong>Releases &gt; Draft a new release</strong>.
                    Tag it (e.g. <code>v1.0.0</code>) and drag-and-drop your <code>.apk</code> into the release assets.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="font-bold text-emerald-400">Step 2: Build & Push Website to GitHub Pages</span>
                  <p className="text-xs text-slate-400 mt-1">
                    Run <code>npm run build</code> to produce the <code>dist/</code> folder.
                    Push the build to your GitHub Pages branch (e.g. via GitHub Actions or the <code>gh-pages</code> package).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="font-bold text-emerald-400">Step 3: Enable Pages in GitHub Repo Settings</span>
                  <p className="text-xs text-slate-400 mt-1">
                    Go to <strong>Settings &gt; Pages &gt; Build and deployment</strong> and select <strong>Deploy from a branch</strong> (select <code>gh-pages</code> / <code>root</code> or GitHub Actions).
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900/90">
          <button
            onClick={onResetDefaults}
            className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw size={13} />
            Reset to Sample Apps
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAndApply}
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs shadow-md transition-colors cursor-pointer"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
