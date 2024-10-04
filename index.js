const { Pool } = require("pg"); // Correctly importing Pool from pg

// Create a connection pool
const pool = new Pool({
  user: "postgres",
  password: "dhara16",  // Recommend using environment variables for sensitive info
  host: "localhost",
  port: 5433,
});

pool.query("CREATE DATABASE Exhibition;").then(response => {
  console.log("Database created");
  console.log(response);
}).catch(err => {
  console.log("Error:", err);
});

module.exports = pool;
