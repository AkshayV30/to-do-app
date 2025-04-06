import { db, sql, isUsingNeon } from "../db/db.js";

const isDeployed =
  process.env.NODE_ENV === "production" || process.env.USE_NEON === "true";

export const checkDatabaseConnection = async () => {
  try {
    const result = isUsingNeon
      ? await sql`SELECT NOW()`
      : await db.query("SELECT NOW()");

    console.log(
      `✅ Connected to ${isUsingNeon ? "Neon" : "Local"} PostgreSQL at:`,
      isUsingNeon ? result[0].now : result.rows[0].now
    );
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  }
};

export { isDeployed };
