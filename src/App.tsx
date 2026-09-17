import { useEffect, useState } from "react"
import {
  Bell,
  CalendarDays,
  ClipboardList,
  Crosshair,
  Ellipsis,
  LayoutGrid,
  Swords,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react"
import { AuthProvider, useAuth } from "./lib/auth"
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

type Tab = { id: View; label: string; icon: typeof Zap; short?: string }

const PRIMARY_MOBILE: Tab[] = [
  { id: "today", label: "Today", icon: LayoutGrid },
  { id: "drill", label: "Drill", icon: Zap },
  { id: "skills", label: "Skills", icon: Swords },
  { id: "jeopardy", label: "Jeopardy", icon: Trophy, short: "Board" },
]

const MORE_TABS: Tab[] = [
  { id: "play", label: "Play / Buzz", icon: Bell },
  { id: "tests", label: "Unit tests", icon: ClipboardList },
  { id: "bench", label: "80-line bench", icon: Crosshair },
  { id: "crew", label: "Crew", icon: Users },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
]

const ALL_TABS: Tab[] = [
  ...PRIMARY_MOBILE,
  ...MORE_TABS,
]

const MORE_VIEWS = new Set<View>(MORE_TABS.map((t) => t.id))

function parseHash(): { view: View; chapter?: number; session?: string; testId?: string; playCode?: string } {
  const raw = window.location.hash.replace(/^#/, "") || "today"
  const [viewRaw, extra] = raw.split("/")
  const view = ALL_TABS.some((t) => t.id === viewRaw) ? (viewRaw as View) : "today"
  const chapter = view === "drill" && extra?.startsWith("c") ? Number(extra.slice(1)) : undefined
  const session = view === "jeopardy" && extra?.length ? extra : undefined
  const testId = view === "tests" && extra ? extra : undefined
  const playCode = view === "play" && extra ? extra : undefined
  return { view, chapter: Number.isFinite(chapter) ? chapter : undefined, session, testId, playCode }
}

function Shell() {
  const [{ view, chapter, session, testId, playCode }, setRoute] = useState(parseHash)
  const [moreOpen, setMoreOpen] = useState(false)
  const { openAccount } = useAuth()

  useEffect(() => {
    const onHash = () => setRoute(parseHash())
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  useEffect(() => {
    setMoreOpen(false)
    const main = document.getElementById("main-content")
    main?.focus({ preventScroll: true })
  }, [view])

  const go = (next: View, extra?: string) => {
    window.location.hash = extra ? `${next}/${extra}` : next
    setMoreOpen(false)
  }

  const moreActive = MORE_VIEWS.has(view)

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-line bg-panel/95 pt-[env(safe-area-inset-top)] backdrop-blur supports-[backdrop-filter]:bg-panel/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2 sm:gap-3 sm:px-4 sm:py-2.5">
          <button
            type="button"
            onClick={() => go("today")}
            className="tap flex min-w-0 items-center gap-2.5 rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-tape/40"
            aria-label="Pass Ready home"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-panel p-1 ring-1 ring-line sm:size-14 sm:bg-tape sm:ring-0 sm:p-1">
              <img
                src={asset("medic-one.png")}
                alt=""
                width={48}
                height={48}
                className="h-9 w-auto object-contain sm:hidden"
              />
              <img
                src={asset("spfr.png")}
                alt=""
                width={48}
                height={48}
                className="hidden h-12 w-auto object-contain sm:block"
              />
            </span>
            <span className="min-w-0">
              <p className="font-display text-xl font-extrabold uppercase leading-none tracking-wide text-tape sm:text-2xl">{BRAND.name}</p>
              <p className="mt-0.5 truncate text-[10px] uppercase tracking-[0.12em] text-mute sm:text-[11px] sm:tracking-[0.14em]">
                {BRAND.deptShort} · {BRAND.program}
              </p>
            </span>
          </button>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <AccountBar />
            <img
              src={asset("spfr.png")}
              alt="Snoqualmie Pass Fire & Rescue"
              width={56}
              height={56}
              className="h-11 w-auto object-contain sm:hidden"
            />
            <img
              src={asset("medic-one.png")}
              alt="King County Medic One"
              width={56}
              height={56}
              className="hidden h-12 w-auto object-contain sm:block sm:h-14"
            />
          </div>
        </div>

        <nav
          className="mx-auto hidden max-w-6xl gap-1 overflow-x-auto px-3 pb-2 md:flex"
          aria-label="Primary"
        >
          {ALL_TABS.map((t) => {
            const Icon = t.icon
            const on = view === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => go(t.id)}
                aria-current={on ? "page" : undefined}
                className={`tap flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-tape/40 ${
                  on ? "bg-tape text-paper" : "text-mute hover:bg-raised hover:text-ink"
                }`}
              >
                <Icon className="size-4 shrink-0" aria-hidden />
                {t.label}
              </button>
            )
          })}
        </nav>
      </header>

      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-6xl px-3 py-4 outline-none sm:px-4 sm:py-5 md:pb-10 pb-[calc(5.5rem+env(safe-area-inset-bottom))]"
      >
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

      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-panel/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
        aria-label="Primary mobile"
      >
        <div className="mx-auto grid max-w-lg grid-cols-5 gap-0.5 px-1 pt-1">
          {PRIMARY_MOBILE.map((t) => {
            const Icon = t.icon
            const on = view === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => go(t.id)}
                aria-current={on ? "page" : undefined}
                className={`tap flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-medium uppercase tracking-wide outline-none transition-colors focus-visible:ring-2 focus-visible:ring-tape/40 ${
                  on ? "text-tape" : "text-mute"
                }`}
              >
                <span className={`flex size-8 items-center justify-center rounded-lg ${on ? "bg-tape/10" : ""}`}>
                  <Icon className="size-5" aria-hidden />
                </span>
                {t.short ?? t.label}
              </button>
            )
          })}
          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            aria-expanded={moreOpen}
            aria-haspopup="dialog"
            className={`tap flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-medium uppercase tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-tape/40 ${
              moreActive || moreOpen ? "text-tape" : "text-mute"
            }`}
          >
            <span className={`flex size-8 items-center justify-center rounded-lg ${moreActive || moreOpen ? "bg-tape/10" : ""}`}>
              <Ellipsis className="size-5" aria-hidden />
            </span>
            More
          </button>
        </div>
      </nav>

      {moreOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="More"
          onClick={() => setMoreOpen(false)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-panel shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <p className="font-display text-lg font-bold uppercase text-ink">More</p>
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                className="tap flex size-11 items-center justify-center rounded-full text-mute outline-none focus-visible:ring-2 focus-visible:ring-tape/40"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="grid gap-1 p-2">
              {MORE_TABS.map((t) => {
                const Icon = t.icon
                const on = view === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => go(t.id)}
                    className={`tap flex min-h-12 items-center gap-3 rounded-xl px-3 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-tape/40 ${
                      on ? "bg-tape text-paper" : "text-ink hover:bg-raised"
                    }`}
                  >
                    <Icon className="size-5 shrink-0" aria-hidden />
                    <span className="text-sm font-medium">{t.label}</span>
                  </button>
                )
              })}
              <button
                type="button"
                onClick={() => {
                  setMoreOpen(false)
                  openAccount("signin")
                }}
                className="tap flex min-h-12 items-center gap-3 rounded-xl px-3 py-3 text-left text-mute outline-none focus-visible:ring-2 focus-visible:ring-tape/40 hover:bg-raised"
              >
                Account
              </button>
            </div>
          </div>
        </div>
      )}
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
