"""Build clean 120 authentic stems; diff vs bank; drop chlorine if not authentic."""
from __future__ import annotations

import re
from pathlib import Path

BANK_PY = Path(r"C:\Users\lukep\.cursor\OpenFart\crew80\scripts\gen-jb-bank.py")
BANK_TS = Path(r"C:\Users\lukep\.cursor\OpenFart\crew80\src\data\questions-jb-testprep.ts")


def clean(s: str) -> str:
    s = s.lower()
    for a, b in [
        ("yolume", "volume"),
        ("yomit", "vomit"),
        ("spontancous", "spontaneous"),
        ("apneie", "apneic"),
        ("type | ", "type 1 "),
        ("type i ", "type 1 "),
        ("53-year-old girl", "5-year-old girl"),
        ("ivhe ", "the "),
        ("lin which", "in which"),
        ("lin most", "in most"),
        ("or dirt", "of dirt"),
        ("with of the", "which of the"),
        ("mass~", "mass-"),
        ("you-do", "you do"),
        ("und is", "and is"),
        ("coal and", "cool and"),
        ("sce minor", "see minor"),
        ("wornan", "woman"),
        ("aman ", "a man "),
        ("awoman ", "a woman "),
    ]:
        s = s.replace(a, b)
    # strip glued choices
    s = re.split(r"\s(?:2?[A-D]\)|O\s*[A-D]\)|Ac\s+[A-D])", s, maxsplit=1)[0]
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    s = re.sub(r"^(an|a|the)\s+", "", s)
    return s


def key8(s: str) -> str:
    words = [w for w in clean(s).split() if len(w) > 1][:10]
    return " ".join(words)


def add(store: dict[str, str], raw: str) -> None:
    raw = re.sub(r"\s+", " ", raw).strip()
    raw = re.sub(r"^[\[\|]+", "", raw).strip()
    # cut glued choices from display form too
    display = re.split(r"\s(?:2?[A-D]\)|O\s*[A-D]\)|Ac\s+[A-D])", raw, maxsplit=1)[0].strip()
    if len(display) < 30 and not display.lower().startswith("ventilation"):
        return
    k = key8(display)
    if len(k) < 18:
        return
    if k not in store or len(display) > len(store[k]):
        store[k] = display


store: dict[str, str] = {}

# stems_only + video2
for p in [
    Path(r"C:\Users\lukep\Videos\JBLearning_stems_only.txt"),
    Path(r"C:\Users\lukep\Videos\JBLearning_stems_video2.txt"),
]:
    for line in p.read_text(encoding="utf-8", errors="replace").splitlines():
        add(store, re.sub(r"^\d+\.\s*", "", line.strip()))

# scene ocr first-line-ish
d = Path(r"C:\Users\lukep\Videos\screenrecord_ocr_scene_low")
for f in d.glob("frame_*.txt"):
    lines = [l.strip() for l in f.read_text(encoding="utf-8", errors="replace").splitlines() if l.strip()]
    if not lines:
        continue
    blob = " ".join(lines)
    add(store, blob)

# forced
for s in [
    "Ventilation is defined as the:",
    "What is the primary clinical feature associated with exposure to a vesicant agent?",
    "An injured man opens his eyes when you speak to him and pulls his arm away when you palpate it. He knows his name, but cannot remember what happened and does not know what day it is. What is his Glasgow Coma Scale (GCS) score?",
    "A patient overdosed on several drugs and is unresponsive with shallow breathing and facial cyanosis. As you continue your assessment, the patient suddenly vomits. What should you do?",
    "Which of the following statements regarding artificial ventilation of an apneic patient who has dentures is correct?",
]:
    add(store, s)

print("CLEAN_AUTHENTIC", len(store))
out = Path(r"C:\Users\lukep\Videos\JBLearning_CLEAN_120.txt")
ordered = sorted(store.values(), key=lambda x: clean(x))
out.write_text("\n".join(f"{i:03d}. {s}" for i, s in enumerate(ordered, 1)), encoding="utf-8")
print("wrote", out)

# bank stems
ts = BANK_TS.read_text(encoding="utf-8")
bank = re.findall(r"stem:\s*'((?:\\'|[^'])*)'", ts)
bank += re.findall(r'stem:\s*"((?:\\"|[^"])*)"', ts)
bank_map = {key8(s): s for s in bank}
print("BANK", len(bank_map))

only_auth = [s for k, s in store.items() if k not in bank_map and not any(k[:40] == bk[:40] for bk in bank_map)]
only_bank = [s for k, s in bank_map.items() if k not in store and not any(k[:40] == ak[:40] for ak in store)]
print("only_auth", len(only_auth))
for s in only_auth:
    print("A:", s[:140])
print("only_bank", len(only_bank))
for s in only_bank:
    print("B:", s[:140])
