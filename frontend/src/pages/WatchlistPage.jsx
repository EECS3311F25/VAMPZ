import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, X, Check, TrendingUp, TrendingDown, Eye, List } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import StatsCard from '../components/ui/StatsCard';
import { SkeletonSummaryCard, SkeletonWatchlistCard } from '../components/Skeleton';
import TradeModal from '../components/TradeModal';
import SparklineChart from '../components/SparklineChart';
import StockChart from '../components/StockChart';

const POPULAR_STOCKS = [
    'AAPL', 'TSLA', 'AMZN', 'MSFT', 'NVDA', 'GOOGL', 'META', 'NFLX', 'JPM', 'V', 'BAC', 'AMD', 'PYPL', 'DIS', 'T', 'PFE', 'COST', 'INTC', 'KO', 'TGT', 'NKE', 'SPY', 'BA', 'BABA', 'XOM', 'WMT', 'GE', 'CSCO', 'VZ', 'JNJ', 'CVX', 'PLTR', 'SQ', 'SHOP', 'SBUX', 'SOFI', 'HOOD', 'RBLX', 'SNAP', 'UBER', 'FDX', 'ABBV', 'ETSY', 'MRNA', 'LMT', 'GM', 'F', 'RIVN', 'LCID', 'CCL', 'DAL', 'UAL', 'AAL', 'TSM', 'SONY', 'ET', 'NOK', 'MRO', 'COIN', 'SIRI', 'RIOT', 'CPRX', 'VWO', 'SPYG', 'ROKU', 'VIAC', 'ATVI', 'BIDU', 'DOCU', 'ZM', 'PINS', 'TLRY', 'WBA', 'MGM', 'NIO', 'C', 'GS', 'WFC', 'ADBE', 'PEP', 'UNH', 'CARR', 'FUBO', 'HCA', 'TWTR', 'BILI', 'RKT'
];

const WatchlistPage = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [portfolioData, setPortfolioData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [addSymbolQuery, setAddSymbolQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showTradeModal, setShowTradeModal] = useState(false);
    const [tradeType, setTradeType] = useState('Buy');
    const [stockDetails, setStockDetails] = useState(null);

    // Dropdown state
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    // Error state
    const [addError, setAddError] = useState('');


    const removeFromWatchlist = async (e, symbol) => {
        if (e) e.stopPropagation();

        // Find the item to be removed to save it for potential rollback
        const itemToRemove = watchlist.find(s => s.symbol === symbol);
        if (!itemToRemove) return;

        // Optimistic update
        setWatchlist(prev => prev.filter(s => s.symbol !== symbol));

        try {
            const response = await fetch(`http://localhost:8080/api/portfolio/watchlist?symbol=${symbol}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                // Revert if failed: Add the item back
                setWatchlist(prev => [...prev, itemToRemove]);
                console.error('Failed to remove from watchlist');
            }
        } catch (error) {
            console.error('Error removing from watchlist:', error);
            // Revert on error: Add the item back
            setWatchlist(prev => [...prev, itemToRemove]);
        }
    };

    const fetchStockDetails = async (symbol) => {
        setStockDetails(null);
        try {
            const response = await fetch(`http://localhost:8080/api/marketData/stockData?symbol=${symbol}`, {
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setStockDetails(data);
            }
        } catch (error) {
            console.error('Error fetching stock details:', error);
        }
    };

    const viewStockDetails = (stock) => {
        setSelectedStock(stock);
        fetchStockDetails(stock.symbol);
        setShowDetailModal(true);
    };

    const handleTrade = (stock, type) => {
        // Find current holding for this stock to pass sharesOwned
        const currentHolding = portfolioData?.holdings?.find(h => h.symbol === stock.symbol);
        const sharesOwned = currentHolding ? currentHolding.quantity : 0;

        setSelectedStock({
            ...stock,
            shares: sharesOwned // Pass shares owned to TradeModal via stock object
        });
        setTradeType(type);
        setShowDetailModal(false); // Close detail modal if open
        setShowTradeModal(true);
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (addSymbolQuery.trim()) {
            addToWatchlist(addSymbolQuery.toUpperCase());
        }
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < suggestions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
                    setAddSymbolQuery(suggestions[selectedIndex]);
                    addToWatchlist(suggestions[selectedIndex]);
                    setShowSuggestions(false);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setShowSuggestions(false);
                setSelectedIndex(-1);
                break;
            default:
                break;
        }
    };

    const handleSelectSuggestion = (symbol) => {
        setAddSymbolQuery(symbol);
        addToWatchlist(symbol);
        setShowSuggestions(false);
    };

    const handleTradeSubmit = async (tradeData) => {
        if (!tradeData) return;

        const endpoint = tradeData.type === 'Buy' ? '/api/portfolio/buy' : '/api/portfolio/sell';

        try {
            const response = await fetch(`http://localhost:8080${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    symbol: tradeData.symbol,
                    quantity: parseInt(tradeData.quantity)
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setShowTradeModal(false);
                setSelectedStock(null);
                // Refresh both watchlist (for potential price updates if we were fetching live)
                // and portfolio data (for cash/holdings updates)
                fetchWatchlist();
                fetchPortfolioData();
            } else {
                // Handle specific error messages consistent with Dashboard
                if (result.message === 'Holding not found') {
                    alert('You do not own any shares of this stock.');
                } else if (result.message === 'Insufficient stock quantity to sell') {
                    alert('You do not have enough shares to sell this quantity.');
                } else if (result.message === 'Insufficient funds') {
                    alert('Insufficient funds to complete this purchase.');
                } else {
                    alert(result.message || 'Trade failed');
                }
            }
        } catch (error) {
            console.error('Trade error:', error);
            alert('An error occurred while processing your trade');
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (<div> </div>);
};

export default WatchlistPage;
