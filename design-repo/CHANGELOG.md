# Changelog

## 1.0.0 — initial build

First build of this design-repo, from scratch, against the cloned Natural marketing site.
Every count below was recomputed from disk by `extraction/verify_all.py`, not carried over
from a draft.

### Built

- **Tokens** — 15 files, 326 values across foundation / semantic / component / layout /
  theme / llm layers. Every foundation value is copied verbatim from the clone's real
  `tailwind.config.js` or a literal in `src/`; no color, size or radius was invented.
- **Primitives** — 7 atomic contracts (both pill buttons, the nav ghost button, the
  eyebrow, the forward arrow, filter tabs, the form field).
- **Components** — 9 composed, content-agnostic contracts (the marketing card, the three
  card variants, the terminal block, the two inline charts, the icon grid, the numbered
  row, the splash texture stack).
- **Sections** — 24 contracts, one per distinct section type actually observed. Each
  carries a closed `content` contract with `maxWords` on every text-bearing field, real
  `constraints`, a `motion` block with a required `reducedMotionFallback`, and a
  structured `responsive` block.
- **Templates** — 6 page shapes, each an explicit sequence of **structured node objects**
  (`{section, required, repeatable}`), never bare strings.
- **Routes** — all 16 real routes mapped 1:1, no gaps, no double-assignment.
- **Compatibility graph** — 16 rules, each `error` or `warn`, each checked against
  `templates.json`'s real node sequences at the moment it was written.
- **Asset roles** — a closed 15-role enum wired through the registry, the schema and the
  allowlist, every role carrying explicit AI-generation guidance and licensing guidance.
- **Schema** — draft-07, closed everywhere: template, route, section, node type, motion
  pattern, asset role and theme are all closed enums, and `additionalProperties: false`
  applies throughout including the motion object.
- **Example + fixtures** — one bundled example plus 7 control fixtures covering all 6
  templates (both arms of `company.narrative`), together exercising all 24 sections. Every
  one uses real copy transcribed from the site.
- **Validators** — `semantic_validate.py` (15 rule families) and a 34-mutation adversarial
  suite across schema / structural / runtime / compliance categories.

### Corrections made during the build

- **`CLONE_SPEC.md:186`'s "`.hero-dashboard-sticky` is 820px tall" is FALSE** and is
  superseded everywhere in this repo. Every desktop hero dimension tracks viewport
  *height* and is independent of viewport *width*: sticky = `100vh - 80px`, `.landing-hero`
  = `100vh - 240px`, clip y = `100vh - 384px`, live's declared anchor top = `50vh - 40px`.
  Mobile: wrapper = sticky = inner = `100vh - 32px`, `.landing-hero` = `100vh - 80px`,
  clip y = `100vh - 542px`. Measured on live at 10 viewport sizes, holding exactly with
  zero residual. 820px is correct only at viewport height 900.
- **The companion 2060px scroll-range claim was NOT promoted to measured.** It is recorded
  as `asserted-unverified` with an explicit note that it is internally inconsistent with
  the corrected rules, rather than being encoded as a constant.
- **A stale `(820px)` parenthetical survives at `src/index.css:296`**, in the comment on
  `.hero-dashboard-shader-clip`'s `flex-shrink` rule. The CSS itself is correct; only the
  prose is stale. Recorded in the citation ledger, not fixed — the clone's source is
  read-only for this build.
- **The "four product routes have no eyebrow" claim is false** and was already corrected in
  the source. All 10 routes carry one. The eyebrow is therefore a *required* field on
  `product.feature`'s card-grid node.
- **`ASSET_MANIFEST.md` is homepage-scope only.** `assets/asset-roles.json` was built by
  enumerating the real `public/assets/` tree, which holds 33 blog heroes, 28 product
  feature graphics, 10 product heroes, 4 splash textures and 3 partner logos the manifest
  never lists.
- **`CLONE_SPEC.md`'s type scale lists CSS custom properties the clone never instantiates.**
  `tokens/00-foundation/typography.json` records only sizes with a real rendered example.

### Bugs found and fixed by this repo's own suites

- **The adversarial suite caught a real bug in `semantic_validate.py` on its first run:**
  `maxWords` budgets declared on a shared component or primitive were not enforced on
  sections that compose them via `$ref`, so `content.card-grid`'s cards carried *no* word
  budget at all. `collect_maxwords` now dereferences into `components/` and `primitives/`.
  The mutation that caught it is retained as a permanent regression test.
- **`verify_all.py`'s citation checker caught three bare-filename citations** written in
  prose (`index.css:90`, `About.jsx:256-261`) that did not resolve to a real path.
- **Measuring rather than asserting caught four wrong counts** written into contracts
  during drafting: product feature graphics (29 → 28), the WHOOP logo's extension
  (`.png` → `.svg`), local arrow-icon declarations (7 → 11), and unrouted link targets
  (34 → 24).
- **Recomputing the motion budget against the real fixtures** corrected the graph's own
  evidence note from 4 animated homepage sections to the real 5.

### Found by the second-pass adversarial recheck

- **A control fixture was silently missing two required fields** (`interactive.tab-stage`'s
  CTA pair). The real defect was in the *validator*, not the fixture: nothing cross-checked
  a node against its own section contract's `required` list. Two new rules
  (`SECTION_REQUIRED_FIELDS`, `SECTION_CLOSED_CONTENT`) were added to the graph and the
  validator, with two new adversarial mutations proving them.
- **Adding those rules made `verify_all.py` fail on its own manifest** — the
  `compatibilityRules` count had drifted 14 → 16. The count-recompute check caught it
  automatically, which is the whole point of having it.
- **Three sections had no control-fixture coverage** (`content.team-quote-row`,
  `content.perks-grid`, `conversion.open-roles` — all `/careers`-only). A seventh fixture
  was built from the real `/careers` copy; all 24 sections are now exercised.
- **The README's rule and fixture counts were stale** against the manifest. Fixed.

### Verification status

All four mandatory checks pass, plus four drift tests:

| Check | Result |
|---|---|
| Schema validation (example, draft-07) | 0 errors |
| Adversarial suite | 34/34 mutations rejected, 8/8 controls clean |
| `verify_all.py` | 29 passed, 0 warnings, 0 failures |
| Self-containment (isolated temp dir, no siblings) | pass, citation check degrades to a warning as designed |
| Zip cleanliness | `__MACOSX`/`.DS_Store` count = 0 |
| Drift test: phantom allowlist entry | correctly FAILS |
| Drift test: out-of-range citation | correctly FAILS |
| Drift test: wrong manifest count | correctly FAILS |
| Drift test: renamed validator rule | correctly FAILS |

`status: design-review-pending`, `productionApproved: false`. This repo must not be
published — see the compliance section of `README.md`.
