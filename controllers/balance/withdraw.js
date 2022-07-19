const services = require('../../services');

const withdraw = async (req, res) => {
  const { id } = req.client;
  const { balance } = req.body;
  await services.balance.withdraw(id, balance);

  return res.status(201).json({ message: 'Saque com sucesso' });
};

module.exports = withdraw;
