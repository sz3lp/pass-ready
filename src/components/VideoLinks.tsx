import { CHANNELS, channelLabel, type VideoLink } from "../data/videos"

export function VideoLinks({
  links,
  note,
}: {
  links: VideoLink[]
  note?: string
}) {
  if (!links.length) return null
  return (
    <div className="grid gap-2">
      {note && <p className="text-xs text-mute">{note}</p>}
      {links.map((v) => (
        <a
          key={`${v.channel}-${v.url}-${v.title}`}
          href={v.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-start justify-between gap-3 rounded-xl border border-line bg-raised px-3 py-2 text-left hover:border-tape/40"
        >
          <span>
            <span className="block font-display text-[11px] uppercase tracking-widest text-tape">
              {channelLabel(v.channel)}
              {v.channel === "miramar" && v.url.includes("search") ? " · channel search" : ""}
              {v.channel === "miramar" && v.url.includes("sites.google") ? " · skills page" : ""}
            </span>
            <span className="mt-0.5 block text-sm text-ink">{v.title}</span>
          </span>
          <span className="shrink-0 text-xs text-tape">Watch →</span>
        </a>
      ))}
      <div className="flex flex-wrap gap-3 pt-1 text-xs text-mute">
        <a href={CHANNELS["paramedic-coach"].url} target="_blank" rel="noreferrer" className="text-tape">
          {CHANNELS["paramedic-coach"].handle}
        </a>
        <a href={CHANNELS.miramar.url} target="_blank" rel="noreferrer" className="text-tape">
          {CHANNELS.miramar.handle}
        </a>
      </div>
    </div>
  )
}
