import { HiShieldCheck, HiCurrencyDollar, HiCog6Tooth, HiPuzzlePiece } from 'react-icons/hi2'
import { motion, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal'
import Badge from './Badge'

const FEATURES = [
  { title: 'Total privacy', desc: 'Your data stays with you.', Icon: HiShieldCheck },
  { title: 'Lower costs', desc: 'No cloud lock-in.', Icon: HiCurrencyDollar },
  { title: 'Full control', desc: 'Your environment, your setup.', Icon: HiCog6Tooth },
  { title: 'Greater flexibility', desc: 'Choose what works for you.', Icon: HiPuzzlePiece },
]

export default function WhyLocalFirst() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="solutions" className="relative overflow-hidden border-t border-border">
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-cover bg-center opacity-90"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}why-local-first.png)` }}
        animate={reduceMotion ? undefined : { scale: [1, 1.07, 1], x: [0, -18, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* drifting ambient glows, echoing the sparks in the wave art */}
      <motion.div
        className="pointer-events-none absolute left-[30%] top-[10%] h-[220px] w-[220px] rounded-full opacity-[0.16] blur-3xl"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--highlight) 60%, transparent), transparent 70%)' }}
        animate={reduceMotion ? undefined : { x: [0, 60, 0], y: [0, 30, 0], opacity: [0.1, 0.22, 0.1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute left-[58%] top-[28%] h-[260px] w-[260px] rounded-full opacity-[0.14] blur-3xl"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 55%, transparent), transparent 70%)' }}
        animate={reduceMotion ? undefined : { x: [0, -50, 0], y: [0, -24, 0], opacity: [0.09, 0.2, 0.09] }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px]"
        style={{ background: 'linear-gradient(180deg, transparent 0%, transparent 45%, var(--bg) 92%)' }}
      />

      <div className="relative mx-auto max-w-container px-6 py-20 sm:px-8 md:py-28">
        <Reveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="max-w-[440px]">
            <Badge tone="secondary">Why local-first</Badge>
            <h2 className="mb-4 font-display text-[30px] font-semibold leading-[1.1] tracking-tight text-ink md:text-[42px]">
              Your infrastructure.
              <br />
              Your rules.
            </h2>
            <p className="m-0 text-[16px] leading-[1.65] text-ink-dim">
              Keep your data, models and tools on your own infrastructure. Stay in control, reduce costs and
              eliminate vendor lock-in.
            </p>
          </div>

          <ul className="m-0 flex list-none flex-col gap-5 p-0 lg:border-l lg:border-border lg:pl-8">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-secondary">
                  <f.Icon className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-display text-[15px] font-semibold text-ink">{f.title}</div>
                  <div className="text-[13px] text-ink-dim">{f.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
