import { motion } from 'framer-motion'
import HeroBackdrop from './HeroBackdrop'
import MagneticLink from './MagneticLink'

const ease = [0.22, 1, 0.36, 1] as const

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease } },
}

const STATS = [
  { label: '100%', sub: 'Local' },
  { label: 'MIT', sub: 'Licensed' },
  { label: '0', sub: 'API Calls' },
]

export default function Hero() {
  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden">
      <HeroBackdrop />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-container items-center px-6 pb-16 pt-28 sm:px-8 lg:py-0">

        {/* ── text content ───────────────────────────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex max-w-[640px] flex-col lg:py-36"
        >
          {/* eyebrow */}
          <motion.div
            variants={item}
            className="mb-7 flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-dim"
          >
            <span className="eyebrow-dot" />
            Self-hosted · Local-first · Open source
          </motion.div>

          {/* headline */}
          <motion.h1
            variants={item}
            className="mb-6 font-display font-semibold leading-[1.05] tracking-tight text-ink"
            style={{ fontSize: 'clamp(38px, 5.5vw, 70px)' }}
          >
            Your AI,
            <br />
            running{' '}
            <span className="relative inline-block whitespace-nowrap text-primary">
              here.
              <motion.span
                className="absolute -bottom-1 left-0 h-[2px] rounded-full bg-primary"
                style={{ originX: 0 }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.65, ease, delay: 0.9 }}
              />
            </span>
          </motion.h1>

          {/* lede */}
          <motion.p
            variants={item}
            className="mb-9 max-w-[430px] text-[16px] leading-[1.7] text-ink-dim"
          >
            No API key screens. No data leaving your server. No vendor lock-in.
            Clone the repo and you&rsquo;ll have a private AI stack running in about a minute.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mb-10 flex flex-wrap gap-3">
            <MagneticLink
              href="#docs"
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
          </motion.div>

          {/* stats row */}
          <motion.div
            variants={item}
            className="flex w-fit items-stretch divide-x divide-border rounded-xl border border-border/60 bg-surface/40 backdrop-blur-sm"
          >
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center px-5 py-3">
                <span className="font-display text-[19px] font-semibold leading-none text-ink">
                  {s.label}
                </span>
                <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-dim/65">
                  {s.sub}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* bottom fade into next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
      />
    </section>
  )
}
