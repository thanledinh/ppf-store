# Dự Án Landing Page: Dán Phim Bảo Vệ Sơn Ô Tô (PPF) - Store Detailing

Dự án Landing Page dịch vụ **Dán Phim Bảo Vệ Sơn Ô Tô (PPF)** chuyên nghiệp tại TP.HCM cho **Store Detailing**.
- **Địa chỉ triển khai**: `https://ppf.storedetailing.vn/dan-ppf-o-to-tphcm/`
- **Trang Cảm Ơn**: `https://ppf.storedetailing.vn/dan-ppf-o-to-tphcm/cam-on/`
- **Git Remote Origin**: `https://github.com/thanledinh/ppf-store.git`

---

## 🚀 Công Nghệ & Kiến Trúc
- **Core**: Vanilla HTML5 + JavaScript (ES Modules) + Vite 6.
- **Styling**: Vanilla CSS + Tailwind CSS v4.
- **Animation & Canvas**: Custom Car 3D frame scroll animation trên HTML5 Canvas.
- **Tối ưu SEO/GEO**:
  - Semantic HTML5, H1-H3 chuẩn SEO.
  - JSON-LD Schemas: WebSite, AutoDetailing/LocalBusiness, Service PPF, Offer Catalog, FAQPage (9 câu hỏi).
  - Tích hợp hồ sơ AI bots: `llms.txt`, `robots.txt` (GPTBot, Perplexity, Claude, Applebot).
  - Sitemap: `sitemap.xml`.

---

## 📋 Sản Phẩm & Bảng Giá PPF
- **3M Scotchgard Pro Series (Mỹ)**:
  - 3M Scotchgard Gloss: 58.000.000đ – 68.000.000đ (Bảo hành 10 năm)
  - 3M Scotchgard Matte: 65.000.000đ – 75.000.000đ (Bảo hành 10 năm)
  - 3M Scotchgard Elite 9.5 mil: 78.000.000đ – 89.000.000đ (Bảo hành 10 năm)
- **Global PPF TPU (Mỹ)**:
  - Global Eco TPU: 28.000.000đ – 36.000.000đ (Bảo hành 5 năm)
  - Global Supreme TPU 8.5 mil: 42.000.000đ – 52.000.000đ (Bảo hành 7 năm)
- **Gói Vị Trí Xung Yếu**:
  - Gói Đầu Xe (Front End): 12.500.000đ – 17.500.000đ
  - Nắp Capo: 3.500.000đ – 6.500.000đ
  - Cản Trước: 4.200.000đ – 7.500.000đ
  - Hõm cửa, bệ cốp, đèn pha: Từ 900.000đ – 4.000.000đ

---

## 🛠️ Hướng Dẫn Khởi Chạy Môi Trường Phát Triển

Hệ thống:
- **Node.js**: `v22.14.0 (LTS)`
- **pnpm**: `v12.3.4`

### 1. Khởi chạy Dev Server:
```powershell
pnpm dev
```
Trình duyệt sẽ tự động phục vụ tại subpath: **`http://localhost:3000/dan-ppf-o-to-tphcm/`**

### 2. Đóng gói kiểm thử (Build Production):
```powershell
pnpm run build
```
Thư mục xuất xưởng `dist/` sẽ chứa gói build tĩnh hoàn chỉnh sẵn sàng deploy lên Cloudflare Pages / Vercel / Nginx.