"""Walk dense OCR frames in order; emit unique question transitions."""
from __future__ import annotations

import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

VID = Path(r"C:\Users\lukep\Videos")
DIRS = [
    VID / "screenrecord_ocr_dense",
    VID / "screenrecord_ocr_4fps_changes",
]


def clean_first_line(text: str) -> str:
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    if not lines:
        return ""
    # join first 2 lines if first doesn't end with ? and second continues
    s = lines[0]
    if "?" not in s and len(lines) > 1:
        s = s + " " + lines[1]
    s = re.sub(r"^[^\w]+", "", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def key(s: str) -> str:
    s = s.lower()
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    return re.sub(r"\s+", " ", s).strip()[:50]


def walk(d: Path) -> list[str]:
    ordered: list[str] = []
    seen: set[str] = set()
    prev = ""
    for f in sorted(d.glob("frame_*.txt")):
        raw = f.read_text(encoding="utf-8", errors="replace")
        s = clean_first_line(raw)
        if len(s) < 40:
            continue
        # must look like a question stem (has ? or ends with :)
        if "?" not in s and not s.rstrip().endswith(":"):
            continue
        k = key(s)
        if k == prev:
            continue
        prev = k
        if k in seen:
            continue
        # skip if it's mostly choices
        if re.match(r"^[A-D]\)", s):
            continue
        seen.add(k)
        ordered.append(s[:220])
    return ordered


def main() -> None:
    all_ordered: list[str] = []
    all_seen: set[str] = set()
    for d in DIRS:
        if not d.exists():
            continue
        print(f"=== {d.name} ===")
        items = walk(d)
        print(f"unique transitions: {len(items)}")
        for i, s in enumerate(items, 1):
            print(f"{i:03d}. {s}")
            k = key(s)
            if k not in all_seen:
                all_seen.add(k)
                all_ordered.append(s)

    # also video3 if ready
    d3 = VID / "screenrecord3_ocr"
    if d3.exists() and any(d3.glob("frame_*.txt")):
        print(f"\n=== screenrecord3_ocr partial ===")
        items = walk(d3)
        print(f"unique transitions so far: {len(items)}")
        for s in items:
            k = key(s)
            if k not in all_seen:
                all_seen.add(k)
                all_ordered.append(s)
                print("NEW:", s[:180])

    out = VID / "JBLearning_ordered_unique.txt"
    out.write_text(
        "\n".join(f"{i:03d}. {s}" for i, s in enumerate(all_ordered, 1)) + "\n",
        encoding="utf-8",
    )
    print(f"\nTOTAL ORDERED UNIQUE: {len(all_ordered)} -> {out}")


if __name__ == "__main__":
    main()
