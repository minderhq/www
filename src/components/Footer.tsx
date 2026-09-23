import Logomark from './Logomark'
import MagneticLink from './MagneticLink'
import Reveal from './Reveal'

const LEGAL = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Contact', href: '#' },
]

export default function Footer() {
  return (
    <footer id="about" className="relative overflow-hidden border-t border-border">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-cover bg-center opacity-90"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}footer-cta.png)` }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px]"
        style={{ background: 'linear-gradient(180deg, transparent 0%, transparent 45%, var(--bg) 92%)' }}
      />

      <div className="relative mx-auto max-w-container px-6 py-16 sm:px-8">
        <Reveal className="mb-10 ml-auto max-w-[420px] text-right">
          <div className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-secondary">
            Get started
          </div>
          <h2 className="mb-4 font-display text-[28px] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[34px]">
            Take control of your AI today.
          </h2>
          <p className="m-0 mb-6 text-[15px] leading-[1.65] text-ink-dim">
            Join a growing community of developers and teams building with Minder.
          </p>
          <MagneticLink
            href="https://minderhq.github.io/docs/"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-[13px] font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-bg transition-all duration-300 hover:bg-primary-hover hover:shadow-[0_0_24px_-4px_color-mix(in_srgb,var(--primary)_60%,transparent)]"
          >
            Get Started
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5">
              <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticLink>
        </Reveal>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <a
            href="#home"
            className="flex items-center gap-2 text-ink-dim no-underline transition-colors hover:text-ink"
          >
            <Logomark className="h-5 w-5" />
            <span className="font-display text-[13px] font-semibold">Minder</span>
          </a>

          <div className="flex gap-6 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-dim">
            {LEGAL.map((l) => (
              <a key={l.label} href={l.href} className="text-ink-dim no-underline transition-colors hover:text-ink">
                {l.label}
              </a>
            ))}
          </div>

          <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-dim">
            © 2025 Minder. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
