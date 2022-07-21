const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const root = require('./controllers/router');
const swaggerConfig = require('./docs/swagger.config.json');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use('/', root);

module.exports = app;
