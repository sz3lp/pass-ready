import { CHAPTERS, BLOCKS, type BlockId } from "./syllabus"
import { NOTES_B12, type StudyPack } from "./notes-b12"
import { NOTES_B34 } from "./notes-b34"

export type { StudyPack }

export const STUDY_PACKS: StudyPack[] = [...NOTES_B12, ...NOTES_B34].sort((a, b) => a.chapter - b.chapter)

export function studyPack(chapter: number) {
  return STUDY_PACKS.find((p) => p.chapter === chapter)
}

export function studyPacksForBlock(block: BlockId) {
  const set = new Set(BLOCKS.find((b) => b.id === block)?.examChapters ?? [])
  return STUDY_PACKS.filter((p) => set.has(p.chapter))
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
