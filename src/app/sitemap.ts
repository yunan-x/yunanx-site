import type { MetadataRoute } from 'next'
import { findAll } from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SERVER_URL ?? ''
  const [projects, works] = await Promise.all([findAll('projects', 0), findAll('works', 0)])
  return [
    { url: `${base}/` },
    { url: `${base}/work` },
    { url: `${base}/about` },
    { url: `${base}/contact` },
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}`, lastModified: p.updatedAt })),
    ...works.map((w) => ({ url: `${base}/work/${w.slug}`, lastModified: w.updatedAt })),
  ]
}
