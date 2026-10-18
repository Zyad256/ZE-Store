/**
 * Pure utility functions for GitHub Releases APK hosting and verification.
 */

export interface GitHubReleaseInfo {
  owner: string;
  repo: string;
  tag: string;
  apkFilename: string;
}

/**
 * Generates the direct download link for an APK hosted on GitHub Releases.
 * Format: https://github.com/{owner}/{repo}/releases/download/{tag}/{apkFilename}
 */
export function buildGitHubReleaseDownloadUrl(
  owner: string,
  repo: string,
  tag: string,
  apkFilename: string
): string {
  const cleanOwner = owner.trim();
  const cleanRepo = repo.trim();
  const cleanTag = tag.trim().replace(/^releases\/tag\//, '');
  const cleanFile = apkFilename.trim();

  if (!cleanOwner || !cleanRepo || !cleanTag || !cleanFile) {
    return '';
  }

  return `https://github.com/${cleanOwner}/${cleanRepo}/releases/download/${cleanTag}/${cleanFile}`;
}

/**
 * Builds the web URL for viewing the release notes on GitHub.
 */
export function buildGitHubReleaseWebUrl(
  owner: string,
  repo: string,
  tag: string
): string {
  const cleanOwner = owner.trim();
  const cleanRepo = repo.trim();
  const cleanTag = tag.trim().replace(/^releases\/tag\//, '');

  if (!cleanOwner || !cleanRepo) {
    return '';
  }

  if (!cleanTag) {
    return `https://github.com/${cleanOwner}/${cleanRepo}/releases`;
  }

  return `https://github.com/${cleanOwner}/${cleanRepo}/releases/tag/${cleanTag}`;
}

/**
 * Parses a GitHub release download URL or repo URL back into its components.
 */
export function parseGitHubReleaseUrl(url: string): GitHubReleaseInfo | null {
  if (!url) return null;
  const trimmed = url.trim();

  // Pattern: https://github.com/owner/repo/releases/download/tag/filename.apk
  const downloadPattern = /^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/releases\/download\/([^/]+)\/(.+\.apk)$/i;
  const match = trimmed.match(downloadPattern);

  if (match) {
    return {
      owner: match[1],
      repo: match[2],
      tag: match[3],
      apkFilename: match[4],
    };
  }

  return null;
}

/**
 * Checks if a filename is a valid APK file.
 */
export function isValidApkFilename(filename: string): boolean {
  if (!filename) return false;
  return /\.apk$/i.test(filename.trim());
}

/**
 * Validates a SHA-256 checksum string.
 */
export function isValidSha256(hash: string): boolean {
  if (!hash) return false;
  return /^[a-fA-F0-9]{64}$/.test(hash.trim());
}

/**
 * Formats a file size or byte count into a readable string.
 */
export function formatSizeDisplay(size: string | number): string {
  if (typeof size === 'number') {
    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    }
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }
  return size.toString();
}

/**
 * Generates curl / wget command for power users wanting CLI download.
 */
export function generateCliDownloadCommand(url: string, filename: string): string {
  return `curl -L -o "${filename}" "${url}"`;
}
