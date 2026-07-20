export const RARITY_COLORS = {
  Common: '#9CA3AF',
  Rare: '#FF5DA2',
  Epic: '#7B61FF',
  Legendary: '#FFD700',
}

export const MY_GIFTS = [
  { id: 1, name: 'Teddy Bear', emoji: '🧸', color: '#E8547A', rare: 'Rare' },
  { id: 2, name: 'Diamond Ring', emoji: '💍', color: '#4FACFE', rare: 'Epic' },
  { id: 3, name: 'Party Rocket', emoji: '🚀', color: '#8B5CF6', rare: 'Legendary' },
]

export const PARTNER_GIFTS = [
  { id: 10, name: 'Golden Star', emoji: '⭐', color: '#F59E0B', rare: 'Legendary' },
  { id: 11, name: 'Ice Crown', emoji: '👑', color: '#06B6D4', rare: 'Epic' },
  { id: 12, name: 'Fire Heart', emoji: '❤️‍🔥', color: '#EF4444', rare: 'Rare' },
]

export const INCOMING_OFFER = {
  partnerUsername: '@alice',
  theyGive: [PARTNER_GIFTS[0]],
  youGive: [MY_GIFTS[1]],
  tonAmount: '2.5',
  timeAgo: '2 мин назад',
}

export const TRADE_HISTORY = [
  {
    id: 'h1',
    partnerUsername: '@bob',
    status: 'accepted',
    date: '18 июля',
    gaveGifts: [MY_GIFTS[2]],
    gotGifts: [PARTNER_GIFTS[1]],
  },
  {
    id: 'h2',
    partnerUsername: '@carol',
    status: 'rejected',
    date: '15 июля',
    gaveGifts: [MY_GIFTS[0]],
    gotGifts: [],
  },
  {
    id: 'h3',
    partnerUsername: '@dave',
    status: 'expired',
    date: '10 июля',
    gaveGifts: [MY_GIFTS[1]],
    gotGifts: [PARTNER_GIFTS[2]],
  },
]
