export interface AppScreenshot {
  id: string;
  title: string;
  caption: string;
  url: string;
  previewGradient?: string;
  aspect?: 'portrait' | 'landscape';
}

export interface AppItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  version: string;
  versionCode: number;
  releaseDate: string;
  size: string;
  minAndroid: string;
  packageName: string;
  githubOwner: string;
  githubRepo: string;
  githubTag: string;
  apkFilename: string;
  customDownloadUrl?: string;
  sha256: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  changelog: string[];
  permissions: string[];
  tags: string[];
  badge?: string;
  iconBg: string;
  iconSymbol: 'timer' | 'compass' | 'camera' | 'music' | 'shield' | 'terminal';
  screenshots: AppScreenshot[];
}
