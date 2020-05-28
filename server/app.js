const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const routes = require('./routes');
const { setUser } = require('./middlewares');

const app = express().use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(setUser);

app.use('/api', routes);
module.exports = app;
