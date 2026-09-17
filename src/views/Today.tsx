import { ArrowRight, ClipboardList, Clock, ShieldAlert, Swords, Trophy } from "lucide-react"
import { BLOCKS, CHAPTERS } from "../data/syllabus"
import { questionsForBlock } from "../data/questions"
import { SKILLS } from "../data/skills"
import { classesForBlock } from "../data/brand"
import { computeBench } from "../lib/bench"
import { blockMeta, daysUntil, formatLong, nextSkills, nextWritten, pickMission } from "../lib/schedule"
import { masteryByChapter } from "../lib/storage"
import { useAppStore } from "../lib/store"
import { useAuth } from "../lib/auth"
import { Panel, Pill, barColor, pctColor } from "../components/ui"
import type { View } from "../nav"

export function TodayView({ go }: { go: (v: View, extra?: string) => void }) {
  const { store } = useAppStore()
  const { user, openAccount } = useAuth()
  const block = blockMeta()
  const written = nextWritten()
  const skills = nextSkills()
  const bench = computeBench(store.scores)
  const mastery = masteryByChapter(store)
  const weak = block.examChapters
    .map((n) => ({ n, m: mastery.find((x) => x.chapter === n) }))
    .sort((a, b) => (a.m?.pct ?? 0) - (b.m?.pct ?? 0) || (a.m?.seen ?? 0) - (b.m?.seen ?? 0))
  const unseen = block.examChapters.filter((n) => !mastery.some((m) => m.chapter === n && m.seen > 0))
  const pool = questionsForBlock(block.id)
  const mission = pickMission(pool, store.items, 15)
  const dExam = written ? daysUntil(written.date) : null
  const skillCards = SKILLS.filter((s) => block.skillIds.includes(s.id))
  const classNight = classesForBlock(block.id)[0]

  return (
    <div className="grid gap-4">
      <Panel className="relative overflow-hidden">
        <div className="tape-stripe absolute inset-x-0 top-0 h-1.5" />
        <p className="mt-1 font-display text-sm font-semibold uppercase tracking-[0.25em] text-tape">
          {block.label} · {block.weeks}
        </p>
        <h1 className="mt-1 font-display text-4xl font-extrabold uppercase leading-none text-ink sm:text-5xl">
          Qualify together.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mute">
          Pass Ready is the SPFR desk for the KCEMS EMT Fall 2026 syllabus. Average <span className="text-ink font-medium">80% across 4 block exams and 5 quizzes</span> or you do not sit the December 10 final.
          Then 70% on that 150-question test or you do not sit Saturday practicals. The crew either all crosses that line or we failed the assignment.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Pill tone="tape">{block.range}</Pill>
          <Pill>{CHAPTERS.filter((c) => block.examChapters.includes(c.n)).length} exam chapters</Pill>
          <Pill>{skillCards.length} tested skill sheets</Pill>
        </div>
        {!user && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => openAccount("signup")} className="rounded-full bg-tape px-4 py-2 text-sm font-bold uppercase text-paper">
              Create free account
            </button>
            <p className="text-xs text-mute">Keeps drill and scores on every phone. Guests still work on this device.</p>
          </div>
        )}
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2">
        <button type="button" onClick={() => go("drill")} className="text-left">
          <Panel className="h-full transition hover:border-tape/50">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-mute">Next written</p>
                <h2 className="mt-1 font-display text-3xl font-bold uppercase text-ink">
                  {dExam === 0 ? "Tonight" : dExam === 1 ? "Tomorrow" : dExam !== null ? `${dExam} days` : "Done"}
                </h2>
                {written && (
                  <p className="mt-1 text-sm text-mute">
                    {written.title} · {formatLong(written.date)}
                    {written.start ? ` · ${written.start}` : ""}
                  </p>
                )}
              </div>
              <Clock className="size-5 text-tape" />
            </div>
            {dExam !== null && dExam <= 10 && (
              <p className="mt-4 text-sm text-ink">
                {mission.length} high-yield items queued from {block.label}. Weak or unseen chapters go first.
              </p>
            )}
            <p className="mt-4 inline-flex items-center gap-1 text-sm text-tape">
              Start tonight's 15 <ArrowRight className="size-4" />
            </p>
          </Panel>
        </button>

        <button type="button" onClick={() => go("skills")} className="text-left">
          <Panel className="h-full transition hover:border-tape/50">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-mute">Next skills</p>
                <h2 className="mt-1 font-display text-3xl font-bold uppercase text-ink">
                  {skills ? formatLong(skills.date) : "Finals"}
                </h2>
                {skills && <p className="mt-1 text-sm text-mute">{skills.title}</p>}
              </div>
              <Swords className="size-5 text-tape" />
            </div>
            <ul className="mt-4 space-y-1 text-sm text-mute">
              {skillCards.map((s) => (
                <li key={s.id}>
                  <span className="text-tape">{s.sheet}</span> {s.name}
                </li>
              ))}
            </ul>
            <p className="mt-4 inline-flex items-center gap-1 text-sm text-tape">
              Run a station <ArrowRight className="size-4" />
            </p>
          </Panel>
        </button>
      </div>

      <button type="button" onClick={() => go("jeopardy")} className="text-left">
        <Panel className="hover:border-tape/50">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-mute">Class night</p>
              <h2 className="mt-1 font-display text-3xl font-bold uppercase text-ink">Jeopardy · {block.label}</h2>
              <p className="mt-1 text-sm text-mute">
                {classNight ? `Start with “${classNight.title}” or pick any lecture from the board.` : "Open the class boards."} Host reads on the computer. Phones buzz from Play.
              </p>
            </div>
            <Trophy className="size-5 shrink-0 text-tape" />
          </div>
          <p className="mt-4 inline-flex items-center gap-1 text-sm text-tape">
            Open the boards <ArrowRight className="size-4" />
          </p>
        </Panel>
      </button>

      <button type="button" onClick={() => go("tests", `b${block.id}`)} className="text-left">
        <Panel className="hover:border-tape/50">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-mute">Unit test</p>
              <h2 className="mt-1 font-display text-3xl font-bold uppercase text-ink">{block.label} practice written</h2>
              <p className="mt-1 text-sm text-mute">
                Timed, no answers until you submit. 80% line. Quiz for this block is on the same page.
              </p>
            </div>
            <ClipboardList className="size-5 shrink-0 text-tape" />
          </div>
          <p className="mt-4 inline-flex items-center gap-1 text-sm text-tape">
            Sit the practice test <ArrowRight className="size-4" />
          </p>
        </Panel>
      </button>

      <Panel>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-mute">The 80-line</p>
            <p className={`font-display text-4xl font-extrabold ${pctColor(bench.average)}`}>
              {bench.average === null ? "—" : `${bench.average.toFixed(1)}%`}
            </p>
          </div>
          <button type="button" onClick={() => go("bench")} className="text-sm text-tape">
            Log scores →
          </button>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-raised">
          <div
            className={`h-full ${barColor(bench.average ?? 0)}`}
            style={{ width: `${Math.min(100, bench.average ?? 0)}%` }}
          />
        </div>
        <div className="relative mt-1 h-0">
          <div className="absolute top-0 h-3 w-px bg-tape" style={{ left: "80%" }} />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-mute">{bench.message}</p>
      </Panel>

      <Panel>
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-display text-xl font-bold uppercase">Chapter heat · {block.label}</h2>
          <Pill tone={unseen.length ? "warn" : "go"}>{unseen.length ? `${unseen.length} untouched` : "all opened"}</Pill>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {block.examChapters.map((n) => {
            const ch = CHAPTERS.find((c) => c.n === n)!
            const m = mastery.find((x) => x.chapter === n)
            return (
              <button
                key={n}
                type="button"
                onClick={() => go("drill", `c${n}`)}
                className="flex items-center justify-between rounded-xl border border-line bg-raised px-3 py-2 text-left hover:border-tape/40"
              >
                <span className="text-sm">
                  <span className="text-mute">Ch. {n}</span> {ch.title}
                </span>
                <span className={`font-display text-lg font-bold ${pctColor(m?.pct ?? null)}`}>
                  {m?.pct == null ? "NEW" : `${m.pct}%`}
                </span>
              </button>
            )
          })}
        </div>
        {weak[0] && (
          <p className="mt-3 flex items-start gap-2 text-sm text-warn">
            <ShieldAlert className="mt-0.5 size-4 shrink-0" />
            Start with Ch. {weak[0].n} — {CHAPTERS.find((c) => c.n === weak[0].n)?.title}. Crews fail Block I on shock, airway numbers, and assessment order — not on trivia.
          </p>
        )}
      </Panel>

      <div className="grid gap-4 sm:grid-cols-3">
        {BLOCKS.map((b) => (
          <button key={b.id} type="button" onClick={() => go("calendar")} className="text-left">
            <Panel className={b.id === block.id ? "border-tape/60" : ""}>
              <p className="font-display text-xs uppercase tracking-widest text-mute">{b.weeks}</p>
              <p className="font-display text-2xl font-bold uppercase">{b.label}</p>
              <p className="mt-1 text-xs text-mute">{b.examChapters.length} ch · {b.skillIds.length} sheets</p>
            </Panel>
          </button>
        ))}
      </div>
    </div>
  )
}
