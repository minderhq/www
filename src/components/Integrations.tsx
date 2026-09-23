import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SiAnthropic, SiDocker, SiKubernetes, SiOllama, SiPostgresql } from 'react-icons/si'
import { Plus, ArrowRight, Sparkles } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const TOOLS: { name: string; Icon: typeof SiOllama }[] = [
  { name: 'Ollama', Icon: SiOllama },
  { name: 'OpenAI', Icon: Sparkles },
  { name: 'Anthropic', Icon: SiAnthropic },
  { name: 'PostgreSQL', Icon: SiPostgresql },
  { name: 'Docker', Icon: SiDocker },
  { name: 'Kubernetes', Icon: SiKubernetes },
]

export default function Integrations() {
  const rowRef = useRef<HTMLDivElement>(null)
  const rowInView = useInView(rowRef, { once: true, margin: '-60px 0px' })

  return (
    <section className="relative overflow-hidden border-t border-border">
      {/* ambient light blooms, echoing the hero backdrop's vocabulary */}
      <div className="pointer-events-none absolute inset-0 -z-0" aria-hidden="true">
        <div
          className="absolute right-[6%] top-1/2 h-[360px] w-[360px] -translate-y-1/2 animate-drift-slow rounded-full opacity-[0.16] blur-3xl"
          style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--primary) 55%, transparent), transparent 70%)' }}
        />
        <div
          className="absolute right-[22%] top-[20%] h-[220px] w-[220px] animate-drift rounded-full opacity-[0.12] blur-3xl"
          style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 55%, transparent), transparent 70%)', animationDelay: '3s' }}
        />
        <div
          className="absolute left-[6%] bottom-[-10%] h-[260px] w-[260px] animate-drift-slow rounded-full opacity-[0.1] blur-3xl"
          style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--highlight) 55%, transparent), transparent 70%)', animationDelay: '6s' }}
        />
      </div>

      <div className="relative z-[1] mx-auto max-w-container px-6 py-20 sm:px-8 md:py-28">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeading
            eyebrow="Integrations"
            tone="primary"
            title="Connect. Extend. Build."
            lede="Integrate with your favorite tools and extend Minder with plugins, APIs and custom workflows."
            className="max-w-[420px]"
          />

          <motion.div
            ref={rowRef}
            initial="hidden"
            animate={rowInView ? 'visible' : 'hidden'}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
            className="flex flex-wrap gap-5 sm:gap-6"
          >
            {TOOLS.map(({ name, Icon }) => (
              <motion.div
                key={name}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="group relative flex w-[64px] flex-col items-center gap-2 text-center"
              >
                {/* hover halo — blooms outward behind the tile */}
                <div
                  className="pointer-events-none absolute left-1/2 top-[26px] h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 sm:top-[26px]"
                  style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--primary) 45%, transparent), transparent 70%)' }}
                />
                <div className="relative flex size-12 items-center justify-center overflow-hidden rounded-[10px] border border-border bg-elevated text-ink-dim shadow-[0_0_0_0_transparent] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:text-primary group-hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--primary)_20%,transparent),0_10px_24px_-10px_color-mix(in_srgb,var(--primary)_55%,transparent)] sm:size-[52px]">
                  {/* diagonal light sweep on hover */}
                  <span
                    className="pointer-events-none absolute inset-y-0 left-[-60%] w-[40%] -skew-x-12 bg-white/25 opacity-0 transition-all duration-500 group-hover:left-[130%] group-hover:opacity-100 dark:bg-white/15"
                  />
                  <Icon className="relative size-5 sm:size-6" />
                </div>
                <span className="relative text-[11px] text-ink-dim transition-colors duration-200 group-hover:text-ink">{name}</span>
              </motion.div>
            ))}

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="group relative flex w-[64px] flex-col items-center gap-2 text-center"
            >
              <div
                className="pointer-events-none absolute left-1/2 top-[26px] h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--primary) 45%, transparent), transparent 70%)' }}
              />
              <a
                href="#docs"
                aria-label="Explore the ecosystem"
                className="relative flex size-12 items-center justify-center rounded-[10px] border border-border bg-elevated text-ink-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--primary)_20%,transparent),0_10px_24px_-10px_color-mix(in_srgb,var(--primary)_55%,transparent)] sm:size-[52px]"
              >
                <Plus className="size-5 sm:size-6" />
              </a>
              <span className="text-[11px] text-ink-dim transition-colors duration-200 group-hover:text-ink">More</span>
            </motion.div>
          </motion.div>
        </div>

        <Reveal className="mt-10">
          <a
            href="#docs"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-primary no-underline transition-opacity hover:opacity-80"
          >
            Explore the ecosystem
            <ArrowRight className="size-4" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
