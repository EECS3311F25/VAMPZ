import { motion } from 'framer-motion';
import DataWidget from './DataWidget';
import { Search } from 'lucide-react';

export default function Hero() {
  const appleDetails = [
    { label: 'Open', value: '112.68' },
    { label: 'Prev Close', value: '110.08' },
    { label: 'Volume', value: '183,055,376' },
    { label: 'Market Cap', value: '1.883T' },
    { label: 'Day Range', value: '109.16 - 112.86' },
    { label: '52 Week Range', value: '53.15 - 137.98' },
  ];

  const portfolioStocks = [
    { symbol: 'ZM', name: 'Zoom Video...', price: '492.60', change: '+24.13', positive: true },
    { symbol: 'SPY', name: 'SPDR S&P...', price: '330.30', change: '+3.33', positive: true },
    { symbol: 'NFLX', name: 'Netflix Inc...', price: '482.47', change: '-4.3', positive: false },
    { symbol: 'XG/USD', name: 'Coppe Po...', price: '318.05', change: '+3.25%', positive: true },
  ];

  return (
    <div className="hero">
      <div className="hero-grid">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-text"
        >
          <h1 className="hero-title">
            Grow your portfolio,<br></br>Grow your{' '}
            <span className="hero-title-primary">potential</span>
          </h1>
          <p className="hero-subtitle">
           Develop your investing skills with real-time risk free simulations.
          </p>
          <div className="hero-actions">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hero-button"
            >
              Start now
            </motion.button>
            <motion.a
              href="#"
              whileHover={{ x: 5 }}
              className="hero-link"
            >
              Contact sales <span>&gt;</span>
            </motion.a>
          </div>
        </motion.div>

        <div className="hero-widgets">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <DataWidget
              title="Bitcoin - Binance"
              symbol="BTC"
              price="10,617.94 USD"
              change="+85.32"
              changePercent="+0.81%"
              positive={true}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <DataWidget
              title="Apple Inc."
              symbol="AAPL"
              price="111.81 USD"
              change="+1.73"
              changePercent="+1.57%"
              positive={true}
              details={appleDetails}
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="portfolio-widget"
      >
        <h2 className="portfolio-title">PORTFOLIO</h2>
        <div className="portfolio-search">
          <Search className="portfolio-search-icon" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="portfolio-search-input"
          />
        </div>
        <div className="portfolio-list">
          {portfolioStocks.map((stock, idx) => (
            <div key={idx} className="portfolio-item">
              <div className="portfolio-item-left">
                <div className={`portfolio-symbol-box ${stock.positive ? 'portfolio-symbol-box-positive' : 'portfolio-symbol-box-negative'}`}>
                  <span>{stock.symbol}</span>
                </div>
                <div className="portfolio-item-info">
                  <p className="portfolio-item-name">{stock.symbol} {stock.name}</p>
                </div>
              </div>
              <div className="portfolio-item-right">
                <p className="portfolio-item-price">{stock.price}</p>
                <p className={`portfolio-item-change ${stock.positive ? 'portfolio-item-change-positive' : 'portfolio-item-change-negative'}`}>
                  {stock.positive ? '+' : ''}{stock.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
