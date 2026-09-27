from pathlib import Path
import re

term = Path(r"C:\Users\lukep\.cursor\projects\c-Users-lukep-cursor-Crew80\terminals\778495.txt")
if term.exists():
    text = term.read_text(encoding="utf-8", errors="replace")
    print("=== terminal 778495 ===")
    print("len", len(text))
    print(text[:3000])
    print("=== TAIL ===")
    print(text[-4000:])
else:
    print("no terminal file")

# bank count
root = Path(r"C:\Users\lukep\.cursor\OpenFart\crew80")
ts = (root / "src/data/questions-jb-testprep.ts").read_text(encoding="utf-8")
print("bank jb ids", len(re.findall(r'id: "jb-', ts)))

# new video
vid = Path(r"C:\Users\lukep\AppData\Local\Packages\IOForth.Screenrecord-screenrecorder_pxs7cjhtcq1xt\LocalState\Temp\538d6b3c-4226-4162-87ab-a162a99c68a5.mp4")
print("new vid exists", vid.exists(), "size", vid.stat().st_size if vid.exists() else 0)

# look for ID OCR outputs
for p in Path(r"C:\Users\lukep\Videos").glob("*id*"):
    print("id artifact", p.name, p.stat().st_size)
for p in Path(r"C:\Users\lukep\Videos").glob("*EMT*"):
    print("emt", p)
for p in Path(r"C:\Users\lukep\.cursor\OpenFart\crew80").rglob("*id*ocr*"):
    print("crew id", p)
