/**
 * Merge seed instructor B2 items with extras → 5× pool (~350).
 * Run: npx tsx scripts/merge-instructor-b2.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const seedPath = path.join(root, "src/data/questions-instructor-b2.ts")
const extraDir = path.join(root, "scripts/instructor-b2-extra")
const outPath = seedPath

const CHAPTERS = [
  { n: 15, title: "15 · Medical Overview" },
  { n: 16, title: "16 · Respiratory" },
  { n: 17, title: "17 · Cardiovascular" },
  { n: 18, title: "18 · Neurologic" },
  { n: 30, title: "30 · Chest Injuries (Sakoda lecture)" },
  { n: 31, title: "31 · Abd / GU (DeBay lecture)" },
  { n: 32, title: "32 · Ortho (Bothwell lecture)" },
]

async function loadSeeds() {
  // Prefer frozen seeds JSON if present (avoids importing the file we're about to overwrite).
  const frozen = path.join(extraDir, "seeds.json")
  if (fs.existsSync(frozen)) {
    return JSON.parse(fs.readFileSync(frozen, "utf8"))
  }
  const mod = await import(pathToFileURL(seedPath).href)
  const by = {}
  for (const q of mod.INSTRUCTOR_B2) {
    ;(by[q.chapter] ??= []).push({
      tag: q.tag,
      stem: q.stem,
      choices: q.choices,
      answer: q.answer,
      why: q.why,
    })
  }
  // Freeze original 10/chapter so re-runs stay stable after expansion.
  if (Object.values(by).every((a) => a.length === 10)) {
    fs.writeFileSync(frozen, JSON.stringify(by, null, 2) + "\n")
  }
  return by
}

function loadExtras() {
  const byChapter = {}
  for (const f of fs.readdirSync(extraDir).filter((x) => x.endsWith(".json") && x !== "seeds.json")) {
    const data = JSON.parse(fs.readFileSync(path.join(extraDir, f), "utf8"))
    for (const [k, arr] of Object.entries(data)) {
      const n = Number(k)
      if (!Array.isArray(arr)) throw new Error(`${f}: ${k} not array`)
      byChapter[n] = (byChapter[n] ?? []).concat(arr)
    }
  }
  return byChapter
}

function validateDraft(d, ctx) {
  if (!d.stem || !d.why || !d.tag) throw new Error(`${ctx}: missing fields`)
  if (!Array.isArray(d.choices) || d.choices.length !== 4) throw new Error(`${ctx}: need 4 choices`)
  if (![0, 1, 2, 3].includes(d.answer)) throw new Error(`${ctx}: bad answer ${d.answer}`)
  for (const c of d.choices) if (typeof c !== "string" || !c.trim()) throw new Error(`${ctx}: empty choice`)
}

function esc(s) {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
}

function emitDraft(d, indent = "    ") {
  const choices = d.choices.map((c) => `${indent}    "${esc(c)}"`).join(",\n")
  return `${indent}{
${indent}  tag: "${esc(d.tag)}",
${indent}  stem: "${esc(d.stem)}",
${indent}  choices: [
${choices},
${indent}  ],
${indent}  answer: ${d.answer},
${indent}  why: "${esc(d.why)}",
${indent}}`
}

function stemKey(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()
}

async function main() {
  // Freeze original 10/chapter seeds before overwrite (from current or /tmp export).
  const frozenPath = path.join(extraDir, "seeds.json")
  if (!fs.existsSync(frozenPath) && fs.existsSync("/tmp/ib2-seeds.json")) {
    fs.copyFileSync("/tmp/ib2-seeds.json", frozenPath)
  }

  const seedsByChapter = await loadSeeds()
  const extras = loadExtras()
  const merged = {}

  for (const { n } of CHAPTERS) {
    const seeds = seedsByChapter[n] ?? seedsByChapter[String(n)]
    if (!seeds?.length) throw new Error(`no seeds for chapter ${n}`)
    // Keep only the original 10 if re-running after expansion
    const base = seeds.slice(0, 10)
    const add = extras[n] ?? []
    if (add.length < 40) throw new Error(`chapter ${n}: expected ≥40 extras, got ${add.length}`)
    const seen = new Set(base.map((d) => stemKey(d.stem)))
    const uniqueAdd = []
    for (const d of add) {
      validateDraft(d, `ch${n}`)
      const k = stemKey(d.stem)
      if (seen.has(k)) {
        console.warn(`skip near-dup ch${n}: ${d.stem.slice(0, 60)}…`)
        continue
      }
      seen.add(k)
      uniqueAdd.push(d)
    }
    const picked = uniqueAdd.slice(0, 40)
    if (picked.length < 40) {
      throw new Error(`chapter ${n}: only ${picked.length} unique extras after dedupe (need 40)`)
    }
    merged[n] = [...base, ...picked]
    console.log(`ch${n}: ${base.length} seed + ${picked.length} extra = ${merged[n].length}`)
  }

  const total = Object.values(merged).reduce((a, b) => a + b.length, 0)

  const packs = CHAPTERS.map(({ n, title }) => {
    const body = merged[n].map((d) => emitDraft(d)).join(",\n")
    return `  // ───────────────────────── ${title} ─────────────────────────
  ...pack(${n}, [
${body},
  ]),`
  }).join("\n\n")

  const out = `import type { Question } from "./questions"

/**
 * Block II practice written in KCEMS / Advantage Access instructor style.
 * Tuned from the Block I final pattern (short AAOS recall, EXCEPT, light scenarios)
 * plus Shelby / Gabriel / Brandon lecture decks for Ch. 30–32.
 *
 * Pool ~${total} items (5× the original 70) · Ch. 15, 16, 17, 18, 30, 31, 32 · ~50 each.
 * Practice form still draws 70 with chapter balance — larger pool = fresher repeats.
 *
 * Extras live in scripts/instructor-b2-extra/*.json — regenerate with:
 *   npx tsx scripts/merge-instructor-b2.mjs
 */

type Draft = {
  stem: string
  choices: [string, string, string, string]
  answer: 0 | 1 | 2 | 3
  why: string
  tag: string
}

function pack(chapter: number, drafts: Draft[]): Question[] {
  return drafts.map((d, i) => ({
    id: \`ib2-c\${chapter}-\${i + 1}\`,
    chapter,
    block: 2 as const,
    difficulty: "exam" as const,
    ...d,
  }))
}

export const INSTRUCTOR_B2: Question[] = [
${packs}
]
`

  fs.writeFileSync(outPath, out)
  console.log(`wrote ${outPath} (${total} questions)`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
