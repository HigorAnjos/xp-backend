const express = require('express');
const { create, login, remove, update } = require('./index');
const validations = require('../../middlewares/validations');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/create', validations.client.create, create);
router.post('/login', validations.client.login, login);
router.put('/update', auth, validations.client.update, update);
router.delete('/delete', auth, remove);

module.exports = router;
