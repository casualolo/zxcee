import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { RARITY_COLORS } from '../utils/mockGifts.js'
import { tapHaptic } from '../utils/haptic.js'

export default function MiniGiftCard({ gift, onRemove }) {
  return (
    <motion.div
      className="mini-gift-card"
      style={{ '--card-color': gift.color, '--rarity-color': RARITY_COLORS[gift.rare] }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <span className="mini-gift-card__rarity" />
      <span className="mini-gift-card__emoji">{gift.emoji}</span>
      <button
        type="button"
        className="mini-gift-card__remove"
        onClick={() => {
          tapHaptic()
          onRemove()
        }}
        aria-label="Убрать"
      >
        <X size={10} />
      </button>
    </motion.div>
  )
}
