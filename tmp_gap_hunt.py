"""OCR gap regions where stems_only has questions dense walk missed; hunt unknown stems."""
from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

TESS = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
DENSE = Path(r"C:\Users\lukep\Videos\screenrecord_frames_dense")
OUT = Path(r"C:\Users\lukep\Videos\gap_ocr_hunt")
OUT.mkdir(parents=True, exist_ok=True)

# Known bank / stems keys
KNOWN_SNIPPETS = [
    "impair oxygenation",
    "blood and secretions",
    "inadequate breathing",
    "oxygen regulator",
    "intubated by a paramedic",
    "suddenly vomits",
    "shard of glass",
    "ventilation is defined",
    "oxygen saturation reads 67",
    "respiratory rate of 26",
    "forcibly expelled",
    "end-tidal carbon dioxide",
    "lateral",
    "cylinder constant",
    "decreased level of carbon dioxide",
    "dentures",
    "increased arterial levels",
    "45 breaths",
    "intrapulmonary",
    "apneic 50-year-old",
    "chest discomfort, confusion",
    "side effect of nitroglycerin",
    "110 ml",
    "weak carotid pulse at 40",
    "detrimental effect that tachycardia",
    "shock-advised",
    "prescribed nitroglycerin",
    "collapsed about 5 minutes",
    "aspirin may be contraindicated",
    "anticipate during reassessment",
    "pulse is irregular",
    "underlying cardiac problem",
    "primary pacemaker",
    "ventricular fibrillation",
    "ringing in her",
    "nitroglycerin likely be administered",
    "implanted pacemaker",
    "restoring spontaneous",
    "check-patient",
    "second nitroglycerin",
    "putrefaction",
    "why can tachycardia",
    "having a heart attack",
    "lower quadrant",
    "rattlesnake",
    "severe hypothermia",
    "emotional crisis",
    "flushed skin",
    "bee sting",
    "injected heroin",
    "type 1 diabetes",
    "type i diabetes",
    "diabetic man is found unresponsive",
    "methamphetamine",
    "schizophrenia",
    "unidentified snake",
    "opioid overdose",
    "infectious disease",
    "seizure that lasted",
    "clinically significant finding",
    "lightning",
    "behavioral crisis",
    "active rewarming",
    "3-month-old",
    "blurred vision",
    "miscarriage",
    "function of the uterus",
    "clinging to her mother",
    "sexually assaulted",
    "total body surface",
    "child was abused",
    "fetal limb",
    "heart rate of 60 beats",
    "cyanotic following a respiratory",
    "generalized rash",
    "2-year-old child with abdominal",
    "does not react to your presence",
    "extends his arm",
    "escort vehicle",
    "highest triage",
    "bilateral femur",
    "quality improvement",
    "proximate causation",
    "required to report",
    "mass-casualty incident",
    "crime scene",
    "multilane highway",
    "veteran emt of 20",
    "standard precautions",
    "respiratory rate of 26 breaths",
    "radio report",
    "vesicant",
    "glasgow coma",
    "knife impaled",
    "protruding bowel",
    "gunshot wound",
    "compartment syndrome",
    "thigh laceration",
    "bright red blood",
    "partial- and full-thickness",
    "fell on her knee",
    "two inches to the left",
    "nosebleed",
    "decerebrate",
    "barrel-shaped",
    "history of emphysema",
    "obese 56-year-old",
    "originates in the ventricles",
    "defibrillator vest",
    "sympathetic nervous",
    "administration of epinephrine",
    "hallucinations and paranoia",
    "jumpstart",
    "near-drowning",
    "high normal respiratory",
    "visible contaminants",
    "informed consent",
    "bridge pillar",
    "172/94",
    "green haze",
    "chlorine",
    "terrorist attack",
]


def is_known(text: str) -> bool:
    t = text.lower()
    return any(s in t for s in KNOWN_SNIPPETS)


def main() -> None:
    frames = sorted(DENSE.glob("frame_*.jpg"))
    print("frames", len(frames))
    unknowns: list[tuple[str, str]] = []
    # sample every frame in early gaps + around vesicant
    # re-OCR with psm 4 for better columns
    targets = []
    for f in frames:
        n = int(re.search(r"(\d+)", f.stem).group(1))
        # focus: start (missed O2/vent), mid cardiac preload, around 350-370 vesicant
        if n <= 80 or (180 <= n <= 220) or (340 <= n <= 380) or (n % 15 == 0):
            targets.append(f)

    print("ocr targets", len(targets))
    for i, f in enumerate(targets):
        out_base = OUT / f.stem
        subprocess.run(
            [TESS, str(f), str(out_base), "--psm", "4"],
            capture_output=True,
        )
        txt = (out_base.with_suffix(".txt")).read_text(encoding="utf-8", errors="replace")
        # find question-like
        for m in re.finditer(
            r"(?is)((?:Which|What|When|Where|Why|How|After|While|Following|A |An |The |You |If |Assuming|Common|Witnesses|General|Despite|Shortly|At the|In which|In most|Your partner|An injured)[^\n?]{20,280}[\?:])",
            txt,
        ):
            stem = re.sub(r"\s+", " ", m.group(1)).strip()
            if len(stem) < 40:
                continue
            if not is_known(stem):
                unknowns.append((f.name, stem[:220]))
        if (i + 1) % 40 == 0:
            print(f"done {i+1}/{len(targets)} unknowns={len(unknowns)}")

    # dedupe unknowns
    seen = set()
    uniq = []
    for name, stem in unknowns:
        k = re.sub(r"[^a-z0-9]", "", stem.lower())[:50]
        if k in seen:
            continue
        seen.add(k)
        uniq.append((name, stem))

    report = Path(r"C:\Users\lukep\Videos\gap_unknown_stems.txt")
    report.write_text(
        "\n".join(f"{a}\n  {b}\n" for a, b in uniq), encoding="utf-8"
    )
    print(f"UNKNOWN stems: {len(uniq)} -> {report}")
    for a, b in uniq:
        print(f"- [{a}] {b}")


if __name__ == "__main__":
    main()
