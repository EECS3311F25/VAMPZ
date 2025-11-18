# [11-05-2025] - Sprint 2 Standup 1

## 1. What did you work on since last Standup?
I worked on outlining the overall system design, focusing on how the controllers, services, and models will interact. I also started researching different market data APIs to determine which ones fit our project needs.

## 2. What do you commit to next?
I plan to begin building the initial controllers for handling market data requests and continue comparing APIs based on speed, reliability, and free-tier limitations

## 3. When do you think you will be done?
I expect to finish the first draft of the controllers and finalize an API choice by 11-10-2025

## 4. Do you have any blockers?
The main challenge is determining which API gives fast-enough refresh rates while still being affordable for the team.

# [11-10-2025] - Sprint 2 Standup 2

## 1. What did you work on since last Standup?
I completed the designs for the system components and implemented the basic structure of the market-related controllers. I also tested a few APIs and successfully connected one of them to fetch live market prices.

## 2. What do you commit to next?
I plan to integrate the API responses into the controller logic and test how well the data flows through the system. I’ll also check how frequently the API updates to see if it's suitable for simulated trading.

## 3. When do you think you will be done?
I expect this integration testing to be done by 11-15-2025.

## 4. Do you have any blockers?
The API I found updates slower than expected, which may limit support for fast-paced daytrading features.

# [11-15-2025] - Sprint 2 Standup 3

## 1. What did you work on since last Standup?
I fully connected the API to the controllers and verified that live market data is being retrieved. I also confirmed the system design functions correctly with the incoming data, though the API refresh rate is slow and may only be suitable for medium-term simulated trading.

## 2. What do you commit to next?
I’ll document the current API limitations, explore potential workarounds, and prepare recommendations for Sprint 2—such as caching strategies or switching to mock data for faster simulation.

## 3. When do you think you will be done?
I should have all documentation and recommendations ready by 11-17-2025.

## 4. Do you have any blockers?
The only blocker is the slow API refresh rate, which limits real-time updates required for day-trading simulation.
