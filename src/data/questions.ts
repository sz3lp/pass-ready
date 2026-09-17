import { CHAPTERS } from "./syllabus"
import { EXTRA_QUESTIONS } from "./questions-extra"
import { EXAM_B1 } from "./questions-exam-b1"
import { EXAM_B2 } from "./questions-exam-b2"
import { EXAM_B3 } from "./questions-exam-b3"
import { EXAM_B4 } from "./questions-exam-b4"

export type Question = {
  id: string
  chapter: number
  block: 1 | 2 | 3 | 4
  stem: string
  choices: string[]
  answer: number
  why: string
  tag: string
  difficulty?: "drill" | "exam"
}

type Draft = {
  stem: string
  choices: [string, string, string, string]
  answer: 0 | 1 | 2 | 3
  why: string
  tag: string
}

function pack(block: 1 | 2 | 3 | 4, chapter: number, drafts: Draft[]): Question[] {
  return drafts.map((d, i) => ({
    id: `b${block}-c${chapter}-${i + 1}`,
    chapter,
    block,
    ...d,
  }))
}

const block1: Question[] = [
  ...pack(1, 1, [
    {
      tag: "medical direction",
      stem: "Standing orders that let you give aspirin for chest pain without calling first are an example of:",
      choices: ["Online medical direction", "Offline medical direction", "Implied consent", "Continuous quality improvement"],
      answer: 1,
      why: "Protocols and standing orders are written in advance (offline). Online is real-time radio/phone orders from a physician.",
    },
    {
      tag: "roles",
      stem: "The person legally responsible for the clinical standards of an EMT service is the:",
      choices: ["Lead dispatcher", "County executive", "Medical director", "Shift captain"],
      answer: 2,
      why: "The medical director authorizes scope, protocols, and QI. Supervisors manage operations; they do not replace physician oversight.",
    },
    {
      tag: "continuum",
      stem: "Which statement best describes the EMT's role in the EMS system?",
      choices: [
        "Replace the emergency physician at the scene",
        "Provide out-of-hospital assessment, BLS care, and transport within protocol",
        "Perform RSI and surgical airways independently",
        "Only drive; care starts at the hospital",
      ],
      answer: 1,
      why: "EMTs deliver protocol-based BLS, assessment, and transport. ALS procedures sit at AEMT/paramedic unless locally extended.",
    },
    {
      tag: "QI",
      stem: "Reviewing every cardiac-arrest call for pause time and ROSC is primarily:",
      choices: ["A HIPAA violation", "Continuous quality improvement", "Online medical control", "Abandonment review"],
      answer: 1,
      why: "QI looks at system performance to improve care. It is expected, not optional gossip.",
    },
    {
      tag: "911",
      stem: "An enhanced 911 system is most useful because it:",
      choices: [
        "Automatically gives the caller's address and callback number",
        "Lets EMTs prescribe medications",
        "Replaces the need for scene size-up",
        "Guarantees ALS on every call",
      ],
      answer: 0,
      why: "E911 displays location and callback data so dispatch can send help even if the caller cannot speak.",
    },
  ]),
  ...pack(1, 5, [
    {
      tag: "prefix",
      stem: "The prefix 'brady-' in bradycardia means:",
      choices: ["Fast", "Irregular", "Slow", "Absent"],
      answer: 2,
      why: "Brady = slow. Tachy = fast. A- = without. Dys- = abnormal.",
    },
    {
      tag: "directional",
      stem: "The wrist is ______ to the elbow.",
      choices: ["Proximal", "Distal", "Medial", "Superior"],
      answer: 1,
      why: "Distal is farther from the trunk. The wrist is distal to the elbow; the shoulder is proximal.",
    },
    {
      tag: "root",
      stem: "Hepatomegaly refers to:",
      choices: ["Kidney infection", "Enlarged liver", "Small spleen", "Gallbladder stones"],
      answer: 1,
      why: "Hepat/o = liver. -megaly = enlargement.",
    },
    {
      tag: "position",
      stem: "A patient sitting upright at about 90 degrees is in the ______ position.",
      choices: ["Trendelenburg", "Prone", "Fowler", "Recovery"],
      answer: 2,
      why: "Fowler (and semi-Fowler) are sitting positions. Prone is face down. Recovery is lateral recumbent.",
    },
    {
      tag: "laterality",
      stem: "Bilateral means:",
      choices: ["On the midline only", "On both sides", "Toward the feet", "Behind the body"],
      answer: 1,
      why: "Bilateral = both sides. Unilateral = one side. Contralateral = opposite side.",
    },
  ]),
  ...pack(1, 6, [
    {
      tag: "perfusion",
      stem: "Perfusion is best defined as:",
      choices: [
        "The amount of air moved in one minute",
        "Delivery of oxygen and nutrients to cells and removal of waste via the capillary bed",
        "The pressure in the left ventricle at end-diastole",
        "The volume of blood in the veins",
      ],
      answer: 1,
      why: "Shock is a perfusion problem. Airway and BP matter because they serve cellular perfusion.",
    },
    {
      tag: "autonomic",
      stem: "Pale, sweaty skin and a fast heart rate in a hypotensive trauma patient are driven mainly by the:",
      choices: ["Parasympathetic nervous system", "Sympathetic nervous system", "Somatic nervous system", "Cerebellum"],
      answer: 1,
      why: "Sympathetic 'fight or flight' dumps catecholamines: tachycardia, vasoconstriction, diaphoresis — compensated shock.",
    },
    {
      tag: "airway anatomy",
      stem: "The leaf-shaped structure that protects the trachea during swallowing is the:",
      choices: ["Uvula", "Carina", "Epiglottis", "Cricoid ring"],
      answer: 2,
      why: "The epiglottis covers the glottis when you swallow. The carina is the tracheal split.",
    },
    {
      tag: "organs",
      stem: "Which organ is solid and bleeds heavily when lacerated?",
      choices: ["Stomach", "Small bowel", "Spleen", "Gallbladder"],
      answer: 2,
      why: "Solid organs (liver, spleen, kidney, pancreas) hemorrhage. Hollow organs spill contents and inflame.",
    },
    {
      tag: "ventilation",
      stem: "Minute ventilation equals:",
      choices: [
        "Tidal volume × respiratory rate",
        "Dead space × heart rate",
        "Vital capacity − residual volume",
        "PaO2 × FiO2",
      ],
      answer: 0,
      why: "Minute ventilation = TV × RR. Fast shallow breathing can still hypoventilate because TV is mostly dead space.",
    },
  ]),
  ...pack(1, 8, [
    {
      tag: "power lift",
      stem: "The power lift uses:",
      choices: [
        "A bent waist and straight knees",
        "A locked back, bent knees, and the load close to your body",
        "Twisting while the stretcher rises",
        "One person lifting more than half if they are taller",
      ],
      answer: 1,
      why: "Protect the lumbar spine: load close, legs do the work, no twist.",
    },
    {
      tag: "emergency move",
      stem: "An emergency move is justified when:",
      choices: [
        "The patient is uncomfortable on the floor",
        "You need a better photo for documentation",
        "Scene danger or you cannot access a life threat (fire, traffic, arrest in a wreck)",
        "The hospital asked you to hurry",
      ],
      answer: 2,
      why: "Emergency moves accept spinal risk to escape immediate danger or start CPR. Urgent moves are for clinical deterioration; non-urgent wait for full packaging.",
    },
    {
      tag: "stair chair",
      stem: "A stair chair is the better tool when:",
      choices: [
        "The patient is in cardiac arrest",
        "A conscious patient must come down narrow stairs and can sit",
        "You suspect an unstable pelvis",
        "You need full SMR on a long board",
      ],
      answer: 1,
      why: "Stair chairs are for sitting, breathing patients on stairs. Arrest and unstable trauma need a stretcher/board plan.",
    },
    {
      tag: "draw sheet",
      stem: "When sliding a patient from bed to stretcher you should:",
      choices: [
        "Pull by the arms to save time",
        "Use a draw sheet/slide and keep the patient close, knees bent",
        "Have one EMT do it to reduce crowding",
        "Twist your torso rather than move your feet",
      ],
      answer: 1,
      why: "Reduce friction and keep the load close. Never yank extremities as the primary lift.",
    },
  ]),
  ...pack(1, 10, [
    {
      tag: "sick-not-sick",
      stem: "The first 10 seconds of a medical call should answer:",
      choices: [
        "The exact diagnosis",
        "Whether the patient looks sick or not-sick and if ABCs are a problem now",
        "Which hospital has the shortest wait",
        "The patient's insurance status",
      ],
      answer: 1,
      why: "KCEMS drills Sick/Not-Sick: general impression plus obvious life threats before a long history.",
    },
    {
      tag: "primary",
      stem: "Which is part of the primary survey, not the detailed secondary?",
      choices: [
        "Full SAMPLE history",
        "Orthostatic vital signs",
        "Massive hemorrhage control and airway",
        "Measuring a mid-shaft femur for a traction splint",
      ],
      answer: 2,
      why: "Primary = find/fix kill-you-now problems. History and splinting wait unless they are the life threat.",
    },
    {
      tag: "avpu",
      stem: "A patient who only opens eyes when you pinch the nail bed is:",
      choices: ["Alert", "Responsive to verbal", "Responsive to pain", "Unresponsive"],
      answer: 2,
      why: "P on AVPU is painful stimulus. Unresponsive is no response to pain.",
    },
    {
      tag: "reassess",
      stem: "Unstable patients should be reassessed at least every:",
      choices: ["2 minutes", "5 minutes", "15 minutes", "30 minutes"],
      answer: 1,
      why: "Unstable: every 5 minutes. Stable: every 15. After every intervention, recheck the thing you treated.",
    },
    {
      tag: "opqrst",
      stem: "The 'R' in OPQRST asks:",
      choices: ["Respirations", "Region / radiation", "Reflexes", "Rate of the pulse"],
      answer: 1,
      why: "Onset, Provocation/palliation, Quality, Region/radiation, Severity, Time.",
    },
    {
      tag: "scene",
      stem: "You arrive to yelling and a knife on the porch. Your first action is:",
      choices: [
        "Begin the primary survey at the door",
        "Stage for law enforcement and do not enter an unsecured scene",
        "Grab the knife so nobody else gets hurt",
        "Have your partner walk in while you radio",
      ],
      answer: 1,
      why: "Scene safety is first. Dead heroes help no patients.",
    },
  ]),
  ...pack(1, 11, [
    {
      tag: "opa",
      stem: "An OPA is contraindicated if the patient:",
      choices: ["Is unresponsive", "Has a gag reflex", "Needs oxygen", "Is apneic"],
      answer: 1,
      why: "Gag + OPA = vomit. Use NPA (if no facial/basilar trauma) or just jaw-thrust/BVM.",
    },
    {
      tag: "suction",
      stem: "Maximum adult suction time before pausing to ventilate is about:",
      choices: ["5 seconds", "15 seconds", "30 seconds", "Until the canister fills"],
      answer: 1,
      why: "Adults ~15 sec, children ~10, infants ~5. Suction on the way out, then oxygenate.",
    },
    {
      tag: "nrb",
      stem: "A non-rebreather mask should be run at:",
      choices: ["1–2 L/min", "4 L/min", "6 L/min", "10–15 L/min with the reservoir inflated"],
      answer: 3,
      why: "NRB is high-flow. If the bag collapses, increase flow. Never run an NRB at cannula rates.",
    },
    {
      tag: "bvm rate",
      stem: "An apneic adult with a pulse is ventilated:",
      choices: [
        "1 breath every 5–6 seconds",
        "1 breath every 2 seconds",
        "12 breaths stacked together then a pause",
        "Only if SpO2 is under 80%",
      ],
      answer: 0,
      why: "Adult with pulse: 10–12/min (every 5–6 sec). Over-bagging drops venous return and hurts arrest/ROS C patients.",
    },
    {
      tag: "npa contra",
      stem: "Skip the NPA if you see:",
      choices: [
        "A gag reflex",
        "Snoring respirations",
        "Battle signs and CSF from the ear after head trauma",
        "Clenched teeth",
      ],
      answer: 2,
      why: "Basilar skull / midface trauma: NPA can enter the cranial vault. Gag is actually an NPA indication vs OPA.",
    },
  ]),
  ...pack(1, 13, [
    {
      tag: "definition",
      stem: "Shock is:",
      choices: [
        "Always low blood pressure",
        "Inadequate tissue perfusion",
        "Any heart rate over 100",
        "Anxiety after a scary call",
      ],
      answer: 1,
      why: "Hypotension is late. Compensated shock can have a normal BP with tachycardia and pale skin.",
    },
    {
      tag: "obstructive",
      stem: "Which cause is obstructive shock?",
      choices: ["GI bleed", "Anaphylaxis", "Tension pneumothorax", "Massive MI with pump failure"],
      answer: 2,
      why: "Obstructive: PE, tamponade, tension pneumo — mechanical blockage of flow. Massive MI is cardiogenic. Anaphylaxis is distributive.",
    },
    {
      tag: "decompensated",
      stem: "A classic decompensated-shock finding is:",
      choices: [
        "Restlessness with a strong radial pulse",
        "Falling blood pressure after compensation fails",
        "Warm dry skin in hypovolemia",
        "Bradycardia in a bleeding adult",
      ],
      answer: 1,
      why: "When vasoconstriction and tachycardia cannot keep SBP up, BP falls — decompensated / hypotensive shock.",
    },
    {
      tag: "treatment",
      stem: "General BLS shock package includes:",
      choices: [
        "Oral fluids and walking to the ambulance",
        "Oxygen, keep warm, supine, rapid transport, control bleeding",
        "Trendelenburg and PASG on every medical patient",
        "Withholding oxygen so you do not hide hypoxia",
      ],
      answer: 1,
      why: "Stop the bleed, oxygenate, preserve heat, do not delay transport. No PO fluids on a shocky abdomen.",
    },
    {
      tag: "distributive",
      stem: "Warm, flushed skin and hypotension after a bee sting suggest:",
      choices: ["Cardiogenic shock", "Hypovolemic shock", "Distributive (anaphylactic) shock", "Neurogenic shock from a broken femur"],
      answer: 2,
      why: "Anaphylaxis vasodilation + capillary leak. Skin is often warm/red/urticarial, unlike cool pale hypovolemia.",
    },
  ]),
  ...pack(1, 14, [
    {
      tag: "rate",
      stem: "Adult CPR compression rate is:",
      choices: ["60–80/min", "80–100/min", "100–120/min", "As fast as possible"],
      answer: 2,
      why: "AHA: 100–120. Faster than 120 reduces fill time and depth.",
    },
    {
      tag: "depth",
      stem: "Adult compression depth is:",
      choices: ["1 inch", "At least 2 inches (about 5 cm), not more than 2.4 inches", "3 inches on every patient", "Until you hear a rib crack"],
      answer: 1,
      why: "2–2.4 inches. Ribs may crack; that is not the goal or the depth cue.",
    },
    {
      tag: "aed",
      stem: "If the AED says 'shock advised' you:",
      choices: [
        "Check a pulse first for 30 seconds",
        "Clear, shock, then immediately resume compressions",
        "Ventilate 2 minutes then shock",
        "Wait for ALS to confirm",
      ],
      answer: 1,
      why: "Minimize pause. Shock then CPR for 2 minutes before the next analysis.",
    },
    {
      tag: "ratio",
      stem: "Adult CPR without an advanced airway is:",
      choices: ["15:2", "30:2", "Continuous compressions only, never ventilate", "5:1"],
      answer: 1,
      why: "30:2 for adults (and for children if you are a single rescuer). Advanced airway → continuous compressions + 1 breath every 6 sec.",
    },
    {
      tag: "pulse check",
      stem: "A pulse check during BLS should take no more than:",
      choices: ["3 seconds", "10 seconds", "20 seconds", "Until you are sure, even if 45 seconds"],
      answer: 1,
      why: "If unsure in 10 seconds, start compressions. Dead time kills.",
    },
  ]),
  ...pack(1, 25, [
    {
      tag: "moi",
      stem: "A fall from a 24-foot roof in an adult is treated as:",
      choices: [
        "Minor MOI if they walk to you",
        "Significant MOI until proven otherwise",
        "Medical until they complain of pain",
        "A reason to skip SMR because they are talking",
      ],
      answer: 1,
      why: "Height, intrusion, ejection, and death in the same compartment are classic significant MOIs. Talking does not clear the spine.",
    },
    {
      tag: "golden",
      stem: "The 'platinum 10 minutes' idea means:",
      choices: [
        "Stay on scene 10 minutes extra to splint everything",
        "Limit on-scene time in critical trauma so they reach surgery faster",
        "Wait 10 minutes to see if BP improves",
        "The AED must shock within 10 minutes",
      ],
      answer: 1,
      why: "Critical trauma is a surgical disease. Scene work should be life threats only, then roll.",
    },
    {
      tag: "multisystem",
      stem: "The highest priority trauma patient is usually the one with:",
      choices: [
        "An isolated closed finger fracture",
        "A patent airway, normal vitals, isolated ankle sprain",
        "Altered mental status, unstable chest, and a rigid abdomen after a MVC",
        "A 2 cm forearm laceration that has stopped bleeding",
      ],
      answer: 2,
      why: "Multi-system, abnormal mental status, and unstable vitals = load-and-go.",
    },
    {
      tag: "index",
      stem: "Using physiologic criteria (GCS, SBP, RR) to choose a trauma center is:",
      choices: [
        "Ignoring mechanism",
        "Field triage — physiology outranks a pretty-looking patient",
        "Only for paramedics",
        "A reason to stay and play",
      ],
      answer: 1,
      why: "CDC/ACS field triage: vitals and GCS first, then anatomy, then MOI, then special considerations.",
    },
  ]),
  ...pack(1, 26, [
    {
      tag: "arterial",
      stem: "Spurting, bright red bleeding is typically:",
      choices: ["Capillary", "Venous", "Arterial", "Lymphatic"],
      answer: 2,
      why: "Arterial = high pressure, bright, spurting. Venous = darker, steady. Capillary = oozing.",
    },
    {
      tag: "tq",
      stem: "A commercial tourniquet should be placed:",
      choices: [
        "Over the wound",
        "2–3 inches proximal to the wound, not on a joint, tightened until bleeding stops",
        "Loosely as a reminder",
        "Only in the hospital",
      ],
      answer: 1,
      why: "High and tight enough to stop arterial flow. Write the time. Do not dabble with a loose TQ.",
    },
    {
      tag: "junctional",
      stem: "Bleeding from the groin that a tourniquet cannot reach is treated with:",
      choices: ["A second TQ on the ankle", "Wound packing and direct pressure", "Ice only", "Elevation and a bandaid"],
      answer: 1,
      why: "Junctional bleeds: pack (hemostatic if you have it) and hold. TQ needs a compressible limb.",
    },
    {
      tag: "internal",
      stem: "A rigid, distended abdomen after a steering-wheel impact with pale skin suggests:",
      choices: ["Anxiety", "Internal hemorrhage until proven otherwise", "Food poisoning", "A simple muscle strain"],
      answer: 1,
      why: "Blunt abdominal trauma + shock picture = bleed into the belly. High-flow O2, warmth, rapid transport.",
    },
    {
      tag: "epistaxis",
      stem: "Uncomplicated nosebleed in a sitting, alert patient:",
      choices: [
        "Lean them back so it drains into the throat",
        "Pinch the fleshy part of the nose and lean forward",
        "Pack the skull with an NPA",
        "Give nitroglycerin",
      ],
      answer: 1,
      why: "Forward + direct pressure. Tilting back creates an airway problem.",
    },
  ]),
  ...pack(1, 27, [
    {
      tag: "evisceration",
      stem: "Abdominal evisceration care:",
      choices: [
        "Push the bowel back in and wrap dry gauze",
        "Cover with a moist sterile dressing, then an occlusive layer, do not replace organs",
        "Rinse with hydrogen peroxide",
        "Walk the patient to reduce pressure",
      ],
      answer: 1,
      why: "Moist sterile + keep warm/moist, usually occlusive over that. Never shove viscera back.",
    },
    {
      tag: "burns",
      stem: "Using the rule of nines, the entire anterior trunk of an adult is about:",
      choices: ["4.5%", "9%", "18%", "36%"],
      answer: 2,
      why: "Anterior trunk 18%, posterior 18%, each adult arm 9%, each leg 18%, head 9%, groin 1%.",
    },
    {
      tag: "critical burn",
      stem: "Which burn is most concerning for airway?",
      choices: [
        "Small superficial sunburn on the back",
        "Singed nasal hairs, soot in sputum, hoarse voice after a house fire",
        "1% partial-thickness on the forearm",
        "A healed scar from last year",
      ],
      answer: 1,
      why: "Closed-space smoke + voice change = impending airway disaster. High-flow O2 and ALS/destination planning.",
    },
    {
      tag: "occlusive",
      stem: "A sucking chest wound gets:",
      choices: [
        "A dry 4×4 only",
        "An occlusive dressing (often vented / three-sided per protocol)",
        "An ice pack inside the hole",
        "A tourniquet around the chest",
      ],
      answer: 1,
      why: "Seal the hole so air stops entering the pleural space. Watch for tension and burp the seal if they crash.",
    },
    {
      tag: "impaled",
      stem: "An impaled object in the thigh with bleeding controlled:",
      choices: [
        "Remove it so you can pack",
        "Stabilize in place unless it blocks CPR or the airway",
        "Push it through and out the other side",
        "Cut it flush with the skin every time",
      ],
      answer: 1,
      why: "Leave it. Removal can unleash hemorrhage. Exceptions: airway, CPR, or the object prevents transport in rare cases per protocol.",
    },
  ]),
  ...pack(1, 28, [
    {
      tag: "neck",
      stem: "An open neck wound is covered with:",
      choices: [
        "A moist 4×4 only",
        "An occlusive dressing to prevent air embolism",
        "A tourniquet around the trachea",
        "Nothing — let it clot",
      ],
      answer: 1,
      why: "Large neck veins can suck air. Occlusive seal, direct pressure, do not clamp blindly.",
    },
    {
      tag: "eye",
      stem: "A chemical splash to the eye:",
      choices: [
        "Cover both eyes and delay irrigation until the hospital",
        "Irrigate immediately and continuously toward the outside canthus",
        "Neutralize acid with a base on scene",
        "Patch tightly and withhold water",
      ],
      answer: 1,
      why: "Time-to-water matters. Irrigate away from the other eye. Do not play chemist.",
    },
    {
      tag: "impaled eye",
      stem: "Impaled object in the globe:",
      choices: [
        "Remove it and pressure-patch",
        "Stabilize the object and cover both eyes to limit conjugate movement",
        "Have them look around to test extraocular muscles",
        "Apply a doughnut only to the uninjured eye",
      ],
      answer: 1,
      why: "Both eyes covered because they move together. Do not remove globe-impaled objects.",
    },
    {
      tag: "face bleed",
      stem: "Facial trauma with blood in the mouth in a supine patient. Priority is:",
      choices: [
        "A perfect c-collar before anything else",
        "Airway — suction, position, maybe roll if needed to keep the airway clear",
        "Finding every loose tooth for the dentist",
        "Ice packs only",
      ],
      answer: 1,
      why: "Airway beats cosmetics. Suction aggressively. SMR still matters but a dirty airway kills first.",
    },
  ]),
  ...pack(1, 29, [
    {
      tag: "cushing",
      stem: "Cushing's triad (late ICP) is:",
      choices: [
        "Tachycardia, hypotension, tachypnea",
        "Hypertension, bradycardia, irregular/abnormal respirations",
        "Fever, stiff neck, petechiae",
        "Hypotension, muffled heart sounds, JVD",
      ],
      answer: 1,
      why: "Rising ICP: high BP, slow HR, weird breathing. Beck's triad is tamponade.",
    },
    {
      tag: "basilar",
      stem: "Battle signs and raccoon eyes suggest:",
      choices: ["Simple concussion only", "Basilar skull fracture", "Mandible dislocation", "Allergic shiners"],
      answer: 1,
      why: "Late signs of basilar skull fracture. Also: CSF rhinorrhea/otorrhea. No NPA.",
    },
    {
      tag: "smr",
      stem: "SMR is most clearly indicated when:",
      choices: [
        "A patient has neck pain and midline tenderness after a high-speed MVC",
        "A patient twisted an ankle on a curb with no trauma to the head/neck",
        "Someone has a headache from the flu",
        "You always board every medical call",
      ],
      answer: 0,
      why: "MOI + symptoms/signs. Not every patient. Not zero patients with real neck findings.",
    },
    {
      tag: "helmet",
      stem: "A full-face helmet comes off if:",
      choices: [
        "You always leave it because removal is never allowed",
        "It prevents airway care or you cannot assess/ventilate, using a two-person technique",
        "The patient asks because it is uncool",
        "You want a souvenir",
      ],
      answer: 1,
      why: "Airway wins. One person holds c-spine, one expands and slides the helmet off.",
    },
    {
      tag: "concussion",
      stem: "A brief LOC after a helmet-to-helmet hit who is now GCS 15 can still have:",
      choices: [
        "Nothing — GCS 15 clears the brain",
        "Concussion and a delayed intracranial bleed — they still need evaluation",
        "Only a spine injury, never a brain injury",
        "Automatic indication for oral glucose",
      ],
      answer: 1,
      why: "Talk-and-die epidurals exist. Any LOC / amnesia / bad MOI gets a hospital eval.",
    },
  ]),
]

const block2: Question[] = [
  ...pack(2, 15, [
    {
      tag: "nature",
      stem: "NOI stands for:",
      choices: ["Number of injuries", "Nature of illness", "National oxygen index", "New onset ischemia"],
      answer: 1,
      why: "Medical calls have a nature of illness; trauma has a mechanism of injury.",
    },
    {
      tag: "index",
      stem: "A medical patient who is pale, diaphoretic, and barely answering is:",
      choices: ["Not-sick — they are talking", "Sick — treat ABCs and shorten the scene", "A refusal until proven otherwise", "Only a psych patient"],
      answer: 1,
      why: "Sick/not-sick is about perfusion and work of breathing, not whether they can mumble a sentence.",
    },
    {
      tag: "history",
      stem: "SAMPLE's 'M' is:",
      choices: ["MOI", "Medications", "Mental status", "Murmurs"],
      answer: 1,
      why: "Signs/symptoms, Allergies, Medications, Past history, Last oral intake, Events.",
    },
  ]),
  ...pack(2, 16, [
    {
      tag: "asthma",
      stem: "A quiet chest in a tired asthmatic is:",
      choices: ["Reassuring — bronchospasm resolved", "An ominous sign of failing ventilation", "Proof they need a paper bag", "An indication to withhold oxygen"],
      answer: 1,
      why: "Wheeze needs airflow. Silence + exhaustion = imminent respiratory failure. BVM and ALS.",
    },
    {
      tag: "cpap",
      stem: "CPAP is most useful for:",
      choices: [
        "Apneic patients",
        "Alert patients with pulmonary edema / severe respiratory distress who can cooperate",
        "Unresponsive opioid OD as the only treatment",
        "Every nosebleed",
      ],
      answer: 1,
      why: "CPAP needs a breathing, reasonably cooperative patient. Apnea gets a BVM.",
    },
    {
      tag: "position",
      stem: "A patient with CHF sitting bolt upright, gurgling, pink froth:",
      choices: [
        "Lay them flat to help BP",
        "Keep them sitting, high-flow O2 or CPAP per protocol, rapid ALS",
        "Give oral glucose",
        "Encourage them to walk it off",
      ],
      answer: 1,
      why: "Upright position is treatment. Flat them and they drown in their own fluid.",
    },
    {
      tag: "epiglottitis",
      stem: "A drooling child in tripod with a sudden high fever. You should NOT:",
      choices: [
        "Keep them calm in a position of comfort",
        "Stick a tongue blade in to 'have a look'",
        "Give oxygen if tolerated in a non-threatening way",
        "Transport gently to a definitive hospital",
      ],
      answer: 1,
      why: "Do not instrument the airway in suspected epiglottitis. Agitation can complete the obstruction.",
    },
  ]),
  ...pack(2, 17, [
    {
      tag: "acs",
      stem: "Aspirin in suspected ACS works mainly by:",
      choices: ["Dropping blood pressure", "Antiplatelet effect to limit clot growth", "Reversing opiates", "Opening the airway"],
      answer: 1,
      why: "Chewable ASA 162–325 mg (if not contraindicated) is about platelets, not pain relief.",
    },
    {
      tag: "ntg",
      stem: "Hold nitroglycerin if:",
      choices: [
        "The patient has chest pain and a SBP of 148",
        "They took sildenafil last night and their SBP is 92",
        "They have a prescribed bottle and a BP of 160/90",
        "Medical direction says give it",
      ],
      answer: 1,
      why: "PDE-5 inhibitors + NTG can crash BP. Also hold for hypotension / some right-sided MIs per protocol.",
    },
    {
      tag: "right vs left",
      stem: "Pump-failure cardiogenic shock after a big anterior MI looks like:",
      choices: [
        "Warm dry skin and bounding pulses",
        "Hypotension, cool skin, pulmonary edema, maybe JVD",
        "Urticaria and wheeze only",
        "Isolated ankle swelling without dyspnea",
      ],
      answer: 1,
      why: "The left ventricle cannot move volume — backup to lungs + poor forward flow.",
    },
    {
      tag: "aed cardiac",
      stem: "ROSC after a shock. Next BLS priority is:",
      choices: [
        "Sit them up immediately and walk",
        "Support airway/breathing, recheck pulse often, be ready to restart CPR",
        "Give oral fluids",
        "Turn off oxygen to 'test' them",
      ],
      answer: 1,
      why: "Post-arrest is fragile. ABCs, oxygen, don't celebrate so hard you miss rearrest.",
    },
  ]),
  ...pack(2, 18, [
    {
      tag: "stroke",
      stem: "Cincinnati Prehospital Stroke Scale includes:",
      choices: [
        "Pronator drift, facial droop, slurred speech",
        "Babinski, clonus, and temperature",
        "BP in all four limbs only",
        "BGL is not relevant in stroke mimics",
      ],
      answer: 0,
      why: "Face, arm, speech. Always check glucose — hypo mimics stroke.",
    },
    {
      tag: "seizure",
      stem: "During the tonic-clonic phase you should:",
      choices: [
        "Force a bite stick between the teeth",
        "Protect from injury, nothing in the mouth, recovery position after, suction as needed",
        "Hold them down on their back and pin the arms",
        "Give oral glucose while they convulse",
      ],
      answer: 1,
      why: "Protect, time it, oxygen when you can, recovery position postictal. Never jam objects in the mouth.",
    },
    {
      tag: "aeio-t",
      stem: "AEIOU-TIPS is a memory tool for:",
      choices: ["Fracture types", "Causes of altered mental status", "Burn depth", "APGAR scoring"],
      answer: 1,
      why: "Alcohol, Epilepsy/electrolytes, Insulin, Opiates/oxygen, Uremia, Trauma/temp, Infection, Poison, Stroke/shock.",
    },
    {
      tag: "last known",
      stem: "For stroke destination, the most important clock is:",
      choices: [
        "When 911 was dialed only",
        "Last known well / last seen normal",
        "When they last ate pizza",
        "ETA of the fire engine",
      ],
      answer: 1,
      why: "Thrombolysis/thrombectomy windows run from last known well, not from dispatch.",
    },
  ]),
  ...pack(2, 30, [
    {
      tag: "flail",
      stem: "Flail chest is:",
      choices: [
        "Two or more ribs broken in two or more places with paradoxical motion",
        "A single rib sprain",
        "Any bruise on the chest",
        "Asthma after trauma",
      ],
      answer: 0,
      why: "Segment floats opposite to the rest of the chest. Support ventilation; bulky dressing per protocol; do not strap so tight you splint the whole thorax.",
    },
    {
      tag: "tension",
      stem: "Tracheal deviation, JVD, absent breath sounds on one side, crashing BP:",
      choices: ["Simple rib sprain", "Tension pneumothorax", "Hyperventilation syndrome", "Stable angina"],
      answer: 1,
      why: "Air under pressure kills venous return. BLS: O2, unseal a three-sided dressing if you caused it, rapid ALS for needle decompression.",
    },
    {
      tag: "tamponade",
      stem: "Beck's triad is:",
      choices: [
        "Hypertension, bradycardia, irregular respirations",
        "JVD, hypotension, muffled heart sounds",
        "Fever, cough, night sweats",
        "Wheeze, hives, hypotension",
      ],
      answer: 1,
      why: "Pericardial tamponade. Trauma + Beck = load-and-go surgical problem.",
    },
  ]),
  ...pack(2, 31, [
    {
      tag: "kehr",
      stem: "Left shoulder pain after left-upper-quadrant blunt trauma may be:",
      choices: ["Kehr sign from splenic bleeding", "A dislocated finger", "Always a heart attack", "Normal after running"],
      answer: 0,
      why: "Referred left shoulder pain can mark splenic injury. Treat the shock, don't chase the shoulder.",
    },
    {
      tag: "pelvis",
      stem: "Unstable pelvic fracture care:",
      choices: [
        "Rock the pelvis repeatedly to confirm",
        "Pelvic binder / sheet wrap, minimize movement, treat shock",
        "Sit them in a stair chair for comfort",
        "Logroll aggressively for a full back exam on scene",
      ],
      answer: 1,
      why: "Binder at the greater trochanters, don't spring the pelvis for fun, rapid transport.",
    },
    {
      tag: "hollow",
      stem: "Hollow-organ rupture is dangerous mainly because of:",
      choices: ["Immediate exsanguination only", "Spillage of contents and later peritonitis/sepsis", "Always a tension pneumothorax", "Hyperglycemia"],
      answer: 1,
      why: "Stomach/intestine/bladder spill. Solid organs bleed. Both can kill; timelines differ.",
    },
  ]),
  ...pack(2, 32, [
    {
      tag: "pms",
      stem: "You always check PMS:",
      choices: ["Only after the splint", "Before and after splinting", "Only if the patient asks", "Once at the hospital"],
      answer: 1,
      why: "Pulse, motor, sensory before and after. If you lose a pulse, that is a now problem.",
    },
    {
      tag: "femur",
      stem: "A traction splint is for:",
      choices: [
        "Isolated closed mid-shaft femur fracture",
        "Open femur with bone sticking out (always)",
        "Pelvic fracture",
        "Knee dislocation",
      ],
      answer: 0,
      why: "Isolated mid-shaft closed femur. Contraindications: pelvis, knee, lower leg, often open fractures — follow the sheet.",
    },
    {
      tag: "angulated",
      stem: "An angulated long-bone fracture with no distal pulse:",
      choices: [
        "Splint in the exact ugly position forever without telling anyone",
        "Gentle realignment toward anatomic if protocol allows, then splint, then PMS",
        "Reduce it with full body weight",
        "Ignore the pulse because pain comes first",
      ],
      answer: 1,
      why: "Pulseless + angulated: one attempt at gentle in-line traction per protocol, then splint and roll.",
    },
  ]),
]

const block3: Question[] = [
  ...pack(3, 2, [
    {
      tag: "ppe",
      stem: "Minimum PPE for a spurting bleed is:",
      choices: ["Nothing if you are vaccinated", "Gloves and eye protection (add gown/mask as splash risk rises)", "A paper hat only", "Sterile OR gown for every 911 call"],
      answer: 1,
      why: "BSI scales with exposure. Blood in the air = eyes and mucous membranes too.",
    },
    {
      tag: "stress",
      stem: "A CISD / peer-support conversation is meant to:",
      choices: ["Replace professional mental health care in every case", "Help the crew process a bad call — it is not a weakness to use it", "Assign blame", "Be mandatory public testimony"],
      answer: 1,
      why: "Workforce wellness is in this block for a reason. Use the tools. Don't white-knuckle it.",
    },
    {
      tag: "lift safety",
      stem: "The highest-yield injury prevention for EMTs is:",
      choices: ["Skipping wait for a lift assist", "Good body mechanics and asking for enough hands", "Twisting with a loaded stair chair", "Lifting with the back, not the legs"],
      answer: 1,
      why: "Career-ending backs are more common than movie gunfights. Wait for help.",
    },
  ]),
  ...pack(3, 9, [
    {
      tag: "crm",
      stem: "Closed-loop communication means:",
      choices: [
        "Nobody talks",
        "Orders are repeated back so both people know it was heard correctly",
        "Only the senior person may speak",
        "Radios stay off",
      ],
      answer: 1,
      why: "Team approach: send, repeat, confirm. That is how med errors die.",
    },
    {
      tag: "transfer",
      stem: "A good handoff includes:",
      choices: [
        "Age, sex, complaint, history, vitals, treatments, response, and what you are worried about",
        "Only the patient's name",
        "A shrug and 'they're in the back'",
        "Your opinions about the family",
      ],
      answer: 0,
      why: "SBAR/MIST-style structure. The receiving RN cannot read your mind.",
    },
  ]),
  ...pack(3, 12, [
    {
      tag: "rights",
      stem: "Which is NOT one of the classic medication rights?",
      choices: ["Right patient", "Right dose", "Right hospital gift shop", "Right route"],
      answer: 2,
      why: "Patient, med, dose, route, time, documentation (and indication/response). Gift shop is not a right.",
    },
    {
      tag: "enteral",
      stem: "Oral glucose is given by the ______ route.",
      choices: ["IV", "IM", "Inhaled", "Enteral / buccal (between cheek and gum)"],
      answer: 3,
      why: "It has to hit a mucosa in a patient who can protect their airway. Not IV.",
    },
    {
      tag: "indication",
      stem: "An indication is:",
      choices: [
        "A reason to give the drug",
        "A reason to never give it",
        "The color of the box",
        "The expiration date only",
      ],
      answer: 0,
      why: "Indication vs contraindication vs side effect. Say them out loud on skills day.",
    },
  ]),
  ...pack(3, 19, [
    {
      tag: "aaa",
      stem: "Tearing back/flank pain, unequal femoral pulses, hypotension in an older smoker:",
      choices: ["Constipation", "Rupturing AAA until proven otherwise", "Kidney stone you can wait out at home", "Food baby"],
      answer: 1,
      why: "Don't press hard on the abdomen. Oxygen, gentle transport, ALS. This is vascular disaster.",
    },
    {
      tag: "gi bleed",
      stem: "Black tarry stool (melena) suggests:",
      choices: ["Lower hemorrhoid only always", "Upper GI bleeding", "Bile duct obstruction only", "A normal iron supplement look you ignore"],
      answer: 1,
      why: "Digested blood. Treat perfusion. Coffee-ground emesis is the other classic.",
    },
    {
      tag: "dialysis",
      stem: "A patient who missed dialysis is most likely to present with:",
      choices: ["Hyperkalemia, fluid overload, weakness", "Profound hypoglycemia only", "Anaphylaxis to air", "Isolated ankle sprain"],
      answer: 0,
      why: "They can crash from potassium and volume. Don't take a BP on the fistula arm.",
    },
  ]),
  ...pack(3, 20, [
    {
      tag: "hypo",
      stem: "A diabetic who is pale, sweaty, and combative. First move after scene/ABC:",
      choices: ["Assume stroke and skip glucose", "Check BGL and give oral glucose if they can swallow", "Give their long-acting insulin", "Force a sandwich into a clenched jaw"],
      answer: 1,
      why: "Hypoglycemia is the treatable mimic. Protect the airway. No oral sugar if they can't swallow.",
    },
    {
      tag: "dka",
      stem: "DKA more often looks like:",
      choices: [
        "Cool/clammy and suddenly unresponsive",
        "Warm, dry, fruity breath, Kussmaul respirations, gradual illness",
        "Urticaria and stridor",
        "Focal arm weakness that resolves in 2 minutes",
      ],
      answer: 1,
      why: "Hyperglycemia syndromes are dry and acidotic. They need ALS/hospital, not a candy bar as the whole plan.",
    },
    {
      tag: "sickle",
      stem: "Sickle cell crisis pain is treated as:",
      choices: ["Faking until proven otherwise", "Real ischemic pain — oxygen, warmth, gentle transport, don't argue", "An automatic Narcan indication", "A reason to withhold pain advocacy"],
      answer: 1,
      why: "Believe them. Support ABCs and perfusion. Hospital for analgesia.",
    },
  ]),
  ...pack(3, 21, [
    {
      tag: "anaphylaxis",
      stem: "Anaphylaxis vs simple hives: anaphylaxis includes:",
      choices: [
        "Skin findings PLUS respiratory or hypotensive involvement (or severe GI in some definitions)",
        "Itch only that started last week",
        "Any sneeze in spring",
        "A dry cough after running",
      ],
      answer: 0,
      why: "Epi is for systemic involvement, not every hive. When in doubt with airway/BP, you are in epi territory.",
    },
    {
      tag: "epi",
      stem: "Adult IM epinephrine for anaphylaxis is typically:",
      choices: ["0.3 mg of 1 mg/mL (1:1000) in the thigh", "1 mg of 1:10,000 in the deltoid", "0.3 mg IV push of 1:1000", "10 mg IN"],
      answer: 0,
      why: "KC Check & Inject: 1:1000 IM. 1:10,000 is the IV cardiac concentration — mixing them fails the station.",
    },
    {
      tag: "site",
      stem: "Preferred IM epi site:",
      choices: ["Deltoid always", "Vastus lateralis (anterolateral thigh)", "Glute if you can see it", "Sublingual"],
      answer: 1,
      why: "Thigh absorbs faster and more reliably, including through clothes in true emergencies per many protocols.",
    },
  ]),
  ...pack(3, 22, [
    {
      tag: "opioid",
      stem: "Classic opioid toxidrome:",
      choices: ["Big pupils, sweaty, tachycardic", "Pinpoint pupils, hypoventilation, unresponsiveness", "Wheeze and hives", "Rigid abdomen and tearing back pain"],
      answer: 1,
      why: "Narcan after you bag. Narcan does not replace ventilations.",
    },
    {
      tag: "sludge",
      stem: "Organophosphate / nerve-agent SLUDGE is:",
      choices: [
        "Dry as a bone",
        "Salivation, lacrimation, urination, diarrhea, GI upset, emesis (cholinergic wet)",
        "Purely a psychiatric presentation",
        "Hypertension and dry skin only",
      ],
      answer: 1,
      why: "Wet and wheezy. Decon + airway. ALS for atropine/2-PAM. Don't ride in the soup.",
    },
    {
      tag: "absorbed",
      stem: "Dry powdered chemical on skin:",
      choices: ["Hose first, always", "Brush off then flush with water (unless the chemical is water-reactive per HAZMAT)", "Neutralize with the opposite acid/base from the truck", "Ignore PPE"],
      answer: 1,
      why: "Brush dry first. Then water. HAZMAT owns the weird stuff (lithium, sodium).",
    },
  ]),
  ...pack(3, 23, [
    {
      tag: "safety",
      stem: "On a behavioral call, the first priority is:",
      choices: ["A full neuro exam in the bedroom closet", "Scene safety and an exit path", "Arguing about who is right", "Taking their phone so they can't call 911 again"],
      answer: 1,
      why: "If you get hurt, the patient gets no care. Wait for PD when the scene is ugly.",
    },
    {
      tag: "suicide",
      stem: "A patient who reports a plan, means, and intent to die:",
      choices: [
        "May still refuse if they say the magic words",
        "Is not a competent refusal — they need evaluation, involve PD/medical direction",
        "Should be left with family if the house is clean",
        "Only matters if they already cut themselves",
      ],
      answer: 1,
      why: "Danger to self voids the casual refusal. Don't become the last person who walked away.",
    },
    {
      tag: "agitated",
      stem: "Excited delirium / severe agitation with hyperthermia is dangerous because of:",
      choices: ["Mild embarrassment", "Sudden arrest, acidosis, and hyperthermia — you need a lot of help", "Always faking for attention", "Low blood sugar only"],
      answer: 1,
      why: "Don't pile on chests. Cool, oxygenate, rapid ALS. This is medical, not 'just psych.'",
    },
  ]),
  ...pack(3, 24, [
    {
      tag: "pid",
      stem: "Lower abdominal pain, fever, and vaginal discharge in a sexually active patient may be:",
      choices: ["Always constipation", "PID — can be a surgical/septic emergency", "Normal menses only", "A reason to withhold a female EMT"],
      answer: 1,
      why: "Treat like an acute abdomen. Privacy, dignity, same assessment standards.",
    },
    {
      tag: "ectopic",
      stem: "First-trimester pain, spotting, syncope, shoulder pain:",
      choices: ["Normal pregnancy reassurance", "Ectopic until proven otherwise", "Labor at 6 weeks", "Hyperemesis only"],
      answer: 1,
      why: "Ectopic can dump into the belly and look like hypovolemic shock. Rapid transport.",
    },
  ]),
  ...pack(3, 33, [
    {
      tag: "heat",
      stem: "Hot, dry, altered after a heat wave is:",
      choices: ["Heat cramps", "Heat exhaustion", "Heat stroke — cool aggressively, rapid transport", "A reason to bundle in blankets"],
      answer: 2,
      why: "Altered + hyperthermia = stroke equivalent of heat. Strip, cool, ABC, don't delay.",
    },
    {
      tag: "hypothermia",
      stem: "A profoundly hypothermic patient in arrest:",
      choices: [
        "One shock then declare on scene always",
        "Handle gently, follow special arrest protocols — they're not dead until warm and dead",
        "Rewarm with a shot of whiskey",
        "Walk them to generate heat",
      ],
      answer: 1,
      why: "Rough handling → VF. Gentle moves, insulation, ALS, destination with rewarming capability.",
    },
    {
      tag: "snake",
      stem: "Pit-viper bite BLS:",
      choices: [
        "Cut, suck, and apply a tight arterial TQ",
        "Mark the swelling, keep still/below heart if practical, no ice-pack 'killing the venom,' transport",
        "Capture the snake with your hands for ID",
        "Apply a tourniquet until the arm is pulseless",
      ],
      answer: 1,
      why: "Calm, jewelry off, photo the snake from far away if safe. Antivenom is hospital.",
    },
  ]),
  ...pack(3, 34, [
    {
      tag: "stages",
      stem: "Second stage of labor is:",
      choices: ["Dilation only", "Delivery of the baby (full dilation to birth)", "Delivery of the placenta", "The first 6 weeks postpartum"],
      answer: 1,
      why: "Stage 1: dilation. Stage 2: baby. Stage 3: placenta.",
    },
    {
      tag: "nuchal",
      stem: "A nuchal cord that is loose should be:",
      choices: ["Ignored", "Slipped over the head if you can", "Cut immediately every time before the head is out", "Pulled hard"],
      answer: 1,
      why: "Reduce if loose. If tight and you cannot reduce, clamp×2 and cut — then deliver fast.",
    },
    {
      tag: "nrp",
      stem: "A floppy, apneic newborn after drying/warming/stimulation:",
      choices: [
        "Flick for 3 minutes then decide",
        "PPV if HR <100 or they aren't breathing, start with room air per current NRP unless cyanosis/HR says otherwise",
        "Adult 30:2 immediately",
        "Give oral glucose gel",
      ],
      answer: 1,
      why: "Warm, dry, position, suction if needed, stimulate. PPV is the newborn intervention that actually changes HR.",
    },
    {
      tag: "apgar",
      stem: "APGAR is scored at:",
      choices: ["1 and 5 minutes", "Birth only", "10 and 20 minutes only", "Whenever you remember"],
      answer: 0,
      why: "1 and 5 minutes (and 10 if still rough). Don't delay PPV to finish the score.",
    },
  ]),
]

const block4: Question[] = [
  ...pack(4, 3, [
    {
      tag: "consent",
      stem: "An unresponsive overdose patient is treated under:",
      choices: ["Expressed consent", "Informed written consent only", "Implied consent", "No consent — wait for family"],
      answer: 2,
      why: "Implied consent assumes a reasonable person would want emergency care if they could speak.",
    },
    {
      tag: "refusal",
      stem: "A valid refusal requires:",
      choices: [
        "The patient is altered and angry",
        "Informed, competent, uncoerced, risks explained, and documented",
        "A family member waving you off while the patient is unresponsive",
        "You being late for another call",
      ],
      answer: 1,
      why: "Alert, oriented, informed of risks, alternatives, and they can repeat the risk. Otherwise you stay or escalate.",
    },
    {
      tag: "duty",
      stem: "Abandonment is:",
      choices: [
        "Transferring to a nurse who accepts the patient",
        "Leaving a patient who still needs care without transferring to equal or higher care",
        "Waiting for PD on an unsafe scene",
        "Calling medical control",
      ],
      answer: 1,
      why: "Duty, breach, harm lives in negligence. Abandonment is the 'we left them' version.",
    },
  ]),
  ...pack(4, 4, [
    {
      tag: "pcr",
      stem: "If you didn't write it:",
      choices: ["The lawyer will remember", "It didn't happen, as far as the record is concerned", "Radio traffic replaces the PCR", "A tweet is enough"],
      answer: 1,
      why: "The PCR is a legal document. Times, assessments, interventions, response, refusals.",
    },
    {
      tag: "radio",
      stem: "A good hospital radio report is:",
      choices: [
        "Every childhood ear infection",
        "Age, sex, complaint, history of now, vitals, treatments, ETA, and what you need from them",
        "Your estimated diagnosis argued at length",
        "HIPAA-sensitive identifiers over an open channel",
      ],
      answer: 1,
      why: "Short, clinical, no gossip. Don't blast a name on an unsecured channel.",
    },
    {
      tag: "objective",
      stem: "Which line belongs in a PCR?",
      choices: [
        "Patient is a drunk and faking",
        "Patient smells of ethanol, GCS 13, unsteady gait, BGL 92",
        "I hate this address",
        "Probably not cardiac",
      ],
      answer: 1,
      why: "Objective, observable, measured. Leave the editorial at the station.",
    },
  ]),
  ...pack(4, 7, [
    {
      tag: "infant",
      stem: "A 6-month-old's fontanelle is normally:",
      choices: ["Fused solid", "Soft and flat", "Always bulging", "A hole you suction"],
      answer: 1,
      why: "Sunken = dehydration. Bulging = pressure/infection (in the right context).",
    },
    {
      tag: "toddler",
      stem: "The best way to assess a toddler is often:",
      choices: [
        "Separate them from the caregiver immediately",
        "Toe-to-head, on the caregiver's lap when possible",
        "Start with the most painful exam",
        "Ignore them and only talk to adults",
      ],
      answer: 1,
      why: "Don't steal their safety person. Save invasive stuff for last.",
    },
    {
      tag: "older",
      stem: "Normal aging often includes:",
      choices: [
        "A heart that cannot raise rate as well, thinner skin, and more drug interactions",
        "Guaranteed dementia",
        "Higher fever response than children",
        "No need for trauma evaluation after a ground-level fall",
      ],
      answer: 0,
      why: "Geriatrics hide shock. Ground-level falls kill. Polypharmacy is a tox scene in a medicine cabinet.",
    },
  ]),
  ...pack(4, 35, [
    {
      tag: "pat",
      stem: "The Pediatric Assessment Triangle is:",
      choices: [
        "Appearance, work of breathing, circulation to the skin",
        "BP, HR, RR only",
        "APGAR, SAMPLE, OPQRST",
        "Cap refill, fontanelle, and shoe size",
      ],
      answer: 0,
      why: "From the door: look, breathe, color. That is sick/not-sick for kids.",
    },
    {
      tag: "airway kid",
      stem: "Pediatric airways fail easier because:",
      choices: [
        "The tongue is larger relative to the mouth and the airway is narrower",
        "They have extra cartilaginous support",
        "They prefer nasal breathing forever",
        "Cricoid is irrelevant",
      ],
      answer: 0,
      why: "Positioning (sniffing, pad under shoulders in infants) is half the airway skill.",
    },
    {
      tag: "croup",
      stem: "Seal-bark cough, stridor, low-grade fever after a few days of URI:",
      choices: ["Epiglottitis until you use a tongue blade", "Croup picture — position of comfort, humidified O2 if tolerated, don't agitate", "Always anaphylaxis", "Needs i-gel on scene routinely"],
      answer: 1,
      why: "Viral croup vs sudden drooling epiglottitis. Keep them calm. ALS if they tank.",
    },
    {
      tag: "abuse",
      stem: "Injuries that don't match the story in a child:",
      choices: [
        "Are none of your business",
        "Must be reported per law — document facts, treat, don't interrogate like a detective on scene",
        "Should be posted to the crew chat",
        "Mean you withhold care until CPS arrives",
      ],
      answer: 1,
      why: "Mandatory reporter. Care first. Objective documentation. Notify per protocol.",
    },
  ]),
  ...pack(4, 36, [
    {
      tag: "silent mi",
      stem: "Older adults with ACS may present with:",
      choices: ["Only Hollywood clutching of the chest", "Weakness, syncope, confusion, or isolated dyspnea", "Always crushing 10/10 pain", "Fever and stiff neck"],
      answer: 1,
      why: "Atypical ACS is the rule in geriatrics and diabetics. Take the 12-lead / ALS path seriously.",
    },
    {
      tag: "fall",
      stem: "Ground-level fall on blood thinners with a headache:",
      choices: ["Minor — they can refuse easily", "High concern for intracranial bleed", "Only an orthopedic problem", "Cleared if they know the president"],
      answer: 1,
      why: "Anticoagulation + head strike is a time bomb. Encourage transport hard.",
    },
    {
      tag: "polypharmacy",
      stem: "You should bring to the hospital:",
      choices: ["A guess at their meds", "The actual bottles / a med list whenever you can", "Nothing, privacy", "Only the narcotics"],
      answer: 1,
      why: "The brown-bag med list saves lives. Interactions are the geriatric NOI.",
    },
  ]),
  ...pack(4, 37, [
    {
      tag: "trach",
      stem: "A gurgling tracheostomy:",
      choices: ["Ignore and give a NRB on the mouth", "Suction the trach, then oxygenate via the stoma as needed", "Remove the whole tube immediately for every gurgle", "Lay them prone"],
      answer: 1,
      why: "It's their airway. Suction. Spare inner cannula if that's the setup. Don't be shy.",
    },
    {
      tag: "autism",
      stem: "A good approach to a sensory-sensitive patient:",
      choices: [
        "Crowd them with six loud providers",
        "Slow, one voice, extra time, caregiver as coach, lights/sirens only if needed",
        "Force eye contact to show who's in charge",
        "Skip pain assessment because they 'don't feel it'",
      ],
      answer: 1,
      why: "Special challenges are still patients. Adapt the environment; don't skip medicine.",
    },
    {
      tag: "bariatrics",
      stem: "Bariatric transport planning means:",
      choices: [
        "One EMT and a prayer",
        "Enough people, the right stretcher, and dignity — not comments",
        "Refusing the call",
        "Walking them regardless of distress",
      ],
      answer: 1,
      why: "Ask for resources early. Injuries happen when crews freelance the lift.",
    },
  ]),
  ...pack(4, 38, [
    {
      tag: "ambulance",
      stem: "The safest patient position in the box is usually:",
      choices: ["Loose on the bench", "Secured to the stretcher, belts on, you belted too", "Standing to start an IV while moving", "In the front passenger seat unrestrained"],
      answer: 1,
      why: "You can't treat if you're a projectile. Belt in. Stop the truck for critical skills if needed.",
    },
    {
      tag: "landing",
      stem: "Helicopter LZ basics:",
      choices: [
        "Approach from the uphill rotor side in the dark without briefing",
        "Secure loose objects, mark a clear zone, approach only after the pilot waves you in, never from the uphill side of a slope",
        "Stand under the tail rotor to guide",
        "Run toward a spinning tail",
      ],
      answer: 1,
      why: "Rotor wash and tails kill. Wait for the wave. Eye/ear protection.",
    },
  ]),
  ...pack(4, 39, [
    {
      tag: "extrication",
      stem: "Your job during vehicle extrication is primarily:",
      choices: [
        "Running the hydraulic tools if you have never trained",
        "Patient access, C-spine/airway, shielding from glass/tools, and rapid packaging once they are free",
        "Standing in the crush zone to 'spot'",
        "Disconnecting the high-voltage system on a hybrid without training",
      ],
      answer: 1,
      why: "Stay in your lane. Fire owns the cut. You own the patient.",
    },
    {
      tag: "unstable",
      stem: "An unstable vehicle should be:",
      choices: ["Entered immediately", "Stabilized (cribbing/brake/park) before you commit your body", "Pushed by the ambulance", "Ignored if the patient is talking"],
      answer: 1,
      why: "Don't become the second patient. Chock and wait for stabilization.",
    },
  ]),
  ...pack(4, 40, [
    {
      tag: "ics",
      stem: "The incident commander is responsible for:",
      choices: ["Starting an IV", "Overall strategy and coordination of the incident", "Only media interviews", "Each individual compression"],
      answer: 1,
      why: "ICS: one IC, span of control ~3–7, unified command when agencies share the pile.",
    },
    {
      tag: "triage",
      stem: "START triage: a walking wounded patient is:",
      choices: ["Red", "Yellow", "Green", "Black"],
      answer: 2,
      why: "If they walk, they're green (minor) on first pass. Then you sort the rest by RR, perfusion, mental status.",
    },
    {
      tag: "black",
      stem: "Apneic after airway positioning in mass casualty (START):",
      choices: ["Red — do 30 minutes of 1:1 CPR", "Black / expectant on that pass so you can save reds", "Green", "Yellow"],
      answer: 1,
      why: "MCI ethics: you do the most good for the most people. That's the hard one. Learn it before Dec 10.",
    },
  ]),
  ...pack(4, 41, [
    {
      tag: "nims",
      stem: "Your first action approaching a possible WMD scene with multiple down patients and no trauma:",
      choices: [
        "Run in and start triage in the hot zone without PPE",
        "Upwind/uphill, consider HAZMAT, don't become patient zero",
        "Load the first six into the box and leave",
        "Spray water on everything immediately",
      ],
      answer: 1,
      why: "Secondary devices and vapor. Recognize, withdraw, notify. Heroes in the cloud become a bigger incident.",
    },
    {
      tag: "nerve",
      stem: "Nerve-agent exposure treatment concept at the EMT level is:",
      choices: [
        "Decon + airway + get them to ALS/antidote (DuoDote/Mark I) per protocol",
        "Oral glucose",
        "Aspirin",
        "CPAP as the only step",
      ],
      answer: 0,
      why: "Cholinergic crisis. PPE, strip/flush, airway, auto-injectors if you're issued them.",
    },
  ]),
]

/** Coach/drill bank (shorter stems) + exam-hard vignette bank for Thursday writtens. */
export const QUESTIONS: Question[] = [
  ...block1,
  ...block2,
  ...block3,
  ...block4,
  ...EXTRA_QUESTIONS,
  ...EXAM_B1,
  ...EXAM_B2,
  ...EXAM_B3,
  ...EXAM_B4,
]

/** Explicit exam bank — avoid filtering QUESTIONS in case of init order quirks. */
export const EXAM_QUESTIONS: Question[] = [...EXAM_B1, ...EXAM_B2, ...EXAM_B3, ...EXAM_B4]

export function questionsForChapters(chapters: number[]) {
  const set = new Set(chapters)
  return QUESTIONS.filter((q) => set.has(q.chapter))
}

export function examQuestionsForChapters(chapters: number[]) {
  const set = new Set(chapters)
  return EXAM_QUESTIONS.filter((q) => set.has(q.chapter))
}

export function questionsForBlock(block: 1 | 2 | 3 | 4) {
  return QUESTIONS.filter((q) => q.block === block)
}

export function examQuestionsForBlock(block: 1 | 2 | 3 | 4) {
  return EXAM_QUESTIONS.filter((q) => q.block === block)
}

export function siblingsOf(q: Question) {
  return QUESTIONS.filter((x) => x.id !== q.id && x.chapter === q.chapter && x.tag === q.tag)
}

export function chapterTitle(n: number) {
  return CHAPTERS.find((c) => c.n === n)?.title ?? `Chapter ${n}`
}
