import { HiShieldCheck, HiCurrencyDollar, HiCog6Tooth, HiPuzzlePiece } from 'react-icons/hi2'
import Logomark from './Logomark'
import Reveal from './Reveal'

const FEATURES = [
  { title: 'Total privacy', desc: 'Your data, your rules.', Icon: HiShieldCheck },
  { title: 'Lower costs', desc: 'No cloud lock-in.', Icon: HiCurrencyDollar },
  { title: 'Full control', desc: 'Your environment, your setup.', Icon: HiCog6Tooth },
  { title: 'Greater flexibility', desc: 'Choose what works for you.', Icon: HiPuzzlePiece },
]

const LEGAL = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Contact', href: '#' },
]

export default function Footer() {
  return (
    <footer id="about" className="relative overflow-hidden border-t border-border">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[450px] bg-cover bg-center opacity-90"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}footer.png)` }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[760px]"
        style={{ background: 'linear-gradient(180deg, transparent 0%, transparent 60%, var(--bg) 95%)' }}
      />

      <div className="relative mx-auto max-w-container px-6 py-16 sm:px-8">
        <Reveal className="mb-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_280px] lg:gap-8">
          <div className="text-right">
            <div className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-secondary">
              Why local-first
            </div>
            <h2 className="mb-4 font-display text-[28px] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[34px]">
              More privacy.
              <br />
              More possibilities.
            </h2>
            <p className="m-0 mb-4 ml-auto max-w-[440px] text-[15px] leading-[1.65] text-ink-dim">
              Run your AI stack on your own infrastructure. <br /> Keep data private, cut costs, and stay in control.
            </p>
            <a
              href="#solutions"
              className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink no-underline transition-colors hover:text-accent"
            >
              Learn more about local-first
              <span aria-hidden="true">→</span>
            </a>
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
