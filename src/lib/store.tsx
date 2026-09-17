import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { loadStore, saveStore, type Store } from "./storage"
import { useAuth } from "./auth"
import { mergeStores, pullProgress, pushProgress } from "./sync"

const Ctx = createContext<{ store: Store; setStore: (s: Store) => void } | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const { user, profile, ready, updateDisplayName } = useAuth()
  const [store, setStore] = useState(loadStore)
  const skipPush = useRef(false)
  const timer = useRef<number | null>(null)
  const userId = user?.id ?? null

  useEffect(() => {
    saveStore(store)
    if (!userId) return
    if (skipPush.current) {
      skipPush.current = false
      return
    }
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      void pushProgress(userId, store)
    }, 800)
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [store, userId])

  useEffect(() => {
    if (!ready || !userId) return
    let cancelled = false
    void (async () => {
      const remote = await pullProgress(userId, profile?.display_name ?? "")
      if (cancelled) return
      const local = loadStore()
      const merged = mergeStores(local, remote, profile?.display_name)
      skipPush.current = true
      setStore(merged)
      saveStore(merged)
      void pushProgress(userId, merged)
      if (merged.name && !profile?.display_name?.trim()) void updateDisplayName(merged.name)
    })()
    return () => {
      cancelled = true
    }
  }, [ready, userId, profile?.display_name, updateDisplayName])

  return <Ctx.Provider value={{ store, setStore }}>{children}</Ctx.Provider>
}

export function useAppStore() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("store")
  return ctx
}
