export interface Person {
  fullName: string
  shortName: string
  /** Birth-order title shown under the full name, e.g. "Trưởng Nam", "Út Nữ" */
  rank: string
  parentTitle: string
  father: string
  mother: string
  address: string
}

export interface GalleryImage {
  url: string
  alt: string
}

export interface RsvpQuestion {
  id: string
  type: 'yesno' | 'choice'
  label: string
  options?: string[] // required when type === 'choice'
}

export interface ScheduleItem {
  id: string
  time: string
  label: string
}

export interface EventInfo {
  title: string
  date: string // ISO yyyy-mm-dd
  time: string // HH:mm
  timezone: string
  schedule: ScheduleItem[]
  venue: string
  address: string
  mapAddress: string // anything Google Maps can search: "lat,lng" or an address
  mapLink: string // "Chỉ đường" link + calendar location
}

/** Per-side part of an event; date and timezone are shared (see config/common.ts) */
export type EventDetails = Omit<EventInfo, 'date' | 'timezone'>

/** Labels of the reception card, shared by both sides */
export interface PartyLabels {
  cardTitle: string
  startsAtLabel: string
  welcomeLabel: string
  banquetLabel: string
  locationTitle: string
}

/** What differs between the groom-side link (/nha-trai/) and the bride-side link (/nha-gai/) */
export interface SideConfig {
  /** URL segment after the base, e.g. "nha-trai" */
  id: string
  /** Shown in the RSVP question, e.g. "Nhà trai" */
  houseLabel: string
  ceremony: EventDetails
  party: EventDetails
}

export interface CommonConfig extends Omit<InvitationData, 'ceremony' | 'party' | 'rsvp'> {
  /** Shared by the ceremony and the party on both links */
  date: string // ISO yyyy-mm-dd
  timezone: string
  partyLabels: PartyLabels
  /** The per-event yes/no questions are generated from each side's events */
  rsvp: Omit<InvitationData['rsvp'], 'questions'> & { extraQuestions: RsvpQuestion[] }
}

export interface InvitationData {
  site: { title: string }
  intro: { greeting: string; openButton: string }
  hero: { kicker: string; photo: string }
  couple: { groom: Person; bride: Person }
  weddingInfo: {
    title: string
    announcement: string
    groomHouseLabel: string
    brideHouseLabel: string
  }
  /** Home ceremony (ăn hỏi / vu quy / thành hôn tại tư gia) */
  ceremony: EventInfo
  /** Reception / banquet */
  party: EventInfo & PartyLabels
  calendarButton: string
  gallery: { title: string; images: GalleryImage[] }
  dressCode?: { title: string; subtitle: string; colors: string[] }
  timelineTitle: string
  rsvp: {
    buttonLabel: string
    attendLabel: string
    acceptLabel: string
    declineLabel: string
    nameError: string
    attendError: string
    submitError: string
    questions: RsvpQuestion[]
    maxGuests: number
    endpoint: string
  }
  guestbook: {
    title: string
    namePlaceholder: string
    wishPlaceholder: string
    submitLabel: string
    formError: string
    suggestions: string[]
    seedWishes: { name: string; wish: string }[]
  }
  gift: {
    title: string
    hint: string
    qrCodes: { label: string; owner: string; image: string }[]
  }
  thankYou: string
  music: { src: string }
}

export interface SectionProps {
  data: InvitationData
}
