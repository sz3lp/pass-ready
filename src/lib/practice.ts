import { QUESTIONS, questionsForChapters, type Question } from "../data/questions"
import type { PracticeTest } from "../data/tests"
import { shuffle } from "./schedule"

export function poolFor(test: PracticeTest) {
  return test.chapters.length ? questionsForChapters(test.chapters) : QUESTIONS
}

export function buildTestQueue(test: PracticeTest, seed = Date.now()): Question[] {
  const pool = poolFor(test)
  const byChapter = new Map<number, Question[]>()
  for (const q of pool) {
    const list = byChapter.get(q.chapter) ?? []
    list.push(q)
    byChapter.set(q.chapter, list)
  }
  for (const [ch, list] of byChapter) {
    byChapter.set(ch, shuffle(list, seed + ch * 17))
  }
  const chapters = [...byChapter.keys()].sort((a, b) => a - b)
  const picked: Question[] = []
  const target = Math.min(test.target, pool.length)
  let i = 0
  while (picked.length < target && i < target * chapters.length + 8) {
    const ch = chapters[i % chapters.length]
    const take = byChapter.get(ch)?.shift()
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
