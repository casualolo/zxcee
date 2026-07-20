import { tapHaptic } from '../utils/haptic.js'

export default function BackHeader({ title, onBack }) {
  return (
    <div className="back-header">
      <button
        type="button"
        className="back-header__btn"
        onClick={() => {
          tapHaptic()
          onBack()
        }}
        aria-label="Назад"
      >
        ‹
      </button>
      {title && <span className="back-header__title">{title}</span>}
    </div>
  )
}
