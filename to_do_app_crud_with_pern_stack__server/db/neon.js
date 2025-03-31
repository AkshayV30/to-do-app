import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Use a separate Neon DB URL
const sql = neon(process.env.NEON_DATABASE_URL);

export default sql;
