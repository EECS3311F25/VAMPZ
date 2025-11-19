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
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} vertical={false} />
          <XAxis
            dataKey="time"
            stroke={isDark ? "#94a3b8" : "#64748b"}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={['auto', 'auto']}
            stroke={isDark ? "#94a3b8" : "#64748b"}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#1e293b' : '#ffffff',
              borderColor: isDark ? '#334155' : '#e2e8f0',
              borderRadius: '0.5rem',
              color: isDark ? '#f8fafc' : '#0f172a',
            }}
            itemStyle={{ color: isDark ? '#f8fafc' : '#0f172a' }}
            formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            fillOpacity={1}
            fill="url(#colorPrice)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
