import { QUESTIONS, chapterTitle, type Question } from "../data/questions"
import type { ClassSession } from "../data/brand"
import { shuffle } from "./schedule"

export const VALUES = [200, 400, 600, 800, 1000] as const

export type Cell = {
  q: Question
  value: number
  taken: boolean
}

export type CategoryCol = {
  name: string
  cells: Cell[]
}

type Def = { name: string; chapters: number[]; tag?: string }

export function clueOf(q: Question) {
  return q.stem.replace(/:\s*$/, ".")
}

export function responseOf(q: Question) {
  return q.choices[q.answer]
}

export function nudgeOf(q: Question) {
  const trap = q.choices.find((_, i) => i !== q.answer)
  const chapter = chapterTitle(q.chapter)
  if (trap) {
    return `Stay in ${chapter}. A lot of people jump to “${trap}.” That’s the trap, not the response.`
  }
  return `Stay in ${chapter}. Think ${q.tag} before you guess.`
}

export function shuffledChoices(q: Question) {
  return shuffle(
    q.choices.map((text, index) => ({ text, index })),
    q.id.length * 31,
  )
}

export function buildBoard(session: ClassSession, deal = 1): CategoryCol[] {
  const defs = expandDefs(session)
  return defs
    .map((cat) => {
      const set = new Set(cat.chapters)
      const pool = shuffle(
        QUESTIONS.filter((q) => set.has(q.chapter) && (!cat.tag || q.tag === cat.tag)),
        hash(`${session.id}:${cat.name}:${deal}`),
      )
      const take = Math.min(VALUES.length, pool.length)
      return {
        name: cat.name,
        cells: VALUES.slice(0, take).map((value, i) => ({
          q: pool[i],
          value,
          taken: false,
        })),
      }
    })
    .filter((col) => col.cells.length > 0)
}

function expandDefs(session: ClassSession): Def[] {
  if (session.categories.length > 1) return session.categories
  const only = session.categories[0]
  const set = new Set(only.chapters)
  const qs = QUESTIONS.filter((q) => set.has(q.chapter))
  const tags = [...new Set(qs.map((q) => q.tag))]
  if (tags.length < 2) return session.categories
  return tags.map((tag) => ({
    name: titleCase(tag),
    chapters: only.chapters,
    tag,
  }))
}

function titleCase(s: string) {
  return s.replace(/\b\w/g, (c) => c.toUpperCase())
}

function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return Math.abs(h)
}
