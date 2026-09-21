import { useEffect, useRef } from 'react'

function ArrowForwardIcon({ size = 10 }) {
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

function Hero() {
  const wrapperRef = useRef(null)
  const heroInnerRef = useRef(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const heroInner = heroInnerRef.current
    if (!wrapper) return

    // Measured live on natural.com: progress = clamp(scrollY / (heroHeight - viewportHeight), 0, 1),
    // a plain linear ramp (no easing) driving the --progress custom property that
    // .hero-dashboard-shader-clip reads to grow from a 48x48 box to a full 1200x640 window.
    let ticking = false

    const update = () => {
      ticking = false
      // Measured on the live site: the hero wrapper sits at document offset 0 (its
      // -80px margin-top collapses with the page top), so progress is simply
      // scrollY / (heroHeight - viewportHeight), clamped to [0, 1] — a linear ramp,
      // no easing.
      const heroHeight = wrapper.offsetHeight
      const viewportHeight = window.innerHeight
      const scrollRange = heroHeight - viewportHeight
      const raw = scrollRange > 0 ? window.scrollY / scrollRange : 0
      const progress = Math.min(Math.max(raw, 0), 1)
      wrapper.style.setProperty('--progress', String(progress))
      if (heroInner) {
        heroInner.classList.toggle('hero-dashboard-hero--exiting', progress > 0)
      }
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section
      ref={wrapperRef}
      className="hero-dashboard relative"
      /* Measured live at 1280x800, 1440x700/900/1080 and 1920x1080: the wrapper's
         height is 2.2*vh + 80px, an exact fit with zero residual at every point,
         and independent of width. The previous hardcoded 2060 was correct only at
         viewport height 900 -- the one height this clone had ever been checked at
         -- and was inconsistent with the viewport-relative sticky height below it. */
      style={{ marginTop: '-80px', height: 'calc(220vh + 80px)' }}
    >
      <div
        ref={heroInnerRef}
        className="hero-dashboard-hero hero-dashboard-sticky sticky top-0 flex flex-col items-center overflow-hidden px-24 md:px-40"
      >
        {/* Measured live: .landing-hero is a 1200x660 flex column, align-items:flex-start,
            justify-content:space-between — news tag pinned top, heading+actions pinned bottom. */}
        <div className="landing-hero flex w-full max-w-[1200px] shrink-0 flex-col items-start justify-between">
          <div className="page-entrance entrance-delay-0 entrance-duration-500 entrance-distance-12 entrance-ease-out">
            <a
              href="/blog/natural-series-a"
              className="news-tag inline-flex items-center gap-12 rounded-md bg-[#f6f6f6] px-8 py-2 text-[15px] leading-24 text-text-primary"
            >
              <span>Our $30M Series A</span>
              <span className="news-tag-date text-text-secondary">July 20</span>
              <ArrowForwardIcon size={10} />
            </a>
          </div>

          <div className="landing-hero-content flex w-full flex-col items-start gap-40">
            <h1 style={{ color: 'rgb(17,20,0)' }}
              className="landing-hero-heading page-entrance entrance-delay-500 entrance-duration-500 entrance-distance-12 entrance-ease-out w-full max-w-[1200px] text-left text-[24px] leading-32 font-[360] tracking-[-0.8px] md:text-[40px] md:leading-56">
              <span style={{ color: 'rgb(17,20,0)' }}>Natural powers agentic payments. </span>
              <span className="landing-hero-heading-muted" style={{ color: 'rgb(215,214,212)' }}>
                Wallets. Payments. Cards. Processing. Billing. Voice. All of the primitives
                agents need*
              </span>
            </h1>

            <div className="landing-hero-actions page-entrance entrance-delay-750 entrance-duration-500 entrance-distance-12 entrance-ease-out flex items-center gap-12">
              <a
                href="/signup"
                className="flex items-center justify-center gap-12 rounded-pill bg-background-button px-16 py-6 text-[15px] leading-24 text-text-on-color transition-colors duration-100 ease-out hover:bg-background-button-hover"
              >
                Sign up for free
                <ArrowForwardIcon size={12} />
              </a>
              <a
                href="/contact"
                className="flex items-center justify-center gap-12 rounded-pill px-16 py-6 text-[15px] leading-24 text-text-primary hover:bg-background-hover"
              >
                Talk to the team
              </a>
            </div>
          </div>
        </div>

        {/* Measured live: the clip is NOT in the hero's flow — it sits in an absolutely
            positioned 1200x640 anchor (inset 410px -560px -230px 640px, i.e. centred on
            the 1280px viewport) whose center/center flex centring is what puts the
            collapsed 48x48 box at y=466 at scroll-0. */}
        <div className="hero-dashboard-shader-anchor absolute flex items-center justify-center">
          <div className="hero-dashboard-shader-clip page-entrance entrance-delay-1000 entrance-duration-500 entrance-distance-12 entrance-ease-out relative">
            <img
              src="/assets/images/products/hero-dashboard.jpg"
              alt="Natural dashboard"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
