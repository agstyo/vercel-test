const express = require('express');
const app = express();
const port = 3000;

// Data hardcoded
const userInfo = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30
};

// Route untuk mendapatkan informasi user
app.get('/user', (req, res) => {
    res.json(userInfo);
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});