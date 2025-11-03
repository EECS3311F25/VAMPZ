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
    <div id="pricing" className="pricing-section">
      <div className="pricing-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pricing-header"
        >
          <h2 className="pricing-title">Choose Your Plan</h2>
          <p className="pricing-subtitle">Start with Free, upgrade when you're ready</p>
        </motion.div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`pricing-card ${plan.highlight ? 'pricing-card-highlight' : ''}`}
            >
              {plan.highlight && <div className="pricing-badge">Popular</div>}
              <h3 className="pricing-card-name">{plan.name}</h3>
              <p className="pricing-card-desc">{plan.description}</p>
              <ul className="pricing-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="pricing-feature">
                    <Check size={18} className="pricing-check" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`pricing-button ${plan.highlight ? 'pricing-button-highlight' : ''}`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

