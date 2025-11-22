export const Logo = ({ className = "", iconSize = 40, textSize = "text-2xl" }) => {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <img
                src="/images/logo-new.png"
                alt="StockSprout"
                className="rounded-xl shrink-0 object-contain"
                style={{ width: iconSize, height: iconSize }}
            />
            <span className={`${textSize} font-bold text-slate-900 dark:text-white tracking-tight`}>
                Stock<span className="text-teal-500">Sprout</span>
            </span>
        </div>
    );
};
