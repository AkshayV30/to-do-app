import express from "express";
import dotenv from "dotenv";

import { todoRoutes, healthRoute } from "./routes/routes.js";
import { configMiddleware } from "./middlewares/middlewares.js";

import { checkDatabaseConnection } from "./utils/dbConnectionCheck.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.EXPRESS_PORT || 5000;

//  Middleware
configMiddleware(app);

// Check DB connection
await checkDatabaseConnection();

// Routes
app.use("/v1/todos", todoRoutes);
app.use("/health", healthRoute);

// Root Route
app.get("/", (req, res) => {
  res.send(" Welcome to the Express Server!");
});

// 404 Error Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the Server
app.listen(PORT, () => {
  console.log(` Server running on ${PORT}`);
});
