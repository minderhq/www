export default function HeroBackdrop() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-bg">
      {/* looping ambient video */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-[0.32] dark:opacity-[0.45]"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/looping_animation.mp4" type="video/mp4" />
      </video>

      {/* subtle top vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--bg) 20%, transparent) 0%, transparent 35%, transparent 65%, color-mix(in srgb, var(--bg) 30%, transparent) 100%)',
        }}
      />

      {/* left ambient bloom — offscreen, bleeds in softly */}
      <div
        className="absolute -left-24 top-[30%] h-[500px] w-[500px] animate-drift-slow rounded-[45%_55%_60%_40%/50%_45%_55%_50%] opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 60%, transparent), transparent 70%)' }}
      />

      {/* right bloom — sits behind the terminal card */}
      <div
        className="absolute right-[2%] top-[20%] h-[600px] w-[600px] animate-drift rounded-[55%_45%_35%_65%/45%_55%_45%_55%] opacity-[0.18] blur-3xl"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--secondary) 50%, transparent), transparent 70%)' }}
      />

      {/* highlight bloom — center-right, adds warmth behind the terminal */}
      <div
        className="absolute top-[15%] h-[320px] w-[320px] animate-drift-slow rounded-full opacity-[0.13] blur-3xl"
        style={{
          right: '18%',
          background: 'radial-gradient(circle, color-mix(in srgb, var(--highlight) 55%, transparent), transparent 70%)',
          animationDelay: '5s',
        }}
      />

      {/* vertical light shaft — leans over the terminal zone */}
      <div
        className="absolute top-0 h-[65%] w-[18%] animate-shimmer mix-blend-multiply dark:mix-blend-screen"
        style={{
          left: '55%',
          background: 'linear-gradient(to bottom, color-mix(in srgb, var(--primary) 18%, transparent), transparent 90%)',
          filter: 'blur(28px)',
          transform: 'skewX(-4deg)',
        }}
      />

      {/* SVG grain overlay */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04] dark:opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="hero-grain" x="0%" y="0%" width="100%" height="100%">
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
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>
    </div>
  )
}
