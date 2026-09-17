import type { AssessmentId } from "../data/syllabus"
import { supabase } from "./supabase"
import type { CrewFlag, ItemStats, SkillRun, Store, TestRun } from "./storage"

/**
 * Merge localStorage with the signed-in cloud copy.
 * - Drill items: max(seen), max(correct), max(streak), latest last_at
 * - Assessment scores: higher percent wins
 * - Skill runs / test runs / crew flags: union by identity, keep caps
 * - Name: prefer a non-empty profile name, else local
 * localStorage stays the offline cache; pushes are debounced upserts.
 */
export function mergeStores(local: Store, remote: Store, profileName?: string): Store {
  const items: Record<string, ItemStats> = { ...remote.items }
  for (const [id, a] of Object.entries(local.items)) {
    const b = items[id]
    if (!b) {
      items[id] = a
      continue
    }
    items[id] = {
      seen: Math.max(a.seen, b.seen),
      correct: Math.max(a.correct, b.correct),
      streak: Math.max(a.streak, b.streak),
      last: Math.max(a.last ?? 0, b.last ?? 0) || undefined,
    }
  }

  const scores: Store["scores"] = { ...remote.scores }
  for (const [id, pct] of Object.entries(local.scores) as [AssessmentId, number | undefined][]) {
    if (pct == null) continue
    const cur = scores[id]
    scores[id] = cur == null ? pct : Math.max(cur, pct)
  }

  const skillRuns: Record<string, SkillRun[]> = {}
  const skillIds = new Set([...Object.keys(local.skillRuns), ...Object.keys(remote.skillRuns)])
  for (const id of skillIds) {
    const map = new Map<number, SkillRun>()
    for (const run of [...(remote.skillRuns[id] ?? []), ...(local.skillRuns[id] ?? [])]) {
      map.set(run.at, run)
    }
    skillRuns[id] = [...map.values()].sort((a, b) => a.at - b.at).slice(-20)
  }

  const tests = new Map<string, TestRun>()
  for (const run of [...(remote.testRuns ?? []), ...(local.testRuns ?? [])]) {
    tests.set(`${run.testId}:${run.at}`, run)
  }
  const testRuns = [...tests.values()].sort((a, b) => a.at - b.at).slice(-40)

  const flags = new Map<string, CrewFlag>()
  for (const f of [...(remote.crew ?? []), ...(local.crew ?? [])]) {
    flags.set(`${f.chapter}:${f.note}:${f.at}`, f)
  }
  const crew = [...flags.values()].sort((a, b) => a.at - b.at).slice(-40)

  const seen = new Set([...(remote.jeopardySeen ?? []), ...(local.jeopardySeen ?? [])])
  const name = (profileName?.trim() || local.name || remote.name).trim()

  return { name, scores, items, skillRuns, crew, jeopardySeen: [...seen], testRuns }
}

export async function pullProgress(userId: string, displayName: string): Promise<Store> {
  const empty: Store = {
    name: displayName,
    scores: {},
    items: {},
    skillRuns: {},
    crew: [],
    jeopardySeen: [],
    testRuns: [],
  }
  if (!supabase) return empty

  const [itemsRes, scoresRes, skillsRes, testsRes, flagsRes] = await Promise.all([
    supabase.from("drill_items").select("question_id, seen, correct, streak, last_at").eq("user_id", userId),
    supabase.from("assessment_scores").select("assessment_id, pct").eq("user_id", userId),
    supabase.from("skill_runs").select("skill_id, at, passed, missed_critical, elapsed_sec").eq("user_id", userId),
    supabase.from("test_runs").select("test_id, at, hits, total, pct, elapsed_sec, timed_out, missed_ids").eq("user_id", userId),
    supabase.from("crew_flags").select("chapter, note, at").eq("user_id", userId),
  ])

  const items: Record<string, ItemStats> = {}
  for (const row of itemsRes.data ?? []) {
    items[row.question_id as string] = {
      seen: row.seen as number,
      correct: row.correct as number,
      streak: row.streak as number,
      last: row.last_at ? new Date(row.last_at as string).getTime() : undefined,
    }
  }

  const scores: Store["scores"] = {}
  for (const row of scoresRes.data ?? []) {
    scores[row.assessment_id as AssessmentId] = row.pct as number
  }

  const skillRuns: Record<string, SkillRun[]> = {}
  for (const row of skillsRes.data ?? []) {
    const id = row.skill_id as string
    const list = skillRuns[id] ?? []
    list.push({
      at: new Date(row.at as string).getTime(),
      passed: row.passed as boolean,
      missedCritical: row.missed_critical as number,
      elapsedSec: row.elapsed_sec as number,
    })
    skillRuns[id] = list
  }

  const testRuns: TestRun[] = (testsRes.data ?? []).map((row) => ({
    testId: row.test_id as string,
    at: new Date(row.at as string).getTime(),
    hits: row.hits as number,
    total: row.total as number,
    pct: row.pct as number,
    elapsedSec: row.elapsed_sec as number,
    timedOut: row.timed_out as boolean,
    missedIds: Array.isArray(row.missed_ids) ? (row.missed_ids as string[]) : [],
  }))

  const crew: CrewFlag[] = (flagsRes.data ?? []).map((row) => ({
    chapter: row.chapter as number,
    note: row.note as string,
    name: displayName || "me",
    at: new Date(row.at as string).getTime(),
  }))

  return { ...empty, items, scores, skillRuns, testRuns, crew }
}

export async function pushProgress(userId: string, store: Store) {
  if (!supabase) return

  const itemRows = Object.entries(store.items).map(([question_id, s]) => ({
    user_id: userId,
    question_id,
    seen: s.seen,
    correct: s.correct,
    streak: s.streak,
    last_at: s.last ? new Date(s.last).toISOString() : null,
  }))
  for (const batch of chunks(itemRows, 200)) {
    const { error } = await supabase.from("drill_items").upsert(batch)
    if (error) console.warn("sync drill_items", error.message)
  }

  const scoreRows = Object.entries(store.scores)
    .filter(([, pct]) => pct != null)
    .map(([assessment_id, pct]) => ({ user_id: userId, assessment_id, pct: pct as number }))
  if (scoreRows.length) {
    const { error } = await supabase.from("assessment_scores").upsert(scoreRows)
    if (error) console.warn("sync scores", error.message)
  }

  const { data: existingSkills } = await supabase.from("skill_runs").select("skill_id, at").eq("user_id", userId)
  const haveSkill = new Set((existingSkills ?? []).map((r) => `${r.skill_id}|${new Date(r.at as string).getTime()}`))
  const newSkills = Object.entries(store.skillRuns).flatMap(([skill_id, runs]) =>
    runs
      .filter((run) => !haveSkill.has(`${skill_id}|${run.at}`))
      .map((run) => ({
        user_id: userId,
        skill_id,
        at: new Date(run.at).toISOString(),
        passed: run.passed,
        missed_critical: run.missedCritical,
        elapsed_sec: run.elapsedSec,
      })),
  )
  if (newSkills.length) {
    const { error } = await supabase.from("skill_runs").insert(newSkills)
    if (error) console.warn("sync skill_runs", error.message)
  }

  const { data: existingTests } = await supabase.from("test_runs").select("test_id, at").eq("user_id", userId)
  const haveTest = new Set((existingTests ?? []).map((r) => `${r.test_id}|${new Date(r.at as string).getTime()}`))
  const newTests = (store.testRuns ?? [])
    .filter((run) => !haveTest.has(`${run.testId}|${run.at}`))
    .map((run) => ({
      user_id: userId,
      test_id: run.testId,
      at: new Date(run.at).toISOString(),
      hits: run.hits,
      total: run.total,
      pct: run.pct,
      elapsed_sec: run.elapsedSec,
      timed_out: run.timedOut,
      missed_ids: run.missedIds,
    }))
  if (newTests.length) {
    const { error } = await supabase.from("test_runs").insert(newTests)
    if (error) console.warn("sync test_runs", error.message)
  }

  const { data: existingFlags } = await supabase.from("crew_flags").select("chapter, note, at").eq("user_id", userId)
  const haveFlag = new Set(
    (existingFlags ?? []).map((r) => `${r.chapter}:${r.note}:${new Date(r.at as string).getTime()}`),
  )
  const newFlags = store.crew
    .filter((f) => !haveFlag.has(`${f.chapter}:${f.note}:${f.at}`))
    .map((f) => ({
      user_id: userId,
      chapter: f.chapter,
      note: f.note,
      at: new Date(f.at).toISOString(),
    }))
  if (newFlags.length) {
    const { error } = await supabase.from("crew_flags").insert(newFlags)
    if (error) console.warn("sync crew_flags", error.message)
  }
}

function chunks<T>(list: T[], size: number) {
  const out: T[][] = []
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size))
  return out
}
