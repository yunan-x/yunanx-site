import type { CollectionConfig } from 'payload'
import { isAuthenticated } from '@/access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email', group: 'Settings' },
  auth: true,
  access: { create: isAuthenticated, read: isAuthenticated, update: isAuthenticated, delete: isAuthenticated },
  fields: [{ name: 'name', type: 'text', required: true }],
}
