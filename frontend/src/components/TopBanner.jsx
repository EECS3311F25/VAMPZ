import { motion } from 'framer-motion';
import { Rocket, X } from 'lucide-react';
import { useState } from 'react';

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="top-banner"
    >
      <div className="top-banner-content">
        <div className="top-banner-text">
          <Rocket size={16} />
          <p>
            Get early access! Join the StockSprout AI Assistant waitlist now.{' '}
            <a href="#" className="top-banner-link">Join &gt;</a>
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="top-banner-close"
          aria-label="Close banner"
        >
          <X size={18} />
        </button>
      </div>
    </motion.div>
  );
}
