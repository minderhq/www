import { useState } from 'react'
import { FaGithub, FaXTwitter, FaLinkedin } from 'react-icons/fa6'
import { HiArrowRight, HiShieldCheck, HiCurrencyDollar, HiCog6Tooth, HiPuzzlePiece } from 'react-icons/hi2'
import Logomark from './Logomark'
import Reveal from './Reveal'

const LINKS = [
  { label: 'Product', href: '#product' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Docs', href: 'https://minderhq.github.io/docs/' },
  { label: 'About', href: '#about' },
]

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

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/minderhq', Icon: FaGithub },
  { label: 'X', href: '#', Icon: FaXTwitter },
  { label: 'LinkedIn', href: '#', Icon: FaLinkedin },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer id="about" className="relative overflow-hidden border-t border-border">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[760px] bg-cover bg-center opacity-90"
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

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_auto_280px_auto] md:gap-16">
     
            <div className="mb-3 flex items-center gap-2.5">
              <Logomark className="h-16 w-16 text-ink" />
              <div className="mb-3 items-center gap-2.5">
                <span className="font-display text-[24px] font-semibold text-ink">Minder</span>
                <p className="m-0 text-[12px] leading-[1.6] text-ink-dim">Your data. Your AI. Your control.</p>
              </div>

       

          </div>

          <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-[12px] text-ink no-underline transition-colors hover:text-accent">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div>
            <span className="mb-3 block font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-dim">
              Stay in the loop
            </span>
            <p className="m-0 mb-4 text-[13px] leading-[1.5] text-ink-dim">Get product updates and news.</p>
            {subscribed ? (
              <p className="m-0 text-[13px] text-primary">You&rsquo;re on the list.</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubscribed(true)
                }}
                className="flex items-center gap-2 rounded-full border border-border bg-surface/70 py-1.5 pl-4 pr-1.5 backdrop-blur-sm"
              >
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  aria-label="Email address"
                  className="w-full min-w-0 bg-transparent text-[13px] text-ink placeholder:text-ink-dim/60 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-bg transition-colors hover:bg-primary-hover"
                >
                  <HiArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>

          <div className="flex items-start gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={`Minder on ${s.label}`}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-ink-dim transition-colors hover:border-accent hover:text-ink"
              >
                <s.Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-dim">
          <span>© 2025 Minder. All rights reserved.</span>
          <div className="flex gap-6">
            {LEGAL.map((l) => (
              <a key={l.label} href={l.href} className="text-ink-dim no-underline transition-colors hover:text-ink">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
