import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState } from 'react'
import { Hand } from './components/Hand'
import { MiniHand } from './components/MiniHand'
import { Nameplate } from './components/Nameplate'
import { BidPrompt, BlindPrompt, HandSummary } from './components/Prompts'
import { ScoreBoard } from './components/ScoreBoard'
import { Trick } from './components/Trick'
import { type Seat, partnerOf } from './game/cards'
import { HUMAN } from './game/state'
import { SuitIcon } from './ui/SuitIcon'
import { useGame } from './useGame'
import styles from './App.module.css'

const fade = {
  initial: { opacity: 0, y: 16, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 8, scale: 0.98 },
  transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
}

export default function App() {
  const game = useGame()
  const { state } = game
  const tableRef = useRef<HTMLElement>(null)
  const [dragging, setDragging] = useState(false)

  const plate = (seat: Seat) => (
    <Nameplate
      seat={seat}
      bid={state.bids[seat]}
      won={state.tricksWon[seat]}
      phase={state.phase}
      active={
        (state.phase === 'bidding' || state.phase === 'playing') &&
        state.turn === seat &&
        state.trick.length < 4
      }
      dealer={state.dealer === seat}
    />
  )

  const partnerBid = state.bids[partnerOf(HUMAN)] ?? 0
  const humanBidding = state.phase === 'bidding' && state.turn === HUMAN
  const showSummary = state.phase === 'handOver' || state.phase === 'gameOver'

  return (
    <div className={styles.app}>
      <div className={styles.score}>
        <ScoreBoard scores={state.scores} bags={state.bags} />
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
        data-your-turn={game.humanTurn || undefined}
      >
        <div className={styles.felt} />
        <SuitIcon
          suit={3}
          className={styles.spadeMark}
          data-broken={state.spadesBroken || undefined}
          aria-label={state.spadesBroken ? 'Spades broken' : 'Spades not broken'}
        />
        <Trick trick={state.trick} winner={state.lastTrickWinner} />
        <AnimatePresence>
          {humanBidding && (
            <motion.div key="bid" className={styles.bidDock} {...fade}>
              <BidPrompt onBid={game.bid} max={partnerBid > 0 ? 13 - partnerBid : 13} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <section className={styles.south}>
        {plate(HUMAN)}
        <Hand
          key={state.handNumber}
          cards={state.hands[HUMAN]}
          faceDown={state.phase === 'blind'}
          legal={game.legal}
          active={game.humanTurn}
          dropZone={tableRef}
          onPlay={game.play}
          onDragChange={setDragging}
        />
      </section>

      <AnimatePresence>
        {(state.phase === 'blind' || showSummary) && (
          <motion.div
            key={state.phase === 'blind' ? 'blind' : 'summary'}
            className={styles.scrim}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div {...fade}>
              {state.phase === 'blind' ? (
                <BlindPrompt onChoose={game.blind} />
              ) : (
                state.lastResult && (
                  <HandSummary
                    result={state.lastResult}
                    scores={state.scores}
                    winner={state.winner}
                    onContinue={state.phase === 'gameOver' ? game.newGame : game.nextHand}
                  />
                )
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
