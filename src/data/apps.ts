import { AppItem } from '../types/app';
import { buildGitHubReleaseDownloadUrl } from '../utils/github';

export const INITIAL_APPS: AppItem[] = [];

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
