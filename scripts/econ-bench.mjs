// Runs src/dev/econ.ts through Vite's SSR loader and prints game lengths and shop gold.
import os from 'node:os'
import path from 'node:path'
import { createServer } from 'vite'

const USAGE = 'scripts/econ-bench [--games N] [--seed N] [--iterations N] [--json]'
const o = { games: 20, seed: 1, iterations: 120 }
let json = false
const args = process.argv.slice(2)
while (args.length) {
  const a = args.shift()
  if (a === '--json') json = true
  else if (['--games', '--seed', '--iterations'].includes(a)) o[a.slice(2)] = Number(args.shift())
  else {
    console.log(USAGE)
    process.exit(a === '--help' ? 0 : 1)
  }
}

const server = await createServer({
  server: { middlewareMode: true, ws: false },
  appType: 'custom',
  logLevel: 'error',
  optimizeDeps: { noDiscovery: true },
  cacheDir: path.join(os.tmpdir(), `rsp-econ-bench-${process.pid}`),
})
try {
  const { runEcon } = await server.ssrLoadModule('/src/dev/econ.ts')
  const games = runEcon(o.games, o.seed, o.iterations)
  if (json) console.log(JSON.stringify(games))
  else print(games)
} finally {
  await server.close()
}

function print(games) {
  const lengths = {}
  for (const g of games) lengths[g.rounds] = (lengths[g.rounds] ?? 0) + 1
  const mean = games.reduce((a, g) => a + g.rounds, 0) / games.length
  console.log(`${games.length} games, mean ${mean.toFixed(2)} rounds`)
  console.log(`Rounds per game: ${JSON.stringify(lengths)}`)
  for (let i = 0; i < 13; i++) {
    const gold = games.flatMap((g) => g.shopGold[i] ?? []).sort((a, b) => a - b)
    if (!gold.length) continue
    const q = (f) => gold[Math.floor(f * (gold.length - 1))]
    console.log(
      `Shop before round ${String(i + 1).padStart(2)}: median ${q(0.5)} gold (p25 ${q(0.25)}, p75 ${q(0.75)}), ${gold.length} seats`,
    )
  }
}
