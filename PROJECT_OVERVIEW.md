# Project Overview: Disa Financial Services Website

## Introduction
This project is a web application for **Disa Financial Services Pvt. Ltd.**, designed to provide investment services, stock broking information, and tools for users to manage their portfolios and inquiries. The application features a modern, responsive frontend and a robust backend API.

## Technology Stack

### Frontend
The frontend is built using **React** with the **Vite** build tool for fast development and optimized production builds.

*   **Core Framework**: React 19
*   **Build Tool**: Vite 7
*   **Routing**: React Router DOM 7
*   **State Management**: React Context API (`AuthContext` observed in usage)
*   **Styling**: Standard CSS with responsive design principles
*   **HTTP Client**: Axios (for API communication)
*   **Icons**: Lucide React
*   **Linting**: ESLint

### Backend
The backend is a RESTful API built with **Node.js** and **Express**.

*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **ORM (Object-Relational Mapping)**: Sequelize
*   **Database connector**: `pg` (PostgreSQL client)
*   **Authentication**: Custom authentication using `bcryptjs` for password hashing
*   **Middleware**:
    *   `cors` (Cross-Origin Resource Sharing)
    *   `body-parser` (JSON request parsing)
    *   `dotenv` (Environment variable management)
*   **Development**: Nodemon (Hot reloading)

### Database
The application uses **PostgreSQL** as its relational database management system.

*   **Dialect**: PostgreSQL
*   **ORM**: Sequelize is used for defining models and handling database operations (sync, query, relationships).
*   **Connection**: configured via environment variables (Host, Port, User, Password, Database Name).

## Project Structure

### Root Directory
*   `package.json`: Manages dependencies and scripts for the frontend and overall project orchestration.
*   `vite.config.js`: Configuration for the Vite build tool.
*   `eslint.config.js`: Linting rules.
*   `dist/`: Production build output.

### Frontend (`/src`)
*   Contains the React application source code.
*   `pages/`: React components representing different routes/pages (e.g., Login, Dashboard).
*   `components/`: Reusable UI components (e.g., Footer).
*   `services/`: API integration modules (e.g., `api.js` wrapping Axios).
*   `context/`: Context providers (e.g., AuthContext).

### Backend (`/backend`)
*   `server.js`: The entry point for the backend application.
*   `models/`: Sequelize models defining database schemas.
*   `routes/`: Express route definitions (likely `authRoutes`, `contactRoutes`, etc.).
*   `controllers/`: Logic for handling requests (inferred standard pattern).
*   `config/`: Configuration files (e.g., `database.js`).

## Getting Started

### Prerequisites
*   Node.js installed
*   PostgreSQL installed and running
*   `.env` file configured in `backend/` directory

### Running the Application from Root
The project uses `concurrently` to run both the frontend and backend with a single command:

```bash
npm run dev
```

This command executes:
1.  **Frontend**: `vite` (accessible at `http://localhost:5173`)
2.  **Backend**: `nodemon server.js` (accessible at `http://localhost:5000` or configured port)
