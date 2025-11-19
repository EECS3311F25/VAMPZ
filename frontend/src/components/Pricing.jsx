import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    description: 'Perfect for getting started',
    features: [
      '💸 $10,000 virtual balance for paper trading',
      '📈 Basic stocks only (U.S. equities)',
      '⏱️ 15-minute delayed market data',
      '📊 Simple portfolio tracking dashboard',
      '🔍 Basic analytics (profit/loss, average buy price, gain %)',
      '💬 Community access (read-only)',
      '🧠 Introductory trading tutorials',
    ],
    highlight: false,
  },
  {
    name: 'Student Plan',
    description: 'For serious learners',
    features: [
      '💸 $100,000 virtual balance',
      '⚡ Real-time market data (U.S. + global stocks)',
      '💱 Access to ETFs and Crypto simulators',
      '🧩 Advanced charting tools (candlesticks, RSI, MACD, EMA)',
      '📊 Detailed portfolio analytics & performance graphs',
      '🧠 AI trading assistant (basic hints)',
      '📰 Curated financial news feed',
      '📚 Student resources & strategy templates',
      '💬 Community access (post & comment)',
      '☁️ Save multiple portfolios',
    ],
    highlight: true,
  },
  {
    name: 'Pro Plan',
    description: 'For advanced traders',
    features: [
      '💸 $1,000,000 virtual balance',
      '⚡ Ultra-low latency real-time data across Stocks, Forex, and Crypto',
      '🧮 Backtesting engine for custom strategies',
      '🤖 Automated bot trading (script or AI-assisted)',
      '📊 Comprehensive analytics dashboard (Sharpe ratio, drawdown, win rate)',
      '🧠 AI portfolio advisor (risk/reward optimization)',
      '🧾 Export data to CSV or API',
      '🏆 Leaderboard placement & trading competitions',
      '📈 Access to beta features & private community',
      '🎓 Priority support and mentorship sessions',
    ],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <div id="pricing" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Choose Your Plan</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">Start with Free, upgrade when you're ready</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative rounded-2xl p-8 border ${plan.highlight
                ? 'border-teal-500 shadow-xl shadow-teal-500/10 bg-white dark:bg-slate-900'
                : 'border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md bg-white dark:bg-slate-900'
                } transition-all duration-300`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg shadow-teal-600/20">
                  Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8">{plan.description}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <Check size={18} className="text-teal-600" />
                    </div>
                    <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 px-6 rounded-xl font-medium transition-all ${plan.highlight
                ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/20'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white'
                }`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
