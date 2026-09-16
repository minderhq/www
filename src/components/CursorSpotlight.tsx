import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

export default function CursorSpotlight({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    let raf = 0
    const handleMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
        el.style.setProperty('--my', `${e.clientY - rect.top}px`)
        el.style.setProperty('--glow', '1')
      })
    }
    const handleLeave = () => el.style.setProperty('--glow', '0')

    window.addEventListener('pointermove', handleMove)
    el.addEventListener('pointerleave', handleLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', handleMove)
      el.removeEventListener('pointerleave', handleLeave)
    }
  }, [])

  return (
    <div ref={ref} className="relative">
      <div
        className="spotlight-glow pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{ opacity: 'var(--glow, 0)' }}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  )
}
