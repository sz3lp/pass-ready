#!/usr/bin/env python3
"""Generate src/data/skills.ts from WA DOH 530-226 verbatim content."""

from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "src" / "data" / "skills.ts"
SOURCE = "WA DOH 530-226 (January 2022)"


def esc(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')


def step(text: str, *, critical: bool = False, evaluator_note: bool = False) -> str:
    parts = [f'text: "{esc(text)}"']
    if critical:
        parts.append("critical: true")
    if evaluator_note:
        parts.append("evaluatorNote: true")
    return "      { " + ", ".join(parts) + " },"


def arr(lines: list[str]) -> str:
    return "\n".join(f'      "{esc(x)}",' for x in lines)


def skill(
    *,
    id: str,
    sheet: str,
    name: str,
    block: str,
    minutes: int,
    setup: str,
    steps: list[str],
    fail_fast: list[str],
    passing: int,
    total: int,
    kc_note: str | None = None,
) -> str:
    block_lit = f'"{block}"' if block == "final" else str(block)
    kc = f'\n    kcNote: "{esc(kc_note)}",' if kc_note else ""
    return f"""  {{
    id: "{id}",
    sheet: "{sheet}",
    name: "{esc(name)}",
    block: {block_lit},
    minutes: {minutes},{kc}
    setup: "{esc(setup)}",
    source: "{SOURCE}",
    passingScore: {passing},
    totalPoints: {total},
    failFast: [
{arr(fail_fast)}
    ],
    steps: [
{chr(10).join(steps)}
    ],
  }},"""


COMMON_FAIL_TAIL = [
    "Failure to manage the patient as a competent EMS provider",
    "Exhibits unacceptable affect with patient or other personnel",
    "Uses or orders a dangerous or inappropriate intervention",
]

skills: list[str] = []

# ---------- s7 BVM ----------
skills.append(
    skill(
        id="s7",
        sheet="#7",
        name="BVM Ventilation of an Apneic Adult Patient",
        block="1",
        minutes=5,
        setup="WA DOH 530-226 (Jan 2022) #7–8. Apneic adult with pulse; suction then BVM. Scenario from evaluator.",
        passing=13,
        total=16,
        fail_fast=[
            "After suctioning the patient, failure to initiate ventilations within 30 seconds or interrupts ventilations for greater than 30 seconds at any time",
            "Failure to take or verbalize appropriate PPE precautions",
            "Failure to suction airway before ventilating the patient",
            "Suctions the patient for an excessive and prolonged time",
            "Failure to check responsiveness, then check breathing and pulse simultaneously for no more than 10 seconds",
            "Failure to voice and ultimately provide high oxygen concentration (at least 85%)",
            "Failure to ventilate the patient at a rate of 10-12/minute (1 ventilation every 5 – 6 seconds)",
            "Failure to provide adequate volumes per breath (maximum 2 errors/minute permissible)",
            "Insertion or use of any adjunct in a manner dangerous to the patient",
            *COMMON_FAIL_TAIL,
        ],
        steps=[
            step("Takes or verbalizes appropriate PPE precautions", critical=True),
            step("Checks responsiveness", critical=True),
            step("Requests additional EMS assistance"),
            step("Checks breathing and pulse simultaneously", critical=True),
            step(
                'NOTE: After checking responsiveness, then checking breathing and pulse for no more than 10 seconds, evaluator informs candidate, "The patient is unresponsive, apneic and has a weak pulse of 60."',
                evaluator_note=True,
            ),
            step("Opens airway properly"),
            step(
                'NOTE: The evaluator must now inform the candidate, "The mouth is full of secretions and vomitus."',
                evaluator_note=True,
            ),
            step("Prepares rigid suction catheter"),
            step("Turns on power to suction device or retrieves manual suction device"),
            step("Inserts rigid suction catheter without applying suction"),
            step("Suctions the mouth and oropharynx", critical=True),
            step(
                'NOTE: The evaluator must now inform the candidate, "The mouth and oropharynx are clear."',
                evaluator_note=True,
            ),
            step("Opens airway manually"),
            step("Inserts oropharyngeal airway"),
            step(
                'NOTE: The evaluator must now inform the candidate, "No gag reflex is present and the patient accepts the airway adjunct."',
                evaluator_note=True,
            ),
            step(
                "Ventilates the patient immediately using a BVM device unattached to oxygen (Award this point if candidate elects to ventilate initially with BVM attached to reservoir and oxygen so long as first ventilation is delivered within 30 seconds)",
                critical=True,
            ),
            step(
                "NOTE: The evaluator must now inform the candidate that ventilation is being properly performed without difficulty.",
                evaluator_note=True,
            ),
            step("Re-checks pulse for no more than 10 seconds"),
            step("Attaches the BVM assembly (mask, bag, reservoir) to oxygen (15L/minute)", critical=True),
            step("Proper volume to cause visible chest rise", critical=True),
            step("Proper rate [10-12/minute (1 ventilation every 5 – 6 seconds)]", critical=True),
            step(
                'NOTE: The evaluator must now ask the candidate, "How would you know if you are delivering appropriate volumes with each ventilation?"',
                evaluator_note=True,
            ),
        ],
    )
)

# ---------- s11 Oxygen NRB ----------
skills.append(
    skill(
        id="s11",
        sheet="#11",
        name="Oxygen Administration by Non-Rebreather Mask",
        block="1",
        minutes=5,
        setup="WA DOH 530-226 (Jan 2022) #11. Oxygen administration by non-rebreather mask only. Scenario from evaluator.",
        passing=9,
        total=11,
        fail_fast=[
            "Failure to take or verbalize appropriate PPE precautions",
            "Failure to assemble the oxygen tank and regulator without leaks",
            "Failure to prefill the reservoir bag",
            "Failure to adjust the oxygen flow rate to the non-rebreather mask of at least 10 L/minute",
            "Failure to ensure a tight mask seal to the patient's face",
            *COMMON_FAIL_TAIL,
        ],
        steps=[
            step("Takes or verbalizes appropriate PPE precautions", critical=True),
            step("Gathers appropriate equipment"),
            step("Cracks valve on the oxygen tank"),
            step("Assembles the regulator to the oxygen tank", critical=True),
            step("Opens the oxygen tank valve", critical=True),
            step("Checks oxygen tank pressure"),
            step("Checks for leaks", critical=True),
            step("Attaches non-rebreather mask to correct port of regulator"),
            step("Turns on oxygen flow to prefill reservoir bag", critical=True),
            step("Adjusts regulator to assure oxygen flow rate of at least 10 L/minute", critical=True),
            step("Attaches mask to patient's face and adjusts to fit snugly", critical=True),
        ],
    )
)

# ---------- s39 Supraglottic ----------
skills.append(
    skill(
        id="s39",
        sheet="#39",
        name="Supraglottic Airway Device",
        block="1",
        minutes=6,
        kc_note="King County uses i-gel. Size to patient; lubricate distal tip (may be verbalized). Official sheet is device-agnostic.",
        setup="WA DOH 530-226 (Jan 2022) #39–40. Supraglottic airway device. Max Attempts per Time Allowed: 3 in 6 minutes. Scenario from evaluator.",
        passing=15,
        total=18,
        fail_fast=[
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
            *COMMON_FAIL_TAIL,
        ],
        steps=[
            step("Takes or verbalizes appropriate PPE precautions", critical=True),
            step("Opens the airway manually"),
            step("Elevates tongue, inserts simple adjunct (oropharyngeal or nasopharyngeal airway)"),
            step(
                'NOTE: The evaluator now informs the candidate, "No gag reflex is present and the patient accepts the adjunct."',
                evaluator_note=True,
            ),
            step(
                "Ventilates patient immediately with a bag-valve-mask device unattached to oxygen (Award this point if candidate elects to ventilate initially with BVM attached to reservoir & oxygen so long as first ventilation is delivered within 30 seconds)",
                critical=True,
            ),
            step(
                "Ventilates patient with room air (Award this point if candidate elects to ventilate initially with BVM attached to reservoir & oxygen so long as first ventilation is delivered within 30 seconds)",
                critical=True,
            ),
            step(
                'NOTE: The evaluator now informs the candidate, "Ventilation is being performed without difficulty and the pulse oximetry indicates the patient\'s blood oxygen saturation is 85%."',
                evaluator_note=True,
            ),
            step(
                "Attaches oxygen reservoir to bag-valve-mask device and connects to high-flow oxygen regulator (12-15 L/minute)",
                critical=True,
            ),
            step(
                "Ventilates patient at a rate of 10-12/minute (1 ventilation every 5 - 6 seconds) with appropriate volumes",
                critical=True,
            ),
            step(
                'NOTE: After 30 seconds, the evaluator auscultates and reports "Breath sounds are present and equal bilaterally, and medical direction has ordered insertion of a supraglottic airway." The evaluator or assistant must now take over ventilation.',
                evaluator_note=True,
            ),
            step("Checks/prepares supraglottic airway device"),
            step("Lubricates distal tip of the device (may be verbalized)"),
            step(
                "NOTE: Evaluator/assistant to remove OPA and move out of the way when candidate is prepared to insert device.",
                evaluator_note=True,
            ),
            step("Positions head properly"),
            step("Performs a tongue-jaw lift"),
            step("Inserts device to proper depth", critical=True),
            step(
                "Secures device in patient [inflates cuff(s) with proper volumes as needed and immediately removes syringe or secures strap]",
                critical=True,
            ),
            step(
                "Ventilates patient and confirms proper ventilation (correct lumen and proper insertion depth) by auscultation bilaterally over lungs and over epigastrium",
                critical=True,
            ),
            step(
                "Adjusts ventilation as necessary (ventilates through additional lumen or slightly withdraws tube until ventilation is optimized)"
            ),
            step(
                "Verifies proper tube placement by secondary confirmation such as capnography, capnometry, EDD or colorimetric device"
            ),
            step(
                'NOTE: The evaluator must now ask the candidate, "How would you know if you are delivering appropriate volumes with each ventilation?"',
                evaluator_note=True,
            ),
            step("Secures device or confirms that the device remains properly secured"),
            step("Ventilates patient at proper rate and volume while observing capnography/capnometry and pulse oximeter"),
            step(
                "NOTE: Note to evaluator: Checks/prepares supraglottic airway device includes selecting the correct size for patient.",
                evaluator_note=True,
            ),
        ],
    )
)

# ---------- s87 NPA ----------
skills.append(
    skill(
        id="s87",
        sheet="#87",
        name="Nasopharyngeal Airway",
        block="1",
        minutes=5,
        setup="WA DOH 530-226 (Jan 2022) #87. Nasopharyngeal airway. Scenario from evaluator.",
        passing=5,
        total=5,
        fail_fast=[
            "Failure to take or verbalize appropriate PPE precautions",
            "Failure to measure and select appropriate size airway",
            "Failure to verbalize lubrication of the nasal airway",
            "Failure to fully insert airway with the bevel facing toward the septum",
            "Failure to demonstrate a patent airway by ventilating the patient",
            *COMMON_FAIL_TAIL,
        ],
        steps=[
            step("Takes or verbalizes appropriate PPE precautions", critical=True),
            step("Measures and selects appropriate size airway", critical=True),
            step("Verbalizes lubrication of the nasal airway", critical=True),
            step("Fully inserts the airway with the bevel facing toward the septum", critical=True),
            step("Demonstrates a patent airway by ventilating patient", critical=True),
        ],
    )
)

# ---------- s29 Bleeding ----------
skills.append(
    skill(
        id="s29",
        sheet="#29",
        name="Bleeding Control / Shock Management",
        block="1",
        minutes=10,
        setup="WA DOH 530-226 (Jan 2022) #29. Bleeding control / shock management. Scenario from evaluator.",
        passing=6,
        total=7,
        fail_fast=[
            "Failure to take or verbalize appropriate PPE precautions",
            "Failure to control hemorrhage using correct procedures in a timely manner",
            "Failure to administer high concentration oxygen",
            "Failure to indicate the need for immediate transportation",
            *COMMON_FAIL_TAIL,
        ],
        steps=[
            step("Takes or verbalizes appropriate PPE precautions", critical=True),
            step("Applies direct pressure to the wound"),
            step(
                "Note: The evaluator must now inform the candidate that the wound continues to bleed.",
                evaluator_note=True,
            ),
            step("Applies tourniquet", critical=True),
            step(
                "Note: The evaluator must now inform the candidate that patient is exhibiting signs and symptoms of hypoperfusion.",
                evaluator_note=True,
            ),
            step("Properly positions the patient"),
            step("Applies high concentration oxygen", critical=True),
            step("Initiates steps to prevent heat loss from the patient"),
            step("Indicates the need for immediate transportation", critical=True),
        ],
    )
)

# ---------- s31 Long bone ----------
skills.append(
    skill(
        id="s31",
        sheet="#31",
        name="Long Bone Immobilization",
        block="2",
        minutes=5,
        setup="WA DOH 530-226 (Jan 2022) #31. Long bone immobilization. Scenario from evaluator.",
        passing=8,
        total=10,
        fail_fast=[
            "Failure to immediately stabilize the extremity manually",
            "Grossly moves the injured extremity",
            "Failure to immobilize the joint above and the joint below the injury site",
            "Failure to immobilize the hand or foot in a position of function",
            "Failure to reassess distal motor, sensory and circulatory functions in the injured extremity before and after splinting",
            *COMMON_FAIL_TAIL,
        ],
        steps=[
            step("Takes or verbalizes appropriate PPE precautions"),
            step("Directs application of manual stabilization of the injury", critical=True),
            step("Assesses distal motor, sensory and circulatory functions in the injured extremity", critical=True),
            step(
                'NOTE: The evaluator acknowledges, "Motor, sensory and circulatory functions are present and normal."',
                evaluator_note=True,
            ),
            step("Measures splint"),
            step("Applies splint"),
            step("Immobilizes the joint above the injury site", critical=True),
            step("Immobilizes the joint below the injury site", critical=True),
            step("Secures the entire injured extremity"),
            step("Immobilizes the hand/foot in the position of function", critical=True),
            step("Reassesses distal motor, sensory and circulatory functions in the injured extremity", critical=True),
            step(
                'Note: The evaluator acknowledges, "Motor, sensory and circulatory functions are present and normal."',
                evaluator_note=True,
            ),
        ],
    )
)

# ---------- s33 Joint ----------
skills.append(
    skill(
        id="s33",
        sheet="#33",
        name="Joint Immobilization",
        block="2",
        minutes=5,
        setup="WA DOH 530-226 (Jan 2022) #33. Joint immobilization. Scenario from evaluator.",
        passing=8,
        total=9,
        fail_fast=[
            "Failure to immediately stabilize the extremity manually",
            "Grossly moves the injured extremity",
            "Failure to immobilize the bone above and below the injury site",
            "Failure to reassess distal motor, sensory and circulatory functions in the injured extremity before and after splinting",
            *COMMON_FAIL_TAIL,
        ],
        steps=[
            step("Takes or verbalizes appropriate PPE precautions"),
            step("Directs application of manual stabilization of the injury", critical=True),
            step("Assesses distal motor, sensory and circulatory functions in the injured extremity", critical=True),
            step(
                'NOTE: The evaluator acknowledges, "Motor, sensory and circulatory functions are present and normal."',
                evaluator_note=True,
            ),
            step("Selects the proper splinting material"),
            step("Immobilizes the site of the injury"),
            step("Immobilizes the bone above injury site", critical=True),
            step("Immobilizes the bone below injury site", critical=True),
            step("Secures the entire injured extremity"),
            step("Reassesses distal motor, sensory and circulatory functions in the injured extremity", critical=True),
            step(
                'NOTE: The evaluator acknowledges, "Motor, sensory and circulatory functions are present and normal."',
                evaluator_note=True,
            ),
        ],
    )
)

# ---------- s89 Traction (Sager column) ----------
skills.append(
    skill(
        id="s89",
        sheet="#89",
        name="Traction Splint Immobilization",
        block="2",
        minutes=10,
        setup="WA DOH 530-226 (Jan 2022) #89–90. Traction splint immobilization. Checklist encodes Sager-type pole splint column; official sheet also has OTD type pole splint and HARE type splint columns. Scenario from evaluator.",
        passing=12,
        total=15,
        fail_fast=[
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
            *COMMON_FAIL_TAIL,
        ],
        steps=[
            step("Takes or verbalizes appropriate precautions", critical=True),
            step("Directs/maintains manual stabilization of the injured leg"),
            step("Assesses distal motor, sensory and circulatory functions in the injured extremity", critical=True),
            step(
                'NOTE: The evaluator acknowledges, "Motor, sensory and circulatory functions are present and normal."',
                evaluator_note=True,
            ),
            step(
                "NOTE: Indicate device used. (Depending on splint used, follow the manufacturers' recommendations) — Sager type pole splint column below.",
                evaluator_note=True,
            ),
            step("Prepares/adjusts splint to the proper length-pulley wheel adjacent to heel", critical=True),
            step("Positions the splint at the injured leg-medial side", critical=True),
            step("Applies the proximal securing device (e.g., ischial strap)", critical=True),
            step("Applies the distal securing device (e.g., ankle harness) to patient", critical=True),
            step("Assures the distal securing device (e.g., ankle harness) is attached to the splint", critical=True),
            step("Applies mechanical traction, at 10%of patient's body weight up to 15lbs.", critical=True),
            step("Positions elastic support straps under legs"),
            step("Secure the thighs, knees and calves elastic straps", critical=True),
            step("Applies strap to hold feet"),
            step("Re-evaluates the proximal/distal securing devices"),
            step(
                "Reassesses distal motor, sensory and circulatory functions in the injured extremity",
                critical=True,
            ),
            step(
                'NOTE: The evaluator acknowledges, "Motor, sensory and circulatory functions are present and normal."',
                evaluator_note=True,
            ),
            step(
                "Verbalizes securing patient to long board to immobilize hip and secure splint",
                critical=True,
            ),
        ],
    )
)

# ---------- s92 SMR ----------
skills.append(
    skill(
        id="s92",
        sheet="#92",
        name="Spinal Motion Restriction",
        block="2",
        minutes=10,
        setup="WA DOH 530-226 (Jan 2022) #92. Spinal motion restriction. Scenario from evaluator.",
        passing=8,
        total=10,
        fail_fast=[
            "Failure to immediately direct or take manual stabilization of the head",
            "Failure to assess motor, sensory and circulatory functions in each extremity before moving the patient",
            "Failure to properly apply appropriately sized extrication collar before moving the patient",
            "Failure to assist the patient onto the EMS stretcher while ensuring minimal spinal movement",
            "Manipulated or moved the patient excessively causing potential spinal compromise",
            "Failure to remove unnecessary rigid extrication device once the patient is on the EMS stretcher",
            "Failure to secures the patient to the EMS stretcher with adequate seatbelts and strapping",
            "Failure to reassess motor, sensory and circulatory functions in each extremity after securing the patient to the EMS stretcher",
            *COMMON_FAIL_TAIL,
        ],
        steps=[
            step("Takes or verbalizes appropriate PPE precautions"),
            step("Directs assistant to maintain manual stabilization/immobilization of the head", critical=True),
            step("Assesses motor, sensory and circulatory function in each extremity", critical=True),
            step("Applies appropriately sized extrication collar", critical=True),
            step("Determines need to place the patient on a rigid extrication device (scoop stretcher, long spine board, etc.)"),
            step("Assists the patient onto the EMS stretcher while ensuring minimal spinal movement", critical=True),
            step(
                "Removes any unnecessary rigid extrication device once the patient is on the EMS stretcher",
                critical=True,
            ),
            step("Applies padding as necessary"),
            step("Secures the patient to the EMS stretcher with adequate seatbelts and strapping", critical=True),
            step("Reassesses motor, sensory and circulatory function in each extremity", critical=True),
        ],
    )
)

# ---------- s21 Trauma assessment ----------
skills.append(
    skill(
        id="s21",
        sheet="#21",
        name="Patient Assessment / Management – Trauma",
        block="3",
        minutes=10,
        setup="WA DOH 530-226 (Jan 2022) #21–22. Patient assessment / management – trauma. Max Time Allowed: *10. Scenario from evaluator.",
        passing=34,
        total=42,
        fail_fast=[
            "Failure to initiate or call for transport of the patient within 10 minute time limit",
            "Failure to take or verbalize appropriate PPE precautions",
            "Failure to determine scene safety",
            "Failure to assess for and provide spinal protection when indicated",
            "Failure to voice and ultimately provide high concentration oxygen",
            "Failure to assess/provide adequate ventilation",
            "Failure to find or appropriately manage problems associated with airway, breathing, hemorrhage or shock",
            "Failure to differentiate patient's need for immediate transportation versus continued assessment/ treatment at the scene",
            "Performs other assessment before assessing/treating threats to airway, breathing and circulation",
            *COMMON_FAIL_TAIL,
        ],
        steps=[
            step("Takes or verbalizes appropriate PPE precautions", critical=True),
            step("SCENE SIZE-UP", evaluator_note=True),
            step("Determines the scene/situation is safe", critical=True),
            step("Determines mechanism of injury/nature of illness"),
            step("Determines the number of patients"),
            step("Requests additional EMS assistance if necessary"),
            step("Considers stabilization of the spine", critical=True),
            step("PRIMARY SURVEY / RESUSCITATION (Must be completed prior to the secondary assessment)", evaluator_note=True),
            step("Verbalizes general impression of patient"),
            step("Determines responsiveness/level of consciousness"),
            step("Determines chief complaint/apparent life threats", critical=True),
            step("Opens and assesses airway", critical=True),
            step("Inserts adjunct as indicated", critical=True),
            step("Assess breathing", critical=True),
            step("Assures adequate ventilation", critical=True),
            step("Initiates appropriate oxygen therapy", critical=True),
            step("Manages any injury which may compromise breathing/ventilation", critical=True),
            step("Checks pulse"),
            step("Assesses skin (either skin color, temperature, or condition)"),
            step("Assesses for and controls major bleeding if present", critical=True),
            step("Initiates shock management (positions patient properly, conserves body heat)", critical=True),
            step(
                "Identifies patient priority and makes treatment/transport decision (based upon GCS/Trauma Triage Tool)",
                critical=True,
            ),
            step("HISTORY TAKING", evaluator_note=True),
            step("Obtains baseline vital signs (must include BP, P, and R)"),
            step("Attempts to obtain SAMPLE history"),
            step(
                'SECONDARY ASSESSMENT — Areas denoted by "**" may be integrated within sequence of Primary Survey/Resuscitation',
                evaluator_note=True,
            ),
            step("Inspects and palpates scalp and ears**"),
            step("Assesses eyes"),
            step("Inspects mouth**, nose**, and assesses facial area"),
            step("Checks position of trachea"),
            step("Checks jugular veins"),
            step("Palpates cervical spine"),
            step("Inspects chest"),
            step("Palpates the chest"),
            step("Auscultates chest"),
            step("Inspects and palpates abdomen"),
            step("Assesses pelvis"),
            step("Verbalizes assessment of genitalia/perineum as needed"),
            step("Inspects, palpates, and assesses motor, sensory and distal circulatory functions (1 point/leg) — lower extremities**"),
            step("Inspects, palpates, and assesses motor, sensory and distal circulatory functions (1 point/arm) — upper extremities"),
            step("Inspects and palpates posterior thorax"),
            step("Inspects and palpates lumbar and buttocks areas"),
            step("Manages secondary injuries and wounds appropriately"),
            step("REASSESSMENT", evaluator_note=True),
            step("Demonstrates how and when to reassess the patient"),
        ],
    )
)

# ---------- s25 Cardiac Arrest / AED ----------
skills.append(
    skill(
        id="s25",
        sheet="#25",
        name="Cardiac Arrest Management / AED",
        block="3",
        minutes=10,
        setup="WA DOH 530-226 (Jan 2022) #25–26. Cardiac arrest management / AED. Scenario from evaluator.",
        passing=16,
        total=19,
        fail_fast=[
            "Failure to take or verbalize appropriate PPE precautions",
            "Failure to check responsiveness, then check breathing and pulse simultaneously for no more than 10 seconds",
            "Failure to immediately begin chest compressions as soon as pulselessness is confirmed",
            "Failure to demonstrate acceptable high quality, 1-rescuer adult CPR",
            "Interrupts CPR for more than 10 seconds at any point",
            "Failure to correctly attach the AED to the patient",
            "Failure to operate the AED properly",
            "Failure to deliver shock in a timely manner",
            'Failure to assure that all individuals are clear of patient during rhythm analysis and before delivering shock (verbalizes "All clear" and observes)',
            "Failure to immediately resume compressions after shock delivered",
            *COMMON_FAIL_TAIL,
        ],
        steps=[
            step("Takes or verbalizes appropriate PPE precautions", critical=True),
            step("Determines the scene/situation is safe"),
            step("Attempts to question any bystanders about arrest events"),
            step("Checks patient responsiveness"),
            step("Direct assistant to retrieve AED"),
            step(
                "Assesses patient for signs of breathing [observes the patient and determines the absence of breathing or abnormal breathing (gasping or agonal respirations)]"
            ),
            step("Checks carotid pulse [no more than 10 seconds]"),
            step(
                'NOTE: After checking responsiveness, then checking breathing and pulse for no more than 10 seconds, evaluator informs the candidate, "The patient is unresponsive, apneic and pulseless".',
                evaluator_note=True,
            ),
            step("Requests additional EMS assistance"),
            step(
                "Immediately begins chest compressions (adequate depth and rate; allows the chest to recoil completely)",
                critical=True,
            ),
            step("Adequate depth and rate", critical=True),
            step("Correct compression-to-ventilation ratio", critical=True),
            step("Allows the chest to recoil completely", critical=True),
            step("Adequate volumes for each breath", critical=True),
            step("Minimal interruptions of no more than 10 seconds throughout", critical=True),
            step(
                "NOTE: After 2 minutes (5 cycles), candidate assesses patient and second rescuer resumes compressions while candidate operates AED.",
                evaluator_note=True,
            ),
            step("Turns on power to AED", critical=True),
            step("Follows prompts and correctly attaches AED to patient", critical=True),
            step("Stops CPR and ensures all individuals are clear of the patient during rhythm analysis", critical=True),
            step("Ensures that all individuals are clear of the patient and delivers shock from AED", critical=True),
            step("Immediately directs rescuer to resume chest compressions", critical=True),
        ],
    )
)

# ---------- s57 Aspirin ----------
skills.append(
    skill(
        id="s57",
        sheet="#57",
        name="Aspirin Administration",
        block="3",
        minutes=5,
        kc_note="Contacts medical direction for authorization as indicated per local protocol / King County standing orders.",
        setup="WA DOH 530-226 (Jan 2022) #57. Aspirin administration. Scenario from evaluator.",
        passing=10,
        total=12,
        fail_fast=[
            "Failure to take or verbalize appropriate PPE precautions",
            "Failure to appropriately determine the need for aspirin",
            "Failure to recheck if patient is allergic to any medication",
            "Failure to check medication for expiration date",
            *COMMON_FAIL_TAIL,
        ],
        steps=[
            step("Takes or verbalizes appropriate PPE precautions", critical=True),
            step("Verbalizes administration of oxygen to the patient as needed"),
            step(
                "Appropriately determines the need for aspirin – (Asks patient about signs/symptoms, allergies, medications, last oral intake, events)",
                critical=True,
            ),
            step("Obtains history about onset, provocation, quality, radiation, severity and time of pain"),
            step("Obtains vital signs-R, P, BP, pupils, skin"),
            step("Rechecks if patient is allergic to aspirin", critical=True),
            step("Asks if patient has already taken aspirin for this event (determines appropriate dose)"),
            step("Contacts medical direction for authorization as indicated per local protocol"),
            step("Checks medication for expiration date", critical=True),
            step("Administers medication appropriately, assuring patient chews the aspirin"),
            step("Verbalizes proper documentation of medication administration"),
            step("Verbalizes reassessment of the patient"),
        ],
    )
)

# ---------- s65 Nitro ----------
skills.append(
    skill(
        id="s65",
        sheet="#65",
        name="Nitroglycerin Administration",
        block="3",
        minutes=5,
        kc_note="Contacts medical direction for authorization as indicated per local protocol / King County standing orders.",
        setup="WA DOH 530-226 (Jan 2022) #65. Nitroglycerin administration. Scenario from evaluator.",
        passing=12,
        total=14,
        fail_fast=[
            "Failure to take or verbalize appropriate PPE precautions",
            "Failure to appropriately determine the need for nitroglycerin",
            "Failure to determine if patient has nitroglycerin, has any been taken for this event, and if maximum dose has been met",
            "Failure to assure medication is prescribed to the patient",
            "Failure to ask about use of erectile dysfunction or pulmonary hypertension medications within past 48 hours",
            "Failure to check medication for expiration date",
            *COMMON_FAIL_TAIL,
        ],
        steps=[
            step("Takes or verbalizes appropriate PPE precautions", critical=True),
            step("Verbalizes administration of oxygen to the patient as needed"),
            step("Appropriately determines the need for nitroglycerin", critical=True),
            step("Obtains history about onset, provocation, quality, radiation, severity and time of pain"),
            step("Asks about signs/ symptoms, allergies, medications, last oral intake, events"),
            step("Obtains vital signs-R, P, BP, pupils, skin, and pain scale"),
            step(
                "Determines if patient has nitroglycerin, has any been taken for this event, and if maximum dose has been met",
                critical=True,
            ),
            step("Obtains patient's medication, and assures medication is prescribed for the patient", critical=True),
            step(
                "Asks about use of erectile dysfunction or pulmonary hypertension medications within past 48 hours",
                critical=True,
            ),
            step("Contacts medical direction for authorization as indicated per local protocol"),
            step("Checks medication for expiration date", critical=True),
            step("Administers medication appropriately"),
            step("Verbalizes proper documentation of medication administration"),
            step(
                "Verbalizes reassessment of the patient, including asking about tingling under the tongue, headache and relief of pain"
            ),
        ],
    )
)

# ---------- s61 Oral glucose ----------
skills.append(
    skill(
        id="s61",
        sheet="#61",
        name="Oral Glucose Administration",
        block="3",
        minutes=5,
        kc_note="Contacts medical direction for authorization as indicated per local protocol / King County standing orders.",
        setup="WA DOH 530-226 (Jan 2022) #61. Oral glucose administration. Scenario from evaluator.",
        passing=8,
        total=10,
        fail_fast=[
            "Failure to take or verbalize appropriate PPE precautions",
            "Failure to assess patient's mental status and ability to swallow",
            "Failure to reassess patient after administration, to include patient's mental status",
            *COMMON_FAIL_TAIL,
        ],
        steps=[
            step("Takes or verbalizes appropriate PPE precautions", critical=True),
            step("Asks about signs/ symptoms, allergies, medications, last oral intake, events"),
            step("Obtains vital signs-R,P, BP, pupils, skin,( blood glucose test if available)"),
            step("Assures patient is displaying signs/symptoms of altered mental status/hypoglycemia"),
            step("Assesses patient's mental status and ensures the patient can swallow", critical=True),
            step("Contacts medical direction for authorization as indicated per local protocol"),
            step("Checks medication for expiration date and concentration"),
            step(
                "Administers tube of glucose properly- by either placing glucose on tongue depressor and inserting it between the cheek and gum, or by allowing patient to squeeze tube into his/her mouth"
            ),
            step("Verbalizes proper documentation of medication administration"),
            step("Verbalizes reassessment of the patient, including assessing mental status", critical=True),
        ],
    )
)

# ---------- s73 Glucometer ----------
skills.append(
    skill(
        id="s73",
        sheet="#73",
        name="Blood Glucometer",
        block="3",
        minutes=5,
        setup="WA DOH 530-226 (Jan 2022) #73. Blood glucometer. Scenario from evaluator.",
        passing=8,
        total=10,
        fail_fast=[
            "Failure to take or verbalize appropriate PPE precautions",
            "Failure to dispose of blood contaminated sharps immediately at the point of use",
            "Contaminates equipment or site without appropriately correcting situation",
            "Failure to obtain a viable capillary blood sample on first attempt",
            "Failure to appropriately read the glucometer reading",
            *COMMON_FAIL_TAIL,
        ],
        steps=[
            step("Takes or verbalizes appropriate PPE precautions", critical=True),
            step("Identifies the need for obtaining a blood glucose level"),
            step(
                "Selects, checks and assembles supplies and equipment (glucometer, test strip, needle or spring loaded device, alcohol swab)"
            ),
            step("Turns on glucometer and inserts test strip"),
            step("Preps the patient's fingertip with alcohol prep"),
            step("Lances the prepped site with needle/lancet device, drawing capillary blood"),
            step("Disposes/verbalizes disposal of needle/lancet in appropriate container", critical=True),
            step(
                "Expresses blood sample and transfers it to the test strip, according to manufacturer's instructions",
                critical=True,
            ),
            step("Applies pressure and dresses fingertip wound"),
            step("Records reading from glucometer and documents appropriately", critical=True),
            step(
                'NOTE: Note to evaluator: "Turns on glucometer and inserts test strip", if glucometer is operated per manufacturer recommendations award point.',
                evaluator_note=True,
            ),
        ],
    )
)

# ---------- s13 Medical assessment ----------
skills.append(
    skill(
        id="s13",
        sheet="#13",
        name="Patient Assessment / Management – Medical – EMR/EMT",
        block="4",
        minutes=15,
        setup="WA DOH 530-226 (Jan 2022) #13–14. Patient assessment / management – medical – EMR/EMT. Max Time Allowed: *15. Scenario from evaluator.",
        passing=34,
        total=42,
        fail_fast=[
            "Failure to initiate or call for transport of the patient within 15 minute time limit",
            "Failure to take or verbalize appropriate PPE precautions",
            "Failure to determine scene safety before approaching patient",
            "Failure to voice and ultimately provide appropriate oxygen therapy",
            "Failure to assess/provide adequate ventilation",
            "Failure to find or appropriately manage problems associated with airway, breathing, hemorrhage or shock",
            "Failure to differentiate patient's need for immediate transportation versus continued assessment or treatment at the scene",
            "Performs secondary examination before assessing and treating threats to airway, breathing and circulation",
            "Failure to provide an accurate report to arriving EMS unit or receiving facility",
            *COMMON_FAIL_TAIL,
        ],
        steps=[
            step("Takes or verbalizes appropriate PPE precautions", critical=True),
            step("SCENE SIZE-UP", evaluator_note=True),
            step("Determines the scene/situation is safe", critical=True),
            step("Determines mechanism of injury/nature of illness"),
            step("Determines the number of patients"),
            step("Requests additional EMS assistance if necessary"),
            step("Considers stabilization of spine"),
            step("PRIMARY SURVEY / RESUSCITATION", evaluator_note=True),
            step("Verbalizes general impression of the patient"),
            step("Determines responsiveness/level of consciousness (AVPU)"),
            step("Determines chief complaint/apparent life threats"),
            step("Assessment", critical=True),
            step("Assures adequate ventilation", critical=True),
            step("Initiates appropriate oxygen therapy", critical=True),
            step("Assesses/controls major bleeding", critical=True),
            step("Checks pulse"),
            step("Assesses skin (either skin color, temperature, or condition)"),
            step("Identifies patient priority and makes treatment/transport decision", critical=True),
            step("HISTORY TAKING", evaluator_note=True),
            step("History of present illness - Signs and Symptoms — Onset", evaluator_note=False),
            step("Onset"),
            step("Quality"),
            step("Severity"),
            step("Provocation"),
            step("Radiation"),
            step("Time"),
            step("Clarifying questions of associated signs and symptoms related to OPQRST"),
            step("Allergies"),
            step("Medications"),
            step("Past pertinent history"),
            step("Last oral intake"),
            step("Events leading to present illness"),
            step("SECONDARY ASSESSMENT", evaluator_note=True),
            step(
                "Assesses affected body part/system — Cardiovascular, Neurological, Integumentary, Reproductive, Pulmonary, Musculoskeletal, GI/GU, Psychological/Social"
            ),
            step("Blood Pressure"),
            step("Pulse"),
            step("Respiratory rate and quality"),
            step("States field impression of patient"),
            step("Interventions (verbalizes proper interventions/treatment)"),
            step("REASSESSMENT", evaluator_note=True),
            step("Demonstrates how and when to reassess the patient to determine changes in condition"),
            step("Provides accurate verbal report arriving EMS unit or receiving facility"),
        ],
    )
)

# Fix accidental duplicate Onset step in medical - regenerate s13 more carefully
# I'll patch after generation by rewriting s13 cleanly in the file.

# ---------- s63 Naloxone ----------
skills.append(
    skill(
        id="s63",
        sheet="#63",
        name="Naloxone (Narcan) Administration IN",
        block="4",
        minutes=5,
        kc_note="Airway/BVM first for hypoventilation. Dosage and device per local protocol / King County. Sheet awards one point for properly administering via pre-assembled device or syringe with MAD.",
        setup="WA DOH 530-226 (Jan 2022) #63. Naloxone (Narcan) administration IN. Scenario from evaluator.",
        passing=8,
        total=9,
        fail_fast=[
            "Failure to take or verbalize appropriate PPE precautions",
            "Failure to appropriately determine the need for naloxone",
            "Failure to verbalize appropriate dosage for the patient per local protocol",
            "Failure to properly administer the medication",
            "Failure to verbalize reassessment of the patient",
            *COMMON_FAIL_TAIL,
        ],
        steps=[
            step("Takes or verbalizes appropriate PPE precautions", critical=True),
            step(
                "Appropriately determines the need for naloxone (Patient exhibits respiratory depression, coma suspected to be induced by opiate/narcotic)",
                critical=True,
            ),
            step("Obtains vital signs-R, P, BP, pupils, skin,( blood glucose test if available)"),
            step("Contacts medical direction for authorization as indicated per local protocol"),
            step("Verbalizes the appropriate dosage for the patient per local protocol", critical=True),
            step("Checks medication for expiration date"),
            step(
                "Properly administers medication: Device pre-assembled — Insert tip of nozzle in nostril; Press plunger briskly. OR Syringe w/ mucosal Atomization device — Draw up appropriate dose into syringe or assemble the prefilled syringe; Place the MAD onto syringe; Insert MAD into nostril; Press syringe plunger briskly.",
                critical=True,
            ),
            step("Verbalizes proper documentation of medication administration"),
            step("Verbalizes reassessment of the patient", critical=True),
        ],
    )
)

# ---------- s69 IM med ----------
skills.append(
    skill(
        id="s69",
        sheet="#69",
        name="IM Medication Administration from an Amp/Vial",
        block="4",
        minutes=5,
        kc_note="King County Check & Inject: epinephrine 1 mg/mL (1:1000) IM per local protocol. Official sheet is medication-agnostic amp/vial IM.",
        setup="WA DOH 530-226 (Jan 2022) #69. IM medication administration from an amp/vial. Scenario from evaluator.",
        passing=16,
        total=20,
        fail_fast=[
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
            *COMMON_FAIL_TAIL,
        ],
        steps=[
            step(
                "Selects, checks, and assembles supplies [medication, syringe, needle(s), sharps, alcohol swabs, band-aid/sterile gauze]"
            ),
            step("Appropriately determines the patient's need for the medication"),
            step("Selects correct medication (concentration)", critical=True),
            step("Checks medication for expiration date", critical=True),
            step("Checks medication for cloudiness or discoloration", critical=True),
            step("Assembles proper needle and syringe", critical=True),
            step("Opens vial or ampule correctly"),
            step("Draws up the correct amount of medication, and dispels air while maintaining sterility", critical=True),
            step("Reconfirms medication, patient, route, dosage"),
            step("Takes or verbalizes appropriate PPE precautions", critical=True),
            step("Explains procedure to the patient"),
            step("Selects and cleans the appropriate injection site", critical=True),
            step("Inserts needle at a 90 degree angle (Intramuscular)", critical=True),
            step(
                "Aspirates syringe while observing for blood return before injecting IM medication (verbalizes if blood is seen, syringe/needle would be withdrawn and procedure redone)",
                critical=True,
            ),
            step("Injects medication appropriately", critical=True),
            step("Withdraws needle and applies pressure over injection site", critical=True),
            step("Properly discards needle in appropriate container", critical=True),
            step("Covers puncture site"),
            step("Verbalizes proper documentation of medication administration"),
            step("Verbalizes reassessment of patient for desired and adverse effects of medication", critical=True),
        ],
    )
)

# ---------- s94 Major Medical ----------
skills.append(
    skill(
        id="s94",
        sheet="#94",
        name="COMPREHENSIVE EVALUATION Major Medical",
        block="final",
        minutes=12,
        setup="WA DOH 530-226 (Jan 2022) #94. Comprehensive evaluation — major medical. Objective: Given a team approach, appropriate equipment and a patient with a major medical emergency, demonstrate appropriate assessment and treatment as outlined in the approved guidelines.",
        passing=0,
        total=0,
        fail_fast=[
            "Take/verbalize PPE Precautions",
            "Appropriately manage airway, breathing, shock",
            "Administer appropriate rate and delivery of oxygen (if indicated)",
            "Determine the need for immediate transport",
        ],
        steps=[
            step("Scene Size-up (MUST VERBALIZE)", evaluator_note=True),
            step("PPE Precautions"),
            step("Scene Safety"),
            step("Determines NOI"),
            step("# of Pts"),
            step("Additional Resources"),
            step("Primary Assessment (MUST VERBALIZE)", evaluator_note=True),
            step("Mental Status"),
            step("Chief Complaint"),
            step("Airway"),
            step("Breathing"),
            step("Circulation"),
            step("Skin Signs"),
            step("Body Position"),
            step("Appropriate General Impression"),
            step("Subjective (history)", evaluator_note=True),
            step("Establishes rapport with patient (reassures and calms) and obtains consent to treat (implied/actual)"),
            step("Determines patient's chief complaint"),
            step("Thoroughly investigates patient history, NOI (follows SAMPLE and OPQRST investigation)"),
            step("Obtains names/dosages of current medications and if any were taken (if possible)"),
            step("Objective (physical exam)", evaluator_note=True),
            step("Records and documents baseline vital signs - listens to lung sounds and compares sides"),
            step("Performs appropriate medical assessment based on clinical presentation"),
            step("Appreciates patient's body position (distressed, tripod, normal)"),
            step("Obtains second set of vital signs and compares to baseline"),
            step("Assessment (impression)", evaluator_note=True),
            step("Verbalizes to evaluator what 'you think is going on'"),
            step("Determines the need for immediate transport — states rationale"),
            step("Plan (treatment) — GENERAL CARE (Check all that apply)", evaluator_note=True),
            step("Properly positions patient"),
            step("Administers appropriate rate and delivery of oxygen (as indicated)"),
            step("Properly ventilates patient with a BVM (if indicated)"),
            step("Suctions airway (if indicated)"),
            step("Considers/uses medications appropriately (if indicated)"),
            step("Monitors patient vital signs"),
            step("Considers Index of Suspicion (IOS) and states rationale"),
            step("Performs reassessment"),
            step("Properly performs other care/treatment (as indicated)"),
            step("Communication and Documentation", evaluator_note=True),
            step("Delivers accurate and effective verbal report (if indicated)"),
        ],
    )
)

# ---------- s96 Major Trauma ----------
skills.append(
    skill(
        id="s96",
        sheet="#96",
        name="COMPREHENSIVE EVALUATION Major Trauma",
        block="final",
        minutes=12,
        setup="WA DOH 530-226 (Jan 2022) #96. Comprehensive evaluation — major trauma. Objective: Given a team approach, appropriate equipment and a patient with major trauma, demonstrate appropriate assessment and treatment as outlined in the approved guidelines.",
        passing=0,
        total=0,
        fail_fast=[
            "Take/verbalize PPE Precautions",
            "Appropriately manage airway, breathing, shock",
            "Administer appropriate rate and delivery of oxygen (if indicated)",
            "Determine the need for immediate transport",
        ],
        steps=[
            step("Scene Size-up (MUST VERBALIZE)", evaluator_note=True),
            step("PPE Precautions"),
            step("Scene Safety"),
            step("Determines MOI"),
            step("# of Pts"),
            step("Additional Resources"),
            step("Primary Assessment (MUST VERBALIZE)", evaluator_note=True),
            step("Mental Status"),
            step("Chief Complaint"),
            step("Airway"),
            step("C-spine"),
            step("Breathing"),
            step("Circulation"),
            step("Bleeding"),
            step("Obvious Trauma"),
            step("Body Position"),
            step("Appropriate General Impression"),
            step("Subjective (history)", evaluator_note=True),
            step("Establishes rapport with patient (reassures and calms) and obtains consent to treat (implied/actual)"),
            step("Determines patient's chief complaint and follows SAMPLE and OPQRST investigation"),
            step("Determines mechanism of injury (MOI) as soon as possible – considers NOI and acts accordingly"),
            step("Obtains names/dosages of current medications and if any were taken (if possible)"),
            step("Objective (physical exam)", evaluator_note=True),
            step("Records and documents baseline vital signs - listens to lung sounds and compares sides"),
            step("Performs proper trauma exam based on clinical presentation: exposes/checks for bleeding and/or injuries"),
            step("Assesses pulse, sensation, and movement before and after wound care/splinting (as indicated)"),
            step("Obtains second set of vital signs and compares to baseline"),
            step("Assessment (impression)", evaluator_note=True),
            step("Verbalizes to evaluator what 'you think is going on'"),
            step("Determines the need for immediate transport — states rationale"),
            step("Plan (treatment) — GENERAL CARE (Check all that apply)", evaluator_note=True),
            step(
                "Applies proper and immediate bleeding control technique: direct pressure, pressure dressing, tourniquet"
            ),
            step("Provides immediate fracture stabilization (if indicated)"),
            step("Administers appropriate rate and delivery of oxygen (as indicated)"),
            step("Appropriately applies splint"),
            step("Properly positions patient"),
            step("Initiates steps to prevent heat loss"),
            step("Monitors patient's vital signs"),
            step("Considers Index of Suspicion (IOS) and states rationale"),
            step("Performs reassessment"),
            step("Proper spinal immobilization"),
            step("Bag-valve-mask (BVM) use"),
            step("Suction (as needed)"),
            step("Communication and Documentation", evaluator_note=True),
            step("Delivers accurate and effective verbal report (if indicated)"),
        ],
    )
)

header = f'''export type SkillStep = {{
  text: string
  critical?: boolean
  evaluatorNote?: boolean
}}

export type Skill = {{
  id: string
  sheet: string
  name: string
  block: 1 | 2 | 3 | 4 | "final"
  minutes: number
  kcNote?: string
  setup: string
  source?: "{SOURCE}"
  passingScore?: number
  totalPoints?: number
  steps: SkillStep[]
  failFast: string[]
}}

export const SKILLS: Skill[] = [
'''

footer = '''
]

export function skillsForBlock(block: 1 | 2 | 3 | 4 | "final") {
  return SKILLS.filter((s) => s.block === block)
}
'''

# Fix s13: remove duplicate "Onset" header mistake by post-processing
body = "\n".join(skills)
# Remove the erroneous step line if present
bad = '      { text: "History of present illness - Signs and Symptoms — Onset" },\n'
body = body.replace(bad, '      { text: "History of present illness - Signs and Symptoms", evaluatorNote: true },\n')

# For comprehensive skills with passingScore 0, omit or leave — user said optional. Prefer omitting 0.
# Actually leave them; or use undefined. Cleaner to not emit 0.
body = body.replace("    passingScore: 0,\n    totalPoints: 0,\n", "")

OUT.write_text(header + body + footer, encoding="utf-8")
print(f"Wrote {OUT}")
print("Skill ids:", [s.split('id: "')[1].split('"')[0] for s in skills])
