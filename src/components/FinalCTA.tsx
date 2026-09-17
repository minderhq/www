import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Badge from './Badge'
import MagneticLink from './MagneticLink'

function TerminalCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-80, 80], [5, -5]), { stiffness: 280, damping: 28 })
  const rotateY = useSpring(useTransform(x, [-80, 80], [-5, 5]), { stiffness: 280, damping: 28 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="rounded-xl border border-border bg-surface px-5 pb-5 pt-4 font-mono text-[12.5px] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] transition-[border-color,shadow] duration-300 hover:border-accent/40 hover:shadow-[0_24px_70px_-16px_rgba(0,0,0,0.55)]"
    >
      <div className="mb-3 flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-terracotta/70" />
        <span className="h-2 w-2 rounded-full bg-secondary/70" />
        <span className="h-2 w-2 rounded-full bg-primary/70" />
      </div>
      <div className="mb-2 text-ink-dim/70"># install — see the docs</div>
      <div className="mb-2 text-ink-dim">
        <span className="mr-2 text-accent">$</span>./setup.sh start
      </div>
      <hr className="my-3 border-t border-dashed border-border" />
      <div className="mb-1.5 text-ink-dim/70"># access points</div>
      <div className="mb-1 flex items-center gap-2 text-ink-dim">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        chat.minder.local — chat interface
      </div>
      <div className="flex items-center gap-2 text-ink-dim">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        client.minder.local — admin &amp; management
      </div>
    </motion.div>
  )
}

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-t border-border">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(700px 420px at 50% 0%, color-mix(in srgb, var(--terracotta) 11%, transparent), transparent 70%)',
        }}
      />
      <div className="relative mx-auto max-w-container px-6 py-20 sm:px-8 md:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_minmax(0,420px)]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <Badge tone="terracotta">Get started</Badge>
            </div>
            <h2 className="mb-4 font-display text-[32px] font-semibold leading-[1.1] tracking-tight text-ink md:text-[46px]">
              Your hardware. Your knowledge.
              <br />
              <span className="text-primary">Your AI.</span>
            </h2>
            <p className="mb-8 max-w-[420px] text-[15px] leading-[1.65] text-ink-dim">
              Run locally. Think privately. Build openly. Self-host Minder, or start on the
              hosted version — and extend it through an open plugin ecosystem.
            </p>
            <div className="flex flex-wrap gap-3">
              <MagneticLink
                href="#docs"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-[13px] font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-bg transition-all duration-300 hover:bg-primary-hover hover:shadow-[0_0_24px_-4px_color-mix(in_srgb,var(--primary)_60%,transparent)]"
              >
                Get Started
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5">
                  <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </MagneticLink>
              {/* TODO(www): point to the hosted signup/onboarding URL once the production domain is live (see README). */}
              <MagneticLink
                href="#hosted"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-[13px] font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition-all duration-300 hover:border-accent hover:text-accent"
              >
                Try the hosted version
              </MagneticLink>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <TerminalCard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
