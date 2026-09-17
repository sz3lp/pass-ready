import { useEffect, useMemo, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { BRAND, classById, classesForBlock, type ClassSession } from "../data/brand"
import { videosForTopic } from "../data/videos"
import { currentBlock } from "../lib/schedule"
import { buildBoard, clueOf, nudgeOf, responseOf, shuffledChoices, type CategoryCol } from "../lib/jeopardy"
import { Panel } from "../components/ui"
import { VideoLinks } from "../components/VideoLinks"
import type { View } from "../nav"

const BLOCK_LABEL: Record<ClassSession["block"], string> = {
  1: "Block I",
  2: "Block II",
  3: "Block III",
  4: "Block IV",
  final: "Finals week",
}

type TeamId = 0 | 1
type Phase = "clue" | "answering" | "steal"

export function JeopardyView({ sessionId, go }: { sessionId?: string; go: (view: View, extra?: string) => void }) {
  const session = sessionId ? classById(sessionId) : undefined
  if (!session) return <Lobby go={go} />
  return <Board key={session.id} session={session} onBack={() => go("jeopardy")} />
}

function Lobby({ go }: { go: (view: View, extra?: string) => void }) {
  const live = currentBlock()
  const groups: ClassSession["block"][] = [1, 2, 3, 4, "final"]
  return (
    <div className="grid gap-4">
      <Panel className="relative overflow-hidden">
        <div className="tape-stripe absolute inset-x-0 top-0 h-1.5" />
        <p className="mt-1 font-display text-xs uppercase tracking-[0.22em] text-tape">{BRAND.deptShort} class night</p>
        <h1 className="font-display text-4xl font-extrabold uppercase text-ink">Jeopardy</h1>
        <p className="mt-2 max-w-2xl text-sm text-mute">
          Real board, two teams. A clue goes up. First team to buzz answers out loud. If they’re stuck, the host can burn a nudge, then a multiple-choice hint. Wrong answers lose the value and the other team can steal.
        </p>
      </Panel>
      {groups.map((block) => (
        <div key={String(block)} className="grid gap-2">
          <h2 className="font-display text-xl font-bold uppercase text-ink">
            {BLOCK_LABEL[block]}
            {block === live ? <span className="ml-2 text-sm font-semibold text-medic">now</span> : null}
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {classesForBlock(block).map((c) => {
              const vids = videosForTopic(c.id)
              return (
                <div key={c.id} className="grid gap-2">
                  <button type="button" onClick={() => go("jeopardy", c.id)} className="text-left">
                    <Panel className="h-full hover:border-tape/50">
                      <p className="font-display text-xs uppercase tracking-widest text-tape">{c.subtitle}</p>
                      <h3 className="font-display text-2xl font-bold uppercase leading-tight">{c.title}</h3>
                      <p className="mt-1 text-xs text-mute">
                        {c.categories.length === 1 ? "1 category" : `${c.categories.length} categories`}
                        {vids.length ? ` · ${vids.length} topic videos` : ""}
                      </p>
                    </Panel>
                  </button>
                  {vids.length > 0 && (
                    <Panel>
                      <p className="font-display text-xs uppercase tracking-widest text-mute">Topic overview</p>
                      <div className="mt-2">
                        <VideoLinks links={vids} />
                      </div>
                    </Panel>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function Board({ session, onBack }: { session: ClassSession; onBack: () => void }) {
  const [deal, setDeal] = useState(1)
  const initial = useMemo(() => buildBoard(session, deal), [session, deal])
  const [cols, setCols] = useState<CategoryCol[]>(initial)
  const [names, setNames] = useState(["Red", "Blue"])
  const [scores, setScores] = useState([0, 0])
  const [open, setOpen] = useState<{ ci: number; ri: number } | null>(null)
  const [phase, setPhase] = useState<Phase>("clue")
  const [active, setActive] = useState<TeamId | null>(null)
  const [firstBuzz, setFirstBuzz] = useState<TeamId | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [hint, setHint] = useState(0)

  const current = open ? cols[open.ci]?.cells[open.ri] : null
  const choices = useMemo(() => (current ? shuffledChoices(current.q) : []), [current])
  const stealTeam: TeamId | null = firstBuzz === null ? null : firstBuzz === 0 ? 1 : 0
  const colsClass =
    cols.length >= 5 ? "grid-cols-2 lg:grid-cols-5" : cols.length === 4 ? "grid-cols-2 lg:grid-cols-4" : cols.length === 3 ? "grid-cols-3" : "grid-cols-2"

  const closeClue = () => {
    setOpen(null)
    setPhase("clue")
    setActive(null)
    setFirstBuzz(null)
    setShowAnswer(false)
    setHint(0)
  }

  const takeCell = () => {
    if (!open) return
    setCols((prev) =>
      prev.map((cat, ci) =>
        ci !== open.ci ? cat : { ...cat, cells: cat.cells.map((c, ri) => (ri === open.ri ? { ...c, taken: true } : c)) },
      ),
    )
  }

  const addScore = (team: TeamId, delta: number) => {
    setScores((s) => {
      const next = [...s]
      next[team] += delta
      return next
    })
  }

  const buzz = (team: TeamId) => {
    if (!current || showAnswer) return
    if (phase === "clue") {
      setActive(team)
      setFirstBuzz(team)
      setPhase("answering")
      return
    }
    if (phase === "steal" && team === stealTeam) {
      setActive(team)
      setPhase("answering")
    }
  }

  const judge = (correct: boolean) => {
    if (!current || active === null) return
    addScore(active, correct ? current.value : -current.value)
    if (correct) {
      takeCell()
      setShowAnswer(true)
      return
    }
    if (phase === "answering" && firstBuzz === active && stealTeam !== null) {
      setPhase("steal")
      setActive(null)
      return
    }
    takeCell()
    setShowAnswer(true)
  }

  const passSteal = () => {
    takeCell()
    setShowAnswer(true)
  }

  const redeal = () => {
    const next = deal + 1
    setDeal(next)
    setCols(buildBoard(session, next))
    setScores([0, 0])
    closeClue()
  }

  useEffect(() => {
    if (!current || showAnswer) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "1" || e.key === "a" || e.key === "A") buzz(0)
      if (e.key === "2" || e.key === "b" || e.key === "B") buzz(1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-1 text-sm text-mute">
          <ArrowLeft className="size-4" /> All classes
        </button>
        <button type="button" onClick={redeal} className="text-sm text-tape">
          New deal
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {([0, 1] as const).map((id) => (
          <Panel key={id} className={id === 0 ? "border-medic/40" : "border-tape/40"}>
            <input
              value={names[id]}
              onChange={(e) =>
                setNames((n) => {
                  const next = [...n]
                  next[id] = e.target.value
                  return next
                })
              }
              className={`w-full bg-transparent font-display text-sm font-semibold uppercase tracking-[0.2em] outline-none ${id === 0 ? "text-medic" : "text-tape"}`}
            />
            <p className={`font-display text-5xl font-extrabold ${id === 0 ? "text-medic" : "text-tape"}`}>{scores[id]}</p>
            <p className="text-xs text-mute">Buzz with {id === 0 ? "1 / A" : "2 / B"}</p>
          </Panel>
        ))}
      </div>

      <Panel>
        <p className="font-display text-xs uppercase tracking-[0.2em] text-tape">{session.subtitle}</p>
        <h1 className="font-display text-3xl font-extrabold uppercase text-ink">{session.title}</h1>
        <p className="mt-1 text-sm text-mute">Pick a clue. First buzz answers out loud. Host can give a nudge, then a multiple-choice hint if they’re still stuck.</p>
      </Panel>

      <div className={`grid gap-2 ${colsClass}`}>
        {cols.map((cat, ci) => (
          <div key={cat.name} className="grid gap-2 content-start">
            <div className="rounded-xl bg-tape px-2 py-3 text-center font-display text-base font-bold uppercase leading-tight text-paper">
              {cat.name}
            </div>
            {cat.cells.map((c, ri) => (
              <button
                key={`${cat.name}-${c.value}-${c.q.id}`}
                type="button"
                disabled={c.taken}
                onClick={() => {
                  setOpen({ ci, ri })
                  setPhase("clue")
                  setActive(null)
                  setFirstBuzz(null)
                  setShowAnswer(false)
                  setHint(0)
                }}
                className={`rounded-xl border py-4 font-display text-2xl font-extrabold ${
                  c.taken ? "border-line bg-raised text-line" : "border-tape/30 bg-panel text-tape hover:bg-raised"
                }`}
              >
                {c.taken ? "—" : c.value}
              </button>
            ))}
          </div>
        ))}
      </div>

      {current && (
        <div className="fixed inset-0 z-20 flex items-end justify-center bg-ink/50 p-4 sm:items-center">
          <Panel className="w-full max-w-2xl shadow-xl">
            <p className="font-display text-xs uppercase tracking-[0.2em] text-mute">
              {cols[open!.ci].name} · {current.value}
            </p>
            <p className="mt-3 font-display text-3xl font-bold uppercase leading-tight text-ink sm:text-4xl">{clueOf(current.q)}</p>

            {!showAnswer && (
              <div className="mt-4 grid gap-2">
                {hint === 0 && (
                  <button type="button" onClick={() => setHint(1)} className="w-fit rounded-full border border-line px-3 py-1 text-xs text-mute">
                    Hint 1 · slight nudge
                  </button>
                )}
                {hint >= 1 && <p className="text-sm text-mute">{nudgeOf(current.q)}</p>}
                {hint === 1 && (
                  <button type="button" onClick={() => setHint(2)} className="w-fit rounded-full border border-line px-3 py-1 text-xs text-mute">
                    Hint 2 · multiple choice
                  </button>
                )}
                {hint >= 2 && (
                  <div className="grid gap-2">
                    {choices.map((c, display) => (
                      <div key={c.index} className="rounded-xl border border-line bg-raised px-3 py-2 text-sm">
                        <span className="font-display font-bold text-tape">{"ABCD"[display]} </span>
                        {c.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {phase === "clue" && !showAnswer && (
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                <button type="button" onClick={() => buzz(0)} className="rounded-xl bg-medic px-4 py-4 font-display text-2xl font-extrabold uppercase text-paper">
                  {names[0]} buzz
                </button>
                <button type="button" onClick={() => buzz(1)} className="rounded-xl bg-tape px-4 py-4 font-display text-2xl font-extrabold uppercase text-paper">
                  {names[1]} buzz
                </button>
              </div>
            )}

            {phase === "answering" && active !== null && !showAnswer && (
              <div className="mt-6 grid gap-3">
                <p className={`font-display text-2xl font-bold uppercase ${active === 0 ? "text-medic" : "text-tape"}`}>
                  {names[active]} is answering
                </p>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => judge(true)} className="rounded-xl bg-go px-4 py-3 font-display text-lg font-bold uppercase text-paper">
                    Correct · +{current.value}
                  </button>
                  <button type="button" onClick={() => judge(false)} className="rounded-xl bg-stop px-4 py-3 font-display text-lg font-bold uppercase text-paper">
                    Wrong · −{current.value}
                  </button>
                </div>
              </div>
            )}

            {phase === "steal" && !showAnswer && (
              <div className="mt-6 grid gap-3">
                <p className="text-sm text-mute">Steal is open. Other team buzzes or the host passes it.</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {stealTeam !== null && (
                    <button
                      type="button"
                      onClick={() => buzz(stealTeam)}
                      className={`rounded-xl px-4 py-4 font-display text-2xl font-extrabold uppercase text-paper ${stealTeam === 0 ? "bg-medic" : "bg-tape"}`}
                    >
                      {names[stealTeam]} steal
                    </button>
                  )}
                  <button type="button" onClick={passSteal} className="rounded-xl border border-line px-4 py-4 font-display text-lg font-bold uppercase text-mute">
                    Nobody · show answer
                  </button>
                </div>
              </div>
            )}

            {showAnswer && (
              <div className="mt-6 rounded-xl border border-line bg-raised px-4 py-3">
                <p className="font-display text-xs uppercase tracking-[0.2em] text-tape">Response</p>
                <p className="mt-1 font-display text-2xl font-bold uppercase text-ink">{responseOf(current.q)}</p>
                <p className="mt-2 text-sm text-mute">{current.q.why}</p>
                <button type="button" onClick={closeClue} className="mt-4 rounded-xl bg-tape px-4 py-2 font-display font-bold uppercase text-paper">
                  Back to the board
                </button>
              </div>
            )}
          </Panel>
        </div>
      )}
    </div>
  )
}
