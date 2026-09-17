import type { AssessmentId } from "../data/syllabus"
import { QUESTIONS } from "../data/questions"

const KEY = "passready-v1"
const LEGACY_KEY = "crew80-v1"

export type ItemStats = {
  seen: number
  correct: number
  streak: number
  last?: number
}

export type SkillRun = {
  at: number
  passed: boolean
  missedCritical: number
  elapsedSec: number
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
}

export type Store = {
  name: string
  scores: Partial<Record<AssessmentId, number>>
  items: Record<string, ItemStats>
  skillRuns: Record<string, SkillRun[]>
  crew: CrewFlag[]
  jeopardySeen: string[]
  testRuns: TestRun[]
}

const empty = (): Store => ({
  name: "",
  scores: {},
  items: {},
  skillRuns: {},
  crew: [],
  jeopardySeen: [],
  testRuns: [],
})

export function loadStore(): Store {
  try {
    const raw = localStorage.getItem(KEY) ?? localStorage.getItem(LEGACY_KEY)
    if (!raw) return empty()
    const parsed = JSON.parse(raw) as Store
    return { ...empty(), ...parsed, testRuns: parsed.testRuns ?? [] }
  } catch {
    return empty()
  }
}

export function saveStore(store: Store) {
  localStorage.setItem(KEY, JSON.stringify(store))
}

export function recordAnswer(store: Store, id: string, correct: boolean): Store {
  const prev = store.items[id] ?? { seen: 0, correct: 0, streak: 0 }
  const next: ItemStats = {
    seen: prev.seen + 1,
    correct: prev.correct + (correct ? 1 : 0),
    streak: correct ? prev.streak + 1 : 0,
    last: Date.now(),
  }
  return { ...store, items: { ...store.items, [id]: next } }
}

export function recordSkill(store: Store, skillId: string, run: SkillRun): Store {
  const list = store.skillRuns[skillId] ?? []
  return { ...store, skillRuns: { ...store.skillRuns, [skillId]: [...list, run].slice(-20) } }
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
