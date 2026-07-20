import ItemTile from './ItemTile.jsx'

export default function OfferZone({ title, items, tonAmount, tint }) {
  const isEmpty = items.length === 0 && !tonAmount

  return (
    <div className={`offer-zone${tint ? ` offer-zone--${tint}` : ''}`}>
      <div className="offer-zone__title">
        <span className="offer-zone__dot" />
        {title}
      </div>
      {isEmpty ? (
        <p className="empty-note">Пусто</p>
      ) : (
        <div className="offer-zone__grid">
          {items.map((gift) => (
            <ItemTile key={gift.id} gift={gift} />
          ))}
          {tonAmount && <ItemTile tonAmount={tonAmount} />}
        </div>
      )}
    </div>
  )
}
