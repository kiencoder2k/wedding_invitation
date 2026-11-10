import { useState } from 'react'
import { buildGoogleCalendarUrl, durationFromSchedule } from '../../lib/gcal'
import type { SectionProps } from '../../types'
import Reveal from '../ui/Reveal'
import RsvpForm from './RsvpForm'
import { CalendarCard, DateBlock, Heading, Modal, PillButton, RedCard } from './shared'

export default function PartyInfo({ data }: SectionProps) {
  const [rsvpOpen, setRsvpOpen] = useState(false)
  const party = data.party
  const { groom, bride } = data.couple
  const welcome = party.welcomeTime
  const banquet = party.banquetTime
  const start = welcome || party.time
  // Calendar event runs from guest welcome to the last schedule item
  const lastItem = party.schedule[party.schedule.length - 1]

  const calendarUrl = buildGoogleCalendarUrl({
    title: `${party.title} ${groom.shortName} & ${bride.shortName}`,
    description: `${party.title} ${groom.shortName} & ${bride.shortName} — ${party.venue}`,
    location: party.address || party.mapLink,
    dateIso: party.date,
    timeHHmm: start,
    timeZone: party.timezone,
    durationMinutes: durationFromSchedule(
      lastItem ? [{ id: 'start', time: start, label: '' }, lastItem] : [],
      180,
    ),
  })

  return (
    <section id="party-info" className="relative py-4">
      <Reveal>
        <RedCard deco="left">
          <Heading tone="cream">{party.cardTitle}</Heading>
          <p className="mt-6 text-[19px] uppercase">{party.startsAtLabel}</p>
          <div className="mt-4">
            <DateBlock dateIso={party.date} time={party.time} />
          </div>

          {(welcome || banquet) && (
            <div className="mt-7 flex justify-center gap-10">
              {[
                [party.welcomeLabel, welcome],
                [party.banquetLabel, banquet],
              ]
                .filter(([, t]) => t)
                .map(([label, t]) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <span className="text-[13px] uppercase tracking-wide opacity-80">{label}</span>
                    <span className="text-[19px] font-bold">{t}</span>
                  </div>
                ))}
            </div>
          )}

          <div className="mx-auto mt-8 max-w-[320px]">
            <CalendarCard dateIso={party.date} />
          </div>

          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-[14px] font-bold underline underline-offset-4"
          >
            {data.calendarButton}
          </a>
          <div className="mt-6">
            <PillButton tone="cream" onClick={() => setRsvpOpen(true)}>
              {data.rsvp.buttonLabel}
            </PillButton>
          </div>
        </RedCard>
      </Reveal>

      <Modal open={rsvpOpen} onClose={() => setRsvpOpen(false)} label={data.rsvp.buttonLabel}>
        <RsvpForm data={data} />
      </Modal>
    </section>
  )
}
