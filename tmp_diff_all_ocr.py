"""Merge all OCR stem sources and diff against current JB bank."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(r"C:\Users\lukep\.cursor\OpenFart\crew80")
VID = Path(r"C:\Users\lukep\Videos")


def norm(s: str) -> str:
    s = s.lower()
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def bank_stems() -> list[str]:
    ts = (ROOT / "src/data/questions-jb-testprep.ts").read_text(encoding="utf-8")
    out = []
    for m in re.finditer(r"stem:\s*(['\"])(.*?)\1", ts, re.S):
        out.append(m.group(2).replace("\\'", "'").replace('\\"', '"'))
    return out


def add_from_text(found: dict[str, str], text: str) -> None:
    # numbered lines
    for line in text.splitlines():
        line = line.strip()
        line = re.sub(r"^\d+\.\s*", "", line)
        if "?" in line and len(line) > 35:
            key = norm(line)[:60]
            found.setdefault(key, line[:200])
    # regex questions
    q_re = re.compile(
        r"(?is)((?:Which|What|When|Where|Why|How|After|While|Following|A |An |The |You |If |Assessment|Witnesses|Common|General|Despite|Shortly|At the|In which|In most|Your partner|Assuming|An injured)[^\n?]{15,300}\?)"
    )
    for m in q_re.findall(text):
        m = re.sub(r"\s+", " ", m).strip()
        if len(m) > 35:
            found.setdefault(norm(m)[:60], m[:200])


def main() -> None:
    bank = bank_stems()
    bank_n = {norm(s)[:60] for s in bank}
    print("bank", len(bank))

    found: dict[str, str] = {}
    sources = [
        VID / "JBLearning_stems_only.txt",
        VID / "JBLearning_stems_video2.txt",
        VID / "JBLearning_questions_from_recording.md",
        VID / "JBLearning_questions_video2.md",
        VID / "screenrecord_ocr.txt",
        VID / "screenrecord_ocr_dense_all.txt",
        VID / "JBLearning_stems_video3.txt",
        VID / "screenrecord3_ocr_all.txt",
    ]
    for p in sources:
        if p.exists():
            add_from_text(found, p.read_text(encoding="utf-8", errors="replace"))
            print(f"  loaded {p.name}")

    # also walk 4fps change frames
    for dname in ["screenrecord_ocr_4fps_changes", "screenrecord_ocr_dense", "screenrecord3_ocr"]:
        d = VID / dname
        if not d.exists():
            continue
        n = 0
        for f in d.glob("frame_*.txt"):
            add_from_text(found, f.read_text(encoding="utf-8", errors="replace"))
            n += 1
        print(f"  frames {dname}: {n}")

    print("ocr unique keys", len(found))

    missing = []
    for k, raw in sorted(found.items(), key=lambda x: x[1].lower()):
        if k in bank_n:
            continue
        # fuzzy prefix
        if any(k[:40] == b[:40] for b in bank_n):
            continue
        if any(norm(raw)[:45] == b[:45] for b in bank_n):
            continue
        missing.append(raw)

    print("\nLIKELY MISSING FROM BANK:", len(missing))
    for m in missing:
        print("-", m)

    # bank not evidenced in OCR?
    ocr_keys = set(found)
    extras = []
    for s in bank:
        k = norm(s)[:60]
        if k in ocr_keys or any(k[:40] == o[:40] for o in ocr_keys):
            continue
        extras.append(s[:140])
    print("\nBANK STEMS WITHOUT OCR EVIDENCE:", len(extras))
    for e in extras:
        print("+", e)


if __name__ == "__main__":
    main()
