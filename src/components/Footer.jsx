const PRODUCTS = [
  { name: 'Wallets', href: '/wallet' },
  { name: 'Vault', href: '/vault' },
  { name: 'Pay', href: '/pay' },
  { name: 'Request', href: '/request' },
  { name: 'Transfer', href: '/transfer' },
  { name: 'Direct', href: '/direct' },
  { name: 'Accept', href: '/accept' },
  { name: 'Cards', href: '/cards' },
  { name: 'Credit', href: '/credit' },
  { name: 'Voice', href: '/voice' },
  { name: 'Connect', href: '/connect' },
  { name: 'Bill', href: '/bill' },
  { name: 'Charge', href: '/charge' },
]

const FEATURES = [
  { name: 'Identity', href: '/identity' },
  { name: 'Observability', href: '/observability' },
  { name: 'Disputes', href: '/disputes' },
  { name: 'Compliance', href: '/compliance' },
]

const DEVELOPERS = [
  { name: 'Guides', href: 'https://docs.natural.com/guides' },
  { name: 'Documentation', href: 'https://docs.natural.com/api-reference' },
  { name: 'API Status', href: 'https://status.natural.com' },
  { name: 'Join Slack', href: '/join-slack' },
]

const COMPANY = [
  { name: 'About', href: '/about' },
  { name: 'Careers', href: '/careers' },
  { name: 'Blog', href: '/blog' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
]

const LEGAL = [
  { name: 'Services Agreement', href: '/nsa' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Authorized Use Policy', href: '/aup' },
  { name: 'Disclosures', href: '/disclosures' },
]

// Re-measured live (.footer-column--connect): plain text links styled exactly like
// every other footer column — no icons.
const SOCIALS = [
  { name: 'X', href: 'https://x.com/naturalpay' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/naturalpay' },
  { name: 'Instagram', href: 'https://instagram.com/naturalpay' },
  { name: 'GitHub', href: 'https://github.com/naturalpay' },
  { name: 'Email', href: 'mailto:hi@natural.com' },
]

// Measured live: .footer-column is a flex column with a 24px gap between the label and
// the link list; labels are 15/24 primary, links 15/24 secondary with a 16px gap.
function FooterColumn({ title, links, className = '' }) {
  return (
    <div className={`footer-column flex flex-col items-start gap-24 ${className}`}>
      <span className="footer-column-label text-[15px] leading-24 text-text-primary">{title}</span>
      <div className="footer-column-links flex flex-col gap-16">
        {links.map((l) => (
          <a
            key={l.name}
            href={l.href}
            className="footer-link-wrapper text-[15px] leading-24 text-text-secondary hover:text-text-primary"
          >
            {l.name}
          </a>
        ))}
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="w-full">
      {/* Measured live: .content-container is padding 120px 40px with a 120px column gap. */}
      {/* Re-measured live: below md the container padding is 40px 32px (not 120px) and
          the column gap is 80px (not 120px). */}
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start gap-80 px-32 py-40 md:gap-120 md:px-40 md:py-120">
        {/* Measured live: a 3-column grid of 320px columns (120px gutters) at md+; below
            md it's a single column with a 64px row-gap (not 120px). The Products
            column spans both rows at md+. */}
        <div className="footer-nav grid w-full grid-cols-1 gap-x-120 gap-y-64 md:grid-cols-[320px_320px_320px] md:gap-y-120 md:justify-between">
          <FooterColumn title="Products" links={PRODUCTS} className="md:row-span-2" />
          <FooterColumn title="Features" links={FEATURES} />
          <FooterColumn title="Developers" links={DEVELOPERS} />
          <FooterColumn title="Company" links={COMPANY} />
          <FooterColumn title="Connect" links={SOCIALS} />
        </div>

        {/* Measured live: .footer-bottom is a 40px-gap row — wordmark left, a 760px
            disclosure column on the right at 14px/24px in rgb(175,175,175). */}
        <div className="footer-bottom flex w-full flex-col gap-40 md:flex-row md:justify-between">
          <a href="/" className="footer-wordmark shrink-0">
            <img src="/assets/brand/natural-logo.svg" alt="Natural" className="h-16 w-auto" />
          </a>

          <div
            className="footer-disclosure-text flex flex-col gap-24 text-[14px] leading-24 md:w-[760px] md:shrink-0"
            style={{ color: 'rgb(175,175,175)' }}
          >
            <nav className="footer-legal-links flex flex-wrap gap-x-40 gap-y-12">
              {LEGAL.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  className="text-[14px] leading-24 text-text-secondary hover:text-text-primary"
                >
                  {l.name}
                </a>
              ))}
            </nav>

            <p className="footer-disclosure-copy">
              Natural is a financial technology company, not a bank. Wallet Accounts and
              banking services are provided by Column N.A., Member FDIC.
            </p>

            <p className="fdic-disclosure-item">
              <sup className="fdic-disclosure-marker">1 </sup>Natural is a financial
              technology company, not an FDIC-insured depository institution. FDIC deposit
              insurance covers the failure of an insured depository institution. Certain
              conditions must be satisfied for pass-through FDIC insurance to apply.
              Deposits in Wallet accounts are FDIC-insured through Column N.A., Member
              FDIC, and Column’s{' '}
              <a
                href="https://column.com/legal/sweep-program-network-banks"
                target="_blank"
                rel="noopener noreferrer"
                className="fdic-disclosure-link underline"
              >
                Sweep Program Network Banks
              </a>
              .
            </p>

            <p>© 2025-2026 Natural AI, Inc.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
