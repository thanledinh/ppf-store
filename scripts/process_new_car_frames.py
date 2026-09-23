import os
import sys
import cv2
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

def process_video(video_path, output_dir, target_size, quality, prefix="frame_", max_frames=96):
    os.makedirs(output_dir, exist_ok=True)
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"❌ Error: Could not open {video_path}")
        return 0

    native_w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    native_h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_in_video = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    print(f"\n🎬 Processing: {video_path}")
    print(f"   Native: {native_w}x{native_h} @ {fps:.1f} fps ({total_in_video} frames)")
    print(f"   Target: {target_size[0]}x{target_size[1]} | Quality: {quality} | Output: {output_dir}")

    frame_idx = 0
    total_bytes = 0

    while frame_idx < max_frames:
        ret, frame = cap.read()
        if not ret:
            break

        # BGR -> RGB
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        img = Image.fromarray(rgb)

        # Resize to target dimension
        if (img.width, img.height) != target_size:
            img = img.resize(target_size, Image.Resampling.LANCZOS)

        out_name = f"{prefix}{frame_idx:03d}.webp"
        out_path = os.path.join(output_dir, out_name)

        img.save(out_path, "WEBP", quality=quality, method=6)
        size = os.path.getsize(out_path)
        total_bytes += size

        if frame_idx % 20 == 0 or frame_idx == max_frames - 1:
            print(f"   ✓ [{frame_idx:02d}/{max_frames}] {out_name} ({size // 1024} KB)")

        frame_idx += 1

    cap.release()
    avg_kb = (total_bytes / frame_idx / 1024) if frame_idx > 0 else 0
    print(f"✅ Extracted {frame_idx} frames to {output_dir}")
    print(f"   Total: {total_bytes / (1024 * 1024):.2f} MB | Avg: {avg_kb:.1f} KB/frame")
    return frame_idx

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    # 1. Desktop frames (xepc.mp4 -> public/frames)
    pc_video = os.path.join(base_dir, "public", "xepc.mp4")
    pc_out = os.path.join(base_dir, "public", "frames")
    if os.path.exists(pc_video):
        count_pc = process_video(pc_video, pc_out, target_size=(1920, 1080), quality=78, max_frames=96)
        
        # Save hero-first-frame.webp
        first_frame_pc = os.path.join(pc_out, "frame_000.webp")
        hero_first_pc = os.path.join(base_dir, "public", "hero-first-frame.webp")
        if os.path.exists(first_frame_pc):
            img_first = Image.open(first_frame_pc)
            img_first.save(hero_first_pc, "WEBP", quality=84, method=6)
            print(f"🌟 Updated {hero_first_pc} ({img_first.size[0]}x{img_first.size[1]}, {os.path.getsize(hero_first_pc) // 1024} KB)")
    else:
        print(f"❌ Not found: {pc_video}")

    # 2. Mobile frames (xemobile.mp4 -> public/mobile-frames)
    mb_video = os.path.join(base_dir, "public", "xemobile.mp4")
    mb_out = os.path.join(base_dir, "public", "mobile-frames")
    if os.path.exists(mb_video):
        count_mb = process_video(mb_video, mb_out, target_size=(1080, 1920), quality=80, max_frames=96)
        
        # Save hero-first-frame-mobile.webp
        first_frame_mb = os.path.join(mb_out, "frame_000.webp")
        hero_first_mb = os.path.join(base_dir, "public", "hero-first-frame-mobile.webp")
        if os.path.exists(first_frame_mb):
            img_first_mb = Image.open(first_frame_mb)
            img_first_mb.save(hero_first_mb, "WEBP", quality=82, method=6)
            print(f"🌟 Updated {hero_first_mb} ({img_first_mb.size[0]}x{img_first_mb.size[1]}, {os.path.getsize(hero_first_mb) // 1024} KB)")
    else:
        print(f"❌ Not found: {mb_video}")

if __name__ == "__main__":
    main()
