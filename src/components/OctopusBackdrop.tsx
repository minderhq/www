export default function OctopusBackdrop() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-bg">
      {/* depth vignette — a touch lighter mid-frame, easing the flat bg into view */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 70% at 50% 48%, color-mix(in srgb, var(--accent) 13%, transparent) 0%, transparent 62%)',
        }}
      />

      {/* top fade — settles in from the hero rather than cutting hard */}
      <div
        className="absolute inset-x-0 top-0 h-40"
        style={{ background: 'linear-gradient(to bottom, var(--bg), transparent)' }}
      />

      {/* teal bloom, upper-left — where the swim path begins */}
      <div
        className="absolute -left-20 top-[8%] h-[560px] w-[560px] animate-drift-slow rounded-[50%_50%_45%_55%/55%_45%_55%_45%] opacity-[0.16] blur-3xl"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 55%, transparent), transparent 70%)' }}
      />

      {/* sea-green bloom, lower-right — trails where the octopus swims off */}
      <div
        className="absolute -right-16 bottom-[6%] h-[620px] w-[620px] animate-drift rounded-[55%_45%_60%_40%/45%_55%_40%_60%] opacity-[0.15] blur-3xl"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--primary) 55%, transparent), transparent 70%)' }}
      />

      {/* soft highlight glow drifting behind the swim path */}
      <div
        className="absolute top-[36%] h-[340px] w-[340px] animate-shimmer rounded-full opacity-[0.12] blur-3xl"
        style={{
          left: '40%',
          background: 'radial-gradient(circle, color-mix(in srgb, var(--highlight) 55%, transparent), transparent 70%)',
        }}
      />

      {/* SVG grain overlay, matching the hero's texture */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04] dark:opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="octopus-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72 0.72"
            numOctaves="4"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" result="mono" />
          <feBlend in="SourceGraphic" in2="mono" mode="overlay" />
        </filter>
        <rect width="100%" height="100%" filter="url(#octopus-grain)" />
      </svg>
    </div>
  )
}
