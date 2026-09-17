export const COURSE = {
  name: "King County EMS EMT Program",
  short: "KCEMS EMT",
  term: "Fall 2026",
  site: "Bellevue Training Center",
  dept: "Snoqualmie Pass Fire & Rescue",
} as const

export const BENCH_THRESHOLD = 80
export const FINAL_THRESHOLD = 70

export type BlockId = 1 | 2 | 3 | 4

export type Chapter = {
  n: number
  title: string
  block: BlockId
}

export const CHAPTERS: Chapter[] = [
  { n: 1, title: "EMS Systems", block: 1 },
  { n: 5, title: "Medical Terminology", block: 1 },
  { n: 6, title: "The Human Body", block: 1 },
  { n: 8, title: "Lifting & Moving", block: 1 },
  { n: 10, title: "Patient Assessment", block: 1 },
  { n: 11, title: "Airway Management", block: 1 },
  { n: 13, title: "Shock", block: 1 },
  { n: 14, title: "BLS Resuscitation", block: 1 },
  { n: 25, title: "Trauma Overview", block: 1 },
  { n: 26, title: "Bleeding", block: 1 },
  { n: 27, title: "Soft-Tissue Injuries", block: 1 },
  { n: 28, title: "Face & Neck Injuries", block: 1 },
  { n: 29, title: "Head & Spine Injuries", block: 1 },
  { n: 15, title: "Medical Overview", block: 2 },
  { n: 16, title: "Respiratory Emergencies", block: 2 },
  { n: 17, title: "Cardiovascular Emergencies", block: 2 },
  { n: 18, title: "Neurologic Emergencies", block: 2 },
  { n: 30, title: "Chest Injuries", block: 2 },
  { n: 31, title: "Abdominal & GU Injuries", block: 2 },
  { n: 32, title: "Orthopaedic Injuries", block: 2 },
  { n: 2, title: "Workforce Safety & Wellness", block: 3 },
  { n: 9, title: "Team Approach", block: 3 },
  { n: 12, title: "Pharmacology", block: 3 },
  { n: 19, title: "GI & Urologic Emergencies", block: 3 },
  { n: 20, title: "Endocrine & Hematologic", block: 3 },
  { n: 21, title: "Allergy & Anaphylaxis", block: 3 },
  { n: 22, title: "Toxicology", block: 3 },
  { n: 23, title: "Behavioral Health", block: 3 },
  { n: 24, title: "Gynecologic Emergencies", block: 3 },
  { n: 33, title: "Environmental Emergencies", block: 3 },
  { n: 34, title: "Obstetrics & Neonatal Care", block: 3 },
  { n: 3, title: "Medical, Legal & Ethics", block: 4 },
  { n: 4, title: "Communications & Documentation", block: 4 },
  { n: 7, title: "Life Span Development", block: 4 },
  { n: 35, title: "Pediatric Emergencies", block: 4 },
  { n: 36, title: "Geriatric Emergencies", block: 4 },
  { n: 37, title: "Patients With Special Challenges", block: 4 },
  { n: 38, title: "Transport Operations", block: 4 },
  { n: 39, title: "Vehicle Extrication & Rescue", block: 4 },
  { n: 40, title: "Incident Management", block: 4 },
  { n: 41, title: "Terrorism & Disaster Response", block: 4 },
]

export type AssessmentId =
  | "q1"
  | "q2"
  | "q3"
  | "q4"
  | "q5"
  | "b1"
  | "b2"
  | "b3"
  | "b4"

export type Assessment = {
  id: AssessmentId
  label: string
  kind: "quiz" | "block"
  when: string
  weightNote: string
}

export const ASSESSMENTS: Assessment[] = [
  { id: "q1", label: "Quiz 1", kind: "quiz", when: "During Block I", weightNote: "10 pts · 10 questions" },
  { id: "b1", label: "Block I Written", kind: "block", when: "Thu Sep 24 · 1800–1930", weightNote: "15% of course grade" },
  { id: "q2", label: "Quiz 2", kind: "quiz", when: "During Block II", weightNote: "10 pts · 10 questions" },
  { id: "b2", label: "Block II Written", kind: "block", when: "Thu Oct 15 · 1800–1930", weightNote: "15% of course grade" },
  { id: "q3", label: "Quiz 3", kind: "quiz", when: "During Block III", weightNote: "10 pts · 10 questions" },
  { id: "b3", label: "Block III Written", kind: "block", when: "Thu Nov 5 · 1800–1930", weightNote: "15% of course grade" },
  { id: "q4", label: "Quiz 4", kind: "quiz", when: "During Block IV", weightNote: "10 pts · 10 questions" },
  { id: "b4", label: "Block IV Written", kind: "block", when: "Mon Nov 23 · 1800–1930", weightNote: "15% of course grade" },
  { id: "q5", label: "Quiz 5", kind: "quiz", when: "Before finals week", weightNote: "10 pts · 10 questions" },
]

export type CalendarEvent = {
  id: string
  date: string
  start?: string
  end?: string
  title: string
  kind: "class" | "written" | "skills" | "lab" | "off" | "final"
  detail: string
}

export const CALENDAR: CalendarEvent[] = [
  { id: "b1-start", date: "2026-09-10", title: "Block I begins", kind: "class", detail: "EMS Systems, Sick/Not-Sick, lifting, med term, body, trauma, airway, head/spine." },
  { id: "b1-exam", date: "2026-09-24", start: "18:00", end: "19:30", title: "Block I Written Exam", kind: "written", detail: "Ch. 1, 5, 6, 8, 10, 11, 13, 14, 25, 26, 27, 28, 29 (13 chapters)." },
  { id: "b1-skills", date: "2026-09-26", start: "08:50", end: "12:30", title: "Block I Skills", kind: "skills", detail: "#7 BVM adult · #11 O₂ NRB/NC · #39 i-gel · #87 NPA · #29 Bleeding/Shock." },
  { id: "b2-start", date: "2026-09-28", title: "Block II begins", kind: "class", detail: "Chest, GU-Abd, ortho, medical overview, cardiac, respiratory, neuro." },
  { id: "b2-exam", date: "2026-10-15", start: "18:00", end: "19:30", title: "Block II Written Exam", kind: "written", detail: "Ch. 15, 16, 17, 18, 30, 31, 32 (7 chapters)." },
  { id: "b2-skills", date: "2026-10-17", start: "08:00", end: "12:00", title: "Block II Skills", kind: "skills", detail: "#31 Long bone · #33 Joint · #89 Traction · #92 SMR. AM retests for Block I." },
  { id: "b3-start", date: "2026-10-19", title: "Block III begins", kind: "class", detail: "Endocrine, heme, immuno, environment, GYN/OB/neonate, pharm, GI/GU, safety, tox, behavioral." },
  { id: "b3-exam", date: "2026-11-05", start: "18:00", end: "19:30", title: "Block III Written Exam", kind: "written", detail: "Ch. 2, 9, 12, 19, 20, 21, 22, 23, 24, 33, 34 (11 chapters)." },
  { id: "b3-skills", date: "2026-11-07", start: "09:00", end: "12:30", title: "Block III Skills", kind: "skills", detail: "#21 Trauma assessment · #25 CPR/AED · #57/65 ASA & NTG · #61/73 Oral glucose & BGL. AM Block II retests." },
  { id: "b4-start", date: "2026-11-09", title: "Block IV begins", kind: "class", detail: "Lifespan, geriatrics, special challenges, peds, legal, documentation, transport ops." },
  { id: "b4-lab-1", date: "2026-11-14", start: "08:00", end: "16:00", title: "Block IV Saturday lab · Week 10", kind: "lab", detail: "Birth/NRP, medical assessment #13, IM epi #69, MegaCode, nasal Narcan #63, total patient care." },
  { id: "b4-lab-2", date: "2026-11-21", start: "08:00", end: "16:00", title: "Block IV Saturday lab · Week 11", kind: "lab", detail: "Oral glucose/BGL, total patient care, IM epi, MegaCode, Narcan." },
  { id: "b4-exam", date: "2026-11-23", start: "18:00", end: "19:30", title: "Block IV Written Exam", kind: "written", detail: "Ch. 3, 4, 7, 35, 36, 37, 38, 39, 40, 41 (10 chapters)." },
  { id: "thanks", date: "2026-11-28", title: "No class · Thanksgiving weekend", kind: "off", detail: "Use the gap for a 150-question full-book mixed drill." },
  { id: "b4-skills", date: "2026-11-30", start: "19:00", end: "22:00", title: "Block IV Testing Evening", kind: "skills", detail: "Sheets 13, 63, 69. Retests: 21, 25, 61, 73, 57, 65." },
  { id: "review-stations", date: "2026-12-03", title: "Review stations", kind: "lab", detail: "Demo/practice sheets 94 and 96. Block IV retests 13, 63, 69." },
  { id: "wet-lab", date: "2026-12-05", start: "08:00", end: "16:00", title: "Wet Lab Day", kind: "lab", detail: "Medical 94, complicated birth, MegaCode with ALS, trauma 96, difficult airway, retest station." },
  { id: "jeopardy", date: "2026-12-07", title: "Medical Director Jeopardy", kind: "class", detail: "Review / final prep. Run the Medical Director board in Pass Ready the night before." },
  { id: "final-written", date: "2026-12-10", start: "18:00", end: "21:00", title: "Final Written Exam", kind: "final", detail: "150 cumulative questions, Ch. 1–41. 70% required to sit the practical." },
  { id: "final-practical", date: "2026-12-12", start: "08:00", end: "16:00", title: "Final Practical Exam", kind: "final", detail: "Station 1: Major Medical (sheet 94). Station 2: Major Trauma (sheet 96)." },
]

export type BlockMeta = {
  id: BlockId
  label: string
  weeks: string
  range: string
  written: string
  skills: string
  lecture: string[]
  examChapters: number[]
  skillIds: string[]
}

export const BLOCKS: BlockMeta[] = [
  {
    id: 1,
    label: "Block I",
    weeks: "Weeks 1–3",
    range: "Sep 10 – Sep 26",
    written: "Thu Sep 24, 1800–1930",
    skills: "Sat Sep 26, 08:50–12:30",
    lecture: [
      "EMS Systems, Sick/Not-Sick, Lifting & Moving (Ch. 1, 8)",
      "Med Term & Human Body (Ch. 5, 6)",
      "Trauma, Bleeding & Shock (Ch. 13, 25, 26)",
      "Airway & BLS (Ch. 11, 14)",
      "Soft Tissue, Face, Neck, Head & Spine (Ch. 27, 28, 29)",
    ],
    examChapters: [1, 5, 6, 8, 10, 11, 13, 14, 25, 26, 27, 28, 29],
    skillIds: ["s7", "s11", "s39", "s87", "s29"],
  },
  {
    id: 2,
    label: "Block II",
    weeks: "Weeks 4–6",
    range: "Sep 28 – Oct 17",
    written: "Thu Oct 15, 1800–1930",
    skills: "Sat Oct 17, 08:00–12:00",
    lecture: [
      "Chest, GU-Abd, Ortho Injuries (Ch. 30, 31, 32)",
      "Medical Overview & Patient Assessment (Ch. 15)",
      "Cardiac & Respiratory Emergencies (Ch. 16, 17)",
      "Neurologic Emergencies (Ch. 18)",
    ],
    examChapters: [15, 16, 17, 18, 30, 31, 32],
    skillIds: ["s31", "s33", "s89", "s92"],
  },
  {
    id: 3,
    label: "Block III",
    weeks: "Weeks 7–9",
    range: "Oct 19 – Nov 7",
    written: "Thu Nov 5, 1800–1930",
    skills: "Sat Nov 7, 09:00–12:30",
    lecture: [
      "Endocrine, Hematology, Immunology, Environment (Ch. 20, 21, 33)",
      "GYN, OB & Neonatal Care (Ch. 24, 34)",
      "Pharmacology, GI/Urologic (Ch. 12, 19)",
      "Workforce Safety & Team Approach (Ch. 2, 9)",
      "Toxicology & Behavioral Health (Ch. 22, 23)",
    ],
    examChapters: [2, 9, 12, 19, 20, 21, 22, 23, 24, 33, 34],
    skillIds: ["s21", "s25", "s57", "s65", "s61", "s73"],
  },
  {
    id: 4,
    label: "Block IV",
    weeks: "Weeks 10–12",
    range: "Nov 9 – Nov 30",
    written: "Mon Nov 23, 1800–1930",
    skills: "Mon Nov 30, 19:00–22:00",
    lecture: [
      "Lifespan, Geriatrics, Special Challenges (Ch. 7, 36, 37)",
      "Pediatrics (Ch. 35)",
      "Legal/Ethics, Documentation, Transport Ops (Ch. 3, 4, 38)",
    ],
    examChapters: [3, 4, 7, 35, 36, 37, 38, 39, 40, 41],
    skillIds: ["s13", "s63", "s69"],
  },
]

export function chapterByNumber(n: number) {
  return CHAPTERS.find((c) => c.n === n)
}

export function chaptersForBlock(id: BlockId) {
  const block = BLOCKS.find((b) => b.id === id)
  if (!block) return []
  return block.examChapters.map((n) => CHAPTERS.find((c) => c.n === n)!).filter(Boolean)
}
