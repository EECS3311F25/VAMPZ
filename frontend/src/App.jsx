import { useState } from 'react'
import './index.css'

import {LoginPage} from "./Login-Signup-FP/LoginPage.jsx";
import {SignupPage} from "./Login-Signup-FP/SignupPage.jsx";
import {ForgotPasswordPage} from "./Login-Signup-FP/ForgotPasswordPage.jsx";

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
