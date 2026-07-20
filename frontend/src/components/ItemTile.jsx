import { Diamond } from 'lucide-react'
import { RARITY_COLORS } from '../utils/mockGifts.js'
import { giftImageSrc } from '../utils/giftImage.js'

export default function ItemTile({ gift, tonAmount, size = 'md' }) {
  const sizeClass = size === 'lg' ? ' item-tile--lg' : ''

  if (tonAmount) {
    return (
      <div className={`item-tile item-tile--ton${sizeClass}`}>
        <Diamond size={size === 'lg' ? 34 : 26} strokeWidth={1.75} className="item-tile__ton-icon" />
        <span className="item-tile__ton-amount">{tonAmount}</span>
      </div>
    )
  }

  return (
    <div className={`item-tile${sizeClass}`} style={{ '--rarity-color': RARITY_COLORS[gift.rare] }}>
      <img className="item-tile__img" src={giftImageSrc(gift)} alt={gift.name} />
    </div>
  )
}
