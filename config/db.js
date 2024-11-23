import { log } from 'console';
import dotenv from 'dotenv';
import pg from 'pg';

// Load environment variables
dotenv.config();

const pool = new pg.Client({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD, // Using password from environment variables
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});


pool.connect()
  .then(() => log('Database connected'))
  .catch((err) => log('Database connection error:', err));

export default {
  query: (text, params) => pool.query(text, params),
  pool:pool
};
