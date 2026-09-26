import type { GlobalConfig } from 'payload'
import { anyone, isAuthenticated } from '@/access'
import { imageField } from '@/fields'

export const About: GlobalConfig = {
  slug: 'about',
  admin: { group: 'Pages' },
  access: { read: anyone, update: isAuthenticated },
  fields: [
    { name: 'heading', type: 'text', required: true, defaultValue: 'About Yunan' },
    { name: 'bio', type: 'richText' },
    { name: 'buttonLabel', type: 'text', defaultValue: 'Contact' },
    imageField('photo'),
    { name: 'timelineHeading', type: 'text', defaultValue: 'Life never moves in a straight line.' },
    imageField('timelineDesktop'),
    imageField('timelineMobile'),
    { name: 'showContactForm', type: 'checkbox', defaultValue: true, admin: { description: 'Repeat the contact form at the bottom of the page.' } },
  ],
}
