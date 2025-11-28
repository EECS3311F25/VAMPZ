# Sprint 1 Planning Meeting (sprint1.md)

## Sprint Goal
The goal of Sprint 3 is to complete all remaining end-to-end functionality of the StockSprout platform by integrating live market data, finalizing the trading workflow, and ensuring the application is stable, responsive, and ready for final demonstration.
This includes connecting the frontend to all backend endpoints, enabling real-time price updates, implementing trade notifications, polishing the UI, and delivering a fully functional portfolio system showing real-time performance.

---

## System Architecture
---

## User Stories for Sprint 3
The following user stories have been identified for Sprint 3:

| Story ID | User Story | Acceptance Criteria | Priority (MoSCoW) | Dependencies |
|----------|------------|----------------------|-------------------|--------------|
| US1 | As a trader, I want live stock prices instead of only historical data, so my paper trades reflect current market conditions | • Real-time quotes via API (Polygon/Alpha Vantage/etc.)<br>• Graceful fallback to cached/historical data<br>• Rate limiting handled | Must-have | API key, historical data already working |
| US2 | As a trader, I want notifications for executed trades, price alerts (high/low), and account changes, so I don’t have to watch the screen constantly | • In-app + optional email/push notifications<br>• User can enable/disable types<br>• Works with simulated trades | Must-have | Trade execution engine | 
| US3 | As a developer / trader, I want complete backend–frontend integration, so the whole platform works end-to-end | • All API endpoints connected<br>• Auth flow working across layers<br>• Trade submission → execution → portfolio update visible | Must-have | Existing partial backend & frontend | 
| US4 | As a developer, I want all minor caution/warning errors cleaned up, so the app feels stable and professional | • Remove console warnings<br>• Fix validation bugs<br>• Clean UI glitches | Should-have | Code audit completed | 
| US5 | As a trader, I want to see my portfolio with real-time P&L and trade history | • Current positions list<br>• Unrealized & realized profit/loss<br>• Export to CSV | Should-have | US1 (live data) + US3 (integration) | 

---
## Team Capacity
The team has a total of *5 members* with the following available capacity for the sprint:

| Team Member        | Capacity (Hours) | Availability (%) |
|--------------------|------------------|------------------|
| *Aniket Saini*  | 10 hours         | 100%             |
| *Manas Agarwal* | 10 hours         | 100%             |
| *Prit Tandel*  | 10hours         | 100%             |
| *Vansh Madan*| 10 hours         | 100%             |
| *Zyan Mulla*     | 10 hours         | 100%             |

*Total Team Capacity*: 50 hours

---
## Participants
- *[Aniket Saini]* – Student No. 220751657
- *[Manas Agarwal]* – Student No. 220559225
- *[Prit Tandel]* – Student No. 220159984
- *[Vansh Madan]* – Student No. 220150413
- *[Zyan Mulla]* – Student No. 220221289
---
## Sprint Review Criteria
A user story is considered Done when all criteria below are met:
### 1. Real-Time Market Data Integration
Live stock prices load consistently across the dashboard, trading page, and portfolio.
Rate limits and slow-update APIs are handled gracefully with fallback data.
No crashes or broken UI elements when fetching data.

### 2. Complete Backend–Frontend Integration
All API endpoints (auth, portfolio, trades, quotes) are connected to frontend components.
Making a trade updates the backend and instantly reflects in the UI.
The entire sign-up → login → trade → portfolio flow works as a unified system.

### 3. Notification System
Users receive in-app notifications for:
Trade execution
Price alerts (high/low thresholds)
Portfolio value changes
Notification settings can be toggled on/off.

### 4. UI/UX Polish & Error Cleanup
All console warnings removed.
Mobile and desktop layouts validated.
Minor UI issues cleaned (spacing, overflow, alignment).
Input validation and error messages work consistently.
