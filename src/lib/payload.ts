import { cache } from 'react'
import { getPayload, type CollectionSlug, type GlobalSlug } from 'payload'
import config from '@/payload.config'

export const getPayloadClient = () => getPayload({ config })

// Only published documents reach the public site; drafts stay in the admin.
const published = { _status: { equals: 'published' } } as const

export const findBySlug = cache(async <T extends CollectionSlug>(collection: T, slug: string, depth = 2) => {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection, where: { and: [{ slug: { equals: slug } }, published] }, limit: 1, depth })
  return res.docs[0] ?? null
})

export const findAll = cache(async <T extends CollectionSlug>(collection: T, depth = 1) => {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection, where: published, limit: 100, depth, sort: 'order' })
  return res.docs
})

// Cached per request: the layout and the page both read the same globals.
export const findGlobal = cache(async <T extends GlobalSlug>(slug: T, depth = 2) => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug, depth })
})
