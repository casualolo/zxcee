import { useState } from 'react'
import { Check, X, Sparkles, ExternalLink } from 'lucide-react'
import BackHeader from '../components/BackHeader.jsx'
import OfferZone from '../components/OfferZone.jsx'
import ItemTile from '../components/ItemTile.jsx'
import ConfettiBurst from '../components/ConfettiBurst.jsx'
import { tapHaptic, notifyHaptic } from '../utils/haptic.js'

export default function ReceivedOffer({ offer, onBack, onDone }) {
  const [resolution, setResolution] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  function handleAccept() {
    if (!confirmed) return
    notifyHaptic('success')
    setResolution('accepted')
  }

  function handleReject() {
    notifyHaptic('warning')
    setResolution('rejected')
  }

  if (resolution === 'accepted') {
    return (
      <div className="screen success-screen">
        <ConfettiBurst />

        <div className="success-badge">
          <Sparkles size={28} strokeWidth={1.75} />
        </div>
        <h1 className="success-title">Обмен успешно завершён!</h1>
        <p className="success-subtitle">
          Активы автоматически переведены на ваш TON кошелёк
        </p>

        <div className="section-title">Вы получили</div>
        <div className="success-rewards">
          {offer.theyGive.map((gift, index) => (
            <div
              key={gift.id}
              className="reward-float"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <ItemTile gift={gift} size="lg" />
            </div>
          ))}
        </div>

        <div className="success-actions">
          <a
            className="success-tonscan"
            href="https://tonscan.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Посмотреть транзакцию в Tonscan
            <ExternalLink size={13} />
          </a>
          <button
            type="button"
            className="btn success-home-btn"
            onClick={() => {
              tapHaptic()
              onDone()
            }}
          >
            На главную
          </button>
        </div>
      </div>
    )
  }

  if (resolution === 'rejected') {
    return (
      <div className="screen">
        <BackHeader title="Входящий оффер" onBack={onBack} />
        <p className="resolution-note">Оффер отклонён</p>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            tapHaptic()
            onDone()
          }}
        >
          На главную
        </button>
      </div>
    )
  }

  return (
    <div className="screen">
      <BackHeader onBack={onBack} />
      <div className="offer-banner">Новый оффер от {offer.partnerUsername}</div>

      <OfferZone
        title="Ты отдаёшь"
        items={offer.youGive}
        tonAmount={offer.tonAmount}
        tint="danger"
      />
      <OfferZone
        title={`Ты получаешь от ${offer.partnerUsername}`}
        items={offer.theyGive}
        tint="success"
      />

      <label className="confirm-check">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => {
            tapHaptic()
            setConfirmed(e.target.checked)
          }}
        />
        <span className="confirm-check__box" />
        <span className="confirm-check__label">
          Я проверил условия сделки и подтверждаю обмен
        </span>
      </label>

      <div className="offer-actions">
        <button
          type="button"
          className="btn btn-accept"
          disabled={!confirmed}
          onClick={handleAccept}
        >
          <Check size={16} />
          Принять
        </button>
        <button type="button" className="btn btn-reject" onClick={handleReject}>
          <X size={16} />
          Отклонить
        </button>
      </div>
    </div>
  )
}
