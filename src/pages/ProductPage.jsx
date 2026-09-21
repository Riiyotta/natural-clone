import { Navigate } from 'react-router-dom'
import FinalCta from '../components/FinalCta'
import productContent from './productContent'

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

// Shared "Product Feature Page" template, built from measurements taken off the live
// site (natural.com) at desktop 1280x900 and mobile 390x844. Reused across all
// 10 routes: /wallet /vault /pay /request /transfer /connect /identity
// /observability /disputes /compliance. Content is data-driven from productContent.js.
function ProductPage({ slug }) {
  const content = productContent[slug]

  if (!content) {
    return <Navigate to="/" replace />
  }

  const { h1, heroBody, heroImage, eyebrow, h2, cards } = content

  return (
    <>
      {/* Live geometry: h1 sits at a fixed offset (120px below section top) on every
          route, but everything below it (paragraph, button row, hero image) is normal
          document flow with fixed MARGINS (not fixed absolute y) — confirmed by
          comparing /wallet (3-line paragraph, buttons land at y=488) against /vault
          (2-line paragraph, buttons land at y=464): both are exactly 80px below the
          paragraph's actual bottom edge, not a shared fixed y. Build as flow + margins
          so it self-adjusts per route's paragraph length, matching live on every route. */}
      <section className="section section--hug flex flex-col items-center px-32 pb-120 md:px-40">
        <div className="flex w-full max-w-[1200px] flex-col items-start">
          <h1 className="product-hero-heading mt-120 max-w-[326px] text-[24px] font-[360] leading-32 tracking-[-0.8px] text-text-primary md:max-w-[1200px] md:text-[40px] md:leading-56">
            {h1}
          </h1>

          <p className="product-hero-body-text page-entrance entrance-delay-250 entrance-duration-500 entrance-distance-12 entrance-ease-out mt-80 max-w-[326px] text-[15px] leading-24 text-text-primary md:max-w-[480px]">
            {heroBody}
          </p>

          <div className="mt-80 flex items-center gap-12">
            <a
              href="/signup"
              className="flex items-center justify-center gap-12 rounded-pill bg-background-button px-16 py-6 text-[15px] leading-24 text-text-on-color transition-colors duration-100 ease-out hover:bg-background-button-hover"
            >
              <p>Sign up for free</p>
              <ArrowForwardIcon size={12} />
            </a>
            <a
              href="/contact"
              className="flex items-center justify-center gap-12 rounded-pill px-16 py-6 text-[15px] leading-24 text-text-primary hover:bg-background-hover"
            >
              Talk to the team
            </a>
          </div>

          <div className="product-hero-image mt-80 h-[174px] w-full overflow-hidden rounded-md md:h-[640px]">
            <img src={heroImage} alt={h1} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="section section--hug flex flex-col items-center px-32 py-120 md:px-40">
        <div className="w-full max-w-[1200px]">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section-h2 mt-12 max-w-[480px] text-text-primary">{h2}</h2>

          <div className="marketing-card-grid mt-40 grid grid-cols-1 gap-40 md:grid-cols-3">
            {cards.map((card) => (
              <article
                key={card.title}
                className="marketing-card flex flex-col gap-20 rounded-md border border-card-border bg-white p-20 md:h-[400px] md:justify-between"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-[204px] w-full rounded-sm object-cover md:h-[240px]"
                />
                <div className="flex flex-col gap-8">
                  <h3 className="text-[15px] leading-24 text-text-primary">{card.title}</h3>
                  <p className="line-clamp-2 text-[15px] leading-24 text-text-secondary">{card.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  )
}

export default ProductPage
