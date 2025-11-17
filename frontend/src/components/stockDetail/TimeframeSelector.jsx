export default function TimeframeSelector({ activeTimeframe, onTimeframeChange, timeframes = ['1D', '5D', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'] }) {
  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      marginBottom: '24px',
      borderBottom: '1px solid #e3e6e0',
      paddingBottom: '8px'
    }}>
      {timeframes.map((timeframe) => (
        <button
          key={timeframe}
          onClick={() => onTimeframeChange(timeframe)}
          style={{
            padding: '8px 16px',
            backgroundColor: activeTimeframe === timeframe ? '#1e5fa8' : 'transparent',
            color: activeTimeframe === timeframe ? 'white' : '#393f4a',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: activeTimeframe === timeframe ? '600' : '500',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            if (activeTimeframe !== timeframe) {
              e.target.style.backgroundColor = '#F7F9FC'
            }
          }}
          onMouseLeave={(e) => {
            if (activeTimeframe !== timeframe) {
              e.target.style.backgroundColor = 'transparent'
            }
          }}
        >
          {timeframe}
        </button>
      ))}
    </div>
  )
}

