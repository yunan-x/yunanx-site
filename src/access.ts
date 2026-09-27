import type { Access } from 'payload'

export const anyone: Access = () => true
export const isAuthenticated: Access = ({ req }) => Boolean(req.user)

/** Visitors see published documents only; editors also see drafts. */
export const publishedOrAuthenticated: Access = ({ req }) => (req.user ? true : { _status: { equals: 'published' } })
