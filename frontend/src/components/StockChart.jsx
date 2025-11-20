import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';

const StockChart = ({ data, color = "#0d9488" }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Mock data if none provided
  const chartData = data || [
    { time: '9:30', price: 150.20 },
    { time: '10:00', price: 152.45 },
    { time: '10:30', price: 151.80 },
    { time: '11:00', price: 153.90 },
    { time: '11:30', price: 154.20 },
    { time: '12:00', price: 153.50 },
    { time: '12:30', price: 155.10 },
    { time: '13:00', price: 156.40 },
    { time: '13:30', price: 155.80 },
    { time: '14:00', price: 157.20 },
    { time: '14:30', price: 158.50 },
    { time: '15:00', price: 157.90 },
    { time: '15:30', price: 159.10 },
    { time: '16:00', price: 160.00 },
  ];

  return (
    <div className="w-full h-[300px] sm:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} vertical={false} strokeOpacity={0.5} />
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
            contentStyle={{
              backgroundColor: isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
              borderColor: isDark ? '#334155' : '#e2e8f0',
              borderRadius: '0.75rem',
              color: isDark ? '#f8fafc' : '#0f172a',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              backdropFilter: 'blur(8px)',
              padding: '12px'
            }}
            itemStyle={{ color: isDark ? '#f8fafc' : '#0f172a', fontWeight: 600 }}
            formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
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
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
