# Natural — design repo

A machine-validated PageSpec system extracted from the cloned marketing site at the
sibling project root. It gives an LLM three things: **what can be used**, **how it can
be combined**, and **how it must behave** — without letting it invent a color, a section,
a route, or a word budget.

Built following `DESIGN-REPO-BUILD-GUIDE.md` (the canonical methodology for *how to
build*), with the failure patterns in its companion master guide baked in from the first
pass rather than discovered by a later review.

---

## ⚠️ Compliance — read before generating anything

**natural.com is a real, live company's website.** Every string of copy in this repo was
transcribed verbatim from it, and every file under the clone's `public/assets/` is a real
downloaded brand asset belonging to Natural AI, Inc. Nothing here grants any license to
that material.

- **Do not publish this repo**, open-source it, or make it a public repository.
- **Never reproduce** Natural's wordmark, any real employee/customer/investor photograph,
  any third-party logo (Eight Sleep, WHOOP, Equinox, any investor firm's mark), or
  Natural's verbatim marketing copy, pricing or FDIC/legal disclosures in generated output.
- **Never fabricate** a regulatory, banking or FDIC-insurance claim.

The full rule set is `assets/asset-roles.json` → `globalProhibitions`. It is not advice:
`schema/semantic_validate.py`'s `NO_FABRICATED_BRAND_ASSETS` check enforces the
must-not-fabricate / must-reuse-exact roles, and `schema/tests/adversarial_test.py` proves
that enforcement works.

---

## What's in here (counts recomputed from disk)

| Layer | Count |
|---|---|
| Token files | 15 |
| Token values | 326 |
| Primitives | 7 |
| Components | 9 |
| Section contracts | 24 |
| Templates (page shapes) | 6 |
| Routes | 16 |
| Asset roles | 15 |
| Compatibility rules | 16 |
| Control fixtures | 7 |
| Adversarial mutations | 34 |

`extraction/verify_all.py` recomputes every one of these from the files they summarise and
fails if any has drifted — proven with a scratch-copy test that injects a wrong count.

## Layout

```
design-repo/
  README.md · CHANGELOG.md · registry.manifest.json
  tokens/
    00-foundation/   color, typography, spacing, radius, breakpoint, elevation, motion, icon-size
    10-semantic/     roles built from foundation (text.primary, surface.brand, ...)
    20-component/    component-scoped overrides
    30-layout/       layout/grid tokens + the corrected hero geometry
    themes/          light.json — the only theme this site has
    llm/             component-allowlist · token-catalog · token-policy (the curated generator view)
  primitives/        7 atomic pieces
  components/        9 composed, content-agnostic pieces
  sections/          24 contracts — the first layer with a real content contract
  templates/         templates.json (6 page shapes) · routes.json (16 routes)
  compatibility/     graph.json — 16 rhythm rules, each error|warn
  assets/            asset-roles.json — the closed assetRole enum + compliance rules
  schema/            pagespec.schema.json (draft-07) · example.pagespec.json
                     semantic_validate.py · fixtures/ · tests/adversarial_test.py
  extraction/        measured-values.json (citation ledger) · verify_all.py
```

## Routes and templates

All 16 routes map 1:1 to exactly one of 6 templates, with no gaps and no
double-assignment:

| Template | Routes |
|---|---|
| `home.landing` | `/` |
| `product.feature` | `/wallet` `/vault` `/pay` `/request` `/transfer` `/connect` `/identity` `/observability` `/disputes` `/compliance` |
| `company.narrative` | `/about` `/careers` |
| `index.posts` | `/blog` |
| `commerce.pricing` | `/pricing` |
| `form.single` | `/contact` |

Two shapes deliberately have no final CTA (`index.posts` closes on a newsletter,
`form.single` on nothing), and `form.single` has **no hero at all** — `ONE_HERO_PER_PAGE`
names it as an explicit exception rather than rejecting it.

24 link targets in the site's own nav and footer have no route at all (`/signup`, `/login`,
`/cards`, every `/blog/<slug>`, the external docs/status/social URLs). They are enumerated
in `templates/routes.json` → `unroutedLinkTargets` rather than silently normalised away.

## How to use it as a generator

1. Read `tokens/llm/component-allowlist.json` — the closed set you may instantiate.
2. Read `tokens/llm/token-catalog.json` — reference a semantic role id, never a raw value.
3. Read `tokens/llm/token-policy.json` — what is machine-enforced vs. convention.
4. Read `assets/asset-roles.json` — before touching any media field.
5. Compose a PageSpec against `schema/pagespec.schema.json`, using
   `schema/example.pagespec.json` as the worked reference.
6. Validate: `python3 schema/semantic_validate.py your.pagespec.json`.

## Verification

```bash
python3 extraction/verify_all.py            # all 28 checks
python3 schema/tests/adversarial_test.py    # 32 mutations + 7 controls
python3 schema/semantic_validate.py         # the bundled example
```

`verify_all.py` runs: JSON parse · schema validation · semantic validation on the example
and all 7 control fixtures · the adversarial suite · allowlist parity · asset-role
parity across three files · compatibility-graph ↔ validator rule parity · manifest counts
recomputed from disk · version parity · route/template mapping · citation validity · no
absolute local paths.

Four of those are **drift-proofed and proven to fail on bad input**, not just to pass on a
correct repo: injecting a phantom allowlist entry, an out-of-range citation, a wrong
manifest count, or a renamed validator rule each makes the run fail, and the real repo
still passes afterwards.

**Citation validity degrades gracefully.** Citations point at the sibling clone's source
tree, which is *not* part of this package. When no sibling tree is present (a standalone
zip, an extracted copy), the check **warns** instead of failing, so a delivered
`design-repo/` still verifies clean. `registry.manifest.json`'s `entryPoints` deliberately
lists only files inside this folder — no `../` paths.

## Known evidence gaps

Recorded honestly rather than smoothed over. Full detail in
`extraction/measured-values.json` → `clone_spec_disagreements`.

- **The hero's 2060px scroll range is `asserted-unverified`.** `CLONE_SPEC.md:183` and
  `src/components/Hero.jsx:68` both hardcode it, but unlike every other hero dimension it
  was never re-measured across viewport heights — and it is *internally inconsistent* with
  the corrected viewport-relative rules. This repo flags it rather than promoting it to a
  measured constant.
- **The 768px breakpoint is an inference**, not a measurement. Only 390px and 1280px were
  ever directly measured on live; `CLONE_SPEC.md` says so itself.
- **`CLONE_SPEC.md:186`'s "820px tall" hero claim is false** and is superseded throughout
  this repo by viewport-relative formulas measured at 10 viewport sizes.
