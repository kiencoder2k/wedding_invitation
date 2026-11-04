import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { uuid } from '../../lib/uuid'
import type { SectionProps } from '../../types'
import Reveal from '../ui/Reveal'
import { FlowerDeco, Heading, PillButton } from './shared'

interface Wish {
  id: string
  name: string
  wish: string
  at: Date | null
}

/** Shape stored in localStorage and returned by the Apps Script (`?action=wishes`) */
interface StoredWish {
  name: string
  wish: string
  at: string | null
}

const CACHE_KEY = 'guestbook-wishes'

function readCache(): StoredWish[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(CACHE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeCache(wishes: StoredWish[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(wishes))
  } catch {
    // Private mode / storage disabled — the list still works for this visit
  }
}

const toWish = (w: StoredWish): Wish => ({
  id: uuid(),
  name: w.name,
  wish: w.wish,
  at: w.at ? new Date(w.at) : null,
})

const fieldClass =
  'w-full rounded-[8px] border bg-white/70 px-4 py-3 text-[15px] outline-none placeholder:text-[#511419]/55 focus:bg-white'

function formatTime(d: Date) {
  return `${d.toLocaleTimeString('vi-VN', { hour12: false })} ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
}

// Wishes are shared through the Apps Script sheet and cached in localStorage so they show
// instantly on reload. Without an endpoint they are kept in this browser only.
export default function Guestbook({ data }: SectionProps) {
  const gb = data.guestbook
  const seeds = () => gb.seedWishes.map((w) => toWish({ ...w, at: null }))
  const [wishes, setWishes] = useState<Wish[]>(() => [...readCache().map(toWish), ...seeds()])
  const [name, setName] = useState('')
  const [wish, setWish] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // biome-ignore lint/correctness/useExhaustiveDependencies: load once per endpoint
  useEffect(() => {
    if (!gb.endpoint) return
    let cancelled = false
    fetch(`${gb.endpoint}?action=wishes`)
      .then((res) => res.json() as Promise<{ ok?: boolean; wishes?: StoredWish[] }>)
      .then((json) => {
        if (cancelled || !json.ok || !Array.isArray(json.wishes)) return
        writeCache(json.wishes)
        setWishes([...json.wishes.map(toWish), ...seeds()])
      })
      .catch(() => {
        // Offline / script down — keep showing the cached list
      })
    return () => {
      cancelled = true
    }
  }, [gb.endpoint])

  const suggest = () => {
    const pool = gb.suggestions.filter((s) => s !== wish)
    if (pool.length) setWish(pool[Math.floor(Math.random() * pool.length)])
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (submitting) return
    if (!name.trim() || !wish.trim()) {
      setError(gb.formError)
      return
    }
    setError('')
    const entry: StoredWish = { name: name.trim(), wish: wish.trim(), at: new Date().toISOString() }
    if (gb.endpoint) {
      setSubmitting(true)
      try {
        const res = await fetch(gb.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ type: 'wish', name: entry.name, wish: entry.wish }),
        })
        const json = (await res.json()) as { ok?: boolean; at?: string }
        if (!res.ok || !json.ok) throw new Error('submit failed')
        if (json.at) entry.at = json.at
      } catch {
        setError(gb.submitError)
        return
      } finally {
        setSubmitting(false)
      }
    }
    writeCache([entry, ...readCache()])
    setWishes((w) => [toWish(entry), ...w])
    setName('')
    setWish('')
  }

  return (
    <section id="guestbook" className="relative px-4 py-12">
      <Reveal>
        <div className="relative -mx-2">
          <form
            onSubmit={submit}
            className="relative z-10 rounded-[14px] px-8 pt-8 pb-10 shadow-[0_10px_26px_rgba(81,20,25,0.18)]"
            style={{
              backgroundColor: 'rgba(255,250,243,0.96)',
              border: '1px solid rgba(81,20,25,0.12)',
            }}
          >
            <Heading>{gb.title}</Heading>
            <div className="mt-6 space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={gb.namePlaceholder}
                aria-label={gb.namePlaceholder}
                className={fieldClass}
                style={{ borderColor: 'var(--color-primary)' }}
              />
              <textarea
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder={gb.wishPlaceholder}
                aria-label={gb.wishPlaceholder}
                rows={2}
                className={`${fieldClass} resize-none`}
                style={{ borderColor: 'var(--color-primary)' }}
              />
            </div>
            {error && (
              <p role="alert" className="mt-2 text-[13px] text-red-700">
                {error}
              </p>
            )}
            <div className="mt-5 flex items-center justify-between">
              <button
                type="button"
                onClick={suggest}
                title="Gợi ý lời chúc"
                aria-label="Gợi ý lời chúc"
                className="flex h-9 w-9 items-center justify-center rounded-[8px] text-[16px] hover:opacity-80 cursor-pointer"
                style={{ backgroundColor: 'rgba(81,20,25,0.1)' }}
              >
                🪄
              </button>
              <PillButton type="submit" disabled={submitting}>
                {submitting ? 'Đang gửi...' : gb.submitLabel}
              </PillButton>
            </div>
          </form>
          <FlowerDeco
            className="-left-12 -bottom-16 z-0 h-[150px]"
            style={{ transform: 'scaleX(-1) rotate(160deg)' }}
          />
        </div>
      </Reveal>

      {wishes.length > 0 && (
        <ul className="mt-14 max-h-[420px] space-y-3 overflow-y-auto pr-1">
          {wishes.map((w) => (
            <li
              key={w.id}
              className="rounded-[10px] px-4 py-3"
              style={{
                backgroundColor: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(81,20,25,0.25)',
              }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-bold [overflow-wrap:anywhere]">{w.name}</span>
                {w.at && (
                  <span className="shrink-0 text-[12px] opacity-70">{formatTime(w.at)}</span>
                )}
              </div>
              <p className="mt-2 text-[15px] leading-relaxed [overflow-wrap:anywhere]">{w.wish}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
