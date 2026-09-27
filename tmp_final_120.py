"""List exact 120 union stems and diff vs bank."""
from __future__ import annotations

import re
from pathlib import Path

BANK = Path(r"C:\Users\lukep\.cursor\OpenFart\crew80\src\data\questions-jb-testprep.ts")
STEMS = Path(r"C:\Users\lukep\Videos\JBLearning_stems_only.txt")
V2 = Path(r"C:\Users\lukep\Videos\JBLearning_stems_video2.txt")
SCROLL = Path(r"C:\Users\lukep\Videos\JBLearning_scroll_unique.txt")


def norm_key(s: str) -> str:
    s = s.lower()
    for a, b in [
        ("yolume", "volume"),
        ("yomit", "vomit"),
        ("yomnits", "vomits"),
        ("spontancous", "spontaneous"),
        ("apneie", "apneic"),
        ("type i ", "type 1 "),
        ("sce minor", "see minor"),
        ("cars.", "ears."),
        ("lwithout", "without"),
        ("or dirt", "of dirt"),
    ]:
        s = s.replace(a, b)
    s = re.sub(r"^aa+\s+", "a ", s)
    s = re.sub(r"^h+", "", s)
    s = re.sub(r"^lou ", "you ", s)
    s = re.sub(r"^aman ", "a man ", s)
    s = re.sub(r"^awoman ", "a woman ", s)
    s = re.sub(r"^apatient ", "a patient ", s)
    s = re.sub(r"^a5-", "a 5-", s)
    s = re.sub(r"^a7-", "a 7-", s)
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    s = re.sub(r"^(an|a|the)\s+", "", s)
    return s[:60]


EXTRAS = [
    "What is the primary clinical feature associated with exposure to a vesicant agent?",
    "An injured man opens his eyes when you speak to him and pulls his arm away when you palpate it. He knows his name, but cannot remember what happened and does not know what day it is. What is his Glasgow Coma Scale (GCS) score?",
    "A patient overdosed on several drugs and is unresponsive with shallow breathing and facial cyanosis. As you continue your assessment, the patient suddenly vomits. What should you do?",
    "Which of the following statements regarding artificial ventilation of an apneic patient who has dentures is correct?",
]


def load_numbered(path: Path) -> list[str]:
    out = []
    for line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        s = re.sub(r"^\d+\.\s*", "", line.strip())
        if len(s) > 40:
            out.append(s)
    return out


def main() -> None:
    bank_txt = BANK.read_text(encoding="utf-8")
    bank = re.findall(r"stem:\s*'((?:\\'|[^'])*)'", bank_txt)
    bank += [s.replace('\\"', '"') for s in re.findall(r'stem:\s*"((?:\\"|[^"])*)"', bank_txt)]
    bank_map = {norm_key(s): s for s in bank}

    union: dict[str, str] = {}
    for s in load_numbered(STEMS) + load_numbered(V2) + load_numbered(SCROLL) + EXTRAS:
        # reject choice fragments / too short / non-questions that are just choices
        if s.lower().startswith("a 41-year-old woman with shallow"):
            continue
        k = norm_key(s)
        if len(k) < 35:
            continue
        if k not in union or len(s) > len(union[k]):
            union[k] = s

    print(f"union={len(union)} bank={len(bank_map)}")

    only_union = []
    for k, s in sorted(union.items(), key=lambda x: x[1].lower()):
        if k in bank_map:
            continue
        if any(k[:45] == bk[:45] for bk in bank_map):
            continue
        only_union.append(s)

    only_bank = []
    for k, s in sorted(bank_map.items(), key=lambda x: x[1].lower()):
        if k in union:
            continue
        if any(k[:45] == uk[:45] for uk in union):
            continue
        only_bank.append(s)

    print(f"only_in_union={len(only_union)}")
    for s in only_union:
        print("U:", s[:160])
    print(f"only_in_bank={len(only_bank)}")
    for s in only_bank:
        print("B:", s[:160])

    out = Path(r"C:\Users\lukep\Videos\JBLearning_FINAL_120.txt")
    lines = [f"{i:03d}. {s}" for i, (_, s) in enumerate(sorted(union.items(), key=lambda x: x[1].lower()), 1)]
    out.write_text("\n".join(lines), encoding="utf-8")
    print("wrote", out, "count", len(lines))


if __name__ == "__main__":
    main()
