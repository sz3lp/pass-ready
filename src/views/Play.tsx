import { useEffect, useState } from "react"
import { Bell } from "lucide-react"
import { CREW_JOIN_CODE } from "../lib/supabase"
import { useAuth } from "../lib/auth"
import { useAppStore } from "../lib/store"
import { asTeam, buzzIn, fetchGame, fetchGameByCode, joinLiveGame, subscribeGame, touchPlayer, type GameRow } from "../lib/live"
import { Panel } from "../components/ui"

export function PlayView({ seedCode }: { seedCode?: string }) {
  const { user, profile, openAccount, joinCrew } = useAuth()
  const { store } = useAppStore()
  const [code, setCode] = useState((seedCode ?? "").toUpperCase())
  const [game, setGame] = useState<GameRow | null>(null)
  const [team, setTeam] = useState<0 | 1 | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [buzzing, setBuzzing] = useState(false)
  const [status, setStatus] = useState("")

  const name = profile?.display_name || store.name || "Player"

  useEffect(() => {
    if (seedCode) setCode(seedCode.toUpperCase())
  }, [seedCode])

  useEffect(() => {
    if (!game) return
    const id = game.id
    const stop = subscribeGame(id, setGame)
    const tick = window.setInterval(() => {
      void fetchGame(id).then((row) => {
        if (row) setGame(row)
      })
      void touchPlayer(id)
    }, 5000)
    return () => {
      stop()
      window.clearInterval(tick)
    }
  }, [game?.id])

  const enter = async () => {
    setError(null)
    if (!user) {
      openAccount("signup")
      return
    }
    if (!profile?.crew_id) {
      const joined = await joinCrew(CREW_JOIN_CODE)
      if (!joined.ok) {
        setError(joined.error ?? "Join the crew with SPFR26 first.")
        return
      }
    }
    const row = await fetchGameByCode(code)
    if (!row) {
      setError("No live game with that code. Host starts it from Jeopardy.")
      return
    }
    setGame(row)
  }

  const pickTeam = async (next: 0 | 1) => {
    if (!game) return
    setError(null)
    try {
      await joinLiveGame(game.id, next, name)
      setTeam(next)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not join that team.")
    }
  }

  const buzz = async () => {
    if (!game || team === null || !game.open_cell) return
    setBuzzing(true)
    setStatus("")
    const result = await buzzIn(game.id, game.open_cell.key, team)
    setBuzzing(false)
    if (result.ok) setStatus("You got it. Wait for the host.")
    else if (result.reason === "late") setStatus("Too late — other team locked it.")
    else if (result.reason === "phase" || result.reason === "closed") setStatus("Buzz is closed.")
    else if (result.reason === "steal") setStatus("Steal is for the other team.")
    else setStatus(result.reason ?? "Buzz did not lock.")
    const row = await fetchGame(game.id)
    if (row) setGame(row)
  }

  const canBuzz =
    Boolean(game?.open_cell) &&
    !game?.show_answer &&
    team !== null &&
    (game?.phase === "clue" || (game?.phase === "steal" && team !== asTeam(game.first_buzz)))

  const names = game?.team_names ?? ["Red", "Blue"]
  const active = asTeam(game?.active_team)

  return (
    <div className="grid gap-4">
      <Panel className="relative overflow-hidden">
        <div className="tape-stripe absolute inset-x-0 top-0 h-1.5" />
        <p className="mt-1 font-display text-xs uppercase tracking-[0.22em] text-tape">Phone buzzer</p>
        <h1 className="font-display text-4xl font-extrabold uppercase text-ink">Play</h1>
        <p className="mt-2 text-sm text-mute">
          Sign in, enter the host’s code, pick Red or Blue, and mash BUZZ when a clue is up. The host computer reads the clue.
        </p>
      </Panel>

      {!game && (
        <Panel>
          <label className="text-xs uppercase tracking-widest text-mute">Live game code</label>
          <form
            className="mt-2 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              void enter()
            }}
          >
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="ABC12"
              maxLength={6}
              className="w-full rounded-xl border border-line bg-raised px-3 py-3 font-display text-2xl font-bold uppercase tracking-[0.3em] outline-none"
            />
            <button type="submit" className="rounded-xl bg-tape px-4 py-3 font-display font-bold uppercase text-paper">
              Join
            </button>
          </form>
          {error && <p className="mt-2 text-sm text-stop">{error}</p>}
          {!user && (
            <button type="button" onClick={() => openAccount("signup")} className="mt-3 text-sm text-tape">
              Create a free account first
            </button>
          )}
        </Panel>
      )}

      {game && team === null && (
        <Panel>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-tape">Game {game.code}</p>
          <h2 className="font-display text-2xl font-bold uppercase">Pick a side</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button type="button" onClick={() => void pickTeam(0)} className="rounded-xl bg-medic px-4 py-8 font-display text-3xl font-extrabold uppercase text-paper">
              {names[0] || "Red"}
            </button>
            <button type="button" onClick={() => void pickTeam(1)} className="rounded-xl bg-tape px-4 py-8 font-display text-3xl font-extrabold uppercase text-paper">
              {names[1] || "Blue"}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-stop">{error}</p>}
        </Panel>
      )}

      {game && team !== null && (
        <Panel className={team === 0 ? "border-medic/50" : "border-tape/50"}>
          <p className={`font-display text-xs uppercase tracking-[0.2em] ${team === 0 ? "text-medic" : "text-tape"}`}>
            {names[team]} · {game.code}
          </p>
          <p className="mt-1 font-display text-4xl font-extrabold uppercase">{game.scores?.[team] ?? 0}</p>
          <p className="text-sm text-mute">Opponent {game.scores?.[team === 0 ? 1 : 0] ?? 0}</p>

          <div className="mt-6 rounded-xl bg-raised px-4 py-3 text-center">
            {!game.open_cell || game.show_answer ? (
              <p className="font-display text-xl font-bold uppercase text-mute">Wait for a clue</p>
            ) : game.phase === "answering" ? (
              <p className={`font-display text-xl font-bold uppercase ${active === 0 ? "text-medic" : "text-tape"}`}>
                {game.buzzer_name || names[active ?? 0]} is answering
              </p>
            ) : game.phase === "steal" ? (
              <p className="font-display text-xl font-bold uppercase text-ink">Steal is open</p>
            ) : (
              <p className="font-display text-xl font-bold uppercase text-ink">Clue is up — buzz</p>
            )}
          </div>

          <button
            type="button"
            disabled={!canBuzz || buzzing}
            onClick={() => void buzz()}
            className={`mt-4 flex min-h-44 w-full touch-manipulation items-center justify-center rounded-3xl font-display text-6xl font-extrabold uppercase text-paper disabled:opacity-40 ${
              team === 0 ? "bg-medic" : "bg-tape"
            }`}
          >
            <span className="inline-flex items-center gap-3">
              <Bell className="size-10" /> Buzz
            </span>
          </button>
          {status && <p className="mt-3 text-center text-sm text-mute">{status}</p>}
        </Panel>
      )}
    </div>
  )
}
