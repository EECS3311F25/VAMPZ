import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { TrendingUp, TrendingDown, Search, LogOut, DollarSign, PieChart, BarChart3, Activity, LayoutDashboard, Wallet, Eye, History, Settings, Home } from 'lucide-react'
import DataWidget from '../components/DataWidget.jsx'

export default function Dashboard() {
  const { user, loading, checkAuth, logout } = useAuth()
  const navigate = useNavigate()
  const [fetching, setFetching] = useState(true)
  const [activeMenu, setActiveMenu] = useState('dashboard')

  // Dummy data
  const statsCards = [
    { title: 'Portfolio Value', value: '$125,430.50', change: '+$2,450.20', changePercent: '+2.00%', positive: true, icon: DollarSign },
    { title: 'Total Gain', value: '+$15,430.50', change: '+$1,230.40', changePercent: '+8.67%', positive: true, icon: TrendingUp },
    { title: 'Active Positions', value: '12', change: '+2', changePercent: 'This month', positive: true, icon: PieChart },
    { title: 'Win Rate', value: '68%', change: '+5%', changePercent: 'vs last month', positive: true, icon: Activity },
  ]

  const portfolioStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '175.43', change: '+2.34', changePercent: '+1.35%', positive: true, shares: 50 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: '378.85', change: '-1.23', changePercent: '-0.32%', positive: false, shares: 30 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '142.56', change: '+3.21', changePercent: '+2.30%', positive: true, shares: 25 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: '148.92', change: '+0.87', changePercent: '+0.59%', positive: true, shares: 40 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: '245.67', change: '-5.43', changePercent: '-2.16%', positive: false, shares: 15 },
  ]

  const recentActivity = [
    { type: 'Buy', symbol: 'NVDA', shares: 10, price: '485.20', date: '2 hours ago', positive: true },
    { type: 'Sell', symbol: 'META', shares: 5, price: '312.45', date: '1 day ago', positive: false },
    { type: 'Buy', symbol: 'NFLX', shares: 8, price: '425.80', date: '2 days ago', positive: true },
    { type: 'Buy', symbol: 'AMD', shares: 20, price: '128.90', date: '3 days ago', positive: true },
  ]

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
    { id: 'watchlist', label: 'Watchlist', icon: Eye },
    { id: 'transactions', label: 'Transactions', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  useEffect(() => {
    const fetchUser = async () => {
      await checkAuth()
      setFetching(false)
    }
    fetchUser()
  }, [])

  useEffect(() => {
    if (!loading && !fetching && !user) {
      navigate('/login')
    }
  }, [user, loading, fetching, navigate])

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  if (loading || fetching) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{
        width: '260px',
        backgroundColor: 'white',
        borderRight: '1px solid #e3e6e0',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        boxShadow: '1px 0 2px rgba(8, 31, 59, 0.08)'
      }}>
        {/* Logo/Brand */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #e3e6e0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Home size={24} color="#081f3b" />
            <span style={{ fontSize: '20px', fontWeight: '700', color: '#081f3b' }}>
              Stock<span style={{ fontWeight: '400' }}>Sprout</span>
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav style={{ flex: 1, padding: '20px 0', overflowY: 'auto' }}>
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeMenu === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 20px',
                  backgroundColor: isActive ? '#F7F9FC' : 'transparent',
                  border: 'none',
                  borderLeft: isActive ? '3px solid #1e5fa8' : '3px solid transparent',
                  color: isActive ? '#1e5fa8' : '#393f4a',
                  fontWeight: isActive ? '600' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.target.style.backgroundColor = '#F7F9FC'
                    e.target.style.color = '#081f3b'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = '#393f4a'
                  }
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* User Section */}
        <div style={{ padding: '20px', borderTop: '1px solid #e3e6e0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#1e5fa8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '600',
              fontSize: '16px'
            }}>
              {user.firstName?.[0]?.toUpperCase() || 'U'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#081f3b', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.firstName} {user.lastName}
              </p>
              <p style={{ fontSize: '12px', color: '#393f4a', margin: '2px 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 16px',
              backgroundColor: '#081f3b',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#0a2a4f'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#081f3b'}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e3e6e0', boxShadow: '0 1px 2px rgba(8, 31, 59, 0.08)', padding: '20px 32px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#081f3b', margin: 0 }}>
              Welcome back, {user.firstName}!
            </h1>
            <p style={{ fontSize: '14px', color: '#393f4a', margin: '4px 0 0 0' }}>
              Here's your portfolio overview
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {/* Stats Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '32px'
            }}>
              {statsCards.map((stat, idx) => {
                const Icon = stat.icon
                return (
                  <div
                    key={idx}
                    className="data-widget"
                    style={{ padding: '24px' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#393f4a', margin: 0 }}>
                        {stat.title}
                      </h3>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        backgroundColor: '#dbeafe',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#1e5fa8'
                      }}>
                        <Icon size={20} />
                      </div>
                    </div>
                    <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#081f3b', margin: '0 0 8px 0' }}>
                      {stat.value}
                    </p>
                    <div className={widget-change ${stat.positive ? 'widget-change-positive' : 'widget-change-negative'}}>
                      {stat.positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      <span>{stat.change} ({stat.changePercent})</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Portfolio and Activity Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '24px'
            }}>
              {/* Portfolio Section */}
              <div className="portfolio-widget" style={{ marginTop: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h2 className="portfolio-title" style={{ margin: 0 }}>MY PORTFOLIO</h2>
                  <button
                    className="hero-button"
                    style={{
                      padding: '8px 16px',
                      fontSize: '14px',
                      margin: 0
                    }}
                  >
                    Add Position
                  </button>
                </div>
                <div className="portfolio-search">
                  <Search className="portfolio-search-icon" size={18} />
                  <input
                    type="text"
                    placeholder="Search stocks..."
                    className="portfolio-search-input"
                  />
                </div>
                <div className="portfolio-list">
                  {portfolioStocks.map((stock, idx) => (
                    <div key={idx} className="portfolio-item">
                      <div className="portfolio-item-left">
                        <div className={portfolio-symbol-box ${stock.positive ? 'portfolio-symbol-box-positive' : 'portfolio-symbol-box-negative'}}>
                          <span>{stock.symbol}</span>
                        </div>
                        <div className="portfolio-item-info">
                          <p className="portfolio-item-name">{stock.symbol} {stock.name}</p>
                          <p style={{ fontSize: '12px', color: '#393f4a', margin: '2px 0 0 0' }}>
                            {stock.shares} shares
                          </p>
                        </div>
                      </div>
                      <div className="portfolio-item-right">
                        <p className="portfolio-item-price">${stock.price}</p>
                        <p className={portfolio-item-change ${stock.positive ? 'portfolio-item-change-positive' : 'portfolio-item-change-negative'}}>
                          {stock.positive ? '+' : ''}{stock.change} ({stock.changePercent})
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity Section */}
              <div className="data-widget" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <BarChart3 size={20} color="#081f3b" />
                  <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#081f3b', margin: 0 }}>
                    Recent Activity
                  </h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {recentActivity.map((activity, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '12px',
                        backgroundColor: '#F7F9FC',
                        borderRadius: '8px',
                        borderLeft: 3px solid ${activity.positive ? '#059669' : '#dc2626'}
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: activity.positive ? '#059669' : '#dc2626'
                        }}>
                          {activity.type}
                        </span>
                        <span style={{ fontSize: '12px', color: '#393f4a' }}>{activity.date}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#081f3b' }}>
                          {activity.shares} {activity.symbol}
                        </span>
                        <span style={{ fontSize: '14px', color: '#393f4a' }}>${activity.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Watchlist/Featured Stocks */}
            <div style={{ marginTop: '32px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#081f3b', marginBottom: '20px' }}>
                Featured Stocks
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px'
              }}>
                <DataWidget
                  title="Bitcoin - Binance"
                  symbol="BTC"
                  price="42,617.94 USD"
                  change="+1,285.32"
                  changePercent="+3.11%"
                  positive={true}
                />
                <DataWidget
                  title="Apple Inc."
                  symbol="AAPL"
                  price="175.43 USD"
                  change="+2.34"
                  changePercent="+1.35%"
                  positive={true}
                  details={[
                    { label: 'Open', value: '173.20' },
                    { label: 'Prev Close', value: '173.09' },
                    { label: 'Volume', value: '45.2M' },
                  ]}
                />
                <DataWidget
                  title="Microsoft Corp."
                  symbol="MSFT"
                  price="378.85 USD"
                  change="-1.23"
                  changePercent="-0.32%"
                  positive={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
