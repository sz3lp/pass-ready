import type { Question } from "./questions"

/**
 * Pass Ready EMT — Fall 2026 (KCEMS / AAOS)
 * HARD written-exam bank, Block II only.
 * Chapters: 15 Medical Overview, 16 Respiratory, 17 Cardiovascular,
 * 18 Neurologic, 30 Chest, 31 Abdominal & GU, 32 Orthopaedic.
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
    id: `ex2-c${chapter}-${i + 1}`,
    chapter,
    block: 2 as const,
    difficulty: "exam" as const,
    ...d,
  }))
}

export const EXAM_B2: Question[] = [
  // ───────────────────────── 15 · Medical Overview ─────────────────────────
  ...exam(15, [
    {
      tag: "shock recognition",
      stem: "A 58-year-old woman has had fever and productive cough for three days. She is drowsy but answers questions. BP 86/54, pulse 124 and weak, respirations 26 and shallow, SpO2 90% on room air, skin hot and flushed. Which action is MOST appropriate next?",
      choices: [
        "Complete a full head-to-toe secondary exam before any treatment is started",
        "Give high-concentration oxygen, keep her supine and warm, and transport promptly",
        "Withhold oxygen until a second reading confirms the pulse oximetry value",
        "Have her sit upright and sip water while you wait for her fever to break",
      ],
      answer: 1,
      why: "Warm, flushed skin with hypotension and tachycardia fits septic (distributive) shock. Oxygenate, keep her flat and warm, and move — a leisurely secondary exam is not the priority.",
    },
    {
      tag: "scene safety",
      stem: "You are called for an 'unresponsive male' and find him slumped in a closed garage with a car engine running. His skin is pink and he is snoring. Which action comes FIRST?",
      choices: [
        "Open the airway with a jaw-thrust and begin bag-mask ventilation where he lies",
        "Apply pulse oximetry, because a normal reading rules out carbon monoxide",
        "Move him into fresh air before performing any further assessment or care",
        "Start a rapid secondary exam to find the cause of his altered mental status",
      ],
      answer: 2,
      why: "The garage is a toxic, unsurvivable work area for you and him. Remove the patient to fresh air first; standard pulse oximetry cannot distinguish carboxyhemoglobin from oxyhemoglobin.",
    },
    {
      tag: "primary survey",
      stem: "A 71-year-old man reports chest pressure. He is awake but repeatedly asks where he is. Respirations are 28 and adequate in depth, radial pulse is weak at 118, BP 96/70, SpO2 93%. What does his presentation MOST indicate?",
      choices: [
        "A stable patient who can be assessed with a slow focused history",
        "An unstable patient who needs immediate intervention and prompt transport",
        "An anxiety reaction that will resolve with coaching and reassurance",
        "A normal finding for his age group that requires no change in your plan",
      ],
      answer: 1,
      why: "Altered mentation plus a weak, fast pulse and borderline pressure means poor perfusion. Confusion in a chest-pain patient is a red flag, not an age-related baseline.",
    },
    {
      tag: "reassessment",
      stem: "You are transporting a hypotensive medical patient 22 minutes to the hospital. How should reassessment be handled during transport?",
      choices: [
        "Repeat the vital signs about every 5 minutes and after each intervention",
        "Repeat the vital signs about every 15 minutes since the trip is short",
        "Obtain one additional set of vitals just before arriving at the hospital",
        "Rely on the monitor alarm and only recheck if the patient's mood changes",
      ],
      answer: 0,
      why: "Unstable patients get roughly 5-minute reassessments; stable patients roughly every 15. Any intervention also earns a fresh set of vitals to prove it worked.",
    },
    {
      tag: "history taking",
      stem: "A 44-year-old woman with abdominal pain denies vomiting, denies fever, and denies any vaginal bleeding. In your report, these denials are BEST described as:",
      choices: [
        "Pertinent negatives that help narrow the likely cause of her pain",
        "Irrelevant details that should be left out of the written narrative",
        "Chief complaints, because the patient volunteered them to you",
        "Objective findings, because you confirmed them by physical exam",
      ],
      answer: 0,
      why: "Symptoms a patient specifically denies are pertinent negatives — documenting them shows the differential you ruled out and protects the next clinician's thinking.",
    },
    {
      tag: "assessment sequence",
      stem: "You find a 63-year-old man unresponsive in bed with no obvious trauma. Breathing is 10 and shallow, pulse 56, skin cool and dry. After managing the airway and breathing, which assessment step follows?",
      choices: [
        "A focused exam limited to the area the family says hurt earlier",
        "A rapid head-to-toe exam plus blood glucose and full baseline vitals",
        "A detailed OPQRST history obtained from the patient himself",
        "A refusal discussion with family since the patient cannot consent",
      ],
      answer: 1,
      why: "An unresponsive medical patient cannot give you a focus, so you do a rapid full-body exam and check glucose. OPQRST requires a patient who can talk.",
    },
    {
      tag: "vital sign trends",
      stem: "A patient's serial blood pressures read 128/74, then 122/86, then 116/96, while the pulse climbs from 88 to 116. This narrowing pulse pressure with rising heart rate MOST suggests:",
      choices: [
        "Improving perfusion as your oxygen therapy takes clinical effect",
        "Progressing compensated shock with active peripheral vasoconstriction",
        "An inaccurate cuff size that should simply be documented and ignored",
        "Normal physiologic variation seen with repositioning on the cot",
      ],
      answer: 1,
      why: "The diastolic rising toward the systolic means the body is clamping down vessels to hold pressure. Tachycardia plus a narrowing pulse pressure is compensated shock heading downhill.",
    },
    {
      tag: "altered mental status",
      stem: "A 35-year-old man is confused, diaphoretic, and combative. His partner says he 'takes shots for sugar.' Which action is MOST appropriate?",
      choices: [
        "Obtain a blood glucose reading and treat according to the result",
        "Give oral glucose immediately since insulin use confirms low sugar",
        "Restrain him first and defer any assessment until police arrive",
        "Assume intoxication and transport him without further evaluation",
      ],
      answer: 0,
      why: "Glucose testing turns a guess into a finding. Never assume the number, and never assume combativeness is behavioral until hypoxia and hypoglycemia are excluded.",
    },
    {
      tag: "index of suspicion",
      stem: "Dispatch sends you for 'weakness.' You find an 80-year-old woman who is pale, says she feels 'awful,' and has a pulse of 38 with BP 78/40. Your index of suspicion should be driven MOST by:",
      choices: [
        "The dispatch complaint, which is the most objective information available",
        "Her age alone, since weakness is expected in elderly patients",
        "Her presentation and vital signs, which point to a serious cardiac cause",
        "Her medication list, which is the only reliable data on scene",
      ],
      answer: 2,
      why: "Dispatch information gets you rolling; the patient's actual appearance and numbers drive your suspicion. Profound bradycardia with hypotension is a time-critical cardiac problem.",
    },
    {
      tag: "transport decision",
      stem: "You are 30 minutes from the hospital with a 68-year-old man in respiratory distress whose SpO2 is 86% despite a nonrebreathing mask. An ALS unit is 6 minutes away. The MOST appropriate action is to:",
      choices: [
        "Wait on scene for ALS and let their crew assume all patient care",
        "Drive past the ALS unit so you do not delay definitive hospital care",
        "Begin transport and arrange an ALS intercept en route to the hospital",
        "Cancel ALS because oxygen and positioning are within your scope",
      ],
      answer: 2,
      why: "Move toward the hospital and let ALS meet you. Sitting still burns the same minutes without any gain, and refusing ALS wastes a resource this patient clearly needs.",
    },
    {
      tag: "infection control",
      stem: "You are suctioning copious secretions from a coughing patient with suspected pneumonia. Which personal protective measure is MOST appropriate for this task?",
      choices: [
        "Gloves alone, since the airway is the only contaminated surface here",
        "Gloves plus eye protection and a mask because splatter is expected",
        "A gown only, because suctioning does not generate airborne particles",
        "No additional protection if the patient's mask stays in place",
      ],
      answer: 1,
      why: "Suctioning is a splash-and-droplet procedure. Gloves plus eye and face protection is the minimum; the patient's mask cannot stay on while you are in their airway.",
    },
  ]),

  // ───────────────────────── 16 · Respiratory ─────────────────────────
  ...exam(16, [
    {
      tag: "asthma",
      stem: "A 24-year-old woman with asthma has been wheezing for an hour. She can no longer speak in full sentences, is using accessory muscles, and her chest is now nearly silent on auscultation. SpO2 is 88%, respirations 32 and shallow. Which action is MOST appropriate?",
      choices: [
        "Coach pursed-lip breathing and continue oxygen by nasal cannula",
        "Assist ventilations with a bag-mask device and high-flow oxygen",
        "Wait for the wheezing to return before escalating any treatment",
        "Place her supine and apply a nonrebreathing mask at 15 L/min",
      ],
      answer: 1,
      why: "A silent chest means almost no air is moving — that is worse than loud wheezing, not better. Shallow breathing at 32 with an SpO2 of 88% needs positive-pressure ventilation now.",
    },
    {
      tag: "chf vs copd",
      stem: "A 68-year-old man wakes at 2 a.m. gasping. He sits bolt upright, has crackles to mid-lung fields, pink frothy sputum, distended neck veins, and swollen ankles. BP 198/112, pulse 112, SpO2 87%. This presentation MOST suggests:",
      choices: [
        "An acute asthma exacerbation triggered by overnight allergens",
        "Acute pulmonary edema from left-sided congestive heart failure",
        "A chronic bronchitis flare with retained carbon dioxide",
        "A spontaneous pneumothorax with progressive air trapping",
      ],
      answer: 1,
      why: "Nighttime orthopnea, frothy sputum, crackles, jugular distention, and pedal edema are the classic CHF package. Asthma and COPD do not produce pink froth and pitting edema.",
    },
    {
      tag: "chf management",
      stem: "The same CHF patient remains hypoxic on a nonrebreathing mask but is awake, following commands, and has a BP of 190/108. Which intervention is MOST appropriate within EMT scope where CPAP is authorized?",
      choices: [
        "Lay him flat to improve venous return to the failing left ventricle",
        "Apply CPAP while he sits upright and monitor his pressure closely",
        "Assist with his spouse's prescribed albuterol inhaler for the crackles",
        "Perform deep tracheal suctioning to clear the frothy secretions",
      ],
      answer: 1,
      why: "CPAP pushes fluid out of the alveoli and is ideal for an awake, hypertensive CHF patient sitting upright. Lying him flat floods the lungs further, and suctioning does not fix the source.",
    },
    {
      tag: "copd oxygen",
      stem: "A 72-year-old man with severe COPD is pursed-lip breathing with a barrel chest. His SpO2 is 84% and he is becoming sleepy. His daughter insists oxygen will 'knock out his drive to breathe.' The MOST appropriate action is to:",
      choices: [
        "Limit him to 2 L/min by cannula regardless of his oxygen saturation",
        "Give high-concentration oxygen and prepare to assist ventilations",
        "Withhold oxygen entirely and transport in a position of comfort",
        "Coach his breathing only, since the reading is likely artifact",
      ],
      answer: 1,
      why: "Hypoxia kills long before any theoretical loss of hypoxic drive. Treat the saturation and the sleepiness in front of you, and be ready to bag him if he tires out.",
    },
    {
      tag: "mdi",
      stem: "Before you assist a wheezing patient with her metered-dose inhaler, which set of conditions must be satisfied?",
      choices: [
        "The medication is prescribed to her, unexpired, and authorized by protocol or medical direction",
        "The medication belongs to a family member with the same diagnosis and symptoms",
        "The patient has never used the device before and cannot self-administer it",
        "The patient has already exceeded the maximum dose listed on the label",
      ],
      answer: 0,
      why: "Right patient, right medication, in date, and authorized — those are the gates. Borrowed inhalers and exceeded maximum doses are contraindications, not green lights.",
    },
    {
      tag: "pediatric airway",
      stem: "A 4-year-old sits leaning forward, drooling, with a muffled voice, a temperature of 103°F, and inspiratory stridor. He refuses to lie down. Which action is MOST appropriate?",
      choices: [
        "Depress the tongue with a blade to visualize the swollen structures",
        "Place him supine on the cot and insert an oropharyngeal airway",
        "Keep him upright and calm, give blow-by oxygen, and transport gently",
        "Attempt back blows and chest thrusts to relieve the obstruction",
      ],
      answer: 2,
      why: "This is epiglottitis. Anything that agitates him or invades the airway — blades, supine positioning, airway adjuncts — can trigger complete obstruction. Calm, upright, and rolling.",
    },
    {
      tag: "pneumothorax",
      stem: "A tall, thin 19-year-old develops sudden sharp right-sided chest pain and dyspnea while sitting in class. Breath sounds are absent on the right, the trachea is midline, BP 124/78, pulse 104. This is MOST consistent with:",
      choices: [
        "A spontaneous pneumothorax from a ruptured congenital bleb",
        "An acute asthma attack with unilateral mucus plugging",
        "Pleural effusion from a slowly progressing lung infection",
        "Hyperventilation syndrome caused by acute situational anxiety",
      ],
      answer: 0,
      why: "Sudden unilateral pain with absent sounds in a tall, thin young person is a textbook spontaneous pneumothorax. No trauma is needed and no wheezing is expected.",
    },
    {
      tag: "pulmonary embolism",
      stem: "A 56-year-old woman three days post knee surgery has sudden sharp dyspnea that worsens with deep breaths. Lungs are clear bilaterally, pulse 126, respirations 30, SpO2 88%, and one calf is swollen and tender. The MOST likely cause is:",
      choices: [
        "Acute pulmonary edema from postoperative fluid overload",
        "Pulmonary embolism from a lower extremity venous clot",
        "Aspiration pneumonia developing after her anesthesia",
        "An acute exacerbation of undiagnosed reactive airway disease",
      ],
      answer: 1,
      why: "Clear lungs with severe hypoxia, pleuritic pain, tachycardia, and a swollen calf after surgery screams PE. Fluid overload and pneumonia would give you abnormal lung sounds.",
    },
    {
      tag: "hyperventilation",
      stem: "A 22-year-old man is breathing 36 times per minute after an argument. He reports tingling lips and cramping hands. SpO2 is 100%, lungs are clear, pulse is 108. Which action is MOST appropriate?",
      choices: [
        "Have him breathe into a paper bag to raise his carbon dioxide level",
        "Assist ventilations with a bag-mask device at 12 breaths per minute",
        "Coach his breathing, give oxygen as needed, and reassess for other causes",
        "Withhold all treatment and document the episode as purely behavioral",
      ],
      answer: 2,
      why: "Coach and reassess — hyperventilation can also be the first sign of PE, DKA, or sepsis. Paper-bag rebreathing is obsolete and dangerous if the cause is actually hypoxia.",
    },
    {
      tag: "adequate breathing",
      stem: "A patient has a respiratory rate of 8 with barely visible chest rise and cyanotic lips. Which statement BEST describes the required care?",
      choices: [
        "Oxygen by nonrebreathing mask corrects both the rate and the volume",
        "Positive-pressure ventilation is needed because minute volume is inadequate",
        "No intervention is needed until the respiratory rate falls below 6",
        "A nasal cannula at 6 L/min is preferred to avoid over-oxygenating him",
      ],
      answer: 1,
      why: "A mask only enriches the air a patient moves himself. With a slow rate and shallow depth, minute volume is failing, so you must ventilate for him.",
    },
    {
      tag: "cpap contraindication",
      stem: "Which patient in respiratory distress is the POOREST candidate for CPAP?",
      choices: [
        "An awake CHF patient with crackles and a blood pressure of 188/96",
        "An alert COPD patient with wheezing and a blood pressure of 148/84",
        "A lethargic patient who is actively vomiting with a pressure of 82/50",
        "An anxious pneumonia patient with hypoxia and a pressure of 136/78",
      ],
      answer: 2,
      why: "CPAP demands an awake patient who can protect the airway and tolerate raised intrathoracic pressure. Vomiting, obtundation, and hypotension are hard stops.",
    },
    {
      tag: "airway obstruction",
      stem: "A conscious adult at dinner suddenly cannot speak, clutches his throat, and makes no sound when he tries to cough. Which action is MOST appropriate?",
      choices: [
        "Deliver abdominal thrusts until the object clears or he goes unresponsive",
        "Encourage forceful coughing and monitor his oxygen saturation closely",
        "Perform a blind finger sweep to locate and remove the foreign body",
        "Apply a nonrebreathing mask and transport him in a seated position",
      ],
      answer: 0,
      why: "Silence and no air movement mean a complete obstruction. Abdominal thrusts are indicated; coughing only helps with a partial obstruction, and blind sweeps push objects deeper.",
    },
  ]),

  // ───────────────────────── 17 · Cardiovascular ─────────────────────────
  ...exam(17, [
    {
      tag: "acs aspirin",
      stem: "A 62-year-old man has crushing substernal pressure for 30 minutes with nausea and diaphoresis. BP 142/88, pulse 96, SpO2 96%. He has no allergies, no bleeding disorder, and has taken nothing today. After oxygen as indicated, which action is MOST appropriate?",
      choices: [
        "Give 324 mg of chewable aspirin and continue your cardiac assessment",
        "Give a full 650 mg dose of enteric-coated aspirin to swallow with water",
        "Give nitroglycerin first and then reassess whether aspirin is warranted",
        "Withhold all medication until the hospital obtains a 12-lead tracing",
      ],
      answer: 0,
      why: "Chewed aspirin, 160–325 mg (commonly four 81 mg tablets), is the earliest survival benefit an EMT can deliver. Enteric-coated tablets absorb far too slowly to help now.",
    },
    {
      tag: "nitroglycerin pde5",
      stem: "A 55-year-old man with prescribed nitroglycerin has chest pain rated 8/10. BP 138/84, pulse 88. He mentions he took sildenafil about 10 hours ago. The MOST appropriate action is to:",
      choices: [
        "Give one nitroglycerin tablet since his blood pressure is adequate",
        "Withhold nitroglycerin because of the risk of profound hypotension",
        "Give a half tablet of nitroglycerin to reduce the hypotension risk",
        "Give nitroglycerin only after his pressure rises above 160 systolic",
      ],
      answer: 1,
      why: "PDE-5 inhibitors plus nitrates can drop pressure catastrophically. Sildenafil and vardenafil hold nitro for 24 hours, tadalafil for 48 — dose splitting does not make it safe.",
    },
    {
      tag: "nitroglycerin hypotension",
      stem: "A 70-year-old woman with chest pressure has already taken three of her own nitroglycerin tablets with no relief. She is now pale and lightheaded. BP 88/56, pulse 104, SpO2 94%. Which action is MOST appropriate?",
      choices: [
        "Give one more nitroglycerin tablet to complete the standard three-dose set",
        "Withhold nitroglycerin, keep her supine, give aspirin, and transport",
        "Have her sit fully upright and give oxygen by nasal cannula at 4 L/min",
        "Delay transport until her systolic pressure climbs back above 100 mm Hg",
      ],
      answer: 1,
      why: "Nitro is contraindicated with a systolic below about 100 and she has already reached the three-dose limit. Lay her down, give aspirin if not contraindicated, and go.",
    },
    {
      tag: "nitroglycerin reassessment",
      stem: "You have medical direction to assist a chest-pain patient with nitroglycerin. Which practice is MOST appropriate between doses?",
      choices: [
        "Recheck blood pressure and pain before each dose, at 5-minute intervals",
        "Give all three doses back to back and then obtain one set of vital signs",
        "Recheck only the pain score, since the pressure rarely changes with nitrates",
        "Recheck the pressure only if the patient reports feeling dizzy or faint",
      ],
      answer: 0,
      why: "Nitro is a vasodilator, so every dose earns a fresh pressure and pain score roughly five minutes apart. Stacking doses blind is how you create the hypotension you were trying to avoid.",
    },
    {
      tag: "silent mi",
      stem: "An 80-year-old woman with diabetes reports only fatigue, nausea, and jaw discomfort for two days. She denies chest pain. BP 106/64, pulse 58 and irregular, skin cool and damp. Which statement is MOST accurate?",
      choices: [
        "Her lack of chest pain effectively rules out an acute coronary event",
        "She may be having an atypical myocardial infarction and needs cardiac care",
        "Her symptoms are most consistent with an anxiety disorder in the elderly",
        "Jaw discomfort points to a dental cause rather than a cardiac origin",
      ],
      answer: 1,
      why: "Women, elderly patients, and diabetics often present without classic pain. Fatigue, nausea, and jaw discomfort with cool, damp skin is an MI until proven otherwise.",
    },
    {
      tag: "cardiac arrest",
      stem: "A 60-year-old man collapses in front of you. He is unresponsive, pulseless, and apneic. Your AED is at your side. Which action is MOST appropriate?",
      choices: [
        "Begin chest compressions while your partner applies and analyzes with the AED",
        "Deliver two minutes of rescue breathing before any compressions are started",
        "Complete a full set of baseline vital signs before attaching the AED pads",
        "Load and transport immediately and attach the AED once in the ambulance",
      ],
      answer: 0,
      why: "Compressions start now and pause only for the analysis and shock. In a witnessed arrest, early defibrillation plus minimal interruptions is the whole ballgame.",
    },
    {
      tag: "aed special",
      stem: "You are preparing to defibrillate a patient with an implanted pacemaker visible as a bulge below the left clavicle. Which action is MOST appropriate?",
      choices: [
        "Withhold defibrillation entirely because the implanted device will be damaged",
        "Place the pads at least one inch away from the implanted device and shock",
        "Place one pad directly over the device to deliver the current efficiently",
        "Deactivate the pacemaker with a magnet before applying any AED pads",
      ],
      answer: 1,
      why: "Shift the pads about an inch off the generator and treat the arrest normally. Refusing to shock guarantees death, and pads placed over the device waste current.",
    },
    {
      tag: "aortic aneurysm",
      stem: "A 74-year-old man has sudden tearing pain in his abdomen radiating to his back. BP 92/60, pulse 122, and the femoral pulses are noticeably unequal. Which action is MOST appropriate?",
      choices: [
        "Palpate deeply for a pulsatile mass to confirm your working diagnosis",
        "Give aspirin and nitroglycerin for the suspected coronary syndrome",
        "Give oxygen, handle him gently, keep him supine, and transport rapidly",
        "Have him ambulate to the cot to assess whether exertion worsens his pain",
      ],
      answer: 2,
      why: "Tearing pain with unequal femoral pulses and hypotension is a dissecting or leaking aneurysm. Deep palpation can rupture it, and nitro plus aspirin makes bleeding worse.",
    },
    {
      tag: "cardiogenic shock",
      stem: "A 67-year-old woman two hours into chest pain is now confused. BP 74/50, pulse 128 and weak, respirations 28 with crackles at both bases, skin ashen and clammy. This presentation MOST suggests:",
      choices: [
        "Hypovolemic shock from an unrecognized gastrointestinal hemorrhage",
        "Cardiogenic shock from a failing left ventricle after infarction",
        "Anaphylactic shock from a delayed reaction to her home medication",
        "Neurogenic shock from an evolving brainstem cerebrovascular event",
      ],
      answer: 1,
      why: "Pump failure after an MI produces hypotension plus pulmonary crackles. Hypovolemic and neurogenic shock do not fill the lungs with fluid, and neurogenic shock is typically bradycardic.",
    },
    {
      tag: "acs positioning",
      stem: "A 58-year-old man with chest pressure is anxious and short of breath. BP 148/90, pulse 92, SpO2 97% on room air. Which combination is MOST appropriate?",
      choices: [
        "Position of comfort, calm reassurance, aspirin, and limited exertion",
        "Supine positioning, high-flow oxygen, and a rapid walk to the ambulance",
        "Trendelenburg positioning, oxygen by mask, and vigorous deep breathing",
        "Left lateral recumbent positioning with oxygen and oral fluids for nausea",
      ],
      answer: 0,
      why: "Reduce myocardial workload: comfortable position, keep him calm, give aspirin, and carry him. With a saturation of 97% he does not need oxygen, and he should not be walking.",
    },
    {
      tag: "hypertensive emergency",
      stem: "A 66-year-old woman has a severe headache and blurred vision. BP 226/128, pulse 84, and she is oriented but nauseated. Which action is MOST appropriate?",
      choices: [
        "Give her prescribed nitroglycerin to bring the pressure down quickly",
        "Keep her calm with the head slightly elevated and transport for evaluation",
        "Have her lie flat with legs raised to improve cerebral blood flow",
        "Encourage her to take an extra dose of her home blood pressure pill",
      ],
      answer: 1,
      why: "EMTs do not chase blood pressure with medication. Minimize stimulation, elevate the head slightly, monitor for stroke signs, and let the hospital lower it in a controlled way.",
    },
    {
      tag: "chf vs acs",
      stem: "Two patients call within the hour. Patient A has pressure-like chest pain relieved somewhat by rest; Patient B has progressive dyspnea when lying flat with bilateral crackles and ankle edema. Which statement is MOST accurate?",
      choices: [
        "Patient A suggests angina, while Patient B suggests congestive heart failure",
        "Both patients are presenting with the identical underlying coronary syndrome",
        "Patient A suggests heart failure, while Patient B suggests stable angina",
        "Neither presentation requires cardiac monitoring or hospital transport",
      ],
      answer: 0,
      why: "Exertional pressure that eases with rest is angina. Orthopnea with crackles and dependent edema is failure — related plumbing, different problem, different treatment.",
    },
  ]),

  // ───────────────────────── 18 · Neurologic ─────────────────────────
  ...exam(18, [
    {
      tag: "stroke window",
      stem: "A 70-year-old man has right facial droop and left-arm weakness. His wife says he was fine when she left for work at 6 a.m. and she found him this way at 11 a.m. It is now 11:30 a.m. Which piece of information is MOST important to relay to the hospital?",
      choices: [
        "The time she discovered him, because that anchors the treatment window",
        "The last time he was known to be at his normal neurologic baseline",
        "His complete home medication list and the name of his primary doctor",
        "His pain score and a full OPQRST history of the weakness onset",
      ],
      answer: 1,
      why: "Thrombolytic and thrombectomy eligibility runs from last known well, not from discovery. Here that is 6 a.m., which is what the stroke team needs to hear.",
    },
    {
      tag: "fast exam",
      stem: "Which set of findings BEST represents a positive prehospital stroke screen?",
      choices: [
        "Facial droop, arm drift, and slurred or abnormal speech",
        "Headache, photophobia, and a stiff neck on passive flexion",
        "Chest pressure, diaphoresis, and radiating left arm pain",
        "Fever, productive cough, and unilateral crackles on auscultation",
      ],
      answer: 0,
      why: "Cincinnati/FAST checks face, arms, and speech — plus time. The other clusters describe meningitis, an acute coronary syndrome, and pneumonia.",
    },
    {
      tag: "stroke mimic",
      stem: "A 61-year-old woman has sudden slurred speech and right-sided weakness. She is diaphoretic and takes glipizide. BP 152/88, pulse 104. Which action is MOST appropriate before calling a stroke alert?",
      choices: [
        "Check her blood glucose, because hypoglycemia can mimic stroke exactly",
        "Give her prescribed aspirin to treat the presumed ischemic stroke",
        "Have her drink orange juice to rule out a low blood sugar reading",
        "Repeat the stroke scale three times to confirm the deficit is real",
      ],
      answer: 0,
      why: "Hypoglycemia is the great stroke imitator, and sulfonylureas make it likely. Test the sugar; never put anything oral into a patient with slurred speech and a shaky airway.",
    },
    {
      tag: "postictal",
      stem: "A 27-year-old man had a witnessed generalized seizure that stopped before your arrival. He is now drowsy, confused, incontinent of urine, and slowly improving. Respirations 16 and adequate, SpO2 95%, glucose 96. Which action is MOST appropriate?",
      choices: [
        "Insert an oral airway now to prevent another airway obstruction",
        "Position him on his side, monitor the airway, and transport calmly",
        "Perform vigorous stimulation to speed his return to full orientation",
        "Hyperventilate him with a bag-mask device to clear the confusion",
      ],
      answer: 1,
      why: "Postictal confusion resolves on its own. Recovery position protects the airway from vomit and secretions; adjuncts and hyperventilation just create problems.",
    },
    {
      tag: "status epilepticus",
      stem: "You arrive to find a 40-year-old woman who has been seizing continuously for about 9 minutes. She is cyanotic with clenched jaws and SpO2 reads 79%. Which action is MOST appropriate?",
      choices: [
        "Force an oral airway between the teeth to protect her tongue from injury",
        "Restrain her limbs firmly to stop the movements and prevent further injury",
        "Apply oxygen, support ventilation as able, request ALS, and transport now",
        "Wait an additional 10 minutes to see whether the activity stops on its own",
      ],
      answer: 2,
      why: "Seizing beyond about 5 minutes is status epilepticus — a true emergency needing ALS benzodiazepines. Oxygenate and ventilate as you can; never pry the jaw or restrain limbs.",
    },
    {
      tag: "tia",
      stem: "A 66-year-old man had 20 minutes of slurred speech and right-hand clumsiness that has completely resolved. He now has a normal neurologic exam and refuses transport. Which statement is MOST accurate?",
      choices: [
        "Resolution confirms a benign event and refusal is medically reasonable",
        "A transient ischemic attack carries high near-term stroke risk and he should go",
        "He can safely drive himself in later if symptoms recur within 48 hours",
        "Aspirin at home eliminates the need for any emergency department workup",
      ],
      answer: 1,
      why: "A TIA is a warning shot — stroke risk is highest in the following days. Document a careful refusal discussion, but strongly encourage transport for urgent workup.",
    },
    {
      tag: "increased icp",
      stem: "A patient with a severe headache after a fall now has BP 204/96, pulse 48, and irregular respirations with periods of apnea. This triad MOST indicates:",
      choices: [
        "Decompensated hypovolemic shock from an occult internal hemorrhage",
        "Rising intracranial pressure with impending brainstem herniation",
        "An acute anxiety reaction with associated autonomic instability",
        "A vasovagal episode triggered by the pain of his scalp laceration",
      ],
      answer: 1,
      why: "Cushing's triad — hypertension, bradycardia, irregular breathing — signals dangerous intracranial pressure. Shock moves the numbers the opposite direction.",
    },
    {
      tag: "icp management",
      stem: "For that same head-injured patient with signs of rising intracranial pressure, which management approach is MOST appropriate?",
      choices: [
        "Elevate the head about 30 degrees, ventilate at a normal rate, and maintain oxygenation",
        "Place him in Trendelenburg position and hyperventilate at 30 breaths per minute",
        "Keep him flat, restrict oxygen, and allow permissive hypotension en route",
        "Sit him fully upright and encourage him to breathe rapidly and deeply",
      ],
      answer: 0,
      why: "Head up about 30 degrees helps venous drainage; avoid hypoxia and hypotension above all. Routine aggressive hyperventilation lowers cerebral blood flow and worsens injury.",
    },
    {
      tag: "subarachnoid",
      stem: "A 45-year-old woman describes a sudden 'worst headache of my life' that peaked within seconds while gardening. She is nauseated, photophobic, and has neck stiffness. BP 178/96. This MOST suggests:",
      choices: [
        "A migraine headache triggered by heat and sunlight exposure",
        "A tension headache from sustained neck and shoulder posture",
        "A subarachnoid hemorrhage from a ruptured cerebral aneurysm",
        "Cluster headaches occurring in a predictable seasonal pattern",
      ],
      answer: 2,
      why: "Thunderclap onset with neck stiffness and photophobia is aneurysmal bleeding. Migraines and tension headaches build gradually and do not stiffen the neck.",
    },
    {
      tag: "stroke care",
      stem: "You are transporting a patient with a suspected stroke who has a facial droop and is drooling. Which action is MOST appropriate en route?",
      choices: [
        "Give small sips of water to relieve her obvious dry mouth and thirst",
        "Keep her NPO, position to protect the airway, and have suction ready",
        "Give oral glucose gel routinely for every suspected stroke patient",
        "Lower the head of the cot fully flat to maximize cerebral perfusion",
      ],
      answer: 1,
      why: "Stroke wrecks swallowing, so nothing by mouth and suction within reach. Glucose is given only for a documented low reading, not as a reflex.",
    },
    {
      tag: "seizure history",
      stem: "A bystander reports a patient 'had a seizure.' Which piece of history is MOST useful to the receiving physician?",
      choices: [
        "The exact street address where the seizure activity first began",
        "How long it lasted, what it looked like, and whether he has a seizure history",
        "Whether the bystander has personally witnessed a seizure before today",
        "The patient's insurance carrier and his preferred receiving hospital",
      ],
      answer: 1,
      why: "Duration, description, and prior history separate a routine breakthrough seizure from a first-time event or status — that is what changes the hospital's workup.",
    },
  ]),

  // ───────────────────────── 30 · Chest Injuries ─────────────────────────
  ...exam(30, [
    {
      tag: "flail chest",
      stem: "After a steering-wheel impact, a 48-year-old man has a segment of his left chest that moves inward during inhalation and outward during exhalation. Respirations are 30 and shallow, SpO2 87%, BP 118/76. Which action is MOST appropriate?",
      choices: [
        "Tape a bulky dressing tightly around the entire chest to splint the segment",
        "Assist ventilations with a bag-mask device and high-concentration oxygen",
        "Apply a nonrebreathing mask and let him breathe in a position of comfort",
        "Perform needle decompression on the affected side of the chest wall",
      ],
      answer: 1,
      why: "Paradoxical motion means flail chest, and shallow breathing at 30 with hypoxia cannot be fixed by a mask. Positive-pressure ventilation splints internally; circumferential taping restricts the good lung too.",
    },
    {
      tag: "open chest wound",
      stem: "A 31-year-old man has a stab wound to the right anterior chest that bubbles with each breath. He is anxious, respirations 26, BP 112/70. Which action is MOST appropriate?",
      choices: [
        "Cover the wound with a vented occlusive dressing sealed on three sides",
        "Pack the wound tightly with sterile gauze to stop the escaping air",
        "Cover the wound with dry absorbent gauze taped on all four sides",
        "Leave the wound uncovered so accumulating air can escape freely",
      ],
      answer: 0,
      why: "A sucking chest wound needs an occlusive seal that lets air out but not in — commercial vented chest seal or a three-sided taped dressing. Packing and full seals invite tension pneumothorax.",
    },
    {
      tag: "tension pneumothorax",
      stem: "Minutes after you seal an open chest wound, the patient becomes severely dyspneic. Breath sounds are now absent on the injured side, neck veins are distended, BP has fallen to 76/50, and pulse is 138. Which action is MOST appropriate?",
      choices: [
        "Replace the dressing with a tighter seal and increase the oxygen flow",
        "Briefly lift one corner of the dressing to release the trapped air",
        "Roll him onto the injured side and continue transport without changes",
        "Begin chest compressions because cardiac output has become inadequate",
      ],
      answer: 1,
      why: "Those findings are a developing tension pneumothorax created by your own seal. 'Burping' the dressing vents the pressure; tightening it accelerates the arrest.",
    },
    {
      tag: "tension pneumothorax signs",
      stem: "Which set of findings BEST distinguishes a tension pneumothorax from a simple pneumothorax?",
      choices: [
        "Unilateral chest pain with mildly diminished sounds and stable vital signs",
        "Hypotension, distended neck veins, and absent sounds with severe distress",
        "Bilateral crackles with frothy sputum and a rising systolic blood pressure",
        "Localized subcutaneous emphysema with normal perfusion and mentation",
      ],
      answer: 1,
      why: "Tension physiology is a circulation problem: rising intrathoracic pressure kinks venous return, producing hypotension and jugular distention. A simple pneumothorax leaves perfusion intact.",
    },
    {
      tag: "tamponade",
      stem: "A 26-year-old man with a small stab wound near the sternum has muffled heart tones, distended neck veins, and BP 84/70 with a pulse of 130. Breath sounds are equal and clear bilaterally. This MOST suggests:",
      choices: [
        "A tension pneumothorax developing on the left side of the chest",
        "Pericardial tamponade compressing the heart and limiting filling",
        "A massive hemothorax filling the left pleural cavity with blood",
        "A pulmonary contusion causing progressive hypoxia and hypotension",
      ],
      answer: 1,
      why: "Beck's triad plus a very narrow pulse pressure with clear, equal lung sounds points at tamponade. Tension pneumothorax and hemothorax both change breath sounds.",
    },
    {
      tag: "rib fracture",
      stem: "A 70-year-old woman has three fractured ribs after a fall. She is splinting her chest and refusing to breathe deeply. SpO2 94%, respirations 22, BP 138/82. Which management approach is MOST appropriate?",
      choices: [
        "Apply a tight circumferential swathe to immobilize the fractured ribs",
        "Encourage deep breathing and coughing while supporting her positioning",
        "Instruct her to breathe as shallowly as possible to minimize her pain",
        "Immobilize her on a long backboard to limit all chest wall movement",
      ],
      answer: 1,
      why: "The real threat is atelectasis and pneumonia from splinting. Support her comfortably and coach deep breaths; strapping the chest tightly is an outdated practice that causes the very problem you fear.",
    },
    {
      tag: "commotio cordis",
      stem: "A 14-year-old baseball player is struck in the mid-chest by a line drive and collapses. He is unresponsive, pulseless, and apneic with no external injury. Which action is MOST appropriate?",
      choices: [
        "Begin CPR and apply the AED immediately for probable ventricular fibrillation",
        "Assume a spinal injury and complete full immobilization before any care",
        "Perform needle decompression for a presumed traumatic pneumothorax",
        "Provide rescue breathing only until a paramedic unit arrives on scene",
      ],
      answer: 0,
      why: "A blunt blow during the vulnerable repolarization window causes commotio cordis — V-fib with a structurally normal heart. Early CPR with prompt defibrillation is the definitive fix.",
    },
    {
      tag: "traumatic asphyxia",
      stem: "A worker was pinned under a collapsed load across his chest. He has a deeply cyanotic, swollen face and neck, bloodshot eyes, and petechiae above the clavicles while his chest and abdomen appear pale. This finding MOST indicates:",
      choices: [
        "Traumatic asphyxia from sudden severe compression of the thorax",
        "Anaphylaxis with facial angioedema from an unrecognized exposure",
        "Carbon monoxide poisoning from equipment operating in a closed space",
        "A basilar skull fracture producing periorbital and mastoid bruising",
      ],
      answer: 0,
      why: "Crushing force drives blood retrograde out of the chest into the head and neck. The sharp demarcation at the clavicles is the giveaway, and it implies major underlying thoracic injury.",
    },
    {
      tag: "hemothorax",
      stem: "A gunshot patient has absent breath sounds and dullness to percussion over the right base, BP 78/48, pulse 132, skin cool and pale, with flat neck veins. This MOST suggests:",
      choices: [
        "A tension pneumothorax with air trapped under increasing pressure",
        "A massive hemothorax with blood loss into the pleural space",
        "Pericardial tamponade from a small penetrating cardiac wound",
        "A simple pneumothorax with no significant hemodynamic effect",
      ],
      answer: 1,
      why: "Dullness plus flat neck veins and shock means the chest is filling with blood, not air. Tension pneumothorax and tamponade both distend the neck veins.",
    },
    {
      tag: "priorities",
      stem: "A patient has an open chest wound, a fractured forearm, and a scalp laceration bleeding moderately. He is dyspneic with SpO2 89%. Which sequence of care is MOST appropriate?",
      choices: [
        "Splint the forearm, dress the scalp, then seal the chest wound and oxygenate",
        "Seal the chest wound and oxygenate, control scalp bleeding, then splint the arm",
        "Dress the scalp first because head wounds bleed most dramatically of the three",
        "Splint the forearm first to prevent any conversion to an open fracture",
      ],
      answer: 1,
      why: "Airway and breathing outrank everything. Seal the chest and fix oxygenation, then handle bleeding, then splint the orthopaedic injury — ideally en route.",
    },
    {
      tag: "pulmonary contusion",
      stem: "A restrained driver has no external chest injury but becomes progressively more hypoxic over 20 minutes, with SpO2 falling from 96% to 88% and crackles developing in one lung field. Breath sounds are present bilaterally. This MOST suggests:",
      choices: [
        "A pulmonary contusion from blunt deceleration force to the chest",
        "A tension pneumothorax developing slowly behind the sternum",
        "Simple hyperventilation related to the stress of the collision",
        "An acute asthma exacerbation triggered by airbag propellant dust",
      ],
      answer: 0,
      why: "Bruised lung tissue leaks and stiffens over time, so hypoxia worsens gradually with present but abnormal sounds. That slow slide is the hallmark of contusion.",
    },
  ]),

  // ───────────────── 31 · Abdominal & Genitourinary Injuries ─────────────────
  ...exam(31, [
    {
      tag: "evisceration",
      stem: "A 29-year-old man has a slashing abdominal wound with a loop of bowel protruding. He is alert, BP 108/68, pulse 116. Which action is MOST appropriate?",
      choices: [
        "Gently replace the bowel into the abdomen and cover with dry gauze",
        "Cover the organs with moist sterile dressings, then an occlusive layer",
        "Pack the wound with dry sterile gauze and apply firm direct pressure",
        "Leave the organs exposed to open air and transport without dressing",
      ],
      answer: 1,
      why: "Never push organs back in — that contaminates the peritoneum. Moist sterile dressings prevent drying, and an occlusive cover holds in heat and moisture.",
    },
    {
      tag: "impaled object",
      stem: "A 40-year-old woman has a metal rod impaled in her right flank. She is alert, BP 114/74, pulse 104, with moderate bleeding around the object. Which action is MOST appropriate?",
      choices: [
        "Remove the rod carefully and then pack the resulting wound tract",
        "Stabilize the object in place with bulky dressings and control bleeding",
        "Push the object further in so the tip does not catch during movement",
        "Cut the object flush with the skin before applying any dressing",
      ],
      answer: 1,
      why: "The object may be tamponading a vessel. Stabilize it where it sits, control bleeding around it, and let the operating room remove it — shorten it only if it blocks transport.",
    },
    {
      tag: "blunt abdominal trauma",
      stem: "An unrestrained driver has a rigid, tender abdomen with a seatbelt-pattern bruise. BP 88/58, pulse 126, respirations 24, skin cool and clammy. Which action is MOST appropriate?",
      choices: [
        "Perform a detailed four-quadrant palpation exam to localize the bleeding",
        "Give oxygen, keep him warm and supine, and transport rapidly to trauma care",
        "Offer small sips of water for his complaints of intense thirst and dry mouth",
        "Apply a pelvic binder and delay transport until his pressure has improved",
      ],
      answer: 1,
      why: "A rigid abdomen with hypotension is internal hemorrhage — surgery is the only treatment. Keep him warm, oxygenated, and moving; repeated deep palpation and oral fluids only cause harm.",
    },
    {
      tag: "kehr sign",
      stem: "A hockey player took a puck to the left lower ribs and now complains of left shoulder pain with a tender left upper quadrant. BP 106/70, pulse 118. This referred pain MOST suggests injury to the:",
      choices: [
        "Spleen, with blood irritating the diaphragm on the left side",
        "Liver, with capsular stretching referring pain to the shoulder",
        "Left kidney, with retroperitoneal blood tracking upward",
        "Stomach, with acid escaping through a small perforation",
      ],
      answer: 0,
      why: "Kehr's sign — left shoulder pain from diaphragmatic irritation by blood — points to the spleen, which sits right behind those lower left ribs.",
    },
    {
      tag: "kidney injury",
      stem: "A patient kicked in the left flank has flank tenderness, bruising along the flank, and reports blood in his urine. Which statement is MOST accurate?",
      choices: [
        "Retroperitoneal kidney injury is likely and bleeding may be hidden from view",
        "Hematuria after blunt trauma is an expected finding requiring no evaluation",
        "The peritoneum will become rigid early, making the injury easy to detect",
        "Kidney injuries rarely bleed significantly because the organ is well protected",
      ],
      answer: 0,
      why: "The kidneys sit retroperitoneally, so blood can accumulate substantially without peritoneal signs. Flank bruising with hematuria means a serious injury that needs imaging.",
    },
    {
      tag: "hollow organ",
      stem: "Which statement BEST describes the difference between hollow and solid organ injury in blunt abdominal trauma?",
      choices: [
        "Hollow organs spill contents causing peritonitis; solid organs bleed heavily",
        "Hollow organs bleed heavily immediately; solid organs cause delayed infection",
        "Both organ types present identically and need no distinction in the field",
        "Hollow organ injury is always fatal, whereas solid organ injury rarely is",
      ],
      answer: 0,
      why: "Ruptured hollow organs leak acid, bile, and stool that inflame the peritoneum over hours. Solid organs like the spleen and liver are vascular and hemorrhage fast.",
    },
    {
      tag: "peritonitis",
      stem: "A 52-year-old woman lies very still with knees drawn up, guarding her abdomen. She has rebound tenderness, a temperature of 101.4°F, pulse 112, and absent bowel sounds. Which action is MOST appropriate?",
      choices: [
        "Give oral antacids and encourage her to walk to relieve the trapped gas",
        "Keep her NPO, position her for comfort, monitor for shock, and transport",
        "Press deeply and repeatedly to map the precise location of the tenderness",
        "Apply a hot pack to the abdomen and delay transport until pain subsides",
      ],
      answer: 1,
      why: "That guarded, knees-up posture with rebound tenderness is peritonitis. Supportive care, nothing by mouth, and transport — heat and oral medication can worsen bleeding or inflammation.",
    },
    {
      tag: "pelvic fracture gu",
      stem: "A motorcyclist has an unstable pelvis, blood at the urethral meatus, and scrotal bruising. BP 84/54, pulse 130. Which action is MOST appropriate?",
      choices: [
        "Rock the pelvis to assess instability and document the degree of motion",
        "Apply a pelvic binder or sheet, minimize movement, and transport rapidly",
        "Insert a urinary catheter to relieve the bladder before you begin transport",
        "Log roll him repeatedly to inspect the entire perineum before packaging",
      ],
      answer: 1,
      why: "Blood at the meatus signals urethral injury, and the unstable pelvis is bleeding into the retroperitoneum. Bind, keep him still, and go — rocking the pelvis restarts the bleeding.",
    },
    {
      tag: "genital injury",
      stem: "A 25-year-old woman has significant bleeding from an external genital laceration after a straddle-type fall. She is alert, BP 118/74, pulse 98. Which action is MOST appropriate?",
      choices: [
        "Pack the vaginal canal firmly with sterile gauze to tamponade the bleeding",
        "Apply direct pressure with sterile dressings over the external wound only",
        "Irrigate the wound with sterile saline under pressure to clear debris",
        "Apply a tourniquet proximal to the injury to control the active bleeding",
      ],
      answer: 1,
      why: "External pressure with sterile dressings controls it while preserving dignity. EMTs do not pack the vaginal canal, and tourniquets have no place on the pelvis.",
    },
    {
      tag: "seatbelt sign",
      stem: "A restrained passenger has a horizontal bruise across the lower abdomen and reports mild discomfort. Vital signs are currently normal. Which statement is MOST accurate?",
      choices: [
        "Normal vital signs reliably exclude significant intra-abdominal injury here",
        "A seatbelt sign warrants trauma evaluation because injury can present late",
        "The bruise is a superficial finding that needs only an ice pack at home",
        "Discomfort without rigidity means the peritoneum could not be involved",
      ],
      answer: 1,
      why: "Seatbelt sign is associated with bowel, mesenteric, and lumbar injuries that declare themselves hours later. Young patients compensate right up until they crash.",
    },
    {
      tag: "shock progression",
      stem: "A patient with suspected liver laceration initially had BP 124/80 and pulse 92. Twenty minutes later he is anxious, BP 96/78, pulse 128, with cool, mottled knees. Which action is MOST appropriate?",
      choices: [
        "Continue the same plan since the systolic pressure remains above 90",
        "Recognize worsening hemorrhagic shock, keep him warm, and expedite transport",
        "Have him sit fully upright to improve his breathing and reduce his anxiety",
        "Give oral fluids to replace the estimated intravascular volume lost",
      ],
      answer: 1,
      why: "Narrowing pulse pressure, rising heart rate, anxiety, and mottling are a patient decompensating. Preserve body heat, oxygenate, and shorten the clock to the operating room.",
    },
  ]),

  // ───────────────────── 32 · Orthopaedic Injuries ─────────────────────
  ...exam(32, [
    {
      tag: "psm assessment",
      stem: "You are preparing to splint a deformed forearm. Which practice is MOST appropriate?",
      choices: [
        "Assess pulse, motor function, and sensation before and after splinting",
        "Assess distal circulation only after the splint is completely secured",
        "Assess only the pulse, since motor and sensory testing increases pain",
        "Skip distal checks entirely when the deformity is obvious on inspection",
      ],
      answer: 0,
      why: "PMS before and after is the standard — it is the only way to know whether your splint helped or created a new vascular or nerve problem. Document both sets.",
    },
    {
      tag: "traction splint",
      stem: "Which patient is the BEST candidate for a traction splint?",
      choices: [
        "An isolated closed mid-shaft femur fracture with an intact distal pulse",
        "A mid-shaft femur fracture with an obviously unstable pelvic fracture",
        "A distal tibia fracture with an associated dislocated ipsilateral knee",
        "A femur fracture with a partial amputation just above the knee joint",
      ],
      answer: 0,
      why: "Traction splints are for isolated mid-shaft femur fractures. Pelvic instability, knee or lower-leg injury, and near-amputation all contraindicate pulling on the limb.",
    },
    {
      tag: "absent pulse",
      stem: "A 19-year-old has a severely angulated mid-shaft tibia fracture. The foot is pale, cool, and pulseless, with delayed capillary refill. Transport time is 25 minutes. Which action is MOST appropriate?",
      choices: [
        "Splint the limb exactly as found and reassess the pulse every 5 minutes",
        "Apply gentle in-line traction to realign once, then splint and recheck PMS",
        "Apply a tourniquet above the fracture to control unseen internal bleeding",
        "Manipulate the fracture repeatedly until a strong pulse can be palpated",
      ],
      answer: 1,
      why: "A pulseless distal limb is a time-critical threat, so one careful attempt at gentle realignment is justified before splinting. Repeated manipulation only adds damage.",
    },
    {
      tag: "splint selection",
      stem: "A 33-year-old woman has a painful, swollen, closed mid-forearm injury with good distal pulses. Which immobilization approach is MOST appropriate?",
      choices: [
        "A rigid splint including the wrist and elbow, with the hand supported",
        "A traction splint applied to maintain continuous longitudinal pull",
        "A sling and swathe alone with no rigid support under the forearm",
        "A rigid splint limited strictly to the fracture site on the forearm",
      ],
      answer: 0,
      why: "Immobilize the joint above and below the injury. Traction splints are femur-only, and support stopping at the fracture site lets the bone ends grind with every bump.",
    },
    {
      tag: "open fracture",
      stem: "A patient has an open tibia fracture with bone visible through a 3 cm wound and controlled bleeding. Which action is MOST appropriate?",
      choices: [
        "Scrub the exposed bone thoroughly with antiseptic before you splint it",
        "Cover with a moist sterile dressing, splint the limb, and transport promptly",
        "Push the bone back beneath the skin to reduce contamination of the wound",
        "Leave the wound open to air and apply a rigid splint directly over the bone",
      ],
      answer: 1,
      why: "Cover with sterile dressing, splint in position, and go — infection risk drives early surgical care. You do not scrub bone or shove it back under the skin.",
    },
    {
      tag: "dislocation",
      stem: "A 22-year-old swimmer has an anterior shoulder dislocation. He holds the arm slightly away from his body and resists any movement. Distal PMS is intact. Which action is MOST appropriate?",
      choices: [
        "Splint the shoulder in the position found using a sling, swathe, and padding",
        "Reduce the dislocation with steady traction before you apply any splint",
        "Force the arm against the chest wall and secure it tightly with a swathe",
        "Have him raise the arm overhead so a rigid splint can be applied properly",
      ],
      answer: 0,
      why: "Splint dislocations as found with generous padding when PMS is intact. Forcing the arm to anatomic position can trap nerves and vessels in the joint.",
    },
    {
      tag: "pelvic binder",
      stem: "A patient thrown from an ATV has pelvic pain, a shortened externally rotated leg, BP 82/52, and pulse 134. Which action is MOST appropriate?",
      choices: [
        "Apply a traction splint to the affected leg before moving to the cot",
        "Apply a commercial pelvic binder or sheet wrap and transport rapidly",
        "Apply bilateral rigid long leg splints and reassess in 10 minutes",
        "Compress the iliac crests firmly to confirm the pelvis is truly unstable",
      ],
      answer: 1,
      why: "Circumferential compression at the greater trochanters limits pelvic bleeding, which can reach liters. Traction splints and instability testing both aggravate the fracture.",
    },
    {
      tag: "compartment syndrome",
      stem: "Two hours after a crush injury to the calf, a patient reports pain far out of proportion to the injury, worsening with passive toe movement. The compartment feels rock hard and he describes numbness. Which statement is MOST accurate?",
      choices: [
        "This suggests compartment syndrome and requires urgent surgical evaluation",
        "This is expected muscle soreness and can be managed with rest and ice",
        "A palpable distal pulse reliably excludes compartment syndrome here",
        "Elevating the limb above the heart is the definitive field treatment",
      ],
      answer: 0,
      why: "Disproportionate pain, pain on passive stretch, a tense compartment, and paresthesia are compartment syndrome. Pulses often stay present until very late — it needs a fasciotomy.",
    },
    {
      tag: "amputation",
      stem: "A worker sustains a complete traumatic amputation of three fingers. Bleeding is controlled and the parts are recovered. Which action is MOST appropriate for the amputated parts?",
      choices: [
        "Wrap them in dry sterile gauze, bag them, and keep them cool, not frozen",
        "Submerge them directly in a container of ice water for the entire transport",
        "Place them in direct contact with ice packs to maximize tissue preservation",
        "Leave them at room temperature in an open basin beside the patient's hand",
      ],
      answer: 0,
      why: "Dry sterile wrap, sealed bag, then cool the bag — keeping tissue cold without freezing it. Direct ice contact and water submersion destroy the tissue you are trying to save.",
    },
    {
      tag: "splinting complication",
      stem: "Ten minutes after you splint an ankle, the patient reports increasing numbness and tingling in the toes, and the foot now looks dusky. Which action is MOST appropriate?",
      choices: [
        "Loosen or reapply the splint and immediately reassess distal PMS",
        "Add another layer of padding and tighten the straps to reduce swelling",
        "Continue transport and let the emergency department address the change",
        "Elevate the extremity above the heart and leave the splint untouched",
      ],
      answer: 0,
      why: "New numbness with a dusky foot means your splint is compressing circulation. Loosen it, recheck PMS, and reapply properly — never tighten into a failing pulse.",
    },
    {
      tag: "femur vs pelvis",
      stem: "A crash patient has both an unstable pelvis and a mid-shaft femur fracture with hypotension. Which immobilization plan is MOST appropriate?",
      choices: [
        "Apply a traction splint to the femur and skip the pelvic stabilization",
        "Stabilize the pelvis with a binder and splint the femur without traction",
        "Apply traction to the femur first, then place the binder over the splint",
        "Apply no stabilization at all and simply transport him on a soft stretcher",
      ],
      answer: 1,
      why: "Traction pulls against an unstable pelvis and worsens hemorrhage, so bind the pelvis and immobilize the femur with a long board or scoop instead.",
    },
    {
      tag: "musculoskeletal priorities",
      stem: "A patient has an obviously fractured ankle, an altered mental status, and snoring respirations after a fall from a roof. Which action takes PRIORITY?",
      choices: [
        "Splint the fractured ankle to prevent further soft tissue damage first",
        "Open and manage the airway while maintaining spinal motion restriction",
        "Obtain a complete set of baseline vital signs before any intervention",
        "Photograph the deformity for the receiving trauma team's documentation",
      ],
      answer: 1,
      why: "Snoring means the airway is closing — nothing outranks that. Splinting is a secondary-survey task that happens once airway, breathing, and circulation are secured.",
    },
  ]),
]

export default EXAM_B2
