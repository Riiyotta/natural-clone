#!/usr/bin/env python3
"""
One-command verification for the Natural design-repo.

Checks, in order:
  1.  every JSON file parses
  2.  the bundled example validates against the schema with zero errors
  3.  the semantic validator is clean on the example and on every control fixture
  4.  the adversarial suite passes (every mutation rejected, every control clean)
  5.  ALLOWLIST PARITY      -- no phantom allowlist entry, no orphaned contract file
  6.  ASSET-ROLE PARITY     -- asset-roles.json, the schema enum and the allowlist agree
  7.  GRAPH/VALIDATOR PARITY-- every rule id in compatibility/graph.json is implemented in
                               semantic_validate.py, and vice versa
  8.  MANIFEST COUNTS       -- every number in registry.manifest.json's `counts` block is
                               RECOMPUTED from the files it summarises and compared
  9.  VERSION PARITY        -- manifest.allowlistVersion == allowlist.version
  10. ROUTE/TEMPLATE MAP    -- every route maps to exactly one real template, no template orphaned
  11. CITATION VALIDITY     -- every measuredFrom `path:line[-line]` resolves against the real
                               source file and stays inside its real length. DEGRADES GRACEFULLY:
                               warns, never fails, when no sibling source tree is present, so a
                               standalone design-repo.zip still verifies clean.
  12. NO ABSOLUTE PATHS     -- no local machine path leaks into any file

Path portability: the repo root is derived from __file__, never hardcoded.
Exit code 0 = pass. Non-zero = at least one check failed.
"""
import json
import os
import re
import subprocess
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE_ROOT = os.path.dirname(REPO)   # the sibling clone, if it is present

FAILURES = []
WARNINGS = []
PASSES = []


def ok(msg):
    PASSES.append(msg)
    print(f"  PASS   {msg}")


def fail(msg):
    FAILURES.append(msg)
    print(f"  FAIL   {msg}")


def warn(msg):
    WARNINGS.append(msg)
    print(f"  WARN   {msg}")


def load(*p):
    with open(os.path.join(REPO, *p), encoding="utf-8") as fh:
        return json.load(fh)


def ids(rel):
    d = os.path.join(REPO, rel)
    return sorted(f[:-5] for f in os.listdir(d) if f.endswith(".json"))


def all_json_files():
    out = []
    for root, dirs, files in os.walk(REPO):
        dirs[:] = [d for d in dirs if d != "__pycache__"]
        for f in files:
            if f.endswith(".json"):
                out.append(os.path.join(root, f))
    return sorted(out)


# ------------------------------------------------------------------ 1. JSON parses
def check_json():
    print("\n[1] JSON parse")
    bad = 0
    for p in all_json_files():
        try:
            with open(p, encoding="utf-8") as fh:
                json.load(fh)
        except Exception as e:
            fail(f"{os.path.relpath(p, REPO)} does not parse: {e}")
            bad += 1
    if not bad:
        ok(f"all {len(all_json_files())} JSON files parse")


# ------------------------------------------------- 2+3+4. schema / semantic / adversarial
def check_validators():
    print("\n[2-4] schema, semantic and adversarial suites")
    sys.path.insert(0, os.path.join(REPO, "schema"))
    try:
        from jsonschema import Draft7Validator
    except ImportError:
        fail("jsonschema is not installed; cannot run schema validation")
        return
    import semantic_validate

    schema = load("schema", "pagespec.schema.json")
    v = Draft7Validator(schema)

    targets = [os.path.join(REPO, "schema", "example.pagespec.json")] + [
        os.path.join(REPO, "schema", "fixtures", f)
        for f in sorted(os.listdir(os.path.join(REPO, "schema", "fixtures")))
        if f.endswith(".json")
    ]
    for t in targets:
        with open(t, encoding="utf-8") as fh:
            spec = json.load(fh)
        serrs = list(v.iter_errors(spec))
        verrs, _ = semantic_validate.validate(spec, os.path.basename(t))
        name = os.path.basename(t)
        if serrs:
            fail(f"{name}: {len(serrs)} schema error(s)")
        elif verrs:
            fail(f"{name}: {len(verrs)} semantic error(s): {verrs[0][:120]}")
        else:
            ok(f"{name}: schema + semantic clean")

    r = subprocess.run(
        [sys.executable, os.path.join(REPO, "schema", "tests", "adversarial_test.py")],
        capture_output=True, text=True)
    if r.returncode == 0:
        tail = [l for l in r.stdout.splitlines() if l.startswith("mutations:") or l.startswith("controls:")]
        ok("adversarial suite passed (" + "; ".join(tail) + ")")
    else:
        fail("adversarial suite FAILED:\n" + r.stdout[-1200:])


# ------------------------------------------------------------- 5. allowlist parity
def check_allowlist_parity():
    print("\n[5] allowlist parity")
    allow = load("tokens", "llm", "component-allowlist.json")
    for key, folder in (("sections", "sections"), ("primitives", "primitives"), ("components", "components")):
        listed = set(allow.get(key, []))
        real = set(ids(folder))
        phantom = listed - real
        orphan = real - listed
        if phantom:
            fail(f"allowlist lists {key} with no contract file (phantom): {sorted(phantom)}")
        if orphan:
            fail(f"{folder}/ has contract files with no allowlist entry (orphan): {sorted(orphan)}")
        if not phantom and not orphan:
            ok(f"{key}: {len(real)} entries, allowlist and contract files agree exactly")

    listed = set(allow.get("templates", []))
    real = set(load("templates", "templates.json")["templates"])
    if listed != real:
        fail(f"allowlist templates {sorted(listed ^ real)} disagree with templates.json")
    else:
        ok(f"templates: {len(real)} entries agree")


# ------------------------------------------------------------ 6. asset-role parity
def check_asset_roles():
    print("\n[6] asset-role parity (registry <-> schema enum <-> allowlist)")
    reg = set(load("assets", "asset-roles.json")["roles"])
    enum = set(load("schema", "pagespec.schema.json")["definitions"]["assetRole"]["enum"])
    allow = set(load("tokens", "llm", "component-allowlist.json")["assetRoles"])
    if reg == enum == allow:
        ok(f"all three agree on {len(reg)} asset roles")
    else:
        if reg != enum:
            fail(f"asset-roles.json vs schema enum differ: {sorted(reg ^ enum)}")
        if reg != allow:
            fail(f"asset-roles.json vs allowlist differ: {sorted(reg ^ allow)}")

    vocab = {"may-generate-new", "must-reuse-exact", "must-not-fabricate"}
    roles = load("assets", "asset-roles.json")["roles"]
    missing = [r for r, d in roles.items() if d.get("aiGuidance") not in vocab]
    if missing:
        fail(f"asset roles with missing/invalid aiGuidance: {missing}")
    else:
        ok(f"every one of {len(roles)} asset roles carries valid AI-generation guidance")
    nolic = [r for r, d in roles.items() if not d.get("licensing")]
    if nolic:
        fail(f"asset roles with no licensing guidance: {nolic}")
    else:
        ok("every asset role carries explicit licensing guidance")


# ------------------------------------------------- 7. graph <-> validator rule parity
def check_graph_validator_parity():
    print("\n[7] compatibility-graph <-> validator rule parity")
    graph_ids = {r["id"] for r in load("compatibility", "graph.json")["rules"]}
    src = open(os.path.join(REPO, "schema", "semantic_validate.py"), encoding="utf-8").read()
    impl = set(re.findall(r'emit\(\s*"([A-Z_]+)"', src)) | set(re.findall(r'rules\["([A-Z_]+)"\]', src))
    missing = graph_ids - impl
    extra = impl - graph_ids
    if missing:
        fail(f"rules declared in graph.json but never enforced in semantic_validate.py: {sorted(missing)}")
    if extra:
        fail(f"rules enforced in semantic_validate.py but absent from graph.json: {sorted(extra)}")
    if not missing and not extra:
        ok(f"all {len(graph_ids)} graph rule ids have a matching implementation, and vice versa")

    for r in load("compatibility", "graph.json")["rules"]:
        if r["severity"] not in ("error", "warn"):
            fail(f"rule {r['id']} has invalid severity {r['severity']!r}")


# ------------------------------------------------------- 8. manifest counts recompute
def check_manifest_counts():
    print("\n[8] manifest counts recomputed from disk")
    m = load("registry.manifest.json")
    claimed = m["counts"]

    def count_token_values():
        n = 0
        for root, _, files in os.walk(os.path.join(REPO, "tokens")):
            if os.path.basename(root) == "llm":
                continue
            for f in files:
                if not f.endswith(".json"):
                    continue
                with open(os.path.join(root, f), encoding="utf-8") as fh:
                    d = json.load(fh)

                def walk(o):
                    c = 0
                    if isinstance(o, dict):
                        for k, val in o.items():
                            if k.startswith("$") or k in ("measuredFrom", "notes", "note", "role",
                                                          "usage", "usedBy", "description"):
                                continue
                            if isinstance(val, dict) and ("$value" in val or "$ref" in val):
                                c += 1
                            elif isinstance(val, (str, int, float)):
                                c += 1
                            else:
                                c += walk(val)
                    return c
                n += walk(d)
        return n

    real = {
        "tokenFiles": len([f for _, _, fs in os.walk(os.path.join(REPO, "tokens")) for f in fs
                           if f.endswith(".json")]),
        "tokenValues": count_token_values(),
        "primitives": len(ids("primitives")),
        "components": len(ids("components")),
        "sections": len(ids("sections")),
        "templates": len(load("templates", "templates.json")["templates"]),
        "routes": len(load("templates", "routes.json")["routes"]),
        "assetRoles": len(load("assets", "asset-roles.json")["roles"]),
        "compatibilityRules": len(load("compatibility", "graph.json")["rules"]),
        "controlFixtures": len(ids(os.path.join("schema", "fixtures"))),
    }
    bad = False
    for k, want in real.items():
        if claimed.get(k) != want:
            fail(f"manifest counts.{k} says {claimed.get(k)}, real value is {want}")
            bad = True
    if not bad:
        ok("every count in registry.manifest.json matches the files it summarises: " +
           ", ".join(f"{k}={v}" for k, v in real.items()))

    declared = load("templates", "routes.json").get("routeCount")
    if declared != real["routes"]:
        fail(f"routes.json routeCount says {declared}, real route list has {real['routes']}")
    else:
        ok(f"routes.json routeCount agrees with its own route list ({declared})")


# ------------------------------------------------------------------ 9. version parity
def check_versions():
    print("\n[9] version parity")
    m = load("registry.manifest.json")
    a = load("tokens", "llm", "component-allowlist.json")
    if m["allowlistVersion"] != a["version"]:
        fail(f"manifest allowlistVersion {m['allowlistVersion']!r} != allowlist version {a['version']!r}")
    else:
        ok(f"allowlistVersion {m['allowlistVersion']} matches (this field IS machine-checked)")
    if "versionFieldNote" not in m:
        fail("manifest has no versionFieldNote explaining which version fields are enforced")
    else:
        ok("manifest documents which version fields are enforced vs documentation-only")


# ------------------------------------------------------- 10. route <-> template mapping
def check_routes():
    print("\n[10] route/template mapping")
    templates = load("templates", "templates.json")["templates"]
    routes = load("templates", "routes.json")["routes"]
    paths = [r["path"] for r in routes]
    if len(paths) != len(set(paths)):
        dupes = sorted({p for p in paths if paths.count(p) > 1})
        fail(f"duplicate route paths: {dupes}")
    else:
        ok(f"{len(paths)} routes, all distinct")
    unknown = sorted({r["template"] for r in routes} - set(templates))
    if unknown:
        fail(f"routes reference unknown templates: {unknown}")
    else:
        ok("every route maps to a real template")
    orphan = sorted(set(templates) - {r["template"] for r in routes})
    if orphan:
        fail(f"templates with no route: {orphan}")
    else:
        ok("every template is used by at least one route")

    schema_routes = set(load("schema", "pagespec.schema.json")["properties"]["route"]["enum"])
    if schema_routes != set(paths):
        fail(f"schema route enum disagrees with routes.json: {sorted(schema_routes ^ set(paths))}")
    else:
        ok("schema route enum matches routes.json exactly")

    schema_sections = set(load("schema", "pagespec.schema.json")["definitions"]["node"]
                          ["properties"]["section"]["enum"])
    if schema_sections != set(ids("sections")):
        fail(f"schema section enum disagrees with sections/: {sorted(schema_sections ^ set(ids('sections')))}")
    else:
        ok("schema section enum matches sections/ exactly")

    # every section a template declares must have a contract
    real_sections = set(ids("sections"))
    for tid, t in templates.items():
        for n in t["nodes"]:
            if n["section"] not in real_sections:
                fail(f"template {tid} declares section {n['section']!r} with no contract file")
            if not isinstance(n, dict) or "required" not in n or "repeatable" not in n:
                fail(f"template {tid} node {n.get('section')!r} is not a structured object with "
                     f"required/repeatable")


# -------------------------------------------------------------- 11. citation validity
CITE = re.compile(r"([A-Za-z0-9_./\-]+\.(?:jsx?|css|json|md|html)):(\d+)(?:-(\d+))?")


def check_citations():
    print("\n[11] citation validity")
    if not os.path.isdir(os.path.join(SOURCE_ROOT, "src")):
        warn("no sibling source tree present (expected when this repo is delivered standalone); "
             "citation ranges cannot be resolved. This is a WARNING, not a failure, by design.")
        return

    cites = []
    for p in all_json_files():
        with open(p, encoding="utf-8") as fh:
            text = fh.read()
        for m in CITE.finditer(text):
            cites.append((os.path.relpath(p, REPO), m.group(1), int(m.group(2)),
                          int(m.group(3)) if m.group(3) else int(m.group(2))))

    lens = {}
    bad = 0
    for where, path, a, b in cites:
        full = os.path.join(SOURCE_ROOT, path)
        if path not in lens:
            if not os.path.exists(full):
                lens[path] = None
            else:
                with open(full, encoding="utf-8", errors="replace") as fh:
                    lens[path] = sum(1 for _ in fh)
        n = lens[path]
        if n is None:
            fail(f"{where} cites {path}, which does not exist")
            bad += 1
        elif a < 1 or b > n or a > b:
            fail(f"{where} cites {path}:{a}-{b}, but that file has {n} lines")
            bad += 1
    if not bad:
        ok(f"all {len(cites)} citations across {len(lens)} source files resolve and are in range")
    print(f"         (bounds checking alone cannot catch an in-range citation describing the WRONG code; "
          f"a sample was cross-checked by hand during the build)")


# ------------------------------------------------------------ 12. no absolute paths
def check_no_absolute_paths():
    print("\n[12] no local machine paths")
    # The needles are assembled at runtime so this checker's own source does not
    # contain the literal it searches for and flag itself.
    posix = "/" + "Users" + "/"
    win = re.compile(r"[A-Za-z]:" + re.escape("\\") + "Users" + re.escape("\\"))
    # anchored to a real unix home dir, not the substring "/home/" that appears
    # legitimately inside asset paths such as /assets/images/home/...
    home = re.compile(r"(?:^|[\"\'\\s=(])/home/[a-z][A-Za-z0-9_.-]*/")
    hits = []
    for root, dirs, files in os.walk(REPO):
        dirs[:] = [d for d in dirs if d != "__pycache__"]
        for f in files:
            p = os.path.join(root, f)
            try:
                with open(p, encoding="utf-8", errors="replace") as fh:
                    for i, line in enumerate(fh, 1):
                        if posix in line or win.search(line) or home.search(line):
                            hits.append(f"{os.path.relpath(p, REPO)}:{i}")
            except Exception:
                pass
    if hits:
        for h in hits:
            fail(f"absolute local path leaked at {h}")
    else:
        ok("no absolute local paths anywhere in the repo")


def main():
    print("=" * 74)
    print(f"VERIFY ALL -- {REPO}")
    print("=" * 74)
    check_json()
    check_validators()
    check_allowlist_parity()
    check_asset_roles()
    check_graph_validator_parity()
    check_manifest_counts()
    check_versions()
    check_routes()
    check_citations()
    check_no_absolute_paths()

    print("\n" + "=" * 74)
    print(f"{len(PASSES)} passed, {len(WARNINGS)} warning(s), {len(FAILURES)} failure(s)")
    for w in WARNINGS:
        print(f"  WARN  {w}")
    for f in FAILURES:
        print(f"  FAIL  {f}")
    print("RESULT:", "FAIL" if FAILURES else "PASS")
    return 1 if FAILURES else 0


if __name__ == "__main__":
    sys.exit(main())
