const express = require('express');
require('express-async-errors');
const error = require('../middlewares/error');

const client = require('./client/routes');
const balance = require('./balance/routes');
const active = require('./active/routes');
const investment = require('./investment/routes');

const root = express.Router();

root.get('/', (_req, res) => res.send({ message: 'Hello World' }));

root.use('/client', client);
root.use('/balance', balance);
root.use('/active', active);
root.use('/investment', investment);

root.use(error);

module.exports = root;
