// Runs after scrape.mjs: detaches the static tree from Webflow services.
import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const SITE = new URL('../site/', import.meta.url).pathname;
const DOMAIN = 'https://yunanx.com';
const FORMSPREE = process.env.FORMSPREE_ID || 'YOUR_FORMSPREE_ID';

async function* htmlFiles(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* htmlFiles(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}

// Formspree AJAX submit that reuses Webflow's own success/fail blocks.
const FORM_SCRIPT = `<script>
document.getElementById('email-form').addEventListener('submit',async function(e){
  e.preventDefault();var f=this,w=f.closest('.w-form'),btn=f.querySelector('[type=submit]');
  btn.value=btn.dataset.wait||btn.value;
  try{var r=await fetch(f.action,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}});
    if(!r.ok)throw 0;f.style.display='none';w.querySelector('.w-form-done').style.display='block';}
  catch(_){w.querySelector('.w-form-fail').style.display='block';btn.value='Submit';}
});
</script>`;

const pages = [];
for await (const file of htmlFiles(SITE)) {
  let html = await readFile(file, 'utf8');
  html = html
    .replace(/<link href="https:\/\/cdn\.prod\.website-files\.com" rel="preconnect"[^>]*>/, '')
    // The CSS was rewritten to local asset paths, so the original SRI hash no longer matches.
    .replace(/ integrity="[^"]*"/g, '')
    .replace(/ data-turnstile-sitekey="[^"]*"/g, '')
    // The Webflow footer has the mail link misspelled.
    .replace(/mailto:xingyunan\.irene@gmai\.com/g, 'mailto:xingyunan.irene@gmail.com');

  // Contact and About both carry the same Webflow form; point both at Formspree.
  if (/(contact|about)\/index\.html$/.test(file) && !html.includes('formspree.io')) {
    html = html
      .replace(/<form id="email-form"([^>]*) method="get"/, `<form id="email-form"$1 method="post" action="https://formspree.io/f/${FORMSPREE}"`)
      .replace('</body>', FORM_SCRIPT + '</body>');
  }
  await writeFile(file, html);
  const rel = file.slice(SITE.length).replace(/index\.html$/, '').replace(/\/$/, '');
  if (!rel.endsWith('404.html')) pages.push(DOMAIN + '/' + rel);
}

// Webflow only serves its generic 404 outside the Designer; ship a small one in the site's own styles.
{
  const about = await readFile(join(SITE, 'about/index.html'), 'utf8');
  const css = about.match(/<link href="[^"]*\.css"[^>]*>/)[0];
  const icon = about.match(/<link href="[^"]*" rel="shortcut icon"[^>]*>/)[0];
  const logo = about.match(/<img src="[^"]*logo1\.avif"[^>]*>/)[0];
  await writeFile(join(SITE, '404.html'), `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<title>Page not found | Yunan</title><meta name="viewport" content="width=device-width, initial-scale=1"/>
${css}${icon}
<style>body{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:32px;gap:24px}</style>
</head><body>
<a href="/" class="brand">${logo}</a>
<h1>Page not found</h1>
<p>The page you are looking for doesn't exist or has been moved. <a href="/">Back to the start page</a>.</p>
</body></html>
`);
}

// Webflow's empty-image placeholder is served from a plugin path that 403s outside Webflow.
await mkdir(join(SITE, 'assets/plugins/Basic/assets'), { recursive: true });
await writeFile(join(SITE, 'assets/plugins/Basic/assets/placeholder.60f9b1840c.svg'),
  '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>');

await writeFile(join(SITE, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages.sort().map((u) => `  <url><loc>${u.replace(/\/$/, '') || DOMAIN}</loc></url>`).join('\n') + '\n</urlset>\n');
await writeFile(join(SITE, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${DOMAIN}/sitemap.xml\n`);
console.log(`postprocessed ${pages.length} pages`);
