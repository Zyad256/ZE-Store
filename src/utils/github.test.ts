import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildGitHubReleaseDownloadUrl,
  buildGitHubReleaseWebUrl,
  parseGitHubReleaseUrl,
  isValidApkFilename,
  isValidSha256,
  generateCliDownloadCommand,
} from './github.ts';

test('buildGitHubReleaseDownloadUrl builds exact direct download link', () => {
  const url = buildGitHubReleaseDownloadUrl(
    'ziadghost550',
    'quick-notes-apk',
    'v1.2.0',
    'QuickNotes-v1.2.0.apk'
  );
  assert.equal(
    url,
    'https://github.com/ziadghost550/quick-notes-apk/releases/download/v1.2.0/QuickNotes-v1.2.0.apk'
  );
});

test('buildGitHubReleaseDownloadUrl handles empty or malformed inputs cleanly', () => {
  assert.equal(buildGitHubReleaseDownloadUrl('', 'repo', 'v1', 'app.apk'), '');
  assert.equal(buildGitHubReleaseDownloadUrl('user', '', 'v1', 'app.apk'), '');
  assert.equal(buildGitHubReleaseDownloadUrl('user', 'repo', '', 'app.apk'), '');
  assert.equal(buildGitHubReleaseDownloadUrl('user', 'repo', 'v1', ''), '');
});

test('buildGitHubReleaseWebUrl produces expected release page link', () => {
  const url = buildGitHubReleaseWebUrl('ziadghost550', 'quick-notes-apk', 'v1.2.0');
  assert.equal(url, 'https://github.com/ziadghost550/quick-notes-apk/releases/tag/v1.2.0');
});

test('parseGitHubReleaseUrl extracts owner, repo, tag, and filename accurately', () => {
  const parsed = parseGitHubReleaseUrl(
    'https://github.com/torvalds/my-app/releases/download/v3.0.1/MyApp-v3.0.1-arm64.apk'
  );
  assert.notEqual(parsed, null);
  assert.equal(parsed?.owner, 'torvalds');
  assert.equal(parsed?.repo, 'my-app');
  assert.equal(parsed?.tag, 'v3.0.1');
  assert.equal(parsed?.apkFilename, 'MyApp-v3.0.1-arm64.apk');
});

test('parseGitHubReleaseUrl returns null on invalid or non-APK URLs', () => {
  assert.equal(parseGitHubReleaseUrl('https://example.com/not-github.apk'), null);
  assert.equal(parseGitHubReleaseUrl('https://github.com/torvalds/my-app/releases/download/v1.0.0/file.zip'), null);
});

test('isValidApkFilename identifies valid APK extensions', () => {
  assert.equal(isValidApkFilename('MyApp.apk'), true);
  assert.equal(isValidApkFilename('app-release-unsigned.apk'), true);
  assert.equal(isValidApkFilename('app.APK'), true);
  assert.equal(isValidApkFilename('app.zip'), false);
  assert.equal(isValidApkFilename('app.apk.png'), false);
  assert.equal(isValidApkFilename(''), false);
});

test('isValidSha256 checks 64-character hex validity', () => {
  const valid = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
  assert.equal(isValidSha256(valid), true);
  assert.equal(isValidSha256('short-hash'), false);
  assert.equal(isValidSha256('z'.repeat(64)), false);
  assert.equal(isValidSha256(''), false);
});

test('generateCliDownloadCommand creates correct curl command', () => {
  const cmd = generateCliDownloadCommand('https://github.com/sample/test.apk', 'test.apk');
  assert.equal(cmd, 'curl -L -o "test.apk" "https://github.com/sample/test.apk"');
});
