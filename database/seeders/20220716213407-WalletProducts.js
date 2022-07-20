'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('WalletProducts',
    [
      {
        walletId: 1,
        productId: 1, // XPBR31
        salePrice: 94.31,
        quantity: 1,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        walletId: 1,
        productId: 1, // XPBR31
        salePrice: 100.00,
        quantity: 1,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        walletId: 1,
        productId: 2, // VALE3
        salePrice: 10,
        quantity: 1,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        walletId: 2,
        productId: 3, // GGBR4
        salePrice: 15,
        quantity: 1,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        walletId: 3,
        productId: 4, // MGLU3
        salePrice: 20,
        quantity: 1,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        walletId: 4,
        productId: 4, // MGLU3
        salePrice: 20,
        quantity: 3,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        walletId: 7,
        productId: 4, // MGLU3
        salePrice: 20,
        quantity: 3,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        walletId: 7,
        productId: 3, // GGBR4
        salePrice: 10,
        quantity: 300,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('WalletProducts', null, {}),
};
