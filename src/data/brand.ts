export const BRAND = {
  name: "Pass Ready",
  dept: "Snoqualmie Pass Fire & Rescue",
  deptShort: "SPFR",
  program: "KCEMS EMT",
  term: "Fall 2026",
} as const

export type ClassSession = {
  id: string
  block: 1 | 2 | 3 | 4 | "final"
  title: string
  subtitle: string
  chapters: number[]
  categories: { name: string; chapters: number[] }[]
}

export const CLASSES: ClassSession[] = [
  {
    id: "b1-ems",
    block: 1,
    title: "EMS Systems, Sick/Not-Sick, Lifting",
    subtitle: "Block I · Ch. 1, 8, 10",
    chapters: [1, 8, 10],
    categories: [
      { name: "EMS Systems", chapters: [1] },
      { name: "Lifting & Moving", chapters: [8] },
      { name: "Sick / Not-Sick", chapters: [10] },
    ],
  },
  {
    id: "b1-body",
    block: 1,
    title: "Med Term & Human Body",
    subtitle: "Block I · Ch. 5, 6",
    chapters: [5, 6],
    categories: [
      { name: "Med Term", chapters: [5] },
      { name: "The Body", chapters: [6] },
    ],
  },
  {
    id: "b1-trauma-shock",
    block: 1,
    title: "Trauma, Bleeding & Shock",
    subtitle: "Block I · Ch. 13, 25, 26",
    chapters: [13, 25, 26],
    categories: [
      { name: "Shock", chapters: [13] },
      { name: "Trauma Overview", chapters: [25] },
      { name: "Bleeding", chapters: [26] },
    ],
  },
  {
    id: "b1-airway",
    block: 1,
    title: "Airway & BLS",
    subtitle: "Block I · Ch. 11, 14",
    chapters: [11, 14],
    categories: [
      { name: "Airway", chapters: [11] },
      { name: "BLS / AED", chapters: [14] },
    ],
  },
  {
    id: "b1-soft-head",
    block: 1,
    title: "Soft Tissue, Face, Neck, Head & Spine",
    subtitle: "Block I · Ch. 27, 28, 29",
    chapters: [27, 28, 29],
    categories: [
      { name: "Soft Tissue", chapters: [27] },
      { name: "Face & Neck", chapters: [28] },
      { name: "Head & Spine", chapters: [29] },
    ],
  },
  {
    id: "b1-review",
    block: 1,
    title: "Block I Review",
    subtitle: "Night before Thu Sep 24 written",
    chapters: [1, 5, 6, 8, 10, 11, 13, 14, 25, 26, 27, 28, 29],
    categories: [
      { name: "Systems & Body", chapters: [1, 5, 6, 8] },
      { name: "Assessment", chapters: [10] },
      { name: "Airway / BLS", chapters: [11, 14] },
      { name: "Shock & Bleed", chapters: [13, 25, 26] },
      { name: "Head to Soft Tissue", chapters: [27, 28, 29] },
    ],
  },
  {
    id: "b2-ortho",
    block: 2,
    title: "Chest, GU-Abd, Ortho Injuries",
    subtitle: "Block II · Ch. 30, 31, 32",
    chapters: [30, 31, 32],
    categories: [
      { name: "Chest", chapters: [30] },
      { name: "Abd / GU", chapters: [31] },
      { name: "Ortho", chapters: [32] },
    ],
  },
  {
    id: "b2-medical",
    block: 2,
    title: "Medical Overview & Assessment",
    subtitle: "Block II · Ch. 15",
    chapters: [15],
    categories: [{ name: "Medical Overview", chapters: [15] }],
  },
  {
    id: "b2-cardio-resp",
    block: 2,
    title: "Cardiac & Respiratory",
    subtitle: "Block II · Ch. 16, 17",
    chapters: [16, 17],
    categories: [
      { name: "Respiratory", chapters: [16] },
      { name: "Cardiac", chapters: [17] },
    ],
  },
  {
    id: "b2-neuro",
    block: 2,
    title: "Neurologic Emergencies",
    subtitle: "Block II · Ch. 18",
    chapters: [18],
    categories: [{ name: "Neuro", chapters: [18] }],
  },
  {
    id: "b2-review",
    block: 2,
    title: "Block II Review",
    subtitle: "Night before Thu Oct 15 written",
    chapters: [15, 16, 17, 18, 30, 31, 32],
    categories: [
      { name: "Medical", chapters: [15] },
      { name: "Respiratory", chapters: [16] },
      { name: "Cardiac", chapters: [17] },
      { name: "Neuro", chapters: [18] },
      { name: "Trauma II", chapters: [30, 31, 32] },
    ],
  },
  {
    id: "b3-endo",
    block: 3,
    title: "Endocrine, Heme, Immuno, Environment",
    subtitle: "Block III · Ch. 20, 21, 33",
    chapters: [20, 21, 33],
    categories: [
      { name: "Endocrine / Heme", chapters: [20] },
      { name: "Anaphylaxis", chapters: [21] },
      { name: "Environment", chapters: [33] },
    ],
  },
  {
    id: "b3-ob",
    block: 3,
    title: "GYN, OB & Neonatal",
    subtitle: "Block III · Ch. 24, 34",
    chapters: [24, 34],
    categories: [
      { name: "GYN", chapters: [24] },
      { name: "OB / Newborn", chapters: [34] },
    ],
  },
  {
    id: "b3-pharm",
    block: 3,
    title: "Pharmacology & GI / Urologic",
    subtitle: "Block III · Ch. 12, 19",
    chapters: [12, 19],
    categories: [
      { name: "Pharm", chapters: [12] },
      { name: "GI / GU", chapters: [19] },
    ],
  },
  {
    id: "b3-safety",
    block: 3,
    title: "Workforce Safety & Team",
    subtitle: "Block III · Ch. 2, 9",
    chapters: [2, 9],
    categories: [
      { name: "Safety", chapters: [2] },
      { name: "Team", chapters: [9] },
    ],
  },
  {
    id: "b3-tox",
    block: 3,
    title: "Toxicology & Behavioral Health",
    subtitle: "Block III · Ch. 22, 23",
    chapters: [22, 23],
    categories: [
      { name: "Toxicology", chapters: [22] },
      { name: "Behavioral", chapters: [23] },
    ],
  },
  {
    id: "b3-review",
    block: 3,
    title: "Block III Review",
    subtitle: "Night before Thu Nov 5 written",
    chapters: [2, 9, 12, 19, 20, 21, 22, 23, 24, 33, 34],
    categories: [
      { name: "Safety / Team", chapters: [2, 9] },
      { name: "Pharm / GI", chapters: [12, 19] },
      { name: "Endo / Epi", chapters: [20, 21] },
      { name: "Tox / Behavior", chapters: [22, 23] },
      { name: "OB / Environ", chapters: [24, 33, 34] },
    ],
  },
  {
    id: "b4-lifespan",
    block: 4,
    title: "Lifespan, Geriatrics, Special Challenges",
    subtitle: "Block IV · Ch. 7, 36, 37",
    chapters: [7, 36, 37],
    categories: [
      { name: "Lifespan", chapters: [7] },
      { name: "Geriatrics", chapters: [36] },
      { name: "Special Challenges", chapters: [37] },
    ],
  },
  {
    id: "b4-peds",
    block: 4,
    title: "Pediatrics",
    subtitle: "Block IV · Ch. 35",
    chapters: [35],
    categories: [{ name: "Peds", chapters: [35] }],
  },
  {
    id: "b4-legal",
    block: 4,
    title: "Legal, Documentation, Transport Ops",
    subtitle: "Block IV · Ch. 3, 4, 38",
    chapters: [3, 4, 38],
    categories: [
      { name: "Legal / Ethics", chapters: [3] },
      { name: "Documentation", chapters: [4] },
      { name: "Transport", chapters: [38] },
    ],
  },
  {
    id: "b4-ops",
    block: 4,
    title: "Extrication, MCI & Disaster",
    subtitle: "Block IV · Ch. 39, 40, 41",
    chapters: [39, 40, 41],
    categories: [
      { name: "Extrication", chapters: [39] },
      { name: "Incident Mgmt", chapters: [40] },
      { name: "WMD / Disaster", chapters: [41] },
    ],
  },
  {
    id: "b4-review",
    block: 4,
    title: "Block IV Review",
    subtitle: "Night before Mon Nov 23 written",
    chapters: [3, 4, 7, 35, 36, 37, 38, 39, 40, 41],
    categories: [
      { name: "Legal / PCR", chapters: [3, 4] },
      { name: "Lifespan", chapters: [7, 36, 37] },
      { name: "Peds", chapters: [35] },
      { name: "Transport", chapters: [38, 39] },
      { name: "MCI / WMD", chapters: [40, 41] },
    ],
  },
  {
    id: "md-jeopardy",
    block: "final",
    title: "Medical Director Jeopardy",
    subtitle: "Mon Dec 7 · the real one",
    chapters: [1, 10, 11, 13, 16, 17, 18, 21, 22, 34, 35, 40],
    categories: [
      { name: "Airway / BLS", chapters: [11, 14] },
      { name: "Shock / Trauma", chapters: [13, 25, 26, 29] },
      { name: "Medical", chapters: [16, 17, 18, 20] },
      { name: "OB / Peds", chapters: [34, 35] },
      { name: "Ops / Legal", chapters: [3, 4, 40, 41] },
    ],
  },
  {
    id: "final-150",
    block: "final",
    title: "Final Written Mix",
    subtitle: "150-question night · Dec 10",
    chapters: [],
    categories: [
      { name: "Block I", chapters: [1, 5, 6, 8, 10, 11, 13, 14, 25, 26, 27, 28, 29] },
      { name: "Block II", chapters: [15, 16, 17, 18, 30, 31, 32] },
      { name: "Block III", chapters: [2, 9, 12, 19, 20, 21, 22, 23, 24, 33, 34] },
      { name: "Block IV", chapters: [3, 4, 7, 35, 36, 37, 38, 39, 40, 41] },
      { name: "Wildcard", chapters: [10, 13, 17, 21, 35] },
    ],
  },
]

export function classById(id: string) {
  return CLASSES.find((c) => c.id === id)
}

export function classesForBlock(block: ClassSession["block"]) {
  return CLASSES.filter((c) => c.block === block)
}
