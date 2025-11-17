import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Menu } from 'lucide-react'

export default function StockPageHeader({ onSearch }) {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    setShowSearchResults(e.target.value.length > 0)
    if (onSearch) {
      onSearch(e.target.value)
    }
  }

  return (
    <header style={{
      backgroundColor: 'white',
      borderBottom: '1px solid #e3e6e0',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 2px rgba(8, 31, 59, 0.08)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Menu size={24} color="#081f3b" />
        </button>
        <h1 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: '#081f3b',
          margin: 0,
          cursor: 'pointer'
        }} onClick={() => navigate('/')}>
          Stock<span style={{ fontWeight: '400' }}>Sprout</span>
        </h1>
      </div>

      <div style={{
        flex: 1,
        maxWidth: '500px',
        margin: '0 40px',
        position: 'relative'
      }}>
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Search
            size={20}
            color="#393f4a"
            style={{
              position: 'absolute',
              left: '12px',
              pointerEvents: 'none'
            }}
          />
          <input
            type="text"
            placeholder="Search stocks..."
            value={searchQuery}
            onChange={handleSearch}
            style={{
              width: '100%',
              padding: '10px 12px 10px 40px',
              border: '1px solid #e3e6e0',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#1e5fa8'}
            onBlur={(e) => e.target.style.borderColor = '#e3e6e0'}
          />
        </div>
        {showSearchResults && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #e3e6e0',
            borderRadius: '8px',
            marginTop: '4px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            maxHeight: '300px',
            overflowY: 'auto',
            zIndex: 1000
          }}>
            <div style={{ padding: '12px', color: '#393f4a', fontSize: '14px' }}>
              Search results for "{searchQuery}"
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => navigate('/signup')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1e5fa8',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#155a9e'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#1e5fa8'}
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate('/login')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#081f3b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#0a2a4f'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#081f3b'}
        >
          Sign In
        </button>
      </div>
    </header>
  )
}

