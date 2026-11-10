import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import useLightbox from '../../hooks/useLightbox'
import type { SectionProps } from '../../types'
import Reveal from '../ui/Reveal'
import { Heading } from './shared'

const AUTOPLAY_MS = 3500
const TRANSITION_MS = 800
const SWIPE_PX = 40

// Coverflow pose by distance from the centre slide (same feel as the chungdoi "Song Hỷ" album)
const POSES = [
  { x: 0, z: 0, rot: 0, scale: 1, opacity: 1 },
  { x: 60, z: -150, rot: 45, scale: 0.85, opacity: 0.75 },
  { x: 120, z: -300, rot: 90, scale: 0.7, opacity: 0.5 },
  { x: 180, z: -450, rot: 135, scale: 0.7, opacity: 0.3 },
  { x: 240, z: -600, rot: 180, scale: 0.7, opacity: 0 },
]

/** Signed shortest distance from `active` to `i` on a ring of `n` slides. */
function ringOffset(i: number, active: number, n: number) {
  let d = (i - active) % n
  if (d > n / 2) d -= n
  if (d < -n / 2) d += n
  return d
}

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

export default function Album({ data }: SectionProps) {
  const images = data.gallery.images
  const n = images.length
  const { index, open, close, next, prev } = useLightbox(n)
  const active = index === null ? null : images[index]
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef<number | null>(null)

  const go = useCallback((step: number) => setCurrent((c) => (c + step + n) % n), [n])

  useEffect(() => {
    if (index === null) triggerRef.current?.focus()
    else {
      closeRef.current?.focus()
      // Keep the slider on the photo being viewed in the lightbox
      setCurrent(index)
    }
  }, [index])

  // Auto-advance; pauses while hovered/touched or while the lightbox is open
  useEffect(() => {
    if (n < 2 || paused || index !== null || prefersReducedMotion()) return
    const t = window.setInterval(() => go(1), AUTOPLAY_MS)
    return () => window.clearInterval(t)
  }, [n, paused, index, go])

  if (n === 0) return null

  return (
    <section id="album" className="relative overflow-hidden px-4 py-12">
      <Reveal>
        <Heading>{data.gallery.title}</Heading>
      </Reveal>
      <Reveal delay={100}>
        <div
          className="relative mx-auto mt-7 flex h-[420px] w-full max-w-[460px] items-center justify-center"
          style={{ perspective: '1000px' }}
          role="region"
          aria-roledescription="carousel"
          aria-label={data.gallery.title}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX
            setPaused(true)
          }}
          onTouchEnd={(e) => {
            const startX = touchX.current
            touchX.current = null
            setPaused(false)
            if (startX === null) return
            const dx = e.changedTouches[0].clientX - startX
            if (Math.abs(dx) > SWIPE_PX) go(dx < 0 ? 1 : -1)
          }}
        >
          {images.map((image, i) => {
            const d = ringOffset(i, current, n)
            const pose = POSES[Math.min(Math.abs(d), POSES.length - 1)]
            const sign = d < 0 ? -1 : 1
            const isCenter = d === 0
            return (
              <button
                key={image.url}
                type="button"
                tabIndex={isCenter ? 0 : -1}
                aria-hidden={!isCenter}
                aria-label={`Xem ảnh ${i + 1}`}
                onClick={(e) => {
                  if (!isCenter) {
                    go(d)
                    return
                  }
                  triggerRef.current = e.currentTarget
                  open(i)
                }}
                className={`absolute h-[92%] overflow-hidden rounded-2xl shadow-xl transition-all ease-in-out ${
                  isCenter ? 'cursor-zoom-in ring-2 ring-white/30' : 'cursor-pointer'
                }`}
                style={{
                  aspectRatio: '2 / 3',
                  transitionDuration: `${TRANSITION_MS}ms`,
                  transform: `translateX(${sign * pose.x}%) translateZ(${pose.z}px) rotateY(${sign * pose.rot}deg) scale(${pose.scale})`,
                  opacity: pose.opacity,
                  zIndex: 100 - Math.abs(d),
                  pointerEvents: pose.opacity === 0 ? 'none' : undefined,
                }}
              >
                <img
                  src={image.url}
                  alt={image.alt || `Ảnh cưới ${i + 1}`}
                  loading={Math.abs(d) <= 2 ? 'eager' : 'lazy'}
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              </button>
            )
          })}

          {n > 1 &&
            (
              [
                [-1, 'Ảnh trước', 'left-1', 'M15 5l-7 7 7 7'],
                [1, 'Ảnh sau', 'right-1', 'M9 5l7 7-7 7'],
              ] as const
            ).map(([step, label, side, path]) => (
              <button
                key={label}
                type="button"
                onClick={() => go(step)}
                aria-label={label}
                className={`absolute ${side} top-1/2 z-[200] flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 opacity-70 text-[var(--color-primary)] shadow-[0_4px_12px_rgba(81,20,25,0.2)] backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/60 hover:opacity-100 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d={path} />
                </svg>
              </button>
            ))}
        </div>

        {n > 1 && (
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {images.map((image, i) => (
              <button
                key={image.url}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Chuyển tới ảnh ${i + 1}`}
                aria-current={i === current}
                className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: i === current ? 20 : 8,
                  backgroundColor: 'var(--color-primary)',
                  opacity: i === current ? 1 : 0.3,
                }}
              />
            ))}
          </div>
        )}
      </Reveal>

      {active &&
        createPortal(
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Xem ảnh"
            onClick={(e) => {
              if (e.target === e.currentTarget) close()
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') close()
              if (e.key === 'ArrowRight') next()
              if (e.key === 'ArrowLeft') prev()
            }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Đóng"
              className="absolute right-4 top-4 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
            >
              ✕
            </button>
            <button
              type="button"
              onClick={prev}
              aria-label="Ảnh trước"
              className="absolute left-2 h-12 w-12 rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 cursor-pointer"
            >
              ‹
            </button>
            <img
              src={active.url}
              alt={active.alt}
              className="max-h-[85vh] max-w-full rounded-[8px] object-contain"
            />
            <button
              type="button"
              onClick={next}
              aria-label="Ảnh sau"
              className="absolute right-2 h-12 w-12 rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 cursor-pointer"
            >
              ›
            </button>
            <div className="absolute bottom-4 text-sm text-white/70">
              {(index ?? 0) + 1} / {images.length}
            </div>
          </div>,
          document.body,
        )}
    </section>
  )
}
