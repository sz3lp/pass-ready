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
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide ${map[tone]}`}>
      {children}
    </span>
  )
}

export function Panel({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}) {
  return (
    <section onClick={onClick} className={`rounded-2xl border border-line bg-panel p-4 shadow-sm sm:p-5 ${className}`}>
      {children}
    </section>
  )
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string
  children: React.ReactNode
  hint?: string
}) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-medium text-ink">{label}</span>
      {children}
      {hint && <span className="text-xs text-mute">{hint}</span>}
    </label>
  )
}

export const inputClass =
  "min-h-12 w-full rounded-xl border border-line bg-raised px-3 py-3 text-base text-ink outline-none transition focus-visible:ring-2 focus-visible:ring-tape/40"

export const btnPrimary =
  "tap inline-flex min-h-12 items-center justify-center rounded-xl bg-tape px-4 py-3 font-display text-lg font-bold uppercase tracking-wide text-paper outline-none transition focus-visible:ring-2 focus-visible:ring-tape/40 disabled:cursor-not-allowed disabled:opacity-50"

export const btnSecondary =
  "tap inline-flex min-h-11 items-center justify-center rounded-xl border border-line bg-panel px-4 py-2.5 text-sm font-medium text-ink outline-none transition hover:bg-raised focus-visible:ring-2 focus-visible:ring-tape/40"
