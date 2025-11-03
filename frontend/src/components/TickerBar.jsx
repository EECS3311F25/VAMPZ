import { motion } from 'framer-motion';

const tickers = [
  { symbol: 'AAPL', price: '111.81', change: '+1.73', changePercent: '+1.57%', positive: true },
  { symbol: 'MSFT', price: '378.90', change: '+2.45', changePercent: '+0.65%', positive: true },
  { symbol: 'GOOGL', price: '142.50', change: '-1.20', changePercent: '-0.84%', positive: false },
  { symbol: 'TSLA', price: '248.42', change: '+5.32', changePercent: '+2.19%', positive: true },
  { symbol: 'BTC/USD', price: '10,617.94', change: '+85.32', changePercent: '+0.81%', positive: true },
  { symbol: 'ETH/USD', price: '3,857.40', change: '-16.20', changePercent: '-0.42%', positive: false },
  { symbol: 'EUR/USD', price: '1.15', change: '-0.0025', changePercent: '-0.22%', positive: false },
  { symbol: 'SPY', price: '450.30', change: '+3.33', changePercent: '+0.75%', positive: true },
];

export default function TickerBar() {
  return (
    <div className="ticker-bar">
      <div className="ticker-container">
        <div className="ticker-content">
          {tickers.map((ticker, index) => (
            <motion.div
              key={ticker.symbol}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="ticker-item"
            >
              <span className="ticker-symbol">{ticker.symbol}</span>
              <span className="ticker-price">{ticker.price}</span>
              <span className={ticker.positive ? 'ticker-change-positive' : 'ticker-change-negative'}>
                {ticker.change} {ticker.changePercent}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
