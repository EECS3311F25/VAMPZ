import { useState } from 'react';
import TopBanner from './components/TopBanner';
import Navbar from './components/Navbar';
import TickerBar from './components/TickerBar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ChatButton from './components/ChatButton';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'login' | 'signup' | 'forgot'

  const showHome = currentPage === 'home';

  return (
    <div className="min-h-screen bg-white">
      <TopBanner />
      <Navbar
        onSignIn={() => setCurrentPage('login')}
        onSignUp={() => setCurrentPage('signup')}
        onGoHome={() => setCurrentPage('home')}
      />

      {showHome && (
        <>
          <TickerBar />
          <Hero />
          <Features />
          <Pricing />
          <CTA />
          <Footer />
        </>
      )}

      {currentPage === 'login' && (
        <LoginPage
          onSwitchToSignup={() => setCurrentPage('signup')}
          onSwitchToForgotPassword={() => setCurrentPage('forgot')}
        />
      )}

      {currentPage === 'signup' && (
        <SignupPage onSwitchToLogin={() => setCurrentPage('login')} />
      )}

      {currentPage === 'forgot' && (
        <ForgotPasswordPage onSwitchToLogin={() => setCurrentPage('login')} />
      )}

      <ChatButton />
    </div>
  );
}

export default App;
