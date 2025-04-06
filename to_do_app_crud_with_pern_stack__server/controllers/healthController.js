// controllers/healthController.js
import { db, sql, isUsingNeon } from "../db/db.js";

export const healthCheckHandler = async (req, res) => {
  try {
    const result = isUsingNeon
      ? await sql`SELECT NOW()`
      : await db.query("SELECT NOW()");

    const time = isUsingNeon ? result[0].now : result.rows[0].now;

    res.json({ status: "✅ DB Connected", time });
  } catch (err) {
    res.status(500).json({
      error: "❌ Database connection failed",
      details: err.message,
    });
  }
};
