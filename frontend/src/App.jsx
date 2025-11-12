import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
import Dashboard from './pages/Dashboard';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (<Dashboard />);
}

export default App;
