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

