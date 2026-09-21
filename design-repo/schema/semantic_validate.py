#!/usr/bin/env python3
"""
Semantic validator for Natural PageSpecs.

Enforces everything JSON Schema structurally cannot:
  * TEMPLATE_NODE_SEQUENCE_MATCH -- the PageSpec's nodes are cross-referenced against
    its DECLARED template's real node list, not validated in isolation. This is the
    single most repeated bug class in this methodology, so it is the first check here.
  * route<->template binding (a route may only use the template routes.json assigns it)
  * homeRouteOnly restrictions
  * rhythm rules from compatibility/graph.json, respecting each rule's severity
  * reducedMotionFallback presence and per-section correctness
  * per-instance maxWords budgets, read from each section contract
  * assetRole legality and the must-not-fabricate / must-reuse-exact compliance rules

Path portability: the repo root is derived from __file__, never hardcoded.
Usage:  python3 semantic_validate.py [pagespec.json ...]
        (with no arguments it validates schema/example.pagespec.json)
"""
import json
import os
import re
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load(*parts):
    with open(os.path.join(REPO, *parts), encoding="utf-8") as fh:
        return json.load(fh)


def word_count(text):
    """Words = whitespace-delimited runs containing at least one alphanumeric char."""
    return len([t for t in re.split(r"\s+", str(text).strip()) if re.search(r"[0-9A-Za-z]", t)])


def section_contracts():
    d = os.path.join(REPO, "sections")
    return {f[:-5]: load("sections", f) for f in sorted(os.listdir(d)) if f.endswith(".json")}


def deref(spec, _seen=None):
    """Resolve a `$ref` like 'components/card.marketing' or 'primitives/button.pill-primary'
    into that file's own field map, so maxWords budgets declared on a shared component or
    primitive are enforced on every section that composes it.

    Without this, a section whose items are a `$ref` (e.g. content.card-grid's cards)
    silently carries NO word budget at all — a real bug this repo's own adversarial
    suite caught on its first run.
    """
    if not isinstance(spec, dict) or "$ref" not in spec:
        return spec
    ref = spec["$ref"]
    _seen = _seen or set()
    if ref in _seen:
        return {}
    _seen.add(ref)
    path = os.path.join(REPO, ref + ".json")
    if not os.path.exists(path):
        return {}
    with open(path, encoding="utf-8") as fh:
        doc = json.load(fh)
    # components declare `content`; primitives declare `props`
    block = doc.get("content") or doc.get("props") or {}
    fields = block.get("properties", block)
    return {"properties": fields}


def collect_maxwords(node_schema, prefix="", _seen=None):
    """Walk a section contract's `content` block and yield (dotted-path, maxWords),
    following `$ref`s into components and primitives."""
    out = {}
    node_schema = deref(node_schema, _seen)
    props = node_schema.get("properties", {})
    for key, spec in props.items():
        if not isinstance(spec, dict):
            continue
        path = f"{prefix}{key}"
        spec = deref(spec, _seen)
        if "maxWords" in spec:
            out[path] = spec["maxWords"]
        if spec.get("type") == "array" and isinstance(spec.get("items"), dict):
            item = deref(spec["items"], _seen)
            if "maxWords" in item:
                out[f"{path}[]"] = item["maxWords"]
            if "maxWordsPerItem" in item:
                out[f"{path}[]"] = item["maxWordsPerItem"]
            out.update(collect_maxwords(item, prefix=f"{path}[].", _seen=_seen))
        elif isinstance(spec.get("properties"), dict):
            out.update(collect_maxwords(spec, prefix=f"{path}.", _seen=_seen))
    return out


def resolve(content, dotted):
    """Resolve a possibly array-traversing dotted path to a list of concrete values."""
    cur = [content]
    for part in dotted.split("."):
        nxt = []
        arr = part.endswith("[]")
        key = part[:-2] if arr else part
        for c in cur:
            if not isinstance(c, dict) or key not in c:
                continue
            val = c[key]
            if arr:
                if isinstance(val, list):
                    nxt.extend(val)
            else:
                nxt.append(val)
        cur = nxt
    return cur


def is_subsequence(spec_pairs, template_pairs):
    """Every spec node must appear in the template's declared order."""
    it = iter(template_pairs)
    return all(any(t == s for t in it) for s in spec_pairs)


def validate(spec, path_label="<spec>"):
    errors, warnings = [], []

    templates = load("templates", "templates.json")["templates"]
    routes = load("templates", "routes.json")["routes"]
    graph = load("compatibility", "graph.json")
    contracts = section_contracts()
    roles = load("assets", "asset-roles.json")["roles"]

    rules = {r["id"]: r for r in graph["rules"]}

    def emit(rule_id, msg):
        sev = rules.get(rule_id, {}).get("severity", "error")
        (warnings if sev == "warn" else errors).append(f"[{rule_id}] {path_label}: {msg}")

    tmpl_id = spec.get("basedOnTemplate")
    tmpl = templates.get(tmpl_id)
    if tmpl is None:
        errors.append(f"[TEMPLATE_UNKNOWN] {path_label}: unknown template {tmpl_id!r}")
        return errors, warnings

    spec_nodes = spec.get("nodes", [])
    spec_ids = [n.get("section") for n in spec_nodes]
    spec_pairs = [(n.get("section"), n.get("variant")) for n in spec_nodes]
    tmpl_nodes = tmpl["nodes"]
    tmpl_ids = [n["section"] for n in tmpl_nodes]

    # ---------------------------------------------------------------- 1. route binding
    route = spec.get("route")
    bound = [r for r in routes if r["path"] == route]
    if not bound:
        errors.append(f"[ROUTE_UNKNOWN] {path_label}: route {route!r} is not in routes.json")
    elif bound[0]["template"] != tmpl_id:
        errors.append(
            f"[ROUTE_TEMPLATE_MISMATCH] {path_label}: route {route!r} is bound to template "
            f"{bound[0]['template']!r} in routes.json, but this spec declares {tmpl_id!r}")

    # ------------------------------------ 2. TEMPLATE_NODE_SEQUENCE_MATCH (the big one)
    # a) no node the template does not declare
    for sid in spec_ids:
        if sid not in tmpl_ids:
            emit("TEMPLATE_NODE_SEQUENCE_MATCH",
                 f"section {sid!r} is not declared by template {tmpl_id!r} "
                 f"(declared: {', '.join(tmpl_ids)})")
    # b) every required template node present
    for n in tmpl_nodes:
        if n.get("required") and n["section"] not in spec_ids:
            emit("TEMPLATE_NODE_SEQUENCE_MATCH",
                 f"template {tmpl_id!r} requires section {n['section']!r}, which is missing")
    # c) order must be a subsequence of the template's declared order
    known = [(s, v) for (s, v) in spec_pairs if s in tmpl_ids]
    tmpl_pairs = []
    for n in tmpl_nodes:
        vs = n.get("variantsAllowed") or ([n["variant"]] if "variant" in n else [None])
        for v in vs:
            tmpl_pairs.append((n["section"], v))
        if "variant" in n or "variantsAllowed" in n:
            tmpl_pairs.append((n["section"], None))
    if not is_subsequence([s for s, _ in known], tmpl_ids):
        emit("TEMPLATE_NODE_SEQUENCE_MATCH",
             f"node order {[s for s, _ in known]} is not a subsequence of template order {tmpl_ids}")
    # d) declared variants must be ones the template allows for that node
    for sid, var in spec_pairs:
        if var is None:
            continue
        allowed = set()
        for n in tmpl_nodes:
            if n["section"] == sid:
                if "variant" in n:
                    allowed.add(n["variant"])
                allowed.update(n.get("variantsAllowed", []))
        if allowed and var not in allowed:
            emit("TEMPLATE_NODE_SEQUENCE_MATCH",
                 f"section {sid!r} declares variant {var!r}; template {tmpl_id!r} allows {sorted(allowed)}")

    # ------------------------------------------------------------------- 3. rhythm rules
    if spec_ids[:1] != ["chrome.navbar"] or spec_ids[-1:] != ["chrome.footer"]:
        emit("NAVBAR_FIRST_FOOTER_LAST",
             f"page must open with chrome.navbar and close with chrome.footer; got "
             f"{spec_ids[:1]} ... {spec_ids[-1:]}")

    heroes = [s for s in spec_ids if s.startswith("hero.")]
    hero_exempt = tmpl_id in rules["ONE_HERO_PER_PAGE"]["exceptions"]
    if len(heroes) > 1:
        emit("ONE_HERO_PER_PAGE", f"{len(heroes)} hero sections: {heroes}")
    if len(heroes) == 0 and not hero_exempt:
        emit("ONE_HERO_PER_PAGE",
             f"template {tmpl_id!r} is not a declared hero-less template but the spec has no hero")
    if heroes and not tmpl_id in rules["HERO_MUST_BE_FIRST_CONTENT"]["exceptions"]:
        if len(spec_ids) < 2 or spec_ids[1] != heroes[0]:
            emit("HERO_MUST_BE_FIRST_CONTENT",
                 f"hero {heroes[0]!r} must sit immediately after chrome.navbar")

    if "conversion.final-cta" in spec_ids:
        idx = spec_ids.index("conversion.final-cta")
        if idx != len(spec_ids) - 2:
            emit("FINAL_CTA_PRECEDES_FOOTER",
                 "conversion.final-cta must be the last node before chrome.footer")
    elif tmpl_id not in rules["FINAL_CTA_OPTIONAL_TEMPLATES"]["exceptions"]:
        emit("FINAL_CTA_OPTIONAL_TEMPLATES",
             f"template {tmpl_id!r} normally closes on conversion.final-cta, which is absent")

    for a, b in zip(spec_pairs, spec_pairs[1:]):
        if a == b:
            emit("NO_CONSECUTIVE_SAME_SECTION", f"{a[0]!r} (variant {a[1]!r}) repeats adjacently")

    if spec_ids.count("content.card-grid") > 2:
        emit("CARD_GRID_MAX_TWO",
             f"content.card-grid appears {spec_ids.count('content.card-grid')} times (max 2)")

    for sid in set(spec_ids):
        if sid in rules["ONE_PER_PAGE_SECTIONS"]["appliesTo"] and spec_ids.count(sid) > 1:
            emit("ONE_PER_PAGE_SECTIONS", f"{sid!r} is onePerPage but appears {spec_ids.count(sid)} times")

    for sid in rules["HOME_ROUTE_ONLY_SECTIONS"]["appliesTo"]:
        if sid in spec_ids and route != "/":
            emit("HOME_ROUTE_ONLY_SECTIONS", f"{sid!r} may only appear on '/', not {route!r}")

    animated = [n for n in spec_nodes if n.get("motion", {}).get("pattern", "none") != "none"]
    if len(animated) > 3:
        emit("MOTION_BUDGET", f"{len(animated)} animated sections exceeds the advisory budget of 3")

    # -------------------------------------------------- 4. motion / maxWords / assets
    for i, node in enumerate(spec_nodes):
        sid = node.get("section")
        where = f"nodes[{i}] ({sid})"
        contract = contracts.get(sid)
        if contract is None:
            errors.append(f"[SECTION_UNKNOWN] {path_label}: {where} has no contract file")
            continue

        motion = node.get("motion") or {}
        if "reducedMotionFallback" not in motion:
            emit("MOTION_REQUIRES_REDUCED_FALLBACK", f"{where} declares no reducedMotionFallback")
        else:
            want = contract["motion"]["reducedMotionFallback"]
            if motion["reducedMotionFallback"] != want:
                emit("MOTION_REQUIRES_REDUCED_FALLBACK",
                     f"{where} fallback {motion['reducedMotionFallback']!r}; contract requires {want!r}")
            if motion.get("pattern") not in contract["motion"]["allowed"]:
                emit("MOTION_REQUIRES_REDUCED_FALLBACK",
                     f"{where} pattern {motion.get('pattern')!r} not in {contract['motion']['allowed']}")

        content = node.get("content") or {}

        # Each section contract declares its own `required` field list. JSON Schema cannot
        # see it (the schema's per-section branches only const-lock motion), so it is
        # enforced here. Found by a second-pass recheck: a fixture was silently missing two
        # required fields because nothing cross-checked the contract's own required list.
        for field in contract["content"].get("required", []):
            if field not in content:
                emit("SECTION_REQUIRED_FIELDS",
                     f"{where} is missing required field {field!r} declared by the "
                     f"{sid} contract")

        # Closed content: a section may not carry a field its contract does not declare.
        if contract["content"].get("additionalProperties") is False:
            declared = set(contract["content"].get("properties", {}))
            for field in content:
                if field not in declared:
                    emit("SECTION_CLOSED_CONTENT",
                         f"{where} carries undeclared field {field!r}; the {sid} contract "
                         f"is closed to {sorted(declared)}")

        for dotted, budget in collect_maxwords(contract["content"]).items():
            for value in resolve(content, dotted):
                if isinstance(value, str):
                    n = word_count(value)
                    if n > budget:
                        errors.append(
                            f"[MAXWORDS] {path_label}: {where} field {dotted!r} has {n} words, "
                            f"budget is {budget}")

        # asset roles, walked over the whole content tree
        def walk_assets(obj):
            if isinstance(obj, dict):
                if "assetRole" in obj and "src" in obj:
                    yield obj
                for v in obj.values():
                    yield from walk_assets(v)
            elif isinstance(obj, list):
                for v in obj:
                    yield from walk_assets(v)

        for ref in walk_assets(content):
            role = ref["assetRole"]
            if role not in roles:
                emit("ASSET_ROLE_CLOSED", f"{where} uses unknown assetRole {role!r}")
                continue
            guidance = roles[role]["aiGuidance"]
            if guidance in ("must-not-fabricate", "must-reuse-exact") and \
                    ref.get("generationMode") != "reuse-existing":
                emit("NO_FABRICATED_BRAND_ASSETS",
                     f"{where} assetRole {role!r} is {guidance} but generationMode is "
                     f"{ref.get('generationMode')!r}; must be 'reuse-existing'")

    return errors, warnings


def main(argv):
    targets = argv[1:] or [os.path.join(REPO, "schema", "example.pagespec.json")]
    total_e = total_w = 0
    for t in targets:
        with open(t, encoding="utf-8") as fh:
            spec = json.load(fh)
        e, w = validate(spec, os.path.basename(t))
        total_e += len(e)
        total_w += len(w)
        print(f"{os.path.basename(t)}: {len(e)} error(s), {len(w)} warning(s)")
        for m in e:
            print("  ERROR  ", m)
        for m in w:
            print("  WARN   ", m)
    print(f"\nTOTAL: {total_e} error(s), {total_w} warning(s)")
    return 1 if total_e else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
