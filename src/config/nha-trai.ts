import type { SideConfig } from '../types'

// Link: https://tuancoi20042000.github.io/wedding_invitation/nha-trai/
// TODO: thay địa chỉ và giờ bằng thông tin thật của nhà trai
// Pin 21°08'45.3"N 105°45'03.6"E
const COORDS = '21.145917,105.751012'
const directions = (coords: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${coords}`

export const nhaTrai: SideConfig = {
  id: 'nha-trai',
  houseLabel: 'Nhà trai',
  ceremony: {
    title: 'Lễ Thành Hôn',
    time: '16:00',
    venue: 'Tư gia nhà trai',
    address: 'Xóm Vọt, Thôn Yên Nhân, Xã Mê Linh, TP Hà Nội',
    mapAddress: COORDS,
    mapLink: directions(COORDS),
  },
  party: {
    title: 'Lễ Thành Hôn',
    time: '16:00',
    venue: 'Tư gia nhà trai',
    address: 'Xóm Vọt, Thôn Yên Nhân, Xã Mê Linh, TP Hà Nội',
    // "lat,lng" for the embedded map; mapLink is the "Chỉ đường" button
    mapAddress: COORDS,
    mapLink: directions(COORDS),
  },
}
