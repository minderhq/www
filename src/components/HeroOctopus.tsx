import { useTheme } from '../hooks/useTheme'

// four unique arms, mirrored across the mantle for eight — fanned wide and
// flat to read as a full-bleed banner rather than the compact, circular
// silhouette a square illustration would want.
const ARMS = [
  { d: 'M690,195 C670,260 650,320 660,390 C665,420 685,440 675,470', delay: '0s', cls: 'animate-sway' },
  { d: 'M670,192 C600,260 540,320 520,400 C512,440 530,470 505,510', delay: '.6s', cls: 'animate-sway2' },
  { d: 'M645,185 C520,260 400,320 350,420 C330,460 355,500 320,545', delay: '.2s', cls: 'animate-sway' },
  { d: 'M615,175 C440,240 250,300 140,420 C100,470 130,520 90,560', delay: '.8s', cls: 'animate-sway2' },
]

const mirror = (d: string) =>
  d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g, (_m, x, y) => `${1400 - Number(x)},${y}`)

export default function HeroOctopus({ className = '' }: { className?: string }) {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const glowInner = isLight ? 0.14 : 0.35
  const glowOuter = isLight ? 0.05 : 0.12
  const highlightOpacity = isLight ? 0.16 : 0.08
  // --accent/--primary are tuned to sit dark-on-light as UI text in the light
  // theme, so filling the mantle with them reads as a heavy black ink-blot —
  // use the mid-toned secondary/highlight pair instead so the creature stays
  // the same "lit, mid-toned" character as it has on the dark bg.
  const bodyFrom = isLight ? 'var(--secondary)' : 'var(--accent)'
  const bodyTo = isLight ? 'var(--highlight)' : 'var(--primary)'

  return (
    <svg
      viewBox="0 0 1400 640"
      className={className}
      preserveAspectRatio="xMidYMax meet"
      role="img"
      aria-label="The Minder octopus, breaching the surface of a calm current"
    >
      <defs>
        <radialGradient id="octGlow" cx="50%" cy="18%" r="55%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity={glowInner} />
          <stop offset="55%" stopColor="var(--primary)" stopOpacity={glowOuter} />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mantleFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={bodyFrom} />
          <stop offset="100%" stopColor={bodyTo} />
        </linearGradient>
        <linearGradient id="armStroke" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={bodyTo} />
          <stop offset="100%" stopColor={bodyFrom} stopOpacity="0.6" />
        </linearGradient>
        <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      <ellipse cx="700" cy="140" rx="420" ry="260" fill="url(#octGlow)" />

      {/* arms, tapering from a broad base to a fine tip, swaying gently and asynchronously */}
      <g style={{ transformBox: 'view-box', transformOrigin: '700px 187px' }}>
        {ARMS.map((a, i) => (
          <g key={`l-${i}`} className={a.cls} style={{ transformBox: 'view-box', transformOrigin: '700px 187px', animationDelay: a.delay }} opacity={0.95 - i * 0.07}>
            <path d={a.d} fill="none" stroke="url(#armStroke)" strokeWidth="15" strokeLinecap="round" />
            <path d={a.d} fill="none" stroke="url(#armStroke)" strokeWidth="8" strokeLinecap="round" pathLength={100} strokeDasharray="58 100" strokeDashoffset={-42} />
            <path d={a.d} fill="none" stroke="url(#armStroke)" strokeWidth="4" strokeLinecap="round" pathLength={100} strokeDasharray="22 100" strokeDashoffset={-78} />
          </g>
        ))}
        {ARMS.map((a, i) => {
          const d = mirror(a.d)
          return (
            <g key={`r-${i}`} className={a.cls} style={{ transformBox: 'view-box', transformOrigin: '700px 187px', animationDelay: a.delay }} opacity={0.95 - i * 0.07}>
              <path d={d} fill="none" stroke="url(#armStroke)" strokeWidth="15" strokeLinecap="round" />
              <path d={d} fill="none" stroke="url(#armStroke)" strokeWidth="8" strokeLinecap="round" pathLength={100} strokeDasharray="58 100" strokeDashoffset={-42} />
              <path d={d} fill="none" stroke="url(#armStroke)" strokeWidth="4" strokeLinecap="round" pathLength={100} strokeDasharray="22 100" strokeDashoffset={-78} />
            </g>
          )
        })}
      </g>

      {/* mantle */}
      <path d="M630,102 C630,40 770,40 770,102 C776,154 738,196 700,201 C662,196 624,154 630,102 Z" fill="url(#mantleFill)" />
      <ellipse cx="700" cy="97" rx="46" ry="14" fill="var(--cream)" opacity={highlightOpacity} filter="url(#softBlur)" />

      {/* eyes */}
      <circle cx="672" cy="120" r="9" fill="var(--bg)" />
      <circle cx="728" cy="120" r="9" fill="var(--bg)" />
      <circle cx="674" cy="118" r="2.6" fill="var(--cream)" opacity="0.85" />
      <circle cx="730" cy="118" r="2.6" fill="var(--cream)" opacity="0.85" />

      {/* rising particles */}
      {[
        { cx: 500, cy: 470, r: 3, delay: '0s' },
        { cx: 940, cy: 500, r: 2.4, delay: '2.4s' },
        { cx: 800, cy: 440, r: 2, delay: '4.8s' },
        { cx: 600, cy: 410, r: 2.6, delay: '1.6s' },
        { cx: 300, cy: 480, r: 2.2, delay: '3.2s' },
        { cx: 1080, cy: 460, r: 2.4, delay: '0.8s' },
      ].map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="var(--highlight)" className="animate-rise" style={{ animationDelay: p.delay }} />
      ))}
    </svg>
  )
}
