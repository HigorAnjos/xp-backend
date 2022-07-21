const services = require('../../services');

const deposit = async (req, res) => {
  const { id } = req.client;
  const { balance } = req.body;
  const newBalance = await services.balance.deposit(id, balance);
  return res.status(201).json({ balance: newBalance });
};

module.exports = deposit;
