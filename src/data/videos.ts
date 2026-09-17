export type VideoChannel = "paramedic-coach" | "miramar"

export type VideoLink = {
  title: string
  url: string
  channel: VideoChannel
  kind: "skill" | "topic"
}

export const CHANNELS = {
  "paramedic-coach": {
    label: "The Paramedic Coach",
    handle: "@TheParamedicCoach",
    url: "https://www.youtube.com/@TheParamedicCoach",
  },
  miramar: {
    label: "San Diego Miramar EMT",
    handle: "@Sandiegomiramaremtprogram6893",
    url: "https://www.youtube.com/@Sandiegomiramaremtprogram6893",
    skillsPage: "https://sites.google.com/view/miramaremtprogram/home/current-student-page/emt-skills-videos",
  },
} as const

function coach(title: string, id: string): VideoLink {
  return {
    title,
    url: `https://www.youtube.com/watch?v=${id}`,
    channel: "paramedic-coach",
    kind: "topic",
  }
}

function coachShort(title: string, id: string): VideoLink {
  return {
    title,
    url: `https://www.youtube.com/shorts/${id}`,
    channel: "paramedic-coach",
    kind: "topic",
  }
}

/** Channel search when a specific Miramar watch ID is not published publicly. */
function miramarSearch(title: string, query: string): VideoLink {
  return {
    title,
    url: `https://www.youtube.com/@Sandiegomiramaremtprogram6893/search?query=${encodeURIComponent(query)}`,
    channel: "miramar",
    kind: "skill",
  }
}

function miramarHub(title: string): VideoLink {
  return {
    title,
    url: CHANNELS.miramar.skillsPage,
    channel: "miramar",
    kind: "skill",
  }
}

/**
 * Verified Paramedic Coach watch IDs (oEmbed-checked against The Paramedic Coach /
 * Paramedic Coach Clips). Prefer these over generic medical-assessment fillers.
 */
export const COACH = {
  // Foundations
  passEmt: coach("Watch These 11 Minutes To PASS EMT Class", "hi4aWvRxeG4"),
  nremtThreeLessons: coach("3 Lessons You MUST WATCH Before the NREMT Exam", "h9CCYfLozMY"),
  starterLecture: coach("The EMT Lecture I Wish I Had Starting Out", "QdY3UWnGwuw"),
  medTerm: coach("EMT Medical Terminology: Simple Method", "sDGN9kx48EQ"),
  vitals: coach("Vital Signs Review for EMT Class", "g0Hkyo5h4qc"),
  gcs: coach("EASY to Remember Glasgow Coma Scale", "bC3eucmz90o"),
  lifting: coach("Lifting and Moving Patients for EMTs", "97U469ROh7s"),
  liftingEquip: coach("Lifting and Moving Patient in EMS — Equipment Overview", "5ZawIjVE7MY"),
  legal: coach("UNDERSTAND Medical Legal for EMTs", "U6ng0NAKrn0"),
  transferOfCare: coach("TRANSFER OF CARE Like A BOSS", "ZRlSt_sA15g"),
  ops: coach("Need Help With EMS Operations Start Here", "ECR3BWP15YM"),
  triage: coach("START Triage in 60 Seconds", "Vi9PYGC_r9U"),
  triageHow: coach("START Triage: How to Triage Patients?", "pRk83Pwj-lo"),
  psych: coach("Psychiatric Patients & Disorders in EMS", "xowTOf0gBv4"),

  // Assessment
  primaryMaster: coach("Master The Primary Assessment For EMT Class", "WGbABC623m4"),
  primaryVsSecondary: coachShort("Primary vs Secondary Assessment", "TqkVs5lfRvc"),
  neverForgetAssessment: coach("NEVER FORGET PATIENT ASSESSMENT", "MSdKLorVhmU"),
  assessmentReview: coach("PATIENT ASSESSMENT Review for EMTs", "F3rN9tqD1XI"),
  medical19: coach("MEDICAL ASSESSMENT Taught In Only 19 Minutes", "X7n5VjwHlPA"),
  medicalEasy: coachShort("Medical Assessment Made EASY", "mqyFwyzDF_Q"),
  medicalChestPain: coach("Patient Assessment Medical | Chest Pain", "e_-tFw1BPU4"),
  medicalDyspnea: coach("Patient Assessment Medical | Difficulty Breathing", "ExRT-E-j_wI"),
  traumaSheet: coach("Patient Assessment TRAUMA SHEET Review", "7rkXib9ZZH4"),
  traumaTension: coach("Patient Assessment Trauma | Tension Pneumothorax", "0Q09tDiY4RU"),
  assessmentSkills: coach("Patient Assessment | EMT Skills | NREMT Exam", "py3Xk36sDbE"),

  // Airway / breathing / O2
  blsAirways: coach("BLS Airways for EMTs (NPA & OPA)", "aR6X9Up_E5U"),
  blsAirwaysAlt: coach("BLS Airways for EMTs", "v2TGMCvmiWM"),
  oxygenQuiz: coach("Oxygen Devices QUIZ for EMT Students", "iJkx4l9yLcw"),
  whenOxygen: coach("EMT | When To Give Oxygen", "ZDnIVbqIqCc"),
  breathingFast: coach("How I Assess Difficulty Breathing FAST", "JgZ0e0kYPRw"),
  respAssessment: coach("Respiratory Assessment for EMTs", "Fb1NP5lrYHs"),
  respMeds: coach("Respiratory Emergencies — 3 Medications You Need", "PgqImKpXGLw"),
  chfVsPna: coach("CHF vs Pneumonia | NREMT Review", "eF05-2KZSxw"),
  chfEasy: coach("Congestive Heart Failure Made EASY", "gT02HHzK8vg"),
  lungSounds: coachShort("LUNG SOUNDS Made EASY", "MP7O-0Kr40c"),
  cpapHold: coach("Why You SHOULDN'T Give CPAP", "Hboj6Dw9o9k"),
  choking: coach("Saving A CHOKING Victim In Public", "ee5caYtXbyo"),
  airwayMustKnow: coach("What Every EMT Must Know About the AIRWAY", "53FX9QYwwxc"),

  // Shock / bleeding / trauma
  shockAll: coach("All Shock Types in One Video | NREMT Shock Review", "gARL40EjDPU"),
  shockSimple: coach("Types of Shock Explained Simply", "1KAPfQQweM4"),
  shockEasy: coach("EASY Shock Review for NREMT", "AfTRLpEzUYI"),
  cardiogenic: coach("CARDIOGENIC SHOCK Explained In Under 6 Minutes", "O11VL2wbzks"),
  anaphylShock: coach("What They Don't Tell You About Anaphylactic Shock", "R8eBmksj-aQ"),
  anaphylSimple: coach("Anaphylactic SHOCK Finally Explained Simply", "TyE5xjYXzd4"),
  anaphylStory: coach("How I Dealt with Anaphylaxis", "jCug2T8_tZ8"),
  chestMiss: coach("The One Chest Injury That’s Easy to Miss…", "e_XGlXBs-Ps"),
  flailVsTension: coach("Flail Chest VS Tension Pneumothorax", "vgfkvrFnCSY"),
  abdQuadrants: coach("Abdominal Quadrants Explained Simply for EMT", "bunwAmj4wUY"),
  abdEmergency: coach("Preparing For An ABDOMINAL Emergency", "NKdDDAejtzY"),

  // Cardiac / CPR
  cardiacThree: coach("Cardiac Emergencies EMT School | 3 Emergencies You Can't Miss", "vjUsCiq06Yg"),
  cardiacChestPain: coach("REAL Cardiac Chest Pain...", "Y6K4K-XtJmw"),
  heartFlow: coach("EMT School: Heart Blood Flow | NREMT Review", "WQqcsavq9ic"),
  cprTips: coach("CPR & AED TIPS FOR THE EMT", "ztvtaP4JGpU"),
  cprClass: coach("EMT School: CPR Class Soon? Watch This First...", "8futBRhfnhs"),
  infantCpr: coach("INFANT CPR: CHEAT SHEET", "sdJa8bzW6I4"),
  pedsCpr: coach("PEDIATRIC CPR Explained Simply", "0Ki7kam5mVM"),

  // Neuro
  stroke: coach("Stroke in EMS | Stroke Lesson for EMTs & Paramedics", "vJPTM8bXJmA"),
  cushing: coachShort("Cushing's Triad Explained", "sCX9Y2sNJZg"),

  // Meds
  pharm: coach("Pharmacology for EMT/Paramedic Students", "qadeikxbiTE"),
  threeMeds: coach("3 Meds Every EMT Needs to Know!", "Q2TrRxp7Ocs"),
  aspirin: coach("EMT | When to Give Aspirin in EMS", "cNpr-3LcCHk"),
  aspirinWhy: coach("Why Do We Give Aspirin in EMS?", "KzcR_nK89o0"),
  nitro: coach("WHY We Give NITROGLYCERIN In EMS", "i-op5zEZRBA"),
  nitroHold: coach("When You CAN NOT Give Nitroglycerin", "q_EIoQxBKiw"),
  narcan: coach("When To Use NARCAN for EMTs", "QmorYAecSgk"),
  epipen: coach("Epipen for EMTs", "eFHVl1PKB5A"),
  epiWhy: coach("Why Do We Give Epinephrine?", "e56v8OTxHGk"),

  // Endocrine / OB / peds / special
  diabetic: coach("Diabetic Emergencies as an EMT/Paramedic", "v7mDL-0wUac"),
  diabeticWhy: coach("Why Diabetics End Up Calling 911", "Seuwdg2xPno"),
  obThree: coach("OBGYN Emergencies EMT School | 3 Emergencies You Must Know", "7Br8rrt4aCY"),
  abruptio: coachShort("Abruptio Placentae", "Dabah9en68U"),
  pedsCheat: coach("Pediatric Emergencies CHEAT SHEET", "8I_NMOi6xBQ"),
} as const

export const MIRAMAR_HUB: VideoLink = miramarHub("Miramar EMT skills video library")

/** Per skill sheet: Miramar demos first, then Coach cognitive overviews matched to the station. */
export const SKILL_VIDEOS: Record<string, VideoLink[]> = {
  s7: [
    miramarSearch("BVM ventilation of an apneic adult", "BAG VALVE MASK APNEIC"),
    COACH.blsAirways,
    COACH.airwayMustKnow,
    COACH.choking,
  ],
  s11: [
    miramarSearch("Oxygen administration by non-rebreather", "OXYGEN NON REBREATHER"),
    COACH.oxygenQuiz,
    COACH.whenOxygen,
  ],
  s39: [
    miramarSearch("Supraglottic airway / i-gel", "SUPRAGLOTTIC AIRWAY"),
    COACH.blsAirways,
    COACH.airwayMustKnow,
  ],
  s87: [
    miramarSearch("Nasopharyngeal airway", "NASOPHARYNGEAL AIRWAY NPA"),
    COACH.blsAirways,
    COACH.blsAirwaysAlt,
  ],
  s29: [
    miramarSearch("Bleeding control / shock management", "BLEEDING CONTROL SHOCK"),
    COACH.shockAll,
    COACH.shockSimple,
  ],
  s31: [
    miramarSearch("Long bone immobilization", "LONG BONE IMMOBILIZATION"),
    COACH.traumaSheet,
  ],
  s33: [
    miramarSearch("Joint immobilization", "JOINT IMMOBILIZATION"),
    miramarSearch("Long bone immobilization (related)", "LONG BONE IMMOBILIZATION"),
  ],
  s89: [
    miramarSearch("Traction splint", "TRACTION SPLINT"),
    miramarSearch("Long bone immobilization", "LONG BONE IMMOBILIZATION"),
  ],
  s92: [
    miramarSearch("Spinal motion restriction / immobilization", "SPINAL IMMOBILIZATION"),
    COACH.traumaSheet,
    COACH.cushing,
  ],
  s21: [
    miramarSearch("Trauma patient assessment", "TRAUMA ASSESSMENT"),
    COACH.traumaSheet,
    COACH.traumaTension,
    COACH.primaryMaster,
    COACH.shockAll,
  ],
  s25: [
    miramarSearch("Cardiac arrest management / AED", "CARDIAC ARREST AED"),
    COACH.cprTips,
    COACH.cprClass,
    COACH.nremtThreeLessons,
  ],
  s57: [
    miramarSearch("Medical assessment — chest pain", "MEDICAL ASSESSMENT CHEST PAIN"),
    COACH.aspirin,
    COACH.aspirinWhy,
    COACH.medicalChestPain,
    COACH.cardiacThree,
  ],
  s65: [
    miramarSearch("Medical assessment — chest pain / cardiac", "MEDICAL ASSESSMENT CHEST PAIN"),
    COACH.nitro,
    COACH.nitroHold,
    COACH.medicalChestPain,
    COACH.cardiacChestPain,
  ],
  s61: [
    miramarSearch("Oral glucose / altered mental status", "ORAL GLUCOSE"),
    COACH.diabetic,
    COACH.diabeticWhy,
  ],
  s73: [
    miramarSearch("Blood glucose / glucometer", "BLOOD GLUCOSE GLUCOMETER"),
    COACH.diabetic,
    COACH.vitals,
  ],
  s13: [
    miramarSearch("Medical patient assessment", "MEDICAL ASSESSMENT"),
    COACH.medical19,
    COACH.medicalEasy,
    COACH.medicalDyspnea,
    COACH.medicalChestPain,
    COACH.primaryVsSecondary,
  ],
  s63: [
    miramarSearch("Naloxone / opioid overdose", "NALOXONE NARCAN"),
    COACH.narcan,
    COACH.breathingFast,
    COACH.blsAirways,
  ],
  s69: [
    miramarSearch("IM medication / epinephrine", "EPINEPHRINE IM ALLERGIC"),
    COACH.epipen,
    COACH.epiWhy,
    COACH.anaphylShock,
    COACH.anaphylSimple,
  ],
  s94: [
    miramarSearch("Comprehensive medical evaluation demos", "MEDICAL ASSESSMENT"),
    COACH.medical19,
    COACH.primaryMaster,
    COACH.assessmentReview,
    COACH.neverForgetAssessment,
  ],
  s96: [
    miramarSearch("Comprehensive trauma evaluation demos", "TRAUMA ASSESSMENT"),
    COACH.traumaSheet,
    COACH.assessmentSkills,
    COACH.shockAll,
    COACH.primaryMaster,
  ],
}

/** Topic overviews keyed to Jeopardy / class session ids — matched to that night's chapters. */
export const TOPIC_VIDEOS: Record<string, VideoLink[]> = {
  "b1-ems": [
    COACH.starterLecture,
    COACH.primaryMaster,
    COACH.primaryVsSecondary,
    COACH.lifting,
    COACH.liftingEquip,
    COACH.passEmt,
  ],
  "b1-body": [COACH.medTerm, COACH.vitals, COACH.gcs, COACH.heartFlow, COACH.abdQuadrants],
  "b1-trauma-shock": [
    COACH.shockAll,
    COACH.shockSimple,
    COACH.shockEasy,
    COACH.traumaSheet,
    COACH.assessmentSkills,
  ],
  "b1-airway": [
    COACH.blsAirways,
    COACH.airwayMustKnow,
    COACH.oxygenQuiz,
    COACH.whenOxygen,
    COACH.cprTips,
    COACH.cprClass,
    COACH.choking,
  ],
  "b1-soft-head": [
    COACH.traumaSheet,
    COACH.cushing,
    COACH.gcs,
    COACH.primaryMaster,
    COACH.shockAll,
  ],
  "b1-review": [
    COACH.nremtThreeLessons,
    COACH.shockAll,
    COACH.blsAirways,
    COACH.primaryMaster,
    COACH.traumaSheet,
    COACH.passEmt,
  ],
  "b2-ortho": [
    COACH.chestMiss,
    COACH.flailVsTension,
    COACH.traumaTension,
    COACH.abdQuadrants,
    COACH.abdEmergency,
    COACH.traumaSheet,
  ],
  "b2-medical": [
    COACH.medical19,
    COACH.medicalEasy,
    COACH.neverForgetAssessment,
    COACH.assessmentReview,
    COACH.vitals,
  ],
  "b2-cardio-resp": [
    COACH.respAssessment,
    COACH.breathingFast,
    COACH.medicalDyspnea,
    COACH.chfVsPna,
    COACH.chfEasy,
    COACH.respMeds,
    COACH.cardiacThree,
    COACH.cardiacChestPain,
    COACH.aspirin,
    COACH.nitro,
    COACH.nitroHold,
  ],
  "b2-neuro": [COACH.stroke, COACH.cushing, COACH.gcs, COACH.medical19, COACH.nremtThreeLessons],
  "b2-review": [
    COACH.medical19,
    COACH.respAssessment,
    COACH.cardiacThree,
    COACH.stroke,
    COACH.chestMiss,
    COACH.shockAll,
  ],
  "b3-endo": [
    COACH.diabetic,
    COACH.diabeticWhy,
    COACH.anaphylShock,
    COACH.anaphylSimple,
    COACH.epipen,
    COACH.shockAll,
  ],
  "b3-ob": [COACH.obThree, COACH.abruptio, COACH.medical19],
  "b3-pharm": [
    COACH.pharm,
    COACH.threeMeds,
    COACH.aspirin,
    COACH.nitro,
    COACH.narcan,
    COACH.epipen,
    COACH.abdQuadrants,
    COACH.abdEmergency,
  ],
  "b3-safety": [COACH.starterLecture, COACH.transferOfCare, COACH.passEmt, COACH.ops],
  "b3-tox": [COACH.narcan, COACH.psych, COACH.breathingFast, COACH.blsAirways, COACH.medical19],
  "b3-review": [
    COACH.pharm,
    COACH.diabetic,
    COACH.anaphylShock,
    COACH.obThree,
    COACH.narcan,
    COACH.shockAll,
  ],
  "b4-lifespan": [COACH.medical19, COACH.vitals, COACH.diabetic, COACH.cardiacThree],
  "b4-peds": [COACH.pedsCheat, COACH.pedsCpr, COACH.infantCpr, COACH.nremtThreeLessons],
  "b4-legal": [COACH.legal, COACH.transferOfCare, COACH.passEmt, COACH.starterLecture],
  "b4-ops": [COACH.ops, COACH.triage, COACH.triageHow, COACH.lifting, COACH.shockAll],
  "b4-review": [
    COACH.legal,
    COACH.pedsCheat,
    COACH.ops,
    COACH.triage,
    COACH.medical19,
    COACH.nremtThreeLessons,
  ],
  "md-jeopardy": [
    COACH.nremtThreeLessons,
    COACH.shockAll,
    COACH.medical19,
    COACH.blsAirways,
    COACH.cardiacThree,
    COACH.stroke,
    COACH.pharm,
  ],
  "final-150": [
    COACH.nremtThreeLessons,
    COACH.passEmt,
    COACH.shockAll,
    COACH.medical19,
    COACH.primaryMaster,
    COACH.traumaSheet,
    COACH.respAssessment,
    COACH.stroke,
    COACH.pharm,
  ],
}

/** Chapter → class topic key (for Learn packs). */
const CHAPTER_TOPIC: Record<number, string> = {
  1: "b1-ems",
  8: "b1-ems",
  10: "b1-ems",
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

/** Extra chapter-specific clips layered on top of the unit topic list. */
const CHAPTER_EXTRA: Record<number, VideoLink[]> = {
  1: [COACH.transferOfCare],
  5: [COACH.medTerm],
  6: [COACH.heartFlow, COACH.abdQuadrants],
  8: [COACH.lifting, COACH.liftingEquip],
  10: [COACH.primaryMaster, COACH.vitals],
  11: [COACH.blsAirways, COACH.whenOxygen],
  13: [COACH.shockAll, COACH.cardiogenic],
  14: [COACH.cprTips, COACH.cprClass],
  16: [COACH.respAssessment, COACH.chfVsPna, COACH.lungSounds],
  17: [COACH.cardiacThree, COACH.aspirin, COACH.nitro, COACH.nitroHold],
  18: [COACH.stroke, COACH.cushing],
  12: [COACH.pharm, COACH.threeMeds],
  20: [COACH.diabetic, COACH.diabeticWhy],
  21: [COACH.anaphylShock, COACH.epipen],
  22: [COACH.narcan],
  23: [COACH.psych],
  30: [COACH.chestMiss, COACH.flailVsTension],
  31: [COACH.abdQuadrants, COACH.abdEmergency],
  34: [COACH.obThree, COACH.abruptio],
  35: [COACH.pedsCheat, COACH.pedsCpr],
  3: [COACH.legal],
  40: [COACH.triage, COACH.triageHow],
  38: [COACH.ops],
}

function dedupe(links: VideoLink[]) {
  const seen = new Set<string>()
  return links.filter((v) => {
    const key = v.url
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export function videosForSkill(skillId: string) {
  return SKILL_VIDEOS[skillId] ?? []
}

export function videosForTopic(classId: string) {
  return TOPIC_VIDEOS[classId] ?? []
}

/** Unit/class night + chapter-specific extras for Learn packs. */
export function videosForChapter(chapter: number) {
  const topic = CHAPTER_TOPIC[chapter]
  const base = topic ? videosForTopic(topic) : []
  const extra = CHAPTER_EXTRA[chapter] ?? []
  return dedupe([...extra, ...base]).slice(0, 8)
}

export function topicKeyForChapter(chapter: number) {
  return CHAPTER_TOPIC[chapter]
}

export function channelLabel(channel: VideoChannel) {
  return CHANNELS[channel].label
}
