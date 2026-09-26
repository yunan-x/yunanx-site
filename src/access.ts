import type { Access } from 'payload'

export const anyone: Access = () => true
export const isAuthenticated: Access = ({ req }) => Boolean(req.user)
