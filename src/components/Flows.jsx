import { useState } from 'react'

// Re-measured live: every "Sign up for free" pill (nav, hero, this section, final CTA)
// carries a 12px forward-arrow icon with a 12px gap — button is 163px wide, not 139px.
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

// Re-measured live from natural.com's ".product-flows" markup:
// - The visual "stage" is a fixed 1200x560 background photo (flows-background.jpg)
//   with a small floating card image centered on top of it — the per-tab image is
//   just that small card (naturally sized ~340-420px wide), not a full dashboard
//   screenshot filling the frame.
// - Tabs are plain text labels in an equal-width row (not pill buttons): active tab
//   is dark text with its description directly beneath it; inactive tabs are a light
//   gray (tertiary) color with no description shown.
const TABS = [
  {
    id: 'hold',
    label: 'Hold accounts & funds',
    copy: 'Open FDIC-insured¹ accounts agents can hold, receive, & send funds from.',
    image: '/assets/images/products/flows-hold.jpg',
  },
  {
    id: 'move',
    label: 'Move money & transfers',
    copy: 'Power agentic transfers between agents, businesses, and consumers.',
    image: '/assets/images/products/flows-move.jpg',
  },
  {
    id: 'accept',
    label: 'Accept & make payments',
    copy: 'Have agents collect card or bank payments via voice or links.',
    image: '/assets/images/products/flows-accept.jpg',
  },
  {
    id: 'issue',
    label: 'Issue cards & credit',
    copy: 'Give agents access to cards & credit so they can spend autonomously.',
    image: '/assets/images/products/flows-issue.jpg',
  },
]

function Flows() {
  const [active, setActive] = useState(TABS[0].id)
  const activeTab = TABS.find((t) => t.id === active)

  return (
    <section className="relative mx-auto flex max-w-[1280px] flex-col px-32 py-120 md:px-40">

      <p className="eyebrow">Flows</p>
      {/* Live: the eyebrow+h2 wrapper (.section-header) is a 480px-max-width flex column,
          and the h2 also carries a manual <br> (hidden below md) forcing the two-line
          break — rendered h2 box is 424px wide at 1280 (narrower than the 480 cap). */}
      <h2 className="section-h2 mt-12 max-w-[480px] text-text-primary">
        Natural powers every type of<br className="hidden md:block" />agentic payments workflow
      </h2>

      {/* Re-measured live: the stage is 400px tall below the md breakpoint (768px) and
          560px at/above it — not a fixed 560px on mobile. */}
      <div className="relative mt-40 flex h-[400px] w-full items-center justify-center overflow-hidden md:h-[560px]">
        <img
          src="/assets/images/products/flows-background.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Re-measured live: all 4 tab images are always present in the DOM and
            crossfade via opacity rather than being swapped/unmounted per tab. */}
        {TABS.map((tab) => (
          <img
            key={tab.id}
            src={tab.image}
            alt={tab.label}
            className={`absolute inset-0 m-auto max-h-[calc(100%-80px)] max-w-[420px] rounded-lg object-contain transition-opacity duration-300 ease-out ${
              active === tab.id ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Re-measured live: tab row is a column stack (gap 24px) below md, and a row
          (gap 40px) at/above md — not a row at every width. */}
      <div className="mt-40 flex w-full flex-col items-start gap-24 md:flex-row md:gap-40" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
            className="flex w-full flex-col gap-12 text-left text-[15px] leading-24 transition-colors duration-100 ease-out md:flex-1"
          >
            <span className={active === tab.id ? 'text-text-primary' : 'text-text-tertiary'}>
              {tab.label}
            </span>
            {active === tab.id && (
              <span className="block text-[15px] leading-24 text-text-secondary">{tab.copy}</span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-32 flex items-center gap-16">
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
  )
}

export default Flows
