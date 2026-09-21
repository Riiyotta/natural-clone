import FinalCta from '../components/FinalCta'

// Measured live (/careers, desktop 1280x900 + mobile 390x844). Text verbatim from the
// live DOM (`.abstract-hero`, `.graphic-information-*`, `.team-card*`,
// `.stylized-list*`, `.perks-*`, `.open-roles-*`).
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

function LogoMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-text-primary">
      <path
        d="M1.43 23.77H22.57C23.23 23.77 23.6 23.44 23.6 22.73V1.27C23.6 0.61 23.23 0.23 22.57 0.23H1.43C0.73 0.23 0.4 0.61 0.4 1.27V22.73C0.4 23.44 0.73 23.77 1.43 23.77Z"
        fill="currentColor"
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

const TEAM_CARDS = [
  { name: 'Jerry Lu', role: 'Founding GTM', img: '/assets/images/blog/why-jerry-joined-natural/jerry-blog-hero.jpg', quote: "The next generation of applications will be built on primitives that are being decided right now, and the cost of watching that happen from the outside was higher than the cost of being wrong.", footer: 'Jerry joins Natural from Maveron', href: '/blog/why-jerry-joined-natural' },
  { name: 'David Yi', role: 'Founding Talent', img: '/assets/images/blog/why-david-joined-natural/david-blog-hero.jpg', quote: 'As the first person Natural has brought on to focus on recruiting, the job as I see it is to keep finding the people who belong in the combination, the ones who fit the archetype and the culture at once, and to hold the signal high as the room fills.', footer: 'David joins Natural from Ramp', href: '/blog/why-david-joined-natural' },
  { name: 'Kishan Sripada', role: 'Software Engineer', img: '/assets/images/blog/why-kishan-joined-natural/kishan-blog-hero.jpg', quote: "Economics assumes we're rational actors, which we're not. But now we get to build them—and get back to making decisions that matter.", footer: 'Kishan joins Natural from Orange Slice (YC S25)', href: '/blog/why-kishan-joined-natural' },
  { name: 'Khush Jammu', role: 'Software Engineer', img: '/assets/images/blog/why-khush-joined-natural/khush-blog-hero.jpg', quote: 'Beyond the fun problems, I was most impressed by the team. Despite being a small group with an unreasonable amount of work, everyone was very generous with their time.', footer: 'Khush joins Natural from the University of Chicago', href: '/blog/why-khush-joined-natural' },
  { name: 'Chika Dueke-Eze', role: 'Software Engineer', img: '/assets/images/blog/why-chika-joined-natural/chika-blog-hero.jpg', quote: 'What stood out just as much was the level of care, meticulousness, kindness, and empathy the team operates with, in everything from the software being built to the human interactions being had.', footer: 'Chika joins Natural from Notion', href: '/blog/why-chika-joined-natural' },
  { name: 'Henry Yin', role: 'Product Designer', img: '/assets/images/blog/why-henry-joined-natural/henry-blog-hero.jpg', quote: 'The kid who once camped overnight on the concrete sidewalks of Sydney for a pair of Jordans is now helping build the rails that let money move at the speed of the future.', footer: 'Henry joins Natural from Superpower', href: '/blog/why-henry-joined-natural' },
  { name: 'Emanuel Kassie', role: 'Product Designer', img: '/assets/images/blog/why-emanuel-joined-natural/emanuel-blog-hero.jpg', quote: 'What pushed me into the second week was simply the gift of starting this early — the product becomes an extension of you, your vision, your beliefs, and even some of your quirks.', footer: 'Emanuel joins Natural from Instagram', href: '/blog/why-emanuel-joined-natural' },
  { name: 'Saanvi Mehra', role: 'Software Engineer', img: '/assets/images/blog/why-saanvi-joined-natural/saanvi-blog-hero.jpg', quote: 'An economy only functions if the actors inside it can operate from convergent assumptions about incentives, adversarial behaviour, and truth.', footer: 'Saanvi joins Natural from Blockchain Capital', href: '/blog/why-saanvi-joined-natural' },
  { name: 'Krish Dholakiya', role: 'Payments Engineer', img: '/assets/images/blog/why-krish-joined-natural/krish-blog-hero.jpg', quote: 'Money movement rails—virtual heavy machinery—are only safe to operate if integrated well enough with those chaotic systems. A lack of safety—and therefore of trust—doesn’t just mean things blowing up: it means transactions that will never be attempted, and counterparties who won’t bother participating. Humans already bring novelty and chaos; there’s a lot of work required to get them to transact with each other at scale. Agents would be a step-change increase. This, I realized, was the core insight at Natural, and I wanted to work on it.', footer: 'Krish joins Natural from Ramp', href: '/blog/why-krish-joined-natural' },
  { name: 'Eric Jubber', role: 'Founding Engineer', img: '/assets/images/blog/why-eric-joined-natural/eric-blog-hero.jpg', quote: 'There was one quality I needed to feel from every person there. That each of them desperately wanted Natural to win. Not in a polite, professional way, but in a maniacal, obsessive way.', footer: 'Eric joins Natural from Superpower', href: '/blog/why-eric-joined-natural' },
  { name: 'Bhargav Yadavalli', role: 'Founding Engineer', img: '/assets/images/blog/why-bhargav-joined-natural/bhargav-blog-hero.jpg', quote: 'In truth, a place like Natural embraces someone who takes pride in precision and constantly sharpens their skills. Natural embraces the craftsman.', footer: 'Bhargav joins Natural from Method', href: '/blog/why-bhargav-joined-natural' },
  { name: 'Natalie Charlton', role: 'Head of Legal & Compliance', img: '/assets/images/blog/why-natalie-joined-natural/natalie-blog-hero.jpg', quote: "Logistical hurdles are just decisions to make and actions to execute, two specialties of mine. There are only so many 'I'm game' moments in life.", footer: 'Natalie joins Natural from Stripe', href: '/blog/why-natalie-joined-natural' },
  { name: 'Klaire Tan', role: 'Founding Engineer', img: '/assets/images/blog/i-do-not-read-hacker-news/klaire-blog-hero.jpg', quote: "When I think about the system I'm building, at replaying events, at complete traceability, I go to bed hungry and I wake up ravenous.", footer: 'Klaire joins Natural from Nextdoor', href: '/blog/why-klaire-joined-natural' },
  { name: 'Kendall Wong', role: 'Founding Engineer', img: '/assets/images/blog/why-kendall-joined-natural/kendall-blog-hero.jpg', quote: "Agent adoption has exploded, and the next step is moving money with them. The question isn't whether someone builds this—it's who builds it best, and who builds it fastest.", footer: 'Kendall joins Natural from Thera', href: '/blog/why-kendall-joined-natural' },
  { name: 'Devan Patel', role: 'Founding Designer', img: '/assets/images/blog/why-devan-joined-natural/devan-blog-hero.jpg', quote: "This is the team I want to be on at this point in my career. And this is the company I will do my life's work at.", footer: 'Devan joins Natural from Method', href: '/blog/why-devan-joined-natural' },
  { name: 'Gabby Smith', role: 'Head of Marketing', img: '/assets/images/blog/why-gabby-joined-natural/gabby-blog-hero.jpg', quote: "The moment I shared my initial concepts, all hesitation disappeared. The team wasn't just supportive, they were excited. My 'outsider' lens was actually a superpower.", footer: 'Gabby joins Natural from Alo & Rhode', href: '/blog/why-gabby-joined-natural' },
]

const VALUES = [
  { number: '1', headline: "We're playing to win", desc: "We're not in this to be runner-up, we're playing to win. We treat our company like a sports team, not a family." },
  { number: '2', headline: 'Slope and intellect over everything', desc: 'You’re smart, learn quickly, and care deeply about your work. We hire people who want to be the best at what they do.' },
  { number: '3', headline: 'Every detail matters', desc: 'Everything from API design to email signatures to divider weight matters. An unintentional decision is a poor one.' },
  { number: '4', headline: 'In-person, in-office culture', desc: "Speed and team cohesion lead to success. We're in-person, in-office, in San Francisco, six days per week." },
  { number: '5', headline: 'No ego, the right ideas prevail', desc: "It's not about seniority or protecting ego. We debate openly and push towards intellectual truth." },
  { number: '6', headline: 'Do the best work of your career', desc: "You should be excited to put your name on your work. This should be the best work you've ever done." },
]

const PERK_PARTNERS = [
  { name: 'Equinox Destination', logo: '/images/careers/equinox-logo.png', w: 148, h: 28 },
  { name: 'Whoop 5.0 Band', logo: '/images/careers/whoop-logo.svg', w: 118, h: 19 },
  { name: 'Eight Sleep Pod 5', logo: '/images/careers/eight-sleep-logo.svg', w: 62, h: 26 },
]

const PERK_ROWS = [
  [
    { title: 'Blood testing', subtitle: 'From Superpower' },
    { title: 'Lunch & dinner', subtitle: 'Covered in the office' },
    { title: 'Transportation', subtitle: '$415/month' },
  ],
  [
    { title: 'Competitive comp', subtitle: '90th+ percentile' },
    { title: '401K + match', subtitle: '4% of your contributions' },
    { title: 'Flexible exercise', subtitle: 'Early & extended' },
  ],
  [
    { title: 'Relocation benefits', subtitle: "We'll help you move" },
    { title: 'Best gear', subtitle: 'M4 Max, Studio Display, etc.' },
    { title: 'Full insurance coverage', subtitle: 'Health, dental, vision' },
  ],
  [
    { title: 'Unlimited PTO', subtitle: 'Recharge whenever' },
    { title: 'Regular team retreats', subtitle: 'Yosemite, Santa Ynez, etc.' },
    { title: 'Beautiful office', subtitle: 'Lots of Natural light' },
  ],
]

const OPEN_ROLES = [
  {
    department: 'Engineering',
    roles: [
      { title: 'Product Engineer', subtitle: 'General', href: '/careers/product-engineer' },
      { title: 'Product Engineer', subtitle: 'Agent Identity & Observability', href: '/careers/product-engineer-agent-identity-observability' },
      { title: 'Product Engineer', subtitle: 'Risk & Credit', href: '/careers/product-engineer-risk-credit' },
      { title: 'Data Engineer', href: '/careers/data-engineer' },
      { title: 'Design Engineer', href: '/careers/design-engineer' },
      { title: 'Infrastructure Engineer', href: '/careers/infrastructure-engineer' },
      { title: 'Core Payments Engineer', href: '/careers/core-payments-engineer' },
      { title: 'Developer Relations Engineer', href: '/careers/developer-relations-engineer' },
    ],
  },
  {
    department: 'Design',
    roles: [
      { title: 'Product Designer', subtitle: 'General', href: '/careers/product-designer' },
      { title: 'Product Designer', subtitle: 'Agents', href: '/careers/product-designer-agents' },
    ],
  },
  {
    department: 'Marketing',
    roles: [
      { title: 'Agent Marketer', href: '/careers/agent-marketer' },
      { title: 'Content Lead', subtitle: 'Video', href: '/careers/content-lead-video' },
    ],
  },
  {
    department: 'GTM',
    roles: [
      { title: 'Founding GTM', subtitle: 'Startups', href: '/careers/founding-gtm-startups' },
      { title: 'Founding GTM', subtitle: 'Strategic Partnerships', href: '/careers/founding-gtm-strategic-partnerships' },
    ],
  },
  {
    department: 'Operations',
    roles: [
      { title: 'AML Operations', href: '/careers/aml-operations' },
      { title: 'Head of Finance', href: '/careers/head-of-finance' },
      { title: 'Founding Recruiter', href: '/careers/founding-recruiter' },
      { title: 'Executive Assistant', href: '/careers/executive-assistant' },
    ],
  },
  {
    department: 'Other',
    roles: [{ title: 'Open Application', href: '/careers/open-application' }],
  },
]

// "19" open roles — computed from the OPEN_ROLES data above, not a hardcoded
// snapshot, so it stays in sync if roles are added/removed.
const OPEN_ROLES_COUNT = OPEN_ROLES.reduce((sum, dept) => sum + dept.roles.length, 0)

function Careers() {
  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[420px] flex-col items-center px-32 py-0 md:min-h-[588px] md:px-40">
        <div className="flex w-full max-w-[1200px] flex-col items-center gap-80 pt-120 text-center">
          <h1
            style={{ color: 'rgb(17,20,0)' }}
            className="max-w-[560px] text-[24px] leading-32 font-[360] tracking-[-0.8px] md:text-[40px] md:leading-56"
          >
            We’re designers, engineers, and craftspeople
          </h1>
          <a
            href="#open-roles"
            className="flex items-center justify-center gap-12 rounded-pill bg-background-button px-16 py-6 text-[15px] leading-24 text-text-on-color transition-colors duration-100 ease-out hover:bg-background-button-hover"
          >
            <p>Jump to open roles</p>
            <ArrowForwardIcon size={12} />
          </a>
        </div>
      </section>

      {/* Splash + story */}
      <section className="flex flex-col items-center px-32 py-120 md:px-40">
        <div className="flex w-full max-w-[1200px] flex-col gap-80">
          <div className="relative h-[400px] w-full overflow-hidden md:h-[640px]">
            <img
              src="/assets/images/team/team-image.jpg"
              alt="The Natural team working together outdoors"
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
            <div className="h-24 overflow-visible md:h-auto md:w-[640px] md:shrink-0">
              <LogoMark />
            </div>
            <div className="flex flex-col gap-20 text-[15px] leading-24 text-text-primary md:w-[480px] md:shrink-0">
              <p>
                We're making it easy for agents to transact. We imagine a world where payments between humans and
                agents are indistinguishable.
              </p>
              <p>
                Our team so far is 20 people. We're all based in San Francisco with many of us having moved from
                New York and Los Angeles.
              </p>
              <p>
                We believe the only way a high-performance culture wins is if people commit toward a shared mission.
                We're not in this to be runner-up, we're in it to be the best and that's it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team quote cards */}
      <section className="flex flex-col items-center px-32 py-120 md:px-40">
        <div className="w-full max-w-[1200px]">
          <p className="eyebrow">Team</p>
          <h2 className="section-h2 mt-12 text-text-primary">
            The team shaping the future
            <br />
            of payments
          </h2>
          <div
            className="mt-60 flex gap-20 overflow-x-auto"
            style={{ scrollbarWidth: 'none' }}
          >
            {TEAM_CARDS.map((person) => (
              <a
                key={person.name}
                href={person.href}
                className="flex w-[335px] shrink-0 flex-col overflow-hidden rounded-sm border border-card-border md:w-[580px]"
              >
                <div className="h-[240px] w-full overflow-hidden">
                  <img src={person.img} alt={person.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col gap-24 p-24 md:gap-40 md:p-40">
                  <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between md:gap-8">
                    <p className="text-[15px] leading-24 text-text-primary">{person.name}</p>
                    <p className="text-[15px] leading-24 text-text-secondary">{person.role}</p>
                  </div>
                  <p className="line-clamp-4 text-[15px] leading-24 text-text-secondary md:line-clamp-3">
                    {person.quote}
                  </p>
                  <div className="flex items-center gap-8">
                    <p className="text-[15px] leading-24 text-text-primary">{person.footer}</p>
                    <ArrowForwardIcon size={10} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="flex flex-col items-center px-32 py-120 md:px-40">
        <div className="w-full max-w-[1200px]">
          <p className="eyebrow">Values</p>
          <h2 className="section-h2 mt-12 text-text-primary">
            Anchored in strong beliefs
            <br />
            and principles
          </h2>
          <div className="mt-80 flex flex-col gap-40">
            {VALUES.map((item) => (
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

      {/* Perks */}
      <section className="flex flex-col items-center px-32 pb-240 pt-120 md:px-40">
        <div className="w-full max-w-[1200px]">
          <p className="eyebrow">Perks</p>
          <h2 className="section-h2 mt-12 max-w-[480px] text-text-primary">
            The only startup that treats you like an athlete
          </h2>
          <p className="mt-80 max-w-[480px] text-[15px] leading-24 text-text-secondary">
            Performance is at the heart of our culture, which is why we've designed some of the most performance and
            wellness focused company benefits you'll find anywhere.
          </p>

          <div className="mt-80 flex flex-col gap-40 md:flex-row md:gap-[120px]">
            {PERK_PARTNERS.map((p) => (
              <div key={p.name} className="flex flex-col gap-24">
                <img src={p.logo} alt={p.name} width={p.w} height={p.h} />
                <p className="text-[15px] leading-24 text-text-secondary">{p.name}</p>
              </div>
            ))}
          </div>

          <div className="mt-40 flex flex-col gap-40 md:mt-80 md:gap-80">
            {PERK_ROWS.map((row, i) => (
              <div key={i} className="flex flex-col gap-40 md:grid md:grid-cols-3 md:gap-[120px]">
                {row.map((perk) => (
                  <div key={perk.title} className="flex flex-col gap-6">
                    <p className="text-[15px] leading-24 text-[rgb(17,20,0)]">{perk.title}</p>
                    <p className="text-[15px] leading-24 text-text-secondary">{perk.subtitle}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section id="open-roles" className="flex flex-col items-center bg-background-hover px-32 py-120 md:px-40">
        <div className="flex w-full max-w-[1200px] flex-col gap-40 md:flex-row">
          <div className="flex items-baseline gap-12 md:w-[580px] md:shrink-0">
            <h2 className="section-h2 text-text-primary">Open Roles</h2>
            <h2 className="section-h2 text-text-secondary">{OPEN_ROLES_COUNT}</h2>
          </div>
          <div className="flex flex-1 flex-col gap-40">
            {OPEN_ROLES.map((dept) => (
              <div key={dept.department} className="flex flex-col gap-24">
                <p className="text-[15px] leading-24 text-[rgb(136,137,128)]">{dept.department}</p>
                {dept.roles.map((role) => (
                  <a
                    key={role.href}
                    href={role.href}
                    className="text-[15px] leading-24 text-text-primary hover:text-text-secondary"
                  >
                    {role.title}
                    {role.subtitle && (
                      <>
                        ,{' '}
                        <span className="text-[15px] leading-24 text-[rgb(136,137,128)]">{role.subtitle}</span>
                      </>
                    )}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Measured live: /careers gives the CTA block 240px vertical padding rather
          than the 80px the shared component uses elsewhere (652px vs 532px tall).
          Scoped here via a wrapper class so FinalCta itself stays untouched. */}
      <div className="careers-cta">
        <FinalCta />
      </div>
    </>
  )
}

export default Careers
