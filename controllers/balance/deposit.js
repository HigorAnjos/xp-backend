const services = require('../../services');

const deposit = async (req, res) => {
  const { id } = req.client;
  const { balance } = req.body;
  await services.balance.deposit(id, balance);

  return res.status(201).json({ message: 'Deposito com sucesso' });
};

module.exports = deposit;
