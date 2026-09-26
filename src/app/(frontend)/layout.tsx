import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Footer } from '@/components/Footer'
import { Nav } from '@/components/Nav'
import { mediaUrl } from '@/components/Media'
import { findGlobal } from '@/lib/payload'
import './site.css'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await findGlobal('site-settings')
  const favicon = mediaUrl(settings.favicon)
  const apple = mediaUrl(settings.appleTouchIcon)
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'),
    title: { default: `${settings.siteName ?? 'Yunan'} | Senior digital product designer and art director`, template: `%s | ${settings.siteName ?? 'Yunan'}` },
    description: settings.defaultDescription ?? undefined,
    openGraph: { siteName: settings.siteName ?? 'Yunan', type: 'website', images: mediaUrl(settings.defaultOgImage) ? [mediaUrl(settings.defaultOgImage)!] : undefined },
    icons: { icon: favicon ?? undefined, apple: apple ?? undefined },
  }
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const settings = await findGlobal('site-settings')
  return (
    <html lang="en">
      <body className="body">
        <Nav settings={settings} />
        {children}
        <Footer settings={settings} />
      </body>
    </html>
  )
}
