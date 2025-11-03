import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

function SignupPage({ onSwitchToLogin }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    const nameParts = fullName.trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    if (!firstName) {
      setError('Please enter your full name')
      return
    }

    setLoading(true)
    const result = await signup(firstName, lastName, email, password)
    if (result.success) {
      navigate('/login')
    } else {
      setError(result.message || 'Signup failed')
    }
    setLoading(false)
  }



  return (

    <div className="login-container">

      <div className="left-section">

        <div className="branding">

          <span className="brand-bold">stock</span><span className="brand-regular">sprout</span>

        </div>

        <div className="promotional-content">

          <h2 className="promotional-title">Sprout Your Wealth, One Trade at a Time</h2>

          <p className="promotional-text">

            StockSprout helps you learn the market, test strategies, and build confidence before investing for real.

          </p>

          <p className="promotional-text bold-text">

            Create an account and start your journey to smarter investing today.

          </p>

        </div>

      </div>



      <div className="right-section">

        <div className="login-card">

          <h1 className="login-title">Create your account</h1>



          <form onSubmit={handleSubmit}>

            <div className="input-group">

              <label htmlFor="fullName">Full name*</label>

              <input

                type="text"

                id="fullName"

                placeholder="e.g. John Doe"

                value={fullName}

                onChange={(e) => setFullName(e.target.value)}

                required

              />

            </div>



            <div className="input-group">

              <label htmlFor="signupEmail">Email*</label>

              <input

                type="email"

                id="signupEmail"

                placeholder="e.g. john@domain.com"

                value={email}

                onChange={(e) => setEmail(e.target.value)}

                required

              />

            </div>



            <div className="input-group">

              <label htmlFor="signupPassword">Password*</label>

              <input

                type="password"

                id="signupPassword"

                value={password}

                onChange={(e) => setPassword(e.target.value)}

                required

              />

              <p className="password-hint">Minimum 8 characters</p>

            </div>



            <div className="input-group">

              <label htmlFor="confirmPassword">Confirm password*</label>

              <input

                type="password"

                id="confirmPassword"

                value={confirmPassword}

                onChange={(e) => setConfirmPassword(e.target.value)}

                required

              />

            </div>



            {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <button type="submit" className="continue-button" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>

          </form>



          <div className="signup-link">

            Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>Sign in</a>

          </div>

        </div>

      </div>

    </div>

  )

}

export { SignupPage };


