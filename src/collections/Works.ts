import type { CollectionConfig } from 'payload'
import { isAuthenticated, publishedOrAuthenticated } from '@/access'
import { imageField, slugField } from '@/fields'

// The "Old & New Archive" folders: /work/<slug>. One shared template.
export const Works: CollectionConfig = {
  slug: 'works',
  labels: { singular: 'Work', plural: 'Work archive' },
  admin: { useAsTitle: 'title', group: 'Content', defaultColumns: ['title', 'year', 'category', 'updatedAt'] },
  access: { read: publishedOrAuthenticated, create: isAuthenticated, update: isAuthenticated, delete: isAuthenticated },
  versions: { drafts: true },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar', description: 'Lower numbers come first in the archive list.' } },
    { name: 'year', type: 'text', required: true, admin: { description: 'Shown on the folder card, e.g. "2021" or "2024-2025".' } },
    { name: 'category', type: 'text', required: true, admin: { description: 'e.g. "Digital painting", "Webflow development".' } },
    imageField('heroImage', { required: true, admin: { description: 'Full-width image at the top of the page; also the folder card image.' } }),
    { name: 'body', type: 'richText', admin: { description: 'Scope and outcome paragraphs beside the gallery.' } },
    {
      name: 'gallery',
      type: 'array',
      fields: [imageField('image', { required: true })],
    },
  ],
}
