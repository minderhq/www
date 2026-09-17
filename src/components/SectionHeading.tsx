import type { ReactNode } from 'react'
import Reveal from './Reveal'
import Badge, { type Tone } from './Badge'

export default function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = 'accent',
  className = 'mb-2',
}: {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <div className={className}>
      <Reveal>
        <div>
          <Badge tone={tone}>{eyebrow}</Badge>
        </div>
        <h2 className="mb-[14px] font-display text-[30px] font-semibold leading-[1.1] tracking-tight text-ink md:text-[42px]">
          {title}
        </h2>
        {lede && (
          <p className="m-0 max-w-[640px] text-[16px] leading-[1.65] text-ink-dim">{lede}</p>
        )}
      </Reveal>
    </div>
  )
}
