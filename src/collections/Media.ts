import type { CollectionConfig } from 'payload'
import { anyone, isAuthenticated } from '@/access'

// Images, background videos (mp4 + webm pairs) and Lottie JSON all live here.
// Originals are kept as uploaded (the site ships AVIF, SVG and GIF that must not be
// re-encoded); the WebP sizes exist for responsive srcsets on raster images.
export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content' },
  access: { read: anyone, create: isAuthenticated, update: isAuthenticated, delete: isAuthenticated },
  upload: {
    focalPoint: true,
    mimeTypes: ['image/*', 'video/*', 'application/json'],
    imageSizes: [
      { name: 'sm', width: 480, formatOptions: { format: 'webp' } },
      { name: 'md', width: 960, formatOptions: { format: 'webp' } },
      { name: 'lg', width: 1440, formatOptions: { format: 'webp' } },
      { name: 'xl', width: 1920, formatOptions: { format: 'webp' } },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: { description: 'Describe the image for someone who cannot see it. Leave empty for purely decorative images.' },
    },
  ],
}
