export const TONCONNECT_MANIFEST_URL = `${window.location.origin}/tonconnect-manifest.json`

export function formatTonAddress(address, chars = 4) {
  if (!address) return ''
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}
