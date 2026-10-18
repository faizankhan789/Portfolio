"""Generate public/images/portrait-cutout.webp (lossy, quality 85, with alpha) from source-assets/img.png.
Runs locally only (rembg u2net model); the photo is never uploaded.
Requires: rembg, Pillow (with WebP support), numpy, scipy  (pip install rembg pillow numpy scipy)
Run: python3 -I scripts/make-portrait.py
"""
from pathlib import Path
from PIL import Image
import numpy as np
from rembg import remove
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "source-assets" / "img.png"
OUT = ROOT / "public" / "images" / "portrait-cutout.webp"
CROP = (230, 290, 730, 800)  # left, top, right, bottom on the 928x1120 source
HEIGHT = 600

img = Image.open(SRC).convert("RGBA")
cut = remove(img)

# Clean the matte: drop faint alpha, keep only the largest connected opaque blob.
arr = np.array(cut)
alpha = arr[..., 3]
alpha[alpha <= 64] = 0
labels, n = ndimage.label(alpha > 0)
if n > 1:
    sizes = ndimage.sum(alpha > 0, labels, range(1, n + 1))
    alpha[labels != (int(np.argmax(sizes)) + 1)] = 0
arr[..., 3] = alpha
cut = Image.fromarray(arr, "RGBA")
crop = cut.crop(CROP)
w = round(crop.width * HEIGHT / crop.height)
crop = crop.resize((w, HEIGHT), Image.LANCZOS)
OUT.parent.mkdir(parents=True, exist_ok=True)
crop.save(OUT, "WEBP", quality=85, alpha_quality=100, method=6)
print(f"wrote {OUT} {crop.size}")
