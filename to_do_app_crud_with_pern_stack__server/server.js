import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./db/db.js";
import todoRoutes from "./routes/todos.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request body

// Database Connection Test
const checkDatabaseConnection = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Connected to PostgreSQL at:", res.rows[0].now);
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1); // Exit if database connection fails
  }
};
checkDatabaseConnection();

// Routes
app.use("/v1/todos", todoRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to the Express Server!");
});

// 404 Error Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
