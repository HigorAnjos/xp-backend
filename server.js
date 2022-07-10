const express = require('express');
const cors = require('cors');
const root = require('./controllers/router');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', root);

module.exports = app;
