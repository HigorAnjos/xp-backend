const express = require('express');
const { create } = require('./index');
const validations = require('../../middlewares/validations');

const router = express.Router();

router.post('/create', validations.client.create.isValidFilds, create);

module.exports = router;
