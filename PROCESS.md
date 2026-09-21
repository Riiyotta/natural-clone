# How the Natural homepage clone was built

A record of how this project reached a working local replica of https://www.natural.com/ — the spec, the assets, the build, and the measure-fix-remeasure loop used to close the gap against the original.

**Current state:** React 19 + Vite 8 + Tailwind CSS v3, all 10 homepage sections, 39 assets stored locally, no console errors, no failed requests, no horizontal overflow. Desktop is a close match — every measured section height is identical to the original and total page height is within 9px (11,030px vs 11,039px at 1280px wide). Mobile is within 4px (12,382px vs 12,386px at 390px).

---

## Contents

1. [Tools used](#1-tools-used)
2. [Step 1: Measure the live site](#2-step-1-measure-the-live-site)
3. [Step 2: The spec](#3-step-2-the-spec)
4. [Step 3: Assets](#4-step-3-assets)
5. [Step 4: Build the sections](#5-step-4-build-the-sections)
6. [Step 5: The measure-fix-remeasure loop](#6-step-5-the-measure-fix-remeasure-loop)
7. [Step 6: The hero scroll-scrub](#7-step-6-the-hero-scroll-scrub)
8. [Step 7: QA passes](#8-step-7-qa-passes)
9. [Where the clone differs from the real site](#9-where-the-clone-differs-from-the-real-site)
10. [What is still open](#10-what-is-still-open)
11. [File map](#11-file-map)
12. [How to run it](#12-how-to-run-it)

---

## 1. Tools used

| Tool | Used for |
|---|---|
| **Playwright + Chromium** | Measuring the original and the clone: computed styles, bounding rects, screenshots, pixel sampling. |
| **Subagents** | `clone-agents:recon` (spec + asset audit), `clone-agents:pixel-audit` (measure and fix), `clone-agents:full-site-qa` (report-only audit). |
| **curl** | Downloading assets and fetching live HTML. |
| **`sips`** | Inspecting image dimensions and generating previews of texture assets. |
| **Vite dev server** | Running the clone on port 5173. |

### A note on driving Playwright

The Playwright MCP tools were not available in this session, so every measurement was taken from Node scripts against a locally cached Chromium. Three environment details cost real time and are worth writing down:

- **Never use `waitUntil: 'networkidle'`** on the live site. It polls analytics continuously, so networkidle never fires and the call times out after 90s. Use `domcontentloaded` plus an explicit `waitForTimeout` of 4–5s.
- **Pass `ignoreHTTPSErrors: true`.** TLS is intercepted in this sandbox, so navigation otherwise fails with `ERR_CERT_AUTHORITY_INVALID`. (`curl` to the same URL works, which is a useful way to tell a genuine network failure from a certificate one.)
- **Pass absolute paths to `screenshot({path})`.** The working directory is not reliable across calls, and files written to a relative path were not findable afterwards.

The installed Chromium build also did not match the global Playwright package's expected revision, so `executablePath` has to be given explicitly.

---

## 2. Step 1: Measure the live site

A recon pass measured the original with Playwright at desktop 1280×900 and mobile 390×844, reading computed styles and `getBoundingClientRect` directly from the page rather than inferring from screenshots.

An important early finding: natural.com is **client-rendered**. A naive `grep` for asset URLs in the raw HTML returns nothing useful, and the served HTML has very long lines that defeat line-oriented tools. Assets have to be collected either from network responses after JS runs, or by splitting the HTML on quote characters rather than newlines.

---

## 3. Step 2: The spec

`CLONE_SPEC.md` is the source of truth. It records, with every value measured rather than guessed:

- **Fonts** — two self-hosted woff2 faces (STK Miso variable, GT Standard Mono). The spec notes explicitly that although the fallback chain ends in `monospace`, STK Miso renders as a humanist sans, so the real woff2 must always load.
- **Type scale** — size, line height, weight, and letter spacing per role, with desktop and mobile variants where they differ.
- **Colour palette** — computed values plus the site's own CSS custom property names.
- **Section-by-section geometry** — container widths, padding, gaps, grid definitions.
- **Motion** — including the hero scroll-scrub formula, taken from the site's own CSS and confirmed by instrumenting scroll.

`ASSET_MANIFEST.md` maps every source URL to its local path.

---

## 4. Step 3: Assets

An audit agent crawled the live homepage at both viewports, capturing both network-fetched assets and DOM-referenced ones, then diffed that list against `public/`.

**Result: 37 live homepage assets, all present locally and byte-size matched against the live server.** Two were missing and were downloaded: `favicon-512.png` and `favicon.ico`. Both are DOM-referenced but never fetched by the browser, so a network-only capture would have missed them — worth noting for anyone repeating this.

Two findings worth recording:

- **Three "missing" assets were false alarms.** The project deliberately remaps `/fonts/**` to `public/assets/fonts/**`. A naive path diff flags these; they were already present and byte-identical. Any asset check needs to know the project's own remapping rules.
- **`favicon.svg` and `icons.svg` are local-only** — not served by the live site. They were left in place rather than deleted, since neither is harmful.

Every download was verified with `file` to confirm it is a real image, not an HTML error page.

---

## 5. Step 4: Build the sections

Each section is one component in `src/components/`, composed in `App.jsx`:

`Navbar` · `Hero` · `BenefitsSpeed` · `Flows` · `Control` · `Developers` · `BenefitsScale` · `Investors` · `Blog` · `FinalCta` · `Footer`

Colours, fonts, and spacing come from tokens in `tailwind.config.js`; measured one-off values live in `src/index.css` with a comment naming the measured live value they came from.

---

## 6. Step 5: The measure-fix-remeasure loop

The method that actually produced the fidelity: for each discrepancy, measure the same element on both sites, change one thing, then **re-measure to confirm the change landed**. Several fixes looked right in code and did nothing, or made things worse, and only re-measuring caught that.

### The dominant bug class: desktop constants with no mobile variant

Most of the mobile gap came from one repeated mistake — a pixel value measured at 1280px and applied unconditionally:

| Section | Cause | Mobile gap before → after |
|---|---|---|
| BenefitsSpeed | Card image height was `md:`-gated only, so it collapsed to 159px of intrinsic content on mobile (live: 346px). | −187px → **0** |
| FinalCta splash | Hardcoded `height: 569`. Live is fluid: ~44.4vw with a 400px floor. | +169px → **0** |
| Blog | Featured image capped at 480px; item images pinned to a flat 200px. Live is 16:9 on mobile. | +95px → **0** |
| Control | Hardcoded `minHeight: 800` (a desktop value) and no mobile reorder. | −234px → +8px |
| Investors | Hardcoded `minHeight: 1010` (a desktop value). | +140px → −22px |

Total mobile page-height gap: **857px → 74px**, and a final QA pass closed it to **4px** — the remaining 74px turned out to be a single wrong padding value in FinalCta (see below).

**Control** also needed a structural fix: on mobile the live site hoists the graphic above the text panel with `order: -1` and gives the stage a 480px height. The clone kept desktop DOM order at every width.

### A trap worth flagging

The live sticky wrapper is `display: block` with `padding: 0`, so its `inset` values resolve against the **border box**. The clone's equivalent keeps `160px/40px` padding, so copying the live inset values verbatim would have placed the element 600px off horizontally. Measured coordinates were used instead. Copying computed values across differing box models is silently wrong.

---

## 7. Step 6: The hero scroll-scrub

The most involved piece, and the one where measurement mattered most.

The live hero pins for 2060px and grows a clipped window from 48×48 to 1200×640 on a linear ramp: `progress = clamp(scrollY / (heroHeight - viewportHeight), 0, 1)`.

Four separate defects were found and fixed:

1. **`flex-shrink` crushed the clip to zero height.** As a flex child of a fixed 820px column, its 48px start height collapsed entirely. Fixed with `flex-shrink: 0`.
2. **A missing wrapper.** Live positions the clip inside an absolutely-positioned 1200×640 `.hero-dashboard-shader-anchor` that centres it. The clone had it in normal flow with `margin-top: 40px`, placing it ~394px too low.
3. **Mobile was backwards.** The initial assumption was that mobile disables the animation. Measuring showed the opposite: live *keeps* the anchor, but the hero is only 812px tall with no scroll range, so the clip simply stays 48×48.
4. **The image expanded from the corner, not the centre.** Live keeps the inner surface pinned at a constant 1200×640 no matter the clip size — the clip is a window opening outward over a stationary image. Anchoring the image to the clip's top-left made it grow from the corner instead.

Result: the clip geometry is now pixel-exact against live at scrollY 0 / 300 / 600 / 900 / 1160, and at mobile 390×844.

### What pixel sampling revealed

The live hero renders a **three.js r183 WebGL canvas**, not an image. Sampling the clip's pixels across the scrub showed something no amount of reading the CSS would have: the window shows **pure grain from progress 0 to ~0.95** (0–1.2% white pixels), and the dashboard appears only at progress 1 (61% white). It is a late snap-in, not a gradual reveal. The clone now drives image opacity from `--progress` to match.

The border texture is generated procedurally in the shader. All four `splash/*.jpg` textures were checked as possible substitutes — they are near-uniform overlay films (`grain.jpg` is flat mid-grey), which is exactly why a first attempt rendered as dead grey. The border is now approximated from sampled live pixels: a warm base with radial mottling and a dithered speckle layer.

---

## 8. Step 7: QA passes

Two report-only audit passes ran against the live site, and every finding was independently re-measured before being acted on — subagent numbers were treated as claims, not facts.

Behavioural fixes made:

- **Nav hover.** The clone filled a background on hover; live darkens the text to `rgb(113,112,111)` and leaves the background transparent. Fixed for top-level nav links, leaving the dropdown menu items (which legitimately use a background fill) alone.

### The typography and component pass

A later pass re-measured every section's type, grid, and component structure. It closed the desktop gap to 9px and the mobile gap to 74px, and corrected a class of error the height-based work could not see — places where the *geometry* was right but the *content* was wrong:

- **Section headings** were capped at 600px or 500px in several sections; live caps every `.section-header` at 480px.
- **Terminal card** was a plain bordered text row; live has macOS window chrome — three 12px dots on a `#f6f6f6` bar — with body text at 15px/24px STK Miso, not 13px mono. Only the `❯` gutter glyph is mono.
- **Penny avatar** was a 64px circle; live is a 48px rounded square (6px radius).
- **Control's agent card** was a single flat panel with a shadow; live is a bordered card containing a *second* nested bordered panel, no shadow, with a 36×36 circular icon button.
- **Developers** was a two-column text/code grid; live is a single column with a full-bleed photo panel and a floating white terminal, not a dark code box.
- **Blog** rendered the section heading as a caption *below* the featured image; it belongs above it. Item titles and dates are side-by-side, not stacked.
- **Footer's "Connect" column** rendered icon-only SVGs in a row; live uses plain text links stacked like every other column.
- **Investors filter tabs** were filled pill buttons; live uses plain text tabs.
- **Primary CTA buttons** were missing their 12px forward-arrow icon in four places. Live puts the arrow on every dark-filled pill and omits it on ghost buttons.

The lesson worth carrying forward: matching section *heights* proves nothing about whether the contents are right. Both checks are needed.

### The final QA pass — and a silent-failure class worth knowing about

An independent audit ran afterwards, specifically tasked with re-measuring the rebuilt components rather than trusting them. It found real regressions, which is exactly why a rebuild deserves its own verification pass.

The most valuable finding was **a whole class of silent failure caused by gaps in the project's own Tailwind scales.** `theme.extend.spacing` jumped 32 → 40 with no `36`, and `theme.extend.lineHeight` jumped 24 → 32 with no `28`. The consequences:

- `h-36 w-36` did not produce 36px. Tailwind fell through to its **default core scale**, where `36` means `9rem` — so the Control card's edit button rendered at **144×144px** instead of 36×36, and its container pushed the agent photo 28px outside the card border.
- `leading-28` matched no utility at all, so the element silently inherited the ambient 24px line-height.

Neither produces a console warning, a build error, or a lint failure. They are invisible unless something measures the rendered pixels. Adding the two missing keys to `tailwind.config.js` fixed three separate reported symptoms at once.

**If you extend this project, check any spacing or line-height numeral used in JSX against the custom scales in `tailwind.config.js` before trusting it.**

Other real fixes from this pass:

- **FinalCta mobile padding** was `80px` where live uses `120px`. Every element inside measured identically to live, which isolated the whole 88px section shortfall to this one value — and it was the sole remaining cause of the mobile page-height gap.
- **The Control stage was a bare wrapper.** Live frames the agent card in a gray `rgb(246,246,246)` panel (desktop 604×560, padding 24px; mobile 326×480, padding 40px/20px, 4px radius). The clone let the card float on white. Total section height still matched at 800px, because extra column gap happened to absorb the difference — a good illustration of why aggregate height checks alone are not enough.
- **The Control columns were an even 50/50 grid** (580/580). Live is a flex row split **556 text / 604 stage** inside a 1200px container.
- **The verified badge** inherited near-black; live's `.control-card-verified` is `rgb(26,155,229)`.
- **Bullet line-height** was 24px; live is 18px. Investor role lines were 13px/18px; live uses the same 15px/24px scale as the name above.

---

## 9. Where the clone differs from the real site

| Area | Live site | Clone |
|---|---|---|
| Hero dashboard | three.js r183 WebGL canvas, 1440×800, with a procedurally generated grain border. | A static JPEG inset on a CSS-generated grain approximation. Geometry and reveal timing match; the border does not animate. |
| Splash textures | Composited in-shader. | Four JPEGs layered with CSS blend modes. |
| Links | Real pages. | Still point at natural.com paths; only the homepage exists locally. |

**Licensing:** fonts, logos, and images belong to Natural and the font foundries. Keep this clone local; do not deploy it publicly.

---

## 10. What is still open

Recorded honestly rather than rounded off:

- **Mobile page height is 4px under** (12,382 vs 12,386). Two per-section deltas remain and happen to nearly cancel: BenefitsScale runs **+36px** long (the three feature cards measure identically to live, so the excess is elsewhere in the section and was not isolated) and Investors runs **−16px** short. Worth fixing on their own terms rather than trusting the near-zero total.
- **Investor card brand glyphs** are a single generic placeholder SVG on all 24 cards; live shows a distinct per-brand mark on each. A deliberate simplification, flagged in the component's own comment, but a visible content gap across the whole section.
- **The Investors filter animation** leaves thin visible slivers where live shows nothing. The wrapper collapses toward 0 width, but `.investor-card-inner` keeps a fixed width, so its content still paints as the wrapper narrows.
- **Section header box widths** differ by ~50px in a few sections. The clone uses a fixed `max-w-[480px]` block; live's `.section-header` is a flex column that shrinks to its widest rendered line. Text wraps identically, so there is no visible difference — left alone rather than restructuring every header wrapper for an invisible box-width delta.
- **Mobile menu CTA row** stacks vertically full-width; live is side-by-side with content-sized buttons.
- **The hero border does not animate.** Matching it properly means porting the three.js shader.
- **One pre-existing lint warning** in `Flows.jsx` (unused `activeTab`), untouched as it is unrelated to this work.

---

## 11. File map

```
Natural/
├── PROCESS.md                 this document
├── README.md                  run instructions
├── CLONE_SPEC.md              measurements from the live site
├── ASSET_MANIFEST.md          source URL → local path
├── reference/                 screenshots of the original (desktop + mobile, hero scrub states)
├── index.html
├── package.json
├── tailwind.config.js         colour, font, spacing tokens
├── postcss.config.js
├── vite.config.js
├── public/assets/
│   ├── fonts/                 STK Miso + GT Standard Mono woff2
│   ├── images/                products, agents, benefits, blog, brand
│   ├── icons/agents/          10 SVG icons
│   └── textures/splash/       4 blend-mode textures
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css              tokens, @font-face, hero scrub, responsive overrides
    └── components/            11 section components
```

---

## 12. How to run it

```bash
cd "/Users/riyaghosh/V2 cloned/Natural"
npm install
npm run dev          # http://localhost:5173
```

Production build:

```bash
npm run build
npm run preview
```
