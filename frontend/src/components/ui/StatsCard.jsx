import PropTypes from 'prop-types';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * Reusable Stats Card Component
 * 
 * Displays a stat with an icon, title, value, and optional change indicator.
 * Used across Dashboard, Portfolio, Watchlist, and Transactions pages.
 */
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
            className={`glass-card rounded-2xl p-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300 bg-gradient-to-br dark:bg-gradient-to-br h-full flex flex-col justify-between ${gradient} ${className}`}
        >
            {/* Header with Title and Icon */}
            <div className="flex justify-between items-start mb-3 relative z-10">
                <div>
                    <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                        {title}
                    </h3>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">
                        {label}
                    </p>
                </div>
                {Icon && (
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-700">
                        <Icon size={20} className="text-teal-600 dark:text-teal-400" />
                    </div>
                )}
            </div>

            {/* Value */}
            <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1 relative z-10">
                {value}
            </p>

            {/* Change Indicator (Optional) */}
            {change && (
                <div
                    className={`flex items-center text-xs font-medium relative z-10 ${positive
                        ? 'text-teal-600 dark:text-emerald-400'
                        : 'text-red-600 dark:text-red-400'
                        }`}
                >
                    {!hideArrow && (
                        positive ? (
                            <TrendingUp size={14} className="mr-1" />
                        ) : (
                            <TrendingDown size={14} className="mr-1" />
                        )
                    )}
                    <span>{change}</span>
                    {changePercent && (
                        <span className="text-slate-400 dark:text-slate-500 ml-1 font-normal">
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
