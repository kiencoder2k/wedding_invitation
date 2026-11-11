import type { SectionProps } from '../../types'
import Reveal from '../ui/Reveal'
import { Heading } from './shared'

// Final embed URL (the old maps?output=embed form 301-redirects with
// X-Frame-Options: SAMEORIGIN, which browsers block as ERR_BLOCKED_BY_RESPONSE)
function mapEmbedUrl(query: string, zoom = 16) {
  const q = query.replace(/!/g, '')
  return `https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${encodeURIComponent(q)}!6i${zoom}!3m1!1svi!5m1!1svi`
}

export default function Location({ data }: SectionProps) {
  const party = data.party
  return (
    <section id="location" className="relative px-4 py-12 text-center">
      <Reveal>
        <Heading>{party.locationTitle}</Heading>
        <p className="mt-3 text-[15px] font-bold">{party.venue}</p>
        <p className="mx-auto mt-1 max-w-[320px] text-[13px] leading-relaxed opacity-85">
          {party.address}
        </p>
      </Reveal>
      <Reveal delay={100}>
        <iframe
          src={mapEmbedUrl(party.mapAddress)}
          title={`Bản đồ: ${party.venue}`}
          loading="lazy"
          className="mt-5 h-[230px] w-full rounded-[10px] border-0 shadow-[0_6px_16px_rgba(81,20,25,0.15)]"
        />
        <a
          href={party.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-[15px] font-bold hover:opacity-75"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M3 11l18-8-8 18-2-8-8-2z" strokeLinejoin="round" />
          </svg>
          Chỉ đường
        </a>
      </Reveal>
    </section>
  )
}
