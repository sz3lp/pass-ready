import re
from pathlib import Path
import importlib.util

spec = importlib.util.spec_from_file_location("c", r"C:\Users\lukep\.cursor\OpenFart\crew80\tmp_clean_120.py")
# Don't exec main - just copy helpers by reimporting logic

def clean(s: str) -> str:
    s = s.lower()
    for a, b in [
        ("yolume", "volume"), ("yomit", "vomit"), ("spontancous", "spontaneous"),
        ("apneie", "apneic"), ("type | ", "type 1 "), ("type i ", "type 1 "),
        ("53-year-old girl", "5-year-old girl"), ("ivhe ", "the "),
        ("lin which", "in which"), ("lin most", "in most"), ("or dirt", "of dirt"),
        ("with of the", "which of the"), ("mass~", "mass-"), ("you-do", "you do"),
        ("und is", "and is"), ("coal and", "cool and"), ("sce minor", "see minor"),
        ("wornan", "woman"), ("aman ", "a man "), ("awoman ", "a woman "),
        ("aa ", "a "), ("hyou ", "you "),
    ]:
        s = s.replace(a, b)
    s = re.split(r"\s(?:2?[A-D]\)|O\s*[A-D]\)|Ac\s+[A-D])", s, maxsplit=1)[0]
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    s = re.sub(r"^(an|a|the)\s+", "", s)
    return s


def key8(s: str) -> str:
    words = [w for w in clean(s).split() if len(w) > 1][:10]
    return " ".join(words)


def add(store, raw):
    raw = re.sub(r"\s+", " ", raw).strip()
    raw = re.sub(r"^[\[\|]+", "", raw).strip()
    display = re.split(r"\s(?:2?[A-D]\)|O\s*[A-D]\)|Ac\s+[A-D])", raw, maxsplit=1)[0].strip()
    if len(display) < 30 and not display.lower().startswith("ventilation"):
        return
    k = key8(display)
    if len(k) < 18:
        return
    if k not in store or len(display) > len(store[k]):
        store[k] = display


store = {}
for p in [
    Path(r"C:\Users\lukep\Videos\JBLearning_stems_only.txt"),
    Path(r"C:\Users\lukep\Videos\JBLearning_stems_video2.txt"),
]:
    for line in p.read_text(encoding="utf-8", errors="replace").splitlines():
        add(store, re.sub(r"^\d+\.\s*", "", line.strip()))

d = Path(r"C:\Users\lukep\Videos\screenrecord_ocr_scene_low")
for f in d.glob("frame_*.txt"):
    lines = [l.strip() for l in f.read_text(encoding="utf-8", errors="replace").splitlines() if l.strip()]
    if lines:
        add(store, " ".join(lines))

for s in [
    "Ventilation is defined as the:",
    "What is the primary clinical feature associated with exposure to a vesicant agent?",
    "An injured man opens his eyes when you speak to him and pulls his arm away when you palpate it. He knows his name, but cannot remember what happened and does not know what day it is. What is his Glasgow Coma Scale (GCS) score?",
    "A patient overdosed on several drugs and is unresponsive with shallow breathing and facial cyanosis. As you continue your assessment, the patient suddenly vomits. What should you do?",
    "Which of the following statements regarding artificial ventilation of an apneic patient who has dentures is correct?",
]:
    add(store, s)

ts = Path(r"C:\Users\lukep\.cursor\OpenFart\crew80\src\data\questions-jb-testprep.ts").read_text(encoding="utf-8")
bank = re.findall(r"stem:\s*'((?:\\'|[^'])*)'", ts)
bank += re.findall(r'stem:\s*"((?:\\"|[^"])*)"', ts)
print("store", len(store), "bank", len(bank))


def best_match(k, keys):
    for bk in keys:
        if k == bk or k[:45] == bk[:45] or k.startswith(bk[:40]) or bk.startswith(k[:40]):
            return bk
    sw = set(k.split())
    best = None
    sc = 0.0
    for bk in keys:
        bw = set(bk.split())
        sc2 = len(sw & bw) / max(1, len(sw | bw))
        if sc2 > sc:
            sc = sc2
            best = bk
    return best if sc >= 0.72 else None


sk = list(store.keys())
bk = [key8(s) for s in bank]
unmatched_s = []
for k, s in store.items():
    if not best_match(k, bk):
        unmatched_s.append(s)
unmatched_b = []
for s in bank:
    if not best_match(key8(s), sk):
        unmatched_b.append(s)
print("unmatched store", len(unmatched_s))
for s in unmatched_s:
    print("S:", s[:160])
print("unmatched bank", len(unmatched_b))
for s in unmatched_b:
    print("B:", s[:160])

# write final clean list
out = Path(r"C:\Users\lukep\Videos\JBLearning_TRUE_120.txt")
# merge store preferring bank wording when matched
final = {}
for k, s in store.items():
    m = best_match(k, bk)
    if m:
        # find bank stem for m
        for bs in bank:
            if key8(bs) == m:
                final[m] = bs
                break
        else:
            final[k] = s
    else:
        final[k] = s
# add unmatched bank except chlorine if we decide later
for s in bank:
    k = key8(s)
    if k not in final and not best_match(k, list(final.keys())):
        final[k] = s
print("final", len(final))
out.write_text("\n".join(f"{i:03d}. {s}" for i, s in enumerate(sorted(final.values(), key=lambda x: clean(x)), 1)), encoding="utf-8")
print("wrote", out)
