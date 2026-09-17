export type StudyPack = {
  chapter: number
  blurb: string
  mustKnow: string[]
  traps: string[]
  terms: { term: string; def: string }[]
  kcNote?: string
}

export const NOTES_B34: StudyPack[] = [
  // ── Block III ──────────────────────────────────────────────────────────────
  {
    chapter: 2,
    blurb:
      "Most EMS injuries and exposures happen before you ever reach the patient — lifting wrong, skipping PPE, or entering an unsafe scene. This chapter is about staying healthy, staying legal, and staying alive so you can do the job for 25 years.",
    mustKnow: [
      "Scene safety outranks patient access — stage, update dispatch, and wait for law enforcement on violent or hazmat scenes.",
      "Standard precautions apply to all patients, all the time — assume every body fluid is infectious.",
      "Exposure control: wash immediately, report immediately, document, and follow the post-exposure protocol.",
      "PPE selection matches the threat: gloves + eye protection baseline; N95 for suspected TB; full barrier for high-splash events.",
      "Power lift: load close to body, back in normal curvature, lift with legs, no twisting.",
      "Critical incident stress is a normal reaction — peer support, EAP, and debriefing, not \"shake it off.\"",
      "Hepatitis B vaccine is offered to at-risk employees; it never replaces PPE or standard precautions.",
      "Competent adults direct their own care — family wishes do not override a patient's informed decisions.",
    ],
    traps: [
      "Entering a violent scene because \"the patient needs us now\" — you become the second victim.",
      "Delaying needlestick reporting until end of shift — post-exposure prophylaxis is time-sensitive.",
      "Using surgical mask alone for suspected TB — you need fit-tested N95; patient gets surgical mask for source control.",
      "Continuing oxygen on a competent, terminally ill patient who clearly refuses it — honor capacity and contact medical control.",
    ],
    terms: [
      { term: "Standard precautions", def: "Treat all blood and body fluids as potentially infectious regardless of diagnosis." },
      { term: "Exposure control plan", def: "Employer protocol for reporting and managing occupational blood/body-fluid exposures." },
      { term: "Critical incident stress", def: "Normal acute stress reaction after emotionally traumatic EMS events." },
      { term: "Power lift", def: "Safe lifting using leg muscles with load close and back straight." },
      { term: "Staging", def: "Positioning at a safe distance until scene hazards are controlled." },
      { term: "Hazmat placard", def: "Diamond label identifying chemical hazards — do not enter without training and PPE." },
    ],
  },
  {
    chapter: 9,
    blurb:
      "EMS is a team sport — even on a two-person crew. Closed-loop communication, clear roles, and clean handoffs prevent the errors that kill patients quietly while everyone thinks someone else handled it.",
    mustKnow: [
      "Closed-loop communication: receive order → repeat back → act → confirm completion.",
      "Team leader coordinates assessment, assigns tasks, and holds the big picture — does not do everything alone.",
      "Verbal handoff: chief complaint, vital trends, treatments given, patient response — not full past history.",
      "First-arriving unit at an MCI: incident command, triage, and resource requests — not tunnel vision on one patient.",
      "Scope of practice is set by state law and medical director — decline tasks outside scope even if a paramedic asks.",
      "Patient advocacy: transport patients who request help; document conflicting family statements objectively.",
      "CQI uses clinical benchmarks to improve systems — it is not individual punishment.",
      "Resolve crew disagreements privately, then present one unified plan to the patient and family.",
    ],
    traps: [
      "Silent compliance without read-back — the leader never knows if the order was heard correctly.",
      "Doing every intervention yourself as team leader — findings get missed and tasks pile up.",
      "Accepting a family member's refusal for a competent patient who wants transport.",
      "Publicly arguing with your partner mid-call — destroys confidence and wastes time.",
    ],
    terms: [
      { term: "Closed-loop communication", def: "Confirming orders by repeating, acting, and reporting completion." },
      { term: "Transfer of care", def: "Formal handoff when an accepting provider takes patient responsibility." },
      { term: "Incident command", def: "Unified command structure coordinating multi-unit emergency scenes." },
      { term: "Triage", def: "Sorting patients by priority when resources cannot meet demand." },
      { term: "CQI", def: "Continuous quality improvement through measured performance feedback." },
      { term: "Mobile integrated healthcare", def: "Scheduled community-based care to reduce readmissions and fill system gaps." },
    ],
  },
  {
    chapter: 12,
    blurb:
      "Pharmacology at the EMT level is about doing the math, checking the six rights, and knowing which vial kills a patient if you grab the wrong one. Concentration errors — especially epinephrine — are the classic field medication failure.",
    mustKnow: [
      "Six rights: patient, medication, dose, route, time, documentation.",
      "Routes by speed: inhaled (fastest for EMT meds) → IM → subcutaneous → oral → rectal.",
      "Epinephrine 1:1000 = 1 mg/mL — the IM anaphylaxis concentration; 1:10,000 = 0.1 mg/mL for IV cardiac arrest.",
      "Adult anaphylaxis: 0.3 mg of 1 mg/mL IM = 0.3 mL drawn; pediatric: 0.15 mg IM.",
      "Assist vs administer: patient's own prescribed med (inhaler) vs ambulance-carried med you give.",
      "Nitroglycerin contraindications: SBP <90 or drop >30, right ventricular MI, PDE-5 inhibitors within 24–48 hours.",
      "Aspirin contraindications: true allergy, active GI bleed, inability to swallow — home low-dose aspirin is not a contraindication.",
      "Expired, cloudy, or discolored medication is out of service — replace before the shift.",
    ],
    traps: [
      "Drawing 3 mL from 1 mg/mL vial thinking you need 0.3 mg — that delivers 3 mg, a tenfold overdose.",
      "Using 1:10,000 (0.1 mg/mL) vial for IM anaphylaxis — wrong concentration entirely.",
      "Giving nitroglycerin after recent sildenafil — profound refractory hypotension.",
      "Giving oral glucose to an unresponsive patient — aspiration risk; manage airway first.",
    ],
    terms: [
      { term: "Concentration", def: "Amount of drug per unit volume (e.g., 1 mg/mL)." },
      { term: "Indication", def: "Approved reason to give a specific medication." },
      { term: "Contraindication", def: "Condition that makes a medication potentially harmful." },
      { term: "Pharmacokinetics", def: "What the body does to a drug — absorption, distribution, metabolism, excretion." },
      { term: "Formulary", def: "List of medications approved for use on an ambulance." },
      { term: "Patient-assisted medication", def: "Helping a patient use their own prescribed medication." },
    ],
    kcNote:
      "KC Check & Inject (skill #69): epinephrine 1 mg/mL (1:1000) IM only — adult 0.3 mg (0.3 mL), pediatric 0.15 mg (0.15 mL) into vastus lateralis. Verify concentration before drawing; 1:10,000 is the IV cardiac-arrest syringe. Confirm six rights, document time and site, and prepare for repeat dose per protocol.",
  },
  {
    chapter: 19,
    blurb:
      "Abdominal pain is a black box until the hospital opens it — your job is to recognize the patterns that kill (AAA, GI bleed, ectopic) and support perfusion while you drive. Never assume \"just a stomach ache.\"",
    mustKnow: [
      "AAA classic: sudden tearing back/flank pain, pulsatile abdominal mass, unequal femoral pulses, hypotension.",
      "Upper GI bleed: hematemesis (vomit blood), melena (black tarry stool) — treat for shock, NPO, rapid transport.",
      "Peritonitis: patient lies still, knees drawn up, pain worsens with movement — do not jostle.",
      "Renal colic: severe flank pain radiating to groin, restlessness, nausea — supportive care and transport; keep AAA on differential in older patients.",
      "Dialysis patient who missed sessions: fluid overload — JVD, crackles, edema; sit upright, O₂, never use fistula arm for BP or IV.",
      "Esophageal varices: cirrhosis history — massive hematemesis risk; protect airway, suction ready.",
      "Cholecystitis: RUQ pain after fatty meal, referred to right shoulder/scapula.",
      "GI/GU bleeding with shock: high-flow O₂, warmth, position of comfort, nothing by mouth, load and go.",
    ],
    traps: [
      "Calling renal colic and skipping AAA workup in an older patient with flank pain.",
      "Laying a fluid-overloaded dialysis patient flat — worsens pulmonary edema.",
      "Giving oral fluids to a GI bleed patient in shock.",
      "Assuming soft abdomen means no serious problem — early peritoneal irritation takes time to develop.",
    ],
    terms: [
      { term: "Hematemesis", def: "Vomiting blood — suggests upper GI bleeding." },
      { term: "Melena", def: "Black, tarry stool from digested blood." },
      { term: "Peritonitis", def: "Inflammation of the peritoneum causing rigid, still abdomen." },
      { term: "Renal colic", def: "Severe pain from ureteral stone passage." },
      { term: "AV fistula", def: "Surgical vascular access for dialysis — protect from BP cuff and needles." },
      { term: "Referred pain", def: "Pain felt distant from the source organ (e.g., gallbladder → shoulder)." },
    ],
  },
  {
    chapter: 20,
    blurb:
      "Diabetes, sickle cell, anticoagulants, and thyroid disease all show up as altered mental status, shock, or weird vitals on the truck. Check glucose early, protect the airway, and know which emergencies look like something else entirely.",
    mustKnow: [
      "DKA (type 1): slow onset, Kussmaul respirations, fruity breath, hyperglycemia, dehydration — not the same as hypoglycemia.",
      "Hypoglycemia: sudden onset, diaphoresis, altered mental status, tachycardia — check glucose on every diabetic AMS call.",
      "Oral glucose: only if awake, can follow commands, and can swallow — never in unresponsive or seizing patients.",
      "HHNS (type 2): very high glucose, profound dehydration, AMS — no ketosis, no Kussmaul, no fruity breath.",
      "Sickle cell vaso-occlusive crisis: triggered by hypoxia, dehydration, cold — O₂, warmth, gentle handling, transport.",
      "Hemophilia: internal joint bleeding without skin break — splint, cold, transport for factor replacement; no tourniquet.",
      "Anticoagulated head injury: lucid interval possible — transport despite normal exam.",
      "Thyroid storm: tachycardia, hyperthermia, agitation, tremor — ABCs, cooling, rapid transport.",
    ],
    traps: [
      "Giving oral glucose to an unresponsive hypoglycemic — airway first, ALS for IV dextrose or glucagon.",
      "Treating DKA like hypoglycemia — opposite problems; DKA is hyperglycemic.",
      "Applying cold packs during sickle cell crisis — worsens sickling; warmth and O₂.",
      "Trusting a single low glucometer reading that doesn't match the clinical picture — recheck with clean site and fresh strip.",
    ],
    terms: [
      { term: "DKA", def: "Diabetic ketoacidosis — insulin deficiency with acidosis and ketone production." },
      { term: "Kussmaul respirations", def: "Deep, rapid breathing compensating for metabolic acidosis." },
      { term: "HHNS", def: "Hyperosmolar hyperglycemic nonketotic syndrome — extreme hyperglycemia without ketosis." },
      { term: "Vaso-occlusive crisis", def: "Sickle cell pain episode from red cell sickling in vessels." },
      { term: "Glucometry", def: "Finger-stick blood glucose measurement at the point of care." },
      { term: "Thyroid storm", def: "Life-threatening thyrotoxicosis with hyperthermia and cardiovascular collapse." },
    ],
    kcNote:
      "Block III skills #61 and #73 test oral glucose and BGL: confirm the patient is awake with a gag, can swallow, and follows commands before gel administration. Recheck glucose after treatment. Unresponsive or seizing patients get airway management and ALS — not oral glucose.",
  },
  {
    chapter: 21,
    blurb:
      "Anaphylaxis is airway and circulation failure happening in minutes — epinephrine IM is the drug, not Benadryl, not albuterol alone. Recognize the difference between hives-only allergic reaction and full anaphylaxis, then treat aggressively.",
    mustKnow: [
      "Anaphylaxis = allergic reaction PLUS respiratory compromise (wheezing, stridor) and/or circulatory compromise (hypotension, shock).",
      "Skin-only hives with clear lungs and stable BP = allergic reaction — monitor closely, no epinephrine yet.",
      "First-line drug: epinephrine IM 0.3 mg adult (0.15 mg pediatric) into vastus lateralis — not subcutaneous.",
      "Epinephrine works in minutes: alpha-1 vasoconstriction, beta-2 bronchodilation, reduced mucosal edema.",
      "Repeat epinephrine per protocol if airway swelling or shock persists after first dose.",
      "After epinephrine: high-flow O₂, assist ventilations with BVM if needed, position supine with legs elevated unless contraindicated.",
      "Biphasic reactions occur hours later — anyone who receives epinephrine must go to the hospital.",
      "Auto-injector: lateral thigh, firm perpendicular push, hold per device instructions, brief massage.",
    ],
    traps: [
      "Giving epinephrine for skin-only hives without respiratory or circulatory involvement.",
      "Using diphenhydramine as first-line instead of epinephrine — antihistamines are too slow.",
      "Letting a patient go home after epinephrine because symptoms resolved — biphasic reaction risk.",
      "Using 0.15 mg adult dose or subcutaneous route — wrong dose and wrong route for shock.",
    ],
    terms: [
      { term: "Anaphylaxis", def: "Severe systemic allergic reaction with airway and/or circulatory compromise." },
      { term: "Biphasic reaction", def: "Recurrence of anaphylaxis hours after initial resolution." },
      { term: "Stridor", def: "High-pitched inspiratory sound from upper airway narrowing." },
      { term: "Urticaria", def: "Hives — raised, itchy wheals on the skin." },
      { term: "Vastus lateralis", def: "Lateral thigh muscle — preferred IM injection site for epinephrine." },
      { term: "Mast cell degranulation", def: "Release of histamine and mediators triggering allergic cascade." },
    ],
    kcNote:
      "KC Check & Inject (skill #69): 1 mg/mL (1:1000) IM — 0.3 mg adult, 0.15 mg pediatric into vastus lateralis. Thigh, not deltoid or buttock. Anyone receiving epi transports. Repeat per protocol if stridor or hypotension persists. Antihistamines and steroids are adjuncts — epi first, always.",
  },
  {
    chapter: 22,
    blurb:
      "Toxicology is pattern recognition plus supportive care — most overdoses won't get a specific antidote in the field, but opioids, organophosphates, and a few ingestions do have EMT-level interventions. Ventilate first, antidote second.",
    mustKnow: [
      "Opioid overdose: respiratory depression, pinpoint pupils, apnea — ventilate with BVM first, then naloxone.",
      "Naloxone wears off before many opioids — renarcotization risk; encourage transport even if patient wakes up.",
      "Activated charcoal: alert patient, recent ingestion, no corrosive/hydrocarbon/petroleum product — and intact gag reflex.",
      "Organophosphate poisoning: SLUDGE (salivation, lacrimation, urination, defecation, GI upset, emesis) + pinpoint pupils — atropine is ALS.",
      "Carbon monoxide: headache, cherry-red skin (late), multiple victims in same location — high-flow O₂, remove from source.",
      "Acetaminophen overdose: initially vague symptoms — transport for antidote (N-acetylcysteine) within treatment window.",
      "Ingested corrosives (lye, drain cleaner): do NOT induce vomiting or give charcoal — dilute with water if alert, transport.",
      "Sympathomimetic overdose (cocaine, meth): agitation, tachycardia, hypertension, hyperthermia — calm, cool, transport; avoid beta-blockers.",
    ],
    traps: [
      "Giving naloxone before ventilating an apneic opioid patient — hypoxic brain injury happens in minutes.",
      "Honoring refusal after naloxone because the patient feels fine — renarcotization can be fatal.",
      "Giving activated charcoal for drain cleaner or gasoline ingestion — causes vomiting and re-exposure.",
      "Giving charcoal to an unresponsive patient without gag reflex — aspiration pneumonia.",
    ],
    terms: [
      { term: "Naloxone", def: "Opioid antagonist reversing respiratory depression." },
      { term: "Activated charcoal", def: "Adsorbent binding certain ingested toxins in the GI tract." },
      { term: "SLUDGE", def: "Mnemonic for cholinergic poisoning signs." },
      { term: "Sympathomimetic", def: "Drug mimicking sympathetic nervous system effects." },
      { term: "Renarcotization", def: "Return of opioid effects as naloxone wears off." },
      { term: "Toxidrome", def: "Cluster of signs suggesting a class of poisoning." },
    ],
    kcNote:
      "Block IV skill #63 — nasal Narcan: ventilate with BVM and O₂ FIRST on an apneic opioid patient, then administer naloxone. Opioids kill by apnea, not by pupil size. After reversal, de-escalate and strongly encourage transport — naloxone duration is shorter than most opioids.",
  },
  {
    chapter: 23,
    blurb:
      "Behavioral emergencies are medical emergencies until proven otherwise — hypoglycemia, hypoxia, stroke, and infection all present as combativeness or psychosis. Your safety comes first, but restraint is a last resort with strict rules.",
    mustKnow: [
      "New behavioral change in an older adult = organic cause until ruled out — check glucose, SpO₂, perfusion.",
      "Hypoglycemia mimics psychiatric crisis: combative, diaphoretic, slurred speech — check BGL before restraining.",
      "De-escalation: calm voice, personal space, honest answers, visible exit route — never trap or argue with delusions.",
      "Suicide high risk: specific plan + means + access + prior attempt — do not leave patient alone, remove means if safe.",
      "Restraint: last resort, adequate personnel, supine or lateral positioning, never prone, never cover face.",
      "Monitor airway and circulation continuously after restraint — positional asphyxia kills.",
      "Excited delirium: sudden quiet after struggle may be cardiac arrest — assess immediately.",
      "Mental health hold by law enforcement overrides patient refusal — transport and document authority used.",
    ],
    traps: [
      "Transporting new-onset altered behavior directly to a psych facility without medical workup.",
      "Prone restraint or hog-tying — positional asphyxia; supine only with serial distal checks.",
      "Assuming intoxication without checking glucose and oxygenation.",
      "Documenting opinions (\"patient was psychotic\") instead of objective behavior quotes.",
    ],
    terms: [
      { term: "Excited delirium", def: "Hyperthermic, agitated state with sudden cardiovascular collapse risk." },
      { term: "Positional asphyxia", def: "Airway compromise from body position restricting chest expansion." },
      { term: "De-escalation", def: "Verbal and environmental techniques to reduce agitation without force." },
      { term: "Involuntary hold", def: "Legal authority to transport a patient against their will for mental health evaluation." },
      { term: "Organic cause", def: "Medical condition (not primary psychiatric) producing behavioral symptoms." },
      { term: "Mandated reporter", def: "Provider legally required to report suspected abuse or imminent harm." },
    ],
  },
  {
    chapter: 24,
    blurb:
      "GYN calls require clinical judgment, privacy, and restraint — you are not doing a pelvic exam in the field. Know ectopic pregnancy and hemorrhagic shock patterns, preserve evidence on assault calls, and never pack the vagina.",
    mustKnow: [
      "Always ask LMP (last menstrual period) in any woman of childbearing age with abdominal pain.",
      "Ruptured ectopic: childbearing age + missed period + unilateral pain + shock — surgical emergency.",
      "Heavy vaginal bleeding with shock: external pad only, O₂, supine, warmth, rapid transport — never pack vagina.",
      "Sexual assault: treat injuries, discourage washing, preserve clothing, limit exam to what care requires.",
      "Privacy: minimum exposure, clear bystanders, offer chaperone, professional language.",
      "Toxic shock syndrome: fever, rash, hypotension, retained tampon — treat as septic shock.",
      "PID: fever, foul discharge, lower abdominal pain, painful walking — transport for antibiotics.",
      "Straddle injury: external direct pressure with moist dressing, privacy, chaperone — no internal exam.",
    ],
    traps: [
      "Packing the vaginal canal to control bleeding — never do internal packing or exam.",
      "Assuming dysmenorrhea and refusing transport — ectopic and appendicitis mimic cramps.",
      "Having a sexual assault victim shower or change clothes before transport — destroys evidence.",
      "Delaying care until a female provider arrives — treat now with appropriate privacy measures.",
    ],
    terms: [
      { term: "Ectopic pregnancy", def: "Fertilized egg implanted outside uterus — rupture causes internal hemorrhage." },
      { term: "LMP", def: "Last menstrual period — key history for pregnancy-related emergencies." },
      { term: "PID", def: "Pelvic inflammatory disease — ascending infection of female reproductive organs." },
      { term: "Toxic shock syndrome", def: "Toxin-mediated illness often linked to retained tampons." },
      { term: "Dysmenorrhea", def: "Painful menstruation — a diagnosis of exclusion in the field." },
      { term: "Chaperone", def: "Witness present during sensitive exams to protect patient and provider." },
    ],
  },
  {
    chapter: 33,
    blurb:
      "Heat kills the brain, cold kills the heart, and water kills by hypoxia — environmental calls are about removing the patient from the threat, supporting ABCs, and knowing when aggressive field cooling or rewarming starts on scene.",
    mustKnow: [
      "Heat stroke: altered mental status + hot skin (may be dry or wet) — true emergency; active cooling and rapid transport.",
      "Heat exhaustion: heavy sweating, normal mental status, cramps/nausea — shade, rest, oral fluids if alert.",
      "Active cooling: move to cool area, remove clothing, wet skin and fan, cold packs to groin/axillae/neck.",
      "Hypothermia: handle gently — cold myocardium fibrillates with rough handling; insulate, warm core, transport.",
      "Cold water drowning: \"not dead until warm and dead\" — start CPR, handle gently, transport for rewarming.",
      "Frostbite: protect with dry dressings, no rubbing, no refreeze — controlled rewarming at hospital.",
      "Drowning: ventilate with BVM — do not attempt to drain water from lungs; abdominal thrusts cause aspiration.",
      "Lightning: reverse triage — the apneic/pulseless patient may respond to immediate CPR.",
    ],
    traps: [
      "Giving oral fluids to a heat stroke patient with altered mental status — aspiration risk.",
      "Vigorous extremity massage in hypothermia — triggers ventricular fibrillation.",
      "Withholding CPR on a cold pulseless patient because they feel stiff — rewarm first at hospital.",
      "Rubbing frostbitten tissue — causes further tissue damage.",
    ],
    terms: [
      { term: "Heat stroke", def: "Life-threatening hyperthermia with central nervous system dysfunction." },
      { term: "Hypothermia", def: "Core body temperature below 95°F (35°C)." },
      { term: "Frostbite", def: "Tissue freezing injury from prolonged cold exposure." },
      { term: "Decompression sickness", def: "Nitrogen bubble formation after rapid ascent from depth." },
      { term: "HACE", def: "High-altitude cerebral edema — ataxia and confusion at elevation." },
      { term: "Reverse triage", def: "Prioritizing apparently dead patients who may survive with immediate intervention." },
    ],
  },
  {
    chapter: 34,
    blurb:
      "OB/neonatal calls are rare but high-stakes — prolapsed cord, shoulder dystocia, and postpartum hemorrhage cannot wait for the hospital. Know normal delivery steps, neonatal resuscitation basics, and when to load and go without delivering.",
    mustKnow: [
      "Normal delivery: support head, check for nuchal cord (slip over head or clamp if tight), deliver anterior then posterior shoulder.",
      "Prolapsed cord: knee-chest or Trendelenburg, two gloved fingers lifting presenting part off cord — never push cord back in.",
      "Nuchal cord: if loose, slip over head; if tight, clamp and cut between two clamps before delivering shoulders.",
      "Neonate resuscitation: warm, dry, stimulate; if apneic/pulseless → PPV with BVM and O₂; compressions if HR <60 after ventilation.",
      "Postpartum hemorrhage: fundal massage, high-flow O₂, rapid transport — placenta delivery may be ALS/hospital.",
      "Breech: do not pull — support body, deliver to umbilicus, create airway if head delayed.",
      "Shoulder dystocia: McRoberts maneuver (mother's knees to chest), suprapubic pressure — do not pull on head.",
      "Newborn vitals: HR 100–160, RR 30–60, cap refill <3 sec — bradycardia in neonate = ventilate first.",
    ],
    traps: [
      "Pushing a prolapsed cord back into the vagina — compresses vessels and kills the fetus.",
      "Cutting a loose nuchal cord before trying to slip it over the head — unnecessary.",
      "Aggressive stimulation of a preterm or compromised neonate — gentle drying and warmth first.",
      "Delaying transport for a complicated delivery when mother or baby is crashing — scoop and go.",
    ],
    terms: [
      { term: "Prolapsed cord", def: "Umbilical cord presenting before the fetus — compresses blood flow." },
      { term: "Nuchal cord", def: "Cord wrapped around the infant's neck during delivery." },
      { term: "Fundal massage", def: "Rubbing the uterine fundus to control postpartum bleeding." },
      { term: "McRoberts maneuver", def: "Hyperflexing maternal hips to relieve shoulder dystocia." },
      { term: "APGAR", def: "Neonatal assessment at 1 and 5 minutes: Appearance, Pulse, Grimace, Activity, Respiration." },
      { term: "PPV", def: "Positive pressure ventilation — BVM breaths for apneic neonate." },
    ],
    kcNote:
      "Block IV Saturday lab covers birth/NRP scenarios: full barrier PPE (gloves, gown, mask, eye protection) for delivery. Prolapsed cord = elevate presenting part, knee-chest, O₂, emergency transport. Neonate: warm, dry, stimulate → ventilate if apneic → compressions only if HR stays <60 with effective PPV.",
  },

  // ── Block IV ──────────────────────────────────────────────────────────────
  {
    chapter: 3,
    blurb:
      "Legal and ethical rules define what you can do, what you must do, and what gets you sued. Consent, refusal, DNR, HIPAA, and abandonment — know the doctrine, document the conversation, and call medical control when the family and patient disagree.",
    mustKnow: [
      "Competent adults have the right to accept or refuse care — capacity requires understanding, not agreement.",
      "Expressed consent: patient with capacity agrees after explanation of risks and benefits.",
      "Implied consent: unresponsive or incapacitated patient with life-threatening condition.",
      "Emancipated minors (married, military, self-supporting) consent/refuse as adults.",
      "Invalid or unverifiable DNR = full resuscitation until medical direction confirms otherwise.",
      "Intoxicated/disoriented patient cannot give informed refusal — treat under implied consent.",
      "Abandonment = terminating care without transfer to equal/higher provider — verbal report required at ED.",
      "Assault = creating fear of unwanted contact; battery = actual unwanted contact — threat alone is assault.",
    ],
    traps: [
      "Accepting a family member's refusal for a competent patient who wants help.",
      "Withholding CPR on an unsigned DNR photocopy — resuscitate and verify with medical direction.",
      "Leaving a patient in the ED hallway without verbal report — that's abandonment.",
      "Restraining prone and documenting patient consent they never gave.",
    ],
    terms: [
      { term: "Informed consent", def: "Patient with capacity agrees after risks, benefits, and alternatives are explained." },
      { term: "Implied consent", def: "Presumed consent when patient cannot respond and condition is life-threatening." },
      { term: "Emancipated minor", def: "Minor legally independent and able to consent for themselves." },
      { term: "Abandonment", def: "Ending patient care without proper transfer to an accepting provider." },
      { term: "Negligence", def: "Failure to meet standard of care causing compensable injury (duty, breach, damages, causation)." },
      { term: "POLST", def: "Physician Orders for Life-Sustaining Treatment — valid medical orders for end-of-life care." },
    ],
    kcNote:
      "King County: valid POLST follows the patient — comfort measures still include positioning, suction, and O₂. Family wishes do not override a signed directive; involve medical control. Document capacity assessment on every refusal: alert, oriented, understands risks, alternative plan offered.",
  },
  {
    chapter: 4,
    blurb:
      "If it isn't written, it didn't happen — and if it's written wrong, it can end your certification. PCRs are legal documents, radio reports have a format, and corrections must preserve the original entry.",
    mustKnow: [
      "PCR is a legal medical record — objective, timely, complete, and accurate.",
      "Correct errors with a single line through the entry, initial, date, and write the correction — no white-out.",
      "Radio report format: unit ID, scene info, patient age/sex, chief complaint, vitals, treatments, ETA.",
      "Document refusals: capacity assessment, risks explained, patient statements verbatim, witness names, medical control contact.",
      "Document restraints: objective behavior, type, time applied, who applied, serial distal PMS checks.",
      "Use approved abbreviations only — avoid dangerous shorthand (U for units, D/C for discharge).",
      "Times matter: dispatch, en route, on scene, patient contact, depart scene, at hospital, transfer of care.",
      "Confidentiality (HIPAA): share information only for treatment, payment, operations, or legal mandate.",
    ],
    traps: [
      "Using correction fluid or blacking out errors — destroys legal integrity of the record.",
      "Charting \"patient refused\" without documenting capacity assessment and risk discussion.",
      "Subjective opinions (\"patient was drunk and uncooperative\") instead of objective descriptions.",
      "Sharing patient HIV status with police without consent or legal authority.",
    ],
    terms: [
      { term: "PCR", def: "Patient care report — the official EMS medical record." },
      { term: "HIPAA", def: "Federal law protecting patient health information privacy." },
      { term: "Objective documentation", def: "Recording observable facts and direct quotes, not opinions." },
      { term: "Transfer of care", def: "Verbal report to accepting provider documented with name and time." },
      { term: "Chronological record", def: "Events documented in time sequence with specific times noted." },
      { term: "Amendment", def: "Legal correction to a chart entry preserving the original text." },
    ],
  },
  {
    chapter: 7,
    blurb:
      "Kids are not small adults, old people are not just slow adults, and pregnancy changes everything. Lifespan development tells you what vitals are normal, what airway tricks you need, and when the law treats a patient as an adult.",
    mustKnow: [
      "Infant airway: large occiput — pad shoulders (not head) to achieve neutral alignment when supine.",
      "Pediatric vitals vary by age — bradycardia in infants/children is often hypoxia; ventilate before compressing.",
      "Compensated shock in children: tachycardia and delayed cap refill with normal BP — hypotension is late.",
      "Geriatric changes: decreased skin elasticity, blunted pain response, polypharmacy, atypical MI presentation.",
      "Pregnancy: blood volume increases, heart rate rises, supine hypotension from IVC compression — left lateral tilt.",
      "Neonates: HR 100–160, RR 30–60; thermoregulation poor — dry and warm immediately.",
      "Adolescent autonomy varies by state — emancipation, mature minor doctrine, and reproductive care laws differ.",
      "Elderly fall risk: osteoporosis, gait instability, medication effects — low-mechanism injuries still serious.",
    ],
    traps: [
      "Using adult vital sign ranges for pediatric patients — missed compensated shock.",
      "Hyperextending an infant's neck for airway — pad shoulders instead.",
      "Assuming chest pain is required for MI in elderly diabetics — atypical presentations are common.",
      "Placing a third-trimester patient flat on back — uterus compresses IVC, drops BP.",
    ],
    terms: [
      { term: "Fontanelle", def: "Soft spot on infant skull where cranial bones have not fused." },
      { term: "Occiput", def: "Back of the head — disproportionately large in infants." },
      { term: "Polypharmacy", def: "Use of multiple medications — common in elderly, increases interaction risk." },
      { term: "Supine hypotensive syndrome", def: "IVC compression by gravid uterus when lying flat." },
      { term: "Mature minor", def: "Legal doctrine allowing minors to consent for specific care (varies by state)." },
      { term: "Thermoregulation", def: "Body's ability to maintain core temperature — impaired in infants and elderly." },
    ],
    kcNote:
      "Pediatric assessment triangle (appearance, work of breathing, circulation to skin) gives your general impression before hands-on contact. All three sides abnormal = cardiopulmonary failure. Infant BVM: shoulder roll for neutral airway. Child bradycardia → ventilate with O₂ first; compressions only if HR stays <60 with poor perfusion despite effective ventilation.",
  },
  {
    chapter: 35,
    blurb:
      "Pediatric calls trigger everyone's adrenaline — slow down and use the tools: pediatric assessment triangle, weight-based thinking, and family-centered care. Most pediatric arrests are respiratory, not cardiac.",
    mustKnow: [
      "Pediatric assessment triangle: appearance + work of breathing + circulation to skin — from the doorway.",
      "All three triangle sides abnormal = cardiopulmonary failure — immediate intervention.",
      "Epiglottitis: tripod, drooling, muffled voice, high fever, NO barky cough — nothing in mouth, position of comfort, transport.",
      "Croup: barking cough, stridor when agitated, playful at rest — keep calm, humidified/cool air, transport.",
      "Febrile seizure: postictal care — recovery position, protect airway, passive cooling, transport for workup.",
      "Infant airway obstruction (conscious): alternating back slaps and chest thrusts — never abdominal thrusts.",
      "Pediatric bradycardia: ventilate with BVM and O₂ first — compressions if HR <60 despite effective ventilation.",
      "Blow-by O₂ for fighting toddlers — struggling with a mask increases O₂ demand.",
    ],
    traps: [
      "Visualizing the posterior pharynx in suspected epiglottitis — can trigger complete obstruction.",
      "Abdominal thrusts on an infant — use back slaps and chest thrusts instead.",
      "Starting compressions before ventilating a bradycardic child — hypoxia is the cause.",
      "Confronting suspected child abuse on scene — document objectively, transport, report through mandated channels.",
    ],
    terms: [
      { term: "Pediatric assessment triangle", def: "Visual tool evaluating appearance, breathing effort, and skin circulation." },
      { term: "Epiglottitis", def: "Bacterial supraglottic infection — airway emergency, do not instrument." },
      { term: "Croup", def: "Viral subglottic swelling causing barking cough and stridor." },
      { term: "Febrile seizure", def: "Seizure triggered by fever in young children, usually benign." },
      { term: "Cardiopulmonary failure", def: "Combined respiratory and circulatory compromise in a pediatric patient." },
      { term: "Blow-by oxygen", def: "O₂ held near face without tight mask — useful for uncooperative children." },
    ],
    kcNote:
      "Pediatric epi dosing: 0.15 mg IM (1:1000) for children under ~30 kg; 0.3 mg for larger children/adults. Epi auto-injector: junior (0.15 mg) vs standard (0.3 mg). Weight-based Broselow tape if available. Child abuse: mechanism must match injury — infants don't get spiral fractures from rolling off a couch.",
  },
  {
    chapter: 36,
    blurb:
      "Geriatric patients break easily, hurt quietly, and take a pharmacy full of drugs that mask shock. A \"normal\" heart rate after a fall may still be shock, and a lucid head strike on blood thinners needs the hospital.",
    mustKnow: [
      "Atypical MI in elderly/diabetics: fatigue, nausea, dyspnea without chest pain — treat as cardiac.",
      "Beta blockers mask tachycardia — trust skin signs and mental status over a \"normal\" pulse in shock.",
      "Anticoagulated head injury: transport despite normal exam — delayed intracranial bleed is real.",
      "Delirium = acute mental status change over hours — infection, hypoxia, hypoglycemia, drugs; not dementia.",
      "Dementia declines over months; delirium over hours — new confusion is always medical until proven otherwise.",
      "Polypharmacy increases fall risk, confusion, and adverse interactions — bring all medication bottles.",
      "Elder abuse/neglect: pressure ulcers, soiled bedding, unused meds, caregiver speaks for patient — report.",
      "Kyphosis SMR: pad voids and immobilize in found position — do not force flat on backboard.",
    ],
    traps: [
      "Clearing a head-injured anticoagulated patient because they look fine — lucid interval exists.",
      "Assuming normal HR means no shock in a beta-blocked patient.",
      "Calling acute confusion \"just dementia progression\" — delirium has a treatable cause.",
      "Forcing a kyphotic elderly patient flat for spinal immobilization — fractures the spine.",
    ],
    terms: [
      { term: "Delirium", def: "Acute, fluctuating confusion from medical cause — reversible if treated." },
      { term: "Dementia", def: "Chronic progressive cognitive decline — baseline changes over months." },
      { term: "Polypharmacy", def: "Concurrent use of multiple medications increasing adverse effect risk." },
      { term: "Atypical presentation", def: "Non-classic symptom pattern common in elderly and diabetic patients." },
      { term: "Lucid interval", def: "Temporary improvement after head injury before deterioration from expanding bleed." },
      { term: "Elder abuse", def: "Intentional harm or neglect of an older adult — EMTs are mandated reporters." },
    ],
  },
  {
    chapter: 37,
    blurb:
      "Technology-dependent patients, developmental disabilities, bariatric patients, and homeless individuals all need the same good assessment — adapted to their reality. Never assume inability to communicate means inability to understand.",
    mustKnow: [
      "Developmental disability: speak directly to the patient, use simple language, allow extra time, involve caregivers for history only.",
      "Autism: minimize sensory overload, avoid sudden touch, explain each step before doing it, reduce noise and lights.",
      "Hearing impairment: face the patient, reduce background noise, use writing or gestures, do not shout.",
      "Visual impairment: identify yourself, describe actions before touching, guide by offering your arm.",
      "Homeless patients: full assessment regardless of appearance — hypothermia, infection, and assault are common.",
      "Bariatric patients: request additional resources early, use ramps/mechanical aids, protect dignity.",
      "Technology-dependent (ventilator, tracheostomy, feeding tube): bring equipment, spare batteries, know baseline.",
      "Service animals: do not separate from owner unless absolutely necessary for treatment.",
    ],
    traps: [
      "Directing all questions to the caregiver and ignoring the patient with a disability.",
      "Restraining an autistic patient for normal assessment behaviors — adapt your approach first.",
      "Undertreating pain because a patient has communication barriers.",
      "Assuming homelessness means the patient is intoxicated or malingering.",
    ],
    terms: [
      { term: "Developmental disability", def: "Lifelong condition affecting cognition, communication, or daily function." },
      { term: "Sensory processing", def: "How the nervous system interprets stimuli — altered in many disabilities." },
      { term: "Adaptive equipment", def: "Devices (wheelchair, ventilator, communication board) supporting daily function." },
      { term: "Health care disparity", def: "Systematic difference in care access and outcomes for vulnerable populations." },
      { term: "Capacity", def: "Ability to understand and make decisions — not the same as communication ability." },
      { term: "Dignity", def: "Respecting patient autonomy, privacy, and worth regardless of circumstance." },
    ],
  },
  {
    chapter: 38,
    blurb:
      "Transport operations is the bridge between scene care and hospital care — ambulance safety, air medical criteria, medical direction en route, and knowing when ground is faster than helicopter.",
    mustKnow: [
      "Ambulance safety: all personnel seated and belted during transport; equipment secured.",
      "Air medical (helicopter) criteria: time-critical injury/illness, long transport distance, limited ground access — not for convenience.",
      "Helicopter scene safety: approach from front/side (never tail), eye/ear protection, pilot has final authority.",
      "Medical direction: online (radio/phone) for orders beyond standing protocol; offline = standing orders.",
      "Load-and-go vs stay-and-play: load-and-go when time-critical (STEMI, stroke, trauma, OB emergency); stabilize if scene time is short.",
      "Specialty center routing: trauma, stroke, STEMI, burn, pediatric — know your regional destination protocols.",
      "Fixed-wing transport: inter-facility long-distance transfers — not scene response.",
      "Reassess patient every 5 minutes en route — vitals, interventions, mental status trends.",
    ],
    traps: [
      "Requesting helicopter for a patient ground EMS can reach faster — helicopter adds setup time.",
      "Walking toward a helicopter from the tail rotor side — approach from front/side only.",
      "Staying on scene to \"finish the exam\" on a time-critical STEMI or stroke — load and go.",
      "Unsecured equipment becoming projectile during sudden stop — everything gets strapped down.",
    ],
    terms: [
      { term: "Air medical", def: "Helicopter or fixed-wing transport for time-critical or remote patients." },
      { term: "Online medical direction", def: "Real-time physician orders via radio or phone." },
      { term: "Offline medical direction", def: "Standing orders and protocols pre-authorized by medical director." },
      { term: "Load and go", def: "Rapid transport with minimal scene time for time-critical patients." },
      { term: "Destination protocol", def: "Regional guidelines routing patients to appropriate specialty centers." },
      { term: "Crew resource management", def: "Coordinated use of all personnel and equipment during transport." },
    ],
  },
  {
    chapter: 39,
    blurb:
      "Vehicle extrication is a team effort with fire/rescue — EMS role is patient care inside the wreck, not cutting metal. C-spine protection, access planning, and rapid extrication when the patient is crashing.",
    mustKnow: [
      "EMS role at MVC: patient assessment and care inside vehicle; extrication is fire/rescue.",
      "Scene zones: hot (immediate hazard), warm (working area), cold (staging/command).",
      "Manual C-spine stabilization maintained until patient is fully packaged on backboard/device.",
      "Rapid extrication: when patient is critical and scene time must be minimized — coordinated quick pull.",
      "Dashboard entrapment: monitor lower extremity perfusion and sensation — femur/pelvis injury common.",
      "Airbag deployment: still assess for injury — airbags reduce but do not eliminate trauma.",
      "Hybrid/electric vehicles: potential high-voltage hazard — fire/rescue handles power isolation.",
      "Glass management: cover windows before extrication to protect patient and rescuers from shattering.",
    ],
    traps: [
      "EMS operating hydraulic tools — extrication equipment is fire/rescue scope.",
      "Removing C-spine stabilization before patient is fully secured to backboard.",
      "Assuming no injury because airbags deployed — internal and spine injuries still occur.",
      "Rushing extrication without coordinating with rescue — patient and rescuer injury risk.",
    ],
    terms: [
      { term: "Extrication", def: "Removal of a patient trapped in a vehicle or structure." },
      { term: "Rapid extrication", def: "Emergency removal when patient condition demands minimal scene time." },
      { term: "Manual stabilization", def: "Hands-on C-spine control until mechanical device applied." },
      { term: "Hot zone", def: "Area of immediate danger at a rescue scene." },
      { term: "Disentanglement", def: "Freeing trapped body parts without full vehicle dismantling." },
      { term: "Hybrid vehicle", def: "Vehicle with high-voltage electrical system requiring special rescue precautions." },
    ],
  },
  {
    chapter: 40,
    blurb:
      "When one patient becomes twelve, everything changes — triage replaces individual care, command replaces freelancing, and your first job is sorting, not treating. MCI management is a system, not heroics.",
    mustKnow: [
      "MCI definition: patient volume exceeds available resources — triage becomes the priority.",
      "First arriving unit: establish command, perform size-up, request resources, begin triage.",
      "START triage: RPM (Respirations, Perfusion, Mental status) — tag Red, Yellow, Green, Black.",
      "JumpSTART: pediatric adaptation of START triage algorithm.",
      "Red = immediate life threat, transport first; Yellow = delayed; Green = minor (walking wounded); Black = deceased/expectant.",
      "Treatment area and transport area are separate — triage sorts, transportation distributes.",
      "Unified command: one command structure coordinating fire, EMS, police, and other agencies.",
      "Radio discipline: command channel for coordination, tactical channels for operations.",
    ],
    traps: [
      "Tunnel vision on the first critical patient while nine others go untriaged.",
      "Transporting all red tags to the closest hospital — overwhelms one facility.",
      "Skipping triage tags because \"we know who is worst\" — system breaks down without sorting.",
      "Multiple people giving orders without unified command — chaos and missed patients.",
    ],
    terms: [
      { term: "MCI", def: "Mass casualty incident — patients exceed available EMS resources." },
      { term: "START triage", def: "Simple Triage And Rapid Treatment — RPM-based sorting system." },
      { term: "Incident command", def: "Organized management structure for multi-agency emergency scenes." },
      { term: "Triage tag", def: "Color-coded priority marker attached to each patient." },
      { term: "Unified command", def: "Single coordinated command post shared by all responding agencies." },
      { term: "Transport officer", def: "Role coordinating ambulance distribution and hospital notification." },
    ],
  },
  {
    chapter: 41,
    blurb:
      "Terrorism and disaster response extend MCI principles with deliberate hazards — weapons of mass destruction, secondary devices, and unified command at a scale most providers will never see but must understand for the exam and the real world.",
    mustKnow: [
      "WMD categories: chemical, biological, radiological, nuclear, explosive (CBRNE).",
      "Secondary device: explosive placed to target responders — stage, scan, do not rush in.",
      "Chemical agent zones: hot (contaminated), warm (decon), cold (clean) — patient decon before treatment area.",
      "SLUDGE + pinpoint pupils = organophosphate/cholinergic agent — atropine is ALS; remove from source, decon.",
      "Radiological: time, distance, shielding — remove patient from source, decontaminate, monitor.",
      "Biological agents may have delayed onset — isolation, notification, public health activation.",
      "Nerve agent antidote kits (Mark I/DuoDote) are ALS — EMT role is recognition, decon, ventilate.",
      "NIMS (National Incident Management System): standardized command and resource management for all disasters.",
    ],
    traps: [
      "Rushing into a scene with multiple victims and unknown powder/odor — secondary device and contamination risk.",
      "Treating contaminated patients in the ambulance without decon — spreads agent to crew and hospital.",
      "Giving activated charcoal for nerve agent exposure — wrong treatment entirely.",
      "Assuming terrorism only means explosions — chemical and biological attacks present as medical cases.",
    ],
    terms: [
      { term: "CBRNE", def: "Chemical, Biological, Radiological, Nuclear, Explosive — WMD categories." },
      { term: "Decontamination", def: "Removing hazardous substances from patients and providers." },
      { term: "Secondary device", def: "Additional hazard placed to target emergency responders." },
      { term: "NIMS", def: "National Incident Management System — standardized disaster response framework." },
      { term: "Hot zone", def: "Area with active contamination or ongoing threat." },
      { term: "Shelter in place", def: "Public instruction to remain indoors with windows closed during airborne release." },
    ],
  },
]
