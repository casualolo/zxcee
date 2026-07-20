import { Ban } from 'lucide-react'
import BottomSheet from './BottomSheet.jsx'
import OfferZone from './OfferZone.jsx'
import { notifyHaptic } from '../utils/haptic.js'

const STATUS_LABEL = {
  pending: 'Ожидает',
  accepted: 'Принят',
  rejected: 'Отклонён',
  expired: 'Истёк',
}

export default function TradeDetailModal({ trade, onClose, onCancel }) {
  return (
    <BottomSheet open={Boolean(trade)} title={trade?.partnerUsername} onClose={onClose}>
      {trade && (
        <div className="trade-modal">
          <span className={`trade-modal-status trade-modal-status--${trade.status}`}>
            {STATUS_LABEL[trade.status]}
          </span>

          <OfferZone
            title="Вы отдаёте"
            items={trade.gaveGifts}
            tonAmount={trade.myTon}
            tint="danger"
          />
          <OfferZone
            title="Вы получаете"
            items={trade.gotGifts}
            tonAmount={trade.partnerTon}
            tint="success"
          />

          {trade.canCancel && (
            <button
              type="button"
              className="btn trade-modal-cancel"
              onClick={() => {
                notifyHaptic('warning')
                onCancel(trade.id)
              }}
            >
              <Ban size={16} />
              Отменить предложение
            </button>
          )}
        </div>
      )}
    </BottomSheet>
  )
}
