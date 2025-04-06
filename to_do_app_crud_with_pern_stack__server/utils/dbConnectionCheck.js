import pool from "../db/db.js";
import sql from "../db/neon.js";

const isDeployed =
  process.env.NODE_ENV === "production" || process.env.USE_NEON === "true";

export const checkDatabaseConnection = async () => {
  try {
    const result = isDeployed
      ? await sql`SELECT NOW()`
      : await pool.query("SELECT NOW()");

    console.log(
      `✅ Connected to ${isDeployed ? "Neon" : "Local"} PostgreSQL at:`,
      isDeployed ? result[0].now : result.rows[0].now
    );
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  }
};

export { isDeployed };
