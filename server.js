const express = require('express');
const app = express();
const mysql2 = require('mysql2');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const multiparty = require('multiparty');
const bcrypt = require('bcrypt'); 
const argon2 = require('argon2');
const session = require('express-session');
const router = express.Router();

// Load environment variables
dotenv.config();

// Set EJS as the view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultSecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Content Security Policy
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", [
    "default-src 'self';",
    "connect-src 'self' http://localhost:3000;",
    "style-src 'self' https://fonts.googleapis.com https://cdnjs.cloudflare.com;",
    "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com;",
    "img-src 'self' https://au.lightforce.com https://www.alpine.com.au https://focalaustralia.com.au https://ultra-vision.com.au https://d2epyv9fpc5tmv.cloudfront.net/ https://www.sony.com.au data:;",
    "frame-src 'self' https://www.google.com;",
    "script-src 'self' 'nonce-abc123';"
  ].join(" "));
  next();
});

// MySQL connection pool
const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

// User login route
router.post('/login', async (req, res) => {
  const { user, password } = req.body;
  const query = 'SELECT * FROM users WHERE user = ?';

  pool.query(query, [user], async (err, results) => {
    if (err) return res.status(500).send('Internal server error');
    if (results.length === 0) return res.status(404).send('USER NOT LOCATED');

    const dbUser = results[0];
    try {
      const isMatch = await argon2.verify(dbUser.password, password);
      if (isMatch) {
        req.session.user = dbUser.user;
        res.redirect('/management');
      } else {
        res.status(401).send('LOGIN UNSUCCESSFUL');
      }
    } catch (err) {
      res.status(500).send('Internal server error');
    }
  });
});

// User logout route
router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) return res.status(500).send('Error logging out');
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

// Mount router
app.use('/', router);

// Nodemailer setup
const transport = nodemailer.createTransport({
  host: process.env.EM,
  port: parseInt(process.env.EM_PORT),
  secure: process.env.SECURE === 'true',
  auth: {
    user: process.env.EM_USER,
    pass: process.env.EM_PASS
  }
});

transport.verify((error, success) => {
  if (error) console.error('Email transport error:', error);
  else console.log("Email server is ready.");
});

// Email route
app.post('/send', (req, res) => {
  const form = new multiparty.Form();
  let data = {};

  form.parse(req, (err, fields) => {
    if (err) return res.status(500).send("Form parsing failed.");

    Object.keys(fields).forEach(key => {
      data[key] = fields[key].toString();
    });

    const mail = {
      from: `${data.name} <${data.email}>`,
      to: process.env.EM,
      subject: data.subject,
      text: `${data.name} (${data.email}, ${data.number})\n\n${data.message}`
    };

    transport.sendMail(mail, (err, info) => {
      if (err) res.status(500).send("Something went wrong...");
      else res.status(200).send("Email successfully sent.");
    });
  });
});

// Static page routes
const pages = [
  'index', 'gallery', '4wd', 'about', 'audio', 'contact',
  'privacy', 'services', 'termsConditions', 'products', 'login', 'management'
];

pages.forEach(page => {
  app.get(`/${page}`, (req, res) => res.render(page));
});

app.get('/', (req, res) => res.render('index'));

// Dynamic product data route
app.get('/data', (req, res) => {
  const category = req.query.category;
  const sql = 'SELECT * FROM products WHERE Category = ?';

  pool.query(sql, [category], (err, results) => {
    if (err) return res.status(500).send('Error retrieving products');
    res.render('data', { data: results, category });
  });
});

// Management dashboard
app.get('/management', (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const sql = 'SELECT PartNumber, Name FROM products';

  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).send('Database error');
    }
    res.render('management', { products: results });
  });
});

// Dynamic partial routes for AJAX loading
app.get('/management/:action', (req, res) => {
  const action = req.params.action;
  const validActions = ['add', 'remove', 'edit', 'qty', 'support'];

  if (validActions.includes(action)) {
    res.render(`partials/${action}`, { layout: false });
  } else {
    res.status(404).send('Invalid management action');
  }
});

// Handles add product form submission
app.post('/management/add', (req, res) => {
  const { PartNumber, Name, Brand, Price, Description, ImageURL, Category, Qty, Specs } = req.body;

  const sql = 'INSERT INTO products (PartNumber, Name, Brand, Price, Description, ImageURL, Category, Qty, Specs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [PartNumber, Name, Brand, Price, Description, ImageURL, Category, Qty, Specs];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting product:', err);
      return res.status(500).send('Database error');
    }
    res.redirect('/management');
  });
});

//handles remove products.
app.post('/management/remove', (req, res) => {
  const { selectedIds, password } = req.body;

  if (password !== 'Addiction1!') {
    return res.status(403).send('Incorrect password');
  }

  if (!Array.isArray(selectedIds) || selectedIds.length === 0) {
    return res.status(400).send('No products selected');
  }

  const placeholders = selectedIds.map(() => '?').join(',');
  const sql = `DELETE FROM products WHERE PartNumber IN (${placeholders})`;

  pool.query(sql, selectedIds, (err, result) => {
    if (err) {
      console.error('Error deleting products:', err);
      return res.status(500).send('Database error');
    }
    res.redirect('/management');
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('°°° Page could not be located °°°');
});

// 500 handler
app.use((err, req, res, next) => {
  console.error('Internal server error:', err.stack);
  res.status(500).send('°°° Something is not working here °°°');
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});