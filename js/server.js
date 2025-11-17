const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'Addiction1!',
  database: 'autoaddictionbendigo'
});

app.get('/api/products/category/:name', (req, res) => {
  const category = req.params.name;
  db.query(
    'SELECT * FROM products WHERE category_id = (SELECT id FROM categories WHERE name = ?)',
    [category],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

app.listen(3000, () => console.log('Server running on port 3000'));

