// Bar heights (px, at a 291px-wide/128px-tall chart) re-measured live from the
// ".benefit-scale-chart" / ".benefit-scale-bar" nodes on natural.com — this is a
// rising ascending-noise bar chart, not a distinct image asset.
const VOLUME_BAR_HEIGHTS = [
  20, 31, 43, 27, 52, 18, 35, 24, 42, 32, 47, 29, 19, 25, 33, 23, 38, 28, 44, 31,
  53, 39, 62, 48, 57, 75, 67, 83, 71, 65, 78, 92, 73, 69, 89, 128,
]

function VolumeChart() {
  return (
    <div
      className="relative flex h-240 flex-col justify-between overflow-hidden rounded-md bg-[#fafafa]"
      style={{ height: 240, padding: '40px 20px' }}
      aria-hidden="true"
    >
      <p className="text-[15px] leading-24" style={{ color: 'rgb(187, 179, 180)' }}>
        Volume
      </p>
      <div className="flex items-end gap-[2px]" style={{ height: 128 }}>
        {VOLUME_BAR_HEIGHTS.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-t-[3px]"
            style={{
              height: `${h}px`,
              // Re-measured live (.benefit-scale-bar): opacity is 1 — the muted look
              // comes entirely from the gradient's own desaturated colors, not a
              // 0.4 opacity layered on top (which washes the bars out further).
              backgroundImage: 'linear-gradient(to top, rgb(217, 203, 202), rgb(226, 207, 200))',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// Re-measured live from ".benefit-graphic--uptime": two rows of 28 short bars each
// (API / MCP), not chip pills — height 20px, width 6px, olive tint, 40% opacity.
function UptimeChips() {
  const bars = Array.from({ length: 28 })
  return (
    <div
      className="relative flex h-240 items-center overflow-hidden rounded-md bg-[#fafafa]"
      style={{ height: 240 }}
      aria-hidden="true"
    >
      <div className="flex w-full flex-col gap-32 px-20">
        {['API', 'MCP'].map((label) => (
          <div key={label} className="flex flex-col items-end gap-12">
            <span className="text-[15px] leading-24" style={{ color: 'rgb(179, 185, 128)' }}>
              {label}
            </span>
            <div className="flex items-end justify-end gap-[3px]">
              {/* Re-measured live (.benefit-uptime-bar): opacity is 1, solid rgb(179,185,128). */}
              {bars.map((_, i) => (
                <span
                  key={i}
                  className="rounded-[3px]"
                  style={{ width: 6, height: 20, backgroundColor: 'rgb(179, 185, 128)' }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const CARDS = [
  {
    title: 'FDIC-insured up to $200M¹',
    copy: 'All Natural accounts receive expanded FDIC coverage.',
    visual: (
      <img
        src="/assets/images/benefits/fdic-card.jpg"
        alt="Shield mark with $200M FDIC coverage"
        className="h-240 w-full rounded-md object-cover"
      />
    ),
  },
  {
    title: 'Scale to billions of dollars',
    copy: 'Natural can scale with you as your business grows.',
    visual: <VolumeChart />,
  },
  {
    title: '99.99% uptime',
    copy: 'We take performance seriously so you can focus on building.',
    visual: <UptimeChips />,
  },
]

function BenefitsScale() {
  return (
    <section className="mx-auto max-w-[1280px] px-32 py-120 md:px-40" style={{ minHeight: 756 }}>
      <p className="eyebrow">Benefits</p>
      {/* Re-measured live: the eyebrow+h2 wrapper is a 480px-max-width column, matching
          every other section header on the page (was previously 600px). */}
      <h2 className="section-h2 mt-12 max-w-[480px] text-text-primary">Scale with confidence</h2>

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

export default BenefitsScale
