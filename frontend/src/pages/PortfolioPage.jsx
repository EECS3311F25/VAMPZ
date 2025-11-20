import { useState, useRef, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, DollarSign, PieChart, ArrowUpRight, ArrowDownRight, MoreVertical, Wallet, TrendingUpIcon, Activity, Eye, Star, ShoppingCart, DollarSignIcon, X } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { SkeletonPortfolioTable, SkeletonSummaryCard } from '../components/Skeleton';

const portfolioStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: '175.43', change: '+2.34', changePercent: '+1.35%', positive: true, shares: 50, value: 8771.50 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: '378.85', change: '-1.23', changePercent: '-0.32%', positive: false, shares: 30, value: 11365.50 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '142.56', change: '+3.21', changePercent: '+2.30%', positive: true, shares: 25, value: 3564.00 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: '148.92', change: '+0.87', changePercent: '+0.59%', positive: true, shares: 40, value: 5956.80 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: '245.67', change: '-5.43', changePercent: '-2.16%', positive: false, shares: 15, value: 3685.05 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '485.20', change: '+10.50', changePercent: '+2.21%', positive: true, shares: 10, value: 4852.00 },
  { symbol: 'META', name: 'Meta Platforms Inc.', price: '312.45', change: '-2.10', changePercent: '-0.67%', positive: false, shares: 20, value: 6249.00 },
];

const PortfolioPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [tradeType, setTradeType] = useState('Buy');
  const [tradeQuantity, setTradeQuantity] = useState(1);
  const [watchlist, setWatchlist] = useState([]); // Track watchlist items
  const [loading, setLoading] = useState(true); // Loading state
  const menuRef = useRef(null);

  // Simulate initial data load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // Simulated load time
    return () => clearTimeout(timer);
  }, []);

  // Filter stocks based on search query
  const filteredStocks = portfolioStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (symbol) => {
    setOpenMenuId(openMenuId === symbol ? null : symbol);
  };

  const handleViewDetails = (stock) => {
    setOpenMenuId(null);
    setSelectedStock(stock);
    setShowDetailModal(true);
  };

  const handleAddToWatchlist = (stock) => {
    setOpenMenuId(null);
    if (watchlist.includes(stock.symbol)) {
      // Remove from watchlist
      setWatchlist(watchlist.filter(symbol => symbol !== stock.symbol));
    } else {
      // Add to watchlist
      setWatchlist([...watchlist, stock.symbol]);
    }
  };

  const handleTrade = (stock, type) => {
    setOpenMenuId(null);
    setSelectedStock(stock);
    setTradeType(type);
    setTradeQuantity(1);
    setShowTradeModal(true);
  };

  const confirmTrade = () => {
    // In a real app, this would call an API to execute the trade
    alert(`${tradeType} order placed: ${tradeQuantity} shares of ${selectedStock.symbol}`);
    setShowTradeModal(false);
  };

  return (
    <DashboardLayout activeMenu="portfolio">
      {/* Background gradient for depth */}
      <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Header with more spacing */}
        <div className="p-6 md:p-8 pt-10 md:pt-12">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Portfolio</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Review and manage your current positions.
            </p>
          </div>

          {/* Portfolio Summary Cards with improved styling */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Overview</h2>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SkeletonSummaryCard />
                <SkeletonSummaryCard />
                <SkeletonSummaryCard />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-teal-500/10 to-blue-500/10"
                  style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                >
                  <div className="flex justify-between items-start mb-3 relative z-10">
                    <div>
                      <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Portfolio Value</h3>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">Total holdings</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-700">
                      <DollarSign size={20} className="text-teal-600 dark:text-teal-400" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1 relative z-10">$125,430.50</p>
                  <div className="flex items-center text-xs font-medium relative z-10 text-teal-600 dark:text-emerald-400">
                    <TrendingUp size={14} className="mr-1" />
                    <span>+$2,450.20</span>
                    <span className="text-slate-400 dark:text-slate-500 ml-1 font-normal">• +2.00%</span>
                  </div>
                </div>

                <div
                  className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-emerald-500/10 to-teal-500/10"
                  style={{ boxShadow: '0 6px 14px rgba(0,0,0,0.06)' }}
                >
                  <div className="flex justify-between items-start mb-3 relative z-10">
                    <div>
                      <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Total Gain/Loss</h3>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">Since inception</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-700">
                      <TrendingUp size={20} className="text-teal-600 dark:text-teal-400" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1 relative z-10">+$15,430.50</p>
                  <p className="text-xs text-teal-600 dark:text-emerald-400 mt-2 font-medium relative z-10">+14.05% All time</p>
                </div>

                <div
                  className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-500/10 to-indigo-500/10"
                  style={{ boxShadow: '0 8px 16px rgba(0,0,0,0.07)' }}
                >
                  <div className="flex justify-between items-start mb-3 relative z-10">
                    <div>
                      <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Available Cash</h3>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">Ready to invest</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-700">
                      <Wallet size={20} className="text-teal-600 dark:text-teal-400" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1 relative z-10">$10,000.00</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 relative z-10">Paper trading balance</p>
                </div>
              </div>


            )}
          </div>

          {/* Mini Summary Row */}
          <div className="glass-panel rounded-2xl p-4 mb-8 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Holdings</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">7 Assets</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <TrendingUpIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Gainers</p>
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">5</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Losers</p>
                  <p className="text-lg font-bold text-red-600 dark:text-red-400">2</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Avg Return</p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">+8.2%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio Table */}
          {loading ? (
            <SkeletonPortfolioTable rows={7} />
          ) : (
            <div className="glass-panel rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Holdings</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{filteredStocks.length} assets • Updated just now</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search in portfolio..."
                    className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl w-full sm:w-64 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                  <thead className="bg-slate-50 dark:bg-slate-900/50">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Asset
                      </th>
                      <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Shares
                      </th>
                      <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Today's Change
                      </th>
                      <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Value
                      </th>
                      <th scope="col" className="relative px-6 py-4">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {filteredStocks.map((stock) => (
                      <tr key={stock.symbol} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold shadow-sm ${stock.positive ? 'bg-teal-100 dark:bg-emerald-500/20 text-teal-700 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'}`}>
                              {stock.symbol.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{stock.symbol}</div>
                              <div className="text-sm text-slate-600 dark:text-slate-500">{stock.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300 font-medium text-right">{stock.shares}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white font-bold text-right">${stock.price}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${stock.positive ? 'text-teal-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                          <div className="flex items-center justify-end">
                            {stock.positive ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
                            {stock.change} ({stock.changePercent})
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white font-bold text-right">${stock.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="relative" ref={openMenuId === stock.symbol ? menuRef : null}>
                            <button
                              onClick={() => toggleMenu(stock.symbol)}
                              className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            >
                              <MoreVertical size={18} />
                            </button>

                            {/* Dropdown Menu */}
                            {openMenuId === stock.symbol && (
                              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                <button
                                  onClick={() => handleViewDetails(stock)}
                                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left"
                                >
                                  <Eye size={16} className="text-slate-500 dark:text-slate-400" />
                                  View Details
                                </button>
                                <button
                                  onClick={() => handleAddToWatchlist(stock)}
                                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left"
                                >
                                  <span className="text-lg">{watchlist.includes(stock.symbol) ? '⭐' : '☆'}</span>
                                  {watchlist.includes(stock.symbol) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                                </button>
                                <div className="h-px bg-slate-200 dark:bg-slate-700"></div>
                                <button
                                  onClick={() => handleTrade(stock, 'Buy')}
                                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors text-left"
                                >
                                  <ShoppingCart size={16} />
                                  Buy More
                                </button>
                                <button
                                  onClick={() => handleTrade(stock, 'Sell')}
                                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                                >
                                  <DollarSignIcon size={16} />
                                  Sell Shares
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>

                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State - when no stocks at all */}
              {portfolioStocks.length === 0 && (
                <div className="text-center py-16 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="max-w-md mx-auto">
                    <div className="w-48 h-48 mx-auto mb-6 relative">
                      <div className="absolute inset-0 bg-teal-500/20 blur-3xl rounded-full opacity-50 animate-pulse"></div>
                      <img
                        src="/images/empty-portfolio.png"
                        alt="Empty Portfolio"
                        className="w-full h-full object-contain relative z-10 drop-shadow-xl"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Holdings Yet</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xs mx-auto">
                      Your portfolio is looking a bit empty. Start building your wealth today!
                    </p>
                    <button
                      onClick={() => window.location.href = '/dashboard'}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-teal-600/30 hover:shadow-teal-600/40 hover:-translate-y-1"
                    >
                      <Search size={20} />
                      Browse Stocks
                    </button>
                  </div>
                </div>
              )}

              {/* Empty State - when search returns no results */}
              {portfolioStocks.length > 0 && filteredStocks.length === 0 && (
                <div className="text-center py-12 px-6">
                  <Search size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
                  <p className="text-slate-600 dark:text-slate-400 font-medium">No stocks found</p>
                  <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                    Try adjusting your search query
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Stock Detail Modal */}
      {
        showDetailModal && selectedStock && (
          <>
            <div
              className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setShowDetailModal(false)}
            />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[85vh] overflow-y-auto z-50 p-4">
              <div className="glass-card rounded-2xl p-6 shadow-2xl">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedStock.symbol}</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-0.5">{selectedStock.name}</p>
                  </div>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <X size={20} className="text-slate-500" />
                  </button>
                </div>

                {/* Current Holdings Info */}
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-blue-500/10 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 font-semibold uppercase tracking-wide">Your Holdings</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Shares</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white">{selectedStock.shares}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Avg Cost</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white">${(selectedStock.value / selectedStock.shares).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Value</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white">${selectedStock.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                </div>

                {/* Current Price */}
                <div className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-end justify-between mb-3">
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Current Price</p>
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">${selectedStock.price}</p>
                    </div>
                    <div className={`text-right ${selectedStock.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      <div className="flex items-center gap-2 justify-end mb-1">
                        {selectedStock.positive ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                        <span className="text-xl font-bold">{selectedStock.change}</span>
                      </div>
                      <p className="text-sm font-semibold">{selectedStock.changePercent}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Day High</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white">${(parseFloat(selectedStock.price) + 5).toFixed(2)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Day Low</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white">${(parseFloat(selectedStock.price) - 5).toFixed(2)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Volume</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white">12.5M</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Market Cap</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white">2.8T</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      handleTrade(selectedStock, 'Buy');
                    }}
                    className="flex-1 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold transition-all shadow-lg shadow-teal-600/30"
                  >
                    Buy More
                  </button>
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      handleTrade(selectedStock, 'Sell');
                    }}
                    className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold transition-all shadow-lg shadow-red-600/30"
                  >
                    Sell Shares
                  </button>
                </div>
              </div>
            </div>
          </>
        )
      }

      {/* Quick Trade Modal */}
      {
        showTradeModal && selectedStock && (
          <>
            <div
              className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setShowTradeModal(false)}
            />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-4">
              <div className="glass-card rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {tradeType} {selectedStock.symbol}
                  </h2>
                  <button
                    onClick={() => setShowTradeModal(false)}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <X size={20} className="text-slate-500" />
                  </button>
                </div>

                {/* Current Holdings */}
                <div className="mb-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">You own</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedStock.shares} shares</p>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Current Price</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">${selectedStock.price}</p>
                </div>

                {/* Quantity Input */}
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
                    Quantity
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900/50">
                    <button
                      type="button"
                      onClick={() => setTradeQuantity(Math.max(1, tradeQuantity - 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={tradeType === 'Sell' ? selectedStock.shares : undefined}
                      value={tradeQuantity}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '') {
                          setTradeQuantity('');
                          return;
                        }
                        const numVal = parseInt(val);
                        if (isNaN(numVal) || numVal < 1) return;

                        if (tradeType === 'Sell') {
                          setTradeQuantity(Math.min(numVal, selectedStock.shares));
                        } else {
                          setTradeQuantity(numVal);
                        }
                      }}
                      onBlur={() => {
                        if (tradeQuantity === '' || tradeQuantity < 1) {
                          setTradeQuantity(1);
                        }
                      }}
                      className="flex-1 text-center bg-transparent border-none outline-none text-slate-900 dark:text-white font-semibold text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (tradeType === 'Sell') {
                          setTradeQuantity(Math.min(tradeQuantity + 1, selectedStock.shares));
                        } else {
                          setTradeQuantity(tradeQuantity + 1);
                        }
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-blue-500/10 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total {tradeType === 'Buy' ? 'Cost' : 'Value'}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    ${(parseFloat(selectedStock.price) * tradeQuantity).toFixed(2)}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowTradeModal(false)}
                    className="flex-1 px-4 py-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl transition-all font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmTrade}
                    className={`flex-1 px-4 py-3 ${tradeType === 'Buy'
                      ? 'bg-teal-600 hover:bg-teal-500 shadow-teal-600/30'
                      : 'bg-red-600 hover:bg-red-500 shadow-red-600/30'
                      } text-white rounded-xl transition-all font-semibold shadow-lg`}
                  >
                    Confirm {tradeType}
                  </button>
                </div>
              </div>
            </div>
          </>
        )
      }
    </DashboardLayout >
  );
};

export default PortfolioPage;
