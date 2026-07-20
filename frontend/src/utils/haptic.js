import { hapticFeedback } from '@tma.js/sdk'

export function tapHaptic(style = 'light') {
  try {
    hapticFeedback.impactOccurred(style)
  } catch {
    // Not running inside Telegram — no-op in a plain browser.
  }
}

export function notifyHaptic(type = 'success') {
  try {
    hapticFeedback.notificationOccurred(type)
  } catch {
    // Not running inside Telegram — no-op in a plain browser.
  }
}
