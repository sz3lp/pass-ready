from pathlib import Path
import re

# Load bank stems from generated TS (more reliable)
ts = Path(r"src/data/questions-jb-testprep.ts").read_text(encoding="utf-8")
bank_stems = re.findall(r"stem:\s*'((?:\\'|[^'])*)'", ts)
print("ts stems", len(bank_stems))

def norm(s: str) -> str:
    s = s.lower()
    s = re.sub(r"\\'", "'", s)
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s[:80]

bank_n = {norm(s) for s in bank_stems}

# Collect candidate stems from OCR dumps
dirs = [
    Path(r"C:\Users\lukep\Videos\screenrecord_ocr_4fps_changes"),
    Path(r"C:\Users\lukep\Videos\screenrecord_ocr_dense"),
]
q_pat = re.compile(
    r"(?is)((?:what|which|when|where|why|how|after|while|following|a |an |the |you |if |assessment|witnesses|common|general|despite|shortly|at the|in which|in most|your partner)[^\n?]{20,220}\?)"
)

found = {}
for d in dirs:
    if not d.exists():
        continue
    for f in d.glob("frame_*.txt"):
        text = f.read_text(encoding="utf-8", errors="replace")
        for m in q_pat.findall(text):
            m = re.sub(r"\s+", " ", m).strip()
            n = norm(m)
            if len(n) < 30:
                continue
            found.setdefault(n, m[:160])

# also stems_only + video2
for p in [
    Path(r"C:\Users\lukep\Videos\JBLearning_stems_only.txt"),
    Path(r"C:\Users\lukep\Videos\JBLearning_stems_video2.txt"),
]:
    for l in p.read_text(encoding="utf-8", errors="replace").splitlines():
        l2 = re.sub(r"^\d+\.\s*", "", l.strip())
        if "?" in l2:
            found.setdefault(norm(l2), l2[:160])

missing = []
for n, raw in sorted(found.items(), key=lambda x: x[1]):
    # fuzzy: check if any bank stem shares first 40 chars
    if n in bank_n:
        continue
    prefix = n[:40]
    if any(b.startswith(prefix) or prefix.startswith(b[:40]) for b in bank_n):
        continue
    missing.append(raw)

print("ocr unique candidates", len(found))
print("likely missing from bank", len(missing))
for m in missing:
    print("-", m)
