import { TrendingUp, TrendingDown } from 'lucide-react';

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
    <div className="glass-card rounded-xl p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-medium text-slate-400">{title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{symbol}</p>
        </div>
      </div>

      <div>
        <p className="text-2xl font-bold text-white">{price}</p>
        <div className={`flex items-center mt-2 text-sm font-medium ${positive ? 'text-emerald-400' : 'text-red-400'}`}>
          {positive ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
          <span>{change} {changePercent}</span>
        </div>
      </div>

      {details && (
        <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-2">
          {details.map((detail, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs">
              <span className="text-slate-500">{detail.label}</span>
              <span className="font-medium text-slate-300">{detail.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}