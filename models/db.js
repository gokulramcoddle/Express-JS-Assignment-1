const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'sql123',
  database: 'job_portal',
  port: 3306
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to the MySQL database.');
    connection.release();
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
}

testConnection();

module.exports = pool;

