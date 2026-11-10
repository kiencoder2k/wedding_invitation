import imgHook from '../assets/image/img_hook.jpg'
import qr1 from '../assets/image/qr_1.jpg'
import qr2 from '../assets/image/qr_2.jpg'
import { withBase } from '../lib/withBase'
import type { CommonConfig } from '../types'

// img_1.jpg … img_12.jpg, sorted by number
const albumImages = Object.entries(
  import.meta.glob<string>('../assets/image/img_*.jpg', {
    eager: true,
    import: 'default',
  }),
)
  .map(([path, url]) => ({ n: Number(/img_(\d+)\.jpg$/.exec(path)?.[1]), url }))
  .filter((x) => !Number.isNaN(x.n))
  .sort((a, b) => a.n - b.n)
  .map(({ url }) => ({ url, alt: '' }))

const img = (path: string) => withBase(path)

/** Everything both links share. Side-specific parts live in nha-trai.ts / nha-gai.ts. */
export const common: CommonConfig = {
  date: '2026-11-24',
  timezone: 'Asia/Ho_Chi_Minh',
  schedule: [
    { id: 'tl-1', time: '08:20', label: 'Lễ ăn hỏi' },
    { id: 'tl-2', time: '10:00', label: 'Nghi lễ thành hôn' },
    { id: 'tl-3', time: '16:30', label: 'Khai tiệc' },
    { id: 'tl-4', time: '19:30', label: 'Tiễn khách' },
  ],
  site: { title: 'Trung Kiên & Thị Mão' },
  intro: { greeting: 'Thân Mời', openButton: 'Mở thiệp' },
  hero: {
    kicker: 'Save the date',
    // Photo tucked into the envelope; falls back to the first gallery image when empty
    photo: imgHook,
  },
  couple: {
    groom: {
      fullName: 'Nguyễn Trung Kiên',
      shortName: 'Trung Kiên',
      parentTitle: 'Ông Bà',
      father: 'Nguyễn Văn Cường',
      mother: 'Hoàng Thị Phượng',
      address: 'Yên Nhân, Mê Linh,\nHà Nội',
    },
    bride: {
      fullName: 'Nguyễn Thị Mão',
      shortName: 'Ngọc Mão',
      parentTitle: 'Ông Bà',
      father: 'Nguyễn Bá Vinh',
      mother: 'Lưu Thị Hiên',
      address: 'Ấp Hạ, Quang Minh,\nHà Nội',
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
    welcomeLabel: 'Đón khách',
    welcomeTime: '16:00',
    banquetLabel: 'Khai tiệc',
    banquetTime: '16:30',
    locationTitle: 'Tiệc cưới sẽ tổ chức tại',
  },
  calendarButton: 'Thêm vào lịch',
  gallery: {
    title: 'Album ảnh',
    images: albumImages,
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
      { label: 'Mừng cưới chú rể', owner: 'Nguyễn Trung Kiên', image: qr1 },
      { label: 'Mừng cưới cô dâu', owner: 'Nguyễn Thị Mão', image: qr2 },
    ],
  },
  thankYou: 'Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!',
  music: {
    src: img('/music/canon-in-d-cello-piano.mp3'),
  },
}
