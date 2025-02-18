/* require('dotenv').config();
const mysql = require('mysql2');
const logger = require('./logger'); // Import the logger

const caCertBase64 = process.env.CA_CERT_BASE64; // Get the value

if (!caCertBase64) {
    logger.error("CA_CERT_BASE64 environment variable is not set!"); // Use logger.error
    process.exit(1); // Exit the process with an error code
    // Or throw an error if appropriate for your application's error handling.
    // throw new Error("CA_CERT_BASE64 environment variable is not set!");
}

const caCert = Buffer.from(caCertBase64, 'base64').toString('utf-8');

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
    logger.error(`Error connecting to TiDB: ${err.stack}`); // Use logger.error
    return;
  }
  logger.info(`Connected to TiDB as id ${connection.threadId}`); // Use logger.info
});

module.exports = connection; */