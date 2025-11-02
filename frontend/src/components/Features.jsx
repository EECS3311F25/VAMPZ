import { motion } from 'framer-motion';
import { Zap, Database, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Fast & Reliable',
    description: 'Optimized for speed and uptime, ensuring your apps never miss a tick.',
    iconClass: 'feature-icon-yellow',
  },
  {
    icon: Database,
    title: 'Extensive Data Coverage',
    description: 'Access stocks, forex, crypto, and more through a unified API.',
    iconClass: 'feature-icon-blue',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Scalable',
    description: 'Enterprise-grade reliability and security built into every request.',
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
