import FinalCta from '../components/FinalCta'

// Measured live (/pricing, desktop 1280x900 + mobile 390x844). Pricing table content
// verbatim from `.ppg` / `.ppg-cell` DOM (data-component="ProductPricingGroup").
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

const NAV_GROUPS = [
  { heading: 'Accounts', tabs: [{ id: 'pricing-wallet', label: 'Wallet' }, { id: 'pricing-vault', label: 'Vault' }] },
  {
    heading: 'Move money',
    tabs: [
      { id: 'pricing-pay', label: 'Pay' },
      { id: 'pricing-request', label: 'Request' },
      { id: 'pricing-transfer', label: 'Transfer' },
      { id: 'pricing-direct', label: 'Direct' },
    ],
  },
  {
    heading: 'Cards & credit',
    tabs: [
      { id: 'pricing-accept', label: 'Accept' },
      { id: 'pricing-cards', label: 'Cards' },
      { id: 'pricing-credit', label: 'Credit' },
    ],
  },
  {
    heading: 'Developer & billing',
    tabs: [
      { id: 'pricing-connect', label: 'Connect' },
      { id: 'pricing-voice', label: 'Voice' },
      { id: 'pricing-billing', label: 'Bill' },
      { id: 'pricing-charge', label: 'Charge' },
    ],
  },
]

// amount = { value, isLink, label }
const GROUPS = [
  {
    title: 'Accounts',
    items: [
      {
        id: 'pricing-wallet',
        name: 'Wallets',
        desc: 'FDIC-insured¹ wallets for agents',
        cells: [
          { tier: 'Consumer', amounts: [{ value: 'Free' }] },
          { tier: 'Business', amounts: [{ value: 'Free' }] },
          { tier: 'Enterprise', amounts: [{ value: 'Free' }] },
        ],
      },
      {
        id: 'pricing-vault',
        name: 'Vault',
        desc: 'One-way accounts for agents to move money in, never out',
        cells: [
          { tier: 'Consumer', amounts: [{ value: 'Free' }] },
          { tier: 'Business', amounts: [{ value: 'Free' }] },
          { tier: 'Enterprise', amounts: [{ value: 'Free' }] },
        ],
      },
    ],
  },
  {
    title: 'Move money',
    items: [
      {
        id: 'pricing-pay',
        name: 'Pay',
        desc: 'Send money to an agent, business, or consumer',
        cells: [
          { tier: 'Consumer', amounts: [{ value: 'Free' }] },
          { tier: 'Business', amounts: [{ value: '0.1% or 10 bps' }] },
          { tier: 'Enterprise', amounts: [{ value: 'Contact us', isLink: true }] },
        ],
      },
      {
        id: 'pricing-request',
        name: 'Request',
        desc: 'Collect money from an agent, business, or consumer',
        cells: [
          { tier: 'Consumer', amounts: [{ value: 'Free' }] },
          { tier: 'Business', amounts: [{ value: '0.1% or 10 bps' }] },
          { tier: 'Enterprise', amounts: [{ value: 'Contact us', isLink: true }] },
        ],
      },
      {
        id: 'pricing-transfer',
        name: 'Transfer',
        desc: 'Move funds between internal and external accounts',
        cells: [
          {
            tier: 'Consumer',
            amounts: [
              { value: 'Free', label: 'Standard' },
              { value: '1.5%', label: 'Instant' },
            ],
          },
          {
            tier: 'Business',
            amounts: [
              { value: 'Free', label: 'Standard' },
              { value: '1.5%', label: 'Instant' },
            ],
          },
          {
            tier: 'Enterprise',
            amounts: [
              { value: 'Free', label: 'Standard' },
              { value: 'Contact us', isLink: true, label: 'Instant' },
            ],
          },
        ],
      },
      {
        id: 'pricing-direct',
        name: 'Direct',
        soon: true,
        desc: 'Select payment rails at agent runtime',
        cells: [
          { tier: 'Consumer', amounts: [{ value: 'Contact us', isLink: true }] },
          { tier: 'Business', amounts: [{ value: 'Contact us', isLink: true }] },
          { tier: 'Enterprise', amounts: [{ value: 'Contact us', isLink: true }] },
        ],
      },
    ],
  },
  {
    title: 'Cards & credit',
    items: [
      {
        id: 'pricing-accept',
        name: 'Accept',
        soon: true,
        desc: 'Turn your agent into a merchant to process payments',
        cells: [
          {
            tier: 'Consumer',
            amounts: [
              { value: 'N/A', label: 'Standard' },
              { value: 'N/A', label: 'MOR' },
            ],
          },
          {
            tier: 'Business',
            amounts: [
              { value: '2.9% + 30¢', label: 'Standard' },
              { value: 'Contact us', isLink: true, label: 'MOR' },
            ],
          },
          {
            tier: 'Enterprise',
            amounts: [
              { value: 'Contact us', isLink: true, label: 'Standard' },
              { value: 'Contact us', isLink: true, label: 'MOR' },
            ],
          },
        ],
      },
      {
        id: 'pricing-cards',
        name: 'Cards',
        soon: true,
        desc: 'Issue debit and charge cards for agents',
        cells: [
          { tier: 'Consumer', amounts: [{ value: 'Free' }] },
          { tier: 'Business', amounts: [{ value: 'Free' }] },
          { tier: 'Enterprise', amounts: [{ value: 'Free' }] },
        ],
      },
      {
        id: 'pricing-credit',
        name: 'Credit',
        soon: true,
        desc: 'Give agents access to lines of credit',
        cells: [
          {
            tier: 'Consumer',
            amounts: [
              { value: 'N/A', label: 'Base' },
              { value: 'N/A', label: 'Card' },
            ],
          },
          {
            tier: 'Business',
            amounts: [
              { value: '3% or 300 bps', label: 'Base' },
              { value: '$0', label: 'Card' },
            ],
          },
          {
            tier: 'Enterprise',
            amounts: [
              { value: 'Custom', label: 'Base' },
              { value: '$0', label: 'Card' },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Developer & billing',
    items: [
      {
        id: 'pricing-connect',
        name: 'Connect',
        desc: 'Build platforms and marketplaces on Natural',
        cells: [
          { tier: 'Consumer', amounts: [{ value: 'Free' }] },
          { tier: 'Business', amounts: [{ value: 'Free' }] },
          { tier: 'Enterprise', amounts: [{ value: 'Free' }] },
        ],
      },
      {
        id: 'pricing-voice',
        name: 'Voice',
        soon: true,
        desc: 'Securely collect card details over the phone',
        cells: [
          {
            tier: 'Consumer',
            amounts: [
              { value: 'N/A', label: 'Base' },
              { value: 'N/A', label: 'With Accept*' },
            ],
          },
          {
            tier: 'Business',
            amounts: [
              { value: '$1K/month', label: 'Base' },
              { value: 'Waived', label: 'With Accept*' },
            ],
          },
          {
            tier: 'Enterprise',
            amounts: [
              { value: 'Contact us', isLink: true, label: 'Base' },
              { value: 'Waived', label: 'With Accept*' },
            ],
          },
        ],
      },
      {
        id: 'pricing-billing',
        name: 'Billing',
        soon: true,
        desc: 'Usage and success based billing for agents',
        cells: [
          { tier: 'Consumer', amounts: [{ value: 'N/A' }] },
          { tier: 'Business', amounts: [{ value: '0.5% or 50 bps' }] },
          { tier: 'Enterprise', amounts: [{ value: 'Contact us', isLink: true }] },
        ],
      },
      {
        id: 'pricing-charge',
        name: 'Charge',
        soon: true,
        desc: 'Use popular APIs and pay per call',
        cells: [
          { tier: 'Consumer', amounts: [{ value: '0.1% or 10 bps' }] },
          { tier: 'Business', amounts: [{ value: '0.1% or 10 bps' }] },
          { tier: 'Enterprise', amounts: [{ value: 'Contact us', isLink: true }] },
        ],
      },
    ],
  },
]

function CellAmount({ amount }) {
  return (
    <div className="flex flex-col items-end gap-2 text-right md:items-start md:text-left">
      {amount.isLink ? (
        <a href="/contact" className="text-[15px] leading-24 text-text-primary hover:text-text-secondary">
          {amount.value}
        </a>
      ) : (
        <p className="text-[15px] leading-24 text-text-primary">{amount.value}</p>
      )}
      {amount.label && <p className="text-[15px] leading-24 text-text-secondary">{amount.label}</p>}
    </div>
  )
}

// Live wraps each row + its divider in one flex-column "item" with its OWN 40px gap
// (not the 40px gap between items doing double duty) — so consecutive rows are
// separated by 40px + 1px divider + 40px (the items-list gap), not a single 40px gap.
function PricingRow({ item, isLast }) {
  return (
    <div className="flex flex-col gap-40">
      <div id={item.id} className="flex flex-col gap-32 md:flex-row md:items-start md:gap-40">
        <div className="flex flex-col gap-4 md:w-[399px] md:shrink-0">
          <div className="flex items-center gap-8">
            <p className="text-[15px] leading-24 text-text-primary">{item.name}</p>
            {item.soon && (
              <span className="rounded-sm bg-background-2 px-6 text-[11px] leading-16 text-text-secondary">
                Soon
              </span>
            )}
          </div>
          <p className="text-[15px] leading-24 text-text-secondary md:pr-40">{item.desc}</p>
        </div>
        {/* Mobile: 3 tier rows stacked (40px gap), each a flex row with the tier label
            left and the amount(s) right-aligned (24px gap when 2 amounts stack).
            Desktop: 3-column grid, tier label hidden, amounts stacked with 40px gap. */}
        <div className="flex flex-col gap-40 md:grid md:grid-cols-3 md:flex-1">
          {item.cells.map((cell) => (
            <div key={cell.tier} className="flex items-start justify-between md:block">
              <p className="text-[15px] leading-24 text-text-secondary md:hidden">{cell.tier}</p>
              <div className="flex flex-col items-end gap-24 md:items-start md:gap-40">
                {cell.amounts.map((amount, i) => (
                  <CellAmount key={i} amount={amount} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Live hides the divider (display:none, no gap contribution) on the last row of
          each group — the group's own 40/24px bottom padding closes it out instead. */}
      {!isLast && <div className="h-[1px] w-full bg-[rgb(236,236,235)]" />}
    </div>
  )
}

function PricingGroup({ group }) {
  return (
    <div className="flex flex-col gap-24 py-24 md:gap-64 md:py-40">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] leading-28 font-normal text-text-primary">{group.title}</h3>
        <a href="/signup" className="flex items-center gap-8 px-12 py-4 text-[15px] leading-24 text-text-primary hover:text-text-secondary">
          <span>Start now</span>
          <ArrowForwardIcon size={12} />
        </a>
      </div>
      {/* .ppg-items: 40px gap between the (hidden-on-mobile) column-header item and each
          row+divider item, on both viewports. Mobile-only: 24px horizontal inset. */}
      <div className="flex flex-col gap-40 px-24 md:px-0">
        {/* Column header row: desktop shows Consumer/Business/Enterprise labels above the
            first row; mobile hides it (each cell repeats its own tier label instead). */}
        <div className="hidden md:grid md:grid-cols-[399px_1fr] md:gap-40">
          <div aria-hidden="true" />
          <div className="grid grid-cols-3 gap-40">
            <p className="text-[15px] leading-24 text-text-secondary">Consumer</p>
            <p className="text-[15px] leading-24 text-text-secondary">Business</p>
            <p className="text-[15px] leading-24 text-text-secondary">Enterprise</p>
          </div>
        </div>
        {group.items.map((item, i) => (
          <PricingRow key={item.id} item={item} isLast={i === group.items.length - 1} />
        ))}
      </div>
    </div>
  )
}

function Pricing() {
  return (
    <>
      <section className="flex flex-col items-center px-32 py-0 md:px-40" style={{ minHeight: 532 }}>
        <div className="flex w-full max-w-[1200px] flex-col items-start gap-40 pt-120">
          <h1
            style={{ color: 'rgb(17,20,0)' }}
            className="text-[24px] leading-32 font-[360] tracking-[-0.8px] md:text-[40px] md:leading-56"
          >
            Simple, scalable pricing
          </h1>
          <div className="flex items-center gap-12">
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
        </div>
      </section>

      <section className="flex flex-col items-center px-32 pb-120 md:px-40">
        <div className="flex w-full max-w-[1200px] flex-col gap-40 md:flex-row md:items-start md:gap-40">
          {/* Sticky left category nav — desktop only (hidden on mobile, matching live's
              `display:none` under the same breakpoint that collapses the table to a
              single stacked column). */}
          <nav
            aria-label="Pricing navigation"
            className="hidden shrink-0 flex-col gap-32 md:sticky md:top-[100px] md:flex md:w-[240px]"
          >
            {NAV_GROUPS.map((g) => (
              <div key={g.heading} className="flex flex-col">
                <p className="px-8 py-6 text-[14px] leading-20 text-text-primary">{g.heading}</p>
                {g.tabs.map((tab) => (
                  <a
                    key={tab.id}
                    href={`#${tab.id}`}
                    className="px-8 py-6 text-[14px] leading-20 text-text-secondary hover:text-text-primary"
                  >
                    {tab.label}
                  </a>
                ))}
              </div>
            ))}
          </nav>

          <div className="flex flex-1 flex-col gap-24 md:gap-40">
            {GROUPS.map((group) => (
              <PricingGroup key={group.title} group={group} />
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  )
}

export default Pricing
