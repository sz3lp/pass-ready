"""Strict unique-stem inventory: build canonical set from OCR, compare to bank."""
from __future__ import annotations

import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(r"C:\Users\lukep\.cursor\OpenFart\crew80")
VID = Path(r"C:\Users\lukep\Videos")
OUT = VID / "JBLearning_unique_stems_merged.txt"


def norm(s: str) -> str:
    s = s.lower()
    s = s.replace("aman ", "a man ").replace("a5-", "a 5-").replace("a7-", "a 7-")
    s = s.replace("aa ", "a ")
    s = s.replace("hyou ", "you ").replace("type i ", "type 1 ")
    s = re.sub(r"^\[+", "", s)
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    # drop leading fragments
    for prefix in ("an ", "the ", "physically "):
        pass
    return s


def stem_key(s: str) -> str:
    n = norm(s)
    # use first 55 chars of meaningful content
    return n[:55]


def bank_stems() -> list[str]:
    ts = (ROOT / "src/data/questions-jb-testprep.ts").read_text(encoding="utf-8")
    return [
        m.group(2).replace("\\'", "'").replace('\\"', '"')
        for m in re.finditer(r"stem:\s*(['\"])(.*?)\1", ts, re.S)
    ]


def collect() -> dict[str, str]:
    found: dict[str, str] = {}

    def add(raw: str) -> None:
        raw = re.sub(r"\s+", " ", raw).strip()
        raw = re.sub(r"^\d+\.\s*", "", raw)
        if "?" not in raw or len(raw) < 40:
            return
        # skip choice fragments
        if re.match(r"^[-–]?\s*[A-D]\)", raw):
            return
        k = stem_key(raw)
        if len(k) < 30:
            return
        # prefer longer cleaner versions
        if k not in found or len(raw) > len(found[k]):
            found[k] = raw[:240]

    # curated stem lists first
    for p in [
        VID / "JBLearning_stems_only.txt",
        VID / "JBLearning_stems_video2.txt",
        VID / "JBLearning_stems_video3.txt",
    ]:
        if p.exists():
            for line in p.read_text(encoding="utf-8", errors="replace").splitlines():
                add(line)

    # known OCR-missed but frame-confirmed
    add(
        "What is the primary clinical feature associated with exposure to a vesicant agent?"
    )
    add(
        "An injured man opens his eyes when you speak to him and pulls his arm away when you palpate it. He knows his name, but cannot remember what happened and does not know what day it is. What is his Glasgow Coma Scale (GCS) score?"
    )

    # dense OCR dumps
    for p in [
        VID / "screenrecord_ocr_dense_all.txt",
        VID / "screenrecord_ocr.txt",
        VID / "screenrecord3_ocr_all.txt",
    ]:
        if not p.exists():
            continue
        text = p.read_text(encoding="utf-8", errors="replace")
        q_re = re.compile(
            r"(?is)((?:Which of the following|What should you|What is the|When |After |While |Following |A \d|An unresponsive|An obese|An injured|A patient|A woman|A man|A \d+-year|You are|If an|In which|In most|Common complaints|Witnesses report|General guidelines|Assessment of|Despite |Shortly after|At the end|Your partner|Assuming )[^\n?]{20,280}\?)"
        )
        for m in q_re.findall(text):
            add(m)

    return found


def main() -> None:
    bank = bank_stems()
    bank_keys = {stem_key(s): s for s in bank}
    found = collect()

    lines = [f"{i:03d}. {s}" for i, s in enumerate(sorted(found.values(), key=lambda x: x.lower()), 1)]
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"merged unique OCR stems: {len(found)} -> {OUT}")

    missing = []
    for k, raw in found.items():
        if k in bank_keys:
            continue
        if any(k[:40] == bk[:40] for bk in bank_keys):
            continue
        missing.append(raw)

    print(f"\nOCR stems not in bank ({len(missing)}):")
    for m in sorted(missing, key=str.lower):
        print("-", m)

    extras = []
    for k, s in bank_keys.items():
        if k in found:
            continue
        if any(k[:40] == fk[:40] for fk in found):
            continue
        extras.append(s)

    print(f"\nBank stems without OCR match ({len(extras)}):")
    for e in extras:
        print("+", e)


if __name__ == "__main__":
    main()
