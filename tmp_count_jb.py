from pathlib import Path
import re

t = Path(r"scripts/gen-jb-bank.py").read_text(encoding="utf-8")
stems = re.findall(r'^\s+"([^"]+\?)",', t, re.M)
print("bank stem count", len(stems))

stems_file = Path(r"C:\Users\lukep\Videos\JBLearning_stems_only.txt").read_text(
    encoding="utf-8", errors="replace"
)


def norm(s: str) -> str:
    return re.sub(r"[^a-z0-9 ]", "", s.lower())[:70]


bank_n = {norm(s) for s in stems}
lines = [l.strip() for l in stems_file.splitlines() if l.strip()]
missing = []
seen = set()
unique_stems = []
for l in lines:
    l2 = re.sub(r"^\d+\.\s*", "", l)
    n = norm(l2)
    if n in seen:
        continue
    seen.add(n)
    unique_stems.append(l2)
    if n not in bank_n and "?" in l2:
        missing.append(l2[:120])

print("stems_only unique", len(unique_stems))
print("missing from bank vs stems_only", len(missing))
for m in missing:
    print("-", m)

# also list bank stems not in stems_only
extra = []
sf = {norm(re.sub(r"^\d+\.\s*", "", l)) for l in lines}
for s in stems:
    if norm(s) not in sf:
        extra.append(s[:120])
print("bank extras vs stems_only", len(extra))
for e in extra:
    print("+", e)
