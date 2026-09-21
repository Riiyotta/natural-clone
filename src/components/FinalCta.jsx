// Re-measured live: every "Sign up for free" pill carries a 12px forward-arrow icon
// with a 12px gap — button is 163px wide, not 139px (text-only).
function ArrowForwardIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className="shrink-0">
      <path
        d="M2 7h10M7.5 2.5L12 7l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Texture layer stack re-measured live from ".texture-overlay" on natural.com: each
// layer is a full-bleed image at 10% opacity with its own blend mode, stacked over the
// splash photo (not a single "leaves" background placed before the CTA text).
const TEXTURE_LAYERS = [
  { src: '/assets/textures/splash/paper.jpg', blend: 'multiply' },
  { src: '/assets/textures/splash/print-medium.jpg', blend: 'overlay' },
  { src: '/assets/textures/splash/scan.jpg', blend: 'screen' },
  { src: '/assets/textures/splash/grain.jpg', blend: 'soft-light' },
]

function FinalCta() {
  return (
    <>
      {/* Live has no fixed min-height here — the section is content-driven (372px at
          390px wide, 532px at 1280). Keep the desktop floor, drop it on mobile.
          Vertical padding is 120px at mobile, not 80px: the inner content measures
          identically to live, so the whole 88px shortfall was this padding alone. */}
      <section className="final-cta-section relative flex flex-col items-center gap-40 px-32 py-120 md:px-40 md:py-80 text-center">
        <h2 className="section-h2--cta max-w-[600px] text-text-primary">
          Payments made Natural.
          <br />
          Start building on Natural today
        </h2>

        {/* Live spaces the heading and button row with the container's own
            `gap: 40px`, not a margin on the row. Using mt-32 here left the mobile
            section 8px short (364 vs 372) on the homepage and all 10 product pages. */}
        <div className="flex items-center gap-16">
          <a
            href="/signup"
            className="flex items-center justify-center gap-12 rounded-pill bg-background-button px-16 py-6 text-[15px] leading-24 text-text-on-color transition-colors duration-100 ease-out hover:bg-background-button-hover"
          >
            <p>Sign up for free</p>
            <ArrowForwardIcon size={12} />
          </a>
          <a href="/contact" className="rounded-pill px-16 py-6 text-[15px] leading-24 text-text-primary hover:bg-background-hover">
            Talk to the team
          </a>
        </div>
      </section>

      {/* Measured live: the splash is fluid, not a fixed 569px — height tracks
          44.4vw (569/1280) with a 400px floor, so it is 569px at 1280 and clamps
          to 400px at 390 instead of staying desktop-tall on mobile. */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: '44.4vw', minHeight: 400 }}
      >
        <img
          src="/assets/images/brand/nature-desk.jpg"
          alt="Natural"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" aria-hidden="true">
          {TEXTURE_LAYERS.map((layer) => (
            <img
              key={layer.src}
              src={layer.src}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              style={{ mixBlendMode: layer.blend, opacity: 0.1 }}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default FinalCta
