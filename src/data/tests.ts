import { BLOCKS, type BlockId } from "./syllabus"

export type PracticeTestId =
  | "b1"
  | "b2"
  | "b3"
  | "b4"
  | "q1"
  | "q2"
  | "q3"
  | "q4"
  | "q5"
  | "final"
  | "jb"

export type PracticeTest = {
  id: PracticeTestId
  label: string
  unit: string
  kind: "block" | "quiz" | "final"
  subtitle: string
  when: string
  chapters: number[]
  target: number
  minutes: number
  passLine: number
  gate: string
}

export const PRACTICE_TESTS: PracticeTest[] = [
  {
    id: "b1",
    label: "Block I Written",
    unit: "Block I",
    kind: "block",
    subtitle: "Ch. 1, 5, 6, 8, 10, 11, 13, 14, 25–29",
    when: "Thu Sep 24 · 1800–1930",
    chapters: BLOCKS[0].examChapters,
    target: 50,
    minutes: 90,
    passLine: 80,
    gate: "JB/TestPrep style: short vignette + vitals → next action. Near-miss distractors (wrong rate, order, definition). Real Thursday still feeds the 80% bench.",
  },
  {
    id: "q1",
    label: "Quiz 1",
    unit: "Block I",
    kind: "quiz",
    subtitle: "10 exam-hard items from Block I chapters",
    when: "During Block I",
    chapters: BLOCKS[0].examChapters,
    target: 10,
    minutes: 15,
    passLine: 80,
    gate: "10 vignette items. An 8/10 is the line. After misses: Learn pack → Call it, same night.",
  },
  {
    id: "b2",
    label: "Block II Written",
    unit: "Block II",
    kind: "block",
    subtitle: "Ch. 15–18, 30–32",
    when: "Thu Oct 15 · 1800–1930",
    chapters: BLOCKS[1].examChapters,
    target: 50,
    minutes: 90,
    passLine: 80,
    gate: "JB/TestPrep style: short vignette + vitals → next action. Near-miss distractors (wrong rate, order, definition). Real Thursday still feeds the 80% bench.",
  },
  {
    id: "q2",
    label: "Quiz 2",
    unit: "Block II",
    kind: "quiz",
    subtitle: "10 exam-hard items from Block II chapters",
    when: "During Block II",
    chapters: BLOCKS[1].examChapters,
    target: 10,
    minutes: 15,
    passLine: 80,
    gate: "10 vignette items. An 8/10 is the line. After misses: Learn pack → Call it, same night.",
  },
  {
    id: "b3",
    label: "Block III Written",
    unit: "Block III",
    kind: "block",
    subtitle: "Ch. 2, 9, 12, 19–24, 33, 34",
    when: "Thu Nov 5 · 1800–1930",
    chapters: BLOCKS[2].examChapters,
    target: 50,
    minutes: 90,
    passLine: 80,
    gate: "JB/TestPrep style: short vignette + vitals → next action. Near-miss distractors (wrong rate, order, definition). Real Thursday still feeds the 80% bench.",
  },
  {
    id: "q3",
    label: "Quiz 3",
    unit: "Block III",
    kind: "quiz",
    subtitle: "10 exam-hard items from Block III chapters",
    when: "During Block III",
    chapters: BLOCKS[2].examChapters,
    target: 10,
    minutes: 15,
    passLine: 80,
    gate: "10 vignette items. An 8/10 is the line. After misses: Learn pack → Call it, same night.",
  },
  {
    id: "b4",
    label: "Block IV Written",
    unit: "Block IV",
    kind: "block",
    subtitle: "Ch. 3, 4, 7, 35–41",
    when: "Mon Nov 23 · 1800–1930",
    chapters: BLOCKS[3].examChapters,
    target: 50,
    minutes: 90,
    passLine: 80,
    gate: "JB/TestPrep style: short vignette + vitals → next action. Near-miss distractors (wrong rate, order, definition). Real Monday still feeds the 80% bench.",
  },
  {
    id: "q4",
    label: "Quiz 4",
    unit: "Block IV",
    kind: "quiz",
    subtitle: "10 exam-hard items from Block IV chapters",
    when: "During Block IV",
    chapters: BLOCKS[3].examChapters,
    target: 10,
    minutes: 15,
    passLine: 80,
    gate: "10 vignette items. An 8/10 is the line. After misses: Learn pack → Call it, same night.",
  },
  {
    id: "q5",
    label: "Quiz 5",
    unit: "Finals week",
    kind: "quiz",
    subtitle: "10 exam-hard mixed · Ch. 1–41",
    when: "Before finals week",
    chapters: [],
    target: 10,
    minutes: 15,
    passLine: 80,
    gate: "Last numbered quiz on the 80% bench. Mixed vignettes on purpose — expect definition + math traps.",
  },
  {
    id: "final",
    label: "Final Written",
    unit: "Finals week",
    kind: "final",
    subtitle: "150 exam-hard mixed · Ch. 1–41",
    when: "Thu Dec 10 · 1800–2100",
    chapters: [],
    target: 150,
    minutes: 180,
    passLine: 70,
    gate: "70% on the real 150 sits you for Saturday practicals. Practice like JB: vignette → next action → 80% bar.",
  },
  {
    id: "jb",
    label: "JB TestPrep · Full",
    unit: "Crew bank",
    kind: "final",
    subtitle: "117 real TestPrep items from your screen recordings",
    when: "Anytime · authentic JB / AAOS wording",
    chapters: [],
    target: 117,
    minutes: 120,
    passLine: 80,
    gate: "This is the actual TestPrep bank transcribed from your recordings — vignette stems, near-miss distractors, keyed answers. Sit it like Thursday.",
  },
]

export const UNIT_GROUPS: { title: string; block?: BlockId; testIds: PracticeTestId[] }[] = [
  { title: "JB TestPrep (actual bank)", testIds: ["jb"] },
  { title: "Block I", block: 1, testIds: ["b1", "q1"] },
  { title: "Block II", block: 2, testIds: ["b2", "q2"] },
  { title: "Block III", block: 3, testIds: ["b3", "q3"] },
  { title: "Block IV", block: 4, testIds: ["b4", "q4"] },
  { title: "Finals week", testIds: ["q5", "final"] },
]

export function testById(id: string) {
  return PRACTICE_TESTS.find((t) => t.id === id)
}
