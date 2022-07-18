const { Client, Wallet, WalletProduct, Product, sequelize } = require('../../database/models');

const serialize = ({ client, walletProducts, productsClient }) => {
  const clientActives = {
    id: client.id,
    email: client.email, // remover depois
    products: walletProducts.map((product) => ({
      code: product.productId,
      name: productsClient.name,
      salePrice: product.salePrice,
      quantity: product.quantity,
    })),
  };

  return clientActives;
};

const transaction = async (clientId, activeId) => {
  const clientActives = await sequelize.transaction(async (t) => {
    const client = await Client.findOne({ where: { id: clientId }, transaction: t });

    const wallet = (await Wallet.findOne({ where: { clientId } }, { transaction: t })).dataValues;

    const walletProducts = await WalletProduct.findAll({
      where: { walletId: wallet.id, productId: activeId },
    }, { transaction: t });

    const productsClient = await Product.findOne({
      where: { id: activeId } }, { transaction: t });

    return { client, walletProducts, productsClient };
  });

  return clientActives;
};

const find = async (clientId, activeId) => serialize(await transaction(clientId, activeId));

module.exports = find;
