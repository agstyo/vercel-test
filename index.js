
const express = require('express');
const connection = require('./db');
require('dotenv').config();
const app = express();
const logger = require('./logger');

const port = 3000;

const DBName = process.env.DB_NAME; // Get the value

// Data hardcoded
const userInfo = {
    id: 1,
    name: DBName,
    email: 'john.doe@example.com',
    age: 30
};

app.get('/', (req, res) => {
    return res.json({ message: "welcome" });
  });

  app.get('/users', (req, res) => {
    return res.json({ message: userInfo });
  });

// Route untuk mendapatkan informasi user
app.get('/usersedb', (req, res) => {
    const query = 'SELECT * FROM users';
  
    connection.query(query, (err, results) => {
      if (err) {
        logger.error("Error executing query:", err.stack);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  });

// Jalankan server
app.listen(port, () => {
    logger.info(`Server berjalan di http://localhost:${port}`); // Use logger.info
});