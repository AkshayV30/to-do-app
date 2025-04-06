import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./db/db.js";
import sql from "./db/neon.js";

import todoRoutes from "./routes/todos.js";
import { configMiddleware } from "./middlewares/middlewares.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;
const USE_NEON = process.env.USE_NEON === "true"; // Toggle for Neon

//  Middleware
configMiddleware(app);

app.use(express.json()); // Parse JSON request body

// Database Connection Test
const checkDatabaseConnection = async () => {
  try {
    if (USE_NEON) {
      const result = await sql`SELECT NOW()`;
      console.log("✅ Connected to Neon PostgreSQL at:", result[0].now);
    } else {
      const res = await pool.query("SELECT NOW()");
      console.log("✅ Connected to PostgreSQL at:", res.rows[0].now);
    }
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

app.get("/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ status: "✅ DB Connected", time: result.rows[0].now });
  } catch (err) {
    res
      .status(500)
      .json({ error: "❌ Database connection failed", details: err.message });
  }
});

// 404 Error Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
