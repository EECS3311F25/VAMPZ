import React, { useState, useEffect } from 'react';
import { Search, Plus, X, Check, TrendingUp, TrendingDown, Eye } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import StatsCard from '../components/ui/StatsCard';
import { SkeletonSummaryCard, SkeletonWatchlistCard } from '../components/Skeleton';
import TradeModal from '../components/TradeModal';

const WatchlistPage = () => {
    const [watchlist, setWatchlist] = useState([
        { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.85, change: -1.23, changePercent: -0.32, positive: false, marketCap: '2.81T' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.56, change: 3.21, changePercent: 2.30, positive: true, marketCap: '1.79T' },
        { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 485.20, change: 10.50, changePercent: 2.21, positive: true, marketCap: '1.19T' },
        { symbol: 'META', name: 'Meta Platforms Inc.', price: 312.45, change: -2.10, changePercent: -0.67, positive: false, marketCap: '795B' },
        { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 148.92, change: 0.87, changePercent: 0.59, positive: true, marketCap: '1.54T' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showTradeModal, setShowTradeModal] = useState(false);
    const [tradeType, setTradeType] = useState('Buy');

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const availableStocks = [
        { symbol: 'AMD', name: 'Advanced Micro Devices', price: 145.23, change: 3.45, changePercent: 2.43, positive: true, marketCap: '234B' },
        { symbol: 'NFLX', name: 'Netflix Inc.', price: 425.67, change: -8.21, changePercent: -1.89, positive: false, marketCap: '189B' },
        { symbol: 'DIS', name: 'The Walt Disney Company', price: 92.34, change: 1.23, changePercent: 1.35, positive: true, marketCap: '168B' },
        { symbol: 'COIN', name: 'Coinbase Global Inc.', price: 156.78, change: 12.45, changePercent: 8.63, positive: true, marketCap: '38B' },
        { symbol: 'PYPL', name: 'PayPal Holdings Inc.', price: 67.89, change: -0.98, changePercent: -1.42, positive: false, marketCap: '74B' },
    ];

    const filteredWatchlist = watchlist.filter(stock =>
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredAvailableStocks = availableStocks.filter(stock =>
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const addToWatchlist = (stock) => {
        if (!watchlist.some(s => s.symbol === stock.symbol)) {
            setWatchlist([...watchlist, stock]);
        }
    };

    const removeFromWatchlist = (symbol) => {
        setWatchlist(watchlist.filter(s => s.symbol !== symbol));
    };

    const viewStockDetails = (stock) => {
        setSelectedStock(stock);
        setShowDetailModal(true);
    };

    const handleTrade = (stock, type) => {
        setSelectedStock(stock);
        setTradeType(type);
        setShowDetailModal(false); // Close detail modal if open
        setShowTradeModal(true);
    };

    return (
        <DashboardLayout activeMenu="watchlist">
            <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                {/* Header */}
                <div className="p-6 md:p-8 pt-10 md:pt-12">
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Watchlist</h1>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">
                                Track stocks you're interested in
                            </p>
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-teal-600/30"
                        >
                            <Plus size={18} />
                            Add Stock
                        </button>
                    </div>

                    {/* Stats Summary */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Overview</h2>
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <SkeletonSummaryCard />
                                <SkeletonSummaryCard />
                                <SkeletonSummaryCard />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <StatsCard
                                    title="Watching"
                                    label="Total stocks"
                                    value={watchlist.length.toString()}
                                    icon={Eye}
                                    gradient="from-teal-500/10 to-blue-500/10"
                                />

                                <StatsCard
                                    title="Gainers"
                                    label="Positive today"
                                    value={watchlist.filter(s => s.positive).length.toString()}
                                    icon={TrendingUp}
                                    gradient="from-emerald-500/10 to-teal-500/10"
                                />

                                <StatsCard
                                    title="Losers"
                                    label="Negative today"
                                    value={watchlist.filter(s => !s.positive).length.toString()}
                                    icon={TrendingDown}
                                    gradient="from-red-500/10 to-orange-500/10"
                                />
                            </div>
                        )}
                    </div>

                    {/* Search */}
                    <div className="mb-6">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search watchlist..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Watchlist Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <SkeletonWatchlistCard />
                            <SkeletonWatchlistCard />
                            <SkeletonWatchlistCard />
                            <SkeletonWatchlistCard />
                            <SkeletonWatchlistCard />
                            <SkeletonWatchlistCard />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                            {filteredWatchlist.map((stock) => (
                                <div
                                    key={stock.symbol}
                                    className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all group relative overflow-hidden"
                                >
                                    <button
                                        onClick={() => removeFromWatchlist(stock.symbol)}
                                        className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-red-100 dark:hover:bg-red-900/30 text-slate-400 hover:text-red-600 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all z-10"
                                        title="Remove from watchlist"
                                    >
                                        <X size={16} />
                                    </button>

                                    <div className="mb-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{stock.symbol}</h3>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{stock.name}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            Market Cap: {stock.marketCap}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-baseline justify-between">
                                            <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                                ${stock.price.toFixed(2)}
                                            </span>
                                            <div className={`flex items-center gap-1 text-sm font-semibold ${stock.positive
                                                ? 'text-emerald-600 dark:text-emerald-400'
                                                : 'text-red-600 dark:text-red-400'
                                                }`}>
                                                {stock.positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                                <span>{stock.positive ? '+' : ''}{stock.change.toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${stock.positive
                                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                            }`}>
                                            {stock.positive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => viewStockDetails(stock)}
                                        className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                                    >
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty State - when watchlist is truly empty */}
                    {watchlist.length === 0 && (
                        <div className="text-center py-20 glass-card rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="w-40 h-40 mx-auto mb-6 relative">
                                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full opacity-50 animate-pulse"></div>
                                <img
                                    src="/images/empty-watchlist.png"
                                    alt="Empty Watchlist"
                                    className="w-full h-full object-contain relative z-10 drop-shadow-xl"
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Your Watchlist is Empty</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-sm mx-auto">
                                Keep track of your favorite stocks by adding them here.
                            </p>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-teal-600/30 hover:shadow-teal-600/40 hover:-translate-y-1"
                            >
                                <Plus size={20} />
                                Add First Stock
                            </button>
                        </div>
                    )}

                    {/* Empty State - when search returns no results */}
                    {watchlist.length > 0 && filteredWatchlist.length === 0 && (
                        <div className="text-center py-12 px-6 glass-card rounded-2xl">
                            <Search size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
                            <p className="text-slate-600 dark:text-slate-400 font-medium">No stocks found</p>
                            <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                                Try adjusting your search query
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Stock Modal */}
            {showAddModal && (
                <>
                    <div
                        className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
                        onClick={() => setShowAddModal(false)}
                    />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-4">
                        <div className="glass-card rounded-2xl p-6 shadow-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Add to Watchlist</h2>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <X size={20} className="text-slate-500" />
                                </button>
                            </div>

                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search stocks..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div className="max-h-80 overflow-y-auto space-y-2">
                                {filteredAvailableStocks.length === 0 ? (
                                    <p className="text-center text-slate-500 dark:text-slate-400 py-8">
                                        {searchQuery ? 'No stocks found' : 'All available stocks are already in your watchlist'}
                                    </p>
                                ) : (
                                    filteredAvailableStocks.map((stock) => {
                                        const isAdded = watchlist.some(w => w.symbol === stock.symbol);
                                        return (
                                            <button
                                                key={stock.symbol}
                                                onClick={() => !isAdded && addToWatchlist(stock)}
                                                disabled={isAdded}
                                                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${isAdded
                                                    ? 'border-teal-200 dark:border-teal-900 bg-teal-50 dark:bg-teal-900/20 cursor-default'
                                                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                                                    }`}
                                            >
                                                <div className="flex-1">
                                                    <p className="font-semibold text-slate-900 dark:text-white">{stock.symbol}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{stock.name}</p>
                                                </div>
                                                <div className="text-right mr-2">
                                                    <p className="font-semibold text-slate-900 dark:text-white">${stock.price.toFixed(2)}</p>
                                                    <p className={`text-xs font-medium ${stock.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                                                        }`}>
                                                        {stock.positive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                                                    </p>
                                                </div>
                                                {isAdded ? (
                                                    <div className="p-1 rounded-full bg-teal-100 dark:bg-teal-900/50">
                                                        <Check size={18} className="text-teal-600 dark:text-teal-400" />
                                                    </div>
                                                ) : (
                                                    <Plus size={20} className="text-teal-600 dark:text-teal-400" />
                                                )}
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Stock Detail Modal */}
            {showDetailModal && selectedStock && (
                <>
                    <div
                        className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
                        onClick={() => setShowDetailModal(false)}
                    />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[85vh] overflow-y-auto z-50 p-4">
                        <div className="glass-card rounded-2xl p-5 shadow-2xl">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedStock.symbol}</h2>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-0.5">{selectedStock.name}</p>
                                </div>
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <X size={20} className="text-slate-500" />
                                </button>
                            </div>

                            {/* Price Info */}
                            <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-blue-500/10 border border-slate-200 dark:border-slate-700">
                                <div className="flex items-end justify-between mb-3">
                                    <div>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Current Price</p>
                                        <p className="text-3xl font-bold text-slate-900 dark:text-white">${selectedStock.price.toFixed(2)}</p>
                                    </div>
                                    <div className={`text-right ${selectedStock.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                                        <div className="flex items-center gap-2 justify-end mb-1">
                                            {selectedStock.positive ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                                            <span className="text-xl font-bold">{selectedStock.positive ? '+' : ''}{selectedStock.change.toFixed(2)}</span>
                                        </div>
                                        <p className="text-xs font-semibold">{selectedStock.positive ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Market Cap</p>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{selectedStock.marketCap}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Day Range</p>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">${(selectedStock.price - 5).toFixed(2)} - ${(selectedStock.price + 5).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Chart Placeholder */}
                            <div className="mb-4 p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                                <div className="text-center">
                                    <TrendingUp size={48} className="mx-auto mb-3 text-slate-300 dark:text-slate-700" />
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Price Chart</p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Chart visualization coming soon</p>
                                </div>
                            </div>

                            {/* Additional Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Open</p>
                                    <p className="text-base font-bold text-slate-900 dark:text-white">${(selectedStock.price - 1.5).toFixed(2)}</p>
                                </div>
                                <div className="p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">High</p>
                                    <p className="text-base font-bold text-slate-900 dark:text-white">${(selectedStock.price + 5).toFixed(2)}</p>
                                </div>
                                <div className="p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Low</p>
                                    <p className="text-base font-bold text-slate-900 dark:text-white">${(selectedStock.price - 5).toFixed(2)}</p>
                                </div>
                                <div className="p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Volume</p>
                                    <p className="text-base font-bold text-slate-900 dark:text-white">42.3M</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleTrade(selectedStock, 'Buy')}
                                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all shadow-lg shadow-emerald-600/30"
                                >
                                    Buy
                                </button>
                                <button
                                    onClick={() => handleTrade(selectedStock, 'Sell')}
                                    className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold transition-all shadow-lg shadow-red-600/30"
                                >
                                    Sell
                                </button>
                                <button
                                    onClick={() => {
                                        removeFromWatchlist(selectedStock.symbol);
                                        setShowDetailModal(false);
                                    }}
                                    className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-all"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Trade Modal */}
            {showTradeModal && selectedStock && (
                <TradeModal
                    isOpen={showTradeModal}
                    onClose={() => {
                        setShowTradeModal(false);
                        setSelectedStock(null);
                    }}
                    stock={selectedStock}
                    type={tradeType}
                    onConfirm={(tradeData) => {
                        console.log('Trade confirmed:', tradeData);
                        // Here you would call your API
                        setShowTradeModal(false);
                        setSelectedStock(null);
                    }}
                />
            )}
        </DashboardLayout>
    );
};

export default WatchlistPage;
