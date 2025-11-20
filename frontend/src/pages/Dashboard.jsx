import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Search, DollarSign, PieChart, BarChart3, Activity, Plus, Wallet, TrendingUpIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';
import StockChart from '../components/StockChart';
import TradePanel from '../components/TradePanel';
import ConfirmTradeModal from '../components/ConfirmTradeModal';
import StatsCard from '../components/ui/StatsCard';
import { SkeletonSummaryCard } from '../components/Skeleton';

const statsCards = [
  {
    title: 'Portfolio Value',
    value: '$125,430.50',
    change: '+$2,450.20',
    changePercent: '+2.00%',
    label: 'Total balance',
    positive: true,
    icon: DollarSign,
    gradient: 'from-teal-500/10 to-blue-500/10'
  },
  {
    title: 'Cash',
    value: '$10,000.00',
    change: '+$0.00',
    changePercent: 'Available',
    label: 'Buying power',
    positive: true,
    icon: Wallet,
    gradient: 'from-emerald-500/10 to-teal-500/10'
  },
  {
    title: 'Unrealized P/L',
    value: '+$15,430.00',
    change: '+12.5%',
    changePercent: 'All time',
    label: 'Total return',
    positive: true,
    icon: TrendingUp,
    gradient: 'from-blue-500/10 to-indigo-500/10'
  },
  {
    title: 'Investments',
    value: '$115,430.50',
    change: '+2.00%',
    changePercent: '24h change',
    label: 'Market value',
    positive: true,
    icon: BarChart3,
    gradient: 'from-purple-500/10 to-pink-500/10'
  },
];

const portfolioStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: '175.43', change: '+2.34', changePercent: '+1.35%', positive: true, shares: 50 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: '378.85', change: '-1.23', changePercent: '-0.32%', positive: false, shares: 30 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '142.56', change: '+3.21', changePercent: '+2.30%', positive: true, shares: 25 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: '148.92', change: '+0.87', changePercent: '+0.59%', positive: true, shares: 40 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: '245.67', change: '-5.43', changePercent: '-2.16%', positive: false, shares: 15 },
];

const recentActivity = [
  { type: 'Buy', symbol: 'NVDA', shares: 10, price: '485.20', date: '2 hours ago', positive: true },
  { type: 'Sell', symbol: 'META', shares: 5, price: '312.45', date: '1 day ago', positive: false },
  { type: 'Buy', symbol: 'NFLX', shares: 8, price: '425.80', date: '2 days ago', positive: true },
  { type: 'Buy', symbol: 'AMD', shares: 20, price: '128.90', date: '3 days ago', positive: true },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingTrade, setPendingTrade] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleTradeSubmit = (tradeData) => {
    setPendingTrade(tradeData);
    setShowConfirmModal(true);
  };

  const handleConfirmTrade = () => {
    console.log('Trade confirmed:', pendingTrade);
    setShowConfirmModal(false);
    setPendingTrade(null);
    // Here you would call your actual trade API
  };

  return (
    <DashboardLayout activeMenu="dashboard">
      {/* Background gradient for depth */}
      <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Header with more spacing */}
        <div className="p-6 md:p-8 pt-10 md:pt-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back, {user.firstName}!</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Here's your portfolio overview for today.
              </p>
            </div>
          </div>

          {/* Stats Cards Grid with improved styling */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading ? (
                <>
                  <SkeletonSummaryCard />
                  <SkeletonSummaryCard />
                  <SkeletonSummaryCard />
                  <SkeletonSummaryCard />
                </>
              ) : (
                statsCards.map((stat, idx) => (
                  <StatsCard
                    key={idx}
                    title={stat.title}
                    label={stat.label}
                    value={stat.value}
                    change={stat.change}
                    changePercent={stat.changePercent}
                    positive={stat.positive}
                    icon={stat.icon}
                    gradient={stat.gradient}
                    className="hover:shadow-xl"
                  />
                ))
              )}
            </div>
          </div>

          {/* Market Overview Section with Trade Box */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Stock Chart */}
            <div className="lg:col-span-2 glass-panel rounded-2xl p-6 shadow-sm">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Performance</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">Track price movements for {selectedSymbol}</p>
              </div>
              <StockChart symbol={selectedSymbol} />
            </div>

            {/* Trade Panel */}
            <div className="glass-panel rounded-2xl p-6 shadow-sm">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Trade</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">Buy or sell assets</p>
              </div>
              <TradePanel
                selectedSymbol={selectedSymbol}
                onSymbolChange={setSelectedSymbol}
                onTradeSubmit={handleTradeSubmit}
              />
            </div>
          </div>

          {/* Portfolio Holdings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* My Portfolio */}
            <div className="glass-panel rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">My Portfolio</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">Click to view details and trade</p>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {portfolioStocks.map((stock) => (
                    <button
                      key={stock.symbol}
                      onClick={() => setSelectedSymbol(stock.symbol)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all border-2 group ${selectedSymbol === stock.symbol
                        ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-500/50 shadow-md'
                        : 'bg-white dark:bg-slate-800/50 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-transform group-hover:scale-105 ${stock.positive
                          ? 'bg-teal-100 dark:bg-emerald-500/20 text-teal-700 dark:text-emerald-400'
                          : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
                          }`}>
                          {stock.symbol.charAt(0)}
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-slate-900 dark:text-white">{stock.symbol}</div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">{stock.shares} shares</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-900 dark:text-white">${stock.price}</div>
                        <div className={`text-xs font-medium ${stock.positive ? 'text-teal-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                          {stock.change}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-panel rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Activity</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">Your latest trades</p>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`px-3 py-1 rounded-lg text-xs font-semibold ${activity.type === 'Buy'
                          ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                          }`}>
                          {activity.type}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-900 dark:text-white">{activity.symbol}</div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">{activity.shares} shares @ ${activity.price}</div>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{activity.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmTradeModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmTrade}
        tradeData={pendingTrade || {}}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
