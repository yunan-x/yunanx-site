import type { Media } from '@/payload-types'

type MediaRef = Media | number | null | undefined

export const asMedia = (m: MediaRef): Media | null => (m && typeof m === 'object' ? m : null)
export const mediaUrl = (m: MediaRef): string | null => asMedia(m)?.url ?? null

const isRaster = (m: Media) => /^image\/(jpeg|png|webp|avif)$/.test(m.mimeType ?? '')

/** Responsive <img> for a Media doc. Uses the WebP sizes for raster images, the original for SVG/GIF. */
export function Img({ media, className, sizes, width, loading = 'lazy' }: { media: MediaRef; className?: string; sizes?: string; width?: number; loading?: 'lazy' | 'eager' }) {
  const m = asMedia(media)
  if (!m?.url) return null
  const variants = isRaster(m) && m.sizes ? Object.values(m.sizes).filter((s) => s?.url && s.width) : []
  const srcSet = variants.length ? [...variants.map((s) => `${s!.url} ${s!.width}w`), `${m.url} ${m.width}w`].join(', ') : undefined
  return (
    <img
      src={m.url}
      srcSet={srcSet}
      sizes={srcSet ? (sizes ?? '(max-width: 991px) 100vw, 1440px') : undefined}
      // Width only, like the Webflow markup: the stylesheet caps widths with max-width and heights must stay auto.
      width={width}
      alt={m.alt ?? ''}
      loading={loading}
      className={className}
    />
  )
}

export type VideoGroup = { mp4?: MediaRef; webm?: MediaRef; poster?: MediaRef } | null | undefined

/** Webflow-style muted background video. */
export function BgVideo({ video, className }: { video: VideoGroup; className: string }) {
  const mp4 = mediaUrl(video?.mp4)
  const webm = mediaUrl(video?.webm)
  if (!mp4 && !webm) return null
  const poster = mediaUrl(video?.poster) ?? undefined
  return (
    <div className={`${className} w-background-video w-background-video-atom`}>
      <video autoPlay loop muted playsInline poster={poster} style={poster ? { backgroundImage: `url("${poster}")` } : undefined}>
        {mp4 && <source src={mp4} type="video/mp4" />}
        {webm && <source src={webm} type="video/webm" />}
      </video>
    </div>
  )
}
