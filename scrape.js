const axios = require('axios');
const cheerio = require('cheerio');
const mysql2 = require('mysql2');

// MySQL connection pool
const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

const url = 'https://au.lightforce.com/collections/led-work-lights'; //change this section to whatever URL needed

axios.get(url)
  .then(response => {
    const $ = cheerio.load(response.data);

    const products = [];

    $('.product-card').each((i, el) => {
      const name = $(el).find('.card-title').text().trim();
	  
      const rawPrice = $(el).find('.card-text').text().trim();
	  const price = rawPrice.replace(/^A\s*/i, '');

      const rawSku = $(el).find('.product-sku.meta-item').text().trim();
      const sku = rawSku.replace(/^SKU\s*/i, '');

      const image = $(el).find('img').attr('src');

      products.push({ name, price, sku, image });
    });

    console.log(products);

    // Optional: Insert into MySQL
    // products.forEach(product => {
      // pool.query(
        // 'INSERT INTO products (name, price, sku, image) VALUES (?, ?, ?, ?)',
        // [product.name, product.price, product.sku, product.image],
        // (err) => {
          // if (err) {
            // console.error('Error inserting product:', err);
          // } else {
            // console.log('Inserted:', product.name);
          // }
        // }
      // );
    // });
	
  })
  .catch(error => {
    console.error('Error fetching the page:', error);
  });