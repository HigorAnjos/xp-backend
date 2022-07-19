const { Wallet } = require('../../database/models');

const deposit = async (clientId, balance) => {
  const wallet = await Wallet.findOne({ where: { clientId } });
  wallet.balance += balance;
  await wallet.save();
};

module.exports = deposit;
