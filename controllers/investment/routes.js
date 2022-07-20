const express = require('express');
const auth = require('../../middlewares/auth');
const { find, list, buy, sell } = require('./index');

const router = express.Router();

router.get('/list', list);
router.post('/buy', auth, buy);
router.post('/sell', auth, sell);
router.get('/:id', find);

module.exports = router;
