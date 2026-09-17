import { BENCH_THRESHOLD } from "../data/syllabus"

export function pctColor(pct: number | null) {
  if (pct === null) return "text-mute"
  if (pct < 70) return "text-stop"
  if (pct < BENCH_THRESHOLD) return "text-warn"
  return "text-go"
}

export function barColor(pct: number | null) {
  if (pct === null) return "bg-line"
  if (pct < 70) return "bg-stop"
  if (pct < BENCH_THRESHOLD) return "bg-warn"
  return "bg-go"
}

export function Pill({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "go" | "stop" | "warn" | "tape" }) {
  const map = {
    default: "bg-raised text-mute border-line",
    go: "bg-go/15 text-go border-go/30",
    stop: "bg-stop/15 text-stop border-stop/30",
    warn: "bg-warn/15 text-warn border-warn/30",
    tape: "bg-tape/10 text-tape border-tape/25",
  }
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ${map[tone]}`}>
      {children}
    </span>
  )
}

export function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-line bg-panel p-4 shadow-sm sm:p-5 ${className}`}>{children}</section>
}
