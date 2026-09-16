import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import OctopusBackdrop from './OctopusBackdrop'
import { CAPABILITIES } from '../data/capabilities'

const FRAME_COUNT = 192
const FRAME_PATH = (i: number) => `/octopus-frames/frame_${String(i + 1).padStart(3, '0')}.webp`
// Native size of the extracted frames — used to letterbox ("contain") each
// frame inside the canvas without stretching the octopus.
const FRAME_W = 960
const FRAME_H = 540
// How much scroll distance drives the animation. 1 section-height is
// consumed by the sticky pin itself, the rest is the actual scrub range.
const TRACK_VH = 320

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

export default function OctopusScroll() {
  const trackRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null))
  const loadedRef = useRef<boolean[]>(new Array(FRAME_COUNT).fill(false))
  const currentFrameRef = useRef(0)
  const tickingRef = useRef(false)
  const inViewRef = useRef(false)

  const [firstFrameReady, setFirstFrameReady] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const [activeCapability, setActiveCapability] = useState(0)
  const activeCapabilityRef = useRef(0)

  // ── preload the frame sequence ─────────────────────────────────
  useEffect(() => {
    let cancelled = false
    let loadedCount = 0

    imagesRef.current.forEach((_, i) => {
      const img = new Image()
      img.decoding = 'async'
      img.src = FRAME_PATH(i)
      img.onload = () => {
        if (cancelled) return
        loadedRef.current[i] = true
        imagesRef.current[i] = img
        loadedCount += 1
        setLoadProgress(loadedCount / FRAME_COUNT)
        if (i === 0) setFirstFrameReady(true)
      }
      imagesRef.current[i] = img
    })

    return () => {
      cancelled = true
    }
  }, [])

  // ── draw a given frame index, falling back to the nearest loaded one ──
  const drawFrame = (index: number) => {
    const ctx = ctxRef.current
    const canvas = canvasRef.current
    if (!ctx || !canvas) return

    let target = index
    if (!loadedRef.current[target]) {
      let radius = 1
      let found = -1
      while (radius < FRAME_COUNT && found === -1) {
        if (loadedRef.current[target - radius]) found = target - radius
        else if (loadedRef.current[target + radius]) found = target + radius
        radius += 1
      }
      if (found === -1) return
      target = found
    }

    const img = imagesRef.current[target]
    if (!img) return

    const cssW = canvas.clientWidth
    const cssH = canvas.clientHeight
    if (cssW === 0 || cssH === 0) return

    const scale = Math.min(cssW / FRAME_W, cssH / FRAME_H)
    const drawW = FRAME_W * scale
    const drawH = FRAME_H * scale
    const dx = (cssW - drawW) / 2
    const dy = (cssH - drawH) / 2

    ctx.clearRect(0, 0, cssW, cssH)
    ctx.drawImage(img, dx, dy, drawW, drawH)
    currentFrameRef.current = target
  }

  // ── size the canvas backing store for the current viewport / DPR ──
  const resizeCanvas = () => {
    const canvas = canvasRef.current
    const sticky = stickyRef.current
    if (!canvas || !sticky) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = sticky.clientWidth
    const h = sticky.clientHeight

    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctxRef.current = ctx
    }

    drawFrame(currentFrameRef.current)
  }

  // ── scroll → progress → frame index, rAF-throttled ─────────────
  useEffect(() => {
    const update = () => {
      tickingRef.current = false
      const track = trackRef.current
      if (!track) return

      const rect = track.getBoundingClientRect()
      const scrollableDistance = rect.height - window.innerHeight
      if (scrollableDistance <= 0) return

      const progress = clamp(-rect.top / scrollableDistance, 0, 1)
      const frameIndex = Math.round(progress * (FRAME_COUNT - 1))

      if (frameIndex !== currentFrameRef.current) {
        drawFrame(frameIndex)
      }

      const capabilityIndex = Math.min(
        CAPABILITIES.length - 1,
        Math.floor(progress * CAPABILITIES.length),
      )
      if (capabilityIndex !== activeCapabilityRef.current) {
        activeCapabilityRef.current = capabilityIndex
        setActiveCapability(capabilityIndex)
      }

      if (progressLineRef.current) {
        progressLineRef.current.style.width = `${progress * 100}%`
      }
    }

    const requestTick = () => {
      if (!inViewRef.current) return
      if (!tickingRef.current) {
        tickingRef.current = true
        requestAnimationFrame(update)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting
        if (entry.isIntersecting) update()
      },
      { rootMargin: '200px 0px' },
    )
    if (trackRef.current) observer.observe(trackRef.current)

    window.addEventListener('scroll', requestTick, { passive: true })
    window.addEventListener('resize', resizeCanvas)

    resizeCanvas()
    update()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', requestTick)
      window.removeEventListener('resize', resizeCanvas)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // redraw once the first frame lands, so we're not sitting on a blank canvas
  useEffect(() => {
    if (firstFrameReady) {
      resizeCanvas()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstFrameReady])

  return (
    <section
      ref={trackRef}
      aria-label="Octopus swimming across the screen, animated by page scroll"
      className="relative"
      style={{ height: `${TRACK_VH}vh` }}
    >
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden">
        <OctopusBackdrop />

        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full transition-opacity duration-700 ease-out"
          style={{ opacity: firstFrameReady ? 1 : 0 }}
          aria-hidden="true"
        />

        {!firstFrameReady && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-dim">
              <span className="eyebrow-dot" />
              Loading{loadProgress > 0 ? ` · ${Math.round(loadProgress * 100)}%` : ''}
            </span>
          </div>
        )}

        {/* capability copy — set directly into the scene, no card chrome, scaled to match
            the size of the swimming octopus rather than floating as a small isolated widget.
            Legibility comes from a soft glow hugging each glyph (drop-shadow, alpha-aware)
            rather than a rectangular backdrop, so it never reads as a floating card. */}
        <div
          className="pointer-events-none absolute inset-x-6 bottom-10 z-10 transition-opacity duration-500 sm:inset-x-10 sm:bottom-auto sm:right-auto sm:top-1/2 sm:w-[min(92vw,440px)] sm:-translate-y-1/2 lg:left-[6%] lg:w-[460px]"
          style={{
            opacity: firstFrameReady ? 1 : 0,
            filter:
              'drop-shadow(0 0 3px var(--bg)) drop-shadow(0 0 10px var(--bg)) drop-shadow(0 0 22px var(--bg)) drop-shadow(0 0 22px var(--bg))',
          }}
        >
          <div className="mb-4 flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-dim">
            <span className="relative flex h-2 w-2 shrink-0">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ background: `var(--${CAPABILITIES[activeCapability].tone})` }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full transition-colors duration-300"
                style={{ background: `var(--${CAPABILITIES[activeCapability].tone})` }}
              />
            </span>
            Core capability
            <span className="ml-auto tabular-nums text-ink-dim/55">
              {String(activeCapability + 1).padStart(2, '0')} / {String(CAPABILITIES.length).padStart(2, '0')}
            </span>
          </div>

          <motion.h3
            key={activeCapability}
            initial={{ opacity: 0, y: 14, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="m-0 font-display font-semibold leading-[1.05] tracking-tight transition-colors duration-300"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: `var(--${CAPABILITIES[activeCapability].tone})` }}
          >
            {CAPABILITIES[activeCapability].title}
          </motion.h3>

          <div
            className="my-5 h-[3px] w-20 overflow-hidden rounded-full"
            style={{ background: 'color-mix(in srgb, var(--border) 70%, transparent)' }}
          >
            <div
              ref={progressLineRef}
              className="h-full transition-colors duration-300"
              style={{ width: '0%', background: `var(--${CAPABILITIES[activeCapability].tone})` }}
            />
          </div>

          <motion.p
            key={`desc-${activeCapability}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="m-0 max-w-[400px] text-[16px] leading-[1.75] text-ink-dim"
          >
            {CAPABILITIES[activeCapability].desc}
          </motion.p>
        </div>

        {/* fade into the next section */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
        />
      </div>
    </section>
  )
}
