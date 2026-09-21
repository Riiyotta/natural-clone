# Local React clone of https://www.natural.com/ at /Users/riyaghosh/V2 cloned/Natural

Source: Local React clone of https://www.natural.com/ at /Users/riyaghosh/V2 cloned/Natural
Status: **measured-from-source** · production approved: **false**
16 routes · 7 templates · 24 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (Product detail, Homepage, About) account for 12 of 16 routes (75%). The remaining 4 routes span 4 templates.

| template | routes | share |
|---|---:|---:|
| Product detail | 10 | 63% |
| Homepage | 1 | 6% |
| About | 1 | 6% |
| Careers | 1 | 6% |
| Blog index | 1 | 6% |
| Pricing | 1 | 6% |
| Contact | 1 | 6% |

## Page chrome

**16 routes carry chrome = `full`** — Homepage, Product detail, About, Careers, Blog index, Pricing, Contact.

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `chrome.navbar` | CHROME | 7 | 16 | `src/components/Navbar.jsx` | Present identically on all 16 routes. |
| `chrome.footer` | CHROME | 7 | 16 | `src/components/Footer.jsx` | Present identically on all 16 routes. |
| `conversion.final-cta` | CONVERSION | 6 | 15 | `src/components/FinalCta.jsx` | 15 of the 16 routes — every route except /blog, which closes with its newsletter block instead. On /careers it is wrapped in a .careers-cta div that raises its vertical padding from 80px to 240px. |
| `hero.product-detail` | HERO | 1 | 10 | `src/pages/ProductPage.jsx` | All 10 product routes. |
| `narrative.feature-card-grid` | NARRATIVE | 1 | 10 | `src/pages/ProductPage.jsx` | All 10 product routes. |
| `hero.statement` | HERO | 2 | 2 | `src/pages/About.jsx, src/pages/Careers.jsx` | The /about and /careers routes. |
| `hero.page-title` | HERO | 2 | 2 | `src/pages/Blog.jsx, src/pages/Pricing.jsx` | The /blog and /pricing routes. |
| `narrative.values` | NARRATIVE | 2 | 2 | `src/pages/About.jsx, src/pages/Careers.jsx` | The /about and /careers routes. |
| `proof.investors` | PROOF | 2 | 2 | `src/components/Investors.jsx` | The homepage and the /about route. |
| `hero.scroll-dashboard` | HERO | 1 | 1 | `src/components/Hero.jsx` | The 1 homepage route only. |
| `narrative.benefits-speed` | NARRATIVE | 1 | 1 | `src/components/BenefitsSpeed.jsx` | The 1 homepage route only. |
| `narrative.flows` | NARRATIVE | 1 | 1 | `src/components/Flows.jsx` | The 1 homepage route only. |
| `narrative.control` | NARRATIVE | 1 | 1 | `src/components/Control.jsx` | The 1 homepage route only. |
| `narrative.developers` | NARRATIVE | 1 | 1 | `src/components/Developers.jsx` | The 1 homepage route only. |
| `narrative.benefits-scale` | NARRATIVE | 1 | 1 | `src/components/BenefitsScale.jsx` | The 1 homepage route only. |
| `narrative.company-story` | NARRATIVE | 1 | 1 | `src/pages/About.jsx` | The /about route only. |
| `narrative.team` | NARRATIVE | 1 | 1 | `src/pages/About.jsx` | The /about route only. |
| `narrative.benefits-perks` | NARRATIVE | 1 | 1 | `src/pages/Careers.jsx` | The /careers route only. |
| `content.blog-teaser` | CONTENT | 1 | 1 | `src/components/Blog.jsx` | The 1 homepage route only. |
| `content.blog-index` | CONTENT | 1 | 1 | `src/pages/Blog.jsx` | The /blog route only. |
| `content.blog-newsletter` | CONTENT | 1 | 1 | `src/pages/Blog.jsx` | The /blog route only. |
| `content.open-roles` | CONTENT | 1 | 1 | `src/pages/Careers.jsx` | The /careers route only. |
| `content.pricing-table` | CONTENT | 1 | 1 | `src/pages/Pricing.jsx` | The /pricing route only. |
| `content.contact-form` | CONTENT | 1 | 1 | `src/pages/Contact.jsx` | The /contact route only. |

**7 shared sections** appear in more than one template and belong in a component library.

**17 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Homepage — `template.home`

1 route · `/` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×7 |
| 2 | HERO | `hero.scroll-dashboard` | page-local |
| 3 | NARRATIVE | `narrative.benefits-speed` | page-local |
| 4 | NARRATIVE | `narrative.flows` | page-local |
| 5 | NARRATIVE | `narrative.control` | page-local |
| 6 | NARRATIVE | `narrative.developers` | page-local |
| 7 | NARRATIVE | `narrative.benefits-scale` | page-local |
| 8 | PROOF | `proof.investors` | shared ×2 |
| 9 | CONTENT | `content.blog-teaser` | page-local |
| 10 | CONVERSION | `conversion.final-cta` | shared ×6 |
| 11 | CHROME | `chrome.footer` | shared ×7 |

### Product detail — `template.product-detail`

10 routes · `/wallet`, `/vault`, `/pay`, `/request`, `/transfer`, `/connect`, `/identity`, `/observability`, `/disputes`, `/compliance` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×7 |
| 2 | HERO | `hero.product-detail` | page-local |
| 3 | NARRATIVE | `narrative.feature-card-grid` | page-local |
| 4 | CONVERSION | `conversion.final-cta` | shared ×6 |
| 5 | CHROME | `chrome.footer` | shared ×7 |

### About — `template.about`

1 route · `/about` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×7 |
| 2 | HERO | `hero.statement` | shared ×2 |
| 3 | NARRATIVE | `narrative.company-story` | page-local |
| 4 | NARRATIVE | `narrative.values` | shared ×2 |
| 5 | NARRATIVE | `narrative.team` | page-local |
| 6 | PROOF | `proof.investors` | shared ×2 |
| 7 | CONVERSION | `conversion.final-cta` | shared ×6 |
| 8 | CHROME | `chrome.footer` | shared ×7 |

### Careers — `template.careers`

1 route · `/careers` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×7 |
| 2 | HERO | `hero.statement` | shared ×2 |
| 3 | NARRATIVE | `narrative.values` | shared ×2 |
| 4 | NARRATIVE | `narrative.benefits-perks` | page-local |
| 5 | CONTENT | `content.open-roles` | page-local |
| 6 | CONVERSION | `conversion.final-cta` | shared ×6 |
| 7 | CHROME | `chrome.footer` | shared ×7 |

### Blog index — `template.blog-index`

1 route · `/blog` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×7 |
| 2 | HERO | `hero.page-title` | shared ×2 |
| 3 | CONTENT | `content.blog-index` | page-local |
| 4 | CONTENT | `content.blog-newsletter` | page-local |
| 5 | CHROME | `chrome.footer` | shared ×7 |

### Pricing — `template.pricing`

1 route · `/pricing` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×7 |
| 2 | HERO | `hero.page-title` | shared ×2 |
| 3 | CONTENT | `content.pricing-table` | page-local |
| 4 | CONVERSION | `conversion.final-cta` | shared ×6 |
| 5 | CHROME | `chrome.footer` | shared ×7 |

### Contact — `template.contact`

1 route · `/contact` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×7 |
| 2 | CONTENT | `content.contact-form` | page-local |
| 3 | CONVERSION | `conversion.final-cta` | shared ×6 |
| 4 | CHROME | `chrome.footer` | shared ×7 |

## Section reference

### CHROME

_Site-wide furniture mounted outside the router in App.jsx, present on every route._

**`chrome.navbar`** — Fixed top navigation: wordmark, a Products mega-menu, flat links, and sign-up/contact actions. Mounted once outside <Routes> so it never remounts on navigation.

· Present identically on all 16 routes. · appears on 16 routes · implemented by `src/components/Navbar.jsx`

**`chrome.footer`** — Site footer: grouped link columns, wordmark, and legal line. Mounted once outside <Routes>, after <main>.

· Present identically on all 16 routes. · appears on 16 routes · implemented by `src/components/Footer.jsx`

### HERO

_The page-opening block that carries the route's h1._

**`hero.scroll-dashboard`** — Homepage-only scroll-scrubbed hero. A sticky viewport-height stage holds a news pill, the two-tone h1 and the CTA pair, while a 48px box expands into the full dashboard screenshot as --progress runs 0 to 1. All sizing is viewport-height-relative, not fixed-pixel.

· The 1 homepage route only. · appears on 1 routes · implemented by `src/components/Hero.jsx`

**`hero.product-detail`** — Product-route hero: h1, a short body paragraph with its own entrance delay, a sign-up CTA pair, and a wide product screenshot below.

· All 10 product routes. · appears on 10 routes · implemented by `src/pages/ProductPage.jsx`

**`hero.statement`** — Tall centred statement hero carrying only an oversized h1 and no imagery, used to open the company-story routes.

· The /about and /careers routes. · appears on 2 routes · implemented by `src/pages/About.jsx, src/pages/Careers.jsx`

**`hero.page-title`** — Compact left-aligned title block that opens a content index route with an h1 and nothing else.

· The /blog and /pricing routes. · appears on 2 routes · implemented by `src/pages/Blog.jsx, src/pages/Pricing.jsx`

### NARRATIVE

_Marketing explanation blocks: what the product does, how it works, who it is for._

**`narrative.benefits-speed`** — Homepage speed/latency benefit block, the first explanatory section after the hero.

· The 1 homepage route only. · appears on 1 routes · implemented by `src/components/BenefitsSpeed.jsx`

**`narrative.flows`** — Homepage tabbed payment-flow explainer with an animated graphic per tab.

· The 1 homepage route only. · appears on 1 routes · implemented by `src/components/Flows.jsx`

**`narrative.control`** — Homepage block on agent permissions, limits and control, with a tabbed/stepped visual.

· The 1 homepage route only. · appears on 1 routes · implemented by `src/components/Control.jsx`

**`narrative.developers`** — Homepage developer-experience block showing API/code affordances.

· The 1 homepage route only. · appears on 1 routes · implemented by `src/components/Developers.jsx`

**`narrative.benefits-scale`** — Homepage scale/volume benefit block, paired visually with the speed block earlier on the page.

· The 1 homepage route only. · appears on 1 routes · implemented by `src/components/BenefitsScale.jsx`

**`narrative.feature-card-grid`** — Eyebrow, h2 and a three-up card grid of feature cards, each with a title, one line of body copy and a graphic. The per-route copy comes from productContent.js.

· All 10 product routes. · appears on 10 routes · implemented by `src/pages/ProductPage.jsx`

**`narrative.company-story`** — Long-form prose block on the company's origin and purpose, set as a single wide paragraph under an h2.

· The /about route only. · appears on 1 routes · implemented by `src/pages/About.jsx`

**`narrative.values`** — Numbered or headed list of company values/principles, one short paragraph each.

· The /about and /careers routes. · appears on 2 routes · implemented by `src/pages/About.jsx, src/pages/Careers.jsx`

**`narrative.team`** — Team/leadership block introducing the people behind the company.

· The /about route only. · appears on 1 routes · implemented by `src/pages/About.jsx`

**`narrative.benefits-perks`** — Employee benefits and perks block on the careers route, distinct from the homepage product-benefit sections.

· The /careers route only. · appears on 1 routes · implemented by `src/pages/Careers.jsx`

### PROOF

_Third-party credibility: investors, customer logos, testimonials._

**`proof.investors`** — Filterable wall of investor and angel cards, each a quote with an attributed name. Fund cards and angel cards use different widths at desktop and collapse to one width on mobile.

· The homepage and the /about route. · appears on 2 routes · implemented by `src/components/Investors.jsx`

### CONTENT

_The substantive body of a content route (post lists, role lists, pricing tables, forms)._

**`content.blog-teaser`** — Homepage three-up teaser of recent posts, linking into the blog index. Not the blog index's own listing.

· The 1 homepage route only. · appears on 1 routes · implemented by `src/components/Blog.jsx`

**`content.blog-index`** — Blog index listing with a role=tablist filter row above it, rendering every post as an image, title and date.

· The /blog route only. · appears on 1 routes · implemented by `src/pages/Blog.jsx`

**`content.blog-newsletter`** — Closing block on the blog index inviting a newsletter subscription. Stands in for the final CTA that every other route carries.

· The /blog route only. · appears on 1 routes · implemented by `src/pages/Blog.jsx`

**`content.open-roles`** — Anchored (#open-roles) list of open positions on a tinted background, headed by the role count rendered as a second h2.

· The /careers route only. · appears on 1 routes · implemented by `src/pages/Careers.jsx`

**`content.pricing-table`** — Grouped pricing table with a sticky desktop-only category nav on the left, collapsing to a single stacked column on mobile.

· The /pricing route only. · appears on 1 routes · implemented by `src/pages/Pricing.jsx`

**`content.contact-form`** — Full-height centred contact form. This route's only block: it carries its own h1 and has no separate hero.

· The /contact route only. · appears on 1 routes · implemented by `src/pages/Contact.jsx`

### CONVERSION

_Blocks whose job is to move the visitor to sign up or make contact._

**`conversion.final-cta`** — Shared closing call-to-action band with a heading and a sign-up action, rendered immediately before the footer.

· 15 of the 16 routes — every route except /blog, which closes with its newsletter block instead. On /careers it is wrapped in a .careers-cta div that raises its vertical padding from 80px to 240px. · appears on 15 routes · implemented by `src/components/FinalCta.jsx`
