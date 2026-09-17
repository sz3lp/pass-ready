# Part 2: remaining skills + assemble skills.ts
from pathlib import Path
import json

def S(text, critical=False, note=False):
    d = {"text": text}
    if critical:
        d["critical"] = True
    if note:
        d["evaluatorNote"] = True
    return d

skills = json.loads(Path(r"C:\Users\lukep\.cursor\OpenFart\crew80\scripts\_skills_batch1.json").read_text(encoding="utf-8"))

# ---- #21 Trauma assessment ----
skills.append({
  "id": "s21", "sheet": "#21", "name": "Patient Assessment / Management – Trauma",
  "block": 3, "minutes": 10, "passingScore": 34, "totalPoints": 42,
  "setup": "WA DOH 530-226 skill sheet #21. Max time *10 minutes. Passing score 34/42 (at least 80%). PRIMARY SURVEY / RESUSCITATION must be completed prior to the secondary assessment. Areas denoted by “**” may be integrated within sequence of Primary Survey/Resuscitation.",
  "steps": [
    S("Takes or verbalizes appropriate PPE precautions", True),
    S("SCENE SIZE-UP", note=True),
    S("Determines the scene/situation is safe", True),
    S("Determines mechanism of injury/nature of illness"),
    S("Determines the number of patients"),
    S("Requests additional EMS assistance if necessary"),
    S("Considers stabilization of the spine", True),
    S("PRIMARY SURVEY / RESUSCITATION (Must be completed prior to the secondary assessment)", note=True),
    S("Verbalizes general impression of patient"),
    S("Determines responsiveness/level of consciousness"),
    S("Determines chief complaint/apparent life threats", True),
    S("Airway — Opens and assesses airway", True),
    S("Airway — Inserts adjunct as indicated"),
    S("Breathing — Assess breathing", True),
    S("Breathing — Assures adequate ventilation", True),
    S("Breathing — Initiates appropriate oxygen therapy", True),
    S("Breathing — Manages any injury which may compromise breathing/ventilation", True),
    S("Circulation — Checks pulse"),
    S("Circulation — Assesses skin (either skin color, temperature, or condition)"),
    S("Circulation — Assesses for and controls major bleeding if present", True),
    S("Circulation — Initiates shock management (positions patient properly, conserves body heat)", True),
    S("Identifies patient priority and makes treatment/transport decision (based upon GCS/Trauma Triage Tool)", True),
    S("HISTORY TAKING", note=True),
    S("Obtains baseline vital signs (must include BP, P, and R)"),
    S("Attempts to obtain SAMPLE history"),
    S("SECONDARY ASSESSMENT — Areas denoted by “**” may be integrated within sequence of Primary Survey/Resuscitation", note=True),
    S("Head — Inspects and palpates scalp and ears**"),
    S("Head — Assesses eyes"),
    S("Head — Inspects mouth**, nose**, and assesses facial area"),
    S("Neck** — Checks position of trachea"),
    S("Neck** — Checks jugular veins"),
    S("Neck** — Palpates cervical spine"),
    S("Chest** — Inspects chest"),
    S("Chest** — Palpates the chest"),
    S("Chest** — Auscultates chest"),
    S("Abdomen/pelvis** — Inspects and palpates abdomen"),
    S("Abdomen/pelvis** — Assesses pelvis"),
    S("Abdomen/pelvis** — Verbalizes assessment of genitalia/perineum as needed"),
    S("Lower extremities** — Inspects, palpates, and assesses motor, sensory and distal circulatory functions (1 point/leg)"),
    S("Upper extremities — Inspects, palpates, and assesses motor, sensory and distal circulatory functions (1 point/arm)"),
    S("Posterior thorax, lumbar and buttocks** — Inspects and palpates posterior thorax"),
    S("Posterior thorax, lumbar and buttocks** — Inspects and palpates lumbar and buttocks areas"),
    S("Manages secondary injuries and wounds appropriately"),
    S("REASSESSMENT — Demonstrates how and when to reassess the patient"),
  ],
  "failFast": [
    "Failure to initiate or call for transport of the patient within 10 minute time limit",
    "Failure to take or verbalize appropriate PPE precautions",
    "Failure to determine scene safety",
    "Failure to assess for and provide spinal protection when indicated",
    "Failure to voice and ultimately provide high concentration oxygen",
    "Failure to assess/provide adequate ventilation",
    "Failure to find or appropriately manage problems associated with airway, breathing, hemorrhage or shock",
    "Failure to differentiate patient’s need for immediate transportation versus continued assessment/treatment at the scene",
    "Performs other assessment before assessing/treating threats to airway, breathing and circulation",
    "Failure to manage the patient as a competent EMS provider",
    "Exhibits unacceptable affect with patient or other personnel",
    "Uses or orders a dangerous or inappropriate intervention",
  ],
})

# ---- #25 CPR/AED ----
skills.append({
  "id": "s25", "sheet": "#25", "name": "Cardiac Arrest Management / AED",
  "block": 3, "minutes": 10, "passingScore": 16, "totalPoints": 19,
  "setup": "WA DOH 530-226 skill sheet #25. Max time 10 minutes. Passing score 16/19 (at least 80%).",
  "steps": [
    S("Takes or verbalizes appropriate PPE precautions", True),
    S("Determines the scene/situation is safe"),
    S("Attempts to question any bystanders about arrest events"),
    S("Checks patient responsiveness"),
    S("Direct assistant to retrieve AED"),
    S("Checks breathing and pulse simultaneously — Assesses patient for signs of breathing [observes the patient and determines the absence of breathing or abnormal breathing (gasping or agonal respirations)]"),
    S("Checks breathing and pulse simultaneously — Checks carotid pulse [no more than 10 seconds]"),
    S('NOTE: After checking responsiveness, then checking breathing and pulse for no more than 10 seconds, evaluator informs the candidate, "The patient is unresponsive, apneic and pulseless".', note=True),
    S("Requests additional EMS assistance"),
    S("Immediately begins chest compressions (adequate depth and rate; allows the chest to recoil completely)", True),
    S("Performs 2 minutes of high quality, 1-rescuer adult CPR — Adequate depth and rate", True),
    S("Performs 2 minutes of high quality, 1-rescuer adult CPR — Correct compression-to-ventilation ratio", True),
    S("Performs 2 minutes of high quality, 1-rescuer adult CPR — Allows the chest to recoil completely", True),
    S("Performs 2 minutes of high quality, 1-rescuer adult CPR — Adequate volumes for each breath", True),
    S("Performs 2 minutes of high quality, 1-rescuer adult CPR — Minimal interruptions of no more than 10 seconds throughout", True),
    S("NOTE: After 2 minutes (5 cycles), candidate assesses patient and second rescuer resumes compressions while candidate operates AED.", note=True),
    S("Turns on power to AED", True),
    S("Follows prompts and correctly attaches AED to patient", True),
    S("Stops CPR and ensures all individuals are clear of the patient during rhythm analysis", True),
    S("Ensures that all individuals are clear of the patient and delivers shock from AED", True),
    S("Immediately directs rescuer to resume chest compressions", True),
  ],
  "failFast": [
    "Failure to take or verbalize appropriate PPE precautions",
    "Failure to check responsiveness, then check breathing and pulse simultaneously for no more than 10 seconds",
    "Failure to immediately begin chest compressions as soon as pulselessness is confirmed",
    "Failure to demonstrate acceptable high quality, 1-rescuer adult CPR",
    "Interrupts CPR for more than 10 seconds at any point",
    "Failure to correctly attach the AED to the patient",
    "Failure to operate the AED properly",
    "Failure to deliver shock in a timely manner",
    "Failure to assure that all individuals are clear of patient during rhythm analysis and before delivering shock (verbalizes “All clear” and observes)",
    "Failure to immediately resume compressions after shock delivered",
    "Failure to manage the patient as a competent EMS provider",
    "Exhibits unacceptable affect with patient or other personnel",
    "Uses or orders a dangerous or inappropriate intervention",
  ],
})

# ---- #57 ASA ----
skills.append({
  "id": "s57", "sheet": "#57", "name": "Aspirin Administration",
  "block": 3, "minutes": 5, "passingScore": 10, "totalPoints": 12,
  "setup": "WA DOH 530-226 skill sheet #57. Max time 5 minutes. Passing score 10/12 (at least 80%).",
  "steps": [
    S("Takes or verbalizes appropriate PPE precautions", True),
    S("Verbalizes administration of oxygen to the patient as needed"),
    S("Appropriately determines the need for aspirin – (Asks patient about signs/symptoms, allergies, medications, last oral intake, events)", True),
    S("Obtains history about onset, provocation, quality, radiation, severity and time of pain"),
    S("Obtains vital signs-R, P, BP, pupils, skin"),
    S("Rechecks if patient is allergic to aspirin", True),
    S("Asks if patient has already taken aspirin for this event (determines appropriate dose)"),
    S("Contacts medical direction for authorization as indicated per local protocol"),
    S("Checks medication for expiration date", True),
    S("Administers medication appropriately, assuring patient chews the aspirin"),
    S("Verbalizes proper documentation of medication administration"),
    S("Verbalizes reassessment of the patient"),
  ],
  "failFast": [
    "Failure to take or verbalize appropriate PPE precautions",
    "Failure to appropriately determine the need for aspirin",
    "Failure to recheck if patient is allergic to any medication",
    "Failure to check medication for expiration date",
    "Failure to manage the patient as a competent EMS provider",
    "Exhibits unacceptable affect with patient or other personnel",
    "Uses or orders a dangerous or inappropriate intervention",
  ],
})

# ---- #65 NTG ----
skills.append({
  "id": "s65", "sheet": "#65", "name": "Nitroglycerin Administration",
  "block": 3, "minutes": 5, "passingScore": 12, "totalPoints": 14,
  "setup": "WA DOH 530-226 skill sheet #65. Max time 5 minutes. Passing score 12/14 (at least 80%).",
  "steps": [
    S("Takes or verbalizes appropriate PPE precautions", True),
    S("Verbalizes administration of oxygen to the patient as needed"),
    S("Appropriately determines the need for nitroglycerin", True),
    S("Obtains history about onset, provocation, quality, radiation, severity and time of pain"),
    S("Asks about signs/ symptoms, allergies, medications, last oral intake, events"),
    S("Obtains vital signs-R, P, BP, pupils, skin, and pain scale"),
    S("Determines if patient has nitroglycerin, has any been taken for this event, and if maximum dose has been met", True),
    S("Obtains patient’s medication, and assures medication is prescribed for the patient", True),
    S("Asks about use of erectile dysfunction or pulmonary hypertension medications within past 48 hours", True),
    S("Contacts medical direction for authorization as indicated per local protocol"),
    S("Checks medication for expiration date", True),
    S("Administers medication appropriately"),
    S("Verbalizes proper documentation of medication administration"),
    S("Verbalizes reassessment of the patient, including asking about tingling under the tongue, headache and relief of pain"),
  ],
  "failFast": [
    "Failure to take or verbalize appropriate PPE precautions",
    "Failure to appropriately determine the need for nitroglycerin",
    "Failure to determine if patient has nitroglycerin, has any been taken for this event, and if maximum dose has been met",
    "Failure to assure medication is prescribed to the patient",
    "Failure to ask about use of erectile dysfunction or pulmonary hypertension medications within past 48 hours",
    "Failure to check medication for expiration date",
    "Failure to manage the patient as a competent EMS provider",
    "Exhibits unacceptable affect with patient or other personnel",
    "Uses or orders a dangerous or inappropriate intervention",
  ],
})

# ---- #61 Oral glucose ----
skills.append({
  "id": "s61", "sheet": "#61", "name": "Oral Glucose Administration",
  "block": 3, "minutes": 5, "passingScore": 8, "totalPoints": 10,
  "setup": "WA DOH 530-226 skill sheet #61. Max time 5 minutes. Passing score 8/10 (at least 80%).",
  "steps": [
    S("Takes or verbalizes appropriate PPE precautions", True),
    S("Asks about signs/ symptoms, allergies, medications, last oral intake, events"),
    S("Obtains vital signs-R,P, BP, pupils, skin,( blood glucose test if available)"),
    S("Assures patient is displaying signs/symptoms of altered mental status/hypoglycemia"),
    S("Assesses patient’s mental status and ensures the patient can swallow", True),
    S("Contacts medical direction for authorization as indicated per local protocol"),
    S("Checks medication for expiration date and concentration"),
    S("Administers tube of glucose properly- by either placing glucose on tongue depressor and inserting it between the cheek and gum, or by allowing patient to squeeze tube into his/her mouth"),
    S("Verbalizes proper documentation of medication administration"),
    S("Verbalizes reassessment of the patient, including assessing mental status", True),
  ],
  "failFast": [
    "Failure to take or verbalize appropriate PPE precautions",
    "Failure to assess patient’s mental status and ability to swallow",
    "Failure to reassess patient after administration, to include patient’s mental status",
    "Failure to manage the patient as a competent EMS provider",
    "Exhibits unacceptable affect with patient or other personnel",
    "Uses or orders a dangerous or inappropriate intervention",
  ],
})

# ---- #73 BGL ----
skills.append({
  "id": "s73", "sheet": "#73", "name": "Blood Glucometer",
  "block": 3, "minutes": 5, "passingScore": 8, "totalPoints": 10,
  "setup": "WA DOH 530-226 skill sheet #73. Max time 5 minutes. Passing score 8/10 (at least 80%). Note to evaluator: “Turns on glucometer and inserts test strip”, if glucometer is operated per manufacturer recommendations award point.",
  "steps": [
    S("Takes or verbalizes appropriate PPE precautions", True),
    S("Identifies the need for obtaining a blood glucose level"),
    S("Selects, checks and assembles supplies and equipment (glucometer, test strip, needle or spring loaded device, alcohol swab)"),
    S("Turns on glucometer and inserts test strip"),
    S("Preps the patient’s fingertip with alcohol prep"),
    S("Lances the prepped site with needle/lancet device, drawing capillary blood"),
    S("Disposes/verbalizes disposal of needle/lancet in appropriate container", True),
    S("Expresses blood sample and transfers it to the test strip, according to manufacturer’s instructions", True),
    S("Applies pressure and dresses fingertip wound"),
    S("Records reading from glucometer and documents appropriately", True),
  ],
  "failFast": [
    "Failure to take or verbalize appropriate PPE precautions",
    "Failure to dispose of blood contaminated sharps immediately at the point of use",
    "Contaminates equipment or site without appropriately correcting situation",
    "Failure to obtain a viable capillary blood sample on first attempt",
    "Failure to appropriately read the glucometer reading",
    "Failure to manage the patient as a competent EMS provider",
    "Exhibits unacceptable affect with patient or other personnel",
    "Uses or orders a dangerous or inappropriate intervention",
  ],
})

# ---- #13 Medical ----
skills.append({
  "id": "s13", "sheet": "#13", "name": "Patient Assessment / Management – Medical – EMR/EMT",
  "block": 4, "minutes": 15, "passingScore": 34, "totalPoints": 42,
  "setup": "WA DOH 530-226 skill sheet #13. Max time *15 minutes. Passing score 34/42 (at least 80%).",
  "steps": [
    S("Takes or verbalizes appropriate PPE precautions", True),
    S("SCENE SIZE-UP", note=True),
    S("Determines the scene/situation is safe", True),
    S("Determines mechanism of injury/nature of illness"),
    S("Determines the number of patients"),
    S("Requests additional EMS assistance if necessary"),
    S("Considers stabilization of spine"),
    S("PRIMARY SURVEY / RESUSCITATION", note=True),
    S("Verbalizes general impression of the patient"),
    S("Determines responsiveness/level of consciousness (AVPU)"),
    S("Determines chief complaint/apparent life threats"),
    S("Assesses airway and breathing — Assessment", True),
    S("Assesses airway and breathing — Assures adequate ventilation", True),
    S("Assesses airway and breathing — Initiates appropriate oxygen therapy", True),
    S("Assesses circulation — Assesses/controls major bleeding", True),
    S("Assesses circulation — Checks pulse"),
    S("Assesses circulation — Assesses skin (either skin color, temperature, or condition)"),
    S("Identifies patient priority and makes treatment/transport decision", True),
    S("HISTORY TAKING", note=True),
    S("History of present illness — Onset"),
    S("History of present illness — Provocation"),
    S("History of present illness — Quality"),
    S("History of present illness — Radiation"),
    S("History of present illness — Severity"),
    S("History of present illness — Time"),
    S("History of present illness — Clarifying questions of associated signs and symptoms related to OPQRST"),
    S("Past medical history — Allergies"),
    S("Past medical history — Medications"),
    S("Past medical history — Past pertinent history"),
    S("Past medical history — Last oral intake"),
    S("Past medical history — Events leading to present illness"),
    S("SECONDARY ASSESSMENT — Assesses affected body part/system (Cardiovascular, Neurological, Integumentary, Reproductive, Pulmonary, Musculoskeletal, GI/GU, Psychological/Social)"),
    S("VITAL SIGNS — Blood Pressure", True),
    S("VITAL SIGNS — Pulse", True),
    S("VITAL SIGNS — Respiratory rate and quality"),
    S("States field impression of patient"),
    S("Interventions (verbalizes proper interventions/treatment)"),
    S("REASSESSMENT — Demonstrates how and when to reassess the patient to determine changes in condition"),
    S("Provides accurate verbal report arriving EMS unit or receiving facility"),
  ],
  "failFast": [
    "Failure to initiate or call for transport of the patient within 15 minute time limit",
    "Failure to take or verbalize appropriate PPE precautions",
    "Failure to determine scene safety before approaching patient",
    "Failure to voice and ultimately provide appropriate oxygen therapy",
    "Failure to assess/provide adequate ventilation",
    "Failure to find or appropriately manage problems associated with airway, breathing, hemorrhage or shock",
    "Failure to differentiate patient’s need for immediate transportation versus continued assessment or treatment at the scene",
    "Performs secondary examination before assessing and treating threats to airway, breathing and circulation",
    "Failure to provide an accurate report to arriving EMS unit or receiving facility",
    "Failure to manage the patient as a competent EMS provider",
    "Exhibits unacceptable affect with patient or other personnel",
    "Uses or orders a dangerous or inappropriate intervention",
  ],
})

# ---- #63 Narcan ----
skills.append({
  "id": "s63", "sheet": "#63", "name": "Naloxone (Narcan) Administration IN",
  "block": 4, "minutes": 5, "passingScore": 8, "totalPoints": 9,
  "kcNote": "King County: airway/BVM first for the apneic opioid patient — Narcan is not a substitute for ventilations. Follow local protocol for dose.",
  "setup": "WA DOH 530-226 skill sheet #63. Max time 5 minutes. Passing score 8/9 (at least 80%).",
  "steps": [
    S("Takes or verbalizes appropriate PPE precautions", True),
    S("Appropriately determines the need for naloxone (Patient exhibits respiratory depression, coma suspected to be induced by opiate/narcotic)", True),
    S("Obtains vital signs-R, P, BP, pupils, skin,( blood glucose test if available)"),
    S("Contacts medical direction for authorization as indicated per local protocol"),
    S("Verbalizes the appropriate dosage for the patient per local protocol", True),
    S("Checks medication for expiration date"),
    S("Properly administers medication: Device pre-assembled — Insert tip of nozzle in nostril — Press plunger briskly; OR Syringe w/ mucosal atomization device — Draw up appropriate dose into syringe or assemble the prefilled syringe — Place the MAD onto syringe — Insert MAD into nostril — Press syringe plunger briskly", True),
    S("Verbalizes proper documentation of medication administration"),
    S("Verbalizes reassessment of the patient", True),
  ],
  "failFast": [
    "Failure to take or verbalize appropriate PPE precautions",
    "Failure to appropriately determine the need for naloxone",
    "Failure to verbalize appropriate dosage for the patient per local protocol",
    "Failure to properly administer the medication",
    "Failure to verbalize reassessment of the patient",
    "Failure to manage the patient as a competent EMS provider",
    "Exhibits unacceptable affect with patient or other personnel",
    "Uses or orders a dangerous or inappropriate intervention",
  ],
})

# ---- #69 IM ----
skills.append({
  "id": "s69", "sheet": "#69", "name": "IM Medication Administration from an Amp/Vial",
  "block": 4, "minutes": 5, "passingScore": 16, "totalPoints": 20,
  "kcNote": "King County Check & Inject: epinephrine 1 mg/mL (1:1000) IM — typically adult 0.3 mg / peds 0.15 mg per sheet/protocol. Confirm concentration before you draw.",
  "setup": "WA DOH 530-226 skill sheet #69. Max time 5 minutes. Passing score 16/20 (at least 80%).",
  "steps": [
    S("Selects, checks, and assembles supplies [medication, syringe, needle(s), sharps, alcohol swabs, band-aid/sterile gauze]"),
    S("Appropriately determines the patient’s need for the medication"),
    S("Selects correct medication (concentration)", True),
    S("Checks medication for expiration date", True),
    S("Checks medication for cloudiness or discoloration", True),
    S("Assembles proper needle and syringe", True),
    S("Opens vial or ampule correctly"),
    S("Draws up the correct amount of medication, and dispels air while maintaining sterility", True),
    S("Reconfirms medication, patient, route, dosage"),
    S("Takes or verbalizes appropriate PPE precautions", True),
    S("Explains procedure to the patient"),
    S("Selects and cleans the appropriate injection site", True),
    S("Inserts needle at a 90 degree angle (Intramuscular)", True),
    S("Aspirates syringe while observing for blood return before injecting IM medication (verbalizes if blood is seen, syringe/needle would be withdrawn and procedure redone)", True),
    S("Injects medication appropriately", True),
    S("Withdraws needle and applies pressure over injection site", True),
    S("Properly discards needle in appropriate container", True),
    S("Covers puncture site"),
    S("Verbalizes proper documentation of medication administration"),
    S("Verbalizes reassessment of patient for desired and adverse effects of medication", True),
  ],
  "failFast": [
    "Failure to take or verbalize appropriate PPE precautions before injection",
    "Failure to select correct medication concentration",
    "Failure to check medication for expiration date",
    "Failure to check medication for cloudiness or discoloration",
    "Failure to assemble proper needle and syringe",
    "Failure to draw up correct amount of medication",
    "Failure to select and clean appropriate injection site",
    "Failure to insert needle at a 90 degree angle (Intramuscular)",
    "Failure to aspirate for blood prior to injecting medication",
    "Failure to inject the medication appropriately",
    "Failure to withdraw needle and apply pressure over injection site",
    "Failure to properly discard needle in appropriate container",
    "Failure to manage the patient as a competent EMS provider",
    "Exhibits unacceptable affect with patient or other personnel",
    "Uses or orders a dangerous or inappropriate intervention",
  ],
})

# ---- #94 Major Medical ----
skills.append({
  "id": "s94", "sheet": "#94", "name": "COMPREHENSIVE EVALUATION Major Medical",
  "block": "final", "minutes": 12, "passingScore": 0, "totalPoints": 0,
  "setup": "WA DOH 530-226 skill sheet #94. Objective: Given a team approach, appropriate equipment and a patient with a major medical emergency, demonstrate appropriate assessment and treatment as outlined in the approved guidelines.",
  "steps": [
    S("Scene Size-up (MUST VERBALIZE)", note=True),
    S("PPE Precautions"),
    S("Scene Safety"),
    S("Determines NOI"),
    S("# of Pts"),
    S("Additional Resources"),
    S("Primary Assessment (MUST VERBALIZE)", note=True),
    S("Mental Status"),
    S("Chief Complaint"),
    S("Airway"),
    S("Breathing"),
    S("Circulation"),
    S("Skin Signs"),
    S("Body Position"),
    S("Appropriate General Impression"),
    S("Subjective (history)", note=True),
    S("Establishes rapport with patient (reassures and calms) and obtains consent to treat (implied/actual)"),
    S("Determines patient’s chief complaint"),
    S("Thoroughly investigates patient history, NOI (follows SAMPLE and OPQRST investigation)"),
    S("Obtains names/dosages of current medications and if any were taken (if possible)"),
    S("Objective (physical exam)", note=True),
    S("Records and documents baseline vital signs - listens to lung sounds and compares sides"),
    S("Performs appropriate medical assessment based on clinical presentation"),
    S("Appreciates patient’s body position (distressed, tripod, normal)"),
    S("Obtains second set of vital signs and compares to baseline"),
    S("Assessment (impression)", note=True),
    S("Verbalizes to evaluator what ‘you think is going on’"),
    S("Determines the need for immediate transport — states rationale"),
    S("Plan (treatment) — GENERAL CARE", note=True),
    S("Properly positions patient"),
    S("Administers appropriate rate and delivery of oxygen (as indicated)"),
    S("Properly ventilates patient with a BVM (if indicated)"),
    S("Suctions airway (if indicated)"),
    S("Considers/uses medications appropriately (if indicated)"),
    S("Monitors patient vital signs"),
    S("Considers Index of Suspicion (IOS) and states rationale"),
    S("Performs reassessment"),
    S("Properly performs other care/treatment (as indicated)"),
    S("Communication — Delivers accurate and effective verbal report (if indicated)"),
  ],
  "failFast": [
    "DID NOT… Take/verbalize PPE Precautions",
    "DID NOT… Appropriately manage airway, breathing, shock",
    "DID NOT… Administer appropriate rate and delivery of oxygen (if indicated)",
    "DID NOT… Determine the need for immediate transport",
  ],
})

# ---- #96 Major Trauma ----
skills.append({
  "id": "s96", "sheet": "#96", "name": "COMPREHENSIVE EVALUATION Major Trauma",
  "block": "final", "minutes": 12, "passingScore": 0, "totalPoints": 0,
  "setup": "WA DOH 530-226 skill sheet #96. Objective: Given a team approach, appropriate equipment and a patient with major trauma, demonstrate appropriate assessment and treatment as outlined in the approved guidelines.",
  "steps": [
    S("Scene Size-up (MUST VERBALIZE)", note=True),
    S("PPE Precautions"),
    S("Scene Safety"),
    S("Determines MOI"),
    S("# of Pts"),
    S("Additional Resources"),
    S("Primary Assessment (MUST VERBALIZE)", note=True),
    S("Mental Status"),
    S("Chief Complaint"),
    S("Airway"),
    S("C-spine"),
    S("Breathing"),
    S("Circulation"),
    S("Bleeding"),
    S("Obvious Trauma"),
    S("Body Position"),
    S("Appropriate General Impression"),
    S("Subjective (history)", note=True),
    S("Establishes rapport with patient (reassures and calms) and obtains consent to treat (implied/actual)"),
    S("Determines patient’s chief complaint and follows SAMPLE and OPQRST investigation"),
    S("Determines mechanism of injury (MOI) as soon as possible – considers NOI and acts accordingly"),
    S("Obtains names/dosages of current medications and if any were taken (if possible)"),
    S("Objective (physical exam)", note=True),
    S("Records and documents baseline vital signs - listens to lung sounds and compares sides"),
    S("Performs proper trauma exam based on clinical presentation: exposes/checks for bleeding and/or injuries"),
    S("Assesses pulse, sensation, and movement before and after wound care/splinting (as indicated)"),
    S("Obtains second set of vital signs and compares to baseline"),
    S("Assessment (impression)", note=True),
    S("Verbalizes to evaluator what ‘you think is going on’"),
    S("Determines the need for immediate transport — states rationale"),
    S("Plan (treatment) — GENERAL CARE", note=True),
    S("Applies proper and immediate bleeding control technique: direct pressure, pressure dressing, tourniquet"),
    S("Provides immediate fracture stabilization (if indicated)"),
    S("Administers appropriate rate and delivery of oxygen (as indicated)"),
    S("Appropriately applies splint"),
    S("Properly positions patient"),
    S("Initiates steps to prevent heat loss"),
    S("Monitors patient’s vital signs"),
    S("Considers Index of Suspicion (IOS) and states rationale"),
    S("Performs reassessment"),
    S("Proper spinal immobilization"),
    S("Bag-valve-mask (BVM) use"),
    S("Suction (as needed)"),
    S("Communication — Delivers accurate and effective verbal report (if indicated)"),
  ],
  "failFast": [
    "DID NOT… Take/verbalize PPE Precautions",
    "DID NOT… Appropriately manage airway, breathing, shock",
    "DID NOT… Administer appropriate rate and delivery of oxygen (if indicated)",
    "DID NOT… Determine the need for immediate transport",
  ],
})

def emit_step(s):
    parts = [f'text: {json.dumps(s["text"], ensure_ascii=False)}']
    if s.get("critical"):
        parts.append("critical: true")
    if s.get("evaluatorNote"):
        parts.append("evaluatorNote: true")
    return "{ " + ", ".join(parts) + " }"

def emit_skill(sk):
    steps = ",\n      ".join(emit_step(s) for s in sk["steps"])
    fails = ",\n      ".join(json.dumps(f, ensure_ascii=False) for f in sk["failFast"])
    kc = f'\n    kcNote: {json.dumps(sk["kcNote"], ensure_ascii=False)},' if sk.get("kcNote") else ""
    block = json.dumps(sk["block"]) if isinstance(sk["block"], str) else str(sk["block"])
    return f'''  {{
    id: {json.dumps(sk["id"])},
    sheet: {json.dumps(sk["sheet"])},
    name: {json.dumps(sk["name"], ensure_ascii=False)},
    block: {block},
    minutes: {sk["minutes"]},
    source: "WA DOH 530-226 (January 2022)",
    passingScore: {sk["passingScore"]},
    totalPoints: {sk["totalPoints"]},{kc}
    setup: {json.dumps(sk["setup"], ensure_ascii=False)},
    steps: [
      {steps}
    ],
    failFast: [
      {fails}
    ],
  }}'''

header = '''export type SkillStep = {
  text: string
  critical?: boolean
  /** Evaluator NOTE / prompt lines from the DOH sheet — not scored checkboxes. */
  evaluatorNote?: boolean
}

export type Skill = {
  id: string
  sheet: string
  name: string
  block: 1 | 2 | 3 | 4 | "final"
  minutes: number
  source: string
  passingScore: number
  totalPoints: number
  kcNote?: string
  setup: string
  steps: SkillStep[]
  failFast: string[]
}

/** Verbatim checklists from WA DOH 530-226 EMR, EMT & AEMT Practical Evaluation Skill Sheets (January 2022).
 *  https://doh.wa.gov/sites/default/files/2022-02/530226.pdf
 *  KC protocol notes live only in kcNote — not in the scored checklist text.
 */
export const SKILLS: Skill[] = [
'''

footer = '''
]

export function skillsForBlock(block: 1 | 2 | 3 | 4 | "final") {
  return SKILLS.filter((s) => s.block === block)
}
'''

out = header + ",\n".join(emit_skill(s) for s in skills) + footer
path = Path(r"C:\Users\lukep\.cursor\OpenFart\crew80\src\data\skills.ts")
path.write_text(out, encoding="utf-8")
print("wrote", path, "skills", len(skills), "chars", len(out))
for s in skills:
    print(s["id"], s["sheet"], len(s["steps"]), "steps", sum(1 for x in s["steps"] if x.get("critical")), "crit")
