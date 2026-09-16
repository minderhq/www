import Badge from './Badge'
import Reveal from './Reveal'
import { CAPABILITIES } from '../data/capabilities'

export default function CoreCapabilities() {
  return (
    <section id="product" className="border-t border-border">
      <div className="mx-auto max-w-container px-6 py-20 sm:px-8 md:py-28">
        <Reveal className="mb-4">
          <Badge tone="accent">Core capabilities</Badge>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="max-w-[880px] font-display text-[28px] font-semibold leading-[1.3] tracking-tight text-ink sm:text-[36px] md:text-[44px]">
            Minder is{' '}
            {CAPABILITIES.map((c, i) => (
              <span key={c.title}>
                <span style={{ color: `var(--${c.tone})` }}>{c.title}</span>
                {i < CAPABILITIES.length - 2 ? ', ' : i === CAPABILITIES.length - 2 ? ' and ' : ''}
              </span>
            ))}
            . One platform, several independent capabilities — like an octopus that doesn&apos;t need permission to use its eight arms.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
