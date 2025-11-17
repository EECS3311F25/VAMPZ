export default function StockStatistics({ stats }) {
  const defaultStats = {
    open: '0.0050',
    prevClose: '0.0050',
    volume: '37.92K',
    week52Range: '0.0050-0.015',
    todayRange: '0.0050-0.010',
    marketCap: '1.00M',
    avgVol: '59.50K'
  }

  const displayStats = stats || defaultStats

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '24px',
      border: '1px solid #e3e6e0'
    }}>
      <h3 style={{
        fontSize: '16px',
        fontWeight: '600',
        color: '#081f3b',
        marginBottom: '16px'
      }}>
        Key Statistics
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px'
      }}>
        <div>
          <div style={{ fontSize: '12px', color: '#393f4a', marginBottom: '4px' }}>OPEN/PREV CLOSE</div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#081f3b' }}>
            {displayStats.open}/{displayStats.prevClose}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#393f4a', marginBottom: '4px' }}>VOL</div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#081f3b' }}>{displayStats.volume}</div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#393f4a', marginBottom: '4px' }}>52 WEEK RANGE</div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#081f3b' }}>{displayStats.week52Range}</div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#393f4a', marginBottom: '4px' }}>TODAY RANGE</div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#081f3b' }}>{displayStats.todayRange}</div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#393f4a', marginBottom: '4px' }}>MARKET CAP</div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#081f3b' }}>{displayStats.marketCap}</div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#393f4a', marginBottom: '4px' }}>AVG VOL (3M)</div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#081f3b' }}>{displayStats.avgVol}</div>
        </div>
      </div>
    </div>
  )
}

