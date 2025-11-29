import PropTypes from 'prop-types';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({
    title,
    label,
    value,
    change,
    changePercent,
    positive = true,
    icon: Icon,
    gradient = 'from-teal-500/10 to-blue-500/10',
    className = '',
    hideArrow = false,
}) => {
    return (
        <div
            className={`glass-card p-6 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 bg-gradient-to-br dark:bg-gradient-to-br h-full flex flex-col justify-between ${gradient} ${className}`}
        >
            {/* Header with Title and Icon */}
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                        {title}
                    </h3>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-medium tracking-wide">
                        {label}
                    </p>
                </div>
                {Icon && (
                    <div className="w-12 h-12 rounded-2xl bg-white/50 dark:bg-white/5 flex items-center justify-center shadow-sm border border-white/20 dark:border-white/10 group-hover:scale-110 transition-transform duration-500">
                        <Icon size={22} className="text-teal-600 dark:text-teal-400" />
                    </div>
                )}
            </div>

            {/* Value */}
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 relative z-10 tracking-tight">
                {value}
            </p>

            {/* Change Indicator (Optional) */}
            {change && (
                <div
                    className={`flex items-center text-sm font-semibold relative z-10 ${positive
                        ? 'text-teal-600 dark:text-emerald-400'
                        : 'text-red-600 dark:text-red-400'
                        }`}
                >
                    {!hideArrow && (
                        positive ? (
                            <TrendingUp size={16} className="mr-1.5" />
                        ) : (
                            <TrendingDown size={16} className="mr-1.5" />
                        )
                    )}
                    <span>{change}</span>
                    {changePercent && (
                        <span className="text-slate-400 dark:text-slate-500 ml-1.5 font-medium opacity-80">
                            • {changePercent}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

StatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    change: PropTypes.string,
    changePercent: PropTypes.string,
    positive: PropTypes.bool,
    icon: PropTypes.elementType,
    gradient: PropTypes.string,
    className: PropTypes.string,
    hideArrow: PropTypes.bool,
};

export default StatsCard;