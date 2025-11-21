import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { getChartData, getSymbolBasePrice } from '../utils/chartDataGenerator';

const TIME_RANGES = [
  { label: '1D', value: '1D' },
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
  color = "#0d9488"
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Load persisted range from localStorage
  const getPersistedRange = () => {
    const stored = localStorage.getItem(`chart-timerange-${symbol}`);
    return stored || '1D';
  };

  const [selectedRange, setSelectedRange] = useState(getPersistedRange);
  const [chartData, setChartData] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Update chart data when symbol or range changes
  useEffect(() => {
    const basePrice = getSymbolBasePrice(symbol);
    const newData = getChartData(selectedRange, basePrice);

    // Trigger animation
    setIsAnimating(true);
    setChartData(newData);

    // Reset animation flag
    const timer = setTimeout(() => setIsAnimating(false), 800);
    return () => clearTimeout(timer);
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

    return (
      <div
        style={{
          backgroundColor: isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          borderColor: isDark ? '#334155' : '#e2e8f0',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderRadius: '0.75rem',
          color: isDark ? '#f8fafc' : '#0f172a',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          backdropFilter: 'blur(8px)',
          padding: '12px'
        }}
      >
        <p style={{ margin: 0, fontWeight: 600, fontSize: '14px' }}>
          ${data.price.toFixed(2)}
        </p>
        <p style={{ margin: '4px 0 0 0', fontSize: '12px', opacity: 0.7 }}>
          {data.time}
        </p>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Time Range Controls - Fluid Glassmorphic */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center p-1 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          {TIME_RANGES.map((range) => {
            const isActive = selectedRange === range.value;
            return (
              <button
                key={range.value}
                onClick={() => handleRangeChange(range.value)}
                className={`relative px-4 py-1.5 text-xs font-bold transition-colors rounded-lg z-10 ${isActive
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeRange"
                    className="absolute inset-0 bg-white dark:bg-slate-600 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] z-[-1]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {range.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[300px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#334155" : "#e2e8f0"}
              vertical={false}
              strokeOpacity={0.5}
            />
            <XAxis
              dataKey="time"
              stroke={isDark ? "#94a3b8" : "#64748b"}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              domain={['auto', 'auto']}
              stroke={isDark ? "#94a3b8" : "#64748b"}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
              dx={-10}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: isDark ? '#475569' : '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area
              type="linear"
              dataKey="price"
              stroke={color}
              fillOpacity={1}
              fill="url(#colorPrice)"
              strokeWidth={2}
              activeDot={{ r: 6, strokeWidth: 0, fill: color }}
              isAnimationActive={isAnimating}
              animationDuration={800}
              animationEasing="ease-out"
            />

            {/* Trade Markers */}
            {tradeMarkers.map((marker, index) => {
              // Find matching data point
              const dataPoint = chartData.find(d =>
                Math.abs(d.timestamp - marker.timestamp) < 60000 // Within 1 minute
              );

              if (!dataPoint) return null;

              return (
                <ReferenceDot
                  key={`marker-${index}`}
                  x={dataPoint.time}
                  y={marker.price}
                  r={6}
                  fill={marker.type === 'Buy' ? '#10b981' : '#ef4444'}
                  stroke={isDark ? '#1e293b' : '#ffffff'}
                  strokeWidth={2}
                  style={{ cursor: 'pointer' }}
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;
