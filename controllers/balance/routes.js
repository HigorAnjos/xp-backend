const express = require('express');
const { account, deposit, withdraw } = require('./index');
const auth = require('../../middlewares/auth');
const validations = require('../../middlewares/validations');

const router = express.Router();

router.get('/account', auth, account);
router.post('/deposit', auth, validations.balance.deposit, deposit);
router.post('/withdraw', auth, validations.balance.withdraw, withdraw);

module.exports = router;
