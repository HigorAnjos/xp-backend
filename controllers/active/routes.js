const express = require('express');
const { find, list } = require('./index');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/list', auth, list);
router.get('/find/:activeId', auth, find);

module.exports = router;
