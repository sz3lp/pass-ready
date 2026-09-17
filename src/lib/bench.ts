import { ASSESSMENTS, BENCH_THRESHOLD, FINAL_THRESHOLD, type AssessmentId } from "../data/syllabus"

export type BenchResult = {
  entered: { id: AssessmentId; label: string; score: number }[]
  missing: AssessmentId[]
  average: number | null
  remaining: number
  needEach: number | null
  onTrack: boolean | null
  salvageable: boolean
  message: string
}

export function computeBench(scores: Partial<Record<AssessmentId, number>>): BenchResult {
  const entered = ASSESSMENTS.flatMap((a) => {
    const score = scores[a.id]
    if (score === undefined || Number.isNaN(score)) return []
    return [{ id: a.id, label: a.label, score }]
  })
  const missing = ASSESSMENTS.filter((a) => scores[a.id] === undefined || Number.isNaN(scores[a.id]!)).map((a) => a.id)
  const remaining = missing.length

  if (entered.length === 0) {
    return {
      entered,
      missing,
      average: null,
      remaining,
      needEach: BENCH_THRESHOLD,
      onTrack: null,
      salvageable: true,
      message: `Nine numbered scores feed the 80% gate (4 block exams + 5 quizzes). You need ${BENCH_THRESHOLD}% as a simple average of those nine to sit the final written.`,
    }
  }

  const sum = entered.reduce((acc, x) => acc + x.score, 0)
  const average = sum / entered.length
  const totalSlots = ASSESSMENTS.length
  const needSum = BENCH_THRESHOLD * totalSlots - sum
  const needEach = remaining === 0 ? null : needSum / remaining
  const onTrack = remaining === 0 ? average >= BENCH_THRESHOLD : (needEach !== null && needEach <= 100)
  const salvageable = remaining === 0 ? average >= BENCH_THRESHOLD : needEach !== null && needEach <= 100

  let message: string
  if (remaining === 0) {
    message = average >= BENCH_THRESHOLD
      ? `Bench locked at ${average.toFixed(1)}%. You can sit the final written. You still need ${FINAL_THRESHOLD}% on that 150-question test to reach Saturday practicals.`
      : `Bench finished at ${average.toFixed(1)}% — under ${BENCH_THRESHOLD}%. Talk to the lead instructor now; do not wait until finals week.`
  } else if (needEach !== null && needEach <= 70) {
    message = `On the 80-line. Average the remaining ${remaining} assessments at about ${Math.ceil(needEach)}% and you still sit the final.`
  } else if (needEach !== null && needEach <= 80) {
    message = `Stay on the bench. You need about ${Math.ceil(needEach)}% on each of the ${remaining} remaining quizzes/blocks. That is the class average, not a hero score — but it is not optional.`
  } else if (needEach !== null && needEach <= 92) {
    message = `Yellow line. Remaining scores need to average about ${Math.ceil(needEach)}%. Build a crew drill on your weak chapters this week.`
  } else if (needEach !== null && needEach <= 100) {
    message = `Red line. You must average about ${Math.ceil(needEach)}% on everything left. That is salvageable only if the crew studies with you, not for you.`
  } else {
    message = `Math says the 80% gate is already out of reach even with 100s from here. Still sit every test and talk to faculty — the bench is a progression rule, not a reason to ghost.`
  }

  return { entered, missing, average, remaining, needEach, onTrack, salvageable, message }
}

export function courseGradePreview(scores: Partial<Record<AssessmentId, number>>, finalPct: number | null) {
  const blocks = (["b1", "b2", "b3", "b4"] as const).map((id) => scores[id])
  const quizzes = (["q1", "q2", "q3", "q4", "q5"] as const).map((id) => scores[id])
  const blockAvg = average(blocks)
  const quizAvg = average(quizzes)
  if (blockAvg === null || quizAvg === null) return null
  const quizShare = quizAvg * 0.1
  const blockShare = blockAvg * 0.6
  const finalShare = (finalPct ?? 0) * 0.3
  const known = blockShare + quizShare + (finalPct === null ? 0 : finalShare)
  const maxStill = blockShare + quizShare + 0.3 * 100
  return { known, maxStill, blockAvg, quizAvg }
}

function average(values: (number | undefined)[]) {
  const nums = values.filter((v): v is number => v !== undefined && !Number.isNaN(v))
  if (nums.length === 0) return null
  if (nums.length !== values.length) return null
  return nums.reduce((a, b) => a + b, 0) / nums.length
}
