import re
from pathlib import Path
from pypdf import PdfReader

pdf = Path(r"C:\Users\lukep\.cursor\OpenFart\crew80\tmp-530226.pdf")
reader = PdfReader(str(pdf))
out = Path(r"C:\Users\lukep\.cursor\OpenFart\crew80\tmp-530226.txt")
pages = []
for i, page in enumerate(reader.pages):
    text = page.extract_text() or ""
    pages.append(f"\n\n===== PAGE {i+1} =====\n{text}")
out.write_text("".join(pages), encoding="utf-8")
print("pages", len(reader.pages), "chars", out.stat().st_size)
