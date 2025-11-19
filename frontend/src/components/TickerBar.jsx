import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const SYMBOLS = [
  'AAPL', 'TSLA', 'AMZN', 'MSFT', 'NVDA', 'GOOGL', 'META', 'NFLX', 'JPM', 'V'
];

// Deduplicate symbols just in case
const UNIQUE_SYMBOLS = [...new Set(SYMBOLS)];
const CACHE_KEY = 'ticker_data_cache_v2'; // Updated cache key for new list
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export default function TickerBar() {
  const [tickers, setTickers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickerData = async () => {
      // Check cache first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setTickers(data);
          setLoading(false);
          return;
        }
      }

      try {
        // Process symbols in chunks to avoid overwhelming the browser/server
        const chunkSize = 5;
        const results = [];

        for (let i = 0; i < UNIQUE_SYMBOLS.length; i += chunkSize) {
          const chunk = UNIQUE_SYMBOLS.slice(i, i + chunkSize);
          const chunkPromises = chunk.map(async (symbol) => {
            try {
              const [currentRes, yesterdayRes] = await Promise.all([
                fetch(`http://localhost:8080/api/marketData/currentStockPrice?symbol=${symbol}`),
                fetch(`http://localhost:8080/api/marketData/yesterdayStockPrice?symbol=${symbol}`)
              ]);

              if (!currentRes.ok || !yesterdayRes.ok) return null;

              const currentData = await currentRes.json();
              const yesterdayData = await yesterdayRes.json();

              const currentPrice = currentData.price;
              const yesterdayPrice = yesterdayData.price;
              const change = currentPrice - yesterdayPrice;
              const changePercent = (change / yesterdayPrice) * 100;

              return {
                symbol,
                price: currentPrice.toFixed(2),
                change: (change >= 0 ? '+' : '') + change.toFixed(2),
                changePercent: (change >= 0 ? '+' : '') + changePercent.toFixed(2) + '%',
                positive: change >= 0
              };
            } catch (error) {
              console.error(`Error fetching data for ${symbol}:`, error);
              return null;
            }
          });

          const chunkResults = await Promise.all(chunkPromises);
          results.push(...chunkResults.filter(r => r !== null));

          // Small delay between chunks to be nice to the network
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        setTickers(results);

        // Save to cache
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: results
        }));

      } catch (error) {
        console.error("Error fetching ticker data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickerData();
  }, []);

  if (loading) {
    return (
      <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center justify-center">
        <span className="text-xs text-slate-400">Loading market data...</span>
      </div>
    );
  }

  if (tickers.length === 0) return null;

  return (
    <div className="bg-slate-50 border-b border-slate-200 overflow-hidden py-2">
      <div className="flex whitespace-nowrap">
        <motion.div
          // Move by 1/3 of the width (since we have 3 sets of data)
          animate={{ x: ['0%', '-33.33%'] }}
          transition={{
            repeat: Infinity,
            duration: Math.max(60, tickers.length * 5), // Slower animation
            ease: "linear"
          }}
          className="flex items-center gap-8 px-4"
        >
          {/* Render 3 copies for seamless looping */}
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
