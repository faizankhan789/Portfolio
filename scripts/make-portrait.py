"""Generate public/images/portrait-cutout.png from source-assets/img.png.
Runs locally only (rembg u2net model); the photo is never uploaded.
Run: python3 -I scripts/make-portrait.py
"""
from pathlib import Path
from PIL import Image
from rembg import remove

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "source-assets" / "img.png"
OUT = ROOT / "public" / "images" / "portrait-cutout.png"
CROP = (230, 290, 730, 800)  # left, top, right, bottom on the 928x1120 source
HEIGHT = 600

img = Image.open(SRC).convert("RGBA")
cut = remove(img)
crop = cut.crop(CROP)
w = round(crop.width * HEIGHT / crop.height)
crop = crop.resize((w, HEIGHT), Image.LANCZOS)
OUT.parent.mkdir(parents=True, exist_ok=True)
crop.save(OUT, optimize=True)
print(f"wrote {OUT} {crop.size}")
