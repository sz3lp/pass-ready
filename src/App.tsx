import { useEffect, useState } from "react"
import { Bell, CalendarDays, ClipboardList, Crosshair, LayoutGrid, Swords, Trophy, Users, Zap } from "lucide-react"
import { AuthProvider } from "./lib/auth"
import { StoreProvider } from "./lib/store"
import type { View } from "./nav"
import { BRAND } from "./data/brand"
import { TodayView } from "./views/Today"
import { DrillView } from "./views/Drill"
import { TestsView } from "./views/Tests"
import { SkillsView } from "./views/Skills"
import { BenchView } from "./views/Bench"
import { CrewView } from "./views/Crew"
import { CalendarView } from "./views/Calendar"
import { JeopardyView } from "./views/Jeopardy"
import { PlayView } from "./views/Play"
import { AccountBar } from "./components/Account"

const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`

const TABS: { id: View; label: string; icon: typeof Zap }[] = [
  { id: "today", label: "Today", icon: LayoutGrid },
  { id: "jeopardy", label: "Jeopardy", icon: Trophy },
  { id: "play", label: "Play", icon: Bell },
  { id: "drill", label: "Drill", icon: Zap },
  { id: "tests", label: "Tests", icon: ClipboardList },
  { id: "skills", label: "Skills", icon: Swords },
  { id: "bench", label: "Bench", icon: Crosshair },
  { id: "crew", label: "Crew", icon: Users },
  { id: "calendar", label: "Board", icon: CalendarDays },
]

function parseHash(): { view: View; chapter?: number; session?: string; testId?: string; playCode?: string } {
  const raw = window.location.hash.replace(/^#/, "") || "today"
  const [viewRaw, extra] = raw.split("/")
  const view = TABS.some((t) => t.id === viewRaw) ? (viewRaw as View) : "today"
  const chapter = view === "drill" && extra?.startsWith("c") ? Number(extra.slice(1)) : undefined
  const session = view === "jeopardy" && extra ? extra : undefined
  const testId = view === "tests" && extra ? extra : undefined
  const playCode = view === "play" && extra ? extra : undefined
  return { view, chapter: Number.isFinite(chapter) ? chapter : undefined, session, testId, playCode }
}

function Shell() {
  const [{ view, chapter, session, testId, playCode }, setRoute] = useState(parseHash)

  useEffect(() => {
    const onHash = () => setRoute(parseHash())
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  const go = (next: View, extra?: string) => {
    window.location.hash = extra ? `${next}/${extra}` : next
  }

  return (
    <div className="min-h-svh bg-paper text-ink">
      <header className="sticky top-0 z-10 border-b border-line bg-panel/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2.5">
          <button type="button" onClick={() => go("today")} className="flex min-w-0 items-center gap-3 text-left">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-tape p-1">
              <img src={asset("spfr.png")} alt="" className="h-12 w-auto object-contain" />
            </span>
            <span>
              <p className="font-display text-2xl font-extrabold uppercase leading-none tracking-wide text-tape">{BRAND.name}</p>
              <p className="mt-0.5 truncate text-[11px] uppercase tracking-[0.14em] text-mute">{BRAND.dept}</p>
              <p className="text-[11px] uppercase tracking-[0.14em] text-mute">
                {BRAND.program} · {BRAND.term}
              </p>
            </span>
          </button>
          <div className="flex shrink-0 items-center gap-3">
            <AccountBar />
            <img src={asset("medic-one.png")} alt="King County Medic One" className="h-14 w-auto shrink-0 object-contain" />
          </div>
        </div>
        <nav className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-3 pb-2">
          {TABS.map((t) => {
            const Icon = t.icon
            const on = view === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => go(t.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm ${
                  on ? "bg-tape text-paper" : "text-mute hover:text-ink"
                }`}
              >
                <Icon className="size-3.5" />
                {t.label}
              </button>
            )
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-5 pb-16">
        {view === "today" && <TodayView go={go} />}
        {view === "drill" && <DrillView seedChapter={chapter} />}
        {view === "tests" && <TestsView seedId={testId} go={go} />}
        {view === "skills" && <SkillsView />}
        {view === "bench" && <BenchView />}
        {view === "crew" && <CrewView />}
        {view === "calendar" && <CalendarView />}
        {view === "jeopardy" && <JeopardyView sessionId={session} go={go} />}
        {view === "play" && <PlayView seedCode={playCode} />}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <Shell />
      </StoreProvider>
    </AuthProvider>
  )
}
