const { Product, Wallet, WalletProduct, sequelize } = require('../../database/models');

const iCanBuy = async (quantity, price, balance) => {
  const amount = quantity * price;
  if (amount > balance) {
    throw {
      status: 400, message: 'Saldo insuficiente',
    };
  }
};

const getDbWallet = async (clientId, t) => {
  const wallet = (await Wallet.findByPk(clientId, { transaction: t })).dataValues;
  if (wallet.balance === 0) throw { status: 400, message: 'Saldo insuficiente' };
  return wallet;
};

const getDbProduct = async (code, t) => {
  const product = (await Product.findByPk(code, { transaction: t }));
  if (!product) throw { status: 400, message: 'Produto não encontrado' }; // verificar se o produto existe

  if (product.dataValues.quantity === 0) throw { status: 400, message: 'Produto esgotado' };
  return product.dataValues;
};

const buyProduct = (wallet, product, quantity, t) => WalletProduct
  .create({
    walletId: wallet.id,
    productId: product.id,
    quantity,
    salePrice: product.price },
    { transaction: t });

const upBalance = (amount, wallet, t) => Wallet.update({
  balance: wallet.balance - amount }, { where: { id: wallet.id }, transaction: t });

const upInvestimentQuantity = (quantity, product, t) => Product
  .update({
    quantity: product.quantity - quantity,
  }, { where: { id: product.id }, transaction: t });

const transaction = async (clientId, code, quantity) => {
  const result = await sequelize.transaction(async (t) => {
    const wallet = await getDbWallet(clientId, t); // pergar carteira do cliente balance

    const product = await getDbProduct(code, t); // pegar o produto

    await iCanBuy(quantity, product.price, wallet.balance); // verificar se e possivel comprar com o saldo

    await buyProduct(wallet, product, quantity, t); // efetuar a compra

    await upBalance((product.price * quantity).toPrecision(), wallet, t); // atualizar o saldo da carteira

    await upInvestimentQuantity(quantity, product, t); // atualizar a quantidade do produto
  });

  return result;
};

const buy = (clientId, code, quantity) => transaction(clientId, code, quantity);

module.exports = buy;
