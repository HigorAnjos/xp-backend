const services = require('../../services');

const withdraw = async (req, res) => {
  const { id } = req.client;
  const { balance } = req.body;
  const newBalance = await services.balance.withdraw(id, balance);

  return res.status(201).json({ balance: newBalance });
};

module.exports = withdraw;
