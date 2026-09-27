import https from "https"

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        let d = ""
        res.on("data", (c) => (d += c))
        res.on("end", () => resolve(d))
      })
      .on("error", reject)
  })
}

const more = [
  "g0Hkyo5h4qc", // vitals - verified
  // search more
]

const queries = [
  "TheParamedicCoach aspirin",
  "TheParamedicCoach nitroglycerin",
  "TheParamedicCoach lifting moving",
  "TheParamedicCoach medical legal",
  "TheParamedicCoach anatomy",
  "TheParamedicCoach bleeding control",
  "TheParamedicCoach spinal immobilization",
  "TheParamedicCoach soft tissue burn",
  "TheParamedicCoach environmental heat cold",
  "TheParamedicCoach toxicology overdose",
  "TheParamedicCoach behavioral",
  "TheParamedicCoach ambulance operations",
  "TheParamedicCoach extrication",
  "TheParamedicCoach geriatric",
]

const ids = new Set()
for (const q of queries) {
  const html = await get(`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`)
  for (const m of html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)) ids.add(m[1])
}

let n = 0
for (const id of ids) {
  if (n > 80) break
  try {
    const j = JSON.parse(await get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`))
    if (/paramedic coach/i.test(j.author_name)) {
      console.log(id, "|", j.title)
      n++
    }
  } catch {}
}
