# EverLearn Hub – Frontend

EverLearn Hub is an **E-Learning web application frontend** built as part of a full-stack project. This frontend seamlessly integrates with the [EverLearn Hub Backend](https://github.com/supakkit/everlearn-hub-backend). The platform allows students and working professionals to explore, purchase, and learn from online courses, while providing administrators with powerful tools to manage content, users, and payments.

This project represents an **MVP** and is designed with scalability, role-based access, and real-world product patterns in mind.

---

## 🚀 Project Overview

* **Project Name:** EverLearn Hub
* **Type:** Frontend application
* **Project Status:** MVP
* **Target Users:** Students & working professionals
* **Backend:** Separate NestJS backend (REST API)

---

## 🛠 Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **UI Library:** MUI (Material UI)
* **Styling:** Tailwind CSS + MUI styling system
* **Animations:** Motion (Framer Motion successor)
* **HTTP Client:** Axios
* **Authentication:** Cookie-based authentication with refresh tokens
* **API Types:** OpenAPI → TypeScript generation

---

## ✨ Core Features

### 👤 User Features

* Browse and explore courses across multiple categories
* Search courses by text and category
* View course details with mini lesson content
* Purchase courses via checkout flow
* Authentication (Sign up / Login / Refresh token)
* Role-based access control (STUDENT / ADMIN)
* User dashboard showing:
  * Enrolled courses
  * Completed courses
  * Number of active learning days (yearly)
* Upload and update user avatar

### 🛡 Admin Features

* Admin dashboard overview
* Manage users
* Manage courses and course content
* Manage course categories
* View enrollments
* View payments
* Preview course content

---

## 📄 Pages & Routing

### Public Pages

* `/` – Home
* `/courses` – Course listing
* `/learn` – Learning area

### Authentication

* `/auth/signup` – Sign up
* `/auth/login` – Login

### User Pages

* `/dashboard` – User dashboard
* `/profile` – User profile & avatar upload
* `/checkout` – Course checkout
* `/checkout/success` – Payment success
* `/checkout/cancel` – Payment canceled

### Admin Pages

* `/admin` – Admin dashboard
* `/admin/users` – User management
* `/admin/courses` – Course management
* `/admin/enrollments` – Enrollment management
* `/admin/categories` – Category management
* `/admin/payments` – Payment overview

---

## 🧱 Architecture & Patterns

* Feature-based routing using Next.js App Router
* Centralized navigation configuration for user & admin roles
* Cookie-based authentication handled via backend
* Role-based UI rendering (STUDENT vs ADMIN)
* Reusable UI components using MUI
* API type safety via OpenAPI-generated TypeScript types
* Environment-based configuration using `.env`

---

## ▶️ Getting Started

### Prerequisites

* Node.js >= 18
* Backend API running locally

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Run Development Server

```bash
npm run dev
```

The app will be available at:

```
http://localhost:3000
```

---

## 🧪 API Type Generation

This project uses OpenAPI to generate fully typed API clients:

```bash
npm run openapi
```

---

## 🧠 Key Learnings & Challenges

* Managing loading and disabled states across parent and child components
* Implementing cookie-based authentication with refresh tokens
* Role-based navigation and protected routes
* Integrating MUI with Next.js App Router
* Handling image uploads and previews for user avatars

---

## 🔮 Future Improvements

* Add unit and integration tests
* Improve accessibility (a11y)
* Add internationalization (i18n)
* Improve performance with caching strategies
* Enhance admin analytics and reporting

---

## 📌 Portfolio Note

This project demonstrates real-world frontend skills including:

* Modern React & Next.js patterns
* Type-safe API integration
* Authentication & authorization
* Dashboard-based UI design
* Scalable project structure

---

**EverLearn Hub** – Building a scalable learning platform for lifelong learners 📚
