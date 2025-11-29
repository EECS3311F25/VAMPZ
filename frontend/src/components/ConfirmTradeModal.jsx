import { useEffect, useState } from 'react';
import { X, Check } from 'lucide-react';

const ConfirmTradeModal = ({ isOpen, onClose, onConfirm, tradeData }) => {
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsSuccess(false);
        }
    }, [isOpen, tradeData]);

    if (!isOpen || !tradeData) return null;

    const { type, symbol, quantity, price, totalCost, portfolioAfter } = tradeData;
    const formattedPrice = Number(price).toFixed(2);
    const formattedTotal = Number(totalCost).toFixed(2);
    const formattedPortfolioAfter = Number(portfolioAfter).toFixed(2);

    const handleClose = () => {
        setIsSuccess(false);
        onClose?.();
    };

    const handleConfirmClick = () => {
        onConfirm?.();
        setIsSuccess(true);
    };

    const accentGradient = type === 'Buy'
        ? 'from-emerald-500/15 via-teal-500/20 to-emerald-500/5'
        : 'from-red-500/15 via-orange-500/20 to-red-500/5';

    return (
        <div className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-md">
                <div className="glass-card relative overflow-hidden rounded-3xl shadow-2xl border border-white/25 dark:border-slate-800/60 bg-slate-900/90 dark:bg-slate-950/80">
                    <div className={`absolute inset-0 bg-gradient-to-br ${accentGradient}`} aria-hidden="true" />
                    <div className="relative p-6">
                        <button
                            onClick={handleClose}
                            className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/60 dark:bg-slate-900/80 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white shadow-lg transition-all"
                        >
                            <X size={18} />
                        </button>

                        {isSuccess ? (
                            <div className="text-center pt-8 pb-4 flex flex-col items-center">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-[0.4em] mb-4">Order Placed</p>
                                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mb-6 shadow-[0_10px_40px_rgba(16,185,129,0.25)]">
                                    <Check size={38} className="text-emerald-400" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-3">Success!</h3>
                                <p className="text-base text-slate-200/90 leading-relaxed mb-6 max-w-sm">
                                    You have successfully {type === 'Buy' ? 'bought' : 'sold'} <span className="font-semibold text-white">{quantity}</span> shares of <span className="font-semibold text-white">{symbol}</span> for <span className="font-semibold text-white">${formattedTotal}</span>.
                                </p>
                                <div className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 mb-8 text-left space-y-3">
                                    <div className="flex justify-between text-sm text-slate-300">
                                        <span>Order Type</span>
                                        <span className="font-semibold text-white">{type}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-slate-300">
                                        <span>Shares</span>
                                        <span className="font-semibold text-white">{quantity}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-slate-300">
                                        <span>Total</span>
                                        <span className="font-semibold text-white">${formattedTotal}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold shadow-lg shadow-emerald-600/30 transition-transform hover:-translate-y-0.5"
                                >
                                    Done
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6 pt-2">
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-[0.3em]">Review</p>
                                    <h2 className="text-2xl font-bold text-white mt-2">Confirm {type}</h2>
                                </div>

                                <div className="rounded-2xl bg-white/90 dark:bg-white/5 border border-white/50 dark:border-white/10 shadow-inner overflow-hidden divide-y divide-slate-200/60 dark:divide-white/5">
                                    <div className="flex justify-between items-center px-5 py-4">
                                        <span className="text-sm text-slate-500 dark:text-slate-300">Type</span>
                                        <span className={`font-semibold ${type === 'Buy' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-300'}`}>{type}</span>
                                    </div>
                                    <div className="flex justify-between items-center px-5 py-4">
                                        <span className="text-sm text-slate-500 dark:text-slate-300">Symbol</span>
                                        <span className="font-semibold text-slate-900 dark:text-white">{symbol}</span>
                                    </div>
                                    <div className="flex justify-between items-center px-5 py-4">
                                        <span className="text-sm text-slate-500 dark:text-slate-300">Quantity</span>
                                        <span className="font-semibold text-slate-900 dark:text-white">{quantity}</span>
                                    </div>
                                    <div className="flex justify-between items-center px-5 py-4">
                                        <span className="text-sm text-slate-500 dark:text-slate-300">Price / Share</span>
                                        <span className="font-semibold text-slate-900 dark:text-white">${formattedPrice}</span>
                                    </div>
                                    <div className="flex justify-between items-center px-5 py-4">
                                        <span className="text-sm text-slate-500 dark:text-slate-300">Estimated Cost</span>
                                        <span className="text-lg font-bold text-slate-900 dark:text-white">${formattedTotal}</span>
                                    </div>
                                    <div className="flex justify-between items-center px-5 py-4">
                                        <span className="text-sm text-slate-500 dark:text-slate-300">Portfolio After</span>
                                        <span className="font-semibold text-slate-900 dark:text-white">${formattedPortfolioAfter}</span>
                                    </div>
                                </div>

                                <div className="rounded-2xl bg-slate-900/30 dark:bg-white/5 border border-white/5 px-4 py-3 text-center">
                                    <p className="text-xs font-semibold text-slate-300 uppercase tracking-[0.3em]">Fees: $0 (Paper Trading)</p>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={handleClose}
                                        className="flex-1 px-4 py-3 rounded-2xl bg-white/40 dark:bg-white/10 text-slate-700 dark:text-white font-semibold shadow-inner hover:bg-white/60 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleConfirmClick}
                                        className={`flex-1 px-4 py-3 rounded-2xl text-white font-semibold shadow-lg transition-all hover:-translate-y-0.5 ${type === 'Buy'
                                            ? 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 shadow-emerald-600/30'
                                            : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 shadow-orange-600/30'
                                        }`}
                                    >
                                        Confirm {type}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmTradeModal;
