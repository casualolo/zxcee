import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home.jsx'
import CreateTrade from './pages/CreateTrade.jsx'
import Profile from './pages/Profile.jsx'
import ReceivedOffer from './pages/ReceivedOffer.jsx'
import TabBar from './components/TabBar.jsx'
import { useTelegram } from './hooks/useTelegram.js'
import { MY_GIFTS, PARTNER_GIFTS, INCOMING_OFFER, TRADE_HISTORY } from './utils/mockGifts.js'
import './App.css'

const EMPTY_TRADE_STATE = {
  partnerUsername: '',
  myGiftIds: [],
  partnerGiftIds: [],
  myTon: '',
  partnerTon: '',
}

const TAB_VIEWS = ['home', 'trade', 'profile']

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

function App() {
  useTelegram()

  const [view, setView] = useState('home')
  const [tradeState, setTradeState] = useState(EMPTY_TRADE_STATE)
  const [sentOffers, setSentOffers] = useState([])
  const [history, setHistory] = useState(TRADE_HISTORY)

  function patchTradeState(patch) {
    setTradeState((prev) => ({ ...prev, ...patch }))
  }

  function handleSubmitOffer() {
    setSentOffers((prev) => [
      {
        id: Date.now(),
        username: tradeState.partnerUsername.trim(),
        status: 'pending',
        partnerGifts: PARTNER_GIFTS.filter((gift) => tradeState.partnerGiftIds.includes(gift.id)),
        myGifts: MY_GIFTS.filter((gift) => tradeState.myGiftIds.includes(gift.id)),
        myTon: tradeState.myTon,
        partnerTon: tradeState.partnerTon,
      },
      ...prev,
    ])
    setTradeState(EMPTY_TRADE_STATE)
    setView('home')
  }

  // Cancelling a sent offer removes it from the active list and archives it
  // in history as a rejected trade — this is the only place a sent offer's
  // lifecycle ends outside of the (not-yet-modelled) partner accepting it.
  function handleCancelOffer(id) {
    const target = sentOffers.find((offer) => offer.id === id)
    if (!target) return

    setSentOffers((prev) => prev.filter((offer) => offer.id !== id))
    setHistory((prev) => [
      {
        id: target.id,
        partnerUsername: target.username,
        status: 'rejected',
        date: 'только что',
        gaveGifts: target.myGifts,
        gotGifts: target.partnerGifts,
      },
      ...prev,
    ])
  }

  const isTabView = TAB_VIEWS.includes(view)

  return (
    <div className="app">
      <div className="app__content">
        <AnimatePresence>
          <motion.div
            key={view}
            className="screen-slide"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.15 }}
          >
            {view === 'home' && (
              <Home
                sentOffers={sentOffers}
                history={history}
                onOpenTrade={() => setView('trade')}
                onOpenIncoming={() => setView('received')}
                onCancelOffer={handleCancelOffer}
              />
            )}
            {view === 'trade' && (
              <CreateTrade
                tradeState={tradeState}
                onChange={patchTradeState}
                onSubmit={handleSubmitOffer}
              />
            )}
            {view === 'profile' && <Profile onOpenHistory={() => setView('home')} />}
            {view === 'received' && (
              <ReceivedOffer
                offer={INCOMING_OFFER}
                onBack={() => setView('home')}
                onDone={() => setView('home')}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {isTabView && (
        <TabBar
          active={view}
          onChange={setView}
          onOpenTrade={() => setView('trade')}
        />
      )}
    </div>
  )
}

export default App
