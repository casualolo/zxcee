function darken(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.max(0, (num >> 16) - amount)
  const g = Math.max(0, ((num >> 8) & 0x00ff) - amount)
  const b = Math.max(0, (num & 0x0000ff) - amount)
  return `rgb(${r}, ${g}, ${b})`
}

export function giftImageSrc(gift) {
  const from = gift.color
  const to = darken(gift.color, 90)
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='${from}'/>
        <stop offset='1' stop-color='${to}'/>
      </linearGradient>
    </defs>
    <rect width='160' height='160' fill='url(#g)'/>
    <text x='50%' y='56%' font-size='84' text-anchor='middle' dominant-baseline='middle'>${gift.emoji}</text>
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}
