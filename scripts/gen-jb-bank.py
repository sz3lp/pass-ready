# Generate questions-jb-testprep.ts from cleaned JB Learning TestPrep items.
from pathlib import Path
from textwrap import dedent

# (stem, choices[4], answer_idx 0-3, chapter, tag, why)
# Deduped; OCR stems cleaned; choices restored to standard JB wording.
ITEMS = [
  (
    "Which of the following situations would most likely impair oxygenation, despite the fact that the patient is ventilating?",
    ["Limb amputation", "Intracranial hemorrhage", "Acute myocardial infarction", "Entrapment in a mine"],
    3, 11, "oxygenation",
    "A mine can have hypoxic or toxic atmosphere, so oxygenation fails even when the patient is still moving air.",
  ),
  (
    "A patient with slow, shallow breathing has a large volume of blood and secretions in his oropharynx. What should you do?",
    [
      "Suction his airway until it is clear and ventilate with a bag-mask device.",
      "Insert a nasopharyngeal airway and suction the airway for 30 seconds.",
      "Turn the patient onto his side and provide immediate transport.",
      "Insert an oropharyngeal airway and suction for 10 to 15 seconds.",
    ],
    0, 11, "suction",
    "Clear the airway completely, then ventilate. Timed suction alone or inserting an adjunct into a dirty airway is wrong.",
  ),
  (
    "Which of the following patients has signs of inadequate breathing?",
    [
      "A 41-year-old woman with shallow respirations of 14 breaths/min",
      "A 60-year-old man with clear and equal breath sounds bilaterally",
      "A 30-year-old man with respirations of 12 breaths/min with adequate depth",
      "A 50-year-old woman with respirations of 12 breaths/min and pink, dry skin",
    ],
    0, 11, "inadequate breathing",
    "Shallow tidal volume means inadequate ventilation even if the rate looks 'normal.'",
  ),
  (
    "When attaching an oxygen regulator to a D cylinder and preparing it for use, you should recall that:",
    [
      "the cylinder must remain in a standing position at all times or it will not deliver any oxygen.",
      "oxygen supports combustion and should not be used where sparks are easily generated.",
      "a pressure-compensated flowmeter should be used when laying the oxygen cylinder down.",
      "the cylinder should be taken out of service and refilled when it contains less than 750 psi.",
    ],
    1, 11, "oxygen safety",
    "Oxygen accelerates fire. Keep it away from sparks, oil, and open flame.",
  ),
  (
    "After an adult cardiac arrest patient has been intubated by a paramedic, you are providing ventilations as your partner performs chest compressions. What should you do when ventilating the patient?",
    [
      "Deliver enough volume to produce visible chest rise",
      "Ask the compressor to briefly pause when you ventilate",
      "Hyperventilate the patient to maximize carbon dioxide elimination",
      "Time each ventilation to begin during the downstroke of a compression",
    ],
    0, 14, "advanced airway CPR",
    "With an advanced airway, compressions are continuous. Deliver volume for visible chest rise; do not pause or hyperventilate.",
  ),
  (
    "A patient overdosed on several drugs and is unresponsive with shallow breathing and facial cyanosis. As you continue your assessment, the patient suddenly vomits. What should you do?",
    [
      "Suction his oropharynx at once",
      "Turn the patient onto his side",
      "Insert an oropharyngeal airway",
      "Begin assisting his ventilations",
    ],
    1, 11, "vomit",
    "Turn onto the side first so vomit drains, then suction. Do not bag or insert an adjunct into a full mouth.",
  ),
  (
    "A 22-year-old man has a shard of glass impaled in his cheek. You look inside his mouth and see minor bleeding. The patient is conscious and alert with adequate breathing. What should you do?",
    [
      "Carefully remove the shard of glass in the same direction that it entered",
      "Cut the glass to shorten its length and then stabilize the remaining shard in place",
      "Carefully stabilize the shard of glass and allow him to suction his own mouth",
      "Remove the shard of glass and place gauze in his mouth to control the bleeding",
    ],
    2, 28, "impaled cheek",
    "Stabilize in place. A conscious patient can suction his own mouth; removing the object risks worse bleeding.",
  ),
  (
    "Ventilation is defined as the:",
    [
      "elimination of carbon dioxide from the body.",
      "movement of air into and out of the lungs.",
      "volume of air inhaled into the lungs in a single breath.",
      "exchange of oxygen and carbon dioxide at the cellular level.",
    ],
    1, 11, "ventilation definition",
    "Ventilation is mechanical air movement. Cellular exchange is respiration; one breath volume is tidal volume.",
  ),
  (
    "An unresponsive 60-year-old man is apneic and has a weak, rapid pulse. His oxygen saturation reads 67%. What should you do?",
    [
      "Deliver 10 breaths/min with a bag-mask device",
      "Deliver 20 breaths/min with a pocket face mask",
      "Ventilate the patient with room air for 2 to 3 minutes",
      "Hyperventilate him until his oxygen saturation improves",
    ],
    0, 11, "rescue breathing",
    "Apneic adult with a pulse: about 1 breath every 6 seconds (~10/min) with a BVM and oxygen.",
  ),
  (
    "If an adult patient presents with a respiratory rate of 26 breaths/min, your initial action should be to:",
    [
      "begin assisting his ventilations with a bag-mask device.",
      "apply the pulse oximeter and assess his oxygen saturation.",
      "evaluate his mental status and the depth of his respirations.",
      "apply oxygen via a nonrebreathing mask and take his vital signs.",
    ],
    2, 11, "rate vs adequacy",
    "Rate alone is not enough — check mentation and tidal volume before deciding to bag.",
  ),
  (
    "The amount of air that can be forcibly expelled from the lungs after breathing in as deeply as possible is called:",
    ["dead space.", "vital capacity.", "residual volume.", "functional residual capacity."],
    1, 11, "vital capacity",
    "Vital capacity is maximal forced exhale after a maximal inhale.",
  ),
  (
    "An unresponsive patient has an end-tidal carbon dioxide level of 70 mm Hg. You should conclude that the patient is:",
    [
      "hypercarbic and breathing adequately.",
      "hypocarbic and breathing adequately.",
      "hypercarbic and breathing inadequately.",
      "hypocarbic and breathing inadequately.",
    ],
    2, 11, "ETCO2",
    "ETCO2 of 70 is high (hypercarbia) and means ventilation is inadequate.",
  ),
  (
    "In which position should you place an uninjured, unresponsive patient with a respiratory rate of 14 breaths/min and adequate tidal volume?",
    ["Supine", "Full Fowler", "Semi-Fowler", "Lateral recumbent"],
    3, 11, "recovery position",
    "Adequate breathing and no trauma → lateral recumbent (recovery) position to protect the airway.",
  ),
  (
    "You are administering oxygen at 15 L/min to a patient with respiratory distress. If you are using a D cylinder (cylinder constant, 0.16), which reads 1500 psi, how long will it take before you need to replace the oxygen cylinder?",
    ["9 minutes", "11 minutes", "14 minutes", "18 minutes"],
    2, 11, "cylinder duration",
    "Minutes ≈ (psi − 200) × 0.16 ÷ L/min = 1300 × 0.16 ÷ 15 ≈ 14 minutes.",
  ),
  (
    "Which of the following would cause a decreased level of carbon dioxide in the arterial blood?",
    ["Reduced tidal volume", "Deep, rapid breathing", "Short exhalation phase", "Slow, shallow breathing"],
    1, 11, "hypocarbia",
    "Deep rapid breathing blows off CO2 and lowers arterial CO2.",
  ),
  (
    "Which of the following statements regarding artificial ventilation of an apneic patient who has dentures is correct?",
    [
      "Because of the risk of airway obstruction, the EMT should routinely remove a patient's dentures.",
      "If a patient's dentures are loose, the EMT should use the jaw-thrust maneuver to keep the airway open.",
      "The EMT should not attempt to remove a patient's dentures because this may cause an airway obstruction.",
      "Tight-fitting dentures should be left in place because they facilitate the delivery of adequate tidal volume.",
    ],
    3, 11, "dentures",
    "Well-fitting dentures improve mask seal and tidal volume; remove only if loose.",
  ),
  (
    "Which of the following would be expected to occur in a patient with increased arterial levels of carbon dioxide?",
    [
      "Decreased tidal volume",
      "Increased respiratory rate",
      "Decreased respiratory rate",
      "Increased pulse oximetry reading",
    ],
    1, 11, "CO2 drive",
    "Rising CO2 stimulates faster breathing in a patient with an intact drive.",
  ),
  (
    "Which of the following would likely occur if an adult patient is breathing at a rate of 45 breaths/min with shallow depth?",
    [
      "The volume of air that reaches the alveoli would increase significantly",
      "Minute alveolar ventilation would increase due to the rapid respiratory rate",
      "Most of his or her inhaled air will not go beyond the anatomic dead space",
      "The lungs would become hyperinflated, potentially causing a pneumothorax",
    ],
    2, 11, "dead space",
    "Very rapid shallow breaths mostly ventilate dead space, not alveoli.",
  ),
  (
    "Which of the following describes intrapulmonary shunting?",
    [
      "Insufficient hemoglobin does not allow for adequate oxygen-hemoglobin binding.",
      "Blood from the lungs returns to the left side of the heart in a deoxygenated state.",
      "Blood from the right side of the heart is oxygenated before it moves to the lungs.",
      "Too much carbon dioxide is removed from the blood as it passes through the lungs.",
    ],
    1, 11, "shunt",
    "Shunt means blood passes non-ventilated lung and returns still deoxygenated.",
  ),
  (
    "You are ventilating an apneic 50-year-old woman with a bag-mask device. After squeezing the bag and noting visible chest rise, what should you do?",
    [
      "Squeeze the bag again in 2 to 3 seconds.",
      "Thoroughly suction the patient's oropharynx.",
      "Reopen the airway and ventilate again.",
      "Allow the patient to completely exhale.",
    ],
    3, 11, "BVM timing",
    "After chest rise, allow full exhalation before the next breath.",
  ),
  (
    "A 60-year-old woman presents with chest discomfort, confusion, and weakness. The patient's husband tells you that she vomited once before EMS arrival. The patient's BP is 70/40 mm Hg, her pulse is 45 beats/min and weak, and her respirations are 14 breaths/min and unlabored. Which of the following is the likely cause of her hypotension?",
    ["Bradycardia", "Hypovolemia", "Myocardial ischemia", "Respiratory compromise"],
    0, 17, "bradycardia hypotension",
    "Marked bradycardia with hypotension points to low rate limiting cardiac output.",
  ),
  (
    "Which of the following is a common side effect of nitroglycerin?",
    ["Anxiety", "Headache", "Hypertension", "Nausea"],
    1, 17, "NTG side effect",
    "Vasodilation commonly causes a pounding headache; BP may fall, not rise.",
  ),
  (
    "At the end of ventricular relaxation, the left ventricle contains 110 mL of blood. This is referred to as the:",
    ["preload.", "afterload.", "stroke volume.", "cardiac output."],
    0, 17, "preload",
    "End-diastolic volume is preload.",
  ),
  (
    "A 69-year-old man is unresponsive. He has a weak carotid pulse at 40 beats/min and his skin is cool and pale. From this information, what should the EMT conclude?",
    [
      "He is in ventricular fibrillation.",
      "His cardiac output is reduced.",
      "He has a blocked coronary artery.",
      "His systolic BP is at least 90 mm Hg.",
    ],
    1, 17, "low output",
    "A pulse means not V-fib. Bradycardia with cool pale skin means reduced cardiac output.",
  ),
  (
    "Which of the following is the most detrimental effect that tachycardia can have on a patient experiencing a cardiac problem?",
    [
      "Increased blood pressure",
      "Increased oxygen demand",
      "Increased stress and anxiety",
      "Decreased cardiac functioning",
    ],
    1, 17, "tachycardia",
    "Faster rates raise myocardial oxygen demand and shorten diastolic filling.",
  ),
  (
    "After applying the AED to an adult patient in cardiac arrest, you analyze her cardiac rhythm and receive a shock-advised message. Emergency medical responders who arrived at the scene before you tell you that bystander CPR was not in progress upon their arrival. What should you do?",
    [
      "Perform CPR for 2 minutes and then defibrillate",
      "Detach the AED and prepare for immediate transport",
      "Deliver the shock as indicated followed immediately by CPR",
      "Notify medical control and request permission to cease resuscitation",
    ],
    2, 14, "AED shock",
    "If the AED advises shock, deliver it, then resume CPR immediately.",
  ),
  (
    "A 65-year-old man has generalized weakness and chest pressure. He has a bottle of prescribed nitroglycerin but states that he has not taken any of his medication. What should you do?",
    [
      "Apply the AED and prepare the patient for immediate transport",
      "Administer up to 325 mg of aspirin if the patient is not allergic to it",
      "Assist the patient with his nitroglycerin with medical control approval",
      "Perform a secondary assessment and obtain baseline vital signs",
    ],
    1, 17, "aspirin ACS",
    "For suspected ACS, give aspirin if not contraindicated. He has a pulse — AED is not next.",
  ),
  (
    "A 56-year-old man is found to be pulseless and apneic. His wife states that he collapsed about 5 minutes ago. What should you do while your partner gets the AED from the ambulance?",
    [
      "Insert an oral or nasal airway adjunct",
      "Open the airway and give 2 rescue breaths",
      "Begin CPR, starting with chest compressions",
      "Ask the wife if the patient has an advanced directive",
    ],
    2, 14, "CPR first",
    "Unwitnessed by you / downtime: start high-quality CPR with compressions while the AED is retrieved.",
  ),
  (
    "Aspirin may be contraindicated in patients who have which of the following?",
    ["Glaucoma", "Diabetes", "Stomach ulcers", "Ibuprofen allergy"],
    2, 17, "aspirin contraindication",
    "Active GI ulcers / bleeding history is a classic aspirin contraindication at the EMT level.",
  ),
  (
    "The EMT is treating a man with chest pain and has assisted him with his nitroglycerin. Which of the following should the EMT anticipate during reassessment of this patient?",
    [
      "Decreased blood pressure",
      "Increased level of anxiety",
      "Increased oxygen saturation",
      "Burning sensation in the chest",
    ],
    0, 17, "NTG effect",
    "Nitroglycerin vasodilates and commonly lowers blood pressure.",
  ),
  (
    "While assessing a patient with chest pain, you note that his pulse is irregular. What does this indicate?",
    [
      "Acute myocardial infarction or angina pectoris",
      "Dysfunction in the left side of the patient's heart",
      "High blood pressure that is increasing cardiac workload",
      "Abnormalities in the heart's electrical conduction system",
    ],
    3, 17, "irregular pulse",
    "An irregular pulse reflects an electrical conduction problem, not a specific MI diagnosis.",
  ),
  (
    "Which of the following signs and symptoms is consistent with an underlying cardiac problem?",
    [
      "Anxiety, pallor, unilateral weakness",
      "Tachycardia, epigastric pain, nausea",
      "Tachypnea and palpable pain to the chest",
      "Vomiting, abdominal cramping, diaphoresis",
    ],
    1, 17, "ACS symptoms",
    "Epigastric pain with nausea and tachycardia is a classic atypical ACS pattern.",
  ),
  (
    "Which of the following structures is the primary pacemaker, which sets the normal rate for the heart?",
    ["Bundle of His", "Purkinje fibers", "Sinoatrial node", "Atrioventricular node"],
    2, 17, "SA node",
    "The SA node is the primary pacemaker.",
  ),
  (
    "Which of the following statements regarding ventricular fibrillation (V-fib) is correct?",
    [
      "Loss of consciousness occurs within minutes after the onset of V-fib.",
      "In V-fib, the heart is not pumping any blood and the patient is pulseless.",
      "Patients in V-fib should be defibrillated after every 60 seconds of CPR.",
      "Any patient in V-fib must receive CPR for 5 minutes prior to defibrillation.",
    ],
    1, 14, "V-fib",
    "V-fib produces no effective output — the patient is pulseless and needs immediate defibrillation.",
  ),
  (
    "A 49-year-old woman presents with a headache, nausea, and ringing in her ears. She is conscious and alert and states that she has type 2 diabetes, hypertension, and stage 2 breast cancer. Her BP is 202/114 mm Hg, her pulse is 60 beats/min, and her respirations are 16 breaths/min. What should you suspect?",
    ["Cancer complications", "Diabetic ketoacidosis", "Acute ischemic stroke", "Acute hypertensive crisis"],
    3, 17, "hypertensive crisis",
    "Very high BP with headache, nausea, and tinnitus fits hypertensive crisis more than DKA or stroke alone.",
  ),
  (
    "In which of the following situations would nitroglycerin likely be administered?",
    [
      "Recent use of Cialis (tadalafil)",
      "Systolic BP of 84 mm Hg",
      "The presence of a head injury",
      "History of cardiac bypass surgery",
    ],
    3, 17, "NTG indication",
    "Prior CABG is not a contraindication. PDE-5 drugs, hypotension, and head injury are.",
  ),
  (
    "A 67-year-old woman presents with acute weakness and nausea. She is conscious and alert and her skin is cool and clammy. Her BP is 140/88 mm Hg, pulse is 70 beats/min and regular, and respirations are 16 breaths/min and unlabored. Her medical history includes hypertension and diabetes, and she tells you that she has an implanted pacemaker. What should you suspect?",
    ["Pacemaker malfunction", "Acute hypertensive crisis", "Infection with influenza", "Acute myocardial infarction"],
    3, 17, "ACS atypical",
    "Diabetic with acute weakness, nausea, and cool clammy skin — think ACS, not pacemaker failure with a normal rate.",
  ),
  (
    "After restoring spontaneous circulation in a cardiac arrest patient, you begin immediate transport. While en route to the hospital, the patient remains unresponsive and you can no longer feel a pulse. What should you do?",
    [
      "Advise your partner to stop the ambulance",
      "Begin CPR and proceed to the hospital",
      "Begin rescue breathing with a bag-mask device",
      "Analyze the patient's cardiac rhythm with the AED",
    ],
    0, 14, "rearrest",
    "Stop the vehicle so you can deliver effective CPR and AED care.",
  ),
  (
    "After attaching the AED and pushing the analyze button on a patient in cardiac arrest, the AED gives a check-patient message. What is the likely cause of this?",
    [
      "The patient's cardiac rhythm has deteriorated to asystole",
      "Patient movement was detected during rhythm analysis",
      "The AED detected that a spontaneous pulse has returned",
      "The analysis revealed that the patient is in a shockable rhythm",
    ],
    1, 14, "AED check patient",
    "Movement during analysis commonly triggers a check-patient / cannot analyze message.",
  ),
  (
    "Shortly after assisting a 60-year-old woman with her second nitroglycerin treatment, she tells you that she is lightheaded and feels as if she is going to faint. What should you suspect?",
    [
      "Low blood pressure",
      "An irregular heartbeat",
      "Nervousness and anxiety",
      "A drop in her blood sugar level",
    ],
    0, 17, "NTG syncope",
    "Lightheadedness after NTG is hypotension until proven otherwise.",
  ),
  (
    "A 33-year-old woman was found unresponsive, pulseless, and apneic. Her roommate last saw her three days ago and said she was fine. Assessment reveals that her skin is cyanotic and putrefaction is present. What should you do?",
    [
      "Treat for a presumed opioid overdose",
      "Begin CPR and apply the AED immediately",
      "Ask the roommate if a living will is present",
      "Summon law enforcement to the scene",
    ],
    3, 3, "obvious death",
    "Putrefaction is a definitive sign of death — withhold resuscitation and notify law enforcement.",
  ),
  (
    "Why can tachycardia be detrimental to a patient experiencing a cardiac problem?",
    [
      "Increased cardiac filling in between beats",
      "A profound decrease in oxygen consumption",
      "An associated increase in breathing difficulty",
      "Increased cardiac oxygen usage and demand",
    ],
    3, 17, "tachycardia harm",
    "Tachycardia increases myocardial oxygen demand and reduces diastolic filling time.",
  ),
  (
    "Which of the following is an appropriate response when a patient with chest pain asks you if he or she is having a heart attack?",
    [
      "Yes, so I recommend going to the hospital.",
      "I don't know, but we will take good care of you.",
      "Probably not, but we should transport you to be safe.",
      "I believe you are, but only a physician can tell for sure.",
    ],
    1, 4, "communication",
    "Do not diagnose in the field. Be honest and reassure that you will care for them.",
  ),
  (
    "A 28-year-old woman has severe lower quadrant abdominal pain. What should you do when assessing her abdomen?",
    [
      "Ask her where the pain is located and palpate that area first",
      "Ask her where the pain is located and palpate that area last",
      "Auscultate for bowel sounds for approximately 2 to 5 minutes",
      "Encourage the patient to lie supine with her legs fully extended",
    ],
    1, 19, "abdomen exam",
    "Palpate the painful area last so guarding does not mask the rest of the exam.",
  ),
  (
    "A 46-year-old man was bitten on the leg by a rattlesnake. He complains of generalized weakness and shortness of breath. His BP is 106/58 mm Hg, pulse rate is 112 beats/min, and respirations are 18 breaths/min. What should you do?",
    [
      "Elevate the affected leg and apply ice packs to the wound",
      "Splint the affected leg and position it lower than the heart",
      "Position him supine and elevate both of his legs 12 inches",
      "Apply a proximal arterial constricting band and splint the leg",
    ],
    1, 33, "snakebite",
    "Keep the extremity below heart level, minimize movement with a splint, no ice or arterial bands.",
  ),
  (
    "A 22-year-old man with severe hypothermia is in cardiac arrest. What should you do?",
    [
      "Avoid using the AED",
      "Begin high-quality CPR",
      "Hyperventilate the patient",
      "Perform rescue breathing only",
    ],
    1, 33, "hypothermia arrest",
    "Start high-quality CPR. Limited defibrillation attempts may apply, but CPR is required.",
  ),
  (
    "You are transporting a 30-year-old man who is experiencing an emotional crisis. The patient does not speak when you ask him questions. How should you respond to this?",
    [
      "Remain silent until the patient speaks to you",
      "Continually encourage the patient to talk to you",
      "Tell the patient that you cannot help if he will not talk",
      "Do not speak to the patient, even if he begins to speak to you",
    ],
    0, 23, "behavioral silence",
    "Silence is acceptable; stay present and let him speak when ready.",
  ),
  (
    "Which of the following conditions would be expected to cause flushed skin?",
    ["Blood loss", "Hypothermia", "Heat exposure", "Low blood pressure"],
    2, 33, "flushed skin",
    "Heat exposure commonly causes flushed skin.",
  ),
  (
    "Which of the following mechanisms causes the signs and symptoms of an allergic reaction following a bee sting?",
    [
      "Failure of the immune system to produce antibodies that render the bee's venom inactive",
      "Inability of the immune system to recognize the bee's venom as being a foreign substance",
      "Excessive immune system reaction in which chemicals are released in response to the venom",
      "The direct toxic effects of the bee's venom on the cardiovascular and respiratory systems",
    ],
    2, 21, "allergy mechanism",
    "Allergic reactions are an excessive immune response with chemical mediator release.",
  ),
  (
    "A 19-year-old man injected heroin and is unresponsive. His breathing is slow and shallow, and his skin is cool and pale. What should you do?",
    [
      "Sit him up and keep him warm",
      "Administer intranasal naloxone",
      "Place him in a recumbent position",
      "Ventilate with a bag-mask device",
    ],
    3, 22, "opioid breathing",
    "Inadequate breathing is the immediate threat — ventilate first; give naloxone with or right after airway support.",
  ),
  (
    "A woman with type 1 diabetes has deep, rapid breathing; tachycardia; dehydration; and an altered mental status. Which of the following would best explain her presentation?",
    [
      "Significant underlying infection",
      "Failure to take prescribed insulin",
      "Blood glucose less than 70 mg/dL",
      "Prolonged inadequate food intake",
    ],
    1, 20, "DKA",
    "Kussmaul respirations with dehydration and AMS after missed insulin = DKA, not hypoglycemia.",
  ),
  (
    "A 56-year-old diabetic man is found unresponsive by his wife. She tells you that he ate breakfast four hours earlier but does not know if he took his insulin. His respirations are rapid and shallow, his skin is cool and diaphoretic, and his pulse is rapid and weak. Which of the following statements regarding this patient is correct?",
    [
      "The fact that he ate breakfast makes hypoglycemia highly unlikely.",
      "He probably did not take his insulin and has a high blood glucose level.",
      "You should request an ALS unit so they can give the patient his insulin.",
      "He needs glucose as soon as possible because he is likely hypoglycemic.",
    ],
    3, 20, "hypoglycemia",
    "Cool, diaphoretic, unresponsive diabetic = treat as hypoglycemia until proven otherwise.",
  ),
  (
    "Which of the following clinical presentations is consistent with methamphetamine overdose?",
    [
      "Hypertension, bradycardia, flushed skin, coma",
      "Cyanosis, bradypnea, tremors, constricted pupils",
      "Hypotension, somnolence, unequal pupils, pallor",
      "Hyperthermia, tachycardia, agitation, dilated pupils",
    ],
    3, 22, "meth",
    "Stimulant toxidrome: hot, fast, agitated, dilated pupils.",
  ),
  (
    "A 30-year-old man with a history of schizophrenia cut his wrists and is bleeding profusely. He is confused and combative and has slurred speech. With the assistance of law enforcement personnel, you and your partner physically restrain him so that you can provide care and transport. In this situation, a court of law would likely conclude which of the following?",
    [
      "The patient had decision-making capacity.",
      "Your actions in providing care were appropriate.",
      "You and your partner are guilty of assault and battery.",
      "You should have had a court order to restrain the patient.",
    ],
    1, 3, "emergency doctrine",
    "Life-threatening bleeding with altered capacity supports emergency care and restraint with law enforcement.",
  ),
  (
    "A woman was bitten on the ankle by an unidentified snake while working in her garden. She is conscious and alert, has stable vital signs, and denies shortness of breath. Her only complaint is a burning sensation at the wound site. Your assessment reveals two small puncture wounds, redness, and swelling. What should you do?",
    [
      "Elevate her leg 12 inches and apply an ice pack to reduce pain and swelling",
      "Splint her leg to decrease movement and keep her leg below the level of her heart",
      "Apply a constricting band proximal to the bite and use ice to prevent venom spread",
      "Conclude that envenomation did not occur and allow a friend to take her to the hospital",
    ],
    1, 33, "snakebite stable",
    "Even if stable: immobilize, keep below heart level, transport — no ice or arterial bands.",
  ),
  (
    "Which of the following is a sign of opioid overdose?",
    ["Hyperpnea", "Bradypnea", "Tachycardia", "Hypertension"],
    1, 22, "opioid sign",
    "Opioids cause slow breathing (bradypnea), often with miosis.",
  ),
  (
    "Common complaints in a patient with an infectious disease include which of the following?",
    [
      "Nausea, rash, fever, and shortness of breath",
      "Headache, low back pain, and arm numbness",
      "Chest discomfort, weakness, and vomiting",
      "Joint pain, muscle aches, and blurred vision",
    ],
    0, 15, "infectious disease",
    "Fever with systemic symptoms (nausea, rash, dyspnea) is the infectious pattern.",
  ),
  (
    "Witnesses report that a young man experienced a seizure that lasted about 10 minutes. If the patient truly experienced a seizure, which of the following would you expect to find during your assessment?",
    ["Bradycardia", "Hypotension", "Disorientation", "Hyperglycemia"],
    2, 18, "postictal",
    "Postictal confusion/disorientation is expected after a true seizure.",
  ),
  (
    "Which of the following is a clinically significant finding in a patient experiencing an allergic reaction?",
    ["Headache", "Hoarseness", "Widespread rash", "Abdominal cramps"],
    1, 21, "anaphylaxis airway",
    "Hoarseness signals airway involvement and is clinically critical.",
  ),
  (
    "Which of the following statements regarding lightning-related injuries is correct?",
    [
      "Most patients who are struck by lightning die, even if CPR is provided immediately.",
      "Major fractures, including those of the cervical spine, are the most common cause of death.",
      "The cardiovascular and nervous systems are commonly injured during a lightning strike.",
      "Full-thickness burns are common due to the high electrical energy associated with lightning.",
    ],
    2, 33, "lightning",
    "Lightning commonly injures the heart and nervous system; reverse triage applies when multiple victims.",
  ),
  (
    "Which of the following accurately describes a behavioral crisis?",
    [
      "Acute psychiatric emergency characterized by violent behavior, mood swings, and a loss of connection to reality",
      "Chronic mental health problem in which the patient experiences frequent thoughts of suicide or other self-destructive behavior",
      "Persistent feeling of sadness, despair, or hopelessness that incapacitates the patient and prevents him or her from interacting socially",
      "Reaction to an event that interferes with the activities of daily living or has become unacceptable to the patient, family, or community",
    ],
    3, 23, "behavioral crisis",
    "A behavioral crisis interferes with ADLs or is unacceptable to the patient, family, or community.",
  ),
  (
    "Why should active rewarming of a patient with moderate or severe hypothermia be avoided in the prehospital setting?",
    [
      "The risk of accidentally inducing hyperthermia is too high.",
      "Rewarming too quickly can cause a lethal cardiac dysrhythmia.",
      "It is painful for the patient and you cannot give analgesic drugs.",
      "Active rewarming has been shown to cause severe hypertension.",
    ],
    1, 33, "rewarming",
    "Aggressive field rewarming can precipitate lethal dysrhythmias — use passive measures and gentle handling.",
  ),
  (
    "A 3-month-old infant is unresponsive, pulseless, and apneic. The infant was last seen alive 6 hours ago and its skin is cold and mottled. What should you do?",
    [
      "Begin full resuscitation and transport to the closest hospital",
      "Carefully inspect the environment in which the infant was found",
      "Perform CPR for 10 minutes and then contact medical direction",
      "Withhold CPR but apply the AED to analyze the infant's cardiac rhythm",
    ],
    1, 35, "infant obvious death",
    "Cold, mottled, last seen hours ago — signs of death. Document the scene carefully; do not run futile AED cycles.",
  ),
  (
    "A 29-year-old pregnant woman reports a severe headache, blurred vision, and swelling of her hands and feet. Which of the following additional signs or symptoms would you expect to encounter?",
    ["Hypertension", "Hyperglycemia", "Abdominal pain", "Vaginal bleeding"],
    0, 34, "preeclampsia",
    "Preeclampsia: headache, visual changes, edema — expect hypertension.",
  ),
  (
    "A 26-year-old woman is 38 weeks pregnant and is in labor. She tells you that she had a miscarriage at 9 weeks a few years ago. How should you document her obstetric history?",
    ["Gravida 2, para 0", "Gravida 1, para 1", "Gravida 0, para 2", "Gravida 2, para 1"],
    0, 34, "gravida para",
    "Current pregnancy + prior miscarriage = G2. Miscarriage before viability = para 0.",
  ),
  (
    "Which of the following is a function of the uterus?",
    [
      "Dilates and expels the baby from the cervix",
      "Houses the fetus as it grows for 38 to 40 weeks",
      "Provides oxygen and other nutrients to the fetus",
      "Provides a cushion and protects the fetus from infection",
    ],
    1, 34, "uterus",
    "The uterus houses the growing fetus; placenta provides nutrients; cervix dilates.",
  ),
  (
    "A 3-year-old girl presents with respiratory distress. She is crying and is clinging to her mother. Her heart rate is 150 beats/min and her oxygen saturation is 89%. What should you do?",
    [
      "Administer blow-by oxygen via nonrebreathing mask",
      "Administer an inhaled bronchodilator via face mask",
      "Ventilate with a bag-mask device at 20 breaths/min",
      "Ventilate with a bag-mask device at 30 breaths/min",
    ],
    0, 35, "peds O2",
    "Crying and clinging means she still has energy — give blow-by oxygen; do not force a mask or bag yet.",
  ),
  (
    "When caring for a woman who was sexually assaulted, what should the EMT do?",
    [
      "Ask the patient if she wishes to change her clothes",
      "Obtain a concise, detailed account of what happened",
      "Place any articles of her clothing in a clean plastic bag",
      "Focus any assessments on life-threatening conditions",
    ],
    3, 24, "sexual assault",
    "Treat life threats first. Preserve evidence; avoid unnecessary detailed history or plastic bags for clothing.",
  ),
  (
    "A 5-year-old child has burns to his head, anterior chest, and both upper extremities. What percentage of his total body surface area has been burned?",
    ["45%", "54%", "63%", "72%"],
    1, 35, "rule of nines peds",
    "Pediatric: head 18 + anterior torso 18 + each arm 9 = 54%.",
  ),
  (
    "You are caring for a 6-year-old child with an arm injury and have reason to believe that the child was abused. What should you do?",
    [
      "Inform the parents of your suspicions",
      "Call the police and have the parents arrested",
      "Advise the parents that the child needs to be transported",
      "Assume responsibility for the child and transport at once",
    ],
    2, 35, "suspected abuse",
    "Transport for evaluation and report. Do not accuse parents on scene or 'arrest' them yourself.",
  ),
  (
    "Assessment of a mother in labor reveals that a fetal limb is protruding from the vagina. What should you do?",
    [
      "Position the mother with her hips elevated and administer high-flow oxygen",
      "Position the mother in a semi-Fowler position and administer high-flow oxygen",
      "Give the mother oxygen and attempt to manipulate the protruding limb so that delivery can occur",
      "Apply gentle traction to the protruding limb to remove pressure of the fetus from the umbilical cord",
    ],
    0, 34, "limb presentation",
    "Limb presentation: hips elevated, high-flow O2, rapid transport — do not pull or manipulate the limb.",
  ),
  (
    "After drying, warming, and suctioning a newborn's mouth and nose, assessment reveals central cyanosis, a weak cry, and a heart rate of 60 beats/min. What should you do?",
    [
      "Clamp and cut the umbilical cord and transport at once",
      "Begin chest compressions and reassess after 30 seconds",
      "Resuction the mouth and nose and reassess the heart rate",
      "Ventilate with a bag-mask device at 40 to 60 breaths/min",
    ],
    3, 34, "neonatal PPV",
    "HR 60 after dry/warm/position/suction → positive-pressure ventilation 40–60/min. Compressions if HR stays <60 after PPV.",
  ),
  (
    "A 5-year-old girl is unresponsive and cyanotic following a respiratory illness. Her respiratory rate is 6 breaths/min and shallow and her heart rate is 50 beats/min. What should you do?",
    [
      "Begin CPR and prepare for immediate transport",
      "Give oxygen via nonrebreathing mask and transport",
      "Give oxygen via nasal cannula at 6 L/min and transport",
      "Perform back slaps and chest thrusts and attempt to ventilate",
    ],
    0, 35, "peds CPR",
    "HR 50 with inadequate breathing in a child = start CPR.",
  ),
  (
    "A 7-year-old child has an altered mental status, high fever, and a generalized rash. Which of the following should you anticipate?",
    ["Convulsions", "Hypertension", "Sudden paralysis", "Labored breathing"],
    0, 35, "meningitis",
    "Fever, rash, and AMS — anticipate seizures (meningitis picture).",
  ),
  (
    "General guidelines for assessing a 2-year-old child with abdominal pain and adequate perfusion include which of the following?",
    [
      "Examine the child in the parent's arms",
      "Palpate the painful area of the abdomen first",
      "Place the child supine and palpate the abdomen",
      "Administer oxygen before you begin the assessment",
    ],
    0, 35, "toddler exam",
    "Keep a toddler with the parent when possible; palpate painful areas last.",
  ),
  (
    "A 3-year-old child presents with respiratory distress. The child is being held by her mother and does not react to your presence. What does this finding suggest?",
    [
      "The child has severe hypoxia.",
      "The child is probably sleeping.",
      "The child is afraid of your presence.",
      "The child is reacting normally for her age.",
    ],
    0, 35, "sick child",
    "A toddler who ignores a stranger is a sick-child / hypoxia red flag.",
  ),
  (
    "While assessing a man with difficulty breathing, he extends his arm out to allow you to take his blood pressure. What type of consent is this an example of?",
    ["Implied", "Informal", "Informed", "Expressed"],
    3, 3, "expressed consent",
    "Gesturing for care is expressed (nonverbal) consent.",
  ),
  (
    "Which of the following statements regarding the use of an escort vehicle when en route to an emergency call is correct?",
    [
      "An escort vehicle will allow you to arrive at the scene more quickly.",
      "To avoid getting separated from the escort vehicle, you should follow it closely.",
      "An escort vehicle should be used only if you are unfamiliar with the patient's location.",
      "With an escort vehicle, the risk of an accident at an intersection is reduced significantly.",
    ],
    2, 38, "escort",
    "Escorts add intersection risk. Use only if you do not know the location — and do not tailgate.",
  ),
  (
    "Which of the following injuries or conditions should be assigned the highest triage category?",
    [
      "Forehead contusion with pulselessness and apnea",
      "Bilateral femur fractures with a normal heart rate",
      "Partial-thickness burns with no respiratory difficulty",
      "Large avulsion to the arm and an altered mental status",
    ],
    3, 40, "START triage",
    "Altered mental status with major injury is immediate. Pulseless/apneic forehead contusion is deceased/expectant.",
  ),
  (
    "A 10-year-old child was struck by a car while crossing the street. He has bilateral femur fractures and a severe head injury. His father has been notified and is 20 minutes away. What should you do?",
    [
      "Contact medical control to see if he or she will take custody of the child",
      "Attempt to contact the child's mother to see if she can be there sooner",
      "Begin immediate transport and have law enforcement update the father",
      "Stabilize the child at the scene until the father arrives and gives consent",
    ],
    2, 3, "minor consent emergency",
    "Life-threatening injuries: treat/transport under emergency doctrine; have LE update the parent.",
  ),
  (
    "What is the main goal of any EMS quality improvement program?",
    [
      "Deliver a consistently high standard of care to all patients encountered by the agency",
      "Ensure that all personnel receive an adequate number of continuing education hours",
      "Provide protocols to all EMTs and hold them accountable if protocols are not followed",
      "Recognize high-performing EMTs and acknowledge their outstanding performance",
    ],
    0, 1, "QI",
    "QI exists to deliver consistently high care — not CE hours or awards.",
  ),
  (
    "In which of the following situations could proximate causation on the part of the EMT be established?",
    [
      "Shortly after administering oral glucose to a conscious patient, the patient becomes unresponsive and stops breathing",
      "The EMT administers high-flow oxygen to a severely hypoxemic COPD patient, and the patient suddenly stops breathing",
      "A cardiac arrest patient receives CPR in the field but is not defibrillated for 5 minutes and is pronounced dead at the hospital",
      "A patient involved in a motor vehicle crash refuses spinal precautions in the field and is later diagnosed with a spinal fracture",
    ],
    2, 3, "proximate cause",
    "Delayed defibrillation that contributes to death can establish proximate causation.",
  ),
  (
    "A paramedic first responder assesses a man with chest pain. He obtains an ECG and notes abnormalities, but no obvious evidence of a heart attack. He gives the patient aspirin and nitroglycerin and attempts to begin an IV without success. When the transporting ambulance with an EMT and AEMT on board arrives, the paramedic transfers patient care to them and leaves the scene. The patient is transported to the hospital and is discharged from the emergency department two hours later. Which of the following does this scenario depict?",
    ["Defamation", "Abandonment", "Applied ethics", "Proximate causation"],
    1, 3, "abandonment",
    "Transferring from paramedic care to a lower level without equal/higher acceptance is abandonment.",
  ),
  (
    "In most states, the EMT is required to report which of the following occurrences?",
    ["Animal bite", "Drug overdose", "Injury to a minor", "Motor vehicle crash"],
    0, 3, "mandatory report",
    "Animal bites are a classic mandatory-report situation in most states (abuse is also reportable).",
  ),
  (
    "Which of the following statements best describes a mass-casualty incident?",
    [
      "More than five patients are involved.",
      "At least half of the patients are critically injured.",
      "The number of patients overwhelms your resources.",
      "More than three vehicles are involved in the incident.",
    ],
    2, 40, "MCI definition",
    "MCI = patients overwhelm available resources — not a fixed headcount.",
  ),
  (
    "Which of the following actions demonstrates the EMT's knowledge of crime scene preservation?",
    [
      "At the scene of a shooting, the EMT removes the bullets from a handgun and gives them to a police officer.",
      "The EMT places a shooting victim's blood-soaked shirt into a clean plastic bag and then gives it to a police officer.",
      "While caring for a patient who was stabbed, the EMT moves a coffee table and then informs a police officer afterward.",
      "After assessing a patient with a single stab wound to the chest, the EMT requests law enforcement permission to treat.",
    ],
    2, 3, "crime scene",
    "Move only what care requires, then tell police what you moved. Treat first; use paper bags for clothing.",
  ),
  (
    "When driving in emergency mode on a multilane highway, which lane should the emergency vehicle operator remain in?",
    [
      "Right shoulder so that traffic flow is not disrupted",
      "Extreme left lane so motorists can yield to the right",
      "Extreme right lane so motorists can yield to the left",
      "Center lane so the traffic can flow around the ambulance",
    ],
    1, 38, "emergency driving",
    "Use the far-left lane so other drivers can yield right.",
  ),
  (
    "Your partner, a veteran EMT of 20 years, has been showing up late to work with increasing frequency over the last several shifts. When he arrives, he is in a bad mood and is clearly not interested in being at work. What should you suspect?",
    ["Burnout", "Delirium", "Drug use", "Acute stress"],
    0, 2, "burnout",
    "Chronic lateness and cynicism in a long-time provider suggests burnout.",
  ),
  (
    "Which of the following is the most practical method of standard precautions when treating patients during a mass-casualty incident?",
    [
      "Thoroughly washing your hands in between patient contacts",
      "Changing your gloves in between contacts with different patients",
      "Placing clean gloves over soiled gloves in between patient contacts",
      "Asking each patient you treat if he or she has a communicable disease",
    ],
    1, 40, "MCI PPE",
    "Change gloves between patients — double-gloving soiled gloves is not adequate.",
  ),
  (
    "While triaging patients at a mass-casualty incident, you encounter a responsive middle-aged woman with a respiratory rate of 26 breaths/min. What should you do?",
    [
      "Triage her as immediate (red tag)",
      "Assess for bilateral radial pulses",
      "Administer high-flow oxygen at once",
      "Assess her ability to follow commands",
    ],
    1, 40, "START",
    "START: RR under 30 → check perfusion (radial pulses) next. 26 is not automatic red.",
  ),
  (
    "What should you do when calling in your radio report to the receiving hospital?",
    [
      "Include the patient's name",
      "Be brief, concise, and factual",
      "Give your report only to a physician",
      "Break your report into 60-second increments",
    ],
    1, 4, "radio report",
    "Radio reports are brief, concise, and factual — no patient name over the air.",
  ),
  (
    "A man has a large knife impaled in the center of his chest. He is unresponsive, pulseless, and apneic. What should you do?",
    [
      "Carefully remove the knife, control the bleeding, and begin CPR",
      "Carefully remove the knife, control the bleeding, and apply the AED",
      "Secure the knife in place with a bulky dressing and transport immediately",
      "Stabilize the knife with bulky dressings, begin CPR, and transport at once",
    ],
    0, 30, "impaled arrest",
    "In cardiac arrest, remove a central impaled object that prevents CPR, control bleeding, and start compressions.",
  ),
  (
    "Following penetrating trauma to the abdomen, a woman has a large laceration with a loop of protruding bowel. What should you do?",
    [
      "Carefully replace the bowel and apply an occlusive dressing",
      "Apply a tight pressure dressing to control any external bleeding",
      "Apply a dry, sterile dressing covered by an occlusive dressing",
      "Apply a moist, sterile dressing covered by a dry, sterile dressing",
    ],
    3, 31, "evisceration",
    "Do not push bowel back. Cover with moist sterile dressing, then dry dressing.",
  ),
  (
    "What should you routinely do when assessing and treating a patient with a gunshot wound?",
    [
      "Apply ice directly to the wound",
      "Determine why the patient was shot",
      "Look for the presence of multiple wounds",
      "Evaluate the pulses proximal to the wound",
    ],
    2, 26, "GSW",
    "Always search for entrance and exit / multiple wounds.",
  ),
  (
    "Which of the following assessment findings indicates that a patient with a closed tibial fracture is developing compartment syndrome?",
    [
      "The pain is less than one would expect for the injury.",
      "The extremity becomes increasingly warmer and pinker.",
      "Distal pulses are bounding and reflexes are hyperactive.",
      "The pain increases during passive stretch of the extremity.",
    ],
    3, 32, "compartment syndrome",
    "Pain out of proportion, especially with passive stretch, is the hallmark.",
  ),
  (
    "Despite direct pressure, a large thigh laceration continues to bleed heavily. What should you do?",
    [
      "Elevate the extremity and apply a tight pressure dressing",
      "Apply pressure to the pulse point that is proximal to the injury",
      "Place additional dressings on the wound until the bleeding stops",
      "Apply a tourniquet proximal to the injury until the bleeding stops",
    ],
    3, 26, "tourniquet",
    "Life-threatening extremity bleed not controlled by direct pressure → tourniquet proximal.",
  ),
  (
    "Following blunt injury to the anterior torso, a patient is coughing up bright red blood. What should you suspect?",
    [
      "Intra-abdominal bleeding",
      "Gastrointestinal bleeding",
      "Bleeding within the lungs",
      "Severe myocardial damage",
    ],
    2, 30, "hemoptysis",
    "Coughing bright red blood after chest trauma = pulmonary hemorrhage.",
  ),
  (
    "A woman fell on her knee and is in severe pain. Her knee is flexed and severely deformed. Her leg is cold to the touch, and you are unable to palpate a distal pulse. What should you do?",
    [
      "Place a pillow behind her knee and stabilize the injury by applying padded board splints",
      "Apply gentle longitudinal traction as you straighten her leg and then apply a traction splint",
      "Manually stabilize her injury and contact medical control for further stabilization instructions",
      "Carefully straighten her leg until you restore a distal pulse and then apply padded board splints",
    ],
    2, 32, "knee dislocation",
    "Pulseless deformed knee: stabilize and call medical control before field reduction.",
  ),
  (
    "A man was stabbed two inches to the left of his sternum. He is diaphoretic and tachypneic, his BP is 90/68 mm Hg, and his pulse is rapid and weak. His breath sounds are equal bilaterally. What should you do?",
    [
      "Keep him warm and give oxygen",
      "Ventilate with a bag-mask device",
      "Position him supine and apply the AED",
      "Keep him on his side and elevate his legs",
    ],
    0, 30, "tamponade",
    "Equal breath sounds + shock after parasternal stab = possible tamponade. Support ABCs, O2, rapid transport — he has a pulse.",
  ),
  (
    "A man was hit in the nose during a fight. He has bruising under his left eye and a nosebleed. What should you do?",
    [
      "Place a chemical ice pack over his nose",
      "Determine if he has any visual disturbances",
      "Ensure that he is sitting up and leaning forward",
      "Apply direct pressure by pinching his nostrils together",
    ],
    2, 28, "epistaxis",
    "Epistaxis: sit up, lean forward. Pinching may help after positioning; ice alone is not first.",
  ),
  (
    "A patient with multisystem trauma presents with decerebrate posturing, rapid irregular breathing, and bradycardia. You should suspect injury to which of the following?",
    ["Brainstem", "Spinal cord", "Myocardium", "Temporal lobe"],
    0, 29, "brainstem",
    "Decerebrate posturing with irregular breathing and bradycardia points to brainstem injury.",
  ),
  (
    "Assessment of a man with respiratory distress reveals that his chest has a barrel-shaped appearance and he is exhaling through pursed lips. Which of the following processes is causing his presentation?",
    [
      "Decreased tidal volume",
      "Increased vital capacity",
      "Increased residual volume",
      "Widespread bronchodilation",
    ],
    2, 16, "COPD barrel chest",
    "Barrel chest / pursed-lip breathing reflects air trapping and increased residual volume.",
  ),
  (
    "A 66-year-old man with a history of emphysema presents with respiratory distress. He is conscious but is tired and fatigued. His breathing is labored and shallow, his pulse is rapid and weak, and his skin is cool and pale. What should you do?",
    [
      "Give oxygen via nonrebreathing mask",
      "Assist his breathing with a bag-mask device",
      "Insert a nasal airway and reassess his breathing effort",
      "Give oxygen via nasal cannula and auscultate his lungs",
    ],
    1, 16, "tiring COPD",
    "Tired, shallow, cool/pale = failing ventilation — assist with BVM.",
  ),
  (
    "An obese 56-year-old woman experienced a sudden onset of dyspnea and chest pain while reading a book. Her breathing is labored, and her heart rate is 130 beats/min. Despite supplemental oxygen, her oxygen saturation remains low. What should the EMT suspect?",
    [
      "Acute asthma attack",
      "Pulmonary embolism",
      "Bacterial pneumonia",
      "Spontaneous pneumothorax",
    ],
    1, 16, "PE",
    "Sudden dyspnea/chest pain at rest with persistent hypoxia in an obese patient → PE.",
  ),
  (
    "Which of the following cardiac rhythms originates in the ventricles, usually at a rate of 150 to 200 beats/min, and can cause low blood pressure?",
    [
      "Asystole",
      "Ventricular fibrillation",
      "Ventricular tachycardia",
      "Pulseless electrical activity",
    ],
    2, 17, "VT",
    "VT originates in the ventricles at ~150–200 and can cause hypotension.",
  ),
  (
    "While performing CPR on a patient who is wearing an external defibrillator vest, the device alarms and indicates that a shock is about to be delivered. What should you do?",
    [
      "Remove the battery from the device and apply your AED",
      "Cease patient contact until the shock has been delivered",
      "Continue CPR because the vest delivers a low-energy shock",
      "Allow it to shock, but immediately check for a carotid pulse",
    ],
    1, 14, "defib vest",
    "Clear the patient until the vest delivers its shock.",
  ),
  (
    "Which of the following clinical signs would indicate increased sympathetic nervous system activity?",
    ["Tachycardia", "Hypotension", "Constricted pupils", "Slow respiratory rate"],
    0, 6, "sympathetic",
    "Sympathetic surge causes tachycardia (and often dilated pupils, hypertension).",
  ),
  (
    "Which of the following conditions could be made worse by the administration of epinephrine?",
    ["Asthma", "Bradycardia", "Hypovolemia", "Heart disease"],
    3, 21, "epi caution",
    "Epinephrine increases myocardial demand and can worsen underlying heart disease.",
  ),
  (
    "While triaging patients at the scene of a mass-casualty incident, you encounter a 3-year-old boy who is unresponsive and apneic. After opening his airway, you determine that he remains apneic. According to the JumpSTART triage system, what should you do next?",
    [
      "Assess for a palpable pulse",
      "Deliver 5 rescue breaths",
      "Assign him as immediate",
      "Assign him as deceased",
    ],
    1, 40, "JumpSTART",
    "JumpSTART: if still apneic after opening the airway, give 5 rescue breaths before deciding.",
  ),
  (
    "A week after a near-drowning incident, a 6-year-old boy presents with respiratory distress, tachypnea, and fever. What should you suspect?",
    ["Asthma", "Pertussis", "Pneumonia", "Bronchiolitis"],
    2, 35, "secondary pneumonia",
    "Delayed fever and respiratory distress after drowning suggests secondary pneumonia.",
  ),
  (
    "Which of the following represents a high normal respiratory rate for an infant between 1 month and 1 year of age?",
    ["30 breaths/min", "40 breaths/min", "60 breaths/min", "70 breaths/min"],
    2, 7, "infant RR",
    "Infant high-normal respiratory rate is about 60/min.",
  ),
  (
    "Which of the following processes involves the removal of dirt, dust, blood, or other visible contaminants from a surface or equipment?",
    ["Cleaning", "Disinfection", "Sterilization", "High-level disinfection"],
    0, 2, "cleaning",
    "Cleaning removes visible contaminants. Disinfection/sterilization kill microbes.",
  ),
  (
    "Which of the following is an example of informed consent?",
    [
      "Prior to starting treatment, the EMT asks a patient if he has permission to begin treatment.",
      "The EMT informs a conscious patient of the risks of refusing EMS treatment and transport.",
      "The EMT informs a patient of the potential risks associated with his proposed treatment.",
      "EMTs treat an unresponsive patient under the assumption that he would consent if he was conscious.",
    ],
    2, 3, "informed consent",
    "Informed consent = explaining risks/benefits of the proposed treatment before the patient agrees.",
  ),
  (
    "A woman was ejected from her car when it struck a bridge pillar. During your assessment, you notice that her chest collapses and her abdomen rises during inhalation. What should you suspect?",
    ["Spinal cord injury", "Fractured sternum", "Ruptured diaphragm", "Intra-abdominal bleeding"],
    0, 29, "paradoxical breathing",
    "Abdominal breathing with chest collapse after high MOI suggests diaphragmatic breathing from spinal cord injury.",
  ),
  (
    "A trauma patient has a BP of 172/94 mm Hg, a pulse rate of 45 beats/min, and a respiratory rate of 6 breaths/min. Which of the following conditions would likely cause these vital signs?",
    [
      "Severe internal hemorrhage",
      "Increased intracranial pressure",
      "Increased intrathoracic pressure",
      "Bleeding into the pericardial sac",
    ],
    1, 29, "Cushing triad",
    "Hypertension + bradycardia + slow/irregular respirations = Cushing response to rising ICP.",
  ),
  (
    "A man has partial- and full-thickness burns to his chest and upper extremities. What should you do?",
    [
      "Cover the burns with dry sterile dressings",
      "Carefully peel adhered clothing from the skin",
      "Flush the burns with cool water for 10 minutes",
      "Apply ice packs to his groin to prevent hyperthermia",
    ],
    0, 27, "burn care",
    "Cover with dry sterile dressings. Do not peel adhered clothing or pack ice on large burns.",
  ),
  (
    "A man is experiencing hallucinations and paranoia after abusing an unknown substance. His heart rate is 170 beats/min, he complains of a headache, and he is experiencing muscle twitching. Which of the following could explain his clinical presentation?",
    ["Heroin", "Valium", "Bath salts", "Ketamine"],
    2, 22, "bath salts",
    "Agitated delirium with extreme tachycardia and twitching fits bath salts / stimulant toxidrome better than opioids or benzos.",
  ),
]

CHAPTER_BLOCK = {
  1: 1, 2: 3, 3: 4, 4: 4, 5: 1, 6: 1, 7: 4, 8: 1, 9: 3, 10: 1,
  11: 1, 12: 3, 13: 1, 14: 1, 15: 2, 16: 2, 17: 2, 18: 2, 19: 3, 20: 3,
  21: 3, 22: 3, 23: 3, 24: 3, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1, 30: 2,
  31: 2, 32: 2, 33: 3, 34: 3, 35: 4, 36: 4, 37: 4, 38: 4, 39: 4, 40: 4, 41: 4,
}

def esc(s: str) -> str:
  return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")

lines = []
lines.append('import type { Question } from "./questions"')
lines.append("")
lines.append("/**")
lines.append(" * JB Learning / AAOS TestPrep items transcribed from crew screen recordings")
lines.append(" * (ScreenRecord_20260918_143535 + ScreenRecord_JB_2). Cleaned stems/choices;")
lines.append(" * answers keyed to standard AAOS/JB wording.")
lines.append(" */")
lines.append("export const JB_TESTPREP: Question[] = [")

for i, (stem, choices, ans, ch, tag, why) in enumerate(ITEMS, 1):
  block = CHAPTER_BLOCK[ch]
  lines.append("  {")
  lines.append(f'    id: "jb-{i:03d}",')
  lines.append(f"    chapter: {ch},")
  lines.append(f"    block: {block},")
  lines.append(f"    stem: {stem!r},")
  lines.append("    choices: [")
  for c in choices:
    lines.append(f"      {c!r},")
  lines.append("    ],")
  lines.append(f"    answer: {ans},")
  lines.append(f"    why: {why!r},")
  lines.append(f"    tag: {tag!r},")
  lines.append('    difficulty: "exam",')
  lines.append("  },")

lines.append("]")
lines.append("")

out = Path(r"C:\Users\lukep\.cursor\OpenFart\crew80\src\data\questions-jb-testprep.ts")
out.write_text("\n".join(lines), encoding="utf-8")
print(f"wrote {out} items={len(ITEMS)}")
