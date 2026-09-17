import type { Question } from "./questions"

/**
 * Pass Ready EMT — Fall 2026
 * HARD written-exam MCQs, Block III only.
 *
 * Style rules used here:
 *  - Vignette stems, NEXT / MOST APPROPRIATE / BEST / FIRST phrasing
 *  - Distractors of similar length and plausibility
 *  - No "all of the above" / "none of the above"
 *  - Correct answers spread across all four positions
 *  - Kansas City Check & Inject convention: epinephrine 1 mg/mL (1:1000) IM,
 *    0.3 mg typical adult anaphylaxis dose, 0.15 mg pediatric
 */

type Draft = {
  stem: string
  choices: [string, string, string, string]
  answer: 0 | 1 | 2 | 3
  why: string
  tag: string
}

function exam(chapter: number, drafts: Draft[]): Question[] {
  return drafts.map((d, i) => ({
    id: `ex3-c${chapter}-${i + 1}`,
    chapter,
    block: 3 as const,
    difficulty: "exam" as const,
    ...d,
  }))
}

/* ------------------------------------------------------------------ */
/* Chapter 2 — Workforce Safety and Wellness                          */
/* ------------------------------------------------------------------ */

const c2 = exam(2, [
  {
    tag: "scene safety",
    stem: "You are 10 feet from the front door of a domestic disturbance when you hear glass break and a man screaming threats inside. Law enforcement is 6 minutes out. What is the NEXT action?",
    choices: [
      "Enter quickly to reach the patient before the injuries worsen",
      "Retreat to the ambulance, stage at a distance, and update dispatch",
      "Knock loudly and announce that EMS is entering the residence",
      "Wait on the porch so you can hear whether the fighting stops",
    ],
    answer: 1,
    why: "Scene safety outranks patient access. A violent, active scene belongs to law enforcement — stage out of sight, report what you heard, and enter after it is secured.",
  },
  {
    tag: "exposure control",
    stem: "While moving a patient to the stretcher, an uncapped needle in the seat pocket punctures your glove and finger. The bleeding is easily controlled. What is the MOST appropriate immediate action?",
    choices: [
      "Finish the transport, then mention the needlestick at end of shift",
      "Ask the patient whether he carries any bloodborne infections first",
      "Apply a bandage and continue, since the glove absorbed most of it",
      "Wash the site, report the exposure, and start the exposure control plan",
    ],
    answer: 3,
    why: "Wash immediately, report immediately, get evaluated. Post-exposure prophylaxis is time-sensitive, and the patient's answer does not change any of your first steps.",
  },
  {
    tag: "PPE",
    stem: "Dispatch reports a shelter resident with 3 weeks of night sweats, weight loss, and a bloody cough. Which PPE choice is MOST appropriate?",
    choices: [
      "A surgical mask for you and a surgical mask for the patient",
      "An N95 respirator for the patient and a surgical mask for you",
      "An N95 respirator for you and a surgical mask for the patient",
      "Gloves and eye protection only, since TB spreads by large droplets",
    ],
    answer: 2,
    why: "Suspected TB is airborne. Filtration goes on you (fit-tested N95); source control goes on the patient (surgical mask to trap droplet nuclei).",
  },
  {
    tag: "standard precautions",
    stem: "You are about to assist with an imminent field delivery in a second-floor apartment. Which level of personal protection is MOST appropriate?",
    choices: [
      "Gloves, gown, mask, and eye protection for splash exposure",
      "Gloves alone, because the amniotic fluid itself is sterile",
      "An N95 respirator and gloves, with no gown or eye shield",
      "Gloves and shoe covers, adding eye shields only if bleeding",
    ],
    answer: 0,
    why: "Delivery is a high-splash event — blood and amniotic fluid go everywhere. Full barrier protection: gloves, gown, mask, eye protection.",
  },
  {
    tag: "lifting",
    stem: "You must move a 250-lb (113-kg) patient from a low bed to the stretcher. Which technique MOST reduces your risk of injury?",
    choices: [
      "Extend your arms fully and twist at the waist to swing him over",
      "Bend at the waist with your knees straight and pull him toward you",
      "Keep the weight close, back in normal curvature, and lift with your legs",
      "Hold him at arm's length while your partner slides the draw sheet",
    ],
    answer: 2,
    why: "Power lift: load close to the body, back locked, legs do the work, no twisting. Distance from the body and torsion are what destroy lumbar discs.",
  },
  {
    tag: "critical incident stress",
    stem: "After a pediatric cardiac arrest, your normally talkative partner is silent and shaky and says he keeps seeing the child's face. What is the MOST appropriate response?",
    choices: [
      "Tell him to shake it off, because the next call is already holding",
      "Acknowledge the reaction, stay with him, and offer peer support resources",
      "Report him to the medical director as currently unfit for clinical duty",
      "Insist he recount every clinical detail again to desensitize himself",
    ],
    answer: 1,
    why: "Acute stress reactions are normal, not weakness. Normalize it, stay present, and route him to peer support or EAP — do not minimize it and do not force a detailed rehash.",
  },
  {
    tag: "immunization",
    stem: "Which statement about hepatitis B and EMS providers is correct?",
    choices: [
      "No vaccine exists, so only PPE prevents transmission at work",
      "The vaccine is given only after a documented needlestick occurs",
      "Immunity from the series makes standard precautions unnecessary",
      "A vaccine series exists and is offered to at-risk employees",
    ],
    answer: 3,
    why: "HBV vaccine is offered at no cost to employees with occupational exposure risk. It is preventive rather than post-exposure, and it never replaces PPE.",
  },
  {
    tag: "hazmat",
    stem: "You arrive at an overturned tanker leaking liquid, placarded 1017. A man is down 20 feet from the truck, waving for help. What is the NEXT action?",
    choices: [
      "Approach quickly from downwind and drag the patient to the rig",
      "Don an N95 and structural gloves, then remove the patient rapidly",
      "Stage uphill and upwind, deny entry, and request hazmat resources",
      "Send your partner in while you look up the placard number",
    ],
    answer: 2,
    why: "Placard 1017 is chlorine. Without specialized PPE and training you become the second patient. Isolate, stage uphill and upwind, deny entry, and let hazmat handle rescue and decon.",
  },
  {
    tag: "death and dying",
    stem: "A terminally ill, alert, oriented patient quietly tells you she is ready to die and asks you to stop the oxygen. Her family is shouting at you to continue. Which action is MOST appropriate?",
    choices: [
      "Honor the patient's stated wishes and contact medical control",
      "Follow the family's wishes, since they will manage the estate",
      "Continue all care and tell her she is not thinking clearly today",
      "Leave the residence until the family stops interfering with care",
    ],
    answer: 0,
    why: "A competent adult directs her own care — the family does not. Honor her wishes, look for a valid advance directive or DNR, and involve medical control.",
  },
])

/* ------------------------------------------------------------------ */
/* Chapter 9 — The Team Approach to Health Care                       */
/* ------------------------------------------------------------------ */

const c9 = exam(9, [
  {
    tag: "closed-loop communication",
    stem: "During a busy chest-pain call, your team leader says, \"Give the aspirin.\" Which response BEST demonstrates closed-loop communication?",
    choices: [
      "Silently give the aspirin and document it after transfer of care",
      "Ask the leader to write the order down before you act on it",
      "Nod at the leader so you do not interrupt his radio report",
      "Repeat the order back, give it, then report that it was given",
    ],
    answer: 3,
    why: "Closed loop is receive, repeat back, act, then confirm completion. Silent compliance leaves the leader guessing what was actually done and when.",
  },
  {
    tag: "team leader",
    stem: "On a two-EMT crew caring for a stroke patient, the team leader's PRIMARY responsibility is to:",
    choices: [
      "Coordinate the assessment, assign tasks, and direct the care plan",
      "Personally perform every intervention to guarantee its quality",
      "Drive the ambulance so the newer EMT can practice patient care",
      "Complete the electronic chart while the partner assesses the patient",
    ],
    answer: 0,
    why: "The leader holds the big picture: priorities, task assignment, timing, and destination. Doing everything yourself is exactly how findings get missed.",
  },
  {
    tag: "handoff report",
    stem: "You are transferring a septic patient to the ED nurse. Which verbal handoff is MOST appropriate?",
    choices: [
      "A full recitation of the patient's past surgical history first",
      "Your suspected diagnosis only, since the chart holds the rest",
      "Chief complaint, vital sign trend, treatments given, and response",
      "The dispatch complaint and the patient's insurance information",
    ],
    answer: 2,
    why: "A handoff is a focused clinical picture: who they are, what is wrong, what you found, what you did, how they responded. Background detail lives in the written chart.",
  },
  {
    tag: "MCI roles",
    stem: "At a 12-patient bus crash, the first-arriving EMT functions MOST appropriately as:",
    choices: [
      "The primary care provider for the most critically injured patient",
      "The initial incident commander, performing triage and size-up reports",
      "A litter bearer moving patients toward the transport corridor",
      "The treatment officer bandaging in the immediate-care area",
    ],
    answer: 1,
    why: "First in takes command and triages. You save the most lives by sorting patients and requesting resources, not by tunneling on one critical patient.",
  },
  {
    tag: "scope of practice",
    stem: "A paramedic on scene asks you to push a medication through an established IV line. That skill is outside your scope. What is the MOST appropriate action?",
    choices: [
      "Perform it, since a paramedic is directly supervising your work",
      "Perform it and document that the paramedic gave you the order",
      "Call medical control and request a one-time scope expansion",
      "Decline, state your scope, and offer a task you can perform",
    ],
    answer: 3,
    why: "Scope is set by the state and your medical director, not by whoever is standing next to you. Decline clearly, then stay useful inside your scope.",
  },
  {
    tag: "community paramedicine",
    stem: "Which description BEST fits the role of mobile integrated health care within the health care team?",
    choices: [
      "Providing scheduled in-home follow-up to reduce hospital readmissions",
      "Replacing the primary care physician for chronic disease management",
      "Responding only to 911 requests in an ALS-capable transport unit",
      "Supervising hospital nursing staff during patient discharge planning",
    ],
    answer: 0,
    why: "MIH/community paramedicine is planned, preventive, in-home care under physician oversight. It fills gaps in the system; it does not replace other providers' roles.",
  },
  {
    tag: "patient advocacy",
    stem: "A confused 84-year-old woman repeatedly asks to go to the hospital while her son insists on \"no hospital.\" He is not her legal guardian. Which action MOST reflects patient advocacy?",
    choices: [
      "Honor the son's decision, because he lives with the patient full time",
      "Have the patient sign a refusal form to protect you from liability",
      "Transport the patient and document both statements objectively",
      "Leave the scene once the son has signed the refusal paperwork",
    ],
    answer: 2,
    why: "A patient asking for help gets help. Without legal guardianship the son cannot refuse for her — transport, quote both parties verbatim, and involve medical control if pressed.",
  },
  {
    tag: "quality improvement",
    stem: "Your service reviews every stroke call for last-known-well documentation and on-scene time. This process is BEST described as:",
    choices: [
      "A HIPAA breach requiring notification of every patient reviewed",
      "Continuous quality improvement using clinical benchmarks",
      "Online medical direction delivered retrospectively by radio",
      "Peer discipline intended to identify negligent field providers",
    ],
    answer: 1,
    why: "Measuring performance against benchmarks and feeding it back is CQI. The goal is system change, not punishment of individuals.",
  },
  {
    tag: "crew conflict",
    stem: "Mid-call, you and your partner openly disagree in front of the family about whether to transport. What is the MOST appropriate way to handle it?",
    choices: [
      "Defer entirely to whoever has the most years of field service",
      "Ask the family which of the two options they would prefer",
      "Continue the discussion so the family hears both viewpoints",
      "Step aside briefly, resolve it privately, then state one plan",
    ],
    answer: 3,
    why: "Public crew conflict destroys the family's confidence and wastes time. Take it out of earshot, decide (medical control if needed), then present a single unified plan.",
  },
])

/* ------------------------------------------------------------------ */
/* Chapter 12 — Principles of Pharmacology                            */
/* ------------------------------------------------------------------ */

const c12 = exam(12, [
  {
    tag: "six rights",
    stem: "Before assisting a patient with nitroglycerin you confirm patient, medication, dose, route, time, and documentation. These are the:",
    choices: [
      "Six components of a complete SAMPLE history",
      "Six elements of informed consent for medications",
      "Six rights of medication administration",
      "Six indications required by online medical control",
    ],
    answer: 2,
    why: "Right patient, medication, dose, route, time, and documentation. Every right you skip is a medication error waiting to be discovered on the chart.",
  },
  {
    tag: "concentration math",
    stem: "Your kit carries epinephrine 1 mg/mL (1:1000). An adult in anaphylaxis needs 0.3 mg IM. How much do you draw up?",
    choices: [
      "0.3 mL of the 1 mg/mL concentration",
      "3 mL of the 1 mg/mL concentration",
      "0.03 mL of the 1 mg/mL concentration",
      "1 mL of the 1 mg/mL concentration",
    ],
    answer: 0,
    why: "1 mg/mL means 0.3 mg occupies 0.3 mL. Drawing 3 mL would deliver 3 mg — a tenfold overdose in a patient already flooded with catecholamines.",
  },
  {
    tag: "concentration trap",
    stem: "You are handed a vial labeled epinephrine 0.1 mg/mL (1:10,000) and asked for the 0.3-mg adult IM anaphylaxis dose. What is the MOST appropriate action?",
    choices: [
      "Give 0.3 mL of the 0.1 mg/mL vial to deliver the ordered dose",
      "Obtain the 1 mg/mL (1:1000) vial or auto-injector for the IM dose",
      "Give the entire 10-mL vial IM, since it contains only 1 mg total",
      "Give 0.3 mL now and repeat it twice to reach the ordered dose",
    ],
    answer: 1,
    why: "0.1 mg/mL (1:10,000) is the IV cardiac-arrest concentration; 0.3 mL of it is 0.03 mg — one tenth of the dose. IM anaphylaxis dosing comes from the 1 mg/mL vial.",
  },
  {
    tag: "routes",
    stem: "Of the routes below, which provides the FASTEST onset for a medication an EMT may give?",
    choices: [
      "An oral tablet swallowed with a small sip of water",
      "A subcutaneous injection into the abdominal tissue",
      "A rectal suppository inserted past the sphincter",
      "An aerosolized bronchodilator inhaled by mouth",
    ],
    answer: 3,
    why: "Inhaled medication reaches the alveolar capillary bed almost immediately. Oral is the slowest, and subcutaneous absorption depends on perfusion the patient may not have.",
  },
  {
    tag: "medication forms",
    stem: "Albuterol supplied for a small-volume nebulizer is an example of which medication form?",
    choices: [
      "A liquid solution intended for aerosolized inhalation",
      "A gel intended for absorption across the buccal mucosa",
      "A suspension that must be shaken vigorously before use",
      "A fine powder that must be reconstituted before delivery",
    ],
    answer: 0,
    why: "Nebulized albuterol is a premixed liquid solution. Oral glucose is the gel, and metered-dose inhalers are suspensions that require shaking.",
  },
  {
    tag: "contraindications",
    stem: "A 58-year-old with chest pain took sildenafil 8 hours ago. BP is 128/76 and he has his own nitroglycerin. What is the MOST appropriate action?",
    choices: [
      "Assist with one nitroglycerin tablet and recheck the pressure",
      "Assist with nitroglycerin, because the pressure is adequate",
      "Withhold the nitroglycerin and contact medical control",
      "Assist with two tablets, since the drug was taken hours ago",
    ],
    answer: 2,
    why: "Phosphodiesterase inhibitors plus nitrates can cause profound, refractory hypotension for 24 to 48 hours depending on the drug. Withhold and consult.",
  },
  {
    tag: "aspirin",
    stem: "Which finding is a contraindication to giving aspirin to a chest-pain patient?",
    choices: [
      "A history of stable angina treated with nitroglycerin",
      "A documented aspirin allergy with prior facial swelling",
      "Current use of a daily 81-mg aspirin every morning",
      "A reported episode of heartburn after eating spicy food",
    ],
    answer: 1,
    why: "True allergy, active GI bleeding, or inability to swallow are the stoppers. Home low-dose aspirin does not block the chewed loading dose.",
  },
  {
    tag: "medication integrity",
    stem: "During your rig check you find an epinephrine auto-injector that expired last month and an albuterol vial that looks cloudy. What is the MOST appropriate action?",
    choices: [
      "Keep the auto-injector as a backup and discard the albuterol",
      "Use both, since printed expiration dates are conservative",
      "Keep both and note their condition on the checklist sheet",
      "Remove both from service and replace them before the shift",
    ],
    answer: 3,
    why: "Expired, discolored, or cloudy medication is out of service. \"Right medication\" also means intact, in date, and clear.",
  },
  {
    tag: "assist vs administer",
    stem: "Medical control authorizes you to help a wheezing asthmatic use her own prescribed inhaler. This is BEST described as:",
    choices: [
      "Assisting a patient with her own prescribed medication",
      "Administering a medication carried on the ambulance",
      "Practicing outside the standard EMT scope of practice",
      "A peer-assisted administration requiring a paramedic",
    ],
    answer: 0,
    why: "Patient-assisted means the prescription belongs to the patient. You still verify the six rights, that it is truly hers, in date, and indicated right now.",
  },
])

/* ------------------------------------------------------------------ */
/* Chapter 19 — Gastrointestinal and Urologic Emergencies             */
/* ------------------------------------------------------------------ */

const c19 = exam(19, [
  {
    tag: "AAA vs GI bleed",
    stem: "A 70-year-old smoker has sudden tearing back pain, a pulsatile mass above the umbilicus, unequal femoral pulses, and a BP of 84/50. These findings MOST suggest:",
    choices: [
      "Upper gastrointestinal bleeding from a gastric ulcer",
      "An abdominal aortic aneurysm with impending rupture",
      "Acute pancreatitis with retroperitoneal inflammation",
      "Renal colic from an obstructing ureteral calculus",
    ],
    answer: 1,
    why: "Tearing pain plus a pulsatile mass plus unequal distal pulses plus hypotension is AAA. Ulcer bleeds show hematemesis or melena, never a pulsating mass.",
  },
  {
    tag: "GI bleed",
    stem: "A 55-year-old with heavy alcohol use vomits bright red blood, then passes black tarry stool. HR 122, BP 88/54, skin cool and pale. What is the MOST appropriate management?",
    choices: [
      "High-flow oxygen, position of comfort, warmth, and rapid transport",
      "Small sips of water to replace lost volume during the transport",
      "Activated charcoal to bind the blood remaining in the stomach",
      "Delay transport until a second set of vital signs has improved",
    ],
    answer: 0,
    why: "Hematemesis plus melena plus shock means varices or ulcer. You cannot fix it in the field: oxygen, warmth, suction ready, nothing by mouth, load and go.",
  },
  {
    tag: "peritonitis",
    stem: "A patient with diffuse abdominal pain lies very still with knees drawn up and refuses to be moved. This positioning MOST suggests:",
    choices: [
      "Renal colic causing constant restlessness and pacing",
      "Simple constipation relieved by repositioning the legs",
      "Anxiety-driven hyperventilation with abdominal cramps",
      "Peritoneal irritation from inflammation or leaking contents",
    ],
    answer: 3,
    why: "Peritonitis hurts with movement, so the patient freezes. Kidney stone patients writhe and cannot get comfortable — that contrast is tested constantly.",
  },
  {
    tag: "dialysis",
    stem: "A dialysis patient missed two sessions and now has crackles, jugular venous distention, swollen legs, and an SpO2 of 88%. What is the NEXT action?",
    choices: [
      "Lay him flat and elevate his legs to improve core perfusion",
      "Encourage oral fluids, because missed dialysis causes dehydration",
      "Sit him upright, apply oxygen, and transport promptly",
      "Apply a tourniquet to the arm containing the AV fistula",
    ],
    answer: 2,
    why: "Missed dialysis means volume overload and hyperkalemia. Upright, oxygen, expedite — and never take a BP in or stick the fistula arm.",
  },
  {
    tag: "renal colic",
    stem: "A 40-year-old has severe right flank pain radiating to the groin with nausea and cannot sit still. Vital signs are stable. What is the MOST appropriate action?",
    choices: [
      "Allow a position of comfort and transport for evaluation",
      "Place him supine and apply firm pressure over the flank",
      "Give oral glucose to settle the nausea during transport",
      "Withhold transport, since renal colic resolves on its own",
    ],
    answer: 0,
    why: "Field care for renal colic is supportive: comfort, calm, monitor, transport. In an older patient a \"stone\" can be an aneurysm, so keep AAA on your list.",
  },
  {
    tag: "esophageal varices",
    stem: "Which history MOST increases a patient's risk for massive esophageal variceal bleeding?",
    choices: [
      "Recent outpatient treatment for a urinary tract infection",
      "Long-standing cirrhosis from chronic alcohol abuse",
      "Chronic use of an inhaled corticosteroid for asthma",
      "A remote history of appendectomy in early childhood",
    ],
    answer: 1,
    why: "Cirrhosis causes portal hypertension, which distends esophageal veins that can exsanguinate. Expect airway compromise from the sheer volume of blood.",
  },
  {
    tag: "cholecystitis",
    stem: "A 45-year-old obese woman has right upper quadrant pain radiating to the right shoulder after a fatty meal, with nausea. This presentation MOST suggests:",
    choices: [
      "Acute appendicitis that has migrated to the upper abdomen",
      "A perforated gastric ulcer producing a rigid abdomen",
      "Pyelonephritis with marked costovertebral tenderness",
      "Acute cholecystitis with referred right shoulder pain",
    ],
    answer: 3,
    why: "Fatty meal plus RUQ pain plus right scapular referral is gallbladder. Appendicitis starts periumbilical and settles into the right lower quadrant.",
  },
  {
    tag: "appendicitis",
    stem: "A 19-year-old had periumbilical pain that is now sharp in the RLQ with rebound tenderness, a temperature of 101.2°F, and vomiting. Which action is MOST appropriate?",
    choices: [
      "Transport with nothing by mouth and monitor for shock",
      "Give oral fluids and have him walk out to the ambulance",
      "Apply deep palpation to confirm McBurney point tenderness",
      "Advise the patient to follow up at a clinic in the morning",
    ],
    answer: 0,
    why: "This is classic appendicitis heading toward rupture. Keep him NPO because surgery is likely, watch for peritonitis and sepsis, and stop digging on the exam.",
  },
  {
    tag: "urinary infection",
    stem: "An 80-year-old nursing home resident is newly confused with a temperature of 100.8°F, foul-smelling urine, and an HR of 108. What do you suspect MOST?",
    choices: [
      "A transient ischemic attack producing the new confusion",
      "Hypoglycemia following a missed afternoon insulin dose",
      "A urinary tract infection progressing toward sepsis",
      "Acute alcohol withdrawal with early delirium tremens",
    ],
    answer: 2,
    why: "In older adults a UTI often shows up as altered mental status before anything else. Fever plus tachycardia plus new confusion is a sepsis picture — check glucose too.",
  },
])

/* ------------------------------------------------------------------ */
/* Chapter 20 — Endocrine and Hematologic Emergencies                 */
/* ------------------------------------------------------------------ */

const c20 = exam(20, [
  {
    tag: "DKA",
    stem: "A 22-year-old type 1 diabetic has 3 days of vomiting, deep rapid breathing, fruity breath odor, dry mucous membranes, and a glucose of 480 mg/dL. This MOST suggests:",
    choices: [
      "Diabetic ketoacidosis with dehydration and acidosis",
      "Hypoglycemia from an accidental insulin overdose",
      "Hyperventilation syndrome from an acute panic attack",
      "Hyperosmolar coma, which is typical of type 2 diabetes",
    ],
    answer: 0,
    why: "Slow onset, Kussmaul respirations, acetone breath, dry skin, and high sugar is DKA. Hypoglycemia is fast, diaphoretic, and low.",
  },
  {
    tag: "oral glucose",
    stem: "A known diabetic is found unresponsive with snoring respirations and a glucose of 38 mg/dL. What is the MOST appropriate action?",
    choices: [
      "Place oral glucose gel between the cheek and the gum now",
      "Pour a sugary soft drink slowly into the side of the mouth",
      "Manage the airway, give oxygen, and request ALS for IV dextrose",
      "Repeat the finger stick before addressing the airway problem",
    ],
    answer: 2,
    why: "No gag, no swallow, nothing in the mouth. Oral glucose requires an awake patient who can protect the airway; otherwise airway first and ALS for dextrose or glucagon.",
  },
  {
    tag: "oral glucose",
    stem: "Which patient is the BEST candidate for oral glucose?",
    choices: [
      "An unresponsive diabetic with a glucose reading of 42 mg/dL",
      "A drowsy but alert diabetic who follows commands and swallows",
      "A seizing diabetic with clenched teeth and a glucose of 35 mg/dL",
      "A vomiting diabetic who is postictal and cannot be aroused",
    ],
    answer: 1,
    why: "Awake, oriented enough to protect the airway, and able to swallow. Every other option is an aspiration event waiting to happen.",
  },
  {
    tag: "HHNS",
    stem: "An 82-year-old type 2 diabetic is lethargic and profoundly dehydrated with a glucose of 720 mg/dL, no acetone odor, and no Kussmaul breathing. This MOST suggests:",
    choices: [
      "Diabetic ketoacidosis with a fully compensated acidosis",
      "Hypoglycemia masked by the patient's beta blocker",
      "Insulin shock following a doubled evening dose",
      "Hyperosmolar hyperglycemic nonketotic syndrome",
    ],
    answer: 3,
    why: "HHNS is very high glucose with extreme dehydration and altered mental status, but enough residual insulin to avoid ketosis — so no fruity breath and no Kussmaul.",
  },
  {
    tag: "sickle cell",
    stem: "A 16-year-old with sickle cell disease has severe bilateral leg and back pain after a soccer tournament in the heat. What is the MOST appropriate action?",
    choices: [
      "Give oxygen, keep him warm, and transport for pain control",
      "Apply cold packs to the painful extremities during transport",
      "Encourage vigorous stretching to improve local circulation",
      "Withhold oxygen, because it worsens sickling of the cells",
    ],
    answer: 0,
    why: "Vaso-occlusive crisis is triggered by hypoxia, dehydration, and cold. Oxygen, warmth, gentle handling, and transport; cold makes the sickling worse.",
  },
  {
    tag: "hemophilia",
    stem: "A hemophiliac struck his knee 2 hours ago. The joint is now swollen and tense with no break in the skin. What is the MOST appropriate action?",
    choices: [
      "Apply a proximal tourniquet to control the internal bleeding",
      "Manipulate the joint to redistribute the accumulated blood",
      "Splint it, apply cold, and transport for factor replacement",
      "Advise rest at home, because the skin remains fully intact",
    ],
    answer: 2,
    why: "Closed bleeding in hemophilia continues until clotting factor is replaced. Immobilize, cold, transport — they need factor at the hospital, not reassurance.",
  },
  {
    tag: "anticoagulants",
    stem: "An 88-year-old on warfarin fell and struck her head. She is alert with no external bleeding and denies any pain. What is the MOST appropriate action?",
    choices: [
      "Release her to family, since she is alert and uninjured",
      "Transport for evaluation and monitor mental status closely",
      "Arrange a wheelchair van for a clinic visit later today",
      "Withhold transport unless a headache develops within an hour",
    ],
    answer: 1,
    why: "An anticoagulated head strike carries real intracranial bleed risk despite a clean exam and a lucid interval. Transport and watch for deterioration.",
  },
  {
    tag: "glucometry",
    stem: "You obtain a glucose reading of 31 mg/dL on a patient who is awake, chatting normally, with warm dry skin. What is the NEXT action?",
    choices: [
      "Give oral glucose immediately based on that reading alone",
      "Document hypoglycemia and transport without any treatment",
      "Assume equipment failure and stop checking glucose entirely",
      "Repeat the test using a clean site and a fresh test strip",
    ],
    answer: 3,
    why: "The number has to fit the patient. A profoundly low reading with a normal exam suggests a sampling or strip error — recheck, then treat what you actually find.",
  },
  {
    tag: "thyroid storm",
    stem: "A patient with Graves disease stopped her medication and now has an HR of 148, a temperature of 103.4°F, agitation, and tremor. This MOST suggests:",
    choices: [
      "Thyroid storm requiring cooling and rapid transport",
      "Myxedema coma from severe thyroid hormone deficiency",
      "An Addisonian crisis caused by adrenal insufficiency",
      "Hypoglycemia produced by the missed daily medication",
    ],
    answer: 0,
    why: "Hyperthyroid crisis: tachycardia, hyperthermia, agitation, tremor. Support ABCs, begin cooling, and move — untreated thyroid storm kills.",
  },
])

/* ------------------------------------------------------------------ */
/* Chapter 21 — Allergy and Anaphylaxis                               */
/* ------------------------------------------------------------------ */

const c21 = exam(21, [
  {
    tag: "epi dose adult",
    stem: "A 30-year-old stung by a bee has hives, audible wheezing, and a BP of 78/40. Your protocol allows epinephrine 1 mg/mL. Which dose and route is MOST appropriate?",
    choices: [
      "0.15 mg IM into the lateral thigh muscle",
      "3 mg IM into the upper outer buttock muscle",
      "0.3 mg IM into the lateral thigh muscle",
      "0.3 mg subcutaneously into the abdominal wall",
    ],
    answer: 2,
    why: "Adult anaphylaxis is 0.3 mg of 1 mg/mL IM into the vastus lateralis. 0.15 mg is the pediatric dose, and subcutaneous absorbs far too slowly in shock.",
  },
  {
    tag: "epi dose peds",
    stem: "A 4-year-old (18 kg) with a peanut allergy has facial swelling, stridor, and drooling. Which epinephrine choice is MOST appropriate?",
    choices: [
      "0.15 mg IM using the pediatric auto-injector",
      "0.30 mg IM using the standard adult auto-injector",
      "0.15 mg IM repeated every 2 minutes as needed",
      "0.03 mg IM calculated from the child's body weight",
    ],
    answer: 0,
    why: "Children under roughly 30 kg get the 0.15-mg junior injector. Repeat dosing runs every 5 to 15 minutes per protocol, not every 2 minutes.",
  },
  {
    tag: "concentration",
    stem: "Your bag contains ampules labeled epinephrine 1:1000. Which statement about this concentration is correct?",
    choices: [
      "It holds 0.1 mg per mL and is used for cardiac arrest only",
      "It holds 1 mg per mL and is the IM anaphylaxis concentration",
      "It holds 10 mg per mL and must be diluted before any IM use",
      "It holds 1 mg per 10 mL, so a full ampule is given IM",
    ],
    answer: 1,
    why: "1:1000 equals 1 mg/mL. The 1:10,000 (0.1 mg/mL) syringe is the IV arrest concentration — confusing the two is the classic tenfold dosing error.",
  },
  {
    tag: "mild allergic reaction",
    stem: "A 25-year-old has itchy hives on both arms after eating shrimp. Lungs are clear, no facial swelling, BP 124/78, SpO2 99%. What is the MOST appropriate action?",
    choices: [
      "Give 0.3 mg epinephrine IM to prevent progression to shock",
      "Assist with her albuterol inhaler to open the lower airways",
      "Advise her to shower, take an antihistamine, and follow up",
      "Monitor closely, transport, and withhold epinephrine for now",
    ],
    answer: 3,
    why: "Skin-only findings with no respiratory or circulatory involvement is an allergic reaction, not anaphylaxis. Watch hard, transport, and be ready if it turns.",
  },
  {
    tag: "biphasic reaction",
    stem: "Ten minutes after epinephrine, a patient's hives and wheezing have resolved and she now asks to stay home. What is the MOST appropriate response?",
    choices: [
      "Explain that symptoms can return and strongly urge transport",
      "Accept the refusal, because the epinephrine solved the problem",
      "Give a second epinephrine dose and then release her at home",
      "Have her take diphenhydramine and call back if it recurs",
    ],
    answer: 0,
    why: "Epinephrine wears off in 10 to 20 minutes and biphasic reactions strike hours later. Anyone who receives epinephrine goes to the hospital.",
  },
  {
    tag: "repeat dose",
    stem: "Five minutes after IM epinephrine, an anaphylactic patient still has stridor and a BP of 72/40. What is the NEXT action?",
    choices: [
      "Withhold further epinephrine because of the cardiac risk",
      "Administer the patient's own oral antihistamine tablets",
      "Contact medical control for a repeat epinephrine dose",
      "Apply CPAP to force air past the swelling in the airway",
    ],
    answer: 2,
    why: "Persistent airway swelling or shock warrants a repeat dose per protocol or medical control, alongside oxygen, positioning, and rapid transport.",
  },
  {
    tag: "pharmacology",
    stem: "Why is epinephrine, rather than diphenhydramine, the first-line drug in anaphylaxis?",
    choices: [
      "It blocks histamine receptors faster than oral tablets do",
      "It rapidly reverses bronchospasm and vasodilation",
      "It stops mast cells from releasing any further histamine",
      "It reliably reverses laryngeal edema within about an hour",
    ],
    answer: 1,
    why: "Epinephrine is an alpha and beta agonist: vasoconstriction, bronchodilation, and reduced mucosal edema within minutes. Antihistamines only block receptors and are far too slow.",
  },
  {
    tag: "airway priority",
    stem: "An anaphylactic patient has a swollen tongue, a muffled voice, and an SpO2 of 84%. Epinephrine has already been given. What is the NEXT priority?",
    choices: [
      "Insert an oropharyngeal airway past the swollen tongue",
      "Obtain a full SAMPLE history before further intervention",
      "Place the patient supine with the legs elevated 12 inches",
      "Assist ventilations with a BVM and high-flow oxygen",
    ],
    answer: 3,
    why: "Airway and oxygenation ride alongside the epinephrine. Support ventilation, stage suction, and get to a team that can secure an advanced or surgical airway.",
  },
  {
    tag: "auto-injector technique",
    stem: "You are assisting a patient with her epinephrine auto-injector. Which technique is MOST appropriate?",
    choices: [
      "Press firmly into the lateral thigh and hold it several seconds",
      "Inject into the deltoid at a 15-degree angle, then withdraw",
      "Inject into the abdomen and then massage the site vigorously",
      "Press it into the buttock and remove the device immediately",
    ],
    answer: 0,
    why: "Lateral thigh, firm perpendicular push, hold per the device instructions, then brief massage. Thigh muscle gives the fastest reliable absorption.",
  },
])

/* ------------------------------------------------------------------ */
/* Chapter 22 — Toxicology                                            */
/* ------------------------------------------------------------------ */

const c22 = exam(22, [
  {
    tag: "opioid overdose",
    stem: "A 24-year-old is apneic and cyanotic with pinpoint pupils and a syringe beside him. Naloxone is available in your kit. What is the NEXT action?",
    choices: [
      "Administer intranasal naloxone before anything else is done",
      "Open the airway and ventilate with a BVM and oxygen",
      "Perform a sternal rub to attempt to arouse the patient",
      "Apply the AED pads and analyze the cardiac rhythm",
    ],
    answer: 1,
    why: "Opioids kill by apnea, so oxygenation comes first. Ventilate, then give naloxone — reversing before you oxygenate hands back a hypoxic brain.",
  },
  {
    tag: "naloxone aftercare",
    stem: "After naloxone, an opioid patient becomes combative and demands to be left alone on the sidewalk. What is the MOST appropriate action?",
    choices: [
      "Attempt de-escalation and strongly encourage transport",
      "Honor the refusal, since naloxone corrected the problem",
      "Restrain him and transport without any further discussion",
      "Give a second naloxone dose to improve his cooperation",
    ],
    answer: 0,
    why: "Naloxone wears off before many opioids do, and renarcotization can be fatal. De-escalate, involve medical control, and document the refusal discussion thoroughly.",
  },
  {
    tag: "activated charcoal",
    stem: "If your protocol permits activated charcoal, which patient is the BEST candidate?",
    choices: [
      "A drowsy adult who swallowed drain cleaner about an hour ago",
      "An unresponsive adult who is vomiting and has no gag reflex",
      "An alert adult who ingested a cup of gasoline 10 minutes ago",
      "An alert adult who swallowed a bottle of pills 20 minutes ago",
    ],
    answer: 3,
    why: "Charcoal needs an awake, airway-protecting patient and a recent ingestion. It is contraindicated for caustics and hydrocarbons and in any altered patient.",
  },
  {
    tag: "carbon monoxide",
    stem: "A family of four has headache, nausea, and dizziness after running a generator in the garage. Pulse oximetry reads 98%. What is the MOST appropriate action?",
    choices: [
      "Withhold oxygen, because the measured saturation is normal",
      "Give oral glucose to relieve the nausea and the dizziness",
      "Move all of them to fresh air and give high-flow oxygen",
      "Treat only the sickest patient and release the other three",
    ],
    answer: 2,
    why: "Standard pulse oximetry cannot distinguish carboxyhemoglobin from oxyhemoglobin, so it reads falsely high. Multiple sick people in one space means CO — everyone gets oxygen and transport.",
  },
  {
    tag: "organophosphates",
    stem: "A farmworker sprayed with pesticide has drooling, tearing, urination, diarrhea, vomiting, and wheezing. What is the NEXT action?",
    choices: [
      "Don PPE, remove clothing, decontaminate, and manage the airway",
      "Give activated charcoal to bind the pesticide already absorbed",
      "Begin high-flow oxygen before removing any of his wet clothing",
      "Load him into the ambulance and drive with the windows down",
    ],
    answer: 0,
    why: "SLUDGEM/DUMBELS is cholinergic crisis. Protect yourself first, strip and flush, then aggressive airway and suction, with atropine or auto-injectors per protocol.",
  },
  {
    tag: "alcohol withdrawal",
    stem: "A chronic drinker who stopped 3 days ago has tremors, hallucinations, an HR of 130, a temperature of 101°F, and confusion. This MOST suggests:",
    choices: [
      "Acute alcohol intoxication that will resolve with sleep",
      "Delirium tremens requiring prompt transport and monitoring",
      "Opioid withdrawal producing sympathetic hyperactivity",
      "Simple hypoglycemia caused by poor nutritional intake",
    ],
    answer: 1,
    why: "DTs peak 48 to 96 hours after the last drink and carry real mortality from seizures and dysrhythmias. Check glucose, monitor closely, and transport.",
  },
  {
    tag: "stimulants",
    stem: "A 28-year-old who used cocaine has chest pain, an HR of 138, a BP of 188/104, and heavy diaphoresis. What is the MOST appropriate action?",
    choices: [
      "Encourage him to walk to help metabolize the drug faster",
      "Apply cold packs to the chest wall to reduce the pain",
      "Withhold transport until the blood pressure normalizes",
      "Give oxygen, keep him calm, and transport promptly",
    ],
    answer: 3,
    why: "Cocaine causes coronary vasospasm and genuine infarcts in young people. Reduce stimulation, oxygen, monitor, transport, aspirin per protocol.",
  },
  {
    tag: "inhalants",
    stem: "A teenager found huffing computer duster is agitated and pacing. Which action is MOST appropriate?",
    choices: [
      "Have him walk to the ambulance to burn off the agitation",
      "Use a loud voice and firm physical control to gain compliance",
      "Keep him calm and avoid startling or struggling with him",
      "Withhold oxygen, since inhalants displace alveolar gases",
    ],
    answer: 2,
    why: "Inhalants sensitize the myocardium to catecholamines, so a struggle or a scare can trigger sudden sniffing death. Low stimulation, oxygen, gentle handling.",
  },
  {
    tag: "resources",
    stem: "You are unsure of the toxicity of a household product a toddler swallowed 5 minutes ago. What is the MOST appropriate action?",
    choices: [
      "Contact poison control while preparing the child for transport",
      "Induce vomiting with syrup of ipecac before leaving the scene",
      "Give the child milk to dilute the substance during transport",
      "Wait on scene for symptoms to appear to guide your treatment",
    ],
    answer: 0,
    why: "Poison control gives product-specific guidance in real time. Ipecac is obsolete, and waiting on scene for symptoms only loses ground.",
  },
])

/* ------------------------------------------------------------------ */
/* Chapter 23 — Behavioral Health Emergencies                         */
/* ------------------------------------------------------------------ */

const c23 = exam(23, [
  {
    tag: "organic causes",
    stem: "A 68-year-old with no psychiatric history is suddenly paranoid and combative. Which action is MOST appropriate FIRST?",
    choices: [
      "Apply soft restraints before attempting any assessment",
      "Transport him directly to a psychiatric receiving facility",
      "Assess glucose, oxygenation, and perfusion for organic causes",
      "Assume intoxication and wait for law enforcement to clear him",
    ],
    answer: 2,
    why: "New behavioral change in an older adult is medical until proven otherwise: hypoglycemia, hypoxia, infection, stroke, or drugs. Rule out the killers before you label it.",
  },
  {
    tag: "restraint",
    stem: "A violent patient must be restrained for his safety and yours. Which practice is MOST appropriate?",
    choices: [
      "Use adequate personnel, secure him supine, and monitor the airway",
      "Secure him prone with his wrists and ankles tied behind his back",
      "Use the fewest personnel possible to limit the confrontation",
      "Cover his face with a towel to keep him from spitting at the crew",
    ],
    answer: 0,
    why: "Never prone, never hog-tied, never a covered face — that is positional asphyxia. Overwhelming numbers, supine or lateral, continuous monitoring, thorough documentation.",
  },
  {
    tag: "excited delirium",
    stem: "A sweating, undressed, incoherent man with extreme strength has fought police for 10 minutes. Once controlled, he suddenly goes quiet and limp. What is the NEXT action?",
    choices: [
      "Allow him to rest quietly now that he has finally calmed down",
      "Check breathing and pulse and prepare to begin CPR",
      "Complete the restraint documentation before reassessing him",
      "Move him to the ambulance prone to prevent further struggling",
    ],
    answer: 1,
    why: "Sudden calm after excited delirium is usually arrest from acidosis and hyperthermia, not cooperation. Assess immediately and be ready to resuscitate.",
  },
  {
    tag: "suicide risk",
    stem: "Which finding MOST increases the immediate risk of a completed suicide?",
    choices: [
      "Vague statements that life is hard, made while crying",
      "A family history of depression treated with medication",
      "Recent job stress with several supportive family members",
      "A specific plan, the means at hand, and a prior attempt",
    ],
    answer: 3,
    why: "Plan plus means plus access plus a prior attempt is the high-risk cluster. Do not leave the patient alone, remove the means if it is safe, and transport.",
  },
  {
    tag: "legal authority",
    stem: "A patient threatening self-harm refuses transport, but police place him under a mental health hold. What is the MOST appropriate action?",
    choices: [
      "Transport under the hold and document the authority used",
      "Honor the refusal, since a competent adult may decline care",
      "Have him sign a refusal form before the police intervene",
      "Leave the scene and let law enforcement transport him",
    ],
    answer: 0,
    why: "A valid legal hold overrides refusal. Transport, document who authorized it and why, and use the least restrictive means that keeps everyone safe.",
  },
  {
    tag: "de-escalation",
    stem: "Which approach is MOST appropriate when interviewing an agitated psychiatric patient?",
    choices: [
      "Stand close and maintain constant, unbroken direct eye contact",
      "Correct the patient's delusional statements firmly and repeatedly",
      "Speak calmly, keep an exit available, and avoid crowding him",
      "Block the doorway so the patient cannot leave during the interview",
    ],
    answer: 2,
    why: "Calm voice, honest answers, personal space, and your own escape route. Never trap the patient, and never argue with a delusion.",
  },
  {
    tag: "scene safety",
    stem: "While you assess a depressed patient in his bedroom, he silently reaches under the mattress. What is the NEXT action?",
    choices: [
      "Grab his arm quickly and pin it against the mattress",
      "Withdraw from the room and request law enforcement",
      "Continue the interview while watching his hand closely",
      "Ask him to show you what he keeps under the mattress",
    ],
    answer: 1,
    why: "An unannounced reach into a hidden space is a weapon until proven otherwise. Leave, stage, and get police — you cannot treat anyone after you have been stabbed.",
  },
  {
    tag: "documentation",
    stem: "Which documentation is MOST appropriate for a combative patient who required restraints?",
    choices: [
      "Your conclusion that the patient was psychotic and dangerous",
      "The crew's opinion that the patient was faking his symptoms",
      "A brief statement that restraints were applied for crew safety",
      "Objective behavior, restraint type and times, and reassessments",
    ],
    answer: 3,
    why: "Quote and describe the behavior, list who was present, what was applied, when, and every airway and circulation recheck. Labels and opinions are indefensible in court.",
  },
  {
    tag: "medical mimics",
    stem: "A 30-year-old diabetic is combative and diaphoretic with slurred speech and a glucose of 44 mg/dL. He follows simple commands and can swallow. What is the MOST appropriate action?",
    choices: [
      "Give oral glucose and then reassess his mental status",
      "Restrain him first and transport to a psychiatric unit",
      "Withhold sugar until the hospital confirms the reading",
      "Use an epinephrine auto-injector to raise his glucose",
    ],
    answer: 0,
    why: "Combative plus diaphoretic plus low glucose is hypoglycemia in a behavioral costume. He can swallow, so give the gel and reassess.",
  },
])

/* ------------------------------------------------------------------ */
/* Chapter 24 — Gynecologic Emergencies                               */
/* ------------------------------------------------------------------ */

const c24 = exam(24, [
  {
    tag: "sexual assault",
    stem: "A 22-year-old reports a sexual assault 1 hour ago and has minor abrasions to her forearms. Which action is MOST appropriate?",
    choices: [
      "Have her shower and change clothes before transport for comfort",
      "Treat her injuries, discourage washing, and preserve her clothing",
      "Perform a detailed genital examination to document the injuries",
      "Delay transport until police have recorded a full statement",
    ],
    answer: 1,
    why: "You are caregiver and evidence steward. Limit the exam to what care requires, discourage washing or changing, handle clothing minimally, and keep questions few.",
  },
  {
    tag: "vaginal bleeding",
    stem: "A 28-year-old has heavy vaginal bleeding with an HR of 124, a BP of 86/50, and cool skin. What is the MOST appropriate action?",
    choices: [
      "Place a sanitary pad externally, give oxygen, and transport",
      "Pack the vaginal canal with sterile gauze to stop the bleeding",
      "Perform an internal examination to locate the bleeding source",
      "Have the patient walk to the stretcher to save scene time",
    ],
    answer: 0,
    why: "Never pack the vagina and never examine internally. External pads (count them), oxygen, warmth, supine positioning, and rapid transport.",
  },
  {
    tag: "ectopic pregnancy",
    stem: "A 26-year-old with a missed period has sudden severe left lower quadrant pain, light spotting, an HR of 130, and a BP of 78/44. This MOST suggests:",
    choices: [
      "Pelvic inflammatory disease with a developing tubal abscess",
      "An ovarian cyst rupture causing self-limited sharp pain",
      "Normal ovulation pain in a woman with irregular cycles",
      "A ruptured ectopic pregnancy with internal hemorrhage",
    ],
    answer: 3,
    why: "Childbearing age plus a missed period plus one-sided pain plus shock is a ruptured ectopic. Treat for hemorrhagic shock and transport — it is a surgical emergency.",
  },
  {
    tag: "PID",
    stem: "A 24-year-old has lower abdominal pain, fever, foul vaginal discharge, and pain when she walks. This MOST suggests:",
    choices: [
      "A ruptured ectopic pregnancy with active internal bleeding",
      "An obstructing kidney stone lodged in the lower ureter",
      "Pelvic inflammatory disease requiring transport for antibiotics",
      "Ovarian torsion producing sudden severe unilateral pain",
    ],
    answer: 2,
    why: "Fever, discharge, and a shuffling gait point to PID, which can progress to sepsis and infertility. Supportive care, privacy, and transport.",
  },
  {
    tag: "genital trauma",
    stem: "A 14-year-old girl fell astride a bicycle frame and has bleeding external genital trauma. Which action is MOST appropriate?",
    choices: [
      "Apply direct pressure with a moist dressing and protect her privacy",
      "Apply a tourniquet above the injury to control the bleeding",
      "Pack the vaginal opening with gauze soaked in sterile saline",
      "Delay all care until a female provider becomes available",
    ],
    answer: 0,
    why: "Straddle injuries bleed heavily from a vascular area: external direct pressure, trauma dressing, privacy, and a chaperone. No internal packing, ever.",
  },
  {
    tag: "privacy",
    stem: "Which action BEST protects a female patient during assessment of a gynecologic complaint?",
    choices: [
      "Ask the questions in front of family to verify her history",
      "Limit exposure, clear bystanders, and offer a chaperone",
      "Perform the assessment in the doorway for better lighting",
      "Have the entire crew present to witness the whole interview",
    ],
    answer: 1,
    why: "Minimum exposure, minimum audience, professional language, and one witness present. It protects the patient and it protects you.",
  },
  {
    tag: "pelvic pain",
    stem: "A 19-year-old has crampy midline pelvic pain on day 1 of her period, stable vital signs, and normal menstrual flow. What is the MOST appropriate action?",
    choices: [
      "Assume dysmenorrhea and advise her that transport is unnecessary",
      "Place her supine and apply firm pressure over the lower abdomen",
      "Give oral glucose to help reduce the uterine cramping pain",
      "Assess for other causes, allow comfort, and offer transport",
    ],
    answer: 3,
    why: "Even a textbook story earns a real assessment — ectopic pregnancy and appendicitis both masquerade as cramps. Pain is a symptom, not a diagnosis you get to make.",
  },
  {
    tag: "toxic shock",
    stem: "A 20-year-old who left a tampon in place for 2 days has a temperature of 103°F, an HR of 132, a BP of 82/48, and a diffuse rash. This MOST suggests:",
    choices: [
      "Pelvic inflammatory disease limited to local pelvic infection",
      "An allergic reaction to the material used in the tampon",
      "Toxic shock syndrome with early signs of septic shock",
      "Dehydration from unusually heavy menstrual blood loss",
    ],
    answer: 2,
    why: "Fever, rash, hypotension, and a retained tampon is toxic shock syndrome. Treat it like septic shock: oxygen, warmth, rapid transport.",
  },
  {
    tag: "history taking",
    stem: "Which question is MOST important when assessing a woman of childbearing age with abdominal pain?",
    choices: [
      "When was the first day of your last menstrual period",
      "How many total pregnancies have you had in your life",
      "Have you ever had surgery on your abdominal wall",
      "Do you take any over-the-counter pain medications",
    ],
    answer: 0,
    why: "LMP drives the pregnancy question, which drives your thinking about ectopic, miscarriage, and eclampsia. The rest is secondary history.",
  },
])

/* ------------------------------------------------------------------ */
/* Chapter 33 — Environmental Emergencies                             */
/* ------------------------------------------------------------------ */

const c33 = exam(33, [
  {
    tag: "heat stroke",
    stem: "A roofer collapsed after 4 hours in 98°F heat. He is confused with hot dry skin, a temperature of 105.6°F, and an HR of 136. What is the NEXT action?",
    choices: [
      "Give him an oral electrolyte solution and let him rest in shade",
      "Cover him with blankets to prevent shivering during cooling",
      "Move him to a cool area, begin active cooling, and transport rapidly",
      "Wait for his temperature to fall before moving him to the unit",
    ],
    answer: 2,
    why: "Heat stroke with altered mental status is a true emergency. Get him out of the heat, expose, wet and fan, cold packs to groin, axillae, and neck, and go.",
  },
  {
    tag: "heat exhaustion",
    stem: "A soccer player has muscle cramps, nausea, heavy sweating, an HR of 108, and completely normal mental status after a hot match. What is the MOST appropriate action?",
    choices: [
      "Move him to shade, cool him, and give oral fluids if fully alert",
      "Begin ice-water immersion to drive down his core temperature",
      "Give oral glucose gel to correct the painful muscle cramping",
      "Allow him to resume play once the cramping has eased off",
    ],
    answer: 0,
    why: "Heat exhaustion keeps its mental status: shade, rest, passive cooling, oral fluids if fully alert. Altered mental status means heat stroke and aggressive cooling.",
  },
  {
    tag: "hypothermia handling",
    stem: "You find a hiker with a core temperature of 84°F who is unresponsive with a slow, faint pulse. What is the MOST appropriate action?",
    choices: [
      "Massage his extremities vigorously to restore peripheral flow",
      "Handle him gently, insulate him, and transport with great care",
      "Place him in a hot shower to rewarm him as fast as possible",
      "Have him walk to the ambulance to generate his own body heat",
    ],
    answer: 1,
    why: "A cold myocardium fibrillates with rough handling or exertion. Remove wet clothing, insulate, warm the core first, move gently, and do not jostle him.",
  },
  {
    tag: "cold arrest",
    stem: "A hypothermic drowning victim is pulseless, apneic, cold, and stiff after 30 minutes under ice. What is the MOST appropriate action?",
    choices: [
      "Withhold resuscitation, because the rigidity confirms obvious death",
      "Perform a 5-minute assessment before deciding about starting CPR",
      "Apply the AED only, without compressions, until he is rewarmed",
      "Begin CPR and transport, because rewarming may allow survival",
    ],
    answer: 3,
    why: "Not dead until warm and dead. Cold protects the brain, so start CPR, handle gently, and let the hospital rewarm before anyone calls it.",
  },
  {
    tag: "frostbite",
    stem: "A patient has hard, white, insensate fingers after hours in subzero wind. Transport time is 20 minutes. What is the MOST appropriate action?",
    choices: [
      "Cover them loosely with dry dressings and avoid any rubbing",
      "Rub the fingers briskly to restore local blood flow quickly",
      "Immerse them in water heated to 120°F during the transport",
      "Break any blisters present to relieve the tissue pressure",
    ],
    answer: 0,
    why: "Deep frostbite: protect, splint, dry sterile dressings, no rubbing, no thaw-refreeze cycle. Controlled rewarming belongs in the hospital.",
  },
  {
    tag: "drowning",
    stem: "A drowning victim is pulled from a pool apneic but with a palpable carotid pulse. What is the NEXT action?",
    choices: [
      "Perform abdominal thrusts to expel water from the lungs",
      "Place him in a head-down position to let the water drain",
      "Begin ventilations with a BVM and suction as needed",
      "Apply CPAP immediately to force water out of the alveoli",
    ],
    answer: 2,
    why: "Hypoxia is what kills, so ventilate now. You cannot drain the lungs, and thrusts only bring up gastric contents to aspirate.",
  },
  {
    tag: "decompression sickness",
    stem: "A scuba diver ascended rapidly and 30 minutes later has joint pain, mottled skin, and dizziness. What is the MOST appropriate action?",
    choices: [
      "Sit him upright and encourage slow, deep, controlled breathing",
      "Give high-flow oxygen, keep him supine, and transport him",
      "Apply cold packs to the painful joints during the transport",
      "Have him hold his breath to help reabsorb the gas bubbles",
    ],
    answer: 1,
    why: "Decompression sickness is nitrogen bubbles in tissue. High-flow oxygen washes nitrogen out; he needs a recompression chamber, so transport per protocol.",
  },
  {
    tag: "lightning triage",
    stem: "Lightning struck a group of hikers. One is pulseless and apneic; three others are dazed with superficial burns. Where should you focus FIRST?",
    choices: [
      "The dazed patients, since the pulseless one is almost certainly dead",
      "The patient with the largest surface area of visible burns",
      "The hiker screaming loudest about severe extremity pain",
      "The pulseless patient, who has the best chance with prompt CPR",
    ],
    answer: 3,
    why: "Lightning triage is reverse triage. The apneic, pulseless patient arrested from momentary asystole and often responds to immediate CPR.",
  },
  {
    tag: "altitude illness",
    stem: "A climber at 12,000 feet has a severe headache, ataxia, vomiting, and confusion. What is the MOST appropriate action?",
    choices: [
      "Descend immediately, give oxygen, and arrange transport",
      "Rest at the current altitude and rehydrate with oral fluids",
      "Continue ascending slowly to complete his acclimatization",
      "Give oral glucose to correct the altered mental status",
    ],
    answer: 0,
    why: "Ataxia plus confusion at altitude is high-altitude cerebral edema. Descent is the treatment; oxygen only buys you time.",
  },
])

/* ------------------------------------------------------------------ */
/* Chapter 34 — Obstetrics and Neonatal Care                          */
/* ------------------------------------------------------------------ */

const c34 = exam(34, [
  {
    tag: "prolapsed cord",
    stem: "A laboring woman's membranes ruptured and you now see a pulsating loop of cord at the vaginal opening. What is the NEXT action?",
    choices: [
      "Attempt to push the cord gently back inside the vagina",
      "Insert gloved fingers to lift fetal weight off the cord",
      "Apply firm traction on the cord to speed the delivery",
      "Have her sit upright and push with every contraction",
    ],
    answer: 1,
    why: "Prolapsed cord: two gloved fingers elevate the presenting part off the cord, hips elevated or knee-chest, high-flow oxygen, moist dressing over the cord, emergency transport. Never push it back in.",
  },
  {
    tag: "nuchal cord",
    stem: "The head delivers and you see the cord looped once around the infant's neck. What is the NEXT action?",
    choices: [
      "Slip the cord gently over the head with one finger",
      "Clamp and cut the cord before delivering the shoulders",
      "Pull the infant out quickly to relieve the compression",
      "Wait for the next contraction before touching the cord",
    ],
    answer: 0,
    why: "Try to slip it over the head first. Only if it is too tight to reduce do you clamp twice, cut between the clamps, unwrap, and deliver quickly.",
  },
  {
    tag: "breech delivery",
    stem: "A woman in active labor is delivering buttocks-first and the body is out to the chest. The head has not delivered. What is the MOST appropriate action?",
    choices: [
      "Pull steadily on the trunk to deliver the retained head",
      "Have the mother stop pushing until you reach the hospital",
      "Place her supine and apply downward pressure on the fundus",
      "Support the body and make an airway with gloved fingers",
    ],
    answer: 3,
    why: "Breech: support the body, form a V with two fingers to create an air pocket at the baby's nose and mouth, never pull, and transport emergently.",
  },
  {
    tag: "eclampsia",
    stem: "A 34-week pregnant patient with a BP of 176/112, severe headache, and facial edema begins seizing. What is the NEXT action?",
    choices: [
      "Restrain her limbs to prevent injury during the seizure",
      "Place a bite block between her teeth to protect the tongue",
      "Protect the airway, position her on her left side, and transport",
      "Sit her fully upright to help lower intracranial pressure",
    ],
    answer: 2,
    why: "Eclampsia: airway and suction, left lateral recumbent, dim lights, minimal stimulation, rapid transport for magnesium and delivery.",
  },
  {
    tag: "supine hypotension",
    stem: "A 36-week pregnant trauma patient becomes pale and hypotensive after being secured supine to a long board. What is the NEXT action?",
    choices: [
      "Tilt the entire board 15 to 30 degrees toward her left side",
      "Elevate the foot of the board about 12 inches immediately",
      "Loosen the straps and allow her to sit fully upright",
      "Remove the board and let her lie prone for her comfort",
    ],
    answer: 0,
    why: "The uterus compresses the inferior vena cava when she is supine. Tilt the whole board left, or manually displace the uterus, to restore venous return.",
  },
  {
    tag: "neonatal resuscitation",
    stem: "A newborn has been dried, warmed, and stimulated but remains limp with a heart rate of 70 and gasping respirations. What is the NEXT action?",
    choices: [
      "Begin chest compressions at a rate of 120 per minute",
      "Begin positive-pressure ventilation at 40 to 60 per minute",
      "Repeat the drying and flick the soles of the feet again",
      "Give blow-by oxygen and reassess after one full minute",
    ],
    answer: 1,
    why: "Heart rate under 100 with inadequate breathing means PPV now. Compressions are added only if the rate stays under 60 after 30 seconds of effective ventilation.",
  },
  {
    tag: "meconium",
    stem: "A newborn delivers through thick green amniotic fluid and is vigorous with a strong cry and good tone. What is the MOST appropriate action?",
    choices: [
      "Perform deep tracheal suctioning before any stimulation",
      "Stimulate vigorously and then suction the stomach contents",
      "Withhold all stimulation until the airway is fully cleared",
      "Dry, warm, and monitor without deep tracheal suctioning",
    ],
    answer: 3,
    why: "A vigorous meconium-stained newborn gets routine care: warm, dry, position, bulb suction only as needed. Routine deep suctioning is no longer recommended.",
  },
  {
    tag: "postpartum hemorrhage",
    stem: "Ten minutes after delivery, the mother has continuous heavy bleeding and a soft, boggy uterus. What is the NEXT action?",
    choices: [
      "Pack the vaginal canal tightly with sterile trauma gauze",
      "Pull on the umbilical cord to deliver the retained placenta",
      "Massage the uterine fundus and allow the infant to nurse",
      "Elevate her legs and withhold oxygen until vitals are taken",
    ],
    answer: 2,
    why: "A boggy uterus is atony. Firm fundal massage plus nursing releases oxytocin and clamps the vessels. Never pack the vagina and never pull the cord.",
  },
  {
    tag: "imminent delivery",
    stem: "A multipara at 39 weeks has contractions 2 minutes apart, an urge to push, and visible crowning. The hospital is 20 minutes away. What is the MOST appropriate action?",
    choices: [
      "Prepare to deliver on scene and request additional resources",
      "Load and transport immediately with her legs held together",
      "Have her cross her legs and pant until you reach the ED",
      "Delay delivery by applying pressure against the presenting head",
    ],
    answer: 0,
    why: "Crowning means the baby is coming here. Open the OB kit, control the head, and call for a second crew so mother and newborn each get a team.",
  },
])

export const EXAM_B3: Question[] = [
  ...c2,
  ...c9,
  ...c12,
  ...c19,
  ...c20,
  ...c21,
  ...c22,
  ...c23,
  ...c24,
  ...c33,
  ...c34,
]
