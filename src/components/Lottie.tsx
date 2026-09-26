'use client'

import { useEffect, useRef } from 'react'

export function Lottie({ src, loop = false, className }: { src: string; loop?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let anim: { destroy: () => void } | undefined
    import('lottie-web/build/player/lottie_light').then((mod) => {
      anim = mod.default.loadAnimation({ container: el, renderer: 'svg', loop, autoplay: true, path: src })
    })
    return () => anim?.destroy()
  }, [src, loop])
  return <div ref={ref} className={className} />
}
