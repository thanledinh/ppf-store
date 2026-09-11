import os
import glob
from PIL import Image

def optimize_image(filepath, max_width, quality=80):
    try:
        orig_size = os.path.getsize(filepath)
        with Image.open(filepath) as img:
            w, h = img.size
            if w > max_width:
                new_h = int(h * (max_width / w))
                img = img.resize((max_width, new_h), Image.Resampling.LANCZOS)
            
            # Save to temporary buffer or file
            temp_path = filepath + ".tmp.webp"
            img.save(temp_path, "WEBP", quality=quality, method=6)
            
        new_size = os.path.getsize(temp_path)
        if new_size < orig_size:
            os.replace(temp_path, filepath)
            saved = (orig_size - new_size) / 1024
            rel_path = os.path.relpath(filepath)
            print(f"✓ {rel_path}: {orig_size/1024:.1f}KB -> {new_size/1024:.1f}KB (saved {saved:.1f}KB)")
            return orig_size, new_size
        else:
            if os.path.exists(temp_path):
                os.remove(temp_path)
            return orig_size, orig_size
    except Exception as e:
        print(f"Error {filepath}: {e}")
        return 0, 0

def run():
    total_orig = 0
    total_new = 0

    print("🚀 Bắt đầu tối ưu hình ảnh với Python Pillow...")

    # 1. public/loiich/benefit-*.webp
    loiich_files = glob.glob("public/loiich/benefit-*.webp")
    for f in loiich_files:
        orig, new = optimize_image(f, max_width=720, quality=80)
        total_orig += orig
        total_new += new

    # 2. public/sanpham/**/*.webp
    sanpham_files = glob.glob("public/sanpham/**/*.webp", recursive=True)
    for f in sanpham_files:
        orig, new = optimize_image(f, max_width=720, quality=80)
        total_orig += orig
        total_new += new

    # 3. promo-car-bg.webp
    promo_bg = "public/promo-car-bg.webp"
    if os.path.exists(promo_bg):
        orig, new = optimize_image(promo_bg, max_width=1200, quality=75)
        total_orig += orig
        total_new += new

    print("\n" + "=" * 45)
    print(f"🎉 Tổng dung lượng gốc: {total_orig / 1024:.1f} KB")
    print(f"🎉 Dung lượng sau tối ưu: {total_new / 1024:.1f} KB")
    print(f"🎉 Đã tiết kiệm được: {(total_orig - total_new) / 1024:.1f} KB (giảm {((total_orig - total_new) / total_orig) * 100:.1f}%)")
    print("=" * 45)

if __name__ == "__main__":
    run()
