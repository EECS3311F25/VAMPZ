import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Dashboard() {
  const { user, loading, checkAuth, logout } = useAuth()
  const navigate = useNavigate()
  const [fetching, setFetching] = useState(true)

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
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
      <h1>Hello {user.firstName}</h1>
      <button
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </div>
  )
}


