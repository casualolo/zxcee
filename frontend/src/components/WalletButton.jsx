import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { formatTonAddress } from '../utils/ton.js'
import { tapHaptic } from '../utils/haptic.js'

export default function WalletButton({ variant = 'chip' }) {
  const [tonConnectUI] = useTonConnectUI()
  const address = useTonAddress()

  if (address) {
    return (
      <button
        type="button"
        className="wallet-chip"
        onClick={() => {
          tapHaptic()
          tonConnectUI.disconnect()
        }}
      >
        <span className="wallet-chip__icon">◈</span>
        {formatTonAddress(address)}
        <span className="wallet-chip__caret">▾</span>
      </button>
    )
  }

  if (variant === 'block') {
    return (
      <button
        type="button"
        className="btn btn-primary btn-tall"
        onClick={() => {
          tapHaptic()
          tonConnectUI.openModal()
        }}
      >
        Подключить кошелёк
      </button>
    )
  }

  return (
    <button
      type="button"
      className="wallet-chip"
      onClick={() => {
        tapHaptic()
        tonConnectUI.openModal()
      }}
    >
      Подключить ◈
    </button>
  )
}
