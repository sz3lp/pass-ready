/** How Pass Ready maps onto real written exams (JB / AAOS TestPrep style). */
export const EXAM_STYLE = {
  title: "How the written actually hits",
  blurb:
    "Real items are short vignettes with vitals, then What should you do? / What should you suspect? Distractors are near-miss actions — wrong order, wrong rate, wrong definition. Same-night fluency is not the same as that.",
  moves: [
    "Read the stem for the one decision: next action, likely cause, or definition trap.",
    "Eliminate the common miss first (wrong rate, wrong position, treatment before airway).",
    "Numbers are fair game: cylinder duration, burn %, gravida/para, age-based rates.",
    "After a miss: name the trap out loud, then Call it on that chapter — don't just re-tap letters.",
  ],
} as const

export const NIGHTLY_PROTOCOL = [
  { step: "1", label: "Learn pack", detail: "Must-knows + traps for tonight's weak or unread chapter (10–15 min)." },
  { step: "2", label: "Due / Call it", detail: "Clear the due queue, or hide choices and generate the answer." },
  { step: "3", label: "Practice written", detail: "Timed block/quiz items. No answers until submit. Treat 80% as the line." },
  { step: "4", label: "Miss → Learn → Drill", detail: "Open the chapter pack for every miss, then retrieve again same night." },
] as const

/** High-yield traps seen on JB-style airway banks (and real Block I writtens). */
export const AIRWAY_EXAM_TRAPS = [
  "Ventilation = air in and out of the lungs. Cellular O₂/CO₂ exchange is respiration — not the ventilation definition.",
  "Apneic adult with a pulse: BVM ~10/min (1 every 6 sec). 20/min is a hyperventilation trap.",
  "ETCO₂ high (e.g. 70): hypercarbic and breathing inadequately — not hypocarbic.",
  "D-cylinder minutes ≈ (psi − 200) × 0.16 ÷ L/min. 1500 psi @ 15 L/min → ~14 min, not 11.",
  "With an advanced airway in place: continuous compressions; deliver volume for chest rise — don't pause or 'time' to the downstroke.",
  "RR in the 20s alone is not an automatic BVM — first check mentation and tidal volume.",
] as const

/** Official SEI Cadre brief for Block I Written (Thu Sep 24). */
export const B1_CADRE_BRIEF = {
  title: "Block I Written — Cadre brief",
  when: "Thu Sep 24 · 90 minutes · bring a charged device (power available)",
  format: "70 multiple choice · 80% to pass · miss ≤14",
  chapters: [1, 5, 6, 8, 10, 11, 13, 14, 25, 26, 27, 28, 29],
  standards: "National standards — not King County protocols.",
  studyGuide: [
    "Lifts and carry limits (power lift, power grip, emergency / urgent / nonurgent moves)",
    "Anatomical terms + anatomy",
    "Medical terminology",
    "GCS (there will be a question)",
    "Why femur fractures are dangerous (bleeding / shock)",
    "Burn severity (depth + TBSA / rule of nines)",
    "Electrical pathway of the heart (SA → AV → bundle → Purkinje)",
    "Types of head bleeds / head injuries",
    "Who gives permission to practice — and to administer / assist meds (medical direction)",
    "Forces / trauma mechanisms and related math (kinetic energy, etc.)",
    "Eye and neck injuries",
  ],
  tips: [
    "NREMT wants the MOST CORRECT answer — watch MOST / BEST / EXCEPT.",
    "Read slow; try answering before looking at choices; rephrase if stuck.",
    "Use chapter Prep Kits; charts, tables, and figures in the book matter.",
    "Scenario order: BSI / scene safe → life threats → sick vs not sick → treat.",
    "Answer what you know first; flag the rest.",
    "Eliminate bad answers, then compare what remains.",
    "Don't cram — sleep, eat, breathe (parasympathetic = clearer thinking).",
    "Skills tip: visualize the skill sheets without equipment.",
  ],
  bookWalkthroughUrl: "https://www.youtube.com/watch?v=lWlSui0NcB8",
} as const
