import { useEffect, useMemo, useRef, useState } from "react"
import { Check, Clock, Flag } from "lucide-react"
import { BLOCKS, chapterByNumber } from "../data/syllabus"
import { chapterTitle, type Question } from "../data/questions"
import { PRACTICE_TESTS, UNIT_GROUPS, testById, type PracticeTest } from "../data/tests"
import { blockMeta, shuffle } from "../lib/schedule"
import { buildTestQueue, chapterBreakdown, formatClock, poolFor } from "../lib/practice"
import { bestRun, recordAnswer, recordTestRun, runsForTest } from "../lib/storage"
import { useAppStore } from "../lib/store"
import { Panel, Pill, pctColor } from "../components/ui"

type Phase = "lobby" | "intro" | "exam" | "review"

export function TestsView({ seedId, go }: { seedId?: string; go: (view: "tests", extra?: string) => void }) {
  const { store, setStore } = useAppStore()
  const live = blockMeta()
  const [test, setTest] = useState<PracticeTest | null>(() => (seedId ? testById(seedId) ?? null : null))
  const [phase, setPhase] = useState<Phase>(seedId && testById(seedId) ? "intro" : "lobby")
  const [queue, setQueue] = useState<Question[]>([])
  const [i, setI] = useState(0)
  const [picks, setPicks] = useState<(number | null)[]>([])
  const [flags, setFlags] = useState<Set<number>>(new Set())
  const [left, setLeft] = useState(0)
  const [startedAt, setStartedAt] = useState(0)
  const [timedOut, setTimedOut] = useState(false)
  const [confirmSubmit, setConfirmSubmit] = useState(false)
  const locked = useRef(false)
  const examRef = useRef({ test, queue, picks, startedAt, store })
  examRef.current = { test, queue, picks, startedAt, store }
  const finishRef = useRef<(timeout: boolean) => void>(() => {})

  useEffect(() => {
    if (phase === "exam" || phase === "review") return
    const next = seedId ? testById(seedId) ?? null : null
    setTest(next)
    setPhase(next ? "intro" : "lobby")
  }, [seedId, phase])

  const start = (t: PracticeTest) => {
    const q = buildTestQueue(t)
    setTest(t)
    setQueue(q)
    setPicks(Array.from({ length: q.length }, () => null))
    setFlags(new Set())
    setI(0)
    setLeft(t.minutes * 60)
    setStartedAt(Date.now())
    setTimedOut(false)
    setConfirmSubmit(false)
    locked.current = false
    setPhase("exam")
  }

  const finish = (timeout: boolean) => {
    if (locked.current) return
    const snap = examRef.current
    if (!snap.test || !snap.queue.length) return
    locked.current = true
    const hits = snap.queue.reduce((n, item, idx) => n + (snap.picks[idx] === item.answer ? 1 : 0), 0)
    const pct = Math.round((hits / snap.queue.length) * 100)
    const elapsedSec = Math.max(1, Math.round((Date.now() - snap.startedAt) / 1000))
    let next = snap.store
    snap.queue.forEach((item, idx) => {
      const pick = snap.picks[idx]
      if (pick === null) return
      next = recordAnswer(next, item.id, pick === item.answer)
    })
    next = recordTestRun(next, {
      testId: snap.test.id,
      at: Date.now(),
      hits,
      total: snap.queue.length,
      pct,
      elapsedSec,
      timedOut: timeout,
      missedIds: snap.queue.filter((item, idx) => snap.picks[idx] !== item.answer).map((item) => item.id),
    })
    setStore(next)
    setTimedOut(timeout)
    setPhase("review")
  }
  finishRef.current = finish

  useEffect(() => {
    if (phase !== "exam") return
    const id = window.setInterval(() => {
      setLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(id)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [phase, startedAt])

  useEffect(() => {
    if (phase === "exam" && left === 0 && startedAt) finishRef.current(true)
  }, [left, phase, startedAt])

  const q = queue[i]
  const order = useMemo(() => (q ? shuffle(q.choices.map((_, idx) => idx), q.id.length * 17) : []), [q])
  const unanswered = picks.filter((p) => p === null).length
  const flagged = flags.size

  const openIntro = (t: PracticeTest) => {
    setTest(t)
    setPhase("intro")
    go("tests", t.id)
  }

  const backLobby = () => {
    setPhase("lobby")
    setTest(null)
    setQueue([])
    go("tests")
  }

  if (phase === "review" && test && queue.length) {
    const hits = queue.reduce((n, item, idx) => n + (picks[idx] === item.answer ? 1 : 0), 0)
    const pct = Math.round((hits / queue.length) * 100)
    const passed = pct >= test.passLine
    const breakdown = chapterBreakdown(queue, picks)
    const missed = queue
      .map((item, idx) => ({ item, idx, pick: picks[idx] }))
      .filter((row) => row.pick !== row.item.answer)

    return (
      <div className="grid gap-4">
        <Panel>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-tape">Practice closed{timedOut ? " · time" : ""}</p>
          <h2 className={`font-display text-6xl font-extrabold ${pctColor(pct)}`}>{pct}%</h2>
          <p className="mt-2 text-mute">
            {hits} / {queue.length} · {test.label} · line is {test.passLine}%
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Pill tone={passed ? "go" : "stop"}>{passed ? "At or over the line" : "Under the line"}</Pill>
            <Pill>{formatClock(Math.round((Date.now() - startedAt) / 1000))} used</Pill>
          </div>
          <p className="mt-3 text-sm text-mute">
            {passed
              ? "Good. The real test still uses their items — do not treat this as a Thursday score."
              : "Stay in the missed chapters tonight. Drill is for teaching; this mode is for the clock."}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <button type="button" className="rounded-xl bg-tape px-4 py-2 font-display text-lg font-bold uppercase text-paper" onClick={() => start(test)}>
              Sit it again
            </button>
            <button type="button" className="rounded-xl border border-line px-4 py-2 text-sm" onClick={backLobby}>
              All unit tests
            </button>
          </div>
        </Panel>
        <Panel>
          <h3 className="font-display text-xl font-bold uppercase">By chapter</h3>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {breakdown.map((row) => (
              <div key={row.chapter} className="flex items-center justify-between rounded-xl border border-line bg-raised px-3 py-2 text-sm">
                <span>
                  <span className="text-mute">Ch. {row.chapter}</span> {chapterTitle(row.chapter)}
                </span>
                <span className={`font-display text-lg font-bold ${pctColor(row.pct)}`}>
                  {row.hits}/{row.total}
                </span>
              </div>
            ))}
          </div>
        </Panel>
        {missed.length > 0 && (
          <Panel>
            <h3 className="font-display text-xl font-bold uppercase">Missed / blank</h3>
            <div className="mt-4 grid gap-4">
              {missed.map(({ item, pick }) => (
                <div key={item.id} className="rounded-xl border border-line bg-raised px-3 py-3">
                  <Pill tone="tape">{item.tag}</Pill>
                  <p className="mt-2 text-sm font-medium">{item.stem}</p>
                  <p className="mt-2 text-sm text-stop">
                    You: {pick === null ? "blank" : item.choices[pick]}
                  </p>
                  <p className="mt-1 text-sm text-go">Response: {item.choices[item.answer]}</p>
                  <p className="mt-2 text-sm text-mute">
                    <span className="text-ink">Why. </span>
                    {item.why}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
        )}
      </div>
    )
  }

  if (phase === "exam" && test && q) {
    const warn = left <= 5 * 60
    return (
      <div className="grid gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="text-mute">
            {i + 1} / {queue.length} · Ch. {q.chapter} {chapterTitle(q.chapter)}
          </span>
          <span className={`inline-flex items-center gap-1.5 font-display text-xl font-bold ${warn ? "text-stop" : "text-tape"}`}>
            <Clock className="size-4" />
            {formatClock(left)}
          </span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-raised">
          <div className="h-full bg-tape" style={{ width: `${((i + 1) / queue.length) * 100}%` }} />
        </div>
        <Panel>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Pill tone="tape">{q.tag}</Pill>
            <button
              type="button"
              onClick={() =>
                setFlags((prev) => {
                  const next = new Set(prev)
                  if (next.has(i)) next.delete(i)
                  else next.add(i)
                  return next
                })
              }
              className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs ${
                flags.has(i) ? "border-warn text-warn" : "border-line text-mute"
              }`}
            >
              <Flag className="size-3.5" />
              {flags.has(i) ? "Flagged" : "Flag"}
            </button>
          </div>
          <h2 className="mt-3 text-xl font-medium leading-snug text-ink">{q.stem}</h2>
          <div className="mt-5 grid gap-2">
            {order.map((idx, display) => {
              const mine = picks[i] === idx
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPicks((prev) => prev.map((p, n) => (n === i ? idx : p)))}
                  className={`flex gap-3 rounded-xl border px-3 py-3 text-left ${
                    mine ? "border-tape bg-tape/10" : "border-line bg-raised hover:border-tape/40"
                  }`}
                >
                  <span className="font-display text-lg font-bold text-tape">{"ABCD"[display]}</span>
                  <span className="text-sm leading-snug">{q.choices[idx]}</span>
                  {mine && <Check className="ml-auto size-4 shrink-0 text-tape" />}
                </button>
              )
            })}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={i === 0}
              onClick={() => setI((n) => Math.max(0, n - 1))}
              className="rounded-xl border border-line px-4 py-2 text-sm disabled:opacity-40"
            >
              Back
            </button>
            {i + 1 < queue.length ? (
              <button type="button" onClick={() => setI((n) => n + 1)} className="rounded-xl bg-tape px-4 py-2 font-display text-lg font-bold uppercase text-paper">
                Next
              </button>
            ) : (
              <button type="button" onClick={() => setConfirmSubmit(true)} className="rounded-xl bg-tape px-4 py-2 font-display text-lg font-bold uppercase text-paper">
                Submit
              </button>
            )}
            <span className="self-center text-xs text-mute">
              {unanswered} blank · {flagged} flagged
            </span>
          </div>
        </Panel>
        <Panel>
          <p className="font-display text-xs uppercase tracking-widest text-mute">Jump</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {queue.map((_, idx) => {
              const blank = picks[idx] === null
              const on = idx === i
              const marked = flags.has(idx)
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setI(idx)}
                  className={`size-8 rounded-lg text-xs font-display font-bold ${
                    on
                      ? "bg-tape text-paper"
                      : marked
                        ? "bg-warn/20 text-warn"
                        : blank
                          ? "bg-raised text-mute"
                          : "bg-go/15 text-go"
                  }`}
                >
                  {idx + 1}
                </button>
              )
            })}
          </div>
        </Panel>
        {confirmSubmit && (
          <Panel>
            <h3 className="font-display text-xl font-bold uppercase">Hand it in?</h3>
            <p className="mt-2 text-sm text-mute">
              {unanswered ? `${unanswered} still blank. They count as misses.` : "Every item has a mark."} No changing after this.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" className="rounded-xl bg-tape px-4 py-2 font-display text-lg font-bold uppercase text-paper" onClick={() => finish(false)}>
                Submit test
              </button>
              <button type="button" className="rounded-xl border border-line px-4 py-2 text-sm" onClick={() => setConfirmSubmit(false)}>
                Keep working
              </button>
            </div>
          </Panel>
        )}
      </div>
    )
  }

  if (phase === "intro" && test) {
    const pool = poolFor(test)
    const n = Math.min(test.target, pool.length)
    const runs = runsForTest(store, test.id)
    const best = bestRun(store, test.id)
    return (
      <div className="grid gap-4">
        <button type="button" onClick={backLobby} className="text-left text-sm text-tape">
          ← All unit tests
        </button>
        <Panel>
          <Pill tone="tape">{test.unit}</Pill>
          <h1 className="mt-2 font-display text-4xl font-extrabold uppercase">{test.label}</h1>
          <p className="mt-2 text-sm text-mute">{test.subtitle}</p>
          <p className="mt-1 text-sm text-mute">{test.when}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Pill>{n} questions</Pill>
            <Pill>{test.minutes} min</Pill>
            <Pill tone="tape">{test.passLine}% line</Pill>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-mute">{test.gate}</p>
          <p className="mt-2 text-sm leading-relaxed text-mute">
            Exam conditions: no why until you submit, countdown clock, flag and jump around. Items are vignette-heavy with near-miss distractors — built to feel like Thursday writtens, not the official KCEMS form.
          </p>
          {best && (
            <p className={`mt-4 font-display text-2xl font-bold ${pctColor(best.pct)}`}>
              Best {best.pct}% · last {runs[runs.length - 1]?.pct}%
            </p>
          )}
          <button type="button" onClick={() => start(test)} className="mt-6 rounded-xl bg-tape px-4 py-2 font-display text-lg font-bold uppercase text-paper">
            Start the clock
          </button>
        </Panel>
        <Panel>
          <p className="font-display text-xs uppercase tracking-widest text-mute">Chapters on this test</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(test.chapters.length ? test.chapters : BLOCKS.flatMap((b) => b.examChapters)).map((nCh) => (
              <Pill key={nCh}>
                Ch. {nCh} {chapterByNumber(nCh)?.title}
              </Pill>
            ))}
          </div>
        </Panel>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      <Panel>
        <h1 className="font-display text-3xl font-extrabold uppercase">Unit tests</h1>
        <p className="mt-2 text-sm text-mute">
          One practice written and one quiz for every block, plus Quiz 5 and a 150 final. Same 80% / 70% lines as the course. Unit tests draw from the hard vignette bank (scenario stems, priority traps). Clock on, answers off, until you hand it in.
        </p>
      </Panel>
      {UNIT_GROUPS.map((group) => (
        <Panel key={group.title} className={group.block === live.id ? "border-tape/60" : ""}>
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2 className="font-display text-2xl font-bold uppercase">{group.title}</h2>
            {group.block === live.id && <Pill tone="tape">this unit</Pill>}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {group.testIds.map((id) => {
              const t = PRACTICE_TESTS.find((x) => x.id === id)!
              const pool = poolFor(t)
              const n = Math.min(t.target, pool.length)
              const best = bestRun(store, t.id)
              const last = runsForTest(store, t.id).at(-1)
              return (
                <button key={id} type="button" onClick={() => openIntro(t)} className="rounded-xl border border-line bg-raised px-4 py-3 text-left hover:border-tape/40">
                  <p className="font-display text-xs uppercase tracking-widest text-tape">{t.kind === "quiz" ? "Quiz" : t.kind === "final" ? "Final" : "Written"}</p>
                  <p className="font-display text-xl font-bold uppercase">{t.label}</p>
                  <p className="mt-1 text-sm text-mute">
                    {n} q · {t.minutes} min · {t.passLine}% line
                  </p>
                  {best ? (
                    <p className={`mt-2 font-display text-lg font-bold ${pctColor(best.pct)}`}>
                      Best {best.pct}%{last && last !== best ? ` · last ${last.pct}%` : ""}
                    </p>
                  ) : (
                    <p className="mt-2 text-sm text-mute">Not sat yet</p>
                  )}
                </button>
              )
            })}
          </div>
        </Panel>
      ))}
    </div>
  )
}
