import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChatButton() {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full shadow-lg shadow-teal-600/30 z-50 flex items-center justify-center transition-colors"
      aria-label="Open chat"
    >
      <MessageCircle size={24} />
    </motion.button>
  );
}
