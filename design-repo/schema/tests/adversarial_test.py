#!/usr/bin/env python3
"""
Adversarial suite for the Natural design-repo.

Every MUTATION below must be REJECTED (by the JSON Schema, by semantic_validate.py,
or by either). Every CONTROL must produce zero errors. A validator that rejects
everything is as broken as one that rejects nothing, so both halves are asserted.

Run:  python3 schema/tests/adversarial_test.py
"""
import copy
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.join(REPO, "schema"))

from jsonschema import Draft7Validator  # noqa: E402
import semantic_validate  # noqa: E402

SCHEMA = json.load(open(os.path.join(REPO, "schema", "pagespec.schema.json"), encoding="utf-8"))
VALIDATOR = Draft7Validator(SCHEMA)


def load_fixture(name):
    p = os.path.join(REPO, "schema", "fixtures", f"{name}.pagespec.json")
    with open(p, encoding="utf-8") as fh:
        return json.load(fh)


def check(spec):
    """Return (schema_errors, semantic_errors)."""
    se = [f"{list(e.path)}: {e.message}" for e in VALIDATOR.iter_errors(spec)]
    ve, _ = semantic_validate.validate(spec, "<mutation>")
    return se, ve


# --------------------------------------------------------------------------- mutations
def mutations():
    """Each yields (category, name, mutated_spec)."""

    # ---- schema layer ----
    s = load_fixture("product.feature"); s["basedOnTemplate"] = "marketing.landing"
    yield ("schema", "unknown template enum value", s)

    s = load_fixture("product.feature"); s["nodes"][1]["section"] = "hero.marketing"
    yield ("schema", "unknown section enum value", s)

    s = load_fixture("product.feature"); s["nodes"][1]["type"] = "block"
    yield ("schema", "invented node type alias 'block'", s)

    s = load_fixture("product.feature"); del s["nodes"][1]["motion"]["reducedMotionFallback"]
    yield ("schema", "missing reducedMotionFallback", s)

    s = load_fixture("product.feature"); s["nodes"][1]["motion"]["inventedAnimation"] = "sparkle"
    yield ("schema", "invented motion field (motion must be closed)", s)

    s = load_fixture("product.feature"); del s["title"]
    yield ("schema", "missing required top-level field", s)

    s = load_fixture("product.feature"); s["route"] = "/direct"
    yield ("schema", "route not in the closed route enum", s)

    s = load_fixture("product.feature")
    s["nodes"][1]["content"]["heroAsset"]["assetRole"] = "photo.invented-role"
    yield ("schema", "invented assetRole", s)

    s = load_fixture("product.feature"); s["nodes"][1]["smuggled"] = True
    yield ("schema", "additional property on a node", s)

    s = load_fixture("product.feature"); s["theme"] = "dark"
    yield ("schema", "nonexistent theme", s)

    s = load_fixture("product.feature")
    s["nodes"][1]["motion"]["pattern"] = "scroll-scrub-reveal"
    yield ("schema", "motion pattern not allowed for this section type", s)

    s = load_fixture("product.feature")
    s["nodes"][1]["content"]["heroAsset"]["generationMode"] = "hallucinate"
    yield ("schema", "invalid generationMode enum value", s)

    # ---- structural / semantic layer ----
    s = load_fixture("product.feature")
    s["nodes"].insert(2, copy.deepcopy(s["nodes"][1]))
    yield ("structural", "duplicate one-per-page hero", s)

    s = load_fixture("product.feature"); del s["nodes"][1]
    yield ("structural", "removed mandatory hero section", s)

    s = load_fixture("product.feature")
    s["nodes"][1], s["nodes"][2] = s["nodes"][2], s["nodes"][1]
    yield ("structural", "reordered fixed-position hero", s)

    s = load_fixture("product.feature")
    s["nodes"].insert(3, copy.deepcopy(s["nodes"][2]))
    yield ("structural", "adjacent identical sections", s)

    s = load_fixture("product.feature")
    home = load_fixture("home.landing")
    s["nodes"].insert(2, copy.deepcopy(home["nodes"][4]))  # content.split-feature
    yield ("structural", "node the declared template does not declare", s)

    s = load_fixture("product.feature"); s["basedOnTemplate"] = "commerce.pricing"
    yield ("structural", "template/route mismatch against routes.json", s)

    s = load_fixture("company.narrative")
    s["nodes"] = [s["nodes"][0]] + [s["nodes"][3], s["nodes"][2]] + s["nodes"][4:]
    yield ("structural", "optional nodes reordered out of template order", s)

    s = load_fixture("product.feature")
    s["nodes"] = s["nodes"][1:]
    yield ("structural", "page does not open with chrome.navbar", s)

    s = load_fixture("product.feature")
    s["nodes"] = s["nodes"][:-1]
    yield ("structural", "page does not close with chrome.footer", s)

    s = load_fixture("product.feature")
    cta = s["nodes"].pop(3)
    s["nodes"].insert(1, cta)
    yield ("structural", "final CTA not immediately before the footer", s)

    s = load_fixture("product.feature")
    grid = copy.deepcopy(s["nodes"][2])
    s["nodes"].insert(3, grid); s["nodes"].insert(4, copy.deepcopy(grid))
    yield ("structural", "content.card-grid exceeds its measured max of 2", s)

    s = load_fixture("home.landing")
    s["route"] = "/pricing"; s["basedOnTemplate"] = "home.landing"
    yield ("structural", "homeRouteOnly hero on a non-home route", s)

    s = load_fixture("product.feature")
    s["nodes"][1]["motion"]["reducedMotionFallback"] = "instant-swap"
    yield ("structural", "reducedMotionFallback disagrees with the section contract", s)

    s = load_fixture("product.feature")
    s["nodes"][2]["variant"] = "generated-visuals"
    yield ("structural", "variant not allowed by the template for this node", s)

    # ---- runtime / content layer ----
    s = load_fixture("product.feature")
    s["nodes"][1]["content"]["heading"] = "Wallets For Every Single Agent You Will Ever Run"
    yield ("runtime", "maxWords overflow on hero.product.heading", s)

    s = load_fixture("product.feature")
    s["nodes"][2]["content"]["cards"][0]["body"] = " ".join(["word"] * 40)
    yield ("runtime", "maxWords overflow on a nested card body", s)

    s = load_fixture("product.feature")
    s["nodes"][2]["content"]["eyebrow"] = "Accounts built for every agent you run"
    yield ("runtime", "maxWords overflow on the product-route eyebrow", s)

    s = load_fixture("home.landing")
    del s["nodes"][3]["content"]["primaryCta"]
    yield ("structural", "missing a field the section contract declares required", s)

    s = load_fixture("product.feature")
    s["nodes"][1]["content"]["inventedField"] = "smuggled"
    yield ("structural", "content field the section contract does not declare", s)

    # ---- compliance layer ----
    s = load_fixture("product.feature")
    s["nodes"][1]["content"]["heroAsset"]["generationMode"] = "generate-new"
    yield ("compliance", "must-not-fabricate asset marked generate-new (photo.hero-product)", s)

    s = load_fixture("company.narrative")
    s["nodes"][2]["content"]["splash"]["photo"]["generationMode"] = "generate-new"
    yield ("compliance", "must-not-fabricate brand splash marked generate-new", s)

    s = load_fixture("product.feature")
    s["nodes"][2]["content"]["cards"][1]["visual"]["generationMode"] = "generate-new"
    yield ("compliance", "FDIC trust badge marked generate-new", s)


def main():
    print("=" * 74)
    print("ADVERSARIAL SUITE")
    print("=" * 74)

    failures = []

    print("\n--- MUTATIONS (each must be REJECTED) ---")
    counts = {}
    total = 0
    for cat, name, spec in mutations():
        total += 1
        se, ve = check(spec)
        rejected = bool(se or ve)
        by = []
        if se:
            by.append(f"schema x{len(se)}")
        if ve:
            by.append(f"semantic x{len(ve)}")
        status = "REJECTED" if rejected else "*** ACCEPTED (BUG) ***"
        print(f"  [{cat:11}] {status:22} {name}")
        if rejected:
            print(f"                {' + '.join(by)}")
        else:
            failures.append(f"mutation not rejected: {cat}/{name}")
        counts[cat] = counts.get(cat, 0) + 1

    print("\n--- CONTROLS (each must produce ZERO errors) ---")
    fixtures = sorted(
        f[: -len(".pagespec.json")]
        for f in os.listdir(os.path.join(REPO, "schema", "fixtures"))
        if f.endswith(".pagespec.json")
    )
    controls = 0
    for name in fixtures:
        spec = load_fixture(name)
        se, ve = check(spec)
        controls += 1
        ok = not se and not ve
        print(f"  {'PASS' if ok else '*** FAIL ***':12} {name}  (schema {len(se)}, semantic {len(ve)})")
        if not ok:
            for m in se[:4]:
                print(f"      schema: {m[:150]}")
            for m in ve[:4]:
                print(f"      semantic: {m[:150]}")
            failures.append(f"control failed: {name}")

    # the bundled example is a control too
    ex = json.load(open(os.path.join(REPO, "schema", "example.pagespec.json"), encoding="utf-8"))
    se, ve = check(ex)
    controls += 1
    ok = not se and not ve
    print(f"  {'PASS' if ok else '*** FAIL ***':12} example.pagespec.json  (schema {len(se)}, semantic {len(ve)})")
    if not ok:
        failures.append("control failed: example.pagespec.json")

    print("\n" + "=" * 74)
    print(f"mutations: {total} ({', '.join(f'{k}={v}' for k, v in sorted(counts.items()))})")
    print(f"controls:  {controls}")
    if failures:
        print(f"RESULT: FAIL -- {len(failures)} problem(s)")
        for f in failures:
            print("  -", f)
        return 1
    print("RESULT: PASS -- every mutation rejected, every control clean")
    return 0


if __name__ == "__main__":
    sys.exit(main())
