#!/usr/bin/env python3
"""Create a local emerald illustration when the image API is unavailable."""

from math import hypot
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


SIZE = 1024
OUTPUT = Path("assets/generated-images/emerald.jpg")


def blend(start: tuple[int, int, int], end: tuple[int, int, int], amount: float) -> tuple[int, int, int]:
    return tuple(round(a + (b - a) * amount) for a, b in zip(start, end))


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    image = Image.new("RGB", (SIZE, SIZE))
    pixels = image.load()
    center = (SIZE * 0.52, SIZE * 0.46)

    for y in range(SIZE):
        for x in range(SIZE):
            distance = min(1.0, hypot(x - center[0], y - center[1]) / (SIZE * 0.72))
            vertical = y / SIZE
            color = blend((7, 52, 42), (1, 13, 19), distance * 0.9)
            color = blend(color, (12, 83, 59), max(0.0, 1 - vertical) * 0.22)
            pixels[x, y] = color

    glow = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse((260, 180, 790, 760), fill=(24, 185, 111, 72))
    image = Image.alpha_composite(image.convert("RGBA"), glow.filter(ImageFilter.GaussianBlur(100)))

    shadow = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.ellipse((300, 745, 730, 885), fill=(0, 0, 0, 150))
    image = Image.alpha_composite(image, shadow.filter(ImageFilter.GaussianBlur(35)))

    gem = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(gem)
    outline = [(512, 176), (700, 252), (770, 390), (685, 720), (512, 842), (339, 720), (254, 390), (324, 252)]
    draw.polygon(outline, fill=(8, 106, 62, 255))
    crown = [(512, 176), (700, 252), (770, 390), (512, 430), (254, 390), (324, 252)]
    draw.polygon(crown, fill=(52, 205, 113, 255))
    draw.polygon([(512, 176), (700, 252), (512, 430)], fill=(122, 246, 157, 230))
    draw.polygon([(512, 176), (324, 252), (512, 430)], fill=(72, 221, 132, 230))
    draw.polygon([(254, 390), (512, 430), (339, 720)], fill=(8, 84, 56, 255))
    draw.polygon([(770, 390), (512, 430), (685, 720)], fill=(5, 66, 45, 255))
    draw.polygon([(339, 720), (512, 430), (512, 842)], fill=(7, 116, 66, 255))
    draw.polygon([(512, 430), (685, 720), (512, 842)], fill=(12, 153, 78, 255))
    draw.polygon([(324, 252), (512, 176), (432, 315), (380, 345)], fill=(180, 255, 193, 115))
    draw.polygon([(512, 430), (432, 315), (380, 345), (338, 390)], fill=(145, 255, 174, 95))
    draw.polygon([(700, 252), (770, 390), (656, 352), (592, 300)], fill=(8, 107, 62, 150))

    draw.line(outline + [outline[0]], fill=(185, 255, 204, 180), width=5, joint="curve")
    draw.line([(512, 176), (512, 430), (512, 842)], fill=(220, 255, 225, 125), width=4)
    draw.line([(254, 390), (512, 430), (770, 390)], fill=(225, 255, 229, 125), width=3)
    gem = gem.filter(ImageFilter.GaussianBlur(0.9))

    image = Image.alpha_composite(image, gem).convert("RGB")
    image.save(OUTPUT, "JPEG", quality=95, optimize=True)
    print(f"Imagen creada: {OUTPUT} ({OUTPUT.stat().st_size / 1024:.1f} KB)")


if __name__ == "__main__":
    main()
