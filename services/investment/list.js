const { Product } = require('../../database/models');

const list = () => Product.findAll();

module.exports = list;
