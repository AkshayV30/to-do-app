# PERN Stack To-Do App

## 📌 Project Overview

This is a simple **To-Do App** built using the **PERN stack** (PostgreSQL, Express.js, React, Node.js). The app allows users to perform **CRUD (Create, Read, Update, Delete) operations** on tasks.

## 🛠 Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **ORM (Optional):** Sequelize
- **Authentication (Optional):** JWT & bcrypt.js

---

## 📂 Project Structure

```
/pern-todo-app
│── /client      # React frontend
│── /server      # Express backend
│── /database    # PostgreSQL setup
│── .env         # Environment variables
│── package.json # Dependencies & scripts
│── README.md    # Project documentation
```

---

## 🚀 Features

✅ Add a new to-do item  
✅ View all to-dos  
✅ Edit a to-do item  
✅ Delete a to-do item  
✅ Store to-dos in PostgreSQL  
✅ Use Express API to handle requests  
✅ Cross-Origin Resource Sharing (CORS) enabled

---

## 🏗 Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-username/pern-todo-app.git
cd pern-todo-app
```

### 2️⃣ Install Dependencies

#### Backend (Server)

```sh
cd server
npm install
```

#### Frontend (Client)

```sh
cd client
npm install
```

### 3️⃣ Setup PostgreSQL Database

Create a database in PostgreSQL and configure `.env` file in the `server` folder:

```
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_db
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the Server

```sh
cd server
npm run dev
```

### 5️⃣ Run the Client

```sh
cd client
npm start
```

---

## 📌 API Endpoints

| Method     | Endpoint     | Description        |
| ---------- | ------------ | ------------------ |
| **POST**   | `/todos`     | Create a new to-do |
| **GET**    | `/todos`     | Get all to-dos     |
| **GET**    | `/todos/:id` | Get a single to-do |
| **PUT**    | `/todos/:id` | Update a to-do     |
| **DELETE** | `/todos/:id` | Delete a to-do     |

---

## 📜 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Feel free to contribute by submitting issues or pull requests.

Happy Coding! 🚀
