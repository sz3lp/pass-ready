import { useState, useEffect, useRef } from "react"
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Sparkles,
  Key,
  RotateCcw,
  Activity,
  Brain,
  X
} from "lucide-react"

export interface Message {
  id: string
  sender: "dispatch" | "patient" | "partner" | "examiner" | "user" | "system"
  text: string
  timestamp: string
}

export interface Scenario {
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
}

export const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: "64M – Severe Dyspnea & Orthopnea",
    cad: "Medic 41, Engine 12: Respond Priority 2 to 442 Maple Street for a 64yo male, chief complaint of 'general weakness and breathing trouble.' Time out: 23:40.",
    hiddenDiagnosis: "Acute Pulmonary Edema / CHF Exacerbation",
    category: "Cardiac",
    vitals: {
      bp: "210/112 mmHg",
      hr: "124 bpm (irregular / Afib)",
      rr: "28/min (wet, labored)",
      spo2: "82% on room air (88% on NRB)",
      bgl: "136 mg/dL",
      skin: "Cool, pale, diaphoretic; 3+ pitting ankle edema",
      pupils: "Equal, round, reactive to light",
      lungs: "Coarse crackles (rales) bilaterally at bases and mid-fields; faint expiratory wheezes"
    },
    trap: "Audible wheezing is 'cardiac asthma' caused by interstitial alveolar flooding, NOT bronchospasm. Giving Albuterol worsens tachycardia!",
    initialPatientSpeech: "Can't... catch breath... woke up gasping... feels like I'm drowning... had to sit straight up..."
  },
  {
    id: 2,
    title: "32F – Sudden Dyspnea & Chest Pain",
    cad: "Aid 24, Medic 12: Respond Priority 2 to corporate offices at 1100 North 4th. 32yo female with sudden shortness of breath and chest pain. Coworkers say 'panic attack.' Time out: 00:18.",
    hiddenDiagnosis: "Acute Pulmonary Embolism (PE)",
    category: "Respiratory",
    vitals: {
      bp: "106/70 mmHg",
      hr: "134 bpm (sinus tachycardia)",
      rr: "32/min (rapid, shallow)",
      spo2: "89% on room air (only 91% on 15L NRB - refractory hypoxia)",
      bgl: "102 mg/dL",
      skin: "Pale, cool, clammy fingertips. Right calf swollen, red, tender",
      pupils: "Equal and reactive",
      lungs: "Clear bilaterally in all fields — completely normal lung sounds"
    },
    trap: "Lungs sound 100% crystal clear and coworker screams panic attack! PE is a perfusion failure (V/Q mismatch), not ventilation failure.",
    initialPatientSpeech: "I... can't breathe... knife stabbing into my right chest... I just got off a 10-hour flight from London..."
  },
  {
    id: 3,
    title: "26F – Syncope & Severe Abdominal Pain",
    cad: "Aid 31, Medic 14: Respond Priority 2 to 742 East Pine Street. 26yo female, syncope following stomach flu and vomiting. Time out: 00:24.",
    hiddenDiagnosis: "Ruptured Ectopic Pregnancy with Hemorrhagic Shock",
    category: "Shock / GYN",
    vitals: {
      bp: "84/50 mmHg (decompensated hypotension)",
      hr: "136 bpm (weak, thready)",
      rr: "24/min (shallow)",
      spo2: "94% room air",
      bgl: "102 mg/dL",
      skin: "Cool, pale, clammy. Cap refill 3.5s. Guarding in RLQ",
      pupils: "Equal, sluggish",
      lungs: "Clear bilaterally"
    },
    trap: "Right shoulder pain blamed on hitting the sink is Kehr's Sign (free blood under diaphragm irritating the phrenic nerve).",
    initialPatientSpeech: "My stomach hurts so bad... and my right shoulder is throbbing... so dizzy when I lift my head..."
  },
  {
    id: 4,
    title: "19M – Restaurant Respiratory Distress",
    cad: "Aid 15, Medic 7: Respond Priority 1 to Thai Bistro, 550 Broadway. 19yo male with acute respiratory distress and facial swelling. Time out: 19:15.",
    hiddenDiagnosis: "Severe Anaphylaxis with Distributive Shock",
    category: "Immunologic",
    vitals: {
      bp: "86/48 mmHg",
      hr: "138 bpm",
      rr: "30/min (severe work of breathing)",
      spo2: "87% on room air",
      bgl: "110 mg/dL",
      skin: "Diffuse urticaria (hives), lips and tongue swollen (angioedema), warm and flushed",
      pupils: "Equal and reactive",
      lungs: "Inspiratory stridor at neck; diffuse high-pitched expiratory wheezes"
    },
    trap: "Delaying Epinephrine IM to give Albuterol or Benadryl first. Albuterol does not reverse laryngeal edema or vascular collapse!",
    initialPatientSpeech: "Throat... closing... peanut sauce... can't get... air..."
  },
  {
    id: 5,
    title: "58M – Unresponsive / Focal Deficit in Car",
    cad: "Aid 10: Dispatched to supermarket parking lot for 58yo male slumped over wheel. Bystanders report 'drunk or having a stroke.' Time out: 14:02.",
    hiddenDiagnosis: "Severe Hypoglycemia (Stroke Mimic with Hemiplegia)",
    category: "Endocrine",
    vitals: {
      bp: "142/86 mmHg",
      hr: "114 bpm",
      rr: "18/min",
      spo2: "98% room air",
      bgl: "32 mg/dL (CRITICAL LOW)",
      skin: "Cool, pale, drenched in cold sweat",
      pupils: "Equal and reactive",
      lungs: "Clear bilaterally"
    },
    trap: "Apparent right-sided facial droop and flaccid right arm looks like a Code Stroke, but profuse cold sweat + BGL 32 proves it's neuroglycopenia!",
    initialPatientSpeech: "(Moans unintelligibly, slurring words, unable to lift right arm, shivering)"
  },
  {
    id: 6,
    title: "63M – Sudden Thunderclap Headache",
    cad: "Medic 22: Respond Priority 2 to private residence for 63yo male with 'worst migraine of his life and nausea.' Time out: 21:05.",
    hiddenDiagnosis: "Subarachnoid Hemorrhage (SAH) with Cushing's Triad",
    category: "Neurologic",
    vitals: {
      bp: "204/116 mmHg (widened pulse pressure)",
      hr: "52 bpm (profound bradycardia)",
      rr: "14/min (irregular, Cheyne-Stokes)",
      spo2: "99% room air",
      bgl: "165 mg/dL",
      skin: "Pink, warm, dry",
      pupils: "Sluggish, right pupil slightly larger than left",
      lungs: "Clear bilaterally"
    },
    trap: "Treating as a benign migraine. The combination of thunderclap onset + HTN + bradycardia + irregular breathing is textbook Cushing's Triad!",
    initialPatientSpeech: "Turn the lights off... baseball bat hit me in back of head... worst pain of my life... feel like throwing up..."
  },
  {
    id: 7,
    title: "22F – Extreme Exhaustion & Deep Breathing",
    cad: "Aid 18: Dispatched to university dorm for 22yo female student with 'uncontrolled hyperventilation and stomach pain.' Time out: 03:12.",
    hiddenDiagnosis: "Diabetic Ketoacidosis (DKA)",
    category: "Endocrine",
    vitals: {
      bp: "96/60 mmHg",
      hr: "128 bpm (weak, rapid)",
      rr: "28/min (deep, rapid, sighing Kussmaul respirations)",
      spo2: "99% room air",
      bgl: "540 mg/dL (HIGH)",
      skin: "Warm, dry, flushed, poor turgor; fruity acetone odor on breath",
      pupils: "Equal and reactive",
      lungs: "Clear bilaterally with massive air movement"
    },
    trap: "Assuming tachypnea is an anxiety attack or asthma. The deep sighing Kussmaul breathing is respiratory compensation for metabolic acidosis.",
    initialPatientSpeech: "So... weak... belly cramps... been vomiting all night... drinking water constantly but so thirsty..."
  },
  {
    id: 8,
    title: "81F – Acute Confusion & Fall in Memory Care",
    cad: "Aid 3: Respond to adult family home for 81yo female who fell getting out of bed and has worsening confusion. Staff reports 'bad dementia day.' Time out: 09:30.",
    hiddenDiagnosis: "Septic Shock secondary to Urosepsis",
    category: "Shock / Infection",
    vitals: {
      bp: "86/52 mmHg (MAP 63)",
      hr: "120 bpm",
      rr: "24/min",
      spo2: "93% room air",
      bgl: "108 mg/dL",
      skin: "Warm, dry, flushed extremities; temp 96.0°F (hypothermic)",
      pupils: "Equal, reactive",
      lungs: "Clear bilaterally; Foley catheter bag has cloudy, foul-smelling dark urine"
    },
    trap: "Writing off AMS as 'baseline dementia' and missing hypothermia (96.0°F) which is the geriatric fever equivalent in sepsis!",
    initialPatientSpeech: "(Talking to her deceased sister, confused about where she is, disoriented to time and place)"
  },
  {
    id: 9,
    title: "68M – Epigastric Heartburn & Weakness",
    cad: "Medic 11: 68yo male reporting 'severe acid reflux, nausea, and shoulder blade ache after dinner.' Time out: 20:10.",
    hiddenDiagnosis: "Inferior Wall STEMI (Right Coronary Artery Occlusion)",
    category: "Cardiac",
    vitals: {
      bp: "104/64 mmHg",
      hr: "48 bpm (sinus bradycardia from nodal ischemia)",
      rr: "18/min",
      spo2: "96% room air",
      bgl: "122 mg/dL",
      skin: "Cool, pale, diaphoretic",
      pupils: "Equal and reactive",
      lungs: "Clear bilaterally"
    },
    trap: "RCA supplies both the inferior wall (rests on diaphragm -> indigestion) and SA/AV nodes (bradycardia). Giving Nitro can tank preload and cause arrest!",
    initialPatientSpeech: "Feels like heavy pressure right in the pit of my stomach... belching won't fix it... feeling clammy..."
  },
  {
    id: 10,
    title: "20M – Sudden Chest Pop on High School Track",
    cad: "Aid 7: 20yo tall, thin male runner with sudden sharp right-sided chest pain while jogging. Time out: 16:45.",
    hiddenDiagnosis: "Spontaneous Pneumothorax",
    category: "Respiratory",
    vitals: {
      bp: "124/78 mmHg",
      hr: "116 bpm",
      rr: "28/min (shallow, guarding right side)",
      spo2: "89% on room air",
      bgl: "98 mg/dL",
      skin: "Pale, cool, mild diaphoresis at hairline",
      pupils: "Equal and reactive",
      lungs: "Normal breath sounds on left; completely ABSENT breath sounds on right"
    },
    trap: "Bag-valve-mask positive pressure can turn a simple spontaneous pneumothorax into a fatal Tension Pneumothorax within 60 seconds!",
    initialPatientSpeech: "Felt like a balloon popped inside my right ribcage... can't take a deep breath... sharp stabbing pain..."
  }
]

export function DetectiveView() {
  const [scenarioIndex, setScenarioIndex] = useState<number>(() => Math.floor(Math.random() * SCENARIOS.length))
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("passready_gemini_key") || "")
  const [showKeyModal, setShowKeyModal] = useState(false)
  const [tempKey, setTempKey] = useState(apiKey)
  const [isListening, setIsListening] = useState(false)
  const [voiceOut, setVoiceOut] = useState(true)
  const [loading, setLoading] = useState(false)
  const [vitalsRevealed, setVitalsRevealed] = useState(false)
  const [bonusUnlocked, setBonusUnlocked] = useState(false)
  const [finished, setFinished] = useState(false)
  const [scoreReport, setScoreReport] = useState<string | null>(null)

  const currentScenario = SCENARIOS[scenarioIndex]
  const chatEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        setIsListening(false)
        handleSend(transcript)
      }

      recognition.onerror = () => setIsListening(false)
      recognition.onend = () => setIsListening(false)
      recognitionRef.current = recognition
    }
  }, [scenarioIndex, apiKey, messages])

  // Start new case
  const startCase = (index: number) => {
    setScenarioIndex(index)
    setVitalsRevealed(false)
    setBonusUnlocked(false)
    setFinished(false)
    setScoreReport(null)
    const scn = SCENARIOS[index]
    const initialMsgs: Message[] = [
      {
        id: "cad-1",
        sender: "dispatch",
        text: `🚨 [CAD TONE-OUT]: ${scn.cad}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      },
      {
        id: "pt-1",
        sender: "patient",
        text: `"${scn.initialPatientSpeech}"`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]
    setMessages(initialMsgs)
    if (voiceOut) {
      speakText(`${scn.cad}. The patient says: ${scn.initialPatientSpeech}`)
    }
  }

  useEffect(() => {
    startCase(scenarioIndex)
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const speakText = (text: string) => {
    if (!voiceOut || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const cleanText = text.replace(/[*#_`]/g, "").replace(/\[.*?\]/g, "")
    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.rate = 1.05
    utterance.pitch = 1.0
    window.speechSynthesis.speak(utterance)
  }

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Try Chrome or Safari.")
      return
    }
    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const saveApiKey = () => {
    localStorage.setItem("passready_gemini_key", tempKey.trim())
    setApiKey(tempKey.trim())
    setShowKeyModal(false)
  }

  const evaluateAssessment = (userHistory: Message[]) => {
    const conversationText = userHistory.map((m) => `${m.sender.toUpperCase()}: ${m.text}`).join("\n")
    const lower = conversationText.toLowerCase()

    let score = 0
    const points: string[] = []
    const fails: string[] = []

    // Scene Size-Up
    if (lower.includes("bsi") || lower.includes("gloves") || lower.includes("scene safe")) {
      score += 3
      points.push("✓ BSI / PPE and Scene Safety declared (+3)")
    } else {
      fails.push("⚠️ CRITICAL: Did not verbalize BSI / Scene Safety before patient contact")
    }

    if (lower.includes("als") || lower.includes("medic") || lower.includes("paramedic") || lower.includes("rendezvous")) {
      score += 2
      points.push("✓ Requested ALS intercept / rendezvous (+2)")
    }

    // Primary Assessment
    if (lower.includes("sick") || lower.includes("general impression") || lower.includes("tracking")) {
      score += 3
      points.push("✓ Formed General Impression (Sick vs Not Sick) (+3)")
    }

    if (lower.includes("oxygen") || lower.includes("nrb") || lower.includes("cannula") || lower.includes("cpap")) {
      score += 4
      points.push("✓ Initiated appropriate Oxygen Therapy (+4)")
    }

    if (lower.includes("pulse") || lower.includes("skin") || lower.includes("circulation")) {
      score += 4
      points.push("✓ Assessed Circulation (Pulses, Skin signs) (+4)")
    }

    // History & Vitals
    if (lower.includes("vital") || lower.includes("bp") || lower.includes("blood pressure")) {
      score += 5
      points.push("✓ Obtained baseline vital signs (+5)")
    }

    if (lower.includes("sugar") || lower.includes("glucose") || lower.includes("bgl")) {
      score += 4
      points.push("✓ Checked Blood Glucose Level (BGL) (+4)")
    }

    if (lower.includes("medication") || lower.includes("allergy") || lower.includes("history") || lower.includes("opqrst")) {
      score += 6
      points.push("✓ Conducted OPQRST / SAMPLE history (+6)")
    }

    // Transport & Report
    if (lower.includes("transport") || lower.includes("code 3") || lower.includes("priority")) {
      score += 4
      points.push("✓ Declared Transport Priority and Packaging (+4)")
    }

    if (lower.includes("report") || lower.includes("hand off") || lower.includes("inbound") || lower.includes("done")) {
      score += 5
      points.push("✓ Delivered structured Hand-Off Report (+5)")
    }

    // Detective Bonus
    const diagKeywords = currentScenario.hiddenDiagnosis.toLowerCase().split(/[\s/()]+/).filter((w) => w.length > 3)
    const hit = diagKeywords.some((w) => lower.includes(w))
    if (hit) {
      score += 5
      setBonusUnlocked(true)
      points.push(`🎉 DETECTIVE BONUS (+5): Correctly deduced ${currentScenario.hiddenDiagnosis}!`)
    }

    const maxScore = 40
    const passed = score >= 30 && fails.length === 0

    return `
### 📋 OFFICIAL NREMT ASSESSMENT SCORECARD
**Result:** ${passed ? "✅ PASS" : "❌ RE-TEST REQUIRED"}  
**Total Points:** ${score} / ${maxScore} ${hit ? "(Includes +5 Detective Bonus)" : ""}

#### 🎯 Points Awarded:
${points.map((p) => `- ${p}`).join("\n")}

${fails.length > 0 ? `#### 🚨 Critical Criteria Violations:\n${fails.map((f) => `- ${f}`).join("\n")}` : "✓ Zero Critical Criteria Violations."}

---
#### 🕵️ THE MYSTERY REVEAL:
* **Hidden Pathology:** **${currentScenario.hiddenDiagnosis}**
* **The Clinical Trap:** ${currentScenario.trap}
    `
  }

  // Built-in intelligent response logic (Fallback / Local Engine)
  const generateLocalResponse = (query: string): string => {
    const q = query.toLowerCase()
    const scn = currentScenario

    // Done trigger
    if (q.includes("done") || q.includes("assessment complete") || q.includes("finished")) {
      setFinished(true)
      const report = evaluateAssessment(messages)
      setScoreReport(report)
      return `[EXAMINER]: Assessment concluded. Stand by for your official scorecard.\n\n${report}`
    }

    // Diagnostic deduction detection
    const diagKeywords = scn.hiddenDiagnosis.toLowerCase().split(/[\s/()]+/).filter((w) => w.length > 3)
    if (diagKeywords.some((w) => q.includes(w))) {
      setBonusUnlocked(true)
    }

    // Vitals Request
    if (q.includes("vital") || (q.includes("blood pressure") && q.includes("pulse"))) {
      setVitalsRevealed(true)
      return `[PARTNER]: Vitals on the monitor right now:\n• BP: ${scn.vitals.bp}\n• Pulse: ${scn.vitals.hr}\n• Resp: ${scn.vitals.rr}\n• SpO2: ${scn.vitals.spo2}\n• BGL: ${scn.vitals.bgl}\n• Skin: ${scn.vitals.skin}\n• Pupils: ${scn.vitals.pupils}`
    }

    // Lung sounds
    if (q.includes("lung") || q.includes("breath") || q.includes("auscultat") || q.includes("listen")) {
      return `[PARTNER]: Stethoscope to the chest: ${scn.vitals.lungs}`
    }

    // Blood Glucose
    if (q.includes("bgl") || q.includes("glucose") || q.includes("sugar") || q.includes("fingerstick")) {
      return `[PARTNER]: Fingerstick obtained: Blood glucose is ${scn.vitals.bgl}`
    }

    // Blood Pressure specifically
    if (q.includes("blood pressure") || q.includes("bp")) {
      return `[PARTNER]: Blood pressure reads ${scn.vitals.bp}`
    }

    // Pulse / Skin
    if (q.includes("pulse") || q.includes("skin") || q.includes("radial")) {
      return `[PARTNER]: Radial pulse is ${scn.vitals.hr}. Skin is ${scn.vitals.skin}.`
    }

    // Meds / SAMPLE
    if (q.includes("medication") || q.includes("pill") || q.includes("sample") || q.includes("allergy") || q.includes("prescript")) {
      if (scn.id === 1) return `[PATIENT]: "I take water pills (Lasix) and blood pressure pills... but ran out 3 days ago..."`
      if (scn.id === 2) return `[PATIENT]: "No meds except oral birth control pills... no allergies..."`
      if (scn.id === 3) return `[PATIENT]: "No meds... LMP was maybe 7 or 8 weeks ago, cycle is always irregular..."`
      if (scn.id === 4) return `[PATIENT]: "Allergic to peanuts... have an EpiPen in my backpack... didn't use it yet..."`
      if (scn.id === 5) return `[PARTNER]: You find a medical alert bracelet: Type 1 Diabetic on Humalog insulin.`
      if (scn.id === 6) return `[PATIENT]: "I take blood pressure meds... never had a migraine like this in my entire life..."`
      if (scn.id === 7) return `[PATIENT]: "Type 1 diabetic... lost my insulin pens on campus three days ago..."`
      if (scn.id === 8) return `[PARTNER]: Care home chart shows history of recurrent UTIs and mild dementia; on Metoprolol.`
      if (scn.id === 9) return `[PATIENT]: "Blood pressure meds... no ED meds like Viagra... chest feels heavy..."`
      if (scn.id === 10) return `[PATIENT]: "No medical history, no medications. Just felt a pop in my chest."`
    }

    // Pain / OPQRST
    if (q.includes("pain") || q.includes("feel") || q.includes("radiat") || q.includes("scale") || q.includes("opqrst")) {
      if (scn.id === 1) return `[PATIENT]: "Heavy pressure across my chest, like an elephant sitting on me... worse when I lay down."`
      if (scn.id === 2) return `[PATIENT]: "Stabbing knife in my right chest every time I try to breathe in... 9 out of 10."`
      if (scn.id === 3) return `[PATIENT]: "Agonizing cramps in my lower belly... and my right shoulder hurts so bad."`
      if (scn.id === 4) return `[PATIENT]: "Tightness... itching everywhere... throat feels like it's swollen shut."`
      if (scn.id === 6) return `[PATIENT]: "Agonizing pain in the back of my head and neck... 10 out of 10 like a lightning strike."`
      if (scn.id === 9) return `[PATIENT]: "Deep ache right in my epigastric area and between my shoulder blades."`
      if (scn.id === 10) return `[PATIENT]: "Sharp stabbing pain on the right side every time I inhale."`
    }

    // Oxygen / Interventions
    if (q.includes("nrb") || q.includes("oxygen") || q.includes("cpap") || q.includes("albuterol") || q.includes("aspirin") || q.includes("epi") || q.includes("glucose")) {
      if (scn.id === 1 && q.includes("albuterol")) {
        return `[PARTNER]: ⚠️ WARNING: You administered Albuterol for wheezing. Heart rate spikes to 142 bpm! Patient gasps: "My heart is pounding... I can't catch breath!" (Trap: Cardiac asthma requires CPAP, not beta-2 agonists!)`
      }
      if (scn.id === 1 && (q.includes("cpap") || q.includes("nrb"))) {
        return `[PARTNER]: CPAP/High-flow O2 applied. Positive pressure pushes alveolar fluid back into capillaries. SpO2 improves to 92%. Patient nods with relief.`
      }
      if (scn.id === 2 && q.includes("nrb")) {
        return `[PARTNER]: 15L NRB mask placed. SpO2 only climbs to 91% due to refractory V/Q mismatch from pulmonary vascular occlusion.`
      }
      if (scn.id === 4 && (q.includes("epi") || q.includes("epipen"))) {
        return `[PARTNER]: Epinephrine 0.3mg IM administered in anterolateral thigh. Within 90 seconds, laryngeal edema subsides, stridor decreases, BP rises to 102/64!`
      }
      if (scn.id === 5 && (q.includes("glucose") || q.includes("sugar") || q.includes("d10"))) {
        return `[PARTNER]: Dextrose/glucose administered. Within 4 minutes, patient opens eyes, speech clears up, and focal weakness resolves completely!`
      }
      if (scn.id === 9 && q.includes("aspirin")) {
        return `[PARTNER]: 324mg chewable Aspirin administered. Patient chews and swallows.`
      }
      if (scn.id === 9 && q.includes("nitro")) {
        return `[PARTNER]: ⚠️ CAUTION: You gave Nitroglycerin to an inferior STEMI! BP plummets to 76/40 mmHg! (Right ventricular preload tanked!).`
      }
      return `[PARTNER]: Intervention noted. Monitoring patient response and vitals.`
    }

    // Default conversational response
    return `[PATIENT]: "${scn.initialPatientSpeech}" \n[PARTNER]: "What do you want to check next, EMT? (Vitals, lung sounds, SAMPLE history, or interventions?)"`
  }

  // Gemini API Cloud Call
  const callGeminiApi = async (userPrompt: string): Promise<string> => {
    const systemPrompt = `You are an expert NREMT Medical Practical Exam Simulator and Patient Actor for an EMT student.
Current Hidden Case: ${currentScenario.hiddenDiagnosis}
Category: ${currentScenario.category}
Patient Profile: ${currentScenario.title}
Hidden Vitals:
- BP: ${currentScenario.vitals.bp}
- Heart Rate: ${currentScenario.vitals.hr}
- Respirations: ${currentScenario.vitals.rr}
- SpO2: ${currentScenario.vitals.spo2}
- Blood Glucose: ${currentScenario.vitals.bgl}
- Skin: ${currentScenario.vitals.skin}
- Pupils: ${currentScenario.vitals.pupils}
- Lung Sounds: ${currentScenario.vitals.lungs}
The Diagnostic Trap: ${currentScenario.trap}

Rules:
1. Act as [PATIENT] (first person, realistic, emotional, guarded clues) and [PARTNER] (reports vitals, lung sounds, exam findings when asked).
2. DO NOT blurt out the secret diagnosis. Make the EMT ask proper OPQRST and SAMPLE questions.
3. If EMT gives the right treatment, show clinical improvement. If they make a lethal mistake (e.g., Albuterol on CHF, Nitro on Inferior STEMI), show physiological deterioration.
4. If EMT says "I'm done" or provides a hand-off report, act as [EXAMINER], grade their 42-point NREMT medical assessment, reveal the hidden diagnosis, explain the trap, and award +5 bonus points if they named the condition.`

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`

    const chatHistory = messages.slice(-8).map((m) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: `[${m.sender.toUpperCase()}]: ${m.text}` }]
    }))

    const body = {
      contents: [
        ...chatHistory,
        {
          role: "user",
          parts: [{ text: userPrompt }]
        }
      ],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800
      }
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })

    if (!res.ok) {
      throw new Error(`Gemini API error: ${res.statusText}`)
    }

    const data = await res.json()
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received."
  }

  const handleSend = async (overrideText?: string) => {
    const textToSend = (overrideText || input).trim()
    if (!textToSend || loading) return

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      let replyText = ""
      if (apiKey) {
        try {
          replyText = await callGeminiApi(textToSend)
        } catch (err) {
          console.warn("Gemini API failed, falling back to local simulation engine:", err)
          replyText = generateLocalResponse(textToSend)
        }
      } else {
        replyText = generateLocalResponse(textToSend)
      }

      // Check if finished
      if (textToSend.toLowerCase().includes("done") || textToSend.toLowerCase().includes("assessment complete")) {
        setFinished(true)
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: replyText.includes("[EXAMINER]") ? "examiner" : replyText.includes("[PARTNER]") ? "partner" : "patient",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }

      setMessages((prev) => [...prev, botMsg])
      if (voiceOut) {
        speakText(replyText)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex h-[calc(100dvh-5.5rem)] max-w-5xl flex-col p-2 sm:p-4">
      {/* Top Banner / Case Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-line bg-panel p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-tape text-white">
            <Brain className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-base font-bold uppercase tracking-wide text-ink sm:text-lg">
                Medical Detective AI
              </h2>
              <span className="rounded-md bg-tape/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-tape">
                {apiKey ? "Gemini 1.5 Flash" : "Local Engine"}
              </span>
              {bonusUnlocked && (
                <span className="animate-bounce rounded-md bg-go/15 px-2 py-0.5 text-[10px] font-bold text-go">
                  🎉 +5 Detective Bonus
                </span>
              )}
            </div>
            <p className="text-xs text-mute">
              Mystery Call #{currentScenario.id} • {currentScenario.category}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Quick Case Switcher */}
          <select
            value={scenarioIndex}
            onChange={(e) => startCase(Number(e.target.value))}
            className="rounded-xl border border-line bg-paper px-2.5 py-1.5 text-xs font-medium text-ink outline-none focus:ring-2 focus:ring-tape/40"
          >
            {SCENARIOS.map((s, idx) => (
              <option key={s.id} value={idx}>
                Call {s.id}: {s.title}
              </option>
            ))}
          </select>

          {/* Random Case Button */}
          <button
            type="button"
            onClick={() => startCase(Math.floor(Math.random() * SCENARIOS.length))}
            title="Random Mystery Call"
            className="tap flex size-9 items-center justify-center rounded-xl border border-line bg-paper text-mute hover:text-ink"
          >
            <RotateCcw className="size-4" />
          </button>

          {/* API Key Modal Button */}
          <button
            type="button"
            onClick={() => {
              setTempKey(apiKey)
              setShowKeyModal(true)
            }}
            title="Configure Gemini API Key"
            className={`tap flex size-9 items-center justify-center rounded-xl border ${
              apiKey ? "border-go/40 bg-go/10 text-go" : "border-line bg-paper text-mute hover:text-ink"
            }`}
          >
            <Key className="size-4" />
          </button>

          {/* Voice Output Toggle */}
          <button
            type="button"
            onClick={() => {
              if (voiceOut) window.speechSynthesis?.cancel()
              setVoiceOut(!voiceOut)
            }}
            title={voiceOut ? "Voice Out Active" : "Voice Out Muted"}
            className={`tap flex size-9 items-center justify-center rounded-xl border ${
              voiceOut ? "border-tape/40 bg-tape/10 text-tape" : "border-line bg-paper text-mute"
            }`}
          >
            {voiceOut ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
          </button>
        </div>
      </div>

      {/* Floating Vitals Dashboard (Collapsible) */}
      <div className="my-2 rounded-xl border border-line bg-panel/80 p-2.5 backdrop-blur">
        <div className="flex items-center justify-between text-xs text-mute">
          <span className="flex items-center gap-1 font-semibold text-ink">
            <Activity className="size-3.5 text-medic" /> Patient Monitor
          </span>
          <span className="text-[10px]">
            {vitalsRevealed ? "Live Vitals" : "Ask partner for vitals or run exam to reveal"}
          </span>
        </div>
        <div className="mt-1.5 grid grid-cols-4 gap-1.5 text-center text-xs sm:grid-cols-7">
          <div className="rounded-lg bg-paper p-1.5">
            <p className="text-[9px] uppercase text-mute">BP</p>
            <p className="font-mono font-bold text-ink">{vitalsRevealed ? currentScenario.vitals.bp : "— / —"}</p>
          </div>
          <div className="rounded-lg bg-paper p-1.5">
            <p className="text-[9px] uppercase text-mute">Pulse</p>
            <p className="font-mono font-bold text-ink">{vitalsRevealed ? currentScenario.vitals.hr : "— bpm"}</p>
          </div>
          <div className="rounded-lg bg-paper p-1.5">
            <p className="text-[9px] uppercase text-mute">Resp</p>
            <p className="font-mono font-bold text-ink">{vitalsRevealed ? currentScenario.vitals.rr : "— /min"}</p>
          </div>
          <div className="rounded-lg bg-paper p-1.5">
            <p className="text-[9px] uppercase text-mute">SpO2</p>
            <p className="font-mono font-bold text-ink">{vitalsRevealed ? currentScenario.vitals.spo2 : "— %"}</p>
          </div>
          <div className="rounded-lg bg-paper p-1.5">
            <p className="text-[9px] uppercase text-mute">BGL</p>
            <p className="font-mono font-bold text-ink">{vitalsRevealed ? currentScenario.vitals.bgl : "— mg/dL"}</p>
          </div>
          <div className="hidden rounded-lg bg-paper p-1.5 sm:block">
            <p className="text-[9px] uppercase text-mute">Skin</p>
            <p className="truncate font-mono text-[11px] font-semibold text-ink">
              {vitalsRevealed ? currentScenario.vitals.skin : "—"}
            </p>
          </div>
          <div className="hidden rounded-lg bg-paper p-1.5 sm:block">
            <p className="text-[9px] uppercase text-mute">Lungs</p>
            <p className="truncate font-mono text-[11px] font-semibold text-ink">
              {vitalsRevealed ? currentScenario.vitals.lungs : "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Chat Stream */}
      <div className="flex-1 space-y-3 overflow-y-auto rounded-2xl border border-line bg-panel p-3 sm:p-4">
        {messages.map((m) => {
          const isUser = m.sender === "user"
          const isDispatch = m.sender === "dispatch"
          const isExaminer = m.sender === "examiner"
          const isPartner = m.sender === "partner"

          return (
            <div key={m.id} className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
              <div className="flex items-center gap-1.5 px-1 pb-1 text-[10px] uppercase tracking-wider text-mute">
                {isDispatch && <span className="font-bold text-medic">🚨 CAD Dispatch</span>}
                {m.sender === "patient" && <span className="font-bold text-tape">👤 Patient</span>}
                {isPartner && <span className="font-bold text-go">🩺 EMT Partner</span>}
                {isExaminer && <span className="font-bold text-gold">📋 NREMT Proctor</span>}
                {isUser && <span className="font-bold text-ink">EMT (You)</span>}
                <span>• {m.timestamp}</span>
              </div>
              <div
                className={`max-w-[88%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-[78%] ${
                  isUser
                    ? "rounded-tr-none bg-tape text-white"
                    : isDispatch
                    ? "rounded-tl-none border border-medic/20 bg-medic/5 text-ink"
                    : isExaminer
                    ? "rounded-tl-none border border-gold/40 bg-gold/5 font-sans text-ink"
                    : isPartner
                    ? "rounded-tl-none border border-go/20 bg-go/5 text-ink"
                    : "rounded-tl-none border border-line bg-paper text-ink"
                }`}
              >
                {m.text}
              </div>
            </div>
          )
        })}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-mute">
            <span className="size-2 animate-ping rounded-full bg-tape" />
            <span>Patient & partner reacting...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Action Chips */}
      <div className="my-2 flex flex-wrap gap-1.5 overflow-x-auto py-1">
        {[
          "BSI, scene is safe",
          "Check full vitals",
          "Listen to lung sounds",
          "Check blood glucose (BGL)",
          "Apply 15L NRB mask",
          "What medications do you take?",
          "Does the pain radiate anywhere?",
          "Request ALS intercept",
          "I'm done / Submit report"
        ].map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => handleSend(chip)}
            className="tap rounded-full border border-line bg-panel px-3 py-1 text-[11px] font-medium text-mute hover:border-tape hover:text-tape"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-2 rounded-2xl border border-line bg-panel p-2 shadow-sm">
        <button
          type="button"
          onClick={toggleMic}
          className={`tap flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
            isListening
              ? "animate-pulse bg-medic text-white"
              : "border border-line bg-paper text-mute hover:text-ink"
          }`}
          title={isListening ? "Listening... (Tap to stop)" : "Speech Input (Tap to speak)"}
        >
          {isListening ? <MicOff className="size-5" /> : <Mic className="size-5" />}
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={isListening ? "Listening to your voice..." : "Speak or type your assessment, vitals request, or diagnosis..."}
          className="flex-1 bg-transparent px-2 text-sm text-ink outline-none placeholder:text-mute/60"
        />

        <button
          type="button"
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="tap flex size-11 shrink-0 items-center justify-center rounded-xl bg-tape text-white disabled:opacity-40"
        >
          <Send className="size-5" />
        </button>
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-line bg-panel p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div className="flex items-center gap-2">
                <Sparkles className="size-5 text-gold" />
                <h3 className="font-display text-lg font-bold uppercase text-ink">Gemini AI Configuration</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="tap text-mute hover:text-ink"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="my-4 space-y-3 text-xs text-mute">
              <p>
                Connect Google's <strong>Gemini 1.5 Flash</strong> API for unscripted, lifelike patient reasoning. Keys are stored locally on your device.
              </p>
              <div className="rounded-xl bg-paper p-3 text-[11px] text-ink">
                <p className="font-semibold">💡 Get a free API key in 10 seconds:</p>
                <p className="mt-1 text-mute">
                  Visit <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-tape underline font-medium">Google AI Studio</a>, sign in with your Google account, and click "Create API key".
                </p>
              </div>

              <div>
                <label className="block font-semibold uppercase text-ink pb-1">Gemini API Key:</label>
                <input
                  type="password"
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full rounded-xl border border-line bg-paper px-3 py-2 text-sm font-mono text-ink outline-none focus:ring-2 focus:ring-tape/40"
                />
              </div>

              <p className="text-[10px] text-mute">
                * If no key is entered, the app seamlessly runs on the <strong>Local Clinical Simulation Engine</strong> with zero latency.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setTempKey("")
                  localStorage.removeItem("passready_gemini_key")
                  setApiKey("")
                  setShowKeyModal(false)
                }}
                className="tap rounded-xl border border-line px-4 py-2 text-xs font-semibold text-mute hover:text-ink"
              >
                Clear Key
              </button>
              <button
                type="button"
                onClick={saveApiKey}
                className="tap rounded-xl bg-tape px-5 py-2 text-xs font-bold text-white hover:bg-tape/90"
              >
                Save & Enable Gemini
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Scorecard Modal */}
      {finished && scoreReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-line bg-panel p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <h3 className="font-display text-lg font-bold uppercase text-ink">Assessment Results</h3>
              <button
                type="button"
                onClick={() => setFinished(false)}
                className="tap text-mute hover:text-ink"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="my-4 whitespace-pre-line text-xs leading-relaxed text-ink font-sans">
              {scoreReport}
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-line">
              <button
                type="button"
                onClick={() => setFinished(false)}
                className="tap rounded-xl border border-line px-4 py-2 text-xs font-semibold text-mute hover:text-ink"
              >
                Review Dialogue
              </button>
              <button
                type="button"
                onClick={() => startCase((scenarioIndex + 1) % SCENARIOS.length)}
                className="tap rounded-xl bg-tape px-5 py-2 text-xs font-bold text-white hover:bg-tape/90"
              >
                Next Mystery Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
