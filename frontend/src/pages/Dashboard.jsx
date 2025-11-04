import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { TrendingUp, TrendingDown, Search, LogOut, DollarSign, PieChart, BarChart3, Activity, LayoutDashboard, Wallet, Eye, History, Settings, Home } from 'lucide-react'
import DataWidget from '../components/DataWidget.jsx'

export default function Dashboard() {
  const { user, loading, checkAuth, logout } = useAuth()
  const navigate = useNavigate()
  const [fetching, setFetching] = useState(true)
  const [activeMenu, setActiveMenu] = useState('dashboard')

  // Dummy data
  const statsCards = [
    { title: 'Portfolio Value', value: '$125,430.50', change: '+$2,450.20', changePercent: '+2.00%', positive: true, icon: DollarSign },
    { title: 'Total Gain', value: '+$15,430.50', change: '+$1,230.40', changePercent: '+8.67%', positive: true, icon: TrendingUp },
    { title: 'Active Positions', value: '12', change: '+2', changePercent: 'This month', positive: true, icon: PieChart },
    { title: 'Win Rate', value: '68%', change: '+5%', changePercent: 'vs last month', positive: true, icon: Activity },
  ]

  const portfolioStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '175.43', change: '+2.34', changePercent: '+1.35%', positive: true, shares: 50 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: '378.85', change: '-1.23', changePercent: '-0.32%', positive: false, shares: 30 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '142.56', change: '+3.21', changePercent: '+2.30%', positive: true, shares: 25 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: '148.92', change: '+0.87', changePercent: '+0.59%', positive: true, shares: 40 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: '245.67', change: '-5.43', changePercent: '-2.16%', positive: false, shares: 15 },
  ]

  const recentActivity = [
    { type: 'Buy', symbol: 'NVDA', shares: 10, price: '485.20', date: '2 hours ago', positive: true },
    { type: 'Sell', symbol: 'META', shares: 5, price: '312.45', date: '1 day ago', positive: false },
    { type: 'Buy', symbol: 'NFLX', shares: 8, price: '425.80', date: '2 days ago', positive: true },
    { type: 'Buy', symbol: 'AMD', shares: 20, price: '128.90', date: '3 days ago', positive: true },
  ]