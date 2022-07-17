const express = require('express');
const { create, login } = require('./index');
const validations = require('../../middlewares/validations');

const router = express.Router();

router.post('/create', validations.client.create.isValidFilds, create);
router.post('/login', validations.client.login.isValidFilds, login);

module.exports = router;
