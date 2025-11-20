import { Calendar, Filter, Download, TrendingUp, TrendingDown, Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useState } from 'react';

const transactionsData = [
    { id: 1, type: 'Buy', symbol: 'AAPL', name: 'Apple Inc.', shares: 50, price: 172.50, total: 8625.00, date: '2025-01-18', time: '10:23 AM', status: 'Completed' },
    { id: 2, type: 'Sell', symbol: 'TSLA', name: 'Tesla Inc.', shares: 10, price: 248.30, total: 2483.00, date: '2025-01-17', time: '02:45 PM', status: 'Completed' },
    { id: 3, type: 'Buy', symbol: 'MSFT', name: 'Microsoft Corp.', shares: 30, price: 375.20, total: 11256.00, date: '2025-01-16', time: '11:10 AM', status: 'Completed' },
    { id: 4, type: 'Buy', symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 10, price: 482.90, total: 4829.00, date: '2025-01-15', time: '09:30 AM', status: 'Completed' },
    { id: 5, type: 'Sell', symbol: 'META', name: 'Meta Platforms Inc.', shares: 5, price: 315.60, total: 1578.00, date: '2025-01-14', time: '03:20 PM', status: 'Completed' },
    { id: 6, type: 'Buy', symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 25, price: 140.20, total: 3505.00, date: '2025-01-13', time: '01:15 PM', status: 'Completed' },
    { id: 7, type: 'Buy', symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 40, price: 146.80, total: 5872.00, date: '2025-01-12', time: '10:55 AM', status: 'Completed' },
    { id: 8, type: 'Sell', symbol: 'AAPL', name: 'Apple Inc.', shares: 15, price: 168.90, total: 2533.50, date: '2025-01-11', time: '02:30 PM', status: 'Completed' },
];

const TransactionsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('All');

    const filteredTransactions = transactionsData.filter(transaction => {
        const matchesSearch = transaction.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterType === 'All' || transaction.type === filterType;
        return matchesSearch && matchesFilter;
    });

    return (
        <DashboardLayout activeMenu="transactions">
            <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                {/* Header */}
                <div className="p-6 md:p-8 pt-10 md:pt-12">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Transaction History</h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">
                            View all your trading activity and transactions.
                        </p>
                    </div>

                    {/* Stats Summary */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Summary</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-teal-500/10 to-blue-500/10">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Total Trades</h3>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">All time</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-700">
                                        <ArrowUpRight size={20} className="text-teal-600 dark:text-teal-400" />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">8</p>
                            </div>

                            <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Total Volume</h3>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">Bought + Sold</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-700">
                                        <TrendingUp size={20} className="text-teal-600 dark:text-teal-400" />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">$40,681.50</p>
                            </div>

                            <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-blue-500/10 to-indigo-500/10">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Avg. Trade Size</h3>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">Per transaction</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-700">
                                        <Calendar size={20} className="text-teal-600 dark:text-teal-400" />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">$5,085.19</p>
                            </div>
                        </div>
                    </div>

                    {/* Filters and Search */}
                    <div className="mb-6">
                        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                            {/* Search */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search transactions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Filter Buttons */}
                            <div className="flex items-center gap-2">
                                <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                                    {['All', 'Buy', 'Sell'].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setFilterType(type)}
                                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${filterType === type
                                                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                                <button className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <Download size={18} className="text-slate-600 dark:text-slate-400" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Transactions Table */}
                    <div className="glass-card rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Type</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Stock</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Shares</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Price</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Total</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                    {filteredTransactions.map((transaction) => (
                                        <tr
                                            key={transaction.id}
                                            className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${transaction.type === 'Buy'
                                                        ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400'
                                                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                                        }`}
                                                >
                                                    {transaction.type === 'Buy' ? (
                                                        <ArrowUpRight size={12} />
                                                    ) : (
                                                        <ArrowDownRight size={12} />
                                                    )}
                                                    {transaction.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-semibold text-slate-900 dark:text-white">{transaction.symbol}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{transaction.name}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="font-medium text-slate-900 dark:text-white">{transaction.shares}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="font-medium text-slate-900 dark:text-white">${transaction.price.toFixed(2)}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="font-bold text-slate-900 dark:text-white">${transaction.total.toFixed(2)}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm">
                                                    <p className="font-medium text-slate-900 dark:text-white">{transaction.date}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{transaction.time}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Empty State */}
                        {filteredTransactions.length === 0 && (
                            <div className="text-center py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="w-32 h-32 mx-auto mb-4 relative">
                                    <div className="absolute inset-0 bg-slate-500/10 blur-2xl rounded-full opacity-50"></div>
                                    <img
                                        src="/images/empty-transactions.png"
                                        alt="No Transactions"
                                        className="w-full h-full object-contain relative z-10 opacity-80"
                                    />
                                </div>
                                <p className="text-lg font-semibold text-slate-900 dark:text-white mb-1">No transactions found</p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">
                                    {searchQuery || filterType !== 'All' ? 'Try adjusting your filters' : 'Your trading history will appear here'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TransactionsPage;
