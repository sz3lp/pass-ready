"""Strict unique-stem reconciliation across all JB OCR sources vs bank."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(r"C:\Users\lukep\Videos")
BANK = Path(r"C:\Users\lukep\.cursor\OpenFart\crew80\src\data\questions-jb-testprep.ts")

SOURCES = [
    ROOT / "JBLearning_stems_only.txt",
    ROOT / "JBLearning_stems_video2.txt",
    ROOT / "JBLearning_stems_video3.txt",
    ROOT / "JBLearning_canonical_unique.txt",
    ROOT / "JBLearning_definitive_unique.txt",
    ROOT / "JBLearning_deduped_120_hunt.txt",
    ROOT / "JBLearning_ordered_unique.txt",
    ROOT / "JBLearning_unique_stems_merged.txt",
    ROOT / "JBLearning_questions_from_recording.md",
    ROOT / "JBLearning_questions_video2.md",
]

OCR_DIRS = [
    ROOT / "screenrecord_ocr_dense",
    ROOT / "screenrecord_ocr_4fps_changes",
    ROOT / "screenrecord2_ocr",
    ROOT / "screenrecord3_ocr",
]

KNOWN_EXTRAS = [
    "What is the primary clinical feature associated with exposure to a vesicant agent?",
    "An injured man opens his eyes when you speak to him and pulls his arm away when you palpate it. He knows his name, but cannot remember what happened and does not know what day it is. What is his Glasgow Coma Scale (GCS) score?",
    "Following an apparent terrorist attack, numerous patients present with shortness of breath and persistent coughing. A green haze is noted in the area in which the patients are located. Which of the following agents should you suspect they were exposed to?",
]


def norm(s: str) -> str:
    s = s.lower()
    s = s.replace("yolume", "volume").replace("yomit", "vomit").replace("yomnits", "vomits")
    s = s.replace("apneie", "apneic").replace("spontancous", "spontaneous")
    s = s.replace("type i ", "type 1 ").replace("type i-", "type 1 ")
    s = re.sub(r"^aa+\s+", "a ", s)
    s = re.sub(r"^h+", "", s)
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def key(s: str) -> str:
    n = norm(s)
    # collapse leading truncated articles
    n = re.sub(r"^(an|a|the)\s+", "", n)
    return n[:70]


def looks_like_stem(s: str) -> bool:
    s = s.strip()
    if len(s) < 45:
        return False
    if s.count(" ") < 6:
        return False
    # reject pure choice fragments
    bad_starts = (
        "limb amputation",
        "intracranial",
        "a 41-year-old woman with shallow",
        "a 60-year-old man with clear",
        "a 30-year-old man with respirations",
        "a 50-year-old woman with respirations",
    )
    low = s.lower()
    if any(low.startswith(b) for b in bad_starts):
        return False
    # prefer questions or definition stems ending with :
    if "?" in s or s.rstrip().endswith(":"):
        return True
    # some JB stems end without ? in OCR
    starters = (
        "which ",
        "what ",
        "when ",
        "where ",
        "why ",
        "how ",
        "after ",
        "while ",
        "following ",
        "a ",
        "an ",
        "you ",
        "your ",
        "if ",
        "assessment ",
        "witnesses ",
        "common ",
        "general ",
        "despite ",
        "shortly ",
        "at the ",
        "in which ",
        "in most ",
        "ventilation ",
        "aspirin ",
        "the emt ",
        "the amount ",
        "assuming ",
    )
    return low.startswith(starters)


def extract_from_text(text: str) -> list[str]:
    out = []
    # numbered lines
    for m in re.finditer(r"(?m)^\s*\d{1,3}\.\s+(.+)$", text):
        out.append(m.group(1).strip())
    # markdown bold stems
    for m in re.finditer(r"\*\*([^*]{40,})\*\*", text):
        out.append(m.group(1).strip())
    # stem: '...' in ts-like
    for m in re.finditer(r"stem:\s*'((?:\\'|[^'])*)'", text):
        out.append(m.group(1).replace("\\'", "'"))
    return out


def extract_from_ocr_frame(text: str) -> list[str]:
    # join multi-line questions ending with ? or :
    lines = [re.sub(r"\s+", " ", l).strip() for l in text.splitlines() if l.strip()]
    joined = " ".join(lines)
    # take first chunk before OA)/A)
    joined = re.split(r"\sO?[A-D]\)|\sAc\s+[A-D]|\sOo\s", joined)[0].strip()
    # GCS special: may split across lines without ?
    if "glasgow coma" in joined.lower() and "score" in joined.lower():
        if not joined.endswith("?"):
            joined = joined.rstrip(".") + "?"
    return [joined] if looks_like_stem(joined) else []


def main() -> None:
    bank_txt = BANK.read_text(encoding="utf-8")
    bank_stems = re.findall(r"stem:\s*'((?:\\'|[^'])*)'", bank_txt)
    bank_stems += re.findall(r'stem:\s*"((?:\\"|[^"])*)"', bank_txt)
    bank_map = {key(s): s for s in bank_stems}
    print(f"bank={len(bank_stems)} unique_keys={len(bank_map)}")

    found: dict[str, str] = {}

    def add(raw: str, src: str) -> None:
        raw = re.sub(r"\s+", " ", raw).strip()
        raw = re.sub(r"^[\[\|]+", "", raw).strip()
        if not looks_like_stem(raw):
            return
        k = key(raw)
        if len(k) < 35:
            return
        # prefer longer/cleaner
        if k not in found or len(raw) > len(found[k]):
            found[k] = raw

    for p in SOURCES:
        if not p.exists():
            continue
        text = p.read_text(encoding="utf-8", errors="replace")
        for s in extract_from_text(text):
            add(s, p.name)

    for d in OCR_DIRS:
        if not d.exists():
            continue
        for f in d.glob("frame_*.txt"):
            for s in extract_from_ocr_frame(f.read_text(encoding="utf-8", errors="replace")):
                add(s, f.name)

    for s in KNOWN_EXTRAS:
        add(s, "known")

    print(f"unique_found={len(found)}")

    missing = []
    for k, raw in sorted(found.items(), key=lambda x: x[1].lower()):
        if k in bank_map:
            continue
        # fuzzy prefix match
        if any(k[:45] == bk[:45] or k.startswith(bk[:40]) or bk.startswith(k[:40]) for bk in bank_map):
            continue
        missing.append(raw)

    print(f"missing_from_bank={len(missing)}")
    for m in missing:
        print("-", m[:160])

    # bank items not in found?
    extra_bank = []
    for k, s in bank_map.items():
        if k in found:
            continue
        if any(k[:45] == fk[:45] or k.startswith(fk[:40]) or fk.startswith(k[:40]) for fk in found):
            continue
        extra_bank.append(s)
    print(f"bank_only={len(extra_bank)}")
    for e in extra_bank:
        print("+", e[:160])

    out = ROOT / "JBLearning_reconcile_report.txt"
    lines = [f"bank={len(bank_stems)} found={len(found)} missing={len(missing)} bank_only={len(extra_bank)}", ""]
    lines.append("## MISSING FROM BANK")
    lines.extend(f"- {m}" for m in missing)
    lines.append("")
    lines.append("## BANK ONLY (not seen in OCR pools)")
    lines.extend(f"+ {e}" for e in extra_bank)
    lines.append("")
    lines.append("## ALL UNIQUE FOUND")
    for i, (_, raw) in enumerate(sorted(found.items(), key=lambda x: x[1].lower()), 1):
        lines.append(f"{i:03d}. {raw}")
    out.write_text("\n".join(lines), encoding="utf-8")
    print("wrote", out)


if __name__ == "__main__":
    main()
