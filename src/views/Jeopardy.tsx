import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { BRAND, classById, classesForBlock, type ClassSession } from "../data/brand"
import { videosForTopic } from "../data/videos"
import { currentBlock } from "../lib/schedule"
import { buildBoard, clueOf, nudgeOf, responseOf, shuffledChoices, type CategoryCol } from "../lib/jeopardy"
import { Panel } from "../components/ui"
import { VideoLinks } from "../components/VideoLinks"
import { useAuth } from "../lib/auth"
import { CREW_JOIN_CODE } from "../lib/supabase"
import {
  asTeam,
  buzzIn,
  cellKey,
  createLiveGame,
  fetchPlayers,
  patchGame,
  snapshotBoard,
  subscribeGame,
  type PlayerRow,
} from "../lib/live"
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
  return <Board key={session.id} session={session} onBack={() => go("jeopardy")} go={go} />
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
          Host on the computer. Teammates open <button type="button" className="text-tape" onClick={() => go("play")}>Play</button> on their phones, enter the live code, pick Red or Blue, and buzz. Hints stay on this screen — phones only get a BUZZ button.
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

function markTaken(cols: CategoryCol[], open: { ci: number; ri: number }) {
  return cols.map((cat, ci) =>
    ci !== open.ci ? cat : { ...cat, cells: cat.cells.map((c, ri) => (ri === open.ri ? { ...c, taken: true } : c)) },
  )
}

function Board({ session, onBack, go }: { session: ClassSession; onBack: () => void; go: (view: View, extra?: string) => void }) {
  const { user, profile, openAccount, joinCrew } = useAuth()
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
  const [live, setLive] = useState<{ id: string; code: string } | null>(null)
  const [players, setPlayers] = useState<PlayerRow[]>([])
  const [buzzerName, setBuzzerName] = useState<string | null>(null)
  const [liveError, setLiveError] = useState<string | null>(null)
  const [starting, setStarting] = useState(false)

  const liveRef = useRef(live)
  liveRef.current = live
  const openRef = useRef(open)
  openRef.current = open

  const current = open ? cols[open.ci]?.cells[open.ri] : null
  const choices = useMemo(() => (current ? shuffledChoices(current.q) : []), [current])
  const stealTeam: TeamId | null = firstBuzz === null ? null : firstBuzz === 0 ? 1 : 0
  const colsClass =
    cols.length >= 5 ? "grid-cols-2 lg:grid-cols-5" : cols.length === 4 ? "grid-cols-2 lg:grid-cols-4" : cols.length === 3 ? "grid-cols-3" : "grid-cols-2"

  useEffect(() => {
    if (!live) return
    const load = () => {
      void fetchPlayers(live.id).then(setPlayers)
    }
    load()
    const stop = subscribeGame(
      live.id,
      (row) => {
        setNames(Array.isArray(row.team_names) ? [row.team_names[0] ?? "Red", row.team_names[1] ?? "Blue"] : ["Red", "Blue"])
        if (Array.isArray(row.scores)) setScores([Number(row.scores[0] ?? 0), Number(row.scores[1] ?? 0)])
        if (row.phase === "clue" || row.phase === "answering" || row.phase === "steal") setPhase(row.phase)
        setActive(asTeam(row.active_team))
        setFirstBuzz(asTeam(row.first_buzz))
        setShowAnswer(Boolean(row.show_answer))
        setHint(row.hint ?? 0)
        setBuzzerName(row.buzzer_name)
        if (row.open_cell && typeof row.open_cell.ci === "number") setOpen({ ci: row.open_cell.ci, ri: row.open_cell.ri })
        else if (row.phase === "board" && !row.show_answer) setOpen(null)
      },
      load,
    )
    return stop
  }, [live?.id])

  useEffect(() => {
    if (!live) return
    const t = window.setTimeout(() => {
      void patchGame(live.id, { team_names: names })
    }, 500)
    return () => window.clearTimeout(t)
  }, [names, live?.id])

  const closeClue = () => {
    setOpen(null)
    setPhase("clue")
    setActive(null)
    setFirstBuzz(null)
    setShowAnswer(false)
    setHint(0)
    setBuzzerName(null)
    if (live) {
      void patchGame(live.id, {
        open_cell: null,
        phase: "board",
        active_team: null,
        first_buzz: null,
        show_answer: false,
        hint: 0,
        buzzer_name: null,
        buzzer_id: null,
      })
    }
  }

  const buzz = (team: TeamId) => {
    if (!current || showAnswer) return
    const game = liveRef.current
    const cell = openRef.current
    if (game && cell) {
      void buzzIn(game.id, cellKey(cell.ci, cell.ri), team)
    }
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
    if (!current || active === null || !open) return
    const nextScores = [...scores]
    nextScores[active] += correct ? current.value : -current.value
    setScores(nextScores)
    if (correct) {
      const nextCols = markTaken(cols, open)
      setCols(nextCols)
      setShowAnswer(true)
      if (live) void patchGame(live.id, { scores: nextScores, board: snapshotBoard(nextCols), show_answer: true })
      return
    }
    if (phase === "answering" && firstBuzz === active && stealTeam !== null) {
      setPhase("steal")
      setActive(null)
      if (live) void patchGame(live.id, { scores: nextScores, phase: "steal", active_team: null })
      return
    }
    const nextCols = markTaken(cols, open)
    setCols(nextCols)
    setShowAnswer(true)
    if (live) void patchGame(live.id, { scores: nextScores, board: snapshotBoard(nextCols), show_answer: true, phase: "answering" })
  }

  const passSteal = () => {
    if (!open) return
    const nextCols = markTaken(cols, open)
    setCols(nextCols)
    setShowAnswer(true)
    if (live) void patchGame(live.id, { board: snapshotBoard(nextCols), show_answer: true })
  }

  const redeal = () => {
    const next = deal + 1
    const nextCols = buildBoard(session, next)
    setDeal(next)
    setCols(nextCols)
    setScores([0, 0])
    closeClue()
    if (live) {
      void patchGame(live.id, {
        deal: next,
        board: snapshotBoard(nextCols),
        scores: [0, 0],
        open_cell: null,
        phase: "board",
        show_answer: false,
      })
    }
  }

  const startLive = async () => {
    setLiveError(null)
    if (!user) {
      openAccount("signup")
      return
    }
    if (!profile?.crew_id) {
      const joined = await joinCrew(CREW_JOIN_CODE)
      if (!joined.ok) {
        setLiveError(joined.error ?? "Join the crew with SPFR26 first.")
        return
      }
    }
    setStarting(true)
    try {
      const row = await createLiveGame({
        classId: session.id,
        board: snapshotBoard(cols),
        names,
        scores,
        deal,
      })
      setLive({ id: row.id, code: row.code })
    } catch (e) {
      setLiveError(e instanceof Error ? e.message : "Could not start a live game.")
    }
    setStarting(false)
  }

  const openClue = (ci: number, ri: number) => {
    setOpen({ ci, ri })
    setPhase("clue")
    setActive(null)
    setFirstBuzz(null)
    setShowAnswer(false)
    setHint(0)
    setBuzzerName(null)
    if (live) {
      void patchGame(live.id, {
        open_cell: { ci, ri, key: cellKey(ci, ri) },
        phase: "clue",
        active_team: null,
        first_buzz: null,
        hint: 0,
        show_answer: false,
        buzzer_name: null,
        buzzer_id: null,
      })
    }
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

  const reds = players.filter((p) => p.team === 0)
  const blues = players.filter((p) => p.team === 1)

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-1 text-sm text-mute">
          <ArrowLeft className="size-4" /> All classes
        </button>
        <div className="flex flex-wrap items-center gap-3">
          {!live && (
            <button type="button" onClick={() => void startLive()} disabled={starting} className="text-sm font-semibold text-tape">
              {starting ? "Starting…" : "Start live game"}
            </button>
          )}
          <button type="button" onClick={redeal} className="text-sm text-tape">
            New deal
          </button>
        </div>
      </div>
      {liveError && <p className="text-sm text-stop">{liveError}</p>}

      {live && (
        <Panel className="border-tape/50">
          <p className="font-display text-xs uppercase tracking-[0.2em] text-tape">Phones join at Play</p>
          <p className="font-display text-6xl font-extrabold tracking-[0.18em] text-ink">{live.code}</p>
          <p className="mt-1 text-sm text-mute">
            Teammates open <button type="button" className="text-tape" onClick={() => go("play", live.code)}>Play</button> and enter that code, then pick Red or Blue.
          </p>
          <p className="mt-2 text-xs text-mute">
            Red {reds.length ? reds.map((p) => p.display_name || "player").join(", ") : "empty"} · Blue{" "}
            {blues.length ? blues.map((p) => p.display_name || "player").join(", ") : "empty"}
          </p>
        </Panel>
      )}

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
            <p className="text-xs text-mute">Buzz with {id === 0 ? "1 / A" : "2 / B"}{live ? " or phones" : ""}</p>
          </Panel>
        ))}
      </div>

      <Panel>
        <p className="font-display text-xs uppercase tracking-[0.2em] text-tape">{session.subtitle}</p>
        <h1 className="font-display text-3xl font-extrabold uppercase text-ink">{session.title}</h1>
        <p className="mt-1 text-sm text-mute">Pick a clue. First buzz answers out loud. Host can give a nudge, then a multiple-choice hint if they’re still stuck.</p>
        {videosForTopic(session.id).length > 0 && (
          <div className="mt-4 border-t border-line pt-4">
            <p className="font-display text-xs uppercase tracking-widest text-mute">Watch before class</p>
            <div className="mt-2">
              <VideoLinks links={videosForTopic(session.id)} />
            </div>
          </div>
        )}
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
                onClick={() => openClue(ci, ri)}
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
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:items-center sm:p-4">
          <Panel className="sheet-safe w-full max-w-2xl shadow-xl">
            <p className="font-display text-xs uppercase tracking-[0.2em] text-mute">
              {cols[open!.ci].name} · {current.value}
            </p>
            <p className="mt-3 font-display text-3xl font-bold uppercase leading-tight text-ink sm:text-4xl">{clueOf(current.q)}</p>

            {!showAnswer && (
              <div className="mt-4 grid gap-2">
                {hint === 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setHint(1)
                      if (live) void patchGame(live.id, { hint: 1 })
                    }}
                    className="w-fit rounded-full border border-line px-3 py-1 text-xs text-mute"
                  >
                    Hint 1 · slight nudge
                  </button>
                )}
                {hint >= 1 && <p className="text-sm text-mute">{nudgeOf(current.q)}</p>}
                {hint === 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      setHint(2)
                      if (live) void patchGame(live.id, { hint: 2 })
                    }}
                    className="w-fit rounded-full border border-line px-3 py-1 text-xs text-mute"
                  >
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
                  {buzzerName ? `${buzzerName} · ` : ""}
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
