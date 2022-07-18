const { Wallet } = require('../../database/models');

const withdraw = async (id, balance) => {
  const wallet = await Wallet.findOne({ where: { clientId: id } });
  if (wallet.balance < balance) {
    throw { status: 400, message: 'Saldo insuficiente' };
  }
  wallet.balance -= balance;
  await wallet.save();
};

module.exports = withdraw;
