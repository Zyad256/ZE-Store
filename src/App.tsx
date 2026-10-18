import React, { useState } from 'react';
import { INITIAL_APPS } from './data/apps';
import { AppItem } from './types/app';
import { Navbar } from './components/Navbar';
import { AppListItem } from './components/AppListItem';
import { AppDetailView } from './components/AppDetailView';
import { ScreenshotLightbox } from './components/ScreenshotLightbox';
import { DownloadStateModal } from './components/DownloadStateModal';

export default function App() {
  const [apps] = useState<AppItem[]>(INITIAL_APPS);
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);

  // Modals state
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    app: AppItem | null;
    index: number;
  }>({
    isOpen: false,
    app: null,
    index: 0,
  });

  const [downloadModalApp, setDownloadModalApp] = useState<AppItem | null>(null);

  const handleOpenLightbox = (app: AppItem, index: number) => {
    setLightboxState({
      isOpen: true,
      app,
      index,
    });
  };

  const handleTriggerDownload = (app: AppItem) => {
    setDownloadModalApp(app);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navbar: ONLY icon and website name ZE Store */}
      <Navbar onTitleClick={() => setSelectedApp(null)} />

      {/* Body: ONLY the apps (or app details when entered) */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {selectedApp ? (
          /* Play Store Style App Data & Images View */
          <AppDetailView
            app={selectedApp}
            onBack={() => setSelectedApp(null)}
            onOpenLightbox={handleOpenLightbox}
            onTriggerDownload={handleTriggerDownload}
          />
        ) : (
          /* Main Screen: Clean list of apps with direct download */
          <div className="space-y-3 sm:space-y-4 animate-fadeIn">
            {apps.map((app) => (
              <AppListItem
                key={app.id}
                app={app}
                onSelectApp={(selected) => {
                  setSelectedApp(selected);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onTriggerDownload={handleTriggerDownload}
              />
            ))}
          </div>
        )}
      </main>

      {/* Fullscreen Screenshot Lightbox */}
      {lightboxState.app && (
        <ScreenshotLightbox
          appName={lightboxState.app.name}
          screenshots={lightboxState.app.screenshots}
          currentIndex={lightboxState.index}
          isOpen={lightboxState.isOpen}
          onClose={() => setLightboxState((prev) => ({ ...prev, isOpen: false }))}
          onSelectIndex={(idx) => setLightboxState((prev) => ({ ...prev, index: idx }))}
        />
      )}

      {/* Direct Download Feedback Dialog */}
      <DownloadStateModal
        app={downloadModalApp}
        isOpen={!!downloadModalApp}
        onClose={() => setDownloadModalApp(null)}
      />
    </div>
  );
}
