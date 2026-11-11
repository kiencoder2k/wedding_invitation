import type { SectionProps } from '../../types'
import Reveal from '../ui/Reveal'
import { FlowerDeco, SCRIPT_FONT, TITLE_FONT } from './shared'

const ENVELOPE = '#6a1a22'
const ENVELOPE_DARK = '#4c1017'
const ENVELOPE_LIGHT = '#78202a'

function WaxSeal() {
  return (
    <div
      className="absolute left-1/2 top-[42%] z-30 flex h-[50px] w-[50px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
      style={{
        background: 'radial-gradient(circle at 35% 30%, #f3d48f, #c99640 55%, #9a6a22)',
        boxShadow: '0 3px 8px rgba(0,0,0,0.45), inset 0 -2px 4px rgba(0,0,0,0.25)',
      }}
      aria-hidden
    >
      <div
        className="flex h-[36px] w-[36px] items-center justify-center rounded-full"
        style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.35)' }}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path
            fill="none"
            stroke="#8a5c1a"
            strokeWidth="2"
            d="M12 20s-6.8-4.2-8.7-8.2C2 8.8 3.7 5.2 7 5.2c1.9 0 3.3 1.1 5 3 1.7-1.9 3.1-3 5-3 3.3 0 5 3.6 3.7 6.6C18.8 15.8 12 20 12 20z"
          />
        </svg>
      </div>
    </div>
  )
}

export default function SaveTheDate({ data }: SectionProps) {
  const { groom, bride } = data.couple
  const photo = data.hero.photo || data.gallery.images[0]?.url

  return (
    <section id="save-the-date" className="relative pt-14 pb-12">
      <Reveal>
        <p
          className="text-center text-[13px] uppercase tracking-[0.3em]"
          style={{ fontFamily: TITLE_FONT, color: '#5a0411' }}
        >
          {data.hero.kicker}
        </p>
      </Reveal>

      <Reveal delay={150}>
        <div className="relative mx-auto mt-10 h-[330px] w-[300px]">
          {/* back of the envelope + open flap */}
          <div
            className="absolute bottom-0 left-0 h-[200px] w-full rounded-[4px]"
            style={{ backgroundColor: ENVELOPE_DARK }}
          />
          <div
            className="absolute left-0 bottom-[196px] h-[70px] w-full"
            style={{
              backgroundColor: ENVELOPE_DARK,
              clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
            }}
          />

          {/* photo tucked inside */}
          {photo && (
            <div
              className="absolute right-[22px] top-[18px] z-10 h-[230px] w-[190px] bg-white p-[8px] shadow-[0_6px_16px_rgba(0,0,0,0.3)]"
              style={{ transform: 'rotate(7deg)' }}
            >
              <img src={photo} alt="" className="h-full w-full object-cover" />
            </div>
          )}

          {/* front pocket: three folded panels meeting under the seal */}
          <div className="absolute bottom-0 left-0 z-20 h-[200px] w-full drop-shadow-[0_8px_14px_rgba(56,10,14,0.35)]">
            <div
              className="absolute inset-0 rounded-b-[4px]"
              style={{
                backgroundColor: ENVELOPE,
                clipPath: 'polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{ backgroundColor: ENVELOPE_LIGHT, clipPath: 'polygon(0 0, 50% 50%, 0 100%)' }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: ENVELOPE_LIGHT,
                clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)',
              }}
            />
            <div
              className="absolute inset-0 rounded-b-[4px]"
              style={{ backgroundColor: ENVELOPE, clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }}
            />
            <WaxSeal />
          </div>

          <FlowerDeco
            className="-left-[30px] top-[30px] z-30 h-[230px]"
            style={{ transform: 'scaleX(-1) rotate(-14deg)' }}
          />
        </div>
      </Reveal>

      <Reveal delay={250}>
        <div
          className="relative mt-12 flex flex-col items-center text-center leading-[1.15]"
          style={{ fontFamily: SCRIPT_FONT, color: 'var(--color-primary)' }}
        >
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[90px] opacity-[0.12]"
            style={{ fontFamily: SCRIPT_FONT }}
          >
            &amp;
          </span>
          <span className="relative text-[46px]">{groom.shortName}</span>
          <span className="relative text-[46px]">{bride.shortName}</span>
        </div>
      </Reveal>
    </section>
  )
}
