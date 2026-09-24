import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Badge from './Badge'
import Reveal from './Reveal'
import { CAPABILITIES } from '../data/capabilities'

const LEAD_WORDS = ['Minder', 'is']
const TAIL_WORDS =
  "One platform, several independent capabilities — like an octopus that doesn't need permission to use its eight arms.".split(
    ' ',
  )

const wordVariants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function Word({ children }: { children: React.ReactNode }) {
  return (
    <motion.span className="inline-block" variants={wordVariants}>
      {children}
      {' '}
    </motion.span>
  )
}

export default function CoreCapabilities() {
  const textRef = useRef<HTMLParagraphElement>(null)
  const textInView = useInView(textRef, { once: true, margin: '-80px 0px' })

  return (
    <section id="product" className="border-t border-border">
      <div className="mx-auto max-w-container px-6 py-20 sm:px-8 md:py-28">
        <Reveal className="mb-4">
          <Badge tone="accent">Core capabilities</Badge>
        </Reveal>

        <motion.p
          ref={textRef}
          initial="hidden"
          animate={textInView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.035 } } }}
          className="max-w-[880px] font-display text-[28px] font-semibold leading-[1.3] tracking-tight text-ink sm:text-[36px] md:text-[44px]"
        >
          {LEAD_WORDS.map((w, i) => (
            <Word key={`lead-${i}`}>{w}</Word>
          ))}
          {CAPABILITIES.map((c, i) => (
            <Word key={c.title}>
              <span style={{ color: `var(--${c.tone})` }}>{c.title}</span>
              {i < CAPABILITIES.length - 2 ? ',' : i === CAPABILITIES.length - 2 ? ' and' : '.'}
            </Word>
          ))}
          {TAIL_WORDS.map((w, i) => (
            <Word key={`tail-${i}`}>{w}</Word>
          ))}
        </motion.p>
      </div>
    </section>
  )
}
