# VAMPZ – Stock Market Simulator
*A stock market simulation platform for users to trade, track, and analyze portfolios in real-time.*

---

## Table of Contents
- [Motivation](#motivation)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contribution Guidelines](#contribution-guidelines)


---

## Motivation
The goal of **VAMPZ** is to provide a realistic, interactive platform for users to simulate stock trading without financial risk. It addresses the following problems:
- Lack of safe environments for students to practice trading.
- Difficulty in tracking and visualizing portfolio performance in real-time.
- Limited tools for understanding market trends and investment strategies.

By combining Spring Boot, PostgreSQL, and React, VAMPZ provides a full-stack experience, enabling a seamless backend-to-frontend integration and real-time user interactions.

---

## Features
- User registration, login, and profile management
- Real-time stock price simulation
- Portfolio tracking and analytics (gain/loss, trends)
- Interactive stock charts and visualizations

---

## Tech Stack
- **Backend:** Java 17, Spring Boot, Spring Data JPA
- **Frontend:** React, Tailwind/Bootstrap
- **Database:** PostgreSQL
- **Build Tools:** Maven (Backend), npm (Frontend)
- **Others:** REST API, JWT Authentication 

---

## Installation

### Prerequisites
- Java 17+
- Node.js 18+ and npm
- PostgreSQL 13+

### Backend Setup
```bash
# Clone the repo
git clone https://github.com/EECS3311F25/VAMPZ.git
cd VAMPZ/backend/stocksprout

# Create PostgreSQL database
# Example: create a database named 'vampz_db'

# Configure database connection in src/main/resources/application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/vampz_db
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD

# Build and run backend
mvn clean install
mvn spring-boot:run
```

### Frontend Setup
```bash
cd ../frontend

# Install dependencies ( Install any remaining Dependecies as Well if any error arrises )
npm install

# Run frontend
npm run dev
```

## Usage (To be used before deployment)
1. Open `http://localhost:3000` in your browser.
2. Register a new user account or log in.
3. Start trading stocks, managing your portfolio, and visualizing trends.



---

## Contribution Guidelines
- **Git Workflow:** Feature branches should follow `feature/<feature-name>` naming convention.
- **Pull Requests:** All code changes must go through PRs for review.
- **Issues:** Use GitHub Issues to track bugs and feature requests.
- **Code Standards:** Follow Java and JavaScript best practices (e.g., naming conventions, code formatting).
- **Communication:** Team uses Discord (invite link below) for standups and discussions.


---



