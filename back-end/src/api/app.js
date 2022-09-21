const express = require('express');
require('express-async-errors');
const errorHandler = require('../middlewares/errohandler');
const login = require('../routes/login');
const user = require('../routes/user');

const app = express();
app.use(express.json());
app.use('/login', login);
app.use('/user', user);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorHandler);

module.exports = app;
