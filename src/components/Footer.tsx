import { useState } from 'react'
import Logomark from './Logomark'

const LINKS = [
  { label: 'Product', href: '#product' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Docs', href: 'https://minderhq.github.io/docs/' },
  { label: 'About', href: '#about' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer id="about" className="relative overflow-hidden border-t border-border">
      {/* the same current-wave artwork used above "why local-first" continues
          here, fading into --bg well before the text starts */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-cover bg-center opacity-[0.32]"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}footer.png)` }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{ background: 'linear-gradient(180deg, transparent 0%, var(--bg) 82%)' }}
      />

      <div className="relative mx-auto max-w-container px-6 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_auto_300px] md:gap-16">
          <div className="max-w-[280px]">
            <div className="mb-3 flex items-center gap-2.5">
              <Logomark className="h-6 w-6 text-ink" />
              <span className="font-display text-[17px] font-semibold text-ink">Minder</span>
            </div>
            <p className="m-0 text-[13.5px] leading-[1.6] text-ink-dim">Your data. Your AI. Your control.</p>
          </div>

          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-[13.5px] text-ink no-underline transition-colors hover:text-accent">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div>
            <div className="mb-3 flex items-center justify-between gap-4">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-dim">Stay in the loop</span>
              <a
                href="https://github.com/minderhq"
                aria-label="Minder on GitHub"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-ink-dim transition-colors hover:border-accent hover:text-ink"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
            </div>
            <p className="m-0 mb-3 text-[13px] leading-[1.5] text-ink-dim">Get product updates and news.</p>
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
                  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3 w-3">
                    <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-dim">
          <span>© 2026 Minder · Closed core, open ecosystem</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Local-first · self-host or hosted
          </span>
        </div>
      </div>
    </footer>
  )
}
