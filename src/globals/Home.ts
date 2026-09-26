import type { GlobalConfig } from 'payload'
import { anyone, isAuthenticated } from '@/access'
import { imageField, videoGroup } from '@/fields'

const projectPick = (name: string, description: string) => ({
  name,
  type: 'relationship' as const,
  relationTo: 'projects' as const,
  hasMany: true,
  admin: { description },
})

export const Home: GlobalConfig = {
  slug: 'home',
  admin: { group: 'Pages' },
  access: { read: anyone, update: isAuthenticated },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'eyebrow', type: 'text', defaultValue: 'Hi, I am Yunan Xing' },
            { name: 'heading', type: 'text', required: true },
            { name: 'intro', type: 'textarea' },
            videoGroup('heroVideo'),
            imageField('photo'),
          ],
        },
        {
          label: 'Worked with & skills',
          fields: [
            { name: 'workedWith', type: 'array', fields: [{ name: 'label', type: 'text', required: true }] },
            {
              name: 'skills',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'text', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'Selected work',
          fields: [
            videoGroup('featuredVideo'),
            { name: 'featuredText', type: 'textarea', admin: { description: 'Paragraph under the video.' } },
            {
              name: 'selectedWork',
              type: 'array',
              fields: [
                { name: 'year', type: 'text', required: true },
                { name: 'client', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Case studies',
          fields: [
            { name: 'webHeading', type: 'text', defaultValue: 'Web & Products' },
            projectPick('webProjects', 'Four projects: shown as two rows of two cards.'),
            videoGroup('webVideoTop', { admin: { description: 'Small video beside the first row.' } }),
            videoGroup('webVideoBottom', { admin: { description: 'Small video beside the second row.' } }),
            { name: 'artHeading', type: 'text', defaultValue: 'Art direction & Graphics' },
            projectPick('artProjects', 'Four projects on the dark section.'),
          ],
        },
        {
          label: 'Archive & brands',
          fields: [
            { name: 'archiveHeading', type: 'text', defaultValue: 'Old & New Archive' },
            { name: 'brandsHeading', type: 'text', defaultValue: 'Brands I worked with' },
            { name: 'brands', type: 'array', fields: [imageField('logo', { required: true })] },
          ],
        },
      ],
    },
  ],
}
