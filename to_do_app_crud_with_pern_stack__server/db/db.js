// import { Pool } from "pg";
import pkg from "pg"; // to import `pg` in ESM

import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
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

export default pool;
