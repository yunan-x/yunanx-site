import { getPayload, type CollectionSlug, type GlobalSlug } from 'payload'
import config from '@/payload.config'

export const getPayloadClient = () => getPayload({ config })

export async function findBySlug<T extends CollectionSlug>(collection: T, slug: string, depth = 2) {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1, depth })
  return res.docs[0] ?? null
}

export async function findAll<T extends CollectionSlug>(collection: T, depth = 1) {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection, limit: 100, depth, sort: 'order' })
  return res.docs
}

export async function findGlobal<T extends GlobalSlug>(slug: T, depth = 2) {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug, depth })
}
