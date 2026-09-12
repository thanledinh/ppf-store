import base64
import io
import os
from PIL import Image, ImageDraw

src_path = 'public/1789187067794_6137153364714253540_6137153364714253540_153317800f10cfd38b1afc8dc7b07c03.jpg'
if not os.path.exists(src_path):
    print("Source image not found, skipping generation.")
    exit(0)

pil_img = Image.open(src_path).convert('RGBA')
w, h = pil_img.size

# Supersampled antialiased circular mask
scale = 4
mask = Image.new('L', (w * scale, h * scale), 0)
draw = ImageDraw.Draw(mask)
draw.ellipse((0, 0, w * scale - 1, h * scale - 1), fill=255)
mask = mask.resize((w, h), Image.Resampling.LANCZOS)
pil_img.putalpha(mask)

# 1. Generate ICO (16, 32, 48)
pil_img.save('public/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])

# 2. Generate PNGs
icon_16 = pil_img.resize((16, 16), Image.Resampling.LANCZOS)
icon_16.save('public/favicon-16x16.png', 'PNG', optimize=True)

icon_32 = pil_img.resize((32, 32), Image.Resampling.LANCZOS)
icon_32.save('public/favicon-32x32.png', 'PNG', optimize=True)

icon_apple = pil_img.resize((180, 180), Image.Resampling.LANCZOS)
icon_apple.save('public/apple-touch-icon.png', 'PNG', optimize=True)

icon_192 = pil_img.resize((192, 192), Image.Resampling.LANCZOS)
icon_192.save('public/icon-192.png', 'PNG', optimize=True)

icon_512 = pil_img.resize((512, 512), Image.Resampling.LANCZOS)
icon_512.save('public/icon-512.png', 'PNG', optimize=True)

# 3. Generate SVG with embedded crisp PNG (192x192)
buf = io.BytesIO()
icon_192.save(buf, format='PNG', optimize=True)
b64_png = base64.b64encode(buf.getvalue()).decode('ascii')

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192">
  <image href="data:image/png;base64,{b64_png}" width="192" height="192"/>
</svg>
'''

with open('public/favicon.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

# 4. Remove raw source JPG
os.remove(src_path)

print("Generated all favicon formats successfully:")
for fname in ['favicon.svg', 'favicon.ico', 'favicon-32x32.png', 'favicon-16x16.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png']:
    p = os.path.join('public', fname)
    print(f" - {fname}: {os.path.getsize(p)} bytes")
