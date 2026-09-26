# yunanx.com

Static mirror of the portfolio site, hosted on Vercel. `site/` is what gets deployed.

## Layout

- `site/` — deployable static tree. Pages live at `<path>/index.html`, assets under `site/assets/`.
- `scripts/scrape.mjs` — pulls every page and asset from the live Webflow site into `site/`.
- `scripts/postprocess.mjs` — detaches the tree from Webflow (drops SRI hashes and preconnect, points the contact form at Formspree, writes `404.html`, `sitemap.xml`, `robots.txt`).
- `vercel.json` — clean URLs, no trailing slash, long cache on `/assets`.

## Rebuild from the live Webflow site

Only needed while Webflow is still the source of truth. After the domain moves, edit `site/` directly.

```bash
FORMSPREE_ID=<your id> npm run scrape
```

## Preview

```bash
npm run dev
```

Serves `site/` on http://localhost:4173.

## Contact form

`site/contact/index.html` posts to `https://formspree.io/f/<FORMSPREE_ID>`. Replace the placeholder id there (or rerun the scrape with `FORMSPREE_ID` set).
