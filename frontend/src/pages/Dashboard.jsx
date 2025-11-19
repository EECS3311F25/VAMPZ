import { useState } from 'react';
import { TrendingUp, TrendingDown, Search, DollarSign, PieChart, BarChart3, Activity, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';
import DataWidget from '../components/DataWidget';
import StockChart from '../components/StockChart';
import TradePanel from '../components/TradePanel';

const statsCards = [
  { title: 'Portfolio Value', value: '$125,430.50', change: '+$2,450.20', changePercent: '+2.00%', positive: true, icon: DollarSign },
  { title: 'Total Gain', value: '+$15,430.50', change: '+$1,230.40', changePercent: '+8.67%', positive: true, icon: TrendingUp },
  { title: 'Active Positions', value: '12', change: '+2', changePercent: 'This month', positive: true, icon: PieChart },
  { title: 'Win Rate', value: '68%', change: '+5%', changePercent: 'vs last month', positive: true, icon: Activity },
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

  return (
    <DashboardLayout activeMenu="dashboard">
      {/* Header */}
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back, {user.firstName}!</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Here's your portfolio overview for today.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg transition-colors text-sm font-medium border border-slate-300 dark:border-slate-700">
              Download Report
            </button>
            <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition-colors text-sm font-medium shadow-lg shadow-teal-600/20 flex items-center gap-2">
              <Plus size={16} />
              Add Funds
            </button>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="glass-card rounded-xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon size={64} />
                </div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</h3>
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400">
                    <Icon size={20} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2 relative z-10">{stat.value}</p>
                <div className={`flex items-center text-sm font-medium relative z-10 ${stat.positive ? 'text-teal-600 dark:text-teal-400' : 'text-red-500 dark:text-red-400'}`}>
                  {stat.positive ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                  <span>{stat.change} ({stat.changePercent})</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Market Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 glass-panel rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedSymbol}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Stock Analysis</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">$150.00</p>
                <p className="text-sm font-medium text-teal-600 dark:text-teal-400">+1.25%</p>
              </div>
            </div>
            <StockChart />
          </div>
          <div>
            <TradePanel symbol={selectedSymbol} onSymbolChange={setSelectedSymbol} />
          </div>
        </div>

        {/* Portfolio and Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Portfolio Section */}
          <div className="lg:col-span-2 glass-panel rounded-xl overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">My Portfolio</h2>
              <button className="px-3 py-1.5 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/30 text-sm font-medium rounded-lg transition-colors">
                View All
              </button>
            </div>
            <div className="p-6">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search stocks..."
                  className="pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg w-full text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="space-y-4">
                {portfolioStocks.map((stock, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedSymbol(stock.symbol)}
                    className={`flex items-center justify-between p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group ${selectedSymbol === stock.symbol ? 'bg-slate-100 dark:bg-slate-800/50 ring-1 ring-teal-500/50' : ''}`}
                  >
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg ${stock.positive ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' : 'bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400'}`}>
                        {stock.symbol.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <p className="font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{stock.symbol}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{stock.shares} shares</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900 dark:text-white">${stock.price}</p>
                      <p className={`text-sm font-medium ${stock.positive ? 'text-teal-600 dark:text-teal-400' : 'text-red-500 dark:text-red-400'}`}>
                        {stock.positive ? '+' : ''}{stock.change} ({stock.changePercent})
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="glass-panel rounded-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex items-center gap-2">
              <Activity size={20} className="text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            </div>
            <div className="p-6 space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex gap-4 relative pb-4 last:pb-0 last:after:hidden after:absolute after:left-[19px] after:top-10 after:bottom-0 after:w-0.5 after:bg-slate-800">
                  <div className={`relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 ${activity.positive ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400' : 'border-red-500/20 bg-red-500/10 text-red-400'}`}>
                    {activity.positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium text-white">
                        {activity.type} {activity.shares} {activity.symbol}
                      </span>
                      <span className="text-xs text-slate-500">{activity.date}</span>
                    </div>
                    <div className="text-sm text-slate-400">
                      @ ${activity.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Watchlist/Featured Stocks */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6">Featured Stocks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DataWidget
              title="Bitcoin - Binance"
              symbol="BTC"
              price="42,617.94 USD"
              change="+1,285.32"
              changePercent="+3.11%"
              positive={true}
            />
            <DataWidget
              title="Apple Inc."
              symbol="AAPL"
              price="175.43 USD"
              change="+2.34"
              changePercent="+1.35%"
              positive={true}
              details={[
                { label: 'Open', value: '173.20' },
                { label: 'Prev Close', value: '173.09' },
                { label: 'Volume', value: '45.2M' },
              ]}
            />
            <DataWidget
              title="Microsoft Corp."
              symbol="MSFT"
              price="378.85 USD"
              change="-1.23"
              changePercent="-0.32%"
              positive={false}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
