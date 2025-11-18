# StockSprout Backend - System Design
System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER (Frontend)                     │
│                         React + Vite (Port 5173)                    │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │ HTTP/REST API
                                   │ (with CORS)
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    API GATEWAY / SPRING BOOT                        │
│                         Port 8080                                   │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │              Security Filter Chain                            │  │
│  │  - CORS Configuration                                         │  │
│  │  - Session Management                                         │  │
│  │  - CSRF Disabled                                              │  │
│  └───────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
            ┌──────────────────────┼──────────────────────┐
            │                      │                      │
            ▼                      ▼                      ▼
┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│   REST Controllers  │  │   Service Layer     │  │  External API       │
│                     │  │                     │  │                     │
│ - RegistrationCtrl  │  │ - AppUserService    │  │ Financial Modeling  │
│ - LoginController   │  │ - RegistrationSvc   │  │ Prep API            │
│ - MarketDataCtrl    │  │ - PortfolioService  │  │ (Stock Prices)      │
│ - PortfolioCtrl     │  │ - HoldingService    │  │                     │
│ - TradingCtrl       │  │ - TradingService    │  │                     │
└─────────────────────┘  │ - MarketDataService │  └─────────────────────┘
           │             └─────────────────────┘              │
           │                       │                          │
           │                       ▼                          │
           │             ┌─────────────────────┐              │
           │             │  Repository Layer   │              │
           │             │                     │              │
           │             │ - UserRepository    │              │
           └─────────────│ - PortfolioRepo     │──────────────┘
                         │ - HoldingRepository │              
                         │ - TransactionRepo   │              
                         └─────────────────────┘              
                                    │                         
                                    │
                                    ▼
                    ┌───────────────────────────┐
                    │   PostgreSQL Database     │
                    │   (stockdb)               │
                    │   Port 5432               │
                    │                           │
                    │  - app_user               │
                    │  - portfolio              │
                    │  - holding                │
                    │  - transaction            │
                    └───────────────────────────┘
```

---

