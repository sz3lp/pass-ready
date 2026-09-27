from pathlib import Path
import re

ts = Path("src/data/questions-jb-testprep.ts").read_text(encoding="utf-8")
# stems can be ' or "
bank = re.findall(r"stem:\s*(['\"])(.*?)\1", ts, re.S)
stems = [s[1].replace("\\'", "'").replace('\\"', '"') for s in bank]
print("bank", len(stems))

def norm(s):
    s = s.lower()
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s

bank_n = {norm(s) for s in stems}
# also prefix index
bank_p = {n[:50] for n in bank_n}

# Parse stems_only + video2 + vesicant + gcs manually known
known = []
for p in [Path(r"C:\Users\lukep\Videos\JBLearning_stems_only.txt"), Path(r"C:\Users\lukep\Videos\JBLearning_stems_video2.txt")]:
    for l in p.read_text(encoding="utf-8", errors="replace").splitlines():
        l2 = re.sub(r"^\d+\.\s*", "", l.strip())
        if len(l2) > 30:
            known.append(l2)

extra = [
 "What is the primary clinical feature associated with exposure to a vesicant agent?",
 "An injured man opens his eyes when you speak to him and pulls his arm away when you palpate it. He knows his name, but cannot remember what happened and does not know what day it is. What is his Glasgow Coma Scale (GCS) score?",
]
known.extend(extra)

# unique by norm prefix 55
uniq = {}
for k in known:
    n = norm(k)
    key = n[:55]
    uniq.setdefault(key, k)

print("combined unique known", len(uniq))
missing_from_bank = []
for key, raw in uniq.items():
    if key[:50] in bank_p or norm(raw) in bank_n:
        continue
    if any(norm(raw)[:45] == b[:45] for b in bank_n):
        continue
    missing_from_bank.append(raw[:140])

print("not in bank", len(missing_from_bank))
for m in missing_from_bank:
    print("-", m)
