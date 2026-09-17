import { BLOCKS, CALENDAR, type BlockId, type CalendarEvent } from "../data/syllabus"

export function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export function parseISO(iso: string) {
  const [y, m, day] = iso.split("-").map(Number)
  return new Date(y, m - 1, day)
}

export function daysUntil(iso: string, from = new Date()) {
  const ms = startOfDay(parseISO(iso)).getTime() - startOfDay(from).getTime()
  return Math.round(ms / 86_400_000)
}

export function currentBlock(from = new Date()): BlockId {
  const t = startOfDay(from).getTime()
  if (t <= parseISO("2026-09-26").getTime()) return 1
  if (t <= parseISO("2026-10-17").getTime()) return 2
  if (t <= parseISO("2026-11-07").getTime()) return 3
  return 4
}

export function nextEvent(from = new Date()): (CalendarEvent & { days: number }) | null {
  const t = startOfDay(from).getTime()
  const upcoming = CALENDAR
    .map((e) => ({ ...e, days: daysUntil(e.date, from) }))
    .filter((e) => parseISO(e.date).getTime() >= t)
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
  return upcoming[0] ?? null
}

export function nextWritten(from = new Date()) {
  const t = startOfDay(from).getTime()
  return CALENDAR.find((e) => (e.kind === "written" || e.kind === "final") && parseISO(e.date).getTime() >= t) ?? null
}

export function nextSkills(from = new Date()) {
  const t = startOfDay(from).getTime()
  return CALENDAR.find((e) => (e.kind === "skills" || e.kind === "lab") && parseISO(e.date).getTime() >= t) ?? null
}

export function blockMeta(from = new Date()) {
  const id = currentBlock(from)
  return BLOCKS.find((b) => b.id === id)!
}

export function formatLong(iso: string) {
  return parseISO(iso).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
}

export function shuffle<T>(list: T[], seed = Date.now()) {
  const copy = [...list]
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 16807) % 2147483647
    const j = s % (i + 1)
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export type QueueStats = {
  seen: number
  correct: number
  streak: number
  last?: number
  due?: number
}

/** Overdue first (weak/stale beat new), then unseen in current chapters, then fill. */
export function dueQueue<T extends { id: string; chapter: number }>(
  pool: T[],
  stats: Record<string, QueueStats>,
  n: number,
  currentChapters?: number[],
  now = Date.now(),
) {
  const chSet = currentChapters ? new Set(currentChapters) : null
  const overdue: { q: T; rank: number }[] = []
  const unseen: T[] = []
  const rest: T[] = []

  for (const q of pool) {
    const s = stats[q.id]
    if (!s || s.seen === 0) {
      if (!chSet || chSet.has(q.chapter)) unseen.push(q)
      else rest.push(q)
      continue
    }
    const due = s.due ?? 0
    if (due <= now) {
      const pct = s.correct / Math.max(1, s.seen)
      const wrong = pct < 0.8 ? 2000 : 0
      const stale = (now - (s.last ?? 0)) / 86_400_000
      overdue.push({ q, rank: wrong + stale })
    } else rest.push(q)
  }

  overdue.sort((a, b) => b.rank - a.rank)
  const out: T[] = []
  const seenIds = new Set<string>()
  const take = (list: T[]) => {
    for (const q of list) {
      if (out.length >= n) break
      if (seenIds.has(q.id)) continue
      seenIds.add(q.id)
      out.push(q)
    }
  }
  take(overdue.map((x) => x.q))
  take(shuffle(unseen, now))
  if (out.length < n) take(shuffle(rest, now + 7))
  return out.slice(0, n)
}

export function dueTonightCount<T extends { id: string }>(pool: T[], stats: Record<string, QueueStats>, now = Date.now()) {
  return pool.filter((q) => {
    const s = stats[q.id]
    if (!s || s.seen === 0) return true
    return (s.due ?? 0) <= now
  }).length
}

export function pickMission<T extends { id: string; chapter: number }>(
  pool: T[],
  stats: Record<string, QueueStats>,
  n: number,
  currentChapters?: number[],
) {
  return dueQueue(pool, stats, n, currentChapters)
}
