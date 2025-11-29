import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, TrendingUp, TrendingDown, Wallet, ArrowRight, Minus, Plus } from 'lucide-react';

const TradeModal = ({ isOpen, onClose, stock, type = 'Buy', onConfirm, cash = 0 }) => {
    const [quantity, setQuantity] = useState(1);
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);

    // Handle both direct stock objects and trade request objects
    const stockSymbol = stock?.symbol || stock?.ticker || '';
    const stockPrice = parseFloat(stock?.price || 0);
    const stockShares = stock?.shares || 0;

    // Use passed cash for buying power
    const buyingPower = cash;
    // We don't have the full portfolio value here easily, so we'll just use cash + current trade value as a proxy or just ignore portfolio value updates for now in the modal display if it's too complex.
    // But let's try to keep it consistent.
    const currentPortfolioValue = buyingPower; // Simplified for now as we only passed cash

    useEffect(() => {
        if (isOpen) {
            setQuantity(stock?.quantity || 1);
            setSuccess(false);
            setFailed(false);
        }
    }, [isOpen, stock]);

    console.log('TradeModal render:', { isOpen, stock });

    if (!isOpen || !stock) return null;

    const total = (stockPrice * quantity).toFixed(2);
    const totalNum = parseFloat(total);

    // Calculate portfolio effects
    const newBuyingPower = type === 'Buy'
        ? buyingPower - totalNum
        : buyingPower + totalNum;

    const handleConfirm = () => {
        if (type === 'Sell' && quantity > stockShares) {
            setFailed(true);
            return;
        }

        setSuccess(true);
        if (onConfirm) {
            onConfirm({
                symbol: stockSymbol,
                type,
                quantity,
                price: stockPrice,
                total: totalNum
            });
        }
    };

    return createPortal(
       <div>
    );
};

export default TradeModal;
