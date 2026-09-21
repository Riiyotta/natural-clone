const POSTS = [
  {
    title: 'Unapologetically non-normal',
    date: 'September 14',
    href: '/blog/why-jerry-joined-natural',
    image: '/assets/images/blog/why-jerry-joined-natural/jerry-blog-hero.jpg',
  },
  {
    title: 'Something out of nothing',
    date: 'August 31',
    href: '/blog/why-david-joined-natural',
    image: '/assets/images/blog/why-david-joined-natural/david-blog-hero.jpg',
  },
  {
    title: 'Rational actors',
    date: 'August 24',
    href: '/blog/why-kishan-joined-natural',
    image: '/assets/images/blog/why-kishan-joined-natural/kishan-blog-hero.jpg',
  },
]

function Blog() {
  return (
    <section className="mx-auto max-w-[1280px] px-32 py-120 md:px-40" style={{ minHeight: 1192 }}>
      <p className="eyebrow">Blog</p>
      {/* Re-measured live (.landing-blog-container): the h2 is the section's own
          heading and sits ABOVE the featured image (40px gap to the image), not as a
          caption rendered below it. */}
      <h2 className="section-h2 mt-12 text-text-primary">Agentic payments, revisited</h2>

      <a href="/blog/agentic-payments-revisited" className="mt-40 block">
        <img
          src="/assets/images/blog/agentic-payments-revisited/agentic-payments-revisited-hero.jpg"
          alt="Agentic payments, revisited"
          className="blog-featured-image w-full rounded-md object-cover"
        />
      </a>

      <div className="mt-40 grid grid-cols-1 gap-40 md:grid-cols-3">
        {/* Re-measured live (.blog-item / .blog-item-information): flex column with a
            12px gap between image and text row; title/date sit side-by-side in a row
            (12px gap), not stacked. Title is text-secondary (not primary), date is
            text-tertiary (not secondary), both 15px/24px (not 13px/18px) — and the
            date uses the full month name. */}
        {POSTS.map((post) => (
          <a key={post.href} href={post.href} className="flex flex-col gap-12">
            <img src={post.image} alt="" className="blog-item-image w-full rounded-md object-cover" />
            <div className="flex items-start gap-12">
              <span className="text-[15px] leading-24 text-text-secondary">{post.title}</span>
              <span className="text-[15px] leading-24 text-text-tertiary">{post.date}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Blog
