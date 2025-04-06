import dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";

import pkg from "pg"; // to import `pg` in ESM

dotenv.config();
const { Pool } = pkg;

const USE_NEON = process.env.USE_NEON === "true";

// Use the connection string provided by Neon
const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL, // Environment variable for Neon connection URL
});

const localPool = new Pool({
  // user: "postgres",
  // host: "localhost",
  // database: "perntodo",
  // password: "postgres",
  // port: 5432,

  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

export const db = USE_NEON ? pool : localPool;
export const sql = neon(process.env.NEON_DATABASE_URL);
export const isUsingNeon = USE_NEON;
