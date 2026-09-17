import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Tone } from './Badge'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const ECOSYSTEM: { slug: string; desc: string; tag: string; href: string; tone: Tone }[] = [
  { slug: 'plugin-sdk/', desc: 'Build new capabilities using the plugin architecture.', tag: 'minderhq/plugin-sdk', href: 'https://github.com/minderhq/plugin-sdk', tone: 'primary' },
  { slug: 'plugin-template/', desc: 'Scaffold a new plugin from a ready-made starting point.', tag: 'minderhq/plugin-template', href: 'https://github.com/minderhq/plugin-template', tone: 'secondary' },
  { slug: 'plugins/', desc: 'Discover and share plugins across the Minder ecosystem.', tag: 'minderhq/plugins', href: 'https://github.com/minderhq/plugins', tone: 'accent' },
  { slug: 'client/', desc: 'Manage the platform through a modern web interface.', tag: 'minderhq/client', href: 'https://github.com/minderhq/client', tone: 'terracotta' },
  { slug: 'docs', desc: 'Learn how to install, configure, and extend Minder.', tag: 'minderhq/docs', href: 'https://github.com/minderhq/docs', tone: 'primary' },
]

export default function Ecosystem() {
  const treeRef = useRef<HTMLDivElement>(null)
  const treeInView = useInView(treeRef, { once: true, margin: '-60px 0px' })

  return (
    <section id="docs" className="border-t border-border">
      <div className="mx-auto max-w-container px-6 py-20 sm:px-8 md:py-28">
        <SectionHeading
          eyebrow="Ecosystem"
          tone="accent"
          title="An open ecosystem around the platform"
          lede="A manifest-based plugin architecture with fixed, reviewed handlers — extensibility without arbitrary code execution."
          className="mb-12"
        />

        <Reveal>
          <motion.div
            ref={treeRef}
            className="overflow-x-auto rounded-xl border border-border bg-surface p-6 font-mono text-[13.5px] transition-colors duration-300 hover:border-accent/30 sm:p-8"
            initial={false}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={treeInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-2 text-ink-dim"
            >
              minder/
            </motion.div>
            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              initial="hidden"
              animate={treeInView ? 'visible' : 'hidden'}
            >
              {ECOSYSTEM.map((e, i) => {
                const isLast = i === ECOSYSTEM.length - 1
                return (
                  <motion.div
                    key={e.slug}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                    className="group flex flex-col gap-x-3 gap-y-1 py-2 sm:flex-row sm:items-baseline"
                  >
                    <span className="whitespace-pre text-ink-dim">
                      {isLast ? ' └── ' : ' ├── '}
                      <span
                        className="font-medium transition-colors duration-200 group-hover:opacity-80"
                        style={{ color: `var(--${e.tone})` }}
                      >
                        {e.slug}
                      </span>
                    </span>
                    <span className="text-ink-dim sm:flex-1">{e.desc}</span>
                    <a
                      href={e.href}
                      target="_blank"
                      rel="noreferrer"
                      className="whitespace-nowrap text-[11px] uppercase tracking-[0.06em] text-accent no-underline transition-all duration-200 hover:underline hover:opacity-80"
                    >
                      {e.tag} ↗
                    </a>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
