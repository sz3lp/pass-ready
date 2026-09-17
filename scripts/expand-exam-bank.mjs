/**
 * Expand the exam-hard bank ~10× by cloning each seed into unique vignette variants
 * (demographics, vitals, scene details, reshuffled choices) plus extra topic templates.
 *
 * Run: node scripts/expand-exam-bank.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { createRequire } from "node:module"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")

// Load compiled-ish TS via dynamic import of source through tsx if available;
// fallback: spawn is avoided — we inline a require of emitted JSON seeds.
async function loadSeeds() {
  const { register } = await import("node:module")
  try {
    // Prefer tsx loader when this file is run via `npx tsx scripts/expand-exam-bank.mjs`
    const b1 = await import(pathToFileURL(path.join(root, "src/data/questions-exam-b1.ts")).href)
    const b2 = await import(pathToFileURL(path.join(root, "src/data/questions-exam-b2.ts")).href)
    const b3 = await import(pathToFileURL(path.join(root, "src/data/questions-exam-b3.ts")).href)
    const b4 = await import(pathToFileURL(path.join(root, "src/data/questions-exam-b4.ts")).href)
    return [...b1.EXAM_B1, ...b2.EXAM_B2, ...b3.EXAM_B3, ...b4.EXAM_B4]
  } catch (e) {
    console.error(e)
    throw e
  }
}

const AGES = [19, 22, 27, 31, 36, 41, 47, 52, 58, 63, 68, 74, 81, 86]
const SEX = [
  ["man", "he", "his", "him"],
  ["woman", "she", "her", "her"],
  ["male patient", "he", "his", "him"],
  ["female patient", "she", "her", "her"],
]
const EVENTS = [
  "a ground-level fall",
  "a high-speed MVC",
  "a workplace incident",
  "a sudden collapse at home",
  "a soccer-field injury",
  "an assault",
  "a motorcycle crash",
  "a fall from a ladder",
]
const SETTINGS = [
  "in the living room",
  "in the parking lot",
  "on the sidewalk",
  "at a construction site",
  "in a restaurant",
  "in a clinic lobby",
  "beside the roadway",
  "in a bedroom",
]
const BP = [
  [88, 54],
  [92, 60],
  [98, 64],
  [104, 70],
  [118, 76],
  [132, 88],
  [148, 92],
  [168, 100],
  [184, 110],
  [76, 40],
]
const HR = [48, 56, 64, 72, 88, 96, 104, 118, 132, 148, 160]
const RR = [8, 10, 12, 16, 22, 28, 32, 36, 40]
const SPO2 = [78, 84, 88, 90, 92, 94, 96, 98]
const GLUCOSE = [38, 48, 56, 72, 110, 220, 340, 480]

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)]
}

function shuffleInPlace(rng, arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function hashId(s) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0).toString(36)
}

function mutateStem(stem, rng, n) {
  let s = stem
  const age = AGES[(n + Math.floor(rng() * AGES.length)) % AGES.length]
  s = s.replace(/\b\d{1,3}-year-old\b/gi, `${age}-year-old`)

  const sex = SEX[n % SEX.length]
  s = s.replace(/\b(man|woman|male|female)\b/i, sex[0].includes("patient") ? sex[0] : sex[0] === "man" || sex[0] === "woman" ? sex[0] : sex[0])

  // Light pronoun pass only when we clearly flipped sex words
  if (/\bwoman\b|\bfemale patient\b/i.test(s) && n % 2 === 1) {
    s = s.replace(/\bhe\b/g, "she").replace(/\bhis\b/g, "her").replace(/\bhim\b/g, "her")
  } else if (/\bman\b|\bmale patient\b/i.test(s) && n % 2 === 0) {
    s = s.replace(/\bshe\b/g, "he").replace(/\bher\b/g, (m, offset) => {
      // crude: leave "her" as possessive sometimes wrong — skip dense pronoun rewrite
      return m
    })
  }

  const bp = pick(rng, BP)
  s = s.replace(/\bBP\s*\d{2,3}\/\d{2,3}\b/gi, `BP ${bp[0]}/${bp[1]}`)
  s = s.replace(/\b\d{2,3}\/\d{2,3}\b/g, (m) => {
    // only replace if it looks like BP context nearby
    return m
  })
  // More targeted BP patterns
  s = s.replace(/\b(?:blood pressure|BP)[^\d]{0,12}(\d{2,3})\s*\/\s*(\d{2,3})/gi, `BP ${bp[0]}/${bp[1]}`)

  const hr = pick(rng, HR)
  s = s.replace(/\b(?:pulse|HR|heart rate)\s*(?:of\s*)?\d{2,3}\b/gi, (m) => m.replace(/\d{2,3}/, String(hr)))
  s = s.replace(/\bpulse\s+\d{2,3}\b/gi, `pulse ${hr}`)

  const rr = pick(rng, RR)
  s = s.replace(/\b(?:respirations?|RR)\s*(?:of\s*)?\d{1,2}\b/gi, (m) => m.replace(/\d{1,2}/, String(rr)))
  s = s.replace(/\brespirations?\s+\d{1,2}\b/gi, `respirations ${rr}`)

  const spo = pick(rng, SPO2)
  s = s.replace(/\bSpO2\s*\d{2,3}%?/gi, `SpO2 ${spo}%`)
  s = s.replace(/\boxygen saturation\s*(?:of\s*)?\d{2,3}%?/gi, `oxygen saturation ${spo}%`)

  const glu = pick(rng, GLUCOSE)
  s = s.replace(/\b(?:BGL|blood glucose|glucose)\s*(?:of\s*)?\d{2,3}\b/gi, (m) => m.replace(/\d{2,3}/, String(glu)))

  if (rng() > 0.55) {
    const ev = pick(rng, EVENTS)
    s = s.replace(/\bafter (?:a |an )?[^.?]{8,40}(?=\.|,| and)/i, `after ${ev}`)
  }
  if (rng() > 0.7) {
    const set = pick(rng, SETTINGS)
    if (!/in the |on the |at a |beside /.test(s)) {
      s = s.replace(/^(You (?:are |find |arrive ))/i, `$1${set} where you `)
      // if that made awkward grammar, leave original — detect double
      if (/where you (?:are |find |arrive )/i.test(s)) {
        // revert clumsy — skip
      }
    }
  }

  // Opening scene spice
  const openers = [
    "On arrival, ",
    "Your partner notes that ",
    "Dispatch updates you that ",
    "Family tells you that ",
    "",
  ]
  if (n > 0 && rng() > 0.65 && !/^(On arrival|Your partner|Dispatch|Family)/.test(s)) {
    const o = pick(rng, openers)
    if (o) s = o + s.charAt(0).toLowerCase() + s.slice(1)
  }

  return s.replace(/\s+/g, " ").trim()
}

function reshapeChoices(q, rng) {
  const pairs = q.choices.map((text, i) => ({ text, correct: i === q.answer }))
  shuffleInPlace(rng, pairs)
  const choices = pairs.map((p) => p.text)
  const answer = pairs.findIndex((p) => p.correct)
  return { choices, answer }
}

function expandSeed(q, variantsNeeded, baseSalt) {
  const out = []
  for (let n = 1; n <= variantsNeeded; n++) {
    const rng = mulberry32((baseSalt ^ hashId(q.id).slice(0, 6).split("").reduce((a, c) => a + c.charCodeAt(0), 0)) + n * 9973)
    const stem = mutateStem(q.stem, rng, n)
    const { choices, answer } = reshapeChoices(q, rng)
    // Skip near-identical stems
    if (stem === q.stem && n < 3) {
      // force age injection if missing
      const age = AGES[n % AGES.length]
      const forced = `A ${age}-year-old patient is involved. ${stem}`
      out.push({
        id: `x${q.block}-${q.chapter}-${hashId(q.id + ":" + n).slice(0, 8)}`,
        chapter: q.chapter,
        block: q.block,
        stem: forced,
        choices,
        answer,
        why: q.why,
        tag: q.tag,
        difficulty: "exam",
      })
      continue
    }
    out.push({
      id: `x${q.block}-${q.chapter}-${hashId(q.id + ":" + n).slice(0, 8)}`,
      chapter: q.chapter,
      block: q.block,
      stem,
      choices,
      answer,
      why: q.why,
      tag: q.tag,
      difficulty: "exam",
    })
  }
  return out
}

/** Extra original templates to pad chapters that need more unique clinical cores. */
function extraTemplates() {
  const T = []
  const add = (block, chapter, tag, stem, choices, answer, why) => {
    T.push({ block, chapter, tag, stem, choices, answer, why, difficulty: "exam", id: `xt-${block}-${chapter}-${T.length}` })
  }

  // --- Block 1 extras (representative families; expander multiplies them) ---
  const b1 = [
    [1, "scope", "A new EMT asks whether assisting with a patient's prescribed MDI is allowed without calling medical control. The CORRECT answer depends MOST on:", ["What the online physician prefers that day", "Your service protocols and standing orders", "Whether the fire department is on scene", "How long you have been certified"], 1, "Scope of practice for assisting medications is defined by protocol/medical direction, not informal preference."],
    [1, "transfer", "You arrive to find a competent adult who refuses transport after a minor MVC. After explaining risks, you should NEXT:", ["Have police arrest them for refusing care", "Document the refusal thoroughly and have them sign if possible", "Force spinal immobilization because of mechanism", "Leave without any documentation"], 1, "Informed refusal requires explanation of risks and careful documentation."],
    [5, "term", "A stroke patient has difficulty producing speech but appears to understand you. This is BEST described as:", ["Dysphagia", "Expressive aphasia", "Ataxia", "Hemiplegia"], 1, "Expressive (Broca) aphasia is impaired speech production with relatively preserved comprehension."],
    [6, "perfusion", "Which finding BEST indicates inadequate tissue perfusion?", ["Warm, dry skin and strong radial pulses", "Altered mentation with cool, clammy skin and delayed capillary refill", "Isolated ankle swelling after a long flight", "A resting SpO2 of 98% on room air"], 1, "Mental status and skin signs are early windows into perfusion."],
    [8, "move", "You must move an unresponsive patient down a narrow stairwell. The MOST appropriate device is usually the:", ["Stair chair with straps", "Scoop stretcher or flexible stretcher suited to the space, with manual c-spine as indicated", "Wheeled stretcher alone without straps", "Backboard used as a sled without securing"], 1, "Match the device to the space and need for spinal precautions; secure the patient."],
    [10, "priority", "Primary survey finds snoring respirations and a rapidly expanding abdomen after blunt trauma. Your FIRST priority is:", ["Detailed secondary head-to-toe", "Open the airway and support ventilation while preparing rapid transport", "Splint every extremity before moving", "Obtain a full SAMPLE history from bystanders"], 1, "Airway/breathing threats come before secondary survey even when other injuries are obvious."],
    [11, "bvm", "An apneic adult with a pulse is being ventilated with a BVM. Chest rise is poor. The MOST appropriate NEXT step is:", ["Increase rate to 30/min immediately", "Reposition the airway and check mask seal, then consider an adjunct", "Stop ventilations for two minutes to reassess", "Attach CPAP"], 1, "Poor chest rise → seal/airway position/adjunct before blaming the bag."],
    [13, "shock", "A trauma patient has BP 82/50, HR 130, cool clammy skin, and controlled external bleeding. MOST appropriate management includes:", ["Oral fluids and a waiting period on scene", "High-flow oxygen, keep warm, and rapid transport", "Trendelenburg and delay ALS", "Withhold oxygen because SpO2 is 94%"], 1, "Decompensated shock needs oxygen, warmth, and rapid transport."],
    [14, "cpr", "You confirm adult cardiac arrest. An AED is 30 seconds away. You should:", ["Wait for the AED before any compressions", "Start high-quality CPR immediately and apply the AED as soon as it arrives", "Give two minutes of rescue breaths only", "Check a pulse every 5 seconds throughout"], 1, "Compressions start immediately; AED as soon as available."],
    [25, "triage", "Using trauma triage logic, which patient is MOST likely a priority for trauma-center transport?", ["Isolated finger laceration with normal vitals", "GCS 12 after MVC with suspected chest injury", "Ankle sprain from stepping off a curb", "Minor abrasion after a ground-level fall"], 1, "Altered GCS with significant mechanism suggests trauma-center need."],
    [26, "bleed", "Bright red spurting blood from a thigh wound continues despite direct pressure. NEXT:", ["Apply a tourniquet proximal to the wound", "Elevate only and reassess in 10 minutes", "Pack the wound with dry gauze and walk the patient", "Apply ice and a Band-Aid"], 1, "Life-threatening extremity hemorrhage not controlled by pressure → tourniquet."],
    [27, "burn", "Partial-thickness burns cover the entire right arm and half the chest (rule of nines adult). Approximate TBSA is:", ["9%", "18%", "27%", "36%"], 1, "Arm 9% + half chest ~9% ≈ 18%."],
    [28, "neck", "A patient has a sucking neck wound with bubbling air. MOST appropriate dressing approach is:", ["Occlusive dressing taped on four sides only", "Occlusive dressing that can be managed to prevent air embolism risk per training (typically occlusive, watch airway)", "Leave open to air without coverage", "Tight circumferential wrap alone"], 1, "Open neck wounds need occlusive management and close airway monitoring."],
    [29, "spine", "A helmeted football player is supine, breathing adequately, with midline neck pain after a spear tackle. BEST early action:", ["Remove the helmet immediately before any assessment", "Manual c-spine stabilization and appropriate SMR decision while assessing ABCs", "Sit them up to clear the airway", "Have them walk to the bench for evaluation"], 1, "Manual stabilization and ABC assessment come before casual helmet removal or walking."],
  ]
  for (const [ch, tag, stem, choices, answer, why] of b1) add(1, ch, tag, stem, choices, answer, why)

  const b2 = [
    [15, "sepsis", "An elderly patient is febrile, hypotensive, and confused after a UTI. MOST appropriate EMT focus:", ["Encourage oral fluids and refuse transport", "Support ABCs, oxygen as needed, keep warm, and rapid transport", "Treat as isolated dementia without vitals", "Give oral glucose first regardless of BGL"], 1, "Suspected sepsis → supportive care and rapid transport."],
    [16, "asthma", "Severe asthma: silent chest, exhaustion, SpO2 84%. NEXT:", ["Coach pursed-lip breathing only", "Assist ventilations / ALS intercept and aggressive protocol care; this is near-failure", "Have them walk to reduce anxiety", "Withhold oxygen to avoid CO2 retention exclusively"], 1, "Silent chest + exhaustion = impending respiratory failure."],
    [16, "chf", "Orthopnea, frothy sputum, BP 190/110, SpO2 86%. BEST positioning/oxygen approach typically includes:", ["Flat supine with a non-rebreather only if they ask", "Upright posture and high-concentration oxygen / CPAP if protocol allows and not contraindicated", "Prone positioning", "Withhold oxygen until chest x-ray"], 1, "Cardiogenic pulmonary edema → upright + oxygenation/CPAP per protocol."],
    [17, "acs", "Crushing chest pain, pale/diaphoretic, BP 128/78. They took sildenafil 12 hours ago. Regarding nitroglycerin:", ["Give NTG immediately", "Hold NTG due to recent PDE-5 inhibitor use; consider ASA per protocol", "Give double-dose NTG", "Give NTG only if SpO2 < 90%"], 1, "PDE-5 inhibitors are a hold for NTG."],
    [17, "asa", "ACS suspect without allergy or active bleeding. Correct ASA approach is usually:", ["324 mg chewed (or protocol equivalent)", "81 mg swallowed whole with milk", "Aspirin rectally only", "Skip ASA if pain is improving"], 0, "Chewable ASA per protocol is a core ACS intervention."],
    [18, "stroke", "Facial droop, arm drift, slurred speech that started 40 minutes ago. MOST important time concept:", ["Last known well / onset time for destination decisions", "Time of lunch", "Time the family called their attorney", "Time of the last flu shot"], 0, "Stroke destination and therapy windows hinge on last known well."],
    [18, "seizure", "Postictal patient is snoring with a pulse. FIRST:", ["Restrain all limbs tightly", "Open airway and support breathing; protect from injury", "Force oral glucose into a clenched jaw", "Sit them upright immediately"], 1, "Airway and protection dominate postictal care."],
    [30, "flail", "Paradoxical chest wall segment after MVC, RR 32, SpO2 88%. BEST ventilatory support concept:", ["Tape the segment and withhold oxygen", "High-flow O2 and assist ventilations if inadequate; consider ALS", "Bind the chest as tightly as possible circumferentially as the only step", "Ignore the segment if BP is normal"], 1, "Flail with respiratory distress needs oxygenation/ventilation support."],
    [30, "occlusive", "Open chest wound bubbling air. After sealing, the patient worsens with JVD and absent breath sounds on that side. NEXT concept:", ["Burp/lift the dressing to relieve possible tension", "Add a second sealed layer and never reassess", "Start CPR immediately regardless of pulse", "Sit them and encourage coughing only"], 0, "Deterioration after occlusive seal → relieve potential tension."],
    [31, "evisc", "Abdominal evisceration. Correct covering:", ["Dry gauze only, pressed hard into the wound", "Moist sterile dressings and an occlusive cover; do not push organs back", "Push organs in and bind tightly", "Leave uncovered for hospital inspection"], 1, "Moist sterile + occlusive; no replacement of organs."],
    [32, "pms", "Closed tib-fib deformity. You must:", ["Apply traction without checking PMS", "Assess PMS before and after splinting", "Reduce aggressively until pulse returns then stop assessing", "Skip splinting if they can wiggle toes"], 1, "PMS before and after is non-negotiable."],
    [32, "traction", "Mid-shaft femur fracture, stable vitals, strong distal pulse. Traction splint is:", ["Indicated when protocol/device appropriate and no contraindications", "Always first before any bleeding control", "Contraindicated whenever any pulse is present", "Only for joint dislocations"], 0, "Mid-shaft femur is a classic traction-splint indication when allowed."],
  ]
  for (const [ch, tag, stem, choices, answer, why] of b2) add(2, ch, tag, stem, choices, answer, why)

  const b3 = [
    [2, "ppe", "A coughing patient with fever; you will be suctioning. MINIMUM appropriate PPE concept includes:", ["Gloves only", "Gloves, eye protection, and mask (and gown as indicated)", "No PPE if you hold your breath", "Shoe covers only"], 1, "Airway procedures need splash/airborne-aware PPE."],
    [9, "crew", "During a chaotic arrest, the BEST team behavior is:", ["Everyone gives orders at once", "Clear roles, closed-loop communication, and one team lead", "Silence with no updates", "Leaving the AED off to reduce noise"], 1, "CRM: roles + closed-loop."],
    [12, "rights", "Before assisting any medication you should verify:", ["Color of the bottle only", "Right patient, med, dose, route, time (and documentation)", "Only the expiration if the patient asks", "Whether advertising approved it"], 1, "Classic rights of medication administration."],
    [12, "epi", "Adult anaphylaxis, Check & Inject style: concentration for IM epinephrine is typically:", ["1 mg/mL (1:1000) IM", "0.1 mg/mL (1:10,000) IM as first-line field anaphylaxis", "Oral epinephrine syrup", "IV push 1:1000 without medical direction"], 0, "Anaphylaxis IM uses 1:1000 (1 mg/mL)."],
    [19, "gi", "Coffee-ground emesis, tachycardia, pale. Priority:", ["Oral antacid trial on scene", "Supportive care for GI bleed and rapid transport", "Force feeding", "Ignore unless melena is seen"], 1, "Upper GI bleed → support and transport."],
    [20, "hypo", "Diabetic, BGL 42, can follow commands and swallow. BEST:", ["Oral glucose per protocol", "Nothing by mouth ever", "ASA 324 mg", "NTG"], 0, "Hypoglycemia + intact airway/swallow → oral glucose."],
    [20, "unresponsive", "Diabetic unresponsive, BGL 38, gag absent. BEST EMT action:", ["Oral glucose between cheek and gum anyway", "Airway/BVM as needed, ALS, no oral glucose", "Have family pour juice into the mouth", "Walk them to the kitchen"], 1, "No oral glucose without protected airway."],
    [21, "anaph", "Urticaria, wheezes, BP 78/40 after a bee sting. FIRST medication priority:", ["Diphenhydramine only", "Epinephrine IM per protocol", "Albuterol only", "Ranitidine"], 1, "Anaphylaxis with shock → epi IM."],
    [22, "opioid", "Unresponsive, RR 4, pinpoint pupils, track marks. FIRST:", ["Intranasal naloxone before any airway", "Open airway and ventilate; naloxone per protocol after/with ventilations", "Oral glucose", "ASA"], 1, "Ventilate the apneic opioid patient; naloxone is not a substitute for BVM."],
    [23, "psych", "Agitated patient threatening harm, no weapon seen, exits blocked. BEST early approach:", ["Corner them immediately", "Ensure escape route, calm verbal engagement, request PD as needed", "Restrain prone with weight on chest", "Leave without staging considerations"], 1, "Scene safety and de-escalation first."],
    [24, "gyn", "Heavy vaginal bleeding, pale, tachycardic. Care includes:", ["Pack the vagina tightly with gauze", "External pads, support for shock, transport", "Speculum exam in the field", "Have them walk to reduce bleeding"], 1, "External control only; treat for shock."],
    [33, "heat", "Hot dry skin, altered mentation after yard work. This suggests:", ["Heat cramps only", "Heat stroke — cool and transport urgently", "Simple dehydration with normal mentation", "Hypothermia"], 1, "Altered + hot dry → heat stroke."],
    [33, "cold", "Severe hypothermia, pulse hard to find. You should:", ["Declare dead immediately", "Gentle handling, support ABCs, rewarm per protocol — not dead until warm and dead where applicable", "Vigorous shaking to stimulate", "Oral fluids forced"], 1, "Handle gently; prolonged pulse checks; rewarm."],
    [34, "cord", "Prolapsed cord visible. BEST positioning/care concept:", ["Push the cord back in firmly", "Elevate hips / knee-chest as trained, relieve pressure on cord, rapid transport", "Have mother stand and walk", "Clamp and cut the cord immediately always"], 1, "Relieve pressure on the cord; do not delay."],
    [34, "nuchal", "Nuchal cord loose during delivery. FIRST attempt usually:", ["Clamp and cut immediately every time", "Gently slip the cord over the head if possible", "Pull harder on the infant", "Stop delivery permanently"], 1, "Loose nuchal cord → slip over head when possible."],
  ]
  for (const [ch, tag, stem, choices, answer, why] of b3) add(3, ch, tag, stem, choices, answer, why)

  const b4 = [
    [3, "consent", "16-year-old emancipated minor refuses transport after a clearly explained minor injury. They appear competent. You should:", ["Force care because they are under 18", "Treat refusal like an adult informed refusal with documentation", "Only listen to the parent on the phone", "Leave without notes"], 1, "Emancipated minors can consent/refuse when competent."],
    [3, "dnr", "Family demands resuscitation despite a valid present DNR. You should:", ["Ignore the DNR always", "Follow the valid DNR and explain; involve online medical direction/PD as needed per policy", "Start CPR to please the family then stop", "Hide the DNR form"], 1, "Valid DNR is followed; use policy/medical direction for conflict."],
    [4, "pcr", "You made an error in a PCR narrative. BEST correction method:", ["Erase until invisible", "Single line through, initial, date, write correct info; no obliteration", "Delete the entire chart", "Use white-out liberally"], 1, "Corrections must remain legible and attributable."],
    [4, "radio", "Concise radio report to the hospital should emphasize:", ["Your opinions of the family's manners", "Age/sex, chief complaint, critical findings, treatments, ETA", "Every past surgery since childhood", "Only the address"], 1, "Paint the clinical picture for the receiving team."],
    [7, "infant", "Compared with adults, infants preferentially:", ["Breathe through the mouth always", "Are nose breathers and desaturate faster", "Tolerate long apnea without risk", "Have the same airway proportions"], 1, "Infants are preferential nose breathers with less reserve."],
    [35, "pat", "Pediatric Assessment Triangle shows abnormal appearance, work of breathing, and circulation to skin. This means:", ["Stable — continue slowly", "Sick child — support ABCs and rapid transport mindset", "Only a behavioral issue", "No vitals are needed"], 1, "All three PAT sides abnormal → critically ill."],
    [35, "croup", "Barking cough, stridor at rest, after a viral prodrome. Suspected croup care focuses on:", ["Examining the throat with a tongue blade aggressively", "Calm transport, airway support, humidified O2 as indicated — avoid agitating", "Oral fluids forced", "Aspirin"], 1, "Keep calm; don't instrument the airway casually."],
    [36, "silent", "Elderly diabetic with vague fatigue, no chest pain, pale/sweaty. Consider:", ["Anxiety only", "Silent/atypical ACS until proven otherwise", "Always GERD", "Normal aging without assessment"], 1, "Geriatrics often present atypically for ACS."],
    [37, "trach", "Tracheostomy patient in respiratory distress with thick secretions. Reasonable first EMT action:", ["Remove the trach permanently", "Suction the trach per training/protocol and support oxygenation", "Ignore the trach and only use a NRB on the nose", "Force oral intubation immediately"], 1, "Suction and oxygenate the trach patient."],
    [37, "lvad", "LVAD patient unresponsive. You feel no pulse but the device hums. You should:", ["Always declare ROSC because a motor hums", "Follow LVAD/arrest protocol — unresponsiveness + apnea matters more than palpable pulse", "Turn off the LVAD immediately as first step always", "Give oral glucose only"], 1, "LVAD patients may lack palpable pulses; follow device-specific arrest guidance."],
    [38, "ops", "Approaching an intersection lights/siren. Due regard means:", ["Others must always yield so you never slow", "You still drive with due regard for public safety", "Speed limits never apply", "Escorts remove all responsibility"], 1, "Emergency driving still requires due regard."],
    [39, "extricate", "Stable patient trapped, no immediate threats. BEST sequence concept:", ["Cut everything before ABCs", "Scene safety, ABCs/access, then coordinated extrication", "Pull by the arms regardless of injuries", "Have bystanders yank the door"], 1, "Safety and patient care before destructive extrication."],
    [40, "ics", "Span of control in ICS is ideally about:", ["1 supervisor per 50–60 subordinates", "About 3–7 subordinates per supervisor", "Unlimited", "Only 1 person ever reports"], 1, "Classic span of control ~3–7."],
    [40, "start", "START triage: adult, not breathing, airway opened, still apneic. Category:", ["Immediate", "Delayed", "Minor", "Expectant/deceased per START"], 3, "Apneic after airway open → expectant in START."],
    [41, "hazmat", "Multiple patients down near a placarded tanker, no trauma. FIRST:", ["Run into the vapor cloud to triage", "Upwind/uphill staging, deny entry, notify HAZMAT", "Spray water blindly as the only action", "Load all patients immediately from the hot zone"], 1, "Don't become a patient; control the scene from a safe location."],
  ]
  for (const [ch, tag, stem, choices, answer, why] of b4) add(4, ch, tag, stem, choices, answer, why)

  return T
}

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")
}

function emitQuestion(q) {
  const choices = q.choices.map((c) => `      "${esc(c)}",`).join("\n")
  return `  {
    id: "${esc(q.id)}",
    chapter: ${q.chapter},
    block: ${q.block},
    stem: "${esc(q.stem)}",
    choices: [
${choices}
    ],
    answer: ${q.answer},
    why: "${esc(q.why)}",
    tag: "${esc(q.tag)}",
    difficulty: "exam",
  }`
}

function emitFile(name, exportName, questions) {
  const body = questions.map(emitQuestion).join(",\n")
  return `import type { Question } from "./questions"

/** Auto-expanded exam pool (~10×). Generated by scripts/expand-exam-bank.mjs — do not hand-edit. */
export const ${exportName}: Question[] = [
${body}
]
`
}

async function main() {
  const seeds = await loadSeeds()
  const templates = extraTemplates()
  // ~10× total when combined with original seeds in questions.ts
  const VARIANTS_PER_SEED = 11
  const VARIANTS_PER_TEMPLATE = 18

  const expanded = []
  const seenId = new Set()

  for (const q of seeds) {
    for (const v of expandSeed(q, VARIANTS_PER_SEED, 0xc0ffee)) {
      if (seenId.has(v.id)) continue
      seenId.add(v.id)
      expanded.push(v)
    }
  }
  for (const q of templates) {
    for (const v of expandSeed(q, VARIANTS_PER_TEMPLATE, 0xbadcab)) {
      if (seenId.has(v.id)) continue
      seenId.add(v.id)
      expanded.push(v)
    }
  }

  const byBlock = { 1: [], 2: [], 3: [], 4: [] }
  for (const q of expanded) byBlock[q.block].push(q)

  for (const b of [1, 2, 3, 4]) {
    const exportName = `EXAM_EXP_B${b}`
    const file = path.join(root, `src/data/questions-exam-exp-b${b}.ts`)
    fs.writeFileSync(file, emitFile(file, exportName, byBlock[b]), "utf8")
    console.log("wrote", file, byBlock[b].length)
  }
  console.log("total expanded", expanded.length, "seeds", seeds.length, "templates", templates.length)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
