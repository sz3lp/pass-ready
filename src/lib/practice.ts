import {
  EXAM_QUESTIONS,
  QUESTIONS,
  examQuestionsForChapters,
  questionsForChapters,
  type Question,
} from "../data/questions"
import type { PracticeTest } from "../data/tests"
import type { Store } from "./storage"
import { runsForTest } from "./storage"
import { shuffle } from "./schedule"

/** Unit tests use the exam-hard vignette bank only (Thursday-written style). */
export function poolFor(test: PracticeTest) {
  const exam = test.chapters.length ? examQuestionsForChapters(test.chapters) : EXAM_QUESTIONS
  if (exam.length >= Math.min(test.target, 8)) return exam
  return test.chapters.length ? questionsForChapters(test.chapters) : QUESTIONS
}

/** Prefer items not seen on recent attempts of the same test. */
export function recentItemIds(store: Store | undefined, testId: string, lastN = 3): Set<string> {
  const ids = new Set<string>()
  if (!store) return ids
  for (const run of runsForTest(store, testId).slice(-lastN)) {
    for (const id of run.itemIds ?? []) ids.add(id)
  }
  return ids
}

export function buildTestQueue(
  test: PracticeTest,
  seed = Date.now(),
  opts?: { excludeIds?: Set<string> },
): Question[] {
  const pool = poolFor(test)
  const exclude = opts?.excludeIds ?? new Set<string>()
  const byChapter = new Map<number, { fresh: Question[]; used: Question[] }>()

  for (const q of pool) {
    const bucket = byChapter.get(q.chapter) ?? { fresh: [], used: [] }
    if (exclude.has(q.id)) bucket.used.push(q)
    else bucket.fresh.push(q)
    byChapter.set(q.chapter, bucket)
  }

  for (const [ch, bucket] of byChapter) {
    byChapter.set(ch, {
      fresh: shuffle(bucket.fresh, seed + ch * 17),
      used: shuffle(bucket.used, seed + ch * 31),
    })
  }

  const chapters = [...byChapter.keys()].sort((a, b) => a - b)
  const queues = new Map<number, Question[]>()
  for (const ch of chapters) {
    const b = byChapter.get(ch)!
    queues.set(ch, [...b.fresh, ...b.used])
  }

  const picked: Question[] = []
  const target = Math.min(test.target, pool.length)
  let i = 0
  while (picked.length < target && i < target * chapters.length + 8) {
    const ch = chapters[i % chapters.length]
    const take = queues.get(ch)?.shift()
    if (take) picked.push(take)
    i++
  }
  return shuffle(picked, seed)
}

export function chapterBreakdown(queue: Question[], picks: (number | null)[]) {
  const map = new Map<number, { hits: number; total: number }>()
  queue.forEach((q, i) => {
    const cur = map.get(q.chapter) ?? { hits: 0, total: 0 }
    cur.total += 1
    if (picks[i] === q.answer) cur.hits += 1
    map.set(q.chapter, cur)
  })
  return [...map.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([chapter, v]) => ({
      chapter,
      hits: v.hits,
      total: v.total,
      pct: Math.round((v.hits / v.total) * 100),
    }))
}

export function formatClock(totalSec: number) {
  const s = Math.max(0, Math.floor(totalSec))
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${r.toString().padStart(2, "0")}`
}
