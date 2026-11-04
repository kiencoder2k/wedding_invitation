# Thiệp cưới Trung Kiên & Thị Mão

Thiệp cưới online một trang (React + TypeScript + Vite + Tailwind CSS), giao diện đỏ đậm trên nền giấy kem.

Live: https://tuancoi20042000.github.io/wedding_invitation/

## Chạy trên máy

```bash
npm install
npm run dev      # http://localhost:5173/wedding_invitation/
npm run build    # build ra thư mục dist/
```

## Sửa nội dung

| Muốn đổi | Ở đâu |
| --- | --- |
| Tên, bố mẹ, địa chỉ, ngày giờ, địa điểm, lịch trình, dress code, lời chúc gợi ý | `src/config/invitation.ts` |
| Ảnh album | `public/gallery/` (rồi sửa `gallery.images` trong config) |
| Ảnh trong phong bì | `hero.photo` trong config (để trống = ảnh đầu tiên của album) |
| Mã QR mừng cưới | `public/qr/` |
| Nhạc nền | `public/music/` |
| Màu sắc | `src/theme/tokens.css`, `src/components/invite/shared.tsx` |
| Các phần của thiệp | `src/components/invite/*` |

Ngày âm lịch được tính tự động (`src/lib/lunar.ts`).

## Lưu dữ liệu khách mời

- **Xác nhận tham dự:** điền URL Google Apps Script vào `rsvp.endpoint` — xem `google-apps-script/README.md`. Để trống thì form vẫn chạy nhưng không lưu.
- **Sổ lưu bút:** hiện chỉ lưu tạm trong trình duyệt (mất khi tải lại trang).

## Deploy

Mỗi lần push lên nhánh `main`, GitHub Actions (`.github/workflows/deploy.yml`) tự build và đăng lên GitHub Pages.
Lần đầu cần bật: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Nếu đổi tên repo, sửa `base` trong `vite.config.ts` cho khớp (`/<tên-repo>/`).
