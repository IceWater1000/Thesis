const mysql = require("mysql2");
// database conetction
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "bis",
});

// test connection
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    process.exit(1); // Stop server if DB connection fails
  }
  console.log("Connected to the database.");
});

module.exports = db;
