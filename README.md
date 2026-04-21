# Disa Financial Services Pvt. Ltd. Website

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## 📖 Overview

**Disa Financial Services Pvt. Ltd. Website** is a modern, high-performance full-stack web application designed to establish a strong digital presence for **Disa Financial Services Pvt. Ltd.**. This platform serves as a comprehensive hub for clients to explore financial services, utilize investment tools, connect with expert advisors, and manage their portfolios.

Built with a focus on **speed, aesthetics, and user experience**, this website leverages a **PERN** stack (PostgreSQL, Express, React, Node.js) with **Vite** to deliver a seamless and responsive browsing experience across all devices.

## ✨ Key Features

*   **🚀 Dynamic Hero Section**: An engaging entry point with vibrant visuals and clear calls-to-action that capture user attention immediately.
*   **💼 Comprehensive Services**: Detailed and stylized presentation of core offerings, including Mutual Funds, Stock Broking, and Financial Advisory.
*   **🧮 Interactive SIP Calculator**: A robust, real-time financial tool allowing users to estimate their mutual fund returns visually.
*   **🤖 AI Chatbot Assistant**: Built-in intelligent chatbot to quickly answer user queries dynamically and provide support.
*   **🔐 User Authentication**: Secure login and signup system mapped to a robust backend using hashed passwords.
*   **📊 Contact & Inquiries**: Seamless contact integration designed to facilitate easy client communication directly stored in the database.
*   **📱 Fully Responsive Design**: Optimized layout ensuring perfect rendering on Desktops, Tablets, and Mobile devices.
*   **🎨 Premium UI/UX:** Custom-crafted styling using semantic HTML and advanced CSS techniques (Glassmorphism, gradients, transitions) for a polished, professional look.

## 🛠️ Technology Stack

### Frontend
*   **Core Framework**: [React.js](https://reactjs.org/) (v19)
*   **Build Tool**: [Vite](https://vitejs.dev/) (v7)
*   **Routing**: React Router DOM
*   **Styling**: Vanilla CSS & Custom CSS Variables (Responsive Design)
*   **Icons**: Lucide React
*   **HTTP Client**: Axios

### Backend
*   **Runtime**: [Node.js](https://nodejs.org/)
*   **Framework**: [Express.js](https://expressjs.com/)
*   **ORM**: Sequelize
*   **Database**: PostgreSQL
*   **Authentication**: bcryptjs for secure password hashing
*   **Middleware**: body-parser, cors, dotenv

## 📂 Project Structure

```bash
Disa_Financial_Services_Website/
├── backend/             # Node.js + Express backend
│   ├── config/          # Database & app configuration
│   ├── controllers/     # Request handlers
│   ├── models/          # Sequelize database models
│   ├── routes/          # API route definitions
│   └── server.js        # Backend entry point
├── public/              # Static assets (images, icons)
├── src/                 # React frontend
│   ├── assets/          # Project-specific assets
│   ├── components/      # Reusable React components
│   ├── pages/           # Application pages (Home, Login, etc.)
│   ├── services/        # API client services
│   ├── utils/           # Utility functions (e.g., chatbotData)
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Entry point
├── package.json         # Workspace/Frontend dependencies
└── vite.config.js       # Vite configuration
```

## 🚀 Getting Started

Follow these steps to set up the full-stack project locally.

### Prerequisites

*   **Node.js** (v18.0.0 or higher recommended)
*   **PostgreSQL** (v12.0 or higher) running locally or remotely
*   **Git** for version control

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd Disa_Financial_Services_Website
    ```

2.  **Install Frontend Dependencies**:
    ```bash
    npm install
    ```

3.  **Install Backend Dependencies**:
    ```bash
    cd backend
    npm install
    cd ..
    ```

4.  **Environment Configuration**:
    Create a `.env` file in the `backend/` directory with the following variables:
    ```env
    PORT=5000
    DB_NAME=your_database_name
    DB_USER=your_postgres_username
    DB_PASSWORD=your_postgres_password
    DB_HOST=localhost
    ```

5.  **Database Setup**:
    Ensure your PostgreSQL server is running and the database specified in `DB_NAME` exists. Sequelize will automatically sync the models on startup.

### Running the Application

This project uses `concurrently` to run both the frontend and backend with a single command from the root directory:

```bash
npm run dev
```

*   **Frontend**: Accessible at `http://localhost:5173`
*   **Backend API**: Accessible at `http://localhost:5000`

### Building for Production

To create an optimized production build of the frontend:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeatureName`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/YourFeatureName`).
5.  Open a Pull Request.

## 📄 License

This project is proprietary and developed for **Disa Financial Services Pvt. Ltd.**.

## 📞 Contact Us

For any inquiries or support relative to this codebase:

**Disa Financial Services Pvt. Ltd.**
*   **Email:** support@disafinancial.com
*   **Website:** https://disafinancial.com        (will be Live very Soon)

---
**Exclusively project by KARTIK PANDEY**

*Built with ❤️ for a smarter financial future.*
