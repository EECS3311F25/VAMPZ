import { BarChart3 } from 'lucide-react'

export default function StockChart({ activeTimeframe, chartData }) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '24px',
      border: '1px solid #e3e6e0',
      height: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <div style={{
        textAlign: 'center',
        color: '#393f4a'
      }}>
        <BarChart3 size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
        <p style={{ fontSize: '14px', margin: 0 }}>Price Chart for {activeTimeframe}</p>
        <p style={{ fontSize: '12px', margin: '8px 0 0 0', opacity: 0.7 }}>
          Chart integration would go here
        </p>
        {chartData && (
          <p style={{ fontSize: '10px', margin: '8px 0 0 0', opacity: 0.5 }}>
            Chart data: {JSON.stringify(chartData)}
          </p>
        )}
      </div>
    </div>
  )
}

