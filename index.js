
const express = require('express');
const connection = require('./db').promise();
require('dotenv').config();
const app = express();
const logger = require('./logger');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = 3002;

const DBName = process.env.DB_NAME; // Get the value


app.use(bodyParser.json()); // Middleware untuk membaca JSON dari request body

// Proxy middleware
app.use('/api', createProxyMiddleware({
    target: 'https://api-internal.titipaja.id', // Ganti dengan URL API internal
    changeOrigin: true,
    pathRewrite: { '^/api': '' }, // Hapus '/api' dari path request
    onProxyReq: (proxyReq, req, res) => {
        // Jika request body ada, ubah menjadi JSON string
        if (req.body) {
            let bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.write(bodyData);
        }
    }
}));

app.get('/', (req, res) => {
    return res.json({ message: "welcome" });
  });

  // Endpoint POST untuk insert data
// ... existing code ...
// ... existing code ...
/*
app.post('/doc_order_header2', async (req, res) => {
try {
    const { warehouseId, orderNo, soReference1 } = req.body;

    // Validasi input
    if (!warehouseId || !orderNo) {
        return res.status(400).json({ error: "warehouseId dan orderNo wajib diisi" });
    }

    logger.info(JSON.stringify(req.body, null, 2));

    await connection.query('START TRANSACTION');
    // Query insert
    const query = `INSERT INTO doc_order_header_test (warehouseId, orderNo, soReference1) VALUES (?, ?, ?)`;
    const result1 = await connection.execute(query, [warehouseId, orderNo, soReference1]);
    logger.info("Query insert");

    logger.info("Query select");
    const check_data_doh = `SELECT * FROM doc_order_header_test`;
    const [rows] = await connection.execute(check_data_doh);

    //logger.info("Insert result: " + JSON.stringify(rows, null, 2));

    let insertQueries = [];
    if (soReference1 === "X2") {
        // Insert dua kali dengan prefix tambahan jika soReference1 adalah "X2"
        insertQueries.push([warehouseId, `X2A-${orderNo}`, soReference1]);
        insertQueries.push([warehouseId, `${orderNo}`, soReference1]);
    } 

    // Jalankan semua query insert
    for (let values of insertQueries) {
        try {
            await connection.execute(
                `INSERT INTO doc_order_header_test (warehouseId, orderNo, soReference1) VALUES (?, ?, ?)`,
            values
            );
        }
        catch(err) {
            console.log(err);
            //await connection.query('ROLLBACK');
            throw new Error(`Gagal memproses doc_order_header_test`);
        }
    }

    await connection.query('COMMIT');
    return res.status(200).json({
        message: "Data tersimpan " + orderNo,
    });
    } 
catch (err) {
    console.log(err);
    await connection.query('ROLLBACK');

    // Check for duplicate entry error (MySQL error code 1062)
    if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ 
        error: "Data already exists with the same warehouseId and orderNo"
    });
    }

    return res.status(500).json({ 
        error: "Server error occurred: " + err.message 
    });
} 
});


app.post('/doh', async (req, res) => {
  try {
      const { 
          warehouseId, 
          customerId, 
          orderNo, 
          orderType, 
          soStatus, 
          soReference1, 
          soReference2,
          orderTime,
          hedi06 
      } = req.body;

      // Validasi input
      if (!orderNo) {
          return res.status(400).json({ error: "orderNo is required" });
      }

      const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
      
      // Query insert
      const query = `
          INSERT INTO doc_order_header (
              warehouseId, customerId, orderNo, orderType, 
              soStatus, soReference1, soReference2, orderTime, 
              addTime, hedi06
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
          warehouseId || null, 
          customerId || null, 
          orderNo,
          orderType || null,
          soStatus || null,
          soReference1 || null,
          soReference2 || null,
          orderTime || currentDateTime,
          currentDateTime, // addTime always current timestamp
          hedi06 || null
      ];

      const result = await connection.execute(query, values);

      console.log(result);
      
      return res.status(200).json({
          message: "Data saved successfully",
          orderNo: orderNo
      });
  } catch (err) {
      logger.error("Error inserting data:", err);
      
      if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ 
              error: "Duplicate orderNo. This order number already exists."
          });
      }

      return res.status(500).json({ 
          error: "Server error occurred: " + err.message 
      });
  }
});


// ... existing code ...

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
*/