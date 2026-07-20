import { Check, X, Clock, Repeat } from 'lucide-react'
import { tapHaptic } from '../utils/haptic.js'

const STATUS_ICON = {
  accepted: Check,
  rejected: X,
  pending: Clock,
}

export default function TradeRow({ gaveGifts, gotGifts, partnerUsername, meta, status, statusLabel, onClick }) {
  const StatusIcon = STATUS_ICON[status]
  return (
    <div
      className={`history-item${onClick ? ' history-item--tappable' : ''}`}
      onClick={
        onClick
          ? () => {
              tapHaptic()
              onClick()
            }
          : undefined
      }
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="history-item__gifts">
        {gaveGifts.map((gift) => (
          <span key={`give-${gift.id}`} className="history-item__emoji">
            {gift.emoji}
          </span>
        ))}
        <span className="history-item__arrow">
          <Repeat size={12} />
        </span>
        {gotGifts.map((gift) => (
          <span key={`got-${gift.id}`} className="history-item__emoji">
            {gift.emoji}
          </span>
        ))}
      </div>
      <div className="history-item__meta">
        <span className="history-item__partner">{partnerUsername}</span>
        <span className="history-item__date">{meta}</span>
        <span className={`history-item__status history-item__status--${status}`}>
          {StatusIcon && <StatusIcon size={12} />}
          {statusLabel}
        </span>
      </div>
    </div>
  )
}
