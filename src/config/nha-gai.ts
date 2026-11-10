import type { SideConfig } from '../types'

// Link: https://tuancoi20042000.github.io/wedding_invitation/nha-gai/
// Nhà Văn Hoá Ấp Hạ, Quang Minh — plus code 5PCX+3PM (7PH75PCX+3PM)
const COORDS = '21.170213,105.749297'
const directions = (coords: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${coords}`

export const nhaGai: SideConfig = {
  id: 'nha-gai',
  houseLabel: 'Nhà gái',
  ceremony: {
    title: 'Lễ Thành Hôn',
    time: '16:00',
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
