import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const COMPARE = [
  { row: 'Where data lives', cloud: "On a vendor's servers", minder: 'On your own hardware' },
  { row: 'Inference cost', cloud: 'Metered per token', minder: 'No per-token metering — run models you host' },
  { row: 'Model choice', cloud: 'Whatever the vendor ships', minder: 'Any local or remote model you allow' },
  { row: 'Extending it', cloud: 'Closed, vendor-approved plugins', minder: 'Open, manifest-based plugins you can audit' },
]

const AUDIENCES = [
  { title: 'Individuals', desc: 'A private AI workspace around your own documents and notes.' },
  { title: 'Developers', desc: 'A foundation for AI apps, extended through an open plugin ecosystem.' },
  { title: 'Teams', desc: 'A shared AI environment over organizational knowledge, on infrastructure you control.' },
  { title: 'Privacy-conscious orgs', desc: 'Clear, auditable boundaries around data, models, and capabilities.' },
]

export default function WhyLocalFirst() {
  const tableRef = useRef<HTMLDivElement>(null)
  const tableInView = useInView(tableRef, { once: true, margin: '-60px 0px' })

  const audienceRef = useRef<HTMLDivElement>(null)
  const audienceInView = useInView(audienceRef, { once: true, margin: '-60px 0px' })

  return (
    <section id="solutions" className="border-t border-border">
      <div className="mx-auto max-w-container px-6 py-20 sm:px-8 md:py-28">
        <SectionHeading
          eyebrow="Why local-first"
          tone="secondary"
          title="Ownership isn&rsquo;t a feature. It&rsquo;s the architecture."
          lede="Every default in Minder favors the side of the line where you have control — where the data sits, what it costs to run, and which tools are allowed to touch it."
          className="mb-12"
        />

        {/* comparison table with staggered row reveal */}
        <motion.div
          ref={tableRef}
          initial="hidden"
          animate={tableInView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          className="overflow-hidden rounded-xl border border-border"
        >
          <div className="grid grid-cols-[1fr_1fr] bg-elevated text-[11px] uppercase tracking-[0.1em] text-ink-dim sm:grid-cols-[1.1fr_1fr_1fr]">
            <span className="hidden px-5 py-3 sm:block" />
            <span className="px-5 py-3">Cloud AI</span>
            <span
              className="px-5 py-3 font-medium text-primary"
              style={{ background: 'color-mix(in srgb, var(--primary) 8%, transparent)' }}
            >
              Minder
            </span>
          </div>
          {COMPARE.map((c) => (
            <motion.div
              key={c.row}
              variants={{
                hidden: { opacity: 0, x: -16 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="grid grid-cols-[1fr_1fr] border-t border-border sm:grid-cols-[1.1fr_1fr_1fr]"
            >
              <span className="col-span-2 px-5 py-4 text-[13px] font-medium text-ink sm:col-span-1 sm:text-[13.5px]">
                {c.row}
              </span>
              <span className="border-t border-border px-5 py-4 text-[13px] text-ink-dim sm:border-t-0 sm:text-[13.5px]">
                {c.cloud}
              </span>
              <span
                className="border-t border-border px-5 py-4 text-[13px] text-ink sm:border-t-0 sm:text-[13.5px]"
                style={{ background: 'color-mix(in srgb, var(--primary) 5%, transparent)' }}
              >
                {c.minder}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* audience grid */}
        <motion.div
          ref={audienceRef}
          className="mt-20"
          initial="hidden"
          animate={audienceInView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <Reveal>
            <div className="mb-6 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-dim">
              Built for
            </div>
          </Reveal>
          <div className="grid grid-cols-1 divide-y divide-border border-t border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:border-t-0">
            {AUDIENCES.map((p) => (
              <motion.div
                key={p.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="group py-6 sm:px-6 sm:py-0 sm:first:pl-0"
              >
                <h4 className="mb-1.5 font-display text-[17px] font-semibold text-ink transition-colors duration-200 group-hover:text-primary">
                  {p.title}
                </h4>
                <p className="m-0 text-[13px] leading-[1.6] text-ink-dim">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
