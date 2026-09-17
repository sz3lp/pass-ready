# Generate skills.ts from curated WA DOH 530-226 verbatim checklists
from pathlib import Path
import json

def S(text, critical=False, note=False):
    d = {"text": text}
    if critical:
        d["critical"] = True
    if note:
        d["evaluatorNote"] = True
    return d

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
    return f'''  {{
    id: {json.dumps(sk["id"])},
    sheet: {json.dumps(sk["sheet"])},
    name: {json.dumps(sk["name"], ensure_ascii=False)},
    block: {json.dumps(sk["block"]) if isinstance(sk["block"], str) else sk["block"]},
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

skills = []

# ---- #7 BVM ----
skills.append({
  "id": "s7", "sheet": "#7", "name": "BVM Ventilation of an Apneic Adult Patient",
  "block": 1, "minutes": 5, "passingScore": 13, "totalPoints": 16,
  "setup": "WA DOH 530-226 skill sheet #7. Max time 5 minutes. Passing score 13/16 (at least 80%).",
  "steps": [
    S("Takes or verbalizes appropriate PPE precautions", True),
    S("Checks responsiveness", True),
    S("Requests additional EMS assistance"),
    S("Checks breathing and pulse simultaneously", True),
    S('NOTE: After checking responsiveness, then checking breathing and pulse for no more than 10 seconds, evaluator informs candidate, "The patient is unresponsive, apneic and has a weak pulse of 60."', note=True),
    S("Opens airway properly"),
    S('NOTE: The evaluator must now inform the candidate, "The mouth is full of secretions and vomitus."', note=True),
    S("Prepares rigid suction catheter"),
    S("Turns on power to suction device or retrieves manual suction device"),
    S("Inserts rigid suction catheter without applying suction"),
    S("Suctions the mouth and oropharynx", True),
    S('NOTE: The evaluator must now inform the candidate, "The mouth and oropharynx are clear."', note=True),
    S("Opens airway manually"),
    S("Inserts oropharyngeal airway"),
    S('NOTE: The evaluator must now inform the candidate, "No gag reflex is present and the patient accepts the airway adjunct."', note=True),
    S("Ventilates the patient immediately using a BVM device unattached to oxygen (Award this point if candidate elects to ventilate initially with BVM attached to reservoir and oxygen so long as first ventilation is delivered within 30 seconds)", True),
    S("NOTE: The evaluator must now inform the candidate that ventilation is being properly performed without difficulty.", note=True),
    S("Re-checks pulse for no more than 10 seconds"),
    S("Attaches the BVM assembly (mask, bag, reservoir) to oxygen (15L/minute)", True),
    S("Ventilates the patient adequately — Proper volume to cause visible chest rise", True),
    S("Ventilates the patient adequately — Proper rate [10-12/minute (1 ventilation every 5 – 6 seconds)]", True),
    S('NOTE: The evaluator must now ask the candidate, "How would you know if you are delivering appropriate volumes with each ventilation?"', note=True),
  ],
  "failFast": [
    "After suctioning the patient, failure to initiate ventilations within 30 seconds or interrupts ventilations for greater than 30 seconds at any time",
    "Failure to take or verbalize appropriate PPE precautions",
    "Failure to suction airway before ventilating the patient",
    "Suctions the patient for an excessive and prolonged time",
    "Failure to check responsiveness, then check breathing and pulse simultaneously for no more than 10 seconds",
    "Failure to voice and ultimately provide high oxygen concentration (at least 85%)",
    "Failure to ventilate the patient at a rate of 10-12/minute (1 ventilation every 5 – 6 seconds)",
    "Failure to provide adequate volumes per breath (maximum 2 errors/minute permissible)",
    "Insertion or use of any adjunct in a manner dangerous to the patient",
    "Failure to manage the patient as a competent EMS provider",
    "Exhibits unacceptable affect with patient or other personnel",
    "Uses or orders a dangerous or inappropriate intervention",
  ],
})

# ---- #11 O2 ----
skills.append({
  "id": "s11", "sheet": "#11", "name": "Oxygen Administration by Non-Rebreather Mask",
  "block": 1, "minutes": 5, "passingScore": 9, "totalPoints": 11,
  "setup": "WA DOH 530-226 skill sheet #11. Max time 5 minutes. Passing score 9/11 (at least 80%).",
  "steps": [
    S("Takes or verbalizes appropriate PPE precautions", True),
    S("Gathers appropriate equipment"),
    S("Cracks valve on the oxygen tank"),
    S("Assembles the regulator to the oxygen tank", True),
    S("Opens the oxygen tank valve", True),
    S("Checks oxygen tank pressure"),
    S("Checks for leaks", True),
    S("Attaches non-rebreather mask to correct port of regulator"),
    S("Turns on oxygen flow to prefill reservoir bag", True),
    S("Adjusts regulator to assure oxygen flow rate of at least 10 L/minute", True),
    S("Attaches mask to patient’s face and adjusts to fit snugly", True),
  ],
  "failFast": [
    "Failure to take or verbalize appropriate PPE precautions",
    "Failure to assemble the oxygen tank and regulator without leaks",
    "Failure to prefill the reservoir bag",
    "Failure to adjust the oxygen flow rate to the non-rebreather mask of at least 10 L/minute",
    "Failure to ensure a tight mask seal to the patient’s face",
    "Failure to manage the patient as a competent EMS provider",
    "Exhibits unacceptable affect with patient or other personnel",
    "Uses or orders a dangerous or inappropriate intervention",
  ],
})

# ---- #39 SGA ----
skills.append({
  "id": "s39", "sheet": "#39", "name": "Supraglottic Airway Device",
  "block": 1, "minutes": 6, "passingScore": 15, "totalPoints": 18,
  "kcNote": "King County uses i-gel. Size to patient weight. Lubricate the back, not the bowl. Follow the DOH sheet and local protocol.",
  "setup": "WA DOH 530-226 skill sheet #39. Max attempts/time: 3 in 6 minutes. Passing score 15/18 (at least 80%).",
  "steps": [
    S("Takes or verbalizes appropriate PPE precautions", True),
    S("Opens the airway manually"),
    S("Elevates tongue, inserts simple adjunct (oropharyngeal or nasopharyngeal airway)"),
    S('NOTE: The evaluator now informs the candidate, "No gag reflex is present and the patient accepts the adjunct."', note=True),
    S("Ventilates patient immediately with a bag-valve-mask device unattached to oxygen (Award this point if candidate elects to ventilate initially with BVM attached to reservoir & oxygen so long as first ventilation is delivered within 30 seconds)", True),
    S("Ventilates patient with room air (Award this point if candidate elects to ventilate initially with BVM attached to reservoir & oxygen so long as first ventilation is delivered within 30 seconds)", True),
    S('NOTE: The evaluator now informs the candidate, "Ventilation is being performed without difficulty and the pulse oximetry indicates the patient’s blood oxygen saturation is 85%."', note=True),
    S("Attaches oxygen reservoir to bag-valve-mask device and connects to high-flow oxygen regulator (12-15 L/minute)", True),
    S("Ventilates patient at a rate of 10-12/minute (1 ventilation every 5 - 6 seconds) with appropriate volumes", True),
    S('NOTE: After 30 seconds, the evaluator auscultates and reports "Breath sounds are present and equal bilaterally, and medical direction has ordered insertion of a supraglottic airway." The evaluator or assistant must now take over ventilation.', note=True),
    S("Checks/prepares supraglottic airway device"),
    S("Lubricates distal tip of the device (may be verbalized)"),
    S("NOTE: Evaluator/assistant to remove OPA and move out of the way when candidate is prepared to insert device.", note=True),
    S("Positions head properly"),
    S("Performs a tongue-jaw lift"),
    S("Inserts device to proper depth", True),
    S("Secures device in patient [inflates cuff(s) with proper volumes as needed and immediately removes syringe or secures strap]", True),
    S("Ventilates patient and confirms proper ventilation (correct lumen and proper insertion depth) by auscultation bilaterally over lungs and over epigastrium", True),
    S("Adjusts ventilation as necessary (ventilates through additional lumen or slightly withdraws tube until ventilation is optimized)"),
    S("Verifies proper tube placement by secondary confirmation such as capnography, capnometry, EDD or colorimetric device"),
    S('NOTE: The evaluator must now ask the candidate, "How would you know if you are delivering appropriate volumes with each ventilation?"', note=True),
    S("Secures device or confirms that the device remains properly secured"),
    S("Ventilates patient at proper rate and volume while observing capnography/capnometry and pulse oximeter"),
  ],
  "failFast": [
    "Failure to take or verbalize appropriate PPE precautions",
    "Failure to initiate ventilations within 30 seconds after taking PPE precautions or interrupts ventilations for greater than 30 seconds at any time",
    "Failure to voice and ultimately provide high oxygen concentration (at least 85%)",
    "Failure to ventilate the patient at a rate of 10-12/minute (1 ventilation every 5 - 6 seconds)",
    "Failure to provide adequate volumes per breath (maximum 2 errors/minute permissible)",
    "Failure to pre-oxygenate patient prior to insertion of the supraglottic airway device",
    "Failure to insert the supraglottic airway device at a proper depth or location within 3 attempts",
    "Failure to inflate cuff(s) properly and immediately remove syringe",
    "Failure to secure the strap (if present) prior to cuff inflation",
    "Failure to confirm that patient is being ventilated properly (correct lumen and proper insertion depth) by auscultation bilaterally over lungs and over the epigastrium",
    "Insertion or use of any adjunct in a manner dangerous to the patient",
    "Failure to manage the patient as a competent EMS provider",
    "Exhibits unacceptable affect with patient or other personnel",
    "Uses or orders a dangerous or inappropriate intervention",
  ],
})

# ---- #87 NPA ----
skills.append({
  "id": "s87", "sheet": "#87", "name": "Nasopharyngeal Airway",
  "block": 1, "minutes": 5, "passingScore": 5, "totalPoints": 5,
  "setup": "WA DOH 530-226 skill sheet #87. Max time 5 minutes. Passing score 5/5 (all Critical).",
  "steps": [
    S("Takes or verbalizes appropriate PPE precautions", True),
    S("Measures and selects appropriate size airway", True),
    S("Verbalizes lubrication of the nasal airway", True),
    S("Fully inserts the airway with the bevel facing toward the septum", True),
    S("Demonstrates a patent airway by ventilating patient", True),
  ],
  "failFast": [
    "Failure to take or verbalize appropriate PPE precautions",
    "Failure to measure and select appropriate size airway",
    "Failure to verbalize lubrication of the nasal airway",
    "Failure to fully insert airway with the bevel facing toward the septum",
    "Failure to demonstrate a patent airway by ventilating the patient",
    "Failure to manage the patient as a competent EMS provider",
    "Exhibits unacceptable affect with patient or other personnel",
    "Uses or orders a dangerous or inappropriate intervention",
  ],
})

# ---- #29 Bleed ----
skills.append({
  "id": "s29", "sheet": "#29", "name": "Bleeding Control / Shock Management",
  "block": 1, "minutes": 10, "passingScore": 6, "totalPoints": 7,
  "setup": "WA DOH 530-226 skill sheet #29. Max time 10 minutes. Passing score 6/7 (at least 80%).",
  "steps": [
    S("Takes or verbalizes appropriate PPE precautions", True),
    S("Applies direct pressure to the wound"),
    S("Note: The evaluator must now inform the candidate that the wound continues to bleed.", note=True),
    S("Applies tourniquet", True),
    S("Note: The evaluator must now inform the candidate that patient is exhibiting signs and symptoms of hypoperfusion.", note=True),
    S("Properly positions the patient"),
    S("Applies high concentration oxygen", True),
    S("Initiates steps to prevent heat loss from the patient"),
    S("Indicates the need for immediate transportation", True),
  ],
  "failFast": [
    "Failure to take or verbalize appropriate PPE precautions",
    "Failure to control hemorrhage using correct procedures in a timely manner",
    "Failure to administer high concentration oxygen",
    "Failure to indicate the need for immediate transportation",
    "Failure to manage the patient as a competent EMS provider",
    "Exhibits unacceptable affect with patient or other personnel",
    "Uses or orders a dangerous or inappropriate intervention",
  ],
})

# ---- #31 Long bone ----
skills.append({
  "id": "s31", "sheet": "#31", "name": "Long Bone Immobilization",
  "block": 2, "minutes": 5, "passingScore": 8, "totalPoints": 10,
  "setup": "WA DOH 530-226 skill sheet #31. Max time 5 minutes. Passing score 8/10 (at least 80%).",
  "steps": [
    S("Takes or verbalizes appropriate PPE precautions"),
    S("Directs application of manual stabilization of the injury", True),
    S("Assesses distal motor, sensory and circulatory functions in the injured extremity", True),
    S('NOTE: The evaluator acknowledges, "Motor, sensory and circulatory functions are present and normal."', note=True),
    S("Measures splint"),
    S("Applies splint"),
    S("Immobilizes the joint above the injury site", True),
    S("Immobilizes the joint below the injury site", True),
    S("Secures the entire injured extremity"),
    S("Immobilizes the hand/foot in the position of function", True),
    S("Reassesses distal motor, sensory and circulatory functions in the injured extremity", True),
    S('Note: The evaluator acknowledges, "Motor, sensory and circulatory functions are present and normal."', note=True),
  ],
  "failFast": [
    "Failure to immediately stabilize the extremity manually",
    "Grossly moves the injured extremity",
    "Failure to immobilize the joint above and the joint below the injury site",
    "Failure to immobilize the hand or foot in a position of function",
    "Failure to reassess distal motor, sensory and circulatory functions in the injured extremity before and after splinting",
    "Failure to manage the patient as a competent EMS provider",
    "Exhibits unacceptable affect with patient or other personnel",
    "Uses or orders a dangerous or inappropriate intervention",
  ],
})

# ---- #33 Joint ----
skills.append({
  "id": "s33", "sheet": "#33", "name": "Joint Immobilization",
  "block": 2, "minutes": 5, "passingScore": 8, "totalPoints": 9,
  "setup": "WA DOH 530-226 skill sheet #33. Max time 5 minutes. Passing score 8/9 (at least 80%).",
  "steps": [
    S("Takes or verbalizes appropriate PPE precautions"),
    S("Directs application of manual stabilization of the injury", True),
    S("Assesses distal motor, sensory and circulatory functions in the injured extremity", True),
    S('NOTE: The evaluator acknowledges, "Motor, sensory and circulatory functions are present and normal."', note=True),
    S("Selects the proper splinting material"),
    S("Immobilizes the site of the injury"),
    S("Immobilizes the bone above injury site", True),
    S("Immobilizes the bone below injury site", True),
    S("Secures the entire injured extremity"),
    S("Reassesses distal motor, sensory and circulatory functions in the injured extremity", True),
    S('NOTE: The evaluator acknowledges, "Motor, sensory and circulatory functions are present and normal."', note=True),
  ],
  "failFast": [
    "Failure to immediately stabilize the extremity manually",
    "Grossly moves the injured extremity",
    "Failure to immobilize the bone above and below the injury site",
    "Failure to reassess distal motor, sensory and circulatory functions in the injured extremity before and after splinting",
    "Failure to manage the patient as a competent EMS provider",
    "Exhibits unacceptable affect with patient or other personnel",
    "Uses or orders a dangerous or inappropriate intervention",
  ],
})

# ---- #89 Traction (Sager column) ----
skills.append({
  "id": "s89", "sheet": "#89", "name": "Traction Splint Immobilization",
  "block": 2, "minutes": 10, "passingScore": 12, "totalPoints": 15,
  "setup": "WA DOH 530-226 skill sheet #89. Max time 10 minutes. Passing score 12/15 (at least 80%). Checklist below follows the Sager type pole splint column; OTD and HARE columns are on the official sheet—follow manufacturer recommendations for the device in use.",
  "steps": [
    S("Takes or verbalizes appropriate precautions", True),
    S("Directs/maintains manual stabilization of the injured leg"),
    S("Assesses distal motor, sensory and circulatory functions in the injured extremity", True),
    S('NOTE: The evaluator acknowledges, "Motor, sensory and circulatory functions are present and normal."', note=True),
    S("Indicate device used. (Depending on splint used, follow the manufacturers’ recommendations)", note=True),
    S("Prepares/adjusts splint to the proper length-pulley wheel adjacent to heel", True),
    S("Positions the splint at the injured leg-medial side", True),
    S("Applies the proximal securing device (e.g., ischial strap)", True),
    S("Applies the distal securing device (e.g., ankle harness) to patient", True),
    S("Assures the distal securing device (e.g., ankle harness) is attached to the splint", True),
    S("Applies mechanical traction, at 10% of patient’s body weight up to 15lbs.", True),
    S("Positions elastic support straps under legs"),
    S("Secure the thighs, knees and calves elastic straps", True),
    S("Applies strap to hold feet"),
    S("Re-evaluates the proximal/distal securing devices"),
    S("Reassesses distal motor, sensory and circulatory functions in the injured extremity", True),
    S('NOTE: The evaluator acknowledges, "Motor, sensory and circulatory functions are present and normal."', note=True),
    S("Verbalizes securing patient to long board to immobilize hip and secure splint", True),
  ],
  "failFast": [
    "Failure to take or verbalize appropriate precautions",
    "Failure to assess distal motor, sensory and circulatory functions in the injured extremity before splinting",
    "Failure to properly prepare/adjust splint to the proper length",
    "Failure to properly position the splint at the injured leg",
    "Failure to properly apply the proximal securing device (e.g., ischial strap)",
    "Failure to properly apply the distal securing device (e.g., ankle hitch)",
    "Failure to direct manual traction of injured leg when using the HARE type splint",
    "Failure to attach the distal securing device (e.g., ankle hitch) to the traction strap/post",
    "Failure to apply mechanical traction",
    "Failure to position/secure the support straps",
    "Failure to reassess distal pulse, sensation, and movement in the injured extremity after splinting",
    "Failure to verbalize securing the patient to a long board to immobilize hip and secure the splint",
    "Failure to manage the patient as a competent EMS provider",
    "Exhibits unacceptable affect with patient or other personnel",
    "Uses or orders a dangerous or inappropriate intervention",
  ],
})

# ---- #92 SMR ----
skills.append({
  "id": "s92", "sheet": "#92", "name": "Spinal Motion Restriction",
  "block": 2, "minutes": 10, "passingScore": 8, "totalPoints": 10,
  "setup": "WA DOH 530-226 skill sheet #92. Max time 10 minutes. Passing score 8/10 (at least 80%).",
  "steps": [
    S("Takes or verbalizes appropriate PPE precautions"),
    S("Directs assistant to maintain manual stabilization/immobilization of the head", True),
    S("Assesses motor, sensory and circulatory function in each extremity", True),
    S("Applies appropriately sized extrication collar", True),
    S("Determines need to place the patient on a rigid extrication device (scoop stretcher, long spine board, etc.)"),
    S("Assists the patient onto the EMS stretcher while ensuring minimal spinal movement", True),
    S("Removes any unnecessary rigid extrication device once the patient is on the EMS stretcher", True),
    S("Applies padding as necessary"),
    S("Secures the patient to the EMS stretcher with adequate seatbelts and strapping", True),
    S("Reassesses motor, sensory and circulatory function in each extremity", True),
  ],
  "failFast": [
    "Failure to immediately direct or take manual stabilization of the head",
    "Failure to assess motor, sensory and circulatory functions in each extremity before moving the patient",
    "Failure to properly apply appropriately sized extrication collar before moving the patient",
    "Failure to assist the patient onto the EMS stretcher while ensuring minimal spinal movement",
    "Manipulated or moved the patient excessively causing potential spinal compromise",
    "Failure to remove unnecessary rigid extrication device once the patient is on the EMS stretcher",
    "Failure to secures the patient to the EMS stretcher with adequate seatbelts and strapping",
    "Failure to reassess motor, sensory and circulatory functions in each extremity after securing the patient to the EMS stretcher",
    "Failure to manage the patient as a competent EMS provider",
    "Exhibits unacceptable affect with patient or other personnel",
    "Uses or orders a dangerous or inappropriate intervention",
  ],
})

print("batch1", len(skills))
Path(r"C:\Users\lukep\.cursor\OpenFart\crew80\scripts\_skills_batch1.json").write_text(json.dumps(skills), encoding="utf-8")
print("wrote batch1")
