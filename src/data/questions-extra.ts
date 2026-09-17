import type { Question } from "./questions"

type Draft = {
  stem: string
  choices: [string, string, string, string]
  answer: 0 | 1 | 2 | 3
  why: string
  tag: string
}

function extra(block: 1 | 2 | 3 | 4, chapter: number, drafts: Draft[]): Question[] {
  return drafts.map((d, i) => ({
    id: `b${block}-c${chapter}-x${i + 1}`,
    chapter,
    block,
    ...d,
  }))
}

export const EXTRA_QUESTIONS: Question[] = [
  ...extra(2, 15, [
    {
      tag: "opqrst",
      stem: "OPQRST is used mainly to explore:",
      choices: ["A trauma mechanism only", "The history of the present illness — onset, provocation, quality, radiation, severity, time", "Past surgical history", "A refusal signature"],
      answer: 1,
      why: "SAMPLE is the background. OPQRST unpacks this pain/this episode.",
    },
    {
      tag: "reassess",
      stem: "Unstable medical patients should be reassessed about every:",
      choices: ["15 minutes", "5 minutes", "Once at the hospital", "Only if they ask"],
      answer: 1,
      why: "Unstable ~5 min. Stable ~15 min. Repeat vitals after every major intervention.",
    },
    {
      tag: "scene",
      stem: "On a medical call, 'index of suspicion' is driven most by:",
      choices: ["The color of the house", "NOI, history, and how sick they look — not the dispatch code alone", "Whether ALS is on scene", "The patient's insurance"],
      answer: 1,
      why: "Dispatch is a hint. Your eyes and the story set the real problem list.",
    },
  ]),
  ...extra(2, 16, [
    {
      tag: "inadequate",
      stem: "Which breathing pattern is inadequate and needs BVM help?",
      choices: [
        "16/min, clear speech, SpO2 97% on room air",
        "8/min, shallow, cannot speak, declining LOC",
        "22/min after walking up stairs, speaking full sentences",
        "A sighing teenager who is otherwise pink and alert",
      ],
      answer: 1,
      why: "Rate × depth × effort × mental status. Slow and shallow with altered = ventilate.",
    },
    {
      tag: "copd",
      stem: "A COPD patient in severe distress with low SpO2:",
      choices: [
        "Should never receive oxygen because of hypoxic drive",
        "Gets oxygen (and ventilatory support) to treat hypoxia — do not withhold O2 from a crashing patient",
        "Should be walked to blow off CO2",
        "Needs oral glucose first",
      ],
      answer: 1,
      why: "Hypoxic-drive lore does not beat a blue patient. Titrate, support, ALS. Dead patients have excellent drive.",
    },
    {
      tag: "pneumo",
      stem: "Sudden pleuritic chest pain and dyspnea in a tall thin young adult, no trauma:",
      choices: ["Stable angina", "Spontaneous pneumothorax until you listen and get them ALS/destination", "Always GERD", "A pulled muscle you can discharge"],
      answer: 1,
      why: "Decreased sounds on one side. Watch for tension. Don't wait for them to crash.",
    },
    {
      tag: "mdi",
      stem: "A prescribed MDI is given when:",
      choices: [
        "Any cough, even without a prescription",
        "The patient has a prescribed inhaler, is having bronchospasm, and can cooperate with the puff / spacer per protocol",
        "They are apneic",
        "You want to test if they are faking",
      ],
      answer: 1,
      why: "Right patient, right med, they have to be able to inhale it. Assist, don't invent a new drug.",
    },
  ]),
  ...extra(2, 17, [
    {
      tag: "chain",
      stem: "The adult Chain of Survival starts with:",
      choices: ["A hospital cath lab only", "Immediate recognition and activation, then high-quality CPR and defibrillation", "IV medications first", "A 12-lead before compressions"],
      answer: 1,
      why: "Time to CPR and first shock beats almost everything else you will do today.",
    },
    {
      tag: "pulse",
      stem: "A patient with chest pain, BP 136/84, strong radial pulse. The AED should be:",
      choices: ["Applied and shocks delivered preventively", "Left in the bag — AEDs are for pulseless unresponsive patients", "Used to pace them", "Stuck on so you can 'see the rhythm' as treatment"],
      answer: 1,
      why: "AED = cardiac arrest tool. A pulse means you do ACS care, not defibrillation.",
    },
    {
      tag: "right mi",
      stem: "Inferior / right-sided MI caution with nitroglycerin exists because:",
      choices: [
        "Those patients are always hypertensive",
        "They can be preload-dependent — NTG may drop BP hard",
        "Nitroglycerin is an antiplatelet",
        "ASA is contraindicated instead",
      ],
      answer: 1,
      why: "Clear hypotension and PDE-5 first. Follow local NTG rules; when in doubt, call.",
    },
    {
      tag: "chf vs copd",
      stem: "Pink frothy sputum, orthopnea, and rales after waking at night points more to:",
      choices: ["Asthma that started at age 70", "Acute pulmonary edema / CHF picture", "A simple cold", "Anaphylaxis without skin findings"],
      answer: 1,
      why: "Sit them up. Oxygen/CPAP. This is a pump/fluid problem, not a 'breathe into a bag' problem.",
    },
  ]),
  ...extra(2, 18, [
    {
      tag: "status",
      stem: "Status epilepticus is best described as:",
      choices: [
        "A brief absence stare",
        "Seizure ≥5 minutes, or back-to-back without recovering — this is an airway/ALS emergency",
        "A normal postictal nap",
        "Any single 30-second convulsion",
      ],
      answer: 1,
      why: "Protect, oxygenate, don't pack the mouth, get ALS for benzos. Clock it.",
    },
    {
      tag: "tia",
      stem: "Stroke-like deficits that fully resolve in minutes to hours:",
      choices: ["Can be ignored if they feel fine now", "Treat as a TIA — still a stroke workup and transport", "Are always a migraine you can leave home", "Mean the last known well no longer matters"],
      answer: 1,
      why: "TIA is a warning shot. They still go. Document last known well anyway.",
    },
    {
      tag: "postictal",
      stem: "Postictal vs stroke: postictal patients more often have:",
      choices: [
        "A witnessed convulsion then gradual return, sometimes with a bitten tongue",
        "A frozen facial droop that never improves and no seizure history",
        "A normal glucose you skip",
        "A Cincinnati exam you never bother with",
      ],
      answer: 0,
      why: "Still check glucose and Cincinnati. If it looks like a stroke, treat the clock.",
    },
  ]),
  ...extra(2, 30, [
    {
      tag: "open chest",
      stem: "An open sucking chest wound is managed first by:",
      choices: [
        "Packing the hole with gauze until it is a mound",
        "Sealing it (vented occlusive / three-sided per protocol) and watching for tension",
        "A tourniquet around the thorax",
        "Having them lie on the uninjured side only, with no dressing",
      ],
      answer: 1,
      why: "Stop the suck. If they crash, burp the seal. ALS for needle if it becomes tension.",
    },
    {
      tag: "asphyxia",
      stem: "Traumatic asphyxia after a prolonged crush to the chest often shows:",
      choices: ["Pale ankles only", "Purple face/neck, petechiae, JVD picture from sudden venous backup", "Isolated wrist sprain", "A normal exam if they can talk"],
      answer: 1,
      why: "Look for the face. Support ABCs and expect associated chest injuries.",
    },
    {
      tag: "contusion",
      stem: "Pulmonary contusion should make you worry about:",
      choices: [
        "A problem that peaks immediately and then vanishes",
        "Worsening oxygenation over hours as the lung bruises and bleeds into itself",
        "A skin-only bruise",
        "An automatic indication for oral glucose",
      ],
      answer: 1,
      why: "They can look okay, then get wet lungs. Oxygen, monitor, don't delay.",
    },
  ]),
  ...extra(2, 31, [
    {
      tag: "evisceration",
      stem: "Abdominal evisceration care:",
      choices: [
        "Push the bowel back in and wrap tight with an ACE",
        "Moist sterile dressing, occlusive as protocol, do not replace organs, treat shock",
        "Dry gauze only so it sticks",
        "Have them do sit-ups to 'reduce' it",
      ],
      answer: 1,
      why: "Keep it moist and covered. Knees flexed if it helps. Load-and-go.",
    },
    {
      tag: "hematuria",
      stem: "Flank trauma and blood in the urine suggests:",
      choices: ["A UTI you can leave home", "Possible kidney injury — treat for shock and transport", "Always a bladder infection", "A reason to give oral fluids on scene"],
      answer: 1,
      why: "Solid-organ bleed until proven otherwise. Don't bounce them around.",
    },
    {
      tag: "pregnant trauma",
      stem: "A visibly pregnant trauma patient in her third trimester should be transported:",
      choices: [
        "Supine with a board crushing the vena cava the whole ride",
        "Uterus off the vena cava (left tilt / manual displacement) while you still protect the spine",
        "Prone",
        "Standing so the baby 'drops'",
      ],
      answer: 1,
      why: "Supine hypotensive syndrome is real. Tilt the board. Two patients, one stretcher.",
    },
  ]),
  ...extra(2, 32, [
    {
      tag: "joint",
      stem: "A deformed knee with a pulse should generally be splinted:",
      choices: ["Straightened hard through the joint", "In the position found unless protocol says otherwise", "Without PMS checks", "With a traction splint meant for mid-shaft femur"],
      answer: 1,
      why: "Joints hate being cranked. Position found, PMS before and after.",
    },
    {
      tag: "hip",
      stem: "A shortened, externally rotated leg after a fall in an older adult is classic for:",
      choices: ["Ankle sprain", "Proximal femur / hip fracture", "A simple bruise you walk off", "A pelvic binder indication by itself always"],
      answer: 1,
      why: "Pad and scoop, treat pain/shock, don't logroll them like a sack of feed.",
    },
    {
      tag: "amputation",
      stem: "A complete finger amputation — the part should be:",
      choices: [
        "Soaked in ice water",
        "Wrapped dry/moist per protocol, bagged, kept cool without freezing, transported with the patient",
        "Left on scene to 'keep the ED clean'",
        "Scrubbed with iodine until it shines",
      ],
      answer: 1,
      why: "Control bleed on the stump. Don't freeze the part. Don't delay the patient for a scavenger hunt if they're crashing.",
    },
  ]),
  ...extra(3, 2, [
    {
      tag: "airborne",
      stem: "Measles / TB-type concern adds which PPE idea?",
      choices: ["No mask needed if you feel fine", "Airborne precautions — fitted respirator as required, not just a fashion mask", "Goggles only", "Sterile gloves only"],
      answer: 1,
      why: "Know droplet vs airborne. Your lungs are not a filter.",
    },
    {
      tag: "scene first",
      stem: "You arrive to yelling and a person with a knife. First action:",
      choices: ["Walk in and start a trauma exam", "Stage until the scene is safe — you are no good injured", "Tackle the knife", "Ask the neighbor to disarm them"],
      answer: 1,
      why: "Scene safety is not cowardice. It's how the patient actually gets an EMT.",
    },
  ]),
  ...extra(3, 9, [
    {
      tag: "pit crew",
      stem: "High-performance CPR as a team means:",
      choices: [
        "One hero does everything",
        "Assigned roles, minimal pauses, switched compressors, closed-loop calls",
        "Stopping every 15 seconds to feel for a pulse",
        "Nobody may speak except the driver",
      ],
      answer: 1,
      why: "Choreography beats chaos. Pauses kill coronary perfusion.",
    },
    {
      tag: "speak up",
      stem: "You see the team lead about to give the wrong dose. You should:",
      choices: ["Stay quiet because of rank", "Stop the line — challenge, then closed-loop the correct action", "Tweet it later", "Wait until the hospital QI form"],
      answer: 1,
      why: "CRM: anyone can stop the error. Rank does not beat a dead patient.",
    },
  ]),
  ...extra(3, 12, [
    {
      tag: "charcoal",
      stem: "Activated charcoal is NOT for:",
      choices: [
        "A cooperative patient with a recent indicated ingestion per protocol",
        "An unresponsive patient or caustic/hydrocarbon ingestions",
        "A medical-direction-approved aspirin OD who can swallow",
        "A patient with an intact gag who meets local criteria",
      ],
      answer: 1,
      why: "If they can't protect the airway, charcoal becomes aspiration. Caustics/hydrocarbons are a hard no.",
    },
    {
      tag: "six rights",
      stem: "After you give a medication you must still:",
      choices: ["Leave the scene immediately", "Document and reassess for effect and side effects", "Throw the vial in the bushes", "Assume it worked without looking"],
      answer: 1,
      why: "Right documentation and right response. The drug is not done when it leaves the syringe.",
    },
  ]),
  ...extra(3, 19, [
    {
      tag: "appy",
      stem: "Periumbilical pain that migrates to the RLQ with fever and anorexia is a classic:",
      choices: ["MI", "Appendicitis picture — don't feed them, treat shock if it ruptures", "Stable constipation you leave home", "Kidney stone on the left"],
      answer: 1,
      why: "Acute abdomen. Gentle ride. They can look okay until they don't.",
    },
    {
      tag: "stone vs aaa",
      stem: "An older hypertensive patient with tearing back pain vs a young patient writhing with flank pain to the groin:",
      choices: [
        "Treat both as kidney stones at home",
        "Respect AAA in the first picture; kidney stone is more like the second — when unsure, treat the life threat",
        "Both get oral fluids and a wait",
        "Tearing pain is always musculoskeletal",
      ],
      answer: 1,
      why: "Age, history, and 'tearing' change the destination. Don't bounce an AAA.",
    },
  ]),
  ...extra(3, 20, [
    {
      tag: "hhs",
      stem: "HHNS / hyperosmolar state more often hits:",
      choices: [
        "Tiny kids with type 1 and Kussmaul",
        "Older type 2 patients — very high glucose, profound dehydration, often no big ketones/fruity breath",
        "Only opioid overdoses",
        "Anaphylaxis",
      ],
      answer: 1,
      why: "Dry, altered, glucose through the roof. ALS, fluids at the hospital, ABCs now.",
    },
    {
      tag: "clotting",
      stem: "A hemophilia patient with a swollen joint after a minor bump:",
      choices: ["Ice and a shrug", "Treat as a significant bleed — gentle handling, don't delay", "Give ASA to thin them more", "Have them run it out"],
      answer: 1,
      why: "They bleed into spaces you cannot see. Factor is hospital. You protect and move.",
    },
  ]),
  ...extra(3, 21, [
    {
      tag: "second dose",
      stem: "Anaphylaxis that is still crashing after the first IM epi:",
      choices: [
        "You are done — one dose is the legal maximum in every system",
        "Reassess, support ABCs, and a second IM dose may be indicated per protocol / medical direction (often ~5 min)",
        "Switch to oral diphenhydramine as the only next step",
        "Lay them flat with no oxygen",
      ],
      answer: 1,
      why: "Epi is the drug. Antihistamines are adjuncts. Know your Check & Inject repeat rules.",
    },
    {
      tag: "not first",
      stem: "In true anaphylaxis, diphenhydramine:",
      choices: [
        "Replaces epinephrine",
        "Does not replace epi — it is not the first-line drug for airway/BP collapse",
        "Is given IV push of 1:1000",
        "Opens the airway mechanically",
      ],
      answer: 1,
      why: "Benadryl is for itch after you have saved the airway. Epi first.",
    },
  ]),
  ...extra(3, 22, [
    {
      tag: "co",
      stem: "Headache, nausea, multiple patients, flu-like, cherry skin is unreliable. Think:",
      choices: ["Food poisoning only", "Carbon monoxide — get them out, high-flow O2, don't trust pulse ox the usual way", "Opioid OD only", "Anxiety because the house is messy"],
      answer: 1,
      why: "SpO2 can look weirdly 'fine.' Remove, oxygen, fire/HAZMAT, destination with a clue.",
    },
    {
      tag: "inhalant",
      stem: "A teen found with a bag and spray can, sudden collapse:",
      choices: ["Always a simple faint", "Inhalant / hydrocarbon — risk of sudden dysrhythmia, support ABCs, don't startle-sprint them", "Oral glucose as the only treatment", "A reason to withhold oxygen"],
      answer: 1,
      why: "Sudden sniffing death is a real thing. Gentle, oxygen, ALS.",
    },
  ]),
  ...extra(3, 23, [
    {
      tag: "restraints",
      stem: "If you must restrain a patient:",
      choices: [
        "Hogtie prone with weight on the back",
        "Supine if possible, check PMS/airway, never punish, document why, enough hands",
        "One wrist to the rail 'for a second' unsupervised",
        "A spit hood plus no monitoring",
      ],
      answer: 1,
      why: "Positional asphyxia kills. This is medical monitoring, not a wrestling match.",
    },
    {
      tag: "medical first",
      stem: "New psychosis in a 68-year-old with fever should make you think:",
      choices: ["Personality forever", "Medical until proven otherwise — infection, hypoxia, glucose, stroke, meds", "A refusal you accept immediately", "Only a police problem"],
      answer: 1,
      why: "Psychiatric labels do not get a pass on ABCs and glucose. Especially new and old.",
    },
  ]),
  ...extra(3, 24, [
    {
      tag: "bleed",
      stem: "Heavy vaginal bleeding in a non-pregnant patient:",
      choices: ["Is never shocky", "Treat like hemorrhage — pads to count, oxygen, ALS, don't pack the vagina", "A pelvic exam on the sidewalk", "A reason to skip vitals"],
      answer: 1,
      why: "External pads only. Dignity and perfusion. Same shock rules.",
    },
    {
      tag: "assault",
      stem: "A sexual-assault patient who is stable:",
      choices: [
        "Should be forced to shower so evidence is 'clean'",
        "Privacy, choice, don't make them undress for no medical reason, preserve evidence if they want a kit, report per law/protocol",
        "Must name the suspect on the radio",
        "Is a refusal you talk them into so you can clear",
      ],
      answer: 1,
      why: "They already lost control. Give it back. Medicine still happens.",
    },
  ]),
  ...extra(3, 33, [
    {
      tag: "drown",
      stem: "A drowned / submerged patient who is unresponsive:",
      choices: [
        "Abdominal thrusts first every time",
        "Assume spinal only if MOI says so, start ventilations/CPR, get them warm and ALS",
        "Wait for them to vomit before you bag",
        "Declare on the beach if water was cold",
      ],
      answer: 1,
      why: "Airway and CPR. Cold water is a reason to work them, not to quit.",
    },
    {
      tag: "lightning",
      stem: "A lightning strike with multiple casualties. Reverse triage means:",
      choices: [
        "Ignore the apneic ones",
        "The apparently dead may still be salvageable with immediate CPR — start there, then the walking wounded",
        "Treat ankle sprains first because they yell",
        "Wait for the next storm to pass before touching anyone",
      ],
      answer: 1,
      why: "Lightning can knock the heart and lungs down. Early CPR actually works here.",
    },
  ]),
  ...extra(3, 34, [
    {
      tag: "prolapse",
      stem: "A prolapsed cord is treated by:",
      choices: [
        "Pulling the cord until the baby follows",
        "Knee-chest or hips up, a gloved hand lifting the presenting part off the cord, rapid transport, don't push the cord back in",
        "Cutting the cord immediately",
        "Having mom walk to improve flow",
      ],
      answer: 1,
      why: "That hand stays until the OR. Keep the cord moist. This is a now surgical problem.",
    },
    {
      tag: "breech",
      stem: "If a breech delivery is happening and the head is stuck:",
      choices: [
        "Pull the body hard",
        "Support the body, make an airway with your fingers if taught, rapid transport — don't yank",
        "Have mom stand up",
        "Clamp the cord before the head is out as routine",
      ],
      answer: 1,
      why: "Create space, don't extract like a magician. ALS/hospital. Document.",
    },
  ]),
  ...extra(4, 3, [
    {
      tag: "dnr",
      stem: "A valid DNR / POLST on scene means:",
      choices: [
        "You withhold comfort and oxygen always",
        "You follow the form in front of you — comfort care still happens; you don't start unwanted resuscitation",
        "Family verbal 'don't' always beats a missing form",
        "You must arrest them to 'get a rhythm strip'",
      ],
      answer: 1,
      why: "Paper (or the official digital equivalent) plus the patient in front of you. When unclear, resuscitate and call.",
    },
    {
      tag: "hipaa",
      stem: "HIPAA still allows you to:",
      choices: [
        "Post the call on Instagram if you blur the house number",
        "Share needed clinical info with the receiving team for treatment",
        "Discuss the patient in a diner using the name and address",
        "Text a funny photo to the group chat",
      ],
      answer: 1,
      why: "Treatment, payment, operations. Not entertainment. The crew chat is not a vault.",
    },
  ]),
  ...extra(4, 4, [
    {
      tag: "addendum",
      stem: "You remember a vital sign after the PCR is submitted. You should:",
      choices: ["Edit silently so it looks original", "Add an addendum with time — don't rewrite history", "Text the nurse and skip the record", "Leave it; memory is good enough in court"],
      answer: 1,
      why: "Late entries are honest. Changing the original looks like a cover-up.",
    },
    {
      tag: "mandatory",
      stem: "Which typically requires a special / mandated report in addition to the PCR?",
      choices: ["A sprained ankle in a competent adult", "Suspected child abuse, certain gunshot/stabs, some infectious/elder cases per law", "Every refusal", "A patient who was rude"],
      answer: 1,
      why: "Know your state's list. The PCR is not always the whole legal duty.",
    },
  ]),
  ...extra(4, 7, [
    {
      tag: "school age",
      stem: "School-age kids usually do best when you:",
      choices: ["Lie about shots so they relax", "Explain simply, let them help, don't bargain with fantasies", "Talk only to the parent over their head", "Start with the most painful procedure"],
      answer: 1,
      why: "They understand more than toddlers and fear more than you think. Honesty, then skill.",
    },
    {
      tag: "adolescent",
      stem: "With an adolescent, privacy matters because:",
      choices: [
        "They have no legal rights ever",
        "You may get a real history (pregnancy, drugs, SI) only if you give them a chance to talk without the whole family leaning in",
        "HIPAA does not apply until 21",
        "You should hide findings from the receiving hospital",
      ],
      answer: 1,
      why: "Ask the room to step out when you can. Then still follow consent/mandatory-report law.",
    },
  ]),
  ...extra(4, 35, [
    {
      tag: "bronchiolitis",
      stem: "A winter infant with raspy breathing, poor feeding, and low-grade fever is a:",
      choices: ["Typical adult COPD picture", "Bronchiolitis / RSV picture — support oxygen and work of breathing, watch for apnea", "Croup that always needs intubation", "A reason to use adult CPAP settings"],
      answer: 1,
      why: "Infants tire. Position, oxygen, don't agitate, ALS if they look tired.",
    },
    {
      tag: "febrile sz",
      stem: "A 14-month-old who seized with a high fever and is now postictal:",
      choices: [
        "Never needs transport if the seizure stopped",
        "Still gets ABCs, glucose if indicated, cooling comfort, and a hospital — first febrile seizure is not a 'home clear'",
        "Gets adult-dose aspirin",
        "Should be put in ice water",
      ],
      answer: 1,
      why: "Protect, don't ice-bath. First seizure still goes. Look for meningitis red flags.",
    },
  ]),
  ...extra(4, 36, [
    {
      tag: "gems",
      stem: "The GEMS diamond reminds you that geriatrics are:",
      choices: [
        "Just wrinkled adults with the same reserve",
        "Shaped by environment, medical conditions, and social support — small injuries, big consequences",
        "Always demented",
        "Too old for trauma centers",
      ],
      answer: 1,
      why: "The apartment, the meds, and who checks on them are part of the assessment.",
    },
    {
      tag: "sepsis",
      stem: "An older adult with a UTI who is hypotensive and confused:",
      choices: ["Is 'just old'", "May be septic — oxygen, ALS, don't write it off as baseline until you know baseline", "Needs a refusal form first", "Should wait for oral antibiotics at home"],
      answer: 1,
      why: "Sepsis hides in geriatrics. Altered plus a source plus bad perfusion is a clock.",
    },
  ]),
  ...extra(4, 37, [
    {
      tag: "lvad",
      stem: "A patient with an LVAD and no palpable pulse:",
      choices: [
        "Is always in arrest — start CPR immediately without looking at the device or the person",
        "May be perfusing — check the hum, MAP/flow, mental status, and follow device/protocol before you crush the pump with CPR",
        "Should have the batteries removed to reset",
        "Cannot go to a hospital",
      ],
      answer: 1,
      why: "Bring the bag of batteries and the coordinator number. CPR is not automatic and not never — know the local rule.",
    },
    {
      tag: "gtube",
      stem: "A dislodged gastrostomy tube:",
      choices: [
        "Should be jammed back in with force on scene every time",
        "Cover, don't force a new tract, transport — leaking + peritonitis risk",
        "Is an excuse to skip vitals",
        "Means they cannot receive oxygen",
      ],
      answer: 1,
      why: "Fresh stomas close. Don't play OR on the kitchen floor.",
    },
  ]),
  ...extra(4, 38, [
    {
      tag: "emergency",
      stem: "Lights and sirens are justified when:",
      choices: [
        "You are late for shift change",
        "The time saved is likely to change the patient's outcome — not as a default",
        "Every transport, including a finger laceration",
        "The driver is bored",
      ],
      answer: 1,
      why: "You don't get to kill a family at an intersection for a non-emergency. Think.",
    },
    {
      tag: "lz size",
      stem: "A typical helicopter LZ is on the order of:",
      choices: ["A parking stall", "A 100×100 ft (about 30 m) clear zone, marked, no wires, landing officer", "Any backyard with a dog run", "The interstate fog line"],
      answer: 1,
      why: "Wires and loose junk are the killers. Brief the crew. One person talks to the aircraft.",
    },
  ]),
  ...extra(4, 39, [
    {
      tag: "hybrid",
      stem: "A wrecked hybrid/electric vehicle adds this hazard:",
      choices: [
        "No extra hazard if the radio still plays",
        "High-voltage orange cabling — don't cut what you don't know, wait for trained fire",
        "They cannot catch fire",
        "You should disconnect high voltage yourself with trauma shears",
      ],
      answer: 1,
      why: "Silence is not safe. Stabilize, protect the patient, let rescue own the juice.",
    },
    {
      tag: "glass",
      stem: "During glass management you should:",
      choices: ["Skip eye protection because it's quick", "Shield the patient, wear eye/hand protection, control the glass", "Sit the patient up into the breaking window", "Use the patient as a backboard for the window"],
      answer: 1,
      why: "You own the patient's face. Blanket, board, eyes.",
    },
  ]),
  ...extra(4, 40, [
    {
      tag: "yellow",
      stem: "START: breathing >30, or delayed cap refill / no radial, or can't follow commands:",
      choices: ["Green", "Red (immediate)", "Black", "They are automatically walking wounded"],
      answer: 1,
      why: "RPM: respirations, perfusion, mental status. Fail one after the walk test = red.",
    },
    {
      tag: "span",
      stem: "A workable span of control in ICS is about:",
      choices: ["1:1 always", "3–7 subordinates per supervisor", "50 people reporting to one IC", "No supervisors at all"],
      answer: 1,
      why: "If you cannot name who works for you, you don't have command — you have a crowd.",
    },
  ]),
  ...extra(4, 41, [
    {
      tag: "blast",
      stem: "Blast injuries come in phases. The one that pops hollow organs and lungs is:",
      choices: ["Tertiary (body thrown)", "Primary (pressure wave)", "Quaternary (fire/toxins only)", "A simple fall with no explosion"],
      answer: 1,
      why: "Primary = overpressure. Secondary = shrapnel. Tertiary = you flew. Treat the lung and the bleed.",
    },
    {
      tag: "zones",
      stem: "Hot / warm / cold zone logic means EMTs usually treat in the:",
      choices: ["Hot zone in street clothes", "Cold (or warm with proper PPE) — not the toxic soup", "Wherever the cameras are", "Inside the vapor cloud to save seconds"],
      answer: 1,
      why: "Dead rescuers are not a resource. Decon before the ambulance becomes a contaminated box.",
    },
  ]),
]
