import { useState } from 'react'
import './index.css'

import './components/LoginPage.jsx'
import './components/SignupPage.jsx'
import './components/ForgotPasswordPage.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('login')

  return (
    <>
      {currentPage === 'login' && (
        <LoginPage 
          onSwitchToSignup={() => setCurrentPage('signup')}
          onSwitchToForgotPassword={() => setCurrentPage('forgotPassword')}
        />
      )}
      {currentPage === 'signup' && (
        <SignupPage onSwitchToLogin={() => setCurrentPage('login')} />
      )}
      {currentPage === 'forgotPassword' && (
        <ForgotPasswordPage onSwitchToLogin={() => setCurrentPage('login')} />
      )}
    </>
  )
}

export default App
