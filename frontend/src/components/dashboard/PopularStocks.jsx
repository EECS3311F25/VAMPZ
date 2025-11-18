import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

function PopularStocks() {
  const stocks = [
    { ticker: 'AAPL', company: 'Apple Inc.', price: 178.45, change: 2.34, changePercent: 1.31, isPositive: true },
    { ticker: 'GOOGL', company: 'Alphabet Inc.', price: 141.80, change: -0.87, changePercent: -0.61, isPositive: false },
    { ticker: 'MSFT', company: 'Microsoft Corp.', price: 378.91, change: 1.56, changePercent: 0.41, isPositive: true },
    { ticker: 'AMZN', company: 'Amazon.com Inc.', price: 146.32, change: 3.21, changePercent: 2.19, isPositive: true },
    { ticker: 'TSLA', company: 'Tesla Inc.', price: 242.84, change: -2.15, changePercent: -0.89, isPositive: false },
    { ticker: 'META', company: 'Meta Platforms', price: 334.57, change: 1.89, changePercent: 0.56, isPositive: true },
    { ticker: 'NVDA', company: 'NVIDIA Corp.', price: 495.22, change: 4.67, changePercent: 0.94, isPositive: true },
    { ticker: 'NFLX', company: 'Netflix Inc.', price: 445.73, change: 0.52, changePercent: 0.12, isPositive: true },
  ]

  return (
    <div className="popular-stocks">
      <h3 className="stocks-title">Popular Stocks</h3>
      <div className="stocks-grid">
        {stocks.map((stock) => (
          <div key={stock.ticker} className="stock-card">
            <div className="stock-header">
              <div>
                <h4 className="stock-ticker">{stock.ticker}</h4>
                <p className="stock-company">{stock.company}</p>
              </div>
              {stock.isPositive ? (
                <ArrowUpRight className="stock-trend-icon positive" />
              ) : (
                <ArrowDownRight className="stock-trend-icon negative" />
              )}
            </div>
            <p className="stock-price">${stock.price.toFixed(2)}</p>
            <p className={`stock-change ${stock.isPositive ? 'positive' : 'negative'}`}>
              {stock.isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
            </p>
          </div>
        ))}
      </div>
      <div className="view-all-wrapper">
        <button className="view-all-button">View All Stocks</button>
      </div>
    </div>
  )
}

export default PopularStocks

