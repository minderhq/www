import type { ReactNode } from 'react'

export type Tone = 'accent' | 'primary' | 'secondary' | 'terracotta'

const TONE_VAR: Record<Tone, string> = {
  accent: 'var(--accent)',
  primary: 'var(--primary)',
  secondary: 'var(--secondary)',
  terracotta: 'var(--terracotta)',
}

export default function Badge({ tone = 'accent', children }: { tone?: Tone; children: ReactNode }) {
  const color = TONE_VAR[tone]
  return (
    <span
      className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-[5px] font-mono text-[10.5px] font-medium uppercase tracking-[0.16em]"
      style={{
        borderColor: `color-mix(in srgb, ${color} 35%, transparent)`,
        background: `color-mix(in srgb, ${color} 11%, transparent)`,
        color,
      }}
    >
      <span className="h-[5px] w-[5px] rounded-full" style={{ background: color }} />
      {children}
    </span>
  )
}
