"""Walk OCR frames chronologically; emit unique full stems in scroll order."""
from __future__ import annotations

import re
from pathlib import Path

DIRS = [
    Path(r"C:\Users\lukep\Videos\screenrecord_ocr_4fps_changes"),
    Path(r"C:\Users\lukep\Videos\screenrecord_ocr_dense"),
]

BANK = Path(r"C:\Users\lukep\.cursor\OpenFart\crew80\src\data\questions-jb-testprep.ts")


def norm_key(s: str) -> str:
    s = s.lower()
    s = s.replace("yolume", "volume").replace("yomit", "vomit").replace("spontancous", "spontaneous")
    s = s.replace("type i ", "type 1 ").replace("apneie", "apneic")
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    s = re.sub(r"^(an|a|the)\s+", "", s)
    return s[:55]


def stem_from_frame(text: str) -> str | None:
    text = text.replace("\r", "")
    # specialize GCS
    if re.search(r"glasgow coma", text, re.I):
        m = re.search(
            r"(An injured man opens his eyes.*?GCS\)?\s*score\?)",
            re.sub(r"\s+", " ", text),
            re.I,
        )
        if m:
            return re.sub(r"\s+", " ", m.group(1)).strip()
        return (
            "An injured man opens his eyes when you speak to him and pulls his arm away "
            "when you palpate it. He knows his name, but cannot remember what happened and "
            "does not know what day it is. What is his Glasgow Coma Scale (GCS) score?"
        )

    lines = [re.sub(r"\s+", " ", l).strip() for l in text.splitlines() if l.strip()]
    if not lines:
        return None
    blob = " ".join(lines)
    blob = re.sub(r"^[\[\|]+", "", blob).strip()
    # cut at choice markers
    blob = re.split(
        r"\s(?:O\s*)?[A-D]\)|\sAc\s+[A-D]|\sOo\s|\sOB\)|\sOA\)|\s©|\sOQ\s",
        blob,
        maxsplit=1,
    )[0].strip()
    blob = re.sub(r"\s+", " ", blob).strip()
    if len(blob) < 50:
        return None
    # must look like question start
    low = blob.lower()
    if low.startswith(("limb ", "intracranial", "acute myocardial", "entrapment")):
        return None
    starters = (
        "which", "what", "when", "where", "why", "how", "after", "while", "following",
        "a ", "an ", "you ", "your ", "if ", "assessment", "witnesses", "common",
        "general", "despite", "shortly", "at the", "in which", "in most", "ventilation",
        "aspirin", "the emt", "the amount", "assuming", "an injured", "an unresponsive",
        "an obese", "aa ",
    )
    if not any(low.startswith(s) for s in starters):
        return None
    if "?" not in blob and not blob.endswith(":"):
        # allow incomplete but long stems
        if len(blob) < 80:
            return None
    return blob


def main() -> None:
    bank = re.findall(r"stem:\s*'((?:\\'|[^'])*)'", BANK.read_text(encoding="utf-8"))
    bank += re.findall(r'stem:\s*"((?:\\"|[^"])*)"', BANK.read_text(encoding="utf-8"))
    bank_keys = {norm_key(s) for s in bank}

    ordered: list[str] = []
    seen: set[str] = set()

    # Prefer 4fps_changes chronological
    frames = sorted((DIRS[0]).glob("frame_*.txt")) if DIRS[0].exists() else []
    if not frames:
        frames = sorted(DIRS[1].glob("frame_*.txt"))

    for f in frames:
        stem = stem_from_frame(f.read_text(encoding="utf-8", errors="replace"))
        if not stem:
            continue
        k = norm_key(stem)
        if k in seen:
            continue
        # skip if too similar to last (scroll jitter)
        if ordered and norm_key(ordered[-1])[:40] == k[:40]:
            continue
        seen.add(k)
        ordered.append(stem)

    print(f"ordered_unique_from_scroll={len(ordered)}")
    missing = [s for s in ordered if norm_key(s) not in bank_keys and not any(
        norm_key(s)[:40] == bk[:40] for bk in bank_keys
    )]
    print(f"in_scroll_not_in_bank={len(missing)}")
    for s in missing:
        print("MISSING:", s[:140])

    # Also: known OCR extras that may not be in 4fps ordered if frames sparse
    extras = [
        "What is the primary clinical feature associated with exposure to a vesicant agent?",
        "An injured man opens his eyes when you speak to him and pulls his arm away when you palpate it. He knows his name, but cannot remember what happened and does not know what day it is. What is his Glasgow Coma Scale (GCS) score?",
        "A patient overdosed on several drugs and is unresponsive with shallow breathing and facial cyanosis. As you continue your assessment, the patient suddenly vomits. What should you do?",
        "Which of the following statements regarding artificial ventilation of an apneic patient who has dentures is correct?",
    ]
    for e in extras:
        k = norm_key(e)
        if k not in seen:
            ordered.append(e)
            seen.add(k)
            print("ADDED_EXTRA:", e[:80])

    print(f"total_with_extras={len(ordered)}")

    out = Path(r"C:\Users\lukep\Videos\JBLearning_scroll_unique.txt")
    out.write_text(
        "\n".join(f"{i:03d}. {s}" for i, s in enumerate(ordered, 1)),
        encoding="utf-8",
    )
    print("wrote", out)

    # Compare vs stems_only unique
    stems_only = Path(r"C:\Users\lukep\Videos\JBLearning_stems_only.txt")
    so = []
    so_seen = set()
    for line in stems_only.read_text(encoding="utf-8").splitlines():
        s = re.sub(r"^\d+\.\s*", "", line.strip())
        k = norm_key(s)
        if k in so_seen:
            continue
        so_seen.add(k)
        so.append(s)
    print(f"stems_only_unique={len(so)}")

    # union
    union = dict()
    for s in so + ordered + extras:
        union[norm_key(s)] = s
    print(f"union_unique={len(union)}")

    not_in_bank = []
    for k, s in sorted(union.items(), key=lambda x: x[1].lower()):
        if k in bank_keys or any(k[:40] == bk[:40] for bk in bank_keys):
            continue
        not_in_bank.append(s)
    print(f"union_not_in_bank={len(not_in_bank)}")
    for s in not_in_bank:
        print("-", s[:150])


if __name__ == "__main__":
    main()
