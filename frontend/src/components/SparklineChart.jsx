import React, { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { getChartData, getSymbolBasePrice } from '../utils/chartDataGenerator';
import { useTheme } from '../context/ThemeContext';

const SparklineChart = ({ symbol, range = '3M' }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [data, setData] = useState([]);
    const [trend, setTrend] = useState('neutral'); // 'up', 'down', 'neutral'

    useEffect(() => {
        const basePrice = getSymbolBasePrice(symbol);
        const chartData = getChartData(range, basePrice);
        setData(chartData);

        if (chartData.length > 0) {
            const startPrice = chartData[0].price;
            const endPrice = chartData[chartData.length - 1].price;
            if (endPrice > startPrice) setTrend('up');
            else if (endPrice < startPrice) setTrend('down');
            else setTrend('neutral');
        }
    }, [symbol, range]);

    const getColor = () => {
        if (trend === 'up') return '#10b981'; // Emerald 500
        if (trend === 'down') return '#ef4444'; // Red 500
        return '#64748b'; // Slate 500
    };

    const color = getColor();

    if (data.length === 0) return <div className="h-32 w-full bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />;

    return (
        <div className="w-full h-48 relative">
            <div className="absolute top-0 right-0 z-10 px-2 py-1 rounded-bl-xl bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm text-xs font-bold text-slate-500 dark:text-slate-400 border-b border-l border-slate-200 dark:border-slate-700">
                {range}
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id={`colorGradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Area
                        type="monotone"
                        dataKey="price"
                        stroke={color}
                        fill={`url(#colorGradient-${symbol})`}
                        strokeWidth={2}
                        isAnimationActive={true}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SparklineChart;
