import type { Question } from "./questions"

/**
 * Block II practice written in KCEMS / Advantage Access instructor style.
 * Tuned from the Block I final pattern (short AAOS recall, EXCEPT, light scenarios)
 * plus Shelby / Gabriel / Brandon lecture decks for Ch. 30–32.
 *
 * Fixed 70-item form · Ch. 15, 16, 17, 18, 30, 31, 32 · ~10 each.
 */

type Draft = {
  stem: string
  choices: [string, string, string, string]
  answer: 0 | 1 | 2 | 3
  why: string
  tag: string
}

function pack(chapter: number, drafts: Draft[]): Question[] {
  return drafts.map((d, i) => ({
    id: `ib2-c${chapter}-${i + 1}`,
    chapter,
    block: 2 as const,
    difficulty: "exam" as const,
    ...d,
  }))
}

export const INSTRUCTOR_B2: Question[] = [
  // ───────────────────────── 15 · Medical Overview ─────────────────────────
  ...pack(15, [
    {
      tag: "assessment",
      stem: "The primary reason a medical patient called EMS, stated in their own words when possible, is the:",
      choices: ["Differential diagnosis", "Chief complaint", "Primary survey", "Mechanism of injury"],
      answer: 1,
      why: "Chief complaint is why they called. MOI belongs to trauma; the differential is what you are working toward, not the patient’s opening line.",
    },
    {
      tag: "history",
      stem: "SAMPLE history includes all of the following, EXCEPT:",
      choices: ["Signs and symptoms", "Allergies", "Last known well time", "Events leading up to the illness"],
      answer: 2,
      why: "SAMPLE is Signs/symptoms, Allergies, Medications, Past history, Last oral intake, Events. Last known well is a stroke-specific time stamp, not a SAMPLE letter.",
    },
    {
      tag: "opqrst",
      stem: "In OPQRST, the “P” stands for:",
      choices: ["Pulse quality", "Provocation / palliation", "Past medical history", "Primary assessment"],
      answer: 1,
      why: "P = what makes it worse or better (provoke/palliate). Pulse sits in vitals; past history is the P in SAMPLE.",
    },
    {
      tag: "sick not sick",
      stem: "Which finding MOST strongly suggests a medical patient is “sick” and needs rapid transport?",
      choices: [
        "Stable vital signs with a minor complaint",
        "Altered mental status with cool, diaphoretic skin",
        "A normal SpO2 reading on room air",
        "Ability to walk to the ambulance without assistance",
      ],
      answer: 1,
      why: "Mental status and skin signs are early perfusion clues. Looking ambulatory does not rule out occult shock or hypoxia.",
    },
    {
      tag: "glucose",
      stem: "You should obtain a blood glucose reading on a medical patient when:",
      choices: [
        "Only if the family says the patient is diabetic",
        "The patient has altered mental status or a seizure",
        "Only after arriving at the emergency department",
        "Only if the pulse oximeter reading is below 94%",
      ],
      answer: 1,
      why: "Hypoglycemia mimics stroke, intoxication, and syncope. Check BGL early on altered or seizing patients.",
    },
    {
      tag: "focused exam",
      stem: "A focused physical exam on a medical call means you:",
      choices: [
        "Examine every body system on every patient",
        "Limit the exam to systems related to the chief complaint",
        "Skip vital signs to save time",
        "Only examine areas the patient points to with one finger",
      ],
      answer: 1,
      why: "Medical assessment is driven by the complaint. Shotgun head-to-toe exams waste time on stable medical patients.",
    },
    {
      tag: "reassessment",
      stem: "For an unstable medical patient, vital signs should generally be reassessed about every:",
      choices: ["5 minutes", "15 minutes", "30 minutes", "Once, on arrival at the hospital"],
      answer: 0,
      why: "Unstable ≈ every 5 minutes (and after interventions). Stable ≈ every 15.",
    },
    {
      tag: "noi",
      stem: "Nature of illness (NOI) refers to:",
      choices: [
        "The general type of medical problem a patient is experiencing",
        "The exact organ that is failing",
        "The force that injured the patient",
        "The hospital specialty service that must accept the patient",
      ],
      answer: 0,
      why: "NOI is the medical counterpart to MOI — the category of illness (cardiac, respiratory, neuro), not a final diagnosis.",
    },
    {
      tag: "time sensitive",
      stem: "Which condition is considered a time-sensitive medical emergency that warrants early hospital notification?",
      choices: ["Stable ankle sprain", "Suspected stroke with a known last-known-well time", "Minor epistaxis that has stopped", "Chronic low-back pain for three weeks"],
      answer: 1,
      why: "Stroke, STEMI, sepsis, and anaphylaxis are clock-driven. Early notification opens CT, cath lab, or airway resources.",
    },
    {
      tag: "primary survey",
      stem: "Even on a medical call, the primary survey is used to:",
      choices: [
        "Identify and treat immediate life threats",
        "Establish a final diagnosis before transport",
        "Replace the need for vital signs",
        "Document only the patient’s medications",
      ],
      answer: 0,
      why: "ABCs and life threats come first whether the call is medical or trauma. Diagnosis is the hospital’s job.",
    },
  ]),

  // ───────────────────────── 16 · Respiratory ─────────────────────────
  ...pack(16, [
    {
      tag: "definitions",
      stem: "Dyspnea is BEST defined as:",
      choices: [
        "The absence of breathing",
        "A subjective feeling of difficult or labored breathing",
        "A high-pitched sound on inspiration",
        "Fluid in the alveoli",
      ],
      answer: 1,
      why: "Dyspnea is what the patient feels. Apnea is no breathing; stridor is a sound; pulmonary edema is a pathology.",
    },
    {
      tag: "sounds",
      stem: "High-pitched whistling sounds, usually heard on expiration and caused by narrowed lower airways, are called:",
      choices: ["Stridor", "Crackles", "Wheezes", "Rhonchi"],
      answer: 2,
      why: "Wheezes = lower airway narrowing. Stridor is upper airway. Crackles are discontinuous (often fluid).",
    },
    {
      tag: "stridor",
      stem: "Stridor indicates a problem in the:",
      choices: ["Lower airways and alveoli", "Upper airway", "Pleural space only", "Pulmonary capillaries"],
      answer: 1,
      why: "Stridor is a harsh inspiratory sound from upper-airway narrowing (swelling, foreign body, infection).",
    },
    {
      tag: "orthopnea",
      stem: "A patient who becomes short of breath when lying flat and must sit upright to breathe is describing:",
      choices: ["Hemoptysis", "Orthopnea", "Apnea", "Atelectasis"],
      answer: 1,
      why: "Orthopnea is classic for CHF / pulmonary edema. Hemoptysis is coughing blood.",
    },
    {
      tag: "copd",
      stem: "Which statement regarding oxygen therapy in a severe COPD patient is correct?",
      choices: [
        "You should never give oxygen because it will always stop their breathing",
        "Hypoxia kills — give oxygen as needed while monitoring mental status and SpO2",
        "Target SpO2 should always be 100% on every COPD patient",
        "Nasal cannula is contraindicated in all COPD patients",
      ],
      answer: 1,
      why: "Treat hypoxia. Watch for CO₂ narcosis, but do not withhold oxygen from a hypoxic COPD patient.",
    },
    {
      tag: "asthma",
      stem: "A “silent chest” in a severe asthma attack MOST likely means:",
      choices: [
        "The patient is improving and airways have opened",
        "Air movement is so poor that wheezes may disappear — impending respiratory failure",
        "The stethoscope is broken",
        "Only an upper airway problem is present",
      ],
      answer: 1,
      why: "Loss of wheeze with extreme distress means little air is moving. That is a crash sign, not recovery.",
    },
    {
      tag: "chf",
      stem: "Pink, frothy sputum in a dyspneic patient is MOST suggestive of:",
      choices: ["Foreign body aspiration", "Pulmonary edema", "Simple rib fracture", "Hyperventilation syndrome"],
      answer: 1,
      why: "Pink frothy sputum is the textbook clue for cardiogenic pulmonary edema.",
    },
    {
      tag: "fbao",
      stem: "The MOST appropriate technique to relieve a severe foreign-body airway obstruction in a conscious adult who is late-term pregnant is:",
      choices: ["Abdominal thrusts", "Chest thrusts", "Blind finger sweeps", "Back blows only while they are standing"],
      answer: 1,
      why: "Chest thrusts for pregnancy and marked obesity. Blind finger sweeps are out.",
    },
    {
      tag: "failure",
      stem: "Respiratory failure is BEST described as:",
      choices: [
        "Any patient who complains of shortness of breath",
        "Inadequate ventilation or oxygenation such that the body’s needs are not met",
        "A respiratory rate greater than 20 breaths/min",
        "Wheezing that responds to coaching alone",
      ],
      answer: 1,
      why: "Failure means gas exchange/ventilation cannot meet metabolic demand — not merely the presence of dyspnea.",
    },
    {
      tag: "position",
      stem: "A conscious patient with pulmonary edema usually prefers which position?",
      choices: ["Supine with legs elevated", "Sitting upright", "Prone", "Trendelenburg"],
      answer: 1,
      why: "Upright (often feet dangling) reduces venous return and eases work of breathing. Flat makes them worse.",
    },
  ]),

  // ───────────────────────── 17 · Cardiovascular ─────────────────────────
  ...pack(17, [
    {
      tag: "acs",
      stem: "Acute coronary syndrome (ACS) refers to:",
      choices: [
        "Any chest wall muscle strain",
        "A group of conditions caused by reduced blood flow to the heart muscle",
        "Only confirmed STEMI on a 12-lead",
        "Chronic stable hypertension without symptoms",
      ],
      answer: 1,
      why: "ACS covers unstable angina through MI — ischemia from reduced coronary flow, not every chest ache.",
    },
    {
      tag: "atypical",
      stem: "Which groups are MORE likely to present with atypical myocardial infarction symptoms (little or no chest pain)?",
      choices: [
        "Young adult males who exercise regularly",
        "Women, elderly patients, and diabetics",
        "Teenagers with anxiety",
        "Athletes with muscle strains",
      ],
      answer: 1,
      why: "Women, older adults, and diabetics often present with fatigue, nausea, dyspnea, or jaw/back discomfort.",
    },
    {
      tag: "angina",
      stem: "Angina pectoris is BEST described as:",
      choices: [
        "Chest pain from reversible myocardial ischemia, often with exertion",
        "Death of a full thickness of heart muscle",
        "Infection of the heart valves",
        "A tear in the aortic wall",
      ],
      answer: 0,
      why: "Angina is ischemia that is usually reversible with rest or nitro. Infarction is tissue death.",
    },
    {
      tag: "nitro",
      stem: "Nitroglycerin is contraindicated when the patient has recently taken:",
      choices: ["Aspirin", "A PDE-5 inhibitor such as sildenafil", "Acetaminophen", "An oral antibiotic"],
      answer: 1,
      why: "PDE-5 inhibitors + nitro can cause profound hypotension. Aspirin is often given with ACS care.",
    },
    {
      tag: "aspirin",
      stem: "Aspirin is given in suspected ACS primarily because it:",
      choices: [
        "Immediately dissolves the coronary clot",
        "Reduces platelet aggregation and further clot formation",
        "Raises blood pressure",
        "Reverses heart failure within minutes",
      ],
      answer: 1,
      why: "Aspirin is an antiplatelet. It does not thrombolyse the clot by itself.",
    },
    {
      tag: "chf",
      stem: "Jugular venous distention (JVD) in a dyspneic patient MOST suggests:",
      choices: [
        "Elevated central venous pressure, often right-sided heart failure or obstruction",
        "Simple dehydration",
        "An isolated lower-extremity sprain",
        "Normal findings in all adults over 40",
      ],
      answer: 0,
      why: "JVD reflects high pressure in the venous system returning to the heart — CHF, tamponade, tension pneumo.",
    },
    {
      tag: "shock",
      stem: "Cardiogenic shock occurs when:",
      choices: [
        "Widespread vasodilation drops systemic vascular resistance",
        "The heart cannot pump enough blood to meet the body’s needs",
        "Blood volume is lost from external hemorrhage only",
        "A tension pneumothorax compresses the vena cava",
      ],
      answer: 1,
      why: "Cardiogenic = pump failure. Distributive = vasodilation; hypovolemic = volume loss; obstructive = blockage.",
    },
    {
      tag: "arrest",
      stem: "Which cardiac arrest rhythms are considered “shockable” with an AED?",
      choices: [
        "Asystole and PEA",
        "Ventricular fibrillation and pulseless ventricular tachycardia",
        "Sinus bradycardia and atrial fibrillation with a pulse",
        "First-degree AV block only",
      ],
      answer: 1,
      why: "AED shocks VF and pulseless VT. Asystole/PEA get high-quality CPR, not defibrillation.",
    },
    {
      tag: "atherosclerosis",
      stem: "Atherosclerosis is the process in which:",
      choices: [
        "Plaque builds up inside arteries and narrows the lumen",
        "Veins become permanently dilated and tortuous",
        "The pericardium fills with fluid",
        "Alveoli fill with pus",
      ],
      answer: 0,
      why: "Atherosclerotic plaque narrows arteries and sets up ACS and stroke risk.",
    },
    {
      tag: "position",
      stem: "A conscious patient with chest pressure who is not hypotensive is usually positioned:",
      choices: [
        "Supine with legs elevated",
        "In a position of comfort, often semi-Fowler’s",
        "Prone to reduce anxiety",
        "Trendelenburg to raise blood pressure",
      ],
      answer: 1,
      why: "Position of comfort unless shock demands otherwise. Forcing flat can worsen dyspnea.",
    },
  ]),

  // ───────────────────────── 18 · Neurologic ─────────────────────────
  ...pack(18, [
    {
      tag: "stroke",
      stem: "The “T” in FAST stroke assessment stands for:",
      choices: ["Temperature", "Time to call / time last known well", "Tracheal deviation", "Tidal volume"],
      answer: 1,
      why: "Time drives eligibility for reperfusion. Face, Arm, Speech, Time.",
    },
    {
      tag: "tia",
      stem: "A transient ischemic attack (TIA) is BEST described as:",
      choices: [
        "Stroke symptoms that resolve, usually within 24 hours, without permanent infarction",
        "A hemorrhagic stroke that always requires surgery",
        "A seizure lasting more than 5 minutes",
        "Syncope caused only by dehydration",
      ],
      answer: 0,
      why: "TIA is a temporary neuro deficit — still an emergency because it predicts future stroke.",
    },
    {
      tag: "seizure",
      stem: "During an active generalized seizure, you should:",
      choices: [
        "Force an object between the teeth to protect the tongue",
        "Protect the patient from injury and support the airway as able",
        "Restrain the arms and legs tightly to the stretcher",
        "Sit the patient upright immediately",
      ],
      answer: 1,
      why: "Pad the environment, time the seizure, protect ABCs. Nothing in the mouth; do not restrain.",
    },
    {
      tag: "status",
      stem: "Status epilepticus is generally defined as:",
      choices: [
        "A brief absence seizure in a child",
        "A seizure lasting more than 5 minutes, or repeated seizures without recovery between them",
        "Any seizure that occurs during sleep",
        "A single 30-second tonic-clonic event with full recovery",
      ],
      answer: 1,
      why: ">5 minutes or continuous back-to-back seizures without recovery = status — ALS and rapid transport.",
    },
    {
      tag: "postictal",
      stem: "The postictal state refers to:",
      choices: [
        "The aura before a seizure begins",
        "The recovery period after a seizure, often with confusion or fatigue",
        "The moment of tonic rigidity only",
        "A stroke mimic that never resolves",
      ],
      answer: 1,
      why: "Postictal = after the seizure. Protect the airway and reassess — they can seize again.",
    },
    {
      tag: "syncope",
      stem: "Syncope is MOST accurately defined as:",
      choices: [
        "A prolonged coma lasting hours",
        "A temporary loss of consciousness from transient cerebral hypoperfusion",
        "A focal neurologic deficit lasting days",
        "Involuntary muscle contractions only",
      ],
      answer: 1,
      why: "Syncope is brief LOC with usually rapid recovery. Still evaluate cardiac and other causes.",
    },
    {
      tag: "cva",
      stem: "Hemiparesis means:",
      choices: [
        "Weakness on one side of the body",
        "Complete paralysis of all four limbs",
        "Inability to speak any words",
        "Double vision only",
      ],
      answer: 0,
      why: "Hemi- = one side; -paresis = weakness. Common stroke finding.",
    },
    {
      tag: "aphasia",
      stem: "Aphasia is:",
      choices: [
        "Difficulty walking in a straight line",
        "Impaired ability to produce or understand language",
        "Ringing in the ears",
        "Loss of smell",
      ],
      answer: 1,
      why: "Aphasia is a language deficit from brain injury, often left-hemisphere stroke.",
    },
    {
      tag: "last known well",
      stem: "Last known well time is critical in stroke care because it:",
      choices: [
        "Determines whether the patient may be a candidate for time-limited reperfusion therapy",
        "Is only used for billing purposes",
        "Replaces the need for a neurologic exam",
        "Must always equal the time of symptom discovery by EMS",
      ],
      answer: 0,
      why: "tPA/thrombectomy windows are timed from last known well — clarify with witnesses.",
    },
    {
      tag: "altered",
      stem: "Which of the following is a common reversible cause of altered mental status that EMTs should check early?",
      choices: ["Hypoglycemia", "Brain tumor only", "Chronic hearing loss", "Stable hypertension without symptoms"],
      answer: 0,
      why: "Check BGL. Hypoglycemia is common, fixable, and mimics stroke and intoxication.",
    },
  ]),

  // ───────────────────────── 30 · Chest Injuries (Sakoda lecture) ─────────────────────────
  ...pack(30, [
    {
      tag: "phrenic",
      stem: "Patients with a spinal cord injury below which cervical level can still breathe using the diaphragm?",
      choices: ["C1", "C2", "C5", "C7 only if ventilated"],
      answer: 2,
      why: "C3–4–5 keep the diaphragm alive. Injury below C5 often leaves diaphragmatic breathing intact.",
    },
    {
      tag: "minute volume",
      stem: "Minute ventilation (minute volume) is:",
      choices: [
        "Tidal volume × respiratory rate",
        "Dead space × heart rate",
        "Only the air left in the alveoli after exhalation",
        "Systolic BP × pulse rate",
      ],
      answer: 0,
      why: "Minute volume = tidal volume × rate. Low tidal volume patients often compensate by breathing faster.",
    },
    {
      tag: "closed chest",
      stem: "A closed chest injury means:",
      choices: [
        "The skin is not broken, usually from blunt trauma",
        "There is always an open sucking wound",
        "Only the abdominal cavity is involved",
        "The patient cannot have a pneumothorax",
      ],
      answer: 0,
      why: "Closed = intact skin. You can still have contusion, pneumothorax, tamponade, or great-vessel injury.",
    },
    {
      tag: "pneumothorax",
      stem: "A pneumothorax is BEST defined as:",
      choices: [
        "Blood in the pericardial sac",
        "Air in the pleural space collapsing lung tissue",
        "Fluid in the alveoli from heart failure",
        "Fracture of three or more ribs",
      ],
      answer: 1,
      why: "Air in the pleural space = collapsed lung. Blood in the pericardium is tamponade.",
    },
    {
      tag: "open pneumo",
      stem: "An open pneumothorax (sucking chest wound) should be rapidly sealed with:",
      choices: [
        "A dry gauze fluff left completely open",
        "An occlusive dressing (often with a flutter / one-way valve concept)",
        "Ice packs only",
        "Circumferential tape around the entire chest tightly",
      ],
      answer: 1,
      why: "Occlusive dressing stops air entrainment. Monitor for conversion to tension pneumothorax.",
    },
    {
      tag: "tension",
      stem: "Signs of tension pneumothorax include all of the following, EXCEPT:",
      choices: [
        "Absent breath sounds on the affected side",
        "Hypotension and shock",
        "Jugular venous distention",
        "Hypertension with bounding pulses as an early finding",
      ],
      answer: 3,
      why: "Tension physiology makes patients sick — hypotension/shock, not hypertension. Tracheal deviation is late.",
    },
    {
      tag: "hemothorax",
      stem: "Hemothorax should be suspected when a chest-trauma patient has:",
      choices: [
        "Shock without obvious external bleeding and decreased breath sounds on one side",
        "Only a mild cough with clear lungs",
        "Hypertension and flushed skin",
        "Equal bilateral breath sounds and a normal pulse pressure",
      ],
      answer: 0,
      why: "Blood in the pleural space hides volume loss. MOI + shock + unilateral findings = think hemothorax.",
    },
    {
      tag: "beckade",
      stem: "Beck’s triad for cardiac tamponade includes:",
      choices: [
        "Hypertension, bradycardia, and irregular respirations",
        "Hypotension, jugular venous distention, and muffled heart sounds",
        "Fever, productive cough, and wheezing",
        "Unequal pupils, Battle sign, and rhinorrhea",
      ],
      answer: 1,
      why: "Beck = low BP + JVD + muffled tones. Not all three always show — use MOI and narrowing pulse pressure.",
    },
    {
      tag: "flail",
      stem: "Flail chest is defined as:",
      choices: [
        "A single nondisplaced rib fracture",
        "Three or more ribs broken in two or more places, with paradoxical motion",
        "Any bruise on the chest wall",
        "A pneumothorax that requires needle decompression",
      ],
      answer: 1,
      why: "Lecture definition: ≥3 ribs, ≥2 places each → unstable segment moving paradoxically.",
    },
    {
      tag: "commotio",
      stem: "Commotio cordis is:",
      choices: [
        "A sudden direct blow to the chest during a vulnerable part of the cardiac cycle that can cause cardiac arrest",
        "A chronic infection of the pericardium",
        "Gradual plaque buildup in the coronary arteries",
        "A type of simple rib fracture in elderly patients",
      ],
      answer: 0,
      why: "Commotio cordis can VF a healthy heart. Early defibrillation within minutes matters.",
    },
  ]),

  // ───────────────────────── 31 · Abd / GU (DeBay lecture) ─────────────────────────
  ...pack(31, [
    {
      tag: "quadrants",
      stem: "Which organs are primarily found in the right upper quadrant (RUQ)?",
      choices: [
        "Spleen and stomach",
        "Liver, gallbladder, and duodenum",
        "Appendix and descending colon",
        "Kidneys only",
      ],
      answer: 1,
      why: "RUQ: liver, gallbladder, duodenum. Spleen is LUQ. Appendix is RLQ.",
    },
    {
      tag: "hollow",
      stem: "Hollow abdominal organs include all of the following, EXCEPT:",
      choices: ["Stomach", "Intestines", "Bladder", "Liver"],
      answer: 3,
      why: "Liver, spleen, pancreas, and kidneys are solid. Hollow organs spill contents → peritonitis risk.",
    },
    {
      tag: "solid",
      stem: "Solid organ injuries are especially dangerous because solid organs:",
      choices: [
        "Have a rich blood supply and can hemorrhage severely",
        "Never bleed",
        "Only cause delayed infection, never shock",
        "Cannot be injured by blunt trauma",
      ],
      answer: 0,
      why: "Solid organs are vascular — liver/spleen bleeds kill quietly.",
    },
    {
      tag: "liver",
      stem: "Referred pain to the right shoulder after trauma is a common finding with injury to the:",
      choices: ["Spleen", "Liver", "Left kidney only", "Appendix"],
      answer: 1,
      why: "Injured liver → referred right shoulder pain. Spleen often refers to the left shoulder (Kehr).",
    },
    {
      tag: "spleen",
      stem: "The spleen is often injured in:",
      choices: [
        "MVC, falls, and handlebar impacts from bicycles or motorcycles",
        "Only penetrating wounds to the RLQ",
        "Isolated ankle sprains",
        "Minor epistaxis",
      ],
      answer: 0,
      why: "LUQ / left lower rib and handlebar MOI are classic for spleen.",
    },
    {
      tag: "evisceration",
      stem: "Correct care for an abdominal evisceration includes:",
      choices: [
        "Pushing the organs back into the abdomen",
        "Covering organs with moist sterile dressings and keeping them warm; do not replace them",
        "Applying a dry restrictive circumferential bandage only",
        "Giving the patient oral fluids",
      ],
      answer: 1,
      why: "Don’t mess with it — dress it moist, keep warm, treat shock, transport.",
    },
    {
      tag: "penetrating",
      stem: "If a penetrating injury is at or below the xiphoid process, you should assume involvement of:",
      choices: [
        "Only the extremities",
        "Both the thoracic and peritoneal cavities",
        "Only the cranial vault",
        "No internal injury if the wound looks small",
      ],
      answer: 1,
      why: "Below the xiphoid can traverse chest and abdomen — high index of suspicion.",
    },
    {
      tag: "kidney",
      stem: "A common finding with significant kidney injury is:",
      choices: ["Hematuria", "Hemoptysis", "Epistaxis only", "Clear urine with no pain"],
      answer: 0,
      why: "Blood in the urine (hematuria) flags GU trauma. Blood at the meatus also means serious injury.",
    },
    {
      tag: "peritonitis",
      stem: "Peritonitis is:",
      choices: [
        "Inflammation of the peritoneum from blood, bacteria, or chemical irritation",
        "Collapse of a lung",
        "A fracture of the pelvis",
        "Swelling of the brain",
      ],
      answer: 0,
      why: "Hollow-organ spill or blood irritates the peritoneum — pain, guarding, later infection.",
    },
    {
      tag: "sexual assault",
      stem: "When caring for a sexual assault patient, you should advise them NOT to:",
      choices: [
        "Wash, bathe, shower, douche, urinate, or defecate before the forensic exam when possible",
        "Speak to hospital staff",
        "Accept a same-gender caregiver if available",
        "Receive treatment for life-threatening injuries",
      ],
      answer: 0,
      why: "Preserve evidence when possible, but never withhold care for shock or hemorrhage. Dignity and protocol matter.",
    },
  ]),

  // ───────────────────────── 32 · Ortho (Bothwell lecture) ─────────────────────────
  ...pack(32, [
    {
      tag: "pms",
      stem: "When splinting an extremity injury, you should check pulse, motor function, and sensation:",
      choices: [
        "Only before splinting",
        "Only after arrival at the hospital",
        "Before and after splinting",
        "Only if the patient asks",
      ],
      answer: 2,
      why: "PMS before and after — swelling or a tight splint can kill distal flow.",
    },
    {
      tag: "sprain",
      stem: "A sprain is BEST defined as:",
      choices: [
        "A stretching or tearing injury to ligaments around a joint",
        "A complete break through a bone shaft",
        "A stretching or tearing of muscle fibers only",
        "Displacement of a bone from its joint",
      ],
      answer: 0,
      why: "Sprain = ligament. Strain = muscle/tendon. Dislocation = bone out of joint.",
    },
    {
      tag: "dislocation",
      stem: "Signs of a dislocation commonly include all of the following, EXCEPT:",
      choices: [
        "Marked deformity",
        "Loss of normal joint motion",
        "Pain aggravated by movement",
        "Completely normal appearance and full range of motion",
      ],
      answer: 3,
      why: "Dislocations look and move wrong. If it looks normal and moves normally, it is not a dislocation.",
    },
    {
      tag: "traction",
      stem: "A traction splint is used primarily for:",
      choices: [
        "Isolated mid-shaft femur fractures",
        "Upper-extremity injuries",
        "Pelvic fractures",
        "Injuries involving the knee joint",
      ],
      answer: 0,
      why: "Traction splints are for femoral shaft fractures — not pelvis, knee, ankle, or arms.",
    },
    {
      tag: "traction contra",
      stem: "Traction splints are contraindicated in all of the following, EXCEPT:",
      choices: [
        "Injury close to or involving the knee",
        "Pelvic injury",
        "Isolated mid-shaft femur fracture",
        "Lower leg, foot, or ankle injury",
      ],
      answer: 2,
      why: "Isolated mid-shaft femur is the indication. Knee, pelvis, ankle/leg, and partial amputations are out.",
    },
    {
      tag: "femur",
      stem: "A fractured femur can result in the loss of approximately how much blood into the thigh?",
      choices: ["50 mL", "100 mL", "1 L or more", "Negligible amounts only"],
      answer: 2,
      why: "Femur fractures can hide a liter or more. Treat for shock even without a pool of blood on the ground.",
    },
    {
      tag: "colles",
      stem: "A Colles fracture refers to a fracture of the:",
      choices: ["Distal radius", "Clavicle", "Proximal humerus", "Patella"],
      answer: 0,
      why: "Colles = distal radius (often “silver fork” deformity in older adults after a FOOSH).",
    },
    {
      tag: "pelvis",
      stem: "A pelvic binder is used to:",
      choices: [
        "Splint the bony pelvis to reduce hemorrhage and pain",
        "Reduce a dislocated hip in the field",
        "Replace the need for spinal motion restriction in all trauma",
        "Apply traction to a mid-shaft humerus fracture",
      ],
      answer: 0,
      why: "Binder temporarily stabilizes the pelvic ring. Do not field-reduce hips.",
    },
    {
      tag: "hip",
      stem: "Regarding a dislocated hip in the field, you should:",
      choices: [
        "Attempt to reduce it before transport",
        "Splint/support in the position found and transport; do not attempt reduction",
        "Have the patient walk to stretch the joint",
        "Apply a traction splint to the pelvis",
      ],
      answer: 1,
      why: "Do not reduce hips in the field. Support, board, pillows, PMS checks, transport.",
    },
    {
      tag: "compartment",
      stem: "Compartment syndrome is characterized by:",
      choices: [
        "Pain out of proportion to the injury, often with pain on passive stretch",
        "Immediate absence of all symptoms",
        "Only fever without limb findings",
        "Improved circulation after tight bandaging",
      ],
      answer: 0,
      why: "Pain out of proportion and pain with stretch are early clues; pulselessness is late.",
    },
  ]),
]
