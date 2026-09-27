import { supabase } from "./supabase"
import type { CrewFlag } from "./storage"

export type LiveMember = {
  id: string
  name: string
  flags: CrewFlag[]
}

export type CrewBoard = {
  members: LiveMember[]
  flags: CrewFlag[]
  heat: Map<number, number>
}

export async function pullCrewBoard(crewId: string, displayName: string): Promise<CrewBoard | null> {
  if (!supabase || !crewId) return null

  const { data: profiles, error: pErr } = await supabase
    .from("profiles")
    .select("id, display_name, crew_id")
    .eq("crew_id", crewId)

  if (pErr || !profiles?.length) {
    if (pErr) console.warn("crew profiles", pErr.message)
    return null
  }

  const ids = profiles.map((p) => p.id as string)
  const { data: flagRows, error: fErr } = await supabase
    .from("crew_flags")
    .select("chapter, note, at, user_id")
    .in("user_id", ids)

  if (fErr) {
    console.warn("crew flags", fErr.message)
    return null
  }

  const nameOf = new Map(profiles.map((p) => [p.id as string, (p.display_name as string) || "crew"]))
  const byUser = new Map<string, CrewFlag[]>()
  const flags: CrewFlag[] = []
  for (const row of flagRows ?? []) {
    const flag: CrewFlag = {
      chapter: row.chapter as number,
      note: row.note as string,
      name: nameOf.get(row.user_id as string) || displayName || "crew",
      at: new Date(row.at as string).getTime(),
    }
    flags.push(flag)
    const list = byUser.get(row.user_id as string) ?? []
    list.push(flag)
    byUser.set(row.user_id as string, list)
  }

  const members: LiveMember[] = profiles.map((p) => ({
    id: p.id as string,
    name: (p.display_name as string) || "crew",
    flags: byUser.get(p.id as string) ?? [],
  }))

  const heat = new Map<number, number>()
  for (const f of flags) heat.set(f.chapter, (heat.get(f.chapter) ?? 0) + 1)

  return { members, flags, heat }
}
