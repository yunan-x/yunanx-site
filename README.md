# yunanx.com

Portfolio site: Next.js + Payload CMS on Vercel, Neon Postgres, Vercel Blob for uploads,
Resend for password-reset mail. The design is the original Webflow build; its CSS lives in
`src/app/(frontend)/site.css`.

## Layout

- `src/payload.config.ts` — collections (Projects, Work archive, Media, Users), globals (Home, About, Contact, Site settings), SEO plugin.
- `src/blocks/` — the Section → row → content blocks that project pages are built from.
- `src/app/(frontend)/` — public routes. `src/app/(payload)/` is Payload's generated admin; don't hand-edit it.
- `src/migrations/` — database schema. `push` is off, so every schema change needs `npm run migrate:create`.
- `scripts/seed/` — one-off import of the Webflow mirror in `site/` (`npm run seed`, rerunnable). Both go once the CMS content is signed off.
- `public/assets/` — fonts, CSS backgrounds and decorative icons referenced by the stylesheet.

## Local development

```bash
npx vercel env pull .env   # Neon + Resend variables; paste BLOB_READ_WRITE_TOKEN in by hand (Vercel marks it sensitive)
npm install
npm run migrate
npm run dev                # http://localhost:3000, admin at /admin
```

Without `BLOB_READ_WRITE_TOKEN` uploads go to `./media` on disk; without `RESEND_API_KEY` mail is logged to the console.

## Deploy

Vercel builds with `npm run build`, which runs pending migrations first. Environment
variables: the Neon and Blob stores connected to the project, plus `PAYLOAD_SECRET`,
`NEXT_PUBLIC_SERVER_URL`, `RESEND_API_KEY` and optionally `EMAIL_FROM` (see `.env.example`).
