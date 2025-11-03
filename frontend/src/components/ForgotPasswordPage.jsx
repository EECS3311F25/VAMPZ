import { useState } from 'react'

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

  export { ForgotPasswordPage };

