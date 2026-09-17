import Logomark from './Logomark'

const COLUMNS = [
  {
    title: 'Platform',
    links: [
      { label: 'Product', href: '#product' },
      { label: 'Solutions', href: '#solutions' },
      { label: 'Ecosystem', href: '#docs' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'GitHub', href: 'https://github.com/minderhq' },
      { label: 'Documentation', href: 'https://github.com/minderhq/docs' },
      { label: 'Plugin SDK', href: 'https://github.com/minderhq/plugin-sdk' },
    ],
  },
]

export default function Footer() {
  return (
    <footer id="about" className="border-t border-border">
      <div className="mx-auto max-w-container px-6 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_auto_auto] md:gap-16">
          <div className="max-w-[300px]">
            <div className="mb-3 flex items-center gap-2.5">
              <Logomark className="h-6 w-6 text-accent" />
              <span className="font-display text-[17px] font-semibold text-accent">Minder</span>
            </div>
            <p className="m-0 text-[13.5px] leading-[1.6] text-ink-dim">
              A self-hostable, local-first AI platform. Your data, your models, your control.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-dim">{col.title}</div>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[13.5px] text-ink no-underline transition-colors hover:text-accent">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
