import { useState } from 'react'

function LoginPage({ onSwitchToSignup, onSwitchToForgotPassword }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login attempt:', { email, password })
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
            Sign in and start your journey to smarter investing today.
          </p>
        </div>
      </div>
      
      <div className="right-section">
        <div className="login-card">
          <h1 className="login-title">Sign in</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="e.g. john@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="input-group">
              <div className="label-row">
                <label htmlFor="password">Password</label>
                <a href="#" className="forgot-link" onClick={(e) => { e.preventDefault(); onSwitchToForgotPassword(); }}>Forgot your password?</a>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="continue-button">Log in</button>
          </form>
          
          <div className="signup-link">
            Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToSignup(); }}>Sign up</a>
          </div>
        </div>
      </div>
    </div>
  )
}

function SignupPage({ onSwitchToLogin }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle signup logic here
    console.log('Signup attempt:', { fullName, email, password, confirmPassword })
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
            
            <button type="submit" className="continue-button">Create account</button>
          </form>
          
          <div className="signup-link">
            Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>Sign in</a>
          </div>
        </div>
      </div>
    </div>
  )
}

function ForgotPasswordPage({ onSwitchToLogin }) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle forgot password logic here
    console.log('Forgot password attempt:', { email })
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
            Reset your password and get back to trading with confidence.
          </p>
        </div>
      </div>
      
      <div className="right-section">
        <div className="login-card">
          <p className="instruction-text">
            Enter the email address associated with your account and we'll send you a link to reset your password.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="forgotEmail">Email</label>
              <input
                type="email"
                id="forgotEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="continue-button">Continue</button>
          </form>
          
          <div className="signup-link">
            <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>Return to sign in</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export { LoginPage, SignupPage, ForgotPasswordPage }

