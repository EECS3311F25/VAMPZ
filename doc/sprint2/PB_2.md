## 1. Epics
- **Epic 1**: Live Market Data Integration  
- **Epic 2**: Notifications & Alerts System  
- **Epic 3**: Full Backend–Frontend Integration & Stability  
- **Epic 4**: Core Trading Experience & Portfolio  
- **Epic 5**: Security & User Management  
- **Epic 6**: Frontend UI — Portfolio, Watchlist, Dashboard, Buy/Sell, Charts  
- **Epic 7**: Backend API for Trading/Portfolio/Watchlist/Market Data

---

## 2. User Stories

| Story ID | User Story | Acceptance Criteria | Priority (MoSCoW) | Dependencies | Status |
|----------|------------|----------------------|-------------------|--------------|--------|
| US1 | As a trader, I want live stock prices instead of only historical data, so my paper trades reflect current market conditions | • Real-time quotes via API<br>• Fallback to cached/historical<br>• Rate limiting handled | Must-have | API key, historical data | Not Started |
| US2 | As a trader, I want notifications for executed trades, price alerts, and account changes | • In-app + email/push<br>• Must run asynchronously | Must-have | Trade execution engine | Not Started |
| US3 | As a dev/trader, I want complete backend–frontend integration | • End-to-end flow works<br>• Auth protected API<br>• Trade → portfolio visible | Must-have | Backend + Frontend base | In Progress |
| US4 | As a developer, I want warning/error cleanup | • No console warnings<br>• UI visual polish | Should-have | Code audit | Not Started |
| US5 | As a trader, I want real-time P&L + trade history | • Positions view<br>• Unrealized vs Realized P&L<br>• CSV export | Should-have | US1 + US3 | Not Started |
| US6 | As a new user, I want secure signup/login | • JWT/Auth flow<br>• Email verification | Must-have | Backend auth system | Not Started |
| US7 | As a trader, I want charts + indicators | • Candles + Volume<br>• SMA / EMA / RSI | Could-have | US1 | Not Started |
| US8 | As a trader, I want custom price alerts | • Create/delete alerts<br>• Linked to notifications | Should-have | US1 + US2 | Not Started |
| US9 | As an admin, I want user activity logs | • DB stored logs<br>• Viewable later | Could-have | None | Not Started |
| US10 | As a trader, I want mobile responsiveness | • Works on phone/tablet | Should-have | UI framework | Not Started |

### Newly Added Based on Request (Frontend + Backend Architecture)

| Story ID | New Story | Acceptance Criteria | Priority | Status |
|----------|-----------|--------------------|----------|--------|
| US12 | Implement Dashboard Page | • Market summary, top movers, user balance & P&L preview | Must-have | Not Started |
| US13 | Implement Portfolio Page | • Holdings table <br>• Real-time P&L <br>• Graph of account value over time | Must-have | Not Started |
| US14 | Implement Watchlist Page | • Add/delete tickers <br>• Live price refresh <br>• Mini-chart preview | Must-have | Not Started |
| US15 | Implement Transactions Page | • Past trades table <br>• Pagination <br>• Export CSV | Should-have | Not Started |
| US16 | Buy/Sell UI & Execution Flow | • Market order simulation<br>• Preview before confirm<br>• Balance validation | Must-have | Not Started |
| US17 | Backend APIs for Portfolio/Watchlist/Orders | • CRUD endpoints<br>• DB schema migrations<br>• Auth protected | Must-have | Not Started |
| US18 | Charting Service Integration | • Candlestick <br>• Indicators toggles <br>• Live feed | Could-have | Not Started |
| US19 | Frontend ↔ Backend Integration for All Pages | • All UI hooked to API<br>• Error handling/toasts <br>• Loading states | Must-have | Pending US12–US18 |

---

## 3. Carryover from Sprint 1

| Story ID | Reason Incomplete | Updated Priority | Notes |
|----------|-------------------|------------------|-------|
| US3 | Full integration not finished | Must-have | Primary objective this sprint |

---

## 4. New Stories This Sprint

| Story ID | New Story | Priority | Notes |
|----------|-----------|----------|-------|
| US12–US19 | UI Pages + Backend APIs + Integration | High | Foundation for MVP |

---

## 5. Implementation Breakdown

### 🔷 Frontend (React)

| Component | Features | Tech/Packages |
|----------|----------|---------------|
| `DashboardPage.jsx` | Live market table, top gainers/losers, user P&L, news section | WebSockets for price feed |
| `PortfolioPage.jsx` | Holdings, avg price, market value, P&L %, line chart of equity | recharts/d3, react-table |
| `WatchlistPage.jsx` | Add/remove ticker, mini chart, alerts | Local storage + DB sync |
| `TransactionsPage.jsx` | Trade ledger, filter & search, CSV export | react-data-grid + file-saver |
| `TradeModal.jsx` | Buy/Sell UI, market order input, preview mode | Form validation, API POST |
| `ChartComponent.jsx` | Candlestick, SMA/EMA/RSI toggle | TradingView API OR recharts |

Global UI:
- **Redux / Zustand** for state
- Authentication wrapper using **JWT**
- Toast notifications for success/errors

---

### 🔷 Backend (Java + Spring Boot + PostgreSQL)

| Service | Endpoints | Tables |
|--------|-----------|--------|
| **Auth Service** | `/auth/signup`, `/auth/login`, `/auth/verify` | Users |
| **Portfolio Service** | `/portfolio`, `/portfolio/performance` | Holdings, Positions, Ledger |
| **Orders Service** | `/order/buy`, `/order/sell`, `/order/history` | Orders, Trades, Balance |
| **Watchlist Service** | `/watchlist`, `/watchlist/add`, `/watchlist/delete` | Watchlist |
| **Market Data Service** | `/market/quotes`, `/market/chart` | (Cached) Live Data Cache |
| **Notification Service** | `/alerts`, `/alerts/trigger`, `/alerts/history` | Alerts, Notifications |

System Flow:
1. User places order → OrderService → Balance Validation
2. Trade executed → Stored in Orders + Positions
3. Portfolio recalculated → Returned to React
4. Notifications triggered if alert conditions match

---

### 🔷 Integration Tasks

| Task | Details |
|------|---------|
| Connect react pages → Spring Boot API | Axios/Fetch layer + protected routes |
| Websocket feed for live pricing | Subscribe & update dashboard + watchlist live |
| Portfolio reconciliation endpoint | Trigger on every buy/sell order |
| Unified Error Handling | Toast UI + retry logic for API failures |

---

## 6. Backlog Summary

**Active Stories:** 19  
**Must-Have SPRINT GOALS:**  
✔ US1, US2, US3, US6  
➕ + New frontend/ backend work: US12, US13, US14, US16, US17, US19  

**Sprint Target:**  
Must-haves + 2 Should-haves (US5, US10, US15)

**Definition of Done:**  
Code reviewed ✓ tested ✓ deployed to staging ✓ UI integrated ✓ demo-ready ✓
