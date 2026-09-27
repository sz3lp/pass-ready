"""OCR question IDs from bottom-right of dense frames with upscaled crops."""
from __future__ import annotations

import re
import subprocess
from pathlib import Path

from PIL import Image, ImageOps, ImageFilter, ImageEnhance

TESS = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
INDIR = Path(r"C:\Users\lukep\Videos\screenrecord_frames_dense")
CROPDIR = Path(r"C:\Users\lukep\Videos\jb_id_crops3")
CROPDIR.mkdir(parents=True, exist_ok=True)

# Also scene frames + a sample of 8fps
EXTRA = [
    Path(r"C:\Users\lukep\Videos\screenrecord_frames_scene_low"),
]


def ocr_id(img_path: Path) -> str | None:
    im = Image.open(img_path).convert("L")
    w, h = im.size
    # bottom-right region where ID lives
    box = (int(w * 0.72), int(h * 0.90), w, h)
    crop = im.crop(box)
    # upscale + sharpen + contrast
    crop = crop.resize((crop.width * 4, crop.height * 4), Image.Resampling.LANCZOS)
    crop = ImageOps.autocontrast(crop)
    crop = crop.filter(ImageFilter.SHARPEN)
    crop = ImageEnhance.Contrast(crop).enhance(2.0)
    tmp = CROPDIR / f"{img_path.stem}.png"
    crop.save(tmp)
    r = subprocess.run(
        [TESS, str(tmp), "stdout", "--psm", "7"],
        capture_output=True,
        text=True,
    )
    txt = (r.stdout or "") + " " + (r.stderr or "")
    m = re.search(r"EMT\D{0,3}(\d{2,4})", txt, re.I)
    if m:
        return m.group(1)
    # sometimes reads as EMT without separator
    m = re.search(r"(?:ID\D*)?EMT\D*(\d{2,4})", txt, re.I)
    return m.group(1) if m else None


def main() -> None:
    files = sorted(INDIR.glob("frame_*.jpg"))
    # sample every frame that is multiple of 2 first for speed, then fill
    ids: dict[str, str] = {}
    for i, f in enumerate(files):
        if i % 2 != 0:
            continue
        try:
            qid = ocr_id(f)
        except Exception as e:
            print("err", f.name, e)
            continue
        if qid and qid not in ids:
            ids[qid] = f.name
        if (i // 2) % 40 == 0:
            print(f"progress {i}/{len(files)} unique={len(ids)}")

    # also every scene frame
    for d in EXTRA:
        if not d.exists():
            continue
        for f in sorted(d.glob("frame_*.jpg")):
            qid = ocr_id(f)
            if qid and qid not in ids:
                ids[qid] = f.name

    print(f"UNIQUE_IDS={len(ids)}")
    out = Path(r"C:\Users\lukep\Videos\jb_unique_ids3.txt")
    lines = [f"{k}\t{ids[k]}" for k in sorted(ids, key=lambda x: int(x))]
    out.write_text("\n".join(lines), encoding="utf-8")
    print("wrote", out)
    print("\n".join(lines[:30]))
    print("...")
    print("\n".join(lines[-20:]))


if __name__ == "__main__":
    main()
