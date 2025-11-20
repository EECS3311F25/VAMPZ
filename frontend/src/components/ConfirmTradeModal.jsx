import { X } from 'lucide-react';

const ConfirmTradeModal = ({ isOpen, onClose, onConfirm, tradeData }) => {
    if (!isOpen) return null;

    const { type, symbol, quantity, price, totalCost, portfolioAfter } = tradeData;

    return (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="glass-card rounded-2xl shadow-2xl max-w-md w-full p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Confirm Order</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200"
                    >
                        <X size={20} className="text-slate-500 dark:text-slate-400" />
                    </button>
                </div>

                {/* Order Details */}
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-800">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Type</span>
                        <span className={`font-semibold ${type === 'Buy' ? 'text-teal-600 dark:text-teal-400' : 'text-red-600 dark:text-red-400'}`}>
                            {type}
                        </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-800">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Symbol</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{symbol}</span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-800">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Quantity</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{quantity}</span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-800">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Price per Share</span>
                        <span className="font-semibold text-slate-900 dark:text-white">${price}</span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-800">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Estimated Cost</span>
                        <span className="text-lg font-bold text-slate-900 dark:text-white">${totalCost.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center py-3">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Portfolio After</span>
                        <span className="font-semibold text-slate-900 dark:text-white">${portfolioAfter}</span>
                    </div>

                    <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-3 mt-4">
                        <p className="text-xs text-teal-700 dark:text-teal-400 text-center">
                            ℹ️ Fees: $0 (Paper Trading)
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl transition-all duration-200 font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 px-4 py-2.5 ${type === 'Buy'
                            ? 'bg-teal-600 hover:bg-teal-500 shadow-teal-600/30'
                            : 'bg-red-600 hover:bg-red-500 shadow-red-600/30'
                            } text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl`}
                    >
                        Confirm {type}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmTradeModal;
