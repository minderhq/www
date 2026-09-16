import { useEffect, useRef } from 'react'

export function useMagnetic<T extends HTMLElement>(strength = 0.24) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    el.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)'

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - (rect.left + rect.width / 2)) * strength
      const y = (e.clientY - (rect.top + rect.height / 2)) * (strength + 0.06)
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    const handleLeave = () => {
      el.style.transform = 'translate3d(0,0,0)'
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [strength])

  return ref
}
