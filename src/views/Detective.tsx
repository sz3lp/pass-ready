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
  Sliders,
  X,
  FileText
} from "lucide-react"
import { MASTER_SCENARIOS_25, type MasterScenario } from "../data/allScenarios25"

export interface Message {
  id: string
  sender: "dispatch" | "patient" | "partner" | "examiner" | "user" | "system"
  text: string
  timestamp: string
}

export type Scenario = MasterScenario
export const SCENARIOS: Scenario[] = MASTER_SCENARIOS_25

export function DetectiveView() {
  const [scenarioIndex, setScenarioIndex] = useState<number>(() => Math.floor(Math.random() * SCENARIOS.length))
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("passready_gemini_key") || "")
  const [openAiKey, setOpenAiKey] = useState(() => localStorage.getItem("passready_openai_key") || "")
  const [openAiVoice, setOpenAiVoice] = useState(() => localStorage.getItem("passready_openai_voice") || "nova")
  const [selectedVoiceURI, setSelectedVoiceURI] = useState(() => localStorage.getItem("passready_voice_uri") || "")
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [showKeyModal, setShowKeyModal] = useState(false)
  const [showScriptModal, setShowScriptModal] = useState(false)
  const [settingsTab, setSettingsTab] = useState<"ai" | "voice">("voice")
  const [tempKey, setTempKey] = useState(apiKey)
  const [tempOpenAiKey, setTempOpenAiKey] = useState(openAiKey)
  const [isListening, setIsListening] = useState(false)
  const [voiceOut, setVoiceOut] = useState(true)
  const [loading, setLoading] = useState(false)
  const [vitalsRevealed, setVitalsRevealed] = useState(false)
  const [bonusUnlocked, setBonusUnlocked] = useState(false)
  const [finished, setFinished] = useState(false)
  const [patientTreated, setPatientTreated] = useState(false)
  const [scoreReport, setScoreReport] = useState<string | null>(null)

  const currentScenario = SCENARIOS[scenarioIndex]
  const chatEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const currentAudioRef = useRef<HTMLAudioElement | null>(null)

  // Load and sort browser voices (prioritize Natural / Neural / Enhanced)
  useEffect(() => {
    if (!("speechSynthesis" in window)) return

    const updateVoices = () => {
      const all = window.speechSynthesis.getVoices()
      const english = all.filter((v) => v.lang.startsWith("en") || !v.lang)
      // Sort: Natural / Neural / Online first, then Google, then others, Desktop last
      const sorted = [...english].sort((a, b) => {
        const score = (v: SpeechSynthesisVoice) => {
          const name = v.name.toLowerCase()
          if (name.includes("natural") || name.includes("neural") || name.includes("online")) return 10
          if (name.includes("google") && !name.includes("legacy")) return 8
          if (name.includes("enhanced") || name.includes("siri") || name.includes("premium")) return 7
          if (name.includes("desktop")) return 1
          return 4
        }
        return score(b) - score(a)
      })

      setAvailableVoices(sorted)

      // Auto-select best natural voice if none selected
      if (!selectedVoiceURI && sorted.length > 0) {
        setSelectedVoiceURI(sorted[0].voiceURI)
        localStorage.setItem("passready_voice_uri", sorted[0].voiceURI)
      }
    }

    updateVoices()
    window.speechSynthesis.onvoiceschanged = updateVoices
    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [])

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
    setPatientTreated(false)
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
      speakText(`${scn.cad}. The patient says: ${scn.initialPatientSpeech}`, "dispatch")
    }
  }

  useEffect(() => {
    startCase(scenarioIndex)
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  // Natural speech playback (OpenAI Neural TTS if key present, else Natural Browser Voice)
  const speakText = async (text: string, sender: Message["sender"] = "patient") => {
    if (!voiceOut) return

    // Stop any playing audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause()
      currentAudioRef.current = null
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }

    const cleanText = text.replace(/[*#_`]/g, "").replace(/\[.*?\]/g, "").trim()
    if (!cleanText) return

    // Option A: Studio-grade OpenAI Neural TTS
    if (openAiKey) {
      try {
        const voiceChoice = sender === "dispatch" ? "onyx" : sender === "patient" ? openAiVoice : "nova"
        const res = await fetch("https://api.openai.com/v1/audio/speech", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${openAiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "tts-1",
            voice: voiceChoice,
            input: cleanText
          })
        })
        if (res.ok) {
          const blob = await res.blob()
          const audioUrl = URL.createObjectURL(blob)
          const audio = new Audio(audioUrl)
          currentAudioRef.current = audio
          audio.play()
          return
        }
      } catch (err) {
        console.warn("OpenAI TTS failed, falling back to natural browser voice", err)
      }
    }

    // Option B: High-fidelity Natural Browser Voice
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(cleanText)

      const voice = availableVoices.find((v) => v.voiceURI === selectedVoiceURI) || availableVoices[0]
      if (voice) {
        utterance.voice = voice
      }

      // Pacing for human cadence
      if (sender === "patient") {
        utterance.rate = 0.94 // slightly slower, breathier
        utterance.pitch = 0.98
      } else if (sender === "dispatch") {
        utterance.rate = 1.04 // crisp dispatcher pacing
        utterance.pitch = 1.02
      } else {
        utterance.rate = 1.0
        utterance.pitch = 1.0
      }

      window.speechSynthesis.speak(utterance)
    }
  }

  const testVoiceSample = () => {
    speakText("Medic 41, Engine 12: Respond Priority 2 to Maple Street for acute breathing trouble. Skin is cool and diaphoretic.", "dispatch")
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
    if (q.includes("done") || q.includes("assessment complete") || q.includes("finished") || q.includes("hand off") || q.includes("handoff")) {
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

    // BSI / Scene Safety
    if (q.includes("bsi") || q.includes("scene safe") || q.includes("scene is safe") || q.includes("gloves") || q.includes("ppe")) {
      return `[PARTNER]: "BSI is on, eye protection and gloves donned, scene is safe. Nature of illness appears acute. How do you want to begin your primary assessment?"`
    }

    // Verbal & Non-verbal Communication ("Nod to me", "Can you hear me", "What is your name", "Are you allergic", etc.)
    if (q.includes("nod") || q.includes("hear me") || q.includes("your name") || q.includes("allergic") || q.includes("look at me") || q.includes("talk to me") || q.includes("what happened") || q.includes("can you speak")) {
      if (scn.id === 4) { // Anaphylaxis
        return `[PATIENT]: "(Nods frantically with wide, terrified eyes, clutching his swollen throat and pointing to his backpack) 'Peanut... oil... in the satay sauce... EpiPen in... my bag...' (Inspiratory stridor is loud and raspy)"`
      }
      if (scn.id === 1) { // CHF
        return `[PATIENT]: "(Nods weakly between gasps) 'Yes... my name is Robert... woke up choking... feels like my chest is filled with water...'"`
      }
      if (scn.id === 2) { // PE
        return `[PATIENT]: "(Nods in terror, clutching chest) 'Yes... can't get any air in... knife stabbing in my right side... just flew home yesterday...'"`
      }
      if (scn.id === 3) { // Ectopic
        return `[PATIENT]: "(Nods with eyes closed, grimacing in pain) 'Yes... I feel so dizzy... like I'm going to pass out again... stomach is cramping...'"`
      }
      if (scn.id === 5) { // Hypoglycemia
        return `[PATIENT]: "(Stares blankly through you, groans incoherently, right arm hangs limp at his side, shivering in cold sweat)"`
      }
      if (scn.id === 6) { // SAH
        return `[PATIENT]: "(Shields eyes from light, groaning) 'Please... don't talk loud... baseball bat hit the back of my head... feels like my skull is splitting...'"`
      }
      if (scn.id === 7) { // DKA
        return `[PATIENT]: "(Takes deep, heavy sighing Kussmaul breath) 'Yes... so tired... stomach hurts... drinking water nonstop for two days...'"`
      }
      if (scn.id === 8) { // Sepsis
        return `[PATIENT]: "(Looks confused, talking to someone not in the room) 'Margaret... where are the keys?...' [PARTNER]: 'She's disoriented to person, place, and time.'"`
      }
      if (scn.id === 9) { // STEMI
        return `[PATIENT]: "(Grimaces, rubbing pit of stomach) 'Yes... severe heartburn and nausea since dinner... feels like a bowling ball on my sternum...'"`
      }
      if (scn.id === 10) { // Pneumothorax
        return `[PATIENT]: "(Nods, clutching right side) 'Jogging on the track... all of a sudden a loud pop in my chest... every breath feels like needles...'"`
      }
    }

    // Epinephrine / Auto-injector / Epi / EpiPen
    if (q.includes("epi") || q.includes("epinephrine") || q.includes("auto-injector") || q.includes("epipen")) {
      if (scn.id === 4) {
        setPatientTreated(true)
        return `[PARTNER]: "Administering Epinephrine 0.3 mg (1:1,000) IM into the right anterolateral thigh! (Held firmly for 3 seconds). Within 60 seconds, laryngeal edema begins to relax, stridor decreases, and wheezing opens up. Patient takes a deep, relieving breath: 'Throat... opening up... thank you...' BP improves to 104/66 mmHg, HR 130 bpm."`
      } else {
        return `[PARTNER]: ⚠️ CAUTION: Epinephrine IM is indicated for severe anaphylaxis with airway swelling or shock. This patient does not have an anaphylactic airway emergency!`
      }
    }

    // Oxygen / NRB / CPAP / BVM / Cannula
    if (q.includes("oxygen") || q.includes("nrb") || q.includes("cpap") || q.includes("mask") || q.includes("bvm") || q.includes("cannula")) {
      if (scn.id === 1) { // CHF
        return `[PARTNER]: "CPAP / High-flow O2 applied at 15 L/min. Positive pressure pushes alveolar fluid back across the pulmonary capillary membrane. SpO2 improves to 92%. Patient's panic eases."`
      }
      if (scn.id === 2) { // PE
        return `[PARTNER]: "15 L/min Non-Rebreather placed. SpO2 creeps from 89% to 91% (refractory hypoxia due to pulmonary artery clot / V/Q mismatch). Lung sounds remain completely clear."`
      }
      if (scn.id === 10) { // Spontaneous Pneumo
        return `[PARTNER]: "15 L/min NRB mask placed on patient. SpO2 rises to 94%. (Crucial: avoiding positive pressure BVM to prevent turning this into a Tension Pneumothorax!)"`
      }
      return `[PARTNER]: "High-flow oxygen administered via Non-Rebreather at 15 L/min. SpO2 monitored."`
    }

    // Aspirin / ASA
    if (q.includes("aspirin") || q.includes("asa")) {
      if (scn.id === 1 || scn.id === 9) {
        return `[PARTNER]: "Administering 324 mg chewable Aspirin. Patient chews and swallows. (Prevents further platelet aggregation for suspected ACS)."`
      }
      return `[PARTNER]: "Aspirin administered. Patient chews and swallows."`
    }

    // Nitroglycerin
    if (q.includes("nitro") || q.includes("nitroglycerin")) {
      if (scn.id === 9) {
        return `[PARTNER]: ⚠️ DANGER! You administered Nitroglycerin to an Inferior Wall STEMI! The right ventricle is preload-dependent. Blood pressure plummets from 104/64 down to 72/40 mmHg! Patient turns ashen and passes out!`
      }
      if (scn.id === 1) {
        return `[PARTNER]: "Nitroglycerin 0.4 mg SL administered (BP is 210/112, well above 100 cutoff; no ED meds in 48h). Preload and afterload reduction eases the failing left ventricle."`
      }
      return `[PARTNER]: "Checking BP and contraindications before administering Nitroglycerin."`
    }

    // Glucose / D10 / Sugar
    if (q.includes("glucose") || q.includes("sugar") || q.includes("d10") || q.includes("dextrose") || q.includes("oral glucose")) {
      if (scn.id === 5) {
        setPatientTreated(true)
        return `[PARTNER]: "Administering IV Dextrose (D10 100 mL bolus) / Glucagon IM! Within 4 minutes, blood glucose rises to 88 mg/dL. The patient blinks, sits up, the right-sided facial droop vanishes, and right arm motor function returns to 100%!"`
      }
      return `[PARTNER]: "Fingerstick obtained: Blood glucose reads ${scn.vitals.bgl}."`
    }

    // Albuterol
    if (q.includes("albuterol") || q.includes("inhaler") || q.includes("nebulizer")) {
      if (scn.id === 1) {
        return `[PARTNER]: ⚠️ WARNING: You gave an Albuterol nebulizer for 'wheezing' in a CHF patient! The wheezing was cardiac asthma from fluid overload. The beta-2 agonist spikes the heart rate from 124 to 150 bpm and worsens myocardial oxygen demand!`
      }
      return `[PARTNER]: "Albuterol nebulizer 2.5 mg / 3 mL prepared and administered with 6 L/min O2."`
    }

    // Vitals Request
    if (q.includes("vital") || (q.includes("bp") && q.includes("pulse"))) {
      setVitalsRevealed(true)
      return `[PARTNER]: "Full set of vitals on the monitor:\n• BP: ${scn.vitals.bp}\n• HR: ${scn.vitals.hr}\n• RR: ${scn.vitals.rr}\n• SpO2: ${scn.vitals.spo2}\n• BGL: ${scn.vitals.bgl}\n• Skin: ${scn.vitals.skin}\n• Pupils: ${scn.vitals.pupils}"`
    }

    // Lung Sounds / Auscultation
    if (q.includes("lung") || q.includes("breath") || q.includes("listen") || q.includes("auscultat")) {
      return `[PARTNER]: "Stethoscope auscultation across all lung fields:\n${scn.vitals.lungs}"`
    }

    // Blood Glucose specifically
    if (q.includes("bgl") || q.includes("fingerstick") || q.includes("check sugar")) {
      return `[PARTNER]: "Glucometer fingerstick: Blood Glucose is ${scn.vitals.bgl}."`
    }

    // Blood Pressure specifically
    if (q.includes("blood pressure") || q.includes("bp")) {
      return `[PARTNER]: "Blood pressure cuff reads ${scn.vitals.bp}."`
    }

    // Pulse / Skin / Cap Refill
    if (q.includes("pulse") || q.includes("radial") || q.includes("skin") || q.includes("cap refill")) {
      return `[PARTNER]: "Radial pulse is ${scn.vitals.hr}. Skin condition is ${scn.vitals.skin}."`
    }

    // Pupils / Stroke / Neuro
    if (q.includes("pupil") || q.includes("stroke") || q.includes("lams") || q.includes("cincinnati") || q.includes("neuro") || q.includes("fast")) {
      return `[PARTNER]: "Pupils: ${scn.vitals.pupils}. Neuro assessment notes ${scn.title.includes('SAH') ? 'profound photophobia and nuchal rigidity' : scn.title.includes('Hypoglycemia') ? 'focal right hemiparesis and facial droop' : 'no focal deficits'}."`
    }

    // ALS Request
    if (q.includes("als") || q.includes("medic") || q.includes("paramedic") || q.includes("rendezvous")) {
      return `[PARTNER]: "Dispatch acknowledged your ALS upgrade. Medic 1 is responding Code 3 from Station 2, ETA 7 minutes."`
    }

    // Transport / Stretcher
    if (q.includes("transport") || q.includes("stretcher") || q.includes("gurney") || q.includes("cot") || q.includes("code 3") || q.includes("load and go")) {
      return `[PARTNER]: "Patient secured to cot in position of comfort. Packaging complete, loading into the ambulance for Priority 1 Code 3 transport."`
    }

    // Medications / SAMPLE History
    if (q.includes("medication") || q.includes("pill") || q.includes("history") || q.includes("sample") || q.includes("allerg")) {
      if (scn.id === 1) return `[PATIENT]: "(Between gasps) 'I take Lasix water pills and carvedilol... ran out 3 days ago... no money for refill...'"`
      if (scn.id === 2) return `[PATIENT]: "'No daily meds except oral contraceptives (birth control)... no allergies...'"`
      if (scn.id === 3) return `[PATIENT]: "'No meds... LMP was about 7 or 8 weeks ago, my period has always been irregular...'"`
      if (scn.id === 4) return `[PATIENT]: "'Allergic to peanuts... have an EpiPen in my bag... never felt it hit this fast before...'"`
      if (scn.id === 5) return `[PARTNER]: "Searching wallet: ID card states Type 1 Diabetic. Patient's insulin pump site is on abdomen."`
      if (scn.id === 6) return `[PATIENT]: "'Take lisinopril for blood pressure... never had any migraine in my life...'"`
      if (scn.id === 7) return `[PATIENT]: "'Type 1 diabetes... lost my Humalog insulin pens 3 days ago on campus...'"`
      if (scn.id === 8) return `[PARTNER]: "Care home transfer sheet shows history of recurrent UTIs and hypertension. Prescribed Metoprolol."`
      if (scn.id === 9) return `[PATIENT]: "'Meds for cholesterol... no Viagra or ED meds... never had chest heartburn like this...'"`
      if (scn.id === 10) return `[PATIENT]: "'No medical history, no medications, don't smoke. Just felt a loud pop while running...'"`
    }

    // Pain / OPQRST
    if (q.includes("pain") || q.includes("hurt") || q.includes("radiat") || q.includes("opqrst") || q.includes("scale")) {
      if (scn.id === 1) return `[PATIENT]: "'Heavy crushing pressure across my whole chest... like a ton of bricks sitting on me... worse lying flat.'"`
      if (scn.id === 2) return `[PATIENT]: "'Sharp knife stabbing in right chest... 9 out of 10... agonizing when I inhale.'"`
      if (scn.id === 3) return `[PATIENT]: "'Agonizing pain in lower abdomen... and my right shoulder has a deep throbbing ache (Kehr's sign).'"`
      if (scn.id === 4) return `[PATIENT]: "'Throat feels tight like it's in a vice... burning rash all over my arms and chest.'"`
      if (scn.id === 6) return `[PATIENT]: "'10 out of 10 agonizing thunderclap pain at the base of my skull and neck... blinding.'"`
      if (scn.id === 9) return `[PATIENT]: "'Deep burning ache in the pit of my stomach radiating to my back between shoulder blades.'"`
      if (scn.id === 10) return `[PATIENT]: "'Sharp 8 out of 10 stabbing pain in right lateral chest wall with every breath.'"`
    }

    // Dynamic Contextual Fallback (Never repeats the same robotic sentence!)
    if (patientTreated) {
      return `[PATIENT]: "(Breathing steadily) 'My airway feels much clearer now... thank you.'\n[PARTNER]: 'Vitals are stabilizing. What is your transport plan or hand-off report, EMT?'"`
    } else {
      return `[PATIENT]: "(Gasping in distress) 'Please... hurry... can't breathe...'\n[PARTNER]: 'Patient is in severe distress. Do you want to check vitals, administer medications, assess airway/lungs, or request ALS?'"`
    }
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
        speakText(replyText, botMsg.sender)
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

          {/* NREMT Verbal Script Modal Button */}
          <button
            type="button"
            onClick={() => setShowScriptModal(true)}
            title="View Turn-by-Turn Gold-Standard Verbal Script"
            className="tap flex items-center gap-1.5 rounded-xl border border-line bg-paper px-2.5 py-1.5 text-xs font-semibold text-ink hover:border-tape/60 hover:text-tape"
          >
            <FileText className="size-3.5 text-tape" />
            <span className="hidden sm:inline">NREMT Script</span>
          </button>

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

      {/* Settings & Voice Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-line bg-panel p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div className="flex items-center gap-2">
                <Sliders className="size-5 text-tape" />
                <h3 className="font-display text-lg font-bold uppercase text-ink">Simulator & Voice Settings</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="tap text-mute hover:text-ink"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-line mt-3 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setSettingsTab("voice")}
                className={`pb-2 px-3 border-b-2 transition-colors ${
                  settingsTab === "voice"
                    ? "border-tape text-tape"
                    : "border-transparent text-mute hover:text-ink"
                }`}
              >
                🗣️ Natural Voice
              </button>
              <button
                type="button"
                onClick={() => setSettingsTab("ai")}
                className={`pb-2 px-3 border-b-2 transition-colors ${
                  settingsTab === "ai"
                    ? "border-tape text-tape"
                    : "border-transparent text-mute hover:text-ink"
                }`}
              >
                🤖 Gemini AI
              </button>
            </div>

            {settingsTab === "voice" && (
              <div className="my-4 space-y-4 text-xs text-mute">
                <div>
                  <div className="flex items-center justify-between pb-1">
                    <label className="font-semibold uppercase text-ink">Select Natural Voice:</label>
                    <button
                      type="button"
                      onClick={testVoiceSample}
                      className="text-tape hover:underline font-bold text-[11px] flex items-center gap-1"
                    >
                      ▶ Test Voice
                    </button>
                  </div>
                  <select
                    value={selectedVoiceURI}
                    onChange={(e) => {
                      setSelectedVoiceURI(e.target.value)
                      localStorage.setItem("passready_voice_uri", e.target.value)
                    }}
                    className="w-full rounded-xl border border-line bg-paper px-3 py-2 text-xs font-medium text-ink outline-none focus:ring-2 focus:ring-tape/40"
                  >
                    {availableVoices.map((v) => {
                      const name = v.name
                      const isNatural = name.toLowerCase().includes("natural") || name.toLowerCase().includes("neural") || name.toLowerCase().includes("online")
                      const isGoogle = name.toLowerCase().includes("google")
                      const isEnhanced = name.toLowerCase().includes("enhanced") || name.toLowerCase().includes("siri")
                      const badge = isNatural ? "🌟 [Natural]" : isGoogle ? "⚡ [Google Neural]" : isEnhanced ? "💎 [Enhanced]" : ""
                      return (
                        <option key={v.voiceURI} value={v.voiceURI}>
                          {badge ? `${badge} ` : ""}{name} ({v.lang})
                        </option>
                      )
                    })}
                  </select>
                  <p className="text-[10px] text-mute mt-1.5">
                    💡 Tip: Select any voice marked <strong>🌟 [Natural]</strong> or <strong>⚡ [Google Neural]</strong> for authentic, non-robotic human speech.
                  </p>
                </div>

                <div className="border-t border-line pt-3">
                  <div className="flex items-center gap-1.5 pb-1">
                    <Sparkles className="size-3.5 text-gold" />
                    <label className="font-semibold uppercase text-ink">Studio-Grade Human Voice (Optional):</label>
                  </div>
                  <p className="text-[11px] text-mute pb-2">
                    Want 100% human studio quality with natural breaths and inflections? Enter an OpenAI API key to enable OpenAI Neural TTS:
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <input
                        type="password"
                        value={tempOpenAiKey}
                        onChange={(e) => setTempOpenAiKey(e.target.value)}
                        placeholder="sk-proj-..."
                        className="w-full rounded-xl border border-line bg-paper px-3 py-2 text-xs font-mono text-ink outline-none focus:ring-2 focus:ring-tape/40"
                      />
                    </div>
                    <select
                      value={openAiVoice}
                      onChange={(e) => {
                        setOpenAiVoice(e.target.value)
                        localStorage.setItem("passready_openai_voice", e.target.value)
                      }}
                      className="rounded-xl border border-line bg-paper px-2 py-2 text-xs font-medium text-ink outline-none"
                    >
                      <option value="nova">Nova (Realistic F)</option>
                      <option value="alloy">Alloy (Balanced)</option>
                      <option value="echo">Echo (Realistic M)</option>
                      <option value="onyx">Onyx (Deep M)</option>
                      <option value="shimmer">Shimmer (Clear F)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {settingsTab === "ai" && (
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
            )}

            <div className="flex justify-between items-center pt-3 border-t border-line">
              <button
                type="button"
                onClick={() => {
                  setTempKey("")
                  setTempOpenAiKey("")
                  localStorage.removeItem("passready_gemini_key")
                  localStorage.removeItem("passready_openai_key")
                  setApiKey("")
                  setOpenAiKey("")
                  setShowKeyModal(false)
                }}
                className="tap text-xs font-semibold text-mute hover:text-medic"
              >
                Reset All Keys
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="tap rounded-xl border border-line px-4 py-2 text-xs font-semibold text-mute hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    localStorage.setItem("passready_gemini_key", tempKey.trim())
                    setApiKey(tempKey.trim())
                    localStorage.setItem("passready_openai_key", tempOpenAiKey.trim())
                    setOpenAiKey(tempOpenAiKey.trim())
                    setShowKeyModal(false)
                  }}
                  className="tap rounded-xl bg-tape px-5 py-2 text-xs font-bold text-white hover:bg-tape/90"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NREMT Verbal Script Modal */}
      {showScriptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-6 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl border border-line bg-paper shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="size-5 text-tape" />
                  <h3 className="font-display text-base sm:text-lg font-bold uppercase text-ink">
                    Texas EMS School Verbal Script: {currentScenario.title}
                  </h3>
                </div>
                <p className="text-[11px] text-mute mt-0.5">
                  9-Minute Standardized NREMT Linear Cadence • {currentScenario.category}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowScriptModal(false)}
                className="tap rounded-lg p-1 text-mute hover:bg-panel hover:text-ink"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 text-xs text-ink">
              {/* Dispatch & Hallmarks */}
              <div className="rounded-xl border border-line bg-panel/50 p-3 space-y-2">
                <p className="font-semibold text-tape uppercase tracking-wider text-[11px]">CAD Broadcast</p>
                <p className="italic text-ink font-medium">"{currentScenario.cad}"</p>
                {currentScenario.clues && currentScenario.clues.length > 0 && (
                  <div className="pt-2 border-t border-line/60">
                    <p className="font-semibold uppercase text-ink text-[11px] mb-1">Diagnostic Clues & Hallmarks:</p>
                    <ul className="list-disc list-inside space-y-0.5 text-mute">
                      {currentScenario.clues.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Turn-by-Turn Dialogue */}
              {currentScenario.dialogue && currentScenario.dialogue.length > 0 && (
                <div>
                  <h4 className="font-bold uppercase text-ink text-xs mb-2 flex items-center gap-1.5">
                    <span>Turn-by-Turn Word-for-Word Verbal Script</span>
                  </h4>
                  <div className="rounded-xl border border-line overflow-hidden">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-panel border-b border-line text-[11px] font-bold text-mute uppercase">
                          <th className="py-2 px-3 w-16">Time</th>
                          <th className="py-2 px-3 w-28">Speaker</th>
                          <th className="py-2 px-3">Spoken Dialogue / Clinical Action</th>
                          <th className="py-2 px-3 w-48 hidden md:table-cell">Proctor / Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line/60 bg-paper">
                        {currentScenario.dialogue.map((t, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? "bg-paper" : "bg-panel/30"}>
                            <td className="py-2 px-3 font-mono text-[10px] text-mute whitespace-nowrap">{t.time}</td>
                            <td className="py-2 px-3 font-bold text-ink whitespace-nowrap">{t.speaker}</td>
                            <td className="py-2 px-3 text-ink leading-relaxed">{t.speech}</td>
                            <td className="py-2 px-3 italic text-mute text-[11px] hidden md:table-cell">{t.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ALS Hand-off Report */}
              {currentScenario.handOffReport && (
                <div className="rounded-xl border border-tape/40 bg-tape/5 p-3 space-y-1">
                  <p className="font-bold uppercase text-tape text-[11px]">Structured ALS Transfer of Care (SBAR)</p>
                  <p className="italic text-ink leading-relaxed">"{currentScenario.handOffReport}"</p>
                </div>
              )}

              {/* Critical Traps */}
              <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-3 space-y-1">
                <p className="font-bold uppercase text-red-600 text-[11px]">⚠️ Critical Rubric Checkpoint / Automatic Fail Traps</p>
                <p className="text-ink leading-relaxed font-medium">{currentScenario.trap}</p>
              </div>
            </div>

            <div className="flex justify-end border-t border-line px-5 py-2.5">
              <button
                type="button"
                onClick={() => setShowScriptModal(false)}
                className="tap rounded-xl bg-panel px-4 py-1.5 text-xs font-semibold text-ink hover:bg-line"
              >
                Close Script
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
