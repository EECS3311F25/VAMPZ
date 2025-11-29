
## 1. Epics
- **Epic 1**: Live Market Data Integration  
- **Epic 3**: Full Backend–Frontend Integration & Stability  
- **Epic 4**: Core Trading Experience & Portfolio  
- **Epic 5**: Security & User Management  

## 2. User Stories

| Story ID | User Story | Acceptance Criteria | Priority (MoSCoW) | Dependencies | Status |
|----------|------------|----------------------|-------------------|--------------|--------|
| US1 | As a trader, I want live stock prices instead of only historical data, so my paper trades reflect current market conditions | • Real-time quotes via API (Polygon/Alpha Vantage/etc.)<br>• Graceful fallback to cached/historical data<br>• Rate limiting handled | Must-have | API key, historical data already working | Not Started |
| US2 | As a trader, I want notifications for executed trades, price alerts (high/low), and account changes, so I don’t have to watch the screen constantly | • In-app + optional email/push notifications<br>• User can enable/disable types<br>• Works with simulated trades | Must-have | Trade execution engine | Not Started |
| US3 | As a developer / trader, I want complete backend–frontend integration, so the whole platform works end-to-end | • All API endpoints connected<br>• Auth flow working across layers<br>• Trade submission → execution → portfolio update visible | Must-have | Existing partial backend & frontend | In Progress |
| US4 | As a developer, I want all minor caution/warning errors cleaned up, so the app feels stable and professional | • Remove console warnings<br>• Fix validation bugs<br>• Clean UI glitches | Should-have | Code audit completed | Not Started |
| US5 | As a trader, I want to see my portfolio with real-time P&L and trade history | • Current positions list<br>• Unrealized & realized profit/loss<br>• Export to CSV | Should-have | US1 (live data) + US3 (integration) | Not Started |
| US6 | As a new user, I want secure signup/login with email verification | • JWT or session auth<br>• Password reset flow | Must-have | Backend ready | Not Started |
| US7 | As a trader, I want basic charting and technical indicators | • Candlestick chart + volume<br>• SMA, EMA, RSI toggle | Could-have | US1 (live data) | Not Started |
| US8 | As a trader, I want custom price alerts (e.g., “notify me when AAPL > $200”) | • Create/delete alerts<br>• Tied to notification system | Should-have | US1 + US2 | Not Started |

## 3. Carryover from Sprint 2
| Story ID | Reason Incomplete | Updated Priority | Notes |
|----------|-------------------|------------------|-------|
| US3 | Authentication and some API routes not fully connected | Must-have | Major focus this sprint |

## 4. New Stories Added This Sprint
| Story ID | New Story | Priority | Notes |
|----------|-----------|----------|-------|
| US9 | As an admin, I want basic user activity logging | Could-have | Helps debugging and future analytics |
| US10 | As a trader, I want the UI to be mobile-responsive | Should-have | Many users trade on phone |

## 5. Removed / Descoped
| Story ID | Story | Reason |
|----------|-------|--------|
| US11 | Support crypto paper trading | Out of scope for MVP – stocks only for now |

## 6. Backlog Summary
**Active stories**: 10  
**Must-have this sprint**: US1, US2, US3, US6  
**Target completion**: All Must-haves + at least 2 Should-haves  
**Definition of Done**: Code reviewed + passes automated tests + deployed to staging + demoable

