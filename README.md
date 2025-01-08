# Full-Stack Todo Application

This is a full-stack Todo application built using React, TailwindCSS (Frontend), Express, and MongoDB (Backend). The app allows users to perform CRUD operations on a list of tasks with details like task name, status, and deadline.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Acknowledgments](#acknowledgments)

---

## Features

- **Add Task**: Users can add a new task with a name, status, and deadline.
- **View Tasks**: Display all tasks in a tabular format.
- **Edit Tasks**: Edit task details including name, status, and deadline.
- **Delete Tasks**: Remove a task from the list.

---

## Technologies Used

### Frontend:
- React (v18)
- Axios
- TailwindCSS
- Vite for development/build

### Backend:
- Express.js
- MongoDB (Local instance, not Atlas)
- Mongoose (ODM for MongoDB)

---

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (version 16+ recommended).
- **MongoDB**: Install and run a local MongoDB instance.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/RAJESH2132/Full-Stack-Todo-App.git
   cd Full-Stack-Todo-App
   ```

2. Install dependencies for both frontend and backend:

   - Frontend:

     ```bash
     cd todo-frontend
     npm install
     ```

   - Backend:

     ```bash
     cd ../todo-backend
     npm install
     ```

### Running the Application

#### Backend
1. Start your local MongoDB instance.
2. Run the backend server:
   ```bash
   cd todo-backend
   node index.js
   ```
   The backend will run on `http://localhost:5000`.

#### Frontend
1. Run the frontend:
   ```bash
   cd todo-frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

---

## Project Structure

### Repository Structure
```
Full-Stack-Todo-App/
├── todo-frontend/   # Frontend code
└── todo-backend/    # Backend code
```

### Frontend
```
todo-frontend/
├── public/          # Static assets
├── src/
│   ├── App.jsx      # Main React component
│   ├── index.css    # TailwindCSS styling
│   ├── main.jsx     # React entry point
│   └── components/  # Reusable components
├── package.json     # Frontend dependencies and scripts
└── vite.config.js   # Vite configuration
```

### Backend
```
todo-backend/
├── models/
│   └── todoModel.js # Mongoose schema for tasks
├── Routes/
│   └── todoRoutes.js # Task API routes
├── index.js         # Main entry point for backend
├── package.json     # Backend dependencies and scripts
└── .env             # Environment variables (optional)
```

---

## API Endpoints

### Base URL: `http://localhost:5000`

#### Task Endpoints:
- **Get All Tasks**
  - `GET /tasks/getTodoList`
- **Add Task**
  - `POST /tasks/addTodoList`
  - Body: `{ task, status, deadline }`
- **Update Task**
  - `PUT /tasks/updateTodoList/:id`
  - Body: `{ task, status, deadline }`
- **Delete Task**
  - `DELETE /tasks/deleteTodoList/:id`

---

## Acknowledgments

- Built with React and TailwindCSS for modern UI design.
- Powered by Express.js and MongoDB for robust backend support.
- Vite for fast development and build process.

