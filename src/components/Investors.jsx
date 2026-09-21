import { useState } from 'react'

// Verbatim quotes and DOM order re-extracted live from https://www.natural.com/ (audit
// pass). `wide` / `light` / `tint` reflect the real per-card measurements taken from the
// live site (computed background-color + investor-card--fund/--angel + --light/--dark
// classes) — see Animation-pass notes. Category ("firms" vs "individuals") reflects the
// live filter tablist's own grouping as best determined from title/role text.
const TESTIMONIALS = [
  { name: 'Kirsten Green', company: 'Forerunner', title: 'Founder, Forerunner', tint: '#001633', light: true, wide: true, category: 'firms', quote: "At Forerunner, we've spent years thinking about how the rules of financial participation get rewritten. Agents now hold that right. You won’t find a better, more responsive team to work with than Natural." },
  { name: 'Immad Akhund', company: 'Mercury', title: 'CEO, Mercury', tint: '#5266eb', light: true, wide: false, category: 'individuals', quote: 'For the power of agents to be fully realized they need to be able to access payments infra. Natural makes that happen.' },
  { name: 'Henri S. and Max S.', company: 'Privy', title: 'CEO & COO, Privy', tint: '#17171f', light: true, wide: false, category: 'individuals', quote: "They're delivering real value to the agent economy fast and they're just getting started." },
  { name: 'Pete Koomen', company: 'Y Combinator', title: 'GP, Y Combinator', tint: '#ff6600', light: true, wide: false, category: 'firms', quote: "Natural is an elegant solution to one of the most obvious problems with agents: they can't pay for things." },
  { name: 'Ramtin Naimi', company: 'Abstract', title: 'Founder, Abstract', tint: '#551212', light: true, wide: true, category: 'firms', quote: 'As AI moves from demos to production, agents need money that moves at the speed of compute... Natural has rebuilt the full stack to enable intelligent systems to work in production.' },
  { name: 'Zach Abrams', company: 'Bridge', title: 'CEO, Bridge', tint: '#030712', light: true, wide: false, category: 'individuals', quote: 'Agentic payments will dwarf human-initiated payments within a decade. Natural is pioneering this frontier.' },
  { name: 'Michael Tannenbaum', company: 'Figure', title: 'CEO, Figure', tint: '#5b56f5', light: true, wide: false, category: 'individuals', quote: 'Natural has the team, the vision and the execution to harness the massive opportunity in agentic payments.' },
  { name: 'Art Levy', company: 'Brex', title: 'CBO, Brex', tint: '#00070a', light: true, wide: false, category: 'individuals', quote: 'Regulation will evolve, but the shift toward agentic payments is inevitable and Natural is the clear leader.' },
  { name: 'Baris A. and Armaan A.', company: 'Human Capital', title: 'Co-founders, Human Capital', tint: '#ebeae5', light: false, wide: true, category: 'firms', quote: 'After knowing the team for more than five years we had no doubt on their level of ambition. We are excited to work closely with them to build the payments stack for agents.' },
  { name: 'Guillermo Rauch', company: 'Vercel', title: 'CEO, Vercel', tint: '#000000', light: true, wide: false, category: 'individuals', quote: 'I invested in Natural because I believe agents will require a radical rethink of the infrastructure services of the internet.' },
  { name: 'Nichole Wischoff', company: 'Wischoff Ventures', title: 'Founder, Wischoff Ventures', tint: '#a43028', light: true, wide: false, category: 'firms', quote: 'The future of payments will be agent to agent and Natural will enable it. My biggest regret is not taking a call and missing the seed.' },
  { name: 'Akshay Kothari', company: 'Notion', title: 'Co-founder, Notion', tint: '#f6f5f4', light: false, wide: false, category: 'individuals', quote: "Software started as tools for humans. Now it’s becoming autonomous. Natural builds the systems that allow agents to transact reliably." },
  { name: 'Ben T. and Adam G.', company: 'Genius', title: 'Co-founders, Genius', tint: '#270708', light: true, wide: true, category: 'firms', quote: 'Natural is in a position to dominate the impending race to build the infrastructure for agentic payments. We are excited to back them from day zero and will continue to triple down at every opportunity we have.' },
  { name: 'Pablo Palafox', company: 'HappyRobot', title: 'CEO, HappyRobot', tint: '#0e0d0c', light: true, wide: false, category: 'individuals', quote: "We’ve deployed hundreds of agents for our customers, many of which handle payments. Natural has the ability to make this extremely seamless." },
  { name: 'Paul Klein IV', company: 'Browserbase', title: 'CEO, Browserbase', tint: '#ff0000', light: true, wide: false, category: 'individuals', quote: 'Behind every mission-critical agent is mission-critical infrastructure. Natural is building the most reliable way for agents to transact.' },
  { name: 'Dylan Babbs', company: 'Profound', title: 'Co-founder, Profound', tint: '#000000', light: true, wide: false, category: 'individuals', quote: "If you’re building agents that need to transact in the real world, Natural is the infrastructure you use." },
  { name: 'Willem V. L. and Eric S.', company: 'Terrain', title: 'Co-founders, Terrain', tint: '#eae8e4', light: false, wide: true, category: 'firms', quote: "We're pleased to have supported Kahlil and Natural from the start as they make that payments infrastructure reliable and beautifully designed to use." },
  { name: 'Isaiah Granet', company: 'Bland', title: 'CEO, Bland', tint: '#ca071a', light: true, wide: false, category: 'individuals', quote: "When you meet the team at Natural, it’s obvious they’re the right people to build the economic layer for agents." },
  { name: 'Itai Damti', company: 'Unit', title: 'CEO, Unit', tint: '#000000', light: true, wide: false, category: 'individuals', quote: 'Software and money are merging, and agents are redefining everything we know about software.' },
  { name: 'Matt Michaelis', company: 'Emprise Bank', title: 'CEO, Emprise Bank', tint: '#002d3f', light: true, wide: false, category: 'individuals', quote: "As a banker and an investor, I've rarely seen a team this well-positioned to own a category this inevitable." },
  { name: 'Ryan F. and Tyler G.', company: 'Restive', title: 'Co-founders, Restive', tint: '#f6f6f0', light: false, wide: true, category: 'firms', quote: 'AI financial services will be a $1 trillion revenue market in ten years. We expect Natural to support a significant portion of that economy.' },
  { name: 'Darragh Buckley', company: 'Increase', title: 'CEO, Increase', tint: '#f2f3f5', light: false, wide: false, category: 'individuals', quote: 'Natural is building the infrastructure to make autonomous payments safe, seamless, and ready for real-world use.' },
  { name: 'Matteo Franceschetti', company: 'Eight Sleep', title: 'CEO, Eight Sleep', tint: '#000000', light: true, wide: false, category: 'individuals', quote: 'The internet is shifting from humans operating software to software operating itself. Natural makes that financially possible.' },
  { name: 'Chris Harper', company: 'Torch', title: 'Partner, Torch', tint: '#ff0000', light: true, wide: true, category: 'firms', quote: 'We’re moving toward a world where agents transact autonomously at global scale. Those agents need identity, governance, and trust. Natural is building all three from the ground up.' },
]

const FILTERS = ['All', 'Firms', 'Individuals']

// Small decorative "logo mark" placeholder rendered at the top of each card, mirroring
// the live site's `.investor-card-logo` svg glyph (colored via currentColor).
function LogoMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ArrowUpRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Card is 542px tall on the live site: padding 80/40/40, logo 32px, 122px gap, a
// 96px-tall (4 lines @ 15/24) clamped quote, another 122px gap, and a 50px footer row.
// Width is 560px ("fund" cards) or 360px ("angel" cards) at desktop, both collapse to
// 335px on mobile — measured directly from `.investor-card`/`.investor-card-wrapper`.
function InvestorCard({ t, hidden }) {
  const textColor = t.light ? 'rgba(255,255,255,0.92)' : 'rgb(22,21,20)'
  const subColor = t.light ? 'rgba(255,255,255,0.6)' : 'rgb(113,112,111)'

  return (
    <div
      className={`investor-card-wrapper flex-shrink-0 overflow-hidden rounded-sm transition-[width,margin-right,opacity] duration-150 ease-out ${
        t.wide ? 'investor-card-wrapper--wide' : ''
      }`}
      style={{
        width: hidden ? 0 : undefined,
        marginRight: hidden ? 0 : 20,
        opacity: hidden ? 0 : 1,
      }}
      aria-hidden={hidden}
    >
      <div
        className="investor-card-inner flex h-full flex-col items-start gap-[122px] overflow-hidden rounded-sm"
        style={{
          backgroundColor: t.tint,
          width: 'var(--investor-card-w, 360px)',
          padding: '80px 40px 40px',
          color: textColor,
        }}
      >
        <LogoMark />
        <p
          className="investor-card-quote text-[15px] leading-24"
          style={{
            height: 96,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            maxWidth: t.wide ? 440 : '100%',
          }}
        >
          &ldquo;{t.quote}&rdquo;
        </p>
        <div className="flex w-full items-center justify-between gap-20">
          <div className="flex min-w-0 flex-col gap-2">
            <p className="truncate text-[15px] leading-24">{t.name}</p>
            {/* Measured live: the role line uses the same 15px/24px scale as the name
                above it, not a smaller 13px/18px caption scale. */}
            <p className="truncate text-[15px] leading-24" style={{ color: subColor }}>
              {t.title}
            </p>
          </div>
          <ArrowUpRightIcon />
        </div>
      </div>
    </div>
  )
}

function Investors() {
  const [filter, setFilter] = useState('All')

  const isVisible = (t) => filter === 'All' || t.category === filter.toLowerCase()

  // Live is 870px at 390px wide (content-driven) and 1010px at 1280px, so the
  // 1010px floor is a desktop-only constraint.
  return (
    <section className="investors-section mx-auto max-w-[1280px] px-32 py-120 md:px-40">
      <p className="eyebrow">Investors</p>
      <h2 className="section-h2 mt-12 max-w-[480px] text-text-primary">
        Backed by the best investors and operators in fintech
      </h2>

      {/* Single wide horizontally-scrollable row ("wall of love"), NOT a wrapping
          masonry grid — measured live: `.investor-row{display:flex;flex-wrap:nowrap;
          overflow-x:auto;width:100vw}` bled full-bleed via negative margin, with each
          `.investor-card-wrapper` a fixed 542px-tall flex-shrink-0 column. Filtering
          keeps all cards mounted and animates width/margin/opacity to 0 for hidden
          cards (`transition: opacity .15s ease-out,width .15s ease-out,margin-right
          .15s ease-out`) rather than removing them from the DOM. */}
      <div
        className="investor-row mt-40 flex flex-nowrap items-start overflow-x-auto"
        style={{
          scrollbarWidth: 'none',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          paddingInline: 'max(40px, calc((100vw - 1280px) / 2 + 40px))',
        }}
      >
        {TESTIMONIALS.map((t) => (
          <InvestorCard key={t.name} t={t} hidden={!isVisible(t)} />
        ))}
      </div>

      {/* Re-measured live: filters are plain text tabs (transparent, no pill/border,
          padding 4px 8px, radius 2px) — active is text-primary, inactive is
          text-tertiary — not filled pill buttons. */}
      <div className="mt-24 flex items-center" role="tablist" aria-label="Filter investors">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-sm px-8 py-4 text-[15px] leading-24 transition-colors duration-100 ease-out ${
              filter === f ? 'text-text-primary' : 'text-text-tertiary hover:text-text-secondary'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </section>
  )
}

export default Investors
