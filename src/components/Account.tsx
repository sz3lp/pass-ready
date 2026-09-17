import { useState } from "react"
import { CREW_JOIN_CODE, cloudConfigured } from "../lib/supabase"
import { useAuth } from "../lib/auth"
import { Panel } from "./ui"

export function AccountBar() {
  const { ready, user, profile, openAccount, signOut } = useAuth()
  if (!cloudConfigured()) return null
  if (!ready) return <span className="text-xs text-mute">…</span>
  if (!user) {
    return (
      <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
        <button type="button" onClick={() => openAccount("signin")} className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink">
          Sign in
        </button>
        <button type="button" onClick={() => openAccount("signup")} className="rounded-full bg-tape px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-paper">
          Create account
        </button>
      </div>
    )
  }
  return (
    <div className="flex shrink-0 items-center gap-2">
      <button type="button" onClick={() => openAccount("signin")} className="max-w-[9rem] truncate text-right text-xs font-medium text-tape">
        {profile?.display_name || user.email}
      </button>
      <button type="button" onClick={() => void signOut()} className="text-xs text-mute">
        Sign out
      </button>
    </div>
  )
}

export function AccountModal({ mode }: { mode: "signin" | "signup" }) {
  const { closeAccount, signIn, signUp, joinCrew, profile, user } = useAuth()
  const [tab, setTab] = useState(mode)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [crewCode, setCrewCode] = useState(CREW_JOIN_CODE)

  const submit = async () => {
    setBusy(true)
    setError(null)
    const msg = tab === "signup" ? await signUp(email, password, displayName) : await signIn(email, password)
    setBusy(false)
    if (msg) setError(msg)
  }

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-ink/50 p-4 sm:items-center">
      <Panel className="w-full max-w-md shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.2em] text-tape">Free · SPFR crew</p>
            <h2 className="font-display text-3xl font-extrabold uppercase text-ink">{tab === "signup" ? "Create account" : "Sign in"}</h2>
          </div>
          <button type="button" onClick={closeAccount} className="text-sm text-mute">
            Close
          </button>
        </div>
        <p className="mt-2 text-sm text-mute">
          Guests stay on this phone. An account syncs drill, tests, skills, and scores, and lets you buzz in on Jeopardy. Join code {CREW_JOIN_CODE}.
        </p>
        {user && profile && !profile.crew_id && (
          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              void joinCrew(crewCode)
            }}
          >
            <input value={crewCode} onChange={(e) => setCrewCode(e.target.value.toUpperCase())} className="flex-1 rounded-xl border border-line bg-raised px-3 py-2 text-sm uppercase" />
            <button type="submit" className="rounded-xl bg-tape px-3 py-2 text-sm font-bold uppercase text-paper">
              Join
            </button>
          </form>
        )}
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={() => setTab("signin")} className={`rounded-full px-3 py-1 text-xs ${tab === "signin" ? "bg-tape text-paper" : "text-mute"}`}>
            Sign in
          </button>
          <button type="button" onClick={() => setTab("signup")} className={`rounded-full px-3 py-1 text-xs ${tab === "signup" ? "bg-tape text-paper" : "text-mute"}`}>
            Create account
          </button>
        </div>
        <form
          className="mt-4 grid gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            void submit()
          }}
        >
          {tab === "signup" && (
            <input
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display name"
              className="rounded-xl border border-line bg-raised px-3 py-2 outline-none"
            />
          )}
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="rounded-xl border border-line bg-raised px-3 py-2 outline-none"
          />
          <input
            required
            type="password"
            autoComplete={tab === "signup" ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="rounded-xl border border-line bg-raised px-3 py-2 outline-none"
          />
          {error && <p className="text-sm text-stop">{error}</p>}
          <button disabled={busy} type="submit" className="rounded-xl bg-tape px-4 py-3 font-display text-lg font-bold uppercase text-paper disabled:opacity-60">
            {busy ? "Working…" : tab === "signup" ? "Create free account" : "Sign in"}
          </button>
        </form>
      </Panel>
    </div>
  )
}
