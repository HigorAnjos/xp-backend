const express = require('express');
const { create, login, remove } = require('./index');
const validations = require('../../middlewares/validations');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/create', validations.client.create.isValidFilds, create);
router.post('/login', validations.client.login.isValidFilds, login);
router.delete('/delete', auth, remove);

module.exports = router;
