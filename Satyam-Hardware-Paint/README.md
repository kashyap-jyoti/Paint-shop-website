# Satyam Hardware & Paint Shop

Full-stack web application for Satyam Hardware & Paint Shop featuring a modern React frontend and a robust Spring Boot REST API backend.

---

## 📁 Repository Structure

```text
Paint-shop-website/
│
├── frontend/             # React + TypeScript + Vite Web Application
│   ├── src/              # UI Components, Pages, Assets & API Clients
│   ├── public/           # Static Public Assets
│   ├── package.json      # Dependencies & Scripts
│   ├── vite.config.ts    # Vite Configuration
│   └── tsconfig.json     # TypeScript Configuration
│
├── backend/              # Spring Boot Java REST Backend
│   ├── src/              # Controllers, Services, Security & Models
│   ├── pom.xml           # Maven Build File & Dependencies
│   └── application.properties # Spring Boot Configuration
│
├── .gitignore            # Root Git Ignore Rules (Node, Vite, Java/Maven, IDEs)
└── README.md             # Project Documentation
```

---

## 🚀 Technology Stack

### **Frontend**
- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: Vanilla CSS / Custom CSS Design Tokens
- **Icons & Animation**: Lucide React, Framer Motion

### **Backend**
- **Framework**: Spring Boot
- **Language**: Java 17+
- **Security**: Spring Security & JWT Authentication
- **Build Tool**: Maven

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: v18+ and `npm`
- **Java JDK**: 17+
- **Maven**: 3.8+ (or IDE built-in Maven wrapper)

### Running Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend application will start on `http://localhost:5173`.

### Running Backend
```bash
cd backend
mvn spring-boot:run
```
The backend REST API will start on `http://localhost:8080`.

---

## 📄 License
All rights reserved © Satyam Hardware & Paint.
