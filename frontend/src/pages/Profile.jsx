import { useTonAddress } from '@tonconnect/ui-react'
import { Coins, Gift, Bell, ShieldCheck, Star, Link2 } from 'lucide-react'
import { useTelegramUser } from '../hooks/useTelegramUser.js'
import GiftTile from '../components/GiftTile.jsx'
import WalletButton from '../components/WalletButton.jsx'
import { MY_GIFTS } from '../utils/mockGifts.js'
import { tapHaptic } from '../utils/haptic.js'

const INVITE_CARD = {
  icon: Bell,
  title: 'Приглашайте друзей и зарабатывайте TON',
  desc: 'Получай бонус за каждого друга',
}

const REFERRAL_ITEMS = [
  {
    icon: ShieldCheck,
    color: '#22C55E',
    title: 'Безопасные сделки',
    desc: 'Смарт-контракт защищает каждый обмен',
  },
  {
    icon: Star,
    color: '#F59E0B',
    title: 'Рейтинг трейдера',
    desc: 'Растёт с каждым успешным обменом',
  },
  {
    icon: Link2,
    color: '#F97316',
    title: 'Реферальный код',
    desc: 'Поделись и получи бонус',
  },
]

export default function Profile({ onOpenHistory }) {
  const user = useTelegramUser()
  const address = useTonAddress()
  const displayName = user?.username
    ? `@${user.username}`
    : user?.first_name || '@you'
  const initial = (user?.first_name || user?.username || 'S').charAt(0).toUpperCase()

  return (
    <div className="screen">
      <div className="profile-header">
        {user?.photo_url ? (
          <img src={user.photo_url} alt="" className="profile-avatar" />
        ) : (
          <div className="profile-avatar profile-avatar--fallback">{initial}</div>
        )}
        <div className="profile-username">{displayName}</div>
      </div>

      {!address && <WalletButton variant="block" />}

      <div className="profile-stats">
        <div className="profile-stat">
          <span className="profile-stat__value">
            <Coins size={16} />0
          </span>
          <span className="profile-stat__label">Объём</span>
        </div>
        <div className="profile-stat__divider" />
        <div className="profile-stat">
          <span className="profile-stat__value">
            <Gift size={16} />0
          </span>
          <span className="profile-stat__label">Трейдов</span>
        </div>
        <div className="profile-stat__divider" />
        <div className="profile-stat">
          <span className="profile-stat__value">
            <Gift size={16} />0
          </span>
          <span className="profile-stat__label">Получено</span>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => {
          tapHaptic()
          onOpenHistory()
        }}
      >
        История трейдов
      </button>

      <div className="section-title">Мои подарки</div>
      <div className="gift-grid">
        {MY_GIFTS.map((gift, index) => (
          <GiftTile key={gift.id} gift={gift} index={index} />
        ))}
      </div>

      <div className="invite-card">
        <div className="invite-card__icon">
          <INVITE_CARD.icon size={20} color="#ffffff" />
        </div>
        <div className="invite-card__text">
          <div className="invite-card__title">{INVITE_CARD.title}</div>
          <div className="invite-card__desc">{INVITE_CARD.desc}</div>
        </div>
      </div>

      <div className="referral-list">
        {REFERRAL_ITEMS.map((item) => (
          <div key={item.title} className="referral-item">
            <div className="referral-item__icon" style={{ background: item.color }}>
              <item.icon size={20} color="#ffffff" />
            </div>
            <div className="referral-item__text">
              <div className="referral-item__title">{item.title}</div>
              <div className="referral-item__desc">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="btn btn-tall btn-invite"
        onClick={() => tapHaptic()}
      >
        Пригласить друзей
      </button>
    </div>
  )
}
