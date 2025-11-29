import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, X } from 'lucide-react';
import { useState } from 'react';

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-slate-900 text-white relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-center gap-3 text-sm font-medium">
              <Rocket size={16} className="text-teal-400" />
              <p>
                Get early access! Join the StockSprout AI Assistant waitlist now.{' '}
                <a href="#" className="text-teal-400 hover:text-teal-300 underline decoration-teal-400/50 hover:decoration-teal-300 transition-colors">
                  Join &rarr;
                </a>
              </p>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1"
              aria-label="Close banner"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
