

## 1. Epics
- **Epic 1**: Live Market Data Integration  
- **Epic 2**: Notifications & Alerts System  
- **Epic 3**: Full Backend–Frontend Integration & Stability  
- **Epic 4**: Core Trading Experience & Portfolio  
- **Epic 5**: Security & User Management  

## 2. User Stories – Sprint 2 Scope

| Story ID | User Story | Acceptance Criteria (summary) | Priority | Dependencies | Status          |
|----------|------------|-------------------------------|----------|--------------|-----------------|
| US1      | As a trader, I want live stock prices instead of only historical data | Polygon.io real-time quotes + WebSocket + fallback | Must-have | API key ready | Done            |
| US2      | As a trader, I want in-app notifications for trade execution & account changes | Toast notifications + sound + notification bell | Must-have | Trade engine | Done            |
| US3      | Complete backend–frontend integration (auth, trades, portfolio) | Full end-to-end flow works | Must-have | Existing APIs | In Progress     |
| US4      | Clean up all console warnings, type, and UI warnings | Zero warnings in dev console | Should-have | — | Done            |
| US5      | As a trader, I want real-time portfolio with P&L | Live positions + unrealized/realized gains | Should-have | US1 + US3 | Done            |
| US6      | As a new user, I want secure signup/login + email verification | JWT + Resend email verification | Must-have | Backend | Done            |
| US7      | As a trader, I want candlestick chart on stock page | TradingView Lightweight Charts | Could-have | US1 | Done            |
| US8      | As a trader, I want to set custom price alerts (e.g. AAPL > $200) | Alert creation + trigger notification | Should-have | US1 + US2 | Not Started → Carryover |
| US9      | As a trader, I want fully mobile-responsive UI | Works perfectly on phones & tablets | Should-have | — | In Progress     |
| US10     | As a developer, I want basic activity logging | Log user login & trades | Could-have | — | Not Started     |

## 3. Carryover from Sprint 1
| Story ID | Reason It Carried Over                     | Priority |
|----------|---------------------------------------------|----------|
| US3      | Auth token refresh & protected routes not 100% stable | Must-have |

## 4. New Stories Added During Sprint 2 (will go to Sprint 3)
| New ID | User Story                                 | Priority   | Reason Added                     |
|--------|--------------------------------------------|------------|----------------------------------|
| US11   | As a trader, I want watchlists             | Must-have  | Most requested in user feedback  |
| US12   | As a trader, I want limit/stop orders      | Must-have  | Only market orders exist now     |
| US13   | As a trader, I want dark mode              | Should-have| Everyone keeps asking            |

## 5. Removed / Descoped
| Story ID | Story                        | Reason                              |
|----------|------------------------------|-------------------------------------|
| US14     | Crypto paper trading support  | Out of MVP scope – stocks only first |

## 6. Sprint 2 Summary (Current Status)
**Completed**: US1, US2, US4, US5, US6, US7  
**In Progress**: US3, US9  
**Not Started (will carry over)**: US8, US10  
**Velocity this sprint**: Very strong on data & UI, slower on final integration polish  
**Biggest win**: Live data + real-time portfolio feels amazing

## 7. Grooming Notes – Sprint 2
- Polygon.io is performing perfectly — keeping it  
- Notifications: in-app done, email/push postponed to Sprint 3  
- Mobile layout 90 % done — only modal & table overflow issues remain  
- Focus next days: finish US3 (integration) and US9 (mobile)

## 8. Change Log
| Date       | Change                                                                 |
|------------|------------------------------------------------------------------------|
| 2025-11-20 | Sprint 2 started                                                       |
| 2025-11-25 | US1, US5, US6, US7 marked Done                                         |
| 2025-11-27 | Updated real status — US8 & US10 will not finish → carry to Sprint 3   |
| 2025-11-27 | Added US11–US13 discovered during demo & user testing                   |
