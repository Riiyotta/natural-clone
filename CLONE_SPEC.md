Source: https://www.natural.com/

> Note: the `?ref=saaspo.com` query string is an external referral tracker, not part of the
> site. This spec documents the real natural.com homepage content and behavior only.

All values below were measured directly from the live site via Playwright
(`getComputedStyle` / `getBoundingClientRect`) at **desktop 1280×900** and
**mobile 390×844** unless noted. Do not deviate from these numbers without re-measuring.

---

## 0. Global tokens

### Fonts
Two custom fonts are self-hosted, both `font-display` variable/static woff2, loaded from
`/fonts/...` on natural.com:

| Token | Stack | File |
|---|---|---|
| `--font-stk-miso` (body/UI font, used almost everywhere) | `"STK Miso", "STK Miso fallback", monospace` | `/fonts/stk-miso/STKMisoVariableComplete.woff2` (variable) |
| `--font-mono` / `--font-gt-standard-mono` (used for code blocks, agent IDs, mono labels) | `"GT Standard Mono", "GT Standard Mono fallback", monospace` | `/fonts/gt-standard/GT-Standard-Mono-Standard-Regular.woff2` |
| `--font-stk-gerhard` (referenced in CSS vars, not observed in visible homepage copy — treat as low priority / skip unless a component needs it) | `"STK Gerhard", "STK Gerhard fallback", monospace` | not confirmed in network log; skip |
| `--font-sans` (fallback only) | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` | system |

Body default: `font-family: "STK Miso", "STK Miso fallback", monospace; font-size: 15px; line-height: 24px; font-weight: 400; color: rgb(22,21,20); background: #fff;`

Note: despite the fallback chain ending in `monospace`, STK Miso renders as a humanist
sans/serif-ish display face (see screenshot) — always load the real woff2, never let it
fall back to system monospace.

### Type scale (from CSS custom properties, confirmed against rendered elements)
| Token | Size | Line-height | Weight | Letter-spacing | Used for |
|---|---|---|---|---|---|
| H1 (hero, `.landing-hero-heading`) | 40px (desktop) / 24px (mobile) | 56px / 32px | 360 | -0.8px | Hero headline |
| `--text-display` | 28px | 40px | 400 | 0.005em | large display text |
| H2 (section headings, `.section h2`) | 32px | 40px (48px when heading wraps 2 lines w/ tighter tracking, e.g. final CTA) | 400 (`--marketing-h2-font-weight`) | normal (CTA variant: -0.32px) | Section titles ("Move at agent speed", "Scale with confidence", etc.) |
| `--text-h2` (small UI heading token, unrelated to visual `<h2>`) | 16px | 24px | 420 | normal | card/UI sub-headings |
| H3 (card titles, `.article h3`) | 15px | 24px | 400 | normal | Benefit-card titles ("Agent-first primitives", etc.) |
| Body / paragraph | 15px | 24px | 400 | normal | default paragraph copy |
| `--text-body-1` (design-system token) | 14px | 20px | 400 | 0.005em | secondary body copy |
| `--text-body-2` | 13px | 18px | 400 | 0.005em | captions ("Transacted 1s ago" renders at 18px/18px per measurement — treat per-instance) |
| `--text-mono` | 14px | 20px | 410 | -0.04em | code / mono labels |
| `--text-decorative` | 12px | 16px | 400 | 0.005em | eyebrow labels ("Benefits", "Flows", "Control", "Developers", "Investors", "Blog") — measured eyebrow paragraph: 15px/24px rgb(113,112,111), so verify per-section; eyebrow color is consistently the secondary gray |
| Eyebrow label color | — | — | — | — | `rgb(113, 112, 111)` (≈ `--color-text-secondary`) |
| Buttons | 15px | 24px | 400 | normal | all CTA pills |

### Color palette (computed)
| Role | Value | CSS var |
|---|---|---|
| Page background | `#ffffff` | `--color-background-1` / `--color-background-primary` |
| Secondary background (alt sections) | `oklch(98.2% .001 75)` ≈ `#f9f9f8` | `--color-background-2` / `--color-background-secondary` |
| Background hover | `oklch(98.5% .001 75)` | `--color-background-hover` |
| Secondary background hover | `oklch(96.6% .001 75)` | `--color-background-secondary-hover` |
| Primary text | `rgb(22, 21, 20)` (nav/body) / `rgb(17, 20, 0)` (hero H1) — both near-black | `--color-text-primary` = `oklch(15% .001 75)` |
| Text primary hover | `oklch(60.2% .001 75)` | `--color-text-primary-hover` |
| Secondary text (eyebrows, captions, muted paragraphs) | `rgb(113, 112, 111)` | `--color-text-secondary` = `oklch(60.2% .001 75)` |
| Tertiary text (very muted, e.g. hero's greyed-out tail copy) | `rgb(215, 214, 212)` | `--color-text-tertiary` = `oklch(84.2% .001 75)` |
| Text on color (white text on dark buttons) | `#ffffff` | `--color-text-on-color` |
| Button background (primary, "Sign up for free") | `rgb(22, 21, 20)` | `--color-background-button` = `oklch(24.4% .001 75)` |
| Button background hover | `oklch(60.2% .001 75)` | `--color-background-button-hover` |
| Card border | `rgb(246, 246, 246)` (1px solid) | gray-100-ish |
| Card background | `#ffffff` | |
| Nav background (scrolled/sticky) | `rgba(255,255,255,0.75)` (translucent, blurred) | |

Full neutral/gray scale used elsewhere in the design system (available as Tailwind-style
tokens if needed for edge cases): gray-50 `oklch(98.5% .001 75)`, gray-100 same, gray-300
`oklch(91.9% .001 75)`, gray-400 `oklch(87.9% .001 75)`, gray-500 `oklch(84.2% .001 75)`.
The site also defines a large decorative palette (seaglass, meadow, twilight, barley,
sierra, russet, mesa, dune, moss, fern, clay, tide, harbor, rosewood, terracotta, kelp,
mistral, cove, dusk, tan, rouge — all oklch) used for investor-logo tint chips and
illustrations; sample a specific chip's computed `background-color` if you need an exact
match, don't guess from the name.

### Spacing scale (8px-rooted, from `--spacing-*` vars)
2, 4, 6, 8, 10, 12, 14 (`--spacing-cell`), 16, 20, 24, 28, 32, 40, 48, 56, 64, 72, 80, 120,
160, 200, 240, 280, 320 — all in px. Section vertical padding uses the larger end of this
scale (see per-section measurements below); card gaps commonly use 40px; button internal
padding uses 6px/16px (pill) or 6px/12px (ghost nav item).

### Radii
| Token | Value | Used for |
|---|---|---|
| `--radius-sm` | 2px | subtle chip corners |
| `--radius-md` | 4px | benefit cards (`.article`), most panels |
| `--radius-lg` | 8px | larger panels |
| `--radius-xl` | 10px | |
| `--radius-2xl` | 16px | |
| `--radius-3xl` / `--radius-window` | 24px | |
| Pill buttons (nav CTA, "Sign up for free", "Talk to the team") | 20px (fully rounded, measured) | |
| Nav ghost buttons ("Products", "Features", "Company") | 1.5px (effectively square) | |

### Shadows
| Token | Value |
|---|---|
| `--shadow-soft-value` | `0px 4px 16px 0px #0000000a` |
| `--shadow-strong-value` | `0px 4px 32px 0px #00000014` |
| `--shadow-sandbox-frame` | `0 -2px 12px #0000000a, 0 2px 6px #1815140f, 0 10px 28px #18151424` (used on the dashboard/code preview panels) |
Benefit-card articles themselves have `box-shadow: none` and rely on the 1px `rgb(246,246,246)` border instead — only the floating dashboard/screenshot panels use the shadow tokens.

### Easing / motion tokens
| Token | Value |
|---|---|
| `--ease-enter` | `cubic-bezier(.24,1,.36,1)` |
| `--ease-morph` | `cubic-bezier(.645,.045,.355,1)` |
| `--ease-in-out-quart` | `cubic-bezier(.77,0,.175,1)` |
| `--ease-in-out-circ` | `cubic-bezier(.785,.135,.15,.86)` |
| `--pressable-press-ease` | `cubic-bezier(.24,.8,.24,1)` |
| Button hover transition | `background-color 0.1s ease-out` |
| Card `transition` | `all` (no explicit duration found on default state — likely set on hover pseudo-class only; treat as `all 0.2s ease` default if implementing hover states) |

### Layout / container
- No `max-width` container class is used — `<main>` and section wrappers are full-width
  (`max-width: none`) inside the 1280px viewport.
- Content grids (e.g. the 3-up benefit-card grid) measure **1200px wide** inside a
  1280px viewport → effectively **40px side gutters** at desktop.
- Nav bar height: **80px**, full width, sticky/fixed to top with translucent white
  (`rgba(255,255,255,0.75)`) blurred background once content scrolls beneath it.
- Breakpoint: mobile layout (hamburger nav, single-column grids, H1 drops to 24px/32px,
  benefit-card grid becomes 1 column at 326px measured width inside 390px viewport ≈
  32px total horizontal gutter) kicks in below the point where the desktop nav links
  (Products/Features/Company/Pricing/Docs/Login/Sign up) no longer fit — treat as a
  standard `md` (~768px) breakpoint; only 390px and 1280px were directly measured, so
  verify any single specific breakpoint pixel value against Tailwind's default `md:768px`
  if pixel-exact fidelity at intermediate widths is required (not measured directly here).

---

## 1. Navbar (`<nav>`)

- Fixed/sticky, full width, height 80px, background `rgba(255,255,255,0.75)` (blurred).
- Left: `Natural` logo (`<img>`, source `/assets/brand/natural-logo.svg`), links to `/`.
- Center-left: ghost nav buttons, each `padding: 6px 12px`, `border-radius: 1.5px`,
  font 15px/24px regular, color `rgb(22,21,20)`, transparent bg:
  - "Products" (dropdown/mega-menu button)
  - "Features" (dropdown/mega-menu button)
  - "Company" (dropdown/mega-menu button)
  - "Pricing" → `/pricing` (plain link)
  - "Docs" → `https://docs.natural.com` (plain link)
- Right: "Login" → `/login` (ghost pill, `padding:6px 16px`, `border-radius:20px`,
  transparent bg, text `rgb(22,21,20)`), "Sign up for free" → `/signup` (solid pill,
  same padding/radius, bg `rgb(22,21,20)`, text `#fff`).
- Load-in animation: nav logo/links/right-container fade+slide up from `translateY(12px)`
  → `0`, opacity 0→1, staggered at 1000ms/1100ms/1200ms delay, 400ms duration, ease-out
  (class pattern `page-entrance entrance-delay-{N} entrance-duration-400
  entrance-distance-neg-12 entrance-ease-out`).

### Products mega-menu (dialog, revealed on click/hover of "Products")
Two-column style list of 13 product links, each with a title + one-line description:
Wallets ("FDIC-insured wallets for agents") /wallet, Vault ("One-way accounts for agents
to move money in, never out") /vault, Pay ("Send money to an agent, business, or
consumer") /pay, Request ("Collect money from an agent, business, or consumer")
/request, Transfer ("Move funds between internal and external accounts") /transfer,
Connect ("Build platforms and marketplaces on Natural") /connect, Accept — tagged "Soon"
("Turn your agent into a merchant to process payments") /accept, Cards — "Soon" ("Issue
debit and charge cards for agents") /cards, Credit — "Soon" ("Give agents access to lines
of credit") /credit, Direct — "Soon" ("Select payment rails at agent runtime") /direct,
Voice — "Soon" ("Securely collect card details over the phone") /voice, Bill — "Soon"
("Usage and success based billing for agents") /bill, Charge — "Soon" ("Use popular APIs
and pay per call") /charge.

### Features mega-menu
Identity ("Persistent identity for agents") /identity, Observability ("Monitor and log
agent activity") /observability, Disputes ("Managed disputes for safe transactions")
/disputes, Compliance ("Fully automated compliance") /compliance.

### Company mega-menu
About ("Learn more about Natural") /about, Careers ("Join our team") /careers, Blog
("Read the latest from the team") /blog, Contact ("Get in touch with our team") /contact.

### Mobile nav (< breakpoint)
Collapses to logo + hamburger icon (only 2 elements have nonzero width at 390px: logo
and hamburger). Tapping hamburger opens a full-screen `dialog[aria-label="Navigation
menu"]` containing: accordion sections "Products" / "Features" / "Company" (each
expandable, same link lists as desktop mega-menus, description subtext included), plain
links "Pricing" and "Docs", then bottom actions "Sign up for free" (solid pill) and
"Login" (ghost pill). Entrance stagger classes on mobile menu items: `entrance-delay-0`,
`50`, `100`, `150`, `150` (last one is `.mobile-nav-actions`).

---

## 2. Hero section (`.hero-dashboard`, contains `.hero-dashboard-sticky`)

- Outer wrapper height 2060px at desktop (this is a scroll-driven pinning container —
  it exposes a CSS custom property `--progress` on the root `.hero-dashboard` div,
  currently `0`, that a JS scroll handler updates as the user scrolls; the inner
  `.hero-dashboard-sticky` (820px tall) is the pinned/sticky visual — implement as a
  scroll-scrubbed reveal of the dashboard screenshot/video, JS sets `--progress`
  0→1 across the 2060px scroll range). `margin-top: -80px` on the outer wrapper so it
  sits directly under (behind) the fixed nav.
- Inside: eyebrow news pill "Our $30M Series A · July 20" (`.news-tag`, links to
  `/blog/natural-series-a`, arrow-forward SVG icon, pill shape) with its own load-in
  entrance (delay 0, duration 500, distance 12, ease-out).
- H1 (`.landing-hero-heading`), two `<span>`s:
  - span 1 (solid): "Natural powers agentic payments. " — color `rgb(17,20,0)`
  - span 2 (muted, class `landing-hero-heading-muted`): "Wallets. Payments. Cards.
    Processing. Billing. Voice. All of the primitives agents need*" — color
    `rgb(215,214,212)` (tertiary text token)
  - Desktop: 40px/56px, weight 360, letter-spacing -0.8px, width capped ~1200px (720px
    on the copy column judging from earlier code-panel measurement — verify against your
    grid, hero copy column appeared ~678px wide for body text elsewhere).
  - Mobile: 24px/32px, width 342px within 390px viewport (24px gutters).
  - Entrance: delay 500ms, duration 500ms, distance 12px, ease-out.
- CTA row (`.landing-hero-actions`, entrance delay 750ms): "Sign up for free" (solid
  pill → `/signup`) + "Talk to the team" (ghost, text-only → `/contact`).
- Dashboard visual: `.hero-dashboard-shader-clip` (entrance delay 1000ms) — a
  clipped/shaded product screenshot, asset `assets/images/products/hero-dashboard.jpg`
  network-loaded on this page.
- Footnote asterisk (*) references "Soon" labeled products in the nav — not shown as
  literal footnote text in the hero itself.

---

## 3. "Move at agent speed" — Benefits section 1

- Eyebrow: "Benefits" (secondary gray, `rgb(113,112,111)`)
- H2: "Move at agent speed" (32px/40px/400)
- 3-column grid, `display:grid`, `gap:40px`, columns ≈ `373px 373px 373px` (measured
  1200px total content width / 3, i.e. `repeat(3, minmax(0,1fr))` with 40px gaps).
  Mobile: single column, 326px wide cards, same 40px vertical gap.
- Each card = `<article>`, `border-radius:4px`, `border:1px solid rgb(246,246,246)`,
  `background:#fff`, `box-shadow:none`.
  1. **"Agent-first primitives"** — visual: mock terminal "Install Natural" header +
     chat transcript ("❯ Hey Patch, can you pay $500 to @hea...", "Of course — checking
     now.", "Calling create_payment tool..."), all at 15px/24px mono-ish styling. Body
     copy: "All of Natural's APIs are designed for and used by agents." (15px/24px,
     `rgb(113,112,111)`).
  2. **"Observable and traceable"** — visual: agent avatar "Penny" + "Transacted 1s ago"
     caption (measured 18px/18px, `rgb(113,112,111)`, margin-top 12px — this caption is
     styled larger/tighter than standard body text, verify against `--text-h2` 16/24 or
     treat as a bespoke 18px/18px style). Body copy: "We thread every payment with full
     agent observability so you're in control."
  3. **"One unified API"** — body copy: "Start with one flow, or launch a full payment
     platform. All with one API." (no distinct visual asset captured beyond card
     chrome).

---

## 4. "Flows" section — interactive tab showcase

- Eyebrow: "Flows"; H2: "Natural powers every type of agentic payments workflow"
- 4 toggle buttons (tablist-like, one `pressed`/active at a time):
  1. **Hold accounts & funds** (active by default) — "Open FDIC-insured¹ accounts agents
     can hold, receive, & send funds from." Background asset:
     `assets/images/products/flows-background.jpg` + `assets/images/products/flows-hold.jpg`.
  2. **Move money & transfers**
  3. **Accept & make payments**
  4. **Issue cards & credit**
- Selecting a tab swaps the associated visual panel (image/illustration) — only the
  default "Hold" panel's assets were observed loading on initial page view; the other
  three panels' images likely lazy-load on tab activation (inspect network again after
  clicking each tab if exact asset URLs are needed for those states).
- CTA row: "Sign up for free" (solid pill) + "Talk to the team" (ghost).
- Section outer height 1156px at desktop.

---

## 5. "Control" section — Identity/observability/disputes

- Eyebrow: "Control"; H2: "Identity, observability, and managed disputes"
- Bullet list (4 items, likely each with a small icon from `assets/icons/agents/*.svg`:
  verified.svg, shield.svg, people.svg, agent.svg):
  1. Agents always have stable identities
  2. All IDs tie back to a verifiable legal identity
  3. Natural mediates all disputes for you
  4. You have full auditability on agent actions
- CTA row: "Learn more" → `/identity` + "Talk to the team" → `/contact`.
- Right side: an "Edit agent" mock card UI showing agent "Penny" / handle "@gabby-penny",
  avatar asset `assets/images/agents/penny-avatar.jpg`, fields "Agent ID: agt...a81225"
  and "Owner: Gabby Smith". Supporting icon assets: `bank-account.svg`, `wallet.svg`,
  `deposit.svg`, `withdraw.svg`, `card.svg`, plus texture/mask images
  `assets/images/agents/product-texture.png` and `assets/images/agents/product-mask.svg`.
- Section outer height 800px at desktop.

---

## 6. "Developers" section — install snippet

- Eyebrow: "Developers"; H2: "Start moving money via MCP, CLI, SDK, or API"
- Tab list `"Install method"` with 4 tabs: "Claude Code" (selected by default), "Codex",
  "SDK", "CLI".
- Code panel: dark/light terminal-style block, `padding: 20px 20px 20px 64px` (extra
  left padding for a leading `❯` prompt glyph), width 720px at desktop (starts at
  x=280px, i.e. centered within the 1280px viewport with the eyebrow/heading column to
  its left — this is a 2-column layout: text column + code column).
  - "Copy command" button in the top-right of the panel.
  - Commands per tab (all use `--font-gt-standard-mono`, 14px):
    - Claude Code: `claude mcp add --transport http natural https://mcp.natural.com --scope user`
    - Codex: `codex mcp add natural --url https://mcp.natural.com`
    - SDK: `npm install @naturalpay/sdk`
    - CLI: `curl -fsSL https://natural.com/install.sh | bash`
- CTA row: "Read docs" → `https://docs.natural.com` + "Talk to the team" → `/contact`.
- Background image: `assets/images/home/developers-background.png`.
- Section outer height 1032px at desktop.

---

## 7. "Scale with confidence" — Benefits section 2

- Eyebrow: "Benefits"; H2: "Scale with confidence"
- 3-column grid (same 4px-radius bordered-card style as section 3):
  1. **"FDIC-insured up to $200M¹"** — img "Shield mark with $200M FDIC coverage",
     asset `assets/images/benefits/fdic-card.jpg`. Copy: "All Natural accounts receive
     expanded FDIC coverage."
  2. **"Scale to billions of dollars"** — eyebrow-style label "Volume" inside the card;
     no distinct image found in network log for this card (likely CSS/SVG chart
     illustration rendered inline — inspect DOM further if pixel match is required).
     Copy: "Natural can scale with you as your business grows."
  3. **"99.99% uptime"** — shows "API" / "MCP" pill labels inside the card (status-chip
     component). Copy: "We take performance seriously so you can focus on building."
- Section outer height 756px at desktop.

---

## 8. "Investors" section — testimonial wall

- Eyebrow: "Investors"; H2: "Backed by the best investors and operators in fintech"
- Filter tablist: "All" (selected), "Firms", "Individuals" — filters the grid below.
- Masonry/grid of ~23 testimonial cards, each: quote paragraph + attribution (name,
  title/company). Full list of quotes and attributions (in DOM order): Kirsten Green
  (Forerunner), Immad Akhund (Mercury), Henri S. & Max S. (Privy), Pete Koomen (Y
  Combinator), Ramtin Naimi (Abstract), Zach Abrams (Bridge), Michael Tannenbaum
  (Figure), Art Levy (Brex), Baris A. & Armaan A. (Human Capital), Guillermo Rauch
  (Vercel), Nichole Wischoff (Wischoff Ventures), Akshay Kothari (Notion), Ben T. & Adam
  G. (Genius), Pablo Palafox (HappyRobot), Paul Klein IV (Browserbase), Dylan Babbs
  (Profound), Willem V.L. & Eric S. (Terrain), Isaiah Granet (Bland), Itai Damti (Unit),
  Matt Michaelis (Emprise Bank), Ryan F. & Tyler G. (Restive), Darragh Buckley
  (Increase), Matteo Franceschetti (Eight Sleep), Chris Harper (Torch). (Copy each quote
  verbatim from the snapshot captured during recon — see conversation transcript if the
  literal strings are needed; they are long and reproduced in full in the Playwright
  snapshot above.)
- Each investor card has a themed tint color via `--color-investors-*` CSS vars (e.g.
  Forerunner `#001633`, Wischoff `#a43028`, HappyRobot `#0e0d0c`, Increase `#f2f3f5`,
  Browserbase — var literally resolves to CSS keyword `red`, verify/replace with the
  actual brand red if implementing logo chips).
- Section outer height 1010px at desktop (grid content is taller and likely scrolls
  internally or paginates — 1010px is the visible/measured `main > div` box, not
  necessarily the full rendered card stack; re-check scroll/overflow behavior on this
  section specifically if building it, since 23 cards clearly exceed 1010px of vertical
  space in a single non-scrolling column).

---

## 9. "Blog" section

- Eyebrow: "Blog"; H2: "Agentic payments, revisited" (this heading doubles as the
  featured post title)
- Featured post: link → `/blog/agentic-payments-revisited`, hero image
  `assets/images/blog/agentic-payments-revisited/agentic-payments-revisited-hero.jpg`.
- 3 secondary post links (title + date), each with its own hero image loaded from
  network log:
  1. "Unapologetically non-normal" — Sept 14 — `/blog/why-jerry-joined-natural`,
     image `assets/images/blog/why-jerry-joined-natural/jerry-blog-hero.jpg`
  2. "Something out of nothing" — Aug 31 — `/blog/why-david-joined-natural`,
     image `assets/images/blog/why-david-joined-natural/david-blog-hero.jpg`
  3. "Rational actors" — Aug 24 — `/blog/why-kishan-joined-natural`,
     image `assets/images/blog/why-kishan-joined-natural/kishan-blog-hero.jpg`
- Section outer height 1192px at desktop.

---

## 10. Final CTA section

- H2 (two-line, tighter tracking variant): "Payments made Natural." + "Start building on
  Natural today" — 32px, but this instance measures `line-height:48px`,
  `letter-spacing:-0.32px` (distinct from the standard 32/40/normal H2 elsewhere —
  implement as a modifier class for this specific heading).
- CTA row: "Sign up for free" (solid pill) + "Talk to the team" (ghost).
- Section outer height 532px at desktop.
- Immediately followed by a full-bleed decorative `img` "Natural" (large brand mark /
  nature scene) — likely `assets/brand/nature-desk.jpg` based on network log — spanning
  full width before the footer, plus a "splash" component
  (`.splash.splash--full-bleed`, 569px tall, containing a `.texture-overlay`) that sits
  between hero and this — see network asset `assets/images/agents/product-texture.png`
  and `images/previews/leaves.webp` as candidate textures for splash/decorative sections;
  confirm exact placement visually since the accessibility snapshot doesn't disambiguate
  which splash belongs to which section.

---

## 11. Footer

4-column link grid + bottom bar:
- **Products** column: Wallets /wallet, Vault /vault, Pay /pay, Request /request,
  Transfer /transfer, Direct /direct, Accept /accept, Cards /cards, Credit /credit,
  Voice /voice, Connect /connect, Bill /bill, Charge /charge.
- **Features** column: Identity /identity, Observability /observability, Disputes
  /disputes, Compliance /compliance.
- **Developers** column: Guides `https://docs.natural.com/guides`, Documentation
  `https://docs.natural.com/api-reference`, API Status `https://status.natural.com`,
  Join Slack /join-slack.
- **Company** column: About /about, Careers /careers, Blog /blog, Pricing /pricing,
  Contact /contact.
- **Connect** column (icon links): X `https://x.com/naturalpay`, LinkedIn
  `https://linkedin.com/company/naturalpay`, Instagram
  `https://instagram.com/naturalpay`, GitHub `https://github.com/naturalpay`, Email
  `mailto:hi@natural.com`.
- Bottom: Natural logo (img, `/assets/brand/natural-logo.svg`), legal nav ("Services
  Agreement" /nsa, "Privacy Policy" /privacy, "Authorized Use Policy" /aup,
  "Disclosures" /disclosures), disclaimer paragraph ("Natural is a financial technology
  company, not a bank. Wallet Accounts and banking services are provided by Column N.A.,
  Member FDIC."), footnote-1 paragraph (superscript "1" + FDIC pass-through insurance
  legal text + link to `https://column.com/legal/sweep-program-network-banks`), and
  copyright line "© 2025-2026 Natural AI, Inc."

---

## 12. Motion summary (page load)

Everything above the fold uses a consistent "entrance" pattern:
`opacity: 0 → 1`, `translateY(distance) → 0`, class-driven via
`page-entrance entrance-delay-{ms} entrance-duration-{ms} entrance-distance-{px|neg-px}
entrance-ease-out`. Observed stagger order: hero news pill (0ms) → H1 (500ms) → CTA row
(750ms) → hero dashboard visual (1000ms) → nav logo (1000ms) → nav links (1100ms) → nav
right/CTA (1200ms). Durations are 400-500ms, easing is `ease-out` (a plain CSS
ease-out curve, not one of the named cubic-bezier tokens — those named tokens are used
for interactive/drawer components, not this load sequence).

The hero section additionally exposes a `--progress` CSS custom property on
`.hero-dashboard`, strongly implying a scroll-scrubbed animation (likely revealing/
transforming the dashboard screenshot as the user scrolls through the 2060px-tall pinned
section) driven by a scroll or IntersectionObserver listener in the bundled JS
(`main-CAm53eju.js` / `_marketing-CVnNIDOZ.js` — minified, not decompiled as part of this
recon; if exact scroll-scrub keyframes are required, they must be reverse-engineered
from source maps or approximated as a linear opacity/scale/translate ramp tied to scroll
progress 0→1 across that container).

Button hover: `background-color 0.1s ease-out` (simple color fade, no scale/shadow
change observed on the primary pill buttons).

No JS-driven scroll-reveal (IntersectionObserver) was confirmed on the mid-page sections
(Benefits/Flows/Control/Developers/Investors/Blog) beyond the initial page-load entrance
classes on above-the-fold elements — if Build wants scroll-triggered reveals for lower
sections, that is a design embellishment not present on the original site, per this
recon; flag it as an intentional deviation rather than a measured fact.

---

## 13. Things NOT fully verified (be conservative, do not guess pixel-exact)

- Exact intermediate responsive breakpoint (only 390px and 1280px viewports were
  measured; treat as Tailwind default `md: 768px` unless told otherwise).
- The 3 non-default "Flows" tab panel images (Move/Accept/Issue) — only the "Hold" tab's
  images loaded on initial page view.
- Full quote text for all 23 investor testimonials — reproduced in the accessibility
  snapshot captured during recon (see conversation transcript); copy verbatim from there
  rather than re-deriving.
- Exact scroll-scrub keyframe math for `--progress` on `.hero-dashboard` (JS is minified;
  behavior inferred from the custom property's existence, not decompiled).
- "Scale to billions of dollars" card visual (no distinct network asset identified;
  likely inline SVG/chart — inspect DOM tree directly if pixel match needed).
