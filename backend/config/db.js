// config/db.js

import mysql from 'mysql';

// Create a connection pool for better performance
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Aek@0716',        // if you set a password, add it here
  database: 'motorsdb',
  connectionLimit: 10  // Optional: max number of connections in the pool
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL Connection Error:", err.message);
  } else {
    console.log("✅ MySQL Connected");
    connection.release();
  }
});

export default pool;
