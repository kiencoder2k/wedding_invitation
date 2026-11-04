import type { SideConfig } from '../types'

// Link: https://tuancoi20042000.github.io/wedding_invitation/nha-gai/
const COORDS = '21.145881,105.750701'
const directions = (coords: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${coords}`

export const nhaGai: SideConfig = {
  id: 'nha-gai',
  houseLabel: 'Nhà gái',
  ceremony: {
    title: 'Lễ Ăn Hỏi & Lễ Vu Quy',
    time: '08:30',
    venue: 'Tư gia nhà gái',
    address: 'Xóm a, thôn b, xã c, TP Hà Nội',
    mapAddress: COORDS,
    mapLink: directions(COORDS),
    schedule: [
      { id: 'sc-1', time: '08:00', label: 'Đón khách' },
      { id: 'sc-2', time: '08:30', label: 'Lễ Ăn Hỏi' },
      { id: 'sc-3', time: '09:00', label: 'Lễ Vu Quy' },
      { id: 'sc-4', time: '10:00', label: 'Bữa cơm thân mật' },
      { id: 'sc-5', time: '12:00', label: 'Tiễn khách' },
    ],
  },
  party: {
    title: 'Lễ Thành Hôn',
    time: '11:00',
    venue: 'Trung tâm tiệc cưới ABC',
    address: 'Sảnh A, Tầng 1, Số x, đường y, phường z, TP Hà Nội',
    // "lat,lng" for the embedded map; mapLink is the "Chỉ đường" button
    mapAddress: COORDS,
    mapLink: directions(COORDS),
    // Shown in "Lịch trình ngày cưới"; "Đón khách" / "Khai tiệc" also appear on the party card
    schedule: [
      { id: 'th-1', time: '10:30', label: 'Đón khách' },
      { id: 'th-2', time: '11:00', label: 'Nghi lễ thành hôn' },
      { id: 'th-3', time: '11:30', label: 'Khai tiệc' },
      { id: 'th-4', time: '12:30', label: 'Cắt bánh & nâng ly' },
      { id: 'th-5', time: '13:30', label: 'Tiễn khách' },
    ],
  },
}
