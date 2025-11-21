import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Info, Plus, Minus } from 'lucide-react';

export default function MockTradeWidget() {
    const [activeTab, setActiveTab] = useState('buy');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 p-6 border border-white/20 dark:border-slate-700/50"
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Trade</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Buy or sell assets</p>
                </div>
            </div>

            {/* Trade Stock & Tabs */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Trade Stock</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Paper trading • No fees</p>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                    <button
                        onClick={() => setActiveTab('buy')}
                        className={`px-4 py-1 text-xs font-medium rounded-md transition-all ${activeTab === 'buy'
                                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                    >
                        Buy
                    </button>
                    <button
                        onClick={() => setActiveTab('sell')}
                        className={`px-4 py-1 text-xs font-medium rounded-md transition-all ${activeTab === 'sell'
                                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                    >
                        Sell
                    </button>
                </div>
            </div>

            {/* Symbol Input */}
            <div className="mb-4">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Symbol</label>
                <div className="relative">
                    <input
                        type="text"
                        value="AAPL"
                        readOnly
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-4 pr-10 text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
                    />
                    <Search className="absolute right-3 top-2.5 text-slate-400 w-4 h-4" />
                </div>
            </div>

            {/* Price Display */}
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-4 flex justify-between items-center">
                <div>
                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Current Price</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">$150.00</p>
                </div>
                <div className="bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-1 rounded-lg text-xs font-bold">
                    ↗ +2.34%
                </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">Quantity</label>
                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-2">
                        <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-slate-900 dark:text-white">1</span>
                        <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">Shares</span>
                </div>
            </div>

            {/* Cost & Fees */}
            <div className="flex justify-between items-center mb-2 text-sm">
                <span className="text-slate-500 dark:text-slate-400">Estimated Cost</span>
                <span className="font-bold text-slate-900 dark:text-white">$150.00</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-sm">
                <span className="text-slate-500 dark:text-slate-400">Fees</span>
                <span className="font-bold text-teal-600 dark:text-teal-400">Free</span>
            </div>

            {/* Portfolio Impact */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-xl p-3 mb-6 flex gap-3">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                    <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-0.5">Portfolio Impact</p>
                    <p className="text-[10px] text-blue-600 dark:text-blue-400">-0.12% • New Balance: $125,280.50</p>
                </div>
            </div>

            {/* Action Button */}
            <button className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-teal-600/20 transition-all text-sm">
                Buy AAPL
            </button>
        </motion.div>
    );
}
