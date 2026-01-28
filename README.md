# TaskManagement Application

A **full-stack Task Management web application** built using the MERN stack. This application helps users manage tasks efficiently with secure authentication, task filtering, and a responsive UI.

---

## Project Description

**TaskManagement** allows users to register, verify their email, log in securely, and manage daily tasks. Users can add, update, delete, and filter tasks based on completion status and importance.

---

## ✨ Features

### 👤 User Features
- User Registration
- Email Verification
- Login
- Forgot Password
- Logout
- JWT-based Authentication
- Password Encryption using bcrypt
- Session & LocalStorage handling

### 📝 Task Features
- Add Task
- Update Task
- Delete Task
- View All Tasks
- View Completed Tasks
- View Incomplete Tasks
- View Important Tasks
- Fully Responsive Design

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- React.js
- Tailwind CSS
- Redux Toolkit

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Session Management
- bcrypt

---

---

## 🔐 Authentication Flow

1. User registers with email and password  
2. Email verification is completed  
3. User logs in  
4. JWT token is generated  
5. Token is stored in LocalStorage  
6. Protected routes use Authorization headers  

---

## 🧠 Task Logic

- Each task includes:
  - Title
  - Description
  - Status (Completed / Incomplete)
  - Priority (Important / Normal)
- Redux Toolkit handles global state
- Secure API calls with JWT

---





