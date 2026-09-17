import type { Question } from "../data/questions"

const STOP = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "to",
  "of",
  "in",
  "for",
  "with",
  "on",
  "is",
  "are",
  "be",
  "as",
  "at",
  "by",
  "that",
  "this",
  "from",
  "your",
  "you",
  "not",
  "if",
  "it",
  "its",
])

export function normalizeRecall(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function recallTokens(s: string) {
  return normalizeRecall(s).split(" ").filter((w) => w.length > 1 && !STOP.has(w))
}

function near(a: string, b: string) {
  return a === b || a.includes(b) || b.includes(a)
}

/** True when the typed line hits the correct choice or the why/tag keywords. */
export function matchRecall(typed: string, q: Question) {
  const t = recallTokens(typed)
  if (t.length === 0) return false
  const target = recallTokens(q.choices[q.answer])
  const extra = [...recallTokens(q.why).slice(0, 10), ...recallTokens(q.tag)]
  const pool = [...target, ...extra]
  const hits = t.filter((w) => pool.some((p) => near(w, p)))
  const targetHits = target.filter((w) => t.some((x) => near(x, w)))
  if (target.length && targetHits.length >= Math.min(target.length, Math.max(2, Math.ceil(target.length * 0.5)))) {
    return true
  }
  return hits.length >= Math.max(2, Math.ceil(Math.min(t.length, 6) * 0.6))
}
