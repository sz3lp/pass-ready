"""Find duplicate scene frame and inspect 8fps neighbors for a missed stem."""
from __future__ import annotations

import re
from pathlib import Path

scene_ocr = Path(r"C:\Users\lukep\Videos\screenrecord_ocr_scene_low")
scene_img = Path(r"C:\Users\lukep\Videos\screenrecord_frames_scene_low")
fps8 = Path(r"C:\Users\lukep\Videos\screenrecord_frames_8fps")
fps8_ocr_sample = Path(r"C:\Users\lukep\Videos\screenrecord_ocr_8fps_sample")


def first_line(p: Path) -> str:
    lines = [l.strip() for l in p.read_text(encoding="utf-8", errors="replace").splitlines() if l.strip()]
    return re.sub(r"\s+", " ", lines[0])[:100] if lines else ""


def nk(s: str) -> str:
    s = re.sub(r"[^a-z0-9 ]", " ", s.lower())
    s = re.sub(r"\s+", " ", s).strip()
    return s[:50]


# map scene frame -> stem key
items = []
for f in sorted(scene_ocr.glob("frame_*.txt")):
    fl = first_line(f)
    items.append((f.stem, nk(fl), fl))

# find dup keys
from collections import defaultdict

by_key = defaultdict(list)
for stem, k, fl in items:
    by_key[k].append((stem, fl))

print("scene ocr count", len(items), "unique keys", len(by_key))
for k, lst in by_key.items():
    if len(lst) > 1:
        print("DUP:", lst)

# Build authentic set from scene unique + known
auth = {k for k, lst in by_key.items()}
print("auth keys", len(auth))

# Check ALL 8fps sample OCR for anything not in auth
new = []
for f in sorted(fps8_ocr_sample.glob("frame_*.txt")):
    fl = first_line(f)
    if len(fl) < 40:
        continue
    k = nk(fl)
    if k in auth or any(k[:35] == ak[:35] for ak in auth):
        continue
    # filter choice fragments
    low = fl.lower()
    if not any(
        low.startswith(s)
        for s in (
            "which",
            "what",
            "when",
            "why",
            "how",
            "after",
            "while",
            "a ",
            "an ",
            "you ",
            "your ",
            "if ",
            "the ",
            "ventilation",
            "aspirin",
            "common",
            "general",
            "despite",
            "shortly",
            "at the",
            "in which",
            "in most",
            "assessment",
            "witnesses",
            "following",
            "assuming",
        )
    ):
        continue
    new.append((f.name, fl))

print("8fps sample new", len(new))
for n in new:
    print("-", n)

# Also: compare stems_only unique count
stems = Path(r"C:\Users\lukep\Videos\JBLearning_stems_only.txt")
so = {}
for line in stems.read_text(encoding="utf-8").splitlines():
    s = re.sub(r"^\d+\.\s*", "", line.strip())
    so[nk(s)] = s
print("stems_only unique", len(so))
only_so = [s for k, s in so.items() if k not in auth and not any(k[:35] == ak[:35] for ak in auth)]
print("in stems_only not scene", len(only_so))
for s in only_so:
    print("SO:", s[:120])
