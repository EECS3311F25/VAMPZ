[11-05-2025] — Sprint 2 Standup 1
1. What did you work on since the last Standup?

Since the last standup, I spent time reviewing the overall dashboard structure and mapping out how the frontend will interact with the backend. I also identified and removed unnecessary features such as TFSA holdings and unrelated account types—that were complicating the architecture without adding value. Streamlining these areas helped simplify our data model and improved overall system clarity. Additionally, I ensured the frontend was fully synced with the backend so that page transitions, API calls, and data population were running smoothly without breaking the main flow of the application.

2. What do you commit to next?

Moving forward, I plan to break down the major dashboard UI sections into modular, standalone component files. This refactoring should make the interface easier to maintain, extend, and debug. Once that is done, I will begin implementing the initial logic for handling portfolio data and preparing it for dynamic rendering.

3. When do you think you will be done?

I anticipate completing the component refactoring by 11-10-2025.

4. Do you have any blockers?

No major blockers at the moment.

[11-10-2025] — Sprint 2 Standup 2
1. What did you work on since the last Standup?

Since the previous standup, I successfully modularized the dashboard into separate, reusable components such as the balance card, return card, buying power card, and performance section. This significantly improved the readability and maintainability of the frontend structure. I also removed outdated or irrelevant sections to keep the UI streamlined and focused. On top of this, I contributed to designing the dashboard graphs and created a use case diagram to help illustrate system interactions and feature flows.

2. What do you commit to next?

My next focus will be connecting the backend data to the dashboard components and ensuring the portfolio information is reflected correctly in the dashboard header. The goal is to have the dashboard fully capable of rendering the user’s initial portfolio values dynamically.

3. When do you think you will be done?

I expect the dashboard to pull and display basic portfolio data by 11-15-2025.

4. Do you have any blockers?

No major blockers.

[11-15-2025] — Sprint 2 Standup 3
1. What did you work on since the last Standup?

Since the last standup, I integrated the backend portfolio data into the dashboard, enabling it to display the user’s holdings, balances, performance metrics, and other essential values accurately. I cleaned up unused props, removed redundant UI logic, and improved the responsiveness of the components so they load smoothly with backend responses.

In addition, I implemented the buy and sell features on the frontend and ensured they communicate correctly with the backend endpoints. I also added functionality for updating prices and refreshing portfolio values, making the dashboard more dynamic and real-time aligned.

2. What do you commit to next?

Moving forward, I will continue refining the overall data integration, ensuring all components update consistently and without delay. I will also polish the UI interactions and transitions to prepare the dashboard for the upcoming demo.

3. When do you think you will be done?

I expect to finish the final adjustments by end of day, 11-17-2025.

4. Do you have any blockers?

No major blockers.
