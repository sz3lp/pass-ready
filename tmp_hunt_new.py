"""Find stems in new OCR dirs not already in authentic set."""
from __future__ import annotations

import re
from pathlib import Path

AUTH = Path(r"C:\Users\lukep\Videos\JBLearning_FINAL_120.txt")
BANK = Path(r"C:\Users\lukep\.cursor\OpenFart\crew80\src\data\questions-jb-testprep.ts")
DIRS = [
    Path(r"C:\Users\lukep\Videos\screenrecord_ocr_scene_low"),
    Path(r"C:\Users\lukep\Videos\screenrecord_ocr_8fps_sample"),
]


def nk(s: str) -> str:
    s = re.sub(r"[^a-z0-9 ]", " ", s.lower())
    s = re.sub(r"\s+", " ", s).strip()
    s = re.sub(r"^(an|a|the)\s+", "", s)
    return s[:55]


auth = {}
for line in AUTH.read_text(encoding="utf-8").splitlines():
    s = re.sub(r"^\d+\.\s*", "", line.strip())
    auth[nk(s)] = s
# forced known
for s in [
    "Ventilation is defined as the:",
    "What is the primary clinical feature associated with exposure to a vesicant agent?",
    "An injured man opens his eyes when you speak to him and pulls his arm away when you palpate it. He knows his name, but cannot remember what happened and does not know what day it is. What is his Glasgow Coma Scale (GCS) score?",
]:
    auth[nk(s)] = s

print("auth", len(auth))

found_new = {}
for d in DIRS:
    if not d.exists():
        print("missing", d)
        continue
    files = list(d.glob("frame_*.txt"))
    print(d.name, "files", len(files))
    for f in files:
        t = f.read_text(encoding="utf-8", errors="replace")
        lines = [re.sub(r"\s+", " ", l).strip() for l in t.splitlines() if l.strip()]
        if not lines:
            continue
        blob = " ".join(lines)
        blob = re.sub(r"^[\[\|]+", "", blob)
        blob = re.split(r"\s(?:O\s*)?[A-D]\)|\sOA\)|\sOB\)", blob, maxsplit=1)[0].strip()
        blob = re.sub(r"\s+", " ", blob)
        low = blob.lower()
        if len(blob) < 40:
            continue
        starters = (
            "which", "what", "when", "why", "how", "after", "while", "a ", "an ", "you ",
            "your ", "if ", "the ", "ventilation", "aspirin", "common", "general", "despite",
            "shortly", "at the", "in which", "in most", "assessment", "witnesses", "following",
            "assuming",
        )
        if not any(low.startswith(s) for s in starters):
            continue
        k = nk(blob)
        if k in auth or any(k[:40] == ak[:40] for ak in auth):
            continue
        found_new[k] = (f.name, blob[:180])

print("NEW candidates", len(found_new))
for k, (fn, blob) in sorted(found_new.items(), key=lambda x: x[1][1].lower()):
    print(f"{fn}: {blob}")
