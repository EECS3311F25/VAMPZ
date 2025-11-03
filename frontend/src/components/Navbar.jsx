import { Search } from 'lucide-react';

export default function Navbar({ onSignIn, onSignUp, onGoHome }) {
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (onGoHome) {
      onGoHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePricingClick = (e) => {
    e.preventDefault();
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div>
            <a href="#" onClick={handleHomeClick} className="navbar-logo-link">
              <h1 className="navbar-logo">
                <span className="navbar-logo-bold">Stock</span>
                <span className="navbar-logo-normal">Sprout</span>
              </h1>
            </a>
          </div>
          
          <div className="navbar-menu">
            <a href="#" onClick={handleHomeClick} className="navbar-menu-item">Home</a>
            <a href="#" onClick={handlePricingClick} className="navbar-menu-item">Pricing</a>
            <a href="#" className="navbar-menu-item">Docs</a>
            <div className="navbar-dropdown">
              <a href="#" className="navbar-menu-item">Contact</a>
              <div className="navbar-dropdown-menu">
                <a href="mailto:support@stocksprout.com" className="navbar-dropdown-item">
                  Email: support@stocksprout.com
                </a>
                <a href="#" className="navbar-dropdown-item">FAQ</a>
                <a href="#" className="navbar-dropdown-item">Our Team</a>
              </div>
            </div>
          </div>
          
          <div className="navbar-actions">
            <button className="navbar-search-btn">
              <Search size={20} />
            </button>
            <a href="#" className="navbar-signin" onClick={(e) => { e.preventDefault(); onSignIn && onSignIn(); }}>
              Sign in <span>&gt;</span>
            </a>
            <button className="navbar-signup" onClick={() => { onSignUp && onSignUp(); }}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
