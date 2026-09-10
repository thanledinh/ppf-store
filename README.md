# Dự Án Landing Page: Dán Phim Cách Nhiệt Ô Tô - Store Detailing

Dự án được khởi tạo chuẩn kiến trúc **Vite + Tailwind CSS v4 (Static-First)**, tuân thủ nghiêm ngặt theo quy chuẩn tại `D:\code\AGENTS.md` và `D:\code\MAU_CHUAN_SEO_GEO.md`.

---

## 🚀 Trạng Thái Dự Án: **ĐÃ SETUP HOÀN TẤT (CHƯA CODE GIAO DIỆN CHI TIẾT)**

Toàn bộ khung sườn kỹ thuật, cấu hình, dữ liệu có cấu trúc SEO/GEO, thẻ meta và tệp AI agent đã được thiết lập sẵn sàng.

### Cấu Trúc Thư Mục Chuẩn:
```text
D:\code\window-film/
├── public/
│   ├── c035653b478d4624b423f0abc1234567.txt  # Khóa xác thực IndexNow
│   ├── favicon.svg                           # Biểu tượng vector sắc nét
│   ├── llms.txt                              # Hồ sơ dữ liệu chuẩn cho AI Agent (llmstxt.org v2)
│   ├── robots.txt                            # Mở cửa cho GPTBot, Perplexity, Claude, Google
│   ├── site.webmanifest                      # PWA web manifest chuẩn
│   └── sitemap.xml                           # Sơ đồ trang web chuẩn SEO
├── src/
│   ├── styles/
│   │   └── main.css                          # Tailwind CSS v4 + Design Tokens Dark/Gold
│   └── main.js                               # Logic ES Module gọn nhẹ (100/100 Core Web Vitals)
├── scripts/
│   └── summon-bots.mjs                       # Script 1-chạm triệu hồi bot AI & IndexNow
├── functions/
│   └── _middleware.js                        # Edge Middleware bắt vết Bot trên Cloudflare Pages
├── index.html                                # Semantic HTML + Đầy đủ Meta SEO/GEO + JSON-LD Schema
├── vite.config.js                            # Cấu hình Vite với plugin @tailwindcss/vite
├── package.json                              # Quản lý script & dependencies bằng pnpm
├── CONTENT_DAN_PCN.md                        # Nội dung dịch vụ chuẩn SEO & bảng giá Store Detailing
└── README.md                                 # Tài liệu hướng dẫn dự án
```

---

## 🛠️ Hướng Dẫn Khởi Chạy Môi Trường Phát Triển

Hệ thống đã được cài đặt sẵn đầy đủ:
- **Node.js**: `v22.14.0 (LTS)`
- **npm**: `10.9.2`
- **pnpm**: `v12.3.4`

### 1. Khởi chạy Dev Server (Vite + Tailwind CSS):
```powershell
pnpm dev
```
Trình duyệt sẽ tự động khởi chạy tại: **`http://localhost:3000`** *(hoặc click chạy file `dev.bat`)*

### 2. Đóng gói kiểm thử (Build Production):
```powershell
pnpm run build
```

---

## 📋 Checklist Các Khối Giao Diện Sẵn Sàng Để Code Tiếp:
1. [ ] **Header / Navigation Bar**: Logo Store Detailing, danh mục dịch vụ, nút gọi nhanh Hotline `0378 78 88 98`.
2. [ ] **Hero Section**: H1 chuẩn SEO, cam kết chính hãng (3M, Global), cản nhiệt 99%, bảo hành 10 năm - trọn đời.
3. [ ] **Brand Trust Badges**: Huy hiệu đại lý ủy quyền 3M, Global Window Films.
4. [ ] **4 Lợi Ích Cốt Lõi**: TSER 70%, IRR 99%, chống tia UV, bảo vệ nội thất, giảm chói, chống văng kính.
5. [ ] **Bảng Giá Phim Cách Nhiệt**: Bảng so sánh Sedan / SUV 5 chỗ / SUV 7 chỗ cho từng thương hiệu và bảng dán kính lẻ.
6. [ ] **Quy Trình 11 Bước**: Thi công chuẩn phòng máy lạnh kín bụi với sương dập bụi mịn.
7. [ ] **Lưu Ý Sau Khi Dán**: 48h không hạ kính, 3 ngày không gắn camera, bảo hành điện tử.
8. [ ] **Vì Sao Chọn Store Detailing**: Hơn 10 năm, phục vụ >300.000 xe, hỗ trợ dán tại showroom/nhà riêng.
9. [ ] **Gallery Hình Ảnh Thực Tế**: Bộ sưu tập các dòng xe đã thi công.
10. [ ] **FAQ Accordion**: 9 câu hỏi thường gặp tích hợp tương tác mượt mà.
11. [ ] **Form Nhận Báo Giá & Booking**: Form chọn dòng xe, thương hiệu phim và số điện thoại.
12. [ ] **Footer**: Danh sách chi nhánh TPHCM, bản đồ chỉ đường, liên kết mạng xã hội.