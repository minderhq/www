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
      <div className="mb-2 text-ink-dim">
        <span className="mr-2 text-accent">$</span>git clone git@github.com:wish-maker/minder.git
      </div>
      <div className="mb-2 text-ink-dim">
        <span className="mr-2 text-accent">$</span>cd minder &amp;&amp; bash setup.sh start
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
              Run locally. Think privately. Build openly. Clone the repo and you have a working
              stack in about a minute.
            </p>
            <div className="flex flex-wrap gap-3">
              <MagneticLink
                href="https://github.com/wish-maker/minder"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-[13px] font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-bg transition-all duration-300 hover:bg-primary-hover hover:shadow-[0_0_24px_-4px_color-mix(in_srgb,var(--primary)_60%,transparent)]"
              >
                Get Started
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5">
                  <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </MagneticLink>
              <MagneticLink
                href="https://github.com/wish-maker/minder"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-[13px] font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition-all duration-300 hover:border-accent hover:text-accent"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                View on GitHub
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
