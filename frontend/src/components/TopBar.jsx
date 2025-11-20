import { Link } from 'react-router-dom';
import { Bell, BookOpen, ChevronDown, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { useState } from 'react';

const TopBar = ({ onToggleSidebar }) => {
    const { user, logout } = useAuth();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <div className="h-16 bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md shadow-sm transition-colors duration-300">
            {/* Logo & Hamburger */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onToggleSidebar}
                    className="p-2 -ml-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <Menu size={24} />
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center shadow-md shadow-teal-500/20">
                        <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent hidden sm:block">
                        StockSprout
                    </span>
                </div>
            </div>

            {/* Center - Search (optional, can add later) */}
            <div className="flex-1 max-w-xl mx-8">
                {/* Search can go here */}
            </div>

            {/* Right Side - Learn, Notifications, Profile */}
            <div className="flex items-center gap-4">
                {/* Learn Link */}
                <Link
                    to="/learn"
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <BookOpen size={18} />
                    <span className="hidden sm:inline">Learn</span>
                </Link>

                {/* Notifications */}
                <button className="relative p-2 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
                </button>

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-teal-500/20">
                            {user?.firstName?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                                {user?.firstName || 'User'}
                            </p>
                        </div>
                        <ChevronDown size={16} className="text-slate-500 dark:text-slate-400" />
                    </button>

                    {/* Dropdown Menu */}
                    {showProfileMenu && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setShowProfileMenu(false)}
                            ></div>
                            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-20">
                                <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        {user?.firstName} {user?.lastName}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        {user?.email}
                                    </p>
                                </div>
                                <Link
                                    to="/settings"
                                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                    onClick={() => setShowProfileMenu(false)}
                                >
                                    Settings
                                </Link>
                                <Link
                                    to="/help"
                                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                    onClick={() => setShowProfileMenu(false)}
                                >
                                    Help & Support
                                </Link>
                                <div className="border-t border-slate-200 dark:border-slate-700 mt-2 pt-2">
                                    <button
                                        onClick={() => {
                                            setShowProfileMenu(false);
                                            logout();
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopBar;
