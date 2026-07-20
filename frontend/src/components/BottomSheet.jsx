import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { tapHaptic } from '../utils/haptic.js'

export default function BottomSheet({ open, title, children, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="sheet-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            className="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%', transition: { duration: 0.25, ease: [0.32, 0.72, 0, 1] } }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 80) onClose()
            }}
          >
            <div className="sheet__grabber" />
            <div className="sheet__header">
              <div className="sheet__title">{title}</div>
              <button
                type="button"
                className="sheet__close"
                onClick={() => {
                  tapHaptic()
                  onClose()
                }}
                aria-label="Закрыть"
              >
                <X size={20} />
              </button>
            </div>
            <div className="sheet__content">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
