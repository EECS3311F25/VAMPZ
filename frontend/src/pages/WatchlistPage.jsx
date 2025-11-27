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

    const fetchWatchlist = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/portfolio/watchList', {
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                // Deduplicate based on symbol to prevent duplicate cards
                const uniqueData = Array.from(new Map(data.map(item => [item.symbol, item])).values());

                const formattedData = uniqueData.map(stock => ({
                    ...stock,
                    marketCap: formatMarketCap(stock.marketCap),
                    positive: stock.change >= 0
                }));
                setWatchlist(formattedData);
            }
        } catch (error) {
            console.error('Error fetching watchlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPortfolioData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/portfolio/me', {
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setPortfolioData(data);
            }
        } catch (error) {
            console.error('Error fetching portfolio data:', error);
        }
    };

    useEffect(() => {
        fetchWatchlist();
        fetchPortfolioData();
    }, []);

// Filter suggestions when addSymbolQuery changes
    useEffect(() => {
        if (addSymbolQuery) {
            const filtered = POPULAR_STOCKS.filter(stock =>
                stock.toLowerCase().includes(addSymbolQuery.toLowerCase()) &&
                stock !== addSymbolQuery.toUpperCase()
            ).slice(0, 5);
            setSuggestions(filtered);
            setSelectedIndex(-1);
        } else {
            setSuggestions([]);
            setSelectedIndex(-1);
        }
    }, [addSymbolQuery]);

    const formatMarketCap = (value) => {
        if (!value) return 'N/A';
        if (value >= 1e12) return (value / 1e12).toFixed(2) + 'T';
        if (value >= 1e9) return (value / 1e9).toFixed(2) + 'B';
        if (value >= 1e6) return (value / 1e6).toFixed(2) + 'M';
        return value.toString();
    };

    const filteredWatchlist = watchlist.filter(stock => {
        const symbol = stock.symbol || '';
        const name = stock.name || '';
        const query = searchQuery.toLowerCase();
        return symbol.toLowerCase().includes(query) || name.toLowerCase().includes(query);
    });

    const addToWatchlist = async (symbol) => {
        setAddError(''); // Clear previous errors

        const upperSymbol = symbol.toUpperCase();

        // Validate against popular stocks list
        if (!POPULAR_STOCKS.includes(upperSymbol)) {
            setAddError(`Stock "${upperSymbol}" is not available for trading.`);
            return;
        }

        // Check if already in watchlist
        if (watchlist.some(stock => stock.symbol === upperSymbol)) {
            setAddError(`${upperSymbol} is already in your watchlist`);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/portfolio/watchlist?symbol=${upperSymbol}`, {
                method: 'POST',
                credentials: 'include',
            });
            const result = await response.json();

            if (response.ok) {
                if (result.status === 'error') {
                    setAddError(result.message);
                } else {
                    fetchWatchlist(); // Refresh list
                    setShowAddModal(false);
                    setAddSymbolQuery(''); // Clear search in modal
                    setShowSuggestions(false);
                }
            } else {
                setAddError(result.message || 'Failed to add to watchlist');
            }
        } catch (error) {
            console.error('Error adding to watchlist:', error);
            setAddError('Network error. Please try again.');
        }
    };

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
