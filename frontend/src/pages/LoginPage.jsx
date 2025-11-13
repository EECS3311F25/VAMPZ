import { useState } from 'react'



function LoginPage({ onSwitchToSignup, onSwitchToForgotPassword, onLoginSuccess }) {

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

  

    const handleSubmit = (e) => {

      e.preventDefault()

      // Handle login logic here

      console.log('Login attempt:', { email, password })

      if (email && password && onLoginSuccess) {
        onLoginSuccess()
      }

<<<<<<< Updated upstream
=======
    // Allow login with any credentials - always succeed
    if (email && password) {
      const result = await login(email, password)
      if (result.success) {
        onLoginSuccess()
      } else {
        // Even if backend fails, create a mock user and redirect
        onLoginSuccess()
      }
    } else {
      setError('Please enter email and password')
>>>>>>> Stashed changes
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

  

export { LoginPage };


