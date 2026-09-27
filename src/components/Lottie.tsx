'use client'

import { useEffect, useRef } from 'react'

export function Lottie({ src, loop = false, className }: { src: string; loop?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let cancelled = false
    let anim: { destroy: () => void } | undefined
    import('lottie-web/build/player/lottie_light').then((mod) => {
      // The effect may already have been cleaned up while the player was loading.
      if (cancelled) return
      anim = mod.default.loadAnimation({ container: el, renderer: 'svg', loop, autoplay: true, path: src })
    })
    return () => {
      cancelled = true
      anim?.destroy()
    }
  }, [src, loop])
  return <div ref={ref} className={className} />
}
