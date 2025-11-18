# [11-05-2025] - Sprint 2 Standup 1

## 1. What did you work on since last Standup?
I started building the core components for the stock details page. I implemented the PriceDisplay.jsx component to show the stock’s current price, daily change, and percentage change. I also created the TimeframeSelector.jsx with the 1D, 1W, 1M, 3M, and 1Y buttons.

## 2. What do you commit to next?
Next, I’ll begin working on the chart section by setting up StockChart.jsx with dummy data using react-chart or a placeholder, and I’ll connect it to the selected timeframe state.

## 3. When do you think you will be done?
I expect to finish the initial chart with mock data by 11-10-2025

## 4. Do you have any blockers?
No major blockers


# [11-10-2025] - Sprint 2 Standup 2

## 1. What did you work on since last Standup?
I implemented the StockChart.jsx using mock data and connected it to the TimeframeSelector, so the chart updates when a new timeframe is chosen. I also ensured all components accept the correct props such as symbol, price, selectedTimeframe, and onChangeTimeframe.

## 2. What do you commit to next?
Next, I will focus on structuring the overall layout, including the StockPageHeader.jsx and StockInfoHeader.jsx for the top-level presentation of ticker info and key stats.

## 3. When do you think you will be done?
I plan to complete the header and info layout by 11-15-2025.

## 4. Do you have any blockers?
No major blockers 


# [11-15-2025] - Sprint 2 Standup 3

## 1. What did you work on since last Standup?
I completed the entire page structure, including StockPageHeader.jsx, StockInfoHeader.jsx, and StockSubNavigation.jsx with tabs for Overview, Chart, Stats, and Trade. I also added responsive styling for both desktop and mobile views. Finally, I wired the page together using mock stock data (symbol, name, price, change).

## 2. What do you commit to next?
I’ll finalize the mock data pipeline, test the responsiveness across devices, and prepare the page for integration with real backend data in Sprint 2.

## 3. When do you think you will be done?
I expect to complete the final adjustments by end of day, 11-17-2025.

## 4. Do you have any blockers?
No major blockers
