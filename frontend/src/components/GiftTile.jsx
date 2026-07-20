import { motion } from 'framer-motion'
import { RARITY_COLORS } from '../utils/mockGifts.js'
import { tapHaptic } from '../utils/haptic.js'

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export default function GiftTile({ gift, index = 0, onClick }) {
  const interactive = Boolean(onClick)

  function handleClick() {
    if (!interactive) return
    tapHaptic()
    onClick()
  }

  return (
    <motion.div
      className="gift-tile"
      style={{ '--card-color': gift.color, '--rarity-color': RARITY_COLORS[gift.rare] }}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.28, delay: index * 0.04, ease: [0.34, 1.56, 0.64, 1] }}
      whileTap={
        interactive
          ? { scale: 0.95, transition: { type: 'spring', stiffness: 500, damping: 25 } }
          : undefined
      }
      onClick={handleClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      <span className="gift-tile__rarity">{gift.rare}</span>
      <div className="gift-tile__icon">{gift.emoji}</div>
      <div className="gift-tile__name">{gift.name}</div>
    </motion.div>
  )
}
