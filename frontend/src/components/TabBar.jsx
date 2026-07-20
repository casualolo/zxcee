import { motion } from 'framer-motion'
import { Home, ArrowLeftRight, User } from 'lucide-react'
import { tapHaptic } from '../utils/haptic.js'

export default function TabBar({ active, onChange, onOpenTrade }) {
  return (
    <nav className="tabbar">
      <motion.button
        type="button"
        className={`tabbar__item${active === 'home' ? ' tabbar__item--active' : ''}`}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        onClick={() => {
          tapHaptic()
          onChange('home')
        }}
      >
        <Home size={22} strokeWidth={1.75} />
        <span className="tabbar__label">Главная</span>
      </motion.button>

      <div className="tabbar__center">
        <motion.button
          type="button"
          className="tabbar__trade-btn"
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          onClick={() => {
            tapHaptic('medium')
            onOpenTrade()
          }}
          aria-label="Трейд"
        >
          <ArrowLeftRight size={26} color="#ffffff" />
        </motion.button>
      </div>

      <motion.button
        type="button"
        className={`tabbar__item${active === 'profile' ? ' tabbar__item--active' : ''}`}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        onClick={() => {
          tapHaptic()
          onChange('profile')
        }}
      >
        <User size={22} strokeWidth={1.75} />
        <span className="tabbar__label">Профиль</span>
      </motion.button>
    </nav>
  )
}
