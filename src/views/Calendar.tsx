import { CALENDAR } from "../data/syllabus"
import { daysUntil, formatLong, parseISO, startOfDay } from "../lib/schedule"
import { Panel, Pill } from "../components/ui"

const tone = {
  class: "tape" as const,
  written: "stop" as const,
  skills: "warn" as const,
  lab: "warn" as const,
  off: "default" as const,
  final: "stop" as const,
}

export function CalendarView() {
  const today = startOfDay(new Date()).getTime()
  return (
    <div className="grid gap-4">
      <Panel>
        <h1 className="font-display text-3xl font-extrabold uppercase">Fall 2026 board</h1>
        <p className="mt-2 text-sm text-mute">
          Every date that can fail you is on this wall. Written Thursdays (Block IV is a Monday). Skills Saturdays (Block IV testing is Monday night). Finals week is not a suggestion.
        </p>
      </Panel>
      {CALENDAR.map((e) => {
        const past = parseISO(e.date).getTime() < today
        const d = daysUntil(e.date)
        return (
          <Panel key={e.id} className={past ? "opacity-50" : ""}>
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone={tone[e.kind]}>{e.kind}</Pill>
              <span className="font-display text-sm uppercase tracking-widest text-mute">{formatLong(e.date)}</span>
              {e.start && <span className="text-xs text-mute">{e.start}{e.end ? `–${e.end}` : ""}</span>}
              {!past && <Pill>{d === 0 ? "today" : d === 1 ? "tomorrow" : `${d}d`}</Pill>}
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase">{e.title}</h2>
            <p className="mt-1 text-sm text-mute">{e.detail}</p>
          </Panel>
        )
      })}
    </div>
  )
}
