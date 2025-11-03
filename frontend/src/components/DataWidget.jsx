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
      className="data-widget"
    >
      <div className="widget-header">
        <div>
          <h3 className="widget-title">{title}</h3>
          <p className="widget-symbol">{symbol}</p>
        </div>
      </div>
      
      <div>
        <p className="widget-price">{price}</p>
        <div className={`widget-change ${positive ? 'widget-change-positive' : 'widget-change-negative'}`}>
          {positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span>{change} {changePercent}</span>
        </div>
      </div>
      
      {details && (
        <>
          <div className="widget-details">
            {details.map((detail, idx) => (
              <div key={idx} className="widget-detail-item">
                <span>{detail.label}</span>
                <span className="widget-detail-value">{detail.value}</span>
              </div>
            ))}
          </div>
          <div className="widget-chart">
            <div className="chart-bars">
              {['Fri 18', 'Mon 21', 'Tue 22'].map((day, idx) => (
                <div key={day} className="chart-bar-container">
                  <div className="chart-bar-label">{day}</div>
                  <div 
                    className="chart-bar"
                    style={{ height: `${65 + idx * 15}%` }}
                  />
                </div>
              ))}
            </div>
            {details && details.length > 0 && (
              <div className="chart-indicator">
                <div className="chart-dot"></div>
                <span className="chart-indicator-text">Current</span>
              </div>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}
