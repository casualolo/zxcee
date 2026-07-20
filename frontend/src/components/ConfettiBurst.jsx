import { useEffect, useMemo, useState } from 'react'
import { Diamond } from 'lucide-react'

const TYPES = ['star', 'spark', 'ton']

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

export default function ConfettiBurst({ duration = 2600 }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  const particles = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        type: TYPES[i % TYPES.length],
        left: randomBetween(2, 98),
        delay: randomBetween(0, 0.5),
        fallDuration: randomBetween(1.8, 2.6),
        drift: randomBetween(-40, 40),
        size: randomBetween(11, 18),
      })),
    [],
  )

  if (!visible) return null

  return (
    <div className="confetti" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`confetti__piece confetti__piece--${p.type}`}
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.fallDuration}s`,
            '--drift': `${p.drift}px`,
            fontSize: p.type === 'ton' ? undefined : `${p.size}px`,
          }}
        >
          {p.type === 'star' && '★'}
          {p.type === 'spark' && '✦'}
          {p.type === 'ton' && <Diamond size={p.size} strokeWidth={2} />}
        </span>
      ))}
    </div>
  )
}
