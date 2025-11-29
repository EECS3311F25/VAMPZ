import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TopBar from '../components/TopBar';
import {
    LogOut,
    LayoutDashboard,
    Wallet,
    Eye,
    History,
    ChevronRight,
    X,
} from 'lucide-react';
import { Logo } from '../components/Logo';

const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'portfolio', label: 'Portfolio', icon: Wallet, path: '/portfolio' },
    { id: 'watchlist', label: 'Watchlist', icon: Eye, path: '/watchlist' },
    { id: 'transactions', label: 'Transactions', icon: History, path: '/transactions' },
];

import { AnimatePresence, motion } from 'framer-motion';

// ... (imports remain the same, ensure AnimatePresence and motion are imported)

const DashboardLayout = ({ children, activeMenu }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

  return {

  (
<div></div>
  )
}
