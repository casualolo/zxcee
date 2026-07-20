import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import WalletButton from '../components/WalletButton.jsx'
import TradeRow from '../components/TradeRow.jsx'
import TradeDetailModal from '../components/TradeDetailModal.jsx'
import { INCOMING_OFFER } from '../utils/mockGifts.js'
import { tapHaptic } from '../utils/haptic.js'

const STATUS_LABEL = {
  accepted: 'Принят',
  rejected: 'Отклонён',
  expired: 'Истёк',
}

export default function Home({ sentOffers, history, onOpenTrade, onOpenIncoming, onCancelOffer }) {
  const [selectedTrade, setSelectedTrade] = useState(null)
  const hasActive = Boolean(INCOMING_OFFER) || sentOffers.length > 0

  function openSentOffer(offer) {
    tapHaptic()
    setSelectedTrade({
      id: offer.id,
      partnerUsername: offer.username,
      gaveGifts: offer.myGifts,
      gotGifts: offer.partnerGifts,
      myTon: offer.myTon,
      partnerTon: offer.partnerTon,
      status: 'pending',
      canCancel: true,
    })
  }

  function openHistoryTrade(trade) {
    tapHaptic()
    setSelectedTrade({
      id: trade.id,
      partnerUsername: trade.partnerUsername,
      gaveGifts: trade.gaveGifts,
      gotGifts: trade.gotGifts,
      status: trade.status,
      canCancel: false,
    })
  }

  function handleCancel(id) {
    setSelectedTrade(null)
    onCancelOffer(id)
  }

  return (
    <div className="screen">
      <div className="home-header">
        <span className="home-header__title">Swipo</span>
        <WalletButton />
      </div>

      <button
        type="button"
        className="new-trade-card"
        onClick={() => {
          tapHaptic('medium')
          onOpenTrade()
        }}
      >
        <span className="new-trade-card__text">Начать обмен</span>
        <span className="new-trade-card__icon">
          <RefreshCw size={22} />
        </span>
      </button>

      <div className="section-title">Активные</div>
      {!hasActive ? (
        <p className="empty-note">Нет активных трейдов</p>
      ) : (
        <div className="history-list">
          {INCOMING_OFFER && (
            <TradeRow
              gaveGifts={INCOMING_OFFER.youGive}
              gotGifts={INCOMING_OFFER.theyGive}
              partnerUsername={INCOMING_OFFER.partnerUsername}
              meta={INCOMING_OFFER.timeAgo}
              status="pending"
              statusLabel="Ожидает"
              onClick={onOpenIncoming}
            />
          )}
          {sentOffers.map((offer) => (
            <TradeRow
              key={offer.id}
              gaveGifts={offer.myGifts}
              gotGifts={offer.partnerGifts}
              partnerUsername={offer.username}
              meta="только что"
              status="pending"
              statusLabel="Ожидает"
              onClick={() => openSentOffer(offer)}
            />
          ))}
        </div>
      )}

      <div className="section-title">История</div>
      <div className="history-list">
        {history.map((trade) => (
          <TradeRow
            key={trade.id}
            gaveGifts={trade.gaveGifts}
            gotGifts={trade.gotGifts}
            partnerUsername={trade.partnerUsername}
            meta={trade.date}
            status={trade.status}
            statusLabel={STATUS_LABEL[trade.status]}
            onClick={() => openHistoryTrade(trade)}
          />
        ))}
      </div>

      <TradeDetailModal
        trade={selectedTrade}
        onClose={() => setSelectedTrade(null)}
        onCancel={handleCancel}
      />
    </div>
  )
}
