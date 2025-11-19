import { Search, TrendingUp, TrendingDown, DollarSign, PieChart, ArrowUpRight, ArrowDownRight, MoreVertical } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

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
  return (
    <DashboardLayout activeMenu="portfolio">
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Portfolio</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Review and manage your current positions.
          </p>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <DollarSign size={64} />
            </div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Portfolio Value</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2 relative z-10">$125,430.50</p>
            <div className="flex items-center text-teal-600 dark:text-emerald-400 mt-2 text-sm font-medium relative z-10">
              <TrendingUp size={16} className="mr-1" />
              <span>+$2,450.20 (+2.00%) Today</span>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp size={64} />
            </div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Gain/Loss</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2 relative z-10">+$15,430.50</p>
            <p className="text-sm text-teal-600 dark:text-emerald-400 mt-2 font-medium relative z-10">+14.05% All time</p>
          </div>

          <div className="glass-card rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <PieChart size={64} />
            </div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Available Cash</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2 relative z-10">$10,000.00</p>
            <p className="text-sm text-slate-600 dark:text-slate-500 mt-2 relative z-10">Ready to invest</p>
          </div>
        </div>

        {/* Portfolio Table */}
        <div className="glass-panel rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Your Positions <span className="text-slate-500 dark:text-slate-500 text-sm font-normal ml-2">(7 Assets)</span></h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
              <input
                type="text"
                placeholder="Search in portfolio..."
                className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg w-full sm:w-64 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
              <thead className="bg-slate-100 dark:bg-slate-900/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Asset
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Shares
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Today's Change
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Value
                  </th>
                  <th scope="col" className="relative px-6 py-4">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {portfolioStocks.map((stock) => (
                  <tr key={stock.symbol} className="hover:bg-slate-100 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg ${stock.positive ? 'bg-teal-100 dark:bg-emerald-500/20 text-teal-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400'}`}>
                          {stock.symbol.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-blue-400 transition-colors">{stock.symbol}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-500">{stock.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300 font-medium">{stock.shares}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white font-bold">${stock.price}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${stock.positive ? 'text-teal-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      <div className="flex items-center">
                        {stock.positive ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
                        {stock.change} ({stock.changePercent})
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white font-bold">${stock.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PortfolioPage;
