import type { Tone } from '../components/Badge'

export interface Capability {
  title: string
  desc: string
  tone: Tone
  icon: string
}

export const CAPABILITIES: Capability[] = [
  {
    title: 'local-first',
    desc: 'Keep your models and data on your own hardware — a laptop, a homelab, a rack in your office.',
    tone: 'primary',
    icon: 'M2.5 3.5h11a1 1 0 0 1 1 1V6a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Zm0 6h11a1 1 0 0 1 1 1V12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-1.5a1 1 0 0 1 1-1ZM4.5 5h.01M4.5 11h.01',
  },
  {
    title: 'private',
    desc: 'Your documents, prompts, and history stay under your control. Nothing ships to a third party by default.',
    tone: 'accent',
    icon: 'M8 1.5 13.5 3.5v4c0 3.5-2.5 6-5.5 7-3-1-5.5-3.5-5.5-7v-4L8 1.5Z',
  },
  {
    title: 'flexible',
    desc: 'Swap models, tools, and workflows as your needs change. Minder adapts to your stack, not the other way round.',
    tone: 'secondary',
    icon: 'M8 14V8m0 0c0-2.5-3-2.5-3-5m3 5c0-2.5 3-2.5 3-5',
  },
  {
    title: 'extensible',
    desc: 'Connect plugins, integrations, and custom tools through a manifest-based architecture you can audit.',
    tone: 'terracotta',
    icon: 'M5 2v4M11 2v4M4 6h8v2c0 2.2-1.8 4-4 4s-4-1.8-4-4V6Zm4 6v2.5',
  },
  {
    title: 'open',
    desc: 'Built on an ecosystem designed to be extended, forked, and self-hosted — no lock-in, ever.',
    tone: 'primary',
    icon: 'M3 7h10a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Zm2.5 0V5a2.5 2.5 0 0 1 4.8-.9',
  },
]
