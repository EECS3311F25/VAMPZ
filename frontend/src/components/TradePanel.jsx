import { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Info } from 'lucide-react';

const TradePanel = ({ selectedSymbol = "AAPL", onSymbolChange, onTradeSubmit }) => {
    const [type, setType] = useState('Buy');
    const [quantity, setQuantity] = useState(1);

    // Mock current price - in production, this would come from real-time data
    const currentPrice = 150.00;
    const total = (quantity * currentPrice);
    const portfolioValue = 125430.50;
    const portfolioAfter = type === 'Buy' ? portfolioValue - total : portfolioValue + total;
    const portfolioChange = ((total / portfolioValue) * 100).toFixed(2);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onTradeSubmit) {
            onTradeSubmit({
                type,
                symbol: selectedSymbol,
                quantity: Number(quantity),
                price: currentPrice.toFixed(2),
                totalCost: total,
                portfolioAfter: portfolioAfter.toFixed(2)
            });
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Trade Stock</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Paper trading • No fees</p>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 shadow-sm">
                    <button
                        onClick={() => setType('Buy')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${type === 'Buy'
                            ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                            }`}
                    >
                        Buy
                    </button>
                    <button
                        onClick={() => setType('Sell')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${type === 'Sell'
                            ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                            }`}
                    >
                        Sell
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Symbol Input */}
                <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wide">
                        Symbol
                    </label>
                    <input
                        type="text"
                        value={selectedSymbol}
                        onChange={(e) => onSymbolChange && onSymbolChange(e.target.value.toUpperCase())}
                        className="block w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all font-bold text-lg uppercase"
                        placeholder="e.g. AAPL"
                    />
                </div>

                {/* Current Price Display */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Current Price</span>
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                            <TrendingUp size={12} />
                            +2.34%
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <DollarSign size={18} className="text-slate-400" />
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">{currentPrice.toFixed(2)}</span>
                    </div>
                </div>

                {/* Quantity Input */}
                <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wide">
                        Quantity
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="block w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all font-semibold text-lg"
                    />
                </div>

                {/* Total & Impact */}
                <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Estimated Cost</span>
                        <span className="text-xl font-bold text-slate-900 dark:text-white">${total.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Fees</span>
                        <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">$0</span>
                    </div>

                    <div className="h-px bg-slate-200 dark:bg-slate-700"></div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                            <Info size={16} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                            <div className="text-xs">
                                <p className="text-blue-700 dark:text-blue-400 font-medium mb-1">Portfolio Impact</p>
                                <p className="text-blue-600 dark:text-blue-300">
                                    {type === 'Buy' ? '−' : '+'}{portfolioChange}% • Portfolio After: ${portfolioAfter.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full py-3.5 rounded-xl text-white font-semibold text-base shadow-lg transition-all hover:shadow-xl ${type === 'Buy'
                            ? 'bg-teal-600 hover:bg-teal-500 shadow-teal-600/30 hover:shadow-teal-600/50'
                            : 'bg-red-600 hover:bg-red-500 shadow-red-600/30 hover:shadow-red-600/50'
                        }`}
                >
                    {type} {selectedSymbol}
                </button>
            </form>
        </div>
    );
};

export default TradePanel;
