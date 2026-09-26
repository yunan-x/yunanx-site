// Mirrors the live Webflow site into ./site as a static tree with clean URLs.
// Pages land at <path>/index.html, CDN assets under /assets/<cdn path>.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const ORIGIN = 'https://yunanx.com';
const OUT = new URL('../site/', import.meta.url).pathname;
const ASSET_HOSTS = ['cdn.prod.website-files.com', 'd3e54v103j8qbb.cloudfront.net'];

const pages = new Map(); // path -> html
const assets = new Map(); // remote url -> local path
const queue = ['/'];

const assetLocal = (url) => {
  const u = new URL(url);
  // Webflow encodes video paths as "<site>%2F<file>"; decode so the local tree is real folders.
  const local = '/assets/' + decodeURIComponent(u.pathname).replace(/^\//, '').replace(/[^\w./-]/g, '_');
  assets.set(u.origin + u.pathname, local);
  return local;
};

const isAsset = (url) => ASSET_HOSTS.some((h) => url.includes('//' + h + '/'));

function rewrite(html) {
  // Absolute asset URLs in src/href/srcset/inline styles/data-video-urls (comma lists, &quot;-wrapped).
  return html.replace(/https?:\/\/[a-z0-9.-]+\/[^\s"'()<>,&]+/g, (m) =>
    isAsset(m) ? assetLocal(m) : m,
  );
}

function internalLinks(html) {
  const out = new Set();
  for (const m of html.matchAll(/href="([^"#?]+)[^"]*"/g)) {
    let h = m[1];
    if (h.startsWith(ORIGIN)) h = h.slice(ORIGIN.length);
    if (h.startsWith('https://www.yunanx.com')) h = h.slice('https://www.yunanx.com'.length);
    if (h.startsWith('/') && !h.startsWith('//') && !h.startsWith('/assets/')) out.add(h.replace(/\/$/, '') || '/');
  }
  return out;
}

while (queue.length) {
  const path = queue.shift();
  if (pages.has(path)) continue;
  const res = await fetch(ORIGIN + path);
  if (!res.ok) { console.warn('skip', path, res.status); pages.set(path, null); continue; }
  const html = await res.text();
  pages.set(path, rewrite(html));
  for (const l of internalLinks(html)) if (!pages.has(l)) queue.push(l);
  console.log('page', path);
}

for (const [path, html] of pages) {
  if (!html) continue;
  const file = path === '/' ? 'index.html' : join(path.slice(1), 'index.html');
  await mkdir(dirname(join(OUT, file)), { recursive: true });
  await writeFile(join(OUT, file), html);
}

// Download assets; CSS may reference more (fonts, images).
const seen = new Set();
while (true) {
  const pending = [...assets].filter(([u]) => !seen.has(u));
  if (!pending.length) break;
  await Promise.all(pending.map(async ([url, local]) => {
    seen.add(url);
    const res = await fetch(url);
    if (!res.ok) { console.warn('asset fail', url, res.status); return; }
    let body;
    if (local.endsWith('.css')) {
      body = rewrite(await res.text());
    } else {
      body = Buffer.from(await res.arrayBuffer());
    }
    await mkdir(dirname(join(OUT, local)), { recursive: true });
    await writeFile(join(OUT, local), body);
  }));
}
console.log(`done: ${[...pages.values()].filter(Boolean).length} pages, ${seen.size} assets`);
