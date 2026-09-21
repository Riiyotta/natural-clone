# Information architecture

`ia.json` is the only file here to hand-edit. `IA.md` and `matrix.csv` are
**generated** — anything typed into them is lost on the next build.

```bash
node validate.mjs   # check invariants; fix hard failures before building
node build.mjs      # regenerate IA.md + matrix.csv
```

## Provenance

Derived by reading the real React source — `src/App.jsx`'s route table and the
top-to-bottom JSX of each `src/pages/*.jsx` — not from a crawl, a sitemap or a
screenshot pass. Each template's `sections` array is the actual render order in
that page component, and every section names the component that implements it
via `implementedBy`.

Where the older `CLONE_SPEC.md` disagreed with the source, the source won. That
document was found to be wrong on at least one measured claim (it asserts a
fixed 820px hero height at line 186; the real rule is viewport-height-relative),
so it was not used as an input here.

## What the data shows

**16 routes across 7 templates, and the route count is concentrated in one of
them.** The product-detail template alone serves 10 of the 16 routes from a
single component (`ProductPage.jsx`) driven by `productContent.js` — so 63% of
the site's routes are one page shape with swapped copy. The remaining 6
templates are one route each.

**7 sections are shared, 17 are page-local.** The shared set is small and almost
entirely chrome: navbar and footer on all 16 routes, the final CTA on 15, and
then four genuinely two-template sections (`proof.investors`, `hero.statement`,
`narrative.values`, `hero.page-title`). Everything else has exactly one caller.

**The 17 single-use sections should stay page-local until a second caller
appears.** Six of them are the homepage's narrative blocks
(`narrative.benefits-speed`, `.flows`, `.control`, `.developers`,
`.benefits-scale`, `content.blog-teaser`), which already exist as separate
components under `src/components/` but are only ever composed by `Home.jsx`.
Extracting any of them further would be abstraction without a second use case.

**`/blog` is the one route that does not end in the shared CTA.** It closes with
`content.blog-newsletter` instead. This is a real structural difference, not an
oversight — worth knowing before anyone "fixes" the blog page to match the other
fifteen.

## A note on the validator's one open note

`validate.mjs` reports, informationally:

> `conversion.final-cta`: scope says [16, 80, 240] but computed route count is 15.

This is expected and **should not be "corrected."** The scope prose deliberately
contains three numbers that are each true about different things:

- **15** — the routes that actually carry the section (matches the computed count).
- **16** — the site's total route count, named to explain which single route is
  the exception (`/blog`).
- **80 / 240** — pixel padding values, not route counts. On `/careers` the CTA is
  wrapped in a `.careers-cta` div that raises its vertical padding from 80px to
  240px.

The validator extracts every integer in the scope string and flags any that
doesn't match the computed route count, which is the right default. Editing the
prose to silence it would delete real information.
