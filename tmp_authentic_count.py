"""Definitive fuzzy-deduped count of authentic TestPrep stems from all sources."""
from __future__ import annotations

import re
from pathlib import Path

SOURCES = [
    Path(r"C:\Users\lukep\Videos\JBLearning_stems_only.txt"),
    Path(r"C:\Users\lukep\Videos\JBLearning_stems_video2.txt"),
    Path(r"C:\Users\lukep\Videos\screenrecord_ocr_scene_low"),
]


def clean(s: str) -> str:
    s = s.lower()
    reps = {
        "yolume": "volume",
        "yomit": "vomit",
        "yomnits": "vomits",
        "spontancous": "spontaneous",
        "apneie": "apneic",
        "apneie": "apneic",
        "und is": "and is",
        "coal and": "cool and",
        "sce minor": "see minor",
        "haye": "have",
        "hus bilateral": "has bilateral",
        "ivhe ": "the ",
        "lin which": "in which",
        "lin most": "in most",
        "lou ": "you ",
        "hyou ": "you ",
        "aman ": "a man ",
        "awoman ": "a woman ",
        "awornan ": "a woman ",
        "wornan ": "woman ",
        "apatient ": "a patient ",
        "trauma patient": "a trauma patient",
        "|a ": "a ",
        "|an ": "an ",
        "[a ": "a ",
        "[an ": "an ",
        "[after": "after",
        "[assessment": "assessment",
        "aa ": "a ",
        "a5-": "a 5-",
        "a7-": "a 7-",
        "a53-year-old girl": "a 5-year-old girl",
        "53-year-old girl": "5-year-old girl",
        "type | ": "type 1 ",
        "type i ": "type 1 ",
        "with of the": "which of the",
        "or dirt": "of dirt",
        "mass~": "mass-",
        "you-do": "you do",
    }
    for a, b in reps.items():
        s = s.replace(a, b)
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    s = re.sub(r"^(an|a|the)\s+", "", s)
    return s


def fingerprint(s: str) -> str:
    """Use first ~12 significant words as fingerprint."""
    words = [w for w in clean(s).split() if len(w) > 2][:12]
    return " ".join(words)


def add_stem(store: dict[str, str], raw: str) -> None:
    raw = re.sub(r"\s+", " ", raw).strip()
    raw = re.sub(r"^[\[\|]+", "", raw).strip()
    if len(raw) < 35 and not raw.lower().startswith("ventilation"):
        return
    # skip if mostly choices
    if re.match(r"^[a-d]\)", raw.lower()):
        return
    fp = fingerprint(raw)
    if len(fp) < 20:
        return
    if fp not in store or len(raw) > len(store[fp]):
        store[fp] = raw


store: dict[str, str] = {}

# text sources
for p in SOURCES[:2]:
    for line in p.read_text(encoding="utf-8", errors="replace").splitlines():
        s = re.sub(r"^\d+\.\s*", "", line.strip())
        add_stem(store, s)

# scene ocr
d = SOURCES[2]
for f in d.glob("frame_*.txt"):
    lines = [l.strip() for l in f.read_text(encoding="utf-8", errors="replace").splitlines() if l.strip()]
    if not lines:
        continue
    blob = " ".join(lines)
    blob = re.split(r"\s(?:O\s*)?[A-D]\)|\sAc\s+[A-D]|\sOA\)|\sOB\)", blob, maxsplit=1)[0]
    add_stem(store, blob)

# forced OCR-confirmed extras (already in scene but ensure)
for s in [
    "Ventilation is defined as the:",
    "What is the primary clinical feature associated with exposure to a vesicant agent?",
    "An injured man opens his eyes when you speak to him and pulls his arm away when you palpate it. He knows his name, but cannot remember what happened and does not know what day it is. What is his Glasgow Coma Scale (GCS) score?",
    "A patient overdosed on several drugs and is unresponsive with shallow breathing and facial cyanosis. As you continue your assessment, the patient suddenly vomits. What should you do?",
    "Which of the following statements regarding artificial ventilation of an apneic patient who has dentures is correct?",
]:
    add_stem(store, s)

print(f"AUTHENTIC_UNIQUE={len(store)}")
out = Path(r"C:\Users\lukep\Videos\JBLearning_AUTHENTIC_UNIQUE.txt")
lines = [f"{i:03d}. {s}" for i, s in enumerate(sorted(store.values(), key=lambda x: clean(x)), 1)]
out.write_text("\n".join(lines), encoding="utf-8")
print("wrote", out)

# list fingerprints for manual scan
for i, (fp, s) in enumerate(sorted(store.items(), key=lambda x: x[0]), 1):
    print(f"{i:03d}|{fp}|{s[:90]}")
