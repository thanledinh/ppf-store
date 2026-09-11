import os
import sys
import glob
import cv2
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

def find_video(folder, pattern="*.mp4"):
    matches = glob.glob(os.path.join(folder, pattern))
    if not matches:
        return None
    # Sort by modification time, newest first
    matches.sort(key=os.path.getmtime, reverse=True)
    return matches[0]

def extract_and_optimize(video_path, output_dir, prefix="frame_", quality=84, max_frames=96):
    os.makedirs(output_dir, exist_ok=True)
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"❌ Cannot open video: {video_path}")
        return 0

    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    print(f"\n🎬 Processing: {video_path}")
    print(f"   Native: {width}x{height}, {fps:.1f} fps, {total} total frames in video")

    frame_idx = 0
    total_bytes = 0

    while frame_idx < max_frames:
        ret, frame = cap.read()
        if not ret:
            break
        
        # Convert BGR to RGB
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        img = Image.fromarray(rgb)

        out_name = f"{prefix}{frame_idx:03d}.webp"
        out_path = os.path.join(output_dir, out_name)

        # Save as WebP with high quality compression
        img.save(out_path, "WEBP", quality=quality, method=6)
        size = os.path.getsize(out_path)
        total_bytes += size

        if frame_idx % 20 == 0 or frame_idx == max_frames - 1:
            print(f"   ✓ Saved {out_name} ({img.size[0]}x{img.size[1]}, {size // 1024} KB)")

        frame_idx += 1

    cap.release()
    avg_kb = (total_bytes / frame_idx / 1024) if frame_idx > 0 else 0
    print(f"✅ Extracted {frame_idx} frames to {output_dir}")
    print(f"   Total size: {total_bytes / (1024 * 1024):.2f} MB (Avg: {avg_kb:.1f} KB/frame)")
    return frame_idx

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    # 1. Desktop frames
    dt_video = os.path.join(base_dir, "public", "frames", "Xe_di_chuyển_ra_khung_20260911161902.mp4")
    if not os.path.exists(dt_video):
        dt_video = find_video(os.path.join(base_dir, "public", "frames"))

    dt_out = os.path.join(base_dir, "public", "frames")
    if dt_video and os.path.exists(dt_video):
        count_dt = extract_and_optimize(dt_video, dt_out, quality=84, max_frames=96)
        
        # Copy first frame to hero-first-frame.webp
        first_frame_dt = os.path.join(dt_out, "frame_000.webp")
        hero_first_dt = os.path.join(base_dir, "public", "hero-first-frame.webp")
        if os.path.exists(first_frame_dt):
            img0 = Image.open(first_frame_dt)
            img0.save(hero_first_dt, "WEBP", quality=86, method=6)
            print(f"🌟 Updated {hero_first_dt} from frame_000 ({img0.size[0]}x{img0.size[1]}, {os.path.getsize(hero_first_dt) // 1024} KB)")
    else:
        print("⚠️ Desktop video not found!")

    # 2. Mobile frames
    mb_video = os.path.join(base_dir, "public", "mobile-frames", "Xe_khởi_động_di_chuyển_20260911162031.mp4")
    if not os.path.exists(mb_video):
        mb_video = find_video(os.path.join(base_dir, "public", "mobile-frames"))

    mb_out = os.path.join(base_dir, "public", "mobile-frames")
    if mb_video and os.path.exists(mb_video):
        count_mb = extract_and_optimize(mb_video, mb_out, quality=80, max_frames=96)

        # Copy first frame to hero-first-frame-mobile.webp
        first_frame_mb = os.path.join(mb_out, "frame_000.webp")
        hero_first_mb = os.path.join(base_dir, "public", "hero-first-frame-mobile.webp")
        if os.path.exists(first_frame_mb):
            img0_mb = Image.open(first_frame_mb)
            img0_mb.save(hero_first_mb, "WEBP", quality=82, method=6)
            print(f"🌟 Updated {hero_first_mb} from mobile frame_000 ({img0_mb.size[0]}x{img0_mb.size[1]}, {os.path.getsize(hero_first_mb) // 1024} KB)")
    else:
        print("⚠️ Mobile video not found!")

if __name__ == "__main__":
    main()
