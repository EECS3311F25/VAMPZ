import { motion } from 'framer-motion';
import { LineChart, GraduationCap, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: LineChart,
    title: 'Realistic Market Simulation',
    description: 'Practice trading with live market data and dynamic price movements.',
    iconClass: 'feature-icon-yellow',
  },
  {
    icon: GraduationCap,
    title: 'Guided Learning Experience',
    description: 'Understand the “why” behind every trade with built-in tutorials and feedback.',
    iconClass: 'feature-icon-blue',
  },
  {
    icon: BarChart3,
    title: 'Interactive Portfolio Tracking',
    description: 'Visualize growth through detailed performance charts, trade history and analytics.',
    iconClass: 'feature-icon-green',
  },
];

export default function Features() {
  return (
    <div className="features">
      <div className="features-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="features-header"
        >
          <h2 className="features-title">Why Choose StockSprout?</h2>
          <p className="features-subtitle">Built for developers who need reliable financial data</p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="feature-card"
              >
                <div className={`feature-icon-container ${feature.iconClass}`}>
                  <Icon size={28} />
                </div>
                <h3 className="feature-card-title">{feature.title}</h3>
                <p className="feature-card-desc">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
