// Public, read-only availability and release-integrity checks. No app source or secrets.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { appendFileSync, existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const origin = 'https://ineedmycredits.com';
export const repository = 'srluismiguelj/i-need-my-credits';
const api = `https://api.github.com/repos/${repository}`;
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pause = ms => new Promise(done => setTimeout(done, ms));

export function validateManifest(value) {
  assert.match(value.version ?? '', /^\d+\.\d+\.\d+$/);
  assert.equal(value.distributionReady, true, 'Installer is not ready');
  const filename = `INeedMyCredits-${value.version}-universal.dmg`;
  assert.equal(value.downloadURL, `${origin}/downloads/${filename}`);
  assert.match(value.sha256 ?? '', /^[a-f0-9]{64}$/);
  assert.ok(Number.isSafeInteger(value.size) && value.size > 0 && value.size < 1024 ** 3, 'Invalid installer size');
  assert.ok(Array.isArray(value.parts) && value.parts.length > 0 && value.parts.length <= 64, 'Invalid parts');
  let size = 0;
  value.parts.forEach((part, index) => {
    assert.equal(part.path, `/release-parts/${filename}/${String(index).padStart(3, '0')}.bin`);
    assert.ok(Number.isSafeInteger(part.size) && part.size > 0 && part.size <= 16 * 1024 ** 2);
    assert.match(part.sha256 ?? '', /^[a-f0-9]{64}$/);
    size += part.size;
  });
  assert.equal(size, value.size, 'Part sizes do not match the installer');
  return value;
}

export function validateRelease(manifest, release) {
  assert.equal(release.tag_name, `v${manifest.version}`, 'Website and GitHub versions differ');
  assert.equal(release.draft, false);
  assert.equal(release.prerelease, false);
  assert.equal(release.html_url, `https://github.com/${repository}/releases/tag/v${manifest.version}`);
  const asset = release.assets.find(item => item.name === `INeedMyCredits-${manifest.version}-universal.dmg`);
  assert.ok(asset, 'GitHub installer missing');
  assert.equal(asset.size, manifest.size, 'GitHub installer size differs');
  assert.equal(asset.digest, `sha256:${manifest.sha256}`, 'GitHub installer checksum differs');
  assert.ok(release.assets.some(item => item.name === `SHA256SUMS-${manifest.version}.txt`), 'Checksum file missing');
}

export function validateHtml(html, path) {
  assert.equal((html.match(/<h1(?:\s|>)/gi) ?? []).length, 1, `${path}: expected one H1`);
  const canonical = (html.match(/<link\b[^>]*>/gi) ?? []).find(tag => /\brel=["']canonical["']/i.test(tag));
  const href = canonical?.match(/\bhref=["']([^"']+)["']/i)?.[1];
  assert.ok(href && new URL(href).href === new URL(origin + path).href, `${path}: canonical mismatch`);
  assert.ok(/<title>[^<]+<\/title>/i.test(html), `${path}: title missing`);
  assert.ok(!/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html), `${path}: unexpected noindex`);
}

export async function request(url, { fetchImpl = fetch, wait = pause, token = '', method = 'GET', attempts = 3, redirect = 'error' } = {}) {
  assert.ok(url.startsWith(`${origin}/`) || url.startsWith(`${api}/`), 'Unexpected destination');
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const headers = { 'User-Agent': 'INMC-Public-Health', Accept: 'application/json, text/html, text/plain, */*' };
      if (token && url.startsWith(`${api}/`)) headers.Authorization = `Bearer ${token}`;
      const response = await fetchImpl(url, { method, headers, redirect, signal: AbortSignal.timeout(60000) });
      if ([429, 500, 502, 503, 504].includes(response.status) && attempt + 1 < attempts) {
        await response.body?.cancel();
        await wait(1000 * (attempt + 1));
        continue;
      }
      return response;
    } catch (error) { lastError = error; }
    if (attempt + 1 < attempts) await wait(1000 * (attempt + 1));
  }
  throw lastError ?? Error('Request failed');
}

export async function verifyParts(manifest, get, deep) {
  const parts = deep ? manifest.parts : [manifest.parts[0], manifest.parts.at(-1)];
  const hash = createHash('sha256');
  let total = 0;
  for (const part of [...new Set(parts)]) {
    const response = await get(origin + part.path, { method: deep ? 'GET' : 'HEAD' });
    assert.equal(response.status, 200, 'Installer part unavailable');
    if (deep) {
      const bytes = Buffer.from(await response.arrayBuffer());
      assert.equal(bytes.length, part.size, 'Installer part truncated');
      assert.equal(createHash('sha256').update(bytes).digest('hex'), part.sha256, 'Installer part corrupted');
      hash.update(bytes); total += bytes.length;
    } else {
      // Some CDN HEAD responses omit length. Do not turn a missing header into zero bytes.
      const length = response.headers.get('content-length');
      if (length !== null) assert.equal(Number(length), part.size, 'Installer part length differs');
    }
  }
  if (deep) {
    assert.equal(total, manifest.size);
    assert.equal(hash.digest('hex'), manifest.sha256, 'Complete installer hash mismatch');
  }
}

export async function runHealth({ deep = false, fetchImpl = fetch, token = '' } = {}) {
  const checks = [];
  const check = async (name, work) => {
    try { await work(); checks.push({ name, ok: true }); }
    catch (error) { checks.push({ name, ok: false, error: error.message.slice(0, 350) }); }
  };
  const get = (url, options = {}) => request(url, { fetchImpl, token, ...options });
  const text = async path => {
    const response = await get(origin + path);
    assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
    return response.text();
  };
  let manifest, sitemap;
  await check('Published installer manifest', async () => { manifest = validateManifest(JSON.parse(await text('/releases/latest.json'))); });
  await check('GitHub latest release agrees with website', async () => {
    assert.ok(manifest, 'Manifest check failed');
    const response = await get(`${api}/releases/latest`);
    assert.equal(response.status, 200, 'GitHub release unavailable');
    validateRelease(manifest, await response.json());
  });
  const paths = ['/', '/descargar', '/novedades', '/providers/codex', '/providers/claude', '/shortcuts', '/smarter-usage', '/smarter-usage/alerts', '/es/smarter-usage/alerts', '/ideas', '/es/descargar'];
  for (const path of paths) await check(`Public page ${path}`, async () => {
    const html = await text(path); validateHtml(html, path);
    if (['/descargar', '/es/descargar'].includes(path)) assert.ok(html.includes(manifest?.version), 'Download page version differs');
  });
  await check('Robots and canonical sitemap', async () => {
    assert.ok((await text('/robots.txt')).includes(`Sitemap: ${origin}/sitemap.xml`));
    sitemap = await text('/sitemap.xml');
    const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
    assert.ok(urls.length >= paths.length && urls.length === new Set(urls).size, 'Empty or duplicated sitemap');
    for (const url of urls) {
      assert.equal(new URL(url).origin, origin);
      assert.ok(!/\.(md|json)$|\/(admin|api|checkout|release-parts|downloads)(\/|$)/.test(new URL(url).pathname), 'Technical URL in sitemap');
    }
    for (const path of paths) assert.ok(urls.includes(origin + path), `Missing ${path} in sitemap`);
    if (deep) for (const url of urls.filter(url => !paths.includes(new URL(url).pathname))) validateHtml(await text(new URL(url).pathname), new URL(url).pathname);
  });
  await check('AI-readable Markdown remains canonical and noindex', async () => {
    const llms = await text('/llms.txt');
    assert.ok(llms.includes(`https://github.com/${repository}`), 'Release hub missing from llms');
    const paths = deep ? [...new Set([...llms.matchAll(/https:\/\/ineedmycredits\.com\/[^\s)]+\.md/g)].map(match => new URL(match[0]).pathname))] : ['/index.md', '/descargar.md', '/shortcuts.md', '/smarter-usage/alerts/index.md'];
    assert.ok(paths.length >= 3, 'Markdown links missing');
    for (const path of paths) {
      const response = await get(origin + path);
      assert.equal(response.status, 200, `${path}: unavailable`);
      assert.match(response.headers.get('x-robots-tag') ?? '', /noindex/);
      assert.match(response.headers.get('link') ?? '', /rel="canonical"/);
      assert.ok((await response.text()).length > 200, `${path}: empty`);
    }
  });
  await check('Website installer route', async () => {
    assert.ok(manifest, 'Manifest check failed');
    const response = await get(manifest.downloadURL, { redirect: 'manual' });
    assert.equal(response.status, 302);
    assert.equal(response.headers.get('location'), `${origin}/descargar?download=${manifest.version}`);
    await response.body?.cancel();
  });
  await check(deep ? 'All installer parts and complete SHA-256' : 'First and last installer parts (availability only)', async () => {
    assert.ok(manifest, 'Manifest check failed'); await verifyParts(manifest, get, deep);
  });
  await check('README gallery and relative documentation links', async () => {
    const readme = readFileSync(resolve(root, 'README.md'), 'utf8');
    const links = [...readme.matchAll(/(?:href|src)="([^"#]+)"|\]\(([^)#]+)\)/g)].map(match => match[1] ?? match[2]);
    for (const link of links.filter(link => !/^(https?:|mailto:)/.test(link))) {
      const path = resolve(root, link); assert.ok(path.startsWith(root + '/') && existsSync(path), `Missing relative asset: ${link}`);
    }
    for (const image of ['monitor', 'activity', 'shortcuts']) assert.ok(readme.includes(`assets/screenshots/${image}.jpg`));
  });
  return { checkedAt: new Date().toISOString(), version: manifest?.version ?? null, deep, checks, ok: checks.every(check => check.ok) };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const deep = process.argv.includes('--deep') || process.env.DEEP_CHECK === 'true' || (process.env.GITHUB_EVENT_NAME === 'schedule' && new Date().getUTCDay() === 6);
  const report = await runHealth({ deep, token: process.env.GITHUB_TOKEN ?? '' });
  console.log(JSON.stringify(report, null, 2));
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `# INMC public health\n\nVersion: ${report.version}; ${deep ? 'full checksum' : 'availability'} check.\n\n` + report.checks.map(check => `- ${check.ok ? 'PASS' : 'FAIL'}: ${check.name}${check.error ? ` — ${check.error}` : ''}`).join('\n') + '\n');
  if (!report.ok) process.exitCode = 1;
}
