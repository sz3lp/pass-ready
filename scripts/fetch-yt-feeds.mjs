import https from "https"

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          get(res.headers.location).then(resolve, reject)
          return
        }
        let d = ""
        res.on("data", (c) => (d += c))
        res.on("end", () => resolve({ status: res.statusCode, body: d }))
      })
      .on("error", reject)
  })
}

const feeds = [
  ["coach", "https://www.youtube.com/feeds/videos.xml?channel_id=UC6Pkyjskf0E8L8i_xpdsAmQ"],
  ["miramar", "https://www.youtube.com/feeds/videos.xml?user=Sandiegomiramaremtprogram6893"],
]

for (const [name, url] of feeds) {
  const r = await get(url)
  console.log("\n==", name, r.status, r.body.length)
  const ids = [...r.body.matchAll(/<yt:videoId>([^<]+)<\/yt:videoId>/g)].map((m) => m[1])
  const titles = [...r.body.matchAll(/<media:title>([^<]+)<\/media:title>/g)].map((m) => m[1])
  ids.forEach((id, i) => console.log(id, titles[i] || "?"))
}
