Sprint 3 Retrospective (SR3.md)
Participants

Vansh Madan – Student No. 220150413


What went well / Completed Work
Backend

Implemented full Portfolio backend, including default portfolio setup.

Added WatchItem + repository + service layer.

Integrated portfolio & watchlist backend with frontend successfully.

Frontend

Completed marketing homepage: Hero, CTA, Features, and Pricing sections.

Built full WatchListPage: search/autocomplete, drag-to-reorder, list/grid toggle, mock live prices, skeletons, and responsive layout.

Developed TermsModal with scroll-to-accept, ARIA compliance, logout on reject, and persistent acceptance tracking.

Completed major layout components: DashboardLayout, AuthLayout, TopBar, and global routing.

Added comprehensive Skeleton UI components and applied them across dashboard pages.

Completed FAQ page and multi-watchlist functionality.

Integration

Fully integrated watchlist + portfolio between backend and frontend.

All major Sprint 3 features prepared for demo.

What could be improved / Unfinished Tasks

More thorough testing needed for portfolio/watchlist interactions.

Real historical + live chart data still pending backend integration.

Some responsive/dark-mode adjustments for marketing pages still needed.

Watchlist/portfolio calculations need additional edge-case testing.

End-to-end flow (auth → dashboard → data fetch → actions) needs broader verification.

Action Items & New User Stories (Sprint 4)
Real Data for Charts

Backend-powered historical + intraday data for all charts.
Acceptance: Timeframes update correctly; chart data loads from backend.

Reliable Portfolio & Watchlist Updates

Ensure all state changes reflect instantly after trades/updates.
Acceptance: No refresh needed; consistent real-time UI.

Terms Acceptance Consistency

Ensure modal triggers and backend flags remain properly synced.
Acceptance: No bypassing; consistent login flows.

Multi-Watchlist Enhancements

Improve sorting, filtering, and persistence across lists.

Practices to Continue

Modular code structure (frontend + backend).

Frequent commits/merges.

Strong communication across team.

Consistent design system and reusable components.

Using loaders to maintain smooth UX.

New Practices to Start

Add end-to-end integration tests.

Standardize API response formatting.

Backend-first approach before building UI.

Improve caching/fallback strategy for market data.

Practices to Stop

Avoid heavy reliance on mock data.

Stop implementing features without backend alignment.

Avoid delaying shared component/data model decisions.

Best & Worst Experiences

Best:
Seeing full integration of backend portfolio + watchlist with a polished dashboard and marketing UI.

Worst:
Integration took longer than expected due to dependency chains and data syncing issues.

Summary

Sprint 3 focused heavily on integration and UI/UX completion, connecting backend data with a fully functional dashboard, watchlist system, and marketing pages. The product now feels cohesive and feature-rich.
