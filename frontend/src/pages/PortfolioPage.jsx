import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, DollarSign, PieChart, ArrowUpRight, ArrowDownRight, MoreVertical, Wallet, Activity, Eye, Star, X } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import DashboardLayout from '../layouts/DashboardLayout';
import { SkeletonPortfolioTable, SkeletonSummaryCard, SkeletonMiniSummary } from '../components/Skeleton';
import StatsCard from '../components/ui/StatsCard';
import TradeModal from '../components/TradeModal';

const portfolioStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: '175.43', change: '+2.34', changePercent: '+1.35%', positive: true, shares: 50, value: 8771.50 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: '378.85', change: '-1.23', changePercent: '-0.32%', positive: false, shares: 30, value: 11365.50 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '142.56', change: '+3.21', changePercent: '+2.30%', positive: true, shares: 25, value: 3564.00 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: '148.92', change: '+0.87', changePercent: '+0.59%', positive: true, shares: 40, value: 5956.80 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: '245.67', change: '-5.43', changePercent: '-2.16%', positive: false, shares: 15, value: 3685.05 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '485.20', change: '+10.50', changePercent: '+2.21%', positive: true, shares: 10, value: 4852.00 },
  { symbol: 'META', name: 'Meta Platforms Inc.', price: '312.45', change: '-2.10', changePercent: '-0.67%', positive: false, shares: 20, value: 6249.00 },
];

// Helper function to generate mock price chart data
const generateChartData = (basePrice, isPositive) => {
  const data = [];
  const days = 30;
  let price = parseFloat(basePrice) - (Math.random() * 10 + 5);
  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.45) * 3;
    price += change;
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: parseFloat(price.toFixed(2))
    });
  }
  return data;
};

const PortfolioPage = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [tradeType, setTradeType] = useState('Buy');
  const [watchlist, setWatchlist] = useState(['AAPL', 'NVDA', 'TSLA']);
  const [hoveredStock, setHoveredStock] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredStocks = portfolioStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToWatchlist = (stock) => {
    if (watchlist.includes(stock.symbol)) {
      setWatchlist(watchlist.filter(s => s !== stock.symbol));
    } else {
      setWatchlist([...watchlist, stock.symbol]);
    }
  };

  const handleTrade = (stock, type) => {
    setSelectedStock(stock);
    setTradeType(type);
    setShowTradeModal(true);
  };

  return (
    <DashboardLayout activeMenu="portfolio">
      <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="p-6 md:p-8 pt-10 md:pt-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Portfolio</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your holdings and track performance</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Total Value"
              label="Current balance"
              value="$125,430.50"
              change="+$2,450.20"
              changePercent="+2.00%"
              positive={true}
              icon={DollarSign}
              gradient="from-teal-500/10 to-blue-500/10"
            />
            <StatsCard
              title="Total Gain"
              label="All time"
              value="+$15,430.50"
              change="+14.05%"
              positive={true}
              icon={TrendingUp}
              gradient="from-emerald-500/10 to-teal-500/10"
            />
            <StatsCard
              title="Available Cash"
              label="Ready to invest"
              value="$10,000.00"
              change="Paper trading balance"
              positive={true}
              icon={Wallet}
              gradient="from-blue-500/10 to-indigo-500/10"
            />
          </div>

          {/* Mini Summary Row */}
          {loading ? (
            <SkeletonMiniSummary />
          ) : (
            <div className="glass-panel rounded-2xl p-4 mb-8 shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-4">
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
                    <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
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
          )}

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
                          <div
                            className="flex items-center cursor-pointer group/stock"
                            onClick={() => {
                              setSelectedStock(stock);
                              setShowDetailModal(true);
                            }}
                          >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold shadow-sm transition-transform group-hover/stock:scale-110 ${stock.positive ? 'bg-teal-100 dark:bg-emerald-500/20 text-teal-700 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'}`}>
                              {stock.symbol.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="font-bold text-slate-900 dark:text-white group-hover/stock:text-teal-600 dark:group-hover/stock:text-teal-400 transition-colors">{stock.symbol}</div>
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
                          <div
                            className="relative inline-block"
                            onMouseEnter={() => setHoveredStock(stock.symbol)}
                            onMouseLeave={() => setHoveredStock(null)}
                          >
                            <button
                              onClick={() => handleAddToWatchlist(stock)}
                              className={`p-2 hover:scale-110 transition-all duration-300 rounded-lg cursor-pointer ${watchlist.includes(stock.symbol)
                                ? 'text-yellow-500 hover:text-yellow-400 dark:text-yellow-400 dark:hover:text-yellow-300'
                                : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
                                }`}
                            >
                              <Star
                                size={20}
                                fill={watchlist.includes(stock.symbol) ? 'currentColor' : 'none'}
                                className="transition-all duration-300"
                              />
                            </button>

                            {/* Glassmorphic Tooltip */}
                            {hoveredStock === stock.symbol && (
                              <div className="absolute right-0 top-full mt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                                <div className="px-3 py-2 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 shadow-lg whitespace-nowrap">
                                  <p className="text-xs font-medium text-slate-700 dark:text-slate-200">
                                    {watchlist.includes(stock.symbol) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                                  </p>
                                </div>
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

              {/* Price Chart */}
              <div className="mb-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">30-Day Price Trend</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={generateChartData(selectedStock.price, selectedStock.positive)}>
                    <defs>
                      <linearGradient id={`gradient-${selectedStock.symbol}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={selectedStock.positive ? '#10b981' : '#ef4444'} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={selectedStock.positive ? '#10b981' : '#ef4444'} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fill: '#94a3b8' }}
                      tickLine={false}
                      axisLine={false}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#94a3b8' }}
                      tickLine={false}
                      axisLine={false}
                      domain={['dataMin - 2', 'dataMax + 2']}
                      tickFormatter={(value) => `$${value.toFixed(0)}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      labelStyle={{ color: '#e2e8f0' }}
                      itemStyle={{ color: selectedStock.positive ? '#10b981' : '#ef4444' }}
                      formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke={selectedStock.positive ? '#10b981' : '#ef4444'}
                      strokeWidth={2}
                      fill={`url(#gradient-${selectedStock.symbol})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Holdings + Price */}
              <div className="grid gap-4 lg:grid-cols-2 mb-5">
                <div className="p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-blue-500/10 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 font-semibold uppercase tracking-wide">Your Holdings</p>
                  <div className="grid grid-cols-3 gap-3">
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

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Current Price</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">${selectedStock.price}</p>
                  </div>
                  <div className={`text-right ${selectedStock.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                    <div className="flex items-center gap-2 justify-end">
                      {selectedStock.positive ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                      <span className="text-xl font-bold">{selectedStock.change}</span>
                    </div>
                    <p className="text-sm font-semibold mt-1">{selectedStock.changePercent}</p>
                  </div>
                </div>
              </div>

              {/* Additional Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
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
            // Do not close modal here, let TradeModal handle success state
            // setShowTradeModal(false);
            // setSelectedStock(null);
          }}
        />
      )}
    </DashboardLayout>
  );
};

export default PortfolioPage;
