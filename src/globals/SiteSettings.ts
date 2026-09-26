import type { GlobalConfig } from 'payload'
import { anyone, isAuthenticated } from '@/access'
import { imageField } from '@/fields'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: { group: 'Settings' },
  access: { read: anyone, update: isAuthenticated },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Navigation',
          fields: [
            imageField('logo', { admin: { description: 'Header and footer logo.' } }),
            imageField('logoHover', { admin: { description: 'Shown while the logo is hovered.' } }),
            {
              name: 'nav',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'social',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', required: true, admin: { description: 'Accessible name, e.g. "Instagram".' } },
                { name: 'href', type: 'text', required: true, admin: { description: 'URL or mailto: address.' } },
                imageField('icon', { required: true }),
              ],
            },
          ],
        },
        {
          label: 'SEO defaults',
          fields: [
            { name: 'siteName', type: 'text', defaultValue: 'Yunan' },
            { name: 'defaultDescription', type: 'textarea', admin: { description: 'Used on pages without their own description.' } },
            imageField('defaultOgImage', { admin: { description: 'Preview image when the site is shared, 1200×630.' } }),
            imageField('favicon'),
            imageField('appleTouchIcon'),
          ],
        },
      ],
    },
  ],
}
