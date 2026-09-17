import { useState } from "react"
import { CHAPTERS } from "../data/syllabus"
import { decodeCrewPayload, encodeCrewPayload, masteryByChapter } from "../lib/storage"
import { useAppStore } from "../lib/store"
import { Panel, Pill } from "../components/ui"

export function CrewView() {
  const { store, setStore } = useAppStore()
  const [code, setCode] = useState("")
  const [incoming, setIncoming] = useState<{ n: string; w: number[] }[]>([])
  const [note, setNote] = useState("")
  const [chapter, setChapter] = useState(10)
  const mastery = masteryByChapter(store)

  const mine = encodeCrewPayload(store)

  const importCode = () => {
    const parsed = decodeCrewPayload(code)
    if (!parsed) return
    setIncoming((list) => [...list.filter((x) => x.n !== parsed.n), { n: parsed.n, w: parsed.w }])
    const flags = parsed.f.map((f) => ({ chapter: f.c, note: f.t, name: f.n, at: Date.now() }))
    setStore({ ...store, crew: [...store.crew, ...flags].slice(-40) })
    setCode("")
  }

  const heat = new Map<number, number>()
  for (const m of mastery.filter((x) => x.weak)) heat.set(m.chapter, (heat.get(m.chapter) ?? 0) + 2)
  for (const person of incoming) {
    for (const c of person.w) heat.set(c, (heat.get(c) ?? 0) + 1)
  }
  for (const f of store.crew) heat.set(f.chapter, (heat.get(f.chapter) ?? 0) + 1)
  const ranked = [...heat.entries()].sort((a, b) => b[1] - a[1])

  return (
    <div className="grid gap-4">
      <Panel>
        <h1 className="font-display text-3xl font-extrabold uppercase">Crew board</h1>
        <p className="mt-2 text-sm text-mute">
          Nobody sits out the final because one person was too proud to say they didn't get shock. Flag a chapter, paste your code in the class chat, import everyone else's. Thursday night you drill the hottest columns as a group — not six people rereading the same chapter they already know.
        </p>
        <label className="mt-4 block text-xs uppercase tracking-widest text-mute">Your name on the board</label>
        <input
          value={store.name}
          onChange={(e) => setStore({ ...store, name: e.target.value })}
          placeholder="Name or initials"
          className="mt-1 w-full rounded-xl border border-line bg-raised px-3 py-2 outline-none"
        />
      </Panel>

      <Panel>
        <h2 className="font-display text-xl font-bold uppercase">Flag a sticky chapter</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <select
            value={chapter}
            onChange={(e) => setChapter(Number(e.target.value))}
            className="rounded-xl border border-line bg-raised px-3 py-2 text-sm"
          >
            {CHAPTERS.map((c) => (
              <option key={c.n} value={c.n}>
                Ch. {c.n} {c.title}
              </option>
            ))}
          </select>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What specifically is fuzzy?"
            className="min-w-[200px] flex-1 rounded-xl border border-line bg-raised px-3 py-2 text-sm outline-none"
          />
          <button
            type="button"
            className="rounded-xl bg-tape px-4 py-2 font-display font-bold uppercase text-paper"
            onClick={() => {
              if (!note.trim()) return
              setStore({
                ...store,
                crew: [...store.crew, { chapter, note: note.trim(), name: store.name || "me", at: Date.now() }].slice(-40),
              })
              setNote("")
            }}
          >
            Pin it
          </button>
        </div>
        <ul className="mt-4 space-y-2">
          {[...store.crew].reverse().slice(0, 8).map((f, idx) => (
            <li key={`${f.at}-${idx}`} className="rounded-xl border border-line bg-raised px-3 py-2 text-sm">
              <span className="text-tape">Ch. {f.chapter}</span> · {f.name}: {f.note}
            </li>
          ))}
        </ul>
      </Panel>

      <Panel>
        <h2 className="font-display text-xl font-bold uppercase">Share code</h2>
        <p className="mt-1 text-sm text-mute">Copies your weak chapters plus recent flags. No passwords, no server — paste in GroupMe / iMessage.</p>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-raised px-3 py-3 text-xs text-tape">{mine}</pre>
        <button
          type="button"
          className="mt-2 text-sm text-tape"
          onClick={() => navigator.clipboard.writeText(mine)}
        >
          Copy my code
        </button>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste a classmate's code"
          className="mt-4 h-24 w-full rounded-xl border border-line bg-raised px-3 py-2 text-xs outline-none"
        />
        <button type="button" onClick={importCode} className="mt-2 rounded-xl border border-line px-4 py-2 text-sm">
          Import into heat map
        </button>
        {incoming.length > 0 && (
          <p className="mt-2 text-sm text-mute">{incoming.map((p) => p.n).join(", ")} on the board.</p>
        )}
      </Panel>

      <Panel>
        <h2 className="font-display text-xl font-bold uppercase">Thursday rescue list</h2>
        {ranked.length === 0 ? (
          <p className="mt-2 text-sm text-mute">No weak chapters yet. Drill, then import codes after the first quiz.</p>
        ) : (
          <ol className="mt-3 space-y-2">
            {ranked.slice(0, 8).map(([n, score], i) => {
              const ch = CHAPTERS.find((c) => c.n === n)
              return (
                <li key={n} className="flex items-center justify-between rounded-xl border border-line bg-raised px-3 py-2">
                  <span className="text-sm">
                    <span className="text-mute">{i + 1}.</span> Ch. {n} {ch?.title}
                  </span>
                  <Pill tone={i === 0 ? "stop" : "warn"}>{score} heat</Pill>
                </li>
              )
            })}
          </ol>
        )}
      </Panel>
    </div>
  )
}
