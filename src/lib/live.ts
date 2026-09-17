import { QUESTIONS } from "../data/questions"
import type { CategoryCol } from "./jeopardy"
import { supabase } from "./supabase"

export type GamePhase = "board" | "clue" | "answering" | "steal"

export type OpenCell = { ci: number; ri: number; key: string }

export type BoardSnap = { name: string; cells: { qid: string; value: number; taken: boolean }[] }[]

export type GameRow = {
  id: string
  code: string
  host_id: string
  class_id: string
  team_names: string[]
  scores: number[]
  board: BoardSnap
  open_cell: OpenCell | null
  phase: GamePhase
  active_team: number | null
  first_buzz: number | null
  hint: number
  show_answer: boolean
  deal: number
  buzzer_name: string | null
  buzzer_id: string | null
  updated_at: string
}

export type PlayerRow = {
  game_id: string
  user_id: string
  team: number
  display_name: string
  last_seen: string
}

export function cellKey(ci: number, ri: number) {
  return `${ci}-${ri}`
}

export function snapshotBoard(cols: CategoryCol[]): BoardSnap {
  return cols.map((c) => ({
    name: c.name,
    cells: c.cells.map((cell) => ({ qid: cell.q.id, value: cell.value, taken: cell.taken })),
  }))
}

export function hydrateBoard(snap: BoardSnap): CategoryCol[] {
  return (snap ?? []).map((c) => ({
    name: c.name,
    cells: (c.cells ?? []).flatMap((cell) => {
      const q = QUESTIONS.find((x) => x.id === cell.qid)
      return q ? [{ q, value: cell.value, taken: cell.taken }] : []
    }),
  }))
}

export function makeGameCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let out = ""
  for (let i = 0; i < 5; i++) out += chars[Math.floor(Math.random() * chars.length)]
  return out
}

export async function createLiveGame(input: {
  classId: string
  board: BoardSnap
  names: string[]
  scores: number[]
  deal: number
}) {
  if (!supabase) throw new Error("Cloud is not configured.")
  const { data: session } = await supabase.auth.getUser()
  const hostId = session.user?.id
  if (!hostId) throw new Error("Sign in to host a live game.")
  for (let i = 0; i < 8; i++) {
    const code = makeGameCode()
    const { data, error } = await supabase
      .from("jeopardy_games")
      .insert({
        code,
        host_id: hostId,
        class_id: input.classId,
        team_names: input.names,
        scores: input.scores,
        board: input.board,
        open_cell: null,
        phase: "board",
        deal: input.deal,
      })
      .select()
      .single()
    if (!error && data) return data as GameRow
    if (error && !/duplicate|unique/i.test(error.message)) throw new Error(error.message)
  }
  throw new Error("Could not mint a join code.")
}

export async function patchGame(id: string, patch: Record<string, unknown>) {
  if (!supabase) return null
  const { data, error } = await supabase.from("jeopardy_games").update(patch).eq("id", id).select().maybeSingle()
  if (error) {
    console.warn("patch game", error.message)
    return null
  }
  return data as GameRow | null
}

export async function fetchGameByCode(code: string) {
  if (!supabase) return null
  const { data, error } = await supabase.from("jeopardy_games").select("*").eq("code", code.trim().toUpperCase()).maybeSingle()
  if (error) {
    console.warn("game by code", error.message)
    return null
  }
  return data as GameRow | null
}

export async function fetchGame(id: string) {
  if (!supabase) return null
  const { data } = await supabase.from("jeopardy_games").select("*").eq("id", id).maybeSingle()
  return (data as GameRow | null) ?? null
}

export async function joinLiveGame(gameId: string, team: 0 | 1, displayName: string) {
  if (!supabase) throw new Error("Cloud is not configured.")
  const { data: session } = await supabase.auth.getUser()
  const userId = session.user?.id
  if (!userId) throw new Error("Sign in first.")
  const { error } = await supabase.from("jeopardy_players").upsert({
    game_id: gameId,
    user_id: userId,
    team,
    display_name: displayName,
    last_seen: new Date().toISOString(),
  })
  if (error) throw new Error(error.message)
}

export async function touchPlayer(gameId: string) {
  if (!supabase) return
  const { data: session } = await supabase.auth.getUser()
  const userId = session.user?.id
  if (!userId) return
  await supabase.from("jeopardy_players").update({ last_seen: new Date().toISOString() }).eq("game_id", gameId).eq("user_id", userId)
}

export async function fetchPlayers(gameId: string) {
  if (!supabase) return []
  const { data } = await supabase.from("jeopardy_players").select("game_id, user_id, team, display_name, last_seen").eq("game_id", gameId)
  return (data as PlayerRow[] | null) ?? []
}

export async function buzzIn(gameId: string, key: string, team: 0 | 1) {
  if (!supabase) return { ok: false, reason: "cloud" }
  const { data, error } = await supabase.rpc("buzz_in", { game_id: gameId, cell_key: key, team })
  if (error) return { ok: false, reason: error.message }
  const result = data as { ok?: boolean; reason?: string; won?: boolean } | null
  return { ok: Boolean(result?.ok), reason: result?.reason, won: Boolean(result?.won) }
}

export function asTeam(n: number | null | undefined): 0 | 1 | null {
  return n === 0 || n === 1 ? n : null
}

export function subscribeGame(id: string, onGame: (row: GameRow) => void, onPlayers?: () => void) {
  if (!supabase) return () => {}
  const client = supabase
  const ch = client
    .channel(`game:${id}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "jeopardy_games", filter: `id=eq.${id}` },
      (payload) => {
        if (payload.new && typeof payload.new === "object") onGame(payload.new as GameRow)
      },
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "jeopardy_players", filter: `game_id=eq.${id}` },
      () => {
        onPlayers?.()
      },
    )
    .subscribe()
  return () => {
    void client.removeChannel(ch)
  }
}
