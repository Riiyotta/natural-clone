import { useState } from 'react'

const PRODUCTS = [
  { name: 'Wallets', desc: 'FDIC-insured wallets for agents', href: '/wallet' },
  { name: 'Vault', desc: 'One-way accounts for agents to move money in, never out', href: '/vault' },
  { name: 'Pay', desc: 'Send money to an agent, business, or consumer', href: '/pay' },
  { name: 'Request', desc: 'Collect money from an agent, business, or consumer', href: '/request' },
  { name: 'Transfer', desc: 'Move funds between internal and external accounts', href: '/transfer' },
  { name: 'Connect', desc: 'Build platforms and marketplaces on Natural', href: '/connect' },
  { name: 'Accept', desc: 'Turn your agent into a merchant to process payments', href: '/accept', soon: true },
  { name: 'Cards', desc: 'Issue debit and charge cards for agents', href: '/cards', soon: true },
  { name: 'Credit', desc: 'Give agents access to lines of credit', href: '/credit', soon: true },
  { name: 'Direct', desc: 'Select payment rails at agent runtime', href: '/direct', soon: true },
  { name: 'Voice', desc: 'Securely collect card details over the phone', href: '/voice', soon: true },
  { name: 'Bill', desc: 'Usage and success based billing for agents', href: '/bill', soon: true },
  { name: 'Charge', desc: 'Use popular APIs and pay per call', href: '/charge', soon: true },
]

const FEATURES = [
  { name: 'Identity', desc: 'Persistent identity for agents', href: '/identity' },
  { name: 'Observability', desc: 'Monitor and log agent activity', href: '/observability' },
  { name: 'Disputes', desc: 'Managed disputes for safe transactions', href: '/disputes' },
  { name: 'Compliance', desc: 'Fully automated compliance', href: '/compliance' },
]

const COMPANY = [
  { name: 'About', desc: 'Learn more about Natural', href: '/about' },
  { name: 'Careers', desc: 'Join our team', href: '/careers' },
  { name: 'Blog', desc: 'Read the latest from the team', href: '/blog' },
  { name: 'Contact', desc: 'Get in touch with our team', href: '/contact' },
]

// Measured live: Products is FOUR labelled groups laid out in a 2x2 grid
// (560px columns, 40px row / 80px column gap). Features and Company are a single
// unlabelled group indented to x=280 to sit under their own nav tab.
const PRODUCT_GROUPS = [
  { label: 'Accounts', items: PRODUCTS.filter((i) => ['Wallets', 'Vault'].includes(i.name)) },
  { label: 'Credit & cards', items: PRODUCTS.filter((i) => ['Accept', 'Cards', 'Credit'].includes(i.name)) },
  { label: 'Money movement', items: PRODUCTS.filter((i) => ['Pay', 'Request', 'Transfer', 'Direct'].includes(i.name)) },
  { label: 'Developer & billing', items: PRODUCTS.filter((i) => ['Connect', 'Voice', 'Bill', 'Charge'].includes(i.name)) },
]

const MENUS = {
  Products: { groups: PRODUCT_GROUPS, wide: true },
  Features: { groups: [{ label: null, items: FEATURES }], wide: false },
  Company: { groups: [{ label: null, items: COMPANY }], wide: false },
}

// Settled panel heights measured live at 1280x900 (.nav-submenu-panel, open state).
// The panel animates height, so it needs a concrete target per menu rather than
// `auto` — height transitions do not interpolate to/from auto.
const SUBMENU_HEIGHTS = { Products: 552, Features: 272, Company: 272 }

// Measured live (.nav-submenu-group / its links): group label is 15px in the secondary
// grey and occupies a 48px row; each link row is 48px tall with 12px 0 padding and a
// 4px gap between its name and description.
function MegaMenuList({ menu }) {
  const { groups, wide } = menu
  return (
    <div className={`nav-submenu${wide ? '' : ' nav-submenu--align-tabs'}`}>
      <div className={`nav-submenu-groups${wide ? ' nav-submenu-groups--grid' : ''}`}>
        {groups.map((group, gi) => (
          <div key={group.label ?? gi} className="nav-submenu-group flex flex-col">
            {group.label && (
              <p className="flex h-48 items-center text-[15px] leading-24 text-text-secondary">
                {group.label}
              </p>
            )}
            {/* Measured live: each link row is HORIZONTAL — name, description and a
                trailing arrow side by side, each 24px tall, so the row is 48px
                (12px 0 padding, 4px gap). Stacking them made it 70px. The
                description uses 15px/24px here, not the 13px caption scale. */}
            {group.items.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="nav-submenu-link flex flex-row items-start gap-4 py-12 transition-colors duration-100 ease-out"
              >
                <span className="nav-submenu-link-name flex items-center gap-8 text-[15px] leading-24 text-text-primary">
                  {item.name}
                  {item.soon && (
                    <span className="rounded-sm bg-background-2 px-6 text-[11px] leading-16 text-text-secondary">
                      Soon
                    </span>
                  )}
                </span>
                <span className="nav-submenu-link-desc text-[15px] leading-24 text-text-secondary">
                  {item.desc}
                </span>
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function GhostNavButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-6 rounded-ghost px-12 py-6 text-[15px] leading-24 text-text-primary transition-colors duration-100 ease-out hover:text-text-secondary ${
        active ? 'bg-background-hover' : ''
      }`}
    >
      {label}
    </button>
  )
}

// Measured live: the nav logo is a 16x16 mark inside a 120x32 anchor (padding 8px 0).
// The full wordmark is only used in the footer.
function LogoMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect width="16" height="16" rx="1" fill="rgb(22,21,20)" />
    </svg>
  )
}

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

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="rgb(22,21,20)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="rgb(22,21,20)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="ml-4">
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MobileAccordion({ title, items }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-card-border">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-16 text-[15px] leading-24 text-text-primary"
      >
        {title}
        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <ChevronDown />
        </span>
      </button>
      <div className={`pb-16 ${open ? '' : 'hidden'}`}>
        {items.map((item) => (
          <a key={item.name} href={item.href} className="block py-8">
            <div className="flex items-center gap-8">
              <span className="text-[15px] leading-24 text-text-primary">{item.name}</span>
              {item.soon && (
                <span className="rounded-sm bg-background-2 px-6 text-[11px] leading-16 text-text-secondary">
                  Soon
                </span>
              )}
            </div>
            <p className="mt-2 text-[13px] leading-18 text-text-secondary">{item.desc}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

function Navbar() {
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav
        className="sticky top-0 left-0 z-50 flex h-80 w-full items-center px-32 backdrop-blur-md md:px-40"
        style={{ backgroundColor: 'rgba(255,255,255,0.75)' }}
        onMouseLeave={() => setOpenMenu(null)}
      >
        {/* Measured live: .nav-container is a 1200x40 row (justify-between); the logo and
            the link group share a left cluster separated by a 108px gap. */}
        <div className="nav-container mx-auto flex h-40 w-full max-w-[1200px] items-center justify-between">
          <div className="nav-left-container flex items-center gap-[108px]">
            <a
              href="/"
              className="nav-logo-container entrance page-entrance entrance-delay-1000 entrance-duration-400 entrance-distance-neg-12 entrance-ease-out flex flex-col items-start py-8 md:w-[120px]"
              aria-label="Natural"
            >
              <LogoMark />
            </a>

            <div className="nav-links entrance page-entrance entrance-delay-1100 entrance-duration-400 entrance-distance-neg-12 entrance-ease-out relative hidden items-center md:flex">
              {Object.keys(MENUS).map((key) => (
                <div key={key} onMouseEnter={() => setOpenMenu(key)}>
                  <GhostNavButton label={key} active={openMenu === key} onClick={() => setOpenMenu(openMenu === key ? null : key)} />
                </div>
              ))}
              <a
                href="/pricing"
                className="flex items-center justify-center gap-6 rounded-ghost px-12 py-6 text-[15px] leading-24 text-text-primary transition-colors duration-100 ease-out hover:text-text-secondary"
              >
                Pricing
              </a>
              <a
                href="https://docs.natural.com"
                className="flex items-center justify-center gap-6 rounded-ghost px-12 py-6 text-[15px] leading-24 text-text-primary transition-colors duration-100 ease-out hover:text-text-secondary"
              >
                Docs
              </a>
            </div>
          </div>

          <div className="nav-right-container entrance page-entrance entrance-delay-1200 entrance-duration-400 entrance-distance-neg-12 entrance-ease-out hidden items-center gap-10 md:flex">
            <a
              href="/login"
              className="flex items-center justify-center gap-12 rounded-pill px-16 py-6 text-[15px] leading-24 text-text-primary transition-colors duration-100 ease-out hover:text-text-secondary"
            >
              <p>Login</p>
            </a>
            <a
              href="/signup"
              className="flex items-center justify-center gap-12 rounded-pill bg-background-button px-16 py-6 text-[15px] leading-24 text-text-on-color transition-colors duration-100 ease-out hover:bg-background-button-hover"
            >
              <p>Sign up for free</p>
              <ArrowForwardIcon size={12} />
            </a>
          </div>

          <button type="button" className="flex md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation menu">
            <HamburgerIcon />
          </button>
        </div>

        {/* Measured live: the submenu is NOT a floating card per menu item — it is a
            single full-bleed 1280px panel pinned under the bar (y=80) on a
            rgb(246,246,246) fill with no radius and no shadow. It stays mounted and
            animates its own height open/closed, which is why it needs to live here as
            a sibling of .nav-container rather than inside each item. */}
        <div
          className={`nav-submenu-panel${openMenu ? ' nav-submenu-panel--open' : ''} hidden md:block`}
          style={{ '--nav-submenu-h': `${SUBMENU_HEIGHTS[openMenu] ?? 272}px` }}
          onMouseEnter={() => setOpenMenu(openMenu)}
        >
          {openMenu && <MegaMenuList menu={MENUS[openMenu]} />}
        </div>
      </nav>

      <dialog
        aria-label="Navigation menu"
        open={mobileOpen}
        className={`fixed inset-0 z-[60] m-0 h-full w-full max-w-none bg-white p-24 ${
          mobileOpen ? 'flex flex-col' : 'hidden'
        }`}
      >
          <div className="flex items-center justify-between">
            <img src="/assets/brand/natural-logo.svg" alt="Natural" className="h-24 w-auto" />
            <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close navigation menu">
              <CloseIcon />
            </button>
          </div>

          <div className="mt-32">
            <div className="page-entrance entrance-delay-0">
              <MobileAccordion title="Products" items={PRODUCTS} />
            </div>
            <div className="page-entrance entrance-delay-50">
              <MobileAccordion title="Features" items={FEATURES} />
            </div>
            <div className="page-entrance entrance-delay-100">
              <MobileAccordion title="Company" items={COMPANY} />
            </div>
            <a href="/pricing" className="page-entrance entrance-delay-150 block border-b border-card-border py-16 text-[15px] leading-24">
              Pricing
            </a>
            <a href="https://docs.natural.com" className="page-entrance entrance-delay-150 block border-b border-card-border py-16 text-[15px] leading-24">
              Docs
            </a>
          </div>

          <div className="mobile-nav-actions page-entrance entrance-delay-150 mt-32 flex flex-col gap-12">
            <a
              href="/signup"
              className="flex items-center justify-center gap-12 rounded-pill bg-background-button px-16 py-6 text-center text-[15px] leading-24 text-text-on-color"
            >
              <p>Sign up for free</p>
              <ArrowForwardIcon size={12} />
            </a>
            <a href="/login" className="rounded-pill px-16 py-6 text-center text-[15px] leading-24 text-text-primary">
              Login
            </a>
          </div>
      </dialog>
    </>
  )
}

export default Navbar
