import { useState } from 'react'
import FinalCta from '../components/FinalCta'

// Measured live (/about, desktop 1280x900 + mobile 390x844). Text verbatim from the
// live DOM (`.abstract-hero`, `.graphic-information-*`, `.stylized-list*`,
// `.team-chip*`, `.investor-card*`).
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

const TEXTURE_LAYERS = [
  { src: '/assets/textures/splash/paper.jpg', blend: 'multiply' },
  { src: '/assets/textures/splash/print-medium.jpg', blend: 'overlay' },
  { src: '/assets/textures/splash/scan.jpg', blend: 'screen' },
  { src: '/assets/textures/splash/grain.jpg', blend: 'soft-light' },
]

// "Natural was founded 405 days ago" is live-computed from the incorporation date
// (Aug 12, 2025) — do not hardcode a snapshot day count.
const FOUNDING_DATE = new Date('2025-08-12T00:00:00Z')
function daysAgo() {
  const now = new Date()
  const diffMs = now - FOUNDING_DATE
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)))
}

const OPPORTUNITY_ITEMS = [
  {
    number: '1',
    headline: 'This is a fundamental platform shift',
    desc: "Over the next decade, agents will execute a majority of global payment volume. We're building the rails to support it.",
  },
  {
    number: '2',
    headline: "We're early and there's no winner yet",
    desc: "There's no Stripe, Visa, or J.P. Morgan level incumbent yet. We're competing for the largest future market in payments.",
  },
  {
    number: '3',
    headline: 'The market is growing very quickly',
    desc: 'The world is quickly progressing from AI-aided to agent-native and this acceleration will only continue to be the case.',
  },
  {
    number: '4',
    headline: 'The end state is worth over $2.5T',
    desc: 'Going after banks, networks, and PSPs is, in aggregate, an assumable market of over $2.5 trillion dollars.',
  },
  {
    number: '5',
    headline: "You'll drive real impact",
    desc: 'The work you do in the next 12–18 months will set the foundation of the core product and infrastructure.',
  },
  {
    number: '6',
    headline: "You'll work with frontier customers",
    desc: "Our customers are solving some of the world's hardest technical problems. You'll work hands-on with them.",
  },
]

const TEAM = [
  { name: 'Kahlil Lalji', title: 'CEO, Co-founder', href: 'https://www.linkedin.com/in/bykahlil/' },
  { name: 'Eric Wang', title: 'CTO, Co-founder', href: 'https://www.linkedin.com/in/ericww2/' },
  { name: 'Walt Leung', title: 'CPO, Co-founder', href: 'https://www.linkedin.com/in/waltleung/' },
  { name: 'Kendall Wong', title: 'Founding Engineer', href: 'https://www.linkedin.com/in/kendall-wong/' },
  { name: 'Gabby Smith', title: 'Head of Marketing', href: 'https://www.linkedin.com/in/itsgabsmith/' },
  { name: 'Devan Patel', title: 'Founding Designer', href: 'https://www.linkedin.com/in/devanpatell/' },
  { name: 'Klaire Tan', title: 'Founding Engineer', href: 'https://www.linkedin.com/in/klaire-tan/' },
  { name: 'Bhargav Yadavalli', title: 'Founding Engineer', href: 'https://www.linkedin.com/in/bhargavy/' },
  { name: 'Natalie Charlton', title: 'Head of Legal & Compliance', href: 'https://www.linkedin.com/in/natalieecharlton/' },
  { name: 'Eric Jubber', title: 'Founding Engineer', href: 'https://www.linkedin.com/in/ericjubber/' },
  { name: 'Krish Dholakiya', title: 'Payments Engineer', href: 'https://www.linkedin.com/in/krishdholakiya/' },
  { name: 'CLI', title: 'CCRO', href: 'https://www.linkedin.com/in/cli123/' },
  { name: 'Saanvi Mehra', title: 'Software Engineer', href: 'https://www.linkedin.com/in/saanvimehra/' },
  { name: 'Emanuel Kassie', title: 'Product Designer', href: 'https://www.linkedin.com/in/emnuel/' },
  { name: 'Henry Yin', title: 'Product Designer', href: 'https://www.linkedin.com/in/henrysyin/' },
  { name: 'Chika Dueke-Eze', title: 'Software Engineer', href: 'https://www.linkedin.com/in/chika-dueke-eze/' },
  { name: 'Khush Jammu', title: 'Software Engineer', href: 'https://www.linkedin.com/in/khushjammu/' },
  { name: 'Kishan Sripada', title: 'Software Engineer', href: 'https://www.linkedin.com/in/kishansripada/' },
  { name: 'David Yi', title: 'Founding Talent', href: 'https://www.linkedin.com/in/davidyi92/' },
  { name: 'Jerry Lu', title: 'Founding GTM', href: 'https://www.linkedin.com/in/thejerrylu/' },
  { name: 'Could be you', title: 'See open roles', href: '/careers' },
]

// Same 24 verbatim investor testimonials/tints as the homepage's Investors.jsx —
// duplicated here rather than imported because this page renders them inside a
// differently-composed section (custom eyebrow/h2/copy), but the card visuals,
// classes, and geometry are byte-identical to that component.
const TESTIMONIALS = [
  { name: 'Kirsten Green', title: 'Founder, Forerunner', tint: '#001633', light: true, wide: true, category: 'firms', quote: "At Forerunner, we've spent years thinking about how the rules of financial participation get rewritten. Agents now hold that right. You won’t find a better, more responsive team to work with than Natural." },
  { name: 'Immad Akhund', title: 'CEO, Mercury', tint: '#5266eb', light: true, wide: false, category: 'individuals', quote: 'For the power of agents to be fully realized they need to be able to access payments infra. Natural makes that happen.' },
  { name: 'Henri S. and Max S.', title: 'CEO & COO, Privy', tint: '#17171f', light: true, wide: false, category: 'individuals', quote: "They're delivering real value to the agent economy fast and they're just getting started." },
  { name: 'Pete Koomen', title: 'GP, Y Combinator', tint: '#ff6600', light: true, wide: false, category: 'firms', quote: "Natural is an elegant solution to one of the most obvious problems with agents: they can't pay for things." },
  { name: 'Ramtin Naimi', title: 'Founder, Abstract', tint: '#551212', light: true, wide: true, category: 'firms', quote: 'As AI moves from demos to production, agents need money that moves at the speed of compute... Natural has rebuilt the full stack to enable intelligent systems to work in production.' },
  { name: 'Zach Abrams', title: 'CEO, Bridge', tint: '#030712', light: true, wide: false, category: 'individuals', quote: 'Agentic payments will dwarf human-initiated payments within a decade. Natural is pioneering this frontier.' },
  { name: 'Michael Tannenbaum', title: 'CEO, Figure', tint: '#5b56f5', light: true, wide: false, category: 'individuals', quote: 'Natural has the team, the vision and the execution to harness the massive opportunity in agentic payments.' },
  { name: 'Art Levy', title: 'CBO, Brex', tint: '#00070a', light: true, wide: false, category: 'individuals', quote: 'Regulation will evolve, but the shift toward agentic payments is inevitable and Natural is the clear leader.' },
  { name: 'Baris A. and Armaan A.', title: 'Co-founders, Human Capital', tint: '#ebeae5', light: false, wide: true, category: 'firms', quote: 'After knowing the team for more than five years we had no doubt on their level of ambition. We are excited to work closely with them to build the payments stack for agents.' },
  { name: 'Guillermo Rauch', title: 'CEO, Vercel', tint: '#000000', light: true, wide: false, category: 'individuals', quote: 'I invested in Natural because I believe agents will require a radical rethink of the infrastructure services of the internet.' },
  { name: 'Nichole Wischoff', title: 'Founder, Wischoff Ventures', tint: '#a43028', light: true, wide: false, category: 'firms', quote: 'The future of payments will be agent to agent and Natural will enable it. My biggest regret is not taking a call and missing the seed.' },
  { name: 'Akshay Kothari', title: 'Co-founder, Notion', tint: '#f6f5f4', light: false, wide: false, category: 'individuals', quote: "Software started as tools for humans. Now it’s becoming autonomous. Natural builds the systems that allow agents to transact reliably." },
  { name: 'Ben T. and Adam G.', title: 'Co-founders, Genius', tint: '#270708', light: true, wide: true, category: 'firms', quote: 'Natural is in a position to dominate the impending race to build the infrastructure for agentic payments. We are excited to back them from day zero and will continue to triple down at every opportunity we have.' },
  { name: 'Pablo Palafox', title: 'CEO, HappyRobot', tint: '#0e0d0c', light: true, wide: false, category: 'individuals', quote: "We’ve deployed hundreds of agents for our customers, many of which handle payments. Natural has the ability to make this extremely seamless." },
  { name: 'Paul Klein IV', title: 'CEO, Browserbase', tint: '#ff0000', light: true, wide: false, category: 'individuals', quote: 'Behind every mission-critical agent is mission-critical infrastructure. Natural is building the most reliable way for agents to transact.' },
  { name: 'Dylan Babbs', title: 'Co-founder, Profound', tint: '#000000', light: true, wide: false, category: 'individuals', quote: "If you’re building agents that need to transact in the real world, Natural is the infrastructure you use." },
  { name: 'Willem V. L. and Eric S.', title: 'Co-founders, Terrain', tint: '#eae8e4', light: false, wide: true, category: 'firms', quote: "We're pleased to have supported Kahlil and Natural from the start as they make that payments infrastructure reliable and beautifully designed to use." },
  { name: 'Isaiah Granet', title: 'CEO, Bland', tint: '#ca071a', light: true, wide: false, category: 'individuals', quote: "When you meet the team at Natural, it’s obvious they’re the right people to build the economic layer for agents." },
  { name: 'Itai Damti', title: 'CEO, Unit', tint: '#000000', light: true, wide: false, category: 'individuals', quote: 'Software and money are merging, and agents are redefining everything we know about software.' },
  { name: 'Matt Michaelis', title: 'CEO, Emprise Bank', tint: '#002d3f', light: true, wide: false, category: 'individuals', quote: "As a banker and an investor, I've rarely seen a team this well-positioned to own a category this inevitable." },
  { name: 'Ryan F. and Tyler G.', title: 'Co-founders, Restive', tint: '#f6f6f0', light: false, wide: true, category: 'firms', quote: 'AI financial services will be a $1 trillion revenue market in ten years. We expect Natural to support a significant portion of that economy.' },
  { name: 'Darragh Buckley', title: 'CEO, Increase', tint: '#f2f3f5', light: false, wide: false, category: 'individuals', quote: 'Natural is building the infrastructure to make autonomous payments safe, seamless, and ready for real-world use.' },
  { name: 'Matteo Franceschetti', title: 'CEO, Eight Sleep', tint: '#000000', light: true, wide: false, category: 'individuals', quote: 'The internet is shifting from humans operating software to software operating itself. Natural makes that financially possible.' },
  { name: 'Chris Harper', title: 'Partner, Torch', tint: '#ff0000', light: true, wide: true, category: 'firms', quote: 'We’re moving toward a world where agents transact autonomously at global scale. Those agents need identity, governance, and trust. Natural is building all three from the ground up.' },
]

const FILTERS = ['All', 'Firms', 'Individuals']

function LogoMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function About() {
  const [filter, setFilter] = useState('All')
  const isVisible = (t) => filter === 'All' || t.category === filter.toLowerCase()

  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[420px] flex-col items-center px-32 py-0 md:min-h-[588px] md:px-40">
        <div className="flex w-full max-w-[1200px] flex-col items-center gap-80 pt-120 text-center">
          <h1
            style={{ color: 'rgb(17,20,0)' }}
            className="max-w-[560px] text-[24px] leading-32 font-[360] tracking-[-0.8px] md:text-[40px] md:leading-56"
          >
            We make money movement feel effortless
          </h1>
          <div className="flex items-center gap-12">
            <a
              href="/careers"
              className="flex items-center justify-center gap-12 rounded-pill bg-background-button px-16 py-6 text-[15px] leading-24 text-text-on-color transition-colors duration-100 ease-out hover:bg-background-button-hover"
            >
              <p>View careers</p>
              <ArrowForwardIcon size={12} />
            </a>
            <a
              href="mailto:founders@natural.com"
              className="flex items-center justify-center gap-12 rounded-pill px-16 py-6 text-[15px] leading-24 text-text-primary hover:bg-background-hover"
            >
              Email the team
            </a>
          </div>
        </div>
      </section>

      {/* Splash + founding story — mid-page splash, not the final one. Live stacks the
          full-width image ABOVE a details row (not side-by-side): the details row is
          itself a left "lead" (h2, 680px) + right "content" (body + link, 480px) split
          on desktop, both stacked full-width on mobile. */}
      <section className="flex flex-col items-center px-32 py-120 md:px-40">
        <div className="flex w-full max-w-[1200px] flex-col gap-80">
          <div className="relative h-[400px] w-full overflow-hidden md:h-[640px]">
            <img
              src="/assets/images/brand/nature-desk.jpg"
              alt="A desk overlooking the California coast"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0" aria-hidden="true">
              {TEXTURE_LAYERS.map((layer) => (
                <img
                  key={layer.src}
                  src={layer.src}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ mixBlendMode: layer.blend, opacity: 0.25 }}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-40 md:flex-row md:items-start">
            {/* Live's `.graphic-information-lead` wrapper has a fixed 24px height on
                mobile with overflow:visible — the 2-line h2 text visually overflows it
                (a quirk in the original), but the LAYOUT gap to the next block is
                measured from that 24px box, not the h2's real 56px height. Reproduced
                here with an explicit mobile-only h-24 wrapper so spacing matches. */}
            <div className="h-24 overflow-visible md:h-auto md:w-[680px] md:shrink-0">
              <h2 className="text-[20px] leading-28 font-normal text-text-primary md:text-[32px] md:leading-40">
                Natural was founded
                <br />
                {daysAgo()} days ago
              </h2>
            </div>
            <div className="flex flex-col gap-40 md:w-[480px] md:shrink-0 md:gap-80">
              <div className="flex flex-col gap-20 text-[15px] leading-24 text-text-primary">
                <p>
                  The company was incorporated on August 12th, 2025, inspired by a 15-page memo Kahlil wrote that
                  summer. It was a bold vision for what the world would become.
                </p>
                <p>
                  Within 72 hours of sharing the memo, Natural raised a $10M seed round from the best investors in
                  technology and financial services.
                </p>
                <p>
                  At the time, Natural was simply words on paper. We had conviction that the shift ahead was
                  inevitable, and were committed to building the company that would shape it.
                </p>
              </div>
              <a
                href="/blog/agentic-payments-memo"
                className="flex w-fit items-center justify-center gap-12 rounded-pill bg-background-button px-16 py-6 text-[15px] leading-24 text-text-on-color transition-colors duration-100 ease-out hover:bg-background-button-hover"
              >
                <p>The original memo</p>
                <ArrowForwardIcon size={12} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunity */}
      <section className="flex flex-col items-center px-32 py-120 md:px-40">
        <div className="w-full max-w-[1200px]">
          <p className="eyebrow">Opportunity</p>
          <h2 className="section-h2 mt-12 text-text-primary">
            The largest market
            <br />
            payments has ever seen
          </h2>
          <div className="mt-80 flex flex-col gap-40">
            {OPPORTUNITY_ITEMS.map((item) => (
              <div key={item.number} className="flex flex-col gap-12 md:flex-row md:items-start md:gap-[120px]">
                <div className="flex items-center gap-8 md:w-[320px] md:shrink-0">
                  <span className="text-[15px] leading-24 text-text-primary">{item.number}</span>
                  <span className="text-[15px] leading-24 text-text-primary">{item.headline}</span>
                </div>
                <div className="hidden h-[1px] w-[320px] shrink-0 bg-[rgb(236,236,235)] md:mt-12 md:block" />
                <p className="pl-40 text-[15px] leading-24 text-text-secondary md:w-[320px] md:shrink-0 md:pl-0">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="flex flex-col items-center px-32 py-120 md:px-40">
        <div className="w-full max-w-[1200px]">
          <p className="eyebrow">Team</p>
          <h2 className="section-h2 mt-12 text-text-primary">
            Today, the team is 20 people.
            <br />
            All based in San Francisco
          </h2>
          <div className="mt-80 flex flex-col gap-40 md:gap-80">
            {Array.from({ length: 7 }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex flex-col gap-40 md:flex-row">
                {TEAM.slice(rowIndex * 3, rowIndex * 3 + 3).map((person, i) => (
                  <a
                    key={person.name}
                    href={person.href}
                    target={person.href.startsWith('http') ? '_blank' : undefined}
                    rel={person.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex h-56 shrink-0 flex-col justify-between md:flex-1"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-[15px] leading-24 text-text-primary">{person.name}</p>
                      <span className="text-[15px] leading-24 text-text-secondary">
                        {String(rowIndex * 3 + i + 1).padStart(3, '0')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[15px] leading-24 text-text-secondary">{person.title}</p>
                      <ArrowForwardIcon size={10} />
                    </div>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investors */}
      <section className="investors-section flex flex-col items-center px-32 py-120 md:px-40">
        <div className="w-full max-w-[1200px]">
          <p className="eyebrow">Investors</p>
          <h2 className="section-h2 mt-12 text-text-primary">
            Backed by the best investors and operators in fintech
          </h2>

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
        </div>
      </section>

      <FinalCta />
    </>
  )
}

export default About
