const express = require('express');
require('express-async-errors');
const cors = require('cors');
const errorHandler = require('../middlewares/errohandler');
const login = require('../routes/login');
const user = require('../routes/user');
const product = require('../routes/product');
const sale = require('../routes/sale');
const saleUser = require('../routes/saleByUser');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/login', login);
app.use('/user', user);
app.use('/product', product);
app.use('/sale', sale);
app.use('/saleUser', saleUser);
app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/images', express.static('public/images'));

app.use(errorHandler);

module.exports = app;
