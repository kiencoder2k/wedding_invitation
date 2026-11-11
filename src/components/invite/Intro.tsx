import { useEffect, useRef, useState } from 'react'
import type { SectionProps } from '../../types'
import { dateParts, FlowerDeco, Ornament, SCRIPT_FONT } from './shared'

const REVEAL_DELAY_MS = 700

// Deterministic "random" layout for the floating hearts
const HEARTS = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 37) % 100,
  size: 10 + ((i * 7) % 14),
  delay: (i * 1.3) % 9,
  duration: 9 + ((i * 5) % 7),
  gold: i % 3 === 0,
}))

interface IntroProps extends SectionProps {
  open: boolean
  onOpen: () => void
}

export default function Intro({ data, open, onOpen }: IntroProps) {
  const [leaving, setLeaving] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const { groom, bride } = data.couple
  const p = dateParts(data.party.date)

  const handleOpen = () => {
    if (leaving) return
    setLeaving(true)
    timer.current = window.setTimeout(onOpen, REVEAL_DELAY_MS)
  }

  return (
    <div
      aria-hidden={open}
      inert={open}
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-[opacity,visibility] duration-700 ${
        open || leaving ? 'pointer-events-none opacity-0' : 'opacity-100'
      } ${open ? 'invisible' : ''}`}
      style={{ background: 'linear-gradient(to bottom right, #6e1a20, #511419, #380a0e)' }}
    >
      {HEARTS.map((h, i) => (
        <span
          key={i}
          aria-hidden
          className="intro-heart absolute bottom-[-30px]"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            color: h.gold ? 'rgba(201,162,74,0.55)' : 'rgba(200,60,70,0.45)',
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
        >
          ♥
        </span>
      ))}

      <div
        className={`relative w-[310px] rounded-[8px] px-6 pt-5 pb-14 text-center shadow-[0_18px_40px_rgba(0,0,0,0.45)] transition-transform duration-700 ${
          leaving ? 'scale-95' : 'scale-100'
        }`}
        style={{ backgroundColor: '#f6eee6', color: 'var(--color-primary)' }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-[8px]">
          <FlowerDeco
            className="-left-10 -top-14 h-[150px]"
            style={{ transform: 'scaleX(-1) rotate(25deg)' }}
          />
          <FlowerDeco
            className="-right-10 -bottom-12 h-[150px]"
            style={{ transform: 'rotate(200deg)' }}
          />
        </div>

        <div
          className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full shadow-[0_8px_18px_rgba(81,20,25,0.45)]"
          style={{ background: 'radial-gradient(circle at 30% 30%, #6e1a20, #330006)' }}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
            <path
              fill="#f6eee6"
              d="M12 21s-7.5-4.6-9.6-9.1C.9 8.6 2.8 4.5 6.6 4.5c2.2 0 3.7 1.3 5.4 3.2 1.7-1.9 3.2-3.2 5.4-3.2 3.8 0 5.7 4.1 4.2 7.4C19.5 16.4 12 21 12 21z"
            />
          </svg>
        </div>

        <div className="relative mt-6 leading-none" style={{ fontFamily: SCRIPT_FONT }}>
          <p className="text-[42px]">{groom.shortName}</p>
          <p className="my-1 text-[30px]">&amp;</p>
          <p className="text-[42px]">{bride.shortName}</p>
        </div>
        <Ornament className="relative mt-3" color="var(--color-primary)" />
        <p
          className="relative mt-4 text-[19px] opacity-85"
          style={{ fontFamily: '"Lora", "EB Garamond", serif' }}
        >
          {p.day} tháng {p.month}, {p.year}
        </p>
        <p
          className="relative mt-5 text-[19px] opacity-85"
          style={{ fontFamily: '"Lora", "EB Garamond", serif' }}
        >
          {data.intro.greeting}
        </p>
        <button
          type="button"
          onClick={handleOpen}
          className="intro-shine relative mt-6 overflow-hidden rounded-full px-8 py-3 text-[18px] font-bold shadow-[0_8px_18px_rgba(81,20,25,0.4)] transition-transform hover:scale-105 cursor-pointer"
          style={{
            background: 'linear-gradient(90deg, #5a1218, #511419)',
            color: '#f6eee6',
            fontFamily: '"Lora", "EB Garamond", serif',
          }}
        >
          {data.intro.openButton}
        </button>
      </div>
    </div>
  )
}
