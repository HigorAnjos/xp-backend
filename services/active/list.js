const { Wallet, WalletProduct, Product, Client, sequelize } = require('../../database/models');

const serialize = ({ client, productsClient, walletProducts }) => {
  const clientActives = {
    id: client.id,
    email: client.email, // remover depois
    products: walletProducts.map((product) => ({
      code: product.productId,
      name: productsClient.find((p) => p.id === product.productId).name,
      salePrice: product.salePrice,
      quantity: product.quantity,
    })),
  };

  return clientActives;
};

const transaction = async (clientId) => {
  const clientActives = await sequelize.transaction(async (t) => {
    const client = await Client.findOne({ where: { id: clientId }, transaction: t });

    const wallet = (await Wallet.findOne({ where: { clientId } }, { transaction: t })).dataValues;

    const walletProducts = await WalletProduct.findAll({
      where: { walletId: wallet.id },
    }, { transaction: t });

    const productsClient = await Promise.all(walletProducts.map(async (walletProduct) => {
      const productClient = await Product.findOne({
        where: { id: walletProduct.productId } }, { transaction: t });
      return productClient.dataValues;
    }));

    return { client, productsClient, walletProducts };
  });

  return clientActives;
};

const list = async (clientId) => serialize(await transaction(clientId));

module.exports = list;
