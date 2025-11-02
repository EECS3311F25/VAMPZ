import { useState } from 'react'
import './index.css'
import { LoginPage, SignupPage, ForgotPasswordPage } from './components'

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
