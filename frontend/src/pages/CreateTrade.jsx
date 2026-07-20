import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Plus, Search, Coins } from 'lucide-react'
import BottomSheet from '../components/BottomSheet.jsx'
import GiftTile from '../components/GiftTile.jsx'
import MiniGiftCard from '../components/MiniGiftCard.jsx'
import { MY_GIFTS, PARTNER_GIFTS } from '../utils/mockGifts.js'
import { tapHaptic } from '../utils/haptic.js'

const GRID_SIZE = 6

function GiftSlotGrid({ gifts, onRemove, onAdd }) {
  const emptyCount = Math.max(GRID_SIZE - gifts.length, 0)

  return (
    <div className="trade-block__grid">
      <AnimatePresence>
        {gifts.map((gift) => (
          <MiniGiftCard key={gift.id} gift={gift} onRemove={() => onRemove(gift.id)} />
        ))}
      </AnimatePresence>
      {Array.from({ length: emptyCount }).map((_, index) =>
        index === 0 ? (
          <button
            key="add"
            type="button"
            className="empty-slot empty-slot--add"
            onClick={onAdd}
            aria-label="Добавить подарок"
          >
            <Plus size={18} />
          </button>
        ) : (
          <div key={`empty-${index}`} className="empty-slot" />
        ),
      )}
    </div>
  )
}

export default function CreateTrade({ tradeState, onChange, onSubmit }) {
  const { partnerUsername, myGiftIds, partnerGiftIds, myTon, partnerTon } = tradeState
  const [sheetTarget, setSheetTarget] = useState(null)
  const [partnerDraft, setPartnerDraft] = useState('')

  const myGifts = myGiftIds.map((id) => MY_GIFTS.find((gift) => gift.id === id)).filter(Boolean)
  const partnerGifts = partnerGiftIds
    .map((id) => PARTNER_GIFTS.find((gift) => gift.id === id))
    .filter(Boolean)

  const hasPartner = partnerUsername.trim().length > 0
  const canSubmit =
    hasPartner &&
    (myGifts.length > 0 || partnerGifts.length > 0 || myTon.trim() || partnerTon.trim())

  function toggleMine(id) {
    onChange({
      myGiftIds: myGiftIds.includes(id)
        ? myGiftIds.filter((giftId) => giftId !== id)
        : [...myGiftIds, id],
    })
  }

  function togglePartner(id) {
    onChange({
      partnerGiftIds: partnerGiftIds.includes(id)
        ? partnerGiftIds.filter((giftId) => giftId !== id)
        : [...partnerGiftIds, id],
    })
  }

  function handleSheetSelect(gift) {
    if (sheetTarget === 'mine') toggleMine(gift.id)
    if (sheetTarget === 'partner') togglePartner(gift.id)
    setSheetTarget(null)
  }

  function handleSubmit() {
    tapHaptic('medium')
    onSubmit()
  }

  function confirmPartner() {
    const trimmed = partnerDraft.trim()
    if (!trimmed) return
    tapHaptic()
    onChange({ partnerUsername: trimmed })
  }

  const sheetCatalog = sheetTarget === 'mine' ? MY_GIFTS : PARTNER_GIFTS
  const sheetSelectedIds = sheetTarget === 'mine' ? myGiftIds : partnerGiftIds
  const sheetAvailable = sheetCatalog.filter((gift) => !sheetSelectedIds.includes(gift.id))

  return (
    <div className="trade-screen">
      <div className="trade-screen__body">
        <div className="trade-block">
          <div className="trade-block__header">
            <span className="trade-block__title">Я отдаю</span>
            <span className="trade-block__balance">Мой баланс: 12.4 TON</span>
          </div>

          <GiftSlotGrid gifts={myGifts} onRemove={toggleMine} onAdd={() => setSheetTarget('mine')} />

          <div className="ton-field">
            <Coins size={16} className="ton-field__icon" />
            <input
              type="number"
              inputMode="decimal"
              className="ton-field__input"
              placeholder="0.00 TON"
              value={myTon}
              onChange={(e) => onChange({ myTon: e.target.value })}
            />
          </div>
        </div>

        <div className="trade-divider">
          <span className="trade-divider__line" />
          <span className="trade-divider__icon">⟷</span>
          <span className="trade-divider__line" />
        </div>

        <div className="trade-block">
          {!hasPartner ? (
            <div className="trade-block__search">
              <div className="search-field">
                <button
                  type="button"
                  className="search-field__icon-btn"
                  onClick={confirmPartner}
                  aria-label="Найти партнёра"
                >
                  <Search size={16} />
                </button>
                <input
                  type="text"
                  className="search-field__input"
                  placeholder="@юзернейм"
                  value={partnerDraft}
                  onChange={(e) => setPartnerDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      confirmPartner()
                    }
                  }}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="trade-block__header">
                <span className="trade-block__title">
                  Партнёр @{partnerUsername.trim().replace(/^@/, '')} отдаёт
                </span>
              </div>

              <GiftSlotGrid
                gifts={partnerGifts}
                onRemove={togglePartner}
                onAdd={() => setSheetTarget('partner')}
              />

              <div className="ton-field">
                <Coins size={16} className="ton-field__icon" />
                <input
                  type="number"
                  inputMode="decimal"
                  className="ton-field__input"
                  placeholder="0.00 TON"
                  value={partnerTon}
                  onChange={(e) => onChange({ partnerTon: e.target.value })}
                />
              </div>
              <span className="ton-field__caption">TON которые получишь ты</span>
            </>
          )}
        </div>
      </div>

      <div className="trade-screen__footer">
        <button
          type="button"
          className={`trade-submit-btn${canSubmit ? ' trade-submit-btn--active' : ''}`}
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          Отправить оффер
        </button>
      </div>

      <BottomSheet
        open={sheetTarget !== null}
        title="Выбери подарок"
        onClose={() => setSheetTarget(null)}
      >
        {sheetAvailable.length === 0 ? (
          <p className="empty-note">Все подарки уже в обмене</p>
        ) : (
          <div className="gift-grid">
            {sheetAvailable.map((gift, index) => (
              <GiftTile
                key={gift.id}
                gift={gift}
                index={index}
                onClick={() => handleSheetSelect(gift)}
              />
            ))}
          </div>
        )}
      </BottomSheet>
    </div>
  )
}
