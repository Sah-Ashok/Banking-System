import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  port: parseInt(process.env.DB_PORT as string, 10),
  ssl: {
    rejectUnauthorized: false 
  }
});

export default pool;