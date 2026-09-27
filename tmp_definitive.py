"""Build definitive unique stem set from ALL dense OCR text with heavy normalization."""
from __future__ import annotations

import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

DENSE = Path(r"C:\Users\lukep\Videos\screenrecord_ocr_dense")
STEMS_ONLY = Path(r"C:\Users\lukep\Videos\JBLearning_stems_only.txt")
OUT = Path(r"C:\Users\lukep\Videos\JBLearning_definitive_unique.txt")


def heavy(s: str) -> str:
    s = s.lower()
    reps = {
        "aman ": "a man ",
        "awoman ": "a woman ",
        "apatient": "a patient",
        "a5-": "a 5-",
        "a7-": "a 7-",
        "aa ": "a ",
        "type i ": "type 1 ",
        "spontancous": "spontaneous",
        "yomit": "vomit",
        "sce minor": "see minor",
        "cars.": "ears.",
        "apneie": "apneic",
        "hyou ": "you ",
        "lou are": "you are",
        "with of the": "which of the",
        "removal or dirt": "removal of dirt",
        "(gc)": "(gcs)",
    }
    for a, b in reps.items():
        s = s.replace(a, b)
    s = re.sub(r"^[\|`\[\s]+", "", s)
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def key(s: str) -> str:
    n = heavy(s)
    # stable key: chars 0-50, but if starts with fragment words skip
    words = n.split()
    if words and words[0] in {"the", "patient", "an", "physically", "following"} and len(words) > 6:
        # try from word that looks like start of known patterns
        for i, w in enumerate(words):
            if w in {"which", "what", "when", "after", "while", "a", "an", "you", "if", "why", "how", "common", "witnesses", "general", "despite", "shortly", "assessment", "your", "assuming", "in"}:
                n = " ".join(words[i:])
                break
    return n[:52]


STARTERS = re.compile(
    r"(?is)((?:Which of the following|What should you|What is the|What does this|What type of|What percentage|When attaching|When caring|When driving|After an adult|After applying|After restoring|After attaching|After drying|While assessing|While performing|While triaging|Following penetrating|Following blunt|Following an apparent|A patient|A \d+-year-old|A \d+-month-old|An unresponsive|An obese|An injured|A woman|A man|A trauma|You are|You should|If an adult|In which|In most|Common complaints|Witnesses report|General guidelines|Assessment of|Despite direct|Shortly after|At the end|Your partner|Assuming |Ventilation is defined|The amount of air|The EMT is treating|Aspirin may be|Why can|Why should))"
)


def extract_stems_from_text(text: str) -> list[str]:
    text = text.replace("\n", " ")
    text = re.sub(r"\s+", " ", text)
    found = []
    for m in STARTERS.finditer(text):
        start = m.start()
        chunk = text[start : start + 320]
        # end at ? or : followed by choice
        end_m = re.search(r"[\?:]", chunk)
        if not end_m:
            continue
        stem = chunk[: end_m.start() + 1].strip()
        # must be long enough and not a choice
        if len(stem) < 35:
            continue
        if re.search(r"\b[A-D]\)", stem):
            # cut before choice if any
            stem = re.split(r"\s[A-D]\)", stem)[0].strip()
            if not stem.endswith(("?", ":")):
                continue
        found.append(stem)
    return found


def main() -> None:
    uniq: dict[str, str] = {}

    # stems_only
    for line in STEMS_ONLY.read_text(encoding="utf-8").splitlines():
        line = re.sub(r"^\d+\.\s*", "", line.strip())
        if len(line) > 30:
            uniq.setdefault(key(line), line)

    # all dense frames
    for f in sorted(DENSE.glob("frame_*.txt")):
        t = f.read_text(encoding="utf-8", errors="replace")
        for stem in extract_stems_from_text(t):
            k = key(stem)
            # prefer longer / cleaner
            if k not in uniq or (len(stem) > len(uniq[k]) and stem[0].isupper()):
                uniq[k] = stem

    # video2 stems
    p2 = Path(r"C:\Users\lukep\Videos\JBLearning_stems_video2.txt")
    if p2.exists():
        for line in p2.read_text(encoding="utf-8").splitlines():
            line = re.sub(r"^\d+\.\s*", "", line.strip())
            if len(line) > 30 and "?" in line or line.endswith(":"):
                uniq.setdefault(key(line), line)

    # forced confirmed
    for s in [
        "What is the primary clinical feature associated with exposure to a vesicant agent?",
        "An injured man opens his eyes when you speak to him and pulls his arm away when you palpate it. He knows his name, but cannot remember what happened and does not know what day it is. What is his Glasgow Coma Scale (GCS) score?",
    ]:
        uniq[key(s)] = s

    items = sorted(uniq.values(), key=lambda s: heavy(s))
    OUT.write_text(
        "\n".join(f"{i:03d}. {s}" for i, s in enumerate(items, 1)) + "\n",
        encoding="utf-8",
    )
    print(f"DEFINITIVE UNIQUE COUNT: {len(items)}")
    print(f"wrote {OUT}")
    for i, s in enumerate(items, 1):
        print(f"{i:03d}. {s[:140]}")


if __name__ == "__main__":
    main()
