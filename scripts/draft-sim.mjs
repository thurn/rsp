// Monte Carlo of drafting toward one archetype through the shop. A dev tool, not part of scripts/ci.
// It models the shop from data/balance.json and data/sigils, and gold and game length from
// self-play measurements (scripts/econ-bench), so shop levers can be compared without playing hands.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const USAGE = `scripts/draft-sim [--strategy commit|flex] [--trials N] [--seed N]
  [--core N] [--payoffs N] [--by ROUND] [--rerolls none|smart|N] [--reserve GOLD]
  [--offers N] [--buys N] [--reroll-base G] [--reroll-step G] [--rarity C,U,R]
  [--affinity X] [--run-archetypes K] [--rounds N | --lengths LEN:N,...] [--json]

  commit   pick the archetype before the opening shop (reported per archetype)
  flex     buy whatever most advances the best-looking archetype, decide late
  --core/--payoffs   "online" = N core sigils of the archetype including N payoffs (5/2)
  --by               also report how often the build is online before this round (7)
  --rerolls          none, smart (reroll for a core offer while gold stays above --reserve), or a
                     per-shop cap on smart rerolls
  --featured N       N extra offers each shop from your archetype's core sigils (flex: its lean,
                     or any of the run's archetypes before it owns two sigils)
  --affinity X       offer weight ×(1+X) for sigils sharing a colored resonance you own
  --run-archetypes K each run's pool holds only K random archetypes' sigils plus Gray
  --buys N           purchases per shop, 0 for no limit; a full collection sells a non-core
                     sigil to make room for a core one
  --rounds N         play exactly N rounds instead of sampling measured game lengths
  --lengths          game-length histogram to sample, e.g. 8:11,9:13,10:14 (scripts/econ-bench)`

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const BALANCE = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/balance.json'), 'utf8'))
const SIGILS = fs
  .readdirSync(path.join(ROOT, 'data/sigils'))
  .map((f) => JSON.parse(fs.readFileSync(path.join(ROOT, 'data/sigils', f), 'utf8')))

const ARCHETYPES = [
  'High Card',
  'Spade Master',
  'Kingmaker',
  'Contract Attacker',
  'Bonus Chaser',
  'Diamond Flood',
  'Gold Miner',
  'Swap Meet',
  'Blind Bidder',
  'While Held',
  'Heart Chorus',
  'Discard Dominance',
  'Exact Contractor',
  'Nil Champion',
  'Nil Guard',
]

// Rounds per game from 80 four-AI self-play games with the full pool and one buy per shop
// (scripts/econ-bench); with no buy limit it measured 4:1,6:3,7:10,8:14,9:18,10:13,11:5,12:6,13:10.
let GAME_LENGTHS = { 6: 3, 7: 4, 8: 11, 9: 13, 10: 14, 11: 8, 12: 7, 13: 20 }
// A team's tricks per round: mean 6.5, roughly normal.
const TRICK_SD = 1.8

const o = {
  strategy: 'commit',
  trials: 4000,
  seed: 1,
  core: 5,
  payoffs: 2,
  by: 7,
  rerolls: 'smart',
  reserve: 70,
  offers: BALANCE.shop.offers,
  buys: 1,
  rerollBase: BALANCE.shop.rerollBaseCost,
  rerollStep: BALANCE.shop.rerollCostStep,
  rarity: Object.values(BALANCE.shop.rarityOdds),
  affinity: 0,
  featured: 0,
  runArchetypes: 15,
  rounds: 0,
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
  if (a === '--strategy') o.strategy = args.shift()
  else if (a === '--trials') o.trials = num(a)
  else if (a === '--seed') o.seed = num(a)
  else if (a === '--core') o.core = num(a)
  else if (a === '--payoffs') o.payoffs = num(a)
  else if (a === '--by') o.by = num(a)
  else if (a === '--rerolls') o.rerolls = args.shift()
  else if (a === '--reserve') o.reserve = num(a)
  else if (a === '--offers') o.offers = num(a)
  else if (a === '--buys') o.buys = num(a)
  else if (a === '--reroll-base') o.rerollBase = num(a)
  else if (a === '--reroll-step') o.rerollStep = num(a)
  else if (a === '--rarity') o.rarity = (args.shift() ?? '').split(',').map(Number)
  else if (a === '--affinity') o.affinity = num(a)
  else if (a === '--featured') o.featured = num(a)
  else if (a === '--run-archetypes') o.runArchetypes = num(a)
  else if (a === '--rounds') o.rounds = num(a)
  else if (a === '--lengths')
    GAME_LENGTHS = Object.fromEntries(
      (args.shift() ?? '').split(',').map((x) => x.split(':').map(Number)),
    )
  else if (a === '--json') json = true
  else {
    console.log(USAGE)
    process.exit(a === '--help' ? 0 : 1)
  }
}
if (!['commit', 'flex'].includes(o.strategy)) throw new Error(USAGE)
const buyLimit = o.buys || Infinity
const rerollCap = o.rerolls === 'none' ? 0 : o.rerolls === 'smart' ? Infinity : Number(o.rerolls)

// Core archetypes are the named ones before the `;` in a sigil's archetypes line; "(splash)"
// entries and everything after the `;` are splashes.
const SIGIL = SIGILS.map((s) => {
  const [primary, splash = ''] = (s.archetypes ?? '').split(';')
  const named = (text) => ARCHETYPES.filter((a) => text.includes(a))
  const core = primary
    .split(',')
    .filter((x) => !/splash|\(/i.test(x))
    .flatMap(named)
  return {
    code: s.code,
    rarity: s.rarity,
    price: s.price,
    colors: s.resonances.filter((r) => r !== 'Gray'),
    gray: s.resonances.includes('Gray'),
    payoff: /^payoff/i.test(s.role ?? ''),
    core: new Set(core),
    splash: new Set([
      ...named(splash),
      ...primary
        .split(',')
        .filter((x) => /\(/.test(x))
        .flatMap(named),
    ]),
  }
})
const RARITIES = ['Common', 'Uncommon', 'Rare']

let seed = o.seed >>> 0
function rand() {
  seed = (seed + 0x6d2b79f5) >>> 0
  let t = seed
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}
const pick = (list) => list[Math.floor(rand() * list.length)]
function normal() {
  return Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand())
}
function gameLength() {
  if (o.rounds) return o.rounds
  const total = Object.values(GAME_LENGTHS).reduce((a, b) => a + b, 0)
  let r = rand() * total
  for (const [len, n] of Object.entries(GAME_LENGTHS)) if ((r -= n) < 0) return Number(len)
  return 13
}

/** Mirrors rollOffers in src/game/shop.ts, plus the optional resonance affinity weight. */
function rollOffers(run, opening) {
  const owned = new Set(run.owned.map((s) => s.code))
  const colors = new Set(run.owned.flatMap((s) => s.colors))
  const weight = (s) => (o.affinity && s.colors.some((c) => colors.has(c)) ? 1 + o.affinity : 1)
  const offers = []
  const take = (list) => {
    const free = list.filter((s) => !owned.has(s.code) && !offers.includes(s))
    if (free.length === 0) return false
    let r = rand() * free.reduce((a, s) => a + weight(s), 0)
    offers.push(free.find((s) => (r -= weight(s)) < 0) ?? free.at(-1))
    return true
  }
  for (let i = 0; i < o.offers; i++) {
    let r = rand()
    let rarity = 'Common'
    for (let k = 0; k < RARITIES.length; k++)
      if ((r -= o.rarity[k]) < 0) {
        rarity = RARITIES[k]
        break
      }
    if (!take(run.pool.filter((s) => s.rarity === rarity))) take(run.pool)
  }
  if (o.featured) {
    const focus = run.target ? [run.target] : run.owned.length >= 2 ? [lean(run)] : run.archetypes
    const core = run.pool.filter((s) => focus.some((a) => s.core.has(a)))
    for (let i = 0; i < o.featured; i++) take(core)
  }
  if (opening && !offers.some((s) => s.price <= BALANCE.shop.openingAffordablePrice)) {
    const free = run.pool.filter(
      (s) => s.price <= BALANCE.shop.openingAffordablePrice && !offers.includes(s),
    )
    offers[Math.floor(rand() * offers.length)] = pick(free)
  }
  return offers
}

const coreOf = (run, a) => run.owned.filter((s) => s.core.has(a))
const payoffsOf = (run, a) => coreOf(run, a).filter((s) => s.payoff).length
const online = (run, a) => coreOf(run, a).length >= o.core && payoffsOf(run, a) >= o.payoffs

/** How much an offer advances archetype `a`: core beats splash beats Gray; payoffs while short. */
function fit(run, a, s) {
  if (s.core.has(a)) {
    const needPayoff = payoffsOf(run, a) < o.payoffs
    const needEnabler = coreOf(run, a).length - payoffsOf(run, a) < o.core - o.payoffs
    return 10 + (s.payoff ? (needPayoff ? 3 : 0) : needEnabler ? 3 : 0) + RARITIES.indexOf(s.rarity)
  }
  if (s.splash.has(a)) return 2
  return s.gray ? 1 : 0
}

/** The archetype a flex drafter leans toward now: most core sigils owned, then a random tiebreak. */
function lean(run) {
  let best = null
  let bestScore = -1
  for (const a of run.archetypes) {
    const score = coreOf(run, a).length * 10 + payoffsOf(run, a) + rand()
    if (score > bestScore) ((best = a), (bestScore = score))
  }
  return best
}

/** The offer to buy; a buy past the first must be core, so filler never eats reroll gold. */
function bestOffer(run, offers, gold, bought) {
  let best = null
  let bestFit = 0
  for (const s of offers) {
    if (s.price > gold || (bought > 0 && !isCore(run, s))) continue
    const f =
      o.strategy === 'commit'
        ? fit(run, run.target, s)
        : Math.max(...run.archetypes.map((a) => fit(run, a, s) + coreOf(run, a).length))
    if (f > bestFit) ((best = s), (bestFit = f))
  }
  return best
}

function isCore(run, s) {
  if (o.strategy === 'commit') return s.core.has(run.target)
  // A flex drafter only rerolls for its current lean once it has one.
  const a = run.owned.length >= 2 ? lean(run) : null
  return a ? s.core.has(a) : [...s.core].some((x) => run.archetypes.includes(x))
}

function playRun(target) {
  const chosen = o.runArchetypes >= 15 ? ARCHETYPES : shuffle(ARCHETYPES).slice(0, o.runArchetypes)
  if (target && !chosen.includes(target)) chosen[0] = target
  // Gray sigils built for no archetype in particular stay in every run's pool.
  const pool = SIGIL.filter(
    (s) => (s.gray && s.core.size === 0) || [...s.core].some((a) => chosen.includes(a)),
  )
  const run = { target, archetypes: chosen, pool, owned: [], gold: BALANCE.game.startingGold }
  const rounds = gameLength()
  let onlineAt = null
  let rerollsUsed = 0
  let sells = 0
  let deadShops = 0
  let ownedBy = 0
  for (let round = 1; round <= rounds; round++) {
    let offers = rollOffers(run, round === 1)
    if (!offers.some((s) => isCore(run, s))) deadShops++
    let bought = 0
    let rerolls = 0
    for (;;) {
      if (bought >= buyLimit) break
      const full = run.owned.length >= BALANCE.shop.maxSigils
      const hasCore = offers.some((s) => isCore(run, s) && s.price <= run.gold)
      const cost = o.rerollBase + o.rerollStep * rerolls
      if (!hasCore && rerolls < rerollCap && run.gold - cost >= o.reserve) {
        run.gold -= cost
        rerolls++
        offers = rollOffers(run, false)
        continue
      }
      // A full collection sells its least useful non-core sigil, at half price, for a core offer.
      const junk = full
        ? run.owned
            .filter((x) => !isCore(run, x))
            .sort(
              (x, y) => fit(run, run.target ?? lean(run), x) - fit(run, run.target ?? lean(run), y),
            )[0]
        : null
      if (full && !junk) break
      const refund = junk ? Math.floor(junk.price / 2 / 5) * 5 : 0
      const s = bestOffer(run, offers, run.gold + refund, full ? 1 : bought)
      if (!s) break
      if (junk) {
        run.owned = run.owned.filter((x) => x !== junk)
        run.gold += refund
        sells++
      }
      run.gold -= s.price
      run.owned.push(s)
      offers = offers.filter((x) => x !== s)
      bought++
    }
    rerollsUsed += rerolls
    if (round === o.by) ownedBy = run.owned.length
    const a = target ?? lean(run)
    if (onlineAt === null && online(run, a)) onlineAt = round
    // The round: 10 gold per team trick to each partner, then interest on what is banked.
    const tricks = Math.max(0, Math.min(13, Math.round(6.5 + TRICK_SD * normal())))
    const { goldPerTrick, interestPer, interestStep, interestCap } = BALANCE.income
    run.gold +=
      goldPerTrick * tricks +
      Math.min(interestCap, Math.floor(run.gold / interestStep) * interestPer)
  }
  const a = target ?? lean(run)
  return {
    archetype: a,
    rounds,
    onlineAt,
    core: coreOf(run, a).length,
    owned: run.owned.length,
    rerolls: rerollsUsed,
    sells,
    deadShops: deadShops / rounds,
    ownedBy: rounds >= o.by ? ownedBy : null,
  }
}

function shuffle(list) {
  const out = list.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

function summarize(results) {
  const n = results.length
  const mean = (f) => results.reduce((a, r) => a + f(r), 0) / n
  return {
    runs: n,
    onlineByEnd: mean((r) => (r.onlineAt !== null ? 1 : 0)),
    onlineBy: mean((r) => (r.onlineAt !== null && r.onlineAt <= o.by ? 1 : 0)),
    medianOnlineRound: median(results.map((r) => r.onlineAt ?? Infinity)),
    coreAtEnd: mean((r) => r.core),
    focus: mean((r) => (r.owned ? r.core / r.owned : 0)),
    rerollsPerRun: mean((r) => r.rerolls),
    sellsPerRun: mean((r) => r.sells),
    deadShops: mean((r) => r.deadShops),
    ownedBy: (() => {
      const xs = results.filter((r) => r.ownedBy !== null)
      return xs.reduce((a, r) => a + r.ownedBy, 0) / xs.length
    })(),
  }
}
const median = (xs) => {
  const s = xs.sort((a, b) => a - b)
  return s[s.length >> 1]
}

// Commit plays `trials` runs per archetype; flex plays as many runs in total and reports each
// archetype it ended up in, with its share of runs.
const results =
  o.strategy === 'commit'
    ? ARCHETYPES.flatMap((a) => Array.from({ length: o.trials }, () => playRun(a)))
    : Array.from({ length: o.trials * ARCHETYPES.length }, () => playRun(null))
const rows = {}
for (const a of ARCHETYPES) {
  const mine = results.filter((r) => r.archetype === a)
  if (mine.length) rows[a] = { ...summarize(mine), share: mine.length / results.length }
}
rows.All = summarize(results)
const pool = Object.fromEntries(
  ARCHETYPES.map((a) => [a, SIGIL.filter((s) => s.core.has(a)).length]),
)

if (json) console.log(JSON.stringify({ options: o, pool, rows }, null, 2))
else {
  console.log(
    `${o.strategy}, online = ${o.core} core incl. ${o.payoffs} payoffs, rerolls ${o.rerolls}, ` +
      `offers ${o.offers}, buys ${o.buys || '∞'}, reroll ${o.rerollBase}+${o.rerollStep}, ` +
      `rarity ${o.rarity.join('/')}, affinity ${o.affinity}, featured ${o.featured}, archetypes/run ${o.runArchetypes}, ` +
      `${o.rounds ? `${o.rounds} rounds` : `game lengths ${JSON.stringify(GAME_LENGTHS)}`}, ${o.trials} trials`,
  )
  const pct = (x) => `${(x * 100).toFixed(0)}%`.padStart(5)
  const head = `${'Archetype'.padEnd(18)} pool  by end    by r${o.by}  median  core  focus  rerolls  sells  owned@r${o.by}  dead`
  console.log(head + (o.strategy === 'flex' ? '  share' : ''))
  for (const [a, r] of Object.entries(rows)) {
    const med = Number.isFinite(r.medianOnlineRound) ? `r${r.medianOnlineRound}` : 'never'
    console.log(
      `${a.padEnd(18)} ${String(pool[a] ?? '').padStart(4)}  ${pct(r.onlineByEnd)}  ${pct(r.onlineBy).padStart(9)}  ` +
        `${med.padStart(6)}  ${r.coreAtEnd.toFixed(1).padStart(4)}  ${pct(r.focus)}  ${r.rerollsPerRun.toFixed(1).padStart(7)}` +
        `  ${r.sellsPerRun.toFixed(1).padStart(5)}  ${r.ownedBy.toFixed(1).padStart(8)}  ${pct(r.deadShops)}` +
        (o.strategy === 'flex' && a !== 'All' ? `  ${pct(r.share)}` : ''),
    )
  }
}
