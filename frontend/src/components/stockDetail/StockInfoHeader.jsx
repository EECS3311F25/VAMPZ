export default function StockInfoHeader({ stockSymbol, stockName, marketStatus }) {
  return (
    <>
      {/* Breadcrumb */}
      <div style={{
        fontSize: '12px',
        color: '#393f4a',
        marginBottom: '16px'
      }}>
        Markets / {stockSymbol}
      </div>

      {/* Stock Name */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#081f3b',
          margin: '0 0 8px 0'
        }}>
          {stockSymbol} {stockName}
        </h2>
        <div style={{
          fontSize: '12px',
          color: '#393f4a'
        }}>
          {marketStatus || 'Closed 15:19 11/11 EST'}
        </div>
      </div>
    </>
  )
}

