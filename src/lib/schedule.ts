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

export function pickMission<T extends { id: string; chapter: number }>(
  pool: T[],
  stats: Record<string, { seen: number; correct: number; streak: number }>,
  n: number,
) {
  const scored = pool.map((q) => {
    const s = stats[q.id]
    const seen = s?.seen ?? 0
    const pct = seen ? (s!.correct / seen) : 0
    const stale = !s?.streak || s.streak < 2
    const weight = (seen === 0 ? 4 : 0) + (pct < 0.8 ? 3 : 0) + (stale ? 2 : 0) + Math.random()
    return { q, weight }
  })
  scored.sort((a, b) => b.weight - a.weight)
  return scored.slice(0, n).map((x) => x.q)
}
