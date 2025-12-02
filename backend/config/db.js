import dotenv from "dotenv";
dotenv.config();  // <-- Load env FIRST

import mysql from "mysql2/promise";

console.log("LOADING DB.JS FROM:", import.meta.url);
console.log("ENV VALUES:", process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME);

export const db = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
