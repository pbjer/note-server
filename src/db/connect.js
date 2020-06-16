import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const connectionString = process.env.NOTE_SERVICE_DB_STRING;

export const pool = new Pool({
  connectionString,
});
