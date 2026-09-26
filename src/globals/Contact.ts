import type { GlobalConfig } from 'payload'
import { anyone, isAuthenticated } from '@/access'

export const Contact: GlobalConfig = {
  slug: 'contact',
  admin: { group: 'Pages' },
  access: { read: anyone, update: isAuthenticated },
  fields: [
    { name: 'heading', type: 'text', required: true, defaultValue: 'Drop me a message' },
    { name: 'subheading', type: 'text', defaultValue: "Let's build and create fun things together!" },
    { name: 'formspreeId', type: 'text', required: true, admin: { description: 'The id in your Formspree form URL: https://formspree.io/f/<id>' } },
    { name: 'successMessage', type: 'text', defaultValue: 'Thank you! I will get back to you as soon as possible!' },
    { name: 'errorMessage', type: 'text', defaultValue: 'Oops! Something went wrong while submitting the form.' },
  ],
}
