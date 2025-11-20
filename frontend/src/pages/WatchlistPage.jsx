import { useState } from 'react';
import { Search, Plus, X, TrendingUp, TrendingDown, Star, StarOff, Eye } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

const initialWatchlist = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 175.43, change: 2.34, changePercent: 1.35, positive: true, marketCap: '2.74T' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 245.67, change: -5.43, changePercent: -2.16, positive: false, marketCap: '778B' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.85, change: -1.23, changePercent: -0.32, positive: false, marketCap: '2.81T' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.56, change: 3.21, changePercent: 2.30, positive: true, marketCap: '1.79T' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 485.20, change: 10.50, changePercent: 2.21, positive: true, marketCap: '1.19T' },
    { symbol: 'META', name: 'Meta Platforms Inc.', price: 312.45, change: -2.10, changePercent: -0.67, positive: false, marketCap: '795B' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 148.92, change: 0.87, changePercent: 0.59, positive: true, marketCap: '1.54T' },
];

const availableStocks = [
    { symbol: 'AMD', name: 'Advanced Micro Devices', price: 145.23, change: 3.45, changePercent: 2.43, positive: true, marketCap: '234B' },
    { symbol: 'NFLX', name: 'Netflix Inc.', price: 425.67, change: -8.21, changePercent: -1.89, positive: false, marketCap: '189B' },
    { symbol: 'DIS', name: 'The Walt Disney Company', price: 92.34, change: 1.23, changePercent: 1.35, positive: true, marketCap: '168B' },
    { symbol: 'COIN', name: 'Coinbase Global Inc.', price: 156.78, change: 12.45, changePercent: 8.63, positive: true, marketCap: '38B' },
    { symbol: 'PYPL', name: 'PayPal Holdings Inc.', price: 67.89, change: -0.98, changePercent: -1.42, positive: false, marketCap: '74B' },
];

const WatchlistPage = () => {
    const [watchlist, setWatchlist] = useState(initialWatchlist);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const removeFromWatchlist = (symbol) => {
        setWatchlist(watchlist.filter(stock => stock.symbol !== symbol));
    };

    const addToWatchlist = (stock) => {
        if (!watchlist.find(s => s.symbol === stock.symbol)) {
            setWatchlist([...watchlist, stock]);
            setShowAddModal(false);
            setSearchQuery('');
        }
    };

    const viewStockDetails = (stock) => {
        setSelectedStock(stock);
        setShowDetailModal(true);
    };

    const filteredWatchlist = watchlist.filter(stock =>
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredAvailableStocks = availableStocks.filter(stock =>
        !watchlist.find(w => w.symbol === stock.symbol) &&
        (stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
            stock.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <DashboardLayout activeMenu="watchlist">
            <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                {/* Header */}
                <div className="p-6 md:p-8 pt-10 md:pt-12">
                    <div className="mb-6 flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Watchlist</h1>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">
                                Track stocks you're interested in
                            </p>
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-teal-600/30"
                        >
                            <Plus size={18} />
                            Add Stock
                        </button>
                    </div>

                    {/* Stats Summary */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-teal-500/10 to-blue-500/10">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Watching</h3>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">Total stocks</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-700">
                                        <Eye size={20} className="text-teal-600 dark:text-teal-400" />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{watchlist.length}</p>
                            </div>

                            <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Gainers</h3>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">Positive today</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-700">
                                        <TrendingUp size={20} className="text-teal-600 dark:text-teal-400" />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {watchlist.filter(s => s.positive).length}
                                </p>
                            </div>

                            <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-red-500/10 to-pink-500/10">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Losers</h3>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">Negative today</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-700">
                                        <TrendingDown size={20} className="text-red-600 dark:text-red-400" />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {watchlist.filter(s => !s.positive).length}
                                </p>
                            </div>
                        </div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                    {/* Empty State */}
                    {filteredWatchlist.length === 0 && (
                        <div className="text-center py-16 glass-card rounded-2xl">
                            <Eye size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
                            <p className="text-slate-500 dark:text-slate-400 font-medium">No stocks in your watchlist</p>
                            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                                {searchQuery ? 'Try adjusting your search' : 'Click "Add Stock" to get started'}
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
                                    filteredAvailableStocks.map((stock) => (
                                        <button
                                            key={stock.symbol}
                                            onClick={() => addToWatchlist(stock)}
                                            className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left"
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
                                            <Plus size={20} className="text-teal-600 dark:text-teal-400" />
                                        </button>
                                    ))
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
                                <button className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold transition-all shadow-lg shadow-teal-600/30">
                                    Trade {selectedStock.symbol}
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
        </DashboardLayout>
    );
};

export default WatchlistPage;
