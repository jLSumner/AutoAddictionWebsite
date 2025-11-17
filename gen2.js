const express = require('express');
const app = express();

const databaseConnection = require('./database/database');


app.use('/', databaseConnection);




app.listen(3000, () => console.log('Server is now LIVE [PORT: 3000]'));