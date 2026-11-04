import { withBase } from '../lib/withBase'
import type { CommonConfig } from '../types'

const img = (path: string) => withBase(path)

/** Everything both links share. Side-specific parts live in nha-trai.ts / nha-gai.ts. */
export const common: CommonConfig = {
  date: '2026-11-24',
  timezone: 'Asia/Ho_Chi_Minh',
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
  partyLabels: {
    cardTitle: 'Thông tin tiệc cưới',
    startsAtLabel: 'Tiệc cưới sẽ diễn ra vào lúc:',
    // Must match schedule labels in the side configs to show their times on the card
    welcomeLabel: 'Đón khách',
    banquetLabel: 'Khai tiệc',
    locationTitle: 'Tiệc cưới sẽ tổ chức tại',
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
    // Asked before the generated "<lễ> — <nhà> — <ngày> — bạn có thể tham dự không?" questions
    extraQuestions: [
      {
        id: 'q0',
        type: 'choice',
        label: 'Bạn là khách của',
        options: ['gia đình chú rể', 'gia đình cô dâu'],
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
