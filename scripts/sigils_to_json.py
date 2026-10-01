#!/usr/bin/env python3
"""Converts docs/sigils/*.md entries into src/data/sigils.json."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs" / "sigils"
FILES = ["red", "orange", "green", "blue", "teal", "purple", "gray", "dual"]
KEYS = {
    "Code": "code", "Name": "name", "Text": "text", "Timing": "timing",
    "Archetypes": "archetypes", "Family": "family", "Role": "role",
    "Decision": "decision", "Opponent": "opponent", "AI note": "aiNote",
    "Rationale": "rationale", "Deviation": "deviation",
}


def registry():
    rows = {}
    for line in (DOCS / "registry.md").read_text().splitlines():
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if re.fullmatch(r"[A-Z]{2}-[A-Z]\d+", cells[0]):
            rows[cells[0]] = {"iconFamily": cells[3], "iconWord": cells[4], "wave": int(cells[9])}
    return rows


def parse(block, reg):
    raw = dict(re.match(r"^([A-Za-z][A-Za-z ]*):\s+(.*)$", l).groups() for l in block.strip().splitlines())
    s = {}
    for k, v in raw.items():
        if k in KEYS:
            s[KEYS[k]] = v
    icon, _, alts = raw["Icon"].partition("(alternates:")
    s["icon"] = icon.strip()
    s["iconAlternates"] = [
        dict(zip(("name", "icon"), (p.strip() for p in a.split("/"))))
        for a in alts.rstrip(") ").split(",") if a.strip()
    ]
    s["resonances"] = [r.strip() for r in raw["Resonance"].split("+")]
    rarity, price = re.fullmatch(r"(\w+) \((\d+) gold\)", raw["Rarity"]).groups()
    s["rarity"], s["price"] = rarity, int(price)
    s["signature"] = []
    # A semicolon starts a new clause only when four more pipes follow it.
    for clause in re.split(r";(?=(?:[^|]*\|){4})", raw["Signature"]):
        parts = [p.strip() for p in clause.split("|")]
        assert len(parts) == 5, (s["code"], clause)
        s["signature"].append(dict(zip(("trigger", "scope", "target", "effect", "frequency"), parts)))
    s.update(reg[s["code"]])
    order = ["code", "name", "resonances", "rarity", "price", "wave", "icon", "iconFamily", "iconWord",
             "iconAlternates", "text", "timing", "signature", "archetypes", "family", "role", "decision",
             "opponent", "aiNote", "rationale", "deviation"]
    return {k: s[k] for k in order if k in s}


def main():
    reg = registry()
    sigils = []
    for f in FILES:
        for block in re.findall(r"```\n(.*?)```", (DOCS / f"{f}.md").read_text(), re.S):
            sigils.append(parse(block, reg))
    assert len(sigils) == len(reg) == len({s["code"] for s in sigils}), (len(sigils), len(reg))
    out = ROOT / "src" / "data" / "sigils.json"
    out.write_text(json.dumps(sigils, indent=2, ensure_ascii=False) + "\n")
    print(f"Wrote {len(sigils)} sigils to {out.relative_to(ROOT)}")


main()
