const services = require('../../services');

const buy = async (req, res) => {
  const { id: clientId } = req.client;
  const { code, quantity } = req.body;

  await services.investiment.buy.make(clientId, code, quantity);

  return res.status(201).json({ message: 'Investimento efetuado com sucesso' });
};

module.exports = buy;
