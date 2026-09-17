import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { loadStore, saveStore, type Store } from "./storage"

const Ctx = createContext<{ store: Store; setStore: (s: Store) => void } | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState(loadStore)
  useEffect(() => {
    saveStore(store)
  }, [store])
  return <Ctx.Provider value={{ store, setStore }}>{children}</Ctx.Provider>
}

export function useAppStore() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("store")
  return ctx
}
