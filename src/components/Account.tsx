import { useState } from "react"
import { CREW_JOIN_CODE, cloudConfigured } from "../lib/supabase"
import { useAuth } from "../lib/auth"
import { Field, Panel, btnPrimary, inputClass } from "./ui"

export function AccountBar() {
  const { ready, user, profile, openAccount, signOut } = useAuth()
  if (!cloudConfigured()) return null
  if (!ready) return <span className="text-xs text-mute" aria-live="polite">Loading…</span>
  if (!user) {
    return (
      <div className="flex shrink-0 items-center justify-end gap-1.5">
        <button
          type="button"
          onClick={() => openAccount("signin")}
          className="tap hidden min-h-10 rounded-full border border-line px-3 py-2 text-xs font-medium text-ink outline-none focus-visible:ring-2 focus-visible:ring-tape/40 sm:inline-flex"
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => openAccount("signup")}
          className="tap inline-flex min-h-10 items-center rounded-full bg-tape px-3 py-2 text-xs font-bold uppercase tracking-wide text-paper outline-none focus-visible:ring-2 focus-visible:ring-tape/40"
        >
          <span className="sm:hidden">Account</span>
          <span className="hidden sm:inline">Create account</span>
        </button>
      </div>
    )
  }
  return (
    <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
      <button
        type="button"
        onClick={() => openAccount("signin")}
        className="tap max-w-[7rem] truncate rounded-lg px-2 py-2 text-right text-xs font-medium text-tape outline-none focus-visible:ring-2 focus-visible:ring-tape/40 sm:max-w-[9rem]"
      >
        {profile?.display_name || user.email}
      </button>
      <button
        type="button"
        onClick={() => void signOut()}
        className="tap hidden min-h-10 rounded-lg px-2 py-2 text-xs text-mute outline-none focus-visible:ring-2 focus-visible:ring-tape/40 sm:inline-flex"
      >
        Sign out
      </button>
    </div>
  )
}

export function AccountModal({ mode }: { mode: "signin" | "signup" }) {
  const { closeAccount, signIn, signUp, joinCrew, profile, user, signOut } = useAuth()
  const [tab, setTab] = useState(mode)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
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
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/50 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-title"
      onClick={closeAccount}
    >
      <Panel className="sheet-safe w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.2em] text-tape">Free · SPFR crew</p>
            <h2 id="account-title" className="font-display text-3xl font-extrabold uppercase text-ink">
              {tab === "signup" ? "Create account" : "Sign in"}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeAccount}
            className="tap flex size-11 items-center justify-center rounded-full text-sm text-mute outline-none focus-visible:ring-2 focus-visible:ring-tape/40"
            aria-label="Close account"
          >
            Close
          </button>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-mute">
          Guests stay on this phone. An account syncs drill, tests, skills, and scores, and lets you buzz in on Jeopardy. Join code {CREW_JOIN_CODE}.
        </p>
        {user && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <p className="text-sm text-ink">Signed in as {profile?.display_name || user.email}</p>
            <button type="button" onClick={() => void signOut()} className="text-sm text-mute underline">
              Sign out
            </button>
          </div>
        )}
        {user && profile && !profile.crew_id && (
          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              void joinCrew(crewCode)
            }}
          >
            <input
              value={crewCode}
              onChange={(e) => setCrewCode(e.target.value.toUpperCase())}
              aria-label="Crew join code"
              className={`${inputClass} flex-1 uppercase`}
            />
            <button type="submit" className={btnPrimary}>
              Join
            </button>
          </form>
        )}
        <div className="mt-4 flex gap-2" role="tablist" aria-label="Account mode">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "signin"}
            onClick={() => setTab("signin")}
            className={`tap min-h-10 rounded-full px-3 py-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-tape/40 ${tab === "signin" ? "bg-tape text-paper" : "text-mute"}`}
          >
            Sign in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "signup"}
            onClick={() => setTab("signup")}
            className={`tap min-h-10 rounded-full px-3 py-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-tape/40 ${tab === "signup" ? "bg-tape text-paper" : "text-mute"}`}
          >
            Create account
          </button>
        </div>
        <form
          className="mt-4 grid gap-3"
          onSubmit={(e) => {
            e.preventDefault()
            void submit()
          }}
        >
          {tab === "signup" && (
            <Field label="Display name">
              <input
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                autoComplete="nickname"
                className={inputClass}
              />
            </Field>
          )}
          <Field label="Email">
            <input
              required
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Password" hint={tab === "signup" ? "At least 6 characters." : undefined}>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                autoComplete={tab === "signup" ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                className={`${inputClass} pr-20`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="tap absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-2 text-xs text-mute outline-none focus-visible:ring-2 focus-visible:ring-tape/40"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </Field>
          {error && (
            <p className="text-sm text-stop" role="alert">
              {error}
            </p>
          )}
          <button disabled={busy} type="submit" className={btnPrimary}>
            {busy ? "Working…" : tab === "signup" ? "Create free account" : "Sign in"}
          </button>
        </form>
      </Panel>
    </div>
  )
}
