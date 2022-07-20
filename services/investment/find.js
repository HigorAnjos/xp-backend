const { Product } = require('../../database/models');

const find = (productId) => Product.findByPk(productId);

module.exports = find;
