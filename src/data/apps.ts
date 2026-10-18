import { AppItem } from '../types/app';
import { buildGitHubReleaseDownloadUrl } from '../utils/github';

export const INITIAL_APPS: AppItem[] = [
  {
    id: 'focus-matrix',
    name: 'FocusFlow Android',
    tagline: 'Minimalist Pomodoro & Distraction-Free Deep Work Habit Tracker',
    category: 'Productivity',
    version: 'v2.4.1',
    versionCode: 24,
    releaseDate: 'October 14, 2026',
    size: '18.2 MB',
    minAndroid: 'Android 8.0+ (API 26)',
    packageName: 'io.github.dev.focusflow',
    githubOwner: 'ziadghost550',
    githubRepo: 'focusflow-android',
    githubTag: 'v2.4.1',
    apkFilename: 'FocusFlow-v2.4.1-universal.apk',
    sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    shortDescription: 'Clean, open-source productivity timer with Material 3 dynamic color theming, ambient white noise generators, and zero analytics.',
    fullDescription: 'FocusFlow is built for thinkers, students, and software developers who want deep work sessions without telemetry, push spam, or monthly subscriptions. Supports background service timers, customized intervals, AMOLED pure-black mode, and homescreen quick widgets.',
    features: [
      'Custom interval Pomodoro, Short Break, and Long Break cycles',
      'Dynamic Material You theming that responds to your Android wallpaper',
      'Ambient binaural sound generator (Rain, Coffee Shop, White Noise, Ocean)',
      'Exportable daily streak statistics to CSV or JSON',
      '100% offline with zero network analytics or trackers'
    ],
    changelog: [
      'Added Android 15 edge-to-edge system navigation support',
      'Reduced memory footprint during background playback by 35%',
      'Fixed notification pause action stutter on Samsung One UI 7',
      'Added French, German, and Arabic localizations'
    ],
    permissions: [
      'POST_NOTIFICATIONS (Timer alerts)',
      'VIBRATE (Session end tactile feedback)',
      'FOREGROUND_SERVICE (Continuous timer while screen is off)'
    ],
    tags: ['Productivity', 'Open Source', 'Material You', 'No Ads'],
    badge: 'Latest Release',
    iconBg: 'from-emerald-500 to-teal-700',
    iconSymbol: 'timer',
    screenshots: [
      {
        id: 'ff-1',
        title: 'Active Focus Session',
        caption: 'Minimalist circular radial countdown with subtle breathing animations and one-tap controls.',
        url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
        previewGradient: 'from-emerald-950 via-slate-900 to-black'
      },
      {
        id: 'ff-2',
        title: 'Streak & Analytics',
        caption: 'Detailed weekly heatmap breakdown of your deep work hours and productive peaks.',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        previewGradient: 'from-teal-950 via-slate-900 to-black'
      },
      {
        id: 'ff-3',
        title: 'Material You Themes',
        caption: 'Pure OLED black mode, vibrant accents, and custom soundscape selector.',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        previewGradient: 'from-slate-950 via-cyan-950 to-black'
      },
      {
        id: 'ff-4',
        title: 'Quick Home Widgets',
        caption: 'Glanceable 2x1 and 4x2 widgets for starting sprints straight from your home screen.',
        url: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=800&q=80',
        previewGradient: 'from-emerald-950 via-slate-900 to-black'
      }
    ]
  },
  {
    id: 'lumen-player',
    name: 'Lumen Offline Music',
    tagline: 'High-Res FLAC & Local Audio Player with 10-Band Equalizer',
    category: 'Media & Audio',
    version: 'v3.1.0',
    versionCode: 31,
    releaseDate: 'September 28, 2026',
    size: '14.6 MB',
    minAndroid: 'Android 9.0+ (API 28)',
    packageName: 'io.github.dev.lumenmusic',
    githubOwner: 'ziadghost550',
    githubRepo: 'lumen-music-player',
    githubTag: 'v3.1.0',
    apkFilename: 'LumenMusic-v3.1.0.apk',
    sha256: '4c8e71b2d076d1e45e998a4e4d58852e6d97c3690d79b883015b63b925b3fa30',
    shortDescription: 'Modern, gesture-driven music player for your local library. Bit-perfect playback, gapless audio, synchronized LRC lyrics, and auto-tagging.',
    fullDescription: 'Lumen is designed for audiophiles who own their music library. No streaming subscriptions, no accounts, and no data tracking. Enjoy hardware-accelerated audio processing, automatic album art fetching from local folders, and custom reverb presets.',
    features: [
      'Bit-perfect bitstream playback for FLAC, ALAC, WAV, and MP3 up to 192kHz/24-bit',
      'Built-in 10-band parametric EQ with bass boost and virtualizer',
      'Synchronized LRC lyrics viewer with karaoke-style scroll',
      'Folder browser, playlist manager, and tag metadata editor',
      'Android Auto & Bluetooth media controls integration'
    ],
    changelog: [
      'New audio engine upgrade using latest Oboe low-latency C++ bindings',
      'Added ReplayGain 2.0 loudness normalization support',
      'Support for embedded synchronized syllable-timed lyrics',
      'Dark OLED theme contrast improvements'
    ],
    permissions: [
      'READ_MEDIA_AUDIO (Scan local audio tracks)',
      'POST_NOTIFICATIONS (Lockscreen playback controls)',
      'MODIFY_AUDIO_SETTINGS (Equalizer processing)'
    ],
    tags: ['Audio', 'Hi-Res', 'Equalizer', 'Open Source'],
    badge: 'Popular',
    iconBg: 'from-indigo-500 to-purple-700',
    iconSymbol: 'music',
    screenshots: [
      {
        id: 'lm-1',
        title: 'Now Playing Stage',
        caption: 'Full-bleed vinyl artwork with real-time waveform visualizer and gesture track scrubbing.',
        url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
        previewGradient: 'from-purple-950 via-slate-900 to-black'
      },
      {
        id: 'lm-2',
        title: '10-Band EQ & Presets',
        caption: 'Studio-grade acoustic response curves with custom headphone profiles.',
        url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
        previewGradient: 'from-indigo-950 via-slate-900 to-black'
      },
      {
        id: 'lm-3',
        title: 'Synchronized Lyrics',
        caption: 'Smooth auto-scrolling lyrics with tap-to-jump karaoke alignment.',
        url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
        previewGradient: 'from-violet-950 via-slate-900 to-black'
      }
    ]
  },
  {
    id: 'vault-notes',
    name: 'VaultNotes Secure Markdown',
    tagline: 'End-to-End Encrypted Offline Notes & Knowledge Base',
    category: 'Notes & Tools',
    version: 'v1.8.3',
    versionCode: 18,
    releaseDate: 'August 19, 2026',
    size: '12.8 MB',
    minAndroid: 'Android 8.1+ (API 27)',
    packageName: 'io.github.dev.vaultnotes',
    githubOwner: 'ziadghost550',
    githubRepo: 'vault-notes-android',
    githubTag: 'v1.8.3',
    apkFilename: 'VaultNotes-v1.8.3.apk',
    sha256: '8b91a7bc67f1396a6d63ef27c49339e801121d5c2e176b6efae27cbff5c138d6',
    shortDescription: 'Local-first note taking app with AES-256 GCM encryption, biometric biometric lock, KaTeX math formulas, and Obsidian-compatible markdown storage.',
    fullDescription: 'VaultNotes stores everything as plain markdown files inside your device private storage or an SD card folder you choose. Seamlessly encrypt individual secret vaults or whole notebooks with Android KeyStore backed biometric authentication.',
    features: [
      'Zero cloud requirement: your notes never touch a server unless you export them',
      'Hardware-backed AES-GCM 256-bit encryption with fingerprint or PIN unlock',
      'Live markdown rendering with tables, checklists, syntax highlighting, and LaTeX math',
      'Dual-pane view on tablets and foldable devices',
      'Automatic version backups with instant snapshot rollback'
    ],
    changelog: [
      'Added full support for Android Foldable and tablet split-screen writing',
      'Mermaid diagram rendering support added to markdown preview',
      'Speed boost when opening notebooks with over 2,000 notes',
      'Export directly to clean PDF with custom CSS styling'
    ],
    permissions: [
      'USE_BIOMETRIC (Fingerprint and Face Unlock for secret notes)',
      'MANAGE_EXTERNAL_STORAGE (Optional: user-selected Markdown folder sync)'
    ],
    tags: ['Security', 'Markdown', 'Encrypted', 'Local First'],
    badge: 'Updated',
    iconBg: 'from-amber-500 to-orange-700',
    iconSymbol: 'shield',
    screenshots: [
      {
        id: 'vn-1',
        title: 'Split Markdown Editor',
        caption: 'Instant live preview with syntax highlight for code blocks and LaTeX math.',
        url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80',
        previewGradient: 'from-amber-950 via-slate-900 to-black'
      },
      {
        id: 'vn-2',
        title: 'Encrypted Vaults',
        caption: 'Biometric biometric gatekeeping for personal journals and credential storage.',
        url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
        previewGradient: 'from-orange-950 via-slate-900 to-black'
      },
      {
        id: 'vn-3',
        title: 'Graph Knowledge View',
        caption: 'Interactive neural network view showing connections between your linked notes.',
        url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
        previewGradient: 'from-amber-950 via-slate-900 to-black'
      }
    ]
  }
];

export function getAppDownloadUrl(app: AppItem): string {
  if (app.customDownloadUrl && app.customDownloadUrl.trim() !== '') {
    return app.customDownloadUrl.trim();
  }
  return buildGitHubReleaseDownloadUrl(
    app.githubOwner,
    app.githubRepo,
    app.githubTag,
    app.apkFilename
  );
}
