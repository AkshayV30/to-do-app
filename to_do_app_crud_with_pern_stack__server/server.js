import express from "express";
import dotenv from "dotenv";

import pool from "./db/db.js";
import sql from "./db/neon.js";

import todoRoutes from "./routes/todos.js";
import { configMiddleware } from "./middlewares/middlewares.js";

import {
  checkDatabaseConnection,
  isDeployed,
} from "./utils/dbConnectionCheck.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.EXPRESS_PORT || 5000;
// const USE_NEON = process.env.USE_NEON === "true"; // Toggle for Neon

//  Middleware
configMiddleware(app);

// Check DB connection
checkDatabaseConnection();

// Routes
app.use("/v1/todos", todoRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to the Express Server!");
});

app.get("/health", async (req, res) => {
  try {
    // const result = await pool.query("SELECT NOW()");
    const result = isDeployed
      ? await sql`SELECT NOW()`
      : await pool.query("SELECT NOW()");

    // res.json({ status: "✅ DB Connected", time: result.rows[0].now });
    res.json({
      status: "✅ DB Connected",
      time: isDeployed ? result[0].now : result.rows[0].now,
    });
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
  // console.log(`🚀 Server running on http://localhost:${PORT}`);
  const isProduction = process.env.NODE_ENV === "production";
  const serverURL = isProduction
    ? `🌐 Server running in PRODUCTION mode on port ${PORT}`
    : `🚀 Server running at http://localhost:${PORT} (DEV mode)`;

  const dbType = isDeployed ? "Neon PostgreSQL" : "Local PostgreSQL";

  console.log(serverURL);
  console.log(`📦 Connected to ${dbType}`);
});
