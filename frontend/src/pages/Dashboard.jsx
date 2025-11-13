<<<<<<< Updated upstream
export default function Dashboard() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1>Hello</h1>
    </div>
  )
}


=======
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Wallet, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [selectedTimeRange, setSelectedTimeRange] = useState('All Time')

  // Sample data for portfolio performance
  const portfolioData = [
    { name: 'Jan', value: 100000 },
    { name: 'Feb', value: 102000 },
    { name: 'Mar', value: 105000 },
    { name: 'Apr', value: 103000 },
    { name: 'May', value: 108000 },
    { name: 'Jun', value: 110000 },
    { name: 'Jul', value: 112000 },
    { name: 'Aug', value: 115000 },
    { name: 'Sep', value: 118000 },
    { name: 'Oct', value: 120000 },
    { name: 'Nov', value: 122000 },
    { name: 'Dec', value: 125835 },
  ]

  // Popular stocks data
  const popularStocks = [
    { ticker: 'AAPL', name: 'Apple Inc.', price: '178.45', change: '+2.34', changePercent: '+1.31%', positive: true },
    { ticker: 'GOOGL', name: 'Alphabet Inc.', price: '141.80', change: '-0.87', changePercent: '-0.61%', positive: false },
    { ticker: 'MSFT', name: 'Microsoft Corp.', price: '378.91', change: '+1.56', changePercent: '+0.41%', positive: true },
    { ticker: 'AMZN', name: 'Amazon.com Inc.', price: '146.32', change: '+3.21', changePercent: '+2.19%', positive: true },
    { ticker: 'TSLA', name: 'Tesla Inc.', price: '242.84', change: '-2.15', changePercent: '-0.89%', positive: false },
    { ticker: 'META', name: 'Meta Platforms', price: '334.57', change: '+1.89', changePercent: '+0.56%', positive: true },
    { ticker: 'NVDA', name: 'NVIDIA Corp.', price: '495.22', change: '+4.67', changePercent: '+0.94%', positive: true },
    { ticker: 'NFLX', name: 'Netflix Inc.', price: '445.73', change: '+0.52', changePercent: '+0.12%', positive: true },
  ]

  const timeRanges = ['Day', 'Week', 'Month', 'All Time']

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      {/* Header Navigation */}
      <header style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#081f3b', margin: 0 }}>
            StockSim
          </h1>
          <nav style={{ display: 'flex', gap: '32px' }}>
            <a href="#" style={{ color: '#081f3b', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>Dashboard</a>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: '500', fontSize: '14px' }}>Portfolio</a>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: '500', fontSize: '14px' }}>Markets</a>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: '500', fontSize: '14px' }}>Settings</a>
          </nav>
        </div>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#081f3b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: '600',
          fontSize: '16px'
        }}>
          {user?.firstName?.[0]?.toUpperCase() || 'U'}
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1366px', margin: '0 auto', padding: '32px' }}>
        {/* Welcome Section */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#081f3b', margin: '0 0 8px 0' }}>
            Hi, {user?.firstName || 'User'}
          </h2>
          <p style={{ fontSize: '16px', color: '#6b7280', margin: 0 }}>
            Welcome back to your portfolio
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {/* Total Balance Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Wallet size={24} color="#081f3b" />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280' }}>Total Balance</span>
            </div>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#081f3b', margin: '0 0 8px 0' }}>
              $125,834.67
            </p>
            <p style={{ fontSize: '14px', color: '#10b981', margin: 0, fontWeight: '500' }}>
              +1,247.32 (+1.00%)
            </p>
          </div>

          {/* Total Return Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <TrendingUp size={24} color="#081f3b" />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280' }}>Total Return</span>
            </div>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#081f3b', margin: '0 0 8px 0' }}>
              $25,834.67
            </p>
            <p style={{ fontSize: '14px', color: '#10b981', margin: 0, fontWeight: '500' }}>
              +25.83% All Time
            </p>
          </div>

          {/* Buying Power Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <DollarSign size={24} color="#081f3b" />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280' }}>Buying Power</span>
            </div>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#081f3b', margin: '0 0 8px 0' }}>
              $42,165.33
            </p>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, fontWeight: '500' }}>
              Available to trade
            </p>
          </div>
        </div>

        {/* Portfolio Performance Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          marginBottom: '40px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#081f3b', margin: 0 }}>
              Portfolio Performance
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              {timeRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedTimeRange(range)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: selectedTimeRange === range ? '#081f3b' : '#f3f4f6',
                    color: selectedTimeRange === range ? 'white' : '#6b7280',
                    fontWeight: '500',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedTimeRange !== range) {
                      e.target.style.backgroundColor = '#e5e7eb'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedTimeRange !== range) {
                      e.target.style.backgroundColor = '#f3f4f6'
                    }
                  }}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div style={{ height: '300px', width: '100%', position: 'relative', padding: '20px 0' }}>
            <svg width="100%" height="260" viewBox="0 0 1000 260" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
              {/* Y-axis labels */}
              <text x="40" y="30" fill="#9ca3af" fontSize="12" fontWeight="500">$140k</text>
              <text x="40" y="130" fill="#9ca3af" fontSize="12" fontWeight="500">$105k</text>
              <text x="40" y="230" fill="#9ca3af" fontSize="12" fontWeight="500">$70k</text>
              
              {/* Grid lines */}
              <line x1="80" y1="20" x2="80" y2="240" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="80" y1="20" x2="960" y2="20" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="80" y1="130" x2="960" y2="130" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="80" y1="240" x2="960" y2="240" stroke="#e5e7eb" strokeWidth="1" />
              
              {/* X-axis labels */}
              {portfolioData.map((item, index) => {
                const x = 80 + (index * 80)
                return (
                  <text key={item.name} x={x} y="255" fill="#9ca3af" fontSize="12" textAnchor="middle">
                    {item.name}
                  </text>
                )
              })}
              
              {/* Portfolio line - smooth curved path */}
              <path
                d={(() => {
                  const points = portfolioData.map((item, index) => {
                    const x = 80 + (index * 80)
                    // Scale: 100k = 130 (middle), 70k = 230 (bottom), 140k = 20 (top)
                    const y = 130 - ((item.value - 105000) / 35000) * 110
                    return { x, y }
                  })
                  
                  // Create smooth curve using quadratic bezier
                  let path = `M ${points[0].x},${points[0].y}`
                  for (let i = 1; i < points.length; i++) {
                    const prev = points[i - 1]
                    const curr = points[i]
                    const midX = (prev.x + curr.x) / 2
                    path += ` Q ${prev.x},${prev.y} ${midX},${(prev.y + curr.y) / 2}`
                    path += ` T ${curr.x},${curr.y}`
                  }
                  return path
                })()}
                fill="none"
                stroke="#081f3b"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Popular Stocks Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#081f3b', margin: '0 0 24px 0' }}>
            Popular Stocks
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '24px'
          }}>
            {popularStocks.map((stock) => (
              <div
                key={stock.ticker}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '16px',
                  border: '1px solid #e5e7eb',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#081f3b', margin: '0 0 4px 0' }}>
                      {stock.ticker}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                      {stock.name}
                    </p>
                  </div>
                  {stock.positive ? (
                    <ArrowUpRight size={20} color="#10b981" />
                  ) : (
                    <ArrowDownRight size={20} color="#ef4444" />
                  )}
                </div>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#081f3b', margin: '8px 0 4px 0' }}>
                  ${stock.price}
                </p>
                <p style={{
                  fontSize: '14px',
                  color: stock.positive ? '#10b981' : '#ef4444',
                  margin: 0,
                  fontWeight: '500'
                }}>
                  {stock.change} ({stock.changePercent})
                </p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/markets')}
              style={{
                padding: '12px 32px',
                borderRadius: '8px',
                border: '2px solid #081f3b',
                backgroundColor: 'white',
                color: '#081f3b',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#081f3b'
                e.target.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'white'
                e.target.style.color = '#081f3b'
              }}
            >
              View All Stocks
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
>>>>>>> Stashed changes
