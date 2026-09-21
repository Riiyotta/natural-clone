import { useState } from 'react'

// Measured live (/blog, desktop 1280x900 + mobile 390x844). All 33 posts render in the
// initial DOM (no pagination/load-more, confirmed live). Text verbatim from the live
// DOM (`.hero-blog`, `.blog-entry`, `.entry-cta`).
function ArrowForwardIcon({ size = 20 }) {
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

const FEATURED = {
  title: 'Unapologetically non-normal',
  href: '/blog/why-jerry-joined-natural',
  img: '/assets/images/blog/why-jerry-joined-natural/jerry-blog-hero.jpg',
  date: 'September 14, 2026',
  author: 'Jerry Lu',
  category: 'Team',
}

const POSTS = [
  { title: 'Unapologetically non-normal', desc: 'Jerry Lu joins Natural as Founding GTM hire from Maveron', author: 'Jerry Lu', date: 'September 14, 2026', img: '/assets/images/blog/why-jerry-joined-natural/jerry-blog-hero.jpg', href: '/blog/why-jerry-joined-natural' },
  { title: 'Something out of nothing', desc: 'David Yi joins Natural as Founding Talent hire from Ramp', author: 'David Yi', date: 'August 31, 2026', img: '/assets/images/blog/why-david-joined-natural/david-blog-hero.jpg', href: '/blog/why-david-joined-natural' },
  { title: 'Rational actors', desc: 'Kishan Sripada joins Natural as an Engineer from Orange Slice (YC S25)', author: 'Kishan Sripada', date: 'August 24, 2026', img: '/assets/images/blog/why-kishan-joined-natural/kishan-blog-hero.jpg', href: '/blog/why-kishan-joined-natural' },
  { title: '$100M in credit to scale payments for AI agents', desc: "Today we're announcing Natural's $100M credit facility to scale payments for AI agents.", author: 'Kahlil Lalji', date: 'August 19, 2026', img: '/assets/images/blog/100m-credit-facility/100m-credit-facility-hero.jpg', href: '/blog/100m-credit-facility' },
  { title: 'Truth seeking, a new paradigm', desc: 'Khush Jammu joins Natural as an Engineer from the University of Chicago', author: 'Khush Jammu', date: 'August 17, 2026', img: '/assets/images/blog/why-khush-joined-natural/khush-blog-hero.jpg', href: '/blog/why-khush-joined-natural' },
  { title: 'Agentic payments, revisited', desc: 'One year of building at the frontier of agentic payments.', author: 'Kahlil Lalji', date: 'August 12, 2026', img: '/assets/images/blog/agentic-payments-revisited/agentic-payments-revisited-hero.jpg', href: '/blog/agentic-payments-revisited' },
  { title: '$30M to build paymentsfor AI agents', desc: "Today we're excited to announce Natural's $30M Series A to build payments for AI agents.", author: 'Kahlil Lalji', date: 'July 20, 2026', img: '/assets/images/blog/natural-series-a/natural-series-a-hero.jpg', href: '/blog/natural-series-a' },
  { title: 'Déjà vu', desc: 'Chika Dueke-Eze joins Natural as a Software Engineer from Notion', author: 'Chika Dueke-Eze', date: 'June 29, 2026', img: '/assets/images/blog/why-chika-joined-natural/chika-blog-hero.jpg', href: '/blog/why-chika-joined-natural' },
  { title: 'Beautiful things', desc: 'Henry Yin joins Natural as a Product Designer', author: 'Henry Yin', date: 'June 15, 2026', img: '/assets/images/blog/why-henry-joined-natural/henry-blog-hero.jpg', href: '/blog/why-henry-joined-natural' },
  { title: 'Open waters', desc: 'Emanuel Kassie joins Natural as a Product Designer from Instagram', author: 'Emanuel Kassie', date: 'June 1, 2026', img: '/assets/images/blog/why-emanuel-joined-natural/emanuel-blog-hero.jpg', href: '/blog/why-emanuel-joined-natural' },
  { title: 'Lucky #13', desc: 'Saanvi Mehra joins Natural from Blockchain Capital', author: 'Saanvi Mehra', date: 'May 22, 2026', img: '/assets/images/blog/why-saanvi-joined-natural/saanvi-blog-hero.jpg', href: '/blog/why-saanvi-joined-natural' },
  { title: 'CLI joins Natural as Chief Compliance and Regulatory Officer', desc: 'Building the compliance foundation for agentic payments', author: 'Kahlil Lalji', date: 'April 21, 2026', img: '/assets/images/blog/cli-joins-natural/cli-joins-natural-hero.jpg', href: '/blog/cli-joins-natural' },
  { title: 'Money on the internet', desc: 'Krish Dholakiya joins Natural as a Payments Engineer from Ramp', author: 'Krish Dholakiya', date: 'April 13, 2026', img: '/assets/images/blog/why-krish-joined-natural/krish-blog-hero.jpg', href: '/blog/why-krish-joined-natural' },
  { title: 'Natural moguls', desc: 'What mogul skiing taught me about building companies', author: 'Walt Leung', date: 'April 7, 2026', img: '/assets/images/blog/natural-moguls/natural-moguls-hero.jpg', href: '/blog/natural-moguls' },
  { title: 'Resilient', desc: 'Scale with confidence', author: 'Gabby Smith', date: 'March 30, 2026', img: '/assets/images/blog/resilient/resilient-hero.jpg', href: '/blog/resilient' },
  { title: 'Six months in agentic payments', desc: 'Learnings from the first six months in a brand new category', author: 'Kahlil Lalji', date: 'March 27, 2026', img: '/assets/images/blog/six-months-in-agentic-payments/six-months-in-agentic-payments-hero.jpg', href: '/blog/six-months-in-agentic-payments' },
  { title: 'Expansive', desc: 'Support infinite growth', author: 'Gabby Smith', date: 'March 24, 2026', img: '/assets/images/blog/expansive/expansive-hero.jpg', href: '/blog/expansive' },
  { title: 'Unmapped', desc: "Designing a category that doesn't exist yet", author: 'Devan Patel', date: 'March 23, 2026', img: '/assets/images/blog/unmapped/unmapped-hero.jpg', href: '/blog/unmapped' },
  { title: 'Imperative mood', desc: 'How Natural makes agent-led workflows (actually) useful', author: 'Natalie Charlton', date: 'March 19, 2026', img: '/assets/images/blog/imperative-mood/imperative-mood-hero.jpg', href: '/blog/imperative-mood' },
  { title: 'Fluid', desc: 'Move at agent speed', author: 'Gabby Smith', date: 'March 17, 2026', img: '/assets/images/blog/fluid/fluid-hero.jpg', href: '/blog/fluid' },
  { title: 'Intelligent', desc: 'Making complexity disappear', author: 'Gabby Smith', date: 'March 12, 2026', img: '/assets/images/blog/intelligent/intelligent-hero.jpg', href: '/blog/intelligent' },
  { title: 'Natural brand manifesto', desc: 'Where currency’s hidden complexity meets nature’s quiet permanence', author: 'Devan Patel', date: 'March 11, 2026', img: '/assets/images/blog/natural-brand-manifesto/natural-brand-manifesto-hero.jpg', href: '/blog/natural-brand-manifesto' },
  { title: 'Introducing Natural', desc: 'Natural is the agentic payments platform powering frictionless money movement between agents, businesses, and consumers', author: 'Kahlil Lalji', date: 'March 10, 2026', img: '/assets/images/blog/introducing-natural/introducing-natural-hero.jpg', href: '/blog/introducing-natural' },
  { title: 'The team I want to have dinner with', desc: 'Eric Jubber joins Natural as a Founding Engineer from Superpower', author: 'Eric Jubber', date: 'March 2, 2026', img: '/assets/images/blog/why-eric-joined-natural/eric-blog-hero.jpg', href: '/blog/why-eric-joined-natural' },
  { title: "The craftsman's journey", desc: 'Bhargav Yadavalli joins Natural as a Founding Engineer from Method', author: 'Bhargav Yadavalli', date: 'February 24, 2026', img: '/assets/images/blog/why-bhargav-joined-natural/bhargav-blog-hero.jpg', href: '/blog/why-bhargav-joined-natural' },
  { title: 'I’m game', desc: 'Natalie Charlton joins Natural as the Head of Legal and Compliance from Stripe', author: 'Natalie Charlton', date: 'February 16, 2026', img: '/assets/images/blog/why-natalie-joined-natural/natalie-blog-hero.jpg', href: '/blog/why-natalie-joined-natural' },
  { title: 'I do not read Hacker News', desc: 'Klaire Tan joins Natural as a Founding Engineer from Nextdoor', author: 'Klaire Tan', date: 'January 7, 2026', img: '/assets/images/blog/i-do-not-read-hacker-news/klaire-blog-hero.jpg', href: '/blog/why-klaire-joined-natural' },
  { title: 'Honor the work', desc: 'Three words with a disproportionate amount of meaning', author: 'Kahlil Lalji', date: 'January 5, 2026', img: '/assets/images/blog/honor-the-work/honor-the-work-hero.jpg', href: '/blog/honor-the-work' },
  { title: 'Right team, right timing, right challenge', desc: 'Kendall Wong joins Natural as a Founding Engineer from Thera (YC S22)', author: 'Kendall Wong', date: 'December 18, 2025', img: '/assets/images/blog/why-kendall-joined-natural/kendall-blog-hero.jpg', href: '/blog/why-kendall-joined-natural' },
  { title: 'Layers of conviction', desc: 'Devan Patel joins Natural as a Founding Designer from Method', author: 'Devan Patel', date: 'December 1, 2025', img: '/assets/images/blog/why-devan-joined-natural/devan-blog-hero.jpg', href: '/blog/why-devan-joined-natural' },
  { title: 'Leggings to lipgloss to ledgers', desc: 'Gabby Smith joins Natural as the Head of Marketing from Rhode', author: 'Gabby Smith', date: 'November 19, 2025', img: '/assets/images/blog/why-gabby-joined-natural/gabby-blog-hero.jpg', href: '/blog/why-gabby-joined-natural' },
  { title: '$9.8M to build payments for AI agents', desc: "Today we're excited to announce Natural, our $9.8M seed round, and commitment to building the best payments ecosystem for agents", author: 'Kahlil Lalji', date: 'October 23, 2025', img: '/assets/images/blog/natural-seed-round/natural-seed-round-hero.jpg', href: '/blog/natural-seed-round' },
  { title: 'Agentic payments memo', desc: 'When exploring what I wanted to work on next, I wrote this 15-page memo on agentic payments', author: 'Kahlil Lalji', date: 'October 23, 2025', img: '/assets/images/blog/agentic-payments-memo/agentic-payments-memo-hero.jpg', href: '/blog/agentic-payments-memo' },
]

const FILTERS = ['All', 'Team', 'Natural', 'Research']

function BlogPage() {
  const [filter, setFilter] = useState('All')

  return (
    <>
      {/* Hero — featured post */}
      <section className="flex flex-col items-center px-32 py-120 md:px-40">
        <a href={FEATURED.href} className="flex w-full max-w-[1200px] flex-col gap-24 md:gap-40">
          <h1 className="max-w-[560px] text-[24px] leading-32 font-[360] tracking-[-0.8px] text-text-primary md:text-[40px] md:leading-56">
            {FEATURED.title}
          </h1>
          <div className="aspect-[16/9] w-full overflow-hidden rounded-md md:aspect-[1200/600]">
            <img src={FEATURED.img} alt={FEATURED.title} className="h-full w-full object-cover" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8 text-[15px] leading-24 text-text-secondary">
              <span>{FEATURED.date}</span>
              <span>{FEATURED.author}</span>
            </div>
            <span className="text-[15px] leading-24 text-text-secondary">{FEATURED.category}</span>
          </div>
        </a>
      </section>

      {/* Post list */}
      <section className="flex flex-col items-center px-32 py-80 md:px-40">
        <div className="w-full max-w-[720px]">
          <div className="flex items-center" role="tablist" aria-label="Filter blog posts">
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

          <div className="mt-40 flex flex-col gap-40 md:mt-80 md:gap-80">
            {POSTS.map((post) => (
              <a key={post.href} href={post.href} className="flex flex-col gap-20 md:flex-row md:gap-40">
                <div className="aspect-[16/9] w-full shrink-0 overflow-hidden rounded-md md:aspect-auto md:h-[160px] md:w-[320px]">
                  <img src={post.img} alt={post.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col gap-12">
                  <h4 className="text-[20px] leading-28 font-normal text-text-primary">{post.title}</h4>
                  <p className="line-clamp-2 text-[15px] leading-24 text-text-secondary">{post.desc}</p>
                  <div className="flex items-center gap-12 text-[15px] leading-24 text-text-secondary">
                    <span>{post.author}</span>
                    <div className="h-4 w-4 rounded-full bg-text-tertiary" aria-hidden="true" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter signup */}
      <section className="flex flex-col items-center px-32 pb-240 pt-120 md:px-40">
        <div className="flex w-full max-w-[400px] flex-col items-center gap-20 text-center">
          <h2 className="text-[18px] leading-24 font-normal text-text-primary md:text-[24px] md:leading-32">
            The next post in your inbox
          </h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full items-center justify-between gap-16 border-b border-[rgb(236,236,235)] pb-12"
          >
            <input
              type="email"
              maxLength={80}
              placeholder="hi@natural.com"
              className="w-full bg-transparent text-[24px] leading-32 text-text-primary placeholder:text-text-tertiary focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Submit email"
              disabled
              className="flex h-20 w-20 shrink-0 items-center justify-center text-text-primary disabled:opacity-40"
            >
              <ArrowForwardIcon size={20} />
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default BlogPage
