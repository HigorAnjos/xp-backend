const { Wallet } = require('../../database/models');

const withdraw = async (id, balance) => {
  const wallet = await Wallet.findOne({ where: { clientId: id } });
  if (wallet.balance < balance) {
    throw { status: 400, message: 'Saldo insuficiente' };
  }
  wallet.balance -= balance;
  const newBalance = wallet.balance;
  await wallet.save();

  return newBalance;
};

module.exports = withdraw;
