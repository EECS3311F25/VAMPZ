export default function StockSubNavigation({ activeSubNav, onSubNavChange, subNavItems = ['News', 'Press Releases', 'Financial Reports', 'Profile'] }) {
  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      borderBottom: '1px solid #e3e6e0'
    }}>
      {subNavItems.map((item) => {
        const itemKey = item.toLowerCase().replace(' ', '')
        return (
          <button
            key={item}
            onClick={() => onSubNavChange(itemKey)}
            style={{
              padding: '12px 16px',
              backgroundColor: 'transparent',
              color: activeSubNav === itemKey ? '#1e5fa8' : '#393f4a',
              border: 'none',
              borderBottom: activeSubNav === itemKey ? '2px solid #1e5fa8' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeSubNav === itemKey ? '600' : '500',
              transition: 'all 0.2s'
            }}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}

