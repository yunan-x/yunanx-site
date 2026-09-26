'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type { SiteSetting } from '@/payload-types'
import { Img } from './Media'

export function Brand({ settings }: { settings: SiteSetting }) {
  const pathname = usePathname()
  return (
    <Link href="/" className={`brand w-nav-brand${pathname === '/' ? ' w--current' : ''}`} aria-label="Home">
      <Img media={settings.logo} className="logo_default" width={150.5} />
      <Img media={settings.logoHover} className="logo_hover" width={150.5} />
    </Link>
  )
}

export function Nav({ settings }: { settings: SiteSetting }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const links = (settings.nav ?? []).map((l) => (
    <Link key={l.href} href={l.href} className={`nav_link w-nav-link${pathname === l.href ? ' w--current' : ''}`} aria-current={pathname === l.href ? 'page' : undefined} onClick={() => setOpen(false)}>
      {l.label}
    </Link>
  ))
  return (
    <div data-collapse="tiny" role="banner" className="navbar w-nav">
      <div className="nav_contain w-container">
        <Brand settings={settings} />
        <nav role="navigation" className="nav_linkwrap w-nav-menu">
          {links}
        </nav>
        <button type="button" className={`menu-button w-nav-button${open ? ' w--open' : ''}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <div className="w-icon-nav-menu" />
        </button>
      </div>
      <div className="w-nav-overlay" data-open={open ? '' : undefined}>
        {open && (
          <nav role="navigation" className="nav_linkwrap w-nav-menu" data-nav-menu-open="">
            {links}
          </nav>
        )}
      </div>
    </div>
  )
}
