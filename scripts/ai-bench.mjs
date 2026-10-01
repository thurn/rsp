// Runs src/dev/bench.ts through Vite's SSR loader so the game code needs no build step.
import { createServer } from 'vite'

const USAGE = `scripts/ai-bench [--plain | --random-sigils N | --all-sigils [--min-per-sigil 3]]
  [--human 0] [--games N] [--rounds N] [--think MS | --iterations N] [--seed N] [--json]`

const o = {
  mode: 'plain',
  randomSigils: 0,
  minPerSigil: 3,
  human: null,
  games: Infinity,
  rounds: Infinity,
  think: 150,
  iterations: undefined,
  seed: 1,
}
let json = false
const args = process.argv.slice(2)
const num = (flag) => {
  const v = Number(args.shift())
  if (!Number.isFinite(v)) throw new Error(`${flag} needs a number\n${USAGE}`)
  return v
}
while (args.length) {
  const a = args.shift()
  if (a === '--plain') o.mode = 'plain'
  else if (a === '--random-sigils') ((o.mode = 'random'), (o.randomSigils = num(a)))
  else if (a === '--all-sigils') o.mode = 'all'
  else if (a === '--min-per-sigil') o.minPerSigil = num(a)
  else if (a === '--human') o.human = num(a)
  else if (a === '--games') o.games = num(a)
  else if (a === '--rounds') o.rounds = num(a)
  else if (a === '--think') o.think = num(a)
  else if (a === '--iterations') o.iterations = num(a)
  else if (a === '--seed') o.seed = num(a)
  else if (a === '--json') json = true
  else {
    console.log(USAGE)
    process.exit(a === '--help' ? 0 : 1)
  }
}
if (o.mode !== 'all' && o.games === Infinity && o.rounds === Infinity) o.games = 4

const server = await createServer({
  server: { middlewareMode: true, ws: false },
  appType: 'custom',
  logLevel: 'error',
})
try {
  const { runBench } = await server.ssrLoadModule('/src/dev/bench.ts')
  const result = runBench(o)
  if (json) console.log(JSON.stringify(result, null, 2))
  else print(result)
} finally {
  await server.close()
}

function print({ options, metrics: m, notes }) {
  const mode =
    options.mode === 'random' ? `random-sigils ${options.randomSigils}` : `${options.mode}`
  const search = options.iterations ? `${options.iterations} iterations` : `${options.think} ms`
  const rate = (r) => (r === null ? '—' : `${(r * 100).toFixed(1)}%`)
  const avg = (r) => (r === null ? '—' : r.toFixed(2))
  const rows = [
    ['Run', `${mode}, ${search}, seed ${options.seed}, human ${options.human ?? 'none'}`],
    ['Games / rounds / seconds', `${m.games} / ${m.rounds} / ${m.seconds}`],
    ['Team set rate', `${rate(m.setRate)} (${m.sets})`],
    ['Set rate, multiplier > 1×', `${rate(m.multSetRate)} (${m.multSets})`],
    ['Exact rate', rate(m.exactRate)],
    ['Bags per made contract', avg(m.bagsPerMade)],
    ['Mean |bid − tricks|', avg(m.meanBidError)],
    ['Nil success', `${rate(m.nilSuccess)} (${m.nils})`],
    ['Blind nil success', `${rate(m.blindNilSuccess)} (${m.blindNils})`],
    ['Wasted overtakes', `${rate(m.wastedOvertakeRate)} (${m.wastedOvertakes})`],
    ['Missed nil covers', `${rate(m.missedCoverRate)} (${m.missedCovers})`],
    ['Nil suicides', `${rate(m.nilSuicideRate)} (${m.nilSuicides})`],
    ['Sigils owned at end', avg(m.sigilsOwnedAtEnd)],
    ['Gold unspent at end', avg(m.goldUnspentAtEnd)],
    ['Rerolls', String(m.rerolls)],
    [
      'Sales',
      Object.entries(m.sales)
        .map(([c, n]) => `${c}×${n}`)
        .join(' ') || '0',
    ],
    ['console.error', String(m.errors)],
    ['Manual lines', String(m.manualLines)],
    ['Runaway drains', String(m.runawayDrains)],
    ['Stalls', String(m.stalls)],
  ]
  const w = Math.max(...rows.map((r) => r[0].length))
  for (const [k, v] of rows) console.log(`${k.padEnd(w)}  ${v}`)
  for (const e of m.errorSamples) console.log(`\nerror: ${e}`)
  for (const n of notes) console.log(`note: ${n}`)
}
