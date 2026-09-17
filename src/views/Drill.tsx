import { useEffect, useMemo, useState } from "react"
import { Check, X } from "lucide-react"
import { BLOCKS, CHAPTERS, type BlockId } from "../data/syllabus"
import {
  QUESTIONS,
  chapterTitle,
  examQuestionsForBlock,
  questionsForBlock,
  questionsForChapters,
  siblingsOf,
  type Question,
} from "../data/questions"
import { matchRecall } from "../lib/generate"
import { blockMeta, dueTonightCount, dueQueue, shuffle } from "../lib/schedule"
import { recordAnswer, recordCallIt } from "../lib/storage"
import { useAppStore } from "../lib/store"
import { Panel, Pill } from "../components/ui"

type Mode = "mission" | "chapter" | "block" | "missed" | "final" | "exam" | "call"

export function DrillView({ seedChapter, seedMode }: { seedChapter?: number; seedMode?: "call" | "exam" }) {
  const { store, setStore } = useAppStore()
  const live = blockMeta()
  const [block, setBlock] = useState<BlockId>(live.id)
  const [chapter, setChapter] = useState<number>(seedChapter ?? live.examChapters[0])
  const [mode, setMode] = useState<Mode>(seedChapter ? "chapter" : seedMode === "call" ? "call" : seedMode === "exam" ? "exam" : "mission")
  const [queue, setQueue] = useState<Question[] | null>(null)
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [hits, setHits] = useState(0)
  const [done, setDone] = useState(false)
  const [typed, setTyped] = useState("")
  const [called, setCalled] = useState<boolean | null>(null)

  const dueN = dueTonightCount(questionsForBlock(live.id), store.items)

  const start = (next: Mode, ch = chapter, b = block) => {
    let pool: Question[] = []
    if (next === "mission") pool = dueQueue(questionsForBlock(live.id), store.items, 15, live.examChapters)
    if (next === "chapter") pool = shuffle(questionsForChapters([ch]))
    if (next === "block") pool = shuffle(questionsForBlock(b))
    if (next === "exam") {
      const exam = examQuestionsForBlock(b)
      pool = dueQueue(exam.length ? exam : questionsForBlock(b), store.items, 15, BLOCKS.find((x) => x.id === b)?.examChapters)
    }
    if (next === "call") pool = dueQueue(questionsForBlock(live.id), store.items, 10, live.examChapters)
    if (next === "missed") {
      pool = QUESTIONS.filter((q) => {
        const s = store.items[q.id]
        return s && s.seen > 0 && s.correct / s.seen < 0.8
      })
      if (pool.length === 0) pool = dueQueue(questionsForBlock(live.id), store.items, 15, live.examChapters)
    }
    if (next === "final") pool = shuffle(QUESTIONS).slice(0, 50)
    setMode(next)
    setQueue(pool)
    setI(0)
    setPicked(null)
    setHits(0)
    setDone(false)
    setTyped("")
    setCalled(null)
  }

  useEffect(() => {
    if (seedChapter) start("chapter", seedChapter)
    else if (seedMode === "call") start("call")
    else if (seedMode === "exam") start("exam", chapter, live.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seedChapter, seedMode])

  const q = queue?.[i]
  const order = useMemo(() => (q ? shuffle(q.choices.map((_, idx) => idx), q.id.length * 17) : []), [q])
  const callMode = mode === "call"

  const choose = (idx: number) => {
    if (!q || picked !== null || callMode) return
    const ok = idx === q.answer
    setPicked(idx)
    if (ok) setHits((h) => h + 1)
    let nextStore = recordAnswer(store, q.id, ok, ok ? "good" : "again")
    let nextQueue = queue
    if (!ok && queue) {
      const sib = siblingsOf(q).find((s) => !queue.some((x) => x.id === s.id))
      if (sib) {
        nextQueue = [...queue.slice(0, i + 1), sib, ...queue.slice(i + 1)]
        setQueue(nextQueue)
      }
    }
    setStore(nextStore)
  }

  const submitCall = () => {
    if (!q || called !== null) return
    const ok = matchRecall(typed, q)
    setCalled(ok)
    if (ok) setHits((h) => h + 1)
    let nextStore = recordAnswer(store, q.id, ok, ok ? "easy" : "again")
    let nextQueue = queue
    if (!ok && queue) {
      const sib = siblingsOf(q).find((s) => !queue.some((x) => x.id === s.id))
      if (sib) {
        nextQueue = [...queue.slice(0, i + 1), sib, ...queue.slice(i + 1)]
        setQueue(nextQueue)
      }
    }
    if (nextQueue && i === nextQueue.length - 1) nextStore = recordCallIt(nextStore)
    setStore(nextStore)
  }

  const next = () => {
    if (!queue) return
    if (i + 1 >= queue.length) {
      setDone(true)
      return
    }
    setI(i + 1)
    setPicked(null)
    setTyped("")
    setCalled(null)
  }

  if (done && queue) {
    const pct = Math.round((hits / queue.length) * 100)
    return (
      <Panel>
        <p className="font-display text-xs uppercase tracking-[0.2em] text-tape">Session closed</p>
        <h2 className="font-display text-5xl font-extrabold">{pct}%</h2>
        <p className="mt-2 text-mute">
          {hits} / {queue.length} · {callMode ? "Call it. Typed recall is the honest number." : pct >= 80 ? "That's the line. Do not donate it back tomorrow." : "Under 80. Same deck again tonight, then a different chapter."}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <button type="button" className="rounded-xl bg-tape px-4 py-2 font-display text-lg font-bold uppercase text-paper" onClick={() => start(mode, chapter, block)}>
            Run it again
          </button>
          <button type="button" className="rounded-xl border border-line px-4 py-2 text-sm" onClick={() => setQueue(null)}>
            Change drill
          </button>
        </div>
      </Panel>
    )
  }

  if (q && queue && callMode) {
    return (
      <div className="grid gap-4">
        <div className="flex items-center justify-between gap-3 text-sm text-mute">
          <span>
            Call it {i + 1} / {queue.length} · Ch. {q.chapter} {chapterTitle(q.chapter)}
          </span>
          <span>{hits} correct</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-raised">
          <div className="h-full bg-tape" style={{ width: `${((i + (called !== null ? 1 : 0)) / queue.length) * 100}%` }} />
        </div>
        <Panel>
          <Pill tone="tape">{q.tag}</Pill>
          <h2 className="mt-3 text-xl font-medium leading-snug text-ink">{q.stem}</h2>
          <p className="mt-2 text-sm text-mute">Choices hidden. Type the action, drug, or decision — not a letter.</p>
          {called === null ? (
            <form
              className="mt-4 grid gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                submitCall()
              }}
            >
              <input
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                autoFocus
                placeholder="What do you do / give / withhold?"
                className="w-full rounded-xl border border-line bg-raised px-3 py-3 text-sm outline-none"
              />
              <button type="submit" className="rounded-xl bg-tape px-4 py-2 font-display text-lg font-bold uppercase text-paper">
                Call it
              </button>
            </form>
          ) : (
            <>
              <p className={`mt-4 font-display text-2xl font-bold uppercase ${called ? "text-go" : "text-stop"}`}>
                {called ? "Hit" : "Miss"}
              </p>
              <p className="mt-2 text-sm text-ink">Response: {q.choices[q.answer]}</p>
              <div className="mt-4 rounded-xl border border-line bg-raised px-4 py-3 text-sm leading-relaxed text-mute">
                <span className="text-ink">Why. </span>
                {q.why}
              </div>
              <button type="button" onClick={next} className="mt-4 rounded-xl bg-tape px-4 py-2 font-display text-lg font-bold uppercase text-paper">
                {i + 1 >= queue.length ? "Close the book" : "Next stem"}
              </button>
            </>
          )}
        </Panel>
      </div>
    )
  }

  if (q && queue) {
    return (
      <div className="grid gap-4">
        <div className="flex items-center justify-between gap-3 text-sm text-mute">
          <span>
            {i + 1} / {queue.length} · Ch. {q.chapter} {chapterTitle(q.chapter)}
            {q.difficulty === "exam" ? " · exam-hard" : ""}
          </span>
          <span>{hits} correct</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-raised">
          <div className="h-full bg-tape" style={{ width: `${((i + (picked !== null ? 1 : 0)) / queue.length) * 100}%` }} />
        </div>
        <Panel>
          <Pill tone="tape">{q.tag}</Pill>
          <h2 className="mt-3 text-xl font-medium leading-snug text-ink">{q.stem}</h2>
          <div className="mt-5 grid gap-2">
            {order.map((idx) => {
              const letter = "ABCD"[order.indexOf(idx)]
              const show = picked !== null
              const right = idx === q.answer
              const mine = picked === idx
              let cls = "border-line bg-raised hover:border-tape/40"
              if (show && right) cls = "border-go/50 bg-go/15"
              else if (show && mine && !right) cls = "border-stop/50 bg-stop/15"
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => choose(idx)}
                  className={`flex gap-3 rounded-xl border px-3 py-3 text-left ${cls}`}
                >
                  <span className="font-display text-lg font-bold text-tape">{letter}</span>
                  <span className="text-sm leading-snug">{q.choices[idx]}</span>
                  {show && right && <Check className="ml-auto size-4 shrink-0 text-go" />}
                  {show && mine && !right && <X className="ml-auto size-4 shrink-0 text-stop" />}
                </button>
              )
            })}
          </div>
          {picked !== null && (
            <div className="mt-5 rounded-xl border border-line bg-raised px-4 py-3 text-sm leading-relaxed text-mute">
              <span className="text-ink">Why. </span>
              {q.why}
            </div>
          )}
          {picked !== null && (
            <button type="button" onClick={next} className="mt-4 rounded-xl bg-tape px-4 py-2 font-display text-lg font-bold uppercase text-paper">
              {i + 1 >= queue.length ? "Close the book" : "Next stem"}
            </button>
          )}
        </Panel>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      <Panel>
        <h1 className="font-display text-3xl font-extrabold uppercase">Drill</h1>
        <p className="mt-2 text-sm text-mute">
          Due items first. Exam-hard vignettes sit the Thursday clock. Call it hides the letters so you cannot tap your way to fake fluency.
        </p>
        <p className="mt-2 text-sm text-tape">{dueN} due tonight in {live.label}.</p>
      </Panel>
      <div className="grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={() => start("mission")} className="text-left">
          <Panel className="h-full hover:border-tape/50">
            <p className="font-display text-xs uppercase tracking-widest text-tape">Due queue</p>
            <h2 className="font-display text-2xl font-bold uppercase">15 from {live.label}</h2>
            <p className="mt-1 text-sm text-mute">Overdue and unseen first. Not a random 15.</p>
          </Panel>
        </button>
        <button type="button" onClick={() => start("call")} className="text-left">
          <Panel className="h-full hover:border-tape/50">
            <p className="font-display text-xs uppercase tracking-widest text-tape">Generation</p>
            <h2 className="font-display text-2xl font-bold uppercase">Call it · 10</h2>
            <p className="mt-1 text-sm text-mute">Stem only. Type the move. Stronger spacing if you hit.</p>
          </Panel>
        </button>
        <button type="button" onClick={() => start("exam", chapter, block)} className="text-left">
          <Panel className="h-full hover:border-tape/50">
            <p className="font-display text-xs uppercase tracking-widest text-tape">Exam-hard</p>
            <h2 className="font-display text-2xl font-bold uppercase">{BLOCKS.find((b) => b.id === block)?.label} vignettes</h2>
            <p className="mt-1 text-sm text-mute">NEXT / MOST APPROPRIATE items. Pick the block below, then tap this card.</p>
            <div className="mt-3 flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
              {BLOCKS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBlock(b.id)}
                  className={`rounded-full border px-3 py-1 text-xs ${block === b.id ? "border-tape text-tape" : "border-line text-mute"}`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </Panel>
        </button>
        <button type="button" onClick={() => start("missed")} className="text-left">
          <Panel className="h-full hover:border-tape/50">
            <p className="font-display text-xs uppercase tracking-widest text-tape">Weak spots</p>
            <h2 className="font-display text-2xl font-bold uppercase">Missed / shaky</h2>
            <p className="mt-1 text-sm text-mute">Under 80% accuracy. A miss injects a sibling stem so you do not just memorize the wording.</p>
          </Panel>
        </button>
        <button type="button" onClick={() => start("block", chapter, block)} className="text-left">
          <Panel className="h-full hover:border-tape/50">
            <p className="font-display text-xs uppercase tracking-widest text-tape">Block sim</p>
            <h2 className="font-display text-2xl font-bold uppercase">All {BLOCKS.find((b) => b.id === block)?.label} items</h2>
          </Panel>
        </button>
        <button type="button" onClick={() => start("final")} className="text-left">
          <Panel className="h-full hover:border-tape/50">
            <p className="font-display text-xs uppercase tracking-widest text-tape">Dec 10</p>
            <h2 className="font-display text-2xl font-bold uppercase">50 mixed · Ch. 1–41</h2>
            <p className="mt-1 text-sm text-mute">Half a final. 70% sits the practical — drill like 80.</p>
          </Panel>
        </button>
      </div>
      <Panel>
        <p className="font-display text-xs uppercase tracking-widest text-mute">Single chapter</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {(BLOCKS.find((b) => b.id === block) ?? live).examChapters.map((n) => {
            const ch = CHAPTERS.find((c) => c.n === n)!
            return (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setChapter(n)
                  start("chapter", n, block)
                }}
                className="rounded-xl border border-line bg-raised px-3 py-2 text-left text-sm hover:border-tape/40"
              >
                <span className="text-mute">Ch. {n}</span> {ch.title}
              </button>
            )
          })}
        </div>
      </Panel>
    </div>
  )
}
