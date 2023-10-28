import { createConnection } from "mysql2";
import { config } from "dotenv";
config();

const db = createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export default db;
