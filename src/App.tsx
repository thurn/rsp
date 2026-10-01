import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Hand } from './components/Hand'
import { MiniHand } from './components/MiniHand'
import { Notice } from './components/Notice'
import { Nameplate } from './components/Nameplate'
import { PromptPanel } from './components/PromptPanel'
import { BidPrompt, BlindPrompt, RoundSummary } from './components/Prompts'
import { Sandbox } from './components/Sandbox'
import { ScoreBoard } from './components/ScoreBoard'
import { Shop } from './components/Shop'
import { TooltipLayer } from './components/Tooltip'
import { Trick } from './components/Trick'
import { type TrayChip } from './components/Tray'
import { recentPulse, toDisplay, viewerOf } from './components/display'
import { ledgerRows } from './components/ledger'
import { type Seat, partnerOf } from './game/cards'
import { bidOptions } from './game/rules'
import { PARAMS, dispatch, initGame } from './game/store'
import type { GameState } from './game/types'
import { loadLibrary } from './sigils/model'
import { isEngraving, setLibrary } from './sigils/registry'
import { SuitIcon } from './ui/SuitIcon'
import { idle, useDriver, useGameState, useLegal } from './useGame'
import styles from './App.module.css'

const fade = {
  initial: { opacity: 0, y: 16, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 8, scale: 0.98 },
  transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
}

function trayFor(s: GameState, seat: Seat): TrayChip[] {
  const viewer = viewerOf(s)
  const known = seat === viewer || seat === partnerOf(viewer)
  return s.players[seat].sigils
    .filter((o) => !isEngraving(o.copyOf ?? o.code) && (known || o.revealed))
    .map((o) => ({ code: o.code, counter: o.counter, pulse: recentPulse(s, `${seat}:${o.code}`) }))
}

export default function App() {
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    loadLibrary()
      .then((lib) => {
        setLibrary(lib)
        initGame()
      })
      .catch((e) => setError(String(e)))
  }, [])
  const state = useGameState()
  if (!state) return <div className={styles.loading}>{error ?? ''}</div>
  return <Table state={state} />
}

function Table({ state }: { state: GameState }) {
  const tableRef = useRef<HTMLElement>(null)
  const [dragging, setDragging] = useState(false)
  const [sandboxOpen, setSandboxOpen] = useState(PARAMS.sandbox)
  const [pause, setPause] = useState(false)
  useDriver(state, sandboxOpen || pause)
  const legal = useLegal(state)
  const viewer = viewerOf(state)
  const human = state.human
  const humanTurn = legal.size > 0

  const plate = (seat: Seat) => (
    <Nameplate
      seat={seat}
      bid={state.bids[seat]}
      won={state.tricksWon[seat]}
      phase={state.phase}
      active={
        (state.phase === 'bidding' || state.phase === 'playing') &&
        state.turn === seat &&
        !state.trickDone
      }
      dealer={state.dealer === seat}
      gold={state.players[seat].gold}
      showGold={seat === viewer}
      tray={trayFor(state, seat)}
    />
  )

  const hand = useMemo(() => state.hands[viewer].map((c) => toDisplay(state, c)), [state, viewer])
  const trick = state.trick.map((p) => ({ seat: p.seat, card: toDisplay(state, p.card) }))
  const lastWinner = state.history.at(-1)
  const exitTo =
    state.trickDone && state.trickWinIndex !== null
      ? state.trick[state.trickWinIndex].seat
      : lastWinner
        ? (lastWinner.plays[lastWinner.winIndex]?.seat ?? null)
        : null

  const prompt = state.prompt && state.prompt.seat === human ? state.prompt : null
  const cardPrompt = prompt?.cards && prompt.cards.every((id) => hand.some((c) => c.id === id))
  const selectable = cardPrompt ? new Set(prompt!.cards) : null
  const humanBidding =
    state.phase === 'bidding' && state.turn === human && human !== null && idle(state)
  const blindAsk = state.blindAsk !== null && state.blindAsk === human
  const showSummary =
    (state.phase === 'roundOver' || state.phase === 'gameOver') && state.lastResult && idle(state)
  const shopOpen =
    state.phase === 'shop' && human !== null && state.shop && !state.shop.seats[human].done
  const overlay = blindAsk ? 'blind' : showSummary ? 'summary' : shopOpen ? 'shop' : null

  return (
    <div className={styles.app} data-sandbox={sandboxOpen || undefined}>
      <div className={styles.score}>
        <ScoreBoard scores={state.scores} bags={state.bags} round={Math.max(1, state.round)} />
      </div>

      <section className={styles.north}>
        <MiniHand count={state.hands[2].length} />
        {plate(2)}
      </section>
      <section className={styles.west}>
        {plate(1)}
        <MiniHand count={state.hands[1].length} />
      </section>
      <section className={styles.east}>
        {plate(3)}
        <MiniHand count={state.hands[3].length} />
      </section>

      <main
        ref={tableRef}
        className={styles.table}
        data-drop={dragging || undefined}
        data-your-turn={humanTurn || undefined}
      >
        <div className={styles.felt} />
        <SuitIcon
          suit={3}
          className={styles.spadeMark}
          data-broken={state.spadesBroken || undefined}
          aria-label={state.spadesBroken ? 'Spades broken' : 'Spades not broken'}
        />
        <Trick
          plays={trick}
          winIndex={state.trickDone ? state.trickWinIndex : null}
          winner={exitTo}
        />
        <AnimatePresence>
          {humanBidding && (
            <motion.div key="bid" className={styles.bidDock} {...fade}>
              <BidPrompt
                onBid={(bid) => dispatch({ type: 'bid', seat: human, bid })}
                options={bidOptions(state, human)}
              />
            </motion.div>
          )}
          {prompt && state.phase !== 'shop' && (
            <motion.div key={`prompt`} className={styles.promptDock} {...fade}>
              <PromptPanel prompt={prompt} state={state} handPick={!!cardPrompt} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <section className={styles.south}>
        {plate(viewer)}
        <Hand
          key={state.round}
          cards={hand}
          faceDown={state.phase === 'blind'}
          legal={legal}
          active={humanTurn}
          selectable={selectable}
          dropZone={tableRef}
          onPlay={(cardId) => human !== null && dispatch({ type: 'play', seat: human, cardId })}
          onSelect={(id) => dispatch({ type: 'answer', value: id })}
          onDragChange={setDragging}
        />
      </section>

      <Notice state={state} />

      <AnimatePresence>
        {overlay && (
          <motion.div
            key={overlay}
            className={styles.scrim}
            data-layer="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div {...fade}>
              {overlay === 'blind' && (
                <BlindPrompt onChoose={(declare) => dispatch({ type: 'blind', declare })} />
              )}
              {overlay === 'summary' && state.lastResult && (
                <RoundSummary
                  result={state.lastResult}
                  scores={state.scores}
                  round={state.round}
                  winner={state.winner}
                  ledger={ledgerRows(state)}
                  onContinue={() =>
                    dispatch({ type: state.phase === 'gameOver' ? 'newGame' : 'nextRound' })
                  }
                />
              )}
              {overlay === 'shop' &&
                (prompt ? (
                  <PromptPanel prompt={prompt} state={state} handPick={false} />
                ) : (
                  <Shop state={state} seat={human!} />
                ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Sandbox
        state={state}
        open={sandboxOpen}
        onOpenChange={setSandboxOpen}
        paused={pause}
        onPauseChange={setPause}
      />
      <TooltipLayer />
    </div>
  )
}
