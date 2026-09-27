"""Extract unique stems from video3 OCR (1031 frames)."""
from __future__ import annotations

import re
from pathlib import Path

d = Path(r"C:\Users\lukep\Videos\screenrecord3_ocr")
bank = Path(r"C:\Users\lukep\.cursor\OpenFart\crew80\src\data\questions-jb-testprep.ts").read_text(encoding="utf-8")
bank_stems = re.findall(r"stem:\s*'((?:\\'|[^'])*)'", bank)
bank_stems += re.findall(r'stem:\s*"((?:\\"|[^"])*)"', bank)


def nk(s: str) -> str:
    s = re.sub(r"[^a-z0-9 ]", " ", s.lower())
    s = re.sub(r"\s+", " ", s).strip()
    s = re.sub(r"^(an|a|the)\s+", "", s)
    return s[:55]


bank_k = {nk(s) for s in bank_stems}
seen = {}
for f in sorted(d.glob("frame_*.txt")):
    t = f.read_text(encoding="utf-8", errors="replace")
    if "glasgow" in t.lower():
        stem = (
            "An injured man opens his eyes when you speak to him and pulls his arm away "
            "when you palpate it. He knows his name, but cannot remember what happened and "
            "does not know what day it is. What is his Glasgow Coma Scale (GCS) score?"
        )
    else:
        lines = [re.sub(r"\s+", " ", l).strip() for l in t.splitlines() if l.strip()]
        if not lines:
            continue
        blob = " ".join(lines)
        blob = re.sub(r"^[\[\|]+", "", blob)
        blob = re.split(r"\s(?:O\s*)?[A-D]\)|\sOA\)|\sOB\)|\s©", blob, maxsplit=1)[0].strip()
        blob = re.sub(r"\s+", " ", blob)
        low = blob.lower()
        if len(blob) < 55:
            continue
        starters = ("which", "what", "when", "why", "how", "after", "while", "a ", "an ", "you ", "your ", "if ", "the ", "ventilation", "aspirin", "common", "general", "despite", "shortly", "at the", "in which", "in most", "assessment", "witnesses", "following")
        if not any(low.startswith(s) for s in starters):
            continue
        stem = blob
    k = nk(stem)
    if k not in seen or len(stem) > len(seen[k]):
        seen[k] = stem

print("video3_unique", len(seen))
missing = []
for k, s in sorted(seen.items(), key=lambda x: x[1].lower()):
    if k in bank_k or any(k[:40] == bk[:40] for bk in bank_k):
        continue
    missing.append(s)
print("video3_not_in_bank", len(missing))
for s in missing:
    print("-", s[:150])

# dump
out = Path(r"C:\Users\lukep\Videos\JBLearning_video3_unique.txt")
out.write_text("\n".join(f"{i:03d}. {s}" for i, s in enumerate(sorted(seen.values(), key=str.lower), 1)), encoding="utf-8")
print("wrote", out)
