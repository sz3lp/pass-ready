"""Dedupe ordered OCR stems aggressively to get true unique count + list."""
from __future__ import annotations

import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(r"C:\Users\lukep\.cursor\OpenFart\crew80")


def heavy_norm(s: str) -> str:
    s = s.lower()
    s = s.replace("aman ", "a man ").replace("apatient", "a patient")
    s = s.replace("anvunresponsive", "an unresponsive").replace("apneie", "apneic")
    s = s.replace("yomit", "vomit").replace("spontancous", "spontaneous")
    s = s.replace("lin which", "in which").replace("hyou", "you")
    s = s.replace("type i ", "type 1 ")
    s = re.sub(r"^\[+", "", s)
    s = re.sub(r"^_+", "", s)
    s = re.sub(r"^a(?=\d)", "a ", s)  # A5-year -> a 5-year after lower
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    # strip leading orphan words from OCR cutoffs
    for _ in range(3):
        for w in ("patient ", "an ", "a ", "the ", "physically ", "following ", "after ", "while "):
            # only strip if remaining still long and looks incomplete start
            pass
    return s


def core_key(s: str) -> str:
    n = heavy_norm(s)
    # use distinctive middle: drop first 0-10 if starts mid-sentence
    # take words that matter
    words = n.split()
    if len(words) > 8 and words[0] in {"patient", "an", "a", "the", "following", "after", "while", "assessment"}:
        # keep as is for full stems; for fragments use last 40 chars key
        pass
    # Key on characteristic substring: last 40 of first 80 chars often stable
    if len(n) > 70:
        return n[10:65] if n.startswith(("a ", "an ", "the ", "patient ")) else n[:55]
    return n[:55]


def bank_keys() -> dict[str, str]:
    ts = (ROOT / "src/data/questions-jb-testprep.ts").read_text(encoding="utf-8")
    stems = [
        m.group(2).replace("\\'", "'").replace('\\"', '"')
        for m in re.finditer(r"stem:\s*(['\"])(.*?)\1", ts, re.S)
    ]
    return {core_key(s): s for s in stems}


def main() -> None:
    lines = Path(r"C:\Users\lukep\Videos\JBLearning_ordered_unique.txt").read_text(
        encoding="utf-8"
    ).splitlines()
    stems = []
    for line in lines:
        line = re.sub(r"^\d+\.\s*", "", line.strip())
        if line:
            stems.append(line)

    deduped: list[str] = []
    seen: set[str] = set()
    for s in stems:
        k = core_key(s)
        if k in seen:
            continue
        # also check overlap with existing
        if any(k[:35] == sk[:35] for sk in seen):
            continue
        seen.add(k)
        deduped.append(s)

    out = Path(r"C:\Users\lukep\Videos\JBLearning_deduped_120_hunt.txt")
    out.write_text(
        "\n".join(f"{i:03d}. {s}" for i, s in enumerate(deduped, 1)) + "\n",
        encoding="utf-8",
    )
    print(f"deduped count: {len(deduped)} -> {out}")

    bk = bank_keys()
    print(f"bank: {len(bk)}")

    missing = []
    for s in deduped:
        k = core_key(s)
        if k in bk or any(k[:35] == b[:35] for b in bk):
            continue
        missing.append(s)
    print(f"\nin OCR deduped but NOT in bank ({len(missing)}):")
    for m in missing:
        print("-", m)

    extras = []
    for k, s in bk.items():
        if any(k[:35] == core_key(d)[:35] for d in deduped):
            continue
        # colon stems may be missing from ordered if filter required ?
        extras.append(s)
    print(f"\nin bank but NOT in OCR deduped ({len(extras)}):")
    for e in extras:
        print("+", e[:160])


if __name__ == "__main__":
    main()
