const express = require('express');
require('express-async-errors');

const root = express.Router();

root.get('/', (_req, res) => res.send({ message: 'Hello World' }));

module.exports = root;
