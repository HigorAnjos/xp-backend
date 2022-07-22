const express = require('express');
const auth = require('../../middlewares/auth');
const validations = require('../../middlewares/validations');
const { find, list, buy, sell } = require('./index');

const router = express.Router();

router.get('/list', list);
router.post('/buy', validations.investment.buy, auth, buy);
router.post('/sell', validations.investment.sell, auth, sell);
router.get('/:id', find);

module.exports = router;
