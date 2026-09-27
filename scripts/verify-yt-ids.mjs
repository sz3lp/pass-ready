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

const ids = [
  "gARL40EjDPU", "hi4aWvRxeG4", "eF05-2KZSxw", "aR6X9Up_E5U", "iJkx4l9yLcw",
  "63DR8V33WIo", "X7n5VjwHlPA", "JgZ0e0kYPRw", "0Q09tDiY4RU", "1KAPfQQweM4",
  "R8eBmksj-aQ", "Seuwdg2xPno", "Vi9PYGC_r9U", "vJPTM8bXJmA", "bJSU8RsUpjY",
  "Fb1NP5lrYHs", "bC3eucmz90o", "QdY3UWnGwuw", "2U2iGjjUlTc", "ExRT-E-j_wI",
  "ZDnIVbqIqCc", "7rkXib9ZZH4", "WGbABC623m4", "py3Xk36sDbE", "e_XGlXBs-Ps",
  "Y6K4K-XtJmw", "v7mDL-0wUac", "jrC8XYfrPmM", "7Br8rrt4aCY", "8I_NMOi6xBQ",
  "0Ki7kam5mVM", "TU-nqXNPKgg", "ee5caYtXbyo", "xowTOf0gBv4", "qadeikxbiTE",
  "PgqImKpXGLw", "QmorYAecSgk", "g0Hkyo5h4qc", "8futBRhfnhs", "h9CCYfLozMY",
  "sDGN9kx48EQ", "fNZvfR1fGZ4", "gP-r3Q2gFdo", "B6zG-MMFjhc", "O11VL2wbzks",
  "sdJa8bzW6I4", "ECR3BWP15YM", "ztvtaP4JGpU", "Avv6bb5vrRw", "TqkVs5lfRvc",
  "mqyFwyzDF_Q", "jCug2T8_tZ8", "MSdKLorVhmU", "WQqcsavq9ic", "e_-tFw1BPU4",
]

for (const id of ids) {
  try {
    const j = JSON.parse(await get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`))
    console.log(id, "|", j.author_name, "|", j.title)
  } catch {
    console.log(id, "| FAIL")
  }
}
