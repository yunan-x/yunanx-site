import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { findGlobal } from '@/lib/payload'
import { seoMetadata } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const contact = await findGlobal('contact')
  return seoMetadata(contact.meta, 'Contact', '/contact')
}

export default async function ContactPage() {
  const contact = await findGlobal('contact')
  return <ContactForm contact={contact} />
}
