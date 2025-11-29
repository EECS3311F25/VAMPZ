# Sprint 2 Retrospective (SR2.md)

## Participants  
-   Aniket Saini – Student No. 220751657
-   Manas Agarwal – Student No. 220559225
-  Prit Tandel – Student No. 220159984
-  Vansh Madan – Student No. 220150413
-  Zyan Mulla – Student No. 220221289

## What went well / Completed Work  
- Completed full UML class diagram covering core entities (User, Portfolio, Holding, Transaction), with relationships and methods defined.  
- Implemented backend models and core transaction/portfolio logic (buy/sell, holdings update, portfolio totals, transaction history).  
- Designed controller–service–model architecture for market data retrieval.  
- Connected a working market-data API to backend controllers and verified live price retrieval.  
- Built core frontend for stock-details page: price display, timeframe selector, dynamic mock charts, fully functioning page layout (headers, navigation, responsive design).  
- Refactored dashboard into modular, reusable components; removed unnecessary UI complexity for clarity and maintainability.  
- Integrated backend portfolio data with frontend dashboard: users can see holdings, balances, performance metrics, and portfolio values dynamically.  
- Implemented buy/sell functionality on frontend communicating correctly with backend endpoints.  
- Completed full dashboard UI: header, metric cards (balance, buying power, returns), performance charts area placeholder, popular stocks grid, and responsive styling.  

## What could be improved / What did not go well / Unfinished Tasks  
- Live market data API refresh rate is too slow for real-time trading simulation; this limits realistic “day-trading” behavior.  
- Data-handling strategy (especially trade & transaction storage) needs standardization — frontend and backend must agree on a unified format before scaling.  
- Charts and portfolio performance views still depend on mock data / placeholders; real data binding from backend is pending.  
- Some features (e.g. real-time updates after trade, historical data charts, full data integration) remain incomplete and were deferred to Sprint 3.  

## Action Items & New User Stories (for Sprint 3)  

### User Story: Real-Time Portfolio Updates  
**As a user**, I want my portfolio values and holdings to update immediately after each trade  
**So that** I always see accurate, up-to-date balances and holdings.  
**Acceptance Criteria:**  
- Frontend reacts instantly to buy/sell — holdings, balance, performance metrics recalc and display without manual refresh.  

### User Story: Enhanced Market Data Performance / Caching or Mock Updates  
**As a user**, I want timely and realistic price updates for stocks  
**So that** simulated trading feels more like real trading (even if it’s delayed).  
**Acceptance Criteria:**  
- Implement caching or faster update cycles / mock data fallback.  
- Replace slow API polling or supplement it so UI remains responsive.  

### User Story: Backend-Driven Stock Detail & Portfolio Charts  
**As a user**, I want stock detail and portfolio charts to reflect real historical & live data from backend  
**So that** I can use charts to analyze performance realistically.  
**Acceptance Criteria:**  
- Backend endpoints supply historical and current data for stocks / portfolio.  
- Charts update correctly based on timeframe selections (1D, 1W, 1M, 3M, 1Y, etc.).  
- UI components correctly parse and display data (price, change, volume, gain/loss, etc.).  

## Practices to Continue  
- Maintain modular frontend and backend structure.  
- Keep consistent design / styling across UI components (clean layouts, responsive design, reuse components).  
- Frequent commits and merges to avoid big merge conflicts.  
- Continued good communication (standups, GitHub, docs) and clear task division between frontend and backend work.  
- Perform tests (unit / integration) before merging critical features.  

## New Practices to Start  
- Integrate backend and frontend more frequently (shorter feedback loop) — e.g. data-flow checkpoints within sprint.  
- Add caching or fallback strategies early when integrating external APIs.  
- Centralize data models for transactions/trades to avoid diverging mock data schemas.  
- Add better error handling and loading states in UI to handle slow API or data fetch issues.  
- Begin writing integration tests for critical flows (trading, portfolio update, data fetching).  

## Practices to Stop  
- Avoid relying solely on slow external APIs for real-time features without fallback/mock options.  
- Don't delay architectural/data-model decisions until late in the sprint (before UI integration).  
- Avoid working on features in isolation for too long — merge more frequently.  
- Avoid distributing mock data across many places — centralize and standardize.  

## Best & Worst Experiences  
**Best Experience:**  
The project matured significantly: backend and frontend parts now integrate, and the dashboard + stock pages feel like a cohesive trading app. Seeing portfolio logic, UI, and trading flow come together was highly motivating.  

**Worst Experience:**  
External API limitations (slow refresh rate) slowed down the simulation realism and forced postponing features like real-time updates and accurate charts. This impacted our ability to demo “realistic” trading behavior this sprint.  

## Summary  
Sprint 2 established the core architecture and plumbing: backend transaction and portfolio handling, market data integration (basic), modular frontend, and a fully functional dashboard + stock detail UI framework.  

Moving into Sprint 3, focus will shift from structure & mock-ups to real data — binding backend data to UI, improving data flow performance, implementing real-time updates, and polishing trading experience.  

