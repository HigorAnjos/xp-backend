const { Wallet } = require('../../database/models');

const deposit = async (clientId, balance) => {
  const wallet = await Wallet.findOne({ where: { clientId } });
  wallet.balance += Number(balance);
  const newBalance = wallet.balance;
  await wallet.save();

  return newBalance;
};

module.exports = deposit;
