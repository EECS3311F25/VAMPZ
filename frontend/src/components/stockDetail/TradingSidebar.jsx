import { useState } from 'react'
import { Wallet, History, FileText, DollarSign, X } from 'lucide-react'

export default function TradingSidebar({ 
  stockSymbol, 
  currentPrice,
  accountData,
  positions = [],
  openOrders = [],
  transactions = [],
  onPlaceOrder
}) {
  const [tradingMode, setTradingMode] = useState('buy')
  const [orderQuantity, setOrderQuantity] = useState('')
  const [orderPrice, setOrderPrice] = useState('')
  const [orderType, setOrderType] = useState('limit')

  const defaultAccountData = {
    availableBalance: 10000.00,
    portfolioValue: 12450.00,
    totalGain: 2450.00,
    totalGainPercent: 24.5
  }

  const displayAccountData = accountData || defaultAccountData

  const handlePlaceOrder = () => {
    if (!orderQuantity || !orderPrice) {
      alert('Please fill in all required fields')
      return
    }
    
    const order = {
      mode: tradingMode,
      symbol: stockSymbol,
      quantity: orderQuantity,
      price: orderPrice,
      orderType: orderType
    }

    if (onPlaceOrder) {
      onPlaceOrder(order)
    } else {
      alert(`${tradingMode === 'buy' ? 'Buy' : 'Sell'} order placed: ${orderQuantity} shares at $${orderPrice}`)
    }

    // Reset form
    setOrderQuantity('')
    setOrderPrice('')
  }

  return (
    <div style={{
      width: '380px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      {/* Account Wallet */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        border: '1px solid #e3e6e0'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px'
        }}>
          <Wallet size={20} color="#081f3b" />
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#081f3b',
            margin: 0
          }}>
            Account Wallet
          </h3>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '12px', color: '#393f4a', marginBottom: '4px' }}>Available Balance</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#081f3b' }}>
            ${displayAccountData.availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '12px', color: '#393f4a', marginBottom: '4px' }}>Portfolio Value</div>
          <div style={{ fontSize: '18px', fontWeight: '600', color: '#081f3b' }}>
            ${displayAccountData.portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#393f4a', marginBottom: '4px' }}>Total Gain/Loss</div>
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: displayAccountData.totalGain >= 0 ? '#059669' : '#dc2626'
          }}>
            {displayAccountData.totalGain >= 0 ? '+' : ''}${displayAccountData.totalGain.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({displayAccountData.totalGainPercent >= 0 ? '+' : ''}{displayAccountData.totalGainPercent}%)
          </div>
        </div>
        <div style={{
          marginTop: '12px',
          padding: '8px',
          backgroundColor: '#F7F9FC',
          borderRadius: '6px',
          fontSize: '12px',
          color: '#393f4a',
          textAlign: 'center'
        }}>
          📝 Paper Trading Mode
        </div>
      </div>

      {/* Buy/Sell Order Form */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        border: '1px solid #e3e6e0'
      }}>
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '20px'
        }}>
          <button
            onClick={() => setTradingMode('buy')}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: tradingMode === 'buy' ? '#059669' : '#F7F9FC',
              color: tradingMode === 'buy' ? 'white' : '#393f4a',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
          >
            Buy
          </button>
          <button
            onClick={() => setTradingMode('sell')}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: tradingMode === 'sell' ? '#dc2626' : '#F7F9FC',
              color: tradingMode === 'sell' ? 'white' : '#393f4a',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
          >
            Sell
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              color: '#393f4a',
              marginBottom: '8px',
              fontWeight: '500'
            }}>
              Quantity
            </label>
            <input
              type="number"
              value={orderQuantity}
              onChange={(e) => setOrderQuantity(e.target.value)}
              placeholder="0"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e3e6e0',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              color: '#393f4a',
              marginBottom: '8px',
              fontWeight: '500'
            }}>
              Price
            </label>
            <input
              type="number"
              value={orderPrice}
              onChange={(e) => setOrderPrice(e.target.value)}
              placeholder={currentPrice ? currentPrice.toFixed(2) : '0.00'}
              step="0.01"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e3e6e0',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              color: '#393f4a',
              marginBottom: '8px',
              fontWeight: '500'
            }}>
              Order Type
            </label>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e3e6e0',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="market">Market</option>
              <option value="limit">Limit</option>
              <option value="stop">Stop</option>
              <option value="stopLimit">Stop Limit</option>
            </select>
          </div>
          <button
            onClick={handlePlaceOrder}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: tradingMode === 'buy' ? '#059669' : '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'background-color 0.2s',
              marginTop: '8px'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            {tradingMode === 'buy' ? 'Buy' : 'Sell'} {stockSymbol}
          </button>
        </div>
      </div>

      {/* Open Orders */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        border: '1px solid #e3e6e0'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px'
        }}>
          <FileText size={20} color="#081f3b" />
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#081f3b',
            margin: 0
          }}>
            Open Orders
          </h3>
        </div>
        {openOrders.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {openOrders.map((order) => (
              <div
                key={order.id}
                style={{
                  padding: '12px',
                  backgroundColor: '#F7F9FC',
                  borderRadius: '6px',
                  borderLeft: `3px solid ${order.type === 'Buy' ? '#059669' : '#dc2626'}`
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '4px'
                }}>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: order.type === 'Buy' ? '#059669' : '#dc2626'
                  }}>
                    {order.type} {order.symbol}
                  </span>
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <X size={16} color="#dc2626" />
                  </button>
                </div>
                <div style={{ fontSize: '12px', color: '#393f4a' }}>
                  {order.quantity} @ ${order.price} ({order.orderType})
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: '14px', color: '#393f4a', textAlign: 'center', padding: '20px' }}>
            No open orders
          </div>
        )}
      </div>

      {/* Position Details */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        border: '1px solid #e3e6e0'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px'
        }}>
          <DollarSign size={20} color="#081f3b" />
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#081f3b',
            margin: 0
          }}>
            Positions
          </h3>
        </div>
        {positions.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {positions.map((position, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px',
                  backgroundColor: '#F7F9FC',
                  borderRadius: '6px'
                }}
              >
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#081f3b',
                  marginBottom: '4px'
                }}>
                  {position.symbol}
                </div>
                <div style={{ fontSize: '12px', color: '#393f4a', marginBottom: '4px' }}>
                  {position.quantity} shares @ ${position.avgPrice.toFixed(2)}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: position.pnl >= 0 ? '#059669' : '#dc2626',
                  fontWeight: '600'
                }}>
                  P/L: {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: '14px', color: '#393f4a', textAlign: 'center', padding: '20px' }}>
            No positions
          </div>
        )}
      </div>

      {/* Transaction History */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        border: '1px solid #e3e6e0'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px'
        }}>
          <History size={20} color="#081f3b" />
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#081f3b',
            margin: 0
          }}>
            Transaction History
          </h3>
        </div>
        {transactions.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                style={{
                  padding: '12px',
                  backgroundColor: '#F7F9FC',
                  borderRadius: '6px',
                  borderLeft: `3px solid ${transaction.type === 'Buy' ? '#059669' : '#dc2626'}`
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '4px'
                }}>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: transaction.type === 'Buy' ? '#059669' : '#dc2626'
                  }}>
                    {transaction.type} {transaction.symbol}
                  </span>
                  <span style={{ fontSize: '12px', color: '#393f4a' }}>{transaction.date}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#393f4a' }}>
                  {transaction.quantity} @ ${transaction.price}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: '14px', color: '#393f4a', textAlign: 'center', padding: '20px' }}>
            No transactions
          </div>
        )}
      </div>
    </div>
  )
}

