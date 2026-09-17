import type { AssessmentId } from "../data/syllabus"
import { QUESTIONS } from "../data/questions"

const KEY = "passready-v1"
const LEGACY_KEY = "crew80-v1"
const DAY = 86_400_000

export type SrsQuality = "again" | "good" | "easy"

export type ItemStats = {
  seen: number
  correct: number
  streak: number
  last?: number
  ease?: number
  intervalDays?: number
  due?: number
}

export type SkillRun = {
  at: number
  passed: boolean
  missedCritical: number
  elapsedSec: number
  buddy?: boolean
  recited?: boolean
}

export type CrewFlag = {
  chapter: number
  note: string
  name: string
  at: number
}

export type TestRun = {
  testId: string
  at: number
  hits: number
  total: number
  pct: number
  elapsedSec: number
  timedOut: boolean
  missedIds: string[]
  /** Question ids served on this attempt — used to avoid repeat forms. */
  itemIds?: string[]
}

export type Protocol = {
  lastCallIt: number | null
  lastBuddySkill: number | null
}

export type Store = {
  name: string
  scores: Partial<Record<AssessmentId, number>>
  items: Record<string, ItemStats>
  skillRuns: Record<string, SkillRun[]>
  crew: CrewFlag[]
  jeopardySeen: string[]
  testRuns: TestRun[]
  protocol: Protocol
}

const empty = (): Store => ({
  name: "",
  scores: {},
  items: {},
  skillRuns: {},
  crew: [],
  jeopardySeen: [],
  testRuns: [],
  protocol: { lastCallIt: null, lastBuddySkill: null },
})

export function loadStore(): Store {
  try {
    const raw = localStorage.getItem(KEY) ?? localStorage.getItem(LEGACY_KEY)
    if (!raw) return empty()
    const parsed = JSON.parse(raw) as Store
    return {
      ...empty(),
      ...parsed,
      testRuns: parsed.testRuns ?? [],
      protocol: parsed.protocol ?? { lastCallIt: null, lastBuddySkill: null },
    }
  } catch {
    return empty()
  }
}

export function saveStore(store: Store) {
  localStorage.setItem(KEY, JSON.stringify(store))
}

export function applySrs(prev: ItemStats | undefined, correct: boolean, quality?: SrsQuality): ItemStats {
  const now = Date.now()
  const q: SrsQuality = quality ?? (correct ? "good" : "again")
  const seen = (prev?.seen ?? 0) + 1
  const nextCorrect = (prev?.correct ?? 0) + (correct ? 1 : 0)
  const streak = correct ? (prev?.streak ?? 0) + 1 : 0
  let ease = prev?.ease ?? 2.5
  let intervalDays = prev?.intervalDays ?? 0

  if (q === "again" || !correct) {
    ease = Math.max(1.3, ease - 0.2)
    intervalDays = 0
  } else if (q === "easy") {
    ease = Math.min(2.8, ease + 0.15)
    intervalDays = intervalDays <= 0 ? 2 : Math.max(2, Math.round(intervalDays * ease * 1.3))
  } else {
    ease = Math.min(2.8, ease + 0.05)
    if (intervalDays <= 0) intervalDays = 1
    else if (intervalDays === 1) intervalDays = 3
    else intervalDays = Math.max(3, Math.round(intervalDays * ease))
  }

  const due = intervalDays <= 0 ? now : now + intervalDays * DAY
  return { seen, correct: nextCorrect, streak, last: now, ease, intervalDays, due }
}

export function recordAnswer(store: Store, id: string, correct: boolean, quality?: SrsQuality): Store {
  const next = applySrs(store.items[id], correct, quality)
  return { ...store, items: { ...store.items, [id]: next } }
}

export function recordCallIt(store: Store): Store {
  return { ...store, protocol: { ...store.protocol, lastCallIt: Date.now() } }
}

export function recordSkill(store: Store, skillId: string, run: SkillRun): Store {
  const list = store.skillRuns[skillId] ?? []
  const protocol =
    run.passed && run.buddy && run.recited
      ? { ...store.protocol, lastBuddySkill: run.at }
      : store.protocol
  return { ...store, skillRuns: { ...store.skillRuns, [skillId]: [...list, run].slice(-20) }, protocol }
}

export function recordTestRun(store: Store, run: TestRun): Store {
  return { ...store, testRuns: [...(store.testRuns ?? []), run].slice(-40) }
}

export function runsForTest(store: Store, testId: string) {
  return (store.testRuns ?? []).filter((r) => r.testId === testId)
}

export function bestRun(store: Store, testId: string) {
  const runs = runsForTest(store, testId)
  if (!runs.length) return null
  return runs.reduce((best, r) => (r.pct > best.pct ? r : best))
}

export type ChapterMastery = {
  chapter: number
  seen: number
  correct: number
  pct: number | null
  weak: boolean
}

export function masteryByChapter(store: Store): ChapterMastery[] {
  const map = new Map<number, { seen: number; correct: number }>()
  for (const q of QUESTIONS) {
    const s = store.items[q.id]
    if (!s) continue
    const cur = map.get(q.chapter) ?? { seen: 0, correct: 0 }
    cur.seen += s.seen
    cur.correct += s.correct
    map.set(q.chapter, cur)
  }
  return [...map.entries()].map(([chapter, v]) => {
    const pct = v.seen ? Math.round((v.correct / v.seen) * 100) : null
    return { chapter, seen: v.seen, correct: v.correct, pct, weak: pct !== null && pct < 80 }
  })
}

/** Running accuracy on cards last seen at least `minAgeDays` ago — honest retention. */
export function delayedRecall(store: Store, minAgeDays = 3) {
  const cutoff = Date.now() - minAgeDays * DAY
  let seen = 0
  let correct = 0
  for (const s of Object.values(store.items)) {
    if (!s.last || s.last > cutoff || s.seen === 0) continue
    seen += s.seen
    correct += s.correct
  }
  if (!seen) return null
  return Math.round((correct / seen) * 100)
}

export function runningAccuracy(store: Store) {
  let seen = 0
  let correct = 0
  for (const s of Object.values(store.items)) {
    seen += s.seen
    correct += s.correct
  }
  if (!seen) return null
  return Math.round((correct / seen) * 100)
}

export function sameDay(a: number | null | undefined, b = Date.now()) {
  if (!a) return false
  const da = new Date(a)
  const db = new Date(b)
  return da.getFullYear() === db.getFullYear() && da.getMonth() === db.getMonth() && da.getDate() === db.getDate()
}

export function encodeCrewPayload(store: Store) {
  const weak = masteryByChapter(store)
    .filter((m) => m.weak)
    .map((m) => m.chapter)
  const payload = {
    n: store.name || "unnamed",
    w: weak,
    f: store.crew.slice(-8).map((c) => ({ c: c.chapter, t: c.note, n: c.name })),
  }
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))))
}

export function decodeCrewPayload(code: string): { n: string; w: number[]; f: { c: number; t: string; n: string }[] } | null {
  try {
    const parsed = JSON.parse(decodeURIComponent(escape(atob(code.trim())))) as {
      n: string
      w: number[]
      f: { c: number; t: string; n: string }[]
    }
    if (!Array.isArray(parsed.w)) return null
    return parsed
  } catch {
    return null
  }
}
