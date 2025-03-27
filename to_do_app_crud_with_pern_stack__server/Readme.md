# 📌 PERN Stack To-Do App (Modular Architecture)

## 📖 Overview

This project follows a **Model-Controller-Routes (MCR) Architecture**, which is a structured approach to building a scalable and maintainable backend API using **Node.js, Express, and PostgreSQL**.

## 🏗 Architectural Breakdown

This project separates concerns into **three primary layers**:

### 1️⃣ **Model (`db.js`)** → Handles Database Connection

- Establishes a connection to **PostgreSQL** using the `pg` package.
- Exports a `pool` instance for executing queries.

### 2️⃣ **Controller (`todosController.js`)** → Handles Business Logic

- Each function in the controller handles a specific operation (Create, Read, Update, Delete).
- Interacts with the database via the `pool.query` method.
- Responds to requests with appropriate HTTP responses.

### 3️⃣ **Routes (`todos.js`)** → Defines API Endpoints

- Defines the routes for handling **CRUD** operations.
- Connects routes to their respective **controller functions**.

### 4️⃣ **Server (`server.js`)** → Initializes Express App

- Configures middleware (`cors`, `express.json`).
- Imports the routes and sets up the API endpoints.
- Starts the server and listens on a specified port.

## 🛠 Setup & Installation

### 1️⃣ **Clone the Repository**

### 2️⃣ **Install Dependencies**

### 3️⃣ **Setup Environment Variables**

### 4️⃣ **Start the Server**

```sh
npm run dev
```

The server will be running at: **http://localhost:5000** 🚀

## 📌 API Endpoints

| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| POST   | `/todos`     | Create a new todo   |
| GET    | `/todos`     | Get all todos       |
| GET    | `/todos/:id` | Get a specific todo |
| PUT    | `/todos/:id` | Update a todo       |
| DELETE | `/todos/:id` | Delete a todo       |

## ✅ Best Practices Followed

- **Modular Code Structure** → Easier to manage and scale.
- **Separation of Concerns** → Keeps logic organized.
- **Environment Variables** → Sensitive information is not hardcoded.
- **Error Handling** → Catches errors and prevents app crashes.
