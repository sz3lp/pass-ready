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

/** Confirmed Paramedic Coach overviews (watch / shorts IDs verified). */
export const COACH = {
  blsAirways: coach("BLS Airways for EMTs (NPA & OPA)", "aR6X9Up_E5U"),
  oxygenDevices: coach("Oxygen Devices QUIZ for EMT Students", "iJkx4l9yLcw"),
  shock: coach("All Shock Types in One Video | NREMT Shock Review", "gARL40EjDPU"),
  primaryAssessment: coach("EMT Primary Assessment", "63DR8V33WIo"),
  primaryVsSecondary: coachShort("Primary vs Secondary Assessment", "TqkVs5lfRvc"),
  medicalAssessment: coach("MEDICAL ASSESSMENT Taught In Only 19 Minutes", "X7n5VjwHlPA"),
  medicalEasy: coachShort("Medical Assessment Made EASY", "mqyFwyzDF_Q"),
  breathing: coach("How I Assess Difficulty Breathing FAST", "JgZ0e0kYPRw"),
  passEmt: coach("Watch These 11 Minutes To PASS EMT Class", "hi4aWvRxeG4"),
} as const

export const MIRAMAR_HUB: VideoLink = miramarHub("Miramar EMT skills video library")

/** Per skill sheet: Miramar demos first, then Coach cognitive overviews. */
export const SKILL_VIDEOS: Record<string, VideoLink[]> = {
  s7: [
    miramarSearch("Bag valve mask: apneic patient", "BAG VALVE MASK APNEIC"),
    COACH.blsAirways,
    COACH.breathing,
  ],
  s11: [
    miramarSearch("Oxygen administration: non-rebreather", "OXYGEN ADMINISTRATION NON RE-BREATHER"),
    COACH.oxygenDevices,
    COACH.breathing,
  ],
  s39: [COACH.blsAirways, COACH.breathing],
  s87: [COACH.blsAirways],
  s29: [
    miramarSearch("Bleeding control & shock management", "BLEEDING CONTROL SHOCK"),
    COACH.shock,
  ],
  s31: [miramarSearch("Long bone immobilization", "LONG BONE IMMOBILIZATION")],
  s33: [miramarSearch("Long bone / joint immobilization", "LONG BONE IMMOBILIZATION")],
  s89: [miramarSearch("Long bone immobilization (traction context)", "LONG BONE IMMOBILIZATION")],
  s92: [miramarSearch("Spinal immobilization: supine patient", "SPINAL IMMOBILIZATION SUPINE")],
  s21: [
    miramarSearch("Trauma assessment", "TRAUMA ASSESSMENT"),
    COACH.primaryAssessment,
    COACH.shock,
  ],
  s25: [
    miramarSearch("Cardiac arrest management: AED", "CARDIAC ARREST AED"),
    COACH.passEmt,
  ],
  s57: [COACH.medicalAssessment, COACH.medicalEasy],
  s65: [COACH.medicalAssessment, COACH.medicalEasy],
  s61: [COACH.medicalAssessment],
  s73: [COACH.medicalAssessment],
  s13: [
    miramarSearch("Medical assessment: chest pain", "MEDICAL ASSESSMENT CHEST PAIN"),
    miramarSearch("Medical assessment: allergic reaction", "MEDICAL ASSESSMENT ALLERGIC"),
    COACH.medicalAssessment,
    COACH.medicalEasy,
    COACH.primaryVsSecondary,
  ],
  s63: [COACH.medicalAssessment, COACH.breathing],
  s69: [
    miramarSearch("Medical assessment: allergic reaction", "MEDICAL ASSESSMENT ALLERGIC"),
    COACH.medicalAssessment,
    COACH.shock,
  ],
  s94: [
    miramarSearch("Medical assessment demos", "MEDICAL ASSESSMENT"),
    COACH.medicalAssessment,
    COACH.primaryAssessment,
    COACH.medicalEasy,
  ],
  s96: [
    miramarSearch("Trauma assessment", "TRAUMA ASSESSMENT"),
    COACH.primaryAssessment,
    COACH.shock,
  ],
}

/** Topic overviews keyed to Jeopardy / class session ids. */
export const TOPIC_VIDEOS: Record<string, VideoLink[]> = {
  "b1-ems": [COACH.primaryAssessment, COACH.primaryVsSecondary, COACH.passEmt],
  "b1-body": [COACH.passEmt],
  "b1-trauma-shock": [COACH.shock, COACH.primaryAssessment],
  "b1-airway": [COACH.blsAirways, COACH.oxygenDevices, COACH.breathing],
  "b1-soft-head": [COACH.shock, COACH.primaryAssessment],
  "b1-review": [COACH.passEmt, COACH.shock, COACH.blsAirways, COACH.primaryAssessment],
  "b2-ortho": [COACH.primaryAssessment, COACH.shock],
  "b2-medical": [COACH.medicalAssessment, COACH.medicalEasy, COACH.primaryVsSecondary],
  "b2-cardio-resp": [COACH.breathing, COACH.oxygenDevices, COACH.medicalAssessment],
  "b2-neuro": [COACH.medicalAssessment, COACH.primaryAssessment],
  "b2-review": [COACH.medicalAssessment, COACH.breathing, COACH.shock],
  "b3-endo": [COACH.medicalAssessment, COACH.shock],
  "b3-ob": [COACH.medicalAssessment],
  "b3-pharm": [COACH.medicalAssessment],
  "b3-safety": [COACH.passEmt],
  "b3-tox": [COACH.medicalAssessment, COACH.breathing],
  "b3-review": [COACH.medicalAssessment, COACH.shock, COACH.passEmt],
  "b4-lifespan": [COACH.medicalAssessment],
  "b4-peds": [COACH.medicalAssessment, COACH.breathing],
  "b4-legal": [COACH.passEmt],
  "b4-ops": [COACH.passEmt, COACH.shock],
  "b4-review": [COACH.medicalAssessment, COACH.passEmt],
  "md-jeopardy": [COACH.passEmt, COACH.shock, COACH.medicalAssessment, COACH.blsAirways],
  "final-150": [COACH.passEmt, COACH.shock, COACH.medicalAssessment, COACH.primaryAssessment],
}

export function videosForSkill(skillId: string) {
  return SKILL_VIDEOS[skillId] ?? []
}

export function videosForTopic(classId: string) {
  return TOPIC_VIDEOS[classId] ?? []
}

export function channelLabel(channel: VideoChannel) {
  return CHANNELS[channel].label
}
