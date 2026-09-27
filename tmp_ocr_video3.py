"""Extract frames + OCR from the newest JB screen recording until we have all unique stems."""
from __future__ import annotations

import re
import subprocess
import shutil
from pathlib import Path

FFMPEG = r"C:\Users\lukep\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg.Essentials_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.0.1-essentials_build\bin\ffmpeg.exe"
if not Path(FFMPEG).exists():
    FFMPEG = shutil.which("ffmpeg") or "ffmpeg"

TESS = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
SRC = Path(
    r"C:\Users\lukep\AppData\Local\Packages\IOForth.Screenrecord-screenrecorder_pxs7cjhtcq1xt\LocalState\Temp\538d6b3c-4226-4162-87ab-a162a99c68a5.mp4"
)
OUT_VID = Path(r"C:\Users\lukep\Videos\ScreenRecord_JB_3.mp4")
FRAME_DIR = Path(r"C:\Users\lukep\Videos\screenrecord3_frames")
OCR_DIR = Path(r"C:\Users\lukep\Videos\screenrecord3_ocr")
STEMS_OUT = Path(r"C:\Users\lukep\Videos\JBLearning_stems_video3.txt")
ALL_OUT = Path(r"C:\Users\lukep\Videos\screenrecord3_ocr_all.txt")


def main() -> None:
    print("src exists", SRC.exists(), SRC.stat().st_size if SRC.exists() else 0)
    if SRC.exists():
        shutil.copy2(SRC, OUT_VID)
        print("copied to", OUT_VID)

    FRAME_DIR.mkdir(parents=True, exist_ok=True)
    OCR_DIR.mkdir(parents=True, exist_ok=True)

    # 3 fps for denser capture
    for old in FRAME_DIR.glob("frame_*.jpg"):
        old.unlink()
    cmd = [
        FFMPEG,
        "-y",
        "-i",
        str(OUT_VID if OUT_VID.exists() else SRC),
        "-vf",
        "fps=3",
        str(FRAME_DIR / "frame_%04d.jpg"),
    ]
    print("ffmpeg:", " ".join(cmd[:6]), "...")
    subprocess.run(cmd, check=True, capture_output=True)

    frames = sorted(FRAME_DIR.glob("frame_*.jpg"))
    print("frames", len(frames))

    stems: dict[str, str] = {}
    all_chunks: list[str] = []

    def norm(s: str) -> str:
        s = s.lower()
        s = re.sub(r"[^a-z0-9 ]", " ", s)
        return re.sub(r"\s+", " ", s).strip()[:70]

    q_re = re.compile(
        r"(?is)((?:Which|What|When|Where|Why|How|After|While|Following|A |An |The |You |If |Assessment|Witnesses|Common|General|Despite|Shortly|At the|In which|In most|Your partner|Assuming)[^\n?]{15,280}\?)"
    )

    for i, f in enumerate(frames, 1):
        txt_path = OCR_DIR / (f.stem + ".txt")
        subprocess.run(
            [TESS, str(f), str(OCR_DIR / f.stem), "--psm", "6"],
            check=False,
            capture_output=True,
        )
        text = txt_path.read_text(encoding="utf-8", errors="replace") if txt_path.exists() else ""
        all_chunks.append(f"===== {f.name} =====\n{text}\n")
        for m in q_re.findall(text):
            m = re.sub(r"\s+", " ", m).strip()
            key = norm(m)
            if len(key) >= 25:
                stems.setdefault(key, m)

        if i % 30 == 0:
            print(f"ocr {i}/{len(frames)} unique_stems={len(stems)}")

    ALL_OUT.write_text("\n".join(all_chunks), encoding="utf-8")
    lines = [f"{i:03d}. {s}" for i, s in enumerate(stems.values(), 1)]
    STEMS_OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("DONE unique_stems", len(stems), "->", STEMS_OUT)


if __name__ == "__main__":
    main()
