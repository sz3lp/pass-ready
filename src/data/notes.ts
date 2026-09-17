import { CHAPTERS, BLOCKS, type BlockId } from "./syllabus"
import { NOTES_B12, type StudyPack } from "./notes-b12"
import { NOTES_B34 } from "./notes-b34"

export type { StudyPack }

/** Maps syllabus chapters to Jeopardy/class topic video keys when available. */
const CHAPTER_TOPIC: Record<number, string> = {
  1: "b1-ems",
  8: "b1-ems",
  5: "b1-body",
  6: "b1-body",
  13: "b1-trauma-shock",
  25: "b1-trauma-shock",
  26: "b1-trauma-shock",
  11: "b1-airway",
  14: "b1-airway",
  27: "b1-soft-head",
  28: "b1-soft-head",
  29: "b1-soft-head",
  10: "b1-ems",
  30: "b2-ortho",
  31: "b2-ortho",
  32: "b2-ortho",
  15: "b2-medical",
  16: "b2-cardio-resp",
  17: "b2-cardio-resp",
  18: "b2-neuro",
  20: "b3-endo",
  21: "b3-endo",
  33: "b3-endo",
  24: "b3-ob",
  34: "b3-ob",
  12: "b3-pharm",
  19: "b3-pharm",
  2: "b3-safety",
  9: "b3-safety",
  22: "b3-tox",
  23: "b3-tox",
  7: "b4-lifespan",
  36: "b4-lifespan",
  37: "b4-lifespan",
  35: "b4-peds",
  3: "b4-legal",
  4: "b4-legal",
  38: "b4-ops",
  39: "b4-ops",
  40: "b4-ops",
  41: "b4-ops",
}

export const STUDY_PACKS: StudyPack[] = [...NOTES_B12, ...NOTES_B34].sort((a, b) => a.chapter - b.chapter)

export function studyPack(chapter: number) {
  return STUDY_PACKS.find((p) => p.chapter === chapter)
}

export function studyPacksForBlock(block: BlockId) {
  const set = new Set(BLOCKS.find((b) => b.id === block)?.examChapters ?? [])
  return STUDY_PACKS.filter((p) => set.has(p.chapter))
}

export function topicKeyForChapter(chapter: number) {
  return CHAPTER_TOPIC[chapter]
}

export function chapterTitle(n: number) {
  return CHAPTERS.find((c) => c.n === n)?.title ?? `Chapter ${n}`
}

export function primaryPath(block: BlockId) {
  const meta = BLOCKS.find((b) => b.id === block)!
  return meta.examChapters.map((n) => ({
    chapter: n,
    title: chapterTitle(n),
    pack: studyPack(n),
  }))
}
