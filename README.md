# yunanx.com

Portfolio site: Next.js + Payload CMS on Vercel, Neon Postgres, Vercel Blob for uploads.
The design is the original Webflow build; its CSS lives in `src/app/(frontend)/site.css`.

## Layout

- `src/payload.config.ts` — collections (Projects, Work archive, Media, Users), globals (Home, About, Contact, Site settings), SEO + redirects plugins.
- `src/blocks/` — the Section / content blocks that project pages are built from.
- `src/app/(frontend)/` — public routes. `src/app/(payload)/` is Payload's generated admin; don't hand-edit it.
- `src/migrations/` — database schema. `push` is off, so every schema change needs `npm run migrate:create`.
- `scripts/seed/` — one-off import of the Webflow mirror in `site/` (kept until the CMS content is signed off).
- `public/assets/` — fonts, CSS backgrounds and decorative icons referenced by the stylesheet.

## Local development

```bash
npx vercel env pull .env   # DATABASE_URL, DATABASE_URL_UNPOOLED, BLOB_READ_WRITE_TOKEN
npm install
npm run migrate
npm run dev                # http://localhost:3000, admin at /admin
```

Without `BLOB_READ_WRITE_TOKEN` uploads go to `./media` on disk.

## Deploy

Vercel builds with `npm run build`, which runs pending migrations first. Environment
variables come from the Neon and Blob stores connected to the project, plus
`PAYLOAD_SECRET` and `NEXT_PUBLIC_SERVER_URL`.
