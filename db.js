require('dotenv').config();
const mysql = require('mysql2');

// Decode Base64 dari environment variable
const caCert = Buffer.from(process.env.CA_CERT_BASE64, 'base64').toString('utf-8');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: caCert,
    rejectUnauthorized: true
  }
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to TiDB:', err.stack);
    return;
  }
  console.log('Connected to TiDB as id', connection.threadId);
});

module.exports = connection;