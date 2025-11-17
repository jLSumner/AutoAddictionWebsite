require('dotenv').config();
const express = require('express');
const mysql2 = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// MySQL connection pool
const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve the form at root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// Handle form submission
app.post('/add-product', (req, res) => {
  const {
    PartNumber, Name, Brand, Price, Description,
    ImageURL, Category, Qty, Specs
  } = req.body;

  const CreateDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const query = `
    INSERT INTO products 
    (PartNumber, Name, Brand, Price, Description, \`ImageURL\`, Category, \`Create Date\`, Qty, Specs)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  pool.execute(query, [
    PartNumber, Name, Brand, Price, Description,
    ImageURL, Category, CreateDate, Qty, Specs
  ], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error inserting product');
    } else {
      res.redirect('/?success=true');
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});