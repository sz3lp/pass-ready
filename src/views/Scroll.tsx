import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Check, ChevronUp, X } from "lucide-react"
import { BLOCKS, type BlockId } from "../data/syllabus"
import { chapterTitle, studyPack } from "../data/notes"
import { INSTRUCTOR_B2, QUESTIONS, type Question } from "../data/questions"
import { shuffle } from "../lib/schedule"
import { blockMeta } from "../lib/schedule"
import { recordAnswer } from "../lib/storage"
import { useAppStore } from "../lib/store"

type FeedMode = "learn" | "mix" | "test"

type FeedCard =
  | { kind: "cover"; id: string; chapter: number; title: string; blurb: string }
  | { kind: "note"; id: string; chapter: number; kicker: string; title: string; body: string }
  | { kind: "question"; id: string; question: Question }

function seedFrom(id: string) {
  let s = 0
  for (const ch of id) s = (s * 33 + ch.charCodeAt(0)) >>> 0
  return s || 1
}

function coreQuestions(chapters: number[]) {
  const set = new Set(chapters)
  const seen = new Set<string>()
  const out: Question[] = []
  for (const q of [...QUESTIONS, ...INSTRUCTOR_B2]) {
    if (!set.has(q.chapter) || q.id.startsWith("x")) continue
    if (seen.has(q.id)) continue
    seen.add(q.id)
    out.push(q)
  }
  return out
}

function learnCards(chapter: number): FeedCard[] {
  const pack = studyPack(chapter)
  const title = chapterTitle(chapter)
  const cards: FeedCard[] = [
    {
      kind: "cover",
      id: `cover-${chapter}`,
      chapter,
      title,
      blurb: pack?.blurb ?? "No study pack yet. The questions for this chapter are still in the feed.",
    },
  ]
  pack?.mustKnow.forEach((body, i) => {
    cards.push({
      kind: "note",
      id: `know-${chapter}-${i}`,
      chapter,
      kicker: `Must know · ${i + 1} of ${pack.mustKnow.length}`,
      title,
      body,
    })
  })
  pack?.traps.forEach((body, i) => {
    cards.push({
      kind: "note",
      id: `trap-${chapter}-${i}`,
      chapter,
      kicker: `Exam trap · ${i + 1} of ${pack.traps.length}`,
      title,
      body,
    })
  })
  pack?.terms.forEach((term) => {
    cards.push({
      kind: "note",
      id: `term-${chapter}-${term.term}`,
      chapter,
      kicker: "Term",
      title: term.term,
      body: term.def,
    })
  })
  if (pack?.kcNote) {
    cards.push({
      kind: "note",
      id: `kc-${chapter}`,
      chapter,
      kicker: "King County",
      title,
      body: pack.kcNote,
    })
  }
  return cards
}

function buildDeck(chapters: number[], mode: FeedMode, stack: number): FeedCard[] {
  if (mode === "learn") return chapters.flatMap(learnCards)
  if (mode === "test") {
    const pool = shuffle(coreQuestions(chapters), stack * 7919)
    const cap = chapters.length === 1 ? pool.length : 40
    return pool.slice(0, cap).map((question) => ({ kind: "question" as const, id: question.id, question }))
  }
  const cards: FeedCard[] = []
  for (const chapter of chapters) {
    const notes = learnCards(chapter)
    const questions = shuffle(coreQuestions([chapter]), stack * 1000 + chapter).slice(0, 6)
    let qi = 0
    for (const card of notes) {
      cards.push(card)
      if (card.kind === "note" && card.kicker.startsWith("Must know") && qi < questions.length) {
        const question = questions[qi++]
        cards.push({ kind: "question", id: `mix-${question.id}`, question })
      }
    }
    while (qi < questions.length) {
      const question = questions[qi++]
      cards.push({ kind: "question", id: `mix-${question.id}`, question })
    }
  }
  return cards
}

export function ScrollView({
  seedChapter,
  seedMode = "mix",
  onClose,
  onOpenNotes,
}: {
  seedChapter?: number
  seedMode?: FeedMode
  onClose: () => void
  onOpenNotes: (chapter: number) => void
}) {
  const live = blockMeta()
  const { store, setStore } = useAppStore()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const locked = useRef(new Set<string>())
  const [block, setBlock] = useState<BlockId>(live.id)
  const [mode, setMode] = useState<FeedMode>(seedMode)
  const [scope, setScope] = useState<number | "all">(seedChapter ?? "all")
  const [stack, setStack] = useState(1)
  const [index, setIndex] = useState(0)
  const [picks, setPicks] = useState<Record<string, number>>({})
  const [chaptersOpen, setChaptersOpen] = useState(false)

  useEffect(() => {
    if (seedChapter) {
      const home = BLOCKS.find((b) => b.examChapters.includes(seedChapter))
      if (home) setBlock(home.id)
      setScope(seedChapter)
    }
  }, [seedChapter])

  const chapters = useMemo(() => {
    const list = BLOCKS.find((b) => b.id === block)?.examChapters ?? []
    if (scope === "all") return list
    return list.includes(scope) ? [scope] : list
  }, [block, scope])

  const cards = useMemo(() => buildDeck(chapters, mode, stack), [chapters, mode, stack])

  useLayoutEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const apply = () => el.style.setProperty("--feed", `${el.clientHeight}px`)
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTo({ top: 0 })
    setIndex(0)
  }, [cards])

  useEffect(() => {
    const root = scrollerRef.current
    if (!root) return
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const n = Number((visible.target as HTMLElement).dataset.i)
        if (Number.isFinite(n)) setIndex(n)
      },
      { root, threshold: [0.6, 0.85] },
    )
    root.querySelectorAll<HTMLElement>("[data-i]").forEach((node) => obs.observe(node))
    return () => obs.disconnect()
  }, [cards])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (chaptersOpen) setChaptersOpen(false)
        else onClose()
        return
      }
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return
      e.preventDefault()
      const el = scrollerRef.current
      if (!el) return
      el.scrollBy({ top: (e.key === "ArrowDown" ? 1 : -1) * el.clientHeight, behavior: "smooth" })
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [chaptersOpen, onClose])

  const step = (dir: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ top: dir * el.clientHeight, behavior: "smooth" })
  }

  const choose = (q: Question, idx: number) => {
    if (locked.current.has(q.id) || picks[q.id] != null) return
    locked.current.add(q.id)
    setPicks((prev) => ({ ...prev, [q.id]: idx }))
    setStore(recordAnswer(store, q.id, idx === q.answer, idx === q.answer ? "good" : "again"))
  }

  const asked = cards.filter((c) => c.kind === "question" && picks[c.question.id] != null)
  const hits = asked.filter((c) => c.kind === "question" && picks[c.question.id] === c.question.answer).length
  const current = cards[index]
  const chapterLabel =
    current && current.kind !== "question"
      ? `Ch. ${current.chapter}`
      : current?.kind === "question"
        ? `Ch. ${current.question.chapter}`
        : scope === "all"
          ? "All chapters"
          : `Ch. ${scope}`
  const titleLabel =
    current && current.kind !== "question"
      ? current.kind === "cover"
        ? current.title
        : chapterTitle(current.chapter)
      : current?.kind === "question"
        ? chapterTitle(current.question.chapter)
        : BLOCKS.find((b) => b.id === block)?.label ?? ""

  const progress = cards.length ? ((index + 1) / cards.length) * 100 : 0

  return (
    <div className="fixed inset-0 z-[60] flex justify-center bg-[#070b14] text-white">
      <div className="flex h-dvh w-full max-w-lg flex-col bg-[#10182a]">
        <header className="shrink-0 px-3 pt-[max(0.4rem,env(safe-area-inset-top))]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="tap flex size-11 shrink-0 items-center justify-center rounded-full text-white/80 outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label="Close scroll"
            >
              <X className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => setChaptersOpen(true)}
              className="tap min-w-0 flex-1 rounded-xl px-1 py-1 text-left outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <p className="truncate font-display text-lg font-bold uppercase leading-none tracking-wide">{chapterLabel}</p>
              <p className="truncate text-xs text-white/60">{titleLabel}</p>
            </button>
            <p className="shrink-0 text-right text-xs tabular-nums text-white/60">
              {asked.length > 0 && (
                <span className="mb-0.5 block text-emerald-300">
                  {hits}/{asked.length}
                </span>
              )}
              {cards.length ? index + 1 : 0}/{cards.length}
            </p>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1 rounded-full bg-white/10 p-1" role="tablist" aria-label="Feed">
            {(
              [
                ["learn", "Learn"],
                ["mix", "Mix"],
                ["test", "Test"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={mode === id}
                onClick={() => setMode(id)}
                className={`tap min-h-10 rounded-full font-display text-sm font-bold uppercase tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                  mode === id ? "bg-white text-[#10182a]" : "text-white/70"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10" aria-hidden>
            <div className="h-full bg-[#c4a035]" style={{ width: `${progress}%` }} />
          </div>
        </header>

        <div ref={scrollerRef} className="feed-scroll min-h-0 flex-1 overflow-y-auto" tabIndex={0} aria-label="Study feed">
          {cards.length === 0 && (
            <section className="feed-card flex items-center px-6" style={{ height: "var(--feed, 100%)" }} data-i={0}>
              <p className="text-lg text-white/80">Nothing in this stack yet. Pick another chapter.</p>
            </section>
          )}
          {cards.map((card, i) => (
            <section
              key={card.id}
              data-i={i}
              className="feed-card flex flex-col px-5 pt-4"
              style={{ height: "var(--feed, 100%)" }}
              aria-roledescription="card"
              aria-label={`${i + 1} of ${cards.length}`}
            >
              <div className="min-h-0 flex-1 overflow-y-auto pb-2">
                {card.kind === "cover" && <CoverCard card={card} onOpenNotes={() => onOpenNotes(card.chapter)} />}
                {card.kind === "note" && <NoteCard card={card} />}
                {card.kind === "question" && (
                  <QuestionCard
                    question={card.question}
                    picked={picks[card.question.id] ?? null}
                    onPick={(idx) => choose(card.question, idx)}
                  />
                )}
              </div>
              <div className="flex shrink-0 items-center justify-between gap-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  disabled={i === 0}
                  className="tap min-h-11 rounded-full px-3 text-sm text-white/70 outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:opacity-30"
                >
                  Previous
                </button>
                {i === cards.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      locked.current.clear()
                      setPicks({})
                      setStack((n) => n + 1)
                    }}
                    className="tap min-h-11 rounded-full bg-white px-4 font-display text-sm font-bold uppercase text-[#10182a] outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  >
                    New stack
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="tap inline-flex min-h-11 items-center gap-1 rounded-full bg-white px-4 font-display text-sm font-bold uppercase text-[#10182a] outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  >
                    Next
                    {i === 0 && <ChevronUp className="feed-nudge size-4" aria-hidden />}
                  </button>
                )}
              </div>
            </section>
          ))}
          {asked.length > 0 && cards.length > 0 && index === cards.length - 1 && (
            <p className="sr-only">
              {hits} of {asked.length} questions correct in this stack.
            </p>
          )}
        </div>

        {asked.length > 0 && (
          <p className="sr-only" aria-live="polite">
            {hits} correct of {asked.length} answered
          </p>
        )}

        {chaptersOpen && (
          <div className="absolute inset-0 z-10 flex flex-col justify-end bg-black/50" role="dialog" aria-modal="true" aria-label="Chapters">
            <button type="button" className="min-h-0 flex-1" aria-label="Close chapters" onClick={() => setChaptersOpen(false)} />
            <div className="max-h-[75%] overflow-y-auto rounded-t-3xl bg-[#10182a] px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <p className="font-display text-lg font-bold uppercase">Chapters</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {BLOCKS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      setBlock(b.id)
                      setScope("all")
                    }}
                    className={`tap min-h-10 rounded-full px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                      block === b.id ? "bg-white text-[#10182a]" : "bg-white/10 text-white"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  setScope("all")
                  setChaptersOpen(false)
                }}
                className="tap mt-3 flex min-h-12 w-full items-center rounded-2xl bg-white/10 px-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                All of {BLOCKS.find((b) => b.id === block)?.label}
              </button>
              <div className="mt-2 grid gap-2">
                {(BLOCKS.find((b) => b.id === block)?.examChapters ?? []).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => {
                      setScope(n)
                      setChaptersOpen(false)
                    }}
                    className={`tap flex min-h-12 items-center gap-3 rounded-2xl px-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                      scope === n ? "bg-white text-[#10182a]" : "bg-white/10"
                    }`}
                  >
                    <span className="font-display text-lg font-bold">Ch. {n}</span>
                    <span className="text-sm">{chapterTitle(n)}</span>
                  </button>
                ))}
              </div>
              {asked.length > 0 && (
                <p className="mt-3 text-sm text-white/60">
                  This stack: {hits}/{asked.length} correct
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function CoverCard({ card, onOpenNotes }: { card: Extract<FeedCard, { kind: "cover" }>; onOpenNotes: () => void }) {
  return (
    <div className="flex h-full flex-col justify-center">
      <p className="font-display text-sm font-bold uppercase tracking-[0.22em] text-[#c4a035]">Chapter {card.chapter}</p>
      <h1 className="mt-2 font-display text-5xl font-extrabold uppercase leading-[0.9]">{card.title}</h1>
      <p className="mt-5 text-lg leading-relaxed text-white/80">{card.blurb}</p>
      <button
        type="button"
        onClick={onOpenNotes}
        className="tap mt-6 self-start rounded-full border border-white/25 px-4 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        Open full notes
      </button>
    </div>
  )
}

function NoteCard({ card }: { card: Extract<FeedCard, { kind: "note" }> }) {
  const term = card.kicker === "Term"
  return (
    <div className="flex h-full flex-col justify-center">
      <p className="font-display text-sm font-bold uppercase tracking-[0.22em] text-[#c4a035]">{card.kicker}</p>
      <p className="mt-2 text-xs uppercase tracking-widest text-white/50">
        Ch. {card.chapter}
        {term ? "" : ` · ${card.title}`}
      </p>
      <h2 className={`mt-4 font-extrabold leading-tight ${term ? "font-display text-4xl uppercase" : "text-2xl"}`}>{term ? card.title : card.body}</h2>
      {term && <p className="mt-4 text-lg leading-relaxed text-white/80">{card.body}</p>}
    </div>
  )
}

function QuestionCard({
  question,
  picked,
  onPick,
}: {
  question: Question
  picked: number | null
  onPick: (idx: number) => void
}) {
  const order = useMemo(() => shuffle(question.choices.map((_, idx) => idx), seedFrom(question.id)), [question.id])
  return (
    <div className="flex min-h-full flex-col justify-center py-2">
      <p className="font-display text-sm font-bold uppercase tracking-[0.22em] text-[#c4a035]">
        Test · Ch. {question.chapter} · {question.tag}
      </p>
      <h2 className="mt-3 text-xl font-medium leading-snug">{question.stem}</h2>
      <div className="mt-5 grid gap-2">
        {order.map((idx, visual) => {
          const show = picked !== null
          const right = idx === question.answer
          const mine = picked === idx
          let cls = "border-white/15 bg-white/10"
          if (show && right) cls = "border-emerald-400/70 bg-emerald-400/20"
          else if (show && mine) cls = "border-red-400/70 bg-red-400/15"
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onPick(idx)}
              className={`tap flex min-h-12 gap-3 rounded-2xl border px-3 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${cls}`}
            >
              <span className="font-display text-lg font-bold text-[#c4a035]">{ "ABCD"[visual] }</span>
              <span className="text-sm leading-snug">{question.choices[idx]}</span>
              {show && right && <Check className="ml-auto size-4 shrink-0 text-emerald-300" />}
              {show && mine && !right && <X className="ml-auto size-4 shrink-0 text-red-300" />}
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <p className="mt-4 text-sm leading-relaxed text-white/75">
          <span className="font-semibold text-white">{picked === question.answer ? "Correct. " : "Not this one. "}</span>
          {question.why}
        </p>
      )}
    </div>
  )
}
