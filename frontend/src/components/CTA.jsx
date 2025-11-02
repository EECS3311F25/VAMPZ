import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <div className="cta">
      <div className="cta-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cta-title">
            Start Building with StockSprout
          </h2>
          <p className="cta-subtitle">
            Join thousands of developers using our market data API to power their applications.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cta-button"
          >
            Create Account
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
