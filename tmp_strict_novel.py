"""Strict: find any 8fps OCR stem not in the 119 scene set."""
from __future__ import annotations

import re
from pathlib import Path


def key(s: str) -> str:
    s = s.lower()
    s = re.split(r"\s(?:2?[a-d]\)|o\s*[a-d]\)|ac\s+[a-d])", s, maxsplit=1)[0]
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    s = re.sub(r"^(an|a|the)\s+", "", s)
    words = s.split()[:14]
    return " ".join(words)


scene = {}
for f in Path(r"C:\Users\lukep\Videos\screenrecord_ocr_scene_low").glob("frame_*.txt"):
    lines = [l.strip() for l in f.read_text(encoding="utf-8", errors="replace").splitlines() if l.strip()]
    if not lines:
        continue
    blob = re.split(r"\s(?:O\s*)?[A-D]\)|\sAc\s+", " ".join(lines), maxsplit=1)[0]
    scene[key(blob)] = blob[:120]

print("scene", len(scene))

# all 8fps sample
found = []
for f in Path(r"C:\Users\lukep\Videos\screenrecord_ocr_8fps_sample").glob("frame_*.txt"):
    lines = [l.strip() for l in f.read_text(encoding="utf-8", errors="replace").splitlines() if l.strip()]
    if not lines:
        continue
    blob = re.split(r"\s(?:O\s*)?[A-D]\)|\sAc\s+", " ".join(lines), maxsplit=1)[0]
    k = key(blob)
    if len(k) < 25:
        continue
    if k in scene:
        continue
    # token overlap check
    sw = set(k.split())
    ok = False
    for sk in scene:
        bw = set(sk.split())
        if len(sw & bw) / max(1, len(sw)) >= 0.7:
            ok = True
            break
    if not ok:
        found.append((f.name, blob[:160]))

print("8fps novel", len(found))
for n, b in found:
    print(n, b)

# dense ocr first lines
dense_new = []
for f in Path(r"C:\Users\lukep\Videos\screenrecord_ocr_dense").glob("frame_*.txt"):
    lines = [l.strip() for l in f.read_text(encoding="utf-8", errors="replace").splitlines() if l.strip()]
    if not lines:
        continue
    blob = re.split(r"\s(?:O\s*)?[A-D]\)|\sOA\)|\sOB\)", " ".join(lines), maxsplit=1)[0]
    blob = re.sub(r"^[\[\|]+", "", blob)
    k = key(blob)
    if len(k) < 25:
        continue
    starters = ("which", "what", "when", "why", "how", "after", "while", "a ", "an ", "you ", "your ", "if ", "the ", "ventilation", "aspirin", "common", "general", "despite", "shortly", "at the", "in which", "in most", "assessment", "witnesses", "following")
    if not any(blob.lower().startswith(s) for s in starters):
        continue
    sw = set(k.split())
    ok = False
    for sk in scene:
        bw = set(sk.split())
        if len(sw & bw) / max(1, len(sw)) >= 0.7:
            ok = True
            break
    if not ok:
        dense_new.append((f.name, blob[:160]))

# unique dense_new
uniq = {}
for fn, b in dense_new:
    uniq[key(b)] = (fn, b)
print("dense novel", len(uniq))
for k, (fn, b) in sorted(uniq.items(), key=lambda x: x[1][1].lower()):
    print(fn, b)
