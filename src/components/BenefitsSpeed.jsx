function TerminalCard() {
  // Measured live at 390px: this first card's image panel is 346px tall while the
  // other two stay 240px (desktop: all three are 240px). The height was md:-gated
  // only, so on mobile it collapsed to 159px of intrinsic content.
  // Re-measured live (.agent-terminal / .agent-terminal-titlebar / .agent-terminal-row):
  // titlebar is a macOS-style bar with 3 traffic-light dots (12px circles, rgb(215,214,212),
  // 6px gap) on a rgb(246,246,246) fill, padding 12px 20px, label 15px/20px STK Miso
  // color rgb(22,21,20) (not gray, not bordered). Body rows are 15px/24px STK Miso
  // (NOT mono/13px) — only the "❯" gutter glyph uses GT Standard Mono at 12px/24px.
  return (
    <div className="h-[346px] overflow-hidden rounded-md bg-[#fafafa] md:h-240">
      <div className="flex items-center gap-12 bg-[#f6f6f6] px-20 py-12">
        <span className="flex shrink-0 gap-6">
          <span className="h-12 w-12 rounded-full bg-[#d7d6d4]" />
          <span className="h-12 w-12 rounded-full bg-[#d7d6d4]" />
          <span className="h-12 w-12 rounded-full bg-[#d7d6d4]" />
        </span>
        <span className="text-[15px] leading-20 text-text-primary">Install Natural</span>
      </div>
      <div className="space-y-8 p-20 text-[15px] leading-24 text-text-primary">
        <p className="flex gap-8">
          <span className="font-mono text-[12px] leading-24 text-text-primary">❯</span>
          <span>Hey Patch, can you pay $500 to @hea...</span>
        </p>
        <p className="flex gap-8">
          <span className="w-16 shrink-0" />
          <span className="text-text-secondary">Of course — checking now.</span>
        </p>
        <p className="flex gap-8">
          <span className="w-16 shrink-0" />
          <span className="text-text-secondary">Calling create_payment tool...</span>
        </p>
      </div>
    </div>
  )
}

function PennyCard() {
  return (
    <div className="flex h-240 flex-col items-center justify-center rounded-md bg-[#fafafa]">
      {/* Re-measured live: avatar is 48x48 with 6px border-radius (rounded square), not a 64px circle. */}
      <img
        src="/assets/images/agents/penny-avatar.jpg"
        alt="Penny agent"
        className="h-48 w-48 rounded-[6px] object-cover"
      />
      <div className="mt-12 flex items-center gap-4">
        <span className="text-[21px] leading-[21px] text-text-primary">Penny</span>
        <img src="/assets/icons/agents/verified.svg" alt="" className="h-[18px] w-[18px]" />
      </div>
      <p className="mt-4 text-[18px] leading-[18px] text-text-secondary">Transacted 1s ago</p>
    </div>
  )
}

// Re-measured live from ".agent-graphic--product": a 4x2 grid of 60px icon tiles
// on a #fafafa panel — not an empty card.
const PRODUCT_ICONS = [
  'bank-account',
  'wallet',
  'shield',
  'people',
  'deposit',
  'withdraw',
  'card',
  'agent',
]

function ProductGrid() {
  return (
    <div
      className="flex items-center justify-center rounded-md bg-[#fafafa]"
      style={{ height: 240 }}
      aria-hidden="true"
    >
      <div className="grid grid-cols-4" style={{ gap: '2px 3px' }}>
        {PRODUCT_ICONS.map((icon) => (
          <div key={icon} className="flex h-[60px] w-[60px] items-center justify-center rounded-sm">
            <img src={`/assets/icons/agents/${icon}.svg`} alt="" className="h-24 w-24" />
          </div>
        ))}
      </div>
    </div>
  )
}

const CARDS = [
  {
    title: 'Agent-first primitives',
    copy: "All of Natural's APIs are designed for and used by agents.",
    visual: <TerminalCard />,
  },
  {
    title: 'Observable and traceable',
    copy: "We thread every payment with full agent observability so you're in control.",
    visual: <PennyCard />,
  },
  {
    title: 'One unified API',
    copy: 'Start with one flow, or launch a full payment platform. All with one API.',
    visual: <ProductGrid />,
  },
]

function BenefitsSpeed() {
  return (
    <section className="mx-auto max-w-[1280px] px-32 py-120 md:px-40">
      <p className="eyebrow">Benefits</p>
      {/* Re-measured live: the eyebrow+h2 wrapper is a 480px-max-width column, matching
          every other section header on the page (was previously 600px). */}
      <h2 className="section-h2 mt-12 max-w-[480px] text-text-primary">Move at agent speed</h2>

      <div className="mt-40 grid grid-cols-1 gap-40 md:grid-cols-3">
        {CARDS.map((card) => (
          <article
            key={card.title}
            className="flex flex-col gap-20 rounded-md border border-card-border bg-white p-20 md:h-[400px]"
          >
            {card.visual}
            <div className="flex flex-col gap-8">
              <h3 className="text-[15px] leading-24 text-text-primary">{card.title}</h3>
              <p className="text-[15px] leading-24 text-text-secondary">{card.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default BenefitsSpeed
