import { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const TradePanel = ({ symbol = "AAPL", currentPrice = 150.00, onTrade, onSymbolChange }) => {
    const [type, setType] = useState('buy');
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

    const total = (quantity * currentPrice).toFixed(2);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (onTrade) {
            onTrade({ type, symbol, quantity: Number(quantity), price: currentPrice });
        }
        setLoading(false);
        // Reset or show success message
    };

    return (
        <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Trade Stock</h3>
                <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                    <button
                        onClick={() => setType('buy')}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${type === 'buy'
                            ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                            }`}
                    >
                        Buy
                    </button>
                    <button
                        onClick={() => setType('sell')}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${type === 'sell'
                            ? 'bg-white dark:bg-slate-700 text-red-500 shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                            }`}
                    >
                        Sell
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                        Symbol
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={symbol}
                            onChange={(e) => onSymbolChange && onSymbolChange(e.target.value.toUpperCase())}
                            className="block w-full pl-4 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all font-bold uppercase"
                            placeholder="e.g. AAPL"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                        Quantity
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="block w-full pl-4 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between py-4 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Estimated Total</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">${total}</span>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium shadow-lg transition-all ${type === 'buy'
                        ? 'bg-teal-600 hover:bg-teal-700 shadow-teal-600/20'
                        : 'bg-red-500 hover:bg-red-600 shadow-red-500/20'
                        } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                >
                    {loading ? (
                        'Processing...'
                    ) : (
                        <>
                            {type === 'buy' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                            {type === 'buy' ? 'Buy' : 'Sell'} {symbol}
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default TradePanel;
