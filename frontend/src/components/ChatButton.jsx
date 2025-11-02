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
      className="chat-button"
      aria-label="Open chat"
    >
      <MessageCircle size={24} />
    </motion.button>
  );
}
