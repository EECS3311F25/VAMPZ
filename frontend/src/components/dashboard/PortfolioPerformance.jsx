import { useState } from 'react'

function PortfolioPerformance() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('All Time')
  const timeRanges = ['Day', 'Week', 'Month', 'All Time']

  return (
    <div className="portfolio-performance">
      <div className="performance-header">
        <h3 className="performance-title">Portfolio Performance</h3>
        <div className="time-range-tabs">
          {timeRanges.map((range) => (
            <button
              key={range}
              className={`time-tab ${selectedTimeRange === range ? 'active' : ''}`}
              onClick={() => setSelectedTimeRange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      <div className="chart-container">
        <svg className="chart" viewBox="0 0 800 200">
          {/* Grid lines */}
          <line x1="0" y1="50" x2="800" y2="50" stroke="#E5E5E5" strokeWidth="1" />
          <line x1="0" y1="100" x2="800" y2="100" stroke="#E5E5E5" strokeWidth="1" />
          <line x1="0" y1="150" x2="800" y2="150" stroke="#E5E5E5" strokeWidth="1" />
          
          {/* Y-axis labels */}
          <text x="10" y="155" fill="#666" fontSize="12">$70k</text>
          <text x="10" y="105" fill="#666" fontSize="12">$105k</text>
          <text x="10" y="55" fill="#666" fontSize="12">$140k</text>
          
          {/* X-axis labels */}
          <text x="60" y="190" fill="#666" fontSize="10">Jan</text>
          <text x="150" y="190" fill="#666" fontSize="10">Feb</text>
          <text x="240" y="190" fill="#666" fontSize="10">Mar</text>
          <text x="330" y="190" fill="#666" fontSize="10">Apr</text>
          <text x="420" y="190" fill="#666" fontSize="10">May</text>
          <text x="510" y="190" fill="#666" fontSize="10">Jun</text>
          <text x="600" y="190" fill="#666" fontSize="10">Jul</text>
          <text x="690" y="190" fill="#666" fontSize="10">Aug</text>
          
          {/* Sample trend line */}
          <path
            d="M 50 150 Q 200 140 350 120 Q 500 90 650 80 Q 750 75 750 70"
            fill="none"
            stroke="#081f3b"
            strokeWidth="3"
          />
        </svg>
      </div>
    </div>
  )
}

export default PortfolioPerformance

