/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
const { WalletProduct, Wallet, Product, sequelize } = require('../../database/models');

const getDbWallet = async (clientId, t) => (await Wallet.findByPk(clientId, { transaction: t })).dataValues;

const getDbProductClient = async (clientId, productId, t) => {
  const products = await WalletProduct.findAll({
    where: { walletId: clientId, productId },
    transaction: t,
  });

  if (products.length === 0) throw { status: 400, message: 'Produto não encontrado' }; // verificar se o produto existe

  return products.reduce((acc, cur) => {
    acc.push(cur.dataValues);
    return acc;
  }, []);
};

const sumQuantity = (products) => products.reduce((acc, cur) => acc + cur.quantity, 0);
const iCanSell = async (products, quantity) => {
  const walletQuantity = await sumQuantity(products);
  if (walletQuantity < quantity) {
    throw {
      status: 400, message: 'Nao possui quantidade de acoes suficiente para vender',
    };
  }
};

const sellProducts = async (products, quantity, wallet, t) => {
  for (let i = 0; i < products.length && quantity; i += 1) {
    const currProduct = products[i];
    if (currProduct.quantity - quantity > 0) {
      // reduzir a quantidade do produto do cliente
      const newQuantity = currProduct.quantity - quantity;

      await WalletProduct.update({
        quantity: newQuantity,
      }, { where: { productId: currProduct.productId, walletId: currProduct.walletId }, transaction: t });

      // voltando produto para o estoque
      const product = (await Product.findByPk(currProduct.productId, { transaction: t })).dataValues;
      // atualizar saldo do cliente
      const sumBalance = product.price * quantity;
      console.log('sumBalance', sumBalance);
      await Wallet.update({
        balance: Number(wallet.balance) + sumBalance,
      }, { where: { id: wallet.id }, transaction: t });

      // atualizar quantidade do produto
      await Product.update({
        quantity: product.quantity + quantity,
      }, { where: { id: product.id }, transaction: t });

      quantity = 0;
    } else {
      await WalletProduct.destroy({ where: {
        productId: currProduct.productId, walletId: currProduct.walletId,
      },
      transaction: t });
      // voltando produto para o estoque
      const product = (await Product.findByPk(currProduct.productId, { transaction: t })).dataValues;
      await Product.update({
        quantity: product.quantity + currProduct.quantity,
      }, { where: { id: product.id }, transaction: t });
      // atualizar saldo do cliente
      const newBalance = product.price * currProduct.quantity;
      console.log('newBalance', newBalance);
      await Wallet.update({
        balance: Number(wallet.balance) + newBalance,
      }, { where: { id: wallet.id }, transaction: t });

      quantity -= currProduct.quantity;
    }
  }
};

const transaction = async (clientId, productId, quantity) => {
  const result = await sequelize.transaction(async (t) => {
    const wallet = await getDbWallet(clientId, t); // pergar carteira do cliente balance
    const products = await getDbProductClient(clientId, productId, t); // pegar o produto
    await iCanSell(products, quantity); // verificar se a possibilidade de vender
    await sellProducts(products, quantity, wallet, t); // vender os produtos
  });

  return result;
};

const sell = (clientId, productId, quantity) => transaction(clientId, productId, quantity);

module.exports = sell;
/**
 * pegar carteira do cliente
 * pegar produtos do cliente
 * verificar se a quantidade do produto é maior que a quantidade que o cliente quer vender
 * adicionar o saldo na carteira do cliente
 * voltar a quantidade do produto para o estoque
 */
