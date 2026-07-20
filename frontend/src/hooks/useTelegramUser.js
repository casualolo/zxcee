import { initData } from '@tma.js/sdk'

/** Reads the Telegram user from launch params. Returns null in a plain
 *  browser or if Telegram didn't share profile data for this launch. */
export function useTelegramUser() {
  try {
    return initData.user() ?? null
  } catch {
    return null
  }
}
