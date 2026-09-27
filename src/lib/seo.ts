import type { Metadata } from 'next'
import { mediaUrl } from '@/components/Media'
import type { Media } from '@/payload-types'

type Meta = { title?: string | null; description?: string | null; image?: Media | number | null } | null | undefined

/**
 * Metadata from a document's SEO tab. Keys are only set when the document has a value,
 * so anything missing inherits the site-wide defaults from the layout.
 */
export function seoMetadata(meta: Meta, fallbackTitle: string, canonical: string): Metadata {
  const title = meta?.title || fallbackTitle
  const image = mediaUrl(meta?.image)
  const description = meta?.description || undefined
  return {
    title,
    ...(description && { description }),
    alternates: { canonical },
    openGraph: { title, url: canonical, ...(description && { description }), ...(image && { images: [image] }) },
  }
}
