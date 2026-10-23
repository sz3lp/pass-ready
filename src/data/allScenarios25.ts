// Auto-generated from NREMT Master Verbal Assessment Compendium (25 Scenarios)
export interface MasterDialogueTurn {
  time: string
  speaker: string
  speech: string
  note: string
}

export interface MasterScenario {
  id: number
  title: string
  cad: string
  hiddenDiagnosis: string
  category: string
  vitals: {
    bp: string
    hr: string
    rr: string
    spo2: string
    bgl: string
    skin: string
    pupils: string
    lungs: string
  }
  trap: string
  initialPatientSpeech: string
  clues: string[]
  dialogue: MasterDialogueTurn[]
  handOffReport: string
  reassessmentVitals: Record<string, string>
}

export const MASTER_SCENARIOS_25: MasterScenario[] = [
{
  "id": 1,
  "title": "48M \u2013 Anterior STEMI / Acute Coronary Syndrome",
  "cad": "Medic 4, respond lights and sirens to 1420 North Industrial Way, construction site, for a 48-year-old male complaining of severe acute chest pain while unloading materials. Clear and warm conditions.",
  "hiddenDiagnosis": "Anterior STEMI / Acute Coronary Syndrome",
  "category": "Cardiovascular",
  "vitals": {
    "bp": "160/88 mmHg",
    "hr": "102 bpm (regular, strong radial)",
    "rr": "24 breaths/min (shallow, dyspneic)",
    "spo2": "97% on ambient room air",
    "bgl": "101 mg/dL",
    "skin": "Pale, cool, diaphoretic",
    "pupils": "PEARRL at 4 mm equal and reactive",
    "lungs": "Clear bilaterally in all anterior and posterior fields"
  },
  "trap": "Failure to verbalize BSI precautions and scene safety prior to touching patient.",
  "initialPatientSpeech": "My name is Mike Roberts... man, I'm just having some really serious chest pain right now.",
  "clues": [
    "Heavy 'crushing' substernal chest pressure radiating down left shoulder and arm (OPQRST Q & R)",
    "Hypertensive (160/88 mmHg) and tachycardic (102 bpm) sympathetic drive",
    "Pale, cool, diaphoretic skin with active nausea",
    "Clear bilateral lung sounds (no pulmonary edema)",
    "Prescribed Nitroglycerin on scene; no contraindications (no ED meds, no active bleeding)"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, respond lights and sirens to commercial construction site for a 48-year-old male experiencing acute chest pain during work.",
      "note": "CAD broadcast received."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "I understand I am dispatched to a construction site for a 48-year-old male experiencing chest pain during work. BSI precautions on: gloves and eye protection. Is my scene safe?",
      "note": "Scene size-up initiated."
    },
    {
      "time": "00:00:20",
      "speaker": "PROCTOR",
      "speech": "Your scene is safe.",
      "note": "Evaluator confirmation."
    },
    {
      "time": "00:00:22",
      "speaker": "EMT CANDIDATE",
      "speech": "The nature of illness is non-traumatic acute chest pain. My number of patients is one. Due to the high-acuity nature of illness, I am requesting ALS backup immediately.",
      "note": "Resource allocation."
    },
    {
      "time": "00:00:35",
      "speaker": "EMT CANDIDATE",
      "speech": "I observe a 48-year-old male sitting on a crate, leaning forward, clutching his chest, visibly pale and diaphoretic. I consider C-spine stabilization, but do not suspect trauma, so C-spine is not indicated.",
      "note": "General impression."
    },
    {
      "time": "00:00:46",
      "speaker": "EMT CANDIDATE",
      "speech": "Hello sir, I'm an EMT. What is your name and what did you call 911 for today?",
      "note": "Introduction and AVPU check."
    },
    {
      "time": "00:00:52",
      "speaker": "PATIENT (MIKE)",
      "speech": "My name is Mike Roberts... man, I'm just having some really serious chest pain right now.",
      "note": "A&O x 4 confirmed."
    },
    {
      "time": "00:00:59",
      "speaker": "EMT CANDIDATE",
      "speech": "Mr. Roberts is alert, oriented, and speaking in full sentences. His airway is patent. How is my patient's breathing?",
      "note": "Airway & breathing eval."
    },
    {
      "time": "00:01:06",
      "speaker": "PROCTOR",
      "speech": "Respirations are 24 breaths per minute, slightly shallow and dyspneic.",
      "note": "Tachypnea noted."
    },
    {
      "time": "00:01:14",
      "speaker": "EMT CANDIDATE",
      "speech": "I am applying high-flow oxygen via non-rebreather mask at 15 liters per minute. Mr. Roberts, do you mind if I touch your wrist to check your pulse?",
      "note": "Oxygen & consent."
    },
    {
      "time": "00:01:22",
      "speaker": "PATIENT (MIKE)",
      "speech": "No, that's fine.",
      "note": "Patient grants consent."
    },
    {
      "time": "00:01:25",
      "speaker": "EMT CANDIDATE",
      "speech": "What is my patient's pulse and skin condition? Do I see any major gross hemorrhage?",
      "note": "Circulation check."
    },
    {
      "time": "00:01:34",
      "speaker": "PROCTOR",
      "speech": "Radial pulse is 102 bpm, regular and strong. Skin is pale, cool, and diaphoretic. No gross bleeding.",
      "note": "Circulation confirmed."
    },
    {
      "time": "00:01:43",
      "speaker": "EMT CANDIDATE",
      "speech": "I have determined this to be a high-priority, load-and-go patient due to suspected acute coronary syndrome. Partner, please obtain a full set of baseline vitals while I begin OPQRST and SAMPLE history with Mr. Roberts.",
      "note": "Load-and-go decision."
    },
    {
      "time": "00:01:58",
      "speaker": "EMT CANDIDATE",
      "speech": "Mr. Roberts, what were you doing today when all of this started?",
      "note": "OPQRST - Onset."
    },
    {
      "time": "00:02:02",
      "speaker": "PATIENT (MIKE)",
      "speech": "I was helping unload a bunch of heavy steel pipe out there on the yard.",
      "note": "Exertional onset."
    },
    {
      "time": "00:02:08",
      "speaker": "EMT CANDIDATE",
      "speech": "Does anything make the pain better or worse, like resting or moving around?",
      "note": "OPQRST - Provocation."
    },
    {
      "time": "00:02:12",
      "speaker": "PATIENT (MIKE)",
      "speech": "Seems like moving around makes it worse, but resting here hasn't stopped it.",
      "note": "Refractory pain."
    },
    {
      "time": "00:02:16",
      "speaker": "EMT CANDIDATE",
      "speech": "Can you describe the pain to me in your own words?",
      "note": "OPQRST - Quality."
    },
    {
      "time": "00:02:20",
      "speaker": "PATIENT (MIKE)",
      "speech": "It really feels like someone parked a forklift on my chest... heavy, crushing pressure.",
      "note": "Classic ischemic description."
    },
    {
      "time": "00:02:25",
      "speaker": "EMT CANDIDATE",
      "speech": "Can you show me where it hurts, and does that pain go anywhere else?",
      "note": "OPQRST - Radiation."
    },
    {
      "time": "00:02:28",
      "speaker": "PATIENT (MIKE)",
      "speech": "Right here in the center of my chest, and it shoots straight down my left arm and into my shoulder.",
      "note": "Left arm radiation."
    },
    {
      "time": "00:02:35",
      "speaker": "EMT CANDIDATE",
      "speech": "On a scale of 1 to 10, with 10 being the worst pain you've ever felt, where is it right now?",
      "note": "OPQRST - Severity."
    },
    {
      "time": "00:02:40",
      "speaker": "PATIENT (MIKE)",
      "speech": "It's an 8 out of 10. Easily an 8.",
      "note": "Severe pain score."
    },
    {
      "time": "00:02:45",
      "speaker": "EMT CANDIDATE",
      "speech": "About how long ago did this start?",
      "note": "OPQRST - Timing."
    },
    {
      "time": "00:02:49",
      "speaker": "PATIENT (MIKE)",
      "speech": "About 30 to 35 minutes ago.",
      "note": "Ischemic duration."
    },
    {
      "time": "00:02:54",
      "speaker": "EMT CANDIDATE",
      "speech": "Are you having any other symptoms today, like dizziness, shortness of breath, or nausea?",
      "note": "Associated symptoms."
    },
    {
      "time": "00:02:59",
      "speaker": "PATIENT (MIKE)",
      "speech": "A little short of breath, and right now I feel pretty nauseous, like I might throw up.",
      "note": "Autonomic symptoms."
    },
    {
      "time": "00:03:05",
      "speaker": "EMT CANDIDATE",
      "speech": "Do you have any allergies to medications?",
      "note": "SAMPLE - Allergies."
    },
    {
      "time": "00:03:09",
      "speaker": "PATIENT (MIKE)",
      "speech": "I'm allergic to penicillin. That's it.",
      "note": "No aspirin allergy."
    },
    {
      "time": "00:03:13",
      "speaker": "EMT CANDIDATE",
      "speech": "What medications do you take, and have you taken any today?",
      "note": "SAMPLE - Medications."
    },
    {
      "time": "00:03:18",
      "speaker": "PATIENT (MIKE)",
      "speech": "I've got this Nitro prescription in my pocket. I took one pill about 5 minutes before you got here.",
      "note": "Prior NTG dose."
    },
    {
      "time": "00:03:25",
      "speaker": "EMT CANDIDATE",
      "speech": "Did that Nitro pill help the pain at all?",
      "note": "Medication efficacy."
    },
    {
      "time": "00:03:28",
      "speaker": "PATIENT (MIKE)",
      "speech": "Took the edge off just a tiny bit, but it's still pounding at an 8.",
      "note": "Partial response."
    },
    {
      "time": "00:03:32",
      "speaker": "EMT CANDIDATE",
      "speech": "Do you have a history of heart problems or why you take Nitro?",
      "note": "SAMPLE - Past History."
    },
    {
      "time": "00:03:36",
      "speaker": "PATIENT (MIKE)",
      "speech": "Yeah, I had a heart attack two years ago, and my doctor gave me the pills for angina.",
      "note": "Established CAD."
    },
    {
      "time": "00:03:42",
      "speaker": "EMT CANDIDATE",
      "speech": "When was the last thing you had to eat or drink?",
      "note": "SAMPLE - Last Oral Intake."
    },
    {
      "time": "00:03:46",
      "speaker": "PATIENT (MIKE)",
      "speech": "I drank a bottle of cold water about 10 minutes ago.",
      "note": "Hydration only."
    },
    {
      "time": "00:03:52",
      "speaker": "EMT CANDIDATE",
      "speech": "Did anything unusual happen before this started, other than unloading pipe?",
      "note": "SAMPLE - Events."
    },
    {
      "time": "00:03:56",
      "speaker": "PATIENT (MIKE)",
      "speech": "No, just a regular workday until my chest exploded.",
      "note": "No trauma."
    },
    {
      "time": "00:04:02",
      "speaker": "EMT CANDIDATE",
      "speech": "Mr. Roberts, I'm going to listen to your lungs on your back, then check your chest. Lean forward for me and take deep breaths. What are my lung sounds?",
      "note": "Auscultation."
    },
    {
      "time": "00:04:36",
      "speaker": "PROCTOR",
      "speech": "Breath sounds are clear and equal bilaterally in all lung bases and apices.",
      "note": "Clear lungs confirmed."
    },
    {
      "time": "00:04:42",
      "speaker": "EMT CANDIDATE",
      "speech": "I auscultate heart tones and palpate your chest wall. Does it hurt more when I push on your ribs?",
      "note": "Chest palpation."
    },
    {
      "time": "00:05:05",
      "speaker": "PATIENT (MIKE)",
      "speech": "No, pushing on it doesn't change it. The pain is deep inside.",
      "note": "Non-musculoskeletal."
    },
    {
      "time": "00:05:13",
      "speaker": "EMT CANDIDATE",
      "speech": "Partner, what are the baseline vitals?",
      "note": "Vitals report."
    },
    {
      "time": "00:05:22",
      "speaker": "PROCTOR",
      "speech": "BP is 160/88 mmHg, HR 102 bpm, RR 24, SpO2 97% on NRB, BGL 101 mg/dL, pupils PEARRL at 4 mm.",
      "note": "Objective parameters."
    },
    {
      "time": "00:05:43",
      "speaker": "EMT CANDIDATE",
      "speech": "Mr. Roberts, do you have any stomach ulcers, active bleeding, recent stroke, or asthma?",
      "note": "Aspirin screening."
    },
    {
      "time": "00:05:48",
      "speaker": "PATIENT (MIKE)",
      "speech": "No, none of those.",
      "note": "Aspirin safe."
    },
    {
      "time": "00:05:52",
      "speaker": "EMT CANDIDATE",
      "speech": "Have you taken any erectile dysfunction medications such as Viagra, Cialis, or Levitra within the past 48 hours?",
      "note": "NTG screening."
    },
    {
      "time": "00:05:57",
      "speaker": "PATIENT (MIKE)",
      "speech": "No, absolutely not.",
      "note": "Phosphodiesterase-5 negative."
    },
    {
      "time": "00:06:05",
      "speaker": "EMT CANDIDATE",
      "speech": "I am administering 324 mg of chewable baby aspirin (four 81 mg tablets). Mr. Roberts, please chew these completely before swallowing.",
      "note": "Aspirin given."
    },
    {
      "time": "00:06:23",
      "speaker": "EMT CANDIDATE",
      "speech": "I inspect Mr. Roberts's nitroglycerin: right patient, right medication 0.4 mg sublingual tablet, expiration date is next year, tablets are clear and dry. Systolic BP is 160 mmHg (>100 mmHg). I contact Medical Control.",
      "note": "Medication 6 Rights."
    },
    {
      "time": "00:06:33",
      "speaker": "EMT CANDIDATE",
      "speech": "Medical Control, this is EMT Candidate on Medic 4. I am on scene with a 48-year-old male with suspected acute myocardial infarction. Vitals: BP 160/88, HR 102, lungs clear. No contraindications or ED meds. Patient took one prescribed Nitro 5 minutes ago with minimal relief. I request authorization to assist with a second dose of 0.4 mg sublingual nitroglycerin.",
      "note": "Medical Control request."
    },
    {
      "time": "00:06:41",
      "speaker": "PROCTOR (MED CONTROL)",
      "speech": "Medic 4, this is Medical Control. You are authorized to assist with one 0.4 mg sublingual nitroglycerin tablet. Recheck BP in 5 minutes.",
      "note": "Authorization given."
    },
    {
      "time": "00:06:50",
      "speaker": "EMT CANDIDATE",
      "speech": "Medical Control, I copy and confirm: I am authorized to assist with one 0.4 mg sublingual nitroglycerin tablet and recheck BP in 5 minutes. Candidate out.",
      "note": "Closed-loop repeat-back."
    },
    {
      "time": "00:07:05",
      "speaker": "EMT CANDIDATE",
      "speech": "Mr. Roberts, place this tablet under your tongue and let it dissolve. It may cause a tingling sensation, a throbbing headache, or mild lightheadedness as it opens up your coronary arteries.",
      "note": "Patient education & admin."
    },
    {
      "time": "00:07:25",
      "speaker": "EMT CANDIDATE",
      "speech": "I package the patient and begin transport. I reassess my patient every 5 minutes: level of consciousness, breathing effort, pain score, and repeat vitals. What are my 5-minute findings?",
      "note": "Reassessment initiated."
    },
    {
      "time": "00:07:38",
      "speaker": "PROCTOR",
      "speech": "Mr. Roberts states chest pain has decreased to a 4 out of 10. Repeat vitals: BP 134/76 mmHg, HR 94 bpm, RR 18 breaths/min, SpO2 99% on NRB.",
      "note": "Hemodynamics stable."
    },
    {
      "time": "00:07:56",
      "speaker": "EMT CANDIDATE",
      "speech": "I provide verbal hand-off report to the incoming ALS paramedic crew: 'This is Mike Roberts, a 48-year-old male presenting with acute substernal crushing chest pain radiating to his left arm, onset 35 minutes ago while unloading heavy materials. Initially rated 8/10 with shortness of breath, diaphoresis, and nausea. History of MI and angina; allergic to penicillin. Baseline vitals: BP 160/88, HR 102, RR 24, SpO2 97%, BGL 101, lungs clear bilaterally. We placed him on 15 L NRB, administered 324 mg chewable aspirin, and assisted with one 0.4 mg sublingual Nitro under medical direction. Repeat vitals: BP 134/76, HR 94, RR 18, and pain has dropped to 4/10. He is stable and ready for your 12-lead.'",
      "note": "Standardized SBAR hand-off."
    },
    {
      "time": "00:08:55",
      "speaker": "PROCTOR",
      "speech": "Are there any questions? Is there anything else you would like to do?",
      "note": "Station wrap-up."
    },
    {
      "time": "00:09:00",
      "speaker": "EMT CANDIDATE",
      "speech": "No questions, and there is nothing else I would like to do. I am done with this station.",
      "note": "Station concluded."
    }
  ],
  "handOffReport": "Mike Roberts, 48M, acute crushing substernal chest pain radiating down left arm, onset 35 mins ago during exertion. Baseline BP 160/88, HR 102, lungs clear bilaterally. History of angina/MI; allergic to penicillin. Administered 15L NRB, 324 mg chewable aspirin, and 0.4 mg sublingual Nitro per medical control. Repeat vitals BP 134/76, HR 94, RR 18, pain reduced from 8/10 to 4/10. Ready for 12-lead transfer.",
  "reassessmentVitals": {
    "bp": "134/76 mmHg",
    "hr": "94 bpm (regular)",
    "rr": "18 breaths/min (unlabored)",
    "spo2": "99% on 15 L/min Non-Rebreather",
    "lung_sounds": "Clear bilaterally",
    "pain_score": "4 / 10 ('Feels much lighter, like the heavy weight lifted')"
  }
},
{
  "id": 2,
  "title": "62M \u2013 Acute Inferior-RV STEMI (The Nitroglycerin Preload Trap)",
  "cad": "Medic 4, respond priority 1 to 842 Elmwood Drive for a 62-year-old male with severe weakness, indigestion, and profound nausea. Caller sounds sluggish.",
  "hiddenDiagnosis": "Acute Inferior-RV STEMI (The Nitroglycerin Preload Trap)",
  "category": "Cardiovascular",
  "vitals": {
    "bp": "108/64 mmHg",
    "hr": "48 bpm (weak, irregular/bradycardic radial)",
    "rr": "20 breaths/min (regular, shallow)",
    "spo2": "93% on ambient air",
    "bgl": "114 mg/dL",
    "skin": "Pale, cool, diaphoretic",
    "pupils": "PEARRL at 3 mm",
    "lungs": "Clear bilaterally in all bases (lungs are dry because right side isn't pumping blood forward)"
  },
  "trap": "Giving Nitroglycerin to a bradycardic (HR < 50 bpm) or borderline hypotensive patient (Automatic Critical Fail!).",
  "initialPatientSpeech": "I just feel... terribly weak. My stomach is on fire... thought it was indigestion from lunch, but I'm cold and sick.",
  "clues": [
    "Epigastric burning discomfort often mistaken for heartburn/indigestion",
    "Severe sinus bradycardia (HR 48 bpm) from right coronary artery (RCA) ischemia feeding the AV node",
    "Borderline systolic blood pressure (BP 108/64 mmHg)",
    "Profuse cold diaphoresis and gray/ashen skin",
    "LETHAL TRAP: Nitroglycerin causes catastrophic venodilation, destroying preload in right ventricular infarcts and triggering profound shock/cardiac arrest"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, priority 1 response to 842 Elmwood Drive, 62-year-old male with severe weakness, indigestion, and nausea.",
      "note": "CAD alert."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to residential address for 62M with severe weakness and indigestion. BSI precautions: gloves, eye protection. Scene safe?",
      "note": "Size-up."
    },
    {
      "time": "00:00:18",
      "speaker": "PROCTOR",
      "speech": "Scene is safe.",
      "note": "Safe verified."
    },
    {
      "time": "00:00:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Nature of illness: suspected acute cardiac event. One patient. I am dispatching ALS backup immediately due to cardiac suspicion.",
      "note": "ALS requested."
    },
    {
      "time": "00:00:32",
      "speaker": "EMT CANDIDATE",
      "speech": "General impression: 62-year-old male slumped in recliner, gray/ashen complexion, profuse forehead diaphoresis. No trauma noted, C-spine not indicated.",
      "note": "General impression."
    },
    {
      "time": "00:00:44",
      "speaker": "EMT CANDIDATE",
      "speech": "Hello sir, my name is EMT Luke. What is going on today?",
      "note": "Primary assessment."
    },
    {
      "time": "00:00:50",
      "speaker": "PATIENT (ARTHUR)",
      "speech": "I just feel... terribly weak. My stomach is on fire... thought it was indigestion from lunch, but I'm cold and sick.",
      "note": "Voice weak, sluggish."
    },
    {
      "time": "00:00:58",
      "speaker": "EMT CANDIDATE",
      "speech": "Patient is alert to verbal, oriented x 4, speaking in sentences. Airway is patent. How is breathing?",
      "note": "Airway eval."
    },
    {
      "time": "00:01:05",
      "speaker": "PROCTOR",
      "speech": "Respirations are 20, slightly shallow.",
      "note": "Breathing rate."
    },
    {
      "time": "00:01:12",
      "speaker": "EMT CANDIDATE",
      "speech": "SpO2 is 93%. I place the patient on 4 L/min oxygen via nasal cannula to titrate between 94-98%. Checking pulse and skin.",
      "note": "Targeted O2 titrate."
    },
    {
      "time": "00:01:23",
      "speaker": "PROCTOR",
      "speech": "Radial pulse is 48 beats per minute, weak and bradycardic. Skin is cold, ashen, and drenched in sweat. No bleeding.",
      "note": "Bradycardia & shock signs."
    },
    {
      "time": "00:01:35",
      "speaker": "EMT CANDIDATE",
      "speech": "This is an immediate high-priority load-and-go patient. The combination of bradycardia, diaphoresis, and epigastric pain indicates acute inferior wall MI. Partner, obtain baseline vitals immediately while I complete history.",
      "note": "Load-and-go decision."
    },
    {
      "time": "00:01:50",
      "speaker": "EMT CANDIDATE",
      "speech": "Arthur, when did this burning pain in your upper stomach start?",
      "note": "OPQRST - Onset."
    },
    {
      "time": "00:01:54",
      "speaker": "PATIENT (ARTHUR)",
      "speech": "About an hour ago while sitting watching TV. Came on out of nowhere.",
      "note": "Sudden rest onset."
    },
    {
      "time": "00:02:00",
      "speaker": "EMT CANDIDATE",
      "speech": "Does anything make it better or worse? Did you try Tums or antacids?",
      "note": "OPQRST - Provocation."
    },
    {
      "time": "00:02:04",
      "speaker": "PATIENT (ARTHUR)",
      "speech": "Took three Tums 30 minutes ago... did nothing at all.",
      "note": "Antacid refractory."
    },
    {
      "time": "00:02:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Can you describe what it feels like?",
      "note": "OPQRST - Quality."
    },
    {
      "time": "00:02:14",
      "speaker": "PATIENT (ARTHUR)",
      "speech": "Heavy gnawing ache right under my ribs. Like a hot rock pressing down.",
      "note": "Epigastric ache."
    },
    {
      "time": "00:02:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Does it move into your jaw, neck, back, or arms?",
      "note": "OPQRST - Radiation."
    },
    {
      "time": "00:02:24",
      "speaker": "PATIENT (ARTHUR)",
      "speech": "A little bit into my lower jaw and my neck feels tight.",
      "note": "Inferior radiation."
    },
    {
      "time": "00:02:30",
      "speaker": "EMT CANDIDATE",
      "speech": "On a 1 to 10 scale, 10 being the worst, how bad is it?",
      "note": "OPQRST - Severity."
    },
    {
      "time": "00:02:34",
      "speaker": "PATIENT (ARTHUR)",
      "speech": "It's a solid 7. I feel like I'm gonna pass out.",
      "note": "Syncope prodrome."
    },
    {
      "time": "00:02:40",
      "speaker": "EMT CANDIDATE",
      "speech": "Any allergies to medications?",
      "note": "SAMPLE - Allergies."
    },
    {
      "time": "00:02:44",
      "speaker": "PATIENT (ARTHUR)",
      "speech": "No known allergies.",
      "note": "No ASA allergy."
    },
    {
      "time": "00:02:48",
      "speaker": "EMT CANDIDATE",
      "speech": "What medications do you take?",
      "note": "SAMPLE - Medications."
    },
    {
      "time": "00:02:52",
      "speaker": "PATIENT (ARTHUR)",
      "speech": "Metformin for diabetes, lisinopril for blood pressure. My wife has Nitro in the cabinet.",
      "note": "Nitro available."
    },
    {
      "time": "00:03:00",
      "speaker": "EMT CANDIDATE",
      "speech": "Have you taken any Viagra, Cialis, or Levitra recently?",
      "note": "ED screening."
    },
    {
      "time": "00:03:04",
      "speaker": "PATIENT (ARTHUR)",
      "speech": "No.",
      "note": "ED negative."
    },
    {
      "time": "00:03:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Partner, what are the baseline vitals?",
      "note": "Vitals report."
    },
    {
      "time": "00:03:15",
      "speaker": "PROCTOR",
      "speech": "BP is 108/64 mmHg, HR 48 bpm, RR 20, SpO2 93% on room air, BGL 114 mg/dL, pupils PEARRL 3 mm, lung sounds clear bilaterally.",
      "note": "Objective vitals."
    },
    {
      "time": "00:03:30",
      "speaker": "EMT CANDIDATE",
      "speech": "I auscultate Arthur's lungs: clear in all fields. I palpate the abdomen: soft, non-tender, non-distended. Pain is not abdominal wall muscular.",
      "note": "Exam findings."
    },
    {
      "time": "00:03:45",
      "speaker": "EMT CANDIDATE",
      "speech": "I am administering 324 mg of chewable baby aspirin (four 81 mg tablets) immediately, instructing Arthur to chew completely. Aspirin prevents platelet aggregation.",
      "note": "Aspirin administered."
    },
    {
      "time": "00:04:10",
      "speaker": "EMT CANDIDATE",
      "speech": "CRITICAL CLINICAL DECISION: I WILL NOT ADMINISTER OR ASSIST WITH NITROGLYCERIN. With a heart rate of 48 bpm and a borderline BP of 108/64 in an inferior MI presentation, right ventricular involvement is highly suspected. Right ventricular infarctions depend entirely on venous preload; nitroglycerin venodilation will crash his blood pressure and induce cardiogenic shock.",
      "note": "Preload trap verbalized!"
    },
    {
      "time": "00:04:40",
      "speaker": "EMT CANDIDATE",
      "speech": "I contact Medical Control: 'Medical Control, this is EMT Candidate on Medic 4. On scene with a 62-year-old male presenting with suspected inferior STEMI: epigastric burning radiating to jaw, diaphoresis, BP 108/64, HR 48 sinus bradycardia, lungs clear. 324 mg chewable aspirin administered. Due to profound bradycardia and high risk of RV preload collapse, I am withholding nitroglycerin and initiating rapid transport with ALS rendezvous.'",
      "note": "Medical Control contact."
    },
    {
      "time": "00:05:05",
      "speaker": "PROCTOR (MED CONTROL)",
      "speech": "Medic 4, excellent clinical judgment. Do NOT administer nitroglycerin. Maintain supine position, keep warm, and meet ALS at station 42.",
      "note": "Physician confirms!"
    },
    {
      "time": "00:05:18",
      "speaker": "EMT CANDIDATE",
      "speech": "Medical Control, confirmed: Withholding nitroglycerin, transporting supine to intercept Medic 1 ALS at station 42. Candidate out.",
      "note": "Closed-loop confirmation."
    },
    {
      "time": "00:05:35",
      "speaker": "EMT CANDIDATE",
      "speech": "We package Arthur supine on the cot to maximize venous return, apply warm blankets, and begin transport. 5-minute reassessment:",
      "note": "Transport & reassessment."
    },
    {
      "time": "00:05:50",
      "speaker": "PROCTOR",
      "speech": "Arthur remains alert. Pain remains 7/10. Repeat vitals: BP 106/62 mmHg, HR 50 bpm, RR 18, SpO2 98% on 4 L NC.",
      "note": "Hemodynamics preserved."
    },
    {
      "time": "00:06:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Verbal Hand-Off to ALS Paramedics: 'This is Arthur Miller, 62M, presenting with suspected inferior wall STEMI. 1-hour history of severe epigastric burning radiating to lower jaw with cold diaphoresis and presyncope. No relief from antacids. No drug allergies. Baseline vitals: BP 108/64, HR 48 bpm, RR 20, SpO2 93%, BGL 114 mg/dL, lungs completely clear. We placed him on 4 L NC (SpO2 now 98%) and administered 324 mg chewable aspirin. Nitroglycerin was deliberately withheld due to bradycardia (HR 48) and borderline BP to prevent RV preload collapse. Current BP 106/62, HR 50. He is prepped for immediate 12-lead right-sided V4R view.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:07:00",
      "speaker": "PROCTOR",
      "speech": "Evaluator questions completed. Station finished.",
      "note": "Station pass."
    }
  ],
  "handOffReport": "Arthur Miller, 62M, suspected acute inferior-RV STEMI presenting with severe epigastric burning radiating to the jaw, profound weakness, and diaphoresis. Baseline BP 108/64, HR 48 bpm (sinus bradycardia), lungs clear bilaterally. Administered 4L NC and 324 mg chewable aspirin. Nitroglycerin was deliberately withheld to protect preload against right ventricular infarction. Repeat BP 106/62, HR 50, SpO2 98%. Prepped for right-sided V4R 12-lead ECG.",
  "reassessmentVitals": {
    "bp": "106/62 mmHg",
    "hr": "50 bpm (bradycardic)",
    "rr": "18 breaths/min",
    "spo2": "98% on 4 L/min Nasal Cannula",
    "lung_sounds": "Clear bilaterally",
    "pain_score": "7 / 10 (unchanged, but hemodynamically stable without preload crash)"
  }
},
{
  "id": 3,
  "title": "71F \u2013 Acute Left-Sided Congestive Heart Failure / Flash Pulmonary Edema",
  "cad": "Medic 4, respond priority 1 lights and sirens to 312 Willow Creek Lane for a 71-year-old female in acute severe respiratory distress. Caller states patient cannot catch her breath and is coughing up pink liquid.",
  "hiddenDiagnosis": "Acute Left-Sided Congestive Heart Failure / Flash Pulmonary Edema",
  "category": "Cardiovascular & Respiratory",
  "vitals": {
    "bp": "198/110 mmHg",
    "hr": "116 bpm (tachycardic, regular)",
    "rr": "32 breaths/min (labored, accessory muscle use, grunting)",
    "spo2": "86% on ambient air",
    "bgl": "138 mg/dL",
    "skin": "Pale, cool, diaphoretic",
    "pupils": "PEARRL at 3 mm",
    "lungs": "Diffuse wet coarse crackles/rales in all posterior lower and middle lung fields bilaterally, scattered cardiac wheezes"
  },
  "trap": "Laying a patient with pulmonary edema flat (drowns the patient in their own alveolar fluid).",
  "initialPatientSpeech": "Evelyn... (gasp)... can't... breathe... feels like... drowning...",
  "clues": [
    "Profound orthopnea (cannot lie flat) and paroxysmal nocturnal dyspnea (woke up gasping)",
    "Productive cough with classic pink, frothy sputum (capillary transudate in alveoli)",
    "Diffuse bilateral wet inspiratory crackles (rales) extending from lung bases to mid-zones ('cardiac asthma')",
    "Severe hypertensive crisis (BP 198/110 mmHg) driving fluid across the alveolar-capillary membrane",
    "LETHAL TRAP: Auscultating wheezing and misdiagnosing as COPD/Asthma to give Albuterol (Albuterol tachycardia causes fatal myocardial oxygen demand in CHF); treatment of choice is High-PEEP CPAP + Nitroglycerin"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, priority 1 response to 312 Willow Creek Lane, 71-year-old female in acute respiratory distress coughing up pink fluid.",
      "note": "CAD alert."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to 71F with severe respiratory distress and pink sputum. BSI precautions: gloves, eye protection, N-95 mask. Is my scene safe?",
      "note": "BSI with airborne/splash."
    },
    {
      "time": "00:00:20",
      "speaker": "PROCTOR",
      "speech": "Scene is safe.",
      "note": "Safe confirmed."
    },
    {
      "time": "00:00:22",
      "speaker": "EMT CANDIDATE",
      "speech": "Nature of illness: severe acute respiratory compromise / suspected pulmonary edema. One patient. Requesting ALS backup immediately.",
      "note": "ALS dispatch."
    },
    {
      "time": "00:00:34",
      "speaker": "EMT CANDIDATE",
      "speech": "General impression: 71-year-old female sitting bolt upright in armchair, tripod position, gasping for air, cyanotic lips, coughing frothy secretions into tissues. No trauma, C-spine not indicated.",
      "note": "General impression."
    },
    {
      "time": "00:00:48",
      "speaker": "EMT CANDIDATE",
      "speech": "Hello ma'am, I'm EMT Luke. We are here to help you. Can you tell me your name?",
      "note": "Primary assessment."
    },
    {
      "time": "00:00:54",
      "speaker": "PATIENT (EVELYN)",
      "speech": "Evelyn... (gasp)... can't... breathe... feels like... drowning...",
      "note": "2-word dyspnea."
    },
    {
      "time": "00:01:02",
      "speaker": "EMT CANDIDATE",
      "speech": "Airway is patent but bubbling with thin secretions. Suction is on standby. Breathing is 32 breaths/min, severely labored with retractions.",
      "note": "Airway & breathing eval."
    },
    {
      "time": "00:01:14",
      "speaker": "EMT CANDIDATE",
      "speech": "SpO2 is 86%. This patient is in impending respiratory failure from flash pulmonary edema. I assemble the CPAP circuit immediately.",
      "note": "CPAP decision."
    },
    {
      "time": "00:01:25",
      "speaker": "EMT CANDIDATE",
      "speech": "Checking circulation: radial pulse is 116 bpm rapid and bounding. Skin is pale, cool, clammy, and peripherally cyanotic. Bilateral pitting pedal edema noted at ankles.",
      "note": "Circulation check."
    },
    {
      "time": "00:01:38",
      "speaker": "EMT CANDIDATE",
      "speech": "High priority load-and-go. Partner, get baseline vitals immediately while I coach Evelyn onto CPAP and begin SAMPLE history.",
      "note": "Delegation."
    },
    {
      "time": "00:01:48",
      "speaker": "EMT CANDIDATE",
      "speech": "Evelyn, this mask is going to blow gentle continuous air pressure to push the water out of your lungs. Hold it against your face while I secure the straps. Breathe slow and deep.",
      "note": "CPAP coaching."
    },
    {
      "time": "00:02:10",
      "speaker": "PROCTOR",
      "speech": "CPAP is applied at 8 cmH2O with 100% oxygen. Evelyn is tolerating the mask.",
      "note": "CPAP sealed."
    },
    {
      "time": "00:02:18",
      "speaker": "EMT CANDIDATE",
      "speech": "Evelyn, did this start suddenly while sleeping?",
      "note": "OPQRST - Onset."
    },
    {
      "time": "00:02:22",
      "speaker": "PATIENT (EVELYN)",
      "speech": "(Nods vigorously behind mask)... woke up at 2 AM... gasping... couldn't lie flat.",
      "note": "Paroxysmal nocturnal dyspnea."
    },
    {
      "time": "00:02:30",
      "speaker": "EMT CANDIDATE",
      "speech": "How many pillows do you normally sleep on?",
      "note": "Orthopnea history."
    },
    {
      "time": "00:02:34",
      "speaker": "PATIENT (EVELYN)",
      "speech": "Usually... three pillows... tonight even sitting... suffocating.",
      "note": "Severe orthopnea."
    },
    {
      "time": "00:02:42",
      "speaker": "EMT CANDIDATE",
      "speech": "Do you have any chest pain right now, or just the drowning feeling?",
      "note": "Ischemic screening."
    },
    {
      "time": "00:02:46",
      "speaker": "PATIENT (EVELYN)",
      "speech": "Chest feels tight... heavy... no sharp pain.",
      "note": "Associated cardiac tightness."
    },
    {
      "time": "00:02:52",
      "speaker": "EMT CANDIDATE",
      "speech": "Partner, what are the baseline vitals?",
      "note": "Vitals check."
    },
    {
      "time": "00:02:56",
      "speaker": "PROCTOR",
      "speech": "BP is 198/110 mmHg, HR 116 bpm, RR 32, SpO2 86% rising to 91% on CPAP, BGL 138 mg/dL, pupils PEARRL 3 mm.",
      "note": "Severe hypertension."
    },
    {
      "time": "00:03:10",
      "speaker": "EMT CANDIDATE",
      "speech": "I auscultate lung sounds: diffuse coarse wet crackles/rales in bilateral lower and middle lung fields with scattered cardiac expiratory wheezing.",
      "note": "Wet crackles confirmed."
    },
    {
      "time": "00:03:25",
      "speaker": "EMT CANDIDATE",
      "speech": "CLINICAL WARNING & TRAP: Although expiratory wheezing is present, this is 'cardiac asthma' caused by peribronchial interstitial edema. I WILL NOT ADMINISTER ALBUTEROL. Albuterol beta-1 stimulation would increase heart rate, elevate myocardial oxygen demand, and worsen left ventricular failure.",
      "note": "Albuterol trap avoided!"
    },
    {
      "time": "00:03:50",
      "speaker": "EMT CANDIDATE",
      "speech": "Evelyn, are you allergic to any medications?",
      "note": "SAMPLE - Allergies."
    },
    {
      "time": "00:03:54",
      "speaker": "PATIENT (EVELYN)",
      "speech": "No... no allergies.",
      "note": "Allergies negative."
    },
    {
      "time": "00:03:58",
      "speaker": "EMT CANDIDATE",
      "speech": "What medications are you prescribed?",
      "note": "SAMPLE - Medications."
    },
    {
      "time": "00:04:02",
      "speaker": "PATIENT (EVELYN)",
      "speech": "Lasix... water pill... lisinopril... metoprolol... and Nitro tablets.",
      "note": "Cardiac medications."
    },
    {
      "time": "00:04:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Did you miss your Lasix water pill today or eat a salty meal?",
      "note": "Precipitating event."
    },
    {
      "time": "00:04:14",
      "speaker": "PATIENT (EVELYN)",
      "speech": "Missed Lasix... two days... ran out.",
      "note": "Non-compliance trigger."
    },
    {
      "time": "00:04:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Have you taken any erectile dysfunction or pulmonary hypertension meds (Revatio/Adcirca)?",
      "note": "Contraindication check."
    },
    {
      "time": "00:04:24",
      "speaker": "PATIENT (EVELYN)",
      "speech": "No, never.",
      "note": "ED negative."
    },
    {
      "time": "00:04:30",
      "speaker": "EMT CANDIDATE",
      "speech": "Evelyn's systolic BP is 198 mmHg. In severe pulmonary edema with hypertension, nitroglycerin sublingual reduces venous preload and systemic afterload. I contact Medical Control.",
      "note": "Nitroglycerin indication."
    },
    {
      "time": "00:04:45",
      "speaker": "EMT CANDIDATE",
      "speech": "Medical Control, this is EMT Candidate on Medic 4. On scene with a 71-year-old female in acute pulmonary edema from CHF exacerbation. BP is 198/110, HR 116, SpO2 91% on CPAP @ 8 cmH2O. Bilateral crackles. No ED medications. Requesting authorization to assist with patient's prescribed sublingual nitroglycerin 0.4 mg while maintaining CPAP.",
      "note": "Medical Control request."
    },
    {
      "time": "00:05:05",
      "speaker": "PROCTOR (MED CONTROL)",
      "speech": "Medic 4, authorized: briefly break mask seal to administer 0.4 mg sublingual nitroglycerin, reseal CPAP, and monitor BP every 5 minutes.",
      "note": "Authorization given."
    },
    {
      "time": "00:05:15",
      "speaker": "EMT CANDIDATE",
      "speech": "Medical Control, copy and confirm: Authorized for 0.4 mg sublingual nitroglycerin under CPAP seal with 5-minute BP monitoring. Candidate out.",
      "note": "Closed-loop confirmation."
    },
    {
      "time": "00:05:30",
      "speaker": "EMT CANDIDATE",
      "speech": "I administer one 0.4 mg sublingual nitroglycerin tablet, reseal the CPAP mask firmly, and keep Evelyn seated fully upright at 90 degrees.",
      "note": "Administration."
    },
    {
      "time": "00:05:55",
      "speaker": "EMT CANDIDATE",
      "speech": "We begin emergency transport. 5-minute reassessment:",
      "note": "Transport & reassess."
    },
    {
      "time": "00:06:10",
      "speaker": "PROCTOR",
      "speech": "Evelyn is breathing easier. Crackles have receded to lung bases. Repeat vitals: BP 164/92 mmHg, HR 98 bpm, RR 22, SpO2 94% on CPAP.",
      "note": "Marked improvement."
    },
    {
      "time": "00:06:25",
      "speaker": "EMT CANDIDATE",
      "speech": "Verbal Hand-Off Report to ALS Paramedics: 'This is Evelyn Hayes, 71F, presenting with acute left-sided heart failure and flash pulmonary edema. Woke up at 0200 with severe orthopnea, paroxysmal nocturnal dyspnea, and pink frothy sputum after missing Lasix for 2 days. Baseline vitals: BP 198/110, HR 116, RR 32, SpO2 86% on room air with diffuse bilateral crackles and pitting ankle edema. We placed her on CPAP at 8 cmH2O with 100% O2, kept her seated upright at 90 degrees, and administered one 0.4 mg sublingual Nitro under medical direction. Repeat vitals: BP 164/92, HR 98, RR 22, SpO2 94% on CPAP. Crackles are now localized to bases only and she is stable for hospital transfer.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:07:15",
      "speaker": "PROCTOR",
      "speech": "Scenario successfully completed.",
      "note": "Station passed."
    }
  ],
  "handOffReport": "Evelyn Hayes, 71F, acute decompensated heart failure / flash pulmonary edema secondary to missed diuretic doses. Presenting with severe orthopnea, pink frothy sputum, and bilateral crackles. Baseline BP 198/110, HR 116, RR 32, SpO2 86%. Initiated CPAP @ 8 cmH2O, kept upright at 90 degrees, administered 0.4 mg sublingual Nitro per medical control. Repeat vitals BP 164/92, HR 98, RR 22, SpO2 94%. Secretions controlled and distress significantly relieved.",
  "reassessmentVitals": {
    "bp": "164/92 mmHg",
    "hr": "98 bpm",
    "rr": "22 breaths/min (decreased accessory muscle work)",
    "spo2": "94% on CPAP @ 8 cmH2O with 100% FiO2",
    "lung_sounds": "Crackles diminished to basilar zones only",
    "pain_score": "4 / 10 ('I can finally pull air into my chest')"
  }
},
{
  "id": 4,
  "title": "67M \u2013 Cardiogenic Shock Secondary to Massive Myocardial Infarction",
  "cad": "Medic 4, respond code 3 to Westside Medical Clinic, 500 Park Avenue, for a 67-year-old male who collapsed in the waiting room. Clinic staff reporting unrecordable blood pressure and weak thready pulse.",
  "hiddenDiagnosis": "Cardiogenic Shock Secondary to Massive Myocardial Infarction",
  "category": "Cardiovascular & Shock",
  "vitals": {
    "bp": "82/54 mmHg (profound hypotension)",
    "hr": "118 bpm (weak, thready, irregular)",
    "rr": "28 breaths/min (shallow, tachypneic)",
    "spo2": "88% on ambient air",
    "bgl": "92 mg/dL",
    "skin": "Pale, cool, diaphoretic",
    "pupils": "Sluggish, 4 mm equal",
    "lungs": "Bilateral basilar crackles (pulmonary vascular congestion)"
  },
  "trap": "Administering nitroglycerin to a patient with systolic BP < 100 mmHg (fatal drop in coronary perfusion).",
  "initialPatientSpeech": "(Groans softly, eyes flicker open)... so cold... chest hurts...",
  "clues": [
    "Profound hypotension (BP 82/54 mmHg) caused by massive left ventricular pump failure (>40% myocardial necrosis)",
    "Tachycardic, weak, thready, irregular pulse (HR 118 bpm) attempting to compensate for collapsed stroke volume",
    "Cold, pale, clammy, mottled skin with delayed capillary refill (>4 seconds)",
    "Altered mental status / somnolence from cerebral hypoperfusion",
    "LETHAL TRAP: Nitroglycerin is STRICTLY CONTRAINDICATED (systolic BP < 100); patient requires immediate supine positioning, high-flow O2, and ALS vasopressor (Dopamine/Norepinephrine) support"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, code 3 to Westside Medical Clinic, 67-year-old male collapsed in waiting room, hypotensive.",
      "note": "CAD alert."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to medical clinic for 67M in shock. BSI precautions on: gloves, goggles. Is the scene safe?",
      "note": "Scene safety."
    },
    {
      "time": "00:00:18",
      "speaker": "PROCTOR",
      "speech": "Scene is safe. Clinic staff is present.",
      "note": "Safe verified."
    },
    {
      "time": "00:00:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Nature of illness: cardiogenic shock / cardiac collapse. One patient. Requesting ALS intercept immediately.",
      "note": "ALS dispatch."
    },
    {
      "time": "00:00:32",
      "speaker": "EMT CANDIDATE",
      "speech": "General impression: 67-year-old male slumped in clinic chair, ashen gray, lips cyanotic, profoundly lethargic. No trauma, C-spine not indicated.",
      "note": "General impression."
    },
    {
      "time": "00:00:44",
      "speaker": "EMT CANDIDATE",
      "speech": "Sir, can you hear me? Open your eyes.",
      "note": "AVPU check."
    },
    {
      "time": "00:00:48",
      "speaker": "PATIENT (HAROLD)",
      "speech": "(Groans softly, eyes flicker open)... so cold... chest hurts...",
      "note": "Responds to verbal."
    },
    {
      "time": "00:00:54",
      "speaker": "EMT CANDIDATE",
      "speech": "Airway is patent, no snoring or gurgling. Respirations are 28 breaths/min, shallow. SpO2 is 88%. I place high-flow O2 via Non-Rebreather at 15 L/min.",
      "note": "Airway & O2."
    },
    {
      "time": "00:01:08",
      "speaker": "EMT CANDIDATE",
      "speech": "Checking circulation: radial pulse is barely palpable, rapid and thready at 118 bpm. Skin is ice cold, clammy, and mottled across knees. Cap refill 4 seconds.",
      "note": "Shock identified."
    },
    {
      "time": "00:01:22",
      "speaker": "EMT CANDIDATE",
      "speech": "IMMEDIATE CRITICAL LOAD-AND-GO. The patient is in decompensated cardiogenic shock. We must move him supine to the stretcher immediately to support cerebral perfusion.",
      "note": "Supine positioning."
    },
    {
      "time": "00:01:35",
      "speaker": "EMT CANDIDATE",
      "speech": "Partner, get baseline vitals immediately while I obtain history from clinic staff and the patient's chart.",
      "note": "Delegation."
    },
    {
      "time": "00:01:45",
      "speaker": "PROCTOR (CLINIC NURSE)",
      "speech": "He arrived complaining of 2 hours of heavy chest pressure. While waiting, he turned gray and collapsed. His baseline BP here was 82/54 mmHg.",
      "note": "Collateral history."
    },
    {
      "time": "00:02:00",
      "speaker": "EMT CANDIDATE",
      "speech": "Baseline vitals confirmed: BP 82/54, HR 118 weak, RR 28, SpO2 88% rising to 96% on NRB, BGL 92 mg/dL. Lung sounds reveal wet crackles in both bases.",
      "note": "Vitals & lungs."
    },
    {
      "time": "00:02:18",
      "speaker": "EMT CANDIDATE",
      "speech": "CLINICAL CONTRAINDICATION: NITROGLYCERIN IS ABSOLUTELY CONTRAINDICATED. Systolic BP is 82 mmHg (<100 mmHg). Administering a vasodilator would induce complete cardiovascular collapse.",
      "note": "Contraindication verbalized."
    },
    {
      "time": "00:02:35",
      "speaker": "EMT CANDIDATE",
      "speech": "Can Harold swallow aspirin? Harold, can you chew four small tablets for me?",
      "note": "Aspirin eval."
    },
    {
      "time": "00:02:40",
      "speaker": "PATIENT (HAROLD)",
      "speech": "(Sluggishly)... yeah... I can chew...",
      "note": "Airway protected."
    },
    {
      "time": "00:02:45",
      "speaker": "EMT CANDIDATE",
      "speech": "Administering 324 mg chewable baby aspirin with close airway monitoring. Patient is covered with warm blankets to conserve core body heat.",
      "note": "Aspirin & warming."
    },
    {
      "time": "00:03:00",
      "speaker": "EMT CANDIDATE",
      "speech": "Contacting Medical Control: 'Medical Control, this is EMT Candidate on Medic 4. On scene with a 67-year-old male in decompensated cardiogenic shock secondary to acute MI. BP 82/54, HR 118 thready, RR 28, SpO2 96% on 15L NRB. Lung sounds reveal basilar crackles. 324 mg aspirin given, Nitro strictly withheld. Patient is supine and warm. Requesting expedited ALS intercept for IV fluid titration and vasopressor/dopamine push.'",
      "note": "Medical Control contact."
    },
    {
      "time": "00:03:30",
      "speaker": "PROCTOR (MED CONTROL)",
      "speech": "Medic 4, orders understood. Maintain supine posture, high-flow O2, and expedite transport to meet ALS Medic 2 en route.",
      "note": "Physician orders."
    },
    {
      "time": "00:03:42",
      "speaker": "EMT CANDIDATE",
      "speech": "Medical Control, confirmed: Supine positioning, high-flow O2, rapid transport to intercept Medic 2. Candidate out.",
      "note": "Closed-loop confirmation."
    },
    {
      "time": "00:04:00",
      "speaker": "EMT CANDIDATE",
      "speech": "5-minute reassessment during transport:",
      "note": "Reassessment."
    },
    {
      "time": "00:04:12",
      "speaker": "PROCTOR",
      "speech": "Patient remains lethargic but responds to voice. BP 84/56 mmHg, HR 114 bpm, RR 22, SpO2 96% on NRB.",
      "note": "Vitals stable."
    },
    {
      "time": "00:04:25",
      "speaker": "EMT CANDIDATE",
      "speech": "ALS Verbal Hand-Off Report: 'This is Harold Vance, 67M, presenting in decompensated cardiogenic shock secondary to acute massive myocardial infarction. 2-hour onset of heavy chest pressure culminating in syncope. Baseline vitals: BP 82/54, HR 118 thready and irregular, RR 28, SpO2 88%, skin cold, clammy, and mottled with delayed cap refill of 4 seconds. Wet crackles in lung bases. We placed him on 15L NRB, positioned him supine, kept him warm, and administered 324 mg chewable aspirin. Nitroglycerin was strictly withheld due to hypotension. Repeat BP is 84/56, HR 114. He requires immediate central venous access, cautious fluid challenge, and vasopressor infusion.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:05:20",
      "speaker": "PROCTOR",
      "speech": "Scenario completed successfully.",
      "note": "Station passed."
    }
  ],
  "handOffReport": "Harold Vance, 67M, decompensated cardiogenic shock following massive acute MI. Presenting with syncope, lethargy, cold mottled skin, delayed cap refill, and basilar crackles. Baseline BP 82/54, HR 118 thready, RR 28, SpO2 88%. Interventions: 15L NRB, supine positioning, thermal protection, 324 mg chewable aspirin; nitroglycerin strictly avoided. Repeat BP 84/56, HR 114, SpO2 96%. Immediate ALS vasopressor and cath lab activation required.",
  "reassessmentVitals": {
    "bp": "84/56 mmHg",
    "hr": "114 bpm",
    "rr": "22 breaths/min on high-flow O2",
    "spo2": "96% on 15 L/min Non-Rebreather",
    "lung_sounds": "Basilar crackles persist",
    "pain_score": "5 / 10"
  }
},
{
  "id": 5,
  "title": "59M \u2013 Acute Thoracic Aortic Dissection (The Tearing Pain Trap)",
  "cad": "Medic 4, respond priority 1 lights and sirens to 1944 Oak Ridge Court for a 59-year-old male with sudden onset of unbearable back and chest pain. Patient is crying out in agony.",
  "hiddenDiagnosis": "Acute Thoracic Aortic Dissection (The Tearing Pain Trap)",
  "category": "Cardiovascular",
  "vitals": {
    "bp": "Right arm: 184/102 mmHg | Left arm: 142/80 mmHg (>40 mmHg discrepancy!)",
    "hr": "108 bpm (bounding right radial, weak left radial)",
    "rr": "26 breaths/min (rapid, splinting)",
    "spo2": "95% on ambient air",
    "bgl": "118 mg/dL",
    "skin": "Pale, cool, diaphoretic",
    "pupils": "PEARRL at 3 mm",
    "lungs": "Clear bilaterally"
  },
  "trap": "Administering Aspirin to an aortic dissection patient (irreversible antiplatelet action leads to fatal hemorrhage / hemopericardium).",
  "initialPatientSpeech": "Frank... oh God, help me! Something just ripped inside my back! It feels like I'm being torn in half!",
  "clues": [
    "Maximal pain intensity from the exact moment of onset (no gradual buildup)",
    "Excruciating 'tearing', 'ripping', or 'knife-like' sensation radiating straight through to the interscapular back",
    "Significant blood pressure discrepancy (>20 mmHg) between the right and left arms",
    "Unequal or absent peripheral pulses (radial or femoral pulse deficit)",
    "LETHAL TRAP: Misdiagnosing as STEMI and administering ASPIRIN. Aspirin irreversibly impairs platelet function and accelerates fatal aortic rupture and cardiac tamponade!"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, priority 1 to 1944 Oak Ridge Court, 59-year-old male with sudden unbearable tearing back and chest pain.",
      "note": "CAD alert."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to 59M with severe tearing back pain. BSI: gloves, eye protection. Is the scene safe?",
      "note": "Scene safety."
    },
    {
      "time": "00:00:18",
      "speaker": "PROCTOR",
      "speech": "Scene is safe.",
      "note": "Safe verified."
    },
    {
      "time": "00:00:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Nature of illness: suspected acute vascular catastrophe / aortic dissection. One patient. Requesting ALS backup immediately.",
      "note": "ALS dispatch."
    },
    {
      "time": "00:00:32",
      "speaker": "EMT CANDIDATE",
      "speech": "General impression: 59-year-old male hunched forward on workbench stool, clutching his back and chest, grimacing in agony, diaphoretic. No trauma, C-spine not indicated.",
      "note": "General impression."
    },
    {
      "time": "00:00:45",
      "speaker": "EMT CANDIDATE",
      "speech": "Sir, I'm an EMT. What is your name?",
      "note": "Primary assessment."
    },
    {
      "time": "00:00:49",
      "speaker": "PATIENT (FRANK)",
      "speech": "Frank... oh God, help me! Something just ripped inside my back! It feels like I'm being torn in half!",
      "note": "Maximal pain at onset."
    },
    {
      "time": "00:00:58",
      "speaker": "EMT CANDIDATE",
      "speech": "Frank is alert, oriented, screaming in pain. Airway is patent. Respirations are 26, tachypneic. SpO2 is 95%. Placing on 15L Non-Rebreather.",
      "note": "Airway & O2."
    },
    {
      "time": "00:01:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Checking circulation: I palpate BOTH radial pulses simultaneously. The right radial pulse is strong and bounding; the left radial pulse is noticeably weak and delayed. Skin is pale and diaphoretic.",
      "note": "Pulse discrepancy!"
    },
    {
      "time": "00:01:28",
      "speaker": "EMT CANDIDATE",
      "speech": "IMMEDIATE HIGH-PRIORITY LOAD-AND-GO. Frank is exhibiting textbook signs of an Acute Thoracic Aortic Dissection. Partner, obtain blood pressure in BOTH arms immediately.",
      "note": "Bilateral BP order."
    },
    {
      "time": "00:01:45",
      "speaker": "EMT CANDIDATE",
      "speech": "Frank, when did this pain hit you?",
      "note": "OPQRST - Onset."
    },
    {
      "time": "00:01:49",
      "speaker": "PATIENT (FRANK)",
      "speech": "Two minutes ago! I was tightening a bolt and BAM\u2014instant 10 out of 10! It didn't build up, it was full force immediately!",
      "note": "Instant peak intensity."
    },
    {
      "time": "00:02:00",
      "speaker": "EMT CANDIDATE",
      "speech": "Can you describe the feeling?",
      "note": "OPQRST - Quality."
    },
    {
      "time": "00:02:04",
      "speaker": "PATIENT (FRANK)",
      "speech": "Ripping, tearing, like a hot knife stabbing straight between my shoulder blades and down into my belly!",
      "note": "Tearing quality."
    },
    {
      "time": "00:02:15",
      "speaker": "PROCTOR (PARTNER)",
      "speech": "Vitals obtained: Right arm BP is 184/102 mmHg. Left arm BP is 142/80 mmHg. Pulse 108, RR 26, SpO2 95% on room air, BGL 118 mg/dL, lungs clear bilaterally.",
      "note": "42 mmHg discrepancy!"
    },
    {
      "time": "00:02:35",
      "speaker": "EMT CANDIDATE",
      "speech": "A 42 mmHg systolic pressure differential between arms confirms dissection involving the aortic arch and subclavian artery. Frank, do you have high blood pressure?",
      "note": "Risk factor check."
    },
    {
      "time": "00:02:45",
      "speaker": "PATIENT (FRANK)",
      "speech": "Yeah, severe hypertension for 15 years... I stopped taking my pills last month.",
      "note": "Chronic hypertension."
    },
    {
      "time": "00:02:55",
      "speaker": "EMT CANDIDATE",
      "speech": "CRITICAL MEDICATION WARNING: ASPIRIN IS STRICTLY CONTRAINDICATED. Although this patient has chest pain, giving aspirin will inhibit platelets and cause catastrophic fatal exsanguination if the dissection ruptures. Nitroglycerin is also withheld due to risk of unpredictable vascular collapse.",
      "note": "Aspirin trap avoided!"
    },
    {
      "time": "00:03:20",
      "speaker": "EMT CANDIDATE",
      "speech": "We move Frank with extreme gentleness to the stretcher, keeping him calm to avoid raising his systolic pressure further, and initiate emergent transport to a trauma/cardiothoracic surgical center.",
      "note": "Gentle handling."
    },
    {
      "time": "00:03:38",
      "speaker": "EMT CANDIDATE",
      "speech": "Contacting Medical Control: 'Medical Control, this is EMT Candidate on Medic 4. Emergent transport with a 59-year-old male with acute thoracic aortic dissection. Sudden onset tearing interscapular pain, right arm BP 184/102, left arm BP 142/80, pulse deficit in left radial. Lungs clear. Aspirin strictly withheld. High-flow O2 applied. Requesting surgical trauma activation at Saint Mary's Cardiothoracic Center.'",
      "note": "Medical Control report."
    },
    {
      "time": "00:04:10",
      "speaker": "PROCTOR (MED CONTROL)",
      "speech": "Medic 4, copy. Cardiothoracic surgery team is activated. Transport code 3, minimize patient agitation.",
      "note": "Surgical team alerted."
    },
    {
      "time": "00:04:22",
      "speaker": "EMT CANDIDATE",
      "speech": "Medical Control, confirmed: Transporting code 3 to Saint Mary's with surgery standing by. Candidate out.",
      "note": "Closed-loop confirmation."
    },
    {
      "time": "00:04:35",
      "speaker": "EMT CANDIDATE",
      "speech": "5-minute reassessment:",
      "note": "Reassessment."
    },
    {
      "time": "00:04:45",
      "speaker": "PROCTOR",
      "speech": "Frank remains in 10/10 tearing pain. Right arm BP 178/98, Left arm BP 138/76, HR 102, RR 22, SpO2 99% on NRB.",
      "note": "Vitals tracked."
    },
    {
      "time": "00:05:00",
      "speaker": "EMT CANDIDATE",
      "speech": "ALS / Trauma Surgical Hand-Off: 'This is Frank Castillo, 59M, presenting with acute thoracic aortic dissection. Sudden tearing, knife-like pain between shoulder blades maximal at onset 15 minutes ago. History of uncontrolled hypertension. Baseline right arm BP 184/102 vs left arm BP 142/80 (42 mmHg discrepancy) with a diminished left radial pulse. Lungs clear. We placed him on 15L NRB, handled him with extreme care, and deliberately withheld aspirin and nitroglycerin. Repeat right arm BP 178/98. Patient is ready for immediate emergent CT angiogram and surgical repair.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:05:55",
      "speaker": "PROCTOR",
      "speech": "Outstanding management. Station passed.",
      "note": "Station complete."
    }
  ],
  "handOffReport": "Frank Castillo, 59M, acute thoracic aortic dissection. Sudden onset excruciating tearing pain between shoulder blades, maximal at onset. Baseline right arm BP 184/102 vs left arm BP 142/80 (>40 mmHg discrepancy) with left radial pulse deficit. Aspirin and nitroglycerin strictly avoided. 15L NRB applied, gentle transport executed. Repeat right arm BP 178/98, HR 102. Direct surgical hand-off for CT angiogram.",
  "reassessmentVitals": {
    "bp": "Right arm: 178/98 mmHg | Left arm: 138/76 mmHg",
    "hr": "102 bpm",
    "rr": "22 breaths/min",
    "spo2": "99% on 15 L/min Non-Rebreather",
    "lung_sounds": "Clear bilaterally",
    "pain_score": "10 / 10 (intractable surgical vascular pain)"
  }
},
{
  "id": 6,
  "title": "22F \u2013 Severe Acute Asthma Exacerbation / Status Asthmaticus",
  "cad": "Medic 4, respond priority 1 lights and sirens to Campus Main Library, 3rd floor, for a 22-year-old female in severe respiratory distress. Multiple 911 calls stating student cannot speak or breathe.",
  "hiddenDiagnosis": "Severe Acute Asthma Exacerbation / Status Asthmaticus",
  "category": "Respiratory",
  "vitals": {
    "bp": "136/84 mmHg (with pulsus paradoxus)",
    "hr": "130 bpm (sinus tachycardia)",
    "rr": "34 breaths/min (shallow, exhausted, prolonged expiration)",
    "spo2": "87% on ambient room air",
    "bgl": "106 mg/dL",
    "skin": "Pale, cool, diaphoretic",
    "pupils": "PEARRL at 4 mm",
    "lungs": "Severely diminished breath sounds bilaterally with faint high-pitched expiratory wheezing ('silent chest' warning)"
  },
  "trap": "Interpreting a 'silent chest' as an improvement in asthma (it is the hallmark of near-fatal total airway occlusion).",
  "initialPatientSpeech": "(Nods frantically, gasping for air, unable to speak a single word).",
  "clues": [
    "Sitting upright in extreme tripod position with pronounced intercostal/supraclavicular retractions",
    "Monosyllabic or 1-word dyspnea (nodding only, cannot form phrases)",
    "High-pitched inspiratory and expiratory wheezes rapidly diminishing to a 'SILENT CHEST' (loss of wheezing signals near-fatal complete airway closure, not improvement!)",
    "Tachycardia (HR 130 bpm) and pulsus paradoxus (systolic BP drops >10 mmHg on inspiration)",
    "CRITICAL PROTOCOL: Continuous Albuterol (2.5 mg) / Ipratropium (0.5 mg) nebulizer combined with immediate Intramuscular Epinephrine (0.3 mg 1:1,000) for severe bronchospasm with impending respiratory failure"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, priority 1 to Campus Library 3rd floor, 22-year-old female having severe asthma attack, unable to breathe.",
      "note": "CAD broadcast."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to 22F with severe asthma. BSI: gloves, eye protection. Scene safe?",
      "note": "Scene size-up."
    },
    {
      "time": "00:00:18",
      "speaker": "PROCTOR",
      "speech": "Scene is safe. Bystanders are anxious.",
      "note": "Safe confirmed."
    },
    {
      "time": "00:00:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Nature of illness: severe acute asthma / status asthmaticus. One patient. Requesting ALS backup immediately due to impending respiratory arrest.",
      "note": "ALS dispatch."
    },
    {
      "time": "00:00:33",
      "speaker": "EMT CANDIDATE",
      "speech": "General impression: 22-year-old female in rigid tripod position with hands braced on knees, profound retractions, pale with circumoral cyanosis. No trauma, C-spine not indicated.",
      "note": "General impression."
    },
    {
      "time": "00:00:46",
      "speaker": "EMT CANDIDATE",
      "speech": "Hello, I'm EMT Luke. Don't try to speak. Nod if you can hear me.",
      "note": "Primary assessment."
    },
    {
      "time": "00:00:50",
      "speaker": "PATIENT (MAYA)",
      "speech": "(Nods frantically, gasping for air, unable to speak a single word).",
      "note": "1-word/monosyllabic dyspnea."
    },
    {
      "time": "00:00:56",
      "speaker": "EMT CANDIDATE",
      "speech": "Airway is patent but severely restricted. Respirations are 34 breaths/min, extremely shallow, prolonged exhalation. SpO2 is 87%. I immediately assemble an Albuterol/Atrovent SVN nebulizer.",
      "note": "Airway & breathing eval."
    },
    {
      "time": "00:01:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Checking circulation: radial pulse is 130 bpm, rapid and regular. Skin is pale, cool, and diaphoretic. Cap refill is 3 seconds. High-priority load-and-go.",
      "note": "Circulation & priority."
    },
    {
      "time": "00:01:25",
      "speaker": "EMT CANDIDATE",
      "speech": "Partner, obtain baseline vitals immediately and prep the stretcher while I initiate emergency nebulizer therapy.",
      "note": "Delegation."
    },
    {
      "time": "00:01:35",
      "speaker": "EMT CANDIDATE",
      "speech": "I auscultate Maya's lungs: What are my lung sounds?",
      "note": "Auscultation."
    },
    {
      "time": "00:01:42",
      "speaker": "PROCTOR",
      "speech": "Breath sounds are severely diminished bilaterally with almost no air movement. Faint expiratory wheezes in upper fields, lower fields are nearly silent.",
      "note": "Silent chest noted!"
    },
    {
      "time": "00:01:55",
      "speaker": "EMT CANDIDATE",
      "speech": "CRITICAL CLINICAL ALERT: A silent chest in severe asthma represents impending asphyxiation and respiratory arrest from complete airway narrowing. I assemble an SVN nebulizer with Albuterol 2.5 mg and Ipratropium Bromide (Atrovent) 0.5 mg, hooked to 6-8 L/min O2.",
      "note": "Nebulizer assembled."
    },
    {
      "time": "00:02:15",
      "speaker": "EMT CANDIDATE",
      "speech": "Maya has her prescribed Albuterol inhaler in hand, completely empty after taking 10 puffs before arrival. With silent chest and exhaustion, aerosolized meds alone may not penetrate the terminal bronchioles. I prepare for Intramuscular Epinephrine administration.",
      "note": "Epinephrine indication."
    },
    {
      "time": "00:02:35",
      "speaker": "PROCTOR (PARTNER)",
      "speech": "Vitals: BP 136/84 mmHg, HR 130, RR 34, SpO2 87% on room air, BGL 106 mg/dL, pupils PEARRL 4 mm.",
      "note": "Baseline vitals."
    },
    {
      "time": "00:02:50",
      "speaker": "EMT CANDIDATE",
      "speech": "I contact Medical Control: 'Medical Control, this is EMT Candidate on Medic 4. On scene with a 22-year-old female in status asthmaticus with silent chest and severe exhaustion. SpO2 is 87%, HR 130, RR 34. Continuous Albuterol/Atrovent nebulizer initiated. Due to impending respiratory failure, I request authorization to administer Epinephrine 1:1,000 (1 mg/mL) 0.3 mg intramuscularly into the lateral thigh.'",
      "note": "Medical Control contact."
    },
    {
      "time": "00:03:15",
      "speaker": "PROCTOR (MED CONTROL)",
      "speech": "Medic 4, this is Medical Control. Authorization GRANTED for Epinephrine 0.3 mg IM into the anterolateral thigh. Continue nebulizer and expedite transport.",
      "note": "Orders authorized."
    },
    {
      "time": "00:03:26",
      "speaker": "EMT CANDIDATE",
      "speech": "Medical Control, I copy and confirm: Authorized for Epinephrine 0.3 mg IM into the anterolateral thigh, continue continuous nebulizer, expedite transport. Candidate out.",
      "note": "Closed-loop confirmation."
    },
    {
      "time": "00:03:40",
      "speaker": "EMT CANDIDATE",
      "speech": "I verify the 6 Rights of Epinephrine: Right patient, Right medication (Epinephrine 1:1,000 / 1 mg/mL), Right dose (0.3 mg = 0.3 mL), Right route (IM), Right time, Right documentation. Clear fluid, in date. I cleanse the lateral thigh with alcohol and inject at 90 degrees, holding for 10 seconds.",
      "note": "IM injection performed."
    },
    {
      "time": "00:04:05",
      "speaker": "EMT CANDIDATE",
      "speech": "We place Maya seated upright on the stretcher, maintain nebulizer mist, and initiate rapid transport.",
      "note": "Transport posture."
    },
    {
      "time": "00:04:20",
      "speaker": "EMT CANDIDATE",
      "speech": "5-minute reassessment:",
      "note": "Reassessment."
    },
    {
      "time": "00:04:30",
      "speaker": "PROCTOR",
      "speech": "Maya's breathing is deeper. Auscultation reveals loud, bilateral expiratory wheezes throughout all lobes. Repeat vitals: BP 142/86 mmHg, HR 124 bpm, RR 22, SpO2 95% on nebulizer.",
      "note": "Airway reopened!"
    },
    {
      "time": "00:04:45",
      "speaker": "EMT CANDIDATE",
      "speech": "CLINICAL INTERPRETATION: Hearing loud wheezes now is a POSITIVE sign. It confirms that the beta-2 bronchodilation from IM Epinephrine and Albuterol opened the collapsed bronchioles, restoring vital air exchange.",
      "note": "Clinical insight verbalized."
    },
    {
      "time": "00:05:05",
      "speaker": "EMT CANDIDATE",
      "speech": "ALS Verbal Hand-Off Report: 'This is Maya Lin, 22F, presenting with status asthmaticus and silent chest impending respiratory arrest. Emptied her inhaler prior to arrival with no relief. Baseline vitals: BP 136/84, HR 130, RR 34, SpO2 87% on room air with severe accessory muscle use and virtually absent breath sounds. We initiated continuous Albuterol 2.5 mg / Atrovent 0.5 mg nebulizer and administered Epinephrine 0.3 mg IM (1:1,000) under medical control authorization. Repeat vitals: BP 142/86, HR 124, RR 22, SpO2 95%. Air movement is restored with bilateral loud expiratory wheezing. She is prepped for ongoing nebulizers and ALS magnesium sulfate/steroids.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:06:00",
      "speaker": "PROCTOR",
      "speech": "Excellent clinical judgment. Station passed.",
      "note": "Station passed."
    }
  ],
  "handOffReport": "Maya Lin, 22F, status asthmaticus presenting with silent chest, accessory muscle exhaustion, and 1-word dyspnea. Baseline BP 136/84, HR 130, RR 34, SpO2 87%. Administered continuous Albuterol (2.5 mg) / Atrovent (0.5 mg) nebulizer and 0.3 mg Epinephrine IM (1:1,000) under online medical direction. Repeat vitals BP 142/86, HR 124, RR 22, SpO2 95% with restored loud expiratory air exchange. Transporting upright.",
  "reassessmentVitals": {
    "bp": "142/86 mmHg",
    "hr": "124 bpm",
    "rr": "22 breaths/min (improved chest expansion)",
    "spo2": "95% on 6 L/min nebulizer mask",
    "lung_sounds": "Prominent, loud expiratory wheezing restored throughout all fields (indicates air movement restored!)",
    "pain_score": "4 / 10 ('My chest opened up, I can draw air in')"
  }
},
{
  "id": 7,
  "title": "68M \u2013 Acute Exacerbation of COPD / Emphysema ('Pink Puffer')",
  "cad": "Medic 4, respond priority 2 to 514 Sycamore Street for a 68-year-old male with chronic lung disease having difficulty breathing. Caller is patient's daughter.",
  "hiddenDiagnosis": "Acute Exacerbation of COPD / Emphysema ('Pink Puffer')",
  "category": "Respiratory",
  "vitals": {
    "bp": "148/88 mmHg",
    "hr": "104 bpm (regular)",
    "rr": "26 breaths/min (prolonged expiration, pursed lips)",
    "spo2": "84% on room air (daughter states his normal baseline is 88-90%)",
    "bgl": "112 mg/dL",
    "skin": "Pale, cool, diaphoretic",
    "pupils": "PEARRL at 3 mm",
    "lungs": "Distant breath sounds bilaterally with coarse rhonchi in upper fields and end-expiratory wheezing"
  },
  "trap": "Administering unrestricted high-flow 100% O2 via non-rebreather to a non-exhausted COPD patient (can wash out hypoxic drive and induce CO2 narcosis/acidosis).",
  "initialPatientSpeech": "Tight... real tight in the chest... been getting worse... since Tuesday.",
  "clues": [
    "Classic 'Pink Puffer' habitus: barrel chest (increased anterior-posterior diameter), thin body habitus, pursed-lip breathing",
    "Markedly prolonged expiratory phase with coarse rhonchi and scattered expiratory wheezes",
    "SpO2 baseline is chronically 88-90% on home oxygen (2 L/min via nasal cannula)",
    "Hypercapnic respiratory drive awareness: Target SpO2 is 88-92% (do not slam 100% O2 via NRB unless in acute respiratory arrest/exhaustion)",
    "Assisting with patient's prescribed Albuterol/Combivent MDI using a spacer"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, priority 2 response to 514 Sycamore Street, 68-year-old male with COPD exacerbation.",
      "note": "CAD alert."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to 68M with COPD exacerbation. BSI precautions: gloves, eye protection, N95 mask. Is the scene safe?",
      "note": "Scene size-up."
    },
    {
      "time": "00:00:18",
      "speaker": "PROCTOR",
      "speech": "Scene is safe.",
      "note": "Safe verified."
    },
    {
      "time": "00:00:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Nature of illness: acute respiratory compromise / COPD exacerbation. One patient. Requesting ALS backup due to respiratory distress in a compromised pulmonary patient.",
      "note": "ALS dispatch."
    },
    {
      "time": "00:00:33",
      "speaker": "EMT CANDIDATE",
      "speech": "General impression: 68-year-old male seated in rocking chair, leaning forward with elbows on knees, barrel chest, exhaling through pursed lips, flushed/pink skin tone. No trauma, C-spine not indicated.",
      "note": "General impression."
    },
    {
      "time": "00:00:46",
      "speaker": "EMT CANDIDATE",
      "speech": "Hello Mr. Miller, I'm EMT Luke. How are you feeling right now?",
      "note": "Primary assessment."
    },
    {
      "time": "00:00:51",
      "speaker": "PATIENT (GEORGE)",
      "speech": "Tight... real tight in the chest... been getting worse... since Tuesday.",
      "note": "Pursed-lip speech."
    },
    {
      "time": "00:00:58",
      "speaker": "EMT CANDIDATE",
      "speech": "Airway is patent. Respirations are 26 breaths/min with active pursed-lip breathing and prolonged exhalation. SpO2 is 84% on room air.",
      "note": "Breathing assessment."
    },
    {
      "time": "00:01:10",
      "speaker": "EMT CANDIDATE",
      "speech": "TARGETED OXYGENATION PROTOCOL: For a known COPD patient, standard protocol targets SpO2 between 88% and 92% to avoid blunting hypoxic drive while preventing tissue hypoxia. I apply oxygen via nasal cannula at 3 L/min.",
      "note": "Targeted O2 titration."
    },
    {
      "time": "00:01:28",
      "speaker": "EMT CANDIDATE",
      "speech": "Checking circulation: radial pulse is 104 bpm, regular. Skin is warm, pink, and dry. Cap refill is 2.5 seconds. No gross bleeding. Priority load-and-go.",
      "note": "Circulation check."
    },
    {
      "time": "00:01:42",
      "speaker": "EMT CANDIDATE",
      "speech": "Partner, please obtain full baseline vitals while I conduct OPQRST and review George's medications.",
      "note": "Delegation."
    },
    {
      "time": "00:01:52",
      "speaker": "EMT CANDIDATE",
      "speech": "George, did this shortness of breath start suddenly, or has it built up over days?",
      "note": "OPQRST - Onset."
    },
    {
      "time": "00:01:57",
      "speaker": "PATIENT (GEORGE)",
      "speech": "Built up over three days... started with a chest cold... coughing up thick yellowish mucus.",
      "note": "Infectious trigger."
    },
    {
      "time": "00:02:05",
      "speaker": "EMT CANDIDATE",
      "speech": "Does anything make it better?",
      "note": "OPQRST - Palliation."
    },
    {
      "time": "00:02:08",
      "speaker": "PATIENT (GEORGE)",
      "speech": "Pursed-lip breathing helps keep my airways from collapsing, and my inhaler helped yesterday, but not today.",
      "note": "Auto-PEEP mechanism."
    },
    {
      "time": "00:02:16",
      "speaker": "EMT CANDIDATE",
      "speech": "Do you have any chest pain?",
      "note": "OPQRST - Provocation/Chest."
    },
    {
      "time": "00:02:19",
      "speaker": "PATIENT (GEORGE)",
      "speech": "No sharp pain, just tired muscles from working so hard to breathe.",
      "note": "Muscular fatigue."
    },
    {
      "time": "00:02:26",
      "speaker": "EMT CANDIDATE",
      "speech": "Are you allergic to any medications?",
      "note": "SAMPLE - Allergies."
    },
    {
      "time": "00:02:30",
      "speaker": "PATIENT (GEORGE)",
      "speech": "Allergic to sulfa drugs.",
      "note": "Sulfa allergy."
    },
    {
      "time": "00:02:34",
      "speaker": "EMT CANDIDATE",
      "speech": "What medications do you take?",
      "note": "SAMPLE - Medications."
    },
    {
      "time": "00:02:38",
      "speaker": "PATIENT (GEORGE)",
      "speech": "Spiriva once daily, and this ProAir Albuterol inhaler for flare-ups. I also have 2 liters of home oxygen at night.",
      "note": "MDI available."
    },
    {
      "time": "00:02:48",
      "speaker": "PROCTOR (PARTNER)",
      "speech": "Baseline vitals: BP 148/88 mmHg, HR 104 bpm, RR 26, SpO2 87% rising on 3L NC, BGL 112 mg/dL, pupils PEARRL 3 mm.",
      "note": "Baseline vitals."
    },
    {
      "time": "00:03:00",
      "speaker": "EMT CANDIDATE",
      "speech": "I auscultate George's lungs: distant breath sounds bilaterally, coarse rhonchi in upper bronchial zones, and expiratory wheezes throughout.",
      "note": "Auscultation findings."
    },
    {
      "time": "00:03:15",
      "speaker": "EMT CANDIDATE",
      "speech": "I inspect George's Albuterol MDI: right patient, right medication (Albuterol 90 mcg/puff), right dose (2 puffs), right route (inhalation), unexpired. I attach a spacer chamber to maximize lower airway deposition.",
      "note": "Medication 6 Rights."
    },
    {
      "time": "00:03:32",
      "speaker": "EMT CANDIDATE",
      "speech": "Contacting Medical Control: 'Medical Control, this is EMT Candidate on Medic 4. On scene with a 68-year-old male with COPD exacerbation. Vitals: BP 148/88, HR 104, RR 26, SpO2 88% on 3L NC. Coarse rhonchi and wheezes. No contraindications. Requesting authorization to assist patient with 2 puffs of his prescribed Albuterol MDI with spacer.'",
      "note": "Medical Control contact."
    },
    {
      "time": "00:03:55",
      "speaker": "PROCTOR (MED CONTROL)",
      "speech": "Medic 4, authorized: assist patient with 2 puffs Albuterol MDI with spacer, coach breath hold for 10 seconds per puff.",
      "note": "Authorization given."
    },
    {
      "time": "00:04:05",
      "speaker": "EMT CANDIDATE",
      "speech": "Medical Control, copy and confirm: Authorized for 2 puffs Albuterol MDI with spacer, coaching 10-second breath hold. Candidate out.",
      "note": "Closed-loop confirmation."
    },
    {
      "time": "00:04:18",
      "speaker": "EMT CANDIDATE",
      "speech": "George, exhale completely, place your lips tightly around the spacer mouthpiece. When I press the canister, inhale slowly and deeply, then hold your breath for 10 seconds. We deliver puff 1, wait 1 minute, then deliver puff 2.",
      "note": "MDI administration."
    },
    {
      "time": "00:04:45",
      "speaker": "EMT CANDIDATE",
      "speech": "We assist George to the stretcher, maintain a high-Fowler's (90 degree) seated position, and initiate transport.",
      "note": "Transport posture."
    },
    {
      "time": "00:05:00",
      "speaker": "EMT CANDIDATE",
      "speech": "5-minute reassessment:",
      "note": "Reassessment."
    },
    {
      "time": "00:05:10",
      "speaker": "PROCTOR",
      "speech": "George is breathing more comfortably. Rhonchi have mobilized. Repeat vitals: BP 142/84 mmHg, HR 98 bpm, RR 20 breaths/min, SpO2 91% on 3 L/min NC.",
      "note": "Vitals optimized."
    },
    {
      "time": "00:05:25",
      "speaker": "EMT CANDIDATE",
      "speech": "ALS Verbal Hand-Off Report: 'This is George Miller, 68M, presenting with an acute COPD/emphysema exacerbation triggered by a 3-day productive respiratory infection. Baseline vitals: BP 148/88, HR 104, RR 26 with prolonged expiration, SpO2 84% on room air (baseline 88-90%), barrel chest, rhonchi and wheezes. We initiated titrated O2 via nasal cannula at 3 L/min (targeting 88-92% SpO2) and assisted with 2 puffs of his prescribed Albuterol MDI with spacer under medical control. Repeat vitals: BP 142/84, HR 98, RR 20, SpO2 91% on 3L NC. Patient is stable, seated upright, and prepped for ALS transport.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:06:15",
      "speaker": "PROCTOR",
      "speech": "Excellent care. Station passed.",
      "note": "Station passed."
    }
  ],
  "handOffReport": "George Miller, 68M, acute COPD exacerbation secondary to bronchitis. Presenting with barrel chest, pursed-lip breathing, coarse rhonchi, and wheezes. Baseline BP 148/88, HR 104, RR 26, SpO2 84%. Managed with targeted O2 titration at 3 L/min NC (target 88-92%) and 2 puffs Albuterol MDI with spacer per medical control. Repeat vitals BP 142/84, HR 98, RR 20, SpO2 91%. Breathing significantly stabilized.",
  "reassessmentVitals": {
    "bp": "142/84 mmHg",
    "hr": "98 bpm",
    "rr": "20 breaths/min",
    "spo2": "91% on 3 L/min Nasal Cannula (ideal target range)",
    "lung_sounds": "Rhonchi clearing with productive cough, wheezing softened",
    "pain_score": "2 / 10 ('Much easier to blow air out')"
  }
},
{
  "id": 8,
  "title": "21M \u2013 Spontaneous Pneumothorax Transitioning to Tension Pneumothorax",
  "cad": "Medic 4, respond priority 1 to Campus Recreation Center, Court 2, for a 21-year-old male basketball player who collapsed with acute chest pain and difficulty breathing.",
  "hiddenDiagnosis": "Spontaneous Pneumothorax Transitioning to Tension Pneumothorax",
  "category": "Respiratory",
  "vitals": {
    "bp": "88/56 mmHg (decompensating obstructive shock)",
    "hr": "128 bpm (sinus tachycardia, weak radial)",
    "rr": "32 breaths/min (rapid, shallow, asymmetrical chest rise)",
    "spo2": "86% on ambient room air",
    "bgl": "104 mg/dL",
    "skin": "Pale, cool, diaphoretic",
    "pupils": "PEARRL at 4 mm",
    "lungs": "Completely ABSENT on the right side; clear with compensatory tachypnea on the left"
  },
  "trap": "Applying positive pressure bag-valve-mask ventilations to a spontaneously breathing pneumothorax patient (accelerates cardiovascular collapse).",
  "initialPatientSpeech": "Connor... (gasp)... was going up for a rebound... felt a pop in my right lung... now it feels like a knife inside... can't catch breath...",
  "clues": [
    "Classic patient demographic: Tall, thin, young athletic male (rupture of congenital apical subpleural bleb)",
    "Sudden, sharp, pleuritic, knife-like pain localized to one hemithorax (right side) triggered during exertion",
    "UNILATERAL ABSENT BREATH SOUNDS on the affected right side with hyperresonance to percussion",
    "Progression to TENSION PNEUMOTHORAX: Hypotension (BP 88/56), tracheal deviation to the contralateral left side, and jugular venous distension (JVD)",
    "LETHAL TRAP: Bag-valve-mask positive pressure ventilation is STRICTLY CONTRAINDICATED (unless patient is apneic) because positive pressure pumps more air into the pleural space, accelerating tension collapse! Immediate ALS needle decompression required."
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, priority 1 to Campus Rec Center Court 2, 21-year-old male basketball player collapsed with severe chest pain.",
      "note": "CAD broadcast."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to 21M collapsed on court. BSI: gloves, eye protection. Scene safe?",
      "note": "Scene size-up."
    },
    {
      "time": "00:00:18",
      "speaker": "PROCTOR",
      "speech": "Scene is safe. Teammates are standing back.",
      "note": "Safe confirmed."
    },
    {
      "time": "00:00:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Nature of illness: acute pleuritic chest pain / suspected pneumothorax. One patient. Requesting ALS backup immediately.",
      "note": "ALS dispatch."
    },
    {
      "time": "00:00:32",
      "speaker": "EMT CANDIDATE",
      "speech": "General impression: 21-year-old male, tall and thin (6'4\", 160 lbs), sitting on bench, leaning sharply to right side, clutching right chest, cyanotic lips. No trauma reported, C-spine not indicated.",
      "note": "General impression."
    },
    {
      "time": "00:00:46",
      "speaker": "EMT CANDIDATE",
      "speech": "Hello, I'm EMT Luke. What is your name and what happened?",
      "note": "Primary assessment."
    },
    {
      "time": "00:00:51",
      "speaker": "PATIENT (CONNOR)",
      "speech": "Connor... (gasp)... was going up for a rebound... felt a pop in my right lung... now it feels like a knife inside... can't catch breath...",
      "note": "Sudden exertional onset."
    },
    {
      "time": "00:01:02",
      "speaker": "EMT CANDIDATE",
      "speech": "Connor is alert, dyspneic. Airway is patent. Respirations are 32 breaths/min, shallow, with asymmetrical right-sided chest rise. SpO2 is 86%.",
      "note": "Breathing eval."
    },
    {
      "time": "00:01:15",
      "speaker": "EMT CANDIDATE",
      "speech": "OXYGENATION DECISION: I apply high-flow oxygen via Non-Rebreather mask at 15 L/min. I WILL NOT APPLY POSITIVE PRESSURE BVM VENTILATIONS as long as he is breathing spontaneously. Positive pressure would force air into the pleural space and worsen tension.",
      "note": "Avoid BVM verbalized!"
    },
    {
      "time": "00:01:35",
      "speaker": "EMT CANDIDATE",
      "speech": "Checking circulation: radial pulse is 128 bpm, rapid and weak. Skin is pale, cool, and clammy. Blood pressure is 88/56 mmHg. JVD noted in neck veins.",
      "note": "Obstructive shock signs."
    },
    {
      "time": "00:01:50",
      "speaker": "EMT CANDIDATE",
      "speech": "IMMEDIATE LOAD-AND-GO EMERGENCY. Connor has signs of a Tension Pneumothorax with obstructive shock. Partner, obtain baseline vitals while we load to the stretcher.",
      "note": "Load-and-go."
    },
    {
      "time": "00:02:00",
      "speaker": "EMT CANDIDATE",
      "speech": "I auscultate and inspect the chest: What are my lung sounds and tracheal alignment?",
      "note": "Targeted exam."
    },
    {
      "time": "00:02:10",
      "speaker": "PROCTOR",
      "speech": "Breath sounds are completely absent across the entire right hemithorax with hyperresonance. Left lung sounds clear. You observe slight tracheal deviation to the patient's left and distended neck veins.",
      "note": "Tension confirmed!"
    },
    {
      "time": "00:02:30",
      "speaker": "EMT CANDIDATE",
      "speech": "This confirms Tension Pneumothorax. The right pleural space is trapping air, collapsing the right lung, shifting the mediastinum, and compressing the vena cava, causing obstructive shock (BP 88/56).",
      "note": "Pathophysiology verbalized."
    },
    {
      "time": "00:02:50",
      "speaker": "EMT CANDIDATE",
      "speech": "Connor, do you have any allergies or take any medications?",
      "note": "SAMPLE."
    },
    {
      "time": "00:02:54",
      "speaker": "PATIENT (CONNOR)",
      "speech": "No... no allergies... no meds... never happened before...",
      "note": "Healthy baseline."
    },
    {
      "time": "00:03:00",
      "speaker": "EMT CANDIDATE",
      "speech": "Contacting Medical Control / ALS En Route: 'Medic 1 ALS, this is BLS Medic 4 en route to Valley Medical. We have an immediate life-threat: 21-year-old male with a spontaneous Right Tension Pneumothorax. Absent breath sounds right side, tracheal deviation to left, JVD, BP 88/56, HR 128, SpO2 92% on 15L NRB. We need immediate rendezvous for emergency needle chest decompression (thoracostomy). Meet us at 4th and Main.'",
      "note": "ALS rendezvous alert."
    },
    {
      "time": "00:03:35",
      "speaker": "PROCTOR (ALS MEDIC)",
      "speech": "Medic 4, copy! Medic 1 is 60 seconds out at 4th and Main. Pull over; we will board your unit with the decompression kit.",
      "note": "ALS intercept."
    },
    {
      "time": "00:03:48",
      "speaker": "EMT CANDIDATE",
      "speech": "We keep Connor in a semi-Fowler's position of comfort, maintain 15L NRB, monitor for loss of consciousness, and pull over at the rendezvous point.",
      "note": "BLS positioning."
    },
    {
      "time": "00:04:05",
      "speaker": "EMT CANDIDATE",
      "speech": "ALS Verbal Hand-Off Report: 'This is Connor Walsh, 21M, tall athletic habitus, suffered sudden spontaneous right pneumothorax playing basketball that has converted to Tension Pneumothorax. Baseline vitals: BP 88/56, HR 128, RR 32, SpO2 86% on room air. Right breath sounds are completely absent, trachea is deviated to the left, and JVD is prominent. We maintained passive 15L NRB and avoided positive pressure. Repeat BP 86/54, HR 132. He is prepped for immediate 14-gauge needle thoracostomy at the second intercostal space midclavicular line.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:04:55",
      "speaker": "PROCTOR",
      "speech": "ALS enters, performs successful needle decompression with a rush of air, and BP improves to 118/74. Station passed.",
      "note": "Intervention success."
    }
  ],
  "handOffReport": "Connor Walsh, 21M, spontaneous right tension pneumothorax with obstructive shock. Sudden 'pop' and pleuritic pain during exertion. Right breath sounds completely absent, hyperresonance, tracheal deviation to left, JVD, BP 88/56, HR 128, SpO2 86%. Maintained on 15L NRB; positive pressure BVM strictly avoided. Direct ALS hand-off for emergent needle decompression.",
  "reassessmentVitals": {
    "bp": "86/54 mmHg (tension progressing, awaiting ALS needle)",
    "hr": "132 bpm",
    "rr": "30 breaths/min",
    "spo2": "92% on 15 L/min Non-Rebreather (passive oxygenation)",
    "lung_sounds": "Right side remains completely absent; tracheal shift palpable to left",
    "pain_score": "9 / 10"
  }
},
{
  "id": 9,
  "title": "34F \u2013 Acute Massive Pulmonary Embolism (Refractory Hypoxia Trap)",
  "cad": "Medic 4, respond priority 1 lights and sirens to 742 Evergreen Terrace, Apt 3B, for a 34-year-old female in acute severe respiratory distress. Caller states patient suddenly turned blue and feels faint.",
  "hiddenDiagnosis": "Acute Massive Pulmonary Embolism (Refractory Hypoxia Trap)",
  "category": "Respiratory & Cardiovascular",
  "vitals": {
    "bp": "94/62 mmHg (borderline hypotensive from RV strain)",
    "hr": "134 bpm (marked sinus tachycardia)",
    "rr": "32 breaths/min (rapid, shallow air hunger)",
    "spo2": "82% on ambient air (refractory to standard O2)",
    "bgl": "108 mg/dL",
    "skin": "Pale, cool, diaphoretic",
    "pupils": "PEARRL at 3 mm",
    "lungs": "Completely CLEAR bilaterally in all fields (classic PE hallmark)"
  },
  "trap": "Misdiagnosing clear lung sounds as absence of pathology or hyperventilation anxiety in a hypoxic patient.",
  "initialPatientSpeech": "Rachel... (pant)... stood up from couch... sudden sharp pain in my chest... feels like I'm suffocating... can't get any air in...",
  "clues": [
    "High-risk Virchow's Triad history: Recent orthopedic knee surgery (stasis/hypercoagulability) and oral contraceptive use",
    "Sudden onset of sharp, pleuritic chest pain worse on inhalation, accompanied by profound 'air hunger'",
    "CLEAR BILATERAL BREATH SOUNDS on auscultation (the lungs sound deceptively normal because the defect is vascular, not alveolar!)",
    "REFRACTORY HYPOXIA: SpO2 remains stubbornly low (82-84%) despite high-flow 100% oxygen via Non-Rebreather (ventilation-perfusion V/Q mismatch)",
    "Unilateral lower extremity swelling, erythema, and calf tenderness (DVT source)"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, priority 1 to 742 Evergreen Terrace Apt 3B, 34-year-old female with sudden acute respiratory distress and cyanosis.",
      "note": "CAD broadcast."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to 34F with acute respiratory distress. BSI: gloves, eye protection. Is the scene safe?",
      "note": "Scene size-up."
    },
    {
      "time": "00:00:18",
      "speaker": "PROCTOR",
      "speech": "Scene is safe.",
      "note": "Safe verified."
    },
    {
      "time": "00:00:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Nature of illness: acute pulmonary embolism / severe respiratory compromise. One patient. Requesting ALS backup immediately.",
      "note": "ALS dispatch."
    },
    {
      "time": "00:00:32",
      "speaker": "EMT CANDIDATE",
      "speech": "General impression: 34-year-old female on sofa, gasping for air, clutching her right lateral chest, lips cyanotic, post-op knee brace on right leg. No trauma, C-spine not indicated.",
      "note": "General impression."
    },
    {
      "time": "00:00:46",
      "speaker": "EMT CANDIDATE",
      "speech": "Hello, I'm EMT Luke. What is your name and what happened?",
      "note": "Primary assessment."
    },
    {
      "time": "00:00:51",
      "speaker": "PATIENT (RACHEL)",
      "speech": "Rachel... (pant)... stood up from couch... sudden sharp pain in my chest... feels like I'm suffocating... can't get any air in...",
      "note": "Sudden onset air hunger."
    },
    {
      "time": "00:01:02",
      "speaker": "EMT CANDIDATE",
      "speech": "Rachel is alert, oriented, terrified. Airway is patent. Respirations are 32 breaths/min, rapid and gasping. SpO2 is 82%. I apply high-flow oxygen via Non-Rebreather at 15 L/min.",
      "note": "Airway & O2."
    },
    {
      "time": "00:01:16",
      "speaker": "EMT CANDIDATE",
      "speech": "Checking circulation: radial pulse is 134 bpm, rapid and weak. Skin is pale, cool, diaphoretic. BP is 94/62. Priority load-and-go.",
      "note": "Circulation check."
    },
    {
      "time": "00:01:30",
      "speaker": "EMT CANDIDATE",
      "speech": "Partner, get baseline vitals while I auscultate lungs and check Rachel's legs.",
      "note": "Delegation."
    },
    {
      "time": "00:01:40",
      "speaker": "EMT CANDIDATE",
      "speech": "I auscultate Rachel's lungs: What are my breath sounds?",
      "note": "Auscultation."
    },
    {
      "time": "00:01:48",
      "speaker": "PROCTOR",
      "speech": "Breath sounds are completely clear and equal bilaterally in all anterior and posterior fields.",
      "note": "Clear lungs confirmed!"
    },
    {
      "time": "00:02:00",
      "speaker": "EMT CANDIDATE",
      "speech": "CLINICAL PEARL: Clear lung sounds in the presence of severe acute dyspnea, cyanosis, and profound hypoxia (82%) strongly indicates a pulmonary vascular obstruction (PE) rather than an airway or alveolar process.",
      "note": "V/Q shunt recognized."
    },
    {
      "time": "00:02:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Rachel, what were you doing when this started?",
      "note": "OPQRST - Onset."
    },
    {
      "time": "00:02:24",
      "speaker": "PATIENT (RACHEL)",
      "speech": "Just stood up to go to the kitchen... hit me like a lightning bolt 10 minutes ago.",
      "note": "Sudden onset."
    },
    {
      "time": "00:02:30",
      "speaker": "EMT CANDIDATE",
      "speech": "Can you describe the pain?",
      "note": "OPQRST - Quality."
    },
    {
      "time": "00:02:34",
      "speaker": "PATIENT (RACHEL)",
      "speech": "Sharp, stabbing... gets way worse every time I breathe in.",
      "note": "Pleuritic pain."
    },
    {
      "time": "00:02:40",
      "speaker": "EMT CANDIDATE",
      "speech": "I see a brace on your right leg. Did you have recent surgery or travel?",
      "note": "SAMPLE - Risk factors."
    },
    {
      "time": "00:02:45",
      "speaker": "PATIENT (RACHEL)",
      "speech": "Had knee arthroscopy 10 days ago... been resting in bed. I also take birth control pills.",
      "note": "Virchow's Triad confirmed!"
    },
    {
      "time": "00:02:56",
      "speaker": "EMT CANDIDATE",
      "speech": "I expose and examine both calves: The right calf is visibly swollen, erythematous, warm, and tender to palpation compared to the left.",
      "note": "DVT sign identified."
    },
    {
      "time": "00:03:12",
      "speaker": "PROCTOR (PARTNER)",
      "speech": "Vitals: BP 94/62 mmHg, HR 134 bpm, RR 32, SpO2 86% despite 15L NRB, BGL 108 mg/dL, pupils PEARRL 3 mm.",
      "note": "Refractory hypoxia confirmed."
    },
    {
      "time": "00:03:28",
      "speaker": "EMT CANDIDATE",
      "speech": "The patient's refractory hypoxia (SpO2 only 86% on 15L NRB) is caused by a massive pulmonary vascular shunt. A large thrombus is blocking blood flow to ventilated alveoli. No BLS medication will dissolve this clot; the patient requires emergent hospital fibrinolytics (tPA) or catheter thrombectomy.",
      "note": "Treatment reality verbalized."
    },
    {
      "time": "00:03:52",
      "speaker": "EMT CANDIDATE",
      "speech": "We position Rachel in a semi-Fowler's position, maintain high-flow 15L NRB, keep her calm and warm, and initiate rapid transport.",
      "note": "Transport posture."
    },
    {
      "time": "00:04:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Contacting Medical Control: 'Medical Control, this is EMT Candidate on Medic 4. Priority transport with a 34-year-old female presenting with acute massive pulmonary embolism. Recent knee surgery and OCP use. Sudden pleuritic chest pain, tachycardia HR 134, BP 94/62, clear lung sounds, right calf DVT signs, and refractory hypoxia with SpO2 86% on 15L NRB. Requesting immediate CT pulmonary angiogram / ECMO / fibrinolytic team activation at Saint Luke's.'",
      "note": "Medical Control report."
    },
    {
      "time": "00:04:40",
      "speaker": "PROCTOR (MED CONTROL)",
      "speech": "Medic 4, copy. Saint Luke's ED is notified for acute PE code. Continue high-flow O2 and expedite.",
      "note": "Hospital alert."
    },
    {
      "time": "00:04:52",
      "speaker": "EMT CANDIDATE",
      "speech": "Medical Control, confirmed: Expediting transport to Saint Luke's with PE code active. Candidate out.",
      "note": "Closed-loop confirmation."
    },
    {
      "time": "00:05:05",
      "speaker": "EMT CANDIDATE",
      "speech": "5-minute reassessment:",
      "note": "Reassessment."
    },
    {
      "time": "00:05:15",
      "speaker": "PROCTOR",
      "speech": "Rachel remains tachycardic at 130 bpm. BP 92/60 mmHg, RR 28, SpO2 86% on NRB. Lungs remain clear.",
      "note": "Vitals tracked."
    },
    {
      "time": "00:05:30",
      "speaker": "EMT CANDIDATE",
      "speech": "ALS Verbal Hand-Off Report: 'This is Rachel Green, 34F, presenting with acute massive pulmonary embolism. Sudden pleuritic chest pain and air hunger 15 minutes ago. High risk profile: right knee surgery 10 days ago, bed rest, and oral contraceptives. Baseline vitals: BP 94/62, HR 134 sinus tachycardia, RR 32, SpO2 82% on room air. Lungs are completely clear bilaterally, and right calf shows swelling and tenderness. Placed on 15L NRB with refractory SpO2 at 86% due to V/Q mismatch. Repeat BP 92/60, HR 130. Patient is ready for emergent CT angiogram and tPA/heparin therapy.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:06:20",
      "speaker": "PROCTOR",
      "speech": "Flawless assessment. Station passed.",
      "note": "Station passed."
    }
  ],
  "handOffReport": "Rachel Green, 34F, acute massive pulmonary embolism. Sudden onset stabbing pleuritic chest pain, severe air hunger, and presyncope. Risk factors: recent knee surgery and oral contraceptives. Baseline BP 94/62, HR 134, RR 32, SpO2 82%. Lungs clear bilaterally, right calf DVT noted. Placed on 15L NRB with refractory hypoxia at 86% (V/Q shunt). Repeat BP 92/60, HR 130. Emergency hospital hand-off for CT angiogram and thrombolytics.",
  "reassessmentVitals": {
    "bp": "92/60 mmHg",
    "hr": "130 bpm",
    "rr": "28 breaths/min",
    "spo2": "86% on 15 L/min Non-Rebreather (physiologic right-to-left shunt)",
    "lung_sounds": "Remains completely clear bilaterally",
    "pain_score": "8 / 10"
  }
},
{
  "id": 10,
  "title": "5M \u2013 Acute Severe Epiglottitis (The Airway Spasm Trap)",
  "cad": "Medic 4, respond priority 1 lights and sirens to Pediatric Urgent Care, 810 Health Parkway, for a 5-year-old male with acute severe upper airway obstruction and stridor. Staff requesting ALS transport.",
  "hiddenDiagnosis": "Acute Severe Epiglottitis (The Airway Spasm Trap)",
  "category": "Respiratory",
  "vitals": {
    "bp": "100/60 mmHg",
    "hr": "146 bpm (marked sinus tachycardia from fever and distress)",
    "rr": "36 breaths/min (labored, sternal retractions)",
    "spo2": "90% on ambient room air",
    "bgl": "96 mg/dL",
    "skin": "Hot, flushed, dry or drenched",
    "pupils": "PEARRL at 3 mm",
    "lungs": "Loud inspiratory stridor over trachea; transmitted upper airway sounds in chest with decreased lower vesicular aeration"
  },
  "trap": "Attempting to visualize the throat or insert a tongue depressor (triggers instant fatal laryngospasm).",
  "initialPatientSpeech": "Help me... I feel terrible...",
  "clues": [
    "The Classic '4 D's of Epiglottitis': Dysphagia (difficulty swallowing), Drooling (saliva dripping from mouth), Dysphonia (muffled 'hot potato' voice), Distress (tripod posture)",
    "High fever (103.4\u00b0F) with rapid, toxic onset over a few hours",
    "High-pitched inspiratory STRIDOR heard without a stethoscope",
    "ABSOLUTE LETHAL TRAP: NEVER inspect the oral cavity, NEVER use a tongue depressor, and NEVER attempt to visualize the throat. Direct stimulation triggers immediate, fatal, irreversible laryngospasm and complete airway closure!",
    "Blow-by oxygen, keep the child in the parent's arms, and maintain absolute calm"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, priority 1 to Pediatric Urgent Care, 5-year-old male with acute airway obstruction, high fever, and stridor.",
      "note": "CAD broadcast."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to 5M with severe acute upper airway obstruction. BSI: gloves, eye protection, mask. Scene safe?",
      "note": "Scene size-up."
    },
    {
      "time": "00:00:18",
      "speaker": "PROCTOR",
      "speech": "Scene is safe. Mother and clinic nurse are present.",
      "note": "Safe verified."
    },
    {
      "time": "00:00:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Nature of illness: acute epiglottitis / life-threatening pediatric upper airway emergency. One patient. Requesting ALS intercept immediately.",
      "note": "ALS dispatch."
    },
    {
      "time": "00:00:32",
      "speaker": "EMT CANDIDATE",
      "speech": "Pediatric Assessment Triangle (PAT): Appearance: anxious, glassy-eyed, toxic look. Work of breathing: severe sternal retractions, head bobbing, neck extended ('sniffing position'). Circulation: pale and flushed from fever. General impression: critical respiratory failure.",
      "note": "PAT executed!"
    },
    {
      "time": "00:00:48",
      "speaker": "EMT CANDIDATE",
      "speech": "I approach Tommy very quietly and calmly. I observe saliva actively drooling from his mouth because he cannot swallow.",
      "note": "Quiet approach."
    },
    {
      "time": "00:00:55",
      "speaker": "PROCTOR (MOTHER)",
      "speech": "He was fine this morning, then suddenly got burning hot, couldn't swallow his juice, and started making this whistling sound.",
      "note": "Acute toxic onset."
    },
    {
      "time": "00:01:05",
      "speaker": "EMT CANDIDATE",
      "speech": "Airway is partially obstructed by a swollen, inflamed epiglottis. Loud inspiratory stridor is audible. Respirations are 36 breaths/min. SpO2 is 90%.",
      "note": "Airway eval."
    },
    {
      "time": "00:01:18",
      "speaker": "EMT CANDIDATE",
      "speech": "CRITICAL CLINICAL MANDATE: DO NOT EXAMINE THE THROAT. I WILL NOT INSERT A TONGUE DEPRESSOR, PENLIGHT, OR SUCTION CATHETER INTO HIS MOUTH. Any agitation or pharyngeal contact can cause reflex laryngospasm, resulting in complete airway obstruction and death.",
      "note": "Lethal trap verbalized!"
    },
    {
      "time": "00:01:42",
      "speaker": "EMT CANDIDATE",
      "speech": "I initiate Blow-By Oxygen: I have Tommy's mother hold the non-rebreather mask or oxygen tubing 2 inches from Tommy's nose and mouth at 10-15 L/min. Do not force the mask onto his face, which would cause crying and increase airway edema.",
      "note": "Blow-by technique."
    },
    {
      "time": "00:02:05",
      "speaker": "EMT CANDIDATE",
      "speech": "Circulation: radial/brachial pulse is 146 bpm, strong. Skin is hot and pale. Cap refill is 2 seconds. Immediate high-priority load-and-go.",
      "note": "Circulation check."
    },
    {
      "time": "00:02:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Partner, obtain gentle vitals without agitating the patient. Tommy will ride sitting upright in his mother's lap on the stretcher.",
      "note": "Transport with parent."
    },
    {
      "time": "00:02:35",
      "speaker": "PROCTOR (PARTNER)",
      "speech": "Vitals: BP 100/60 mmHg, HR 146 bpm, RR 36, SpO2 90% rising to 95% on blow-by O2, Temp 103.4\u00b0F.",
      "note": "Baseline vitals."
    },
    {
      "time": "00:02:50",
      "speaker": "EMT CANDIDATE",
      "speech": "Mother, does Tommy have any allergies or take daily medications?",
      "note": "SAMPLE."
    },
    {
      "time": "00:02:54",
      "speaker": "PROCTOR (MOTHER)",
      "speech": "No allergies, no medications. He missed his Hib (Haemophilus influenzae type B) vaccines last year.",
      "note": "Hib unvaccinated clue!"
    },
    {
      "time": "00:03:08",
      "speaker": "EMT CANDIDATE",
      "speech": "Unvaccinated Hib status strongly confirms acute bacterial epiglottitis. We initiate immediate code 3 transport without sirens blaring near the patient to prevent terror and crying.",
      "note": "Silent transport."
    },
    {
      "time": "00:03:25",
      "speaker": "EMT CANDIDATE",
      "speech": "Contacting Medical Control: 'Medical Control, this is EMT Candidate on Medic 4. Priority transport with a 5-year-old male with acute severe epiglottitis. Classic 4 D's: drooling, dysphagia, distress, dysphonia. High fever 103.4\u00b0F, unvaccinated Hib. Loud inspiratory stridor, SpO2 95% on blow-by O2. Throat exam strictly withheld. Patient is calm in mother's lap. Requesting pediatric emergency airway team, anesthesiology, and ENT standing by in the resuscitation bay with surgical airway kits.'",
      "note": "Medical Control alert."
    },
    {
      "time": "00:04:00",
      "speaker": "PROCTOR (MED CONTROL)",
      "speech": "Medic 4, excellent management. Pediatric critical care and ENT teams are mobilized at Children's Hospital ED. Do not manipulate airway.",
      "note": "Hospital team alerted."
    },
    {
      "time": "00:04:15",
      "speaker": "EMT CANDIDATE",
      "speech": "Medical Control, confirmed: Transporting directly to Children's with ENT ready. Candidate out.",
      "note": "Closed-loop confirmation."
    },
    {
      "time": "00:04:28",
      "speaker": "EMT CANDIDATE",
      "speech": "5-minute reassessment:",
      "note": "Reassessment."
    },
    {
      "time": "00:04:38",
      "speaker": "PROCTOR",
      "speech": "Tommy remains upright, resting against mother. HR 138 bpm, RR 30, SpO2 95% on blow-by O2.",
      "note": "Stable in transit."
    },
    {
      "time": "00:04:50",
      "speaker": "EMT CANDIDATE",
      "speech": "Pediatric Trauma/Airway Hand-Off Report: 'This is Tommy Davis, 5-year-old male, presenting with acute bacterial epiglottitis. Rapid toxic onset over 4 hours with 103.4\u00b0F fever, drooling, inability to swallow secretions, sniffing position, and inspiratory stridor. Unvaccinated for Hib. Baseline vitals: HR 146, RR 36, SpO2 90% on room air. Throat was NOT examined to prevent fatal laryngospasm. Patient was managed with passive blow-by oxygen at 10L held by mother. Current vitals: HR 138, RR 30, SpO2 95%. Child is calm and ready for immediate direct ENT fiberoptic evaluation.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:05:45",
      "speaker": "PROCTOR",
      "speech": "Outstanding pediatric management. Station passed.",
      "note": "Station passed."
    }
  ],
  "handOffReport": "Tommy Davis, 5M, acute bacterial epiglottitis. Rapid toxic onset with high fever (103.4\u00b0F), continuous drooling, dysphagia, and inspiratory stridor in sniffing position. Unvaccinated for Hib. Baseline HR 146, RR 36, SpO2 90%. Managed with non-threatening blow-by O2 held by mother; pharyngeal visualization was strictly avoided to prevent laryngospasm. Repeat HR 138, RR 30, SpO2 95%. Direct hand-off to pediatric ENT airway team.",
  "reassessmentVitals": {
    "bp": "98/58 mmHg",
    "hr": "138 bpm",
    "rr": "30 breaths/min",
    "spo2": "95% on blow-by oxygen held by mother",
    "lung_sounds": "Stridor persists but child is calmer",
    "pain_score": "Refuses to speak; resting chin up"
  }
},
{
  "id": 11,
  "title": "66M \u2013 Acute Ischemic Stroke / Large Vessel Occlusion (The Time-Sensitive LKW)",
  "cad": "Medic 4, respond priority 1 lights and sirens to 1104 Pinecrest Drive for a 66-year-old male with sudden difficulty speaking and inability to move his right arm. Caller is the patient's wife.",
  "hiddenDiagnosis": "Acute Ischemic Stroke / Large Vessel Occlusion (The Time-Sensitive LKW)",
  "category": "Neurological",
  "vitals": {
    "bp": "188/104 mmHg (compensatory permissive cerebral perfusion pressure)",
    "hr": "86 bpm (irregularly irregular, consistent with underlying Atrial Fibrillation)",
    "rr": "18 breaths/min (regular, unlabored)",
    "spo2": "96% on ambient room air",
    "bgl": "112 mg/dL (hypoglycemia ruled out!)",
    "skin": "Pale, cool, diaphoretic",
    "pupils": "PEARRL at 3 mm, conjugate gaze preference toward the left side",
    "lungs": "Clear bilaterally"
  },
  "trap": "Failing to check Blood Glucose Level immediately (hypoglycemia is the #1 stroke mimic).",
  "initialPatientSpeech": "Mmm... gah... da... (slurred, garbled sounds, unable to form words).",
  "clues": [
    "Positive Cincinnati Prehospital Stroke Scale (3/3): Right facial droop, right arm drift/plegia, slurred/incomprehensible speech",
    "Los Angeles Motor Scale (LAMS) score: 4/5 (indicates high probability of Large Vessel Occlusion / LVO)",
    "EXACT Last Known Well (LKW) verification: Wife confirms patient was completely normal at 07:15 AM (75 minutes ago; well within the 3 to 4.5-hour IV thrombolysis and 24-hour endovascular thrombectomy window)",
    "CRITICAL EXCLUSION RULE: Mandatory immediate Blood Glucose Level (BGL) check (112 mg/dL) to rule out hypoglycemia mimic",
    "Prehospital Stroke Alert activation to certified Comprehensive Stroke Center; keep patient flat/head elevated at 15-30 degrees; strictly avoid treating permissive hypertension unless systolic BP > 220 mmHg"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, priority 1 response to 1104 Pinecrest Drive, 66-year-old male with sudden speech loss and right arm weakness.",
      "note": "CAD broadcast."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to 66M with sudden stroke symptoms. BSI: gloves, eye protection. Is the scene safe?",
      "note": "Scene size-up."
    },
    {
      "time": "00:00:18",
      "speaker": "PROCTOR",
      "speech": "Scene is safe. Patient's wife meets you at the door.",
      "note": "Safe verified."
    },
    {
      "time": "00:00:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Nature of illness: acute stroke / neurological emergency. One patient. Requesting ALS backup immediately due to potential large vessel occlusion and critical transport timing.",
      "note": "ALS dispatch."
    },
    {
      "time": "00:00:33",
      "speaker": "EMT CANDIDATE",
      "speech": "General impression: 66-year-old male seated at breakfast table, leaning heavily to his right side, right facial droop evident, right arm limp in lap. No trauma, C-spine not indicated.",
      "note": "General impression."
    },
    {
      "time": "00:00:46",
      "speaker": "EMT CANDIDATE",
      "speech": "Hello Mr. Henderson, I'm EMT Luke. Can you tell me your name?",
      "note": "Primary assessment."
    },
    {
      "time": "00:00:51",
      "speaker": "PATIENT (ROBERT)",
      "speech": "Mmm... gah... da... (slurred, garbled sounds, unable to form words).",
      "note": "Severe expressive aphasia."
    },
    {
      "time": "00:00:58",
      "speaker": "EMT CANDIDATE",
      "speech": "Airway is patent, no snoring or secretions. Respirations are 18 breaths/min, regular and unlabored. SpO2 is 96% on room air.",
      "note": "Airway & breathing eval."
    },
    {
      "time": "00:01:09",
      "speaker": "EMT CANDIDATE",
      "speech": "Circulation: radial pulse is 86 bpm, irregularly irregular (suspected Afib). Skin is warm and dry. Priority load-and-go stroke code.",
      "note": "Circulation check."
    },
    {
      "time": "00:01:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Partner, obtain a full set of baseline vitals with MANDATORY immediate Blood Glucose check while I perform the Cincinnati Stroke Scale and establish Last Known Well.",
      "note": "Immediate BGL ordered."
    },
    {
      "time": "00:01:34",
      "speaker": "EMT CANDIDATE",
      "speech": "Mr. Henderson, smile and show me your teeth. Evaluator, what do I observe?",
      "note": "CPSS - Facial droop."
    },
    {
      "time": "00:01:40",
      "speaker": "PROCTOR",
      "speech": "Right side of face does not move; pronounced right facial droop.",
      "note": "Facial droop positive."
    },
    {
      "time": "00:01:45",
      "speaker": "EMT CANDIDATE",
      "speech": "Mr. Henderson, close your eyes and hold both arms straight out in front of you with palms up for 10 seconds. Evaluator, what do I see?",
      "note": "CPSS - Arm drift."
    },
    {
      "time": "00:01:54",
      "speaker": "PROCTOR",
      "speech": "Left arm remains elevated; right arm falls immediately and limply to his side (plegia).",
      "note": "Arm drift positive (paralysis)."
    },
    {
      "time": "00:02:02",
      "speaker": "EMT CANDIDATE",
      "speech": "Mr. Henderson, repeat after me: 'You can't teach an old dog new tricks.'",
      "note": "CPSS - Speech."
    },
    {
      "time": "00:02:07",
      "speaker": "PATIENT (ROBERT)",
      "speech": "Ooo... ahh... can... trik... (incomprehensible jargon).",
      "note": "Speech positive."
    },
    {
      "time": "00:02:14",
      "speaker": "EMT CANDIDATE",
      "speech": "Cincinnati Stroke Scale is 3 out of 3 positive. Los Angeles Motor Scale (LAMS) is 4 (Facial droop 1, Arm drift 2 for no movement, Grip strength 1 for no right grip). This strongly predicts a Large Vessel Occlusion (LVO) of the left Middle Cerebral Artery.",
      "note": "LVO score calculated."
    },
    {
      "time": "00:02:35",
      "speaker": "PROCTOR (PARTNER)",
      "speech": "Vitals: BP 188/104 mmHg, HR 86 irregular, RR 18, SpO2 96%, BGL IS 112 mg/dL, pupils PEARRL at 3 mm with leftward gaze deviation.",
      "note": "BGL normal; stroke confirmed!"
    },
    {
      "time": "00:02:50",
      "speaker": "EMT CANDIDATE",
      "speech": "BGL is 112 mg/dL. Hypoglycemia is definitively ruled out. To the wife: What EXACT time was Robert last completely normal?",
      "note": "Last Known Well."
    },
    {
      "time": "00:02:58",
      "speaker": "PROCTOR (WIFE)",
      "speech": "He was completely fine at 7:15 AM eating toast. At 7:30 AM he dropped his coffee mug and couldn't speak. It is now 8:30 AM.",
      "note": "LKW 75 mins verified!"
    },
    {
      "time": "00:03:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Last Known Well is confirmed at 07:15 AM, exactly 75 minutes ago. He is within the golden window for IV thrombolysis (Alteplase/Tenecteplase) and mechanical thrombectomy.",
      "note": "Window calculated."
    },
    {
      "time": "00:03:25",
      "speaker": "EMT CANDIDATE",
      "speech": "Wife, does Robert take any blood thinners like Eliquis, Xarelto, Coumadin, or Aspirin?",
      "note": "Anticoagulation check."
    },
    {
      "time": "00:03:30",
      "speaker": "PROCTOR (WIFE)",
      "speech": "He takes Eliquis for his irregular heartbeat and lisinopril for blood pressure.",
      "note": "Eliquis verified."
    },
    {
      "time": "00:03:38",
      "speaker": "EMT CANDIDATE",
      "speech": "CLINICAL PEARL ON BLOOD PRESSURE: Robert's BP is 188/104 mmHg. In acute ischemic stroke, this is permissive hypertension to maintain collateral cerebral perfusion. I WILL NOT attempt to lower his blood pressure.",
      "note": "Permissive HTN preserved."
    },
    {
      "time": "00:03:55",
      "speaker": "EMT CANDIDATE",
      "speech": "We package Robert with the head of the cot elevated 15 to 30 degrees to reduce intracranial pressure while maintaining cerebral blood flow, and initiate immediate emergency transport to a certified Comprehensive Stroke Center.",
      "note": "Positioning & transport."
    },
    {
      "time": "00:04:15",
      "speaker": "EMT CANDIDATE",
      "speech": "Prehospital Stroke Activation via Radio: 'County Dispatch and Saint Joseph's Comprehensive Stroke Center, this is EMT Candidate on Medic 4. Priority 1 CODE STROKE ACTIVATION. We are 10 minutes out with a 66-year-old male with confirmed acute LVO ischemic stroke. Cincinnati 3/3, LAMS score 4 (right hemiplegia, dense expressive aphasia, left gaze preference). Last Known Well is 07:15 AM, 75 minutes ago. BGL is 112 mg/dL. Baseline vitals: BP 188/104, HR 86 irregular (on Eliquis for Afib). Head elevated 30 degrees. Requesting stroke team and CT scanner direct bed placement upon arrival.'",
      "note": "Stroke code alert."
    },
    {
      "time": "00:04:55",
      "speaker": "PROCTOR (HOSPITAL)",
      "speech": "Medic 4, Saint Joseph's copies Code Stroke. CT team is cleared and waiting for direct transport to scanner.",
      "note": "Direct-to-CT confirmed."
    },
    {
      "time": "00:05:05",
      "speaker": "EMT CANDIDATE",
      "speech": "5-minute reassessment:",
      "note": "Reassessment."
    },
    {
      "time": "00:05:15",
      "speaker": "PROCTOR",
      "speech": "Neurologic deficits remain unchanged. Repeat vitals: BP 184/102 mmHg, HR 84 irregular, RR 16, SpO2 98% on 2L NC.",
      "note": "Deficits stable."
    },
    {
      "time": "00:05:28",
      "speaker": "EMT CANDIDATE",
      "speech": "Hospital / Stroke Team Hand-Off Report: 'This is Robert Henderson, 66M, presenting with acute left MCA large vessel occlusion stroke. Exact Last Known Well is 07:15 AM (75 minutes prior to arrival). Baseline deficits: complete right-sided hemiplegia, severe expressive aphasia, right facial droop (Cincinnati 3/3, LAMS 4). Irregular heart rhythm on Eliquis. Baseline vitals: BP 188/104, HR 86, RR 18, SpO2 96%, BGL 112 mg/dL. Hypoglycemia and trauma ruled out. Cot maintained at 20 degrees elevation. Blood pressure intentionally left untreated. Current BP 184/102. Patient is ready for direct transfer onto the CT table.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:06:20",
      "speaker": "PROCTOR",
      "speech": "Flawless stroke assessment and transport timing. Station passed.",
      "note": "Station complete."
    }
  ],
  "handOffReport": "Robert Henderson, 66M, acute left MCA ischemic stroke / Large Vessel Occlusion. LKW confirmed at 07:15 AM (75 mins ago). Cincinnati 3/3, LAMS 4 (dense right hemiplegia, expressive aphasia, facial droop). Baseline BP 188/104 (permissive HTN maintained), HR 86 irregular (Afib on Eliquis), SpO2 96%, BGL 112 mg/dL (hypoglycemia ruled out). Head elevated 20 degrees. Direct hand-off onto Comprehensive Stroke Center CT scanner.",
  "reassessmentVitals": {
    "bp": "184/102 mmHg (permissive hypertension maintained)",
    "hr": "84 bpm (irregular)",
    "rr": "16 breaths/min",
    "spo2": "98% on 2 L/min Nasal Cannula",
    "lung_sounds": "Clear bilaterally",
    "pain_score": "0 / 10"
  }
},
{
  "id": 12,
  "title": "54F \u2013 Severe Hypoglycemic Hemiplegia (The Great Stroke Mimic)",
  "cad": "Medic 4, respond priority 1 to 2240 Birchwood Lane for a 54-year-old female exhibiting bizarre behavior and sudden slurred speech. Family reports possible stroke.",
  "hiddenDiagnosis": "Severe Hypoglycemic Hemiplegia (The Great Stroke Mimic)",
  "category": "Endocrine & Neurological",
  "vitals": {
    "bp": "138/82 mmHg",
    "hr": "112 bpm (tachycardic, bounding radial)",
    "rr": "20 breaths/min (shallow)",
    "spo2": "97% on ambient room air",
    "bgl": "36 mg/dL (CRITICAL HYPOGLYCEMIA!)",
    "skin": "Pale, cool, diaphoretic",
    "pupils": "PEARRL at 4 mm",
    "lungs": "Clear bilaterally"
  },
  "trap": "Attempting to administer oral glucose to an unconscious, combative, or non-swallowing patient (causes fatal pulmonary aspiration).",
  "initialPatientSpeech": "No! Leave... go away! (lashes out with left hand, right arm flops limply).",
  "clues": [
    "Focal neurological deficits (right-sided weakness and aphasia) masquerading as an acute stroke",
    "Profuse cold, pale diaphoresis with tachycardia (sympathetic surge attempting to mobilize glucose)",
    "CRITICAL DIFFERENTIATING PARAMETER: Fingerstick Blood Glucose Level is 36 mg/dL (profound hypoglycemia)",
    "Assessment of Airway & Swallowing: Patient is somnolent, combative, and unable to protect airway or follow commands -> ORAL GLUCOSE IS CONTRAINDICATED (severe aspiration risk)",
    "Requires immediate ALS rendezvous for IV Dextrose (D10W / D50W) or Glucagon 1 mg IM"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, priority 1 response to 2240 Birchwood Lane, 54-year-old female with sudden confusion and right-sided weakness.",
      "note": "CAD alert."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to 54F with acute confusion and weakness. BSI: gloves, eye protection. Scene safe?",
      "note": "Scene size-up."
    },
    {
      "time": "00:00:18",
      "speaker": "PROCTOR",
      "speech": "Scene is safe. Daughter is distressed.",
      "note": "Safe verified."
    },
    {
      "time": "00:00:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Nature of illness: altered mental status / stroke mimic. One patient. Requesting ALS backup immediately due to altered level of consciousness.",
      "note": "ALS dispatch."
    },
    {
      "time": "00:00:33",
      "speaker": "EMT CANDIDATE",
      "speech": "General impression: 54-year-old female on couch, slumping to the right, clothes soaked in perspiration, thrashing arms erratically, moaning. No trauma, C-spine not indicated.",
      "note": "General impression."
    },
    {
      "time": "00:00:46",
      "speaker": "EMT CANDIDATE",
      "speech": "Hello ma'am, can you look at me? What is your name?",
      "note": "Primary assessment."
    },
    {
      "time": "00:00:50",
      "speaker": "PATIENT (ELEANOR)",
      "speech": "No! Leave... go away! (lashes out with left hand, right arm flops limply).",
      "note": "Combative, focal weakness."
    },
    {
      "time": "00:00:58",
      "speaker": "EMT CANDIDATE",
      "speech": "Patient responds to verbal/painful stimuli (V on AVPU). Airway is open, no snoring. Respirations are 20 breaths/min. SpO2 is 97%.",
      "note": "Airway & breathing eval."
    },
    {
      "time": "00:01:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Circulation: radial pulse is 112 bpm, bounding. Skin is ice cold and drenched in sweat. High-priority load-and-go.",
      "note": "Sympathetic shock signs."
    },
    {
      "time": "00:01:22",
      "speaker": "EMT CANDIDATE",
      "speech": "CRITICAL DIAGNOSTIC PRIORITY: In any patient with altered mental status, combativeness, or acute focal weakness, A BLOOD GLUCOSE LEVEL MUST BE CHECKED IMMEDIATELY. Partner, check BGL now.",
      "note": "BGL prioritization."
    },
    {
      "time": "00:01:38",
      "speaker": "PROCTOR (PARTNER)",
      "speech": "Glucometer reads: 36 mg/dL. Baseline vitals: BP 138/82 mmHg, HR 112, RR 20, SpO2 97%, pupils 4 mm equal.",
      "note": "Profound hypoglycemia!"
    },
    {
      "time": "00:01:52",
      "speaker": "EMT CANDIDATE",
      "speech": "BGL is 36 mg/dL. This is severe neuroglycopenic hypoglycemia causing a focal hemiplegic stroke mimic.",
      "note": "Mimic recognized!"
    },
    {
      "time": "00:02:05",
      "speaker": "EMT CANDIDATE",
      "speech": "CONTRAINDICATION SCREENING: Can Eleanor take Oral Glucose? She is combative, semi-conscious, and unable to swallow on command. ORAL GLUCOSE IS STRICTLY CONTRAINDICATED due to high aspiration risk.",
      "note": "Oral glucose contraindicated!"
    },
    {
      "time": "00:02:25",
      "speaker": "EMT CANDIDATE",
      "speech": "To the daughter: Is Eleanor diabetic, and what medications does she take?",
      "note": "SAMPLE."
    },
    {
      "time": "00:02:30",
      "speaker": "PROCTOR (DAUGHTER)",
      "speech": "Yes! Type 1 diabetic. She took her morning Humalog insulin injection two hours ago, but then got a phone call and forgot to eat breakfast!",
      "note": "Classic insulin-food mismatch."
    },
    {
      "time": "00:02:44",
      "speaker": "EMT CANDIDATE",
      "speech": "Insulin administered without food intake confirms acute severe hypoglycemia. We package Eleanor on the stretcher in the recovery / semi-Fowler's position, suction ready.",
      "note": "Airway protection."
    },
    {
      "time": "00:03:00",
      "speaker": "EMT CANDIDATE",
      "speech": "Contacting Medical Control / ALS Rendezvous: 'Medic 1 ALS, this is EMT Candidate on BLS Medic 4 en route to Memorial Hospital. We have a confirmed acute hypoglycemic emergency: 54-year-old female, BGL 36 mg/dL, presenting with right hemiplegia and combativeness. Oral glucose is contraindicated due to airway unresponsiveness. We require an immediate ALS intercept for IV Dextrose (10% or 50%) or IM Glucagon. Intercept location at Oak and 5th.'",
      "note": "ALS rendezvous request."
    },
    {
      "time": "00:03:32",
      "speaker": "PROCTOR (ALS MEDIC)",
      "speech": "Medic 4, copy. Medic 1 is 1 minute out at Oak and 5th with D10 ready.",
      "note": "Intercept confirmed."
    },
    {
      "time": "00:03:45",
      "speaker": "PROCTOR (SCENARIO UPDATE)",
      "speech": "ALS boards your unit. Paramedic establishes IV access and infuses 100 mL of 10% Dextrose (D10W).",
      "note": "ALS intervention."
    },
    {
      "time": "00:04:05",
      "speaker": "EMT CANDIDATE",
      "speech": "I reassess the patient 5 minutes post-Dextrose infusion: Level of consciousness, repeat BGL, and focal neurological signs.",
      "note": "Reassessment."
    },
    {
      "time": "00:04:18",
      "speaker": "PROCTOR",
      "speech": "Eleanor blinks, looks around, and asks: 'Where am I? Why am I in an ambulance?' She lifts her right arm effortlessly and smiles symmetrically. Repeat BGL is 118 mg/dL. Repeat vitals: BP 132/78 mmHg, HR 88 bpm, RR 16, SpO2 99%.",
      "note": "Complete resolution!"
    },
    {
      "time": "00:04:40",
      "speaker": "EMT CANDIDATE",
      "speech": "CLINICAL CONFIRMATION: The complete resolution of hemiplegia and aphasia immediately following dextrose proves this was a severe neuroglycopenic focal stroke mimic. The brain tissue was starved of glucose, not oxygen.",
      "note": "Teaching point verbalized."
    },
    {
      "time": "00:05:00",
      "speaker": "EMT CANDIDATE",
      "speech": "Hospital Hand-Off Report: 'This is Eleanor Vance, 54F, presenting with severe hypoglycemic hemiplegia. Took morning insulin without food. Initial presentation: combative, aphasic, complete right arm weakness mimicking an acute MCA stroke. Baseline vitals: BP 138/82, HR 112, cold diaphoresis, initial BGL 36 mg/dL. Oral glucose withheld due to altered consciousness. ALS administered 100 mL IV D10W. Current status: Alert and oriented x 4, speech normal, bilateral motor strength 5/5, repeat BGL 118 mg/dL, repeat vitals BP 132/78, HR 88, RR 16. Patient is stable for glycemic monitoring and meal evaluation.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:05:55",
      "speaker": "PROCTOR",
      "speech": "Outstanding differentiation. Station passed.",
      "note": "Station passed."
    }
  ],
  "handOffReport": "Eleanor Vance, 54F, severe hypoglycemic hemiplegia mimicking acute stroke. Injected morning insulin without breakfast. Presenting with combative altered mental status, cold diaphoresis, and right arm paralysis. Initial BGL 36 mg/dL, HR 112. Oral glucose withheld to protect airway. ALS rendezvous executed with 100 mL IV D10W. Post-treatment BGL 118 mg/dL, full A&O x 4 mental status restored, right hemiplegia completely resolved. Vitals BP 132/78, HR 88.",
  "reassessmentVitals": {
    "bp": "132/78 mmHg",
    "hr": "88 bpm (tachycardia resolved)",
    "rr": "16 breaths/min",
    "spo2": "99% on room air",
    "bgl": "118 mg/dL (post-ALS IV Dextrose)",
    "pain_score": "0 / 10 (fully alert and oriented x 4; right arm weakness completely vanished!)"
  }
},
{
  "id": 13,
  "title": "19M \u2013 Diabetic Ketoacidosis (DKA) with Kussmaul Breathing",
  "cad": "Medic 4, respond priority 2 to University Hall, Room 304, for a 19-year-old male with persistent vomiting, extreme weakness, and strange heavy breathing. Caller is his roommate.",
  "hiddenDiagnosis": "Diabetic Ketoacidosis (DKA) with Kussmaul Breathing",
  "category": "Endocrine",
  "vitals": {
    "bp": "96/60 mmHg (dehydration / orthostatic shock)",
    "hr": "124 bpm (sinus tachycardia, weak radial)",
    "rr": "32 breaths/min (Kussmaul breathing: deep, rapid, sighing)",
    "spo2": "97% on ambient room air",
    "bgl": "'HI' (Glucometer maxed > 500 mg/dL)",
    "skin": "Hot, flushed, dry or drenched",
    "pupils": "PEARRL at 3 mm, sunken orbits",
    "lungs": "Clear bilaterally throughout all fields (lungs are compensating, not diseased)"
  },
  "trap": "Administering oral fluids, juice, or oral glucose to a DKA patient (worsens hyperglycemia, hyperosmolar state, and triggers aspiration).",
  "initialPatientSpeech": "Zach... (deep gasp)... stomach hurts so bad... so thirsty... feel like I'm dying...",
  "clues": [
    "Kussmaul Respirations: Deep, rapid, gasping respirations (attempting to blow off volatile carbonic acid / CO2 to compensate for profound metabolic ketoacidosis)",
    "Distinct fruity, sweet, acetone odor on the patient's breath",
    "The Classical '3 P's': Polyuria (excess urination), Polydipsia (unquenchable thirst), and Polyphagia leading to nausea/vomiting",
    "Profound systemic dehydration: Sunken eyes, dry cracked lips, poor skin turgor (tenting), orthostatic hypotension",
    "Fingerstick Blood Glucose Level reads 'HIGH' (>500 mg/dL); requires aggressive ALS IV Normal Saline fluid resuscitation (do NOT give oral fluids or sugar!)"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, priority 2 response to University Hall Room 304, 19-year-old male with heavy breathing, vomiting, and weakness.",
      "note": "CAD broadcast."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to 19M with respiratory abnormalities and vomiting. BSI: gloves, eye protection, mask. Scene safe?",
      "note": "Scene size-up."
    },
    {
      "time": "00:00:18",
      "speaker": "PROCTOR",
      "speech": "Scene is safe. Roommate opens the door.",
      "note": "Safe verified."
    },
    {
      "time": "00:00:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Nature of illness: endocrine emergency / suspected DKA. One patient. Requesting ALS backup for IV rehydration therapy.",
      "note": "ALS dispatch."
    },
    {
      "time": "00:00:32",
      "speaker": "EMT CANDIDATE",
      "speech": "General impression: 19-year-old male lying in bed, breathing very deeply and rapidly with audible sighs, flushed cheeks, emesis basin by bed. I smell a distinct sweet, fruity, nail-polish remover scent in the air. C-spine not indicated.",
      "note": "Fruity breath noted!"
    },
    {
      "time": "00:00:50",
      "speaker": "EMT CANDIDATE",
      "speech": "Hello, I'm EMT Luke. Can you tell me your name?",
      "note": "Primary assessment."
    },
    {
      "time": "00:00:54",
      "speaker": "PATIENT (ZACH)",
      "speech": "Zach... (deep gasp)... stomach hurts so bad... so thirsty... feel like I'm dying...",
      "note": "Kussmaul speech pattern."
    },
    {
      "time": "00:01:02",
      "speaker": "EMT CANDIDATE",
      "speech": "Airway is patent, no active emesis. Respirations are 32 breaths/min, abnormally deep and rapid. SpO2 is 97%.",
      "note": "Breathing eval."
    },
    {
      "time": "00:01:14",
      "speaker": "EMT CANDIDATE",
      "speech": "I apply oxygen via nasal cannula at 4 L/min. Checking circulation: radial pulse is 124 bpm, rapid and weak. Skin is warm, dry, with tenting turgor. Oral mucosa is parched.",
      "note": "Severe dehydration."
    },
    {
      "time": "00:01:30",
      "speaker": "EMT CANDIDATE",
      "speech": "Partner, please obtain full vitals and an IMMEDIATE blood glucose check while I palpate Zach's abdomen and review his history.",
      "note": "Delegation."
    },
    {
      "time": "00:01:42",
      "speaker": "EMT CANDIDATE",
      "speech": "I palpate the abdomen: soft, diffuse mild tenderness across all 4 quadrants, no rigid guarding, no rebound. This is metabolic ketoacidotic ileus.",
      "note": "Abdominal exam."
    },
    {
      "time": "00:01:55",
      "speaker": "PROCTOR (PARTNER)",
      "speech": "Vitals: BP 96/60 mmHg, HR 124, RR 32 deep and sighing, SpO2 97%, GLUCOMETER READS 'HI' (>500 mg/dL).",
      "note": "Hyperglycemia verified!"
    },
    {
      "time": "00:02:10",
      "speaker": "EMT CANDIDATE",
      "speech": "The glucometer reads 'HI' (>500 mg/dL). Zach is in classic Diabetic Ketoacidosis (DKA). Zach, are you a Type 1 diabetic?",
      "note": "History gathering."
    },
    {
      "time": "00:02:18",
      "speaker": "PATIENT (ZACH)",
      "speech": "Yeah... diagnosed at age 12... had the flu two days ago and couldn't keep food down, so I stopped taking my insulin...",
      "note": "Missed insulin confirmed!"
    },
    {
      "time": "00:02:30",
      "speaker": "EMT CANDIDATE",
      "speech": "CLINICAL PATHOPHYSIOLOGY PEARL: When a diabetic gets sick, stress hormones spike blood sugar. Stopping insulin causes the cells to starve, metabolizing fatty acids into ketones, resulting in severe metabolic acidosis. The Kussmaul breathing is the body's respiratory attempt to blow off CO2 to raise blood pH.",
      "note": "DKA mechanics verbalized."
    },
    {
      "time": "00:02:55",
      "speaker": "EMT CANDIDATE",
      "speech": "Zach is in hypovolemic dehydration from osmotic diuresis (losing 5 to 10 liters of fluid). ORAL FLUIDS ARE STRICTLY WITHHELD due to nausea and vomiting. He requires immediate IV Normal Saline from ALS.",
      "note": "NPO order."
    },
    {
      "time": "00:03:15",
      "speaker": "EMT CANDIDATE",
      "speech": "We package Zach supine with legs elevated slightly to support blood pressure, keep him warm, and begin transport to rendezvous with ALS.",
      "note": "Positioning & transport."
    },
    {
      "time": "00:03:30",
      "speaker": "EMT CANDIDATE",
      "speech": "Contacting Medical Control: 'Medical Control, this is EMT Candidate on Medic 4. Transporting a 19-year-old male with severe Diabetic Ketoacidosis. Missed insulin for 48 hours. BGL is 'HI' (>500 mg/dL). Presenting with Kussmaul respirations (RR 32 deep), fruity acetone breath, diffuse abdominal pain, BP 96/60, HR 124 thready. Patient is NPO. Rendezvousing with ALS Medic 3 for an immediate 1-liter Normal Saline IV bolus.'",
      "note": "Medical Control report."
    },
    {
      "time": "00:04:00",
      "speaker": "PROCTOR (MED CONTROL)",
      "speech": "Medic 4, copy. Rendezvous with Medic 3 approved. Hospital ED alerted for pediatric/young adult DKA protocol.",
      "note": "Hospital alert."
    },
    {
      "time": "00:04:12",
      "speaker": "EMT CANDIDATE",
      "speech": "Medical Control, confirmed: Rendezvous with Medic 3 for IV saline bolus en route. Candidate out.",
      "note": "Closed-loop confirmation."
    },
    {
      "time": "00:04:25",
      "speaker": "EMT CANDIDATE",
      "speech": "5-minute reassessment:",
      "note": "Reassessment."
    },
    {
      "time": "00:04:35",
      "speaker": "PROCTOR",
      "speech": "ALS boards and initiates a 1,000 mL Normal Saline bolus. Repeat vitals: BP 104/66 mmHg, HR 112 bpm, RR 26, SpO2 99% on 4L NC.",
      "note": "Hemodynamic recovery."
    },
    {
      "time": "00:04:50",
      "speaker": "EMT CANDIDATE",
      "speech": "ALS / Hospital Hand-Off Report: 'This is Zachary Taylor, 19M, presenting with acute Diabetic Ketoacidosis. Type 1 diabetic who discontinued insulin 2 days ago due to gastroenteritis. Initial presentation: Kussmaul breathing at 32 breaths/min, fruity acetone breath, signs of severe osmotic dehydration, diffuse cramping abdominal pain. Baseline vitals: BP 96/60, HR 124 thready, SpO2 97%, BGL maxed at 'HI' (>500 mg/dL). Lungs clear. Patient kept NPO, placed on 4L NC, and ALS infused 500 mL Normal Saline bolus. Current BP 104/66, HR 112, RR 26. Ready for electrolyte panel, venous blood gas, and IV regular insulin drip.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:05:45",
      "speaker": "PROCTOR",
      "speech": "Excellent clinical understanding of DKA. Station passed.",
      "note": "Station passed."
    }
  ],
  "handOffReport": "Zachary Taylor, 19M, acute Diabetic Ketoacidosis secondary to missed insulin during viral illness. Presenting with deep Kussmaul respirations, fruity breath odor, osmotic dehydration, and diffuse abdominal pain. Baseline BP 96/60, HR 124, RR 32, BGL 'HI' (>500 mg/dL). Managed NPO with 4L NC and ALS 1-liter Normal Saline crystalloid bolus. Repeat BP 104/66, HR 112, RR 26. Prepped for insulin protocol and electrolyte replacement.",
  "reassessmentVitals": {
    "bp": "104/66 mmHg (improving with ALS IV fluid bolus)",
    "hr": "112 bpm",
    "rr": "26 breaths/min (Kussmaul drive persists)",
    "spo2": "99% on 4 L/min Nasal Cannula",
    "bgl": "'HI' (>500 mg/dL)",
    "pain_score": "4 / 10"
  }
},
{
  "id": 14,
  "title": "28M \u2013 Status Epilepticus & Post-Ictal Airway Management",
  "cad": "Medic 4, respond priority 1 lights and sirens to City Java, 400 Market Street, for a 28-year-old male actively seizing on the sidewalk. Callers report he has been shaking for over 6 minutes.",
  "hiddenDiagnosis": "Status Epilepticus & Post-Ictal Airway Management",
  "category": "Neurological",
  "vitals": {
    "bp": "164/98 mmHg (extreme autonomic / sympathetic surge)",
    "hr": "142 bpm (sinus tachycardia)",
    "rr": "8 breaths/min (shallow, sonorous, post-ictal respiratory depression)",
    "spo2": "81% on ambient air (severe cyanosis)",
    "bgl": "84 mg/dL",
    "skin": "Pale, cool, diaphoretic",
    "pupils": "Sluggish, dilated at 6 mm",
    "lungs": "Coarse upper airway bubbling; bilateral breath sounds present but shallow"
  },
  "trap": "Attempting to pry open clenched teeth or shoving an OPA, tongue blade, or fingers into the mouth of a seizing patient (causes severe dental trauma and finger amputation).",
  "initialPatientSpeech": "Help me... I feel terrible...",
  "clues": [
    "Status Epilepticus definition: Continuous generalized tonic-clonic seizure lasting > 5 minutes OR recurrent seizures without full recovery of consciousness between episodes",
    "Severe cerebral hypoxia, hyperthermia, and metabolic lactic acidosis developing rapidly",
    "Immediate airway threat: Blood-tinged foamy saliva from lateral tongue biting, trismus (clenched jaw), and sonorous snoring upon cessation of motor activity",
    "CRITICAL AIRWAY CONTRAINDICATION: NEVER force anything between clenched teeth (DO NOT use an Oropharyngeal Airway / OPA). Insert a lubricated Nasopharyngeal Airway (NPA) and perform gentle suctioning!",
    "Immediate ALS request for IV/IN Benzodiazepines (Midazolam / Versed 5-10 mg)"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, priority 1 response to City Java, 400 Market Street, 28-year-old male in continuous active seizure.",
      "note": "CAD alert."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to 28M actively seizing. BSI: gloves, eye protection. Is the scene safe?",
      "note": "Scene size-up."
    },
    {
      "time": "00:00:18",
      "speaker": "PROCTOR",
      "speech": "Scene is safe. Coffee shop patrons have moved chairs away.",
      "note": "Safe verified."
    },
    {
      "time": "00:00:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Nature of illness: status epilepticus / neurological life-threat. One patient. Requesting ALS backup immediately for pharmaceutical seizure termination.",
      "note": "ALS dispatch."
    },
    {
      "time": "00:00:32",
      "speaker": "EMT CANDIDATE",
      "speech": "General impression: 28-year-old male on concrete, actively seizing with rhythmic full-body tonic-clonic jerking, teeth clenched, blood-tinged foam at mouth, facial cyanosis. I protect his head with a soft jacket, move hard objects away, and DO NOT restrain his limbs.",
      "note": "Seizure safety."
    },
    {
      "time": "00:00:52",
      "speaker": "PROCTOR",
      "speech": "After 60 seconds, the convulsions cease. The patient becomes completely flaccid, unresponsive, and begins snoring loudly.",
      "note": "Post-ictal transition."
    },
    {
      "time": "00:01:00",
      "speaker": "EMT CANDIDATE",
      "speech": "PRIMARY ASSESSMENT: The patient is unresponsive (U on AVPU). Loud sonorous snoring indicates the tongue is occluding the hypopharynx. Blood-tinged foam is in his mouth.",
      "note": "Airway obstruction noted."
    },
    {
      "time": "00:01:14",
      "speaker": "EMT CANDIDATE",
      "speech": "AIRWAY MANAGEMENT PROTOCOL: I perform a modified jaw-thrust maneuver. I prepare the rigid tip suction catheter. I suction the oral cavity for no more than 15 seconds, removing secretions and blood.",
      "note": "Suction executed."
    },
    {
      "time": "00:01:32",
      "speaker": "EMT CANDIDATE",
      "speech": "AIRWAY ADJUNCT SELECTION: His jaw remains tight with trismus. I WILL NOT FORCE AN OPA BETWEEN HIS TEETH. I select a Nasopharyngeal Airway (NPA), size it from tip of nose to earlobe, lubricate with water-soluble jelly, and insert bevel toward the septum into the right nostril.",
      "note": "NPA inserted safely!"
    },
    {
      "time": "00:01:55",
      "speaker": "PROCTOR",
      "speech": "NPA passes smoothly. Snoring respirations immediately cease.",
      "note": "Airway opened."
    },
    {
      "time": "00:02:02",
      "speaker": "EMT CANDIDATE",
      "speech": "How is my patient's breathing? Respirations are 8 breaths/min, extremely shallow, SpO2 is 81%. This is inadequate ventilation. I immediately initiate Bag-Valve-Mask (BVM) ventilations with 100% O2 at 1 breath every 5 to 6 seconds (10-12 breaths/min).",
      "note": "BVM ventilations started!"
    },
    {
      "time": "00:02:25",
      "speaker": "PROCTOR (PARTNER)",
      "speech": "Chest rises visibly with each BVM squeeze. SpO2 climbs to 94%... then 98%. Radial pulse is 142 bpm, strong. Skin is warm and diaphoretic. BGL check reads 84 mg/dL.",
      "note": "Ventilation successful."
    },
    {
      "time": "00:02:44",
      "speaker": "EMT CANDIDATE",
      "speech": "BGL is 84 mg/dL (hypoglycemia ruled out). I check the bystander: Did anyone see what happened?",
      "note": "Bystander history."
    },
    {
      "time": "00:02:50",
      "speaker": "PROCTOR (CO-WORKER)",
      "speech": "He has epilepsy. He ran out of his Keppra medication two days ago. He started shaking 7 minutes ago and never woke up.",
      "note": "Medication non-compliance."
    },
    {
      "time": "00:03:02",
      "speaker": "EMT CANDIDATE",
      "speech": "Total seizure duration > 5 minutes confirms Status Epilepticus. High priority load-and-go. We log-roll Marcus onto the stretcher in the left lateral recovery position while maintaining BVM ventilations and airway suction readiness.",
      "note": "Recovery position on cot."
    },
    {
      "time": "00:03:22",
      "speaker": "EMT CANDIDATE",
      "speech": "Contacting Medical Control / ALS Rendezvous: 'Medic 1 ALS, this is EMT Candidate on BLS Medic 4 en route. We have a post-ictal 28-year-old male following 7 minutes of continuous tonic-clonic status epilepticus. NPA placed, airway suctioned, ventilating via BVM with 100% O2. SpO2 98%, HR 142, BP 164/98, BGL 84 mg/dL. Seizure history with missed Keppra. Patient is high risk for immediate recurrent seizure. Requesting rendezvous at 5th and Broad for Midazolam administration.'",
      "note": "ALS rendezvous alert."
    },
    {
      "time": "00:03:55",
      "speaker": "PROCTOR (ALS MEDIC)",
      "speech": "Medic 4, copy. Medic 1 is at 5th and Broad. We will board to administer 10 mg intranasal Midazolam if active seizures resume.",
      "note": "ALS ready."
    },
    {
      "time": "00:04:08",
      "speaker": "EMT CANDIDATE",
      "speech": "5-minute reassessment:",
      "note": "Reassessment."
    },
    {
      "time": "00:04:18",
      "speaker": "PROCTOR",
      "speech": "Patient begins groaning and withdraws from painful stimuli (P on AVPU). Spontaneous respirations increase to 16 breaths/min. Repeat vitals: BP 136/84 mmHg, HR 108 bpm, SpO2 98% on BVM assist.",
      "note": "Post-ictal recovery."
    },
    {
      "time": "00:04:35",
      "speaker": "EMT CANDIDATE",
      "speech": "ALS / Trauma ED Hand-Off Report: 'This is Marcus Reed, 28M, status epilepticus secondary to missed Keppra. Witnessed continuous tonic-clonic convulsions lasting 7 minutes without interictal recovery. Baseline presentation: flaccid, unresponsive, sonorous airway with blood-tinged oral secretions, hypoventilating at 8 breaths/min with initial SpO2 81%. We cleared the oral airway, inserted a right-sided NPA, and provided BVM ventilations with 100% O2. BGL is 84 mg/dL. Repeat vitals: BP 136/84, HR 108, RR 16 assisted, SpO2 98%. Patient is transitioning into responsive post-ictal state, lateral recovery position maintained, prepped for anticonvulsant loading.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:05:35",
      "speaker": "PROCTOR",
      "speech": "Masterful airway and status epilepticus management. Station passed.",
      "note": "Station passed."
    }
  ],
  "handOffReport": "Marcus Reed, 28M, status epilepticus lasting > 7 minutes following missed Keppra doses. Presenting post-ictal, unresponsive, severe sonorous airway obstruction, oral bleeding, and respiratory depression (RR 8, SpO2 81%). Managed with soft suctioning, NPA placement, and positive pressure BVM ventilations at 10-12/min with 100% O2. BGL 84 mg/dL. Repeat vitals BP 136/84, HR 108, RR 16, SpO2 98% in lateral recovery position. Ready for hospital EEG and anticonvulsant re-dosing.",
  "reassessmentVitals": {
    "bp": "136/84 mmHg",
    "hr": "108 bpm",
    "rr": "16 breaths/min (assisted via BVM with 100% O2)",
    "spo2": "98% on BVM ventilations",
    "lung_sounds": "Upper airway clear post-suction; equal aeration",
    "pain_score": "Moaning to painful stimuli (P on AVPU)"
  }
},
{
  "id": 15,
  "title": "47F \u2013 Subarachnoid Hemorrhage with Herniation & Cushing's Triad",
  "cad": "Medic 4, respond priority 1 lights and sirens to 880 Crestview Terrace for a 47-year-old female who collapsed on the bathroom floor screaming about severe head pain. Caller is her husband.",
  "hiddenDiagnosis": "Subarachnoid Hemorrhage with Herniation & Cushing's Triad",
  "category": "Neurological & Trauma",
  "vitals": {
    "bp": "196/60 mmHg (widening pulse pressure of 136 mmHg!)",
    "hr": "44 bpm (marked compensatory bradycardia)",
    "rr": "10 breaths/min (irregular, Cheyne-Stokes waxing and waning pattern)",
    "spo2": "92% on ambient room air",
    "bgl": "116 mg/dL",
    "skin": "Pale, cool, diaphoretic",
    "pupils": "Left pupil is 6 mm fixed and dilated ('blown pupil'); right pupil is 3 mm reactive",
    "lungs": "Clear bilaterally"
  },
  "trap": "Failing to recognize Cushing's Triad as a sign of life-threatening intracranial pressure and brain herniation.",
  "initialPatientSpeech": "Oh God... my head... like a bomb went off... worst pain... of my life...",
  "clues": [
    "The Classic 'Thunderclap' Headache: Instantaneous maximal intensity ('Worst headache of my entire life' - rupture of cerebral berry aneurysm)",
    "Meningeal irritation signs: Severe nuchal rigidity (stiff neck), photophobia, and projectile vomiting",
    "CUSHING'S TRIAD (The Hallmark of Impending Brain Herniation): 1. Progressive Hypertension with Widening Pulse Pressure (BP 196/60 mmHg); 2. Profound Bradycardia (HR 44 bpm); 3. Irregular Respiratory Pattern (Cheyne-Stokes respirations)",
    "Uncal Herniation Pupillary Sign: Unilateral dilated, non-reactive pupil ('blown pupil')",
    "CRITICAL PROTOCOL: Elevate head of stretcher 30 degrees; maintain normal ventilation (EtCO2 35-40 mmHg) and STRICTLY AVOID routine hyperventilation UNLESS active signs of brain herniation (blown pupil, extensor posturing) are present"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, priority 1 response to 880 Crestview Terrace, 47-year-old female with sudden thunderclap headache and collapse.",
      "note": "CAD broadcast."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to 47F with severe acute headache. BSI: gloves, eye protection. Scene safe?",
      "note": "Scene size-up."
    },
    {
      "time": "00:00:18",
      "speaker": "PROCTOR",
      "speech": "Scene is safe. Husband escorts you to the bathroom.",
      "note": "Safe verified."
    },
    {
      "time": "00:00:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Nature of illness: intracranial hemorrhage / neurological catastrophe. One patient. Requesting ALS backup immediately for advanced airway and neurocritical care.",
      "note": "ALS dispatch."
    },
    {
      "time": "00:00:32",
      "speaker": "EMT CANDIDATE",
      "speech": "General impression: 47-year-old female curled on bathroom floor, holding head, eyes clamped shut against light, projectile vomit on floor, moaning. C-spine: husband reports no fall or trauma, but I stabilize neck gently during exam.",
      "note": "General impression."
    },
    {
      "time": "00:00:48",
      "speaker": "EMT CANDIDATE",
      "speech": "Ma'am, I'm EMT Luke. Can you tell me what happened?",
      "note": "Primary assessment."
    },
    {
      "time": "00:00:52",
      "speaker": "PATIENT (PATRICIA)",
      "speech": "Oh God... my head... like a bomb went off... worst pain... of my life...",
      "note": "Classic thunderclap statement."
    },
    {
      "time": "00:01:00",
      "speaker": "EMT CANDIDATE",
      "speech": "Airway is patent but at risk from vomiting. Suction is on standby. Respirations are 10 breaths/min, irregular with waxing and waning cycles (Cheyne-Stokes). SpO2 is 92%.",
      "note": "Cheyne-Stokes breathing."
    },
    {
      "time": "00:01:14",
      "speaker": "EMT CANDIDATE",
      "speech": "I apply high-flow oxygen via Non-Rebreather at 15 L/min. Checking circulation: radial pulse is 44 bpm, strong and bounding. Skin is warm and flushed.",
      "note": "Bradycardia noted."
    },
    {
      "time": "00:01:28",
      "speaker": "EMT CANDIDATE",
      "speech": "Partner, obtain a full set of vitals with BGL immediately while I check pupils and neck rigidity.",
      "note": "Delegation."
    },
    {
      "time": "00:01:38",
      "speaker": "EMT CANDIDATE",
      "speech": "I assess Patricia's neck and pupils: What do I find?",
      "note": "Targeted neuro exam."
    },
    {
      "time": "00:01:45",
      "speaker": "PROCTOR",
      "speech": "Severe nuchal rigidity (resistance to passive neck flexion). Pupils: Left pupil is 6 mm, fixed and non-reactive to light. Right pupil is 3 mm and reactive.",
      "note": "Uncal blown pupil!"
    },
    {
      "time": "00:01:58",
      "speaker": "PROCTOR (PARTNER)",
      "speech": "Vitals: BP 196/60 mmHg (pulse pressure 136 mmHg), HR 44 bpm, RR 10 irregular, SpO2 92% on room air, BGL 116 mg/dL.",
      "note": "Cushing's Triad confirmed!"
    },
    {
      "time": "00:02:15",
      "speaker": "EMT CANDIDATE",
      "speech": "CRITICAL CLINICAL DIAGNOSIS: The patient has a Ruptured Cerebral Aneurysm with Subarachnoid Hemorrhage. The combination of: 1. Extreme systolic hypertension with widening pulse pressure (196/60); 2. Severe bradycardia (44 bpm); 3. Irregular Cheyne-Stokes respirations represents CUSHING'S TRIAD. Coupled with a unilateral fixed dilated pupil (6 mm), this confirms active tentorial uncal brain herniation.",
      "note": "Herniation recognized!"
    },
    {
      "time": "00:02:45",
      "speaker": "EMT CANDIDATE",
      "speech": "HERNIATION VENTILATION PROTOCOL: Because the patient exhibits definitive signs of uncal herniation (blown pupil + Cushing's triad + dropping GCS), mild controlled hyperventilation is indicated to induce cerebral vasoconstriction and temporarily lower ICP. I initiate BVM ventilations with 100% O2 at 20 breaths per minute (1 breath every 3 seconds), targeting an EtCO2 of 30-35 mmHg.",
      "note": "Hyperventilation for herniation."
    },
    {
      "time": "00:03:15",
      "speaker": "EMT CANDIDATE",
      "speech": "I position Patricia on the cot with the head elevated 30 degrees to promote jugular venous drainage and reduce intracranial pressure. I ensure her head and neck remain strictly midline.",
      "note": "30 degree head elevation."
    },
    {
      "time": "00:03:32",
      "speaker": "EMT CANDIDATE",
      "speech": "IMMEDIATE CODE 3 LOAD-AND-GO TO A COMPREHENSIVE NEUROTRAUMA / NEUROSURGICAL CENTER. We notify Medical Control.",
      "note": "Transport decision."
    },
    {
      "time": "00:03:45",
      "speaker": "EMT CANDIDATE",
      "speech": "Contacting Medical Control: 'Medical Control, this is EMT Candidate on Medic 4. Priority 1 emergent transport with a 47-year-old female presenting with acute subarachnoid hemorrhage and impending uncal brain herniation. Sudden thunderclap headache, nuchal rigidity, vomiting. Full Cushing's Triad: BP 196/60, HR 44, Cheyne-Stokes respirations, and a left blown pupil at 6 mm. BGL 116. Head elevated 30 degrees, controlled mild hyperventilation via BVM at 20/min. Requesting immediate neurosurgical team and emergent CT operating suite activation at University Trauma Center.'",
      "note": "Medical Control report."
    },
    {
      "time": "00:04:25",
      "speaker": "PROCTOR (MED CONTROL)",
      "speech": "Medic 4, copy. University Trauma neurosurgery is scrubbed and waiting. Expedite transport.",
      "note": "Neurosurgery scrubbed."
    },
    {
      "time": "00:04:36",
      "speaker": "EMT CANDIDATE",
      "speech": "Medical Control, confirmed: Transporting code 3 to University Trauma with neurosurgery ready. Candidate out.",
      "note": "Closed-loop confirmation."
    },
    {
      "time": "00:04:48",
      "speaker": "EMT CANDIDATE",
      "speech": "5-minute reassessment:",
      "note": "Reassessment."
    },
    {
      "time": "00:04:58",
      "speaker": "PROCTOR",
      "speech": "Patient localizes to central pain. Repeat vitals: BP 190/62 mmHg, HR 46 bpm, RR 16 assisted, SpO2 99% on BVM.",
      "note": "Vitals tracked."
    },
    {
      "time": "00:05:12",
      "speaker": "EMT CANDIDATE",
      "speech": "Neurosurgical / Trauma Hand-Off Report: 'This is Patricia Gomez, 47F, acute subarachnoid hemorrhage with tentorial herniation. Sudden explosive thunderclap headache and projectile vomiting 20 minutes ago. Baseline exam: complete Cushing's Triad (BP 196/60, HR 44, Cheyne-Stokes respirations), marked nuchal rigidity, and left uncal blown pupil (6 mm fixed vs 3 mm right). BGL is 116 mg/dL. Interventions: Head elevated 30 degrees midline, gentle airway suctioning, and controlled hyperventilation via BVM at 20/min for active herniation signs. Repeat BP 190/62, HR 46. Patient is prepped for direct transfer onto the neurosurgical CT table for emergent ventriculostomy or craniotomy.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:06:10",
      "speaker": "PROCTOR",
      "speech": "Flawless recognition of Cushing's triad and herniation protocol. Station passed.",
      "note": "Station passed."
    }
  ],
  "handOffReport": "Patricia Gomez, 47F, acute subarachnoid hemorrhage with impending uncal herniation. Sudden 'thunderclap' headache, projectile vomiting, and nuchal rigidity. Exhibiting complete Cushing's Triad: BP 196/60 (widening pulse pressure), HR 44 (bradycardia), Cheyne-Stokes respirations, with a left fixed dilated pupil at 6 mm. BGL 116 mg/dL. Head elevated 30 degrees, controlled hyperventilation via BVM at 20/min for herniation. Repeat BP 190/62, HR 46. Direct hand-off to neurosurgical trauma team.",
  "reassessmentVitals": {
    "bp": "190/62 mmHg",
    "hr": "46 bpm",
    "rr": "16 breaths/min (controlled via BVM with reservoir at 1 breath every 3 seconds for active herniation)",
    "spo2": "99% on BVM",
    "pupils": "Left pupil remains 6 mm fixed; right remains 3 mm",
    "pain_score": "Unresponsive to verbal, localizes to central pain"
  }
},
{
  "id": 16,
  "title": "29M \u2013 Severe Systemic Anaphylactic Shock (The Epinephrine Mandate)",
  "cad": "Medic 4, respond priority 1 lights and sirens to Bangkok Bistro, 1200 Pacific Highway, for a 29-year-old male having a severe allergic reaction after eating peanut sauce. Caller states patient's throat is closing up.",
  "hiddenDiagnosis": "Severe Systemic Anaphylactic Shock (The Epinephrine Mandate)",
  "category": "Immunologic & Shock",
  "vitals": {
    "bp": "78/46 mmHg (severe distributive shock / profound vasodilation)",
    "hr": "134 bpm (compensatory sinus tachycardia)",
    "rr": "30 breaths/min (labored, intercostal retractions)",
    "spo2": "88% on ambient room air",
    "bgl": "104 mg/dL",
    "skin": "Hot, flushed, dry or drenched",
    "pupils": "PEARRL at 4 mm",
    "lungs": "Inspiratory stridor over larynx; diffuse loud expiratory wheezing across all lung lobes"
  },
  "trap": "Delaying Epinephrine administration to give Benadryl, Albuterol, or steroids first (Epinephrine is the ONLY drug that reverses anaphylactic death; delays increase mortality exponentially!).",
  "initialPatientSpeech": "(High-pitched raspy whisper)... throat... tight... closing... dizzy...",
  "clues": [
    "Multi-system involvement: 1. Cutaneous (generalized urticaria/hives, pruritus); 2. Respiratory (stridor, diffuse bronchospastic wheezing, dyspnea); 3. Cardiovascular (distributive shock / hypotension BP 78/46 mmHg)",
    "Prominent angioedema: Swelling of the lips, tongue, uvula, and periorbital tissue",
    "FIRST-LINE DRUG OF CHOICE: Immediate Intramuscular Epinephrine 0.3 mg (1:1,000) into the anterolateral thigh (EpiPen / auto-injector). Antihistamines (Benadryl) and Albuterol are secondary adjuncts and NEVER replace Epinephrine!",
    "Distributive shock positioning: Lie the patient supine with legs elevated (Trendelenburg/modified) unless respiratory distress forces high-Fowler's; avoid sudden standing (causes fatal 'empty ventricle syndrome')",
    "Biphasic reaction alert: Symptoms can recur 4 to 8 hours later despite initial recovery"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, priority 1 response to Bangkok Bistro, 29-year-old male with severe peanut anaphylaxis, throat closing.",
      "note": "CAD broadcast."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to 29M with severe food anaphylaxis. BSI: gloves, eye protection. Is the scene safe?",
      "note": "Scene size-up."
    },
    {
      "time": "00:00:18",
      "speaker": "PROCTOR",
      "speech": "Scene is safe. Waitstaff has cleared patrons away.",
      "note": "Safe verified."
    },
    {
      "time": "00:00:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Nature of illness: severe systemic anaphylactic shock / life-threat. One patient. Requesting ALS backup immediately for airway protection and secondary meds.",
      "note": "ALS dispatch."
    },
    {
      "time": "00:00:32",
      "speaker": "EMT CANDIDATE",
      "speech": "General impression: 29-year-old male sitting on patio chair, gasping for air, massive swelling of lips and eyelids (angioedema), scratching raised red hives (urticaria) across chest and neck, cyanotic lips. No trauma, C-spine not indicated.",
      "note": "General impression."
    },
    {
      "time": "00:00:46",
      "speaker": "EMT CANDIDATE",
      "speech": "Hello, I'm EMT Luke. Can you speak to me?",
      "note": "Primary assessment."
    },
    {
      "time": "00:00:50",
      "speaker": "PATIENT (DAVID)",
      "speech": "(High-pitched raspy whisper)... throat... tight... closing... dizzy...",
      "note": "Stridor & severe airway edema."
    },
    {
      "time": "00:00:58",
      "speaker": "EMT CANDIDATE",
      "speech": "AIRWAY & BREATHING: Airway is critically narrowed by laryngeal angioedema. Inspiratory stridor is audible. Respirations are 30 breaths/min, severely labored. SpO2 is 88%.",
      "note": "Airway emergency."
    },
    {
      "time": "00:01:10",
      "speaker": "EMT CANDIDATE",
      "speech": "CIRCULATION: Radial pulse is 134 bpm, rapid and weak. Skin is hot, flushed, covered in urticaria, and diaphoretic. Cap refill is 3 seconds. Blood pressure is 78/46 mmHg.",
      "note": "Distributive shock."
    },
    {
      "time": "00:01:25",
      "speaker": "EMT CANDIDATE",
      "speech": "IMMEDIATE FIRST-LINE LIFESAVING ACTION: THIS IS SEVERE SYSTEMIC ANAPHYLAXIS WITH DISTRIBUTIVE SHOCK. EPINEPHRINE IS INDICATED IMMEDIATELY. I ask: David, do you have an EpiPen?",
      "note": "Epinephrine indication."
    },
    {
      "time": "00:01:38",
      "speaker": "PATIENT (DAVID)",
      "speech": "(Nods and points weakly to his backpack on the chair).",
      "note": "Auto-injector located."
    },
    {
      "time": "00:01:42",
      "speaker": "EMT CANDIDATE",
      "speech": "I retrieve David's auto-injector: Right patient (David Choi), Right drug (Epinephrine Auto-Injector 1:1,000 / 1 mg/mL), Right dose (0.3 mg adult), Right route (Intramuscular), Right time, in date, clear liquid without precipitate.",
      "note": "Medication 6 Rights."
    },
    {
      "time": "00:01:58",
      "speaker": "EMT CANDIDATE",
      "speech": "ADMINISTRATION PROTOCOL: I remove the safety cap, position the auto-injector at a 90-degree angle against the anterolateral aspect of David's thigh (vastus lateralis), push firmly until the spring activates with a click, and hold firmly against the thigh for a full 10 seconds. I then massage the site for 10 seconds.",
      "note": "EpiPen administered!"
    },
    {
      "time": "00:02:24",
      "speaker": "EMT CANDIDATE",
      "speech": "I apply high-flow oxygen via Non-Rebreather mask at 15 L/min. Partner, obtain full baseline vitals now.",
      "note": "O2 & vitals."
    },
    {
      "time": "00:02:35",
      "speaker": "PROCTOR (PARTNER)",
      "speech": "Initial vitals: BP was 78/46 mmHg, HR 134, RR 30, SpO2 88% on room air, BGL 104 mg/dL.",
      "note": "Baseline recorded."
    },
    {
      "time": "00:02:46",
      "speaker": "EMT CANDIDATE",
      "speech": "PATIENT POSITIONING WARNING: David is in distributive shock (BP 78/46). If a patient in anaphylaxis sits up or stands suddenly, blood pools in the dilated venous system, starving the heart ('empty ventricle syndrome') and causing sudden cardiac arrest. We place David supine on the cot with his legs elevated 12 inches (modified Trendelenburg).",
      "note": "Shock positioning."
    },
    {
      "time": "00:03:10",
      "speaker": "EMT CANDIDATE",
      "speech": "To the friend: Did David eat peanuts, and has this happened before?",
      "note": "SAMPLE."
    },
    {
      "time": "00:03:15",
      "speaker": "PROCTOR (FRIEND)",
      "speech": "Yes, severe peanut allergy! The curry was supposed to be peanut-free, but he tasted peanut sauce and his throat seized up within 2 minutes.",
      "note": "Confirmed allergen trigger."
    },
    {
      "time": "00:03:28",
      "speaker": "EMT CANDIDATE",
      "speech": "SECONDARY MEDICATION EVALUATION: For persistent bronchospasm, I prepare an Albuterol nebulizer (2.5 mg) at 6-8 L/min O2. CLINICAL RULE: Albuterol treats lower airway bronchospasm, but it does NOT reverse laryngeal edema or shock. Epinephrine is the sole definitive therapy.",
      "note": "Secondary adjunct role."
    },
    {
      "time": "00:03:50",
      "speaker": "EMT CANDIDATE",
      "speech": "Immediate load-and-go transport. Contacting Medical Control: 'Medical Control, this is EMT Candidate on Medic 4. Priority transport with a 29-year-old male with severe systemic anaphylactic shock following peanut exposure. Baseline vitals: BP 78/46, HR 134, RR 30, SpO2 88%, stridor, hives, and facial angioedema. Patient's prescribed Epinephrine auto-injector 0.3 mg IM administered into the lateral thigh at 12:05. Patient placed supine with legs elevated and 15L NRB applied. If systolic BP remains < 90 or stridor recurs after 5 to 10 minutes, I request standing order authorization for a second 0.3 mg Epinephrine dose.'",
      "note": "Medical Control report."
    },
    {
      "time": "00:04:30",
      "speaker": "PROCTOR (MED CONTROL)",
      "speech": "Medic 4, copy. Second dose of Epinephrine 0.3 mg IM is AUTHORIZED at 5 to 10 minutes if symptoms refractory. Continue rapid transport.",
      "note": "Second dose pre-authorized."
    },
    {
      "time": "00:04:42",
      "speaker": "EMT CANDIDATE",
      "speech": "Medical Control, confirmed: Authorized for repeat Epinephrine 0.3 mg IM at 5 to 10 minutes if refractory. Candidate out.",
      "note": "Closed-loop confirmation."
    },
    {
      "time": "00:04:55",
      "speaker": "EMT CANDIDATE",
      "speech": "5-minute reassessment:",
      "note": "Reassessment."
    },
    {
      "time": "00:05:05",
      "speaker": "PROCTOR",
      "speech": "David is breathing much easier. Stridor is completely gone. Facial swelling is beginning to subside. Repeat vitals: BP 112/70 mmHg, HR 118 bpm, RR 20 breaths/min, SpO2 96% on NRB.",
      "note": "Shock reversed!"
    },
    {
      "time": "00:05:22",
      "speaker": "EMT CANDIDATE",
      "speech": "The single dose of Epinephrine successfully stimulated alpha-1 vasoconstriction to restore blood pressure to 112/70 mmHg, and beta-2 bronchodilation to relieve laryngeal edema. A second dose is not needed at this time.",
      "note": "Therapeutic response."
    },
    {
      "time": "00:05:40",
      "speaker": "EMT CANDIDATE",
      "speech": "ALS / Emergency Department Hand-Off Report: 'This is David Choi, 29M, severe systemic anaphylaxis secondary to peanut ingestion. Rapid onset laryngeal angioedema, inspiratory stridor, diffuse urticaria, and distributive shock. Baseline vitals: BP 78/46, HR 134, RR 30, SpO2 88% on room air. We administered patient's Epinephrine 0.3 mg IM into the anterolateral thigh at 12:05, placed him supine with legs elevated, and applied 15L NRB. Repeat vitals: BP 112/70, HR 118, RR 20, SpO2 96%. Stridor has resolved and wheezing is minimal. Patient requires mandatory 6 to 8 hour hospital observation for biphasic anaphylactic recurrence, along with IV steroids and H1/H2 antihistamines.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:06:35",
      "speaker": "PROCTOR",
      "speech": "Flawless anaphylaxis execution. Station passed.",
      "note": "Station passed."
    }
  ],
  "handOffReport": "David Choi, 29M, acute systemic anaphylactic shock triggered by peanut ingestion. Presenting with facial angioedema, inspiratory stridor, diffuse urticaria, and distributive shock. Baseline BP 78/46, HR 134, RR 30, SpO2 88%. Administered 0.3 mg Epinephrine IM into the anterolateral thigh, positioned supine with legs elevated, and applied 15L NRB. Repeat vitals BP 112/70, HR 118, RR 20, SpO2 96% with complete resolution of stridor. Prepped for biphasic observation.",
  "reassessmentVitals": {
    "bp": "112/70 mmHg (alpha-1 vasoconstriction restoring systemic vascular resistance)",
    "hr": "118 bpm",
    "rr": "20 breaths/min (unlabored)",
    "spo2": "96% on 15 L/min Non-Rebreather",
    "lung_sounds": "Stridor completely resolved; wheezing significantly softened",
    "pain_score": "3 / 10 ('My throat opened up, I can breathe again')"
  }
},
{
  "id": 17,
  "title": "24M \u2013 Exertional Heat Stroke (The 'Cool First, Transport Second' Mandate)",
  "cad": "Medic 4, respond priority 1 lights and sirens to City Stadium, field level, for a 24-year-old athlete who collapsed during practice. Athletic trainer reports core temp > 105\u00b0F and seizure-like twitching.",
  "hiddenDiagnosis": "Exertional Heat Stroke (The 'Cool First, Transport Second' Mandate)",
  "category": "Environmental",
  "vitals": {
    "bp": "92/58 mmHg (hyperthermic peripheral vasodilation and dehydration)",
    "hr": "148 bpm (severe sinus tachycardia)",
    "rr": "28 breaths/min (tachypneic hyperventilation)",
    "spo2": "95% on ambient air",
    "bgl": "82 mg/dL",
    "skin": "Hot, flushed, dry or drenched",
    "pupils": "Sluggish, 4 mm equal",
    "lungs": "Clear bilaterally"
  },
  "trap": "Transporting a heat stroke patient immediately without cooling them on scene ('Scoop and Run' in heat stroke kills patients; must cool first!).",
  "initialPatientSpeech": "(Incoherent groans, thrashing limbs, eyes roll back).",
  "clues": [
    "Profound Central Nervous System (CNS) Dysfunction: Confusion, delirium, bizarre behavior, ataxia, or coma/seizures",
    "Core body temperature > 104\u00b0F (40\u00b0C) measured via rectal thermometer",
    "Skin condition: Hot, flushed, and either profusely sweating (early exertional) or bone dry (cessation of sweating due to hypothalamic thermoregulatory failure)",
    "CRITICAL TREATMENT PARADOX: 'COOL FIRST, TRANSPORT SECOND!' Active, aggressive whole-body cold-water immersion (or ice packs to neck, axillae, and groin) TAKES PRECEDENCE over immediate ambulance transport. Transporting before cooling leads to permanent brain damage and death!",
    "Cool aggressively until core temperature reaches 102\u00b0F (38.9\u00b0C), then discontinue cooling to prevent rebound hypothermia"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, priority 1 response to City Stadium, 24-year-old athlete collapsed, core temperature 105\u00b0F.",
      "note": "CAD broadcast."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to 24M with exertional heat emergency. BSI: gloves, eye protection. Scene safe?",
      "note": "Scene size-up."
    },
    {
      "time": "00:00:18",
      "speaker": "PROCTOR",
      "speech": "Scene is safe. Heat index is 102\u00b0F with 80% humidity on the turf. Athletic trainer is on scene.",
      "note": "Severe environmental conditions."
    },
    {
      "time": "00:00:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Nature of illness: exertional heat stroke / true environmental life-threat. One patient. Requesting ALS backup immediately.",
      "note": "ALS dispatch."
    },
    {
      "time": "00:00:32",
      "speaker": "EMT CANDIDATE",
      "speech": "General impression: 24-year-old male in full football gear, unconscious on turf, twitching erratically, skin is beet red and boiling hot to the touch. No fall from height, but I maintain manual C-spine stabilization while removing heavy pads.",
      "note": "General impression & pads off."
    },
    {
      "time": "00:00:50",
      "speaker": "EMT CANDIDATE",
      "speech": "Brandon, can you hear me? Open your eyes!",
      "note": "AVPU check."
    },
    {
      "time": "00:00:54",
      "speaker": "PATIENT (BRANDON)",
      "speech": "(Incoherent groans, thrashing limbs, eyes roll back).",
      "note": "P on AVPU (CNS collapse)."
    },
    {
      "time": "00:01:00",
      "speaker": "EMT CANDIDATE",
      "speech": "Airway is patent, no vomiting. Respirations are 28 breaths/min, rapid. SpO2 is 95%. I apply high-flow oxygen via Non-Rebreather at 15 L/min.",
      "note": "Airway & O2."
    },
    {
      "time": "00:01:14",
      "speaker": "EMT CANDIDATE",
      "speech": "Circulation: radial pulse is 148 bpm, bounding. Skin is hot, flushed, and dry. Cap refill is 2.5 seconds. BP is 92/58 mmHg.",
      "note": "Hyperdynamic shock."
    },
    {
      "time": "00:01:28",
      "speaker": "PROCTOR (TRAINER)",
      "speech": "We just checked his rectal temperature with our certified medical probe: it is 105.4\u00b0F.",
      "note": "Heat stroke confirmed!"
    },
    {
      "time": "00:01:38",
      "speaker": "EMT CANDIDATE",
      "speech": "CRITICAL CLINICAL DECISION: THIS IS EXERTIONAL HEAT STROKE (Temp 105.4\u00b0F + CNS collapse). Standard protocol dictates 'COOL FIRST, TRANSPORT SECOND!' Brain cells and hepatocytes begin irreversible protein denaturation above 104\u00b0F. We must initiate active cooling on scene IMMEDIATELY.",
      "note": "Cool first principle!"
    },
    {
      "time": "00:02:00",
      "speaker": "EMT CANDIDATE",
      "speech": "I instruct the team: Strip all remaining clothing down to underwear. If a cold-water immersion tub is available, immerse the patient up to the neck in ice water with head supported. If no tub, place ice bags directly in the axillae (armpits), groin, and around the lateral neck, while fanning and misting with tepid water.",
      "note": "Active cooling protocol."
    },
    {
      "time": "00:02:25",
      "speaker": "PROCTOR",
      "speech": "The stadium training staff has a 100-gallon cold-water immersion tub ready with ice water. Brandon is immersed up to the clavicles with head held above water.",
      "note": "Immersion executed."
    },
    {
      "time": "00:02:40",
      "speaker": "EMT CANDIDATE",
      "speech": "Partner, monitor rectal temperature continuously. We will cool him aggressively until his core temperature drops to 102\u00b0F (38.9\u00b0C), then remove him to prevent hypothermic overshoot.",
      "note": "Target temp 102\u00b0F."
    },
    {
      "time": "00:02:55",
      "speaker": "EMT CANDIDATE",
      "speech": "Partner, check BGL to ensure hypoglycemia is not contributing to altered mental status.",
      "note": "BGL rule-out."
    },
    {
      "time": "00:03:02",
      "speaker": "PROCTOR (PARTNER)",
      "speech": "BGL is 82 mg/dL. Normal.",
      "note": "BGL normal."
    },
    {
      "time": "00:03:15",
      "speaker": "PROCTOR",
      "speech": "After 8 minutes in the cold water tub, Brandon's rectal temperature reaches 102.0\u00b0F. He begins shivering and answers simple questions.",
      "note": "Target reached!"
    },
    {
      "time": "00:03:28",
      "speaker": "EMT CANDIDATE",
      "speech": "Target temperature of 102\u00b0F reached! Remove Brandon from the ice tub immediately, dry him with clean towels, place him on the stretcher, and begin rapid transport to the emergency department.",
      "note": "Removal from tub."
    },
    {
      "time": "00:03:45",
      "speaker": "EMT CANDIDATE",
      "speech": "Contacting Medical Control: 'Medical Control, this is EMT Candidate on Medic 4. Priority transport with a 24-year-old male with confirmed exertional heat stroke during football drills. Initial core temp 105.4\u00b0F with CNS delirium and hypotension (BP 92/58, HR 148). Successfully managed on scene with cold-water immersion, reducing core temp to 101.8\u00b0F. Patient is now responsive to voice. High-flow O2 applied. Requesting ICU / rhabdomyolysis team alert at Saint Mary's ED.'",
      "note": "Medical Control report."
    },
    {
      "time": "00:04:20",
      "speaker": "PROCTOR (MED CONTROL)",
      "speech": "Medic 4, outstanding management. Saint Mary's ED is ready for IV hydration and renal monitoring for myoglobinuria.",
      "note": "Hospital alert."
    },
    {
      "time": "00:04:32",
      "speaker": "EMT CANDIDATE",
      "speech": "Medical Control, confirmed: Transporting to Saint Mary's with rhabdomyolysis protocol active. Candidate out.",
      "note": "Closed-loop confirmation."
    },
    {
      "time": "00:04:45",
      "speaker": "EMT CANDIDATE",
      "speech": "5-minute reassessment:",
      "note": "Reassessment."
    },
    {
      "time": "00:04:55",
      "speaker": "PROCTOR",
      "speech": "Brandon is alert to verbal stimuli. Repeat vitals: BP 110/68 mmHg, HR 114 bpm, RR 20, SpO2 99% on NRB, core temp 101.8\u00b0F.",
      "note": "Vitals normalized."
    },
    {
      "time": "00:05:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Emergency Department Hand-Off Report: 'This is Brandon Cole, 24M, exertional heat stroke. Collapsed during intensive athletic drills in full pads (heat index 102\u00b0F). Initial presentation: profound CNS delirium, combativeness, hot dry skin, baseline rectal temp 105.4\u00b0F, BP 92/58, HR 148. We executed immediate 'cool first, transport second' protocol using on-site cold-water immersion tub for 8 minutes, lowering core temperature to 101.8\u00b0F. Stripped clothing, BGL 82 mg/dL. Repeat vitals: BP 110/68, HR 114, RR 20, SpO2 99% on 15L NRB. Patient is now A&O x 2 and prepped for immediate IV crystalloids, creatine kinase / troponin labs, and renal monitoring.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:06:05",
      "speaker": "PROCTOR",
      "speech": "Textbook execution of exertional heat stroke guidelines. Station passed.",
      "note": "Station passed."
    }
  ],
  "handOffReport": "Brandon Cole, 24M, exertional heat stroke during athletic conditioning. Initial core temperature 105.4\u00b0F with profound delirium, hypotension (BP 92/58), and tachycardia (HR 148). Executed 'cool first, transport second' with cold-water immersion on scene, cooling core temp to 101.8\u00b0F prior to ambulance departure. BGL 82 mg/dL. Repeat vitals BP 110/68, HR 114, RR 20, SpO2 99%. Patient is regaining orientation; prepped for rhabdomyolysis evaluation.",
  "reassessmentVitals": {
    "bp": "110/68 mmHg",
    "hr": "114 bpm",
    "rr": "20 breaths/min",
    "spo2": "99% on 15 L/min Non-Rebreather",
    "temp": "101.8\u00b0F (38.8\u00b0C) following cold-water immersion",
    "pain_score": "Alert to voice, oriented x 2 ('Where am I? So cold...')"
  }
},
{
  "id": 18,
  "title": "52M \u2013 Severe Accidental Hypothermia (The 45-Second Pulse Check)",
  "cad": "Medic 4, respond priority 1 lights and sirens to River Road bridge, 52-year-old male found unresponsive by outreach workers. Ambient temperature 34\u00b0F with sleet and freezing rain.",
  "hiddenDiagnosis": "Severe Accidental Hypothermia (The 45-Second Pulse Check)",
  "category": "Environmental",
  "vitals": {
    "bp": "64/40 mmHg (measured with doppler/ultrasound; barely palpable cuff)",
    "hr": "26 bpm (profound sinus bradycardia, confirmed after 45-second carotid auscultation)",
    "rr": "4 breaths/min (shallow, barely perceptible)",
    "spo2": "Unrecordable due to intense peripheral vasoconstriction",
    "bgl": "68 mg/dL",
    "skin": "Pale, cool, diaphoretic",
    "pupils": "Fixed, dilated at 5 mm (mimics clinical death, but reversible with rewarming!)",
    "lungs": "Diminished bilaterally, no rales"
  },
  "trap": "Checking pulse for only 5 to 10 seconds, presuming cardiac arrest, and starting chest compressions (triggers fatal Ventricular Fibrillation in a viable hypothermic heart; MUST check for 30 to 45 seconds!).",
  "initialPatientSpeech": "Help me... I feel terrible...",
  "clues": [
    "Severe Hypothermia stage (Core Body Temperature < 82.4\u00b0F / 28\u00b0C): Cessation of shivering, extreme muscular rigidity, unresponsiveness",
    "Profound physiological depression: Extreme bradycardia (HR 24-28 bpm), bradypnea (RR 4-6 breaths/min), unrecordable blood pressure",
    "MANDATORY NREMT EXAM RULE: Auscultate the carotid pulse for a FULL 30 TO 45 SECONDS before concluding cardiac arrest! (A hypothermic pulse is exceptionally slow, weak, and easily missed; starting chest compressions on a heart with an organized rhythm triggers fatal Ventricular Fibrillation!)",
    "EXTREME GENTLE HANDLING: Rough movement, jostling, or aggressive airway manipulation triggers intractable, refractory V-Fib in an irritable hypothermic myocardium",
    "'A patient is NOT dead until they are WARM AND DEAD!' Passive core rewarming, warm humidified O2, bypass local ED for ECMO/Cardiopulmonary bypass center if indicated"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, priority 1 response to River Road bridge overpass, 52-year-old male unresponsive in freezing sleet.",
      "note": "CAD broadcast."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to 52M found in freezing conditions. BSI: gloves, eye protection, cold-weather protective gear. Scene safe?",
      "note": "Scene size-up."
    },
    {
      "time": "00:00:18",
      "speaker": "PROCTOR",
      "speech": "Scene is safe. Sleet is falling. Patient is lying in a freezing puddle under the bridge.",
      "note": "Severe hypothermic environment."
    },
    {
      "time": "00:00:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Nature of illness: severe accidental hypothermia / environmental arrest risk. One patient. Requesting ALS backup immediately.",
      "note": "ALS dispatch."
    },
    {
      "time": "00:00:32",
      "speaker": "EMT CANDIDATE",
      "speech": "General impression: 52-year-old male lying motionless in wet clothes, skin is ice cold and waxy pale, no active shivering, extremities are stiff and rigid. C-spine stabilized gently.",
      "note": "General impression."
    },
    {
      "time": "00:00:48",
      "speaker": "EMT CANDIDATE",
      "speech": "PRIMARY ASSESSMENT: Patient is unresponsive (U on AVPU). Respirations are 4 breaths/min, extremely slow and shallow. Airway is clear of vomit.",
      "note": "Profound bradypnea."
    },
    {
      "time": "00:01:00",
      "speaker": "EMT CANDIDATE",
      "speech": "CRITICAL NREMT MANDATE: THE 45-SECOND PULSE CHECK. In severe hypothermia, metabolic rate drops by 50% or more. A pulse may only beat once every 2 to 3 seconds. I place my fingers on the carotid artery and palpate continuously for a FULL 30 TO 45 SECONDS. Evaluator, what do I feel over 45 seconds?",
      "note": "45-second pulse check executed!"
    },
    {
      "time": "00:01:46",
      "speaker": "PROCTOR",
      "speech": "At 38 seconds, you feel a very faint, slow, rhythmic carotid pulse beating at roughly 26 beats per minute.",
      "note": "Pulse confirmed!"
    },
    {
      "time": "00:01:55",
      "speaker": "EMT CANDIDATE",
      "speech": "PULSE PRESENT AT 26 BPM. DO NOT BEGIN CHEST COMPRESSIONS! Initiating CPR on a hypothermic heart with an organized rhythm will trigger fatal, intractable Ventricular Fibrillation.",
      "note": "CPR avoided; life saved!"
    },
    {
      "time": "00:02:12",
      "speaker": "EMT CANDIDATE",
      "speech": "GENTLE HANDLING MANDATE: The hypothermic myocardium is exquisitely irritable. We must move William with EXTREME GENTLENESS. Any rough jostling or sudden positional changes can induce cardiac arrest.",
      "note": "Gentle handling protocol."
    },
    {
      "time": "00:02:30",
      "speaker": "EMT CANDIDATE",
      "speech": "VENTILATION & OXYGENATION: With a respiratory rate of 4 breaths/min, I gently assist ventilations using a Bag-Valve-Mask with 100% warm, humidified oxygen at a slow rate of 6 to 8 breaths per minute. Do not hyperventilate, which causes alkalosis and triggers V-Fib.",
      "note": "Slow, warm BVM."
    },
    {
      "time": "00:02:52",
      "speaker": "EMT CANDIDATE",
      "speech": "REWARMING PROTOCOL: Immediately remove all wet clothing by cutting it off gently. Do not rub the skin. Wrap the patient in dry blankets, plastic vapor barrier, and apply active heating pads ONLY to the core (axillae, groin, and anterior chest). DO NOT rewarm the arms or legs, which causes 'core temperature afterdrop' and rewarming shock.",
      "note": "Truncal rewarming only."
    },
    {
      "time": "00:03:22",
      "speaker": "PROCTOR (PARTNER)",
      "speech": "Vitals: BP 64/40 mmHg (doppler), HR 26 bpm, RR 4 assisted to 8, temp via low-reading core probe is 81.4\u00b0F (27.4\u00b0C), BGL 68 mg/dL, pupils fixed and dilated.",
      "note": "Severe hypothermia confirmed."
    },
    {
      "time": "00:03:40",
      "speaker": "EMT CANDIDATE",
      "speech": "Pupils are fixed and dilated; in hypothermia, this is a reversible physiologic depression, NOT brain death. 'The patient is not dead until warm and dead!' We load William onto the stretcher with extreme care and heat the ambulance patient compartment to 85\u00b0F.",
      "note": "Warm ambulance box."
    },
    {
      "time": "00:04:00",
      "speaker": "EMT CANDIDATE",
      "speech": "Contacting Medical Control: 'Medical Control, this is EMT Candidate on Medic 4. Priority transport with a 52-year-old male with severe accidental hypothermia. Core temperature 81.4\u00b0F. Presenting in profound coma, rigid, carotid pulse 26 bpm verified via 45-second check, RR 4 assisted gently via warm humidified BVM at 8/min. Wet clothing cut away, truncal rewarming active. Handled with extreme gentleness. Requesting bypass to University Hospital ECMO / Cardiopulmonary Bypass Center for extracorporeal rewarming.'",
      "note": "ECMO center bypass request."
    },
    {
      "time": "00:04:40",
      "speaker": "PROCTOR (MED CONTROL)",
      "speech": "Medic 4, exceptional management. University Hospital ECMO perfusion team is activated. Transport code 3, maintain gentle handling.",
      "note": "ECMO team activated."
    },
    {
      "time": "00:04:52",
      "speaker": "EMT CANDIDATE",
      "speech": "Medical Control, confirmed: Transporting to University Hospital ECMO center with gentle handling. Candidate out.",
      "note": "Closed-loop confirmation."
    },
    {
      "time": "00:05:05",
      "speaker": "EMT CANDIDATE",
      "speech": "5-minute reassessment during transport:",
      "note": "Reassessment."
    },
    {
      "time": "00:05:15",
      "speaker": "PROCTOR",
      "speech": "Patient remains motionless and rigid. Carotid pulse remains stable at 30 bpm. BP 72/46 mmHg, RR 8 assisted, core temp rising to 83.0\u00b0F.",
      "note": "Vitals tracked."
    },
    {
      "time": "00:05:30",
      "speaker": "EMT CANDIDATE",
      "speech": "Hospital / ECMO Resuscitation Hand-Off Report: 'This is William MacLeod, 52M, severe accidental hypothermia secondary to environmental exposure in freezing rain. Initial core temp 81.4\u00b0F. Found unresponsive, rigid, fixed dilated pupils, and profound bradypnea (RR 4). Carotid pulse verified at 26 bpm after a continuous 45-second check; CPR was deliberately withheld to protect the irritable myocardium from ventricular fibrillation. Wet clothes cut away, passive and active truncal warming applied, gentle BVM ventilations delivered with warm humidified 100% O2. Repeat core temp 83.0\u00b0F, HR 30, BP 72/46. Patient is prepped for direct femoral cannulation and ECMO rewarming.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:06:30",
      "speaker": "PROCTOR",
      "speech": "Flawless hypothermia management. Station passed.",
      "note": "Station passed."
    }
  ],
  "handOffReport": "William MacLeod, 52M, severe accidental hypothermia (core temp 81.4\u00b0F). Unresponsive, rigid, fixed dilated pupils, RR 4, profound sinus bradycardia (HR 26 bpm confirmed via 45-second carotid check; CPR withheld). Managed with extreme gentleness, wet clothing cut away, truncal rewarming, and slow gentle BVM ventilations with warm humidified O2. Repeat core temp 83.0\u00b0F, HR 30, BP 72/46. Direct hand-off to ECMO resuscitation team.",
  "reassessmentVitals": {
    "bp": "72/46 mmHg",
    "hr": "30 bpm",
    "rr": "8 breaths/min (assisted gently via warm humidified BVM)",
    "spo2": "84% (finger warmed slightly)",
    "temp": "83.0\u00b0F (28.3\u00b0C) rising gradually",
    "pain_score": "Unresponsive"
  }
},
{
  "id": 19,
  "title": "26M \u2013 Severe Opioid Overdose with Respiratory Depression",
  "cad": "Medic 4, respond priority 1 lights and sirens to Burger Barn, 600 Commercial Blvd, for a 26-year-old male found unresponsive on the bathroom floor. Caller states patient is turning purple and not breathing.",
  "hiddenDiagnosis": "Severe Opioid Overdose with Respiratory Depression",
  "category": "Toxicology",
  "vitals": {
    "bp": "94/58 mmHg (hypotensive from CNS depression)",
    "hr": "54 bpm (sinus bradycardia, weak radial)",
    "rr": "4 breaths/min (agonal, shallow, inadequate minute volume)",
    "spo2": "74% on ambient room air (severe hypoxia)",
    "bgl": "92 mg/dL",
    "skin": "Pale, cool, diaphoretic",
    "pupils": "Pinpoint, constricted to < 1 mm, non-reactive to light",
    "lungs": "Shallow aeration, faint bilateral air entry, no rales"
  },
  "trap": "Administering Naloxone BEFORE establishing an open airway and delivering positive pressure ventilations to an apneic patient (delivers drugs to an anoxic brain, worsening arrest risk).",
  "initialPatientSpeech": "(Groggily)... what happened... why are you in my face...",
  "clues": [
    "The Classical Opioid Toxidrome Triad: 1. Central Nervous System Depression (Coma / Unresponsive); 2. Severe Respiratory Depression / Apnea (RR 4 breaths/min, shallow); 3. Miosis (Pinpoint, constricted pupils < 1 mm)",
    "Peripheral cyanosis, cool clammy skin, and sonorous/agonal upper airway breathing",
    "MANDATORY VENTILATION FIRST SEQUENCE: VENTILATE BEFORE NALOXONE! An acutely hypoxic brain is prone to lethal cardiac arrest; you must deliver 2 minutes of Bag-Valve-Mask ventilations with 100% O2 BEFORE administering Naloxone!",
    "Titrated Naloxone (Narcan) Administration: Administer 0.4 to 2.0 mg Intranasally (IN). The goal of Naloxone is RESTORING ADEQUATE SPONTANEOUS BREATHING (RR > 10, SpO2 > 94%), NOT waking the patient up into violent acute opioid withdrawal or triggering flash pulmonary edema!",
    "Short half-life awareness: Naloxone half-life (30-90 minutes) is much shorter than most opioids (Fentanyl, Methadone); risk of re-sedation and secondary apnea"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, priority 1 to Burger Barn, 600 Commercial Blvd, 26-year-old male unresponsive, turning blue in restroom.",
      "note": "CAD broadcast."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to 26M unresponsive in public restroom. BSI: gloves, eye protection. Scene safe? I look for uncapped needles or fentanyl powder before stepping inside.",
      "note": "Safety & needle sweep."
    },
    {
      "time": "00:00:20",
      "speaker": "PROCTOR",
      "speech": "Scene is safe. You see a lighter and an uncapped syringe on the sink counter. No powders airborne.",
      "note": "Safe with sharps alert."
    },
    {
      "time": "00:00:24",
      "speaker": "EMT CANDIDATE",
      "speech": "Nature of illness: toxicologic overdose / respiratory arrest. One patient. Requesting ALS backup immediately.",
      "note": "ALS dispatch."
    },
    {
      "time": "00:00:35",
      "speaker": "EMT CANDIDATE",
      "speech": "General impression: 26-year-old male slumped between toilet and partition, cyanotic lips and fingernails, flaccid, making agonal gurgling sounds. C-spine: no trauma witnessed, but I maintain neutral alignment during extrication.",
      "note": "General impression."
    },
    {
      "time": "00:00:50",
      "speaker": "EMT CANDIDATE",
      "speech": "PRIMARY ASSESSMENT: Sir, can you hear me? (sternal rub performed). Patient is unresponsive (U on AVPU).",
      "note": "AVPU check."
    },
    {
      "time": "00:00:58",
      "speaker": "EMT CANDIDATE",
      "speech": "AIRWAY & BREATHING: Airway is open. Agonal gurgling noted. Respirations are 4 breaths/min, severely shallow. SpO2 is 74% on room air. Carotid pulse is 54 bpm, weak.",
      "note": "Apneic hypoxia."
    },
    {
      "time": "00:01:10",
      "speaker": "EMT CANDIDATE",
      "speech": "CRITICAL NREMT PROTOCOL CHECKPOINT: OXYGENATION PRECEDES NALOXONE! I WILL NOT DELAY VENTILATIONS TO SEARCH FOR NARCAN. The brain is suffering from severe hypoxemic ischemia. Partner, prepare Naloxone while I immediately initiate BVM ventilations.",
      "note": "Ventilate first rule!"
    },
    {
      "time": "00:01:25",
      "speaker": "EMT CANDIDATE",
      "speech": "I insert a lubricated Nasopharyngeal Airway (NPA), achieve an airtight mask seal using the E-C clamp technique, and deliver 1 ventilation every 5 seconds using a Bag-Valve-Mask connected to 100% O2 with reservoir for 2 full minutes.",
      "note": "BVM delivered."
    },
    {
      "time": "00:02:10",
      "speaker": "PROCTOR (PARTNER)",
      "speech": "With 2 minutes of effective BVM ventilations, chest rises symmetrically. SpO2 rises from 74% to 92%. Radial pulse is 72 bpm.",
      "note": "Patient pre-oxygenated."
    },
    {
      "time": "00:02:22",
      "speaker": "EMT CANDIDATE",
      "speech": "I examine pupils and skin: Pupils are pinpoint (< 1 mm, pinpoint miosis). Track marks noted on left antecubital fossa. BGL check reads 92 mg/dL.",
      "note": "Opioid triad verified."
    },
    {
      "time": "00:02:38",
      "speaker": "EMT CANDIDATE",
      "speech": "The patient exhibits classic opioid toxidrome (coma, respiratory arrest, pinpoint pupils). Now that the patient is oxygenated, I administer Naloxone (Narcan).",
      "note": "Naloxone indicated."
    },
    {
      "time": "00:02:50",
      "speaker": "EMT CANDIDATE",
      "speech": "I inspect Naloxone: Right patient, Right medication (Naloxone 4 mg/0.1 mL nasal spray or 2 mg/2 mL with mucosal atomizer), Right dose (titrating 1 mg per nostril, total 2 mg IN), Right route (Intranasal), Right time, in date. I administer 1 mg into the right nostril, and 1 mg into the left nostril.",
      "note": "Naloxone IN administered."
    },
    {
      "time": "00:03:18",
      "speaker": "EMT CANDIDATE",
      "speech": "CLINICAL GOAL OF NALOXONE: I continue gentle BVM ventilations while awaiting medication absorption (2 to 3 minutes). The objective is to restore adequate spontaneous breathing (RR > 10), NOT to precipitate violent withdrawal, vomiting, or acute pulmonary edema.",
      "note": "Titration rationale."
    },
    {
      "time": "00:03:45",
      "speaker": "PROCTOR",
      "speech": "At 3 minutes post-IN Naloxone, Tyler takes a sudden deep spontaneous gasp. He begins breathing on his own at 14 breaths per minute. His eyelids flutter open.",
      "note": "Spontaneous breathing restored."
    },
    {
      "time": "00:03:58",
      "speaker": "EMT CANDIDATE",
      "speech": "I remove the BVM mask, maintain high-flow O2 via non-rebreather or nasal cannula, and place Tyler in the recovery position on the stretcher to guard against aspiration if nausea occurs.",
      "note": "Recovery posture."
    },
    {
      "time": "00:04:15",
      "speaker": "PATIENT (TYLER)",
      "speech": "(Groggily)... what happened... why are you in my face...",
      "note": "Orienting gradually."
    },
    {
      "time": "00:04:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Tyler, you're safe. You overdosed in the restroom and stopped breathing. We gave you medicine to help you breathe. Just rest and take deep breaths.",
      "note": "Calm de-escalation."
    },
    {
      "time": "00:04:35",
      "speaker": "EMT CANDIDATE",
      "speech": "Partner, obtain full repeat vitals.",
      "note": "Repeat vitals."
    },
    {
      "time": "00:04:42",
      "speaker": "PROCTOR (PARTNER)",
      "speech": "Vitals: BP 118/72 mmHg, HR 86 bpm, RR 14 regular and unassisted, SpO2 97% on room air, pupils 3 mm reactive, BGL 92 mg/dL.",
      "note": "Vitals normalized."
    },
    {
      "time": "00:04:58",
      "speaker": "EMT CANDIDATE",
      "speech": "PATIENT REFUSAL WARNING: Tyler states he wants to walk away. I advise him: 'Tyler, Naloxone wears off in 30 to 60 minutes. The heroin/fentanyl in your system lasts 4 to 8 hours. When this medicine wears off, you will stop breathing again and could die in your sleep. You must be monitored at the hospital.'",
      "note": "Refusal counseling."
    },
    {
      "time": "00:05:22",
      "speaker": "EMT CANDIDATE",
      "speech": "Contacting Medical Control: 'Medical Control, this is EMT Candidate on Medic 4. On scene with a 26-year-old male with confirmed acute opioid overdose. Initial presentation: apneic (RR 4), SpO2 74%, pinpoint pupils, unresponsive. Successfully pre-oxygenated via BVM for 2 minutes, then administered 2 mg Naloxone IN. Spontaneous breathing restored at 14 breaths/min, SpO2 97%, alert to voice. Patient is cooperative and agreeable to hospital transport.'",
      "note": "Medical Control report."
    },
    {
      "time": "00:05:52",
      "speaker": "PROCTOR (MED CONTROL)",
      "speech": "Medic 4, copy. Transport to Memorial ED for extended toxicologic monitoring.",
      "note": "Transport approved."
    },
    {
      "time": "00:06:05",
      "speaker": "EMT CANDIDATE",
      "speech": "5-minute reassessment:",
      "note": "Reassessment."
    },
    {
      "time": "00:06:15",
      "speaker": "PROCTOR",
      "speech": "Tyler remains conscious. RR 14, HR 84, BP 120/74, SpO2 98%.",
      "note": "Stable."
    },
    {
      "time": "00:06:28",
      "speaker": "EMT CANDIDATE",
      "speech": "Hospital Hand-Off Report: 'This is Tyler Bennett, 26M, acute opioid overdose. Found unresponsive in public restroom with paraphernalia. Initial vitals: profound respiratory arrest (RR 4), SpO2 74%, HR 54, pinpoint pupils < 1 mm. Resuscitation sequence: Immediate 2 minutes of BVM ventilations with 100% O2 raising SpO2 to 92%, followed by 2 mg Naloxone IN (1 mg per naris). Spontaneous breathing restored within 3 minutes. Baseline BGL 92 mg/dL. Repeat vitals: BP 118/72, HR 86, RR 14 spontaneous, SpO2 97%. Patient is awake, cooperative, and requires continuous observation due to risk of secondary respiratory arrest once Naloxone metabolizes.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:07:25",
      "speaker": "PROCTOR",
      "speech": "Flawless prioritization of ventilations over medication. Station passed.",
      "note": "Station passed."
    }
  ],
  "handOffReport": "Tyler Bennett, 26M, severe opioid overdose. Found unresponsive, cyanotic, pinpoint pupils, agonal respirations (RR 4, SpO2 74%). Delivered 2 minutes BVM positive pressure ventilation with 100% O2 first, followed by 2 mg Naloxone IN. Spontaneous respirations restored at 14 breaths/min, SpO2 97%, HR 86, BP 118/72. Monitored in recovery position. Hospital observation required due to mismatch between Naloxone half-life and opioid duration.",
  "reassessmentVitals": {
    "bp": "118/72 mmHg",
    "hr": "86 bpm",
    "rr": "14 breaths/min (spontaneous, adequate tidal volume)",
    "spo2": "97% on room air",
    "pupils": "Dilated to 3 mm, reactive",
    "pain_score": "Responds to voice, confused and groggy (V on AVPU)"
  }
},
{
  "id": 20,
  "title": "45M \u2013 Organophosphate Toxicity / Cholinergic Toxidrome (SLUDGEM)",
  "cad": "Medic 4, respond priority 1 lights and sirens to Valley Orchards, Barn 3, for a 45-year-old agricultural worker who collapsed while spraying pesticides. Caller reports worker is covered in fluid and gasping for air.",
  "hiddenDiagnosis": "Organophosphate Toxicity / Cholinergic Toxidrome (SLUDGEM)",
  "category": "Toxicology & Environmental",
  "vitals": {
    "bp": "90/56 mmHg (parasympathetic collapse)",
    "hr": "42 bpm (severe cholinergic sinus bradycardia)",
    "rr": "28 breaths/min (labored, bubbling, drowning in secretions)",
    "spo2": "82% on ambient air",
    "bgl": "102 mg/dL",
    "skin": "Hot, flushed, dry or drenched",
    "pupils": "Pinpoint, constricted to < 1 mm (miosis), tears flowing from eyes",
    "lungs": "Diffuse, coarse, wet bubbling throughout all lung fields (bronchorrhea) with high-pitched wheezing"
  },
  "trap": "Entering the scene or transporting the patient without PPE and without performing decontamination (causes secondary poisoning of EMS providers and closes the ambulance/ED).",
  "initialPatientSpeech": "Help me... I feel terrible...",
  "clues": [
    "The Classical SLUDGEM Cholinergic Mnemonic: Salivation (massive drooling), Lacrimation (tears streaming), Urination (incontinence), Defecation (diarrhea), Gastrointestinal cramping, Emesis (projectile vomiting), Miosis (pinpoint pupils)",
    "The 'Killer B's' (The True Life-Threats in Cholinergic Poisoning): Bronchorrhea (drowning in copious pulmonary secretions), Bronchospasm (severe diffuse wheezing), and Bradycardia (HR 42 bpm)",
    "CRITICAL PROVIDER SAFETY / HAZMAT RULE: SCENE SAFETY & DECONTAMINATION FIRST! Organophosphates are absorbed through intact skin. EMTs MUST wear Level C/B chemical PPE. The patient MUST be completely stripped of contaminated clothing and decontaminated with soap and water BEFORE entering the ambulance!",
    "Airway management priority: Aggressive, continuous rigid suctioning of the copious frothy airway secretions",
    "Immediate ALS intercept for massive doses of Atropine (antimuscarinic) and Pralidoxime (2-PAM / acetylcholinesterase reactivator)"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, priority 1 response to Valley Orchards, 45-year-old pesticide sprayer collapsed in barn, covered in secretions.",
      "note": "CAD broadcast."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to pesticide exposure. BSI & SCENE SAFETY HAZMAT ALERT: Organophosphates readily absorb through rescuers' skin and produce secondary contamination. I don full chemical protective PPE (gloves, eye protection, respirator, splash gown). Where is the patient located?",
      "note": "HazMat PPE don."
    },
    {
      "time": "00:00:25",
      "speaker": "PROCTOR",
      "speech": "Orchard workers dragged him outside the barn onto the gravel driveway. A pesticide tank marked 'Chlorpyrifos Organophosphate' is leaking nearby.",
      "note": "Toxic chemical identified."
    },
    {
      "time": "00:00:35",
      "speaker": "EMT CANDIDATE",
      "speech": "CRITICAL SAFETY CHECKPOINT: DECONTAMINATION PRIOR TO TRANSPORT. The patient CANNOT be loaded into the closed ambulance box while covered in organophosphates. His contaminated clothing must be cut away and bagged immediately, and he must undergo copious water washing outside.",
      "note": "Decon protocol initiated!"
    },
    {
      "time": "00:00:58",
      "speaker": "PROCTOR",
      "speech": "With assistance from rural fire hazmat, the patient's clothing is completely stripped, double-bagged, and his skin is washed down with copiously running water. He is wrapped in clean tarps and moved to the warm zone.",
      "note": "Decontamination complete."
    },
    {
      "time": "00:01:14",
      "speaker": "EMT CANDIDATE",
      "speech": "PRIMARY ASSESSMENT: Carlos is semiconscious (V on AVPU). Saliva is literally pouring from his mouth, tears streaming down his face, and his pants are soiled with urine and liquid stool. Pinpoint pupils noted.",
      "note": "SLUDGEM recognized!"
    },
    {
      "time": "00:01:30",
      "speaker": "EMT CANDIDATE",
      "speech": "AIRWAY & THE KILLER B's: Carlos's airway is gurgling violently. He is drowning in his own pulmonary secretions (bronchorrhea). I insert a rigid Yankauer suction tip and suction aggressively and continuously.",
      "note": "Aggressive suctioning."
    },
    {
      "time": "00:01:48",
      "speaker": "EMT CANDIDATE",
      "speech": "Respirations are 28 breaths/min, severely labored, with audible wet bubbling. SpO2 is 82%. I apply high-flow oxygen via Non-Rebreather at 15 L/min with suction constantly ready.",
      "note": "Airway & O2."
    },
    {
      "time": "00:02:02",
      "speaker": "EMT CANDIDATE",
      "speech": "Circulation: radial pulse is 42 bpm, profoundly bradycardic and weak. Skin is cool, pale, drenched in sweat. BP is 90/56 mmHg.",
      "note": "Bradycardia & shock."
    },
    {
      "time": "00:02:18",
      "speaker": "EMT CANDIDATE",
      "speech": "PATHOPHYSIOLOGY VERBALIZED: Organophosphates permanently inhibit acetylcholinesterase, causing massive accumulation of acetylcholine across all muscarinic and nicotinic synapses. The fatal threats are the Killer B's: Bronchorrhea, Bronchospasm, and Bradycardia.",
      "note": "Mechanism explained."
    },
    {
      "time": "00:02:40",
      "speaker": "EMT CANDIDATE",
      "speech": "DEFINITIVE TREATMENT: Carlos requires immediate high-dose Atropine (2 to 4 mg IV/IM, doubled every 5 minutes until pulmonary secretions dry) and Pralidoxime (2-PAM 1-2 g) to reactivate the enzyme. I call for ALS intercept immediately.",
      "note": "Atropine indication."
    },
    {
      "time": "00:03:00",
      "speaker": "EMT CANDIDATE",
      "speech": "Contacting Medical Control / ALS Rendezvous: 'Medic 1 ALS, this is EMT Candidate on BLS Medic 4 en route. We have a severe Organophosphate Cholinergic Crisis: 45-year-old agricultural worker fully decontaminated. Presenting with massive SLUDGEM symptoms, severe bronchorrhea, HR 42, BP 90/56, SpO2 82% on 15L NRB. We have active suction running continuously. We need an immediate ALS intercept for high-dose Atropine (minimum 2-4 mg) and 2-PAM. Intercept at Highway 12 Milepost 4.'",
      "note": "ALS rendezvous alert."
    },
    {
      "time": "00:03:40",
      "speaker": "PROCTOR (ALS MEDIC)",
      "speech": "Medic 4, Medic 1 is 2 minutes out with Atropine prefilled syringes in hand.",
      "note": "ALS intercept."
    },
    {
      "time": "00:03:52",
      "speaker": "PROCTOR (SCENARIO UPDATE)",
      "speech": "ALS boards your ambulance. Paramedic administers 2 mg of Atropine IV immediately, followed by another 2 mg 3 minutes later.",
      "note": "Atropine administered."
    },
    {
      "time": "00:04:12",
      "speaker": "EMT CANDIDATE",
      "speech": "5-minute reassessment post-Atropine:",
      "note": "Reassessment."
    },
    {
      "time": "00:04:22",
      "speaker": "PROCTOR",
      "speech": "Carlos's copious oral bubbling begins drying up. Heart rate climbs from 42 to 68 bpm. Bronchial secretions diminish. Repeat vitals: BP 104/64 mmHg, HR 68 bpm, RR 22, SpO2 94% on NRB.",
      "note": "Atropinization successful!"
    },
    {
      "time": "00:04:40",
      "speaker": "EMT CANDIDATE",
      "speech": "CLINICAL ENDPOINT OF ATROPINE: The hallmark endpoint of adequate atropinization is the CLEARING OF PULMONARY SECRETIONS and resolution of bronchorrhea, NOT the dilation of pupils or heart rate. The lungs are clearing.",
      "note": "Critical pearl verbalized."
    },
    {
      "time": "00:05:00",
      "speaker": "EMT CANDIDATE",
      "speech": "Hospital / HazMat ED Hand-Off Report: 'This is Carlos Ramirez, 45M, acute organophosphate pesticide poisoning (Chlorpyrifos). Initial presentation: full SLUDGEM toxidrome (salivation, lacrimation, urination, defecation, GI cramps, emesis, miosis) with fatal Killer B's: massive bronchorrhea, bronchospasm, and severe bradycardia (HR 42, SpO2 82%). Decontamination protocol completed on scene (clothing stripped, bagged, skin copiously irrigated). Managed with continuous suction, 15L NRB, and ALS administered 4 mg Atropine IV. Repeat vitals: BP 104/64, HR 68, RR 22, SpO2 94% with drying pulmonary secretions. Patient is prepped for IV Pralidoxime (2-PAM) infusion and ICU toxicology admission.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:06:05",
      "speaker": "PROCTOR",
      "speech": "Flawless HazMat awareness and cholinergic management. Station passed.",
      "note": "Station passed."
    }
  ],
  "handOffReport": "Carlos Ramirez, 45M, acute organophosphate cholinergic crisis. Presented with full SLUDGEM toxidrome, pinpoint miosis, severe bronchorrhea, and bradycardia (HR 42, BP 90/56, SpO2 82%). Completed full field decontamination before transport. Managed with aggressive airway suctioning, 15L NRB, and 4 mg IV Atropine via ALS. Repeat vitals BP 104/64, HR 68, RR 22, SpO2 94% with drying of secretions. Prepped for 2-PAM infusion.",
  "reassessmentVitals": {
    "bp": "104/64 mmHg",
    "hr": "68 bpm (atropinization begun by ALS)",
    "rr": "22 breaths/min (secretions drying)",
    "spo2": "94% on 15 L/min Non-Rebreather",
    "lung_sounds": "Bubbling significantly reduced post-Atropine",
    "pain_score": "4 / 10"
  }
},
{
  "id": 21,
  "title": "31M \u2013 Acute Peritonitis Secondary to Ruptured Appendicitis",
  "cad": "Medic 4, respond priority 2 to 415 West End Avenue, Apt 2A, for a 31-year-old male with severe unbearable stomach pain and persistent vomiting for 24 hours.",
  "hiddenDiagnosis": "Acute Peritonitis Secondary to Ruptured Appendicitis",
  "category": "Abdominal & Gastrointestinal",
  "vitals": {
    "bp": "92/56 mmHg (vasodilation / early septic shock)",
    "hr": "122 bpm (sinus tachycardia, weak radial)",
    "rr": "24 breaths/min (rapid, shallow, splinting against diaphragmatic movement)",
    "spo2": "96% on ambient room air",
    "bgl": "110 mg/dL",
    "skin": "Pale, cool, diaphoretic",
    "pupils": "PEARRL at 3 mm",
    "lungs": "Clear bilaterally; shallow excursions"
  },
  "trap": "Allowing an acute abdomen patient to eat or drink anything (causes aspiration during induction of anesthesia or delays emergency surgery).",
  "initialPatientSpeech": "My stomach... hurts so bad I can't even breathe... any tiny bump or movement kills me...",
  "clues": [
    "Progression of Appendiceal Pain: Began 24 hours ago as dull, crampy periumbilical pain; migrated to the Right Lower Quadrant (McBurney's Point); then suddenly became severe, diffuse, and excruciating following rupture",
    "THE HALLMARK OF PERITONITIS: Involuntary Guarding and a RIGID, BOARD-LIKE ABDOMEN (the abdominal wall musculature contracts into a rock-hard spasm to protect the inflamed peritoneum)",
    "Rebound Tenderness (Blumberg's Sign): Pain is far worse upon the sudden RELEASE of deep palpation than during the pressing phase",
    "Systemic inflammatory response / early septic shock: High fever (102.8\u00b0F), tachycardia (HR 122 bpm), and hypotension (BP 92/56 mmHg)",
    "POSITION OF COMFORT: Transport the patient supine with knees flexed toward the chest (relaxes abdominal wall tension); KEEP STRICTLY NPO (no water/food) for emergency surgery"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, priority 2 response to 415 West End Ave Apt 2A, 31-year-old male with severe abdominal pain and fever.",
      "note": "CAD alert."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to 31M with severe abdominal pain. BSI: gloves, eye protection, mask. Scene safe?",
      "note": "Scene size-up."
    },
    {
      "time": "00:00:18",
      "speaker": "PROCTOR",
      "speech": "Scene is safe. Girlfriend opens the apartment door.",
      "note": "Safe verified."
    },
    {
      "time": "00:00:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Nature of illness: acute surgical abdomen / peritonitis / sepsis. One patient. Requesting ALS backup for IV fluid resuscitation and analgesia.",
      "note": "ALS dispatch."
    },
    {
      "time": "00:00:32",
      "speaker": "EMT CANDIDATE",
      "speech": "General impression: 31-year-old male lying curled on his right side in fetal position with knees pulled to chest, grimacing, moaning, flushed and shivering from fever. No trauma, C-spine not indicated.",
      "note": "General impression."
    },
    {
      "time": "00:00:46",
      "speaker": "EMT CANDIDATE",
      "speech": "Hello Jacob, I'm EMT Luke. Don't try to move. Tell me what's going on.",
      "note": "Primary assessment."
    },
    {
      "time": "00:00:51",
      "speaker": "PATIENT (JACOB)",
      "speech": "My stomach... hurts so bad I can't even breathe... any tiny bump or movement kills me...",
      "note": "Somatic peritoneal pain."
    },
    {
      "time": "00:00:58",
      "speaker": "EMT CANDIDATE",
      "speech": "Airway is patent. Respirations are 24 breaths/min, shallow because taking a deep breath moves his diaphragm and causes severe peritoneal irritation. SpO2 is 96%.",
      "note": "Breathing eval."
    },
    {
      "time": "00:01:10",
      "speaker": "EMT CANDIDATE",
      "speech": "I apply oxygen via nasal cannula at 4 L/min. Checking circulation: radial pulse is 122 bpm, rapid and weak. Skin is hot, flushed, and diaphoretic. BP is 92/56. High-priority load-and-go surgical emergency.",
      "note": "Circulation check."
    },
    {
      "time": "00:01:25",
      "speaker": "EMT CANDIDATE",
      "speech": "Partner, get a full set of vitals including temperature and BGL while I examine Jacob's abdomen.",
      "note": "Delegation."
    },
    {
      "time": "00:01:35",
      "speaker": "EMT CANDIDATE",
      "speech": "Jacob, where did this pain start and where is it now?",
      "note": "OPQRST - Onset/Radiation."
    },
    {
      "time": "00:01:40",
      "speaker": "PATIENT (JACOB)",
      "speech": "Started yesterday around my belly button... then last night it moved down into my lower right side... then two hours ago I had a sudden pop and the pain exploded everywhere!",
      "note": "Classic rupture history!"
    },
    {
      "time": "00:01:54",
      "speaker": "EMT CANDIDATE",
      "speech": "ABDOMINAL EXAMINATION PROTOCOL: I inspect, then auscultate, then palpate. I palpate the painful area LAST. When I touch the abdomen: What do I feel?",
      "note": "Palpation technique."
    },
    {
      "time": "00:02:08",
      "speaker": "PROCTOR",
      "speech": "Bowel sounds are completely absent (paralytic ileus). Upon palpation, the entire abdominal wall is rigid and board-like with involuntary spasm. When you release pressure, Jacob screams in agony (severe rebound tenderness / Blumberg's sign).",
      "note": "Peritonitis confirmed!"
    },
    {
      "time": "00:02:26",
      "speaker": "EMT CANDIDATE",
      "speech": "CRITICAL CLINICAL DIAGNOSIS: Acute peritonitis secondary to ruptured appendicitis. The spill of infected bowel contents into the peritoneal cavity has caused chemical and bacterial peritonitis and septic shock (BP 92/56, HR 122, Temp 102.8\u00b0F).",
      "note": "Diagnosis verbalized."
    },
    {
      "time": "00:02:48",
      "speaker": "EMT CANDIDATE",
      "speech": "PATIENT MANAGEMENT MANDATES: 1. KEEP STRICTLY NPO (no sips of water, no oral medications) for emergent exploratory laparotomy; 2. Position of comfort: supine with knees bent (flexed) and pillows under knees to relax abdominal tension; 3. Handle the stretcher with extreme gentleness\u2014every pothole vibrates the inflamed peritoneum.",
      "note": "Management mandates."
    },
    {
      "time": "00:03:15",
      "speaker": "PROCTOR (PARTNER)",
      "speech": "Vitals: BP 92/56 mmHg, HR 122, RR 24 shallow, SpO2 96%, Temp 102.8\u00b0F (39.3\u00b0C), BGL 110 mg/dL.",
      "note": "Baseline recorded."
    },
    {
      "time": "00:03:30",
      "speaker": "EMT CANDIDATE",
      "speech": "Contacting Medical Control / ALS Rendezvous: 'Medical Control, this is EMT Candidate on Medic 4. Priority transport with a 31-year-old male with acute peritonitis from ruptured appendicitis. Periumbilical to RLQ migration followed by diffuse rupture 2 hours ago. Rigid board-like abdomen, positive rebound tenderness, absent bowel sounds. Septic shock vitals: BP 92/56, HR 122, Temp 102.8\u00b0F. Patient kept NPO, knees flexed, 4L NC applied. Rendezvousing with ALS for IV Normal Saline bolus and broad-spectrum antibiotics alert.'",
      "note": "Medical Control report."
    },
    {
      "time": "00:04:05",
      "speaker": "PROCTOR (MED CONTROL)",
      "speech": "Medic 4, copy. Rendezvous approved. General Surgery at St. Anthony's is alerted for emergency laparotomy.",
      "note": "Surgical alert."
    },
    {
      "time": "00:04:18",
      "speaker": "EMT CANDIDATE",
      "speech": "5-minute reassessment:",
      "note": "Reassessment."
    },
    {
      "time": "00:04:28",
      "speaker": "PROCTOR",
      "speech": "ALS boards and initiates a 1,000 mL Normal Saline IV bolus. Repeat vitals: BP 96/60 mmHg, HR 116 bpm, RR 20, SpO2 99%.",
      "note": "Vitals tracked."
    },
    {
      "time": "00:04:42",
      "speaker": "EMT CANDIDATE",
      "speech": "General Surgery / Trauma Hand-Off Report: 'This is Jacob Miller, 31M, acute peritonitis secondary to ruptured appendicitis. 24-hour symptom progression from periumbilical ache to RLQ McBurney's point, culminating in sudden rupture and diffuse agony 2 hours ago. Physical exam: rigid board-like abdominal wall, involuntary guarding, positive rebound tenderness, absent bowel sounds. Early septic shock vitals: BP 92/56, HR 122, Temp 102.8\u00b0F, RR 24 shallow. Patient maintained strictly NPO, positioned with knees flexed, and ALS initiated 1-liter IV saline bolus. Repeat BP 96/60, HR 116. Patient is ready for emergent surgical appendectomy and peritoneal washout.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:05:40",
      "speaker": "PROCTOR",
      "speech": "Flawless acute abdomen assessment. Station passed.",
      "note": "Station passed."
    }
  ],
  "handOffReport": "Jacob Miller, 31M, acute peritonitis secondary to ruptured appendicitis with early septic shock. Pain migrated from periumbilical to RLQ before diffusing. Physical exam revealed involuntary guarding, board-like abdominal rigidity, and severe rebound tenderness. Baseline BP 92/56, HR 122, Temp 102.8\u00b0F, RR 24. Kept strictly NPO, transported with knees flexed, 4L NC, and ALS IV crystalloid resuscitation. Repeat BP 96/60, HR 116. Direct hand-off for emergent surgical laparotomy.",
  "reassessmentVitals": {
    "bp": "96/60 mmHg",
    "hr": "116 bpm",
    "rr": "20 breaths/min",
    "spo2": "99% on 4 L/min Nasal Cannula",
    "pain_score": "9 / 10 with knees flexed"
  }
},
{
  "id": 22,
  "title": "27F \u2013 Ruptured Ectopic Pregnancy with Hemorrhagic Shock",
  "cad": "Medic 4, respond priority 1 lights and sirens to Metro Plaza, Suite 400, for a 27-year-old female who collapsed in the breakroom. Co-workers state she is pale, sweating, and complained of agonizing pelvic pain.",
  "hiddenDiagnosis": "Ruptured Ectopic Pregnancy with Hemorrhagic Shock",
  "category": "Obstetric & Gynecologic",
  "vitals": {
    "bp": "82/48 mmHg (severe hemorrhagic shock / hemoperitoneum)",
    "hr": "128 bpm (sinus tachycardia, weak thready radial)",
    "rr": "26 breaths/min (rapid, shallow tachypnea)",
    "spo2": "94% on ambient room air",
    "bgl": "98 mg/dL",
    "skin": "Pale, cool, diaphoretic",
    "pupils": "Sluggish, 4 mm equal",
    "lungs": "Clear bilaterally"
  },
  "trap": "Failing to consider ectopic pregnancy in any female of childbearing age presenting with lower abdominal pain or syncope.",
  "initialPatientSpeech": "(Weakly)... yes... awful pain in my stomach... and my left shoulder hurts so bad...",
  "clues": [
    "Classic Patient Demographic: Any female of childbearing age (12 to 50 years) presenting with lower abdominal or pelvic pain MUST be considered pregnant until proven otherwise!",
    "History of missed menstrual period (amenorrhea for 6 to 8 weeks) with sudden, unilateral, tearing lower quadrant pelvic pain",
    "KEHR'S SIGN (The Hallmark of Hemoperitoneum): Referred sharp pain to the LEFT SHOULDER TIP caused by blood accumulating under the diaphragm and irritating the phrenic nerve (C3-C5)",
    "Decompensated Hemorrhagic Shock: Hypotension (BP 82/48 mmHg), marked tachycardia (HR 128 bpm), cold clammy pale skin, and syncope",
    "CRITICAL PROTOCOL: Immediate high-flow O2, thermal conservation, rapid load-and-go to an OB/GYN surgical trauma center, notify receiving facility of ruptured ectopic pregnancy requiring emergent laparoscopy/salpingostomy"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, priority 1 response to Metro Plaza Suite 400, 27-year-old female collapsed with severe pelvic pain.",
      "note": "CAD broadcast."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to 27F with acute pelvic pain and syncope. BSI: gloves, eye protection. Scene safe?",
      "note": "Scene size-up."
    },
    {
      "time": "00:00:18",
      "speaker": "PROCTOR",
      "speech": "Scene is safe. Co-workers are gathered around.",
      "note": "Safe verified."
    },
    {
      "time": "00:00:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Nature of illness: gynecologic / hemorrhagic life-threat. One patient. Requesting ALS backup immediately.",
      "note": "ALS dispatch."
    },
    {
      "time": "00:00:32",
      "speaker": "EMT CANDIDATE",
      "speech": "General impression: 27-year-old female on floor, curled on her left side, clutching her lower abdomen, skin is pale, cool, and clammy. No fall trauma reported, C-spine not indicated.",
      "note": "General impression."
    },
    {
      "time": "00:00:46",
      "speaker": "EMT CANDIDATE",
      "speech": "Jessica, can you hear me? I'm EMT Luke.",
      "note": "Primary assessment."
    },
    {
      "time": "00:00:50",
      "speaker": "PATIENT (JESSICA)",
      "speech": "(Weakly)... yes... awful pain in my stomach... and my left shoulder hurts so bad...",
      "note": "Kehr's sign noted!"
    },
    {
      "time": "00:00:58",
      "speaker": "EMT CANDIDATE",
      "speech": "Airway is patent. Respirations are 26 breaths/min, rapid and shallow. SpO2 is 94%. I apply high-flow oxygen via Non-Rebreather at 15 L/min.",
      "note": "Airway & O2."
    },
    {
      "time": "00:01:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Circulation: radial pulse is 128 bpm, rapid and thready. Skin is pale, cold, and drenched in sweat. Cap refill is 3.5 seconds. BP is 82/48 mmHg.",
      "note": "Hemorrhagic shock."
    },
    {
      "time": "00:01:25",
      "speaker": "EMT CANDIDATE",
      "speech": "IMMEDIATE CRITICAL LOAD-AND-GO EMERGENCY. Jessica is in decompensated hemorrhagic shock. Partner, obtain baseline vitals immediately while we move her to the cot.",
      "note": "Load-and-go."
    },
    {
      "time": "00:01:38",
      "speaker": "EMT CANDIDATE",
      "speech": "Jessica, when was your last menstrual period, and is there any chance you could be pregnant?",
      "note": "OB/GYN history."
    },
    {
      "time": "00:01:44",
      "speaker": "PATIENT (JESSICA)",
      "speech": "I missed my period about six weeks ago... took a home test last week and it was positive... was waiting to see my OB next week...",
      "note": "Confirmed pregnant!"
    },
    {
      "time": "00:01:56",
      "speaker": "EMT CANDIDATE",
      "speech": "Did you have any vaginal bleeding or spotting today?",
      "note": "Vaginal bleeding check."
    },
    {
      "time": "00:02:00",
      "speaker": "PATIENT (JESSICA)",
      "speech": "Just a tiny bit of dark spotting this morning, then sudden tearing pain on my left side 15 minutes ago, and then I fainted.",
      "note": "Tearing pain & syncope."
    },
    {
      "time": "00:02:12",
      "speaker": "EMT CANDIDATE",
      "speech": "CLINICAL PATHOPHYSIOLOGY PEARL: In a ruptured ectopic pregnancy, the growing blastocyst ruptures the fallopian tube, causing massive internal hemoperitoneum (often 1 to 2 liters of blood). The vaginal spotting is minimal because the hemorrhage is inside the abdominal cavity! The left shoulder pain (Kehr's sign) is diaphragmatic blood irritating the phrenic nerve.",
      "note": "Kehr's sign explained!"
    },
    {
      "time": "00:02:40",
      "speaker": "EMT CANDIDATE",
      "speech": "I examine the abdomen gently: lower quadrants are tender with guarding, especially on the left. No visible external vaginal hemorrhage.",
      "note": "Abdominal findings."
    },
    {
      "time": "00:02:52",
      "speaker": "PROCTOR (PARTNER)",
      "speech": "Vitals: BP 82/48 mmHg, HR 128 thready, RR 26, SpO2 94% on room air, BGL 98 mg/dL, pupils PEARRL 4 mm.",
      "note": "Baseline recorded."
    },
    {
      "time": "00:03:08",
      "speaker": "EMT CANDIDATE",
      "speech": "SHOCK MANAGEMENT: Position Jessica supine on the cot, apply warm blankets to conserve core body heat and prevent hypothermic coagulopathy, and maintain 15L NRB.",
      "note": "Thermal & shock care."
    },
    {
      "time": "00:03:25",
      "speaker": "EMT CANDIDATE",
      "speech": "Contacting Medical Control / Hospital Activation: 'Medical Control, this is EMT Candidate on Medic 4. Priority 1 emergent transport with a 27-year-old female with a confirmed Ruptured Ectopic Pregnancy in decompensated hemorrhagic shock. 6 weeks pregnant, sudden unilateral lower abdominal tearing pain, positive Kehr's sign (left shoulder pain), syncope. Vitals: BP 82/48, HR 128, RR 26, SpO2 99% on 15L NRB. Supine, warmed. Requesting emergent OB/GYN surgical trauma activation and massive transfusion protocol readiness at Women's & Children's Surgical Center.'",
      "note": "OB surgical alert."
    },
    {
      "time": "00:04:05",
      "speaker": "PROCTOR (MED CONTROL)",
      "speech": "Medic 4, copy. OB/GYN surgical team and blood bank are mobilized. Expedite transport.",
      "note": "OR team ready."
    },
    {
      "time": "00:04:16",
      "speaker": "EMT CANDIDATE",
      "speech": "Medical Control, confirmed: Transporting code 3 to Women's & Children's with surgical team ready. Candidate out.",
      "note": "Closed-loop confirmation."
    },
    {
      "time": "00:04:28",
      "speaker": "EMT CANDIDATE",
      "speech": "5-minute reassessment:",
      "note": "Reassessment."
    },
    {
      "time": "00:04:38",
      "speaker": "PROCTOR",
      "speech": "Jessica remains lethargic but oriented. Repeat vitals: BP 84/50 mmHg, HR 124 bpm, RR 22, SpO2 99% on NRB.",
      "note": "Vitals tracked."
    },
    {
      "time": "00:04:50",
      "speaker": "EMT CANDIDATE",
      "speech": "OB/GYN Surgical Hand-Off Report: 'This is Jessica Sanchez, 27F, 6 weeks gestation by amenorrhea, presenting with ruptured ectopic pregnancy and massive intra-abdominal hemorrhage. Sudden tearing lower left quadrant pain followed by syncope and positive Kehr's sign (referred left shoulder pain). Baseline vitals: BP 82/48, HR 128 thready, RR 26, SpO2 94% on room air, pale cool clammy skin. Interventions: 15L NRB, supine positioning, thermal conservation blankets. Repeat BP 84/50, HR 124. Patient is prepped for immediate bedside ultrasound (FAST exam), type and cross-match, and emergency laparoscopic salpingostomy.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:05:48",
      "speaker": "PROCTOR",
      "speech": "Flawless recognition of ectopic pregnancy and Kehr's sign. Station passed.",
      "note": "Station passed."
    }
  ],
  "handOffReport": "Jessica Sanchez, 27F, 6 weeks gestation, presenting with ruptured ectopic pregnancy and decompensated hemorrhagic shock. Sudden tearing lower left abdominal pain, syncope, and referred left shoulder pain (Kehr's sign). Minimal external bleeding with massive internal hemoperitoneum. Baseline BP 82/48, HR 128, RR 26, SpO2 94%. Managed supine, warm blankets, 15L NRB. Repeat BP 84/50, HR 124. Direct surgical hand-off for emergent laparoscopy.",
  "reassessmentVitals": {
    "bp": "84/50 mmHg",
    "hr": "124 bpm",
    "rr": "22 breaths/min",
    "spo2": "99% on 15 L/min Non-Rebreather",
    "pain_score": "9 / 10"
  }
},
{
  "id": 23,
  "title": "28F, G3P2, 39 weeks \u2013 Imminent Childbirth with Prolapsed Umbilical Cord",
  "cad": "Medic 4, respond priority 1 lights and sirens to 720 Magnolia Way for a 28-year-old female in active labor. Caller states the baby is coming and the mother feels a loop of rope coming out.",
  "hiddenDiagnosis": "Imminent Childbirth with Prolapsed Umbilical Cord",
  "category": "Obstetric",
  "vitals": {
    "bp": "128/82 mmHg (labor contraction drive)",
    "hr": "104 bpm (tachycardia from labor pain and anxiety)",
    "rr": "24 breaths/min (panting, deep breaths)",
    "spo2": "98% on ambient room air",
    "bgl": "100 mg/dL",
    "skin": "Pale, cool, diaphoretic",
    "pupils": "PEARRL 3 mm",
    "lungs": "Clear bilaterally"
  },
  "trap": "Attempting to push the prolapsed umbilical cord back inside the vagina (causes severe arterial spasm and fetal demise).",
  "initialPatientSpeech": "Yes! Please help my baby!",
  "clues": [
    "Definition & Mechanism: The umbilical cord slips ahead of the presenting fetal part and prolapses through the cervix into the vagina; contractions compress the cord against the pelvis, completely cutting off fetal oxygenation",
    "Visual inspection reveals a pulsating, moist loop of umbilical cord protruding from the vaginal opening",
    "CRITICAL EMERGENCY POSITIONING: Place mother immediately in the KNEE-CHEST POSITION (knees to chest, face down, hips elevated in the air) or steep Trendelenburg to use gravity to slide the fetus away from the cervix",
    "MANDATORY NREMT LIFESAVING PROCEDURE: Insert two sterile gloved fingers into the vagina and gently push the presenting fetal head UPWARD and away from the umbilical cord; MAINTAIN THIS MANUAL DISPLACEMENT CONTINUOUSLY UNTIL SURGICAL CESAREAN SECTION IN THE OR!",
    "ABSOLUTE CONTRAINDICATION: DO NOT attempt to push the cord back inside the vagina! Wrap the exposed cord in sterile gauze moistened with warm sterile saline to prevent vasospasm"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, priority 1 response to 720 Magnolia Way, 28-year-old female in active labor, cord protruding.",
      "note": "CAD broadcast."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to imminent delivery with umbilical cord prolapse. BSI: sterile gloves, mask, eye protection, OB gown. Is the scene safe?",
      "note": "OB BSI precautions."
    },
    {
      "time": "00:00:18",
      "speaker": "PROCTOR",
      "speech": "Scene is safe. Father is frantic in the hallway.",
      "note": "Safe verified."
    },
    {
      "time": "00:00:20",
      "speaker": "EMT CANDIDATE",
      "speech": "Nature of illness: obstetric catastrophe / prolapsed umbilical cord. Two patients (mother and fetus). Requesting ALS backup immediately.",
      "note": "ALS dispatch."
    },
    {
      "time": "00:00:32",
      "speaker": "EMT CANDIDATE",
      "speech": "General impression: 28-year-old female on bed, in active labor, clutching her abdomen, screaming: 'My water broke and I feel something hanging out between my legs!'",
      "note": "General impression."
    },
    {
      "time": "00:00:46",
      "speaker": "EMT CANDIDATE",
      "speech": "Hello Maria, I'm EMT Luke. I need to inspect your vaginal opening immediately to protect your baby. Do you consent?",
      "note": "Patient consent."
    },
    {
      "time": "00:00:50",
      "speaker": "PATIENT (MARIA)",
      "speech": "Yes! Please help my baby!",
      "note": "Consent granted."
    },
    {
      "time": "00:00:54",
      "speaker": "EMT CANDIDATE",
      "speech": "VISUAL INSPECTION: I drape the patient and inspect the perineum. Evaluator, what do I see?",
      "note": "Perineal inspection."
    },
    {
      "time": "00:01:00",
      "speaker": "PROCTOR",
      "speech": "You observe a 4-inch loop of purple umbilical cord protruding from the vaginal opening. Faint pulsations are palpable in the cord at roughly 88 bpm. The fetal head is pressing hard against it.",
      "note": "Prolapsed cord verified!"
    },
    {
      "time": "00:01:15",
      "speaker": "EMT CANDIDATE",
      "speech": "CRITICAL NREMT LIFESAVING SEQUENCE: STEP 1: POSITIONING. Partner, immediately help Maria into the KNEE-CHEST POSITION (knees drawn to chest, face down, buttocks elevated in the air). Gravity pulls the fetus back into the uterus.",
      "note": "Knee-chest position!"
    },
    {
      "time": "00:01:35",
      "speaker": "EMT CANDIDATE",
      "speech": "STEP 2: MANUAL FETAL ELEVATION. I don sterile gloves. I gently insert my index and middle fingers into the vagina past the cord, locate the presenting fetal head, and gently push the fetal head UPWARD away from the cord and pelvis. I verbalize: I WILL MAINTAIN MY HAND IN THIS POSITION AND KEEP PRESSURE OFF THE CORD UNTIL AN OB SURGEON TAKES OVER IN THE OR!",
      "note": "Manual head elevation!"
    },
    {
      "time": "00:02:05",
      "speaker": "PROCTOR",
      "speech": "As you lift the fetal head upward, the cord pulsations visibly strengthen and accelerate from 88 bpm to 130 bpm.",
      "note": "Fetal blood flow restored!"
    },
    {
      "time": "00:02:18",
      "speaker": "EMT CANDIDATE",
      "speech": "STEP 3: CORD PROTECTION. Partner, take sterile gauze pads, saturate them with warm sterile normal saline, and wrap them loosely around the exposed umbilical cord. DO NOT ATTEMPT TO PUSH THE CORD BACK INSIDE THE VAGINA. Keep it warm and moist to prevent arterial vasospasm.",
      "note": "Saline wrap applied."
    },
    {
      "time": "00:02:42",
      "speaker": "EMT CANDIDATE",
      "speech": "STEP 4: OXYGENATION & COACHING. Apply high-flow oxygen via Non-Rebreather mask at 15 L/min to Maria to maximize fetal blood oxygenation. Instruct Maria: 'Maria, do NOT push! Pant through the contractions like blowing out birthday candles!'",
      "note": "Panting coached."
    },
    {
      "time": "00:03:04",
      "speaker": "PROCTOR (PARTNER)",
      "speech": "Mother's vitals: BP 128/82 mmHg, HR 104, RR 24, SpO2 98% on NRB. Exposed cord remains wrapped and pulsating strongly.",
      "note": "Vitals recorded."
    },
    {
      "time": "00:03:18",
      "speaker": "EMT CANDIDATE",
      "speech": "IMMEDIATE CODE 3 EMERGENCY TRANSPORT. We transfer Maria to the stretcher maintaining the knee-chest or steep Trendelenburg position. My gloved hand remains inside the vagina maintaining continuous cephalic displacement throughout extrication and transport.",
      "note": "Transport maintained."
    },
    {
      "time": "00:03:40",
      "speaker": "EMT CANDIDATE",
      "speech": "Contacting Medical Control / Labor & Delivery: 'Labor & Delivery, this is EMT Candidate on Medic 4. Priority 1 obstetric life-threat arriving in 6 minutes: 28-year-old G3P2 at 39 weeks with an active Prolapsed Umbilical Cord. Mother is in knee-chest position with 15L NRB. Hand is inserted into vagina actively elevating the fetal head off the cord. Fetal pulsations palpable and strong. Cord wrapped in warm sterile saline dressing. Requesting immediate direct transfer onto the Emergency Cesarean Section operating table upon arrival.'",
      "note": "L&D emergency alert."
    },
    {
      "time": "00:04:18",
      "speaker": "PROCTOR (HOSPITAL)",
      "speech": "Medic 4, copy! OR 3 is prepped for immediate crash C-section. Bring patient directly through ED doors to the OR suite.",
      "note": "Crash C-section ready."
    },
    {
      "time": "00:04:30",
      "speaker": "EMT CANDIDATE",
      "speech": "5-minute reassessment in transit:",
      "note": "Reassessment."
    },
    {
      "time": "00:04:38",
      "speaker": "PROCTOR",
      "speech": "Contractions continue every 2 minutes. Mother is panting. Manual elevation of fetal head is maintained. Cord pulse remains strong at 128 bpm.",
      "note": "Fetus viable."
    },
    {
      "time": "00:04:52",
      "speaker": "EMT CANDIDATE",
      "speech": "Obstetric Surgical Hand-Off Report: 'This is Maria Martinez, 28F, G3P2, 39 weeks gestation, presenting with imminent delivery and prolapsed umbilical cord following membrane rupture. On scene, a 4-inch loop of cord was protruding with fetal bradycardia (88 bpm). Immediate knee-chest positioning was instituted, and two sterile gloved fingers were inserted into the vagina to elevate the presenting head off the cord. Cord pulsations accelerated to 130 bpm. Exposed cord wrapped in sterile saline dressing; mother coached not to push and placed on 15L NRB. Fetal head remains manually displaced off the cord right now. Handing off directly to OB surgical attending for crash Cesarean delivery.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:05:50",
      "speaker": "PROCTOR",
      "speech": "Outstanding, lifesaving execution of prolapsed cord protocol. Station passed.",
      "note": "Station passed."
    }
  ],
  "handOffReport": "Maria Martinez, 28F, G3P2 at 39 weeks gestation, prolapsed umbilical cord. Membrane rupture resulted in cord prolapse with initial fetal bradycardia (88 bpm). Implemented knee-chest positioning, inserted sterile gloved fingers to manually elevate fetal head off the cord, and wrapped exposed loop in warm sterile saline gauze (never pushed back inside). Fetal cord pulsations restored to 130 bpm. Hand maintained in vagina elevating head continuously into the OR for crash C-section.",
  "reassessmentVitals": {
    "bp": "124/78 mmHg",
    "hr": "98 bpm",
    "rr": "20 breaths/min",
    "spo2": "99% on 15 L/min Non-Rebreather",
    "fetal_heart_rate": "Cord pulsations strengthen to 130 bpm (compression successfully relieved!)",
    "pain_score": "Contractions continue; fetal head held elevated"
  }
},
{
  "id": 24,
  "title": "32F, 34 weeks gestation \u2013 Third-Trimester Bleeding: Placenta Previa vs. Abruptio Placentae",
  "cad": "Medic 4, respond priority 1 lights and sirens to intersection of 8th and Elm for a 32-year-old pregnant female involved in a low-speed fender-bender. Caller states patient has severe abdominal pain and vaginal bleeding.",
  "hiddenDiagnosis": "Third-Trimester Bleeding: Placenta Previa vs. Abruptio Placentae",
  "category": "Obstetric",
  "vitals": {
    "bp": "90/58 mmHg (hemorrhagic shock)",
    "hr": "126 bpm (maternal sinus tachycardia)",
    "rr": "24 breaths/min (rapid, splinting)",
    "spo2": "95% on ambient room air",
    "bgl": "104 mg/dL",
    "skin": "Pale, cool, diaphoretic",
    "pupils": "PEARRL 3 mm",
    "lungs": "Clear bilaterally"
  },
  "trap": "Performing an internal digital vaginal examination on a bleeding pregnant patient (lethal risk of tearing placenta previa or worsening detachment).",
  "initialPatientSpeech": "My neck is fine... but my stomach! Oh God, it feels like my uterus is tearing apart! It's rock hard and won't relax!",
  "clues": [
    "The Critical Diagnostic Differentiation Matrix: 1. ABRUPTIO PLACENTAE: Premature detachment of placenta from uterine wall; characterized by EXCRUCIATING, TEARING, CONSTANT ABDOMINAL PAIN, DARK VENOUS BLEEDING, and a ROCK-HARD, RIGID, HYPERTONIC UTERUS; 2. PLACENTA PREVIA: Placenta abnormally implants over the cervical os; characterized by PAINLESS, BRIGHT RED VAGINAL BLEEDING, and a SOFT, NON-TENDER RELAXED UTERUS",
    "Trauma Mechanism: Sudden deceleration forces (seatbelt compression) shearing the rigid placenta off the elastic uterine wall",
    "Maternal-fetal hemodynamic shock: Maternal hypotension (BP 90/58 mmHg), marked tachycardia (HR 126 bpm), fetal distress",
    "CRITICAL EXAM CONTRAINDICATION: NEVER PERFORM AN INTERNAL DIGITAL VAGINAL EXAMINATION! Direct insertion of fingers can puncture placenta previa or worsen placental separation!",
    "SUPINE HYPOTENSIVE SYNDROME PREVENTION: Transport in the LEFT LATERAL RECUMBENT POSITION (or place a wedge under the right hip to tilt pelvis 15-30 degrees) to prevent the heavy gravid uterus from compressing the Inferior Vena Cava (IVC)"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, priority 1 response to 8th and Elm, 32-year-old female, 34 weeks pregnant, MVC with severe abdominal pain and bleeding.",
      "note": "CAD broadcast."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to pregnant female in MVC with bleeding. BSI: gloves, eye protection, OB gown. Scene safe?",
      "note": "Scene size-up."
    },
    {
      "time": "00:00:18",
      "speaker": "PROCTOR",
      "speech": "Scene is safe. Fire department has stabilized two vehicles. Low-speed rear-end collision with minor bumper damage. Airbags did not deploy.",
      "note": "Low speed mechanism."
    },
    {
      "time": "00:00:22",
      "speaker": "EMT CANDIDATE",
      "speech": "Nature of illness: obstetric trauma / third-trimester hemorrhage. Two patients (mother and unborn fetus). Requesting ALS backup immediately.",
      "note": "ALS dispatch."
    },
    {
      "time": "00:00:34",
      "speaker": "EMT CANDIDATE",
      "speech": "General impression: 32-year-old visibly pregnant female seated on curb, clutching her heavy gravid abdomen, crying out in severe pain, pale and diaphoretic. Lap seatbelt was worn across lower abdomen. C-spine stabilized.",
      "note": "General impression."
    },
    {
      "time": "00:00:50",
      "speaker": "EMT CANDIDATE",
      "speech": "Hello Sarah, I'm EMT Luke. Are you hurt anywhere besides your stomach?",
      "note": "Primary assessment."
    },
    {
      "time": "00:00:54",
      "speaker": "PATIENT (SARAH)",
      "speech": "My neck is fine... but my stomach! Oh God, it feels like my uterus is tearing apart! It's rock hard and won't relax!",
      "note": "Constant tearing pain."
    },
    {
      "time": "00:01:04",
      "speaker": "EMT CANDIDATE",
      "speech": "Airway is patent. Respirations are 24 breaths/min, rapid. SpO2 is 95%. I apply high-flow oxygen via Non-Rebreather at 15 L/min to maximize fetal placental oxygenation.",
      "note": "Airway & O2."
    },
    {
      "time": "00:01:18",
      "speaker": "EMT CANDIDATE",
      "speech": "Circulation: radial pulse is 126 bpm, rapid and thready. Skin is cool, pale, diaphoretic. BP is 90/58 mmHg. Cap refill is 3 seconds. Priority load-and-go.",
      "note": "Shock signs."
    },
    {
      "time": "00:01:32",
      "speaker": "EMT CANDIDATE",
      "speech": "OBSTETRIC ABDOMINAL EXAMINATION: I gently palpate Sarah's gravid uterus. What do I feel?",
      "note": "Uterine palpation."
    },
    {
      "time": "00:01:40",
      "speaker": "PROCTOR",
      "speech": "The uterus is rock-hard, rigid, and intensely tender to touch. It does not soften between contractions (uterine tetany / hypertonicity).",
      "note": "Board-like uterus!"
    },
    {
      "time": "00:01:52",
      "speaker": "EMT CANDIDATE",
      "speech": "I inspect the perineum externally for hemorrhage: What do I see?",
      "note": "External inspection."
    },
    {
      "time": "00:01:58",
      "speaker": "PROCTOR",
      "speech": "You observe dark, venous blood actively dripping from the vaginal opening, soaking her pants. You see no presenting fetal parts.",
      "note": "Dark venous bleeding."
    },
    {
      "time": "00:02:08",
      "speaker": "EMT CANDIDATE",
      "speech": "CRITICAL CLINICAL MANDATE: NO INTERNAL VAGINAL EXAM. I WILL NEVER INSERT FINGERS OR INSTRUMENTS INTO THE VAGINA OF A BLEEDING THIRD-TRIMESTER PATIENT. Doing so could tear a placenta previa or exacerbate placental detachment.",
      "note": "No internal exam rule!"
    },
    {
      "time": "00:02:26",
      "speaker": "EMT CANDIDATE",
      "speech": "CRITICAL DIFFERENTIAL DIAGNOSIS: This is ABRUPTIO PLACENTAE triggered by deceleration seatbelt forces. Hallmarks: 1. Constant tearing uterine pain; 2. Dark venous blood; 3. Rock-hard, rigid, hypertonic uterus. In contrast, Placenta Previa presents with completely painless bright red bleeding and a soft relaxed uterus.",
      "note": "Differential established!"
    },
    {
      "time": "00:02:55",
      "speaker": "EMT CANDIDATE",
      "speech": "SUPINE HYPOTENSIVE SYNDROME PROTOCOL: We transfer Sarah to the stretcher. If Sarah lies flat on her back, the heavy 34-week uterus compresses the Inferior Vena Cava against her spine, obstructing venous return and worsening shock. I position Sarah in the LEFT LATERAL RECUMBENT POSITION (or place a blanket roll under her right hip to tilt her pelvis 20 to 30 degrees to the left).",
      "note": "Left lateral tilt executed!"
    },
    {
      "time": "00:03:30",
      "speaker": "PROCTOR (PARTNER)",
      "speech": "Vitals: BP was 90/58, but upon tilting 30 degrees to the left, BP improves to 98/64 mmHg. HR is 114 bpm, RR 20, SpO2 99% on 15L NRB.",
      "note": "Hemodynamics restored!"
    },
    {
      "time": "00:03:48",
      "speaker": "EMT CANDIDATE",
      "speech": "I place sanitary pads loosely over the perineum to collect blood and monitor rate of blood loss. Thermal conservation applied.",
      "note": "Sanitary pad applied."
    },
    {
      "time": "00:04:02",
      "speaker": "EMT CANDIDATE",
      "speech": "Contacting Medical Control / OB Trauma: 'Medical Control, this is EMT Candidate on Medic 4. Priority 1 emergent transport with a 32-year-old female, 34 weeks gestation, with severe traumatic Abruptio Placentae following an MVC. Presenting with constant tearing uterine agony, rock-hard tetanic uterus, dark vaginal bleeding, and maternal shock (BP 90/58 improving to 98/64 on left lateral tilt, HR 114, 15L NRB). Strictly no internal exam performed. Requesting immediate trauma and high-risk OB surgical activation for emergency Cesarean section at Regional Perinatal Center.'",
      "note": "OB trauma alert."
    },
    {
      "time": "00:04:45",
      "speaker": "PROCTOR (MED CONTROL)",
      "speech": "Medic 4, copy. High-risk OB surgical suite and neonatal resuscitation teams are mobilized.",
      "note": "Hospital alerted."
    },
    {
      "time": "00:04:56",
      "speaker": "EMT CANDIDATE",
      "speech": "5-minute reassessment:",
      "note": "Reassessment."
    },
    {
      "time": "00:05:05",
      "speaker": "PROCTOR",
      "speech": "Uterus remains rigid and tender. Vaginal bleeding continues. BP 98/64, HR 114, RR 20, SpO2 99%.",
      "note": "Vitals tracked."
    },
    {
      "time": "00:05:18",
      "speaker": "EMT CANDIDATE",
      "speech": "Perinatal Trauma Surgical Hand-Off Report: 'This is Sarah Jenkins, 32F, 34 weeks gestation, presenting with severe traumatic Abruptio Placentae following deceleration seatbelt trauma. Hallmark presentation: constant excruciating uterine pain, dark venous bleeding, and a rock-hard, rigid, hypertonic uterus. Baseline vitals: BP 90/58, HR 126, RR 24, SpO2 95%. External perineal pads applied without internal examination; placed in left lateral tilt to relieve IVC compression, restoring BP to 98/64, HR 114. 15L NRB applied. Patient is prepped for immediate emergent ultrasound, fetal heart monitoring, and crash Cesarean delivery.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:06:15",
      "speaker": "PROCTOR",
      "speech": "Masterful differentiation of third-trimester bleeding. Station passed.",
      "note": "Station passed."
    }
  ],
  "handOffReport": "Sarah Jenkins, 32F, 34 weeks gestation, acute traumatic Abruptio Placentae following minor MVC. Classic presentation: constant tearing abdominal pain, dark venous bleeding, and a rigid rock-hard hypertonic uterus. Baseline BP 90/58, HR 126, RR 24. No internal exams performed. Placed on 15L NRB, positioned in left lateral tilt to prevent supine hypotensive IVC compression, improving BP to 98/64, HR 114. Immediate hand-off to high-risk OB surgical team.",
  "reassessmentVitals": {
    "bp": "98/64 mmHg (improved following left lateral tilt)",
    "hr": "114 bpm",
    "rr": "20 breaths/min",
    "spo2": "99% on 15 L/min Non-Rebreather",
    "pain_score": "9 / 10 constant tearing pain"
  }
},
{
  "id": 25,
  "title": "0 minutes (newborn)M, Full term \u2013 Neonatal Resuscitation of a Meconium-Depressed Newborn",
  "cad": "Medic 4, respond priority 1 lights and sirens to 1422 Elmwood Street for a baby born at home. Father states baby is blue, completely limp, and not breathing.",
  "hiddenDiagnosis": "Neonatal Resuscitation of a Meconium-Depressed Newborn",
  "category": "Pediatric & Neonatal",
  "vitals": {
    "bp": "120/80 mmHg",
    "hr": "50 bpm (severe life-threatening neonatal bradycardia)",
    "rr": "0 breaths/min (apneic, limp, no cry)",
    "spo2": "Unrecordable (profoundly cyanotic / ashen)",
    "bgl": "100 mg/dL",
    "skin": "Pale, cool, diaphoretic",
    "pupils": "PEARRL 3 mm",
    "lungs": "Clear bilaterally"
  },
  "trap": "Failing to initiate positive pressure ventilations when newborn is apneic or HR < 100 bpm after 30 seconds of drying/stimulating.",
  "initialPatientSpeech": "Help me... I feel terrible...",
  "clues": [
    "Precipitous home delivery with thick 'pea-soup' meconium-stained amniotic fluid",
    "Depressed Newborn Presentation: Limp muscular tone, cyanotic trunk and extremities, APNEIC (no spontaneous cry or respirations)",
    "THE NEONATAL RESUSCITATION PROGRAM (NRP) GOLDEN MINUTE: 1. Warm, dry, stimulate, position head in 'sniffing position' (do NOT hyperextend!), clear airway with bulb syringe (mouth then nose); 2. Reassess: If still apneic or HR < 100 bpm -> INITIATE POSITIVE PRESSURE VENTILATION (PPV) via neonatal BVM with room air (21% O2) at 40 to 60 breaths/min for 30 seconds",
    "THE RULE OF 60 (CHEST COMPRESSIONS): If heart rate remains LESS THAN 60 BEATS PER MINUTE despite 30 seconds of effective PPV -> BEGIN CHEST COMPRESSIONS IMMEDIATELY at a 3:1 COMPRESSION-TO-VENTILATION RATIO (90 compressions and 30 breaths = 120 events/min) using the two-thumb encircling-hands technique, and increase O2 to 100%",
    "APGAR Scoring: 1-minute APGAR is 1 (Pulse 1, Respiration 0, Tone 0, Reflex 0, Color 0)"
  ],
  "dialogue": [
    {
      "time": "00:00:00",
      "speaker": "DISPATCH",
      "speech": "Medic 4, priority 1 response to 1422 Elmwood Street, baby born at home, limp and not breathing.",
      "note": "CAD broadcast."
    },
    {
      "time": "00:00:10",
      "speaker": "EMT CANDIDATE",
      "speech": "Dispatched to newborn resuscitation. BSI: sterile gloves, mask, eye protection, OB gown. Where is the baby?",
      "note": "Scene arrival."
    },
    {
      "time": "00:00:18",
      "speaker": "PROCTOR",
      "speech": "Father leads you to the living room. Full-term baby was born 60 seconds ago on a towel. Umbilical cord is intact. Mother is exhausted.",
      "note": "Scene overview."
    },
    {
      "time": "00:00:22",
      "speaker": "EMT CANDIDATE",
      "speech": "Nature of illness: neonatal cardiopulmonary arrest / depressed meconium newborn. Two patients. Requesting ALS backup immediately.",
      "note": "ALS dispatch."
    },
    {
      "time": "00:00:32",
      "speaker": "EMT CANDIDATE",
      "speech": "RAPID INITIAL NEONATAL ASSESSMENT: 1. Is the baby term? Yes. 2. Is the baby breathing or crying? No, completely apneic. 3. Does the baby have good muscle tone? No, completely limp and flaccid. Thick pea-soup meconium is smeared across face.",
      "note": "Initial NRP triangle."
    },
    {
      "time": "00:00:48",
      "speaker": "EMT CANDIDATE",
      "speech": "THE GOLDEN MINUTE - STEP 1: INITIAL CARE (0-30 SECONDS). I immediately clamp the umbilical cord at 6 inches and 8 inches from the abdomen and cut between clamps. I transfer the infant to a dry, warm, flat surface.",
      "note": "Cord clamped & moved."
    },
    {
      "time": "00:01:04",
      "speaker": "EMT CANDIDATE",
      "speech": "I position the head in the neutral 'sniffing position' with a small towel roll under the shoulders. I WILL NOT HYPEREXTEND OR HYPERFLEX THE NECK (closes narrow infant airway).",
      "note": "Sniffing position."
    },
    {
      "time": "00:01:18",
      "speaker": "EMT CANDIDATE",
      "speech": "I suction with a bulb syringe: MOUTH FIRST, THEN NOSE ('M before N' prevents aspirating pharyngeal fluid when nares are stimulated). I suction meconium from mouth and nose.",
      "note": "Suction mouth then nose."
    },
    {
      "time": "00:01:32",
      "speaker": "EMT CANDIDATE",
      "speech": "I vigorously dry the infant with warm towels, discard the wet towels, wrap in dry warm blankets, and flick the soles of the feet to stimulate breathing.",
      "note": "Dry & stimulate."
    },
    {
      "time": "00:01:46",
      "speaker": "PROCTOR",
      "speech": "After drying, suctioning, and stimulation, the baby remains limp, completely apneic, and deeply cyanotic. Heart rate auscultated via precordium is 50 beats per minute.",
      "note": "Depressed newborn!"
    },
    {
      "time": "00:01:58",
      "speaker": "EMT CANDIDATE",
      "speech": "STEP 2: POSITIVE PRESSURE VENTILATION (30-60 SECONDS). The baby is apneic with HR < 100 bpm. I immediately initiate Positive Pressure Ventilation (PPV) using a neonatal Bag-Valve-Mask with room air (21% O2). I ventilate at a rate of 40 to 60 breaths per minute: 'Breathe... two... three... Breathe... two... three...'",
      "note": "PPV initiated at 40-60/min!"
    },
    {
      "time": "00:02:24",
      "speaker": "PROCTOR (PARTNER)",
      "speech": "Chest is rising gently with each squeeze. SpO2 sensor placed on right wrist (pre-ductal). 30 seconds of PPV delivered.",
      "note": "Effective PPV delivered."
    },
    {
      "time": "00:02:35",
      "speaker": "EMT CANDIDATE",
      "speech": "I reassess heart rate by auscultating the apical pulse for 6 seconds and multiplying by 10. Evaluator, what is the heart rate?",
      "note": "Precordial HR check."
    },
    {
      "time": "00:02:44",
      "speaker": "PROCTOR",
      "speech": "You count 5 beats in 6 seconds: Heart rate is 50 beats per minute. Infant remains apneic.",
      "note": "HR remains < 60 bpm!"
    },
    {
      "time": "00:02:54",
      "speaker": "EMT CANDIDATE",
      "speech": "CRITICAL NRP MANDATE: THE RULE OF 60. Heart rate is LESS THAN 60 BPM despite 30 seconds of effective positive pressure ventilations. CHEST COMPRESSIONS ARE INDICATED IMMEDIATELY.",
      "note": "Compressions indicated!"
    },
    {
      "time": "00:03:10",
      "speaker": "EMT CANDIDATE",
      "speech": "CHEST COMPRESSION PROTOCOL: I utilize the TWO-THUMB ENCIRCLING-HANDS TECHNIQUE on the lower third of the sternum, compressing one-third the AP diameter of the chest (about 1.5 inches). I coordinate with my partner at a 3:1 COMPRESSION-TO-VENTILATION RATIO (3 compressions to 1 ventilation every 2 seconds = 90 compressions and 30 breaths per minute). I increase oxygen concentration to 100% on the BVM.",
      "note": "3:1 ratio & 100% O2!"
    },
    {
      "time": "00:03:38",
      "speaker": "EMT CANDIDATE",
      "speech": "Cadence called aloud: 'One-and-two-and-three-and-BREATHE... One-and-two-and-three-and-BREATHE...'",
      "note": "Synchronized 3:1 cadence."
    },
    {
      "time": "00:04:10",
      "speaker": "PROCTOR",
      "speech": "After 60 seconds of coordinated 3:1 compressions and 100% ventilations, you pause compressions and auscultate the heart rate.",
      "note": "Reassessment."
    },
    {
      "time": "00:04:20",
      "speaker": "PROCTOR",
      "speech": "You hear a rapid, strong heartbeat: 13 beats in 6 seconds = Heart rate is 130 beats per minute! The baby takes a sudden deep breath and lets out a loud, vigorous cry! Extremities begin flexing actively.",
      "note": "ROSC achieved!"
    },
    {
      "time": "00:04:38",
      "speaker": "EMT CANDIDATE",
      "speech": "HR IS > 100 BPM AND CRYING IS PRESENT! DISCONTINUE CHEST COMPRESSIONS! Discontinue PPV. Place the infant on blow-by oxygen as needed. Keep the baby warm, dry, and place skin-to-skin against mother's chest covered with warm dry blankets.",
      "note": "Compressions stopped."
    },
    {
      "time": "00:05:00",
      "speaker": "EMT CANDIDATE",
      "speech": "CALCULATE 5-MINUTE APGAR SCORE: Appearance: pink trunk, blue hands/feet (acrocyanosis) = 1; Pulse: 130 bpm (>100) = 2; Grimace: vigorous cry on stimulation = 2; Activity: active flexion = 2; Respiration: 44 breaths/min strong = 2. Total 5-minute APGAR is 9 out of 10!",
      "note": "APGAR 9/10 calculated!"
    },
    {
      "time": "00:05:25",
      "speaker": "EMT CANDIDATE",
      "speech": "Contacting Medical Control / Neonatal ICU: 'Medical Control, this is EMT Candidate on Medic 4. Emergent transport with full-term newborn boy following precipitous home delivery with thick meconium. Initial 1-minute APGAR 1 (apneic, limp, HR 50). Successfully resuscitated per NRP guidelines: warm, dry, sniffing position, suctioned mouth then nose, 30 seconds PPV, followed by 60 seconds of 3:1 compressions and ventilations with 100% O2. Return of Spontaneous Circulation: Current HR 130, spontaneous vigorous cry, 5-minute APGAR 9. Baby is warm and skin-to-skin with mother. Requesting NICU team alert for meconium aspiration monitoring at Regional Children's Hospital.'",
      "note": "NICU alert."
    },
    {
      "time": "00:06:10",
      "speaker": "PROCTOR (MED CONTROL)",
      "speech": "Medic 4, magnificent neonatal resuscitation. Children's Hospital NICU team is standing by.",
      "note": "Hospital ready."
    },
    {
      "time": "00:06:22",
      "speaker": "EMT CANDIDATE",
      "speech": "Neonatal Intensive Care Hand-Off Report: 'This is Infant Boy Miller, 10 minutes old, full term, delivered precipitously at home into thick meconium. Initial presentation: completely flaccid, apneic, cyanotic, precordial HR 50 bpm (1-min APGAR 1). Managed via NRP: cleared airway with bulb syringe mouth then nose, dried and stimulated, PPV initiated at 40-60/min for 30s. Heart rate remained 50 bpm, so coordinated 3:1 compressions and 100% ventilations initiated using two-thumb encircling technique for 60s. ROSC achieved: spontaneous cry, HR 130, RR 44, 5-min APGAR 9. Maintained normothermic on mother's chest. Prepped for NICU observation and blood gas evaluation.'",
      "note": "ALS SBAR hand-off."
    },
    {
      "time": "00:07:20",
      "speaker": "PROCTOR",
      "speech": "Flawless neonatal resuscitation. Full score awarded. Station passed.",
      "note": "Station passed."
    }
  ],
  "handOffReport": "Infant Boy Miller, full-term newborn, precipitous delivery with thick meconium. Presented limp, apneic, cyanotic, HR 50 bpm (1-min APGAR 1). Executed NRP protocol: suctioned mouth then nose, dried/warmed, 30s PPV at 40-60/min. Due to persistent HR < 60 bpm, executed 3:1 chest compressions with 100% O2 using two-thumb technique for 60s. Full ROSC achieved: vigorous crying, HR 130, RR 44, 5-min APGAR 9. Maintained warm skin-to-skin for NICU transfer.",
  "reassessmentVitals": {
    "hr": "128 bpm (rapid recovery following effective PPV and 3:1 compressions)",
    "rr": "44 breaths/min (vigorous spontaneous respirations, loud lusty cry!)",
    "spo2": "88% at 5 minutes (normal physiologic target for 5-minute newborn)",
    "muscle_tone": "Active flexion, kicking legs",
    "color": "Pink trunk, mild acrocyanosis (pink body, blue hands/feet)",
    "apgar_5min": "8 out of 10"
  }
},
];