import { withBase } from '../lib/withBase'
import type { InvitationData } from '../types'

const img = (path: string) => withBase(path)

const VENUE_COORDS = '21.145881,105.750701'
const VENUE_MAP_LINK = 'https://maps.app.goo.gl/DN3oqhQVXLoDxxuF6'

export const invitation: InvitationData = {
  site: { title: 'Trung Kiên & Thị Mão' },
  intro: { greeting: 'Thân Mời', openButton: 'Mở thiệp' },
  hero: {
    kicker: 'Save the date',
    // Photo tucked into the envelope; falls back to the first gallery image when empty
    photo: '',
  },
  couple: {
    groom: {
      fullName: 'Nguyễn Trung Kiên',
      shortName: 'Trung Kiên',
      rank: 'Trưởng Nam',
      parentTitle: 'Ông Bà',
      father: 'Nguyễn Văn X',
      mother: 'Nguyễn Thị X',
      address: 'Xóm a, thôn b,\nxã c, TP Hà Nội',
    },
    bride: {
      fullName: 'Nguyễn Thị Mão',
      shortName: 'Thị Mão',
      rank: 'Út Nữ',
      parentTitle: 'Ông Bà',
      father: 'Nguyễn Văn Y',
      mother: 'Nguyễn Thị Y',
      address: 'Xóm a, thôn b,\nxã c, TP Hà Nội',
    },
  },
  weddingInfo: {
    title: 'Thông tin lễ cưới',
    announcement: 'Trân trọng báo tin\nlễ thành hôn của con chúng tôi',
    groomHouseLabel: 'Nhà trai',
    brideHouseLabel: 'Nhà gái',
  },
  ceremony: {
    title: 'Lễ Ăn Hỏi & Lễ Vu Quy',
    date: '2026-11-24',
    time: '08:30',
    timezone: 'Asia/Ho_Chi_Minh',
    venue: 'Tư gia nhà gái',
    address: 'Xóm a, thôn b, xã c, TP Hà Nội',
    mapAddress: VENUE_COORDS,
    mapLink: VENUE_MAP_LINK,
    schedule: [
      { id: 'sc-1', time: '08:00', label: 'Đón khách' },
      { id: 'sc-2', time: '08:30', label: 'Lễ Ăn Hỏi' },
      { id: 'sc-3', time: '09:00', label: 'Lễ Vu Quy' },
      { id: 'sc-4', time: '10:00', label: 'Bữa cơm thân mật' },
      { id: 'sc-5', time: '12:00', label: 'Tiễn khách' },
    ],
  },
  party: {
    cardTitle: 'Thông tin tiệc cưới',
    startsAtLabel: 'Tiệc cưới sẽ diễn ra vào lúc:',
    welcomeLabel: 'Đón khách',
    banquetLabel: 'Khai tiệc',
    locationTitle: 'Tiệc cưới sẽ tổ chức tại',
    title: 'Lễ Thành Hôn',
    date: '2026-11-24',
    time: '11:00',
    timezone: 'Asia/Ho_Chi_Minh',
    venue: 'Trung tâm tiệc cưới ABC',
    address: 'Sảnh A, Tầng 1, Số x, đường y, phường z, TP Hà Nội',
    mapAddress: VENUE_COORDS,
    mapLink: VENUE_MAP_LINK,
    schedule: [
      { id: 'th-1', time: '10:30', label: 'Đón khách' },
      { id: 'th-2', time: '11:00', label: 'Nghi lễ thành hôn' },
      { id: 'th-3', time: '11:30', label: 'Khai tiệc' },
      { id: 'th-4', time: '12:30', label: 'Cắt bánh & nâng ly' },
      { id: 'th-5', time: '13:30', label: 'Tiễn khách' },
    ],
  },
  calendarButton: 'Thêm vào lịch',
  gallery: {
    title: 'Album ảnh',
    images: Array.from({ length: 10 }, (_, i) => ({
      url: img(`/gallery/placeholder-${i + 1}.svg`),
      alt: '',
    })),
  },
  dressCode: {
    title: 'Dress code',
    subtitle: 'Trang phục dự tiệc',
    colors: ['#511419', '#8e3b40', '#c9a24a', '#ece4d8'],
  },
  timelineTitle: 'Lịch trình ngày cưới',
  rsvp: {
    buttonLabel: 'Xác nhận tham dự',
    attendLabel: 'Bạn có tham dự được không?*',
    acceptLabel: 'Rất vui sẽ tham dự',
    declineLabel: 'Rất tiếc không tham dự',
    nameError: 'Vui lòng nhập tên của bạn.',
    attendError: 'Vui lòng cho chúng tôi biết bạn có tham dự không.',
    submitError: 'Gửi không thành công. Vui lòng thử lại sau.',
    maxGuests: 4,
    // Google Apps Script web app URL — see google-apps-script/README.md.
    // Empty = the form works but answers are not saved anywhere.
    endpoint: '',
    questions: [
      {
        id: 'q0',
        type: 'choice',
        label: 'Bạn là khách của',
        options: ['gia đình chú rể', 'gia đình cô dâu'],
      },
      {
        id: 'q1',
        type: 'yesno',
        label: 'Lễ Ăn Hỏi & Lễ Vu Quy — Nhà gái — 24/11/2026 — bạn có thể tham dự không?',
      },
      {
        id: 'q2',
        type: 'yesno',
        label: 'Lễ Thành Hôn — 24/11/2026 — bạn có thể tham dự không?',
      },
    ],
  },
  guestbook: {
    title: 'Sổ lưu bút',
    namePlaceholder: 'Nhập tên*',
    wishPlaceholder: 'Nhập lời chúc*',
    submitLabel: 'Gửi lời chúc',
    formError: 'Vui lòng nhập tên và lời chúc.',
    suggestions: [
      'Chúc mừng ngày vui của hai bạn, trăm năm hạnh phúc bền lâu!',
      'Chúc hai bạn sống bên nhau đầu bạc răng long.',
      'Mừng hạnh phúc hai bạn! Chúc gia đình nhỏ luôn đầy ắp tiếng cười.',
      'Chúc cô dâu chú rể luôn giữ được nụ cười này mãi mãi nhé!',
      'Chúc hai bạn mãi yêu thương nhau như ngày đầu, sớm có thiên thần nhỏ!',
    ],
    seedWishes: [],
  },
  gift: {
    title: 'Hộp quà mừng',
    hint: 'Nhấn để mở',
    qrCodes: [
      { label: 'Mừng cưới chú rể', owner: 'Nguyễn Trung Kiên', image: img('/qr/groom.svg') },
      { label: 'Mừng cưới cô dâu', owner: 'Nguyễn Thị Mão', image: img('/qr/bride.svg') },
    ],
  },
  thankYou: 'Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!',
  music: {
    src: img('/music/canon-in-d-cello-piano.mp3'),
  },
}
