# Full-Stack MERN E-Commerce Platform

A complete MERN stack E-Commerce web application featuring user authentication, product management, cart handling, and order management.

## 🚀 Tech Stack
- **Frontend:** React (Vite), React Router DOM, Context API, Bootstrap, Axios
- **Backend:** Node.js, Express.js, MongoDB (Mongoose ORM), JWT Authentication

## ✨ Key Features
- 🔐 **User Authentication:** JWT-based Login & Registration with Password Hashing.
- 🛍️ **Product CRUD Operations:** Add, Edit, View, and Delete products with Category filtering & Live Search.
- 🛒 **Cart System:** State management using React Context API for quantity update & checkout.
- 📦 **Orderr Management System:** Custom `orderrs` routing schema for tracking user purchase history.
- 🛡️ **Protected Routes:** Route guards on both Frontend and Backend API endpoints.

## 🛠️ How to Run Locally

### 1. Backend Setup
```bash
cd ecommerce-backend
npm install
node server.js