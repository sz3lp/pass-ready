"""Canonical 120 hunt: stems_only unique + extras from dense/video2."""
from __future__ import annotations

import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

VID = Path(r"C:\Users\lukep\Videos")
ROOT = Path(r"C:\Users\lukep\.cursor\OpenFart\crew80")


def key(s: str) -> str:
    s = s.lower()
    s = s.replace("type i ", "type 1 ").replace("aman ", "a man ").replace("awoman ", "a woman ")
    s = re.sub(r"^\d+\.\s*", "", s)
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s[:58]


def load_stems_only() -> dict[str, str]:
    out: dict[str, str] = {}
    for line in (VID / "JBLearning_stems_only.txt").read_text(encoding="utf-8").splitlines():
        line = re.sub(r"^\d+\.\s*", "", line.strip())
        if len(line) < 30:
            continue
        out.setdefault(key(line), line)
    return out


EXTRAS = [
    (
        "A patient overdosed on several drugs and is unresponsive with shallow breathing and facial cyanosis. As you continue your assessment, the patient suddenly vomits. What should you do?",
        ["Suction his oropharynx at once", "Turn the patient onto his side", "Insert an oropharyngeal airway", "Begin assisting his ventilations"],
        1,
        11,
        "vomit",
        "Turn onto the side first so vomit drains, then suction.",
    ),
    (
        "Which of the following statements regarding artificial ventilation of an apneic patient who has dentures is correct?",
        [
            "Tight-fitting dentures should always be removed before ventilating.",
            "Dentures should be removed if they can easily be taken out of the mouth.",
            "An oral airway is never needed when a patient still has dentures in place.",
            "Tight-fitting dentures should be left in place because they facilitate the delivery of adequate ventilation.",
        ],
        3,
        11,
        "dentures",
        "Leave tight-fitting dentures in — they help maintain a mask seal.",
    ),
    (
        "What is the primary clinical feature associated with exposure to a vesicant agent?",
        ["Tachycardia", "Skin blistering", "Vomiting blood", "Muscle twitching"],
        1,
        41,
        "vesicant",
        "Vesicants are blister agents — hallmark is skin blistering.",
    ),
    (
        "An injured man opens his eyes when you speak to him and pulls his arm away when you palpate it. He knows his name, but cannot remember what happened and does not know what day it is. What is his Glasgow Coma Scale (GCS) score?",
        ["9", "10", "11", "12"],
        2,
        26,
        "GCS",
        "Eyes to speech = 3, withdraws to pain = 4, confused = 4 → GCS 11.",
    ),
]


def scan_dense_for_new(known: dict[str, str]) -> list[str]:
    """Find any full stems in dense OCR not in known."""
    dense = VID / "screenrecord_ocr_dense"
    new = []
    # patterns that start real questions
    pat = re.compile(
        r"(?m)^[^\n]{0,5}((?:Which of the following|What should you do when|What is the primary|What is the main|What percentage|When attaching|When caring|When driving|After an adult|After applying|After restoring|After attaching|After drying|While assessing|While performing|While triaging|Following penetrating|Following blunt|A patient overdosed|A \d+-year-old|A \d+-month-old|An unresponsive|An obese|An injured|A woman|A man has|A man was|A trauma|You are|If an adult|In which|In most|Common complaints|Witnesses report|General guidelines|Assessment of|Despite direct|Shortly after|At the end|Your partner|Ventilation is defined|The amount of air|The EMT is treating|Aspirin may be|Why can|Why should|A 5-year-old|A 7-year-old|A 3-year-old|A 3-month-old|A 10-year-old|A 22-year-old|A 26-year-old|A 28-year-old|A 29-year-old|A 30-year-old|A 33-year-old|A 46-year-old|A 49-year-old|A 56-year-old|A 60-year-old|A 65-year-old|A 66-year-old|A 67-year-old|A 69-year-old|An unresponsive patient has)[^\n]{10,200})"
    )
    for f in sorted(dense.glob("frame_*.txt")):
        t = f.read_text(encoding="utf-8", errors="replace")
        for m in pat.finditer(t):
            stem = m.group(1).strip()
            # complete to ? or :
            rest = t[m.end() : m.end() + 120].replace("\n", " ")
            if "?" not in stem and ":" not in stem:
                qm = re.search(r"[\?:]", stem + rest)
                if qm:
                    combined = (stem + rest)[: qm.end()]
                    stem = re.sub(r"\s+", " ", combined).strip()
            stem = re.sub(r"\s+", " ", stem).strip()
            if len(stem) < 40:
                continue
            k = key(stem)
            if k in known:
                continue
            if any(k[:40] == kk[:40] for kk in known):
                continue
            known[k] = stem
            new.append(stem)
    return new


def main() -> None:
    known = load_stems_only()
    print(f"stems_only unique: {len(known)}")

    for stem, *_ in EXTRAS:
        k = key(stem)
        if k not in known and not any(k[:40] == kk[:40] for kk in known):
            known[k] = stem
            print(f"  +EXTRA: {stem[:80]}")
        else:
            print(f"  (already) {stem[:60]}")

    print(f"after extras: {len(known)}")
    newly = scan_dense_for_new(known)
    print(f"new from dense scan: {len(newly)}")
    for n in newly:
        print(f"  +DENSE: {n[:120]}")
    print(f"TOTAL: {len(known)}")

    out = VID / "JBLearning_canonical_unique.txt"
    items = sorted(known.values(), key=lambda s: key(s))
    out.write_text(
        "\n".join(f"{i:03d}. {s}" for i, s in enumerate(items, 1)) + "\n",
        encoding="utf-8",
    )
    print(f"wrote {out}")

    # compare to bank
    ts = (ROOT / "src/data/questions-jb-testprep.ts").read_text(encoding="utf-8")
    bank = [
        m.group(2).replace("\\'", "'")
        for m in re.finditer(r"stem:\s*(['\"])(.*?)\1", ts, re.S)
    ]
    print(f"bank: {len(bank)}")
    bank_k = {key(s) for s in bank}
    missing = [s for s in items if key(s) not in bank_k and not any(key(s)[:40] == b[:40] for b in bank_k)]
    extra_bank = [s for s in bank if key(s) not in known and not any(key(s)[:40] == k[:40] for k in known)]
    print(f"canonical missing from bank: {len(missing)}")
    for m in missing:
        print("-", m[:120])
    print(f"bank not in canonical: {len(extra_bank)}")
    for e in extra_bank:
        print("+", e[:120])


if __name__ == "__main__":
    main()
