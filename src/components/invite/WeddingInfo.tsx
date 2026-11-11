import type { Person, SectionProps } from '../../types'
import Reveal from '../ui/Reveal'
import { DateBlock, Heading, RedCard, SCRIPT_FONT, TITLE_FONT } from './shared'

function Parents({ person, houseLabel }: { person: Person; houseLabel: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-1 text-center">
      <span className="sr-only">{houseLabel}</span>
      <p className="text-[14px] opacity-85">{person.parentTitle}</p>
      <p className="text-[15px] font-bold" style={{ fontFamily: TITLE_FONT }}>
        {person.father}
      </p>
      <p className="text-[15px] font-bold" style={{ fontFamily: TITLE_FONT }}>
        {person.mother}
      </p>
      <p className="mt-1 whitespace-pre-line text-[11px] leading-snug opacity-80">
        {person.address}
      </p>
    </div>
  )
}

function CoupleName({ person }: { person: Person }) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-[46px] leading-tight" style={{ fontFamily: SCRIPT_FONT }}>
        {person.shortName}
      </p>
    </div>
  )
}

export default function WeddingInfo({ data }: SectionProps) {
  const { groom, bride } = data.couple
  const info = data.weddingInfo
  const c = data.ceremony

  return (
    <section id="wedding-info" className="relative py-4">
      <Reveal>
        <RedCard deco="right">
          <Heading tone="cream">{info.title}</Heading>

          <div className="mt-6 flex items-stretch gap-3">
            <Parents person={groom} houseLabel={info.groomHouseLabel} />
            <span
              className="w-px self-stretch"
              style={{ backgroundColor: 'rgba(236,228,216,0.45)' }}
            />
            <Parents person={bride} houseLabel={info.brideHouseLabel} />
          </div>

          <p className="mt-7 whitespace-pre-line text-[13px] uppercase leading-relaxed">
            {info.announcement}
          </p>

          <div className="mt-6 flex flex-col items-center gap-5">
            <CoupleName person={groom} />
            <span
              className="text-[40px] leading-none opacity-90"
              style={{ fontFamily: SCRIPT_FONT }}
            >
              &amp;
            </span>
            <CoupleName person={bride} />
          </div>

          <p className="mt-8 text-[16px] uppercase leading-snug tracking-wide">
            {c.title} được cử hành tại {c.venue}
          </p>
          <div className="mt-4">
            <DateBlock dateIso={c.date} time={c.time} timePrefix="Vào lúc" />
          </div>
          <p className="mt-4 text-[12px] opacity-80">{c.address}</p>
        </RedCard>
      </Reveal>
    </section>
  )
}
