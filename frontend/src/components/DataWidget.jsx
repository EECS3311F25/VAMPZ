import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DataWidget({
  title,
  symbol,
  price,
  change,
  changePercent,
  positive,
  details,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-slate-100 w-full max-w-sm"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
          <p className="text-slate-900 font-bold">{symbol}</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-2xl font-bold text-slate-900">{price}</p>
        <div className={`flex items-center gap-1 text-sm font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span>{change} {changePercent}</span>
        </div>
      </div>

      {details && (
        <>
          <div className="space-y-3 mb-6">
            {details.map((detail, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-slate-500">{detail.label}</span>
                <span className="text-slate-900 font-medium">{detail.value}</span>
              </div>
            ))}
          </div>
          <div className="relative h-32 mt-4">
            <div className="absolute inset-0 flex items-end justify-between gap-2">
              {['Fri 18', 'Mon 21', 'Tue 22'].map((day, idx) => (
                <div key={day} className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
                  <div
                    className="w-full bg-teal-100 rounded-t-md relative group"
                    style={{ height: `${65 + idx * 15}%` }}
                  >
                    <div className="absolute inset-0 bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-md" />
                  </div>
                  <div className="text-xs text-slate-400">{day}</div>
                </div>
              ))}
            </div>
            {details && details.length > 0 && (
              <div className="absolute top-0 right-0 flex items-center gap-1.5 bg-white shadow-sm border border-slate-100 rounded-full px-2 py-1">
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                <span className="text-xs font-medium text-slate-600">Current</span>
              </div>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}