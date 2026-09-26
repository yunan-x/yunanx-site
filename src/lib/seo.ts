import type { Metadata } from 'next'
import { mediaUrl } from '@/components/Media'
import type { Media } from '@/payload-types'

type Meta = { title?: string | null; description?: string | null; image?: Media | number | null } | null | undefined

/** Metadata from a document's SEO tab; anything missing falls back to the layout defaults. */
export function seoMetadata(meta: Meta, fallbackTitle: string, canonical: string): Metadata {
  const image = mediaUrl(meta?.image)
  return {
    title: meta?.title || fallbackTitle,
    description: meta?.description || undefined,
    alternates: { canonical },
    openGraph: { title: meta?.title || fallbackTitle, description: meta?.description || undefined, url: canonical, images: image ? [image] : undefined },
  }
}
