import type { Field, GroupField } from 'payload'

export const slugField = (): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: { position: 'sidebar', description: 'URL segment, lowercase with hyphens.' },
})

export const imageField = (name: string, overrides: Partial<Field> = {}): Field =>
  ({ name, type: 'upload', relationTo: 'media', filterOptions: { mimeType: { contains: 'image' } }, ...overrides }) as Field

/** A Webflow-style background video: mp4 + webm sources and a poster frame. */
export const videoGroup = (name: string, overrides: Partial<GroupField> = {}): GroupField => ({
  name,
  type: 'group',
  fields: [
    { name: 'mp4', type: 'upload', relationTo: 'media', filterOptions: { mimeType: { equals: 'video/mp4' } } },
    { name: 'webm', type: 'upload', relationTo: 'media', filterOptions: { mimeType: { equals: 'video/webm' } } },
    imageField('poster'),
  ],
  ...overrides,
})

export const lottieField = (name = 'lottie'): Field => ({
  name,
  type: 'upload',
  relationTo: 'media',
  filterOptions: { mimeType: { equals: 'application/json' } },
  admin: { description: 'Lottie animation exported as JSON.' },
})
