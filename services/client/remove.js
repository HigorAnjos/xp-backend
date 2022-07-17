const { Client, Wallet, WalletProduct, sequelize } = require('../../database/models');
/**
 * so pode remover se
 *  - não tiver nenhum saldo na conta
 *  - não tiver nenhuma acao relacionada a conta
 */

const transaction = async (clientId) => {
  await sequelize.transaction(async (t) => {
    const wallet = (await Wallet.findOne({ where: { clientId } }, { transaction: t })).dataValues;
    if (wallet.balance > 0) {
      throw {
        status: 400, message: 'Não é possível remover o cliente, pois possui saldo na conta',
      };
    }

    const walletProducts = await WalletProduct.findAll({
      where: { walletId: wallet.id },
    }, { transaction: t });

    if (walletProducts.length > 0) {
      throw {
        status: 400, message: 'Não é possível remover o cliente, pois possui produtos na conta',
      };
    }
    await Client.destroy({ where: { id: clientId } }, { transaction: t });
  });
};

const remove = (clientId) => transaction(clientId);

module.exports = remove;
