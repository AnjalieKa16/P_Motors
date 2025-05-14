// config/db.js

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a connection pool using mysql2 with promises
const pool = mysql.createPool({
  host: process.env.DB_HOST,           // MySQL host from .env
  user: process.env.DB_USER,           // MySQL user from .env
  password: process.env.DB_PASSWORD,   // MySQL password from .env
  database: process.env.DB_NAME,       // MySQL database name from .env
  waitForConnections: true,            // Wait if no connections are available
  connectionLimit: 10,                 // Max number of simultaneous connections
  queueLimit: 0                        // 0 = unlimited request queue
});

// Optional: Test connection on startup
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Connected Successfully");
    connection.release(); // Return connection to pool
  } catch (err) {
    console.error("❌ MySQL Connection Error:", err.message);
  }
})();

export default pool;

