const express = require('express');
const router = express.Router();

const mysql2 = require('mysql2');

//MySQL Database Connection Pool.
const pool = mysql2.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_DATABASE
});