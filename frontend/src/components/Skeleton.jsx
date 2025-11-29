/**
 * Skeleton - Reusable loading skeleton components
 * Provides various skeleton shapes for different content types
 */

// Base skeleton with shimmer animation
export const Skeleton = ({ className = '', width = 'w-full', height = 'h-4' }) => {
    return (
        <div className={`${width} ${height} bg-slate-200 dark:bg-slate-800 rounded animate-pulse ${className}`} />
    );
};

// Card skeleton for glass cards
export const SkeletonCard = ({ className = '' }) => {
    return (
        <div className={`glass-card rounded-2xl p-6 ${className}`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <Skeleton width="w-24" height="h-3" className="mb-2" />
                    <Skeleton width="w-16" height="h-2" />
                </div>
                <Skeleton width="w-10" height="h-10" className="rounded-xl" />
            </div>
            <Skeleton width="w-32" height="h-8" className="mb-2" />
            <Skeleton width="w-20" height="h-4" />
        </div>
    );
};

// Table row skeleton
export const SkeletonTableRow = () => {
    return (
        <tr className="border-b border-slate-200 dark:border-slate-800">
            <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                    <Skeleton width="w-10" height="h-10" className="rounded-lg" />
                    <div className="flex-1">
                        <Skeleton width="w-20" height="h-4" className="mb-2" />
                        <Skeleton width="w-32" height="h-3" />
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <Skeleton width="w-12" height="h-4" className="ml-auto" />
            </td>
            <td className="px-6 py-4">
                <Skeleton width="w-16" height="h-4" className="ml-auto" />
            </td>
            <td className="px-6 py-4">
                <Skeleton width="w-20" height="h-4" className="ml-auto" />
            </td>
            <td className="px-6 py-4">
                <Skeleton width="w-24" height="h-4" className="ml-auto" />
            </td>
            <td className="px-6 py-4">
                <Skeleton width="w-8" height="h-8" className="ml-auto rounded-lg" />
            </td>
        </tr>
    );
};

// Portfolio table skeleton
export const SkeletonPortfolioTable = ({ rows = 5 }) => {
    return (
        <div className="glass-panel rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                    <Skeleton width="w-24" height="h-5" className="mb-2" />
                    <Skeleton width="w-40" height="h-4" />
                </div>
                <Skeleton width="w-64" height="h-10" className="rounded-xl" />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                    <thead className="bg-slate-50 dark:bg-slate-900/50">
                        <tr>
                            <th className="px-6 py-4"><Skeleton width="w-16" height="h-3" /></th>
                            <th className="px-6 py-4"><Skeleton width="w-16" height="h-3" className="ml-auto" /></th>
                            <th className="px-6 py-4"><Skeleton width="w-16" height="h-3" className="ml-auto" /></th>
                            <th className="px-6 py-4"><Skeleton width="w-24" height="h-3" className="ml-auto" /></th>
                            <th className="px-6 py-4"><Skeleton width="w-16" height="h-3" className="ml-auto" /></th>
                            <th className="px-6 py-4"><Skeleton width="w-8" height="h-3" className="ml-auto" /></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {Array.from({ length: rows }).map((_, i) => (
                            <SkeletonTableRow key={i} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

// Transaction table skeleton
export const SkeletonTransactionTable = ({ rows = 5 }) => {
    return (
        <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            <th className="px-6 py-4"><Skeleton width="w-16" height="h-3" /></th>
                            <th className="px-6 py-4"><Skeleton width="w-24" height="h-3" /></th>
                            <th className="px-6 py-4"><Skeleton width="w-16" height="h-3" className="ml-auto" /></th>
                            <th className="px-6 py-4"><Skeleton width="w-16" height="h-3" className="ml-auto" /></th>
                            <th className="px-6 py-4"><Skeleton width="w-20" height="h-3" className="ml-auto" /></th>
                            <th className="px-6 py-4"><Skeleton width="w-24" height="h-3" /></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {Array.from({ length: rows }).map((_, i) => (
                            <tr key={i} className="border-b border-slate-200 dark:border-slate-800">
                                <td className="px-6 py-4">
                                    <Skeleton width="w-16" height="h-6" className="rounded-full" />
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <Skeleton width="w-12" height="h-4" className="mb-1" />
                                        <Skeleton width="w-24" height="h-3" />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Skeleton width="w-8" height="h-4" className="ml-auto" />
                                </td>
                                <td className="px-6 py-4">
                                    <Skeleton width="w-16" height="h-4" className="ml-auto" />
                                </td>
                                <td className="px-6 py-4">
                                    <Skeleton width="w-20" height="h-4" className="ml-auto" />
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <Skeleton width="w-20" height="h-4" className="mb-1" />
                                        <Skeleton width="w-16" height="h-3" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Watchlist card skeleton
export const SkeletonWatchlistCard = () => {
    return (
        <div className="glass-card rounded-2xl p-6">
            <div className="mb-4">
                <Skeleton width="w-16" height="h-6" className="mb-2" />
                <Skeleton width="w-32" height="h-3" />
            </div>
            <Skeleton width="w-20" height="h-3" className="mb-4" />
            <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                    <Skeleton width="w-24" height="h-8" />
                    <Skeleton width="w-16" height="h-5" />
                </div>
                <Skeleton width="w-20" height="h-6" className="rounded-full" />
            </div>
            <Skeleton width="w-full" height="h-10" className="mt-4 rounded-xl" />
        </div>
    );
};

// Summary card skeleton (for overview cards)
export const SkeletonSummaryCard = () => {
    return (
        <div className="glass-card rounded-2xl p-6">
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                    <Skeleton width="w-28" height="h-3" className="mb-2" />
                    <Skeleton width="w-20" height="h-2" />
                </div>
                <Skeleton width="w-10" height="h-10" className="rounded-xl" />
            </div>
            <Skeleton width="w-32" height="h-8" className="mb-2" />
            <Skeleton width="w-24" height="h-4" />
        </div>
    );
};

// Mini summary stat skeleton (for compact stats)
export const SkeletonMiniSummary = () => {
    return (
        <div className="glass-panel rounded-2xl p-4 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <Skeleton width="w-10" height="h-10" className="rounded-lg" />
                        <div className="flex-1">
                            <Skeleton width="w-16" height="h-3" className="mb-2" />
                            <Skeleton width="w-20" height="h-5" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Dashboard skeleton (full page)
export const SkeletonDashboard = () => {
    return (
        <div className="p-6 md:p-8 pt-10 md:pt-12">
            <div className="mb-6">
                <Skeleton width="w-48" height="h-9" className="mb-2" />
                <Skeleton width="w-64" height="h-5" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <SkeletonSummaryCard />
                <SkeletonSummaryCard />
                <SkeletonSummaryCard />
            </div>

            <Skeleton width="w-full" height="h-96" className="rounded-2xl" />
        </div>
    );
};

export default Skeleton;
