import https from "https"

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
          },
        },
        (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            get(new URL(res.headers.location, url).href).then(resolve, reject)
            return
          }
          let d = ""
          res.on("data", (c) => (d += c))
          res.on("end", () => resolve(d))
        },
      )
      .on("error", reject)
  })
}

const queries = [
  "EMT shock",
  "EMT airway",
  "EMT cardiac",
  "EMT stroke",
  "EMT respiratory",
  "EMT trauma assessment",
  "EMT medical assessment",
  "EMT anaphylaxis",
  "EMT diabetes",
  "EMT obstetrics",
  "EMT pediatric",
  "EMT bleeding",
  "EMT CPR AED",
  "EMT pharmacology",
  "EMT toxicology",
  "EMT spinal",
  "EMT chest injury",
  "NREMT review",
]

const seen = new Map()
for (const q of queries) {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent("TheParamedicCoach " + q)}`
  const html = await get(url)
  const re = /"videoId":"([a-zA-Z0-9_-]{11})".*?"title":\{"runs":\[\{"text":"(.*?)"\}/gs
  let m
  let n = 0
  while ((m = re.exec(html)) && n < 8) {
    const id = m[1]
    const title = m[2].replace(/\\u0026/g, "&").replace(/\\"/g, '"')
    if (!seen.has(id) && /paramedic|emt|nremt|shock|airway|assess|cardiac|stroke|trauma|anaphyl|diabet|ob|ped|bleed|cpr|aed|pharm|toxic|spinal|chest|respir/i.test(title)) {
      seen.set(id, title)
      console.log(id, "|", title)
      n++
    }
  }
}
console.log("unique", seen.size)
