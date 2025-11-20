import { motion } from 'framer-motion';
import DataWidget from './DataWidget';

import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  const appleDetails = [
    { label: 'Open', value: '112.68' },
    { label: 'Prev Close', value: '110.08' },
    { label: 'Volume', value: '183,055,376' },
    { label: 'Market Cap', value: '1.883T' },
    { label: 'Day Range', value: '109.16 - 112.86' },
    { label: '52 Week Range', value: '53.15 - 137.98' },
  ];



  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 min-h-[80vh] flex items-center pt-16 pb-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="absolute top-0 left-0 -mt-12 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/20 text-xs font-medium text-teal-700 dark:text-teal-300 border border-teal-100 dark:border-teal-800">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                Live market data • Updating...
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-8">
              Grow your portfolio,<br />Grow your{' '}
              <span className="text-teal-600 dark:text-teal-400">potential</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-lg">
              Practice real-time trading with virtual money. Test strategies, learn risk management, and build confidence before investing for real.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/signup')}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-teal-600/20 transition-all"
              >
                Get started – it’s free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/features')} // Changed to features or demo link if available
                className="flex items-center gap-2 px-8 py-4 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors bg-transparent border border-slate-200 dark:border-slate-700 hover:border-teal-600 dark:hover:border-teal-400 rounded-xl"
              >
                View demo
              </motion.button>
            </div>
          </motion.div>

          <div className="relative hidden lg:block">
            <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-teal-50 rounded-full blur-3xl opacity-50" />

            <div className="relative grid gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute top-0 right-0 z-10"
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
                className="mt-32 ml-12"
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
        </div>


      </div>
    </div>
  );
}
