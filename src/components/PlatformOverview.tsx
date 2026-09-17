import Badge from './Badge'
import Reveal from './Reveal'
import ProductPreview from './ProductPreview'

export default function PlatformOverview() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-container px-6 py-20 sm:px-8 md:py-28">
        <Reveal className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,460px)_1fr] lg:items-end">
          <div>
            <div>
              <Badge tone="primary">Platform overview</Badge>
            </div>
            <h2 className="mb-4 font-display text-[30px] font-semibold leading-[1.1] tracking-tight text-ink md:text-[42px]">
              Most AI sends your data somewhere else. Minder doesn&apos;t.
            </h2>
            <p className="m-0 max-w-[460px] text-[15px] leading-[1.65] text-ink-dim">
              Chat, knowledge, models, plugins, and settings — one calm interface, running on infrastructure
              you control. Local models by default, with no cloud API key required to get started; add a remote
              model only when you choose to.
            </p>
          </div>
          <span className="whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-dim lg:justify-self-end">
            The actual interface
          </span>
        </Reveal>

        <Reveal>
          <ProductPreview />
        </Reveal>
      </div>
    </section>
  )
}
