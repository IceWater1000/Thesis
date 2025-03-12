const mysql = require("mysql2");

// Create a connection pool
const db = mysql.createPool({
  connectionLimit: 10,  // Allow up to 10 connections
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "bis",
  waitForConnections: true,
  queueLimit: 0
});

// Test database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    process.exit(1); // Stop server if DB connection fails
  }
  console.log("Connected to the database.");
  connection.release(); // Release the connection back to the pool
});

module.exports = db;

