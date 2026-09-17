import { useEffect, useMemo, useState } from "react"
import { ArrowRight, BookOpen, TriangleAlert } from "lucide-react"
import { BLOCKS, type BlockId } from "../data/syllabus"
import { primaryPath, studyPack, topicKeyForChapter, chapterTitle } from "../data/notes"
import { videosForTopic } from "../data/videos"
import { blockMeta } from "../lib/schedule"
import { masteryByChapter } from "../lib/storage"
import { useAppStore } from "../lib/store"
import { Panel, Pill, pctColor } from "../components/ui"
import { VideoLinks } from "../components/VideoLinks"
import type { View } from "../nav"

type Tab = "primary" | "weak"

export function LearnView({
  seedChapter,
  go,
}: {
  seedChapter?: number
  go: (v: View, extra?: string) => void
}) {
  const { store } = useAppStore()
  const live = blockMeta()
  const [tab, setTab] = useState<Tab>("primary")
  const [block, setBlock] = useState<BlockId>(live.id)
  const [active, setActive] = useState<number | null>(seedChapter ?? null)

  useEffect(() => {
    if (seedChapter) setActive(seedChapter)
  }, [seedChapter])

  const mastery = useMemo(() => masteryByChapter(store), [store])
  const weak = useMemo(() => {
    return mastery
      .filter((m) => m.weak)
      .sort((a, b) => (a.pct ?? 0) - (b.pct ?? 0))
      .map((m) => ({ ...m, title: chapterTitle(m.chapter), pack: studyPack(m.chapter) }))
  }, [mastery])

  const unseen = useMemo(() => {
    const seen = new Set(mastery.filter((m) => m.seen > 0).map((m) => m.chapter))
    return live.examChapters.filter((n) => !seen.has(n)).map((n) => ({
      chapter: n,
      title: chapterTitle(n),
      pack: studyPack(n),
    }))
  }, [mastery, live.examChapters])

  const path = primaryPath(block)

  if (active != null) {
    const pack = studyPack(active)
    const title = chapterTitle(active)
    const m = mastery.find((x) => x.chapter === active)
    const topic = topicKeyForChapter(active)
    const videos = topic ? videosForTopic(topic) : []
    const blockId = BLOCKS.find((b) => b.examChapters.includes(active))?.id

    return (
      <div className="grid gap-4">
        <button type="button" className="text-left text-sm text-tape" onClick={() => setActive(null)}>
          ← Learn hub
        </button>
        <Panel>
          <div className="flex flex-wrap gap-2">
            <Pill tone="tape">Ch. {active}</Pill>
            {blockId && <Pill>Block {blockId}</Pill>}
            {m?.pct != null ? (
              <Pill tone={m.weak ? "stop" : "go"}>{m.pct}% drill accuracy</Pill>
            ) : (
              <Pill>Not drilled yet</Pill>
            )}
          </div>
          <h1 className="mt-2 font-display text-3xl font-extrabold uppercase sm:text-4xl">{title}</h1>
          {pack ? (
            <p className="mt-3 text-sm leading-relaxed text-mute">{pack.blurb}</p>
          ) : (
            <p className="mt-3 text-sm text-mute">Study pack coming — drill the chapter bank meanwhile.</p>
          )}
          {pack?.kcNote && (
            <p className="mt-3 rounded-xl border border-warn/40 bg-warn/10 px-3 py-2 text-sm text-ink">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-warn">KC / local</span>
              <span className="mt-1 block">{pack.kcNote}</span>
            </p>
          )}
        </Panel>

        {pack && (
          <>
            <Panel>
              <h2 className="font-display text-xl font-bold uppercase">Must know</h2>
              <p className="mt-1 text-sm text-mute">Primary learning — recite these before you tap answers.</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-snug">
                {pack.mustKnow.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </Panel>

            <Panel>
              <h2 className="font-display text-xl font-bold uppercase">Exam traps</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-snug text-mute">
                {pack.traps.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </Panel>

            <Panel>
              <h2 className="font-display text-xl font-bold uppercase">Key terms</h2>
              <dl className="mt-3 grid gap-3">
                {pack.terms.map((t) => (
                  <div key={t.term} className="rounded-xl border border-line bg-raised px-3 py-2">
                    <dt className="font-display text-sm font-bold uppercase text-tape">{t.term}</dt>
                    <dd className="mt-1 text-sm text-mute">{t.def}</dd>
                  </div>
                ))}
              </dl>
            </Panel>
          </>
        )}

        {videos.length > 0 && (
          <Panel>
            <h2 className="font-display text-xl font-bold uppercase">Watch</h2>
            <div className="mt-3">
              <VideoLinks links={videos} note="Topic overviews — not a substitute for your textbook or lecture." />
            </div>
          </Panel>
        )}

        <Panel>
          <h2 className="font-display text-xl font-bold uppercase">Retrieve it</h2>
          <p className="mt-1 text-sm text-mute">Learning sticks when you close the notes and generate the answer.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => go("drill", `c${active}`)}
              className="rounded-xl bg-tape px-4 py-2 font-display text-lg font-bold uppercase text-paper"
            >
              Drill this chapter
            </button>
            <button
              type="button"
              onClick={() => go("drill", "call")}
              className="rounded-xl border border-line px-4 py-2 text-sm"
            >
              Call it (no peeking)
            </button>
          </div>
        </Panel>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      <Panel>
        <div className="flex items-start gap-3">
          <BookOpen className="mt-1 size-7 shrink-0 text-tape" aria-hidden />
          <div>
            <h1 className="font-display text-3xl font-extrabold uppercase">Learn</h1>
            <p className="mt-2 text-sm leading-relaxed text-mute">
              Primary learning first: chapter packs with must-knows, traps, and terms. Then fix weak spots the drill stats flag under 80%.
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTab("primary")}
            className={`rounded-full border px-3 py-1.5 text-xs ${tab === "primary" ? "border-tape text-tape" : "border-line text-mute"}`}
          >
            Primary learning
          </button>
          <button
            type="button"
            onClick={() => setTab("weak")}
            className={`rounded-full border px-3 py-1.5 text-xs ${tab === "weak" ? "border-tape text-tape" : "border-line text-mute"}`}
          >
            Weak spots {weak.length ? `(${weak.length})` : ""}
          </button>
        </div>
      </Panel>

      {tab === "primary" && (
        <>
          <Panel>
            <p className="font-display text-xs uppercase tracking-widest text-mute">Block path</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {BLOCKS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBlock(b.id)}
                  className={`rounded-full border px-3 py-1 text-xs ${block === b.id ? "border-tape text-tape" : "border-line text-mute"}`}
                >
                  {b.label}
                  {b.id === live.id ? " · now" : ""}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-mute">
              Work the chapters in order for {BLOCKS.find((b) => b.id === block)?.label}. Read the pack, watch if needed, then drill.
            </p>
          </Panel>

          {unseen.length > 0 && block === live.id && (
            <Panel className="border-tape/40">
              <p className="font-display text-xs uppercase tracking-widest text-tape">Start here · unread in this block</p>
              <div className="mt-3 grid gap-2">
                {unseen.slice(0, 4).map((u) => (
                  <button
                    key={u.chapter}
                    type="button"
                    onClick={() => setActive(u.chapter)}
                    className="flex items-center justify-between rounded-xl border border-line bg-raised px-3 py-3 text-left hover:border-tape/40"
                  >
                    <span>
                      <span className="font-display text-xs uppercase tracking-widest text-mute">Ch. {u.chapter}</span>
                      <span className="mt-0.5 block font-display text-lg font-bold uppercase">{u.title}</span>
                    </span>
                    <ArrowRight className="size-4 text-tape" />
                  </button>
                ))}
              </div>
            </Panel>
          )}

          <div className="grid gap-2">
            {path.map((row, idx) => {
              const m = mastery.find((x) => x.chapter === row.chapter)
              return (
                <button key={row.chapter} type="button" onClick={() => setActive(row.chapter)} className="text-left">
                  <Panel className="hover:border-tape/40">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-xs uppercase tracking-widest text-mute">
                          {idx + 1}. Ch. {row.chapter}
                        </p>
                        <h2 className="font-display text-xl font-bold uppercase">{row.title}</h2>
                        <p className="mt-1 line-clamp-2 text-sm text-mute">{row.pack?.blurb ?? "Open for the study pack."}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        {m?.pct != null ? (
                          <p className={`font-display text-lg font-bold ${pctColor(m.pct)}`}>{m.pct}%</p>
                        ) : (
                          <Pill>new</Pill>
                        )}
                      </div>
                    </div>
                  </Panel>
                </button>
              )
            })}
          </div>
        </>
      )}

      {tab === "weak" && (
        <>
          {weak.length === 0 ? (
            <Panel>
              <div className="flex items-start gap-3">
                <TriangleAlert className="mt-1 size-6 text-mute" aria-hidden />
                <div>
                  <h2 className="font-display text-2xl font-bold uppercase">No weak spots yet</h2>
                  <p className="mt-2 text-sm text-mute">
                    Drill until some chapters sit under 80% accuracy — then this list becomes your remediation queue. Unseen chapters for this block still live under Primary learning.
                  </p>
                  <button
                    type="button"
                    onClick={() => setTab("primary")}
                    className="mt-4 rounded-xl bg-tape px-4 py-2 font-display font-bold uppercase text-paper"
                  >
                    Open primary path
                  </button>
                </div>
              </div>
            </Panel>
          ) : (
            <>
              <Panel>
                <h2 className="font-display text-2xl font-bold uppercase">Under 80%</h2>
                <p className="mt-2 text-sm text-mute">
                  Re-read the pack, then drill that chapter until the accuracy climbs. Order is worst-first.
                </p>
              </Panel>
              {weak.map((w) => (
                <button key={w.chapter} type="button" onClick={() => setActive(w.chapter)} className="text-left">
                  <Panel className="border-stop/30 hover:border-tape/40">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-xs uppercase tracking-widest text-stop">
                          Ch. {w.chapter} · {w.seen} attempts
                        </p>
                        <h2 className="font-display text-xl font-bold uppercase">{w.title}</h2>
                        <p className="mt-1 line-clamp-2 text-sm text-mute">{w.pack?.blurb}</p>
                      </div>
                      <p className={`shrink-0 font-display text-2xl font-bold ${pctColor(w.pct ?? 0)}`}>{w.pct}%</p>
                    </div>
                  </Panel>
                </button>
              ))}
              <Panel>
                <button
                  type="button"
                  onClick={() => go("drill")}
                  className="rounded-xl border border-line px-4 py-2 text-sm"
                >
                  Open Drill → Missed (&lt;80%) pool
                </button>
              </Panel>
            </>
          )}
        </>
      )}
    </div>
  )
}
