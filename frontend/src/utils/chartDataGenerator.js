/**
 * Generate mock historical stock data for different time ranges
 * In production, replace with actual API calls to market data provider
 */

/**
 * Generate realistic price movements with slight volatility
 */
const generatePricePoint = (basePrice, volatility = 0.02) => {
    const change = basePrice * volatility * (Math.random() - 0.5) * 2;
    return parseFloat((basePrice + change).toFixed(2));
};

/**
 * Format time for display
 */
const formatTime = (date, format = 'time') => {
    if (format === 'time') {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false });
    } else if (format === 'date') {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else if (format === 'month') {
        return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    }
    return date.toISOString();
};

/**
 * Generate 1 Day data - every 5 minutes during trading hours (9:30 AM - 4:00 PM ET)
 */
export const generate1DData = (basePrice = 150) => {
    const data = [];
    const now = new Date();
    now.setHours(9, 30, 0, 0); // Start at 9:30 AM

    let currentPrice = basePrice;

    // 6.5 hours * 12 intervals per hour = 78 data points
    for (let i = 0; i < 78; i++) {
        const time = new Date(now.getTime() + i * 5 * 60 * 1000);
        currentPrice = generatePricePoint(currentPrice, 0.003);

        data.push({
            time: formatTime(time, 'time'),
            price: currentPrice,
            timestamp: time.getTime()
        });
    }

    return data;
};

/**
 * Generate 1 Week data - hourly intervals for 5 trading days
 */
export const generate1WData = (basePrice = 150) => {
    const data = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 5); // Start 5 days ago
    startDate.setHours(9, 30, 0, 0);

    let currentPrice = basePrice * 0.98; // Start slightly lower

    // 5 days * 6.5 hours * 1 per hour = ~33 points
    for (let day = 0; day < 5; day++) {
        for (let hour = 0; hour < 7; hour++) {
            const time = new Date(startDate.getTime() + (day * 24 + hour) * 60 * 60 * 1000);
            currentPrice = generatePricePoint(currentPrice, 0.008);

            data.push({
                time: formatTime(time, 'date'),
                price: currentPrice,
                timestamp: time.getTime()
            });
        }
    }

    return data;
};

/**
 * Generate 1 Month data - daily closing prices for ~22 trading days
 */
export const generate1MData = (basePrice = 150) => {
    const data = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 22);
    startDate.setHours(16, 0, 0, 0); // Market close

    let currentPrice = basePrice * 0.95;

    for (let i = 0; i < 22; i++) {
        const time = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
        currentPrice = generatePricePoint(currentPrice, 0.015);

        data.push({
            time: formatTime(time, 'date'),
            price: currentPrice,
            timestamp: time.getTime()
        });
    }

    return data;
};

/**
 * Generate 3 Months data - daily closing prices for ~66 trading days
 */
export const generate3MData = (basePrice = 150) => {
    const data = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 90);
    startDate.setHours(16, 0, 0, 0);

    let currentPrice = basePrice * 0.90;

    for (let i = 0; i < 66; i++) {
        const time = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
        currentPrice = generatePricePoint(currentPrice, 0.018);

        data.push({
            time: formatTime(time, 'date'),
            price: currentPrice,
            timestamp: time.getTime()
        });
    }

    return data;
};

/**
 * Generate 1 Year data - weekly closing prices for 52 weeks
 */
export const generate1YData = (basePrice = 150) => {
    const data = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 365);
    startDate.setHours(16, 0, 0, 0);

    let currentPrice = basePrice * 0.80;

    for (let i = 0; i < 52; i++) {
        const time = new Date(startDate.getTime() + i * 7 * 24 * 60 * 60 * 1000);
        currentPrice = generatePricePoint(currentPrice, 0.025);

        data.push({
            time: formatTime(time, 'date'),
            price: currentPrice,
            timestamp: time.getTime()
        });
    }

    return data;
};

/**
 * Generate ALL data - monthly closing prices for 5 years
 */
export const generateALLData = (basePrice = 150) => {
    const data = [];
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 5);
    startDate.setHours(16, 0, 0, 0);

    let currentPrice = basePrice * 0.60;

    for (let i = 0; i < 60; i++) {
        const time = new Date(startDate.getTime());
        time.setMonth(startDate.getMonth() + i);
        currentPrice = generatePricePoint(currentPrice, 0.035);

        data.push({
            time: formatTime(time, 'month'),
            price: currentPrice,
            timestamp: time.getTime()
        });
    }

    return data;
};

/**
 * Get data for a specific time range
 */
export const getChartData = (range = '1D', basePrice = 150) => {
    switch (range) {
        case '1D':
            return generate1DData(basePrice);
        case '1W':
            return generate1WData(basePrice);
        case '1M':
            return generate1MData(basePrice);
        case '3M':
            return generate3MData(basePrice);
        case '1Y':
            return generate1YData(basePrice);
        case 'ALL':
            return generateALLData(basePrice);
        default:
            return generate1DData(basePrice);
    }
};

/**
 * Get symbol-specific base price (mock data)
 * In production, fetch from real API
 */
export const getSymbolBasePrice = (symbol) => {
    const prices = {
        'AAPL': 175.43,
        'TSLA': 245.67,
        'MSFT': 378.85,
        'GOOGL': 142.56,
        'AMZN': 148.92,
        'NVDA': 485.20,
        'META': 312.45,
        'NFLX': 425.67,
    };

    return prices[symbol] || 150.00;
};
