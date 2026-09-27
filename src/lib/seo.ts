import type { Metadata } from 'next'
import { mediaUrl } from '@/components/Media'
import type { Media } from '@/payload-types'

type Meta = { title?: string | null; description?: string | null; image?: Media | number | null } | null | undefined

/**
 * Metadata from a document's SEO tab. A title written in the CMS is used as-is (the SEO plugin
 * already adds the site suffix); the fallback gets the layout's "%s | Yunan" template. Keys are
 * only set when the document has a value, so anything missing inherits the site-wide defaults.
 */
export function seoMetadata(meta: Meta, fallbackTitle: string, canonical: string): Metadata {
  const image = mediaUrl(meta?.image)
  const description = meta?.description || undefined
  return {
    title: meta?.title ? { absolute: meta.title } : fallbackTitle,
    ...(description && { description }),
    alternates: { canonical },
    openGraph: { title: meta?.title || fallbackTitle, url: canonical, ...(description && { description }), ...(image && { images: [image] }) },
  }
}
