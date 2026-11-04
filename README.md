# Thiệp cưới Trung Kiên & Thị Mão

Thiệp cưới online một trang (React + TypeScript + Vite + Tailwind CSS), giao diện đỏ đậm trên nền giấy kem.

Live:
- Nhà trai: https://tuancoi20042000.github.io/wedding_invitation/nha-trai/
- Nhà gái: https://tuancoi20042000.github.io/wedding_invitation/nha-gai/

Link gốc (không có `/nha-trai/` hay `/nha-gai/`) hiển thị bản nhà trai.

## Chạy trên máy

```bash
npm install
npm run dev      # http://localhost:5173/wedding_invitation/
npm run build    # build ra thư mục dist/
```

## Sửa nội dung

| Muốn đổi | Ở đâu |
| --- | --- |
| Tên, bố mẹ, ngày cưới, album, dress code, lời chúc gợi ý, QR — dùng chung 2 link | `src/config/common.ts` |
| Lễ tại tư gia, địa chỉ, bản đồ, giờ và lịch trình tiệc — riêng nhà trai | `src/config/nha-trai.ts` |
| Như trên — riêng nhà gái | `src/config/nha-gai.ts` |
| Ảnh album | `public/gallery/` (rồi sửa `gallery.images` trong `common.ts`) |
| Ảnh trong phong bì | `hero.photo` trong `common.ts` (để trống = ảnh đầu tiên của album) |
| Mã QR mừng cưới | `public/qr/` |
| Nhạc nền | `public/music/` |
| Màu sắc | `src/theme/tokens.css`, `src/components/invite/shared.tsx` |
| Các phần của thiệp | `src/components/invite/*` |

Ngày âm lịch được tính tự động (`src/lib/lunar.ts`).

## Lưu dữ liệu khách mời

Điền URL Google Apps Script vào `SCRIPT_URL` trong `src/config/common.ts` — xem `google-apps-script/README.md`.

- **Xác nhận tham dự:** lưu vào tab `RSVP`. Để trống URL thì form vẫn chạy nhưng không lưu.
- **Sổ lưu bút:** lưu vào tab `Wishes`, mọi khách đều thấy; muốn ẩn lời chúc nào thì xoá dòng đó trong sheet. Để trống URL thì lời chúc chỉ lưu trong trình duyệt của người gửi.

## Deploy

Mỗi lần push lên nhánh `main`, GitHub Actions (`.github/workflows/deploy.yml`) tự build và đăng lên GitHub Pages.
Lần đầu cần bật: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Nếu đổi tên repo, sửa `base` trong `vite.config.ts` cho khớp (`/<tên-repo>/`).
