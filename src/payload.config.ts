import { postgresAdapter } from '@payloadcms/db-postgres'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Users } from './collections/Users'
import { Works } from './collections/Works'
import { About } from './globals/About'
import { Contact } from './globals/Contact'
import { Home } from './globals/Home'
import { SiteSettings } from './globals/SiteSettings'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL ?? ''

// The Blob adapter throws at config load on a malformed token, which would take the
// whole site down. Only enable it for a well-formed token; otherwise uploads go to ./media.
const blobToken = process.env.BLOB_READ_WRITE_TOKEN ?? ''
const blobEnabled = /^vercel_blob_rw_[A-Za-z0-9]+_[A-Za-z0-9]+$/.test(blobToken)
if (blobToken && !blobEnabled) console.warn('BLOB_READ_WRITE_TOKEN is set but malformed — uploads fall back to local disk')

const routeBase = { works: '/work', projects: '/projects' } as const

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Users, Media, Projects, Works],
  globals: [Home, About, Contact, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    // Pooled URL at runtime; `npm run migrate` swaps in DATABASE_URL_UNPOOLED for DDL.
    pool: { connectionString: process.env.DATABASE_URL || '' },
    // Schema changes go through migrations everywhere, so local and production always match the repo.
    push: false,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: blobEnabled,
      // Public store: direct CDN URLs instead of proxying through /api/media.
      collections: { media: { disablePayloadAccessControl: true } },
      cacheControlMaxAge: 60 * 60 * 24 * 365,
      token: blobEnabled ? blobToken : '',
    }),
    seoPlugin({
      collections: ['projects', 'works'],
      globals: ['home', 'about', 'contact'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) => (doc?.title ? `${doc.title} | Yunan` : 'Yunan | Senior digital product designer and art director'),
      generateURL: ({ doc, collectionSlug }) =>
        `${serverURL}${routeBase[collectionSlug as keyof typeof routeBase] ?? ''}/${doc?.slug ?? ''}`,
    }),
    redirectsPlugin({ collections: ['projects', 'works'], overrides: { admin: { group: 'Settings' } } }),
  ],
})
