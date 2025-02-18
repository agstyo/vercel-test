
const express = require('express');
const connection = require('./db');
const app = express();
const logger = require('./logger');

const port = 3000;

// Data hardcoded
const userInfo = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30
};

app.get('/', (req, res) => {
    return res.json({ message: "welcome" });
  });

// Route untuk mendapatkan informasi user
app.get('/users', (req, res) => {
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