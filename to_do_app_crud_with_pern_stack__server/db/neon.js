import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import { Pool } from "pg";

// Use the connection string provided by Neon
const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL, // Environment variable for Neon connection URL
});

dotenv.config(); // Load environment variables

// Use a separate Neon DB URL
const sql = neon(process.env.NEON_DATABASE_URL);

export default sql;
