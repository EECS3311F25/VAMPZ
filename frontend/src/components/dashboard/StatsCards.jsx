import { TrendingUp, DollarSign } from 'lucide-react'

function StatsCards() {
  return (
    <div className="stats-cards">
      <div className="stat-card">
        <div className="stat-icon-wrapper">
          <TrendingUp className="stat-icon" />
        </div>
        <div className="stat-content">
          <p className="stat-label">Total Return</p>
          <p className="stat-value">$25,834.67</p>
          <p className="stat-change positive">+25.83% All Time</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper">
          <DollarSign className="stat-icon" />
        </div>
        <div className="stat-content">
          <p className="stat-label">Buying Power</p>
          <p className="stat-value">$42,165.33</p>
          <p className="stat-subtext">Available to trade</p>
        </div>
      </div>
    </div>
  )
}

export default StatsCards

