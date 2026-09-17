import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import type { User } from "@supabase/supabase-js"
import { CREW_JOIN_CODE, cloudConfigured, supabase } from "./supabase"
import { AccountModal } from "../components/Account"

export type Profile = {
  id: string
  display_name: string
  crew_id: string | null
}

type AuthCtx = {
  ready: boolean
  user: User | null
  profile: Profile | null
  accountOpen: boolean
  openAccount: (mode?: "signin" | "signup") => void
  closeAccount: () => void
  signIn: (email: string, password: string) => Promise<string | null>
  signUp: (email: string, password: string, displayName: string) => Promise<string | null>
  signOut: () => Promise<void>
  joinCrew: (code?: string) => Promise<{ ok: boolean; error?: string }>
  updateDisplayName: (name: string) => Promise<void>
  refreshProfile: () => Promise<Profile | null>
}

const Ctx = createContext<AuthCtx | null>(null)

async function loadProfile(userId: string): Promise<Profile | null> {
  if (!supabase) return null
  const { data, error } = await supabase.from("profiles").select("id, display_name, crew_id").eq("id", userId).maybeSingle()
  if (error) {
    console.warn("profile", error.message)
    return null
  }
  if (data) return data as Profile
  const { data: created } = await supabase
    .from("profiles")
    .insert({ id: userId, display_name: "" })
    .select("id, display_name, crew_id")
    .maybeSingle()
  return (created as Profile | null) ?? { id: userId, display_name: "", crew_id: null }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(!cloudConfigured())
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [accountOpen, setAccountOpen] = useState(false)
  const [accountMode, setAccountMode] = useState<"signin" | "signup">("signin")

  const refreshProfile = useCallback(async () => {
    if (!user) {
      setProfile(null)
      return null
    }
    const next = await loadProfile(user.id)
    setProfile(next)
    return next
  }, [user])

  useEffect(() => {
    if (!supabase) return
    let alive = true
    void supabase.auth.getSession().then(({ data }) => {
      if (!alive) return
      setUser(data.session?.user ?? null)
      setReady(true)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setReady(true)
    })
    return () => {
      alive = false
      sub.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!user) {
      setProfile(null)
      return
    }
    let cancelled = false
    void loadProfile(user.id).then(async (p) => {
      if (cancelled) return
      let next = p
      if (next && !next.crew_id) {
        await supabase?.rpc("join_crew", { p_code: CREW_JOIN_CODE })
        next = (await loadProfile(user.id)) ?? next
      }
      const metaName = typeof user.user_metadata?.display_name === "string" ? user.user_metadata.display_name : ""
      if (next && !next.display_name.trim() && metaName.trim()) {
        await supabase?.from("profiles").update({ display_name: metaName.trim() }).eq("id", user.id)
        next = { ...next, display_name: metaName.trim() }
      }
      if (!cancelled) setProfile(next)
    })
    return () => {
      cancelled = true
    }
  }, [user])

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) return "Cloud is not configured on this build."
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (error) {
      if (/email not confirmed/i.test(error.message)) {
        return "Check your email for a confirmation link, then sign in. If nothing arrives, Confirm email may still be on in the Supabase dashboard."
      }
      return error.message
    }
    setAccountOpen(false)
    return null
  }, [])

  const signUp = useCallback(async (email: string, password: string, displayName: string) => {
    if (!supabase) return "Cloud is not configured on this build."
    const name = displayName.trim()
    if (!name) return "Display name is required."
    if (password.length < 6) return "Password needs at least 6 characters."
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { display_name: name } },
    })
    if (error) return error.message
    if (!data.session) {
      const second = await supabase.auth.signInWithPassword({ email: email.trim(), password })
      if (second.error) {
        if (/email not confirmed/i.test(second.error.message)) {
          return "Account created. Check your email to confirm, then sign in. If you never get mail, Confirm email is still enabled in the project dashboard."
        }
        return second.error.message
      }
    }
    if (data.user) {
      await supabase.from("profiles").upsert({ id: data.user.id, display_name: name })
      await supabase.rpc("join_crew", { p_code: CREW_JOIN_CODE })
    }
    setAccountOpen(false)
    return null
  }, [])

  const signOut = useCallback(async () => {
    await supabase?.auth.signOut()
    setProfile(null)
    setAccountOpen(false)
  }, [])

  const joinCrew = useCallback(async (code = CREW_JOIN_CODE) => {
    if (!supabase || !user) return { ok: false, error: "Sign in first." }
    const { data, error } = await supabase.rpc("join_crew", { p_code: code })
    if (error) return { ok: false, error: error.message }
    const result = data as { ok?: boolean; reason?: string } | null
    if (!result?.ok) return { ok: false, error: result?.reason === "code" ? "Unknown crew code." : "Could not join that crew." }
    await refreshProfile()
    return { ok: true }
  }, [refreshProfile, user])

  const updateDisplayName = useCallback(async (name: string) => {
    if (!supabase || !user) return
    const display_name = name.trim()
    await supabase.from("profiles").update({ display_name }).eq("id", user.id)
    setProfile((p) => (p ? { ...p, display_name } : p))
  }, [user])

  const value = useMemo<AuthCtx>(
    () => ({
      ready,
      user,
      profile,
      accountOpen,
      openAccount: (mode = "signin") => {
        setAccountMode(mode)
        setAccountOpen(true)
      },
      closeAccount: () => setAccountOpen(false),
      signIn,
      signUp,
      signOut,
      joinCrew,
      updateDisplayName,
      refreshProfile,
    }),
    [accountOpen, joinCrew, profile, ready, refreshProfile, signIn, signOut, signUp, updateDisplayName, user],
  )

  return (
    <Ctx.Provider value={value}>
      {children}
      {accountOpen && <AccountModal mode={accountMode} />}
    </Ctx.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("auth")
  return ctx
}
