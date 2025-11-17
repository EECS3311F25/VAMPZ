import { TrendingUp, TrendingDown } from 'lucide-react'

export default function PriceDisplay({ currentPrice, change, changePercent }) {
  const isPositive = change >= 0

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{
        fontSize: '48px',
        fontWeight: 'bold',
        color: isPositive ? '#059669' : '#dc2626',
        marginBottom: '8px'
      }}>
        ${currentPrice.toFixed(2)}
      </div>
      <div style={{
        fontSize: '18px',
        color: isPositive ? '#059669' : '#dc2626',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
        <span>
          {change >= 0 ? '+' : ''}{change.toFixed(2)} ({changePercent >= 0 ? '+' : ''}{changePercent}%)
        </span>
      </div>
    </div>
  )
}

