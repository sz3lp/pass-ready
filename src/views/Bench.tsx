import { ASSESSMENTS, BENCH_THRESHOLD, FINAL_THRESHOLD, type AssessmentId } from "../data/syllabus"
import { computeBench } from "../lib/bench"
import { useAppStore } from "../lib/store"
import { Panel, Pill, barColor, pctColor } from "../components/ui"

export function BenchView() {
  const { store, setStore } = useAppStore()
  const bench = computeBench(store.scores)

  const setScore = (id: AssessmentId, raw: string) => {
    const next = { ...store.scores }
    if (raw.trim() === "") delete next[id]
    else {
      const n = Math.max(0, Math.min(100, Number(raw)))
      if (Number.isNaN(n)) return
      next[id] = n
    }
    setStore({ ...store, scores: next })
  }

  return (
    <div className="grid gap-4">
      <Panel className="relative overflow-hidden">
        <div className="tape-stripe absolute inset-x-0 top-0 h-1.5" />
        <p className="mt-1 font-display text-xs uppercase tracking-[0.2em] text-tape">Progression gate</p>
        <h1 className="font-display text-4xl font-extrabold uppercase">The 80-line</h1>
        <p className="mt-2 max-w-2xl text-sm text-mute">
          Faculty math: a cumulative average of {BENCH_THRESHOLD}% or greater across the 4 block written exams and 5 quizzes. Miss that line and you do not sit the Dec 10 final. Separate gate: {FINAL_THRESHOLD}% on the 150-question final or you do not sit Dec 12 practicals. Course grade weights (15% × 4 blocks, 10% quizzes, 30% final) are not the same thing as the bench.
        </p>
        <p className={`mt-4 font-display text-6xl font-extrabold ${pctColor(bench.average)}`}>
          {bench.average === null ? "—" : `${bench.average.toFixed(1)}%`}
        </p>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-raised">
          <div className={`h-full ${barColor(bench.average ?? 0)}`} style={{ width: `${Math.min(100, bench.average ?? 0)}%` }} />
        </div>
        <div className="relative h-4">
          <span className="absolute -translate-x-1/2 font-display text-xs text-tape" style={{ left: "80%" }}>
            80
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink">{bench.message}</p>
        {bench.needEach !== null && bench.remaining > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            <Pill tone={bench.needEach <= 80 ? "go" : bench.needEach <= 92 ? "warn" : "stop"}>
              need ~{Math.ceil(bench.needEach)}% on each remaining
            </Pill>
            <Pill>{bench.remaining} scores left</Pill>
          </div>
        )}
      </Panel>
      <Panel>
        <h2 className="font-display text-xl font-bold uppercase">Log what you actually scored</h2>
        <p className="mt-1 text-sm text-mute">Percent for each assessment. Quizzes are 10 questions — a 8/10 is 80.</p>
        <div className="mt-4 grid gap-3">
          {ASSESSMENTS.map((a) => (
            <label key={a.id} className="grid grid-cols-[1fr_88px] items-center gap-3 rounded-xl border border-line bg-raised px-3 py-3">
              <span>
                <span className="block text-sm text-ink">{a.label}</span>
                <span className="text-xs text-mute">
                  {a.when} · {a.weightNote}
                </span>
              </span>
              <input
                inputMode="decimal"
                placeholder="%"
                value={store.scores[a.id] ?? ""}
                onChange={(e) => setScore(a.id, e.target.value)}
                className="w-full rounded-lg border border-line bg-raised px-2 py-2 text-center font-display text-xl text-tape outline-none"
              />
            </label>
          ))}
        </div>
      </Panel>
    </div>
  )
}
