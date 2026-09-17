import { useEffect, useMemo, useState } from "react"
import { BLOCKS } from "../data/syllabus"
import { SKILLS, type Skill } from "../data/skills"
import { MIRAMAR_HUB, videosForSkill } from "../data/videos"
import { blockMeta } from "../lib/schedule"
import { recordSkill } from "../lib/storage"
import { useAppStore } from "../lib/store"
import { Panel, Pill } from "../components/ui"
import { VideoLinks } from "../components/VideoLinks"

export function SkillsView() {
  const { store, setStore } = useAppStore()
  const live = blockMeta()
  const [filter, setFilter] = useState<"now" | 1 | 2 | 3 | 4 | "final">("now")
  const [active, setActive] = useState<Skill | null>(null)
  const [buddy, setBuddy] = useState(true)
  const [checked, setChecked] = useState<Record<number, boolean>>({})
  const [started, setStarted] = useState<number | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const [result, setResult] = useState<"pass" | "fail" | null>(null)

  useEffect(() => {
    if (!started || result) return
    const t = window.setInterval(() => setElapsed(Math.floor((Date.now() - started) / 1000)), 250)
    return () => window.clearInterval(t)
  }, [started, result])

  const list = useMemo(() => {
    if (filter === "now") return SKILLS.filter((s) => s.block === live.id || (live.id === 4 && s.block === "final"))
    return SKILLS.filter((s) => s.block === filter)
  }, [filter, live.id])

  const begin = (skill: Skill) => {
    setActive(skill)
    setChecked({})
    setStarted(Date.now())
    setElapsed(0)
    setResult(null)
  }

  const finish = () => {
    if (!active) return
    const missedCritical = active.steps.filter(
      (s, idx) => s.critical && !s.evaluatorNote && !checked[idx],
    ).length
    const passed = missedCritical === 0
    setResult(passed ? "pass" : "fail")
    setStore(
      recordSkill(store, active.id, {
        at: Date.now(),
        passed,
        missedCritical,
        elapsedSec: elapsed,
      }),
    )
  }

  if (active) {
    const mm = String(Math.floor(elapsed / 60)).padStart(2, "0")
    const ss = String(elapsed % 60).padStart(2, "0")
    return (
      <div className="grid gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button type="button" className="text-sm text-mute" onClick={() => setActive(null)}>
            ← Stations
          </button>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-mute">
              <input type="checkbox" checked={buddy} onChange={(e) => setBuddy(e.target.checked)} />
              Buddy reads
            </label>
            <span className="font-display text-2xl font-bold text-tape">
              {mm}:{ss}
            </span>
          </div>
        </div>
        <Panel>
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="tape">{active.sheet}</Pill>
            <Pill>{active.minutes} min station</Pill>
            {active.totalPoints > 0 && (
              <Pill>
                Pass {active.passingScore}/{active.totalPoints}
              </Pill>
            )}
            {active.kcNote && <Pill tone="warn">KC protocol</Pill>}
          </div>
          <h1 className="mt-2 font-display text-3xl font-extrabold uppercase">{active.name}</h1>
          <p className="mt-1 text-xs text-mute">{active.source}</p>
          <p className="mt-2 text-sm text-mute">{active.setup}</p>
          {active.kcNote && <p className="mt-2 text-sm text-tape">{active.kcNote}</p>}
          {buddy && (
            <p className="mt-3 rounded-xl bg-raised px-3 py-2 text-sm text-mute">
              Partner: do not coach. Read the stem once. Mark a step only if they said or did it. Any unchecked red line is an automatic fail.
            </p>
          )}
        </Panel>
        {videosForSkill(active.id).length > 0 && (
          <Panel>
            <p className="font-display text-xs uppercase tracking-widest text-mute">Watch before you run it</p>
            <p className="mt-1 text-sm text-mute">
              Miramar demos are San Diego skill-sheet style. Paramedic Coach is cognitive overview. King County / WA sheets still win on test day.
            </p>
            <div className="mt-3">
              <VideoLinks links={videosForSkill(active.id)} />
            </div>
          </Panel>
        )}
        <ol className="grid gap-2">
          {active.steps.map((step, idx) => {
            if (step.evaluatorNote) {
              return (
                <li key={idx}>
                  <div className="rounded-xl border border-line/60 bg-raised px-3 py-2 text-sm leading-snug text-mute">
                    {step.text}
                  </div>
                </li>
              )
            }
            const scorableIdx = active.steps.slice(0, idx + 1).filter((s) => !s.evaluatorNote).length
            return (
              <li key={idx}>
                <button
                  type="button"
                  disabled={!!result}
                  onClick={() => setChecked((c) => ({ ...c, [idx]: !c[idx] }))}
                  className={`flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left ${
                    step.critical ? "border-stop/40" : "border-line"
                  } ${checked[idx] ? "bg-go/10" : "bg-panel"}`}
                >
                  <span
                    className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border ${
                      checked[idx] ? "border-go bg-go text-paper" : "border-mute/40"
                    }`}
                  >
                    {checked[idx] ? "✓" : scorableIdx}
                  </span>
                  <span>
                    {step.critical && (
                      <span className="mr-2 font-display text-xs font-bold uppercase text-stop">Critical</span>
                    )}
                    <span className="text-sm leading-snug">{step.text}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
        <Panel>
          <p className="font-display text-xs uppercase tracking-widest text-stop">Auto-fail if</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-mute">
            {active.failFast.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          {!result ? (
            <button type="button" onClick={finish} className="mt-4 rounded-xl bg-tape px-4 py-2 font-display text-lg font-bold uppercase text-paper">
              End station
            </button>
          ) : (
            <div className="mt-4">
              <p className={`font-display text-4xl font-extrabold uppercase ${result === "pass" ? "text-go" : "text-stop"}`}>
                {result === "pass" ? "Pass" : "Fail"}
              </p>
              <p className="mt-1 text-sm text-mute">
                {result === "pass"
                  ? "No criticals missed. Run it once more silent, then swap roles."
                  : "A critical was blank. Same station immediately — do not hop to a different sheet."}
              </p>
              <button type="button" onClick={() => begin(active)} className="mt-3 rounded-xl border border-line px-4 py-2 text-sm">
                Reset and go again
              </button>
            </div>
          )}
        </Panel>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      <Panel>
        <h1 className="font-display text-3xl font-extrabold uppercase">Skill sheets</h1>
        <p className="mt-2 text-sm text-mute">
          Station checklists are WA DOH 530-226 (January 2022) skill sheets verbatim. King County protocol notes (i-gel, Check & Inject, etc.) appear separately and are not part of the scored lines. Critical lines in red auto-fail if left unchecked. Official PDF:{" "}
          <a
            className="text-tape underline"
            href="https://doh.wa.gov/sites/default/files/2022-02/530226.pdf"
            target="_blank"
            rel="noreferrer"
          >
            doh.wa.gov … 530226.pdf
          </a>
          .
        </p>
        <div className="mt-3">
          <VideoLinks
            links={[MIRAMAR_HUB]}
            note="Recommended channels for demos and topic overviews: @Sandiegomiramaremtprogram6893 and @TheParamedicCoach. Open a sheet for the matching links."
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => setFilter("now")} className={`rounded-full border px-3 py-1 text-xs ${filter === "now" ? "border-tape text-tape" : "border-line text-mute"}`}>
            This block
          </button>
          {BLOCKS.map((b) => (
            <button key={b.id} type="button" onClick={() => setFilter(b.id)} className={`rounded-full border px-3 py-1 text-xs ${filter === b.id ? "border-tape text-tape" : "border-line text-mute"}`}>
              {b.label}
            </button>
          ))}
          <button type="button" onClick={() => setFilter("final")} className={`rounded-full border px-3 py-1 text-xs ${filter === "final" ? "border-tape text-tape" : "border-line text-mute"}`}>
            94 / 96
          </button>
        </div>
      </Panel>
      {list.map((s) => {
        const runs = store.skillRuns[s.id] ?? []
        const last = runs[runs.length - 1]
        return (
          <button key={s.id} type="button" onClick={() => begin(s)} className="text-left">
            <Panel className="hover:border-tape/40">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-xs uppercase tracking-widest text-tape">
                    {s.sheet} · {typeof s.block === "number" ? `Block ${s.block}` : "Final"}
                  </p>
                  <h2 className="font-display text-2xl font-bold uppercase">{s.name}</h2>
                  <p className="mt-1 text-sm text-mute">
                    {s.steps.filter((x) => x.critical && !x.evaluatorNote).length} criticals · {s.minutes} min
                    {s.totalPoints > 0 ? ` · pass ${s.passingScore}/${s.totalPoints}` : ""}
                    {videosForSkill(s.id).length ? ` · ${videosForSkill(s.id).length} videos` : ""}
                  </p>
                </div>
                {last && <Pill tone={last.passed ? "go" : "stop"}>{last.passed ? "last: pass" : "last: fail"}</Pill>}
              </div>
            </Panel>
          </button>
        )
      })}
    </div>
  )
}
