import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export default function MockPLWidget() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-xs bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 p-6 border border-white/20 dark:border-slate-800"
        >
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Unrealized P/L</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-500">Total return</p>
                </div>
                <div className="bg-teal-50 dark:bg-slate-800 p-3 rounded-xl border border-teal-100 dark:border-slate-700 shadow-inner">
                    <TrendingUp className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
            </div>

            <div>
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">+$15,430.00</h2>
                <div className="flex items-center gap-2">
                    <span className="text-teal-600 dark:text-teal-400 font-bold text-sm">↗ +12.5%</span>
                    <span className="text-slate-500 text-sm">• All time</span>
                </div>
            </div>
        </motion.div>
    );
}
