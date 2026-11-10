import type { EventDetails, InvitationData, RsvpQuestion, SideConfig } from '../types'
import { common } from './common'
import { nhaGai } from './nha-gai'
import { nhaTrai } from './nha-trai'

// Keep in sync with SIDE_PAGES in vite.config.ts
const SIDES: SideConfig[] = [nhaTrai, nhaGai]

/** Picks the side from the first path segment after the base, e.g. /wedding_invitation/nha-gai/. */
function currentSide(): SideConfig {
  const rest = window.location.pathname.slice(import.meta.env.BASE_URL.length)
  const segment = rest.split('/')[0]
  return SIDES.find((s) => s.id === segment) ?? nhaTrai
}

function attendQuestion(id: string, event: EventDetails, houseLabel: string): RsvpQuestion {
  const [y, m, d] = common.date.split('-')
  return {
    id,
    type: 'yesno',
    label: `${event.title} — ${houseLabel} — ${d}/${m}/${y} — bạn có thể tham dự không?`,
  }
}

export const side = currentSide()

const { date, timezone, schedule, partyLabels, rsvp, ...shared } = common

export const invitation: InvitationData = {
  ...shared,
  ceremony: { ...side.ceremony, date, timezone, schedule },
  party: { ...side.party, ...partyLabels, date, timezone, schedule },
  rsvp: {
    ...rsvp,
    questions: [
      ...rsvp.extraQuestions,
      attendQuestion('q1', side.ceremony, side.houseLabel),
      attendQuestion('q2', side.party, side.houseLabel),
    ],
  },
}
