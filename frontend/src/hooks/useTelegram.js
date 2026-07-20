import { useEffect, useState } from 'react'
import { init, initData, miniApp, viewport } from '@tma.js/sdk'

/**
 * Boots the Telegram Mini Apps SDK when running inside Telegram and falls
 * back gracefully when opened in a regular browser (e.g. during development).
 */
export function useTelegram() {
  const [isTelegram, setIsTelegram] = useState(false)

  useEffect(() => {
    try {
      init()

      miniApp.mount()
      viewport.mount().then(() => viewport.expand())
      initData.restore()
      miniApp.ready()

      setIsTelegram(true)
    } catch {
      // Not running inside Telegram (e.g. plain browser during development)
      setIsTelegram(false)
    }
  }, [])

  return { isTelegram }
}
