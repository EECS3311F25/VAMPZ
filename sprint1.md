# Sprint 1 Planning Meeting (sprint1.md)

## Sprint Goal
The goal of Sprint 1 is to establish the core foundation of StockSprout, focusing on authentication, user navigation, and UI design.
This includes building functional user registration and login pages, setting up a dashboard for post-login interaction, and developing a responsive homepage interface to define the product’s visual and navigational structure.
By completing these components, the team ensures that all essential routes, design patterns, and integration points are in place for feature expansion in Sprint 2.

---

## System Architecture
The system for Sprint 1 consists primarily of frontend components and basic authentication flow.
The architecture follows a modular React-based structure with the following key components:
- Frontend Framework: React (Vite) with Tailwind CSS for styling.
- Routing: React Router for multi-page navigation (Home → Login → Dashboard).
- Authentication: Frontend form validation and routing logic for sign-up/sign-in flow.
- UI Components: Reusable card, button, and input components for consistent design.
- Deployment Environment: Local development environment configured via Node.js and npm.
- A connection layer for backend services (market data APIs, simulated trading engine) will be integrated in future sprints once the core interface is finalized.
---

## User Stories for Sprint 1
The following user stories have been identified for Sprint 1:

### 1. *User Story 1: User Registration & Login*
- *As Ayaan*, I want to quickly create an account and log in, so that I can save my progress and return to my simulated portfolio anytime.
- *Acceptance Criteria*:
  - A registration form with email, password, and username fields.
  - Validation for empty or invalid input.
  - Error message when login credentials are incorrect.
  - Redirect to the dashboard after successful login.
  - Session persists until logout (user stays logged in).

### 2. *User Story 2: Simulated Stock Trading (Buy/Sell)*
- As Mina, I want to see the layout and placeholders for a trading interface, so that I understand where trading features will appear once implemented.
- Acceptance Criteria:
  - Design mockup and component structure for the trading interface.
  - Placeholder components for stock listings and trade actions.
  - Navigation flow between the dashboard and trading section established.
  - Responsive layout that adapts across screen sizes.

### 3. *User Story 3: Portfolio Overview Dashboard*
- As Ethan, I want to access a dashboard after logging in, so that I can view where my portfolio summary and upcoming data visualizations will appear.
- Acceptance Criteria:
  - Base dashboard UI with placeholder sections for holdings and performance metrics.
  - Navigation links to return to homepage and logout.
  - Consistent design language and color palette.
  - Responsive layout for mobile and desktop devices.
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
  *Definition of Done – Sprint 1*
- The authentication system (sign up and login) is fully functional, allowing new users to register and existing users to sign in using validated credentials.
- The login and registration UIs are designed with a clean, responsive interface that ensures accessibility and intuitive user flow.
- Upon successful login, users are redirected to the Dashboard, which serves as the base for portfolio tracking and future trading features.
- The homepage UI has been designed and implemented, establishing the visual foundation and navigation structure for upcoming components (e.g., trading, learning modules).
- The frontend architecture has been structured with reusable React components and connected routing (via React Router), enabling multi-page navigation between key views (Home, Login, Dashboard).
- Basic project setup and environment configuration (Node, React, Tailwind, routing, and Git repo structure) have been completed, ensuring a scalable base for next sprints.
- A short demo video has been recorded showcasing:
  - Functional user login & signup
  - Navigation between Home, Login, and Dashboard pages
  - The completed UI foundation for the simulator interface
