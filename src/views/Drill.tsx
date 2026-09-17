import { useEffect, useMemo, useState } from "react"
import { Check, X } from "lucide-react"
import { BLOCKS, CHAPTERS, type BlockId } from "../data/syllabus"
import { QUESTIONS, chapterTitle, questionsForBlock, questionsForChapters, type Question } from "../data/questions"
import { blockMeta, pickMission, shuffle } from "../lib/schedule"
import { recordAnswer } from "../lib/storage"
import { useAppStore } from "../lib/store"
import { Panel, Pill } from "../components/ui"

type Mode = "mission" | "chapter" | "block" | "missed" | "final"

export function DrillView({ seedChapter }: { seedChapter?: number }) {
  const { store, setStore } = useAppStore()
  const live = blockMeta()
  const [block, setBlock] = useState<BlockId>(live.id)
  const [chapter, setChapter] = useState<number>(seedChapter ?? live.examChapters[0])
  const [mode, setMode] = useState<Mode>(seedChapter ? "chapter" : "mission")
  const [queue, setQueue] = useState<Question[] | null>(null)
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [hits, setHits] = useState(0)
  const [done, setDone] = useState(false)

  const start = (next: Mode, ch = chapter, b = block) => {
    let pool: Question[] = []
    if (next === "mission") pool = pickMission(questionsForBlock(live.id), store.items, 15)
    if (next === "chapter") pool = shuffle(questionsForChapters([ch]))
    if (next === "block") pool = shuffle(questionsForBlock(b))
    if (next === "missed") {
      pool = QUESTIONS.filter((q) => {
        const s = store.items[q.id]
        return s && s.seen > 0 && s.correct / s.seen < 0.8
      })
      if (pool.length === 0) pool = pickMission(questionsForBlock(live.id), store.items, 15)
    }
    if (next === "final") pool = shuffle(QUESTIONS).slice(0, 50)
    setMode(next)
    setQueue(pool)
    setI(0)
    setPicked(null)
    setHits(0)
    setDone(false)
  }

  useEffect(() => {
    if (seedChapter) start("chapter", seedChapter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seedChapter])

  const q = queue?.[i]
  const order = useMemo(() => (q ? shuffle(q.choices.map((_, idx) => idx), q.id.length * 17) : []), [q])

  const choose = (idx: number) => {
    if (!q || picked !== null) return
    const ok = idx === q.answer
    setPicked(idx)
    if (ok) setHits((h) => h + 1)
    setStore(recordAnswer(store, q.id, ok))
  }

  const next = () => {
    if (!queue) return
    if (i + 1 >= queue.length) {
      setDone(true)
      return
    }
    setI(i + 1)
    setPicked(null)
  }

  if (done && queue) {
    const pct = Math.round((hits / queue.length) * 100)
    return (
      <Panel>
        <p className="font-display text-xs uppercase tracking-[0.2em] text-tape">Session closed</p>
        <h2 className="font-display text-5xl font-extrabold">{pct}%</h2>
        <p className="mt-2 text-mute">
          {hits} / {queue.length} · {pct >= 80 ? "That's the line. Do not donate it back tomorrow." : "Under 80. Same deck again tonight, then a different chapter."}
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

  if (q && queue) {
    return (
      <div className="grid gap-4">
        <div className="flex items-center justify-between gap-3 text-sm text-mute">
          <span>
            {i + 1} / {queue.length} · Ch. {q.chapter} {chapterTitle(q.chapter)}
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
          Original items mapped to this syllabus — not a pirated test bank. The Thursday exam still uses their questions. Ours train the same decisions.
        </p>
      </Panel>
      <div className="grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={() => start("mission")} className="text-left">
          <Panel className="h-full hover:border-tape/50">
            <p className="font-display text-xs uppercase tracking-widest text-tape">Tonight</p>
            <h2 className="font-display text-2xl font-bold uppercase">15 from {live.label}</h2>
            <p className="mt-1 text-sm text-mute">Unseen and sub-80 chapters first. This is the default after class. Timed exams live under Tests.</p>
          </Panel>
        </button>
        <button type="button" onClick={() => start("missed")} className="text-left">
          <Panel className="h-full hover:border-tape/50">
            <p className="font-display text-xs uppercase tracking-widest text-tape">Weak spots</p>
            <h2 className="font-display text-2xl font-bold uppercase">Missed / shaky</h2>
            <p className="mt-1 text-sm text-mute">Anything under 80% accuracy. If the list is empty, you get a fresh 15.</p>
          </Panel>
        </button>
        <button type="button" onClick={() => start("block", chapter, block)} className="text-left">
          <Panel className="h-full hover:border-tape/50">
            <p className="font-display text-xs uppercase tracking-widest text-tape">Block sim</p>
            <h2 className="font-display text-2xl font-bold uppercase">All {BLOCKS.find((b) => b.id === block)?.label} items</h2>
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
        <button type="button" onClick={() => start("final")} className="text-left">
          <Panel className="h-full hover:border-tape/50">
            <p className="font-display text-xs uppercase tracking-widest text-tape">Dec 10</p>
            <h2 className="font-display text-2xl font-bold uppercase">50 mixed · Ch. 1–41</h2>
            <p className="mt-1 text-sm text-mute">Half a final. 70% is the floor to sit the practical — drill like 80 anyway.</p>
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
