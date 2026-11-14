import type { SideConfig } from '../types'

// Link: https://tuancoi20042000.github.io/wedding_invitation/nha-gai/
// Nhà Văn Hoá Ấp Hạ, Quang Minh
const COORDS = '21.1705411,105.7487847'
const directions = (coords: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${coords}`

export const nhaGai: SideConfig = {
  id: 'nha-gai',
  houseLabel: 'Nhà gái',
  ceremony: {
    title: 'Lễ Thành Hôn',
    time: '08:20',
    venue: 'Tư gia nhà gái',
    address: 'Nhà văn hóa Thôn Ấp Hạ, xã Quang Minh, TP Hà Nội',
    mapAddress: COORDS,
    mapLink: directions(COORDS),
  },
  party: {
    title: 'Lễ Thành Hôn',
    time: '16:00',
    venue: 'Nhà văn hóa',
    address: 'Thôn Ấp Hạ, xã Quang Minh, TP Hà Nội',
    // "lat,lng" for the embedded map; mapLink is the "Chỉ đường" button
    mapAddress: COORDS,
    mapLink: directions(COORDS),
  },
}
