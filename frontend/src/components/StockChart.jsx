import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const TIME_RANGES = [

  { label: '1W', value: '1W' },
  { label: '1M', value: '1M' },
  { label: '3M', value: '3M' },
  { label: '1Y', value: '1Y' },
  { label: 'ALL', value: 'ALL' },
];

const StockChart = ({
  symbol = 'AAPL',
  onHoverPoint = null,
  tradeMarkers = [],
  color = "#0d9488",
  height = "h-[300px] sm:h-[400px]"
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Load persisted range from localStorage
  const getPersistedRange = () => {
    const stored = localStorage.getItem(`chart-timerange-${symbol}`);
    return stored || '1W';
  };

  const [selectedRange, setSelectedRange] = useState(getPersistedRange);
  const [chartData, setChartData] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Update chart data when symbol or range changes
  useEffect(() => {
    const fetchChartData = async () => {
      setIsAnimating(true);

      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();

      switch (selectedRange) {
        case '1W':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case '1M':
          startDate.setMonth(endDate.getMonth() - 1);
          break;
        case '3M':
          startDate.setMonth(endDate.getMonth() - 3);
          break;
        case '1Y':
          startDate.setFullYear(endDate.getFullYear() - 1);
          break;
        case 'ALL':
          startDate.setFullYear(endDate.getFullYear() - 5);
          break;
        default:
          startDate.setDate(endDate.getDate() - 7);
      }

      const formatDate = (date) => date.toISOString().split('T')[0];

      try {
        const response = await fetch(
          `http://localhost:8080/api/marketData/StockPriceHistory?symbol=${symbol}&startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`,
          { credentials: 'include' }
        );

        if (response.ok) {
          const data = await response.json();

          // Format data for Recharts
          // API returns: { symbol: "NVDA", price: 186.6, date: "2025-11-17" }
          // We need: { time: string, price: number, timestamp: number }
          const formattedData = data.map(item => {
            const dateObj = new Date(item.date);
            // Adjust time format based on range
            let timeLabel;
            if (selectedRange === '1W' || selectedRange === '1M') {
              timeLabel = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            } else {
              timeLabel = dateObj.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
            }

            return {
              time: timeLabel,
              price: item.price,
              timestamp: dateObj.getTime()
            };
          }).reverse(); // API returns newest first, chart needs oldest first

          setChartData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setChartData([]);
      } finally {
        setTimeout(() => setIsAnimating(false), 800);
      }
    };

    fetchChartData();
  }, [symbol, selectedRange]);

  // Persist range selection
  const handleRangeChange = (range) => {
    setSelectedRange(range);
    localStorage.setItem(`chart-timerange-${symbol}`, range);
  };

  // Handle mouse move on chart to expose hover data
  const handleMouseMove = (data) => {
    if (data && data.activePayload && data.activePayload.length > 0 && onHoverPoint) {
      const point = data.activePayload[0].payload;
      onHoverPoint({
        time: point.time,
        price: point.price,
        timestamp: point.timestamp
      });
    }
  };

  const handleMouseLeave = () => {
    if (onHoverPoint) {
      onHoverPoint(null);
    }
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || payload.length === 0) return null;

    const data = payload[0].payload;

    return (<div className={`bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700`}>
      <p className="text-sm font-semibold text-slate-900 dark:text-white">Price: ${data.price.toFixed(2)}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{data.time}</p>
    </div>);
  };

  return (<div className={`glass-card p-4 ${height} w-full flex flex-col`}>     
  );
};

export default StockChart;