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
    <div className="bg-slate-50 border-b border-slate-200 overflow-hidden py-2">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear"
          }}
          className="flex items-center gap-8 px-4"
        >
          {[...tickers, ...tickers, ...tickers].map((ticker, index) => (
            <div key={`${ticker.symbol}-${index}`} className="flex items-center gap-2 text-sm font-medium">
              <span className="text-slate-900">{ticker.symbol}</span>
              <span className="text-slate-600">{ticker.price}</span>
              <span className={ticker.positive ? 'text-green-600' : 'text-red-600'}>
                {ticker.change} ({ticker.changePercent})
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
