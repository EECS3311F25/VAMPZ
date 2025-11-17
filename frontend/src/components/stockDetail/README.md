# Stock Detail Page Components

This directory contains 8 modular components that make up the Stock Detail Page, following best software engineering practices.

## Component Structure

### 1. **StockPageHeader.jsx**
- **Purpose**: Top navigation bar with search and authentication
- **Props**: 
  - `onSearch` (optional): Callback function for search queries
- **Features**:
  - Hamburger menu button
  - App logo/branding
  - Stock search bar with results dropdown
  - Sign Up / Sign In buttons

### 2. **StockInfoHeader.jsx**
- **Purpose**: Displays stock information header
- **Props**:
  - `stockSymbol` (string): Stock ticker symbol
  - `stockName` (string): Full stock name
  - `marketStatus` (string, optional): Market status text
- **Features**:
  - Breadcrumb navigation
  - Stock name and symbol display
  - Market status indicator

### 3. **PriceDisplay.jsx**
- **Purpose**: Large price display with change indicators
- **Props**:
  - `currentPrice` (number): Current stock price
  - `change` (number): Price change amount
  - `changePercent` (string): Percentage change
- **Features**:
  - Large price display (green/red based on direction)
  - Trend indicators (up/down arrows)
  - Formatted change display

### 4. **TimeframeSelector.jsx**
- **Purpose**: Time period selection tabs for chart
- **Props**:
  - `activeTimeframe` (string): Currently selected timeframe
  - `onTimeframeChange` (function): Callback when timeframe changes
  - `timeframes` (array, optional): Array of timeframe options
- **Features**:
  - Interactive tab selection
  - Active state highlighting
  - Hover effects

### 5. **StockChart.jsx**
- **Purpose**: Chart container for price visualization
- **Props**:
  - `activeTimeframe` (string): Current timeframe selection
  - `chartData` (object, optional): Chart data for rendering
- **Features**:
  - Placeholder for chart integration
  - Responsive container
  - Ready for chart library integration (Chart.js, Recharts, etc.)

### 6. **StockStatistics.jsx**
- **Purpose**: Key stock statistics grid
- **Props**:
  - `stats` (object, optional): Statistics object with keys:
    - `open`, `prevClose`, `volume`, `week52Range`, `todayRange`, `marketCap`, `avgVol`
- **Features**:
  - Grid layout for statistics
  - Default values if props not provided
  - Clean, readable format

### 7. **StockSubNavigation.jsx**
- **Purpose**: Secondary navigation tabs (News, Reports, etc.)
- **Props**:
  - `activeSubNav` (string): Currently active sub-navigation item
  - `onSubNavChange` (function): Callback when sub-nav changes
  - `subNavItems` (array, optional): Array of navigation items
- **Features**:
  - Tab-based navigation
  - Active state indication
  - Flexible item configuration

### 8. **TradingSidebar.jsx**
- **Purpose**: Complete trading interface sidebar
- **Props**:
  - `stockSymbol` (string): Current stock symbol
  - `currentPrice` (number): Current stock price
  - `accountData` (object, optional): Account information
  - `positions` (array, optional): User's stock positions
  - `openOrders` (array, optional): Pending orders
  - `transactions` (array, optional): Transaction history
  - `onPlaceOrder` (function, optional): Callback for order placement
- **Features**:
  - Account wallet display
  - Buy/Sell order form
  - Open orders management
  - Position tracking
  - Transaction history
  - Paper trading mode indicator

## Usage Example

```jsx
import StockDetailPage from './pages/StockDetailPage';

function App() {
  return <StockDetailPage />;
}
```

## Benefits of This Structure

1. **Modularity**: Each component has a single, clear responsibility
2. **Reusability**: Components can be used independently or in other contexts
3. **Maintainability**: Easy to locate and modify specific features
4. **Testability**: Each component can be tested in isolation
5. **Scalability**: Easy to add new features or modify existing ones
6. **Props-based**: Components accept props for flexibility and customization

## File Organization

```
frontend/src/
├── components/
│   └── stockDetail/
│       ├── StockPageHeader.jsx
│       ├── StockInfoHeader.jsx
│       ├── PriceDisplay.jsx
│       ├── TimeframeSelector.jsx
│       ├── StockChart.jsx
│       ├── StockStatistics.jsx
│       ├── StockSubNavigation.jsx
│       ├── TradingSidebar.jsx
│       └── README.md
└── pages/
    └── StockDetailPage.jsx (main page that uses all components)
```

## Next Steps for Development

1. **Chart Integration**: Replace placeholder in `StockChart.jsx` with actual chart library
2. **API Integration**: Connect components to backend APIs for real data
3. **State Management**: Consider adding Context API or Redux for shared state
4. **Error Handling**: Add error boundaries and loading states
5. **Testing**: Write unit tests for each component
6. **Styling**: Consider extracting styles to CSS modules or styled-components

