import type { CollectionConfig } from 'payload'
import { isAuthenticated, publishedOrAuthenticated } from '@/access'
import { Section } from '@/blocks'
import { imageField, slugField, videoGroup } from '@/fields'

// Case studies at /projects/<slug>. Each page is a free stack of Sections.
export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: { useAsTitle: 'title', group: 'Content', defaultColumns: ['title', 'subtitle', 'updatedAt'] },
  access: { read: publishedOrAuthenticated, create: isAuthenticated, update: isAuthenticated, delete: isAuthenticated },
  versions: { drafts: true },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar', description: 'Lower numbers come first on the Work page and in the "Case studies" footer.' } },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                {
                  name: 'kind',
                  type: 'select',
                  defaultValue: 'cover',
                  options: [
                    { label: 'Full-screen cover image', value: 'cover' },
                    { label: 'Image on white (75% wide)', value: 'image' },
                    { label: 'Full-screen video', value: 'video' },
                    { label: 'None', value: 'none' },
                  ],
                },
                imageField('image', { admin: { condition: (_, s) => s?.kind === 'cover' || s?.kind === 'image' } }),
                {
                  name: 'variant',
                  type: 'select',
                  defaultValue: 'default',
                  admin: { condition: (_, s) => s?.kind === 'cover' || s?.kind === 'image', description: 'Crop and sizing preset from the original design.' },
                  options: [
                    { label: 'Default', value: 'default' },
                    { label: 'TG0', value: 'tg0' },
                    { label: 'LoLo', value: 'lolo' },
                    { label: 'Privasea', value: 'privasea' },
                    { label: 'Sudio', value: 'sudio' },
                    { label: 'Freepower', value: 'freepower' },
                  ],
                },
                videoGroup('video', { admin: { condition: (_, s) => s?.kind === 'video' } }),
              ],
            },
            { name: 'layout', type: 'blocks', blocks: [Section] },
          ],
        },
        {
          label: 'Cards',
          description: 'How this project appears on the home page, the Work page and the "Case studies" footer.',
          fields: [
            { name: 'subtitle', type: 'text', admin: { description: 'Category line under the name on home-page cards, e.g. "Digital product design & Branding".' } },
            imageField('cardImage', { required: true, admin: { description: 'Home page and "Case studies" footer.' } }),
            imageField('listImage', { admin: { description: 'Work page. Falls back to the card image.' } }),
            { name: 'greyCard', type: 'checkbox', label: 'Grey card (art direction section)', admin: { description: 'Image is blended into the grey background until hovered.' } },
            { name: 'cardBottomAlign', type: 'checkbox', label: 'Align the card image to the bottom', admin: { description: 'For tall images such as phone screens.' } },
          ],
        },
      ],
    },
  ],
}
